---
layout: bootstrap
title: "Assignment 5: Project proposal"
---

# Assignment 5: Project proposal

- Posting date: Sep. 20th
- Due date: Sep. 27th
- GitHub classroom's [submission link](https://classroom.github.com/a/cT7VXwEq).

# Description

In this assignment, you will write a proposal for your final class
project. This will be a short written report of around 2 or 3 pages.

**Submission format**: You are strongly encouraged to use LaTeX for
your project submission --- this is good practice for your research
life. However, I will also accept a submission in PDF format if you do
choose to use other programs for creating your document.

There are two possible kinds of final projects.

If you are not sure about your project, it is your responsibility to
contact me (and sooner is better than later), to discuss.


## Alternative 1: Implement a recent vis paper

The first possibility for a final project involves you implementing a
technique from a recent visualization paper. If the paper is an
evaluation of an existing technique, your final project can be a
replication of the original result and reanalysis.

Here's some links you can use for inspiration:

* [VIS 2017 papers](http://ieeevis.org/year/2017/info/papers).
* [VIS 2016 papers](http://ieeevis.org/year/2016/info/overview-amp-topics/papers).
* [VIS 2015 papers](http://ieeevis.org/year/2015/info/overview-amp-topics/papers).

There are other conferences that you might want to search for and use
for inspiration: CHI, EuroVis, Pacific Vis, SIGGRAPH, NIPS, ICML, KDD,
ICDM.

If you choose to go this route, your project proposal will be an
extended abstract describing the paper you chose and your plan for implementation.

Possible ideas:

* Implement a library that can support [Szafir's corrections for color perception](cmci.colorado.edu/visualab/papers/colordiff_vis2017.pdf).
* Implement a system to visualize the behavior of MLP based on [Relevance Layer Propagation](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0130140).
* Implement (and possibly improve) [squares](http://ieeexplore.ieee.org/abstract/document/7539404/), a system for understanding multi-class supervised learning techniques.

## Alternative 2: Identify an open vis problem, and make progress towards solving it.

The second possibility is more challenging, more rewarding, and more
advantageous for your progress throughout grad school life. If you
choose this alternative, you will work in a research problem of your
choosing.

By the end of the course (that is, when you present your project), you
will have produced an artifact that is evidence of your progress
towards solving the research problem. This can be an implementation
prototype, a sketch of a theoretical result, or a preliminary user
study.

If you choose to go this route, your project proposal will be an
extended abstract describing the research problem you want to solve, why and
how you think it relates to data visualization, and your plan for
solving the problem.

(In case you think this is overly ambitious, this style of class
project has actually yielded
[a](https://cscheid.net/2016/09/12/hashedcubes-simple-low-memory-real-time-visual-exploration-of-big-data.html)
[few](https://cscheid.net/2016/09/12/gaussian-cubes-real-time-modeling-for-visual-exploration-of-large-multidimensional-datasets.html)
results.)

Possible ideas:

* Design a gamut correction mechanism that makes sense for
  visualization purposes. Correcting out-of-gamut problems by
  projecting to the closest color in RGB is easy but wrong. Doing it
  precisely in Lab color space is likely to be expensive, complicated
  to implement, and still non-intuitive. What are the solutions?
* Design a system for automatic design of color scales for complex
  data modalities. As we discussed in class, we have separate systems
  for designing categorical scales,
* How do you visualize the behavior of a
  [GAN](https://arxiv.org/abs/1406.2661)?
* How do you visualize maps that change over time? OpenStreetMap
  maintains a version history, and it would be fascinating to have a
  way to visualize the many different versions. Specifically, it would
  be really fun to try to match changes in a given area to specific
  groups of users,
  etc. [Here's a tool that could serve as inspiration](http://wiki.openstreetmap.org/wiki/OSM_History_Viewer).

## Assessment

You will be assessed on the quality of your writing and your research
plan.

Note that I reserve the right to ask you to change your final
project. The reason for this is simple: some fraction of students tend
to choose projects that are too simple, and some fraction of students
tend to choose projects that are too ambitious.
