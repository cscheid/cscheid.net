---
layout: post_paper
title: "Gaussian Cubes: Real-Time Modeling for Visual Exploration of Large Multidimensional Datasets"
tags: paper
---

Zhe Wang, Nivan Ferreira, Youhao Wei, Aarthy Bhaskar, Carlos Scheidegger. IEEE InfoVis 2016

Recently proposed techniques have finally made it possible for
analysts to interactively explore very large datasets in real
time. However powerful, the class of analyses these systems enable is
somewhat limited: specifically, one can only quickly obtain plots such
as histograms and heatmaps. In this paper, we contribute Gaussian
Cubes, which significantly improves on state-of-the-art systems by
providing interactive modeling capabilities, which include but are not
limited to linear least squares and principal components analysis
(PCA).

The fundamental insight in Gaussian Cubes is that instead of
precomputing counts of many data subsets (as state-of-the-art systems
do), Gaussian Cubes precomputes the best multivariate Gaussian for the
respective data subsets. As an example, Gaussian Cubes can fit
hundreds of models over millions of data points in well under a
second, enabling novel types of visual exploration of such large
datasets.

We present three case studies that highlight the
visualization and analysis capabilities in Gaussian Cubes, using
earthquake safety simulations, astronomical catalogs, and
transportation statistics. The dataset sizes range around one hundred
million elements and 5 to 10 dimensions. We present extensive
performance results, a discussion of the limitations in Gaussian
Cubes, and future research directions.

Paper in [PDF](/static/papers/infovis_gaussian_cubes_2016.pdf) format
