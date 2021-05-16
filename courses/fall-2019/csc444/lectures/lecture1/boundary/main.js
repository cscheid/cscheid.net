var data = [];
for (var col=0; col<10; ++col) {
    for (var row=0; row<10; ++row) {
        data.push( { row: row, col: col, noise: (Math.random() - 0.5) < 0 } );
    }
}

function createSvg(div) {
    return div.append("svg")
        .style("display", "block")
        .style("margin", "auto")
        .attr("width", 400)
        .attr("height", 400);
}

var red = "#fd0000", blue = "#1579af";

function symbolPicker(sel, d, shapeTest, colorTest) {
    var radius;
    if (shapeTest(d)) {
        radius = 12;
        sel = sel.append("rect")
            .attr("x", -radius).attr("y", -radius)
            .attr("width",2*radius).attr("height",2*radius);
    } else {
        radius = 13;
        sel = sel.append("circle")
            .attr("cx", 0).attr("cy", 0)
            .attr("r", radius);
    }
    sel.attr("fill", function(d) {
        return colorTest(d) ? red : blue;
    });
}

function color(sel, d) {
    symbolPicker(sel, d,
        function(d) { return d.noise; },
        function(d) { return d.row < 5; });
}

function shape(sel, d) {
    symbolPicker(sel, d,
        function(d) { return d.col < 6; },
        function(d) { return d.noise; });
}

function colorAndShapeNoDistractor(sel, d) {
    symbolPicker(sel, d,
                 function(d) { return (d.col > 3); },
                 function(d) { return d.col > 3; });
}

function colorAndShapeNoDistractor2(sel, d) {
    symbolPicker(sel, d,
                 function(d) { return (d.col > 3); },
                 function(d) { return d.row > 6; });
}

function colorAndShape(sel, d) {
    symbolPicker(sel, d,
                 function(d) { return ((d.row < 3) ^ d.noise); },
                 function(d) { return d.noise; });
}

function populateChart(svg, symbolFun) {
    svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) {
            var x = 20 + d.row * 40;
            var y = 20 + d.col * 40;
            return "translate(" + x + "," + y + ")";
        })
        .each(function(d) {
            symbolFun(d3.select(this), d);
        });
}

populateChart(createSvg(d3.select("#color")), color);
populateChart(createSvg(d3.select("#shape")), shape);
populateChart(createSvg(d3.select("#colorAndShape")), colorAndShape);
populateChart(createSvg(d3.select("#colorAndShapeNoDistractor2")), colorAndShapeNoDistractor2);
populateChart(createSvg(d3.select("#colorAndShapeNoDistractor")), colorAndShapeNoDistractor);
