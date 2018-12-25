
d3.csv('data/coffee_rodents.csv', function(d) {
  return {
    city: d.city,
    rats: +d.rats,
    coffee: +d.coffee
  };
}, function(err, rows) {
  createVisualization(rows);
});

function createVisualization(data) {
  console.log(data);

  var w = 180, h = 180;
  var pad = 30;

  var svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    // .attr('style', 'outline: thin solid black;')
  ;

  var xMax = d3.max(data, function(d) {
    return +d.rats;
  });
  var yMax = d3.max(data, function(d) {
    return +d.coffee;
  });

  var xScale = d3.scale.linear()
    .domain([0, xMax])
    .range([pad, w - pad]);
  var yScale = d3.scale.linear()
    .domain([0, yMax])
    .range([h - pad, pad]);

  var tooltip = d3.select('body')
    .append('div')
    .style('position', 'absolute')
    .style('font-family', 'sans-serif')
    .style('font-size', '10px')
    .style('z-index', '10')
    .style('visibility', 'hidden');

  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
      return xScale(d.rats);
    })
    .attr('cy', function(d) {
      return yScale(d.coffee);
    })
    .attr('r', 5)
    .on('mouseover', function(d) {
      return tooltip.style('visibility', 'visible')
        .text(d.city + ': ' + d.rats + ', ' + d.coffee);
    })
    .on('mousemove', function(d) {
      return tooltip.style('top', (event.pageY - 10) + 'px')
        .style('left', (event.pageX + 10 + 'px'))
        .text(d.city + ': ' + d.rats + ', ' + d.coffee);
    })
    .on('mouseout', function(d) {
      return tooltip.style('visibility', 'hidden');
    });

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .ticks(5);

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left')
    .ticks(5);

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + (h-pad) + ')')
    .call(xAxis);

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(' + pad + ',0)')
    .call(yAxis);
}
