var rustPolya;

function traceMany(svg, urn, nSteps, traceFun)
{
    const width = 400;
    const height = 400;
    const nCurves = 50;
    const margin = 20;
    traceFun = traceFun || rustPolya.trace_urn;

    svg.attr("width", width + 2 * margin)
        .attr("height", height + 2 * margin);


    let xScale = d3.scaleLinear()
        .domain([0, nSteps])
        .range([0, width]);
    let yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([height + margin, margin]);
    let lineGen = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d));

    let axisGroup = svg.append("g");
    let axis = d3.axisRight(yScale).ticks(3);
    axisGroup.attr("transform", `translate(${xScale(nSteps-1)},0)`)
        .call(axis);

    let lines = d3.range(nCurves).map(i => {
        let u = Math.random(), v = Math.random();
        // simulate a draw from a triangular PDF
        let d = u < v ? 1-u : u;
        return {
            trace: traceFun(urn, nSteps).trace,
            delay: d
        };
    });
    
    var curves = svg.append("g")
        .selectAll("path")
        .data(lines)
        .enter()
        .append("path")
        .classed("trace", true)
        .attr('d', d => lineGen(d.trace))
        .each(function(d) {
            d.totalLength = this.getTotalLength();
        })
        .attr("stroke-dasharray", d => d.totalLength + " " + d.totalLength)
        .attr("stroke-dashoffset", d => d.totalLength)
    ;

    curves.transition()
        .duration(2000)
        .delay((d, i) => {
            if (i < 5) {
                return i * 1500;
            } else {
                return 7500 + d.delay * 2000;
            }
        })
        .attr("stroke-dashoffset", 0);
}

function drawHeatmap(svg, urn, nSteps, drawFun)
{
    const width = 400;
    const height = 400;
    const nRuns = 5000;
    const resolution = 50;
    drawFun = drawFun || rustPolya.update_urn_heatmap;

    var heatmap = drawFun(
        rustPolya.make_heatmap(resolution, nSteps),
        urn, nRuns);

    var maxByX = [];
    for (var i=0; i<resolution; ++i) {
        maxByX.push(d3.max(heatmap.heatmap, a => a[i]));
    }

    svg.attr("width", width)
        .attr("height", height);

    let xScale = d3.scaleLinear()
        .domain([0, resolution])
        .range([0, width]);
    let yScale = d3.scaleLinear()
        .domain([0, resolution])
        .range([height, 0]);
    debugger;

    var maxCount = d3.max(heatmap.heatmap.map(a => d3.max(a)));
    var colorScale = d3.scaleLinear().domain([0, 1]).range(["white", "black"]);

    svg.append("g")
        .selectAll("g")
        .data(heatmap.heatmap.map((a,i) => {
            return {
                array: a,
                y: i
            };
        })).enter().append("g")
        .selectAll("g")
        .data(d => d.array.map((v, i) => {
            return {
                v: v,
                y: d.y,
                x: i
            };
        })).enter().append("rect")
        .attr("x", d => xScale(d.x))
        .attr("y", d => yScale(d.y))
        .attr("width", ~~(xScale(1) - xScale(0) + 1))
        .attr("height", ~~(xScale(1) - xScale(0) + 1))
        .attr("fill", d => colorScale(d.v / maxByX[d.x]));
}

loadModule("./pkg/without_a_bundler_bg.wasm").then(m => {
    rustPolya = m;
    let r = 1;
    let b = 1;
    let nSteps = 100;

    let urn = rustPolya.make_polya_urn(3, 0, 0, 1, r, b);

    traceMany(d3.select("body")
              .append("div")
              .append("svg"), urn, nSteps, rustPolya.trace_compensated_urn);

    drawHeatmap(d3.select("body")
                .append("div")
                .append("svg"), urn, nSteps, rustPolya.update_compensated_urn_heatmap);
});
