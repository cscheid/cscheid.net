---
title: Adjoints and Inverses
layout: bootstrap_wide
---

# Adjoints and Inverses

tl;dr: Adjoints and inverses both relate column and row spaces. Often
we think of them as being quite different, but also often we
miraculously get away with using adjoints instead of inverses. Why?
Because SVD.

"No, really, why?" Read on.

## Adjoints are (nothing) like inverses --- except when they are

A lot of data science and linear algebra revolves around finding ways
to relate the vectors in the row space of a matrix to the vectors in
the column space of a matrix. (In real matrix algebra, the adjoint is
just the transpose. With complex matrix algebra you have to take complex
conjugates of the entries as well.)

Let's start with $Mx = y$. Inverses give you *the* value $x$ from $y$:
$x = M^{-1} y$. This only works sometimes, because $M^{-1}$ might not
exist.  Adjoints give you *one* value $x'$ in the column space $x' =
M^T y$, though $x'$ could be quite different from $x$. This always works,
because $M^T$ always exists.

Often, we get away with pretending the adjoint is "some kind of
inverse". For example, a number of "ML explanation" techniques, like
[layer-wise relevance
propagation](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4498753/),
are really "just" adjoints in disguise: they "invert" the ML
classifier when a true inversion is not possible.

But why would that make any kind of sense, and when does that work
well? Here we explain the situation for linear operators.

### When $M$ is square, the story is simple

The inverse of a square matrix is the thing that says that if $Mx =
y$, then $x = M^{-1} y$. But actually finding the inverse is hard,
even if you don't do it explicitly. If you know something about $M$,
often you want to compute something simpler. 

For square matrices, if you know that $M$ is orthogonal (that is,
$\norm{Mx} = \norm{x}$ for all $x$), then $M^T = M^{-1}$: the adjoint is
precisely the inverse! In that case, recovering $x$ from $y$ is also
computationally trivial.

### When $M$ isn't square

When if $M$ is not square, things get harder. The linear least squares
problem is the direct generalization of "recover $x$ from $y$" to non-square
matrices. We are given a nonsquare matrix $M$ and "observations" $y$,
and then we set up the optimization problem

$$x^* = \argmin_x \norm{Mx - y}^2.$$

After some calculus and linear algebra, we get the answer:

$$x^* = (X^T X)^{-1} X^T y. $$

If $X$ has full column rank, then $X^T X$ is invertible. And here's
the interesting thing. If $(X^T X)^{-1} \approx I$, then $x^* \approx
X^T y$.  This is the condition that makes the adjoint behave
"like" the inverse!

## The SVD always rescues us

One extra cool part about this is that if you replace the inverse
$(X^T X)^{-1}$ with the [Moore-Penrose pseudo-inverse](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse), $(X^T X)^+$,
then the least-squares solution is always well-defined (and $x^*$ is
then also the minimum-norm $x$ satisfying the $\argmin$ condition
above).

Then, we remember that the Moore-Penrose pseudoinverse is very easy to state
when we have the [SVD](svd.html) of $X$, $X = U \Sigma V^T$:

$$X^+ = V \Sigma^+ U^T,$$

where 

$$\Sigma^+_{ii} = \left \{ \begin{array}{rl} 1/\Sigma_{ii}, &\textrm{if}\ \Sigma_{ii} \neq 0 \\ 0, &\textrm{otherwise.} \end{array} \right .$$

We also know that $U$ and $V$ are orthogonal. With some more linear algebra, we can then
conclude that $X^T \approx (X^T X)^+ X^T$ whenever the singular values of $X$ are
close to $1$ or $0$.

This also works for square matrices. If all singular values are close to $1$,
then $\norm{Mx} \approx \norm{x}$, and $M^T x \\approx M^{-1} x$.

## Tying it back together

The definition of orthogonal square matrices $X^T = X^{-1}$
(and so $X^T X = I$) is equivalent to saying that all singular values
are equal to $1$ exactly. When you allow non-square matrices,
the "equality" between the adjoint $X^T$ and the "inverse" $X^{-1}$
(which cannot exist because $X$ is non-square!) also "allows" zero
singular values.

# Acknowledgments

I learned this through [Claerbout's
article](http://www.reproducibility.org/RSF/book/bei/conj/paper.pdf),
via [Dan
Piponi](https://twitter.com/sigfpe/status/1229073612042145793).
