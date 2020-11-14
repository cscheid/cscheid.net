---
layout: bootstrap
title: "Assignment 4: d3 basics"
---

# Assignment 4

- Posting date: 2019-09-17
- Due date: 2019-09-24 11:59PM MST
- GitHub Classroom link: [Assignment 4](https://classroom.github.com/a/3jWuE1s3)

# Description

In this assignment, you will recreate some of the previous
visualizations we've seen in class using d3. Specifically, you will recreate
the examples in the [last iteration](lectures/lecture4/iteration_8.html) of the
code we developed in Lecture 3, and you will also recreate the first
visualization of Assignment 3.

You will start with the HTML file named `index.html` in your starter repo. Each visualization
should be an SVG element of the same dimensions used previously. The
`id` attributes of the elements should also match the ones we used
previously. They should be, respectively, `chart1`,
`chart2`, `chart3`, and `scatterplot_1` (this is included in the starter repo).

Your visualizations have to be created using d3 calls. In other words,
the way to turn data into SVG elements has to be through d3 methods
like `selectAll`, `data`, `enter` and `append`.

For this assignment, you are allowed to use any additional library
you'd like. You are required to use [d3](http://d3js.org) (which is
included in the starter repo), but maybe you'll also want to use
[jQuery](http://jquery.com/),
[underscore.js](http://underscorejs.org/), or whatever else you
like. Remember to give proper attribution in your writeup and source
code.

## Assessment

Each of the plots is worth 25% of the total credit. 

## Datasets

Both datasets are included in the starter repo:

- UK Driver Fatalities
- Calvin College senior scores
