
function gridExtent(d) {
    return [Math.min(d.NW, d.NE, d.SW, d.SE),
            Math.max(d.NW, d.NE, d.SW, d.SE)];
}

//////////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries

var svgSize = 490;
var bands = 49;

var xScale = d3.scaleLinear().domain([0, bands]).  range([0, svgSize]);
var yScale = d3.scaleLinear().domain([-1,bands-1]).range([svgSize, 0]);

function createSvg(sel)
{
    return sel
        .append("svg")
        .attr("width", svgSize)
        .attr("height", svgSize);
}

function createGroups(data) {
    return function(sel) {
        return sel
            .append("g")
            .selectAll("rect")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function(d) {
                return "translate(" + xScale(d.Col) + "," + yScale(d.Row) + ")";
            });
    };
}

d3.selection.prototype.callReturn = function(callable)
{
    return callable(this);
};

//////////////////////////////////////////////////////////////////////////////

function polarity(d, value) {
    var result = {
        NW: d.NW < value ? 0 : 1,
        NE: d.NE < value ? 0 : 1,
        SW: d.SW < value ? 0 : 1,
        SE: d.SE < value ? 0 : 1
    };
    result.case = result.NW + result.NE * 2 + result.SW * 4 + result.SE * 8;
    return result;
}

// currentContour is a global variable which stores the value
// of the contour we are currently extracting

var currentContour;
function includesOutlineContour(d) {
    var extent = gridExtent(d);
    return currentContour >= extent[0] && currentContour <= extent[1];
}

function includesFilledContour(d) {
    // WRITE THIS PART.
}

function generateOutlineContour(d) {
    // HINT: you should set up scales which, given a contour value, go
    // along positions in the boundary of the square
    var wScale = d3.scaleLinear();
    var eScale = d3.scaleLinear();
    var nScale = d3.scaleLinear();
    var sScale = d3.scaleLinear();
    switch (polarity(d, currentContour).case) {
        // WRITE THIS PART.
    }
}

function generateFilledContour(d) {
    // HINT: you should set up scales which, given a contour value, go
    // along positions in the boundary of the square
    var wScale = d3.scaleLinear();
    var eScale = d3.scaleLinear();
    var nScale = d3.scaleLinear();
    var sScale = d3.scaleLinear();
    switch (polarity(d, currentContour).case) {
        // WRITE THIS PART.
    }
}

function createOutlinePlot(minValue, maxValue, steps, sel)
{
    var contourScale = d3.scaleLinear().domain([1, steps]).range([minValue, maxValue]);
    for (var i=1; i<=steps; ++i) {
        currentContour = contourScale(i);
        sel.filter(includesOutlineContour).append("path")
            .attr("transform", "translate(0, 10) scale(1, -1)") // ensures that positive y points up
            .attr("d", generateOutlineContour)
            .attr("fill", "none")
            .attr("stroke", "black");
    }
}

function createFilledPlot(minValue, maxValue, steps, sel, colorScale)
{
    var contourScale = d3.scaleLinear().domain([1, steps]).range([minValue, maxValue]);
    for (var i=steps; i>=1; --i) {
        currentContour = contourScale(i);
        sel.filter(includesFilledContour).append("path")
            .attr("transform", "translate(0, 10) scale(1, -1)") // ensures that positive y points up
            .attr("d", generateFilledContour)
            .attr("fill", function(d) { return colorScale(currentContour); });
    }
}

var plot1T = d3.select("#plot1-temperature")
        .callReturn(createSvg)
        .callReturn(createGroups(temperatureCells));
var plot1P = d3.select("#plot1-pressure")
        .callReturn(createSvg)
        .callReturn(createGroups(pressureCells));

createOutlinePlot(-70, -60, 10, plot1T);
createOutlinePlot(-500, 200, 10, plot1P);

var plot2T = d3.select("#plot2-temperature")
        .callReturn(createSvg)
        .callReturn(createGroups(temperatureCells));
var plot2P = d3.select("#plot2-pressure")
        .callReturn(createSvg)
        .callReturn(createGroups(pressureCells));

createFilledPlot(-70, -60, 10, plot2T, d3.scaleLinear().domain([-70, -60]).range(["blue", "red"]));
createFilledPlot(-500, 200, 10, plot2P, d3.scaleLinear().domain([-500, 0, 500]).range(["#ca0020", "#f7f7f7", "#0571b0"]));
