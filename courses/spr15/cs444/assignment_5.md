---
layout: bootstrap
title: "Assignment 5: d3 scales, axes and transitions"
---

# Assignment 5

- Posting date: Feb. 12th, 2015
- Due date: Feb 26th, 2015, 1:59PM MST (It is due *by thursday's
  lecture*)
- Assignment name for `turnin`: `cs444_assignment_5`

# Description

In this assignment, you will modify the `axis.html` example we went
over in class, to add the following features:

1. You will give each point a color using color scales created with
   `d3.scale`, indicating the student's GPA. There
   will be two color scales. (20/100)
   
   a. The first color scale will range from yellow to orange to red,
   using the following hex codes for the colors: `#ffeda0, #feb24c,
   #f03b20`: this is
   [Cynthia Brewer's YlOrRd](http://colorbrewer2.org/?type=sequential&scheme=YlOrRd&n=3)
   scale. Yellow should be mapped to the maximum GPA in the dataset,
   orange to the halfway point in the range, and red to the minimum GPA in
   the dataset.
   
   b. The second color scale will range from blue to white to red,
   using the following hex codes for the colors: `#fc8d59, #ffffbf,
   #91bfdb`: this is
   [Cynthia Brewer's RdYlBu](http://colorbrewer2.org/?type=diverging&scheme=RdYlBu&n=3)
   scale. Red should be mapped to the minimum GPA in the dataset,
   white to the *AVERAGE* GPA in the dataset, and blue to the maximum
   GPA in the dataset.

2. Create a *color legend* for the current color scale, in the form
   of a vertical bar to either side of the original scatterplot. It
   should show the entire range of the colors assigned by the color
   scale, together with some tick marks indicating the corresponding
   GPA. (50/100)

3. Add animated transitions between the SATM and SATV
   scores. The animated transition should include an animation of the
   axis marks (10/100)

4. In addition to the transition between SATM and SATV scores that is
   already there, Add a button to switch between the two
   color scales. This button should change the color of the points,
   and the legend (20/100).

Start your assignment by copying
[scatterplot.html](lectures/week5/scatterplot.html),
[scatterplot.js](lectures/week5/scatterplot.js), 
[d3.v3.js](lectures/week5/d3.v3.js), and [calvinCollegeSeniorScores.csv](lectures/week5/calvinCollegeSeniorScores.csv) to an empty directory, and work
from those files. Turn in your edited versions of them using
`turnin`. 

# Extra credit: staggered transitions

For extra credit worth 25% of any future or past assignment: instead
of making a plain transition between SATM and SATV scores, create a
*staggered* transition (see the d3
[wiki](https://github.com/mbostock/d3/wiki/Transitions) for more
details). The first points to move should be the ones with the
smallest GPA; the last points to move should be the ones with the
highest GPA. In addition, the transition between the point positions
should only happen after the axis transition is finished.

Play around with the transition delays and durations until you find
something that looks nice.

# Hints

You have *two weeks* to finish this assignment. The fact that this is
a hint should give you an estimate of the relative difficulty. Plan
accordingly.

The fill color for SVG rectangles, by default, can only be a single
color. For the color legend, you will have to implement a color
gradient by creating many small rectangles, each with a slightly
different color.
