import * as drill from "./main.js";

function skeleton()
{
    // The bad indentation is on purpose!
    return function updateEvenCircles(selection, newData)
{
    // write your function here!
    
};
}

var dataGlobal; // kludge to observe object strict equality
function setup()
{
  var selection = d3.select("#svg");
  var data = [
	  { key: "4", value: 6},
    { key: "3", value: 12},
    { key: "2", value: 5},
    { key: "1", value: 10}
  ];
  var elements = selection
      .selectAll()
	    .data(data, function(d) { return d.key; })
	    .enter().append("circle");
  elements.each(function(d) {
    this.__olddata__ = d;
  });
  var newData = [{ key: "2", value: 100},
                 { key: "4", value: 200}];
  return [ elements, newData ];
}

function resetDrill()
{
  d3.select("#preview")
    .selectAll("*").remove();
  d3.select("#preview")
    .append("svg").attr("id", "svg");
  // d3.select("#table").selectAll("*").remove();
}

function check(selection, data, selectionResult)
{
  if (selectionResult === undefined) {
    return ["Expected function to return a selection, got undefined instead"];
  }
  if (selectionResult.nodes().length !== 2) {
    return ["Expected selection to contain two nodes, got " +
            selectionResult.nodes().length + " instead."];
  }
  var report = [];
  var newCircleReported = false;
  selectionResult.each(function(d) {
    if (this.__olddata__ === undefined ||
        this.__olddata__.key === undefined) {
      if (!newCircleReported) {
        newCircleReported = true;
        report.push("Expected to find circles that existed before function was called, but got newly-created circles instead.");
      }
      return;
    }
  });
  selection.each(function(d) {
    if (this.__olddata__.key % 2 === 1) {
      // odd keys should have been untouched
      if (this.__olddata__ !== this.__data__) {
        report.push("Expected circles with odd keys to be untouched, but circle with key " +
                    this.__olddata__.key + " changed to " + this.__data__.key +
                    " instead.");
      }
    } else {
      // even keys should have changed
      if (this.__olddata__ === this.__data__) {
        report.push("Expected circles with even keys to be changed, but circle with key " +
                    this.__olddata__.key + " remained the same.");
      } else if (this.__olddata__.key !== this.__data__.key) {
        report.push("Expected circles with even keys to keep the same key, but circle with key " +
                    this.__olddata__.key + " received new key " + this.__data__.key);
      }
    }
  });
  
  if (report.length === 0)
    report.push("Success!");
  return report; 
}

window.onload = function() {
  drill.configureDrillAndGo({
    reset: resetDrill,
    skeleton: skeleton,
    setup: setup,
    check: check
  });
};
