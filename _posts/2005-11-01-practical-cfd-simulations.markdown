---
layout: post_paper
tags: paper
title: "Practical CFD Simulations on Programmable Graphics Hardware using SMAC"
---

Carlos Scheidegger, Joao L. D. Comba, Rudnei D. da
Cunha. Computer Graphics Forum, 24(4):715--728, 2005.

We show how to harness the computational power of GPUs and
solve the incompressible Navier-Stokes fluid equations significantly
faster (more than one order of magnitude in average) than on CPU
solvers of comparable cost. 

The explosive growth in integration technology and the parallel nature
of rasterization-based graphics APIs changed the panorama of
consumer-level graphics: today, GPUs are cheap, fast and
ubiquitous. We show how to harness the computational power of GPUs and
solve the incompressible Navier-Stokes fluid equations significantly
faster (more than one order of magnitude in average) than on CPU
solvers of comparable cost. While past approaches typically used
Stam's implicit solver, we use a variation of SMAC (Simplified Marker
and Cell). SMAC is widely used in engineering applications, where
experimental reproducibility is essential. Thus, we show that the GPU
is a viable and affordable processor for scientific applications. Our
solver works with general rectangular domains (possibly with
obstacles), implements a variety of boundary conditions and
incorporates energy transport through the traditional Boussinesq
approximation. Finally, we discuss the implications of our solver in
light of future GPU features, and possible extensions such as
three-dimensional domains and free-boundary problems.

Paper in [PDF](http://www.sci.utah.edu/~cscheid/pubs/smac-cgf.pdf)
format (~2.4MB).

A companion page with the source code is available [here](https://cscheid.net/old/smac/).
