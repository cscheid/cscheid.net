---
layout: bootstrap
title: Lecture 5 transcript
---

# Jan 25, 2018

As requested in class, this is a transcript of the Javascript console
and the commands I typed in during the d3 intro lecture.

    > sel = d3.select("#test").selectAll("span").data(d1).enter().append("span")
    Selection {_groups: Array(1), _parents: Array(1)}

    > sel
    Selection {_groups: Array(1), _parents: Array(1)}

    > sel.nodes()
    (8) [span, span, span, span, span, span, span, span]

    > sel.text(function(d) { return "<" + String(d) + "> "; })
    Selection {_groups: Array(1), _parents: Array(1)}

    > sel.text(function(d) { return "<--" + String(d) + "--> "; })
    Selection {_groups: Array(1), _parents: Array(1)}

    > d1
    (8) [1, 2, 3, 4, 5, 6, 7, 8]

    > sel.attr("style", function(d) { return "background-color: rgb(" + (d * 30) + ",255, 255)"; })
    Selection {_groups: Array(1), _parents: Array(1)}

    > svg = d3.select("body").append("svg").attr("width", 400).attr("height", 400)
    Selection {_groups: Array(1), _parents: Array(1)}

    > d3.selectAll("*").style("background-color", "red")
    Selection {_groups: Array(1), _parents: Array(1)}

    > d3.selectAll("*").style("background-color", null)
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles = svg.selectAll("circle").data(d1).enter().append("circle")
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.attr("cx", function(d) { return d * d * 6;  })
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.attr("cy", function(d) { return d * 30; }).attr("r", 10)
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.filter(function(d) { return d % 2 === 0; }).style("fill", "red")
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.style("fill", function(d) { return "rgb(255, 0, 0)";})
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.style("fill", function(d) { return "rgb(255, " +  String(d * 30) + ", 0)";})
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.style("fill", function(d) { return d3.rgb(0, d*30, 255);})
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.attr("r", function(d) { return d * 5;})
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.attr("r", function(d) { return d * 10;})
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.style("fill", "black")
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.style("fill", function(d) { return d3.rgb(0, d*30, 255);})
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.attr("cx", function(d) { return d * 30; })
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.transition().attr("cx", function(d) { return d * d * 6;  })
    Transition {_groups: Array(1), _parents: Array(1), _name: null, _id: 1}

    > circles.transition().attr("cx", function(d) { return d * 30; })
    Transition {_groups: Array(1), _parents: Array(1), _name: null, _id: 2}

    > circles.transition().attr("cx", function(d) { return d * d * 6;  })
    Transition {_groups: Array(1), _parents: Array(1), _name: null, _id: 3}

    > circles.transition().attr("cx", function(d) { return d * 30; })
    Transition {_groups: Array(1), _parents: Array(1), _name: null, _id: 4}

    > circles.transition().duration(1000).attr("cx", function(d) { return d * d * 6;  })
    Transition {_groups: Array(1), _parents: Array(1), _name: null, _id: 5}

    > circles.transition().duration(1000).delay(1000).attr("cx", function(d) { return d * 30; })
    Transition {_groups: Array(1), _parents: Array(1), _name: null, _id: 6}

    > circles.style("fill", "red")
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.style("fill", function(d) { return d3.rgb(0, d*30, 255);})
    Selection {_groups: Array(1), _parents: Array(1)}

    > circles.transition().delay(function(d) { return d * 100; }).attr("cx", function(d) { return d * d * 6;  })
    Transition {_groups: Array(1), _parents: Array(1), _name: null, _id: 7}

    > circles.transition().duration(1000).attr("fill", function(d) { return d3.rgb(d * 30,0,0); })
    Transition {_groups: Array(1), _parents: Array(1), _name: null, _id: 9}

    > circles.attr("fill", null)
    Selection {_groups: Array(1), _parents: Array(1)}_groups: [Array(8)]_parents: [svg]__proto__: Object

    > circles.transition().duration(1000).style("fill", function(d) { return d3.rgb(d * 30,0,0); })
    Transition {_groups: Array(1), _parents: Array(1), _name: null

