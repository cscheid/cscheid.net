var svg = d3.select("#q1").append("svg").attr("width", 600).attr("height", 300);

var sat = svg.append("g").attr("transform", "translate(0,100)");
var x =  svg.append("g").attr("transform", "translate(0,200)");

var satscale = d3.scaleLinear().domain([0,1000]).range([10, 490]);
sat.append("line").attr("x1", satscale(0)).attr("x2", satscale(1000)).style("stroke", "black");

var xscale = d3.scaleLinear().domain([-100, 600]).range([10, 490]);
x.append("line").attr("x1", xscale(-100)).attr("x2", xscale(600)).style("stroke", "black");

svg.append("line").attr("y1", 200).attr("y2", 100).attr("x2", satscale(300)).attr("x1", xscale(0)).attr("stroke", "red").attr("stroke-width", "2px");
svg.append("line").attr("y1", 200).attr("y2", 100).attr("x2", satscale(800)).attr("x1", xscale(500)).attr("stroke", "red").attr("stroke-width", "2px");

svg.append("text").attr("x", satscale(300)).attr("y", 115).text("300").style("font", "Helvetica Neue");
svg.append("text").attr("x", satscale(800)).attr("y", 115).text("800").style("font", "Helvetica Neue");
svg.append("text").attr("x", xscale(0)).attr("y", 215).text("0").style("font", "Helvetica Neue");
svg.append("text").attr("x", xscale(500)).attr("y", 215).text("500").style("font", "Helvetica Neue");

svg.append("text").attr("x", 505).attr("y", 205).text("SATM").style("font", "Helvetica Neue");
svg.append("text").attr("x", 505).attr("y", 105).text("x").style("font", "Helvetica Neue");
