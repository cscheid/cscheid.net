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
var labScale = d3.scaleLinear().domain([0,1]);
var hclScale = d3.scaleLinear().domain([0,1]);

var fmt = d3.format(".2f");
var fmt_i = d3.format("d");

function setSingleScale(which) {
    switch (which) {
    case "rgb":
        setRGB(d3.rgb(Number(d3.select("#rgb_ro").text()), Number(d3.select("#rgb_go").text()), Number(d3.select("#rgb_bo").text())),
               d3.rgb(Number(d3.select("#rgb_rd").text()), Number(d3.select("#rgb_gd").text()), Number(d3.select("#rgb_bd").text())));
        break;
    case "hsl":
        setHSL(d3.hsl(Number(d3.select("#hsl_ho").text()), Number(d3.select("#hsl_so").text()), Number(d3.select("#hsl_lo").text())),
               d3.hsl(Number(d3.select("#hsl_hd").text()), Number(d3.select("#hsl_sd").text()), Number(d3.select("#hsl_ld").text())));
        break;
    case "lab":
        setLab(d3.lab(Number(d3.select("#lab_lo").text()), Number(d3.select("#lab_ao").text()), Number(d3.select("#lab_bo").text())),
               d3.lab(Number(d3.select("#lab_ld").text()), Number(d3.select("#lab_ad").text()), Number(d3.select("#lab_bd").text())));
        break;
    case "hcl":
        setHCL(d3.hcl(Number(d3.select("#hcl_ho").text()), Number(d3.select("#hcl_co").text()), Number(d3.select("#hcl_lo").text())),
               d3.hcl(Number(d3.select("#hcl_hd").text()), Number(d3.select("#hcl_cd").text()), Number(d3.select("#hcl_ld").text())));
        break;
    }
}

function setRGB(origin, destination) {
    var originRGB = d3.rgb(origin), destinationRGB = d3.rgb(destination);
    rgbScale.range([[originRGB.r, originRGB.g, originRGB.b],
                    [destinationRGB.r, destinationRGB.g, destinationRGB.b]]);
}

function setHSL(origin, destination) {
    var originHSL = d3.hsl(origin), destinationHSL = d3.hsl(destination);
    hslScale.range([[originHSL.h || 0, originHSL.s || 0, originHSL.l],
                    [destinationHSL.h || 0, destinationHSL.s || 0, destinationHSL.l]]);
}

function setLab(origin, destination) {
    var originLab = d3.lab(origin), destinationLab = d3.lab(destination);
    labScale.range([[originLab.l, originLab.a, originLab.b],
                    [destinationLab.l, destinationLab.a, destinationLab.b]]);
}

function setHCL(origin, destination) {
    var originHCL = d3.lab(origin), destinationHCL = d3.lab(destination);
    hclScale.range([[originHCL.h || 0, originHCL.c || 0, originHCL.l],
                    [destinationHCL.h || 0, destinationHCL.c || 0, destinationHCL.l]]);
}

function setToOthers() {
    var from = this.id.substr(0.3);
    var origin, destination;
    switch (from) {
    case "rgb":
        origin = d3.rgb(Number(d3.select("#rgb_ro").text()), Number(d3.select("#rgb_ro").text()), Number(d3.select("#rgb_ro").text()));
        destination = d3.rgb(Number(d3.select("#rgb_rd").text()), Number(d3.select("#rgb_rd").text()), Number(d3.select("#rgb_rd").text()));
        break;
    case "hsl":
        origin = d3.hsl(Number(d3.select("#hsl_ho").text()), Number(d3.select("#hsl_so").text()), Number(d3.select("#hsl_lo").text()));
        destination = d3.hsl(Number(d3.select("#hsl_hd").text()), Number(d3.select("#hsl_sd").text()), Number(d3.select("#hsl_ld").text()));
        break;
    case "lab":
        origin = d3.lab(Number(d3.select("#lab_lo").text()), Number(d3.select("#lab_ao").text()), Number(d3.select("#lab_bo").text()));
        destination = d3.lab(Number(d3.select("#lab_ld").text()), Number(d3.select("#lab_ad").text()), Number(d3.select("#lab_bd").text()));
        break;
    case "hcl":
        origin = d3.hcl(Number(d3.select("#hcl_ho").text()), Number(d3.select("#hcl_co").text()), Number(d3.select("#hcl_lo").text()));
        destination = d3.hcl(Number(d3.select("#hcl_hd").text()), Number(d3.select("#hcl_cd").text()), Number(d3.select("#hcl_ld").text()));
        break;
    }
    setScales("");
}

function setScales(ignore) {
    var originRGB = d3.rgb(origin), destinationRGB = d3.rgb(destination);
    var originHSL = d3.hsl(origin), destinationHSL = d3.hsl(destination);
    var originHCL = d3.hcl(origin), destinationHCL = d3.hcl(destination);
    var originLab = d3.lab(origin), destinationLab = d3.lab(destination);

    rgbScale.range([[originRGB.r, originRGB.g, originRGB.b],
                    [destinationRGB.r, destinationRGB.g, destinationRGB.b]]);
    hslScale.range([[originHSL.h || 0, originHSL.s || 0, originHSL.l],
                    [destinationHSL.h || 0, destinationHSL.s || 0, destinationHSL.l]]);
    hclScale.range([[originHCL.h || 0, originHCL.c || 0, originHCL.l],
                    [destinationHCL.h || 0, destinationHCL.c || 0, destinationHCL.l]]);
    labScale.range([[originLab.l || 0, originLab.a || 0, originLab.b],
                    [destinationLab.l || 0, destinationLab.a || 0, destinationLab.b]]);

    if (ignore !== "#rgb_ro") d3.select("#rgb_ro").text(fmt_i(origin.r));
    if (ignore !== "#rgb_go") d3.select("#rgb_go").text(fmt_i(origin.g));
    if (ignore !== "#rgb_bo") d3.select("#rgb_bo").text(fmt_i(origin.b));
    if (ignore !== "#rgb_rd") d3.select("#rgb_rd").text(fmt_i(destination.r));
    if (ignore !== "#rgb_gd") d3.select("#rgb_gd").text(fmt_i(destination.g));
    if (ignore !== "#rgb_bd") d3.select("#rgb_bd").text(fmt_i(destination.b));

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

    if (ignore !== "#lab_lo") d3.select("#lab_lo").text(fmt_i(originLab.l || 0));
    if (ignore !== "#lab_ao") d3.select("#lab_ao").text(fmt_i(originLab.a || 0));
    if (ignore !== "#lab_bo") d3.select("#lab_bo").text(fmt_i(originLab.b));
    if (ignore !== "#lab_ld") d3.select("#lab_ld").text(fmt_i(destinationLab.l || 0));
    if (ignore !== "#lab_ad") d3.select("#lab_ad").text(fmt_i(destinationLab.a || 0));
    if (ignore !== "#lab_bd") d3.select("#lab_bd").text(fmt_i(destinationLab.b));
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
            if (this.innerText.search(/\n/) !== -1) {
                this.innerText = this.textContent;
                var newValue = Number(this.innerText);
                if (isNaN(newValue)) {
                    return false;
                } else {
                    setValue(this.id, newValue);
                    console.log(this.id.substr(0,3));
                    setSingleScale(this.id.substr(0,3));
                    updateBars();
                }
            }
            return false;
        });
    d3.selectAll(".click")
        .on("click", setToOthers);
}

setEventHandlers();

function updateBars() {
    colorBar(d3.select("#rgb_div"), function(d) {
        var result = rgbScale(d);
        return d3.rgb(result[0], result[1], result[2]);
    });
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
