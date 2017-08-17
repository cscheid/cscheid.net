---
layout: bootstrap
title: Other formulations of data-fitting problems
---

We have studied in some detail how linear models work, in
classification, regression, and clustering. There are, however, many
other possible models. In today's class, we will look at some of these
variants.

## (Soft-margin) support vector machines

Linear least squares minimizes the squared loss function. But is this
a sensible idea? What other possibilities are there? Which other
possibilities are computationally efficient? What happens if we
minimize the *hinge* loss instead?

## Lasso: $L_1$ vs $L_2$ regularization

Instead of minimizing the error with a regularizer that punishes
solutions with large $L\_2$ norm, what happens if we punish solutions
with large $L\_1$ norm?

We'll look at a simple application scenario: face recognition systems.
