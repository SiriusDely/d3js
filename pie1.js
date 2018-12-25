var width = 600,
  height = 500,
  radius = Math.min(width, height) / 2;

var color = d3.scale.category20c();

var pie = d3.layout.pie()
  .value(function(d) { return d["Cen_1990"]; })
  .sort(null);

var arc = d3.svg.arc()
  .innerRadius(0)
  .outerRadius(radius - 20);

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("data/boston-data.csv", type, function(error, data) {
  var path = svg.datum(data).selectAll("path")
    .data(pie)
    .enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", arc);

  d3.selectAll("input")
    .on("change", change);

  var timeout = setTimeout(function() {
    d3.select("input[value=\"Cen_2000\"]").property("checked", true).each(change);
  }, 2000);

  function change() {
    var value = this.value;
    clearTimeout(timeout);
    pie.value(function(d) { return d[value]; }); // change the value function
    path = path.data(pie); // compute the new angles
    path.attr("d", arc); // redraw the arcs
  }
});

function type(d) {
  d["Cen_1990"] = +d["Cen_1990"];
  d["Cen_2000"] = +d["Cen_2000"];
  d["Cen_2010"] = +d["Cen_2010"];
  return d;
}
