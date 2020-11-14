---
layout: bootstrap
title: "CSC580 Spring 2020 Assignment 1: Decision Trees"
---

# Assignment 2: Nearest Neighbors, high-dimensional data

- Posting date: 2020-02-03.
- Due date: 2020-02-10, 11:59PM MST.
- Github Classroom link: [Assignment 2](https://classroom.github.com/a/pAL9qthn).

## Assignment description

In this assignment, you will implement the simplest possible
geometry-based classifier, namely k-nearest neighbors, and will
investigate its behavior on the datasets of Assignment 1.

In addition to the kNN classifier, you will perform some experiments
on the nature of high-dimensional data.

# Helper code

You will find useful helper code in the files `knn.py` and `dr.py` in
the starter repo.

Specifically, you will implement the class `KNNClassification` in `knn.py`.

# Questions

Answer the questions below in a "answers.txt" plain file, "answers.md"
Markdown, or "answers.pdf" PDF. _I will not accept Microsoft
Word, OS X Pages, or OpenOffice documents_.

In addition, submit whatever code you use to answer the questions below.

1. What's the best validation accuracy you obtain on
   `agaricus-lepiota` and on `primary-tumor` by experimenting with `k`? How
   does this compare to your decision tree classifier?
   
2. As you increase the hyperparameter `k`, what happens to each of the
   training and validation accuracies, and why? Explain, specifically, the
   training accuracy you obtain with `k=1` for the `primary-tumor` dataset.
   
3. Describe the performance (in terms of runtime) of your kNN classifier.

4. Generate 500 samples from a 2-dimensional multivariate normal with
   mean zero and total variance 1 (that is, each dimension should have
   variance 0.5). 
   
   Generate 500 samples from a 100-dimensional multivariate normal with
   mean zero and total variance 1 (that is, each dimension should have
   variance 0.01). Plot a histogram of its lengths, and a histogram of
   the distances between all pairs.
   
   For each of the two datasets you generated above, plot:
   
   - a histogram of the lengths of the samples
   - a histogram of the distances between all pairs
   - a histogram of the inner products between all pairs
   
   Given these observations:
   
   * what can you say about the behavior of multiple unit-variance
     Gaussians in large dimensions?
   * what can you say about the behavior of kNN classifiers in large
     dimensions?
	 
5. Use the script `dr.py` to construct lower-dimensional versions of
   `agaricus-lepiota` and `primary-tumor`, then run your kNN
   classifier on a variety of settings for `k`. Experiment with
   varying numbers of `d` as well. What do you find? What are the
   tradeoffs here? 
   
6. Given the results you found in 5, would it ever be useful to reduce
   the dimensionality of `primary-tumor`, if you could have a
   well-principled way of doing it?
