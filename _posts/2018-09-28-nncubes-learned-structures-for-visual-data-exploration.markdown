---
layout: post_paper
title: "NNCubes: Learned Structures for Visual Data Exploration"
venue: arxiv
tags: paper
thumb: 2018-arxiv-nncubes
paper_link: /static/papers/arxiv_nncubes_2018.pdf
---

[Zhe Wang](https://www.z-wang.com), Dylan Cashman, Mingwei Li, Jixian Li, Matthew Berger, Joshua A. Levine, Remco Chang, and [Carlos Scheidegger](/). 

Visual exploration of large multidimensional datasets has seen
tremendous progress in recent years, allowing users to express rich
data queries that produce informative visual summaries, all in real
time. However, a limitation with current techniques is their lack of
guidance. Exploration in existing methods is typically driven by data
aggregation queries, but these are unable to suggest interesting
aggregations and are limited in helping the user understand the types
of queries that lead to certain aggregations. To tackle this problem,
it is necessary to understand how the space of queries relates to
their aggregation results.

We present NNCubes: neural networks that are surrogate models for data
cube techniques. NNCubes learns a function that takes as input a given
query, for instance a geographic region and temporal interval, and
outputs an aggregation of the query. The learned function serves as a
real-time, low-memory approximator for aggregation queries. Moreover,
using neural networks as querying engines opens up new ways to guide
user interactions that would be challenging, to do with existing
techniques. First, we show how to use the network for discovering
queries that lead to user-specified aggregation results, thus
providing a form of direct manipulation. Second, our networks are
designed in such a way that we learn meaningful 2D projections of the
individual inputs, namely that they are predictive of the aggregation
operation. We use these learned projections to allow the user to
explore the space of aggregation queries, to help discover trends and
patterns in the data. We demonstrate both of these forms of guidance
using NNCubes on a variety of datasets.

[pdf](/static/papers/arxiv_nncubes_2018.pdf)
