import * as cscheid from "/js/cscheid/cscheid.js"; // injects moveToFront etc into d3 object.

var data, ctx;
var legend;

//////////////////////////////////////////////////////////////////////////////
var colorScale = d3.scaleLinear().domain([-4200, 0, 4200]);
var prescale = d3.scaleLinear() .domain([-4200, 0, 4200]).range([1, 0, 1]);
function combinedScale(v) {
  return colorScale(prescale.invert(Math.pow(prescale(v), 0.5)) * Math.sign(v));
}
combinedScale.domain = function() { return colorScale.domain(); };
combinedScale.range  = function() { return colorScale.range(); };
// clearly wrong hack
combinedScale.copy   = function() { return this; };
//////////////////////////////////////////////////////////////////////////////

function goodColormap()
{
  colorScale.range(
    [d3.lab(10, -30, -50),
     d3.lab(90, 0,     0),
     d3.lab(10, 30,   50)])
    .interpolate(d3.interpolateLab);
  legend.legendObjects.call(legend.update);
}

function badColormap()
{
  colorScale.range(
    [d3.hcl(-100, 70, 20),
     d3.hcl(-220, 70, 50),
     d3.hcl(-340, 70, 80)])
    .interpolate(d3.interpolateHcl);
  legend.legendObjects.call(legend.update);
}

function setScale(sel)
{
  sel.attr("fill", d => combinedScale(d));
}

function draw() {
  var w = data[0].length;
  var h = data.length;
  var myImageData = ctx.createImageData(w, h);
  var buffer = myImageData.data;
  var offset = 0;
  for (var hi=0; hi<h; ++hi) {
    for (var wi=0; wi<w; ++wi) {
      var c = d3.color(combinedScale(data[hi][wi]));
      buffer[offset++] = c.r;
      buffer[offset++] = c.g;
      buffer[offset++] = c.b;
      buffer[offset++] = 255;
    }
  }
  ctx.putImageData(myImageData, 0, 0);
}

d3.text("/courses/data-visualization/data/italy-ascii.nrrd")
  .then(text => {
    data = text.split("\n").map(line => line.split(" ").map(Number));
    var w = data[0].length;
    var h = data.length;
    
    var canvas = d3.select("#main")
        .append("canvas")
        .attr("width", w)
        .attr("height", h);
    ctx = canvas.node().getContext("2d");

    var svg = d3.select("#main")
        .append("svg")
        .attr("width", 50)
        .attr("height", h)
        .style("position", "absolute")
        .style("left", w + 30);

    legend = cscheid.legend.colorLegend({
      element: svg,
      scale: combinedScale,
      axis: "left",
      extent: [h-10, 10]
    });
    legend.mainGroup.attr("transform", "translate(30, 0)");
    badColormap();
    draw();
    
    // var legendScale = d3.scaleLinear()
    //     .domain([colorScale.domain()[0], colorScale.domain()[2]])
    //     .range([h-10, 10]);
    // var legendValues = d3.range(201)
    //     .map(d3.scaleLinear().domain([0, 200])
    //          .range([colorScale.domain()[0], colorScale.domain()[2]]));

    // legendRects = svg.append("g")
    //   .selectAll("rect")
    //   .data(legendValues)
    //   .enter()
    //   .append("rect")
    //   .attr("width", 20)
    //   .attr("height", ~~(Math.abs(legendScale(legendValues[1])-legendScale(legendValues[0]))+1))
    //   .attr("x", 30)
    //   .attr("y", d => legendScale(d))
    //   .call(setScale);
    
    // var axis = d3.axisLeft(legendScale)
    //     .tickFormat(d3.format(".0s"));
    // svg.append("g")
    //   .attr("transform", "translate(29, 0)")
    //   .call(axis);

  });

var states = [
  () => {
    badColormap();
    draw();
  },
  () => {
    goodColormap();
    draw();
  }
];

cscheid.reveal.setDataTransitions(window._transitions, states);
