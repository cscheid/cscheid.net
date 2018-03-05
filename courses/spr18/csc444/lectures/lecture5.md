---
layout: bootstrap
title: Lecture 5, D3, the bare-bones introduction
---

# Welcome to d3

In this lecture we will start learning the basics of
[d3](http://d3js.org), the Javascript library we will be using
throughout the course to build visualizations.

The reading materials for this lecture are Chapters
[5](http://chimera.labs.oreilly.com/books/1230000000345/ch05.html) and
[6](http://chimera.labs.oreilly.com/books/1230000000345/ch06.html) of
Scott Murray's book.

### Class transcript

Here's a [partial transcript](lecture5/transcript.html) of the
Javascript console, as requested in class.

## Caveat: d3 versions

Recently, a new major version of d3 (v4) was released. Unfortunately,
this version is not entirely backwards-compatible with the version
which Scott Murray used to write the book (v3), and many of the
examples you will find online will still use the old API
style. Fortunately, the changes are relatively minor, and are easy to
keep track of. We'll include a list of some of the biggest things at
the [bottom of these lecture notes](#v3-vs-v4).

# Let's get started

We will run a variety of small demos on a
[separate page](lecture5/d3_intro.html) that has no other content
besides a simple dataset, a single div, and the correct version of d3
preloaded.

We will cover:

* Selections
  * the `selectAll().data().enter().append()` pattern
  * accessor functions
  * the `call` method for selections
* Colors
* Transitions



## Selections

How to create an SVG element inside a div with id `main_div` using d3:

    d3.select("#main_div").append("svg");
	
Note the **chained** sequence of method calls. In d3, the majority of
methods return an object with methods of its own. It's very commmon to
chain these sequences together, and you will get used to reading them
somewhat like sentences ("select the main div then append an svg").

Most of these objects are "selections": they represent a set of
elements in the DOM. You can store them in variables.

    var div = d3.select("#main_div");
	var svg1 = div.append("svg");
	var svg2 = div.append("svg"); // creates a second svg inside #main_div
	var rect = svg1.append("rect");

We can also set attributes of the elements:

	svg.attr("height", 400).attr("width", 400);
    rect.attr("height", 300)
	    .attr("width", 300)
		.attr("x", 50)
		.attr("y", 50)
		.attr("fill", "red"); // note the chained method syntax

So far, so good. But remember that we ultimately want to manipulate
many DOM elements, to associate them with attributes of the data that
we are interested in visualizing. If we wanted to create many elements
at once, we could make these calls inside for loops, and that would
work. But d3 offers a much better way to structure our code, by allowing selections to operate
on many DOM elements at once:

    div.selectAll("svg").attr("height", 300).attr("width", 300)

### Data Joins

These three pieces by Mike Bostock (the main designer of d3) are
useful:

* [Three little circles](https://bost.ocks.org/mike/circles/)
* [Thinking with joins](https://bost.ocks.org/mike/join/)
* [How Selections Work](https://bost.ocks.org/mike/selection/)

## Colors

* [Color interpolation demo](lecture5/colors.html).

## Transitions

As we've seen in the first lecture of the semester, change blindness
is a potentially serious problem for human vision. Since we will be
building **dynamic** visualizations (that is, visualizations with
elements which change over time), we will need to be careful in how we
design these element changes. Fortunately, d3 offers a
powerful, almost magical API for designing transitions. 

The gist of it is, roughly, that anything you can do with a selection,
you can also do in a transition, and d3 will smoothly change the
values for you. 

If you wanted to set all circle fill colors to be red, you'd write:

    d3.selectAll("circle").attr("fill", "red")
	
But if you wanted their colors to slowly change to red, you'd instead
write:

    d3.selectAll("circle").transition().attr("fill", "red")

That's it! The
[full API documentation](https://github.com/d3/d3-transition/blob/master/README.md)
has all the details, but the main things you will want to read on are
the `delay`, `duration`, and `easing` methods.

# v3 vs v4

The official documentation has [a summary of changes](https://github.com/d3/d3/blob/master/CHANGES.md).

Irene Ros has
[a very comprehensive presentation of the changes](https://iros.github.io/d3-v4-whats-new/),
although, at this point, this will be a bit of jumping off the deep
end.

Biggest changes:

## Scales

The namespaces are now flat:

    // v3 API
	var scale = d3.scale.linear(); // BAD!
	# v4 API
	var scale = d3.scaleLinear(); // better

The heuristic to try in case you can't find a particular object is
that if you have `d3.scale.foo` in v3, you should try `d3.scaleFoo` in
v4. One notable exception is that the categorical colormaps now
require explicit construction (`v4` is less magic, but more work for
us):

    // v3 API
	var colors = d3.scale.category10(); // BAD!
	// v4 API
	var colors = d3.scaleOrdinal(d3.schemeCategory10); // better

## Axes

The axes API has changed. It's better to just
[consult the new documentation](https://github.com/d3/d3/blob/master/CHANGES.md#axes-d3-axis).

