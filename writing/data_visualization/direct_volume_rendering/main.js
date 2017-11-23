/*global cscheid */

/* BEWARE - THIS NEEDS A MASSIVE CLEANUP */

//////////////////////////////////////////////////////////////////////////////

function mip2D(rayBegin, rayEnd, nSteps, volume) {
    var rayScale = d3.scaleLinear()
            .domain([0, nSteps-1])
            .range([rayBegin, rayEnd]);
    var result = -Infinity;
    for (var i=0; i<nSteps; ++i) {
        var p = rayScale(i);
        result = Math.max(result, volume(p[0], p[1]));
    };
    return result;
}

function xRay2D(rayBegin, rayEnd, nSteps, volume, weight) {
    var rayScale = d3.scaleLinear()
            .domain([0, nSteps-1])
            .range([rayBegin, rayEnd]);
    var result = 0;
    for (var i=0; i<nSteps; ++i) {
        var pos = rayScale(i);
        var w = weight(pos[0], pos[1]);
        result += volume(pos[0], pos[1]) * w;
    };
    return result;
}

function absorptionEmission2D(rayBegin, rayEnd, nSteps, volume, weight) {
    debugger;
    var rayScale = d3.scaleLinear()
            .domain([0, nSteps-1])
            .range([rayBegin, rayEnd]);
    var result = 0;
    for (var i=nSteps; i>=0; --i) {
        var pos = rayScale(i);
        var w = weight(pos[0], pos[1]);
        var c = volume(pos[0], pos[1]);
        result = w * c + (1 - w) * result;
    };
    return result;
}

//////////////////////////////////////////////////////////////////////////////
// flatland-mip-1, 2

function pin(x, y) {
    return x*x + y*y - x*x*x*x - y*y*y*y;
}
function clamped(boundsX, boundsY, outsideValue, f) {
    return function(x, y) {
        if (x >= boundsX[0] && x <= boundsY[1] &&
            y >= boundsY[0] && y <= boundsY[1])
            return f(x,y);
        else
            return outsideValue;
    };
}
function circle(x, y) {
    return 2 - x*x - y*y;
}
var clampedPin =    clamped([-1.2, 1.2], [-1.2, 1.2], 0, pin);
var clampedCircle = clamped([-1.2, 1.2], [-1.2, 1.2], 0, circle);

function sampleVolume(xScale, yScale, density, vol)
{
    var d = density;
    var vX = xScale;
    var vY = yScale;

    var result = [];
    for (var i=0; i<d; ++i) {
        for (var j=0; j<d; ++j) {
            result.push({i: i, j: j, x: vX(i), y: vY(j), v: vol(vX(i), vY(j))});
        }
    }
    return result;
}

function eyeGlyph(sel)
{
    return sel.append("path")
        .attr("d", "M 30,18 L 0,0 L 30,-18 M 15,9 A 30 30 0 0 1 15,-9")
        .attr("stroke", "black")
        .attr("stroke-width", "2px")
        .attr("fill", "none");
}

