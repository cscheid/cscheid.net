---
layout: post_paper
title: "Drawing Large Graphs by Low-Rank Stress Majorization"
tags: paper
---

Marc Khoury, Yifan Hu, Shankar Krishnan, Carlos Scheidegger. Eurovis 2012, to appear.

  Optimizing a stress model is a natural technique for drawing
  graphs: one seeks an embedding into $R^d$ which best preserves the
  induced graph metric. 
  Current approaches to solving the stress model for a
  graph with $|V|$ nodes and $|E|$ edges require the full all-pairs shortest paths
  (APSP) matrix, which takes
  $O(|V|^2 \log|E| + |V||E|)$ time and $O(|V|^2)$ space.
  We propose a novel algorithm 
  based on a *low-rank* approximation to the required matrices.
  The crux of our technique is an observation that it is possible to
  approximate the *full* APSP matrix, even when only 
  a small subset of its entries are known.
  Our algorithm takes time $O(k |V| + |V| \log |V| + |E|)$ per
  iteration with a preprocessing time of $O(k^3+k(|E|+|V|\log|V|)+k^2
  |V|)$ and memory usage of $O(k|V|)$, where a user-defined parameter $k$
  trades off quality of approximation with running time and space.
  We give experimental results which show, to the best of our
  knowledge, the largest (albeit approximate) full stress model based
  layouts to date.

Get the
[paper
preprint](http://cscheid.net/static/papers/lowrank_stressmajorization_eurovis2012.pdf) as a PDF file (12MB).
