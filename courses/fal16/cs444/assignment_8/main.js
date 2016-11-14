// HINT: Consider starting with a smaller, hand-written version of a tree, instead
// of the one in flare.js.

var data = flare;

//////////////////////////////////////////////////////////////////////////////

function setTreeSize(tree)
{
    if (tree.children !== undefined) {
        var size = 0;
        for (var i=0; i<tree.children.length; ++i) {
            size += setTreeSize(tree.children[i]);
        }
        tree.size = size;
    }
    if (tree.children === undefined) {
        // do nothing, tree.size is already defined for leaves
    }
    return tree.size;
};

function setTreeCount(tree)
{
    if (tree.children !== undefined) {
        var count = 0;
        for (var i=0; i<tree.children.length; ++i) {
            count += setTreeCount(tree.children[i]);
        }
        tree.count = count;
    }
    if (tree.children === undefined) {
        tree.count = 1;
    }
    return tree.count;
}

function setTreeDepth(tree, depth)
{
    // WRITE THIS PART. Use the code above as example
};

setTreeSize(data);
setTreeCount(data);
var maxDepth = setTreeDepth(data, 0);

//////////////////////////////////////////////////////////////////////////////
// THIS IS THE MAIN CODE FOR THE TREEMAPPING TECHNIQUE

function setRectangles(rect, tree, attrFun)
{
    var i;
    tree.rect = rect;

    if (tree.children !== undefined) {
        var cumulativeSizes = [0];
        for (i=0; i<tree.children.length; ++i) {
            cumulativeSizes.push(cumulativeSizes[i] + attrFun(tree.children[i]));
        }
        var height = rect.y2 - rect.y1, width = rect.x2 - rect.x1;
        var scale = d3.scaleLinear()
                .domain([0, cumulativeSizes[cumulativeSizes.length-1]]);

        var border = 5;
        
        // WRITE THIS PART.
        // hint: set the range of the "scale" variable above appropriately,
        // depending on the shape of the current rectangle.
        for (i=0; i<tree.children.length; ++i) {
            var newRect = { x1: ???, x2: ???, y1: ???, y2: ??? };
            setRectangles(newRect, tree.children[i], attrFun);
        }
    }
}

var width = window.innerWidth;
var height = window.innerHeight;

setRectangles(
    {x1: 0, x2: width, y1: 0, y2: height}, data,
    function(t) { return t.size; }
);

function makeTreeNodeList(tree, lst)
{
    lst.push(tree);
    if (tree.children !== undefined) {
        for (var i=0; i<tree.children.length; ++i) {
            makeTreeNodeList(tree.children[i], lst);
        }
    }
}

var treeNodeList = [];
makeTreeNodeList(data, treeNodeList);

var gs = d3.select("#svg")
        .attr("width", width)
        .attr("height", height)
        .selectAll("g")
        .data(treeNodeList)
        .enter()
        .append("g");

function setAttrs(sel) {
    // WRITE THIS PART.
    sel.attr("width", function(treeNode) { 
    }).attr("height", function(treeNode) {
    }).attr("x", function(treeNode) {
    }).attr("y", function(treeNode) {
    }).attr("fill", function(treeNode) {
    }).attr("stroke", function(treeNode) {
    }).attr("title", function(treeNode) {
        return treeNode.name;
    });
}

gs.append("rect").call(setAttrs);

d3.select("#size").on("click", function() {
    setRectangles(
        {x1: 0, x2: width, y1: 0, y2: height}, data,
        function(t) { return t.size; }
    );
    d3.selectAll("rect").transition().duration(1000).call(setAttrs);
});

d3.select("#count").on("click", function() {
    setRectangles(
        {x1: 0, x2: width, y1: 0, y2: height}, data,
        function(t) { return t.count; }
    );
    d3.selectAll("rect").transition().duration(1000).call(setAttrs);
});