function makeRayCaster(
    sel, vol, cScale, integrationFunction,
    objectMap, density)
{
    var svg = sel
            .append("svg")
            .attr("width", 800)
            .attr("height", 400);

    var eyeCenter = [100, 200];

    var volLeftFace  = d3.scaleLinear().range([[420, 380], [420, 20]]);
    var u1 = (420 - eyeCenter[0]) / (780 - eyeCenter[0]);
    var u2 = (420 - eyeCenter[0]) / (300 - eyeCenter[0]);
    var volRightFace = d3.scaleLinear().range([[780, 200 + (380 - 200) / u1],
                                               [780, 200 + (20  - 200) / u1]]);
    var xRayFace     = d3.scaleLinear().range([[300, 200 + (380 - 200) / u2],
                                               [300, 200 + (20  - 200) / u2]]);
    var volumeXtoScreenX = d3.scaleLinear().domain([-1.2, 1.2]).range([420, 780]);
    var volumeYtoScreenY = d3.scaleLinear().domain([-1.2, 1.2]).range([20,  380]);
    function screenToVolume(v) {
        return [volumeXtoScreenX.invert(v[0]),
                volumeYtoScreenY.invert(v[1])];
    }
    density = density || 50;
    function internalSampleVolume() {
        var d = density;
        var vX = d3.scaleLinear().domain([0,d-1]).range([-1.2, 1.2]);
        var vY = d3.scaleLinear().domain([0,d-1]).range([-1.2, 1.2]);
        return sampleVolume(vX, vY, d, vol);
    }
    function resampleVolume() {
        samples.forEach(d => {
            d.v = vol(d.x, d.y);
        });
    };

    var xScale = d3.scaleLinear().domain([0, density]).range([420, 780]);
    var yScale = d3.scaleLinear().domain([density, 0]).range([20,  380]);
    var samples = internalSampleVolume(
        density,
        d3.scaleLinear().domain([0,density-1]).range([-1.2, 1.2]),
        d3.scaleLinear().domain([0,density-1]).range([-1.2, 1.2]),
        vol);

    var dataG = svg.append("g");
    dataG.selectAll("rect")
        .data(samples)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.i))
        .attr("y", d => yScale(d.j+1))
        .attr("width", d => ~~(xScale(1) - xScale(0)) + 1)
        .attr("height", d => ~~(yScale(0) - yScale(1)) + 1)
        .attr("fill", d => objectMap(d.v));

    //////////////////////////////////////////////////////////////////////////////

    svg.append("defs")
        .append("clippath")
        .attr("id", "rayclippath")
        .append("rect")
        .attr("x", 310)
        .attr("y", 20)
        .attr("width", 470)
        .attr("height", 360);

    var nRays = 20;
    var rayScale = d3.scaleLinear().domain([0, nRays-1]).range([0.15, 0.85]);

    svg.append("g")
        .selectAll("line")
        .data(d3.range(nRays))
        .enter()
        .append("line")
        .attr("x1", eyeCenter[0])
        .attr("y1", eyeCenter[1])
        .attr("x2", d => volRightFace(rayScale(d))[0])
        .attr("y2", d => volRightFace(rayScale(d))[1])
        .attr("stroke", d3.hcl(0,0,70))
        .attr("stroke-width", 1)
        .attr("fill", "none");

    svg.append("g")
        .attr("transform", "translate(" + eyeCenter + ")")
        .call(eyeGlyph);

    var xRayPixels = d3.range(nRays);
    var imageG = svg.append("g");
    imageG
        .selectAll("line")
        .data(d3.range(nRays))
        .enter()
        .append("line")
        .attr("x1", d => xRayFace(rayScale(d-0.5))[0])
        .attr("x2", d => xRayFace(rayScale(d+0.5))[0])
        .attr("y1", d => xRayFace(rayScale(d-0.5))[1])
        .attr("y2", d => xRayFace(rayScale(d+0.5))[1])
        .attr("stroke", d => integrationFunction(screenToVolume(volLeftFace(rayScale(d))),
                                                 screenToVolume(volRightFace(rayScale(d)))))
        .attr("stroke-width", "5px");
    
    return {
        samples: samples,
        refresh: function() {
            resampleVolume();
            imageG.selectAll("line")
                .attr("stroke", d => integrationFunction(screenToVolume(volLeftFace(rayScale(d))),
                                                         screenToVolume(volRightFace(rayScale(d)))));
            dataG.selectAll("rect")
                .attr("fill", d => objectMap(d.v));
        }
    };
}

var mip1C = d3.scaleLinear().domain([-1/2, 1/2]).range([0,1]).clamp(true);
var mip2C = d3.scaleLinear().domain([0, 1.9]).range([0,1]).clamp(true);
var pin = makeRayCaster(d3.select("#flatland-mip2"),
                        clampedPin,
                        mip1C,
                        (rayBegin, rayEnd) => d3.interpolateViridis(
                            mip1C(mip2D(rayBegin, rayEnd, 30, clampedPin))),
                        v => d3.interpolateViridis(mip1C(v)));
makeRayCaster(d3.select("#flatland-mip1"),
              clampedCircle,
              mip2C,
              (rayBegin, rayEnd) => d3.interpolateViridis(
                  mip2C(mip2D(rayBegin, rayEnd, 30, clampedCircle))),
              v => d3.interpolateViridis(mip2C(v)));

var mip3C = d3.scaleLinear().domain([0, 1]).range([0,1]).clamp(true);

function makeGaussianTF(startCenter, startSigma) {
    var tfCenter = startCenter,
        tfSigma = startSigma;
    var result = function gaussianTF(s) {
        return Math.exp(-Math.pow(s - tfCenter, 2)/tfSigma);
    };
    result.setCenter = function(center) {
        tfCenter = center;
    };
    result.setSigma = function(sigma) {
        tfSigma = sigma;
    };
    result.startCenter = startCenter;
    result.startSigma = startSigma;
    return result;
}

