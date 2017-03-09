---
layout: bootstrap
title: Sample Midterm Questions for CS 665, Spr 2017
---

## Sampling

## Sketching

## Linear Least Squares

1. **Weighted Least Squares**. The standard least squares problems
   attempts to minimize the following error expression: $E = \sum_i
   ||X_i \beta - y_i||^2$. In some cases, however, we know that some
   of the data points are more important (or more accurately
   estimated) than others. In this situation, we want to add per-point
   weights to the error terms, and we want to instead minimize $E =
   \sum_i w_i ||X_i \beta - y_i||^2$, where $w_i$ are non-negative
   weights associated to each data point. Give an expression for the
   solution of the weighted least squares problem, and compare it to
   the solution of the regular least squares problem.

2. **Multidimensional Least Squares**. The standard least squares
   problems attempts to minimize the following error expression: $E =
   \sum_i ||X_i \beta - y_i||^2$.  In some cases, however, the values
   $y_i$ we need to predict are not numbers, but are also themselves
   vectors. Show how to model and solve the regular least-squares
   problem when the $y_i$ prediction vectors are two-dimensional.

3. **Regularized Least Squares with different regularization
   amounts**. The standard regularized least squares
   problems attempts to minimize the following error expression: $E =
   \sum_i ||X_i \beta - y_i||^2 + \lambda || \beta || ^2$. 
   
   1. Give the solution of the regularized least squares problem.
   
   2. Imagine a scenario in which you want to explore the effect of
   many different settings of the regularization parameters. In this
   case, recomputing the solution every time can be costly. Describe
   how you can reuse the results of the SVD that you would have
   computed in the *unregularized* least squares case to get the
   solution of regularized least squares without having to recompute
   an SVD every time you change the parameter $\beta$. Hint: The
   identity matrix $I$ admits any orthogonal matrix as its left and
   right singular vectors (in other words, if $U^T$ is a square
   orthogonal matrix, $U I U^T$ is an SVD of $I$).

## Clustering

1. $k$-means clustering has a free parameter $k$, the number of
   clusters to fit to the data. Why can't we optimize over $k$ to
   choose the value that minimizes the $k$-means error?
   
2. Describe alternative strategies for choosing the value of $k$.

### Extensions to $k$-means clustering

1. **The $k$-means algorithm fits very simple models to its clusters.**
   If the model that you are fitting consists of an intercept term and
   no other terms, (in other words, instead of fitting $a x_i + b =
   y_i$, we do not have $x_i$ terms, and are simply fitting $b =
   y_i$), then what is the solution of this problem in terms of the
   $y_i$ values? Put it differently, show that the $k$-means
   clustering algorithm fits, for every cluster, a very simple model
   to its points, namely one consisting only of intercept terms

2. Describe how to adapt the $k$-means algorithm to compute a
   clustering uses *linear fits* as centroids, instead of
   intercept-only terms. In this setting, your points are values in
   $x$, alongside their predictions in $y$: $(x_i, y_i)$ $(1 \le i \le
   n)$. Your clustering algorithm needs to cluster the points along
   $k$ *lines*, such that each line is described by a pair of parameters
   $a_j, b_j$ ($1 \le j \le k$). Describe the error function and the
   fitting procedure.

