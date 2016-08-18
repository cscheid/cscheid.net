---
title: Principal Component Analysis
layout: bootstrap_wide
---

# Principal Component Analysis

Some datasets are naturally *redundant*. Loosely speaking, each
element of the set contains "more information than necessary". For
example, imagine that the dataset you're collecting has, in one
column, daily temperatures in degrees Fahrenheit, and in another
column, temperatures in degrees Celsius. In this case, all of the
"signal" in these two columns actually happens in a
*lower-dimensional* portion of the original space. And since we tend
to prefer simpler versions of the dataset, we would like to find out
how to transform the original dataset to a representation with smaller
dimension, but still much (or, in the extreme example above, all) of
the signal. Principal Components Analysis is one the most fundamental
tools to find such transformations.

In order to make things concrete, let's assume that the dataset has
$m$ elements, each containing $n$ attributes, and that we lay these
out in a matrix $X$ that has $m$ rows and $n$ columns: $X \in
R^{m,n}$. 

PCA will return two things that are both useful. First, PCA gives
us back a smaller version of the dataset: instead of having $n$
attributes, we will have $k$ attributes, and we will generally choose
$k$ to be much smaller than $n$. Second, PCA will give us the
transformation that takes the input dataset into the output
dataset. In addition, this transformation is *linear*.

## Two ways to PCA

If you've read about PCA before, you might remember something like "the
principal components are the eigenvectors of the covariance
matrix". This statement is true, but it doesn't actually help you
understand what the PCA is doing. 


### Covariance matrix

Given a matrix $X$ that represents data points like we did above, we
can define the **covariance** matrix


## PCA via the SVD.

## Centering








# Exercises

1. We talked about a *set* of data, but used a *matrix* in our
   computations. Set elements are unordered, but matrix rows have a
   specific order. Show that the PCA of a dataset is independent of
   the choice of ordering of rows in the matrix $X$.