var tf1 = makeGaussianTF(0.45, 0.0125);
function tfPin(x, y) {
    return tf1(clampedPin(x, y));
}

var mip3Picture = makeRayCaster(
    d3.select("#flatland-mip3"),
    tfPin,
    mip3C,
    (rayBegin, rayEnd) => d3.interpolateViridis(
        mip3C(mip2D(rayBegin, rayEnd, 30, tfPin))),
    v => d3.interpolateViridis(mip3C(v)));

//////////////////////////////////////////////////////////////////////////////

function createTFWidget(element, tfObj, picture,
                        xScale,
                        yScale,
                        histoScale,
                        samples)
{
    xScale = xScale || d3.scaleLinear().domain([-1.2, 1.2]);
    yScale = yScale || d3.scaleLinear().domain([0,1]);
    histoScale = histoScale || 5;
    samples = samples || picture.samples;
    var tfSurface = cscheid.plot.surface({
        element: element,
        width: 200,
        height: 100,
        margin: 20,
        xScale: xScale,
        yScale: yScale,
        xTicks: 3,
        yTicks: 3
    });

    var h = d3.histogram()
            .value(d => d.v)
            .domain(xScale.domain())
            .thresholds(60)(samples)
            .map(v => histoScale * v.length / samples.length);

    var fh = cscheid.caliper.makeFunction(
        h, cscheid.caliper.kernels.bSpline(1));
    var histogramScale = d3.scaleLinear().domain(xScale.domain()).range([0, h.length]);

    var histoPath = tfSurface.surface.addFunction(d => fh(histogramScale(d)), 100)
            .attr("stroke", "blue")
            .attr("fill", "none");

    function addTransferFunction() {
        return tfSurface.surface.addFunction(d => tfObj(d), 200)
            .attr("stroke", "black")
            .attr("fill", "none");
    }
    var tfPath = addTransferFunction();
    var onUpdate = function() {};
    
    function updatePicture()
    {
        var clickX = xScale.invert(d3.event.offsetX);
        var clickY = yScale.invert(d3.event.offsetY);
        var shrinkFactor = 4;
        clickY = Math.max(1 / shrinkFactor, clickY);
        tfObj.setCenter(clickX);
        tfObj.setSigma(tfObj.startSigma / (shrinkFactor * clickY));
        tfPath.node().parentNode.remove();
        tfPath = addTransferFunction();
        picture.refresh();
        onUpdate();
    }

    tfSurface.append("g")
        .append("rect")
        .attr("x", xScale.domain()[0])
        .attr("y", xScale.domain()[1])
        .attr("width", 200) // ugh
        .attr("height", 100) // ugh
        .attr("opacity", 0)
        .attr("cursor", "pointer")
        .on("mousemove", updatePicture)
        .on("click", updatePicture);

    return {
        onUpdate: function(call) {
            onUpdate = call;
        }
    };
}
createTFWidget(d3.select("#flatland-mip3-tf"), tf1, mip3Picture,
               d3.scaleLinear().domain([-1/2, 3/4]),
               undefined,
               15,
               sampleVolume(d3.scaleLinear().domain([0, 49]).range([-1.2, 1.2]),
                            d3.scaleLinear().domain([0, 49]).range([-1.2, 1.2]),
                            50, clampedPin));

//////////////////////////////////////////////////////////////////////////////

var tf2 = makeGaussianTF(0.45, 0.0125);
function tfPin2(x, y) {
    return tf2(clampedPin(x, y));
}
var showWeightsOnVolume = true;
var xRayObjectColor = d3.scaleLinear().domain([0.125, 0.25, 0.375, 1/2]).range(["lightgray", "blue", "lightgray", "orange"]).clamp(true);

