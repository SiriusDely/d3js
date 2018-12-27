const width = 960,
  height = 600;

const path = d3.geoPath();

const color = d3.scaleQuantize()
  .domain([1, 10])
  .range(d3.schemeBlues[9]);

const format = d3.format('');

const x = d3.scaleLinear()
  .domain(d3.extent(color.domain()))
  .rangeRound([600, 860]);

const svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

const g = svg.append('g')
  .attr('transform', 'translate(0,40)');

g.selectAll('rect')
  .data(color.range().map(d => color.invertExtent(d)))
  .enter().append('rect')
  .attr('height', 8)
  .attr('x', d => x(d[0]))
  .attr('width', d => x(d[1]) - x(d[0]))
  .attr('fill', d => color(d[0]));

g.append('text')
  .attr('class', 'caption')
  .attr('x', x.range()[0])
  .attr('y', -6)
  .attr('fill', '#000')
  .attr('text-anchor', 'start')
  .attr('font-weight', 'bold')
  .text('Unemployment Rate (%)');

g.call(d3.axisBottom(x)
  .tickSize(13)
  .tickFormat(format)
  .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0]))
)
  .select('.domain')
  .remove();

d3.json('data/us.json').then(us => {
  console.log(us);

  d3.tsv('data/unemployment.tsv').then(unemployment => {
    console.log(unemployment);

    const rateById = {};
    unemployment.forEach(d => rateById[d.id] = +d.rate);
    console.log(rateById);

    // let data = unemployment.map(d => [d.id, d.rate]);
    // console.log(data);

    let data1 = new Map(data.map(d => [d.id, d.rate]));
    data1.title = "Unemployment rate (%)";
    console.log(data1);

    svg.append('g')
      .selectAll('path')
      .data(topojson.feature(us, us.objects.counties).features)
      .enter().append('path')
      // .attr('fill', d => color(rateById[d.id]))
      .attr('fill', d => color(data1.get(d.id)))
      .attr('d', path)
      .append('title')
      // .text(d => format(rateById[d.id]))
      .text(d => format(data1.get(d.id)))
      // .style('stroke', 'black')
    ;

    svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
  });
});
