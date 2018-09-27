import * as drill from "./main.js";

function skeleton()
{
    // The bad indentation is on purpose!
    return function createCircles(selection, data)
{
    // write your function here!
    
};
}

function setup()
{
  var selection = d3.select("#svg");
  var data = [{ v1: 10, v2: 20 }, { v1: 30, v2: 20 }, { v1: 40, v2: 30 }];
  return [ selection, data ];
}

function resetDrill()
{
  d3.select("#svg").selectAll("*").remove();
}

function check(selection, data)
{
  var report = [];
  
  //////////////////////////////////////////////////////////////////////////
  var all = selection.selectAll("*");
  if (all.nodes().length !== 3) {
    report.push("Failed: expected there to be 3 elements, got " + String(all.nodes().length) + " instead.");
  }

  //////////////////////////////////////////////////////////////////////////
  var circles = selection.selectAll("circle");
  if (circles.nodes().length !== 3) {
    report.push("Failed: expected there to be 3 circles, got " + String(circles.nodes().length) + " instead.");
  }

  //////////////////////////////////////////////////////////////////////////
  try {
    var nodes = circles.nodes();
    for (var i=0; i<data.length; ++i) {
      if (nodes[i].__data__ !== data[i]) {
        report.push("Failed: child " + String(i) + " not bound to appropriate data entry.");
      }
    };
  } catch (e) {
    console.warn("Couldn't run check for bound data.");
  };

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
