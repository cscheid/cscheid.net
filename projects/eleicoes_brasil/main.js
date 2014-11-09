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
    "grurple": function(d) {
        return d3.hcl(d3.scale.linear().domain([0,50,100]).range([250,300,390])(d),
                      d3.scale.linear().domain([0,50,100]).range([75,0,75])(d),
                      d3.scale.linear().domain([0,50,100]).range([43,60,43])(d));
    }
};

function dataRange()
{
    var mx = 0;
    var mn = 100;
    data.forEach(function(v) {
        mx = Math.max(mx, Number(v.pt));
        mn = Math.min(mn, Number(v.pt));
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

function make_scale_invariant(v)
{
    var mx = 0;
    var mn = 100;
    for (var i=0; i<data.length; ++i) {
        mx = Math.max(mx, Number(data.pt));
        mn = Math.min(mn, Number(data.pt));
    }
    if (mx - 50 > 50 - mn)
        mn = 100 - mx;
    else
        mx = 100 - mn;
    return d3.scale.linear()
        .domain([mn, mx])
        .range([0, 100])(v);
}

var bivariate, basic_range, transformation, invariance_transformation = "none";
function full_colormap(d) {
    var v = Number(d.pt);
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
        d.pt = d[name];
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
        .attr("x1", function(d) { return xScale(d.pt); })
        .attr("x2", function(d) { return xScale(d.pt); })
    ;

    t(stateLegends.selectAll("text"))
        .attr("x", function(d) { return xScale(d.pt); });

    t(colorLegend.selectAll("rect"))
        .attr("fill", function(d) {
            // FIXME this is a bad back.
            // more importantly, what's the problem with the architecture that caused this?
            return almost_full_colormap(d,
                { pop: 40000000, area: 40000000 / 380, pt: d });
        });
}

function initDiv(topo, data)
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
    d3.selectAll("input")
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
            initDiv(json, csv);
        });

        data = csv;
    });
};
