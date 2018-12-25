// var ratData = [ 400, 900, 300, 600 ];
// var ratData = [ 40, 70, 60, 20, 40, 100, 60 ];
var ratData = [ 40, 70, 60, 20, 40, 100, 60, 40, 70, 60, 20, 40, 100, 60 ];
var ratData = [ 800, 700, 600 ];

var width = 500, height = 160;
var yLegendLeftWidth = 25;
var xAxisLength = 200;
var yAxisLength = 100;

var svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

function drawChart(dataArray) {

  var dataLength = dataArray.length;
  var maxValue = d3.max(ratData, function(d) {
    return +d;
  });
  var w = xAxisLength / dataLength;

  var yScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([0, yAxisLength]);

  // create a selection and bind data
  var rects = svg.selectAll('rect')
    .data(dataArray);

  // create new elements wherever needed
  rects.enter()
    .append('rect')
    .attr('x', function(d, i) {
      // Set x coord of rect using length of array
      return i * (xAxisLength / dataLength) + yLegendLeftWidth;
    })
    .attr('width', w - 1)
    .attr('fill', 'steelblue')
    // merge new elements with existing ones,
    // so everything below applies to all.
    .merge(rects)
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('y', function(d) {
      return height - yScale(d) - 75;
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
    .attr('x1', yLegendLeftWidth)
    .attr('y1', 00)
    .attr('x2', yLegendLeftWidth)
    .attr('y2', yAxisLength)
    .attr('stroke-width', 2)
    .attr('stroke', 'black');

  svg
    .append('line')
    .attr('x1', yLegendLeftWidth)
    .attr('y1', yAxisLength)
    .attr('x2', xAxisLength)
    .attr('y2', yAxisLength)
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
