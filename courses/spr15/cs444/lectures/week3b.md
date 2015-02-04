---
layout: bootstrap
title: Week 3b, basic SVG visualizations with JavaScript
---

# Week 3b, basic SVG visualizations with JavaScript

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
include an additional JavaScript file called [data.js](week3/data.js)
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

The best way to see how these examples work is to open them side by
side and compare the JavaScript source code.

(Lecture notes to be finished.)

1. [No reuse](week3/iteration_1.html)
2. [Generic element creator](week3/iteration_2.html)
3. [Loop over arbitrary data](week3/iteration_3.html)
4. [getter functions for specific attributes](week3/iteration_4.html)
5. [use getters of iteration 4 to adjust visualizations](week3/iteration_5.html)
6. [getter generators, higher-order functions](week3/iteration_6.html)
7. [generic plotAll for any SVG element, just like generic make in iteration 2](week3/iteration_7.html)
8. [Three different visualizations, each with 10 lines of code](week3/iteration_8.html)
