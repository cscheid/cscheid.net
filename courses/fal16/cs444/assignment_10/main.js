//////////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries

var svgSize = 500;
var bands = 50;

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
            .selectAll("*")
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
// PART 1

var colorScale = d3.scaleLinear().domain([0, 2]).range(["white", "red"]);
var magColor = d3.select("#plot1-color")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

// WRITE THIS PART
magColor.append("rect")...;

//////////////////////////////////////////////////////////////////////////////
// PART 2

var hedgehog = d3.select("#plot1-hedgehog")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

// WRITE THIS PART
hedgehog.append("line")...;

//////////////////////////////////////////////////////////////////////////////
// PART 3

var unifGlyph = d3.select("#plot1-uniform")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

unifGlyph.append("g")
    .attr("transform", function(d) {
        // WRITE THIS PART
    })....append("path")...; // WRITE THIS PART

//////////////////////////////////////////////////////////////////////////////
// PART 4

var randomGlyph = d3.select("#plot1-random")
        .callReturn(createSvg)
        .callReturn(createGroups(data));

randomGlyph.append("g")
    .attr("transform", function(d) {
        // WRITE THIS PART
    })....append("path")...; // WRITE THIS PART
