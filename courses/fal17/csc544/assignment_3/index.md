---
layout: bootstrap
title: "Assignment 3: d3"
---

# Assignment 3

- Posting date: Sep. 6th
- Due date: Sep. 13th
- Submission [GitHub classroom](https://classroom.github.com/a/4_oi09cq)

# Description

In this assignment, you will recreate the previous visualizations we
have seen in class (and built for your previous assignments) using
d3.

You will turn in two files: `part1.html` and `part2.html`.

## Part 1: d3 hello world: selections, joins

You will recreate the examples in the
[last iteration](../lecture-extras/lecture3/iteration_8.html) of the code we
studied in Lecture 3, and you will also recreate the first visualization
in Part 2 of your previous assignment (this is the scatterplot of `SATM`
vs `SATV` scores).

You will turn in an HTML file named `part1.html`. Each visualization
should be an SVG element of the same dimensions you used previously. The
`id` attributes of the elements should also match the ones we used
previously. They should be, respectively, `chart1`,
`chart2`, `chart3`, and `scatterplot_1`.

Your visualizations have to be created using d3 calls. In other words,
the way to turn data into SVG elements has to be through d3 methods
like `selectAll`, `data`, `enter` and `append`. As we have seen in
class, it is almost never the case that you need to write `for`
loops with d3. As such, I will deduct points from this assignment if
you use `for` loops to create your SVG elements.

For this assignment, you are allowed to use any additional library
you'd like. You are required to use [d3](http://d3js.org), but maybe
you'll also want to use [jQuery](http://jquery.com/),
[underscore.js](http://underscorejs.org/), or whatever else you
like. Remember to give proper attribution in your writeup and source
code.

## Part 2: d3 scales, axes, and transitions

In part 2, you will:

- improve the code you created for part 1 using d3's scales
- annotate your d3 plots using axes
- learn about d3's support for transitions

Here, you will use a variety of d3 features:

* d3 scales for:
  * circle positions
  * circle radii
  * circle colors
* d3 axes
* d3 transitions

You are welcome to reuse the code for part 1, or to start with code
from scratch. But the solution for part 2, submitted in `part2.html`,
will have to use the d3 features described above.

Just like with the plot in Assignment 2 and in part 1 of this assignment,
the `id` attribute of the main div should be `scatterplot_1`.

### D3 Scales

Somewhere in your code for part 1, there will very probably be
code that looks like this:

    svg.selectAll("circle")
	    .attr("cx", function(d) { /* SOME CODE HERE */ })
	    .attr("cy", function(d) { /* SOME CODE HERE */ });

#### Circle Position scales

In this part of the assignment, you will write the selection update
code so that it look like this:

    svg.selectAll("circle")
	    .attr("cx", function(d) { return cxScale(d.SATM); })
	    .attr("cy", function(d) { return cyScale(d.SATV); });

Notice that we're explicitly calling two separate functions, `cxScale`
and `cyScale`. In your code, define variables `cxScale` and `cyScale`
to be instances of `d3.scaleLinear`, configured appropriately.

#### Circle Radii

Do the same thing for the `r` attribute of your circles: make the
update code refer to a `rScale` variable, and then define it
appropriately. Here, however, use `d3.scaleSqrt` (This is a
better choice to control the *area* of a circle - as we will see in
class, it is better to use area to control the size of a shape). The
smallest circles should have radius 10, and the largest circles,
radius 20.

#### Circle colors

You will implement a number of colormaps variations. Add
*buttons* to your visualization to toggle these colormaps (See
[this minimal example](buttons.html) to learn how to
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

### D3 Axes

Next, you will add d3 axis annotations to this same
scatterplot, by using the objects `d3.axisLeft()` and
`d3.axisBottom()`. Follow the example
[here](http://bl.ocks.org/mbostock/02d893e3486c70c4475f) (search for
"axisBottom"). Note that d3 axes use some pre-defined CSS classes by
default. The easiest way to make the axes plot the way you want is to
add CSS declarations to your HTML. Again, follow the example above.


### Animated Transitions

When changing the circle colors, make the change an animated
transition of duration 3 seconds, using
[d3 transitions](https://github.com/d3/d3-transition).

## Extra credit: Position transitions

Add two buttons to `part2.html` that will toggle the x position of
your circles, alternating between `SATM` (the value you started with
above) and the cumulative score, `SATM` + `SATV`.  The button to
choose SATM values should have id `SATM`, and the button for the
cumulative score should have id `SAT-cumulative`. Note that these two
data attributes have significant different ranges, and you should make
the position scale of both cases is "nice": in other words: the `SATM`
scale should range from 300 to 800, but the `SATM` + `SATV` scale
should range from 600 to 1600. Make this an animated transition.

NOTE: In order to get extra credit, the axes ticks and marks will need
to be animated as well! This is way easier than it might seem at first
glance. d3 "does what you would hope for" here.


## Assessment

- Part 1: Each of the plots is worth 12.5% credit (for a total of 50%
  credit)
- Part 2a: Full marks on using scales appropriately is worth 35% total credit
- Part 2b: Full marks on using axes is worth 10% total credit
- Part 2c: Full marks on using transitions is worth 5% total credit
- Extra credit: 10%

## Datasets

- [UK Driver Fatalities](ukDriverFatalities.js)
- [Calvin College senior scores](calvinScores.js)


