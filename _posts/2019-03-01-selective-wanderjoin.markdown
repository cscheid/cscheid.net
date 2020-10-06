---
layout: post_paper
title: "Selective Wander Join: Fast Progressive Visualizations for Data Joins"
tags: paper
thumb: 2019-informatics-selective-wander-join
paper_link: /static/papers/informatics_selective-wander-join_2019.pdf
---

## Citation

Marianne Procopio, Carlos Scheidegger, [Eugene Wu](http://www.cs.columbia.edu/~ewu/), [Remco Chang](https://www.cs.tufts.edu/~remco/). Selective Wander Join: Fast Progressive Visualizations for Data Joins. Informatics, 2019.

    @inproceedings{procopio2019selective,
      title={Selective Wander Join: Fast Progressive Visualizations for Data Joins},
      author={Procopio, Marianne and Scheidegger, Carlos and Wu, Eugene and Chang, Remco},
      booktitle={Informatics},
      volume={6},
      number={1},
      pages={14},
      year={2019},
      organization={Multidisciplinary Digital Publishing Institute}
    }
	
## Abstract

Progressive visualization offers a great deal of promise for big data
visualization; however, current progressive visualization systems do
not allow for continuous interaction. What if users want to see more
confident results on a subset of the visualization? This can happen
when users are in exploratory analysis mode but want to ask some
directed questions of the data as well. In a progressive visualization
system, the online aggregation algorithm determines the database
sampling rate and resulting convergence rate, not the user. In this
paper, we extend a recent method in online aggregation, called Wander
Join, that is optimized for queries that join tables, one of the most
computationally expensive operations. This extension leverages
importance sampling to enable user-driven sampling when data joins are
in the query. We applied user interaction techniques that allow the
user to view and adjust the convergence rate, providing more
transparency and control over the online aggregation process. By
leveraging importance sampling, our extension of Wander Join also
allows for stratified sampling of groups when there is data
distribution skew. We also improve the convergence rate of filtering
queries, but with additional overhead costs not needed in the original
Wander Join algorithm.

## Resources

* [Paper](/static/papers/informatics_selective-wander-join_2019.pdf)

