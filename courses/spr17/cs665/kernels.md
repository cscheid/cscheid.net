---
layout: bootstrap
title: Kernels
---

# Kernels

Can we do data science without knowing the coordinates of input
points? What if we only have distances, or similarities?

### From distances to similarities (to coordinates, and then not)

* Classical MDS, the trick to recover coordinates from either
  distances or similarities.

* What if we can't exactly recover coordinates? Can we do anything
  directly from similarities? Shockingly, yes.

## Kernels are "non-linear dot products"

* Solving linear regression takes the smallest of $n \times n$ or $m
  \times m$, where there are $n$ data points representable in $m$
  dimensions.  This works even when $m = \infty$!
