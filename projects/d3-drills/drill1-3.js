import * as drill from "./main.js";

function skeleton()
{
    // The bad indentation is on purpose!
    return function selectCircles()
{
    // write your function here!
    
};
}

function setup()
{
  return [ d3.select("#svg"), undefined ];
}

function a(f) { return function(d) { return d[f]; }; };
function accessAll(lst) {
  return function(sel) {
    lst.forEach(function(field) {
      sel.attr(field, a(field));
    });
  };
}

function resetDrill() {
  d3.select("#svg").selectAll("*").remove();
  d3.select("#svg")
    .selectAll("circle")
    .data([ {cx:100,cy:50, r:20, fill:"red"},{cx:130,cy:50, r:20, fill:"green"},{cx:160,cy:50, r:20, fill:"blue"} ])
    .enter()
    .append("circle")
    .call(accessAll(['cx', 'cy', 'r', 'fill']));
}

window.onload = function() {
  var check = drill.makeChecker([
    drill.drillChecks.isSelection,
    drill.drillChecks.selectionContainsOnlyGivenElementName("circle"),
    drill.drillChecks.selectionHasLength(3)
  ]);
  drill.configureDrillAndGo({
    reset: resetDrill,
    skeleton: skeleton,
    setup: setup,
    check: check
  });
};

