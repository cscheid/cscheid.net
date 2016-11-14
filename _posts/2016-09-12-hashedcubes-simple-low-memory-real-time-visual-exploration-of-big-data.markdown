---
layout: post_paper
title: "Hashedcubes: Simple, Low Memory, Real-Time Visual Exploration of Big Data"
tags: paper
---

Cicero A. L. Pahins, Sean A. Stephens, Carlos Scheidegger, Joao
L. D. Comba. IEEE InfoVis 2016.

We propose Hashedcubes, a data structure that enables real-time visual
exploration of large datasets. It improves the state of the art by
virtue of its low memory requirements, low query latencies, and
implementation simplicity. In some instances, Hashedcubes notably
requires two orders of magnitude less space than recent data cube
visualization proposals. In this paper, we describe the algorithms to
build and query Hashedcubes, and how it can drive well-known
interactive visualizations such as binned scatterplots, linked
histograms and heatmaps.

We report memory usage, build time and query latencies for a variety
of synthetic and real-world datasets, and find that although sometimes
Hashedcubes offers slightly slower querying times to the state of the
art, the typical query is answered fast enough to easily sustain a
interaction. In datasets with hundreds of millions of elements, only
about 2% of the queries take longer than 40ms. Finally, we discuss the
limitations of the data structure, potential spacetime tradeoffs, and
future research directions.

Paper in [PDF](/static/papers/infovis_hashed_cubes_2016.pdf) format.
