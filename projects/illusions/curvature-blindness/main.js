var svg = d3.select("#main")
    .append("svg")
    .attr("width", 600)
    .attr("height", 600);

var lst = d3.range(600);

var xScale = d3.scaleLinear().domain([0, 600]).range([0, Math.PI * 2 * 10]);
var yScale = d3.scaleLinear().domain([-1, 1]).range([12, 0]);

var line = d3.line()
    .x(d => d)
    .y(d => yScale(Math.sin(xScale(d))));

var colors = [d3.hcl(0, 0, 25), d3.hcl(0, 0, 75)];

function addWiggles(sel) {
    sel.selectAll("g")
        .data(d3.range(12))
        .enter()
        .append("g")
        .attr("transform", (d, i) => "translate(0, " + (10 + d * 50) + ")")
        .selectAll("path")
        .data(function(d) {
            if (d % 2 === 0) {
                return d3.range(20).map(d2 => d3.range(d2 * 30 - 1,  (d2+1)*30 + 1));
            } else {
                return d3.range(21).map(d2 => d3.range(d2 * 30 - 16, (d2+1)*30 - 14));
            }
        })
        .enter()
        .append("path")
        .attr("stroke", (d, i) => colors[i%2])
        .attr("fill", "none")
        .attr("stroke-width", "2px")
        .attr("d", d => line(d));
}

var backgroundRhombi = svg.append("g");

backgroundRhombi.append("path")
    .attr("fill", d3.hcl(0, 0, 50))
    .attr("d", "M 300 0 L 900 0 L 300 600 L -300 600 Z");
backgroundRhombi.append("path")
    .attr("fill", d3.hcl(0, 0, 0))
    .attr("d", "M 900 0 L 1500 0 L 900 600 L 300 600 Z");
backgroundRhombi.append("path")
    .attr("fill", d3.hcl(0, 0, 50))
    .attr("d", "M 1500 0 L 2100 0 L 1500 600 L 900 600 Z");

addWiggles(svg.append("g"));
addWiggles(svg.append("g").attr("transform", "translate(0, 10)"));

function move() {
    backgroundRhombi.attr("transform", "translate(300,0)")
        .transition()
        .ease(d3.easeLinear)
        .duration(15000)
        .attr("transform", "translate(-300,0)")
        .on("end", function() {
            d3.select(this).transition()
                .ease(d3.easeLinear)
                .duration(15000)
                .attr("transform", "translate(300,0)")
                .on("end", move);
        });
}

move();
