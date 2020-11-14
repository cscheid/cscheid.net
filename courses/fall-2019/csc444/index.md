---
layout: bootstrap
title: CS444, Data Visualization
---

# Data Visualization

This is the course website for CS444, Data Visualization.

* Instructor: [Carlos Scheidegger](http://cscheid.net)
* TA: [Jordan Siaha](jordansiaha@email.arizona.edu)
* class email:
  [cscheid+fall19csc444@cs.arizona.edu](mailto:cscheid+fall19csc444@cs.arizona.edu)
  *Use this email for urgent class-related questions and
  comments*. For content
  discussions, please use [Piazza](https://piazza.com/arizona/fall2019/csc444).
* Lectures: Tuesdays and Thursdays, 12:30-1:45PM, GS906
* Office Hours (otherwise by appointment only)
  * Carlos Scheidegger: Tuesdays, 2:00PM-4:00PM, GS734
  * Jordan Siaha: Wednesdays, 2:00-3:00PM, GS934

Welcome to CSC444, Data Visualization. In this course, you will learn
how, and why, to create data visualizations.  Please read
[the syllabus](syllabus.html) carefully, and contact the instructor
should you have any questions about its content.

A "visualization" is simply a visual representation of an object of
our interest. It's *visual*: we consume them with our eyes, and so it
is essential that we learn how our eyes work --- and, more importantly,
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


# Course syllabus

The syllabus for the course is available [here](syllabus.html).

# Class materials

* [Assignment 1](assignment_1.html) (past due)
* [Assignment 2](assignment_2.html) (past due)
* [Assignment 3](assignment_3.html) (past due)
* [Assignment 4](assignment_4.html) (past due)
* [Assignment 5](assignment_5.html) (past due)
* [Assignment 6](assignment_6.html) (past due)
* [Assignment 7](assignment_7.html) (past due)
* [Assignment 8](assignment_8.html) (past due)
* [Assignment 9](assignment_9.html) (past due)
* [Assignment 10](assignment_10.html) (due 2019-12-10 11:59PM)
* [Assignment 11](assignment_11.html) (posted)

## Lectures

|------------|------|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
|            | Date | Topic                                                                  | Materials                                                                                                                                   |
|------------|------|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Intro      |      | [Introduction](lectures/lecture1.html)                                 | *[A1](assignment_1.html)* [slides](slides/lecture-1.pdf)                                                                                    |
|------------|------|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Mechanics  |      | [HTML/CSS/SVG Basics](lectures/lecture2.html)                          | no slides                                                                                                                                   |
|            |      | [Javascript Basics](lectures/lecture3.html)                            | *[A2](assignment_2.html)* no slides                                                                                                         |
|            |      | [Javascript + DOM, SVG](lectures/lecture4.html)                        | no slides                                                                                                                                   |
|            |      | [d3 intro](lectures/lecture5.html)                                     | *[A3](assignment_3.html)* no slides                                                                                                         |
|            |      | [d3 joins and scales](lectures/lecture6.html)                          | no slides                                                                                                                                   |
|------------|------|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Principles |      | [Color vision](lectures/lecture7.html)                                 | [slides](slides/color-fall-2019-csc444.pdf)                                                                                                 |
|            |      | [Color vision](lectures/lecture7.html)                                 | [slides](slides/color-2-fall-2019-csc444.pdf)                                                                                               
|            |      | [Other perceptual channels](lectures/lecture9.html)                    | [slides](slides/other-channels-fall-2019-csc444.pdf)                                                                         |
|            |      | Other perceptual channels                                              | [slides](slides/other-channels-2-fall-2019-csc444.pdf)                                                                                          |
|            |      | Interaction                                                            | [slides](slides/interaction-fal18-csc444.pdf)                                                                     |
|------------|------|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Techniques | 10/10 | [Basic Spatial Arrangements](lectures/basic_spatial_arrangements.html) | [slides](slides/basic%20spatial%20arrangements.pdf)                                                               |
|            |      | cont'd.                                                                |                                                                                                                                             |
|            |      | High-Dimensional Data                                                  | [slides](slides/Dimensionality%20Reduction.pdf) [Dimensionality Reduction Lecture Notes](/courses/data-visualization/lectures/dimensionality-reduction/), [longer MDS article](/writing/data_science/mds.html) [PCA article](/writing/data_science/pca.html) |
|            |      | Review                                                                 | [slides](slides/midterm-review-fall-2019-csc444.pdf)                                                                                            |
|            | 10/22 | MIDTERM                                                                |                                                                                                                                             |
|            |      | Hierarchies                                                            | [slides](slides/hierarchies-csc444-fall-2019.pdf)                                                                                                            |
|            |      | Graphs                                                                 | [slides](slides/graphs-fall-2019-csc444.pdf)                                                                                                    |
|            |      | Spatial Data                                                           | [slides](slides/spatial-data-fall-2019-csc444.pdf)                                                                                                           |
|            |      | Spatial Data                                                           | [slides](slides/spatial-data-fall-2019-csc444.pdf)                                                                    |
|            |      | Spatial Data                                                           | [slides 2](slides/spatial-data-2-fall-2019-csc444.pdf)  [ODE article](/writing/data_science/odes/index.html)                                |
|------------|------|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Topics     |      | Cartography                                                            | [slides](slides/cartography-fall-2019-csc444.pdf)                                                                                                            |
|            |      | The Human Side of Data                                                 | [slides](slides/human-side-of-data-fal18-csc444.pdf)                                                                                        |
|            |      | Retrospective, Review                                                  | [slides](slides/retrospective-fall-2019-csc444.pdf)                                                                                                          |
|------------|------|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|

## Resources

* Index of in-class [quizzes](quizzes/).
* [d3 scale playground](/projects/d3-scale-playground)
* [d3 drills](/projects/d3-drills/)

## Schedule

### Mechanics

* the web browser as a dev environment; HTML; CSS
* DOM, SVG
* Javascript basics
* Higher-order Javascript
* d3 intro
* d3 selections, joins
* d3 scales, transitions

### Principles

* Color Vision 1
* Color Vision 2
* Bivariate colormaps, other perceptual channels,
  Cleveland/McGill, Separable-Integral channels, Mackinlay's APT.
* Pre-attentiveness, Gestalt, higher-level channels
* Interaction, Filtering, Aggregation
* Design criticism

### Techniques

* Line Plots, Dot Plots, Scatterplots, Small multiples
* Linear Algebra review, PCA							
* MDS, Other dimensionality reduction 2
* Trees, Graphs, Hierarchies 1/2
* Trees, Graphs, Hierarchies 2/2
* Spatial Data 1/2: heatmaps, contour plots, vector fields
* Spatial Data 2/2: heatmaps, contour plots, vector fields
* Methods for large data; binning, sampling
* Uncertainty/Probabilistic Data
