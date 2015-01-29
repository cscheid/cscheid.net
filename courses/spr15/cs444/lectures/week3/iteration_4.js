//////////////////////////////////////////////////////////////////////////////
// what if we wanted to plot a different dataset?

function plotAll(svg, data, widthGetter, heightGetter, xGetter, yGetter)
{
    for (var i=0; i<data.length; ++i) {
        svg.appendChild(make("rect", { 
            width: widthGetter(data[i], i), 
            height: heightGetter(data[i], i),
            x: xGetter(data[i], i),
            y: yGetter(data[i], i)
        }));
    }
}

function rectWidth(row, index) { return 3; }
function rectHeight(row, index) { return row.count / 2500 * 400;}
function rectX(row, index) { return index * 3; }
function rectY(row, index) { return 400 - (row.count / 2500 * 400); }

var chart1 = make("svg", { width: 800, height: 400, "class": "my-chart" });
document.getElementById("chart1").appendChild(chart1);
plotAll(chart1, ukDriverFatalities, rectWidth, rectHeight, rectX, rectY);

var chart2 = make("svg", { width: 500, height: 300, "class": "my-chart" });
document.getElementById("chart2").appendChild(chart2);
plotAll(chart2, ukDriverFatalities, rectWidth, rectHeight, rectX, rectY);

var chart3 = make("svg", { width: 300, height: 500, "class": "my-chart" });
document.getElementById("chart3").appendChild(chart3);
plotAll(chart3, ukDriverFatalities, rectWidth, rectHeight, rectX, rectY);

