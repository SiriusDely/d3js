var width = 720,
  height = 500;

var colors = d3.scaleThreshold()
  .domain([ 0.02, 0.04, 0.06, 0.08, 0.10 ])
  .range([ '#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f' ]);

var projection = d3.geoAlbersUsa()
  .scale(1000)
  .translate([width / 2, height / 2]);

var path = d3.geoPath()
  .projection(projection);

var svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

// Queue up datasets using D3 Queue
d3.queue()
  // .defer(d3.json, 'data/us.json') // Load US Counties
  .defer(d3.json, 'data/us1.json') // Load US Counties
  // .defer(d3.tsv, 'data/us_unemployment_2008.tsv') // Load Unemployment TSV
  .defer(d3.tsv, 'data/unemployment.tsv') // Load Unemployment TSV
  .await(ready); // Run 'ready' when JSONs are loaded

// Ready Function, runs when data is loaded
function ready(error, us, unemployment) {
  if (error) { throw error; }

  var rateById = {}; // Create empty object for holding dataset
  unemployment.forEach(function(d) {
    rateById[d.id] = +d.rate; // Create property for each ID, give it value from rate
    // important: cast rate to numeric value (+)
  });

  svg.append('g')
    .attr('class', 'counties')
    .selectAll('path')
  // Bind TopoJSON data elements
    .data(topojson.feature(us, us.objects.counties).features)
    .enter().append('path')
    .attr('d', path)
    .style('fill', function(d) {
      // pass rate to color function, return color based on scale
      return colors(rateById[d.id]); // get rate value for specific object
    })
    // .style('stroke', 'black')
  ;

  svg.append('path')
    .datum(topojson.mesh(us, us.objects.states, function(a, b) {
      return a.id !== b.id;
    }))
    .attr('class', 'states')
    .attr('d', path);

}
