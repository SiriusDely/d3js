var ratData = [400, 900, 300, 600];

var svg = d3.select('body')
  .append('svg')
  .attr('width', 500)
  .attr('height', 160);

function drawChart(dataArray) {

  // create a selection and bind data
  var rects = svg.selectAll('rect')
    .data(dataArray);

  // create new elements wherever needed
  rects.enter()
    .append('rect')
    .attr('x', function(d, i) {
      return (i + 1) * 25;
    })
    .attr('width', 15)
    .attr('fill', 'steelblue')
    // merge new elements with existing ones,
    // so everything below applies to all.
    .merge(rects)
    .attr('height', function(d) {
      return d/10 * 1.5;
    })
    .attr('y', function(d) {
      return 150 - d/10 * 1.5;
    });

  // remove any unused bars
  rects.exit()
    .remove();

  // var svg = d3.select('svg');

  svg
    .selectAll('line')
    .remove();

  svg
    .append('line')
    .attr('x1', 25)
    .attr('y1', 00)
    .attr('x2', 25)
    .attr('y2', 150)
    .attr('stroke-width', 2)
    .attr('stroke', 'black');

  svg
    .append('line')
    .attr('x1', 25)
    .attr('y1', 150)
    .attr('x2', (1 + dataArray.length) * 25)
    .attr('y2', 150)
    .attr('stroke-width', 2)
    .attr('stroke', 'black');

  svg
    .selectAll('text')
    .remove();

  svg
    .append('text')
    .attr('class', 'y label')
    .attr('text-anchor', 'end')
    .text('No. of Rats')
    .attr('transform', 'translate(20, 20) rotate(-90)');

}

drawChart(ratData);
