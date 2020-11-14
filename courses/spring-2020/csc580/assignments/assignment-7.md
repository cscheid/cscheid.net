---
layout: bootstrap
title: "Assignment 7: Neural Networks and RevAD"
---

# Assignment 7: Neural Networks and Reverse-Mode Automatic Differentiation

- Posting date: Apr 15th 2020
- Due date: Apr 29th 2020
- Github Classroom link: [Assignment 7](https://classroom.github.com/a/LEKAx5H_).


## Assignment Description

In this assignment, you will implement a minimal library for
reverse-mode automatic differentiation and use it to implement and
train a neural network to recognize digits in (a subset of) the
MNIST-digits dataset.

Answer the questions below in a "answers.txt" plain file, "answers.md"
Markdown, or "answers.pdf" PDF. _I will not accept Microsoft Word, OS
X Pages, or OpenOffice documents_. (I prefer Markdown, so I can see it
from your repository on Github directly)

In addition, submit whatever code you use to answer the questions below.

## Implementation

Finish the implementation of reverse-mode autodiff in `autodiff.py`, and write
the helper functions for `relu()`, `softmax()`

Implement a fully-connected multi-layer neural network (with ReLU
nonlinearities) to classify the `mnist-digits` dataset. Use the
[multiclass cross-entropy
loss](https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html)
to train your neural network. Train the neural network using simple
stochastic gradient descent, with a mini-batch size of 1.  Experiment
with at least three different neural network architectures, and at
least two different numbers of layers. You will need to experiment
with learning the learning rate to find a good number.

During your training process, monitor the misclassification rate on
the validation dataset, and choose the best one over a certain number
of epochs. (You can determine this manually.)

## Questions

* What is the performance (in terms of misclassification rate) that
  you obtain on training data, validation data, and testing data?

* Do the architectures matter significantly in this case?

* What are the easy classes and hard classes? What classes tend to get
  confused with one another?
  
* Attempt to the best of your ability to make your network overfit the
  training data. Can you?  What architecture and training procedure
  achieves that?
  
* Attempt to the best of your ability to make your network
  *significantly underfit* the training data. Can you? What
  architecture and training procedure achieves that? What does that
  say about this dataset?
  
## Hints

* You can expect upwards of 95% accuracy on the training data on this
  dataset.

* Make sure you understand the data. `test_mnist.py` requires
  `matplotlib` and `scipy` to be installed in your Python setup; if
  you have those libraries, then you can use `test_mnist.py` to
  inspect the training set one image at a time.
  
* Plan for this to take a while to run! With `python3`, a 3-layer
  network with about 30 neurons per layer takes about three minutes
  per epoch. With `pypy3`, it takes about one minute. (To give you an
  idea of how inefficient this library is, in PyTorch this would take
  a couple of seconds at most.) 
  
  Use the `test_*` functions (and consider writing your own!)  to
  develop the automatic differentiation classes in `autodiff.py`
  before moving to the development of the `NN` class in `nn.py`!


## Data

The dataset for this assignment comes from
[LeCun, Cortes, and Burges](http://yann.lecun.com/exdb/mnist/index.html). 

