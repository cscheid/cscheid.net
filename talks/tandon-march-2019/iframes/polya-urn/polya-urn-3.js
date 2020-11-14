var rustPolya;

function traceMany(svg, urn, nSteps, traceFun)
{
  const width = 600;
  const height = 600;
  const nCurves = 50;
  const margin = 20;
  traceFun = traceFun || rustPolya.trace_urn;

  svg.attr("width", width + 2 * margin)
    .attr("height", height + 2 * margin);

  let xScale = d3.scaleLinear()
      .domain([0, nSteps])
      .range([margin, width + margin]);
  let yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([height + margin, margin]);
  let lineGen = d3.line()
      .x((d, i) => xScale(i))
      .y(d => yScale(d));

  let axisGroup = svg.append("g");
  let axis = d3.axisRight(yScale).ticks(3);
  axisGroup.attr("transform", `translate(${xScale(nSteps-1)},0)`)
    .call(axis);

  let xAxisGroup = svg.append("g");
  let xAxis = d3.axisBottom(xScale).ticks(5);
  xAxisGroup.attr("transform", `translate(0,${yScale(0)})`)
    .call(xAxis);
  
  let lines = d3.range(nCurves).map(i => {
    let u = Math.random(), v = Math.random();
    // simulate a draw from a triangular PDF
    let d = u < v ? 1-u : u;
    return {
      trace: traceFun(urn, nSteps).trace,
      delay: d
    };
  });
  
  var curves = svg.append("g")
      .selectAll("path")
      .data(lines)
      .enter()
      .append("path")
      .classed("trace", true)
      .attr('d', d => lineGen(d.trace))
      .each(function(d) {
        d.totalLength = this.getTotalLength();
      })
      .attr("stroke-dasharray", d => d.totalLength + " " + d.totalLength)
      .attr("stroke-dashoffset", d => d.totalLength)
  ;
  
  svg.append("g")
    .append("line")
    .attr("stroke", "cyan")
    .attr("stroke-width", 3)
    .attr("x1", xScale(0))
    .attr("x2", xScale(nSteps))
    .attr("y1", yScale(2/3))
    .attr("y2", yScale(2/3));

  window.moveForward = function() {
    curves.interrupt().transition()
      .duration(3000)
      .delay((d, i) => {
        if (i < 5) {
          return i * 2500;
        } else {
          return 12500 + d.delay * 3000;
        }
      })
      .attr("stroke-dashoffset", 0);
  };
  window.moveBackward = function() {
    curves.interrupt().transition()
      .duration(3000)
      .attr("stroke-dashoffset", d => d.totalLength);
  };
}

loadModule("./pkg/without_a_bundler_bg.wasm").then(m => {
    rustPolya = m;
    let r = 1;
    let b = 1;
    let nSteps = 100;

    let urn = rustPolya.make_polya_urn(2, 0, 0, 1, r, b);

    traceMany(d3.select("body")
              .append("div").style("text-align", "center")
              .append("div").style("display", "inline-block")
              .append("svg"), urn, nSteps, rustPolya.trace_urn);
});
