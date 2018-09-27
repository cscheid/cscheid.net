import * as drill from "./main.js";

function skeleton()
{
    // The bad indentation is on purpose!
    return function selectSVG()
{
    // write your function here!

};
}

function setup()
{
    var selection = d3.select("#svg");
    return [ selection, [] ];
}

function resetDrill()
{
}

window.onload = function() {
    var check = drill.makeChecker([
        drill.drillChecks.isSelection,
        {
            test: function(sel, data, result) {
                return result.nodes().length === 1;
            },
            error: function(sel, data, result) {
                return "Expected a selection with one node, got " + String(result.nodes().length) + " instead.";
            },
            name: "returns selection object with one node"
        },
        {
            test: function(sel, data, result) {
                return result.node().id === 'svg';
            },
            error: function(sel, data, result) {
                var node = result.node();
                if (node.id) {
                    return "Expected a selection of node with id svg, got '" + result.node().id + "' instead.";
                } else {
                    return "Expected a selection of node svg, got " + String(result.node()) + " instead.";
                }
            },
            name: "returns selection object with the correct node"
        }
    ]);
  drill.configureDrillAndGo({
    reset: resetDrill,
    skeleton: skeleton,
    setup: setup,
    check: check
  });
};

