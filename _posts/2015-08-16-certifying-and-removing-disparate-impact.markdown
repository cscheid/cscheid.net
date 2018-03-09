---
layout: post_paper
title: "Certifying and Removing Disparate Impact"
tags: paper
thumb: 2015-kdd-certifying
paper_link: http://arxiv.org/pdf/1412.3756v2
---

Michael Feldman, Sorelle Friedler, John Moeller, Carlos Scheidegger, Suresh Venkatasubramanian.
[KDD 2015](http://dl.acm.org/citation.cfm?id=2783311), arXiv:1412.3756

What does it mean for an algorithm to be biased?

In U.S. law, unintentional bias is encoded via disparate impact, which
occurs when a selection process has widely different outcomes for
different groups, even as it appears to be neutral. This legal
determination hinges on a definition of a protected class (ethnicity,
gender) and an explicit description of the process.

When computers are involved, determining disparate impact (and hence
bias) is harder. It might not be possible to disclose the process. In
addition, even if the process is open, it might be hard to elucidate
in a legal setting how the algorithm makes its decisions. Instead of
requiring access to the process, we propose making inferences based on
the data it uses.

We present four contributions. First, we link disparate impact to a
measure of classification accuracy that while known, has received
relatively little attention. Second, we propose a test for disparate
impact based on how well the protected class can be predicted from the
other attributes. Third, we describe methods by which data might be
made unbiased. Finally, we present empirical evidence supporting the
effectiveness of our test for disparate impact and our approach for
both masking bias and preserving relevant information in the
data. Interestingly, our approach resembles some actual selection
practices that have recently received legal scrutiny.

Paper in [PDF](http://arxiv.org/pdf/1412.3756v2) format, from arxiv.

See also the [Fairness, Accountability, and Transparency in Machine
Learning](http://fatml.org) workshop where Sorelle talked about this
work, and [this post](/2014/12/09/data-mining-visualization-fairness-accountability.html)
where I give some more context.
