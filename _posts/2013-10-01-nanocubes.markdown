---
layout: post_paper
title: "Nanocubes for Real-Time Exploration of Spatiotemporal Datasets"
tags: paper
venue: VIS
---

Lauro Lins, Carlos Scheidegger, Jim Klosowski. IEEE TVCG 2013
(Proceedings of VIS 2013). *Nominated for best paper award*.

Consider real-time exploration of large multidimensional
spatiotemporal datasets with billions of entries, each deﬁned by a
location, a time, and other attributes. Are certain attributes
correlated spatially or temporally? Are there trends or outliers in
the data? Answering these questions requires aggregation over
arbitrary regions of the domain and attributes of the data. Data cubes
are a well-known aggregation operation in relational databases. In a
sense, they precompute every possible aggregate query over the
database. Data cubes are sometimes assumed to take a prohibitively
large amount of space, and to consequently require disk storage. In
contrast, we show how to construct a data cube that ﬁts in a modern
laptop's main memory, even for billions of entries; we call this data
structure a nanocube. We present algorithms to compute and query a
nanocube, and show how it can be used to generate well-known visual
encodings such as heatmaps, histograms, and parallel coordinate
plots. When compared to exact visualizations created by scanning an
entire dataset, nanocube plots have bounded screen error across a
variety of scales, thanks to a hierarchical structure in space and
time. We demonstrate the effectiveness of our technique on a variety
of real-world datasets, and present memory, timing, and network
bandwidth measurements. We ﬁnd that the timings for the queries in our
examples are dominated by network and user-interaction latencies.

Get the
[paper](https://cscheid.net/static/papers/nanocubes.pdf)
and visit the [website](http://nanocubes.net) for [live](http://nanocubes.net/view.html#twitter) [demos](http://nanocubes.net/view.html#brightkite).
