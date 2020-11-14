---
layout: bootstrap
title: "Assignment 3: Your first real SVG visualization"
---

# Assignment 3

- Posting date: 2019-09-10
- Due date: 2019-09-17 11:59PM MST.
- Github Classroom: [link](https://classroom.github.com/a/173DEgxO)

# Description

In this assignment, you will use the SVG creation functions we
developed in the previous lecture to design a simple visualization for a dataset.

You will submit an HTML file named `index.html`, together with any
other files you choose to create and reference. Each visualization
should be an SVG element of 500 pixels in both width and height. The
`id` of the element containing the first visualization should be
"scatterplot_1", the `id` of the element containing the second
visualizations should be "scatterplot_2", the `id` of the element and so on.

**IMPORTANT NOTE**. For this assignment, you are NOT allowed to use any source
code other than the files we provide in links from this document. **Do
not** use d3 or other helper libraries.


## Provided source code

You can use the Javascript functions in the
`svg.js` source file included in the starter repo. These are the functions we
developed in class to create SVG elements, together with a helper
function for you to create RGB triplets (in order to give your
visualization data-driven colors)


## Dataset: ACT, GPA, SAT, oh my

This dataset ([ref](http://www.calvin.edu/~stob/data/)) contains
standardized scores for all Calvin College 2004 seniors that have
taken both the ACT and the SAT, together with their GPAs. There are
271 data points and 4 dimensions.

For your convenience, I have processed the original csv file into a
Javascript source file included in the starter repo.
The dataset looks like this:

    var scores = [
     { SATM:430, SATV:470, ACT:15, GPA: 2.239 },
     { SATM:560, SATV:350, ACT:16, GPA: 2.488 },
     { SATM:400, SATV:330, ACT:17, GPA: 2.982 },
     { SATM:410, SATV:450, ACT:17, GPA: 2.155 },
    ... 263 more rows ...
     { SATM:700, SATV:680, ACT:35, GPA: 3.911 },
     { SATM:720, SATV:770, ACT:35, GPA: 3.981 },
     { SATM:750, SATV:730, ACT:35, GPA: 3.882 },
     { SATM:790, SATV:780, ACT:35, GPA: 3.887 }
    ];

## Visualization 1 (50% credit)

Create a [scatterplot](http://en.wikipedia.org/wiki/Scatter_plot) of circles, showing
SAT's mathematics scores (`SATM` column) versus SAT's verbal scores
(`SATV` column). In other words, the x coordinate of the plot should encode
the `SATM` variable, and the y coordinate should encode `SATV`. Use
the radius of the circles to represent ACT scores, and color to
represent the GPA scores.

## Visualization 2 (25% credit)

Create a different scatterplot, now showing the relationship between:

* ACT scores (`ACT` column) on the x axis, 
* GPA scores (`GPA` column) on the y axes,
* the radius of the circles to represent `SATM` scores, and
* color to represent `SATV`.

## Visualization 3 (25% credit)

Create yet another scatterplot:

* the sum of the SAT scores on the x axis,
* GPA on the y axis,
* color to represent ACT

## Extra credit: improve and justify visualization 2 (+10% of total assignment)

Think about the above specifications for the visualizations: is it the
best way to portray the interesting features of the data? (Answer:
It's fine, but not ideal.)

Your goal for the final visualization is to improve on Visualization
2.  We have not discussed perceptual principles in class yet, so you
do not need to give serious justifications for your choices. Still,
this is a chance for you to explore different variants: try your best to justify
your decisions.

Together with the improved visualization, submit no more than two
paragraphs of text describing your changes and reasoning. This text
can be embedded in the submitted HTML. For this improved
visualization, you should use an element with `id` attribute equal to
`scatterplot_2b`.

Hints:

- How helpful is the combination of the circle radius with circle
color? It might help to remember the discussion we had in class about
[preattentive processing](http://www.csc.ncsu.edu/faculty/healey/PP/).

- Visualization 2 suffers from some amount of overplotting. How would
you solve it? (*Overplotting* is what happens when the second shape
your draw goes entirely over the first shape. As a result, you cannot
tell if the first point was there to begin with, or, more generally,
how many points are "hiding")

## Extra credit: axis annotations (+40%)

(Yes, if you get full extra credit, you will get half of any future
assignment worth of points.)

Add axis lines, labels and tick marks to the X and Y axes of your
visualizations. In other words, to get this extra credit, instead of
looking like this:

![old faithful data without labels](assignment_3/geyser_no_labels.png)

your plots should look like this:

![old faithful data with labels](assignment_3/geyser_labels.png)

(Of course, the dataset I just used in the example above is not the
same as the one you have, so the values for the tick marks, labels,
etc. will all be different).

Some things you will need to consider:

* margins for your axes, tick marks, and axis labels
* try to pick good values for the tick marks, and a good number of
  them: not too many, and not too few.

Just like with the other portions of this assignment, you are _not_
allowed to use or consult other Javascript libraries. 
