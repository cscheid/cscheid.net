---
layout: bootstrap
title: Assignment 3 for CS 665, Spr 2017
---

# Assignment 3

- Posting date: Feb 14th 2017
- Due date: Feb 28th 2017, 11:59PM local time.

## Part 1: Classical MDS

1. (FODS 3.30). Hint 1: use the definition of the squared distance
   between two vectors in terms of inner products. Hint 2: if you
   could compute the SVD of $X$, how would you use it?.
   
2. Implement the algorithm you described above, and use the first two
   columns of the result matrix to display the best two-dimensional
   projection of the 312 points
   [of this dataset](https://people.sc.fsu.edu/~jburkardt/datasets/cities/usca312_dist.txt). This
   dataset contains the pairwise distances between each of 312 cities
   in North America. You should be able to easily see the general
   shape of the continental US, and more.

## Part 2: PCA, kernel linear squares, Kernel PCA

You are given a training dataset of 250 points. The points are
described, indirectly, by the similarity matrix $M$ [in this file](training.txt).
   
Each point in the training dataset has a value associated with it,
given by the values [in this file](training_ys.txt).
   
1. Plot the points in two dimensions using the MDS algorithm you
   implemented. Use color to encode the value associated with each
   data point. You should see an outer ring of points and a smaller,
   inner cluster of points. The outer points all have the value 10
   associated with them, and the inner points have the value 5
   associated with them.
   
2. A natural question to ask when using MDS is: how faithful is this
   plot? In other words: are two dimensions enough? Did the plot throw
   away too much information? How can you use the SVD of $M$ to answer
   this question?
   
3. Implement Kernel Least Squares (KLS), and use it to solve for the values
   in a 50-point testing set below (use a small $\lambda$,
   such as $10^{-4}$). The testing points come from the same source as
   the training set, so they will either be from the outer ring or the
   inner circle.
   
   In Kernel Least Squares, points in the testing set are represented
   implicitly by the inner products with all
   the points in the training set. If we compute those values for each
   point in the testing set and each point in the training set, we get
   a matrix. That matrix is [here](testing.txt). 
   
   Use this matrix and KLS to compute predictions, and compare your
   predictions to the [ground truth](testing_ys.txt). Do you get good
   predictions?
   
   Why not? Can you figure out what is happening by investigating the
   kernel matrix and its SVD?
   
4. We will now use different kernel matrices to solve the same
   problem. First, solve the same problem as before, but add $1$ to
   every entry in $M$ (in other words, use a matrix $M'$, where
   $m'\_{ij} = m\_{ij} + 1$). What results do you get? Where have they
   improved, but where have they not improved? Hint: remember that
   $m\_{ij} = \langle v\_i, v\_j \rangle$, for some hypothetical
   vector representation. Remember that transforming kernels is the
   same thing as transforming the representations. Relate this
   transformation to what you would get if you were solving a "normal"
   least squares problem. What is the difference between these
   representations?
   
5. Finally, create a $M''$ matrix where $m'\'\_{ij} = (m\_{ij} + 1)^2$,
   and use it to solve the Kernel Least Squares problem.  What
   results do you get now? Why are these better?