var xRay1Picture = makeRayCaster(
    d3.select("#flatland-xray1"),
    clampedPin,
    mip3C,
    (rayBegin, rayEnd) => {
        // yeah, this got ugly.
        var r = xRay2D(rayBegin, rayEnd, 30,
                       (x, y) => d3.rgb(xRayObjectColor(clampedPin(x, y))).r,
                       (x, y) => tfPin2(x, y));
        var g = xRay2D(rayBegin, rayEnd, 30,
                       (x, y) => d3.rgb(xRayObjectColor(clampedPin(x, y))).g,
                       (x, y) => tfPin2(x, y));
        var b = xRay2D(rayBegin, rayEnd, 30,
                       (x, y) => d3.rgb(xRayObjectColor(clampedPin(x, y))).b,
                       (x, y) => tfPin2(x, y));
        var w = xRay2D(rayBegin, rayEnd, 30,
                       (x, y) => 1,
                       (x, y) => tfPin2(x, y));
        var c;
        if (w > 1) {
            c = d3.rgb(r/w, g/w, b/w);
        } else {
            c = d3.rgb(r, g, b);
            c.opacity = w;
        }
        return c;
    },
    d => {
        var c = d3.color(xRayObjectColor(d));
        if (showWeightsOnVolume) {
            c.opacity = tf2(d);
        }
        return c;
    });

createTFWidget(d3.select("#flatland-xray1-tf"), tf2, xRay1Picture,
               d3.scaleLinear().domain([-1/2, 3/4]),
               undefined,
               15);

//////////////////////////////////////////////////////////////////////////////

var tf3 = makeGaussianTF(1.5, 1);
function twoBumps(x, y) {
    var dx1 = x - 0.5, dy1 = y, d1 = dx1 * dx1 + dy1 * dy1;
    var dx2 = x + 0.5, dy2 = y, d2 = dx2 * dx2 + dy2 * dy2;
    var g1 = Math.max(1 - 3 * d1, 0); // Math.exp(-d1 / 0.05);
    var g2 = Math.max(1 - 3 * d2, 0); // Math.exp(-d2 / 0.20);
    return 2 * g1 + g2;
};

function tfBumps(x, y) {
    return tf3(twoBumps(x, y));
}

var xRayObjectColor2 = d3.scaleLinear().domain([0, 1, 1.25, 1.5]).range(["lightgray", "blue", "lightgray", "orange"]).clamp(true);

var xRay2Picture = makeRayCaster(
    d3.select("#flatland-xray2"),
    twoBumps,
    mip3C,
    (rayBegin, rayEnd) => {
        // yeah, this got ugly.
        var r = xRay2D(rayBegin, rayEnd, 60,
                       (x, y) => d3.rgb(xRayObjectColor2(twoBumps(x, y))).r,
                       (x, y) => tfBumps(x, y));
        var g = xRay2D(rayBegin, rayEnd, 60,
                       (x, y) => d3.rgb(xRayObjectColor2(twoBumps(x, y))).g,
                       (x, y) => tfBumps(x, y));
        var b = xRay2D(rayBegin, rayEnd, 60,
                       (x, y) => d3.rgb(xRayObjectColor2(twoBumps(x, y))).b,
                       (x, y) => tfBumps(x, y));
        var w = xRay2D(rayBegin, rayEnd, 60,
                       (x, y) => 1,
                       (x, y) => tfBumps(x, y));
        var c;
        if (w > 1) {
            c = d3.rgb(r/w, g/w, b/w);
        } else {
            c = d3.rgb(r, g, b);
            c.opacity = w;
        }
        return c;
    },
    d => {
        var c = d3.color(xRayObjectColor2(d));
        if (showWeightsOnVolume) {
            c.opacity = tf3(d);
        }
        return c;
    },
    50);

var oneRayAE;
createTFWidget(d3.select("#flatland-xray2-tf"), tf3, xRay2Picture,
               d3.scaleLinear().domain([-0.1, 3.1]),
               d3.scaleLinear().domain([-1, 1]),
               50
              ).onUpdate(() => {
                  oneRayAE.update();
              });;

//////////////////////////////////////////////////////////////////////////////
// one-ray

