---
layout: post_paper
title: "Triangulating Point-Set Surfaces with Bounded Error"
tags: paper
---

Carlos Scheidegger, Shachar Fleishman, Claudio
T. Silva. SGP 2005.

We introduce an algorithm for constructing a high-quality
triangulation directly from Point Set Surfaces. Our algorithm requires
no intermediate representation and no post-processing of the output,
and naturally handles noisy input data, typically in the form of a set
of registered range scans. It creates a triangulation where triangle
size respects the geometry of the surface rather than the sampling
density of the range scans. Our technique does not require normal
information, but still produces a consistent orientation of the
triangles, assuming the sampled surface is an orientable
two-manifold. Our work is based on using Moving Least-Squares (MLS)
surfaces as the underlying representation. Our technique is a novel
advancing front algorithm, that bounds the Hausdorff distance to
within a user-specified limit. Specifically, we introduce a way of
augmenting advancing front algorithms with global information, so that
triangle size adapts gracefully even when there are large changes in
surface curvature. Our results show that our technique generates
high-quality triangulations where other techniques fail to reconstruct
the correct surface due to irregular sampling on the point cloud,
noise, registration artifacts, and underlying geometric features, such
as regions with high curvature gradients.

Paper in [PDF](http://www.sci.utah.edu/~cscheid/pubs/tpss.pdf)
format (~9MB).
