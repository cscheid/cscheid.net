---
layout: bootstrap
title: "Assignment 8: Treemaps"
---

# Assignment 8

- Posting date: Nov 2nd
- Due date: Nov 9th
- Assignment name for `turnin`: `cs444_assignment_8`


# Description

In this assignment, you will implement a simple version of a
**treemap**. Although d3 offers native support for this kind of
visualization, the goal of this assignment is for you to actually
write the main part of this algorithm. Because of this, for this
assignment, you are **not** allowed to use `d3.layout.treemap`, and
you are not allowed to refer to existing code that will compute the
treemap layout.

Instead, you will build on the skeleton code we provide.

## Skeleton code

* [index.html](assignment_8/index.html).
* [main.js](assignment_8/main.js).
* [flare.js](assignment_8/flare.js).


# Credit

## 1: Write the basic treemapping algorithm as we saw in class: 60 points

If you missed class, the paper is
[here](http://drum.lib.umd.edu/bitstream/handle/1903/367/cs-tr-2645.pdf?sequence=2).

As you'll remember, the basic treemapping algorithm draws a tree by
progressively splitting a rectangle along vertical and horizontal
lines such that the areas of the rectangles correspond to the weights
of the subtrees. Implement the algorithm in its basic form, where the
splits at any level are chosen along alternating directions. Since our
computer screens are usually wider than tall, start by splitting the
first rectangle vertically.

Note that the function `setRectangles` will set the parameter `rect`
to each node in the tree. Your code needs to decide what are the right
values for those rectangles to hold, and then you need to finish the
implementation of `setAttrs`.

## 2: Add margins to each rectangle in order to better depict hierarchy: 20 points

By choosing to add appropriate margins (ie., by shrinking the
rectangles at every level by a small amount), it is possible to better depict
hierarchy than the very basic treemapping technique. Add this feature.

## 3: Add fill color to each rectangle in order to better depict hierarchy: 20 points

By setting the fill color of each rectangle to a color designed to
appropriately depict the depth of each node, it is easier to see the
hierarchy. Add this feature.

## 4: Extra credit: Implement the "best direction" cutting approach: 10 points

The basic treemapping algorithm chooses a fixed direction for every
tree node. This causes relatively uneven shapes, and makes it hard to
read areas. A simple improvement is to have the layout algorithm
choose, at every level, the direction of the cut along the longest
dimension of the rectangle. If the rectangle is tall, we cut it
horizontally. If the rectangle is wide, we cut it into
vertically. Implement this approach. If you do, add 2 extra buttons to
index.html with ids, respectively, `best-size` and `best-count` that
will transition the rectangles to a layout using this approach.

## 5: Extra credit: Implement the squarified treemap approach: 50 points

The basic treemapping algorithm chooses a fixed direction for every
tree node. This causes relatively uneven shapes, and makes it hard to
read areas. The **squarified** treemap, on the other hand, tries to
make nodes that are all very close to being square. The description of
the technique is in
[this paper](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.36.6685&rep=rep1&type=pdf).
(This is relatively challenging!). If you write this version, add 2
extra buttons with ids, respectively, `square-size` and `square-count`
to switch the layouts between the simple layout and the squarified
layout.

## Hints

We are providing a large tree in the `flare.js` file. Although your
final submission should use this data, you should test your code with
much simpler trees first. For this, a good strategy is to first write,
by hand, a very small tree.
