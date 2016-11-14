var svg = d3.select("#div-duality")
    .append("svg")
    .attr("width", 500).attr("height", 500);

//////////////////////////////////////////////////////////////////////////////

var bg = svg.append("rect")
        .attr("width", 500).attr("height", 500)
        .attr("fill", "rgba(0,0,0,0.1)")
        .on("mousemove", function(d) {
            p2.x = d3.event.offsetX;
            p2.y = d3.event.offsetY;
            updateDrawing();
        });

var ellipse_g = svg.append("g")
        .attr("transform", "translate(250, 250) rotate(45)");

var ellipse = ellipse_g.append("ellipse")
        .attr("cx", 0).attr("cy", 0)
        .attr("rx", 100).attr("ry", 80)
        .attr("fill", "white").attr("stroke", "black").attr("stroke-width", 2);

//////////////////////////////////////////////////////////////////////////////

function translate(x, y) {
    return "translate(" + x + ", " + y + ")";
}

function translateD(d) {
    return translate(d.x, d.y);
}

function updateDrawing() {
    setTangentLine();
    pointToCursor.attrs(lineD);
    tangentAtCursor.attrs(lineD);
}

var drag = d3.drag()
        .on("drag", function(d,i) {
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            d3.select(this).attr("transform", translateD);
            updateDrawing();
        });

var p1 = { x: 50, y: 400 };
var p2 = { x: 0, y: 0 };

var cursorLine = { p1: p1, p2: p2 };
var tangentLine = { p1: {x: 0, y: 0}, p2: {x: 0, y: 0} };

function setTangentLine() {
    var d = { x: p2.x - p1.x, y: p2.y - p1.y };
    var l = Math.sqrt(d.x * d.x + d.y * d.y);
    if (l === 0.0) {
        l = 1.0;
    }
    d.x /= l;
    d.y /= l;
    var p = { x: d.y, y: -d.x };
    tangentLine.p1.x = p2.x - p.x * 500;
    tangentLine.p1.y = p2.y - p.y * 500;
    tangentLine.p2.x = p2.x + p.x * 500;
    tangentLine.p2.y = p2.y + p.y * 500;
}

var lineD =
        { x1: function(d) { return d.p1.x; },
          x2: function(d) { return d.p2.x; },
          y1: function(d) { return d.p1.y; },
          y2: function(d) { return d.p2.y; } };

var pointToCursor = svg.append("line")
        .datum(cursorLine)
        .attrs(lineD)
        .attrs({ stroke: "black", fill: "none", "stroke-dasharray": "2 2"});

var tangentAtCursor = svg.append("line")
        .datum(tangentLine)
        .attrs(lineD)
        .attrs({ stroke: "black", fill: "none"});

var point = svg.append("circle")
        .datum(p1)
        .attr("r", 5)
        .attr("transform", translateD)
        .attr("cursor", "pointer")
        .call(drag);
