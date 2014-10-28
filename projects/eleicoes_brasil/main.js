d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

function initDiv(topo, data)
{
    var width = 600,
        height = 720;
    
    var svg = d3.select("#main").append("svg")
        .attr("width", width)
        .attr("height", height)
    ;

    var map = svg.append("g");

    var projection = d3.geo.albers()
        .rotate([0, -15])
        .center([-58, -23])
        .parallels([-40, 10])
        .scale(900)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    function colorScale(d) {
        var h = (d < 50) ? 250 : 30;
        var l = 60 - Math.abs(d-50) / 2;
        // var l = 50;
        var c = Math.abs(d - 50) * 1.5;
        return d3.hcl(h, c, l);
    }

    map.selectAll(".subunit")
        .data(topojson.feature(topo, topo.objects.estados_2010).features)
      .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", function(d, i) {
            if (i >= data.length)
                return "black";
            return colorScale(Number(data[i].pt));
        })
        .on("mouseover", function(d, i) {
            d3.select(".state." + data[i].estado).classed("hover", true);
            d3.select(this).moveToFront();
        })
        .on("mouseout", function(d, i) {
            d3.select(".state." + data[i].estado).classed("hover", false);
        })
        .attr("stroke", "black");
    ;

    var colorLegend = svg.append("g").attr("transform", "translate(0,700)");

    var xScale = d3.scale.linear()
        .domain([0, 100])
        .range([0, 500]);

    var x = [];
    for (var i=0; i<200; ++i)
        x.push(i/2);

    colorLegend.selectAll("rect")
        .data(x)
        .enter()
        .append("rect")
        .attr("width", 4)
        .attr("height", 10)
        .attr("x", function(d) { return xScale(d); })
        .attr("fill", function(d) { return colorScale(d); })
    ;

    var stateLegends = svg.append("g").attr("transform", "translate(0,698)");

    stateLegends.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) { return d.estado; })
        .attr("x", function(d) { return xScale(d.pt); })
        .attr("class", function(d) { return "state " + d.estado; });

    stateLegends.selectAll("line")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function(d) { return xScale(d.pt); })
        .attr("x2", function(d) { return xScale(d.pt); })
        .attr("y1", 2)
        .attr("y2", 13)
        .attr("stroke", "black")
        .attr("stroke-width", "1px")
    ;
     
}

window.onload = function()
{
    d3.csv("estados.csv", function(error, csv) {
        if (error) {
            console.error(error);
            return;
        }
        d3.json("estados.json", function(error, json) {
            if (error) {
                console.error(error);
                return;
            }
            initDiv(json, csv);
        });
    });
};
