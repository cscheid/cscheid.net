---
layout: post_paper
title: "DimReader: Using auto-differentiation to explain non-linear projections"
tags: paper
---

[Rebecca Faust](https://rjfaust.github.io/), [Carlos Scheidegger](/).

Non-linear dimensionality reduction (NDR) methods such as LLE and
t-SNE are popular with visualization researchers and experienced data
analysts, but present serious problems of interpretation. In this
paper, we present DimReader, a technique that recovers readable axes
from such techniques. DimReader is based on analyzing infinitesimal
perturbations of the dataset with respect to variables of
interest. The recovered axes are in direct analogy with positional
legends of traditional scatterplots, and show how to solve the
computational challenges presented by the generalization to non-linear
methods.

We show how automatic differentiation makes the calculation of such
perturbations efficient and can easily be integrated into programs
written in modern programming languages. We present results of
DimReader on a variety of NDR methods and datasets both synthetic and
real-life, and show how it can be used to compare different NDR
methods and hyperparameter choices. Finally, we discuss limitations of
our proposal and situations where further research is needed.


[pdf](/static/papers/arxiv_dimreader_2017.pdf), [arxiv](https://arxiv.org/abs/1710.00992).
