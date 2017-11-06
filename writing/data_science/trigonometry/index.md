---
title: Trigonometry
layout: d3_project
debug: true
---

# Trigonometry

## The Basics

[Just like everyone else on twitter](https://twitter.com/divbyzero/status/927517766369804289),
when I saw this diagram below my reaction was: "why haven't I been
shown this 25 years ago?" The lengths of the lines correspond to the
values of the trigonometric functions. Drag the point to change the
diagram around.

<div id="basic-trig" class="chart-wide"></div>

## Complex exponentials FTW

(This is my favorite trig trick.) Never memorize a formula for sines of sums again. Start from

$$e^{ix} = \cos x + i \sin x$$  
$$e^{-ix} = \cos -x + i \sin -x = \cos x - i \sin x$$

From these two, you get that 

$$\cos x = \frac{e^{ix} + e^{-ix}}{2}$$  
$$\sin x = \frac{e^{ix} - e^{-ix}}{2i}$$

Now expressions like $\sin (a+b)$ are obvious to work out instead of
big and scary. You only need memorize those formulas above, and from
them you can derive many of the annoying high school formulas.

## References

1. [Trigonometry and Complex Exponentials](http://wstein.org/edu/winter06/20b/notes/html/node30.html), William Stein.
