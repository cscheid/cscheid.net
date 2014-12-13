// If you like something in here, feel free to use it. 2-clause BSD,
// copyright Arizona Board of Regents 2014-

// http://stackoverflow.com/a/14426477
d3.selection.prototype.moveToBack = function() { 
    return this.each(function() { 
        var firstChild = this.parentNode.firstChild; 
        if (firstChild) { 
            this.parentNode.insertBefore(this, firstChild); 
        } 
    }); 
};

function translate(x, y) { return "translate(" + x + ", " + y + ")"; }
function scale(s) { return "scale(" + s + ")"; }
function rotate(r) { return "rotate(" + r + ")"; }

function spiral1() {
    var svg = d3.select("#spiral-1").append("svg")
        .attr("width", 450)
        .attr("height", 450)
    ;
    svg.append("rect")
        .attr("width", 450)
        .attr("height", 450)
        .attr("fill", "#55b");

    function makeTransform(radius, count, startPhase) {
        return function(i) {
            var phase = i[0] / count;
            return [rotate(phase * 360 + startPhase),
                    translate(radius, 0)].join(" ");
        };
    }

    function makeRing(radius, squareSize, count, startPhase, colorShift) {
        var g = svg.append("g").attr("transform", translate(225, 225));
        var a = [];
        for (var i=0; i<count; ++i) { a.push([i, colorShift]); }
        g.selectAll("g")
            .data(a)
            .enter()
            .append("g")
            .attr("transform", makeTransform(radius, count, startPhase))
            .append("g")
            .attr("transform", "rotate(0)")
            .attr("class", "spiral_square")
            .append("rect")
            .attr("fill", function(i) { return (i[0] + i[1]) % 2 == 0 ? "white" : "black"; })
            .attr("fill-opacity", 0)
            .attr("stroke", function(i) { return (i[0] + i[1]) % 2 == 0 ? "white" : "black"; })
            .attr("stroke-width", 2.5)
            .attr("stroke-linejoin", "round")
            .attr("x", -squareSize/2)
            .attr("width", squareSize)
            .attr("y", -squareSize/2)
            .attr("height", squareSize);
    }

    makeRing(66, 13, 18, -2, 0);
    makeRing(114, 13, 32, 0, 1);
    makeRing(160, 13, 44, 0, 1);
    makeRing(210, 13, 58, 0, 0);

    var state = 0;
    // 0.0001 because of a bug in d3.slider; 0 makes it put the slider marker all the way to the left
    // regardless of scale
    var angle_axis = d3.svg.axis().orient("bottom").ticks(20);
    var angle_slider = d3.slider().axis(angle_axis).min(-45).max(45).step(1).value(0.0001)
        .on("slide", function(evt, v) {
            var rot = "rotate(" + v + ")";
            var sel = d3.selectAll(".spiral_square");
            sel.attr("transform", rot);
        });
    d3.select("#spiral-1-angle-slider").call(angle_slider);

    var width_slider = d3.slider()
        .min(0.5).max(5).step(0.1).value(3)
        .on("slide", function(evt, v) {
            var sel = d3.selectAll(".spiral_square").selectAll("rect");
            sel.attr("stroke-width", v);
        });
    d3.select("#spiral-1-width-slider").call(width_slider);

    var fill_slider = d3.slider()
        .min(0).max(1).step(0.01).value(0)
        .on("slide", function(evt, v) {
            var sel = d3.selectAll(".spiral_square").selectAll("rect");
            sel.attr("fill-opacity", v);
        });
    d3.select("#spiral-1-fill-slider").call(fill_slider);
    
    var color_slider = d3.slider()
        .min(0).max(1).step(0.01).value(0.5)
        .on("slide", function(evt, v) {
            var sel = d3.selectAll(".spiral_square").selectAll("rect");
            var v_white = d3.scale.linear().domain([0, 0.5, 1]).range([0, 255, 255])(v);
            var v_black = d3.scale.linear().domain([0, 0.5, 1]).range([0, 0, 255])(v);
            console.log(v, v_white, v_black);
            var white = d3.rgb(v_white, v_white, v_white);
            var black = d3.rgb(v_black, v_black, v_black);
            function f(i) {
                return (i[0] + i[1]) % 2 == 0 ? white : black;
            }
            sel.attr("stroke", f);
            sel.attr("fill", f);
        });
    d3.select("#spiral-1-color-slider").call(color_slider);
}

