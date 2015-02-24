---
layout: bootstrap
title: Week 5b, scales and transitions
---

# Week 5b, scales and transitions

# Scales

When designing a data visualization, many of the decisions we
have to take hinge on how we are going to *transform* our data. We
will think of these transformations as functions (in the mathematical
sense): well-defined mappings with domains (the sets containing the
input points) and the ranges (where the points are mapped).

In D3, a *scale* is a type of object that encodes these kinds of
functions.

Scales are completely optional in D3, but we will use them extensively
in class, and you should use them in your visualizations and
projects. They make your visualizations easier to design and change,
and make your code cleaner at the same time.

Let's look at some of the previous examples you've written for the
assignments. In week 3, we wrote code that looked [like
this](http://cscheid.net/courses/spr15/cs444/lectures/week3/iteration_8.js):

    function toHex(v) {
        var str = "00" + Math.floor(Math.max(0, Math.min(255, v))).toString(16);
        return str.substr(str.length-2);
    }
    
    function color(count) {
        var amount = (2500 - count) / 2500 * 255;
        var s = toHex(amount), s2 = toHex(amount / 2 + 127), s3 = toHex(amount / 2 + 127);
        return "#" + s + s2 + s3;
    }
    
    plotAll(chart1, ukDriverFatalities, "rect", {
        width: function() { return Math.ceil(600 / (1984 - 1969 + 1)); },
        height: function() { return Math.ceil(300 / 12); },
        x: function(row) { return Math.ceil(600 / (1984 - 1969 + 1)) * (row.year - 1969); },
        y: function(row) { return Math.ceil(300 / 12) * (11 - row.month); },
        fill: function(row) {
            return color(row.count);
        }
    });

Back then, we did a lot of work to make the code general with respect
to the type of element we were inserting, and the attributes we were
setting. But we didn't do a whole lot about the rest of the mess in
that code: `Math.ceil(600 / (1984 - 1969 + 1))` is not particularly
hard to read, but what we *mean* by the expression is buried in the
code. The `color` function is bad for a similar reason: can you tell,
at a glance, what it's doing? I'm guessing you cannot.

Still, these functions above are examples of scales. They have a
domain (for example, month number from 0 to 11, or year, or fatality
count) and a range (position on x axis, position on y axis, color,
etc). D3 scales are simply a very nice way to structure this kind of
code.

## Linear scales

The simplest type of scale in d3 encodes a linear
transformation[^1]. Here it is in action:

    var xScale = d3.scale.linear().domain([1969, 1985]).range([0, 600])

    plotAll(chart1, ukDriverFatalities, "rect", {
	    ...
		// BEFORE: ....  { return Math.ceil(600 / (1984 - 1969 + 1)) * (row.year - 1969); }
		// NOW:
        x: function(row) { return xScale(row.year); },
        ...
    });

The call to `d3.scale.linear()` creates a new linear scale, which has
a few methods. For now we just focus on `domain` and `range`, which
set the domain and range of the transformation. This is a linear
scale, which is uniquely defined given the domain and range
boundaries.  So d3 simply solves the system of equations for you. The
resulting object has the following properties:

    var l = d3.scale.linear().domain([dMin, dMax]), range([rMin, rMax]);
	
	// these are always going to be true
    l(dMin) === rMin // the min of the domain goes to the min of the range
	l(dMax) === rMax // the max of the domain goes to the max of the range
	l(v1 + k) - l(v1) === l(v2 + k) - l(v2) // any change in the domain corresponds to an equal change in the range

Notice that you *use* a d3 scale exactly like you use a function, by
calling it with parameters you want to map through the scale.

Here is a trick that will come very handy in most of your
projects. We've already seen how annoying it is that the SVG y axis is
inverted from what we are used to in mathematics: instead of growing
*up*, it grows *down*. It turns out that we can fix this very easily,
by using the right linear transformation. Going back again to our
basic example:
    
    plotAll(chart1, ukDriverFatalities, "rect", {
	    ...
        y: function(row) { return Math.ceil(300 / 12) * (11 - row.month); },
		...
    });

The code says `11 - row.month`, so that month 0 (january) actually
gets mapped to a large value. When using d3 scales, you can say this
more clearly:

    var yScale = d3.scale.linear().domain([0,12]).range([300, 0])

Now we're specifying that the minimum value in the domain should be
mapped to *300*, which is the bottom of the SVG, and the maximum value
in the domain should be mapped to *0*, the top. No fuss with
subtraction necessary (I don't know about you, but I always seeem to
get subtractions wrong and drop a minus sign somewhere).

### Range spaces can be things other than numbers

Let's try to understand the following example:

    var cScale = d3.scale.linear().domain([32, 212]).range([d3.rgb(128,255,255), d3.rgb(255,0,0)]);
	
What's going on here? We've used d3 to specify *colors* as the target
of our linear mapping, and d3 creates a transformation that traces a
linear path from cyan to red. 

This works because when given its own color objects, d3 scales will
interpret them as arrays of RGB values, and perform the right linear
transformations on each separate value. In other words, the code above
is equivalent to the code below:

    var d = [32, 12];
    var rScale = d3.scale.linear().domain(d).range([128, 255]); // R
    var gScale = d3.scale.linear().domain(d).range([255, 0]);   // G
    var bScale = d3.scale.linear().domain(d).range([255, 0]);   // B
	var cScale2 = function(c) {
	    return d3.rgb(rScale(c), gScale(c), bScale(c)).toString();
	} // cScale2 does the same thing as cScale1!

Spaces such as the space of colors are *multidimensional*:
intuitively, you need more than one number to describe each point. But
the domain of d3 scales is restricted to be single-dimensional. As a
result, the only sensible way to fix this mismatch is for d3 to
"broadcast" the domain value across the dimensions of the range.

D3 takes this idea of automatically making scales multidimensional
even further: If you give range values an arbitrary string, it will
try to *find* numbers inside this string, and construct a space out of
changing those numbers. Take this example:

    var tScale = d3.scale.linear().domain([0, 1])
	    .range(["translate(30, 50)",
		        "translate(80, 40)"]);

Here, we are using the SVG syntax for the
[`transform` attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform),
which we learned about in week 2.  The meaning here is intuitive: if
the given value is 0, we want the return value to be translation to
`30,50`. If the given value is 0.5, we want the halfway
transformation: `translate(55, 45)`. The miracle is that D3 actually
does the right thing! Try these:

    console.log(tScale(0));    // "translate(30, 50)"
    console.log(tScale(1));    // "translate(80, 40)"
    console.log(tScale(0.5));  // "translate(55, 45)"
    console.log(tScale(0.25)); // "translate(42.5, 47.5)"

Because so many things in SVG are specified as strings, this technique
is very useful. It also works, for example, on SVG paths:

    var pScale = d3.scale.linear().domain([0,1])
	    .range(["M100,100 L250,80",
		        "M20,300 L50,30"]);

    console.log(pScale(0));    // "M100,100 L250,80"
    console.log(pScale(0.5));  // "M60,200 L150,55"
    console.log(pScale(0.3));  // "M76,160 L190,65"
    console.log(pScale(0.2));  // "M84,140 L210,70"
    console.log(pScale(0.1));  // "M92,120 L230,75"

### Piecewise linear scales

One way of thinking about scales is that they are specifying *paths*
in some target space; we give the position of the beginning of the
path, the position of the end of the path, and the scale function
learns how to find the positions of all the points in between. The
scales we've seen so far all define *straight* paths. But there are
many reasons to want our paths to bend. 

Say we want to create a color scale that maps positive values to red,
negative values to blue, and neutral values to gray. With a single linear
transformation this is not possible:

    var badColor = d3.scale.linear().domain([-1, 1]).range(["red", "blue"]);
	console.log(badColor(0)); // "#800080", a dark purple :(

The problem here is that the straight path from blue to red in RGB
space does not go through gray. The solution is to create path *piece by piece*. D3 makes this easy:

    var goodColor = d3.scale.linear().domain([-1, 0, 1]).range(["red", "white", "blue"]);
	console.log(goodColor(0)); // "#FFFFFF", white!
	console.log(goodColor(0.5)); // "#FFFFFF", light blue
	console.log(goodColor(-0.5)); // "#FFFFFF", light red
	
The way this works internally is how you'd expect it to: the chain is
broken into individual linear transformation pieces, one per segment.

## Automatic axes!

In one of your assignments you were asked, as extra credit, to draw
axis lines and labeled ticks for a scatterplot. I asked you to do that
because I wanted you to notice that drawing these axis lines is

1) more cumbersome than drawing the data
2) *deeply tied with how you map the data to a position*

