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
    },
    "purple2": function(d) {
        var prop = d3.scale.linear()
            .domain([0, 100])
            .range([d3.hcl(250, 50, 50),
                    d3.hcl(30, 50, 50)]);
        return prop(d);
    },
    "purple3": function(d) {
        return d3.hcl(d3.scale.linear().domain([0,50,100]).range([250,300,390])(d),
                      50,
                      d3.scale.linear().domain([0,50,100]).range([50,40,50])(d));
    },
    "purple4": function(d) {
        return d3.hcl(d3.scale.linear().domain([0,50,100]).range([250,300,390])(d),
                      50,
                      d3.scale.linear().domain([0,50,100]).range([43,40,43])(d));
    },
    "purple5": function(d) {
        return d3.hcl(d3.scale.linear().domain([0,50,100]).range([250,300,390])(d),
                      60,
                      d3.scale.linear().domain([0,50,100]).range([50,40,50])(d));
    },
    "grurple": function(d) {
        var d_ = d, s = (d < 50) ? -1 : 1;
        d_ = Math.abs(d - 50) / 50;
        d_ = Math.pow(d_, 0.4);
        d_ = d_ * 50 * s + 50;
        return d3.hcl(d3.scale.linear().domain([0,50,100]).range([250,300,390])(d_),
                      d3.scale.linear().domain([0,50,100]).range([75,0,75])(d),
                      d3.scale.linear().domain([0,50,100]).range([43,60,43])(d));
    }
};
// var basic_colormaps = {
//     "gray": function(d) {
//         var h = (d < 50) ? 250 : 30;
//         var l = 60 - Math.abs(d-50) / 3;
//         var c = Math.abs(d - 50) * 1.5;
//         return d3.hcl(h, c, l);
//     },
//     "purple": function(d) {
//         var prop = d3.scale.linear()
//             .domain([0, 50, 100])
//             .range([d3.hcl(250, 50, 50),
//                     d3.hcl(300, 50, 40),
//                     d3.hcl(30, 50, 50)]);
//         return prop(d);
//     }
// };

function dataRange()
{
    var mx = 0;
    var mn = 100;
    data.forEach(function(v) {
        v = v.properties.pct_d;
        if (isNaN(v))
            return;
        mx = Math.max(mx, v);
        mn = Math.min(mn, v);
    });
    return [mn, mx];
}

var invariance_transformations = {
    "none": d3.scale.linear(),
    "scale": d3.scale.linear().range([0, 100]),
    "affine": d3.scale.linear().range([0, 100]),
    "affineTwosided": d3.scale.linear().domain([0,50,100]).range([0, 50, 100])
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

var max_pop = 2369;
var max_density = 3000; //4881;

var bivariates = {
    "none": function(c) {
        return c;
    },
    "density": function(c, d) {
        var density = Number(d.properties.t) / Number(d.properties.area);
        var cs = d3.scale.linear()
            .domain([0, max_density])
            .range(["#ffffff", c]);
        return cs(density);
    },
    "density_sqrt": function(c, d) {
        var density = Number(d.properties.t) / Number(d.properties.area);
        var cs = d3.scale.linear()
            .domain([0, Math.pow(max_density, 0.4)])
            .range(["#fff", c]);
        return cs(Math.pow(density, 0.4));
    },
    "density_quantiles": function(c, d) {
        var density = Number(d.properties.t) / Number(d.properties.area);
        var cs = d3.scale.linear()
            .domain([0, Math.pow(max_density, 0.6)])
            .range(["#fff", c]);
        return cs(Math.pow(density, 0.6));
    },
    "population": function(c, d) {
        var cs = d3.scale.linear()
            .domain([0, max_pop])
            .range(["#ffffff", c]);
        return cs(Number(d.properties.t));
    },
    "population_sqrt": function(c, d) {
        var cs = d3.scale.linear()
            .domain([0, Math.pow(100, 0.5)])
            .range(["#ffffff", c]);
        return cs(Math.pow(Number(d.properties.t), 0.5));
    }
};

var bivariate, basic_range, transformation, invariance_transformation = "none";
function full_colormap(d) {
    var v = 100-d.properties.pct_d; // Number(d.pt);
    v = invariance_transformations[invariance_transformation](v);
    return almost_full_colormap(v, d);
}

function almost_full_colormap(v, d) {
    v = transformations[transformation](v);
    var c = basic_colormaps[basic_range](v);
    return bivariates[bivariate](c, d);
}

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
    invariance_transformation = whichRadio("invariance_transformation");

    applyScales(transition);
}

