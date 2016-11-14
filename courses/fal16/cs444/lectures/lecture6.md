---
layout: bootstrap
title: Lecture 6, D3 joins, scales
---

# Lecture 6: d3 joins and scales

In this lecture we will see two important parts of d3. The first part
is central to how d3 works: it's the notion of a **join**. In fact, we
already used joins in the last lecture, but today we will
spend a long time making sure we understand what is going on with
those `selectAll().data().enter().append()` calls.

The second part is a set of helper libraries to make your function
accessors cleaner and more modular. These are D3 **scales**. They are
used extensively inside d3, and so you need to understand how they
work, but they are also tremendously convenient to create data
visualizations.


# D3 joins

* Why we need the `selectAll().data().enter()` pattern
* There's an `exit()` method, too!
* **keys** for data joins

## Reading Material

Basics:

* Mike Bostock's [Three Little Circles](https://bost.ocks.org/mike/circles/)
  * Specifically for keys in joins: [Object Constancy](https://bost.ocks.org/mike/constancy/)
* Mike Bostock's
  [Thinking with joins](https://bost.ocks.org/mike/join/).
* Scott Murray's
  ["Data" Section from Chapter 5 of his book](http://chimera.labs.oreilly.com/books/1230000000345/ch05.html#_data).

In-depth (optional, but recommended read):

* Mike Bostock's
  [How Selections Work](https://bost.ocks.org/mike/selection/)

# D3 scales

* Linear scales
  * What do they do
  * More than numbers
  * You could have invented them
* Log scales
  * and others
* Interpolators

## Reading material

* d3 v4
  [API reference](https://github.com/d3/d3/blob/master/API.md#scales-d3-scale).
* Chapter 7 from [Scott Murray's book](http://chimera.labs.oreilly.com/books/1230000000345/ch07.html)
