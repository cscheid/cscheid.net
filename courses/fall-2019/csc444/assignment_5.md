---
layout: bootstrap
title: "Assignment 5: d3 scales, axes and transitions"
---

# Assignment 5

- Posting date: 2019-09-24
- Due date: 2019-10-01 11:59PM
- GitHub Classroom link: [Assignment 5](https://classroom.github.com/a/qmojh4zZ)

# Description

In this assignment, you will improve your code for the visualization
`scatterplot_1` you built last week. You will use a variety of d3
features:

* d3 scales for:
  * circle positions
  * circle radii
  * circle colors
* d3 axes
* d3 transitions

You are welcome to use the code you submitted for Assignment 4, or to
start with code from scratch. But the new submission will have to use
the d3 features shown above.

Just like the plot in Assignment 4, the `id` attribute of your div
should be `scatterplot_1`.

## 1. D3 Scales: 85% credit

Somewhere in your code for assignment 4, there's very probably some
code that looks like this:

    svg.selectAll("circle")
	    .attr("cx", function(d) { /* SOME CODE HERE */ })
	    .attr("cy", function(d) { /* SOME CODE HERE */ });

### 1a. Circle Positions: 25% credit

In this part of the assignment, you will write the selection update
code so that it look like this:

    svg.selectAll("circle")
	    .attr("cx", function(d) { return cxScale(d.SATM); })
	    .attr("cy", function(d) { return cyScale(d.SATV); });

Notice that we're explicitly calling two separate functions, `cxScale`
and `cyScale`. In your code, define variables `cxScale` and `cyScale`
to be instances of `d3.scaleLinear()`, configured appropriately.

### 1b. Circle Radii: 15% credit

Do the same thing for the `r` attribute of your circles: make the
update code refer to a `rScale` variable, and then define it
appropriately. Here, however, use `d3.scaleSqrt` (This is a
better choice to control the *area* of a circle - as we will see in
class, it is generally better to use area to control the size of a shape). The
smallest circles should have radius 10, and the largest circles,
radius 20.

### 1c. Circle colors: 45% credit

You will implement a number of colormaps variations. Add
*buttons* to your visualization to toggle these colormaps (See
[this minimal example](assignment_5/buttons.html) to learn how to
use d3 to create buttons in your HTML page that react to when you
click on them.)

1) Create a continuous color scale that interpolates linearly from the minimum
`SATV` in the data being given color `red`, to the maximum `SATV` in
the data being given color `green`.

2) Create a continuous color scale that uses three of the colors in
[RdYlGn-5](http://colorbrewer2.org/#type=diverging&scheme=RdYlGn&n=5) as
follows. The minimum `SATV` should be given `#d7191c` (the first color), the **average**
`SATV` should be given `#ffffbf` (the third color), and the maximum
`SATV` should be given `#1a9641` (the fifth color). **HINT**: read the
[documentation on d3 scales](https://github.com/d3/d3-scale#continuous_domain).

3) Create a **quantized** color scale that uses all five colors in
[RdYlGn-5](http://colorbrewer2.org/#type=diverging&scheme=RdYlGn&n=5)
such that the minimum SATV gets the red color, the maximum SATV
gets the green color, and there are five "bands" of SATV values each
mapped to one of the colors. **HINT**: read the 
[documentation on d3 quantize scales](https://github.com/d3/d3-scale#scaleQuantize).

Your buttons should have the following ids: `colormap-button-1`,
`colormap-button-2`, and `colormap-button-3`. Their behavior should be
such that when we click on the button, the points in the visualization
switch to the corresponding colormap.

## 2. D3 Axes: 10% credit

Next, you will add d3 axis annotations to this same
scatterplot, by using the objects `d3.axisLeft()` and
`d3.axisBottom()`. Follow the example
[here](http://bl.ocks.org/mbostock/02d893e3486c70c4475f) (search for
"axisBottom"). Note that d3 axes use some pre-defined CSS classes by
default. The easiest way to make the axes plot the way you want is to
add CSS declarations to your HTML. Again, follow the example above.

## 3. Animated Transitions: 5% credit

When changing the circle colors, make the change an animated
transition of duration 3 seconds, using [d3 transitions](https://github.com/d3/d3-transition).

## 4. Extra credit: Position transitions (10% extra credit)

Add two buttons to your webpage that will toggle the x position of
your circles, alternating between `SATM` (the value you started with
above) and the cumulative score, `SATM` + `SATV`.  The button to
choose SATM values should have id `SATM`, and the button for the
cumulative score should have id `SAT-cumulative`. Note that these two
data attributes have significant different ranges, and you should make
the position scale of both cases "nice": in other words: the `SATM`
scale should range from 300 to 800, but the `SATM` + `SATV` scale
should range from 600 to 1600. Make this an animated transition.

For full credit, the axes ticks and marks will need to be animated as
well! **HINT**: this is way, way, easier than it seems; d3 does what
you would hope for here.
