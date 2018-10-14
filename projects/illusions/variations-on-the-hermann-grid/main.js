import * as cscheid from "/js/cscheid/cscheid.js";

var svg = d3.select("#main")
    .append("svg")
    .attr("width", 600)
    .attr("height", 600);

function addLineGrid(parent)
{
  return parent.append("g")
    .selectAll("line")
    .data(d3.range(-5, 20))
    .enter()
    .append("line")
    .attr("x1", -300)
    .attr("x2", 900)
    .attr("y1", d => d * 40)
    .attr("y2", d => d * 40)
    .attr("stroke", "gray")
    .attr("stroke-width", "5px");
}

// ugly
addLineGrid(svg).attr("transform", "translate(320, 320) rotate(90)  translate(-320, -320)");
addLineGrid(svg).attr("transform", "translate(320, 320) rotate(30)  translate(-320, -320)");
addLineGrid(svg).attr("transform", "translate(320, 320) rotate(150) translate(-320, -320)");

function addPoints(parent)
{
  return parent.append("g")
    .selectAll("circle")
    .data(d3.range(-1, 16))
    .enter()
    .append("circle")
    .attr("r", "5px")
    .attr("fill", "black")
    .attr("stroke", "white")
    .attr("cx", 0)
    .attr("cy", d => d * 40 / (Math.sqrt(3) / 2));
}

var gap = 40/(Math.sqrt(3)/2);

var left = svg.append("g").selectAll("g").data(d3.range(4))
    .enter().append("g")
    .attr("transform", d => cscheid.svg.translate(40 + 80 * d, -3))
    .call(addPoints);

var right = svg.append("g").selectAll("g").data(d3.range(4))
    .enter().append("g")
    .attr("transform", d => cscheid.svg.translate(560 - 80 * d, -3+gap))
    .call(addPoints);

function moveLeft()
{
  left.transition()
    .delay(1500)
    .duration(1500)
    .attr("transform", d => cscheid.svg.translate(40 + 80 * d, -3+gap/2))
    .transition()
    .delay(1500)
    .duration(1500)
    .attr("transform", d => cscheid.svg.translate(40 + 80 * d, -3))
    .on("end", moveLeft);
}

function moveRight()
{
  right.transition()
    .delay(1500)
    .duration(1500)
    .attr("transform", d => cscheid.svg.translate(560 - 80 * d, -3+3*gap/2))
    .transition()
    .delay(1500)
    .duration(1500)
    .attr("transform", d => cscheid.svg.translate(560 - 80 * d, -3+gap))
    .on("end", moveRight);
}

moveLeft();
window.setTimeout(moveRight, 750);

