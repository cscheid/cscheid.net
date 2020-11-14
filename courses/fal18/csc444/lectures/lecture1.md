---
layout: bootstrap
title: Week 1, Getting Started
---

# CSC444: Data Visualization

Welcome to CSC444, Data Visualization. In this course, you will
learn how, and why, to create data visualizations. 

A "visualization" is simply a visual representation of an object of
our interest. It's *visual*: we consume them with our eyes, and so it is
essential that we know how our eyes work --- and, more importantly,
the parts of our brains connected to our eyes. It's also a
*representation*; we get to choose what this representation will be,
and different choices lead to different pictures, some good and some
bad. We will learn how to tell those apart, and how to make pictures
that are more good than bad.

Good data visualization involves perceptual
psychology, mathematics, and computer science. This makes our subject
uniquely challenging: sometimes the way our eyes work stands in
way of applying some beautiful result from computer science. Sometimes
it's the other way around: something deep about the math in the data
will help guide the design process and let us make a picture that is beautiful,
informative, and truthful.

The content of the course is split roughly in three distinct aspects:
mechanics, principles, and techniques.

# Content

## The why: principles

Data visualization itself has existed for at least 200 years; we'll learn
about Playfair, Nightingale, Minard, and others.  Statistics in the
1900s, computers in the 1950s; exploratory analysis.  From the 1960s
on, we started to realize that some things in visualization work
better than others, and around 1980 scientists started seriously
studying the effectiveness of data visualization as a medium
itself. This program goes on to this day.  To give a few examples, we
know that using *positions* works better than using *angles*; we know
that using *length* works better than using *area*. We know that, in
some cases, using *color intensity* works better than *color hue* (and
that in other cases, it's the other way around).

We also know, since the 1960s, that *interaction* is a powerful
idea. Back then people interacted with a data visualization by
carefully rearranging bits of paper (we didn't have supercomputer in our pockets
then!), but many of the original thoughts are still valid. We will
learn the basics of interactive visualizations.

Although much of what we know about visualization is finicky and
specific, we have some general principles. We will spend about four
weeks studying these principles.

### List of Principles

* retinal variables
* integral vs separable channels
* color vision
  * color spaces
  * color blindness
* interactive vis
  * brushing and linked views
  * transitions
* (very basics of) human-centered design
* confusers, hallucinators, data transformations


## The what: techniques

In comparison to the relative paucity of principles, data
visualization has an *enormity* of existing techniques. We will spend
about six weeks in this course going over existing
techniques, and what kinds of data they apply to.

Here, computer science has much to say about data
visualization. 

For example, not everything we want to do with data is
efficient, and not everything that is efficient is worth doing with
data. This means that the practice of data visualization needs to be
informed by algorithmic constraints. 

Data visualization also interacts with software engineering: not every
visualization algorithm plays well with the rest of the code in your
program and in your head.

### List of Techniques

* line plots
* dot plots
* scatterplots
* heatmaps, vector fields
* treemaps
* node-link diagrams
  * directed graphs
  * undirected graphs
* techniques for large data
* software infrastructure for data visualization

## The how: mechanics

When we talk about *mechanics*, we mean the practical things
you will need to learn in order to create data visualizations. In this
course, we will use the web software stack. This means making
visualizations through web pages, using HTML, CSS, and Javascript. The
main domain-specific tool we'll learn is [d3](http://d3js.org).

The modern web stack is good, bad, and ugly. We will spend about
four weeks in this course learning how to use it to make 
visualizations.

In this course, we will handle data from many
different sources. As we will see, data is *dirty*: standard formats
are not really standard, sometimes there's missing information in
files, there's weird data points that don't belong (outliers),
etc.

We will learn to do basic *exploratory* analysis in data:
specifically, we will become comfortable with digging into a dataset
and playing around with it to see what's there. As we will see, data
cleaning makes for better visualization, and visualization also makes
for better data cleaning.

We will do one week of data cleaning and exploratory data analysis.

### List of Mechanics

* HTML, CSS, selectors
* Javascript
* SVG
* d3
  * Basics
  * Selections
  * Joins
  * Transitions
  * events
* Loading data, sorting data, filtering data
  * csv, json
* outliers, missing values, basic statistics


# Reading material

There is no required textbook for the course, but I strongly recommend
Tamara Munzner's book:

* Tamara Munzner,
  [Visualization Analysis and Design](http://www.cs.ubc.ca/~tmm/courses/533-11/book/).

This book is available for electronic checkout at the UA library, and
I have a copy I intend to keep in my office at all times, in case you
want to browse it before deciding to buy it. Other excellent books I
recommend include (again, ask me to take a look at them if you're
curious):

* William Cleveland, The Elements of Graphing Data
* William Cleveland, Visualizing Data
* John W. Tukey, Exploratory Data Analysis
* Edward Tufte, The Visual Display of Quantitative Information

If you want to dive deeper into visualization, you should have read,
at least once, the following books:

* Jacques Bertin, Semiology of Graphics
* Edward Tufte, Visual Explanations
* Edward Tufte, Envisioning Information
* Colin Ware, Information Visualization

For the practical portions of this course, Scott Murray's [Interactive
Data Visualization for the
Web](http://alignedleft.com/work/d3-book-2e) is excellent. The book
used to be freely available online but, alas, that's no longer the
case. However, if you're on campus, you should have access to an
electronic version of it on [O'Reilly Safari](http://www.jdoqocy.com/click-6754088-11290546?url=http%3A%2F%2Fshop.oreilly.com%2Fproduct%2F0636920037316.do%3Fcmp%3Daf-strata-books-video-product_cj_0636920037316_%25zp&cjsku=0636920037316).

Sometimes we will need additional reading.  When you're expected to
read material ahead of time, the material will be posted on the course
web page, and will be discussed in class.

# A tour of visualizations, good, bad, and ugly

By the end of this course, you will have the skills to create many of
these visualizations yourself, to tell whether they are a good or a
bad design, and *why*.

## The good

-
  [The Periodic Table](http://en.wikipedia.org/wiki/Periodic_table). You
  might not think of the Periodic Table as a good visualization. 
  It is nevertheless an *especially* good one, because of its brilliant spatial
  arrangement of elements in ways that make your eyes think for you:
  electron affinity up and to the right; metallic character down and
  to the left; etc.

- [The Upshot's Rent vs. Own calculator](http://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html?abt=0002&abg=0).

- [The Upshot's per-precinct election maps](http://www.nytimes.com/interactive/2014/11/04/upshot/senate-maps.html).

- [The Wind map](http://earth.nullschool.net/#2014/12/11/0900Z/wind/surface/level/orthographic=-115.81,34.51,1154).

- [Stop-and-Frisk decline in New York City](http://www.nytimes.com/interactive/2014/09/19/nyregion/stop-and-frisk-map.html).

- [America's Cup course in San Francisco](http://www.nytimes.com/interactive/2013/09/25/sports/americas-cup-course.html).

- [Gun deaths in the US](http://guns.periscopic.com/?year=2010).


## The bad, and the ugly

- [Smartphone buyers](http://viz.wtf/post/107998162170/6-7-gender-neutral).

- [A hairball](https://d148z92cppxlnu.cloudfront.net/wp-content/uploads/2012/02/ecoli_meta3_sm.png). We
  didn't have to go into this in class, but we'll learn in the
  Principles section why this is a terrible visualization, and in the
  Techniques section how to create something better.

- [Bad colormaps](https://twitter.com/_tessr/status/527639523610472449).

- [More bad colormaps](http://bl.ocks.org/mbostock/3290752)
([and how to fix them](http://bl.ocks.org/mbostock/3289530)).

- [A compendium of bad infographics and visualizations](http://viz.wtf/).

- [A non-periodic-table periodic table](http://visual.ly/periodic-table-figures-speech).

- [Obvious chart is obvious](http://viz.wtf/image/102816501562).


# Further reading, watching, etc.

- [Jonathan Corum's Visualized 2014 keynote](http://vimeo.com/101957416). See also
[this implementation](http://bl.ocks.org/mbostock/5415941) of the exoplanet visualization.

- Mike Bostock's [blocks collection](http://bl.ocks.org/mbostock).

## What's possible (if not easy) with today's web technology

- Mike Bostock's
[Visualizing Algorithms](http://bost.ocks.org/mike/algorithms/), for
fantastic examples of how to use visualization to understand
*behavior*, not *data*.

- Steven Wittens's
[how to fold a Julia fractal](http://acko.net/blog/how-to-fold-a-julia-fractal/),
for examples of how to use visualization to understand mathematics.

- Bret Victor's
[Up and Down the Ladder of Abstraction](http://worrydream.com/#!2/LadderOfAbstraction),
for ideas on how to use interaction *and* visualization to
understand behavior.

