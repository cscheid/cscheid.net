var state = {
    file: "",
    columns: [ {name: "", data: []},
               {name: "", data: []} ],
    svg: null,
    scales: [ d3.scaleLinear(), d3.scaleLinear() ],
    axes: [ d3.axisBottom(), d3.axisLeft() ],
    axesGroups: null
};

//////////////////////////////////////////////////////////////////////////////

function createScatterplotSVG()
{
    state.svg = d3.select("#main")
        .append("svg")
        .attr("width", 400)
        .attr("height", 400);
    state.scales[0].range([30, 380]);
    state.scales[1].range([380, 20]);
    state.axesGroups = [
        state.svg.append("g")
            .attr("transform", "translate(0, 380)"),
        state.svg.append("g")
            .attr("transform", "translate(30, 0)")];
    state.axesGroups[0]
        .call(state.axes[0].scale(state.scales[0]));
    state.axesGroups[1]
        .call(state.axes[1].scale(state.scales[1]));
}

createScatterplotSVG();

function tryToMakeScatterplot() {
    function setAttrs(sel) {
        sel.attr("cx", function(d) { return state.scales[0](d[state.columns[0].name]); })
            .attr("cy", function(d) { return state.scales[1](d[state.columns[1].name]); })
            .attr("r", 2)
            .attr("fill", "black");
    }
    if (state.columns[0].loaded && state.columns[1].loaded) {
        var newData = [];
        for (var i=0; i<state.columns[0].data.length; ++i ) {
            var obj = {};
            obj[state.columns[0].name] = Number(state.columns[0].data[i]);
            obj[state.columns[1].name] = Number(state.columns[1].data[i]);
            newData.push(obj);
        }
        state.scales[0].domain(d3.extent(newData, function(d) { return d[state.columns[0].name]; }));
        state.scales[1].domain(d3.extent(newData, function(d) { return d[state.columns[1].name]; }));
        var update = state.svg.selectAll("circle")
                .data(newData);
        var exit = update.exit();
        var enter = update.enter();
        exit.transition().attr("r", 0).transition().remove();
        enter.append("circle")
            .call(setAttrs);
        update.transition().call(setAttrs);
        state.axesGroups[0].transition().call(state.axes[0]);
        state.axesGroups[1].transition().call(state.axes[1]);
    }
}

function loadData(which) {
    d3.json("/get_data/" + state.file + "/" + state.columns[which].name,
            function(data) {
                state.columns[which].data = data;
                state.columns[which].loaded = true;
                console.log("loaded data", which, data);
                tryToMakeScatterplot();
            });
}

function changeColumnSelection(which) {
    state.columns[which].name = d3.select("#column_list_" + which).property("value");
    loadData(which);
}

function loadColumns() {
    d3.json("/get_column_list/" + state.file, function(data) {
        debugger;
        function setData(sel) {
            sel.selectAll("option").remove();
            sel.selectAll("option")
                .data(data)
                .enter()
                .append("option")
                .attr("value", function(d) { return d; })
                .text(function(d) { return d; });
        }
        console.log(data);
        setData(d3.select("#column_list_0"));
        setData(d3.select("#column_list_1"));
        // reset data
        state.columns[0].loaded = false;
        state.columns[1].loaded = false;
        state.columns[0].data = [];
        state.columns[1].data = [];
        changeColumnSelection(0);
        changeColumnSelection(1);
    });
}

function changeFileSelection() {
    state.file = d3.select("#file_list").property("value");
    loadColumns();
}

function getFileList() {
    d3.json("/get_file_list", function(data) {
        d3.select("#file_list")
            .selectAll("option")
            .data(data)
            .enter()
            .append("option")
            .attr("value", function(d) { return d; })
            .text(function(d) { return d; });
        changeFileSelection();
    });
}

getFileList();

d3.select("#file_list")
    .on("change", changeFileSelection);

d3.select("#column_list_0")
    .on("change", function() {
        changeColumnSelection(0);
    });

d3.select("#column_list_1")
    .on("change", function() {
        changeColumnSelection(1);
    });
