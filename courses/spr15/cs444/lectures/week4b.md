---
layout: bootstrap
title: Week 4b, Introduction to d3
---

# Week 4b, Introduction to d3

Up until this part of the course, he had been writing all the
JavaScript we needed to create our (basic) visualizations. From now
on, though, we will start to use [d3](http://d3js.org). In your
homework assignments, too, you will now be allowed to use whatever
open-source software libraries you wish to, as long as you give proper
attribution.

As we go through the d3 library in the next few classes, your best
reference will be Scott Murray's
[Interactive Data Visualization for the Web, Chapters 5 through 7](http://chimera.labs.oreilly.com/books/1230000000345/ch05.html). Once
again, I will repeat my advice that you just go ahead and buy the
book. It's totally worth it.

This lecture will be a whirlwind tour of d3, showing you the main
ideas and the types of things you can do with it. In the following
three weeks or so, we will dive deep into each of the library's
features and see how we can use those features to create data
visualizations quickly and effectively.

## Recap

If you made it so far, you now know how a
[web browser represents a document generally](week2.html#DOM), and
[graphical elements specifically](week2.html#SVG). You've learned how
[JavaScript](week3.html) is the programming language that allows you
to write code to manipulate the HTML document, and this how to create
graphical elements from data: visualizations! Finally, you've seen why
it makes sense to structure your basic visualization code around
looping over the dataset, and [mapping parts of each data point to
different aspects of a graphical element](week3b.html).

If you don't understand some of these things above, I strongly urge
you to go back to the lecture notes of previous weeks and read them
over again until you do. From now on, the course will pick up
its pace, and we will need all of this material as
prerequisites. Specifically, make sure you understand how the
[last iteration](week3/iteration_8.html) of our simplified
visualization library operates. If you understand how that works, you
will understand a lot of how d3 works.

# d3

[D3](http://d3js.org) is a JavaScript library originally written by
Mike Bostock, Vadim Ogievetsky, and Jeff Heer; at this point it has a
large number of contributors, and it's one of the overall most popular
projects on GitHub (!). D3 certainly owes some of its
popularity to riding the everything-on-the-web
wave. Nevertheless, the way in which you can express relationships
between *data* and *visual elements* is fundamentally superior than
any other library available, open source or not! It is nothing short
of a breakthrough in the way we use code to express visual
encodings.

Now, as you'll see, D3 is not necessarily a *high-level* visualization
library. If you're looking for a ready-made charting library, then
there are better open-source alternatives, such as
[protovis](http://mbostock.github.io/protovis/), and
[dc.js](http://dc-js.github.io/dc.js/), or proprietary ones, such as
[Variance](http://variancecharts.com/). If you're willing to learn R,
then [ggplot2](https://ggplot2.tidyverse.org) is astoundingly powerful.  As a
tool to build new visualization libraries and custom-made
visualizations, however, d3 just leaves everything else in the
dust. Since in this course we will be navigating a path that includes
both *understanding visualizations* and *creating* them, d3 is an
obvious choice.

## Fundamentals

In order to follow the basic examples that are given below, open
[this link](week4/d3_intro.html) in a new window, and open the
developer console. We'll be typing code into the console and examining
what happens.

    d3.select("#test").append("svg")
		.attr({width:500,height:500})
		.selectAll("rect").data(d1).enter()
		.append("rect").attr({
			x: function(d,i) { return i * 50; }, y: 0, 
			width: 50, height: function(d) { return d * 50; }})

## Scales

It turns all of that weird junky code with divisions and
multiplications that we had in [iteration_8](week3/iteration_8.html) can be rewritten into
something that actually makes sense.

And, for the people who tried to
add the axis lines and labels to your previous assignment: d3 scales
store the extra information about domain and range, and can be used to
create axis lines much more easily.

To be finished.

## transitions

Animations prevent change blindness. d3 has excellent support for
them: 99% of the time it's just a matter of sticking `.transition()`
between your selection and your attribute assignments:

    d3.select("#test")
		.selectAll("rect")
		.data(d2)
		.transition()
		.attr("height", function(d) { return d * 50; })

To be finished.

## event handlers

Adding interactivity, tied to the *data*, and not to the DOM
element. This is extremely convenvient.

To be finished.

