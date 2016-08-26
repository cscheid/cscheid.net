function createPaths(endpoints, subdivisionCount)
{
    var paths = endpoints.map(function(endpoint) {
        var begin = endpoint.begin, end = endpoint.end;
        var scale = d3.scaleLinear().domain([0,1]).range([endpoint.begin, endpoint.end]);
        return d3.range(subdivisionCount+1).map(function(i) {
            return copy(scale(i/subdivisionCount));
        });
    });

    var x = d3.scaleLinear().domain([0, 1]).range([0, 400]);
    var y = d3.scaleLinear().domain([1, 0]).range([0, 400]);
    var curves, nodes;
    var svg;
    
    function dragstarted() {
    }
    function dragged(d) {
        d.x = x.invert(d3.event.sourceEvent.offsetX);
        d.y = y.invert(d3.event.sourceEvent.offsetY);
        result.drawPlainView(svg);
    }
    function dragended() {
    }
    
    var result = {
        paths: paths,
        createDOM: function(sel) {
            svg = sel;
            curves = sel.append("g");
            curves.selectAll("path")
                .data(paths)
                .enter().append("path");
            nodes = sel.append("g").selectAll("g")
                .data(paths).enter().append("g");
            nodes.selectAll("circle").data(identity)
                .enter().append("circle").style("cursor", "pointer")
                .call(d3.drag()
                       .on("start", dragstarted)
                       .on("drag", dragged)
                       .on("end", dragended));
        },
        drawPlainView: function(sel) {
            var xf = function(d) { return x(d.x); };
            var yf = function(d) { return y(d.y); };
            var curve = d3.line().x(xf).y(yf);
            var color = d3.scaleLinear().domain([0, subdivisionCount-1])
                    .range(["red", "orange"]);

            curves.selectAll("path")
                .attr("d", curve);
            nodes.selectAll("circle")
                .attr("cx", xf)
                .attr("cy", yf)
                .attr("r", function(d, i) {
                    if (i === 0 || i === subdivisionCount)
                        return 5;
                    else
                        return 3;
                })
                .attr("stroke", null).attr("fill", function(d, i) { return color(i); });
        },
        updateShorteningFlow: function(strength) {
            paths.forEach(function(path) {
                var result = [];
                for (var i=1; i<subdivisionCount; ++i) {
                    var before = path[i-1], after = path[i+1];
                    result[i] = { x: (strength * (before.x + after.x) / 2 + (1-strength) * path[i].x),
                                  y: (strength * (before.y + after.y) / 2 + (1-strength) * path[i].y) };
                }
                for (i=1; i<subdivisionCount; ++i) {
                    path[i].x = result[i].x;
                    path[i].y = result[i].y;
                }
            });
        },
        updatePathRepulsion: function(strength) {
            var i, j;
            var deltas = [];
            for (i=0; i<paths.length; ++i) {
                var path_deltas = [];
                for (j=0; j<paths[i].length; ++j) {
                    path_deltas.push({ x: 0, y: 0 });
                }
                deltas.push(path_deltas);
            }
            for (i=0; i<paths.length-1; ++i) {
                var pi = paths[i];
                for (j=i+1; j<paths.length; ++j) {
                    var pj = paths[j];
                    for (var k=1; k<paths[i].length-1; ++k) { // skip path boundaries
                        var dx = pi[k].x - pj[k].x;
                        var dy = pi[k].y - pj[k].y;
                        var dd = 1.0 / (dx * dx + dy * dy);
                        deltas[i][k].x += strength * dx * dd;
                        deltas[i][k].y += strength * dy * dd;
                        deltas[j][k].x -= strength * dx * dd;
                        deltas[j][k].y -= strength * dy * dd;
                    }
                }
            }
            for (i=0; i<deltas.length; ++i) {
                for (j=0; j<deltas[i].length; ++j) {
                    paths[i][j].x += deltas[i][j].x;
                    paths[i][j].y += deltas[i][j].y;
                }
            }
        }
    };
    return result;
}

//////////////////////////////////////////////////////////////////////////////

var subdivisions = 20;
var shorteningStrength = 1.0;
var repulsionStrength = 0.0015;

//////////////////////////////////////////////////////////////////////////////

var svg = d3.select("#main")
        .append("svg")
        .attr("width", 400)
        .attr("height", 400);

d3.timer(function() {
    paths.updateShorteningFlow(shorteningStrength);
    paths.updatePathRepulsion(repulsionStrength);
    paths.drawPlainView(svg);
}, 200);

d3.select("#buttons").append("button").text("Reset").on("click", function() {
    paths.paths.forEach(function(path) {
        var begin = path[0], end = path[path.length-1];
        var scale = d3.scaleLinear().domain([0,1]).range([begin, end]);
        for (var i=0; i<=subdivisions; ++i) {
            var s = scale(i/subdivisions);
            path[i].x = s.x;
            path[i].y = s.y;
        }
    });
});

var paths = createPaths([{ begin: { x: 0.1, y: 0.1 },
                           end: { x: 0.6, y:0.6 } },
                         { begin: { x: 0.8, y: 0.2 },
                           end: { x: 0.2, y: 0.8 } }], subdivisions);

paths.createDOM(svg);
paths.drawPlainView(svg);

function identity(x) { return x; }
function copy(x) { return Object.assign({}, x); }
