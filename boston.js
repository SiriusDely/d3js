// Width and Height of the whole visualization
var width = 700,
  height = 580;

// Create SVG
var svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Append empty placeholder g element to SVG
// g will contain geometry elements
var g = svg.append('g');

// Set Projection Parameters
var albersProjection = d3.geoAlbers()
  .scale(190000)
  .rotate([71.057, 0])
  .center([0, 42.313])
  .translate([width / 2, height / 2]);

// Create GeoPath function that uses built-in D3 functionality to turn
// lat/lon coordinates into screen coordinates
var geoPath = d3.geoPath()
  .projection(albersProjection);

// Classic D3... Select non-existent elements, bind the data, append the elements,
// and apply attributes
g.selectAll('path')
.data(neighborhoods_json.features)
.enter()
.append('path')
.attr('fill', '#ccc')
.attr('stroke', '#333')
.attr('d', geoPath);
