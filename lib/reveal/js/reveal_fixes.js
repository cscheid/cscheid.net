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
  var style = window.getComputedStyle(this);

  // https://stackoverflow.com/a/10730777
  // a will contain all text nodes of the element
  var n, a=[], walk=document.createTreeWalker(this,NodeFilter.SHOW_TEXT,null,false);
  while ((n=walk.nextNode())) a.push(n);
  var w = Math.max.apply(null, a.map((t) => textWidth(t.textContent, style)));
  var newSize = Number(style.fontSize.slice(0, -2)) * 0.95 * (this.clientWidth / w);
  return newSize + "px";
  
  // var thisNode = this;
  // var parent = this.parentElement;
  // while (parent !== null && parent.nodeName !== "SECTION") {
  //   parent = parent.parentElement;
  // }
  // if (parent === null) {
  //   console.error("Couldn't find slide, this will probably mangle the text");
  //   return this.style.fontSize;
  // }
  // var slideWidth = parent.getBoundingClientRect().width;
  
                         // // find slide element
                         

  // var lengths = a.map((t) => {
  //   var el = document.createElement("span");
  //   el.textContent = t.textContent;
  //   el.style["white-space"] = "nowrap";
  //   el.style["display"] = "inline";
  //   thisNode.appendChild(el);
  //   var result = el.getBoundingClientRect().width;
  //   thisNode.removeChild(el);
  //   return result;
  // });

  // var scaleFactor = 0.9 * (slideWidth / Math.max.apply(null, lengths)) * getEffectiveFontSize(this);
  // return scaleFactor + "em";
}
