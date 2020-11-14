var rustPolya;

function drawHeatmap(svg, urn, nSteps, drawFun)
{
  const width = 400;
  const height = 400;
  const nRuns = 10000;
  const resolution = 50;
  const margin = 20;
  drawFun = drawFun || rustPolya.update_urn_heatmap;

  var heatmap = drawFun(
    rustPolya.make_heatmap(resolution, nSteps),
    urn, nRuns);

  var maxByX = [];
  for (var i=0; i<resolution; ++i) {
    maxByX.push(d3.max(heatmap.heatmap, a => a[i]));
  }

  svg.attr("width", width + 2 * margin)
    .attr("height", height + 2 * margin);

  let xScale = d3.scaleLinear()
      .domain([0, resolution])
      .range([margin, width + margin]);
  let yScale = d3.scaleLinear()
      .domain([0, resolution])
      .range([height + margin, margin]);

  let xScaleLeg = d3.scaleLinear()
      .domain([0, nSteps])
      .range([margin, width + margin]);
  let yScaleLeg = d3.scaleLinear()
      .domain([0, 1])
      .range([height + margin, margin]);

  let axisGroup = svg.append("g");
  let axis = d3.axisRight(yScaleLeg).ticks(3);
  axisGroup.attr("transform", `translate(${xScale(resolution-1)},0)`)
    .call(axis);

  let xAxisGroup = svg.append("g");
  let xAxis = d3.axisBottom(xScaleLeg).ticks(5);
  xAxisGroup.attr("transform", `translate(0,${yScaleLeg(0)})`)
    .call(xAxis);

  var maxCount = d3.max(heatmap.heatmap.map(a => d3.max(a)));
  var colorScale = d3.scaleLinear(); // .domain([0, 1]).range(["white", "black"]);

  svg.append("g")
    .selectAll("g")
    .data(heatmap.heatmap.map((a,i) => {
      return {
        array: a,
        y: i
      };
    })).enter().append("g")
    .selectAll("g")
    .data(d => d.array.map((v, i) => {
      return {
        v: v,
        y: d.y+1,
        x: i
      };
    })).enter().append("rect")
    .attr("x", d => xScale(d.x))
    .attr("y", d => yScale(d.y))
    .attr("width", ~~(xScale(1) - xScale(0)))
    .attr("height", ~~(xScale(1) - xScale(0)))
    .attr("fill", "white")
    .attr("fill-opacity", d => colorScale(d.v / maxByX[d.x]));
}

loadModule("./pkg/without_a_bundler_bg.wasm").then(m => {
  rustPolya = m;
  let r = 1;
  let b = 1;
  let nSteps = 100;

  let urn = rustPolya.make_polya_urn(1, 0, 0, 1, r, b);

  drawHeatmap(d3.select("body")
              .append("div").style("text-align", "center")
              .append("div").style("display", "inline-block")
              .append("svg"), urn, nSteps, rustPolya.update_urn_heatmap);
});
