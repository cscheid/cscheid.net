//////////////////////////////////////////////////////////////////////////////
// what if we wanted to plot a different dataset?

function plotAll(svg, data)
{
    for (var i=0; i<data.length; ++i) {
        svg.appendChild(make("rect", { 
            width: 3, 
            height: data[i].count / 2500 * 400,
            x: i * 3,
            y: 400 - (data[i].count / 2500 * 400)
        }));
    }
}

var chart1 = make("svg", { width: 800, height: 400, "class": "my-chart" });
document.getElementById("chart1").appendChild(chart1);
plotAll(chart1, ukDriverFatalities);

var chart2 = make("svg", { width: 500, height: 300, "class": "my-chart" });
document.getElementById("chart2").appendChild(chart2);
plotAll(chart2, ukDriverFatalities);

var chart3 = make("svg", { width: 300, height: 500, "class": "my-chart" });
document.getElementById("chart3").appendChild(chart3);
plotAll(chart3, ukDriverFatalities);