function makeOneRayAE() {
    
    var svg = d3.select("#flatland-absorption-emission-one-ray")
            .append("svg")
            .attr("width", 900)
            .attr("height", 200);

    svg.append("g")
        .attr("transform", "translate(10, 100)")
        .call(eyeGlyph);
    
    var g = svg.append("g")
            .attr("transform", cscheid.svg.translate(40,0));

    // cylindrical slab
    g.append("path")
        .attr("d", "M 50 20 A 20 80 0 0 0 50 180")
        .attr("stroke", "black")
        .attr("fill", "none");

    g.append("line")
        .attr("x1", 20)
        .attr("y1", 100)
        .attr("x2", 830)
        .attr("y2", 100)
        .attr("stroke", "gray")
        .attr("stroke-dasharray", "12, 10");
    g.append("path")
        .attr("d", "M 822 96 L 830 100 L 822 104")
        .attr("stroke", "gray")
        .attr("fill", "none");

    // A 20 80 0 0 0 750 20
    g.append("path")
        .attr("d", "M 50 180 L 750 180 M 750 20 L 50 20 L 50 20") 
        .attr("stroke", "black")
        .attr("fill", "none");

    var nSlabs = 10;
    var rayScale = d3.scaleLinear().domain([0, nSlabs]).range([50, 750]);
    var l = d3.range(nSlabs+1);
    g.append("g")
        .selectAll("path")
        .data(l)
        .enter()
        .append("path")
        .attr("d", d => "M " + rayScale(d) + " 180 A 20 80 0 0 0 " + rayScale(d) + " 20")
        .attr("stroke", "black")
        .attr("fill", "none");

    var circles;
    return {
        update: function() {
            // pick one ray arbitrarily:
            var rayVolumeScale = d3.scaleLinear().domain([0, nSlabs-1]).range([[-1, 0], [1, 0]]);
            var samples = d3.range(nSlabs).map(d => {
                var p = rayVolumeScale(d);
                var pos = rayScale(d);
                var scalar = twoBumps(p[0], p[1]);
                var weight = tf3(scalar);
                var color = xRayObjectColor2(scalar);
                return { p: p, pos, pos, scalar: scalar, weight: weight, color: color };
            });
            if (!circles) {
                circles = g.append("g");
            } else {
                circles.selectAll("g").remove();
            }
            circles
                .selectAll("g")
                .data(samples)
                .enter()
                .append("g")
                .attr("transform", d => cscheid.svg.translate(d.pos, 0))
                .selectAll("circle")
                .data(d => d3.range(50).map(function(i) { return { index: i, sample: d, y: Math.random() - 0.5 }; }))
                .enter()
                .append("circle")
                .attr("cx", d => {
                    var x = Math.sqrt(1 - d.y * d.y);
                    return 20 * x + Math.random() * (rayScale(1) - rayScale(0));
                })
                .attr("cy", d => 100 + d.y * 160)
                .attr("r", 2)
                .attr("fill", d => {if (Math.random() < 5 * d.sample.weight) { return d.sample.color; } else { return "none"; }});
        }
    };
};

oneRayAE = makeOneRayAE();
oneRayAE.update();

//////////////////////////////////////////////////////////////////////////////
// Absorption-emission

var tf4 = makeGaussianTF(1.5, 1);
function tfBumps2(x, y) {
    return tf4(twoBumps(x, y));
}

var EAPicture = makeRayCaster(
    d3.select("#flatland-emission-absorption"),
    twoBumps,
    mip3C,
    (rayBegin, rayEnd) => {
        // yeah, this got ugly.
        var r = absorptionEmission2D(rayBegin, rayEnd, 60,
                       (x, y) => d3.rgb(xRayObjectColor2(twoBumps(x, y))).r,
                       (x, y) => tfBumps2(x, y));
        var g = absorptionEmission2D(rayBegin, rayEnd, 60,
                       (x, y) => d3.rgb(xRayObjectColor2(twoBumps(x, y))).g,
                       (x, y) => tfBumps2(x, y));
        var b = absorptionEmission2D(rayBegin, rayEnd, 60,
                       (x, y) => d3.rgb(xRayObjectColor2(twoBumps(x, y))).b,
                       (x, y) => tfBumps2(x, y));
        var w = absorptionEmission2D(rayBegin, rayEnd, 60,
                       (x, y) => 1,
                       (x, y) => tfBumps2(x, y));
        var c;
        if (w > 1) {
            c = d3.rgb(r/w, g/w, b/w);
        } else {
            c = d3.rgb(r, g, b);
            c.opacity = w;
        }
        return c;
    },
    d => {
        var c = d3.color(xRayObjectColor2(d));
        if (showWeightsOnVolume) {
            c.opacity = tf4(d);
        }
        return c;
    },
    50);

createTFWidget(d3.select("#flatland-emission-absorption"), tf4, EAPicture,
               d3.scaleLinear().domain([-0.1, 3.1]),
               d3.scaleLinear().domain([-1, 1]),
               50);

