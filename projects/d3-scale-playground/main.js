
//////////////////////////////////////////////////////////////////////////////

function skeleton()
{
    // The bad indentation is on purpose!
    return function makeScale()
{
    // return your scale here!
    return d3.scaleLinear()
        .domain([-1, 0, 1])
        .range(["blue", "gray", "red"]);
};
}
var editor;

function run()
{
    var f;
    try {
        f = eval("(" + editor.getValue() + ")");
        updateColorLegend(f());
    } catch (e) {
        alert("Compile error: " + e.toString());
    }
}

function initEditor()
{
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/solarized_light");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setValue(String(skeleton()));

    editor.focus();
    
    editor.commands.addCommand({
        name: "replace",
        bindKey: {win: "Ctrl-Enter", linux: "Ctrl-Enter", mac: "Ctrl-Enter"},
        exec: function() { run(); }
    });
    
    d3.select("#run")
        .append("button")
        .text("Run")
        .on("click", run);
}
    
var rectsSel;
var axisG;
var mainScale = d3.scaleLinear().domain([-1, 0, 1]).range(["blue", "gray", "red"]);
var axisScale;

function updateColorLegend(scale)
{
    var scaleDomainExtent = [
        scale.domain()[0],
        scale.domain()[scale.domain().length-1]];
    
    var intermediateScale = d3.scaleLinear()
        .domain([0,1])
        .range(scaleDomainExtent);

    rectsSel.attr("fill", d => scale(intermediateScale(d)));

    // axisScale is a "fake scale" that composes pieces of legendXScale
    // and scale to make the axis object happy
    // FIXME this won't work well with a log or power scale
    
    axisG.selectAll("*").remove();
    var axis = d3.axisBottom(axisScale);
    axisScale.domain(scaleDomainExtent);
    axisG.call(axis);
}


function initLegend()
{
    var svg = d3.select("#d3-scale-legend")
        .append("svg")
        .attr("width", 920)
        .attr("height", 100);

    var data = d3.range(100).map(x => x / 99);
    var legendExtent = [20, 900];
    var legendXScale = d3.scaleLinear().domain([0, 1]).range(legendExtent);
   
    axisG = svg.append("g")
        .attr("transform", "translate(0, 60)");
    axisScale = d3.scaleLinear()
        .range(legendXScale.range());

    var rects = svg.append("g")
        .selectAll()
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => ~~legendXScale(d))
        .attr("y", 10)
        .attr("height", 50)
        .attr("width", (d,i) => (~~legendXScale(data[i+1])) - (~~legendXScale(data[i])));
    rectsSel = rects;
    updateColorLegend(mainScale);
}

initEditor();
initLegend();
