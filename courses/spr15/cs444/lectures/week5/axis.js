d3.csv("../../assignment_4/calvinCollegeSeniorScores.csv", function(csv) {
    for (var i=0; i<csv.length; ++i) {
        csv[i].GPA = Number(csv[i].GPA);
        csv[i].SATM = Number(csv[i].SATM);
        csv[i].SATV = Number(csv[i].SATV);
        csv[i].ACT = Number(csv[i].ACT);
    }
    var satmExtent = d3.extent(csv, function(row) { return row.SATM; });
    var satvExtent = d3.extent(csv, function(row) { return row.SATV; });

    var satExtents = {
        "SATM": satmExtent,
        "SATV": satvExtent
    };

    var actExtent = d3.extent(csv, function(row) { return row.ACT; });
    var xScale = d3.scale.linear().domain(satmExtent).range([30, 570]);
    var yScale = d3.scale.linear().domain(actExtent).range([570, 30]);
    var xAxis = d3.svg.axis().scale(xScale);
    var yAxis = d3.svg.axis().scale(yScale);

    yAxis.orient("left");
    d3.select("svg")
        .selectAll("circle")
        .data(csv)
        .enter()
        .append("circle")
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("cx", function(d) { return xScale(d.SATM); })
        .attr("cy", function(d) { return yScale(d.ACT); })
        .attr("r", 5);

    var xAxisSel = 
    d3.select("svg") // or something else that selects the SVG element in your visualizations
        .append("g") // create a group node
        .attr("transform", "translate(0, 570)")
        .call(xAxis); // call the axis generator

    d3.select("svg") // or something else that selects the SVG element in your visualizations
        .append("g") // create a group node
        .attr("transform", "translate(30, 0)")
	.call(yAxis); // call the axis generator

    var current = "SATM";
    d3.select("#currentScore").text(current);
    
    d3.select("#switch")
        .on("click", function() {
            if (current === "SATM") {
                current = "SATV";
            } else {
                current = "SATM";
            }

            d3.select("#currentScore").text(current);
            xAxisSel.call(xAxis);
            xScale.domain(satExtents[current]);
            d3.select("svg")
                .selectAll("circle")
                .attr("cx", function(d) { return xScale(d[current]); });
        });
});
