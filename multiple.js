// Define the data as a two-dimensional array of numbers. If you had other
// data to associate with each number, replace each number with an object, e.g.,
// `{key: "value"}`.
var data = [
  [11975,  5871, 8916, 2868],
  [ 1951, 10048, 2060, 6171],
  [ 8010, 16145, 8090, 8045],
  [ 1013,   990,  940, 6907]
];

// Define the margin, radius, and color scale. The color scale will be
// assigned by index, but if you define your data using objects, you could pass
// in a named field from the data object instead, such as `d.name`. Colors
// are assigned lazily, so if you want deterministic behavior, define a domain
// for the color scale.
var margin = 10,
  radius = 100,
  color = d3.scale.category20();

// Insert an svg element (with margin) for each row in our dataset. A child g
// element translates the origin to the pie center.
d3.csv('data/boston-data-transposed.csv', type, function(error, data1) {
  console.log(data1);

  var svg = d3.select("body").selectAll('svg')
  .data(data1).enter()
    .append("svg")
    .attr("width", (radius + margin) * 2)
    .attr("height", (radius + margin) * 2)
    .append("g")
    .attr("transform", "translate(" + (radius + margin) + "," + (radius + margin) + ")");

  var pie = d3.layout.pie();

  var arc = d3.svg.arc()
    .innerRadius(radius / 2)
    .outerRadius(radius);

  // The data for each svg element is a row of numbers (an array). We pass that to
  // d3.layout.pie to compute the angles for each arc. These start and end angles
  // are passed to d3.svg.arc to draw arcs! Note that the arc radius is specified
  // on the arc, not the layout.
  var path = svg.selectAll("path")
    .data(pie)
    .enter().append("path")
    .attr("d", arc)
    .style("fill", function(d, i) { return color(i); });
});

function type(d) {
  var ret = [ +d["Age_Under18"], +d["Age18_34"], +d["Age35_64"], +d["Age65_Over"] ];
  return ret;
}
