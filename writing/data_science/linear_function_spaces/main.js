/*global cscheid */

function drawingSurface(opts)
{
    var width = opts.width || 600;
    var height = opts.height || 300;
    var element = opts.element || cscheid.debug.die("element parameter is required");
    
    var svg = element.append("svg")
            .attr("width", width)
            .attr("height", height);

    var xScale = opts.xScale || d3.scaleLinear().domain([-1.1, 1.1]);
    xScale.range([0, width]);
    var yScale = opts.yScale || d3.scaleLinear().domain([-0.55, 0.55]);
    yScale.range([height, 0]);

    var axisGroup = svg.append("g");
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    var xAxisGroup = axisGroup
            .append("g")
            .attr("transform", cscheid.svg.translate(0, yScale(0)));
    var yAxisGroup = axisGroup
            .append("g")
            .attr("transform", cscheid.svg.translate(xScale(0), 0));
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    return {
        svg: svg,
        xScale: xScale,
        yScale: yScale,
        addFunction: function(f, steps) {
            if (!_.isArray(f))
                f = [f];
            steps = steps || 100;
            var s = d3.scaleLinear().domain([0, steps]).range(xScale.domain());
            var data = d3.range(steps+1);
            return svg.append("g").selectAll("path")
                .data(f)
                .enter().append("path")
                .attr("d", f => {
                    var lineGenerator = d3.line()
                            .x(d => xScale(s(d)))
                            .y(d => yScale(f(s(d))));
                    return lineGenerator(data);
                });
        },
        addText: function(text, x, y) {
            return svg.append("text").text(text)
                .attr("class", "annotation")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("x", xScale(x))
                .attr("y", yScale(y));
        }
    };
}

//////////////////////////////////////////////////////////////////////////////

function linearFunctionSpace(basis, weightParam)
{
    var d = basis.length;
    var weights = new Float64Array(d);
    
    var f = function(x) {
        var result = 0;
        for (var i=0; i<d; ++i)
            result += basis[i](x) * weights[i];
        return result;
    };
    f.setWeights = function(weightParam) {
        for (var i=0; i<d; ++i) {
            weights[i] = weightParam[i];
        }
    };

    if (weightParam !== undefined) {
        cscheid.debug.assert(basis.length === weightParam.length,
                             "need basis and weight vector to have the same length");
        f.setWeights(weightParam);
    }
    return f;
}

//////////////////////////////////////////////////////////////////////////////

var linearFunctions = drawingSurface({
    element: d3.select("#linear-functions"),
    xScale: d3.scaleLinear().domain([-2.1, 2.1]),
    yScale: d3.scaleLinear().domain([-1.1, 1.1])
});
linearFunctions.addFunction(x => 1, 1)
    .attr("stroke", "blue")
    .attr("stroke-width", "1px");

linearFunctions.addText("f(x) = 1", 1.8, 0.9);

linearFunctions.addFunction(x => x, 1)
    .attr("stroke", "red")
    .attr("stroke-width", "1px");
linearFunctions.addText("f(x) = x", -0.5, -0.3);

linearFunctions.addFunction(x => 0.5 + 0.5 * x, 1)
    .attr("stroke", "black")
    .attr("stroke-width", "2px");
linearFunctions.addText("f(x) = (x + 1)/2", -1.3, 0.1);

//////////////////////////////////////////////////////////////////////////////
// runge phenomenon

var rungeChart = drawingSurface({
    element: d3.select("#runge-phenomenon"),
    xScale: d3.scaleLinear().domain([-1.1, 1.1]),
    yScale: d3.scaleLinear().domain([-0.4, 1.2])
});
var runge = x=>1/(x * x * 25 + 1);
function sample(min, max, f, count) {
    var s = d3.scaleLinear().domain([0, count-1]).range([min, max]);
    var vs = d3.range(count);
    return {xs: vs.map(x => s(x)),
            ys: vs.map(x => f(s(x)))};
}
var deg3runge  = cscheid.approximation.polynomial(sample(-1, 1, runge, 4), 3);
var deg7runge  = cscheid.approximation.polynomial(sample(-1, 1, runge, 8), 7);
var deg11runge = cscheid.approximation.polynomial(sample(-1, 1, runge, 12), 11);
var runges = [x => deg3runge.predict(x),
              x => deg7runge.predict(x),
              x => deg11runge.predict(x) ];
              
rungeChart.addFunction(runges, 600)
    .attr("stroke", (d, i) => d3.hcl(0,0,80 - i * 30))
    .attr("stroke-width", (d, i) => String(i+1) + "px")
    .attr("fill", "none");
rungeChart.addFunction(runge, 600)
    .attr("stroke", "red")
    .attr("stroke-width", "3px")
    .attr("fill", "none");

//////////////////////////////////////////////////////////////////////////////

var squareKernel = function(x) {
    if (x < -0.5) return 0;
    if (x > 0.5) return 0;
    return 1;
};
var bspline0 = squareKernel;

function shift(f, i) {
    return function(x) {
        return f(x-i);
    };
}

