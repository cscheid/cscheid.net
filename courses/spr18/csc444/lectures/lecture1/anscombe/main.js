//////////////////////////////////////////////////////////////////////////////
// The data

var anscombe = [
    { x1: 10.0, y1: 8.04,  x2: 10.0, y2: 9.14, x3: 10.0, y3: 7.46,  x4: 8.0,  y4: 6.58 }, 
    { x1: 8.0,  y1: 6.95,  x2: 8.0,  y2: 8.14, x3: 8.0,  y3: 6.77,  x4: 8.0,  y4: 5.76 }, 
    { x1: 13.0, y1: 7.58,  x2: 13.0, y2: 8.74, x3: 13.0, y3: 12.74, x4: 8.0,  y4: 7.71 }, 
    { x1: 9.0,  y1: 8.81,  x2: 9.0,  y2: 8.77, x3: 9.0,  y3: 7.11,  x4: 8.0,  y4: 8.84 }, 
    { x1: 11.0, y1: 8.33,  x2: 11.0, y2: 9.26, x3: 11.0, y3: 7.81,  x4: 8.0,  y4: 8.47 }, 
    { x1: 14.0, y1: 9.96,  x2: 14.0, y2: 8.10, x3: 14.0, y3: 8.84,  x4: 8.0,  y4: 7.04 }, 
    { x1: 6.0,  y1: 7.24,  x2: 6.0,  y2: 6.13, x3: 6.0,  y3: 6.08,  x4: 8.0,  y4: 5.25 }, 
    { x1: 4.0,  y1: 4.26,  x2: 4.0,  y2: 3.10, x3: 4.0,  y3: 5.39,  x4: 19.0, y4: 12.50 },
    { x1: 12.0, y1: 10.84, x2: 12.0, y2: 9.13, x3: 12.0, y3: 8.15,  x4: 8.0,  y4: 5.56 }, 
    { x1: 7.0,  y1: 4.82,  x2: 7.0,  y2: 7.26, x3: 7.0,  y3: 6.42,  x4: 8.0,  y4: 7.91 }, 
    { x1: 5.0,  y1: 5.68,  x2: 5.0,  y2: 4.74, x3: 5.0,  y3: 5.73,  x4: 8.0,  y4: 6.89 }
];

var groups = [
    { x: "x1", y: "y1", group: "1" },
    { x: "x2", y: "y2", group: "2" },
    { x: "x3", y: "y3", group: "3" },
    { x: "x4", y: "y4", group: "4" }
];

//////////////////////////////////////////////////////////////////////////////
// summaries

function createSummaries()
{
    var summaries = groups.map(function(group) {
        var xMean = d3.mean(anscombe, function(datum) { return datum[group.x]; }),
            yMean = d3.mean(anscombe, function(datum) { return datum[group.y]; }),
            xVar = d3.variance(anscombe, function(datum) { return datum[group.x]; }),
            yVar = d3.variance(anscombe, function(datum) { return datum[group.x]; }),
            cov = d3.mean(anscombe, function(datum) {
                // Cov[X, Y] = E[(x - E[X])(y - E[Y])]
                var x = datum[group.x], y = datum[group.y];
                return (x - xMean) * (y - yMean);
            });
        return {
            "group":       group.group,
            "x mean":      xMean,
            "y mean":      yMean,
            "x median":    d3.median(anscombe, function(datum) { return datum[group.x]; }),
            "y median":    d3.median(anscombe, function(datum) { return datum[group.y]; }),
            "x variance":  xVar,
            "y variance":  yVar,
            "correlation": cov / (Math.sqrt(xVar * yVar))
        };
    });

    var body = d3.select("#summariesDiv")
            .append("table").append("tbody");
    var  cols = ["group", "x mean", "y mean", "x median", "y median", "x variance", "y variance", "correlation"];
    body.append("tr")
        .selectAll("td")
        .data(cols)
        .enter().append("td")
        .text(function(d) { return d; });

    var fmt = d3.format(".2f");
    var trs = body.selectAll("tr.empty")
            .data(summaries)
            .enter()
            .append("tr")
            .selectAll("td")
            .data(function (d) {
                return cols.map(function(col) {
                    if (col === "group") {
                        return d[col];
                    } else {
                        return fmt(d[col]);
                    }
                });
            })
            .enter().append("td")
            .text(function(d) { return d; });
}

//////////////////////////////////////////////////////////////////////////////
// plots

function createPlots()
{
    var width = 350;
    var height = 350;
    var margin = 20;

    var plotDivs = d3.select("#plots")
            .selectAll("div")
            .data(groups)
            .enter()
            .append("div")
            .style("float", "left");
    
    plotDivs.append("div").text(function(d) { return "Group " + d.group; });
    
    var plotSvgs = plotDivs
            .append("svg").attr("width", width).attr("height", height).classed("anscombe", true);

    plotSvgs.append("rect").classed("bg", true)
        .attr("x", margin)
        .attr("y", margin)
        .attr("width", width - margin * 2)
        .attr("height", height - margin * 2);

    var x = d3.scaleLinear().domain([3, 20]).range([margin, width - margin]);
    var y = d3.scaleLinear().domain([2, 14]).range([height - margin, margin]);

    plotSvgs.selectAll("circle")
        .data(function (plot) {
            return anscombe.map(function (datum) {
                return { x: datum[plot.x], y: datum[plot.y] };
            });
        })
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .attr("r", 5);

    var yAxis = d3.axisLeft(y).ticks(5), xAxis = d3.axisBottom(x).ticks(5);
    function translate(x, y) { return "translate(" + x + ", " + y + ")"; };
    plotSvgs.append("g")
        .attr("transform", translate(0, height-margin))
        .call(xAxis);
    plotSvgs.append("g")
        .attr("transform", translate(margin, 0))
        .call(yAxis);
}

//////////////////////////////////////////////////////////////////////////////

createSummaries();
createPlots();
