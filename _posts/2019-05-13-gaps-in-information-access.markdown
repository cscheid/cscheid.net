---
layout: post_paper
title: "Gaps in Information Access in Social Networks"
tags: paper
venue: WWW
thumb: 2019-www-information-gaps
paper_link: /static/papers/www_information-gaps_2019.pdf
---

## Citation

[Benjamin Fish](http://homepages.math.uic.edu/~bfish3/index.html), Ashkan Bashardoust, danah boyd, [Sorelle Friedler](http://sorelle.friedler.net), Carlos Scheidegger, [Suresh Venkatasubramanian](http://www.cs.utah.edu/~suresh/). Gaps in Information Access in Social Networks. The World Wide Web Conference (now called [The WebConf](https://www2019.thewebconf.org/)), 480--490, 2019.

    @inproceedings{fish2019gaps,
      title={Gaps in Information Access in Social Networks},
      author={Fish, Benjamin and Bashardoust, Ashkan and boyd, danah and 
	    Friedler, Sorelle and Scheidegger, Carlos and 
		Venkatasubramanian, Suresh},
      booktitle={The World Wide Web Conference},
      pages={480--490},
      year={2019},
      organization={ACM}
    }

## Abstract

The study of influence maximization in social networks has largely
ignored disparate effects these algorithms might have on the
individuals contained in the social network. Individuals may place a
high value on receiving information, e.g. job openings or
advertisements for loans. While well-connected individuals at the
center of the network are likely to receive the information that is
being distributed through the network, poorly connected individuals
are systematically less likely to receive the information, producing a
gap in access to the information between individuals. In this work, we
study how best to spread information in a social network while
minimizing this access gap.

We propose to use the maximin social welfare function as an objective
function, where we maximize the minimum probability of receiving the
information under an intervention. We prove that in this setting this
welfare function constrains the access gap whereas maximizing the
expected number of nodes reached does not. We also investigate the
difficulties of using the maximin, and present hardness results and
analysis for standard greedy strategies. Finally, we investigate
practical ways of optimizing for the maximin, and give empirical
evidence that a simple greedy-based strategy works well in practice.

## Resources

* [Paper](https://arxiv.org/pdf/1903.02047.pdf)
