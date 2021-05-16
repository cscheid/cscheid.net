function colorBar(sel, interpolator)
{
    var data = [];
    var n = 250;
    for (var i=0; i<n; ++i) { data.push(i/(n-1)); }
    var width = 920;
    sel.selectAll("svg")
        .data([1]).enter().append("svg")
        .attr("height", 30).attr("width", width);
    var svg = sel.select("svg");
    
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect");

    svg.selectAll("rect")
        .attr("width", Math.ceil(width / n)+1)
        .attr("height", 30)
        .attr("x", function(d, i) { return width / n * i; })
        .attr("fill", interpolator);
}

var origin = d3.rgb(255,0,0), destination = d3.rgb(0,255,0);

var rgbScale = d3.scaleLinear().domain([0,1]);
var hslScale = d3.scaleLinear().domain([0,1]);
var hclScale = d3.scaleLinear().domain([0,1]);
var labScale = d3.scaleLinear().domain([0,1]);

var scales = {
    rgb: rgbScale,
    hsl: hslScale,
    hcl: hclScale,
    lab: labScale
};

var fmt = d3.format(".2f");
var fmt_i = d3.format("d");

function setScales(ignore) {
    var originHSL = d3.hsl(origin), destinationHSL = d3.hsl(destination);
    var originHCL = d3.hcl(origin), destinationHCL = d3.hcl(destination);
    var originLAB = d3.lab(origin), destinationLAB = d3.lab(destination);

    rgbScale.range([origin, destination]);
    hslScale.range([[originHSL.h || 0, originHSL.s || 0, originHSL.l],
                    [destinationHSL.h || 0, destinationHSL.s || 0, destinationHSL.l]]);
    hclScale.range([[originHCL.h || 0, originHCL.c || 0, originHCL.l],
                    [destinationHCL.h || 0, destinationHCL.c || 0, destinationHCL.l]]);
    labScale.range([[originLAB.l, originLAB.a, originLAB.b],
                    [destinationLAB.l, destinationLAB.a, destinationLAB.b]]);

    if (ignore !== "#rgb_ro") d3.select("#rgb_ro").text(fmt_i(origin.r));
    if (ignore !== "#rgb_go") d3.select("#rgb_go").text(fmt_i(origin.g));
    if (ignore !== "#rgb_bo") d3.select("#rgb_bo").text(fmt_i(origin.b));
    if (ignore !== "#rgb_rd") d3.select("#rgb_rd").text(fmt_i(destination.r));
    if (ignore !== "#rgb_gd") d3.select("#rgb_gd").text(fmt_i(destination.g));
    if (ignore !== "#rgb_bd") d3.select("#rgb_bd").text(fmt_i(destination.b));

    if (ignore !== "#lab_lo") d3.select("#lab_lo").text(fmt_i(originLAB.l));
    if (ignore !== "#lab_ao") d3.select("#lab_ao").text(fmt_i(originLAB.a));
    if (ignore !== "#lab_bo") d3.select("#lab_bo").text(fmt_i(originLAB.b));
    if (ignore !== "#lab_ld") d3.select("#lab_ld").text(fmt_i(destinationLAB.l));
    if (ignore !== "#lab_ad") d3.select("#lab_ad").text(fmt_i(destinationLAB.a));
    if (ignore !== "#lab_bd") d3.select("#lab_bd").text(fmt_i(destinationLAB.b));
    
    if (ignore !== "#hsl_ho") d3.select("#hsl_ho").text(fmt_i(originHSL.h || 0));
    if (ignore !== "#hsl_so") d3.select("#hsl_so").text(fmt(originHSL.s || 0));
    if (ignore !== "#hsl_lo") d3.select("#hsl_lo").text(fmt(originHSL.l));
    if (ignore !== "#hsl_hd") d3.select("#hsl_hd").text(fmt_i(destinationHSL.h || 0));
    if (ignore !== "#hsl_sd") d3.select("#hsl_sd").text(fmt(destinationHSL.s || 0));
    if (ignore !== "#hsl_ld") d3.select("#hsl_ld").text(fmt(destinationHSL.l));

    if (ignore !== "#hcl_ho") d3.select("#hcl_ho").text(fmt_i(originHCL.h || 0));
    if (ignore !== "#hcl_co") d3.select("#hcl_co").text(fmt_i(originHCL.c || 0));
    if (ignore !== "#hcl_lo") d3.select("#hcl_lo").text(fmt_i(originHCL.l));
    if (ignore !== "#hcl_hd") d3.select("#hcl_hd").text(fmt_i(destinationHCL.h || 0));
    if (ignore !== "#hcl_cd") d3.select("#hcl_cd").text(fmt_i(destinationHCL.c || 0));
    if (ignore !== "#hcl_ld") d3.select("#hcl_ld").text(fmt_i(destinationHCL.l));
}

function setValue(id, newValue) {
    var space = id.substr(0,3);
    var field = id[4];
    var which = id[5] === 'o' ? origin : destination;
    var colorCopy = d3[space](which);
    colorCopy[field] = Number(newValue);
    if (id[5] === 'o') {
        origin = d3.rgb(colorCopy);
    } else {
        destination = d3.rgb(colorCopy);
    }
}

function setEventHandlers()
{
    d3.selectAll("span")
        .on("input", function() {
            this.innerText = this.textContent;
            var newValue = Number(this.innerText);
            if (isNaN(newValue)) {
                setScales();
            } else {
                setValue(this.id, newValue);
                setScales(this.id);
                updateBars();
            }
            return false;
        });
}

setEventHandlers();

function updateBars() {
    colorBar(d3.select("#rgb_div"), rgbScale);
    // ["hsl", "hcl", "lab"].forEach(space => {
    //     colorBar(d3.select("#" + space + "_div", 
    //                       });
        
    colorBar(d3.select("#hsl_div"), function(d) {
        var result = hslScale(d);
        return d3.hsl(result[0], result[1], result[2]);
    });
    colorBar(d3.select("#hcl_div"), function(d) {
        var result = hclScale(d);
        return d3.hcl(result[0], result[1], result[2]);
    });
    colorBar(d3.select("#lab_div"), function(d) {
        var result = labScale(d);
        return d3.lab(result[0], result[1], result[2]);
    });
}

function set(ro, go, bo, rd, gd, bd)
{
    origin = d3.rgb(ro, go, bo);
    destination = d3.rgb(rd, gd, bd);
    setScales();
    updateBars();
    return false;
}

setScales();
updateBars();
