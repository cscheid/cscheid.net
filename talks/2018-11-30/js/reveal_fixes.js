// a collection of JS code to make Reveal.JS a little more pleasant to
// work with.
//
// Features
//
// If you want some text to fit horizontally along your slide, and do
// it responsively (so it works on a big screen and a small screen too)
// use the CSS class line-fit. It's a bit of a hack, but it kind of works!
// 
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// https://codepen.io/branneman/pen/NxxNQj

document.addEventListener('DOMContentLoaded', function() {
  var resizeEnd;
  window.addEventListener('resize', function() {
    console.log('fired');
    window.clearTimeout(resizeEnd);
    resizeEnd = window.setTimeout(function() {
      // option 1
      var evt = new Event('resize-end');
      window.dispatchEvent(evt);
    }, 100);
  });
});

window.addEventListener('resize-end', fixCSS);

//////////////////////////////////////////////////////////////////////////////

function fixCSS() {
  // reveal.js loves to stick style attributes into things, so
  // we're forced to outgun them. All of this belongs in a CSS declaration, sigh.
  d3.selectAll("aside").style("display", "none");
  d3.selectAll("section.grid").style("display", "grid");
  d3.selectAll("section.present")
    .style("top", "0px")
    .style("width", "95%")
    .style("height", "95%");

  d3.selectAll("div.slides").style("left", "2.5%");

  d3.selectAll("div.line-fit").style("font-size", rescaleFont);
}

function textWidth(text, style) {
  var canvas = document.getElementById("hidden-canvas");
  if (canvas === null) {
    canvas = d3.select("body")
      .append("canvas")
      .attr("id", "hidden-canvas")
      .attr("width", "1500px")
      .attr("height", "300px")
      .attr("display", "none")
      .node();
  }
  var ctx = canvas.getContext("2d");
  ctx.font = style.fontSize + " " + style.fontFamily;
  return ctx.measureText(text).width;
}

// big ol' hack
function rescaleFont() {
  if (this._fontHasAlreadyBeenRescaled) {
    return this._fontHasAlreadyBeenRescaled;
  }
  console.log(this, this._fontHasAlreadyBeenRescaled);
  var style = window.getComputedStyle(this);

  if (this.clientWidth === 0) {
    // for some reason, the web browser thinks this is zero-sized. So we'll refuse to store the result,
    // but tell d3 that, for now, font size should be unset.
    return null;
  }
  // https://stackoverflow.com/a/10730777
  // a will contain all text nodes of the element
  var n, a=[], walk=document.createTreeWalker(this,NodeFilter.SHOW_TEXT,null,false);
  while ((n=walk.nextNode())) a.push(n);
  var w = Math.max.apply(null, a.map((t) => textWidth(t.textContent, style)));
  console.log("Current width: ", w);
  console.log("Client width: ", this.clientWidth);
  var scale;
  if (this.dataset.lineFitScale) {
    scale = Number(this.dataset.lineFitScale) / 100;
  } else {
    scale = 0.95;
  }
  var newSize = Number(style.fontSize.slice(0, -2)) * scale * (this.clientWidth / w);
  console.log("New size: ", newSize);
  var result = newSize + "px";
  this._fontHasAlreadyBeenRescaled = result;
  return result;
}
