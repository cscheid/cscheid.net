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
// Student designs - Spring 2018

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

function rgb(r, g, b) {
  return "rgb(" + r + "," + g + "," + b + ")";
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

//////////////////////////////////////////////////////////////////////////////
// Student designs - Fall 2018

var chart7 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart7").appendChild(chart7);

var xScale = d3.scaleLinear().domain([1969, 1985]).range([0, 600]);

plotAll(chart7, ukDriverFatalities, "rect", {
    height: function(row) {
        var yScale = d3.scaleLinear().domain([0, 30000]).range([0, 300]);
        return yScale(row.count);
    },
    width: function(row) {
        return xScale(1970) - xScale(1969);
    },
    x: function(row) {
        return xScale(row.year);
    },
    y: function(row) {
        var yScale = d3.scaleLinear().domain([0, 30000]).range([300, 0]);
        return yScale(row.countThisYear + row.count);
    },
    fill: function(row) {
        return String(d3.hsl((row.month / 12) * 360, 1, 0.5));
    }
});

var chart8 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart8").appendChild(chart8);

plotAll(chart8, ukDriverFatalities, "rect", {
    width: rectWidth(480), // fudge the value so widths are smaller
    height: rectHeight(300),
    x: function(d, i) {
        return rectX(480)(d, i) + (d.year - 1969) * 7;
    },
    y: rectY(300)
});

function wedgePathAt(startingAngle, endingAngle, center, radius)
{
    startingAngle = startingAngle * Math.PI / 180;
    endingAngle = endingAngle * Math.PI / 180;
    var p1 = [Math.cos(startingAngle) * radius,
              - Math.sin(startingAngle) * radius];
    var p2 = [Math.cos(endingAngle) * radius - p1[0],
              - Math.sin(endingAngle) * radius - p1[1]];
    var largeArc = (endingAngle - startingAngle) > Math.PI ? "1" : "0";
    return (" M " + center +
            " l " + p1 +
            " a " + radius + "," + radius + " 0 " + largeArc + " 1 " + p2);
};

var chart9 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart9").appendChild(chart9);

var angleScale = d3.scaleLinear().domain([0, totalFatalities]).range([0, 360]);
plotAll(chart9, ukDriverFatalities, "path", {
    d: function(d, i) {
        var startingAngle = angleScale(d.countUpToThisYear + d.countThisYear);
        var endingAngle   = angleScale(d.countUpToThisYear + d.countThisYear + d.count);
        return wedgePathAt(startingAngle, endingAngle, [300, 150], 140);
    },
    fill: function(row) { return String(d3.hsl((row.month / 12) * 360, 1, 0.5)); }
});

var chart10 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart10").appendChild(chart10);

var hueScale = d3.scaleLinear().domain([1969, 1975]).range([0, 360]);
var cScale = d3.scaleOrdinal().range(d3.schemeCategory20);

plotAll(chart10, ukDriverFatalities, "path", {
    d: function(d, i) {
        var startingAngle = angleScale(d.countUpToThisYear + d.countThisYear);
        // to round up, we use an ending angle that's one pixel bigger than necessary.
        // oen pixel in degrees at a radius of 140 is 140/360 = 0.3888... we round up to guarantee we cover the pixel
        
        var endingAngle   = angleScale(d.countUpToThisYear + d.countThisYear + d.count) + 1;
        return wedgePathAt(startingAngle, endingAngle, [300, 150], 140);
    },
    fill: function(row) {
        return cScale(row.year); // String(d3.hsl(hueScale(row.year), 0.9, 0.5));
    }
});

//////////////////////////////////////////////////////////////////////////////

var chart11 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart11").appendChild(chart11);

// function posY(row) {
//   return (1984 - row.year) / (1984 - 1969) * 300;
// }

function posY(row) {
  return (row.year - 1969) / (1984 - 1969) * 300;
}


function countY(row) {
  return (300 / (1984 - 1969)) - ((row.count / 2500) * (300 / (1984 - 1969)));
}

plotAll(chart11, ukDriverFatalities, "line", {
  stroke: function() { return "black"; },
  
  x1: function(row) { return row.month * 600 / 12; },
  x2: function(row) { return (row.month + 1) * 600 / 12; },
  
  y1: function(row) { return posY(row) + countY(row); },
  y2: function(row) { return posY(row) + countY(row); }
});

var chart12 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart12").appendChild(chart12);

function countY_chart12(count) {
  return (300 / (1984 - 1969)) - ((count / (250 * 12)) * (300 / (1984 - 1969)));
}

plotAll(chart12, ukDriverFatalities, "line", {
  stroke: function() { return "black"; },
  
  x1: function(row) { return row.month * 600 / 12; },
  x2: function(row) { return (row.month + 1) * 600 / 12; },
  
  y1: function(row) { return posY(row) + countY_chart12(row.countThisYear); },
  y2: function(row) { return posY(row) + countY_chart12(row.countThisYear + row.count); }
});

var chart13 = make("svg", { width: 600, height: 300, "class": "my-chart" });
document.getElementById("chart13").appendChild(chart13);

plotAll(chart13, ukDriverFatalities, "rect", {
  stroke: function() { return "black"; },
  fill: function(row) {
    var amount = (row.year - 1969) / (1984 - 1969);
    amount = 128 + amount * 127;
    return rgb(amount, amount, amount);
  },

  x: function(row) { return row.month / 12 * 600; },
  y: function(row) { return 300 - (row.count / 35000 * 300) - (row.countUpToThisYearByMonth / 35000 * 300); },

  width: function() { return 600 / 12; },
  height: function(row) { return row.count / 35000 * 300; },
});
