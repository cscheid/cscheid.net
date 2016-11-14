var data   = scores;

// brush1 and brush2 will store the extents of the brushes,
// if brushes exist respectively on scatterplot 1 and 2.
//
// if either brush does not exist, brush1 and brush2 will
// hold the null value.

var brush1 = null;
var brush2 = null;

function makeScatterplot(sel, xAccessor, yAccessor)
{
    var svg = sel
            .append("svg")
            .attr("width", 500).attr("height", 500);

    var xScale; // create a scale for the x axis
    var yScale; // create a scale for the y axis

    var brush = d3.brush();

    svg.append("g")
        .attr("class", "brush")
        .call(brush);
    
    svg.append("g")
        .selectAll("circle")
    // finish writing the circle creation here.
    // this *must* be done *after* adding the brush group.
    ;

    var xAxis; // create an axis object for the x axis
    var yAxis; // create an axis object for the y axis

    return {
        svg: svg,
        brush: brush,
        xScale: xScale,
        yScale: yScale
    };
}

//////////////////////////////////////////////////////////////////////////////

plot1 = makeScatterplot(d3.select("#scatterplot_1"),
                        function(d) { return d.SATM; },
                        function(d) { return d.SATV; });
plot2 = makeScatterplot(d3.select("#scatterplot_2"),
                        function(d) { return d.ACT; },
                        function(d) { return d.GPA; });

//////////////////////////////////////////////////////////////////////////////

function onBrush() {
    var allCircles = d3.select("body").selectAll("circle");
    if (brush1 === null && brush2 === null) {
        // write this.
        return;
    }
    
    function isSelected(d) {
        // write this.
    }
    
    var selected = circles
            .filter(isSelected)
            .attr("fill", "red");
    var notSelected = circles
            .filter(function(d) { return !isSelected(d); })
            .attr("fill", "lightgray");
}

//////////////////////////////////////////////////////////////////////////////
//
// d3 brush selection
//
// The "selection" of a brush is the range of values in either of the
// dimensions that an existing brush corresponds to. The brush selection
// is available in the d3.event.selection object.
// 
//   e = d3.event.selection
//   e[0][0] is the minimum value in the x axis of the brush
//   e[1][0] is the maximum value in the x axis of the brush
//   e[0][1] is the minimum value in the y axis of the brush
//   e[1][1] is the maximum value in the y axis of the brush
//
// The most important thing to know about the brush selection is that
// it stores values in *PIXEL UNITS*. Your logic for highlighting
// points, however, is not based on pixel units: it's based on data
// units.
//
// In order to convert between the two of them, remember that you have
// the d3 scales you created with the makeScatterplot function above.
// The final thing you need to know is that d3 scales have a function
// to *invert* a mapping: if you create a scale like this:
//
//  s = d3.scaleLinear().domain([5, 10]).range([0, 100])
//
// then s(7.5) === 50, and s.invert(50) === 7.5. In other words, the
// scale object has a method invert(), which converts a value in the
// range to a value in the domain. This is exactly what you will need
// to use in order to convert pixel units back to data units.

function updateBrush1() {
    brush1 = d3.event.selection;
    onBrush();
}

function updateBrush2() {
    brush2 = d3.event.selection;
    onBrush();
}

plot1.brush
    .on("brush", updateBrush1)
    .on("end", updateBrush1);

plot2.brush
    .on("brush", updateBrush2)
    .on("end", updateBrush2);
