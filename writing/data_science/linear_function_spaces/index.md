---
title: Linear function spaces
layout: lux_project
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.min.js"></script>

# Linear function spaces

In data visualization (and more generally, in the subfields of data
analysis that tend to care about spatial data), we often want to
use computers to store, manipulate, and represent
_functions_. Consider, for example, a map of surface temperature over
a region. For any point in the region, we can in principle read off
the temperature. There are, then, infinitely many points (uncountably
many, in fact). This presents a challenge for representing these
functions as arrays of data in a computer. At the same time, we know
it's possible to write computer procedures that produce answers
for an infinity of possible inputs:

    def f(x):
        return x * x

    def g(x):
        if x <= -1/2: return 0
        if x >= 1/2: return 0
        return 1

Functions like `f` and `g` are easy to write, but we want to avoid
having to write new functions for every new data observation that we
have. Consider the difference between a temperature map in the summer
and one in the winter. Ideally, we would not have to change the way we
write our functions very much to switch from a representation of the
summer map to the winter map.

Our solution is to define a _space_ of possible functions that is
created by linear combinations of simpler functions. Of course, you've
seen this kind of thing before. The space of all linear functions on
the reals $R \to R$ can be created by giving different $a$ and $b$
values to `line`:

## Basic Example

    def constant(x):
        return 1

    def line(x):
        return x

    def line(a, b):
        def f(x):
            return a * constant(x) + b * line(x)
        return f

    # line(1, 3)(5) == 16
    
<div id="linear-functions" class="chart">
</div>

Each different function in this space, then, is completely
characterized by the array of weights we use, making the space very
convenient for storage and representation on computers.

## Polynomials are not great for this job

One standard way of creating new functions (so that our basis gets richer and
we can create more interesting linear function spaces) is to take
powers of existing functions. For example, taking linear combinations of non-negative powers of the
identity function yields the space of all polynomials. This is a very
rich space, but is [not very good for approximation when you have
equally-spaced values](https://en.wikipedia.org/wiki/Runge%27s_phenomenon). 
Let's see what happens when we try to approximate the Runge function,
$f(x) = 1 / (1 + 25x^2)$, using progressively larger-degree
polynomials (depicted by darker, thicker lines), such that your polynomial always matches the values of
the function that you have observed:

<div id="runge-phenomenon" class="chart"></div>

As you can see, the higher-degree polynomial fits match the sampled
data at more points, but they start to "wiggle" more, such that in
between the observed points, the values oscillate wildly.

## Shifted Versions of the same function

Instead, we'll build our space by taking simple functions that have
finite support, and shifting them around:

    def square(x):
        if x <= -1/2: return 0
        if x >= 1/2: return 0
        return 1

    def shifted_square(i):
        def f(x):
            return shifted_square(x - i)
        return f

<div id="square-functions" class="chart"></div>

Now linear function spaces of (progressively more) shifted squares
do something more interesting:

<div id="square-runge" class="chart"></div>

When we try to approximate the same function as before, the sampled
values (and the rectangles) track the function progressively better
and better, and the approximation function does not oscillate.
Of course, we lost something in this exchange. The polynomial fits
we obtained were smooth: this means that we had access to
function derivatives, which are useful in a variety of settings. The
function fits we got aren't even continuous; that's not ideal.

Fortunately, this is a situation which we can easily fix by
creating better "simple functions". Also, from now on, we will call these
simple functions *reconstruction kernels*, or *kernels* for short.
(Notice that the term kernel is used in statistics to denote a
completely different notion. The confusion is most often avoided by
noticing that reconstruction kernels take a single parameter while
similarity kernels from statistics are always two-parameter functions
that compare values.)

## B-Spline kernels

    def b0(x):
        if x <= -1/2: return 0
        if x >= 1/2: return 0
        return 1
    def b1(x):
        if x <= -1: return 0
        if x <= 0:  return 1+x
        if x <= 1:  return 1-x
        return 0
    def b2(x):
        # ...

So, how do we create function spaces that aren't prone to oscillation,
but allow smooth functions? We use kernels that are themselves
continuous, or smooth. In the examples below, we are creating
functions by giving weights $[0.4, 0.3, 0.5, 0.7, 0.6]$ to each of the
basis functions in order. Because the basis functions are different,
the reconstructed function is itself different.

### B-Spline of order 0

<div id="bspline-0" class="chart"></div>

### Linear (order-1) B-Spline

<div id="bspline-1" class="chart"></div>

### Quadratic (order-2) B-Spline

<div id="bspline-2" class="chart"></div>

As the basis functions get smoother, so do the reconstructions. This
happens because of a trivial, but very important property of linear
function spaces: since these are linear spaces, function operations
that are themselves linear will factor through to the basis
functions. For example, the derivative is a linear operator. As a result, the
derivative of a function from a linear function space is necessarily a
member of a *different* linear function space, whose basis vectors are
the derivatives of the basis vectors of the original function space:

$$d/dx \left ( \sum_i c_i \phi_i(x) \right ) = \sum_i c_i \left (\frac{d \phi(x)}{dx} \right)$$

The same thing happens for integrals, expectations, etc. This makes
linear function spaces very computationally convenient.

## Multi-dimensional linear function spaces

So far, we've seen function spaces whose domain are the real numbers
(a one-dimensional space). It is very straightforward to extend the
notion to multidimensional functions.

### Separable linear function spaces

(to be finished.)
