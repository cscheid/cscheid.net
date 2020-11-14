import * as cscheid from "../../../js/cscheid/cscheid.js";

let svg = cscheid.dom.makeCenteredElement(d3.select("#main"), "svg")
    .attr("width", 600)
    .attr("height", 600);

var scale = d3.scaleLinear().domain([-1, 1]).range([25, 575]);

svg.append("circle")
  .attr("cx", scale(0))
  .attr("cy", scale(0))
  .attr("r", scale(1) - scale(0))
  .attr("stroke", "black")
  .attr("fill", "none")
  .attr("stroke-width", "3px");

function makeMovingCircles(angles)
{
  return svg.append("g")
    .selectAll("circle")
    .data(angles)
    .enter()
    .append("circle")
    .attr("r", Math.abs(scale(-0.95) - scale(-1)))
    .attr("cx", d => scale(Math.cos(cscheid.math.radians(d/2)) * 0.95))
    .attr("cy", scale(0))
    .attr("fill", d => d3.hcl(d, 70, 70))
    .attr("transform", d => cscheid.svg.rotate(d/2, scale(0), scale(0)));
}

function makeSupportingLines(angles)
{
  return svg.append("g")
    .selectAll("line")
    .data(angles)
    .enter()
    .append("line")
    .attr("x1", scale(-1))
    .attr("x2", scale( 1))
    .attr("y1", scale(0))
    .attr("y2", scale(0))
    .attr("stroke", "gray")
    .attr("fill", "none")
    .attr("stroke-width", "1px")
    .attr("transform", d => cscheid.svg.rotate(d/2, scale(0), scale(0)));
}

var angles = d3.range(16).map(d => d * (360 / 16));
makeSupportingLines(angles);
var sel = makeMovingCircles(angles);

cscheid.dom.animate(function() {
  let t = cscheid.time.elapsed() * 90;
  sel.attr("cx", d => scale(Math.cos(cscheid.math.radians(d/2 + t)) * 0.95));
    // .attr("transform", d => cscheid.svg.rotate(d/2 + t, scale(0), scale(0)));
});
