---
layout: post_paper
title: "Verifying Volume Rendering Using Discretization Error Analysis"
tags: paper
---

Tiago Etiene, Daniel Jonsson, Timo Ropinski, Carlos Scheidegger, Joao
Comba, L. Gustavo Nonato, Robert M. Kirby, Anders Ynnerman, Claudio
T. Silva. IEEE TVCG, Accepted, 2013.

We propose an approach for verification of volume rendering correctness based on an analysis of the volume rendering integral, the basis of most DVR algorithms. With respect to the most common discretization of this continuous model (Riemann summation), we make assumptions about the impact of parameter changes on the rendered results and derive convergence curves describing the expected behavior. Specifically, we progressively refine the number of samples along the ray, the grid size, and the pixel size, and evaluate how the errors observed during refinement compare against the expected approximation errors. We derive the theoretical foundations of our verification approach, explain how to realize it in practice and discuss its limitations. We also report the errors identified by our approach when applied to two publicly-available volume rendering packages.

Get the [paper
preprint](http://www.sci.utah.edu/publications/SCITechReports/UUSCI-2013-001.pdf),
and try your hand at the [interactive volume-rendering verifier](http://www.sci.utah.edu/~etiene/slides/ieee_VIS_2013/demo.html)!.
