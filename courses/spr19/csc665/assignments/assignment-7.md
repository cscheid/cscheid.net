---
layout: bootstrap
title: "Assignment 7: Naive Bayes"
---

# Assignment 7: Naive Bayes

- Posting date: Apr 8th 2019
- Due date: Apr 15th 2019, 11:59 MST.
- Github Classroom link: [Assignment 7](https://classroom.github.com/a/LifC5C5G).
  
## Assignment Description

In this assignment, you will implement a spam detector for text
messages using Naive Bayes. The natural-language-processing aspects of
our implementation are much simpler than what you should do in
practice, but they will suffice to illustrate the power of Naive
Bayes. The main advantage of Naive Bayes is its simplicity,
together with its relative accuracy (given how incredibly straightforward
it is, it's surprising that it works *at all*!)

# Questions

Answer the questions below in a "answers.txt" plain file, "answers.md"
Markdown, or "answers.pdf" PDF. _I will not accept Microsoft Word, OS
X Pages, or OpenOffice documents_. (I prefer Markdown, so I can see it
from your repository on Github directly)

In addition, submit whatever code you use to answer the questions below.

## Naive Bayes hyperparameters

In your code, you will have to choose a "smoothing" hyperparameter
that will be used as a
[pseudocount](https://en.wikipedia.org/wiki/Additive_smoothing#Pseudocount). Experiment
with a variety of different values. 

* What are the effects of this parameter on the validation accuracy of
  your classifier?
  
* What does this say about Naive Bayes as a classifier, in general?

## Implementation details

If you follow the first formulation [in the
book](http://ciml.info/dl/v0_99/ciml-v0_99-ch09.pdf) (page 122,
equation 9.25), then your implementation will be quite
inefficient. Why is that, and how can you use Equations 9.27 and 9.28 to improve it?


## Data

The dataset for this assignment comes from
[UCI](http://archive.ics.uci.edu/ml/datasets/sms+spam+collection),
courtesy of Tiago A. Almeida and Jose Maria Gomez Hidalgo. 

(If you end up inspecting the data, do note that this is a real-world
dataset, and comes with a certain amount of adult language.)


