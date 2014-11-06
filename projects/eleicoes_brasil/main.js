// http://css-tricks.com/snippets/javascript/get-url-variables/
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

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

    function colorScale_0(d) {
        d = Number(d.pt);
        var h = (d < 50) ? 250 : 30;
        var l = 60 - Math.abs(d-50) / 3;
        var c = Math.abs(d - 50) * 1.5;
        return d3.hcl(h, c, l);
    };

    function colorScale_1(c) {
        function colorScale(d) {
            var d_ = d;
            var density = Number(d.pop) / Number(d.area);
            var cs = d3.scale.linear()
                .domain([0, 500])
                .range(["#ffffff", c(d_)]);
            return cs(density);
        }
        return colorScale;
    }

    function colorScale_2(c) {
        function colorScale(d) {
            d = Number(d.pt);
            if (d < 50)
                return c({pt: 0, pop: 1, density: 1});
            else
                return c({pt: 100, pop: 1, density: 1});
        }
        return colorScale;
    }

    function colorScale_3(d) {
        var d_ = d;
        d = Number(d.pt);
        var prop = d3.scale.linear()
            .domain([0, 50, 100])
            .range([d3.hcl(250, 50, 50),
                    d3.hcl(300, 50, 40),
                    d3.hcl(30, 50, 50)]);
        return prop(d);
    }

    function colorScale_4(c) {
        function colorScale(d) {
            var d_ = d;
            var cs = d3.scale.linear()
                .domain([0, 45000000])
                .range(["#ffffff", c(d_)]);
            return cs(Number(d.pop));
        }
        return colorScale;
    }

    var colorScales = {
        "gray": colorScale_0, 
        "purple": colorScale_3,
        "density": colorScale_1(colorScale_0), 
        "categorical": colorScale_2(colorScale_0), 
        "population": colorScale_4(colorScale_0),
        "density_purple": colorScale_1(colorScale_3), 
        "population_purple": colorScale_4(colorScale_3)
    };
    var colorScale = colorScales[getQueryVariable("colormap") || "gray"];

    map.selectAll(".subunit")
        .data(topojson.feature(topo, topo.objects.estados_2010).features)
      .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", function(d, i) {
            if (i >= data.length)
                return "black";
            return colorScale(data[i]);
        })
        .on("mouseover", function(d, i) {
            d3.select(".state." + data[i].estado).classed("hover", true);
            d3.select(this).moveToFront();
        })
        .on("mouseout", function(d, i) {
            d3.select(".state." + data[i].estado).classed("hover", false);
        })
        .attr("stroke", "#eeeeee")
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
        .attr("fill", function(d) { return colorScale({pop: 40000000, 
                                                       area: 40000000 / 380, pt: d}); })
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
