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
    check = makeChecker([
        drillChecks.isSelection,
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
                return "Expected a selection of node svg, got '" + sel.node().id + "' instead.";
            },
            name: "returns selection object with the correct node"
        }
    ]);
};

