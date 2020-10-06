---
title: Lagrange Polynomials
layout: d3_page
---

# Lagrange Polynomials

Given a set of $n$ points $(x\_i, y\_i)$, we can create a polynomial
$f(x)$ of degree at most $n-1$ such that $f(x\_i) = y\_i$. Although
it's almost always better to do this through plain [linear
regression](linear_regression.html), it's sometimes useful to know
this can be done.

In addition, the trick that we use to generate the polynomial is
useful in other settings, and gives a different perspective on other
data-fitting methods.


## Prologue: Determining roots is easy

If all we wanted was to find a non-trivial polynomial with given
roots, then that would be dead simple. For every value $x\_i$ for
which we wanted the polynomial to be zero, we create a term $(x -
x\_i)$, and then take the product of all of those, since if any of the
terms are zero, the product is zero. 

But for this interpolating polynomial, we don't want the values to be
zero; we want them to be $y\_i$. The Lagrange polynomials are built on
a simple extension of this idea.


## Polynomials are vector spaces, and that's almost all we need

We first think of polynomials as linear combinations of the monomials
$x \mapsto x^k$, and (for example) subsets of those monomials forming
different spaces. But we can take linear combinations of *any* sets of
polynomials to create other vector (sub) spaces. The Lagrange
interpolating polynomial arises directly from coming up with one such basis.

The trick is really super simple, and it's easier to describe what it
does before showing that there is a solution which works. Imagine if
we had polynomials $b\_i$ for each input point $x\_i$, such that
$b\_i(x\_i) = 1$, and if $i \neq j$, $b\_i(x\_j) = 0$. If that were
the case, then we could just use $y\_i$ as the weights for combining
the $b\_i$ polynomials: $f(x) = \sum\_i y\_i b\_i(x)$. At a given
$x\_i$ point, all but $b\_i$ is non-zero, which when multiplied by
$y\_i$ instantly gives $f(x\_i) = y\_i$.

So all that's left is for us to find a way to construct these
polynomials. That turns out not to be too difficult. Let's say we have
three points, $(x\_0 = 1, y\_0 = 3)$, $(x\_1 = 3, y\_1 = 6)$, and
$(x\_2 = 5, y\_2 = 2)$. We need $b_0(1) = 1$, $b_0(3) = 0$, $b_0(5) =
0$.  As we've seen before, it's easy to create a polynomial if all we
need to do is control its roots.  In this case, $\tilde{b}_0(x) = (x -
3)(x - 5)$ guarantees that the polynomial is zero exactly where we
need it to be zero.  Unfortunately, $\tilde{b}_0(1)$ is not equal to
one. But we know it is equal to $(1-3)(1-5)$. So we simply divide
$\tilde{b}_0$ by that, which doesn't change the value at the roots
since they were zero anyway. Do the same thing for $b\_1$ and $b\_2$,
and then add all three of them together, and you get the Lagrange
polynomial.

# Why?

The generalizable principle here is that any time we fit functions to
observations, it's worth it to study the procedure by understanding
what it does to datasets where the function is equal to $1$ at one of
the points equal to $0$ elsewhere.  This *data-dependent basis*
sometimes allows us to better understand the behavior of the procedure
that we used for the fitting.  For example, in this case, we see that
sufficiently far away from the points $x_i$, this function must
oscillate wildly, because each of the $b\_i$ basis functions grows to
infinity by itself. Other methods have different such properties.

For example, one way to think of
[LOWESS](https://en.wikipedia.org/wiki/Local_regression) is that it
forces these basis functions to be zero by multiplying the polynomial
by a function that goes to zero away from the points at a rate faster
than the polynomials grow.

## Demo

That's what you're here for, anyway:

<div id="lagrange-polynomial-div"></div>


