import * as drill from "./main.js";

function skeleton()
{
    // The bad indentation is on purpose!
    return function setCircleRadii(selection)
{
    // write your function here!
    
};
}

function setup()
{
  return [ d3.selectAll("circle"), undefined ];
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
  var data = [ 1, 2, 3 ];

  var resetData = [
    { cx: 100, cy: 50, fill: "red" },
    { cx: 130, cy: 50, fill: "green" },
    { cx: 160, cy: 50, fill: "blue" }
  ];
  
  // <circle cx="100" cy="50" r="5" fill="red"></circle>
  // <circle cx="130" cy="50" r="5" fill="green"></circle>
  // <circle cx="160" cy="50" r="5" fill="blue"></circle>

  d3.select("#svg").selectAll("*").remove();
  d3.select("#svg").selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx",   function(d, i) { return resetData[i].cx; })
    .attr("cy",   function(d, i) { return resetData[i].cy; })
    .attr("r",    5)
    .attr("fill", function(d, i) { return resetData[i].fill; });
}

window.onload = function() {
  var check = drill.makeChecker([
    {
      test: function(sel, data, result) {
        var radii = d3.selectAll("circle").nodes()
            .map(function(n) { return n.getAttribute("r"); });
        var testRadii = ["10", "20", "30"];
        for (var i=0; i<radii.length; ++i) {
          if (radii[i] !== testRadii[i])
            return false;
        }
        return true;
      },
      error: function(sel, data, result) {
        var radii = d3.selectAll("circle").nodes()
            .map(function(n) { return n.getAttribute("r"); });
        var testRadii = ["10", "20", "30"];
        for (var i=0; i<radii.length; ++i) {
          if (radii[i] !== testRadii[i]) {
            return ("Expected circle #" + i + " to have radius " + testRadii[i] +
                    ", but it instead has radius " + radii[i]);
          }
        }
        return "BOOO";
      },
      name: "circles have wrong radius"
    }
    // drillChecks.selectionContainsOnlyGivenElementName("circle"),
    // drillChecks.selectionHasLength(3),
    // drillChecks.selectionPassesPredicate(function(d) {
    //     return this.parentNode.id === 'group-2';
    // }, function(node) {
    //     return "parent node with id " + node.parentNode.id;
    // }, "elements have parent with id group-2")
  ]);
  drill.configureDrillAndGo({
    reset: resetDrill,
    skeleton: skeleton,
    setup: setup,
    check: check
  });
};

