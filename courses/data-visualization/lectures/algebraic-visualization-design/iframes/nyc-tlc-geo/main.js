import * as cscheid from "/js/cscheid/cscheid.js"; // injects moveToFront etc into d3 object.

// found by trial and error...
var scale = 390000;
var center = [-73.97, 40.77];
var width, height;

var proj = d3.geoMercator();
var blueCanvas, redCanvas, legend;

function resetProj() {
  proj.translate([width/2, height/2]).center(center).scale(scale);
}
resetProj();

// function setPoints(sel) {
//   sel.attr("cx", d => proj([d.lon, d.lat])[0])
//     .attr("cy", d => proj([d.lon, d.lat])[1])
//     .attr("r", "0.5vh")
//     .attr("fill-opacity", "0.2");
// }
// function reset() {
//   resetProj();
//   setPoints(pickups);
//   setPoints(dropoffs);
// }

function cleanData(data) {
  var plon = data.getColumn(" pickup_longitude");
  var plat = data.getColumn(" pickup_latitude");
  var dlon = data.getColumn(" dropoff_longitude");
  var dlat = data.getColumn(" dropoff_latitude");
  return d3.range(data.count()).map(i => {
    return {
      pickup_longitude  : plon.get(i),
      pickup_latitude   : plat.get(i),
      dropoff_longitude : dlon.get(i),
      dropoff_latitude  : dlat.get(i)
    };
  }).filter(
    d => d.pickup_longitude !== 0.0 &&
      d.pickup_latitude     !== 0.0 &&
      d.dropoff_longitude   !== 0.0 &&
      d.dropoff_latitude    !== 0.0);
}

function buildChart(data, w, h) {
  width = w;
  height = h;

  d3.select("#main")
    .style("position", "relative");

  blueCanvas = d3.select("#main")
    .append("canvas")
    .attr("width", w)
    .attr("height", h)
    .style("position", "absolute");
  
  redCanvas = d3.select("#main")
    .append("canvas")
    .attr("width", w)
    .attr("height", h)
    .style("position", "absolute");

  cscheid.dom.setupCanvas(blueCanvas.node());
  cscheid.dom.setupCanvas(redCanvas.node());

  var svg = d3.select("#main")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("position", "absolute");
  legend = svg;
  
  function drawPoints(canvas, pts, accessor, fill, fillOpacity, radius) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = fill;
    ctx.globalAlpha = fillOpacity;

    pts.forEach(p => {
      var v = accessor(p);
      ctx.beginPath();
      ctx.arc(v[0], v[1], radius, 0, 360, false);
      ctx.fill();
    });
  }
  resetProj();

  var sz = cscheid.dom.convertToPixelUnits("0.5vh"); // , blueCanvas.node());
  drawPoints(blueCanvas.node(), data, p => {
    return proj([p.pickup_longitude, p.pickup_latitude]);
  }, "blue", 0.05, sz);
  drawPoints(redCanvas.node(), data, p => {
    return proj([p.dropoff_longitude, p.dropoff_latitude]);
  }, "red", 0.05, sz);
  
  var legendData = [
    { order: 0, color: "blue", name: "pickup" },
    { order: 1, color: "red",  name: "dropoff" }
  ];

  var legendGroups = svg.append("g")
      .selectAll("g")
      .data(legendData)
      .enter()
      .append("g");

  var circleRadius = 16;
  
  legendGroups.attr("transform", "translate(20, 30)");
  legendGroups.append("circle")
    .attr("cy", d => d.order * 2.5 * circleRadius)
    .attr("cx", circleRadius)
    .attr("r", circleRadius)
    .attr("fill", d => d.color);
  legendGroups.append("text")
    .attr("x", circleRadius * 2.5)
    .attr("y", d => d.order * 2.5 * circleRadius + 0.7 * circleRadius)
    .text(d => d.name)
    .style("font-size", "2em");
}

function toArrow(buffer)
{
  return Arrow.Table.from([new Uint8Array(buffer)]);
}

export function init() {
  return d3.buffer("/courses/data-visualization/data/nyc-tlc-jan-2014-1pct-sample.arrow")
    .then(toArrow)
    .then(cleanData)
    .then(data => {
      buildChart(data, window.innerWidth, window.innerHeight);
    });
}

export function blue() {
  blueCanvas.moveToFront();
  legend.moveToFront();
}

export function red() {
  redCanvas.moveToFront();
  legend.moveToFront();
}

export function dropHallucinator() {
  redCanvas.style("mix-blend-mode", "multiply");
  blueCanvas.style("mix-blend-mode", "multiply");
}

export function addHallucinator() {
  redCanvas.style("mix-blend-mode", null);
  blueCanvas.style("mix-blend-mode", null);
}

var states = [
  () => {
    addHallucinator();
    blue();
  },
  () => {
    addHallucinator();
    red();
  },
  () => {
    dropHallucinator();
  }
];

cscheid.reveal.setDataTransitions(window._transitions, states);
