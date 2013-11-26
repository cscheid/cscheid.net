---
layout: post_paper
title: "VisTrails: Enabling Interactive Multiple-View Visualizations"
tags: paper
---

Louis Bavoil, Steven P. Callahan, Patricia
J. Crossno, Juliana Freire, Carlos
Scheidegger, Claudio Silva, Huy Vo. IEEE Vis 2005.

VisTrails is a new system that enables interactive multiple-view
visualizations by simplifying the creation and maintenance of
visualization pipelines, and by optimizing their execution. It
provides a general infrastructure that can be combined with existing
visualization systems and libraries. A key component of VisTrails is
the *visualization trail* (vistrail), a formal specification of
a pipeline. Unlike existing dataflow-based systems, in VisTrails there
is a clear separation between the specification of a pipeline and its
execution instances. This separation enables powerful scripting
capabilities and provides a scalable mechanism for generating a large
number of visualizations. VisTrails also leverages the vistrail
specification to identify and avoid redundant operations. This
optimization is especially useful while exploring multiple
visualizations. When variations of the same pipeline need to be
executed, substantial speedups can be obtained by caching the results
of overlapping subsequences of the pipelines. In this paper, we
describe the design and implementation of VisTrails, and show its
effectiveness in different application scenarios.

Paper in [PDF](http://www.sci.utah.edu/~cscheid/pubs/vistrails-vis2005.pdf)
format (~2.8MB).

For the latest news, visit the [VisTrails
project website](http://www.vistrails.org).

As we started to focus our work on VisTrails around the version tree,
we started to refer to a *vistrail* as the captured exploration
process encoded as the set of visualization pipelines. That's the
terminology we use in later papers, but this Vis 2005 paper uses it to
talk about a visualization specification.
