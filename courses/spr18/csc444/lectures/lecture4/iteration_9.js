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
    // count = 0 -> #ffffff (cyan)

    var amount = (2500 - count) / 2500 * 255;
    var s = toHex(amount), s2 = toHex(amount / 2 + 127), s3 = toHex(amount / 2 + 127);
    return "#" + s + s2 + s3;
}

function radius(amount) {
}

//////////////////////////////////////////////////////////////////////////////
// This is what we'll do now: different getters for different sizes

var chart4 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart4").appendChild(chart4);

var chart5 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart5").appendChild(chart5);

var chart6 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart6").appendChild(chart6);

var maxTotal = -Infinity;
for (var i=0; i<ukDriverFatalities.length; ++i) {
    maxTotal = Math.max(maxTotal, ukDriverFatalities[i].count);
}

plotAll(chart4, ukDriverFatalities, "rect", {
    width: function(row) {
        var count_proportion = row.count / maxTotal;
        return Math.ceil(600 / (1984 - 1969 + 1) * count_proportion);
    },
    height: function() {
        return Math.ceil(300/12);
    },
    x: function(row) {
        return Math.ceil(600 / (1984 - 1969 + 1)) * (row.year - 1969);
    },
    y: function(row) {
        return Math.ceil(300 / 12) * (11 - row.month);
    }
});

plotAll(chart5, ukDriverFatalities, "line", {
    x1: function(row) {
        return Math.ceil(row.month * 600/12);
    },
    x2: function(row) {
        return Math.ceil((row.month + 1) * 600/12);
    },
    y1: function(row) {
        var count_proportion = row.count / maxTotal;
        return 300 - count_proportion * 300;
    },
    y2: function(row) {
        var count_proportion = row.count / maxTotal;
        return 300 - count_proportion * 300;
    },
    stroke: function(row) {
        return "black";
    }
});

function rgbColor(r, g, b) {
    var s = toHex(r * 255), s2 = toHex(g * 255), s3 = toHex(b * 255);
    return "#" + s + s2 + s3;
}


function lineColor(row) {
    var v = (row.year - 1969) / (1984 - 1969);
    return rgbColor(v, 1-v, 1-v*0.5);
}

plotAll(chart6, ukDriverFatalities, "line", {
    x1: function(row) {
        return Math.ceil(row.month * 600/12);
    },
    x2: function(row) {
        return Math.ceil((row.month + 1) * 600/12);
    },
    y1: function(row) {
        var count_proportion = row.count / maxTotal;
        return 300 - count_proportion * 300;
    },
    y2: function(row) {
        var count_proportion = row.count / maxTotal;
        return 300 - count_proportion * 300;
    },
    stroke: lineColor
});
