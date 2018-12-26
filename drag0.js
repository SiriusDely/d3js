
// The Dataset in JSON format
var dataset = [
  { x: 100, y: 100, value: 50, city: "Cambridge" },
  { x: 175, y: 250, value: 80, city: "Boston" },
  { x: 300, y: 100, value: 30, city: "Brookline" },
  { x: 400, y: 200, value: 40, city: "Somerville" },
  { x: 225, y: 125, value: 20, city: "Watertown" },
  { x: 450, y: 100, value: 50, city: "Medford" }
];

// Setup a color scale (color our dots)
var color = d3.scale.ordinal()
  .range(d3.schemeCategory20);

// Define Drag Behavior
var drag = d3.behavior.drag()
  .origin(Object)
  .on('drag', function(d) {
    d.x = d3.event.x;
    d.y = d3.event.y;
    draw();
  });

// Create SVG Background
var svg = d3.select('body')
  .append('svg')
  .attr('width', 720)
  .attr('height', 400);

// Create Draw Function
function draw() {
  var g = svg.selectAll('g')
    .data(dataset);

  gEnter = g.enter()
    .append('g')
    .call(drag);

  g.attr('transform', function(d) {
    return 'translate(' + d.x + ',' + d.y + ')';
  });

  gEnter.append('circle')
    .attr('class', 'dot')
    .attr('height', 100)
    .attr('width', 100)
    .attr('r', function(d) {
      return d.value;
    }).style('fill', function(d, i) {
      // return color(1);
    });
}

draw();
