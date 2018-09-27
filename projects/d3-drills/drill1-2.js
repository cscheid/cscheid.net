import * as drill from "./main.js";

function skeleton()
{
  // The bad indentation is on purpose!
  return function createSVG()
  {
    // write your function here!
    
  };
}

function setup()
{
  return [ d3.select("#svg-parent"), undefined ];
}

function resetDrill() {
  d3.select("#svg-parent").selectAll("*").remove();
}

window.onload = function() {
  var check = drill.makeChecker([
    {
      test: function() {
        return d3.select("#svg-parent").selectAll("svg").nodes().length === 1;
      },
      error: function(sel, data, result) {
        return ("Expected there to be 1 svg child of svg-parent, got " +
                d3.select("#svg-parent").selectAll("svg").nodes().length + " instead.");
      },
      name: "creates one svg node under #svg-parent"
    },
    {
      test: function() {
        return d3.select("#svg-parent").selectAll("svg").node().getAttribute("width") === '300';
      },
      error: function(sel, data, result) {
        return ("Expected the svg element to have width 300, got " +
                d3.select("#svg-parent").selectAll("svg").node().getAttribute("width") + " instead.");
      },
      name: "svg element has correct width"
    },
    {
      test: function() {
        return d3.select("#svg-parent").selectAll("svg").node().getAttribute("height") === '300';
      },
      error: function(sel, data, result) {
        return ("Expected the svg element to have height 300, got " +
                d3.select("#svg-parent").selectAll("svg").node().getAttribute("height") + " instead.");
      },
      name: "svg element has correct height"
    },
  ]);

  drill.configureDrillAndGo({
    reset: resetDrill,
    skeleton: skeleton,
    setup: setup,
    check: check
  });
};

