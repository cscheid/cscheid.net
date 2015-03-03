function randomGrid(sz)
{
    var result = [];
    for (var i=0; i<sz; ++i) {
        var inner = [];
        result.push(inner);
        for (var j=0; j<sz; ++j) {
            inner.push(~~(Math.random() * 2));
        }
    }
    return result;
}

function createSel(id) {
    return d3.select(id).append("svg")
        .attr({ width: 430, height: 400 })
        .selectAll("g")
        .data(r)
        .enter()
        .append("g")
        .selectAll("g")
        .data(function(i) { return i; })
        .enter()
        .append(function(d) { 
            var t = d ? "circle" : "rect"; 
            return document.createElementNS("http://www.w3.org/2000/svg", t);
        }).attr("cx", function(d, i, j) {
            if (this.nodeName !== "circle") return null;
            return i * 40 + 20;
        }).attr("cy", function(d, i, j) {
            if (this.nodeName !== "circle") return null;
            return j * 40 + 20;
        }).attr("r", function(d, i, j) {
            if (this.nodeName !== "circle") return null;
            return 12.5;
        }).attr("x", function(d, i, j) {
            if (this.nodeName !== "rect") return null;
            return i * 40 + 7.5;
        }).attr("y", function(d, i, j) {
            if (this.nodeName !== "rect") return null;
            return j * 40 + 7.5;
        }).attr("width", function(d, i, j) {
            if (this.nodeName !== "rect") return null;
            return 25;
        }).attr("height", function(d, i, j) {
            if (this.nodeName !== "rect") return null;
            return 25;
        });
}

var r = randomGrid(10);
