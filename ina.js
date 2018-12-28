var width = 960,
  height = 500;

var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

d3.json('./data/indonesia.json', function(err, idn) {
  if (err) { throw err; }

  var subunits = topojson.feature(idn, idn.objects.subunits);
  var projection = d3.geo.equirectangular()
    .scale(1050)
    .rotate([-120, 0])
    .translate([width / 2, height / 2]);

  var path = d3.geo.path()
    .projection(projection);

  svg.append('path')
    .datum(subunits)
    .attr('d', path)

  svg.selectAll('.subunit')
    .data(subunits.features)
    .enter().append('path')
    .attr('class', function(d) {
      return 'subunit ' + d.id;
    })
    .attr('d', path);

  svg.append('path')
    .datum(topojson.mesh(idn, idn.objects.states_provinces, function(a, b) {
      return a !== b;
    }))
    .attr('d', path)
    .attr('class', 'province-border');

  svg.selectAll('.subunit-label')
    .data(subunits.features)
    .enter().append('text')
    .attr('class', function(d) {
      return 'subunit-label ' + d.id;
    })
    .attr('transform', function(d) {
      return 'translate(' + path.centroid(d) + ')';
    })
    .text(function(d) {
      return d.properties.NAME;
    });
});
