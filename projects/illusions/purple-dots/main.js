var svgMain = cscheid.dom.makeCenteredElement(d3.select("#wrapper"),"svg")
    .attr("width", 600)
    .attr("height", 600);

svgMain.append("defs")
  .append("filter")
  .attr("id", "blur1")
  .attr("x", "-50%")
  .attr("y", "-50%")
  .attr("width", "200%")
  .attr("height", "200%")
  .append("feGaussianBlur")
  .attr("in", "SourceGraphic")
  .attr("stdDeviation", "5");

svgMain = svgMain
    .append("g")
    .attr("transform", "translate(300, 300)");

svgMain.append("g")
  .append("path")
  .attr("stroke", "black")
  .attr("fill", "none")
  .attr("d", "M -20 0 L 20 0 M 0 -20 L 0 20");

let nPoints = 12;
let angles = d3.range(0, nPoints).map((a) => (a / nPoints) * Math.PI * 2);

var circles = svgMain.append("g")
    .selectAll("circle")
    .data(angles)
    .enter()
    .append("circle")
    .attr("r", 15)
    .style("filter", "url(#blur1)")
    .attr("cx", (d) => Math.cos(d) * 210)
    .attr("cy", (d) => Math.sin(d) * 210)
    .attr("fill", d3.hcl(0, 70, 50));

function startLoop(d) {
  d3.select(this)
    .transition()
    .duration(150)
    .style("opacity", 0)
    .transition()
    .duration(150)
    .style("opacity", 1)
    .transition()
    .delay(700)
    .on("end", startLoop);
}

circles.transition()
  .delay((d) => (d / (Math.PI * 2)) * 1000)
  .on("end", startLoop);
