---
layout: post_paper
title: "Direct (Re)Meshing for Efficient Surface Processing"
tags: paper
---

John Schreiner, Carlos Scheidegger, Shachar
Fleishman, Claudio Silva. Computer Graphics Forum,
25(3):527-536, (Eurographics 2006).

We propose a novel surface remeshing algorithm. While many remeshing
algorithms are based on global parametrization or local mesh
optimization, our algorithm is closely related to surface
reconstruction techniques and it requires no explicit
parameterization. Our approach is based on the advancing-front
paradigm, and it can be used to both incrementally remesh the complete
surface, or simply to remesh a portion of it with a high-quality
mesh. It is accurate, fast, robust, and suitable for use with
interactive mesh processing applications that require local
remeshing. We show a number of applications, including matching the
resolution of meshes when doing Boolean operations such as unions and
intersections. We also show how to adapt the algorithm to blend and
merge mixed-mode objects, and, for example, to compute the union of a
point-set surface and a triangle mesh.

Paper in [PDF](http://www.sci.utah.edu/~cscheid/pubs/eg2006.pdf)
format (~23MB).

The techniques presented in this paper have been implemented in the
open-source [Afront](http://afront.sourceforge.net).
