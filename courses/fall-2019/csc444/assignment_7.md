---
layout: bootstrap
title: "Assignment 7: Linked views, brushes, details on demand"
---

# Assignment 7

- Posting date: October 8th, 2019
- Due date: October 15th, 2019 11:59PM MST
- GitHub classroom link: [Assignment 7](https://classroom.github.com/a/r29ybyay)

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

1. One scatterplot with **SATM** and **SATV** axes (12.5/100)

2. A second scatterplot with **ACT** and **GPA** axes (12.5/100)

3. When users click on a dot in either scatterplot, the
actual numerical values of the fields for that particular student are
displayed in a separate table (25/100)

4. When users drag the mouse on either scatterplot, a rectangular
**brush** is drawn on that scatterplot, indicating the region of
interest. All the points with attributes inside the brushed region are
considered **selected**. If users create two separate brushes,
selected points must satisfy the logical "and" of the criteria of the
two brushes. The **fill color** of the dots in the scatterplot must
correspond to whether the dots are selected (**red**) or not (**light
gray**). If no brush is active, the points must be drawn in **black**. (50/100)

5. When users click on a point in either scatterplot, the
corresponding point on the other scatterplot is highlighted, by making
both dots be shown with an enlarged radius. If users click on a
different dot, the previous dots must be restored to their original size (25/100).

You can get a total of 125 points (for 25 extra credit points).

# Skeleton code and data

You can (and should!) build on skeleton code we are providing
you. Make sure to read the source code - all of the hints for this
assignment are included there. The following files are included:

- `index.html`
- `main.js`
- `calvinScores.js`
- `d3.v5.js`

# Implementation hints

You can refer to code from any of your previous assignments as well;
you might also want to read the following:

- Documentation for d3's
  [brushes](https://github.com/d3/d3-brush/blob/v1.1.2/README.md#brush). Note that although d3's brushes are available as a separate library, you do not need to include `d3-brush` explicitly yourself: the brush library is packaged with the version of d3 included in the template repository.

