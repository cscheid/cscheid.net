---
layout: post
title: "The Beauty of Roots, a Facet demo"
---

John Baez over at his
[new
blog Azimuth](http://johncarlosbaez.wordpress.com/2011/12/11/the-beauty-of-roots/) has a post with an amazing looking fractal: the set of
all roots of all polynomials with coefficients -1 or 1. Since it's
``just'' a set of points, it seemed
like the perfect opportunity to try Facet on a large, good-looking dataset, and
[here
is the result](http://cscheid.github.io/lux/demos/beauty_of_roots/beauty_of_roots.html). I think it looks pretty nice. If you want to know more
about the mathematics behind it, read Baez's post. If you care about
the visualization details of this, read on!

The original dataset used by Baez in the pictures is the set of all
roots of polynomials of degree up to 24. That gives about 400 million
points, and at 8 bytes per point, we're talking 3.2GB of data. Not a
good idea :) What I show here are the roots of polynomials of degree
up to 15. It's still fairly large, clocking at almost two million points.
Still, the total amount of data being fetched from the server is only about
15MB. This would be hard to do in anything but WebGL, and would be
painful to write in anything but Facet. 

It's worth mentioning that the whole thing is 180 lines of Javascript,
of which about half is jQuery and GUI-related cruft, and the other
half is Facet. The actual rendering is done in two passes. The first
pass splats additive Gaussian blobs of adjustable size and weight onto
a floating-point texture (so that we don't get too much accumulation
error). The shape of the gaussian blobs is computed in a fragment
shader. Then, we read back the texture and pass it through a simple
tonemapping and colormap on another shader. If you read the
[source](http://cscheid.github.io/lux/demos/beauty_of_roots/beauty_of_roots.js)
however, you'll see that there's no shaders being written anywhere:
they're all synthesized from the Javascript expressions.

The bit that took a lot of ugly parameter hacking was getting a
pleasant tradeoff between a global look of the fractal structure,
while still seeing details when zooming in. A fixed screen-space width
for each blob looks bad (You can't really see the points when deep
zooming, they become too small), but a fixed world-space width for
each blob looks bad too (the blobs never resolve into roots). The
solution is to use, essentially, the geometric mean between those two
sizes. It works well in practice, but I can't really justify it
theoretically.
