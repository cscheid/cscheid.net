/*global cscheid */

//////////////////////////////////////////////////////////////////////////////
// A 2D plotting library

(function() {
    var plot = {};
    cscheid.plot = plot;

    function create(div, width, height) {
        var dims = { width: width,
                     height: height };
        var margins = { top: 10,
                        bottom: 10,
                        left: 10,
                        right: 10 };
        var svg = div.append("svg")
                .attr("width", dims.width)
                .attr("height", dims.height);

        var annotationsGroup = svg.append("g");
        var sceneGroup = svg.append("g");
        
        var xScale = d3.scaleLinear().range([margins.left, dims.width - margins.right]);
        var yScale = d3.scaleLinear().range([dims.width - margins.bottom, margins.top]);
        var scene = [];
        
        var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        
        function defaultAccessor(accessors, key, value) {
            if (accessors[key])
                return accessors[key];
            else
                return function() { return value; };
        }

        function setPoints(accessors) {
            var colorAccessor;
            var radiusAccessor = defaultAccessor(accessors, "r", 2);
            if (accessors.class) {
                colorAccessor = function(d,i) {
                    return colorScale(accessors.class(d,i));
                };
            } else if (accessors.color) {
                colorAccessor = function(d,i) {
                    return accessors.color(d,i);
                };
            } else {
                colorAccessor = function() { return "black"; };
            }
            
            return function(sel) {
                sel.attr("cx", function(d,i) { return xScale(accessors.x(d,i)); })
                    .attr("cy", function(d,i) { return yScale(accessors.y(d,i)); })
                    .attr("fill", function(d,i) { return colorAccessor(d,i); })
                    .attr("r", function(d,i) { return radiusAccessor(d,i); })
                    .call(accessors.custom || function() {})
                ;
            };
        }
        
        function setLines(accessors) {
            var strokeAccessor = defaultAccessor(accessors, "stroke", "black");
            
            return function(sel) {
                sel.attr("x1", function(d,i)  { return xScale(accessors.x1(d,i)); })
                    .attr("x2", function(d,i) { return xScale(accessors.x2(d,i)); })
                    .attr("y1", function(d,i) { return yScale(accessors.y1(d,i)); })
                    .attr("y2", function(d,i) { return yScale(accessors.y2(d,i)); })
                    .attr("stroke", function(d,i) { return strokeAccessor(d,i); })
                    .call(accessors.custom || function() {});
            };
        }
        
        var result = {
            
            //////////////////////////////////////////////////////////////////
            // I don't like exposing the scales: if clients change settings
            // they need to remember to call update().
            
            xScale: xScale,
            yScale: yScale,
            
            render: function(transition) {
                scene.forEach(function(sceneObject) {
                    sceneObject.update(transition);
                });
            },
            xDomain: function() {
                return xScale.domain();
            },
            setXDomain: function(domain) {
                xScale.domain(domain);
                result.render();
            },
            yDomain: function() {
                return yScale.domain();
            },
            setYDomain: function(domain) {
                yScale.domain(domain);
                result.render();
            },
            setMargins: function(obj) {
                if (obj.top !== undefined) margins.top = obj.top;
                if (obj.bottom !== undefined) margins.bottom = obj.bottom;
                if (obj.left !== undefined) margins.left = obj.left;
                if (obj.right !== undefined) margins.right = obj.right;
                xScale.range([margins.left, dims.width - margins.right]);
                yScale.range([dims.width - margins.bottom, margins.top]);
                result.render();
            },

            //////////////////////////////////////////////////////////////////
            // annotations
            
            addXAxis: function() {
                var axis = d3.axisBottom(xScale);
                var axisG = annotationsGroup.append("g")
                        .attr("transform", "translate(0," + yScale(0) + ")");
                var sceneObject = {
                    group: axisG,
                    axisObject: axis,
                    update: function(transition) {
                        (transition ? axisG.transition() : axisG).call(axis);
                    }
                };
                sceneObject.update();
                scene.push(sceneObject);
                return sceneObject;
            },
            addYAxis: function() {
                var axis = d3.axisLeft(yScale);
                var axisG = annotationsGroup.append("g")
                        .attr("transform", "translate(" + xScale(0) + ",0)");
                var sceneObject = {
                    group: axisG,
                    axisObject: axis,
                    update: function(transition) {
                        (transition ? axisG.transition() : axisG).call(axis);
                    }
                };
                sceneObject.update();
                scene.push(sceneObject);
                return sceneObject;
            },
            
            //////////////////////////////////////////////////////////////////
            // marks

            addPoints: function(data, accessors) {
                var pointsGroup = sceneGroup.append("g");
                pointsGroup.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle");
                var sceneObject = {
                    group: pointsGroup,
                    accessors: accessors,
                    update: function(transition) {
                        var sel =  pointsGroup
                                .selectAll("circle");
                        (transition ? sel.transition() : sel).call(setPoints(this.accessors));
                    }
                };
                sceneObject.update();
                scene.push(sceneObject);
                return sceneObject;
            },
            addLines: function(data, accessors) {
                var group = sceneGroup.append("g");
                group.selectAll("line")
                    .data(data)
                    .enter()
                    .append("line");
                var sceneObject = {
                    group: group,
                    accessors: accessors,
                    update: function(transition) {
                        var sel = group.selectAll("line");
                        (transition ? sel.transition() : sel)
                            .call(setLines(this.accessors))
                            .call(this.accessors.custom || function() {});
                    }
                };
                sceneObject.update();
                scene.push(sceneObject);
                return sceneObject;
            },
            addFunction: function(f, accessors) {
                accessors = accessors || {};
                accessors.value = function() { return f; };
                return this.addCurves([null], accessors);
            },
            addCurves: function(data, accessors) {
                var group = sceneGroup.append("g");
                group.selectAll("path")
                    .data(data)
                    .enter()
                    .append("path");
                
                var line = d3.line();
                line.x(function(d) { return xScale(d.x); });
                line.y(function(d) { return yScale(d.y); });
                
                var lineResolution = 250;
                
                var sceneObject = {
                    group: group,
                    accessors: accessors,
                    update: function(transition) {
                        var that = this;
                        var sel = group.selectAll("path");
                        (transition ? sel.transition() : sel)
                            .attr("d", function(d,ix) {
                                var x2 = d3.scaleLinear().domain([0, lineResolution]).range(xScale.domain());
                                var pts = [];
                                var value = that.accessors.value(d,ix);
                                for (var i=0; i<lineResolution; ++i) {
                                    var x = x2(i);
                                    pts.push({x: x, y: value(x)});
                                }
                                return line(pts);
                            })
                            .attr("stroke", defaultAccessor(accessors, "color", "black"))
                            .attr("fill", "none")
                            .call(defaultAccessor(accessors, "custom", function() {}));
                    }
                };
                sceneObject.update();
                scene.push(sceneObject);
                return sceneObject;
            }
        };
        return result;
    }
    plot.create = create;
    
})();
