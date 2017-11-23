function skeleton()
{
    // The bad indentation is on purpose!
    return function createTable(selection, data)
{
    // write your function here!
    
};
}

function setup()
{
    var selection = d3.select("#table");
    var data = [{ c1: "row 1, col 1", c2: "row 1, col 2" }, 
                { c1: "row 2, col 1", c2: "row 2, col 2" }];
    return [ selection, data ];
}

function resetDrill()
{
    d3.select("#preview")
        .selectAll("*").remove();
    d3.select("#preview")
        .append("table").attr("id", "table");
    // d3.select("#table").selectAll("*").remove();
}

function check(selection, data)
{
    var report = [];
    
    //////////////////////////////////////////////////////////////////////////
    var rows = selection.selectAll("tr");
    if (rows.nodes().length !== 2) {
        report.push("Failed: expected there to be 2 tr elements, got " + String(rows.nodes().length) + " instead.");
    }

    //////////////////////////////////////////////////////////////////////////
    var els = selection.selectAll("td");
    if (els.nodes().length !== 4) {
        report.push("Failed: expected there to be 4 td elements, got " + String(els.nodes().length) + " instead.");
    }

    //////////////////////////////////////////////////////////////////////////
    // try {
    //     var nodes = circles.nodes();
    //     for (var i=0; i<data.length; ++i) {
    //         if (nodes[i].__data__ !== data[i]) {
    //             report.push("Failed: child " + String(i) + " not bound to appropriate data entry.");
    //         }
    //     };
    // } catch (e) {
    //     console.warn("Couldn't run check for bound data.");
    // };

    if (report.length === 0)
        report.push("Success!");
    return report; 
}
