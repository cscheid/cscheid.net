---
layout: post_paper
title: "Runaway Feedback Loops in Predictive Policing"
tags: paper
thumb: 2017-runaway-feedback-loops
paper_link: https://arxiv.org/pdf/1706.09847.pdf
---

Danielle Ensign,  [Sorelle A. Friedler](http://sorelle.friedler.net),
Scott Neville, [Carlos Scheidegger](/), [Suresh
Venkatasubramanian](https://www.cs.utah.edu/~suresh/).

Predictive policing systems are increasingly used to determine how to
allocate police across a city in order to best prevent
crime. Discovered crime data (e.g., arrest counts) are used to help
update the model, and the process is repeated. Such systems have been
empirically shown to be susceptible to runaway feedback loops, where
police are repeatedly sent back to the same neighborhoods regardless
of the true crime rate.

In response, we develop a mathematical model of predictive policing
that proves why this feedback loop occurs, show empirically that
this model exhibits such problems, and demonstrate how to change the
inputs to a predictive policing system (in a black-box manner) so the
runaway feedback loop does not occur, allowing the true crime rate to
be learned. Our results are quantitative: we can establish a link
(in our model) between the degree to which runaway feedback causes
problems and the disparity in crime rates between areas. Moreover,
we can also demonstrate the way in which reported incidents of crime
(those reported by residents) and discovered incidents of crime (i.e.
those directly observed by police officers dispatched as a result of
the predictive policing algorithm) interact: in brief, while reported
incidents can attenuate the degree of runaway feedback, they cannot
entirely remove it without the interventions we suggest.

To
appear at the inaugural [Conference on Fairness, Accountability, and 
Transparency](https://fatconference.org/), 2018.

[pdf](https://arxiv.org/pdf/1706.09847.pdf), [arxiv](https://arxiv.org/abs/1706.09847)
