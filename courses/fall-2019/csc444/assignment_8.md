---
layout: bootstrap
title: "Assignment 8: Treemaps"
---

# Assignment 8

- Posting date: Nov 12th 2019
- Due date: Nov 19th 2019 23:59PM MST
- GitHub classroom link: [Assignment 8](https://classroom.github.com/a/Bv_RtsN-)

# Description

In this assignment, you will implement a simple version of a
**treemap**. Although d3 offers native support for this kind of
visualization, the goal of this assignment is for you to actually
write the main part of this algorithm. Because of this, for this
assignment, you are **not** allowed to use `d3.layout.treemap`, and
you are not allowed to refer to existing code that will compute the
treemap layout.

Instead, you will build on the skeleton code we provide.

Note: the scores of this assignment go up to 150. If you score more
than 100 points, the additional points will count as additional credit
towards your grade.

## Skeleton code

* [index.html](assignment_8/extra-files/index.html).
* [main.js](assignment_8/extra-files/main.js).
* [flare.js](assignment_8/extra-files/flare.js).

### Simple test cases

You should use the values from the following file as simpler test
cases to test your implementation. You should also consider creating
additional files on your own to test your code.

* [test-cases.js](assignment_8/extra-files/test-cases.js).

# Credit

## 1: Write the basic treemapping algorithm as we saw in class: 50 points

If you missed class, the paper is
[here](http://drum.lib.umd.edu/bitstream/handle/1903/367/cs-tr-2645.pdf?sequence=2).

As you'll remember, the basic treemapping heuristic draws a tree by
progressively splitting a rectangle along vertical and horizontal
lines such that the areas of the rectangles correspond to the weights
of the subtrees. Implement the heuristic in its basic form, where the
splits at any level are chosen along alternating directions. Since our
computer screens are usually wider than tall, start by splitting the
first rectangle vertically.

Note that the function `setRectangles` will set the parameter `rect`
to each node in the tree. Your code needs to decide what are the right
values for those rectangles to hold, and then you need to finish the
implementation of `setAttrs`.

## 2: Add margins to each rectangle in order to better depict hierarchy: 15 points

By choosing to add appropriate margins (ie., by shrinking the
rectangles at every level by a small amount), it is possible to better depict
hierarchy than the very basic treemapping technique. Add this feature.

## 3: Add fill color to each rectangle in order to better depict hierarchy: 15 points

By setting the fill color of each rectangle to a color designed to
appropriately depict the depth of each node, it is easier to see the
hierarchy. Add this feature.

## 4: Implement the "best direction" cutting approach: 20 points

The basic treemapping algorithm chooses a fixed direction for every
tree node. This causes relatively uneven shapes, and makes it hard to
read areas. A simple improvement is to have the layout algorithm
choose, at every level, the direction of the cut along the longest
dimension of the rectangle. If the rectangle is tall, we cut it
horizontally. If the rectangle is wide, we cut it
vertically. Implement this approach, and add 2 buttons to
index.html with ids, respectively, `best-size` and `best-count` that
will transition the rectangles to a layout using this approach.

## 5: Implement the squarified treemap approach: 50 points

The basic treemapping algorithm chooses a fixed direction for every
tree node. This causes relatively uneven shapes, and makes it hard to
read areas. The **squarified** treemap, on the other hand, tries to
make nodes that are all very close to being square. The description of
the technique is in
[this paper](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.36.6685&rep=rep1&type=pdf).
(This is relatively challenging!). For this version, add 2
buttons with ids, respectively, `square-size` and `square-count`
to switch the layouts to the squarified
size layout and squarified count layout.
