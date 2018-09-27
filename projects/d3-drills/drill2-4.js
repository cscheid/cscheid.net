function skeleton()
{
    // The bad indentation is on purpose!
    return function removeEvenCircles(selection)
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
  if (selectionResult.nodes().length !== 3) {
    return ["Expected removal selection to contain three nodes, got " +
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
    }
  });
  var oddElementsRemaining = d3.selectAll("#preview svg circle")
      .filter((d) => d.value % 2 === 1)
      .nodes().length;
  var totalElementsRemaining = d3.selectAll("#preview svg circle")
      .nodes().length;
  if (totalElementsRemaining !== 1) {
    report.push("Expected there to be 1 remaining element, but got " +
                totalElementsRemaining + " instead.");
  } else if (oddElementsRemaining !== 1) {
    report.push("Expected there to be 1 remaining element with odd values, but got " +
                oddElementsRemaining + " instead.");
  }
  
  if (report.length === 0)
    report.push("Success!");
  return report; 
}
