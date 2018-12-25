var w = 180, h = 180;

var dataset = [
  [40, 50], [90, 120], [30, 90], [60, 40], [10, 10]
];

var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h)
  .attr('style', 'outline: thin solid black;');

svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', function(d) {
    return d[0];
  })
  .attr('cy', function(d) {
    return d[1];
  })
  .attr('r', 5);
