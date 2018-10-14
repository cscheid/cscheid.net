---
layout: d3_project
title: Experiment with Eigenvectors
---

# Eigenwhat?

This demo will help you build intuition for the behavior of
eigenvectors and eigenvalues of a 2x2 symmetric real matrix. As you'll
remember, an **eigenvector** $v$ of a matrix $M$ is any vector that
satisfies the following equation:

$$Mv = \lambda v$$

In other words, if you transform a vector and you end up with a scaled
version of the vector, then it is an eigenvector. The amount by which
the vector is scaled is known as the eigenvalue.

When the 2x2 matrix is symmetric, then there exist two eigenvectors
that are orthogonal to each other. In that case, we can write the
matrix as:

$$ M = U \Sigma U^T $$

where $U$ is a matrix holding the eigenvectors and $\Sigma$ is a
diagonal matrix where the entries in the diagonal are the
eigenvalues. If you'll remember from linear algebra, every time you
have a square matrix whose rows (or columns) are orthogonal to each
other, that is a **rotation** matrix and, in addition, rotation
matrices are such that their transposes are their inverses. So a good
way to think about this is that eigenvectors give you a **decomposition** of the matrix M into simpler matrices.

In other words, the operation of every symmetric matrix $M$ on a
vector $v$ is $Mv = U \Sigma U^T v$, or:

* $U^T v$: transform the vector $v$ to the "eigenspace": this is a rotation
* $\Sigma U^T v$: in the eigenspace, scale the vector's coordinates by the eigenvalues
* $Mv = U \Sigma U^T v$: transform the scaled vector back to the original basis

In the interactive demo below, the unit-length eigenvectors are
represented by the red dots.

## Points transformed by a symmetric 2x2 matrix

<div id="transform"></div>
<div id="matrix-operation"></div>

## Enter the values for M here

<table>
<tr><td>$M_{00}$</td> <td><input type="number" id="m00" min="-10" max="10" value="4" step="0.05"></td>
    <td>$M_{01}$</td> <td><input type="number" id="m01" min="-10" max="10" value="1" step="0.05"></td></tr>
<tr><td>$M_{10}$</td> <td id="m10">1</td> 
    <td>$M_{11}$</td> <td><input type="number" id="m11" min="-10" max="10" value="2" step="0.05"></td></tr>
</table>

## Eigenvectors and eigenvalues

<table>
<tr><td>$U_{00}$</td> <td id="u00"></td> <td>$U_{01}$</td> <td id="u01"></td></tr>
<tr><td>$U_{10}$</td> <td id="u10"></td> <td>$U_{11}$</td> <td id="u11"></td></tr>
</table>
<br>
<table>
  <tr><td> $\lambda_0$</td><td id="l0"></td><td>$\lambda_1$</td><td id="l1"></td></tr>
</table>

## Known bugs

* Eigenvalue multiplicity (two eigenvectors not aligned with one
  another with equal eigenvalues) will mean that there are more than 2
  unit-length eigenvectors, and my crappy power iteration algorithm
  stops working in that case.
* The rotation transition for $U$ and $U^T$ should be an actual
  rotation. For small rotations the linear interpolation looks fine,
  but for bigger ones it's hard to see what's going on.
* We should arbitrarily flip the eigenvector signs such that we get a
  smaller rotation on $U^T$ and $U$. Sometimes my crappy power
  iteration algorithm gives the "bad" eigenvector, and that makes it
  hard to see what's going on.
* If one of the eigenvalues is zero, my crappy power iteration
  algorithm gives a bad eigenvector (notice a theme here?)

## More reading

If you really want to understand eigenvectors and eigenvalues, the
best thing to read continues to be chapter 5 of Shewchuk's classic
[Introduction to the Conjugate Gradient Method Without the Agonizing Pain](http://www.cs.cmu.edu/~./quake-papers/painless-conjugate-gradient.pdf).

The particular presentation in this demo was inspired by Blinn's also-classic [Consider the lowly 2x2 matrix](http://ieeexplore.ieee.org/document/486688/).


