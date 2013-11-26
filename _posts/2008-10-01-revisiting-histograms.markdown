---
layout: post_paper
title: "Revisiting Histograms and Isosurface Statistics"
tags: paper
---

Carlos Scheidegger, John Schreiner, Brian Duffy,
Hamish Carr, Claudio Silva. IEEE TVCG, 14(6):1659-1666, 2008. (Vis 2008)

Recent results have shown a link between geometric properties of
isosurfaces and statistical properties of the underlying sampled
data. However, this has two defects: not all of the properties
described converge to the same solution, and the statistics computed
are not always invariant under isosurface-preserving
transformations. We apply Federer's Coarea Formula from geometric
measure theory to explain these discrepancies. We describe an improved
substitute for histograms based on weighting with the inverse gradient
magnitude, develop a statistical model that is invariant under
isosurface-preserving transformations, and argue that this provides a
consistent method for algorithm evaluation across multiple datasets
based on histogram equalization. We use our corrected formulation to
reevaluate recent results on average isosurface complexity, and show
evidence that noise is one cause of the discrepancy between the
expected figure and the observed one. 

Get the
[paper](http://www.sci.utah.edu/~cscheid/vis2008/histograms/paper.pdf)
in PDF format (7MB).

## Dataset

We are publishing the
[set
of volumes](http://www.sci.utah.edu/~cscheid/vis2008/histograms/volumes.tar.gz) we collected to compute the histograms and isosurface
statistics. Note that this is a fairly large dataset (~1GB).  The
files are in [NRRD
format](http://teem.sourceforge.net/nrrd/index.html). We have tried to give attribution to the people who
originally made the data available in the NRRD header, as a
comment. We couldn't find the authors for a few of those files, so if
you see your file here and it is incorrectly attributed, do not
hesitate to let [me](mailto:cscheid@research.att.com) know.