var squareFunctions = drawingSurface({
    element: d3.select("#square-functions"),
    xScale: d3.scaleLinear().domain([-1.6, 1.6]),
    yScale: d3.scaleLinear().domain([-0.1, 1.1])
});

var shiftColorScale = d3.scaleLinear()
        .domain([-2, 2])
        .range([d3.lab(60, 30, -30), d3.lab(60, 30, 30)])
        .interpolate(d3.interpolateLab);
squareFunctions.addFunction([shift(squareKernel, -1),
                             shift(squareKernel, 0),
                             shift(squareKernel, 1)], 600)
    .attr("stroke", (f, i) => shiftColorScale(i-1))
    .attr("fill", "none")
    .attr("stroke-width", "1px");
var f = linearFunctionSpace([-1,0,1].map(x => shift(squareKernel, x)), [0.2, 0.6, 0.4]);
squareFunctions.addFunction(f, 600)
    .attr("stroke", d3.lab(60,-30,0))
    .attr("fill", "none")
    .attr("stroke-width", "2px");

function rangeKernel(mn, mx) {
    var c = 1/(mx - mn);
    return (x => {
        // semi-open interval to avoid double-counting on edges
        if (x <= mn) return 0;
        if (x > mx) return 0;
        return c;
    });
}
function uniformLFS(mn, mx, steps) {
    var result = [];
    var r = mx - mn, step = r / steps;
    for (var i=0; i<steps; ++i) {
        result.push(rangeKernel(mn + i * step, mn + (i + 1) * step));
    }
    return result;
}
var squareRunge = drawingSurface({
    element: d3.select("#square-runge"),
    xScale: d3.scaleLinear().domain([-1.1, 1.1]),
    yScale: d3.scaleLinear().domain([-0.4, 1.2])
});

var sq3runge  = cscheid.approximation.leastSquaresLFS(
    sample(-1, 1, runge, 4),  uniformLFS(-4/3, 4/3, 4));
var sq7runge  = cscheid.approximation.leastSquaresLFS(
    sample(-1, 1, runge, 8),  uniformLFS(-8/7, 8/7, 8));
var sq11runge = cscheid.approximation.leastSquaresLFS(
    sample(-1, 1, runge, 12), uniformLFS(-12/11, 12/11, 12));
var sqrunges = [x => sq3runge.predict(x),
                x => sq7runge.predict(x),
                x => sq11runge.predict(x)];
squareRunge.addFunction(sqrunges,  600)
    .attr("stroke", (f, i) => d3.hcl(0,0,80-i*30))
    .attr("fill", "none")
    .attr("stroke-width", (f, i) => String(i+1) + "px");

//////////////////////////////////////////////////////////////////////////////

var bspline0drawing = drawingSurface({
    element: d3.select("#bspline-0"),
    xScale: d3.scaleLinear().domain([-3.1, 3.1]),
    yScale: d3.scaleLinear().domain([-0.1, 1.1])
});
[-2,-1,0,1,2].forEach(i => {
    bspline0drawing.addFunction(x => bspline0(x-i), 600)
        .attr("stroke", shiftColorScale(i))
        .attr("fill", "none")
        .attr("stroke-width", "3px");
});

function bspline1(x) {
    if (x < -1) return 0;
    if (x < 0) return 1 + x;
    if (x < 1) return 1 - x;
    return 0;
}
var bspline1drawing = drawingSurface({
    element: d3.select("#bspline-1"),
    xScale: d3.scaleLinear().domain([-3.1, 3.1]),
    yScale: d3.scaleLinear().domain([-0.1, 1.1])
});
[-2,-1,0,1,2].forEach(i => {
    bspline1drawing.addFunction(x => bspline1(x-i), 600)
        .attr("stroke", shiftColorScale(i))
        .attr("fill", "none")
        .attr("stroke-width", "3px");
});

function bspline2(x) {
    x += 3/2;
    if (x < 0) return 0;
    if (x < 1) return x * x / 2;
    if (x < 2) return ((-2) * x * x + 6 * x - 3) / 2;
    if (x < 3) return (3 - x) * (3 - x) / 2;
    return 0;
}
var bspline2drawing = drawingSurface({
    element: d3.select("#bspline-2"),
    xScale: d3.scaleLinear().domain([-3.1, 3.1]),
    yScale: d3.scaleLinear().domain([-0.1, 1.1])
});
[-2,-1,0,1,2].forEach(i => {
    bspline2drawing.addFunction(x => bspline2(x-i), 600)
        .attr("stroke", shiftColorScale(i))
        .attr("fill", "none")
        .attr("stroke-width", "3px");
});
[{ el: bspline0drawing, f: bspline0 },
 { el: bspline1drawing, f: bspline1 },
 { el: bspline2drawing, f: bspline2 }].forEach(obj => {
     var f = linearFunctionSpace([-2,-1,0,1,2].map(s => shift(obj.f, s)),
                                 [0.4, 0.3, 0.5, 0.7, 0.6]);
     obj.el.addFunction(f, 600)
         .attr("stroke", d3.lab(60, -30, 0))
         .attr("fill", "none")
         .attr("stroke-width", "5px");
 });
