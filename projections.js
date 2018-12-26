var width = 960,
  height = 960;

// Albers
var projectionAlbers = d3.geo.albers()
  .scale(110)
  .rotate([230, 30])
  // .center([0, 42.313])
  // .translate([width / 2, height / 2])
;

// Mercator
var projectionMerc = d3.geo.mercator()
  // .scale(5000)
  // .rotate([71.057, 0])
  // .center([0, 42.313])
  // .translate([width / 2, height / 2])
;

// Conic Equidistant
var projectionConicEq = d3.geo.conicEquidistant()
  // .scale(5000)
  // .rotate([71.057, 0])
  // .center([0, 42.313])
  // .translate([width / 2, height / 2])
;

// Mercator
var projectionOrtho = d3.geo.orthographic()
  // .scale(5000)
  // .rotate([71.057, 0])
  // .center([0, 42.313])
  // .translate([width / 2, height / 2])
;

var path = d3.geo.path()
  .projection(projectionAlbers);

var graticule = d3.geo.graticule();

var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

svg.append('path')
  .datum(graticule)
  .attr('class', 'graticule')
  .attr('d', path);

d3.json('data/countries.json', function(error, world) {
  if (error) { throw error; }

  svg.insert('path', '.graticule')
    .datum(topojson.feature(world, world.objects.land))
    .attr('class', 'land')
    .attr('d', path)

  svg.insert('path', '.graticule')
    .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
      return a !== b;
    }))
    .attr('class', 'boundary')
    .attr('d', path);
});

d3.select(self.frameElement)
  .style('height', height + 'px');

