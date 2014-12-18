---
layout: bootstrap
title: Week 1, Getting Started
---

# CS444/544: Data Visualization

Welcome to CS444/CS544, Data Visualization. In this course, you will
learn how, and why, to create data visualizations.

Pay attention to this document: it serves as the syllabus for the
course.

Good data visualization involves a unique mix of human
psychology, mathematics, and computer science. This makes our subject
uniquely challenging: sometimes the physiology of our eyes stands in
way of applying some beautiful result from computer science. Sometimes
it's the other way around: something deep about the math in the data
will help guide the design process and let us make a beautiful,
informative, and true picture.

The content of the course is split roughly in three distinct aspects:
mechanics, principles, and techniques.

# Content

## The why: principles

Data visualization itself has existed for about 200 years; Playfair,
Nightingale, Minard. Statistics in the 1900s, computers in the
1950s. From the 1960s on, we started to realize that some things in
visualization work better than others, and around 1980 scientists
started seriously studying the effectiveness of data visualization as
a medium itself. This program goes on to this day. 
To give a few examples, we know that using *positions* works better than
using *angles*; we know that using *length* works better than using
*area*. We know that, in some cases, using *color intensity* works
better than *color hue* (and that in other cases, it's the other way
around).

We also know, since the 1960s, that *interaction* is a powerful
idea. Back then people interacted with a data visualization by
carefully rearranging bits of paper (no supercomputers in our pockets
yet!), but many of the original thoughts are still valid. We will
learn the basics of interactive visualizations.

Although much of what we know is finicky and specific, we do have some
general principles. We will spend about four weeks studying these
principles.

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
the remaining time of the course material going over existing
techniques, and what kinds of data they apply to.

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

## The how: mechanics

When we talk about *mechanics*, we mean the practical, grungy things
you will need to learn in order to create data visualizations. In this
course, we will be using the web software stack. This means making
visualizations through web pages, using HTML, CSS, and Javascript. The
main domain-specific tool we'll have to learn is [d3](http://d3js.org).

The modern web stack is good, bad, and ugly, and we will spend about
two weeks in this course learning how to use it to make 
visualizations.

In this course, we will (of course) be dealing with data from many
different sources. As we will see, data is *dirty*: standard formats
are not really standard, sometimes there's missing information in
files, there's weird data points that don't belong (outliers), etc.

We will learn to do basic *exploratory* analysis in data:
specifically, we will become comfortable with digging into a dataset
and playing around with it to see what's there. As we will see, data
cleaning makes for better visualization, and visualization also makes
for better data cleaning.

We will do one week of data cleaning and exploratory data analysis.

### List of Mechanics

* basics of HTML, CSS, selectors
* basics of Javascript
* basics of SVG
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

There is no required textbook for the course, but that's mostly
because the textbook I wanted to use for the course was published
after the university bookstore deadline. I strongly recommend Tamara
Munzner's book:

* Tamara Munzner,
  [Visualization Analysis and Design](http://www.cs.ubc.ca/~tmm/courses/533-11/book/).
  
I have a copy I intend to keep in my office at all times, in case you
want to browse it before deciding to buy it. Other excellent books I
recommend include (again, ask me to take a look at them if you're
curious):

* William Cleveland, The Elements of Graphing Data
* William Cleveland, Visualizing Data
* John W. Tukey, Exploratory Data Analysis

If you want to dive deeper into visualization, you should have read,
at least once, the following books:

* Jacques Bertin, Semiology of Graphics
* Edward Tufte, The Visual Display of Quantitative Information
* Edward Tufte, Visual Explanations
* Edward Tufte, Envisioning Information
* Colin Ware, Information Visualization

We will also be reading some web pages and some research papers
(especially CS544 students). When you're expected to read material
ahead of time, the material will be posted on the course web page, and
will be discussed in class.

# Assessment

Assessment of your performance in this course will be done mostly
through projects. There will be a large number of small assignments,
(about one per week for a total of 10-12 small assignments), which
should take you less than two hours of time to complete. 
There will be one midterm, and one final project. In other
words, there is no final exam in this course.

The final project can be done in teams. There's no minimum or maximum
group size, as long as you tell me ahead of time and I am ok with
it. I will adjust the grading expectations accordingly, and I don't
expect to allow groups larger than three unless there's a good reason.
	
The differences in assessment for students taking the class at
the 444 level vs. the 544 level will be: 

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
demonstration of the concept we discussed and a short explanation (no
more than a paragraph or two).

Assignments will be posted on thursdays, and will be due on the
following thursday at the time class starts. My office hours will be
tuesday morning, and there will be no office hours on wednesday and
thursday morning. This is so that I can use the tuesday lecture to
talk about issues with the previous assignment, and to force you to
get started more than 24 minutes (ahem, hours) before the deadline.

## Midterm

The midterm will be given, tentatively, on the eight week of the
course. By then we will have been through the Mechanics, and some of
the Principles. The midterm will be a closed-books exam which I'm
calibrating so that you can finish in one hour.

## Final project

TBD.

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

Curve grading: 

* 15th percentile or better: A; 
* 30th percentile or better: B; 
* 45th percentile or better: C; 
* 60th percentile or better: D;
* below 60th percentile: F.

In other words, for you to get an A, you need to *either* score 90%
average or better in the overall performance, or be in the top 15% of
the class. If you get an F, you will have been in the bottom 40%
of the class, *and* in the bottom 40% of the performance.

By dropout day, you will have more than 40% of your total weight.

## Plagiarism and open-source software

We will use a lot of existing libraries in this course. This is good
sense, and good practice: most programming nowadays is much more about
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
yourself* is not allowed, either. You need to get in the habit of
giving sources the proper attribution, and this course will be a great
opportunity for that.

In other words, plagiarism is cheating, and I will treat is as such.
The penalty for cheating and plagiarism always includes a referral to
the college, and ranges from an automatic zero in the assignment, to a
failing grade in the course, up to potential expulsion from the
university.

## Incomplete policy

TBD.

# A tour of visualizations, good, bad, and ugly

By the end of this course, you will have the skills to create
these visualizations yourself:

TBF.