The second observation is important, both theoretically and in
practice. It is important in the theory of visualization because, as a
general rule, the axis line and tick marks are *visual representations
of the transformation*. Studying the properties of transformations,
and how we represent them on the screen, can tell us a lot about how
to create the right axis lines (or whatever analogous thing we want to
use). It also means that, generally speaking, a visualization without
axis annotations will be ambiguous.

In practice, observation 2 means that every time you change the scale,
you will need to change the axis lines too. From a software
engineering perspective, then, you would like the axis-drawing code to
take the scale *as a parameter*, so it can automatically adapt.  This
way, you only have to change the scale in one place, and then pass it
to the code that generates the marks for the data and to the code that
draws the axis.

As it turns out, d3 offers just one such facility (which then helps
with observation 1!). To draw axes automatically with d3, you use its
[SVG Axes component](https://github.com/mbostock/d3/wiki/SVG-Axes).
The basic usage pattern goes like this:

HTML:

    <html>
	 <body>
	   <svg width="600" height="300">
	   </svg>
	 </body>
	<html>

Javascript:

    // the range doesn't go all the way to leave some margin
    var xScale = d3.scale.linear().domain([32, 212]).range([30, 570]);
	var axis = d3.svg.axis().scale(xScale);
    d3.select("svg") // or something else that selects the SVG element in your visualizations
        .append("g") // create a group node
		.call(axis); // call the axis generator
	

## Other types of scales

Scales can be more general than linear transformations.

To be finished.

### Log Scales, Power Scales

### Categorical Scales

### Ordinal Scales

### Quantize Scales


# Transitions

Duration, delay, [easing functions](https://github.com/mbostock/d3/wiki/Transitions#d3_ease).



----

[^1]: to be precise, this is an affine transformation, not a linear transformation. For now this distinction doesn't matter but later in the course, when we get to visualization principles, we'll see how "linear" is not quite right and why that matters.

