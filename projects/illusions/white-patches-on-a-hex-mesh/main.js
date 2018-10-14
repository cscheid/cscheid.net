var svg = d3.select("#main")
    .append("svg")
    .attr("width", 600)
    .attr("height", 600);

function addLineGrid(parent)
{
  return parent.append("g")
    .selectAll("line")
    .data(d3.range(25).map(d => d - 5))
    .enter()
    .append("line")
    .attr("x1", -300)
    .attr("x2", 900)
    .attr("y1", d => d * 40)
    .attr("y2", d => d * 40)
    .attr("stroke", "gray")
    .attr("stroke-width", "5px");
}

addLineGrid(svg).attr("transform-origin", "300px 300px").attr("transform", "rotate(90)");
addLineGrid(svg).attr("transform-origin", "300px 300px").attr("transform", "rotate(30)");
addLineGrid(svg).attr("transform-origin", "300px 300px").attr("transform", "rotate(150)");
