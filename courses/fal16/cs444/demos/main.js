// http://cscheid.net/license.html

function main()
{
    var svg = d3.select("#main")
            .append("div")
            .style("margin", "0 auto")
            .append("svg").style("display", "block").style("margin", "auto").attr("width", 400).attr("height", 400);
    
    var u = 0.0;
    var xScale = d3.scaleLinear();
    var yScale = d3.scaleLinear();
    function xAccessor(d) {
        return u * d['x-dino'] + (1-u) * d.x;
    }
    function yAccessor(d) {
        return u * d['y-dino'] + (1-u) * d.y;
    }
    var xExtent, xDinoExtent, yExtent, yDinoExtent;

    var attrs = [["x mean", "xMean"],
                 ["y mean", "yMean"],
                 ["x standard deviation", "xStdev"],
                 ["y standard deviation", "yStdev"],
                 ["Correlation", "correlation"]];

    d3.select("#the_summaries")
        .append("ul")
        .selectAll("li")
        .data([0,1,2,3,4])
        .enter()
        .append("li")
        .text(function(d) { return attrs[d][0] + ": "; })
        .append("span")
        .attr("id", function(d) { return attrs[d][1]; });

    function rescale() {
        xScale.domain([xExtent[0] * (1-u) + xDinoExtent[0] * u, xExtent[1] * (1-u) + xDinoExtent[1] * u]);
        yScale.domain([yExtent[0] * (1-u) + yDinoExtent[0] * u, yExtent[1] * (1-u) + yDinoExtent[1] * u]);
    }
    var dino;
    function recomputeSummaries() {
        var ex = d3.mean(dino, xAccessor);
        var ey = d3.mean(dino, yAccessor);
        var exx = d3.mean(dino, function(d) { var r = xAccessor(d); return r * r; });
        var eyy = d3.mean(dino, function(d) { var r = yAccessor(d); return r * r; });
        var exy = d3.mean(dino, function(d) { return xAccessor(d) * yAccessor(d); });
        var varx = exx - ex * ex;
        var vary = eyy - ey * ey;
        var cov = exy - ex * ey;

        var fmt = d3.format(".2f");
        d3.select("#xMean").text(fmt(ex));
        d3.select("#yMean").text(fmt(ey));
        d3.select("#xStdev").text(fmt(Math.pow(varx, 0.5)));
        d3.select("#yStdev").text(fmt(Math.pow(vary, 0.5)));
        d3.select("#correlation").text(fmt(cov / Math.pow(varx * vary, 0.5)));
    }
    
    d3.csv("DinoAndNotDinoData.csv")
      .then(function(data) {
        dino = data;
        xExtent = d3.extent(data, function(d) { return d.x; });
        xDinoExtent = d3.extent(data, function(d) { return d['x-dino']; });
        yExtent = d3.extent(data, function(d) { return d.y; });
        yDinoExtent = d3.extent(data, function(d) { return d['y-dino']; });

        rescale();

        xScale.range([20, 380]);
        yScale.range([380, 20]);
       
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(xAccessor(d)); })
            .attr("cy", function(d) { return yScale(yAccessor(d)); })
            .attr("r", 5)
            .classed("dot", true);

        recomputeSummaries();
    });

    function flip() {
        var oldValue = u, newValue = 1 - u;
        var circles = svg.selectAll("circle");

        d3.select("body")
            .transition()
            .duration(1000)
            .tween("side-effects", function() {
                var node = this;
                return function(t) {
                    u = t * newValue + (1-t) * oldValue;
                    rescale();
                    circles
                        .attr("cx", function(d) { return xScale(xAccessor(d)); })
                        .attr("cy", function(d) { return yScale(yAccessor(d)); });
                    recomputeSummaries();
                };
            });
    };
    d3.select("#buttons").append("button").text("change columns")
        .on("click", flip);

    function flipRecur() {
        window.setTimeout(function() {
            flip();
            flipRecur();
        }, 2500);
    }
    flipRecur();
}

main();
