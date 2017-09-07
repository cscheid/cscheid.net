---
layout: bootstrap
title: Lecture 4, Building basic vis, welcome to D3 (Aug 30th, 2017)
---

# Now let's build some visualizations!

Now that we've seen how SVG works, how JavaScript works, and how
web browsers provide a JavaScript API for manipulating the DOM, we
will create a very basic library for visualizations in
JavaScript. Although the library is very limited, its basic idea is
similar in spirit to an important part of d3, and when you understand how our library
works, you will better understand why d3 works the way
it does.

We will start with a very straightforward program that draws a
visualization in a very hard-coded way, and we'll systematically make
small changes to this program to make it more generic.

## The data

We'll be working with a small, but real-world dataset that records the
number of road fatalities in the United Kingdom, from 1969 to 1984.

Since parsing the data from a typical format like CSV to something
that JavaScript can easily process is a boring task, and since we
haven't yet learned how to actually load external data, we'll simply
include an additional JavaScript file called [data.js](lecture-extras/lecture3/data.js)
that contains a variable storing this dataset. It is an array of
objects, where every object has the fields `month`, `year`, and `count`:

    var ukDriverFatalities = [
        { month: 0, year: 1969, count: 1687 },
        { month: 1, year: 1969, count: 1508 },
        { month: 2, year: 1969, count: 1507 },
        ...
        { month: 9, year: 1984, count: 1575 },
        { month: 10, year: 1984, count: 1737 },
        { month: 11, year: 1984, count: 1763 }
    ];

## From zero to visualizations in eight steps

We will build a minimal, but reasonably powerful, SVG visualization
library by repeatedly improving a piece of source code, little by
little. **This is a crucial part of the first part
of the course. Make sure you can understand what we are doing by working through it on your own**.

This is the list of programs we will go through:

1. [No reuse](lecture-extras/lecture3/iteration_1.html)
2. [Generic element creator](lecture-extras/lecture3/iteration_2.html)
3. [Loop over arbitrary data](lecture-extras/lecture3/iteration_3.html)
4. [getter functions for specific attributes](lecture-extras/lecture3/iteration_4.html)
5. [use getters of iteration 4 to adjust visualizations](lecture-extras/lecture3/iteration_5.html)
6. [getter generators, higher-order functions](lecture-extras/lecture3/iteration_6.html)
7. [generic plotAll for any SVG element, just like generic make in iteration 2](lecture-extras/lecture3/iteration_7.html)
8. [Three different visualizations, each with 10 lines of code](lecture-extras/lecture3/iteration_8.html)

As you can see, until iteration 7, all the visualizations look
essentially the same. What we are doing is setting up our program so
that it becomes easy to explore different visualizations and
datasets.

## Iteration 1: [No reuse](lecture-extras/lecture3/iteration_1.html) [(source)](lecture-extras/lecture3/iteration_1.js)

The first version of our program is completely hard-coded in terms of
the dataset and the visual encoding. It is
a simple bar-chart that encodes the number of fatalities as the height
of the element, and the position along the x axis as a chronological
axis.

## Iteration 2: [Generic element creator](lecture-extras/lecture3/iteration_2.html) [(source)](lecture-extras/lecture3/iteration_2.js)

