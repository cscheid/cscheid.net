---
layout: bootstrap
title: "Assignment 7: Linked views, brushes, details on demand"
---

# Assignment 7

- Posting date: Oct. 4th
- Due date: Oct. 11th
- Assignment name for `turnin`: `cs444_assignment_7`

# Description

In this assignment, you will create a visualization with linked views
and interactive brushing.

You will use the same Calvin College grades dataset you have been
using before, and your visualization will consist of two side-by-side
scatterplots. The first scatterplot will have SATM and SATV axes, and the
second scatterplot will show ACT and GPA axes. In addition, the
visualization will support interaction via linked views: points
selected in one view will be highlighted in the other view. Finally,
as users click on points in either scatterplot, you will show the
actual values of that particular student in a separate, third view.

Specifically, your visualization will be graded based on the following
features:

1. One scatterplot with SATM and SATV axes (12.5/100)

2. A second scatterplot with ACT and GPA axes (12.5/100)

3. When users click on a point in either scatterplot, the
actual numerical values of the fields for that particular student are
displayed in a separate table (25/100)

4. When users drag the mouse on either scatterplot, a *rectangular
brush* is drawn on that scatterplot, indicating the region of
interest. All the points inside that region are considered selected,
and should be highlighted on the *other* scatterplot. (50/100)

5. When users click on a point in either scatterplot, the
corresponding point on the other scatterplot is highlighted (25/100)

You can get a total of 125 points (for 25 extra credit points).

# Implementation hints

You can reuse code from any of your previous assignments; you should
also look at the following resources:

- Bostock, [Focus + Context via Brushing](http://bl.ocks.org/mbostock/1667367)
  
- Bostock,
  [Scatterplot Matrix Brushing](http://bl.ocks.org/mbostock/4063663)

- Bostock, [Brushable Network](http://bl.ocks.org/mbostock/4560481)

- Documentation for d3's
  [SVG Controls, including brushes](https://github.com/mbostock/d3/wiki/SVG-Controls)

