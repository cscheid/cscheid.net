---
layout: bootstrap
title: "Assignment 5: Reductions"
---

# Assignment 5: Reductions

- Posting date: Feb 24th 2020
- Due date: Mar 2nd 2020, 11:59MST.
- Github Classroom link: [Assignment 5](https://classroom.github.com/a/zzu4d5M3).

## Assignment description

In this assignment, you will implement three algorithms for reduction
from multiclass classification to binary classification: OVA, AVA, and
single-elimination binary tournament.

You will use the perceptron code you've developed for [Assignment
4](assignment-4.html) as the baseline binary classifier, and will
evaluate the quality of the reductions on the `primary-tumor` dataset.

# Helper code

You will write AVA code in `ava.py`, and respectively for `ova.py` and
`binary_tournament.py`.

# Questions

Answer the questions below in a "answers.txt" plain file, "answers.md"
Markdown, or "answers.pdf" PDF. _I will not accept Microsoft Word, OS
X Pages, or OpenOffice documents_. (I prefer Markdown, so I can see it
from your repository on Github directly)

In addition, submit whatever code you use to answer the questions below.

1. What are the accuracies you obtain for the `primary-tumor` dataset
   for AVA, OVA, and binary tree tournament?
   
2. Report the *confusion matrix* of these methods. Are they comparable?
   
3. Given the semantics of the [labels for the primary-tumor dataset](https://archive.ics.uci.edu/ml/datasets/primary+tumor),
   is "accuracy" a good measure of model quality? If not, what are the
   problems and possible alternatives?

## Hints

* Notice that you still have to decide the hyperparameters for the
  binary classifier, which will now get called as a subroutine. How
  should your code make this choice? If you need to change the number of
  parameters in `main.py`, report that in your answers.
* You need to decide on a way to create the binary tree to separate
  the labels. Make one choice and describe it on your assignment
* I am *not* providing code for you to create a confusion matrix -
  implement that however you see fit.
