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

//////////////////////////////////////////////////////////////////////////////

var basic_colormaps = {
    "gray": function(d) {
        var h = (d < 50) ? 250 : 30;
        var l = 60 - Math.abs(d-50) / 3;
        var c = Math.abs(d - 50) * 1.5;
        return d3.hcl(h, c, l);
    },
    "purple": function(d) {
        var prop = d3.scale.linear()
            .domain([0, 50, 100])
            .range([d3.hcl(250, 50, 50),
                    d3.hcl(300, 50, 40),
                    d3.hcl(30, 50, 50)]);
        return prop(d);
    }
};

var transformations = {
    "stretch": function(d) {
        d = d - 50;
        var sign = d < 0 ? -1 : 1;
        d = Math.abs(d/50);
        d = Math.pow(d, 0.4);
        d = d * 50 * sign + 50;
        return d;
    },
    "categorical": function(d) {
        if (d < 50) 
            return 0;
        else
            return 100;
    },
    "none": function(d) { return d; }
};

var bivariates = {
    "none": function(c) {
        return c;
    },
    "density": function(c, d) {
        var density = Number(d.pop) / Number(d.area);
        var cs = d3.scale.linear()
            .domain([0, 500])
            .range(["#ffffff", c]);
        return cs(density);
    },
    "density_sqrt": function(c, d) {
        var density = Number(d.pop) / Number(d.area);
        var cs = d3.scale.linear()
            .domain([0, Math.pow(500, 0.5)])
            .range(["#ffffff", c]);
        return cs(Math.pow(density, 0.5));
    },
    "population": function(c, d) {
        var cs = d3.scale.linear()
            .domain([0, 45000000])
            .range(["#ffffff", c]);
        return cs(Number(d.pop));
    },
    "population_sqrt": function(c, d) {
        var cs = d3.scale.linear()
            .domain([0, Math.pow(45000000, 0.5)])
            .range(["#ffffff", c]);
        return cs(Math.pow(Number(d.pop), 0.5));
    }
};

var bivariate, basic_range, transformation;
function full_colormap(d) {
    var v = Number(d.pt);
    v = transformations[transformation](v);
    var c = basic_colormaps[basic_range](v);
    return bivariates[bivariate](c, d);
    
}

// function colorScale_0(d) {
//     d = Number(d.pt);
//     var h = (d < 50) ? 250 : 30;
//     var l = 60 - Math.abs(d-50) / 3;
//     var c = Math.abs(d - 50) * 1.5;
//     return d3.hcl(h, c, l);
// };

// function colorScale_3(d) {
//     d = Number(d.pt);
//     var prop = d3.scale.linear()
//         .domain([0, 50, 100])
//         .range([d3.hcl(250, 50, 50),
//                 d3.hcl(300, 50, 40),
//                 d3.hcl(30, 50, 50)]);
//     return prop(d);
// }

// function colorScale_7(d) {
//     d = d.pt;
//     d = d - 50;
//     var sign = d < 0 ? -1 : 1;
//     d = Math.abs(d/50);
//     d = Math.pow(d, 0.4);
//     d = d * 50 * sign + 50;

//     var h = (d < 50) ? 250 : 30;
//     var l = 60 - Math.abs(d-50) / 3;
//     var c = Math.abs(d - 50) * 1.5;
//     return d3.hcl(h, c, l);
// }

// function colorScale_8(d) {
//     d = d.pt;
//     d = d - 50;
//     var sign = d < 0 ? -1 : 1;
//     d = Math.abs(d/50);
//     d = Math.pow(d, 0.4);
//     d = d * 50 * sign + 50;

//     var prop = d3.scale.linear()
//         .domain([0, 50, 100])
//         .range([d3.hcl(250, 50, 50),
//                 d3.hcl(300, 50, 40),
//                 d3.hcl(30, 50, 50)]);
//     return prop(d);
// }

// function colorScale_1(c) {
//     function colorScale(d) {
//         var density = Number(d.pop) / Number(d.area);
//         var cs = d3.scale.linear()
//             .domain([0, 500])
//             .range(["#ffffff", c(d)]);
//         return cs(density);
//     }
//     return colorScale;
// }

// function colorScale_2(c) {
//     function colorScale(d) {
//         d = Number(d.pt);
//         if (d < 50)
//             return c({pt: 0, pop: 1, density: 1});
//         else
//             return c({pt: 100, pop: 1, density: 1});
//     }
//     return colorScale;
// }

// function colorScale_4(c) {
//     function colorScale(d) {
//         var cs = d3.scale.linear()
//             .domain([0, 45000000])
//             .range(["#ffffff", c(d)]);
//         return cs(Number(d.pop));
//     }
//     return colorScale;
// }

// function colorScale_5(c) {
//     function colorScale(d) {
//         var density = Number(d.pop) / Number(d.area);
//         var cs = d3.scale.linear()
//             .domain([0, Math.pow(500, 0.5)])
//             .range(["#ffffff", c(d)]);
//         return cs(Math.pow(density, 0.5));
//     }
//     return colorScale;
// }

