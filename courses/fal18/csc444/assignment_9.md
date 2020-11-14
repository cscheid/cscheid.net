---
layout: bootstrap
title: "Assignment 9: 2D Scalar Field Visualization"
---

# Assignment 9

- Posting date: Nov 15th
- Due date: Dec 5th 11:59PM
- GitHub classroom link: [Assignment 9](https://classroom.github.com/a/nZ7noq6e)

## Early submission credit

If you choose to submit the assignments early, you will be given extra
credit at the rate of 1% extra credit per day of early submission.


# Description

In this assignment, you will implement **Marching Squares**, one
algorithm for generating contours of a 2D scalar field.  We will use
the same data as in [assignment 6](assignment_6.html), the dataset
with temperature and pressure measurements for a simulation of
Hurricane Isabel. As usual, you will build on skeleton code we
provide.

# Data

The data is provided in two arrays: `temperatureCells` and
`pressureCells`. Each array contains objects that look like this:

    {
        NW: value-at-nw-corner,
        NE: value-at-ne-corner,
        SW: value-at-sw-corner,
        SE: value-at-se-corner,
        Row: i,
        Col: j
    }

## Part 1: Implement the computation of outlines contours (50 points)

Implement the computation of **outline contours** using marching squares
by filling out the skeleton code, specifically the function
`generateOutlineContour`. As in assignment 4, each square is 10x10
pixels.

The solution will look like this:

![contour outlines](assignment_9/outline_contours.png)

## Part 2: Implement the computation of filled contours (50 points)

Implement the computation of **filled contours** using marching
squares by filling out the skeleton code, specifically the functions
`generateFilledContour` and `includesFilledContour`. As in assignment
4, each square is 10x10 pixels.

The solution will look somewhat like this:

![filled contours](assignment_9/filled_contours.png)

# Files

- [main.js](assignment_9/main.js) is the skeleton you will build on
  (implement the functions commented with "write this"),
- [index.html](assignment_9/index.html) has the HTML you'll need, and
- [data.js](assignment_9/data.js) has the data you will use. **Note
  that this is a different file from assignment 4, because
  the data is structured differently**.

## Hints

- The way the skeleton code is set up, the path for each separate
square can be specified in a "local" coordinate system (use your web
browser's debugger to inspect the DOM after executing the skeleton
code and pay attention to the "transform" nodes in each of the `g`
elements). In other words, you do not have to write code to decide on
what position along the SVG each square should be drawn.

- Before writing the full marching squares code, make sure you
  understand enough of what's going on in the code. A good way to
  start is to write code that adds a fixed, small shape inside of each
  square.
