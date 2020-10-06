---
layout: post
title: "My talk at FAT*"
---

I spent part of last week attending the [ACM Conference on Fairness,
Accountability and Transparency](https://fatconference.org).  Sorelle,
Suresh, and I presented a
[tutorial](https://algofairness.github.io/fatconference-2019-toolkit-tutorial/)
and a
[paper](/2019/02/04/a-comparative-study-of-fairness-interventions.html)
on some of our joint work on creating a meaningful, thoughtful way to
experimentally compare the wide variety of "fair ML algorithms" out
there.

There's a video stream available of my talk, but I wanted to include
here my planned script in case that's easier for folks to follow.

In a slightly unrelated note: if you haven't attended FAT\*, I highly
recommend it. FAT\* is going to be in Barcelona next year, so that is
already a great reason to go. More seriously, I cannot think of a
better place to listen and engage on what I think is the most
important conversation about automation and society happening right
now.

## The talk script

(One
[slide](/presentations/2019-fairness-comparative-study-slides.pdf) per
item in the numbered list below.)

1. I'm Carlos, and I want to talk to you today about joint work with
   Evan, Sonam, Derek, Sorelle, and Suresh.
   
   I want to tell you about a study we have conducted of a number of
   fairness-enhancing interventions ("fair ML algorithms") in the
   literature, and what happens when you attempt to compare them.
   
   I'm a computer scientist by training, so I want to start by thanking
   you all for helping create and sustain this venue. I can personally
   tell you FAT* has fundamentally changed the way I view the world, our
   potential for harm, and our responsibility for addressing it. I
   can't think of a more important way to spend my time, so thank you
   for that.

2. So what did the world look like before FAT*?
  
3. Until just very recently --- and I can tell you I was a part of this
   problem too --- we were all so excited about ML, and so naive about
   it, that we all just wanted any excuse to build an ML system. If it
   had _anything_ to do with the real world, we were all giddy with
   excitement. "Social impact? What's that?"
  
4. Right after that, we all experienced the first push-back, and our
   natural reaction was: "wait, this is just math! Of course it's
   objective". And then we realized just how uneducated we were as a
   field, by and large, and how much we have to learn.
  
5. Because of many of you in the audience today, fairness,
   accountability and transparency is seriously in the mind of
   policymakers, practitioners, and our students. As we have been
   seeing yesterday and today, we have a long way to
   go, but we now have an abundance of ideas and proposals to start
   mitigating some of the harm we've created. This is great!

6. There's no better example of this explosion than Narayanan's great
   tutorial just last year at this conference, called "21
   definitions of fairness and their politics". 21 definitions! Surely
   one of them is the real best one, and all we have to do it is find
   it, right?
   
   Sadly, that's not true - we have impossibility theorems, from our
   keynote speaker, general chair, and others. And some of the fairness
   notions do not seem to be compatible with one another. So what to
   do?

7. I will show you today one effort. We think that with the
   explosion of scholarly work, there's a risk that
   different approaches to fairness will remain isolated within
   research groups or schools of thought, and we think that will
   discourage taking a broader view. We think it is important instead
   to make it as simple as possible to be confronted with these
   alternative definitions.

8. Specifically, we built a Python library that allowed us to run
   an extensive comparison of existing fairness interventions, using
   a number of fairness measures from the literature, trained on
   datasets that we believe are representative of the variety of
   real-life situations in which fair ML algorithms might be deployed.
   
   This is the part of the talk where I confess to you that I expected
   that one algorithm to be fundamentally better than all
   the others, and that one specific fairness measure would capture
   most of the issues we tended to see.

9. With apologies to danah, the truth is that it's complicated.
   
   Here are three surprising findings from our work:

10. Variation from within pieces of the pipeline which we expected to be
   irrelevant sometimes dominate. For example, a number of fair ML
   algorithms assume a binary protected attribute, and the way in which
   we convert nonbinary protected attributes turns out to make a big
   difference for the implementations we have studied.

11. Although there are (at least!) [21 theoretically different notions of
   fairness](https://www.youtube.com/watch?v=jIXIuYdnyyk), many of the measurements seem to be correlated with one
   another. I want to point out here that this could mean a number of
   things. It could be the case that the incompatibilities don't actually
   matter for the ML classifiers used in practice; it could be the case
   that the data for which fair ML methods tend to be important does
   not trigger these distinctions; or it could be that our comparison
   is missing pieces.
  
12. Finally, we have found that for many ML tasks we have studied,
   _some_ algorithm can achieve _some_ notion of fairness. But it's
   almost never the case that one algorithm does the best in all measures (that's not
   surprising, since they often optimize for different notions). It's
   also not the case that any one algorithm does reasonably well in all datasets (that's more
   surprising and worrying)
    
13. Let me tell you more concretely what we did.

14. We've used five different datasets which encompass common sources
    of complications, like multiple protected attributes, numerical
    protected attributes and class imbalances. We would love to try
    your dataset as well. Please come to yesterday's tutorial!

15. We've compiled a number of fair ML algorithms for which we could
    find the source code and could build it ourselves. If your
    technique isn't here, this is likely our fault, and we'd like to
    fix it! Please come and talk to us.
    
16. Finally, we've implemented essentially all fairness and accuracy
    metrics we could find from the literature and that we could think
    of. We have more than 21 of them!
    
17. Here's what we think is the most interesting finding. This is a
    visualization of the correlation between different measures,
    combined over all algorithms and datasets we have attempted. We
    find a general pattern of similar behavior for a number of notions
    of fairness, but we also find somewhat surprising results, such as
    the fact that the attribute-sensitive notions of accuracy don't
    seem to behave significantly different than their unweighted
    versions.
    
18. Here's a concrete example of this correlation. We are looking at a
    comparison between sex-conditioned true positive rates in the x
    axis and what we call "sex-calibration-negative": this is the the
    difference (across the protected attribute "sex") between the rate
    at which the algorithm makes negative predictions. We we are
    showing the results of the algorithms we have run on the adult
    dataset, where the algorithms are all intervening on the sex
    protected attribute.
    
    This particular measure pair is one for which there exist
    [impossibility
    results](https://www.liebertpub.com/doi/pdf/10.1089/big.2016.0047)
    in the literature.
    
    You can see what I mentioned earlier: the tradeoff is clearly
    there, but notice how different algorithms pick different points
    along that curve. This is an issue because our "hyperparameter"
    choice here appears to have to be the actual intervention to
    choose, rather than a hyperparameter within an algorithm.


19. So what now? Unfortunately, our conclusions are mostly
    introspective, and are generally bad news for the deployment of
    these algorithms.


20. First, we think our research reports need to be a little more
    careful in our reporting. For example, we should be reporting more
    extensively on the ways in which we have preprocessed our data to
    achieve the results. Otherwise, it's hard to make meaningful comparisons.


21. Second, we would like to understand whether it's enough to report
    on one measure from each of these clusters, or whether we need to find
    a dataset and an algorithm for which these measures behave more
    independently from each other.


22. Third, it seems that it's unrealistic to expect one algorithm to
    work well in a variety of settings. That means that before we go
    tell policymakers about which fair ML intervention to use, I think
    we have some homework ourselves to do to understand why these
    results are so different from one another.
    
    
23. Finally, we would love to help you run your future analyses more
    easily and more comprehensibly. If there's something you think we
    are missing, please join us - we would love to grow this project
    together.
    
    Thank you.
