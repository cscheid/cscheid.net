---
layout: bootstrap
title: Low-rank approximations
---

# Low-rank approximations.

Material: FODS 6.3 (pages 179--188).

So far, we've looked at how the singular value decomposition is a
fundamental tool for understanding data science techniques. However,
we have assumed that the SVD can computed efficiently, which is simply
not the case for large matrices and datasets. In this lecture, we will
learn the two fundamental breakthroughs in the last 15 years that have
enabled the computation of the SVD for very large datasets.

These two techniques are based on carefully *sampling* parts of the
matrix, and computing an (exact) SVD of the (much smaller) sampled
version.

### Approximating Matrix Multiplications through Low-Rank and Monte Carlo

Before we get to talk about computing the SVD by sampling, we will
talk about computing a much simpler operation: the multiplication
between two matrices. The algorithm we will see in class for this case
is quite simple, and it's also quite simple to analyze. It's described
in sections 4.1, 4.2, and 4.3 of
[this paper](http://www.stat.berkeley.edu/~mmahoney/pubs/matrix1_SICOMP.pdf).

## Further reading

* Kumar et
  al., [Sampling Methods for the Nystrom Method](http://www.jmlr.org/papers/volume13/kumar12a/kumar12a.pdf),
  JMLR 2012.
* Drineas et al.,
  [Clustering Large Graphs via the Singular Value Decomposition](http://www.drineas.org/Papers/Drineas_JML_04.pdf),
  Machine Learning, 2004.
* Drineas et al., [On the Nystrom Method for Approximating a Gram Matrix for Improved Kernel-Based Learning](http://www.jmlr.org/papers/volume6/drineas05a/drineas05a.pdf),
  JMLR 2005.
* Achlioptas and McSherry,
  [Fast Computation of Low-Rank Matrix Approximations](http://dl.acm.org/citation.cfm?id=1219097),
  JACM 2007.
