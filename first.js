var ratData = [400, 900, 300, 600];

d3.selectAll('rect')
  .data(ratData)
  .attr('height', function(d){
    return d/10 * 1.5;
  })
  .attr('y', function(d){
    return 150 - d/10 * 1.5;
  });

var svg = d3.select('svg');

svg.append('line')
  .attr('x1', 25)
  .attr('y1', 00)
  .attr('x2', 25)
  .attr('y2', 150)
  .attr('stroke-width', 2)
  .attr('stroke', 'black');

svg.append('line')
  .attr('x1', 25)
  .attr('y1', 150)
  .attr('x2', 125)
  .attr('y2', 150)
  .attr('stroke-width', 2)
  .attr('stroke', 'black');

svg.append('text')
  .attr('class', 'y label')
  .attr('text-anchor', 'end')
  .text('No. of Rats')
  .attr('transform', 'translate(20, 20) rotate(-90)');

