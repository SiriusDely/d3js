// Vars for Slider
var inputValue = null;
var months = [ 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December' ];

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

var rodents = svg.append('g');

rodents.selectAll('path')
  .data(rodents_json.features)
  .enter()
  .append('path')
  .attr('fill', initialDate)
  .attr('stroke', '#999')
  .attr('class', 'incident')
  .attr('d', geoPath)
  .on('mouseover', function(d) {
    d3.select('h2').text(d.properties.LOCATION_STREET_NAME);
    d3.select(this).attr('class', 'incident hover');
  })
  .on('mouseout', function(d) {
    d3.select('h2').text('');
    d3.select(this).attr('class', 'incident');
  })
;

// When the input range changes update the value
d3.select('#timeslide').on('input', function() {
  update(+this.value);
});

// Update the fill of each SVG of class 'incident' with value
function update(value) {
  inputValue = months[value];
  document.getElementById('range').innerHTML = inputValue;
  d3.selectAll('.incident')
    .attr('fill', dateMatch);
}

function dateMatch(data, value) {
  var d = new Date(data.properties.OPEN_DT);
  var m = months[d.getMonth()];
  if (inputValue == m) {
    this.parentElement.appendChild(this);
    return 'red';
  } else {
    return '#999';
  }
}

function initialDate(d, i) {
  var d = new Date(d.properties.OPEN_DT);
  var m = months[d.getMonth()];
  if (m == 'January') {
    this.parentElement.appendChild(this);
    return 'red';
  } else {
    return '#999';
  }
}
