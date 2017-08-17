---
layout: bootstrap
title: Week 1, Getting Started
---

# CSC 544: Data Visualization

Welcome to CSC 544, Data Visualization. In this course, you will
learn how, and why, to create data visualizations. Pay attention to
this document: *it serves as the syllabus for the course*.

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

Although there are no specific prerequisites to this regard, we will
write most of our code using the web stack. This means we are
targeting modern web browsers, and writing our programs in a
combination of HTML, CSS, and Javascript. If you don't know these
technologies, you will be expected to learn them.

# Content

## The why: principles (5-7 weeks)

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
carefully rearranging bits of paper (no supercomputers in our pockets
yet!), but many of the original thoughts are still valid. We will
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

## The what: techniques (7-9 weeks)

In comparison to the relative paucity of principles, data
visualization has an *enormity* of existing techniques. We will spend
about six weeks  this course going over existing
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

* Basics
  * line plots
  * dot plots
  * scatterplots
* Scalar field visualization
  * 2D: heatmaps, choropleths, isosurfaces, vector fields
  * 3D: isosurfaces and volume rendering
* Hierarchies
  * treemaps
  * node-link diagrams
    * directed graphs
    * undirected graphs
* techniques for large data
  * Aggregation, sampling
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

There is no required textbook for the course, and all of the necessary
material will be available in slides and lecture notes, but Tamara
Munzner's book is really good reading if you're interested in
visualization. 

* Tamara Munzner,
  [Visualization Analysis and Design](http://www.cs.ubc.ca/~tmm/courses/533-11/book/).
  
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

We will also be reading some web pages and some research papers. When
you're expected to read material ahead of time, the material will be
posted on the course web page, and will be discussed in class.

# Discussion Fora

Offline student discussion is encouraged and welcome, as long as it does not involve
sharing of assignment source code (see the
[Academic Conduct](#academic-conduct-plagiarism-and-open-source-software)
section below). Discussion on the
[Piazza](https://piazza.com/arizona/spring2015/cs444544/home) site is
especially encouraged, since we can monitor it and will count towards
class participation.

# Assessment

Assessment of your performance in this course will be done mostly
through projects. There will be a large number of small assignments,
(about one per week for a total of 10-12 small assignments), which
should each take you less two to five hours to complete.
There will be one midterm, and one final project. In other
words, there is no final exam in this course.

- the expected scope of the final project; 544 students will have more
  open-ended projects, and will be expected to implement techniques
  closer to the state of the art. (If you'd like to do research with
  me in the future, let me know ahead of time and we will design a
  project that makes sense for us)

- some of the additional reading material that is entirely optional
  for 444 students will be required for 544 students. This will be,
  mostly, research papers. When this happens, 544 students will be
  asked to submit a short summary of the paper. I'll be using this,
  for example, to gauge your interest for your final projects.

## Small Assignments

Small assignments will test whether you understood the concepts
discussed in that particular week, and will be small and
self-contained. You'll submit a webpage, typically, with a
demonstration of the concept we discussed and a short explanation.

Assignments will be posted on Wednesdays, and will be due on the
following Wednesday at the time class starts. There will be no office
hours on tuesday and wednesday. This is so that I can use the tuesday
lecture to talk about issues with the previous assignment, and to
nudge you to get started more than 24 minutes (ahem, hours) before the
deadline.

## Midterm

The midterm will be given, tentatively, on the eight week of the
course. By then we will have been through the Mechanics, and some of
the Principles. The midterm will be a closed-books exam which I'm
calibrating so that you can finish in one hour.

## Final project

For the final project, you will do either of the following

- build one larger visualization of your own choosing, using the
  mechanics, principles and techniques you learn in this course, and
  will be graded to the extent in which your visualization respects
  these. Each student can expect to spend about as much time on the
  final project as they will on all assignments, combined.

- work on a research-oriented project of your own choosing, as long as
it:

  1) involves visualization

  2) is a concrete and significant step towards a research paper,
  either about using data visualization in your area of research, or a
  visualization research paper itself.

A successful final project does not have to be a finished paper
(although if you *do* finish a solid manuscript, you're essentially
guaranteed an A), but the clearer it is how to take what you have and
turn it into a reasonable submission to a workshop, conference, or
journal, the better.


## Grading

I will grade your assignments, midterms, and final project on a scale
from 0 to 100, with respective weights of 50%, 20% and 30%. 
In addition, I will give class participation 10% weight. This will
give you a score from 0 to 110. Your final grade in the course of be
the *best* of a per-class grading curve and overall performance:

Overall performance: 

* 90% or better: A;
* 75% or better: B;
* 60% or better: C;
* 40% or better: D;
* below 40%: F.

By your last day to withdraw, you will know more than 40% of your
grade by weight.

Grades for assignments, midterm and final project will be posted on
D2L as soon as we have them.

## Academic conduct, plagiarism, and open-source software

We will use a lot of existing libraries in this course. This is good
sense, and good practice: much programming nowadays is more about
finding the right set of libraries and learning how to combine them
usefully than it is about designing new libraries from scratch. As a
general rule, you are allowed to use any open source library you want
in your assignments and projects, provided that *you give them
credit*. For some assignments, learning how a particular
implementation works is the entire point. In that case, I will make it
clear that the implementation needs to be yours, and I will explicitly
tell you that you are not allowed to search online for
answers. [Ignore this warning at your peril.](http://briankrausz.com/how-to-catch-a-cheater/)

If you take an existing, however small, piece of code from elsewhere,
use it in your coursework, and do not give attribution, this is
plagiarism. Plagiarizing from classmates is not allowed, plagiarizing
from sources on the web is not allowed, and plagiarizing *from
yourself* is not allowed, either. In other words, I want to know how
much of the code you turn in was written for this assignment in
particular. It's ok if it only took 15 lines of code, and it's ok if
takes 500. 

In other words, *plagiarism is cheating*, and I will treat is as such.
The penalty for cheating and plagiarism always includes a referral to
the college, and ranges from an automatic zero in the assignment, to a
failing grade in the course, up to potential expulsion from the
university.

The main point is I want you to get in the habit of giving
sources the proper attribution, and this course will be a great
opportunity for that.

## Incomplete policy

I only give incomplete grades with extenuating circumstances, and only
on a case-by-case scenario. By the time I give you an incomplete
grade, we will both have agreed on what exactly you need to finish,
and by what time (I expect will you to have completed
everything necessary before the end of summer).

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