function spiral2() {
    var darkBlue = d3.rgb(0, 153, 255),
        lightBlue = d3.rgb(1, 203, 255),
        white = d3.rgb(255, 255, 255), 
        black = d3.rgb(1,1,1);

    var svg = d3.select("#spiral-2").append("svg")
        .attr("width", 590)
        .attr("height", 443);
    svg.append("rect")
        .attr("width", 590)
        .attr("height", 443)
        .attr("fill", darkBlue);
    var center = svg.append("g")
        .attr("transform", translate(295, 221.5));

    function makeRing(s, phaseShift, colors) {
        var c1 = colors[0], c2 = colors[1];
        var data = [];
        for (var i=0; i<36; ++i)
            data.push([i, s]);
        var poly_data = [{t: 0, r: 50}, {t: 0, r: 60}, {t: 10, r: 60}, {t: 10, r: 50}];
        function radians(deg) { return deg * Math.PI / 180; };
        var poly = d3.svg.line()
            .x(function(d) { return d.r * Math.cos(radians(d.t)); })
            .y(function(d) { return d.r * Math.sin(radians(d.t)); })
            .interpolate("linear-closed");
        var path = poly(poly_data);
        var g = center.append("g");
        g.data([[s]])
            .attr("class", "scale_group_ring")
            .attr("transform", function(i) { return scale(i[0]); });
        g.selectAll("polygon")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", rotate(phaseShift))
            .append("g")
            .attr("transform", function(i) { return rotate(i[0] * 10); })
            .append("path")
            .attr("d", path)
            .attr("fill", function(i) { return colors[i[0] % 2]; });
        return g;
    }

    function makeCorners(s, phaseShift, colors) {
        var c1 = colors[0], c2 = colors[1];
        var data = [];
        for (var i=0; i<36; ++i)
            data.push([i, s]);
        var g = center.append("g");
        var sel = center.append("g")
            .data([[s]])
            .attr("class", "scale_group_corners")
            .attr("transform", function(i) { return scale(i[0]*0.995); })
            .selectAll("rect")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", rotate(phaseShift))
            .append("g")
            .attr("transform", function(i) { return rotate(i[0] * 10); });
        function square_corner(d, offset) {
            sel.append("g")
                .attr("transform", [translate(d-Math.sqrt(2), -Math.sqrt(2)), rotate(45)].join(" "))
                .append("rect")
                .attr("width", 2)
                .attr("height", 2)
                .attr("x", 0)
                .attr("y", 0)
                .attr("fill", function(i) { return colors[(i[0] + offset) % 2]; });
            sel.append("g")
                .attr("transform", [translate(d, -2 * Math.sqrt(2)), rotate(45)].join(" "))
                .append("rect")
                .attr("width", 2)
                .attr("height", 2)
                .attr("x", 0)
                .attr("y", 0)
                .attr("fill", function(i) { return colors[(i[0] + offset+1) % 2]; });
            sel.append("g")
                .attr("transform", [translate(d, 0), rotate(45)].join(" "))
                .append("rect")
                .attr("width", 2)
                .attr("height", 2)
                .attr("x", 0)
                .attr("y", 0)
                .attr("fill", function(i) { return colors[(i[0] + offset+1) % 2]; });
            sel.append("g")
                .attr("transform", [translate(d+Math.sqrt(2), -Math.sqrt(2)), rotate(45)].join(" "))
                .append("rect")
                .attr("width", 2)
                .attr("height", 2)
                .attr("x", 0)
                .attr("y", 0)
                .attr("fill", function(i) { return colors[(i[0] + offset) % 2]; });
        }
        square_corner(50, 0);
        square_corner(59, 1);
        return g;
    }

    var i, rings = [], corners = [];
    for (i=-12; i<12; ++i) {
        rings.push(makeRing(Math.pow(1.18, i), [0,5,10,15][(i + 20) % 4], i % 2 == 0 ? [darkBlue, lightBlue] : [white, black]));
    }

    for (i=-11; i<12; i+=2) {
        corners.push(makeCorners(Math.pow(1.18, i), [0,5,10,15][(i + 12) % 4], i % 2 == 0 ? [darkBlue, lightBlue] : [black, white]));
        corners.push(d3.selectAll(".asdkfhalsdf")); // huge hack to remove corners and rings in lockstep
    }

    var state = 0, done = false;

    function disengage() {
        engageButton.attr("disabled", null);
        done = true;
    }

    function engage() {
        done = false;
        engageButton.attr("disabled", "disabled");
        var sel = center.selectAll(".scale_group_ring");
        var data = sel.data();
        data.forEach(function(lst) { lst[0] *= 1.18; });
        sel.transition()
            .duration(500)
            .ease("linear")
            .attr("transform", function(i) { return scale(i[0]); });
        sel = center.selectAll(".scale_group_corners");
        data = sel.data();
        data.forEach(function(lst) { lst[0] *= 1.18; });
        sel.transition()
            .duration(500)
            .ease("linear")
            .attr("transform", function(i) { return scale(i[0] * 0.995); })
            .each("end", function(v, i) { 
                if (i === 0) {
                    rings.pop().remove();
                    corners.pop().remove();
                    if (!done)
                        engage();
                }
            });
        state += 3;
        rings.unshift(makeRing(Math.pow(1.18, -12), [0, 5, 10, 15][state % 4], state % 2 === 0 ? [darkBlue, lightBlue] : [white, black]).moveToBack());
        if (state % 2 === 1) {
            corners.unshift(makeCorners(Math.pow(1.18, -12), [0, 5, 10, 15][state % 4], state % 2 === 0 ? [darkBlue, lightBlue] : [black, white]).moveToBack());
            corners.push(d3.selectAll(".asdkfhalsdf")); // huge hack to remove corners and rings in lockstep
        };
    }

    var engageButton = d3.select("#spiral-2-engage")
            .append("button")
            .text("Engage!")
            .on("click", engage);

    var disengageButton = d3.select("#spiral-2-engage")
            .append("button")
            .text("Stop")
            .on("click", disengage);
}

spiral1();
spiral2();
