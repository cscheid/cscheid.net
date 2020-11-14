---
layout: bootstrap
title: "CSC665, Principles of Machine Learning: Bias and Fairness"
---

# Bias and Fairness

We've so far studied a variety of techniques and mechanisms to create
programs that can classify unseen data so that it matches a "training set"
well. 

This works well when we assume that the classification we want to
carry out should in fact directly replicate the distribution seen in
the training set.  At first glance, it would seem obvious that this
has to be the goal. But: are you sure that the data you collected is
itself what you want your ML program to do?

There are (at least) two central concerns about fairness in ML:

* Technical issues. Most technical approaches to ML define a
  classifier that "works well" to be one that minimizes (something
  close to) the misclassification rate. However, there are often other
  concerns: what if we want to make sure our classifier doesn't behave
  differently depending on the color of someone's skin, or how old
  they are? How can we formulate and solve the problem under these
  additional design goals?

* Societal issues. Most of the thinking about deploying ML
  overemphasizes the above technical question in excess, and ignores
  the context in which the ML system is going to be deployed. Who does
  the ML system target? Who does the ML system serve? What impact does
  the system have in the way people can seek redress when they're
  harmed?

Although a full discussion of these issues is far beyond the scope of
this class, we will engage with a number of proposals in the
literature.  It's also worth noting that the literature in this topic
is quite recent, which means we'll be reading research papers in
addition to textbook chapters.

<!-- ## Basic setup -->



## Reading Material

* Calders and Verwer, [Three Naive Bayes approaches for discrimination-free classification](https://link.springer.com/content/pdf/10.1007%2Fs10618-010-0190-x.pdf)
* Feldman et al., [Certifying and Removing Disparate Impact](https://arxiv.org/abs/1412.3756)
* Caliskan et al., [Semantics derived automatically from language corpora contain human-like biases](https://arxiv.org/abs/1608.07187)
* Zafar et al., [Fairness Constraints: Mechanisms for Fair Classification](https://people.mpi-sws.org/~gummadi/papers/disparate_impact_AISTATS_2017.pdf)
* Agarwal et al., [A reductions approach to fair classification](https://arxiv.org/abs/1803.02453)
* Selbst et al., [Fairness and Abstraction in Sociotechnical Systems](https://poseidon01.ssrn.com/delivery.php?ID=902066029110127003089029121096093072097006058033028058068072015065003070087074017092057052021031061034047024107011013083114104029038092085053122115127075098068019094025079084021008086115107028116093082106108104126083099115090080022006116112112116113088&EXT=pdf)

## Videos

* [Narayanan, 21 definitions of fairness and their politics](https://www.youtube.com/watch?v=jIXIuYdnyyk) Watch this.

## Slides

* Slides in [PDF](fairness-bias-csc665.pdf) format.
