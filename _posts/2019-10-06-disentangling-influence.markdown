---
layout: post_paper
title: "Disentangling Influence: Using Disentangled Representations to Audit Model Predictions"
tags: paper
venue: NeurIPS
thumb: 2019-neurips-disentangling-influence
paper_link: /static/paper/neurips_disentangling-influence_2019.pdf
---

## Citation

Charles T Marx, Richard Lanas Phillips, Sorelle A Friedler, Carlos Scheidegger, Suresh Venkatasubramanian. Disentangling Influence: Using Disentangled Representations to Audit Model Predictions. NeurIPS 2019, to appear.

    @article{marx2019disentangling,
      title={Disentangling Influence: Using Disentangled Representations 
          to Audit Model Predictions},
      author={Marx, Charles T and Phillips, Richard Lanas and Friedler, 
          Sorelle A and Scheidegger, Carlos and Venkatasubramanian, Suresh},
      journal={arXiv preprint arXiv:1906.08652},
      year={2019}
    }

## Abstract

Motivated by the need to audit complex and black box models, there has been extensive research on quantifying how data features influence model predictions. Feature influence can be direct (a direct influence on model outcomes) and indirect (model outcomes are influenced via proxy features). Feature influence can also be expressed in aggregate over the training or test data or locally with respect to a single point. Current research has typically focused on one of each of these dimensions. In this paper, we develop disentangled influence audits, a procedure to audit the indirect influence of features. Specifically, we show that disentangled representations provide a mechanism to identify proxy features in the dataset, while allowing an explicit computation of feature influence on either individual outcomes or aggregate-level outcomes. We show through both theory and experiments that disentangled influence audits can both detect proxy features and show, for each individual or in aggregate, which of these proxy features affects the classifier being audited the most. In this respect, our method is more powerful than existing methods for ascertaining feature influence.

## Resources

* [Paper](https://arxiv.org/pdf/1906.08652.pdf)


