var ratData = [ 40, 90, 30, 60 ];

var w = 150, h = 175;
var m = 30;

var svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h)

svg.selectAll('rect')
  .data(ratData)
  .enter()
  .append('rect')
  .attr('x', function(d, i) {
    return i * 25 + m;
  })
  .attr('y', function(d) {
    return h - d - 75;
  })
  .attr('width', 20)
  .attr('height', function(d) {
    return d;
  })
  .attr('fill', 'steelblue');

svg.append('line')
  .attr('x1', m)
  .attr('y1', 0)
  .attr('x2', m)
  .attr('y2', 100)
  .attr('stroke-width', 2)
  .attr('stroke', 'black');

svg.append('line')
  .attr('x1', m)
  .attr('y1', 100)
  .attr('x2', 100 + m)
  .attr('y2', 100)
  .attr('stroke-width', 2)
  .attr('stroke', 'black');

svg.append('text')
  .attr('class', 'y label')
  .attr('text-anchor', 'end')
  .attr('transform', 'translate(20, 20) rotate(-90)')
  .text('No. of Rats');
