---
layout: bootstrap
title: "Assignment 4: Perceptron and Feature Selection"
---

# Assignment 4: Perceptron, Feature Selection and Engineering

- Posting date: Feb 17th 2020
- Due date: Feb 24th 2020, 11:59 MST.
- Github Classroom link: [Assignment 4](https://classroom.github.com/a/Z11Hv3W5).

## Assignment description

In this assignment, you will implement the basic linear perceptron,
use it to predict labels for the datasets we have been working on, and
also perform a small amount of feature selection and engineering in
order to create a good set of features for another dataset.

# Helper code

You will find useful helper code in the files `perceptron.py` and
`transform.py` in the starter repo.

Specifically, you will implement the class `LinearPerceptron` in
`perceptron.py`, and you will create a subclass of `FeatureTransform`
in `transform.py` (by finishing the skeleton code in
`perceptron-transform.py`) to find a suitable transformation of one of
the datasets below.

# Questions

Answer the questions below in a "answers.txt" plain file, "answers.md"
Markdown, or "answers.pdf" PDF. _I will not accept Microsoft Word, OS
X Pages, or OpenOffice documents_. (I prefer Markdown, so I can see it
from your repository on Github directly)

In addition, submit whatever code you use to answer the questions below.

1. After implementing the linear perceptron described in class, use it
   to create classifiers for the `agaricus-lepiota` and
   `primary-tumor` datasets. 
   
   Remember that `primary-tumor` has multiple classes, and that
   the perceptron algorithm only works on binary classifiers. The
   helper code now includes code (in
   `Dataset.convert_labels_to_numerical`) to convert multiple labels
   to a binary label.
   
   Report the accuracy you get for all possible labels, and the
   influence of perceptron hyperparameters (number of passes) on
   training and validation/test accuracy. How do these numbers compare
   to the ones you've seen before? Explain.
   
2. Run the perceptron classifier you wrote on
   `mystery-dataset.pickle`. What accuracy do you get? Do you get
   better accuracy with the decision trees or k-nearest-neighbor
   classifiers you've written before?
   
   Improve the accuracy of the perceptron classifier by engineering
   better features for the perceptron to use. It should be possible
   for you to attain effective 100% accuracy on this
   classifier. Implement the method `transform_features` of
   `MysteryTransform` in `perceptron-transform.py`. Note that you will
   have to come up with a good feature transformation yourself,
   possibly by inspecting the training data and thinking hard.
   
   What transformation did you implement, and what accuracy do you get?


