---
layout: post_paper
title: "(arxiv) Certifying and Removing Disparate Impact"
tags: paper
---

Sorelle Friedler, Carlos Scheidegger, Suresh Venkatasubramanian.
arXiv:1412.3756

What does it mean for an algorithm to be biased?

In U.S. law, the notion of bias is typically encoded through the idea
of *disparate impact*: namely, that a process (hiring, selection,
etc) that on the surface seems completely neutral might still have
widely different impacts on different groups. This legal determination
expects an explicit understanding of the selection process.

If the process is an algorithm though (as is common these days), the
process of determining disparate impact (and hence bias) becomes
trickier. First, it might not be possible to disclose the
process. Second, even if the process is open, it might be too complex
to ascertain how the algorithm is making its decisions. In effect,
since we don't have access to the algorithm, we must make inferences
based on the \emph{data} it uses.

We make three contributions to this problem. First, we link the legal
notion of disparate impact to a measure of classification accuracy
that while known, has not received as much attention as more
traditional notions of accuracy. Second, we propose a test for the
possibility of disparate impact based on analyzing the information
leakage of protected information from the data. Finally, we describe
methods by which data might be made "unbiased" in order to test an
algorithm. Interestingly, our approach bears some resemblance to
actual practices that have recently received legal scrutiny.

Paper in [PDF](http://arxiv.org/pdf/1412.3756v1) format, from arxiv.

See also the [Fairness, Accountability, and Transparency in Machine
Learning](http://fatml.org) workshop where Sorelle talked about this
work, and [this
post](//2014/12/09/data-mining-visualization-fairness-accountability.html)
where I give some more context.
