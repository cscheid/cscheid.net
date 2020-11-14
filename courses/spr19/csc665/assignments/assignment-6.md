---
layout: bootstrap
title: "Assignment 6: Linear and Kernel Methods"
---

# Assignment 6: Linear Methods

- Posting date: Mar 25th 2019
- Due date: Apr 3rd 2019, 11:59 MST.
- Github Classroom link: [Assignment 6](https://classroom.github.com/a/KSYUsuXt).


## Assignment Description

In this assignment, you will implement a gradient descent procedure
for predictors based on three losses: the quadratic loss, the
logistic loss, and the hinge loss.

You will use a quadratic loss for a regression problem, and a logistic
and hinge loss for a classification problem.


# Questions

Answer the questions below in a "answers.txt" plain file, "answers.md"
Markdown, or "answers.pdf" PDF. _I will not accept Microsoft Word, OS
X Pages, or OpenOffice documents_. (I prefer Markdown, so I can see it
from your repository on Github directly)

In addition, submit whatever code you use to answer the questions below.


## Regression under Quadratic Loss

Implement a gradient descent procedure to minimize the quadratic loss
with an $l_2$ regularizer. Stop your gradient descent procedure when
the squared norm of the gradient goes below $10^{-4}$.

1. Run the classifier for the dataset `regression-dataset.pickle`
   under the following regularization values: $\lambda = \{0, 0.0001,
   0.01\}$. You might have to experiment with the learning rate for
   the algorithm to converge. What are the validation and training
   losses you obtain?
   
2. Design a procedure for _early stopping_, based on monitoring the
   validation error. What are the accuracies you obtain for the regularization
   values above? Discuss. 
   
Note that it might be easier to store a list of the losses and plot
the loss curve over time in order to see what's happening.
   
## Classification under Logistic Loss

Implement a gradient descent optimization procedure to find a
classifier that minimizes the logistic loss function with an $l_2$
regularizer. Stop your gradient descent procedure when the quadratic
norm of the gradient goes below $10^{-4}$.

1. Run the classifier for the `agaricus-lepiota` dataset under the
   same regularization values as above. You might have to experiment
   with the learning rate for the algorithm to converge. What are the
   validation and training losses you obtain?

2. Does early stopping help in this case?

## Classification under Hinge Loss

Implement a gradient descent optimization procedure to find a
classifier that minimizes the hinge loss function with an $l_2$
regularizer. Stop your gradient descent procedure when the quadratic
norm of the gradient goes below $10^{-4}$.

1. Run the classifier for the `agaricus-lepiota` dataset. Experiment
   with different regularization values. Which values produce more or
   fewer training points inside the margin? Which values produce
   better training or validation error?

2. Does early stopping help in this case?