// function colorScale_6(c) {
//     function colorScale(d) {
//         var cs = d3.scale.linear()
//             .domain([0, Math.pow(45000000, 0.5)])
//             .range(["#ffffff", c(d)]);
//         return cs(Math.pow(Number(d.pop), 0.5));
//     }
//     return colorScale;
// }

//////////////////////////////////////////////////////////////////////////////
// global variables (yuck)

// var colorScales = {
//     "categorical": colorScale_2(colorScale_0), 
//     "gray": colorScale_0, 
//     "purple": colorScale_3,
//     "gray_nonlinear": colorScale_7,
//     "purple_nonlinear": colorScale_8,
//     "density": colorScale_1(colorScale_0), 
//     "density_purple": colorScale_1(colorScale_3), 
//     "density_sqrt": colorScale_5(colorScale_0), 
//     "density_sqrt_purple": colorScale_5(colorScale_3), 
//     "population": colorScale_4(colorScale_0),
//     "population_purple": colorScale_4(colorScale_3),
//     "population_sqrt": colorScale_6(colorScale_0),
//     "population_sqrt_purple": colorScale_6(colorScale_3)
// };

var map, colorLegend, stateLegends, xScale;

var data;

//////////////////////////////////////////////////////////////////////////////
// http://stackoverflow.com/a/9618826

function whichRadio(name)
{
    var radios = document.getElementsByName(name);

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return undefined;
}

function selectScale(transition)
{
    bivariate = whichRadio("bivariate");
    basic_range = whichRadio("basic_range");
    transformation = whichRadio("transformation");
    applyScales(transition);
}

function selectData(name, transition)
{
    data.forEach(function(d) {
        d.pt = d[name];
    });
    applyScales(transition);
}

function applyScales(transition)
{
    function t(o) {
        return transition ? o.transition().duration(750) : o;
    }
   
    t(map.selectAll("path")).attr("fill", function(d, i) {
        return full_colormap(d);
    });

    t(stateLegends.selectAll("line"))
        .attr("x1", function(d) { return xScale(d.pt); })
        .attr("x2", function(d) { return xScale(d.pt); })
    ;

    t(stateLegends.selectAll("text"))
        .attr("x", function(d) { return xScale(d.pt); });

    t(colorLegend.selectAll("rect"))
        .attr("fill", function(d) {
            return full_colormap(
                { pop: 40000000, area: 40000000 / 380, pt: d });
        });
}

function initDiv(topo, data, scaleName)
{
    var width = 600,
        height = 720;
    
    var svg = d3.select("#main").append("svg")
        .attr("width", width)
        .attr("height", height)
    ;

    map = svg.append("g");

    var projection = d3.geo.albers()
        .rotate([0, -15])
        .center([-58, -23])
        .parallels([-40, 10])
        .scale(900)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);

    //////////////////////////////////////////////////////////////////////////
    // create elements

    map.selectAll(".subunit")
        .data(topojson.feature(topo, topo.objects.estados_2010).features)
      .enter()
        .append("path")
        .attr("d", path)
        // .attr("fill", function(d, i) {
        //     if (i >= data.length)
        //         return "black";
        //     return colorScale(data[i]);
        // })
        .on("mouseover", function(d, i) {
            d3.select(".state." + data[i].estado).classed("hover", true);
            d3.select(this).moveToFront();
        })
        .on("mouseout", function(d, i) {
            d3.select(".state." + data[i].estado).classed("hover", false);
        })
        .attr("stroke", "#eeeeee")
    ;

    // now that we drew the polygons, we don't need topojson anymore
    // so we bind the csv data to the polys
    map.selectAll("path")
        .data(data);

    colorLegend = svg.append("g").attr("transform", "translate(0,700)");

    xScale = d3.scale.linear()
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
    ;

    stateLegends = svg.append("g").attr("transform", "translate(0,698)");

    stateLegends.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) { return d.estado; })
        .attr("class", function(d) { return "state " + d.estado; });

    stateLegends.selectAll("line")
        .data(data)
        .enter()
        .append("line")
        .attr("y1", 2)
        .attr("y2", 13)
        .attr("stroke", "black")
        .attr("stroke-width", "1px")
    ;

    //////////////////////////////////////////////////////////////////////////
    // apply scales to elements

    selectScale(false);
    selectData('ptOriginal', false);
}

function add_data_symmetries(data)
{
    for (var i=0; i<data.length; ++i) {
        var pt = Number(data[i].pt);
        data[i].ptOriginal = pt;
        data[i].ptClose = 50 - ((50 - pt) / 5);
        data[i].ptInverted = 100 - pt;
    }
}

window.onload = function()
{
    d3.selectAll("input").on("click", function() {
        selectScale(true);
    });
    var x =d3.selectAll("input")
        .filter(function(d) {
            return this.name === "data";
        })
        .on("click", function() {
            selectData("pt" + whichRadio("data"), true);
        });
    d3.csv("estados.csv", function(error, csv) {
        if (error) {
            console.error(error);
            return;
        }
        add_data_symmetries(csv);

        d3.json("estados.json", function(error, json) {
            if (error) {
                console.error(error);
                return;
            }
            initDiv(json, csv, getQueryVariable("colormap") || "gray");
        });

        data = csv;
    });
};
