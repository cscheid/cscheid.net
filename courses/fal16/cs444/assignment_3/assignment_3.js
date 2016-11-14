var divs = ["div-scatterplot_1",
            "div-scatterplot_2",
            "div-scatterplot_3",
            "div-scatterplot_2b"];

var svgs = {};

for (var i=0; i<divs.length; ++i) {
    var divId = divs[i];
    var div = document.getElementById(divId);
    var svgId = divId.substr(4);
    svgs[svgId] = make("svg", { width: 500, height: 500, id: svgId });
    div.appendChild(svgs[svgId]);
}

function linearScale(min_d, max_d, min_r, max_r, v) {
    return (v - min_d) / (max_d - min_d) * (max_r - min_r) + min_r;
}

plotAll(svgs.scatterplot_1, scores, "circle", {
    cx: function(d) { return linearScale(350, 800, 0, 490, d.SATM); },
    cy: function(d) { return linearScale(300, 800, 500, 10, d.SATV); },
    r: function(d) { return linearScale(15, 35, 2, 10, d.ACT); },
    fill: function(d) { return rgb(1 - d.GPA / 4, d.GPA / 4, 0); }
});

plotAll(svgs.scatterplot_2, scores, "circle", {
    cx: function(d) { return linearScale(15, 35, 0, 490, d.ACT); },
    cy: function(d) { return linearScale(1.5, 4, 500, 10, d.GPA); },
    r: function(d) { return linearScale(200, 800, 2, 10, d.SATM); },
    fill: function(d) { return rgb(linearScale(200, 800, 0, 1, d.SATV),
                                   0, 0); }
});

plotAll(svgs.scatterplot_3, scores, "circle", {
    cx: function(d) { return linearScale(600, 1600, 0, 490, d.SATV + d.SATM); },
    cy: function(d) { return linearScale(1.5, 4, 500, 10, d.GPA); },
    r: function(d) { return 5; },
    fill: function(d) { return rgb(linearScale(15, 35, 0, 1, d.ACT), 0, 0); }
});

// Based on mdeverhansen's solution
function axisMaker(el, xLabel, yLabel, xTics, yTics) {
    var xLine = make("line",{ x1:25, y1:475, x2:500, y2:475, "stroke":"black", "stroke-width":"1px"});
    var yLine = make("line", { x1:25, y1:475, x2:25, y2:0, "stroke":"black", "stroke-width":"1px"});
    
    var xAxLabel = make("text", { x:225, y:500, "font-family":"Verdana", "font-size":"12", "transform":"rotate(0 0,0)" });
    xAxLabel.innerHTML = xLabel;
    
    var yAxLabel = make("text", { x:-250, y:10, "font-family":"Verdana","font-size":"12", "transform":"rotate(-90 0,0)" });
    yAxLabel.innerHTML = yLabel;

    el.appendChild(xLine);
    el.appendChild(yLine);
    el.appendChild(xAxLabel);
    el.appendChild(yAxLabel);

    var xpos = function(v) { return linearScale(xTics[0], xTics[xTics.length - 1], 0, 490, v); };
    var ypos = function(v) { return linearScale(yTics[0], yTics[yTics.length - 1], 500, 10, v); };
    
    plotAll(el, xTics.slice(1), "line", {
        x1: function(x) { return xpos(x); },
        x2: function(x) { return xpos(x); },
        y1: function() { return 480; },
        y2: function() { return 470; },
        stroke: function() { return "black"; },
        "stroke-width": function() { return "1px"; }
    });

    plotAll(el, yTics.slice(1), "line", {
        x1: function() { return 20; },
        x2: function() { return 30; },
        y1: function(y) { return ypos(y); },
        y2: function(y) { return ypos(y); },
        stroke: function() { return "black"; },
        "stroke-width": function() { return "1px"; }
    });

    plotAll(el, xTics.slice(1), "text", {
        x: function(x) { return xpos(x) - 5; },
        y: function() { return 488; },
        "font-family": function() { return "Verdana"; },
        "font-size": function() { return "8"; },
        text: function(x) { return String(x); } // <-- this required changing svg.js!
    });

    plotAll(el, yTics.slice(1), "text", {
        x: function() { return 2; },
        y: function(y) { return ypos(y)+3; },
        "font-family": function() { return "Verdana"; },
        "font-size": function() { return "8"; },
        text: function(y) { return String(y); } // <-- this required changing svg.js!
    });

    // alternative solution that doesn't change svg.js:
    /*
    xTics.slice(1).forEach(function(x) {
	var xTicLabel = make("text", { x:xpos(x)-5, y:488, "font-family":"Verdana", "font-size":"8"});
	xTicLabel.innerHTML = x;
	el.appendChild(xTicLabel);
    });
    yTics.slice(1).forEach(function(y) {
	var yTicLabel = make("text", { x:2, y:ypos(y)+3, "font-family":"Verdana", "font-size":"8"});
	yTicLabel.innerHTML = y;
	el.appendChild(yTicLabel);
    });*/
}

axisMaker(svgs.scatterplot_1,"SATM","SATV",[350,400,500,600,700,800],[300,400,500,600,700,800]);
axisMaker(svgs.scatterplot_2,"ACT","GPA",[15,20,25,30,35],[1.5,2.0,2.5,3.0,3.5,4.0]);
axisMaker(svgs.scatterplot_3,"SAT","GPA",[600,800,1000,1200,1400,1600],[1.5,2.0,2.5,3.0,3.5,4.0]);
