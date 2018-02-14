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
    debugger;
    var data = [
        { id: "group-1", circles: [ {cx:100, cy:50, r:20, fill:"red"}, {cx:130, cy:50, r:20, fill:"green"}, {cx:160, cy:50, r:20, fill:"blue"} ] },
        { id: "group-2", circles: [ {cx:100, cy:90, r:20, fill:"cyan"}, {cx:130, cy:90, r:20, fill:"magenta"}, {cx:160, cy:90, r:20, fill:"yellow"} ] }
    ];

    d3.select("#svg").selectAll("*").remove();
    d3.select("#svg")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("id", function(d) { return d.id; })
        .selectAll("circle")
        .data(function(d) { return d.circles; })
        .enter()
        .append("circle")
        .call(accessAll(['cx', 'cy', 'r', 'fill']));
}

window.onload = function() {
    check = makeChecker([
        drillChecks.isSelection,
        drillChecks.selectionContainsOnlyGivenElementName("circle"),
        drillChecks.selectionHasLength(3),
        drillChecks.selectionPassesPredicate(function(d) {
            return this.parentNode.id === 'group-2';
        }, function(node) {
            return "parent node with id " + node.parentNode.id;
        }, "elements have parent with id group-2")
    ]);
};