function selectData(name, transition)
{
    data.forEach(function(d) {
        d.properties.d = d.properties[name];
    });
    var _ = dataRange(), mn = _[0], mx = _[1];
    var mn_scale, mx_scale;
    if (mx - 50 > 50 - mn) {
        mn_scale = 100 - mx;
        mx_scale = mx;
    } else {
        mn_scale = mn;
        mx_scale = 100 - mn;
    }
    invariance_transformations["scale"].domain([mn_scale, mx_scale]);
    invariance_transformations["affine"].domain([mn, mx]);
    invariance_transformations["affineTwosided"].domain([mn, 50, mx]);

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
        .attr("x1", function(d) { return xScale(100-d.properties.pct_d); })
        .attr("x2", function(d) { return xScale(100-d.properties.pct_d); })
    ;

    // t(stateLegends.selectAll("text"))
    //     .attr("x", function(d) { return xScale(d.pt); });

    t(colorLegend.selectAll("rect"))
        .attr("fill", function(d) {
            // FIXME this is a bad back.
            // more importantly, what's the problem with the architecture that caused this?
            return almost_full_colormap(d,
                { properties: { area: 1, d: d, t: 1 } });
        });
}

function initDiv(topo)
{
    var width = 1200,
        height = 800;
    
    var svg = d3.select("#main").append("svg")
        .attr("width", width)
        .attr("height", height)
    ;

    map = svg.append("g");
    
    // var projection = d3.geo.conicConformal()
    //     .parallels([ 45 + 37 / 60, 47.05 ])
    //     .rotate([ 94.25, -45 ])
    //     .scale(8e3)
    //     .center([ .5, 1.15 ])
    //     .translate([ 525, 605 ])
    //     .clipExtent([ [ -10, -10 ], [ 1060, 1210 ] ]);

    // var projection = d3.geo.conicConformal();
        // .rotate([0, -15])
        // .center([-98, -89])
        // .parallels([43, 50])
        // .scale(900)
        // .translate([width / 2, height / 2]);

    // var path = d3.geo.path()
    //     .projection(projection);

    //////////////////////////////////////////////////////////////////////////
    // create elements
    var f = topojson.feature(topo, topo.objects.precincts).features;

    var mn_area = 10000000, mx_area = -10000000;
    var mn_population = 10000000, mx_population = -10000000;
    var mn_density = 10000000, mx_density = -10000000;

    var densities = [];
    var populations = [];

    f.forEach(function(d) {
        var area = 0;
        if (d.geometry.type !== "MultiPolygon") {
            console.error("Can't handle object of type " + d.geometry.type);
            return;
        }
        d.geometry.coordinates.forEach(function(p) {
            p.forEach(function(loop) {
                for (var i=0; i<loop.length - 1; ++i) {
                    var d1 = loop[i], d2 = loop[i+1];
                    area += 0.5 * (d1[0] * d2[1] - d2[0] * d1[1]);
                }
            });
        });
        d.properties.area = area;
        d.properties.pct_d = 100 * (d.properties.d / d.properties.t);
        mn_area = Math.min(mn_area, area);
        mx_area = Math.max(mx_area, area);
        var population = d.properties.t;
        var density = population / area;
        mn_population = Math.min(mn_population, population);
        mx_population = Math.max(mx_population, population);
        if (density < Infinity) {
            mx_density = Math.max(mx_density, density);
        }
        if (density > 0) {
            mn_density = Math.min(mn_density, density);
        }
    });
    debugger;
    data = f;

    map.selectAll(".subunit")
        .data(f)
      .enter()
        .append("path")
        .attr("d", d3.geo.path().projection(null))
        // .on("mouseover", function(d, i) {
        //     d3.select(".state." + data[i].estado).classed("hover", true);
        //     d3.select(this).moveToFront();
        // })
        // .on("mouseout", function(d, i) {
        //     d3.select(".state." + data[i].estado).classed("hover", false);
        // })
        .attr("stroke", null) // "#eeeeee")
        // .attr("fill", function(d) {
        //     // debugger;
        //     var pct_d = 100 * (d.properties.d / d.properties.t);
        //     return basic_colormaps.gray(100-pct_d);
        //     // return "#ffffff";
        // })
    ;

    // // now that we drew the polygons, we don't need topojson anymore
    // // so we bind the csv data to the polys
    // map.selectAll("path")
    //     .data(data);

    colorLegend = svg.append("g").attr("transform", "translate(0,700)");

    xScale = function(d) {
        return d3.scale.linear()
            .domain([0, 100])
            .range([0, 500])(invariance_transformations[invariance_transformation](d));
    };

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

    stateLegends = svg.append("g").attr("transform", "translate(0,688)");

    // stateLegends.selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .text(function(d) { return d.estado; })
    //     .attr("class", function(d) { return "state " + d.estado; });

    stateLegends.selectAll("line")
        .data(data)
        .enter()
        .append("line")
        .attr("y1", 2)
        .attr("y2", 13)
        .attr("stroke", "black")
        .attr("stroke-opacity", 0.1)
        .attr("stroke-width", "1px")
    ;

    // //////////////////////////////////////////////////////////////////////////
    // // apply scales to elements

    selectScale(false);
    selectData('d', false);
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
    d3.selectAll("input")
        .filter(function(d) {
            return this.name === "data";
        })
        .on("click", function() {
            selectData("pt" + whichRadio("data"), true);
        });
    d3.json("va.json", function(error, json) {
        if (error) {
            console.error(error);
            return;
        }
        initDiv(json);
    });
};
