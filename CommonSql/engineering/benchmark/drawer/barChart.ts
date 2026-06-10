const D3Node = require('d3-node');

export function barChart({
  data: data = [],
  selector: _selector = "#chart",
  container: _container = `
    <div id="container">
      <h2>Line Chart</h2>
      <div id="chart"></div>
    </div>
  `,
  style: _style = "",
  width: _width = 960,
  height: _height = 500,
  margin: _margin = { top: 20, right: 20, bottom: 60, left: 50 },
  barColor: _barColor = "steelblue",
  avgLineColor: _avgLineColor = "red",
  midLineColor: _midLineColor = "orange",
  tickSize: _tickSize = 5,
  tickPadding: _tickPadding = 5,
  average: average = 0,
  median: median = 0
} = {}) {
  const d3n = new D3Node({
    selector: _selector,
    svgStyles: _style,
    container: _container
  });

  const d3 = d3n.d3;

  const width = _width - _margin.left - _margin.right;
  const height = _height - _margin.top - _margin.bottom;

  const svg = d3n.createSVG(_width, _height)
    .append("g")
    .attr("transform", `translate(${_margin.left}, ${_margin.top})`);


  // Handmade legend  
  svg.append('line')
    .attr('x1', _width / 2 + 140)
    .attr('y1', 35)
    .attr('x2', _width / 2 + 150)
    .attr('y2', 35)
    .attr('stroke', 'red')
    .attr('stroke-width', '2');
  svg.append('line')
    .attr('x1', _width / 2 + 140)
    .attr('y1', 55)
    .attr('x2', _width / 2 + 150)
    .attr('y2', 55)
    .attr('stroke', 'orange')
    .attr('stroke-width', '2');
  svg.append("text").attr("x", _width / 2 + 155).attr("y", 35).text("Average: " + average.toFixed(2) + "ms").style("font-size", "15px").attr("alignment-baseline", "middle");
  svg.append("text").attr("x", _width / 2 + 155).attr("y", 55).text("Median: " + median.toFixed(2) + "ms").style("font-size", "15px").attr("alignment-baseline", "middle");

  const g = svg.append("g");

  // const allKeys = allKeys;
  const xScale = d3.scaleBand()
    .domain(data.map((d) => d.key))
    .range([0, width])
    .padding(0.2);
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height, 0]);
  const xAxis = d3.axisBottom(xScale)
    .tickSize(_tickSize)
    .tickPadding(_tickPadding);
  const yAxis = d3.axisLeft(yScale)
    .tickSize(_tickSize)
    .tickPadding(_tickPadding);

  g.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  g.append("g")
    .call(yAxis);

  g.selectAll()
  .data(data)
  .enter()
  .append('rect')
  .attr('x', (s) => xScale(s.key))
  .attr('y', (s) => yScale(s.value))
  .attr('height', (s) => height - yScale(s.value))
  .attr('width', xScale.bandwidth())  
  .attr('fill', _barColor)

  g.append('line')
    .attr('x1', 0)
    .attr('y1', yScale(average))
    .attr('x2', width)
    .attr('y2', yScale(average))
    .attr('stroke', 'red')

  g.append('line')
    .attr('x1', 0)
    .attr('y1', yScale(median))
    .attr('x2', width)
    .attr('y2', yScale(median))
    .attr('stroke', 'orange')

  svg.append('text')
    .attr('x', - (height / 2) - _margin.top)
    .attr('y', - _margin.left / 1.5)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Latency (ms)')

  svg.append('text')
    .attr('x', width / 2 + _margin.left)
    .attr('y', height + _margin.bottom / 1.5)
    .attr('text-anchor', 'middle')
    .text('Script #')
  
  return d3n;
}
