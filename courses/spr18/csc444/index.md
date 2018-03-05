---
layout: bootstrap
title: CS444, Data Visualization
---

# Data Visualization

This is the course website for CS444, Data Visualization.

* Instructor: [Carlos Scheidegger](http://cscheid.net)
* TAs: Ashwin Srinivasan, Alex Yee (UGTA)
* class email:
  [cscheid+fall18csc444@cs.arizona.edu](mailto:cscheid+spr18csc444@cs.arizona.edu)
  *Use this email for urgent class-related questions and
  comments*. For content
  discussions, please use [Piazza](https://piazza.com/arizona/spring2018/csc444/home).
* Lectures: Tuesdays and Thursdays, 8:00-9:15AM, GS 906
* Office Hours (otherwise by appointment only)
  * Carlos: Tuesdays, 10:00-11AM, 1:00PM-2:00PM, GS734
  * Ashwin: Mondays, 2:00PM-3:30PM, GS 938
  * Alex: Thursdays, 9:30-11:00AM, GS 903

Welcome to CS444, Data Visualization. In this course, you will learn
how, and why, to create data visualizations.  Please read
[the syllabus](syllabus.html) carefully, and contact the instructor
should you have any questions about its content.

A "visualization" is simply a visual representation of an object of
our interest. It's *visual*: we consume them with our eyes, and so it
is essential that we know how our eyes work --- and, more importantly,
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

## [Assignments](assignments.html)

* [Assignment 1](assignment_1.html) (past due date)
* [Assignment 2](assignment_2.html) (past due date)
* [Assignment 3](assignment_3.html) (past due date)
* [Assignment 4](assignment_4.html) (past due date)
* [Assignment 5](assignment_5.html) (posted, due Feb 15th)
* [Assignment 6](assignment_6.html) (posted, due **Mar 1st**)
* [Assignment 7](assignment_7.html)
* [Assignment 8](assignment_8.html)
* [Assignment 9](assignment_9.html)
* [Assignment 10](assignment_10.html)
* [Assignment 11](assignment_11.html)

## Lectures

|------------|-------|------------------------------------------------------------------------|------------------------------------------------------------------------------|
|            | Date  | Topic                                                                  | Materials                                                                    |
|------------|-------|------------------------------------------------------------------------|------------------------------------------------------------------------------|
| Intro      | 01/11 | [Introduction](lectures/week1.html)                                    | [slides](slides/lecture%201.pdf)                                             |
|------------|-------|------------------------------------------------------------------------|------------------------------------------------------------------------------|
| Mechanics  | 01/16 | [HTML/CSS/SVG Basics](lectures/lecture2.html)                          | no slides                                                                    |
|            | 01/18 | [Javascript Basics](lectures/lecture3.html)                            | *[A2](assignment_2.html)* no slides                                          |
|            | 01/23 | [Javascript + DOM, SVG](lectures/lecture4.html)                        | no slides                                                                    |
|            | 01/25 | [d3 intro](lectures/lecture5.html)                                     | *[A3](assignment_3.html)* no slides                                          |
|            | 01/30 | [d3 joins and scales](lectures/lecture6.html)                          | no slides                                                                    |
|------------|-------|------------------------------------------------------------------------|------------------------------------------------------------------------------|
| Principles | 02/01 | [Color vision](lectures/lecture7.html)                                 | *[A4](assignment_4.html)* [slides](slides/color-spr18-csc444.pdf)            |
|            | 02/06 | [Color vision](lectures/lecture7.html)                                 | [slides](slides/color-2-spr18-csc444.pdf)                                    |
|            | 02/08 | [Other perceptual channels](lectures/lecture9.html)                    | *[A5](assignment_5.html)* [slides](slides/Other%20Channels%201.pdf)          |
|            | 02/15 | Other perceptual channels                                              | *[A6](assignment_6.html)* [slides](slides/other-channels-2-spr18-csc444.pdf) |
|            | 02/22 | Interaction                                                            | [slides](slides/interaction.pdf)                                             |
|            | 02/27 | Design Criticism, Algebraic Design                                     | [slides](slides/algebraic-process-spr18-csc444.pdf)                          |
|------------|-------|------------------------------------------------------------------------|------------------------------------------------------------------------------|
| Techniques | 03/01 | [Basic Spatial Arrangements](lectures/basic_spatial_arrangements.html) | [slides](slides/basic%20spatial%20arrangements.pdf)                          |
|            |       | cont'd.                                                                |                                                                              |
|            |       | [High-Dimensional Data](lectures/lecture15.html)                       | [slides](slides/Dimensionality%20Reduction.pdf)                              |
|            |       | High-Dimensional Data                                                  |                                                                              |
|------------|-------|------------------------------------------------------------------------|------------------------------------------------------------------------------|
| Review     |       | [Review](lectures/lecture17.html)                                      | [slides](slides/midterm%20review.pdf)                                        |
|------------|-------|------------------------------------------------------------------------|------------------------------------------------------------------------------|
|            |       | MIDTERM                                                                |                                                                              |
|            |       | Catchup                                                                |                                                                              |
|            |       | [Hierarchies](lectures/lecture18.html)                                 | [slides](slides/Hierarchies.pdf)                                             |
|            |       | Graphs                                                                 | [slides](slides/Graphs.pdf)                                                  |
|            |       | Graphs+Spatial Data                                                    | [slides](slides/spatial_data.pdf)                                            |
|            |       | Spatial Data                                                           | [slides](slides/spatial_data.pdf), [slides 2](slides/spatial_data_2.pdf)     |
|            |       | Spatial Data                                                           | [slides 2](slides/spatial_data_2.pdf)                                        |
|------------|-------|------------------------------------------------------------------------|------------------------------------------------------------------------------|
| Topics     |       | Cartography                                                            | [slides](slides/cartography.pdf)                                             |
|            |       | Large Data                                                             | [slides](slides/large%20data.pdf)                                            |
|            |       | Thanksgiving, no class                                                 |                                                                              |
|            |       | [Putting it all together](lectures/lecture25.html)                     |                                                                              |
|            |       | [The Human Side of Data](lectures/lecture26.html)                      |                                                                              |
|            |       | Retrospective, Review                                                  | [slides](slides/retrospective.pdf)                                           |
|------------|-------|------------------------------------------------------------------------|------------------------------------------------------------------------------|

## Resources

* Index of in-class [quizzes](quizzes/).
* [d3 scale playground](/projects/d3-scale-playground)

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
* Algebraic Design Process
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

## Planned material

### Mechanics

* [Week 2, HTML/CSS/SVG Basics (spr 2015 material)](../../spr15/cs444/lectures/week2.html).
* [Week 3, JavaScript Basics (spr 2015 material)](../../spr15/cs444/lectures/week3.html).
* [Week 3b, JavaScript for simple visualizations (spr 2015 material)](../../spr15/cs444/lectures/week3b.html).
* [Week 4, Odds and Ends (spr 2015 material)](../../spr15/cs444/lectures/week4.html): JavaScript Events, AJAX, HTTP.
* [Week 4b, Introduction to d3 (spr 2015 material)](../../spr15/cs444/lectures/week4b.html)
* [Week 5, d3 selections and joins (spr 2015 material)](../../spr15/cs444/lectures/week5.html)

### Principles

* [Principles: Color (spr 2015 material)](../../spr15/cs444/lectures/week6b.html).
* [Principles: Other Channels (spr 2015 material)](../../spr15/cs444/lectures/week7b.html).
* [Principles: Preattentiveness, Gestalt (spr 2015 material)](../../spr15/cs444/lectures/week8.html).
* [Principles: Interaction, Filtering, Aggregation (spr 2015 material)](../../spr15/cs444/lectures/week8b.html).
