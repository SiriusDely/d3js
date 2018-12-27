var width = window.innerWidth,
  height = window.innerHeight;

var svg = d3.select('body')
.append('svg')
.attr('width', width)
.attr('height', height);

var projection = d3.geo.albers()
  .center([0, 37.8])
  .rotate([85.8, 0])
  .scale(8000)
  .translate([width / 2, height / 2]);

var geoPath = d3.geo.path()
  .projection(projection);

queue()
  .defer(d3.json, 'data/ky-counties.json')
  .await(ready);

function ready(err, counties) {
  var attribute = 'gas_wells'; // alternative is 'oil_wells'
  attribute = 'oil_wells';

  var breaks = ss.jenks(counties.objects.counties.geometries.map(function(d) {
    return d.properties[attribute] / d.properties.ALAND;
  }), 5)

  breaks.shift(); // remove min value from breaks Array before applying to domain
  breaks.pop(); // same for max

  var colors = ["#feedde","#fdbe85","#fd8d3c","#e6550d","#a63603"];

  var jenks = d3.scale.threshold()
    .domain(breaks)
    .range(colors);

  svg.append('g')
  .selectAll('path')
  .data(topojson.feature(counties, counties.objects.counties).features)
  .enter()
  .append('path')
  .attr('d', geoPath)
  .attr('class', 'county')
  .attr('fill', function(d) {
    return jenks(d.properties[attribute] / d.properties.ALAND);
  });
}
