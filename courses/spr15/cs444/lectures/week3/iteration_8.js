//////////////////////////////////////////////////////////////////////////////
// what if we wanted to plot with different shapes?

function plotAll(svg, data, element, attributeGetters)
{
    var obj;
    for (var i=0; i<data.length; ++i) {
        obj = {};
        for (var key in attributeGetters) {
            obj[key] = attributeGetters[key](data[i], i);
        }
        svg.appendChild(make(element, obj));
    }
}

//////////////////////////////////////////////////////////////////////////////
// these are what we had before

function rectWidth(svgWidth) { 
    return function() { 
        return Math.ceil(svgWidth / ukDriverFatalities.length);
    };
}

function rectHeight(svgHeight) {
    return function(row, index) { 
        return row.count / 2500 * svgHeight; 
    };
}

function rectX(svgWidth) { 
    return function(row, index) {
        return index * svgWidth / ukDriverFatalities.length; 
    };
}

function rectY(svgHeight) {
    return function(row, index) {
        return svgHeight - (row.count / 2500 * svgHeight);
    };
}

function toHex(v) {
    var str = "00" + Math.floor(Math.max(0, Math.min(255, v))).toString(16);
    return str.substr(str.length-2);
}

function color(count) {
    // count = 2500 -> #000000 (black)
    // count = 0 -> #ffffff (white)

    var amount = (2500 - count) / 2500 * 255;
    var s = toHex(amount);
    return "#" + s + s + s;
}

function radius(amount) {
}

//////////////////////////////////////////////////////////////////////////////
// This is what we'll do now: different getters for different sizes

var chart1 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart1").appendChild(chart1);
plotAll(chart1, ukDriverFatalities, "rect", {
    width: function() { return Math.ceil(600 / (1984 - 1969 + 1)); },
    height: function() { return Math.ceil(300 / 12); },
    x: function(row) { return Math.ceil(600 / (1984 - 1969 + 1)) * (row.year - 1969); },
    y: function(row) { return Math.ceil(300 / 12) * (11 - row.month); },
    fill: function(row) {
        return color(row.count);
    }
});

var chart2 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart2").appendChild(chart2);
plotAll(chart2, ukDriverFatalities, "circle", {
    cx: function(row) { return Math.ceil(600 / (1984 - 1969 + 1)) * (row.year - 1969 + 0.5); },
    cy: function(row) { return Math.ceil(300 / 12) * (11 - row.month + 0.5); },
    r: function(row) {
        return row.count / 200;
    },
    stroke: function() { return "blue"; },
    fill: function() { return "white"; }
});

var chart3 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart3").appendChild(chart3);
plotAll(chart3, ukDriverFatalities, "rect", {
            width: rectWidth(600),
            height: rectHeight(300),
            x: rectX(600),
            y: rectY(300)
        });
