---
title: Direct Volume Rendering
layout: d3_project
debug: true
---

# Basics of direct volume rendering

The simplest way to visualize 3D volumetric data is through
drawing isosurfaces, the 2D analogs of isocontours. There are
a number of techniques for extracting such isosurfaces, but they have
a number of limitations. (TBF.)

Instead, a simpler approach is to generate an image directly from the
volumetric data without resorting to an intermediate
representation. That's called **Direct Volume Rendering** (often just
called "volume rendering"), and this piece is an introduction to the
most basic form of the technique, namely ray-casting.

## Volume rendering in flatland

It's easier to illustrate ray-casting by doing it in two
dimensions. Let's imagine we lived in flatland, and we wanted to look
at an x-ray of some object. In our world, an x-ray is a 2-dimensional
representation of a 3D volume (a 2d picture of a broken foot). But in
flatland, the object exists in two dimensions, and so our x-ray of it
would be one dimensional:

<div id="flatland-mip1"></div>

The vertical green bar is our "image plane" where we will make our
image. Each "pixel" there will be created by somehow combining all of
the values along the specific ray that cross the image plane from the
eye, in that direction. In the example above, we are using
[Maximum intensity projection](https://en.wikipedia.org/wiki/Maximum_intensity_projection):
the value at each pixel is the maximum value of the volume along the
ray. A different object would give a different image:

<div id="flatland-mip2"></div>

## Picking and choosing parts of the volume we are interested in

Notice that each ray along the volume can be seen as an entire
function in itself, for which we're summarizing the value as the
intensity of a pixel.  Maximum intensity projection is a fine (if very
simple) form of volume rendering, but it barely scratches the surface
of what's possible. Another similar approach is to take the
**integral** of the function value along the ray (this produces
something similar to an average value, if all rays are about the same
length).

But what if, for example, we were interested in specific scalar values
of the volume? Consider, for example, doctors trying to visualize
tissue that happens to have a very specific density (like bone). In
that case, we want to summarize the ray value as "yes, this ray has
seen a value close to bone" or "no, no values along this ray are close
to bone".

A very common strategy is to have the ray sample not the volume
itself, but the result of applying a transformation to the value along
the volume. This transformation is known in volume rendering as a
**transfer function**. The transfer function we are using is depicted
in the bottom-left corner: it's just a gaussian bump, whose effect is
to "select" values that are close to the peak of the gaussian.
Hover over the transfer function to interact. (The blue curve is
the histogram of scalar values in the volume. The histogram,
and other functions like it, tend to be informative of what's
in the volume, and so it's a good idea to show it)

<div id="flatland-mip3" style="position: relative"><div id="flatland-mip3-tf" style="position:absolute; left:10px; bottom: 10px"></div></div>

## Let's add some color

So far, we're accumulating a **value** along the ray, and then
deciding on the color of the pixel given the value. But we can instead
decide on a color for every value of the volume (say, white-ish for
bone, red-ish for muscle tissue, and a skin tone for skin tissue), and
then collect the different colors along the ray, and combining all
of them in some way in the end. 

In the same way that we used a transfer function to pick a region of interest
in the example above, we can create a transfer function for colors. In addition,
we can create another transfer function for "weight". That is, we can make
some parts of the volume have very low weight, so that when we're accumulating
the values along the ray, we can weigh them differently.

<div id="flatland-xray1" style="position: relative"><div id="flatland-xray1-tf" style="position:absolute; left:10px; bottom: 10px"></div></div>

This is known as the "emission-only" model: we assume that the object
is made of tiny little particles of emitting light, and that the
contribution of each of them is independent of the other. In this simple example,
we also fixed the color transfer function. Good interactive tools for
volume visualization will let the user choose the colors for each scalar
value.

## MIP and emission-only are order independent, but what's in front of what?

Sometimes we need to be able to distinguish between the **order** in
which two different volume features appear along the ray. Using averages
like above will mean that we can never know what portion of the object
is in front of what other portion, since addition is commutative (and so
swapping around parts of the ray won't change the final result).

Notice that even though the bump on the left of the volume is "in
front" of the bump on the right, it's hard to create a
rendering without any orange in it. This happens because the portions
of the volume that are mapped to orange overwhelm the small amount
of blue.

<div id="flatland-xray2" style="position: relative"><div id="flatland-xray2-tf" style="position:absolute; left:10px; bottom: 10px"></div></div>

The solution to this problem is to change the way we aggregate the
samples along the ray. Instead of combining them purely additively, we
will allow samples to generate light, but also to occlude one
another. In this section, we follow [Nelson Max's exposition](#max).

Imagine that each ray intersects a small cylindrical region of the
volume. If we split the ray along the samples, each sample corresponds
to a circular slab of the volume. Now, instead of thinking of the
volume as a continuous entity, we will think of it as a large number
of very small spherical particles which emit light, but also occlude
particles behind it: the *number* of particles on each slab will be
proportional to the weight of that portion of the volume (given by the
weight transfer function).  Now take the number of samples along the
ray to be high enough that particles within a slab don't occlude one
another. Then, the cross-sectional area that is occluded by each slab is
proportional to the number of dots in the area. This is the **absorption-emission** model.

Let's zoom in on one ray (move the transfer function above to change
the ray below):

<div id="flatland-absorption-emission-one-ray"></div>

Refer to [Max](#max) for the actual integral that characterizes this
model. Here, we give an algorithm for computing it numerically, since the
algorithm is itself easier to understand given the intuition above. 
The simplest algorithm proceeds **back-to-front**:

    result = rgba(0,0,0,0)
    for slab in n_slabs-1..0:
        slab_color = color(slab)   # assumes alpha = 1
        slab_weight = weight(slab) # assumes weight is < 1
        result = slab_weight * slab_color + (1 - slab_weight) * result
    return result

The resulting volume rendering is here:

<div id="flatland-emission-absorption" style="position: relative"><div id="flatland-xray2-tf" style="position:absolute; left:10px; bottom: 10px"></div></div>

## Know more

Did you notice how the histogram for the two-bump volume is not
particularly helpful? That happens because of areas with low gradient
magnitude. TBF but if you're interested, go read
[The Contour Spectrum](#contour-spectrum) and
[Semi-automatic...](#kd).

### Illumination: let there be light

TBF. This is hard to show in 1D pictures.

### Multidimensional transfer functions

TBF. Gradients, Curvatures, etc.

# References

1) <a name="max">Nelson Max</a>, [Optical Models for Direct Volume Rendering](http://ieeexplore.ieee.org/document/468400/). IEEE TVCG, 1995. A classic.
2) <a name="contour-spectrum">Bajaj et al.</a>, [The Contour Spectrum](http://www.pascucci.org/pdf-papers/spectrum.pdf). 
3) <a name="kd">Kindlmann and Durkin</a>,
  [Semi-automatic generation of transfer functions for direct volume rendering](https://dl.acm.org/citation.cfm?id=288167). VolVis 1998. How to
  detect boundaries across materials in volume data and create appropriate transfer functions.
4) Kindlmann et. al,
  [Curvature-Based Transfer Functions for Direct Volume Rendering: Methods and Applications](http://www.cs.utah.edu/~gk/papers/vis03/). The
  clearest derivation of principal curvatures for isosurfaces of
  volumetric data is here.


