// var ratData = [ 40, 90, 30, 60 ];
// var ratData = [ 40, 70, 60, 20, 40, 100, 60 ];

var margin = { bottom: 75, left: 15, right: 85 };
var w = 200 - margin.left - margin.right, h = 175 - margin.bottom;
var m = 30;

var xAxisLength = 100,
  yAxisLength = 100;

d3.csv('/data/rat-squirrel-data.csv', function(d) {
  return {
    city: d.city,
    rats: +d.rats,
    squirrels: +d.squirrels
  };
}, function(error, rows) {
  console.log(rows);
  createVisualization(rows);
});

function createVisualization(data) {

  // Setup svg with margins
  var svg = d3.select('body')
    .append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',10)');

  // Transpose data into layers
  var dataset = d3.layout.stack()(
    ['rats', 'squirrels'].map(function(rat) {
      return data.map(function(d) {
        return {
          x: d.city,
          y: +d[rat]
        };
      });
    })
  );

  // Setup properties for stack
  /*
  var stack = d3.stack()
    .keys(['rats', 'squirrels']) // Set the keys for the data
    .order(d3.stackOrderNone) // Set ordering properties, try d3.stackOrderAscending
    .offset(d3.stackOffsetNone) // Set offset properties

  var dataset = stack(data);
  */
  console.log(dataset);

  var maxValue = d3.max(dataset, function(d) {
    return d3.max(d, function(d) {
      return d.y0 + d.y;
    });
  });

  var yScale = d3.scale.linear()
    .domain([0, maxValue])
    .range([h, 0]);

  var colors = ["#dfd6d6", "#d85f41"];

  // Create groups for each series, rect elements for each segment
  var groups = svg.selectAll('g.city')
    .data(dataset)
    .enter().append('g')
    .attr('class', 'city')
    .style('fill', function(d, i) {
      return colors[i];
    });

  var dataLength = data.length;

  var rects = groups.selectAll('rect')
    .data(function(d) {
      return d;
    })
    .enter()
    .append('rect')
    .attr('x', function(d, i) {
      return i * (xAxisLength / dataLength) + m;
    })
    .attr('y', function(d) {
      return yScale(d.y0 + d.y);
    })
    .attr('width', (xAxisLength / dataLength) - 1)
    .attr('height', function(d) {
      return yScale(d.y0) - yScale(d.y0 + d.y);
    })
    .on('mouseover', function(d) {
      return tooltip.style('display', null);
    })
    .on('mousemove', function(d) {
      var xPosition = d3.mouse(this)[0] - 15;
      var yPosition = d3.mouse(this)[1] - 25;
      tooltip.attr('transform', 'translate(' + xPosition + ',' + yPosition + ')');
      tooltip.select('text').text(d.x + ': ' + d.y);
    })
    .on('mouseout', function(d) {
      return tooltip.style('display', 'none');
    });

  // Create y-axis
  svg.append('line')
    .attr('x1', m)
    .attr('y1', 0)
    .attr('x2', m)
    .attr('y2', yAxisLength)
    .attr('stroke-width', 2)
    .attr('stroke', 'black');

  // Create x-axis
  svg.append('line')
    .attr('x1', m)
    .attr('y1', yAxisLength)
    .attr('x2', xAxisLength + m)
    .attr('y2', yAxisLength)
    .attr('stroke-width', 2)
    .attr('stroke', 'black');

  // y-axis label
  svg.append('text')
    .attr('class', 'y label')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(20, 50) rotate(-90)')
    .attr('font-size', '14px')
    .attr('font-family', "'Open Sans', sans-serif")
    .text('Reports');

  // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append('g')
    .attr('class', 'tooltip')
    .style('display', 'none');

  tooltip.append('text')
    .attr('x', 15)
    .attr('dy', '1.2em')
    .style('text-anchor', 'middle')
    .attr('font-size', '12px');

  // Draw legend
  var legend = svg.selectAll('.legend')
    .data(colors)
    .enter().append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      return 'translate(' + i * 50 + ', 110)';
    });

  legend.append('rect')
    .attr('x', w - 70)
    .attr('width', 18)
    .attr('height', 18)
    .style('fill', function(d, i) {
      return colors.slice().reverse()[i];
    });

  legend.append('text')
    .attr('x', w - 49)
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('text-anchor', 'start')
    .text(function(d, i) {
      switch(i) {
        case 0: return 'Rats';
        case 1: return 'Squirrels';
      }
    });

}
