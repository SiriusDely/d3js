d3.csv('/data/coffee_rodents_transform.csv', function(d) {
  return {
    city: d.city,
    rats2015: +d.rats_2015,
    coffee2015: +d.coffee_2015,
    rats2016: +d.rats_2016,
    coffee2016: +d.coffee_2016
  };
}, function(error, rows) {
  createVisualization(rows);
});

function createVisualization(data) {
  var width = 180, height = 180;

  var svg = d3.select('#main')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('style', 'outline: thin solid black;');

  var circles = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function(d) {
      return d.rats2015;
    })
    .attr('cy', function(d) {
      return d.coffee2015;
    })
    .attr('r', 5);

  d3.select('#start')
    .on('click', function() {
      circles
        .transition()
        .attr('cx', function(d) {
          return d.rats2016;
        })
        .attr('cy', function(d) {
          return d.coffee2016;
        });
    });

  d3.select('#reset')
    .on('click', function() {
      circles
        .transition()
        .attr('cx', function(d) {
          return d.rats2015;
        })
        .attr('cy', function(d) {
          return d.coffee2015;
        });
    });

}