We'll start improving the program by noticing that, in iteration 1,
our functions `make`, `makeSVG` and `makeRect` all look very
similar. Let's replace them with a single function that creates any
elements and sets whatever attributes we might want. We do this by
passing an *object* whose keys and values are respectively the
attribute keys and values to be set on the created element (we loop
over the object keys using the `for (x in obj) ...` syntax.

As a result, our code now creates `rect` elements with the same call
it uses to create `svg` elements. This paves the way to create, for example,
`circle` elements without needing to write new `makeCircle` functions.

The next thing we do is we notice that we are looping over a global
variable. That's a bad idea.

## Iteration 3: [Loop over arbitrary data](lecture-extras/lecture3/iteration_3.html) [(source)](lecture-extras/lecture3/iteration_3.js)

Instead, what we do now is simply pass an extra parameter to
`plotAll`, so that it doesn't need to know where the data is coming
from (that's the extra `data` parameter). Still, the *body* of
`plotAll` remains dependent on the content of the
dataset: if the elements of the `data` array are not objects with
`count` field, `plotAll` will just not work.

The next change we need to do is to be able to change the values of
`width`, `height`, `x`, and `y` from *outside* of `plotAll`.

## Iteration 4: [getter functions for specific attributes](lecture-extras/lecture3/iteration_4.html) [(source)](lecture-extras/lecture3/iteration_4.js)

We do this by passing extra parameters to `plotAll`. These parameters
will be *functions* that pluck the right things from each entry of the
`data` array. Then, what `plotAll` does is iterate over `data`, and at
each step, it calls `widthGetter`, `heightGetter`, and so on. This
way, if the dataset changes, we can pass different getters into
`plotAll`, so it will know how to interpret the dataset
correctly. 

`plotAll` is now starting to be generally useful, so we will spend the
next iteration changing the calls to `plotAll` for charts 2 and 3.

## Iteration 5: [use getters of iteration 4 to adjust visualizations](lecture-extras/lecture3/iteration_5.html) [(source)](lecture-extras/lecture3/iteration_5.js)
   
The only changes we will make here are that instead of calling a
single function for all charts, we will call different functions for
each chart. We do this because the charts have different dimensions,
and so we need to set the `x`, `y`, `width` and `height` attributes
differently for each.

The result is that now the charts "scale" correctly. Regardless of the
size of the SVG element, all the bars for all the data points in the
visualization fit the visualization. That's nice.

At the same time, you can see how our source code is starting to get a
bit cluttered. Lines 27--50 of [iteration_5.js](lecture-extras/lecture3/iteration_5.js), specifically,
are quite dense and similar to one another. It's hard to tell the
difference between them. So let's fix that.

## Iteration 6: [getter generators, higher-order functions](lecture-extras/lecture3/iteration_6.html) [(source)](lecture-extras/lecture3/iteration_6.js)

In the previous iteration we created getters "directly", and their
only difference was how they used the dimensions of the different SVG
elements (`300` vs. `400` vs. `500` for the height, and similarly for
the other elements). What we do in
[iteration_6.js](lecture-extras/lecture3/iteration_6.js) is that we will create a
higher-order function for each of these getters, whose only job is to
return a getter specifically configured for the correct width, height,
and so on. These are called `rectWidth`, `rectHeight`, `rectX`,
`rectY` as before, but now, notice that these functions, instead of
*being* getters, they *return* getters. This way, when you write
`rectWidth(800)`, the result you get is a getter that is exactly
configured to return the correct rectangle width for an SVG element of
width 800. The same thing happens with the other "getter generators".

We are now ready for the final big change in our visualization
library. The main problem left is that `plotAll` still only knows how
to draw rectangles, and how to set some attributes of each
rectangle. We want a `plotAll` function that works for *any* element
and attribute. How would you solve it? Before you read on, take some
time to think about this.

<br>

## Iteration 7: [generic plotAll for any SVG element, just like generic make in iteration 2](lecture-extras/lecture3/iteration_7.html) [(source)](lecture-extras/lecture3/iteration_7.js)

(Got it?) We could create a `plotRects` function, and a `plotCircle`
function, and so on. That would work, but it would have the same
problem that we saw with `makeRect` and `makeSVG` on our first
iteration. Every time we wanted to create a new visualization, we'd
have to create a new function. That's not great.

The solution we will use is exactly the same as the one we did in
[iteration_2.js](lecture-extras/lecture3/iteration_2.js). Instead of passing parameters
specific to `rect`, we will pass a value that says which element we
want `plotAll` to create, and we will pass an *object* that contains
all the getters that will be called to set specific attributes of the
object. 

The way `plotAll` works, then, is that it creates an intermediate
object with the same keys as the keys of the `attributeGetters`
parameter it was passed. But `plotAll` *calls* each getters with all
elements of the array. The getters then configure the attributes,
which are passed to the (generic!) `make` function.

As a result, `plotAll` now knows nothing about the dataset or specific
attributes. The important thing it does, though, is that for *each*
row in the `data` array, it creates one SVG element, and calls the
same getters, consistently, for all elements in the array.

With this, we are ready to create quite different visualizations by just
passing the right parameters to `plotAll`.

## Iteration 8: [Three different visualizations, each with 10 lines of code](lecture-extras/lecture3/iteration_8.html) [(source)](lecture-extras/lecture3/iteration_8.js)

Our last code iteration is a first look into *design* iterations: we
can generate quite different visualizations by just changing the
elements we create, and what we map to each of the element attributes.

Note that in the space of 32 lines of code, we create 3 different
visualizations. That is really good expressivity for a very simple
function like `plotAll`, which is itself only 12 lines of code.


# Welcome to d3

Now, we will start learning the basics of [d3](http://d3js.org), the
JavaScript library we will be using throughout the course to build
visualizations. The reading materials for this section are Chapters
[5](http://chimera.labs.oreilly.com/books/1230000000345/ch05.html) and
[6](http://chimera.labs.oreilly.com/books/1230000000345/ch06.html) of
Scott Murray's book.

## Caveat: d3 versions

Very recently, a new major version of d3 (v4) was
released. Unfortunately, this version is not entirely
backwards-compatible with the version which Scott Murray used to write
the book (v3), and many of the examples online will still use the old
API style. Fortunately, the changes are relatively minor, and are easy
to keep track of. We'll include a list of some of the biggest things
at the [bottom of these lecture notes](#v3-vs-v4).

# Let's get started

We will run a variety of small demos on a
[separate page](lecture-extras/lecture4/d3_intro.html) that has no other content
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

## Colors

* [Color interpolation demo](lecture-extras/lecture4/colors.html).

## Transitions

Change blindness[^1]
is a potentially serious problem for human vision. Since we will be
building **dynamic** visualizations (that is, visualizations with
elements which change over time), we will need to be careful in how we
design these element changes. Fortunately, d3 offers a
powerful, almost magical API for designing transitions. 

[^1]: See [Preattentiveness in visualization](https://www.csc2.ncsu.edu/faculty/healey/PP/), "Change blindness".

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

