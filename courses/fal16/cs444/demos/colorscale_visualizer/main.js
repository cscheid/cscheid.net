function init() {
    Lux.init({
        clearColor: [1, 1, 1, 1],
        highDPS: false
    });
    var camera = Shade.Camera.perspective({
        aspectRatio: 720/480
    });
    function cam(x) {
        x = Shade.rotation(Lux.now().div(2), Shade.vec(0,1,0))(x);
        x = Shade.translation( 0, 0, -4)(x);
        return camera(x);
    }

    function addFrame() {
        var frame = Lux.model({
            type: "lines",
            elements: [0, 1, 2, 3, 4, 5, 6, 7,
                       0, 3, 1, 2, 4, 7, 5, 6,
                       0, 4, 1, 5, 2, 6, 3, 7,
                       8, 9, 10, 11, 12, 13
                      ],
            vertex: [[-1, -1, -1,
                       1, -1, -1,
                       1,  1, -1,
                      -1,  1, -1,
                      -1, -1,  1,
                       1, -1,  1,
                       1,  1,  1,
                      -1,  1,  1,
                       0, -1,  0,
                       0,  1,  0,
                      -1, -1,  0,
                       1, -1,  0,
                       0, -1, -1,
                       0, -1,  1], 3]
        });
        Lux.Scene.add(Lux.actor({
            model: frame, 
            appearance: {
                position: cam(frame.vertex),
                color: Shade.color('#000')
            }}));
    }
    addFrame();

    function addCircle() {
        var v = [];
        for (var i=0; i<100; ++i) {
            var a = Math.PI * 2 * i / 100;
            var y = Math.sin(a), x = Math.cos(a);
            v.push(x, -1, y);
        }
        var circle1 = Lux.model({
            type: "line_loop",
            vertex: [v, 3]
        });
        Lux.Scene.add(Lux.actor({
            model: circle1,
            appearance: {
                position: cam(circle1.vertex),
                color: Shade.color('#000')
            }}));
        Lux.Scene.add(Lux.actor({
            model: circle1,
            appearance: {
                position: cam(Shade(circle1.vertex).add(Shade.vec(0,2,0))),
                color: Shade.color('#000')
            }}));
    }
    addCircle();

    function addCurve(scale) {
        var scaleL = d3.scaleLinear().domain([0,    100]).range([-1, 1]);
        var scaleA = d3.scaleLinear().domain([-100, 100]).range([-1, 1]);
        var scaleB = d3.scaleLinear().domain([-100, 100]).range([-1, 1]);

        function getValues() {
            var vs = [], is = [], cs = [];
            for (var i=0; i<=100; ++i) {
                var u = i / 100;
                var clab = scale(u);
                cs.push(clab.color.r/255, clab.color.g/255, clab.color.b/255, 1);
                vs.push(scaleA(clab.a), scaleL(clab.l), scaleB(clab.b));
                is.push(i);
            }
            return [vs, is, cs];
        }

        var [vs, is, cs] = getValues();
        var vertexBuffer = Lux.attribute_buffer({
            vertex_array: vs,
            item_size: 3
        });
        var colorBuffer = Lux.attribute_buffer({
            vertex_array: cs,
            item_size: 4
        });
        
        var model = Lux.model({
            type: "points",
            elements: is,
            vertex: vertexBuffer,
            color: colorBuffer
        });

        var value = true;
        var actor = Lux.actor({
            model: model,
            appearance: {
                position: cam(model.vertex),
                color: model.color,
                point_size: 10
            }//,
            // condition: function() { return value; }
        });
        Lux.Scene.add(actor);

        function reset() {
            var [vs, is, cs] = getValues();
            colorBuffer.set(cs);
            vertexBuffer.set(vs);
        }
        return {
            reset: reset,
            toggleDraw: function() {
                value = !value;
            }
        };
    }

    function makeRealInterpolator(colorTo, colorFrom) {
        return function(from, to) {
            from = JSON.parse(JSON.stringify(colorTo(from)));
            to = JSON.parse(JSON.stringify(colorTo(to)));
            var dumbScale = d3.scaleLinear().range([from, to]);
            var result = function(u) {
                var v = dumbScale(u);
                v = d3.lab(colorFrom(v));
                return { l: v.l, a: v.a, b: v.b, color: d3.rgb(v) };
            };
            result.range = function(lst) {
                var [from, to] = lst;
                from = JSON.parse(JSON.stringify(colorTo(from)));
                to = JSON.parse(JSON.stringify(colorTo(to)));
                dumbScale.range([from, to]);
                return result;
            };
            return result;
        };
    }

    var makeRealRGBInterpolator = makeRealInterpolator(
        d3.rgb,
        function(v) { return d3.rgb(v.r, v.g, v.b); });                                              

    var makeRealLabInterpolator = makeRealInterpolator(
        d3.lab,
        function(v) { return d3.lab(v.l, v.a, v.b); });                                              

    function makeRealHCLInterpolator(from, to) {
        from = JSON.parse(JSON.stringify(d3.hcl(from)));
        to = JSON.parse(JSON.stringify(d3.hcl(to)));
        while (to.h - from.h > 180) {
            to.h -= 360;
        }
        while (to.h - from.h < -180) {
            to.h += 360;
        }
        var dumbScale = d3.scaleLinear().range([from, to]);
        var result = function(u) {
            var v = dumbScale(u);
            v = d3.lab(d3.hcl(v.h, v.c, v.l));
            return { l: v.l, a: v.a, b: v.b, color: d3.rgb(v) };
        };
        result.range = function(lst) {
            var [from, to] = lst;
            from = JSON.parse(JSON.stringify(d3.hcl(from)));
            to = JSON.parse(JSON.stringify(d3.hcl(to)));
            while (to.h - from.h > 180) {
                to.h -= 360;
            }
            while (to.h - from.h < -180) {
                to.h += 360;
            }
            dumbScale.range([from, to]);
            return result;
        };
        return result;
    }

    var c1 = "blue", c2 = "orange";
    var s1 = makeRealLabInterpolator(c1, c2),
        s2 = makeRealHCLInterpolator(c1, c2),
        s3 = makeRealRGBInterpolator(c1, c2);
    
    document.getElementById("c1-1").value = d3.rgb(c1).r;
    document.getElementById("c1-2").value = d3.rgb(c1).g;
    document.getElementById("c1-3").value = d3.rgb(c1).b;

    document.getElementById("c2-1").value = d3.rgb(c2).r;
    document.getElementById("c2-2").value = d3.rgb(c2).g;
    document.getElementById("c2-3").value = d3.rgb(c2).b;

    var f1 = addCurve(s1);
    var f2 = addCurve(s2);
    var f3 = addCurve(s3);

    function setValues(newC1, newC2) {
        c1 = newC1;
        c2 = newC2;
        s1.range([newC1, newC2]);
        s2.range([newC1, newC2]);
        s3.range([newC1, newC2]);
        f1.reset();
        f2.reset();
        f3.reset();
    }
    
    Lux.Scene.animate();

    var c1Space = "rgb";
    var c2Space = "rgb";
    
    var spaces = {
        rgb: { name: "RGB",
               bounds: [[0, 255], [0, 255], [0, 255]],
               constructor: d3.rgb,
               deconstructor: function(c) {
                   c = d3.rgb(c);
                   return [c.r, c.g, c.b];
               }},
        lab: { name: "Lab",
               bounds: [[0, 100], [-100, 100], [-100, 100]],
               constructor: d3.lab,
               deconstructor: function(c) {
                   c = d3.lab(c);
                   return [c.l, c.a, c.b];
               }},
        hcl: { name: "HCL",
               bounds: [[-360, 360], [0, 100], [0, 100]],
               constructor: d3.hcl,
               deconstructor: function(c) {
                   c = d3.hcl(c);
                   return [c.h, c.c, c.l];
               }}
    };

    function update() {
        setValues(
            spaces[c1Space].constructor(
                Number(document.getElementById("c1-1").value),
                Number(document.getElementById("c1-2").value),
                Number(document.getElementById("c1-3").value)),
            spaces[c2Space].constructor(
                Number(document.getElementById("c2-1").value),
                Number(document.getElementById("c2-2").value),
                Number(document.getElementById("c2-3").value)));
    }

    d3.select("#c1-space").on("change", function() {
        var oldValue = c1Space;
        var newValue = this.selectedOptions[0].value;
        var newSpace = spaces[newValue];
        
        d3.select("#l1-1").text(newSpace.name[0]);
        d3.select("#l1-2").text(newSpace.name[1]);
        d3.select("#l1-3").text(newSpace.name[2]);
        c1Space = newValue;

        var newColor = newSpace.deconstructor(c1);
        document.getElementById("c1-1").value = ~~newColor[0];
        document.getElementById("c1-2").value = ~~newColor[1];
        document.getElementById("c1-3").value = ~~newColor[2];

        document.getElementById("c1-1").min = newSpace.bounds[0][0];
        document.getElementById("c1-1").max = newSpace.bounds[0][1];
        document.getElementById("c1-2").min = newSpace.bounds[1][0];
        document.getElementById("c1-2").max = newSpace.bounds[1][1];
        document.getElementById("c1-3").min = newSpace.bounds[2][0];
        document.getElementById("c1-3").max = newSpace.bounds[2][1];
        update();
    });

    d3.select("#c2-space").on("change", function() {
        var oldValue = c2Space;
        var newValue = this.selectedOptions[0].value;
        var newSpace = spaces[newValue];
        
        d3.select("#l2-1").text(newSpace.name[0]);
        d3.select("#l2-2").text(newSpace.name[1]);
        d3.select("#l2-3").text(newSpace.name[2]);
        c2Space = newValue;

        var newColor = newSpace.deconstructor(c2);
        document.getElementById("c2-1").value = ~~newColor[0];
        document.getElementById("c2-2").value = ~~newColor[1];
        document.getElementById("c2-3").value = ~~newColor[2];

        document.getElementById("c2-1").min = newSpace.bounds[0][0];
        document.getElementById("c2-1").max = newSpace.bounds[0][1];
        document.getElementById("c2-2").min = newSpace.bounds[1][0];
        document.getElementById("c2-2").max = newSpace.bounds[1][1];
        document.getElementById("c2-3").min = newSpace.bounds[2][0];
        document.getElementById("c2-3").max = newSpace.bounds[2][1];
        update();
    });
    
    d3.selectAll("input").on("change", update);
}


init();
