import * as cscheid from "/js/cscheid/cscheid.js";

var canvasEl = cscheid.dom.makeCenteredElement(d3.select("#main"), "canvas")
    .attr("width", 600)
    .attr("height", 600);

var canvasCrosshair = d3.select("#main").select("div").append("canvas")
    .attr("width", 600)
    .attr("height", 600)
    .style("position", "relative")
    .style("top", "-600px");

d3.select("#main").select("div").style("height", "600px");

var ctx = cscheid.dom.setupCanvas(canvasEl.node());
var xhCtx = cscheid.dom.setupCanvas(canvasCrosshair.node());

// crosshairs
xhCtx.fillStyle = "rgba(0,0,0,0)";
xhCtx.fillRect(0,0,600,600);
xhCtx.strokeStyle = "black";
xhCtx.lineWidth = 1 * ctx.dpr;
xhCtx.beginPath();
xhCtx.moveTo(280, 300);
xhCtx.lineTo(320, 300);
xhCtx.moveTo(300, 280);
xhCtx.lineTo(300, 320);
xhCtx.stroke();

canvasEl.node().style.filter = "blur(10px)";

function tick()
{
  var now = cscheid.time.elapsed();

  // wipe
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,600,600);

  ctx.lineWidth = 30 * ctx.dpr;

  var nSteps = ~~(100 * Math.PI * 2);
  var radius = 200;
  var xScale = d3.scaleLinear().domain([-1, 1]).range([50, 550]);
  var yScale = d3.scaleLinear().domain([-1, 1]).range([550, 50]);

  for (var i=0; i<nSteps; ++i) {
    var angleBeg = (i / nSteps) * Math.PI * 2;
    var angleEnd = ((i+1.5) / nSteps) * Math.PI * 2;
    var lerp = d3.interpolateLab(d3.hcl(angleBeg * 180 / Math.PI, 70, 50), "white");

    var gapCenterAngle = now * (Math.PI * 2) % (Math.PI * 2);
    var sigma2 = 1;
    var weight = Math.max(
      Math.exp(-Math.pow(gapCenterAngle - angleBeg, 2) / sigma2),
      Math.exp(-Math.pow((gapCenterAngle + 2 * Math.PI) - angleBeg, 2) / sigma2),
      Math.exp(-Math.pow((gapCenterAngle - 2 * Math.PI) - angleBeg, 2) / sigma2),
    );

    ctx.strokeStyle = String(lerp(weight));
    ctx.beginPath();
    ctx.moveTo(xScale(Math.cos(angleBeg)), yScale(Math.sin(angleBeg)));
    ctx.lineTo(xScale(Math.cos(angleEnd)), yScale(Math.sin(angleEnd)));
    ctx.stroke();
  }

  window.requestAnimationFrame(tick);
}

tick();
