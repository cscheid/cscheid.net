---
layout: post_paper
title: "Edge Transformations for Improving Mesh Quality of Marching Cubes"
tags: paper
---

Carlos A. Dietrich, Carlos Scheidegger, John
Schreiner, Joao L. D. Comba, Luciana Nedel,
Claudio Silva. IEEE TVCG, 15(1):150--159, 2009.

Marching Cubes is a popular choice for isosurface extraction from
regular grids due to its simplicity, robustness, and efficiency. One
of the key shortcomings of this approach is the quality of the
resulting meshes, which tend to have many poorly shaped and degenerate
triangles. 
This issue is often addressed through post processing
operations such as smoothing. Rather than modifying the
resulting mesh, we propose a method to modify the grid on which
Marching Cubes operates. This modification greatly increases the
quality of the extracted mesh. 
Our method incurs minimal computational overhead, can be
readily integrated in existing Marching Cubes implementations, and is
orthogonal to many Marching Cubes enhancements (particularly,
performance enhancements such as out-of-core and acceleration
structures).

Get the [PDF version of the paper](http://www.sci.utah.edu/~cscheid/pubs/macet.pdf) (30MB).

The source code is [also available](http://www.sci.utah.edu/~cscheid/software/macet.tar.gz).
