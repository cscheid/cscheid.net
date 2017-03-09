---
layout: bootstrap
title: CS444, Data Visualization
---

# Data Visualization

This is the course website for CS444, Data Visualization.

* Instructor: [Carlos Scheidegger](http://cscheid.net)
* TA: Youhao Wei
* class email:
  [fall16cs444@cs.arizona.edu](mailto:fall16cs444@cs.arizona.edu)
  *Use this email for urgent class-related questions and
  comments*. It will reach both Youhao and Carlos. For content
  discussions, please use [Piazza](http://piazza.com/arizona/fall2016/cs444/).
* Lectures: Tuesdays and Thursdays, 9:30AM-10:45AM, GS906
* Office Hours
  * Carlos: Tuesdays, 1:00PM-3:30PM, GS734. Otherwise by appointment
  only.
  * Youhao: Tuesdays, 12:30AM-1:30PM, Fridays 11AM-12PM.

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

* [Assignment 1](assignment_1.html) (past due, grades reported)
* [Assignment 2](assignment_2.html) (past due, grades reported)
* [Assignment 3](assignment_3.html) (past due, grades reported)
* [Assignment 4](assignment_4.html) (past due, grades reported)
* [Assignment 5](assignment_5.html) (past due, grades reported)
* [Assignment 6](assignment_6.html) (past due, grades reported)
* [Assignment 7](assignment_7.html) (past due, grades reported)
* [Assignment 8](assignment_8.html) (past due, grades reported)
* [Assignment 9](assignment_9.html) (past due, grades reported)
* [Assignment 10](assignment_10.html) (past due, grades reported)
* [Assignment 11](assignment_11.html) (**posted**)

## Lectures

|----|---|-----|----|
|Intro | Aug 23 | [Introduction](lectures/week1.html) | [slides](slides/lecture%201.pdf) |
|----|---|-----|----|
| Mechanics | Aug 25 | [HTML/CSS/SVG Basics](lectures/lecture2.html) | no slides |
|           | Aug 30 | [Javascript Basics](lectures/lecture3.html) | no slides |
|           | Sep  1 | [Javascript + DOM, SVG](lectures/lecture4.html) | no slides |
|           | Sep  6 | [d3 intro](lectures/lecture5.html) | no slides |
|           | Sep  8 | [d3 joins and scales](lectures/lecture6.html) | no slides |
|----|---|-----|----|
| Principles | Sep 13 | [Color vision](lectures/lecture7.html) | [slides](slides/Color%20Fal16.pdf) |
|            | Sep 15 | [Color vision](lectures/lecture8.html) | [slides](slides/Color%202%20Fal16.pdf) |
|            | Sep 20 | [Other perceptual channels](lectures/lecture9.html) | [slides](slides/Other%20Channels%201.pdf) |
|            |  | Assignment 3 discussion | |
|            | Sep 22 | [Other perceptual channels](lectures/lecture10.html) | [slides](slides/Other%20Channels%202.pdf) |
|            | Sep 27 | Assignment 4 discussion | |
|            |        | [Interaction](lectures/lecture11.html) | [slides](slides/interaction.pdf) |
|            | Sep 29 | [Design Criticism, Algebraic Design](lectures/lecture12.html) | [slides](slides/algebraic_design.pdf) |
|----|---|-----|----|
| Techniques | Oct 4 | [Basic Spatial Arrangements](lectures/lecture13.html) | [slides](slides/basic%20spatial%20arrangements.pdf) |
|            | Oct 6 | cont'd. | |
|            | Oct 11 | [High-Dimensional Data](lectures/lecture15.html) | [slides](slides/Dimensionality%20Reduction.pdf) |
|            | Oct 13 | High-Dimensional Data | |
|----|---|-----|----|
| Review | Oct 20 | [Review](lectures/lecture17.html) | [slides](slides/midterm%20review.pdf) |
|----|---|-----|----|
|        | Oct 25 | MIDTERM | 
|        | Oct 27 | Class canceled (VIS 2016) | 
|        | Nov 1st | [Hierarchies](lectures/lecture18.html) | [slides](slides/Hierarchies.pdf) |
|        | Nov 3rd | Graphs | [slides](slides/Graphs.pdf) |
|        | Nov 8th | Graphs+Spatial Data| [slides](slides/spatial_data.pdf) |
|        | Nov 10th | Spatial Data | [slides](slides/spatial_data.pdf), [slides 2](slides/spatial_data_2.pdf)|
|        | Nov 15th | Spatial Data | [slides 2](slides/spatial_data_2.pdf) |
|----|---|-----|----|
| Topics | Nov 17th | Cartography | [slides](slides/cartography.pdf) |
|        | Nov 22nd | Large Data | [slides](slides/large%20data.pdf) |
|        | Nov 24th | Thanksgiving, no class |  |
|        | Nov 29th | [Putting it all together](lectures/lecture25.html) |  |
|        | Dec 1st  | [The Human Side of Data](lectures/lecture26.html) |  |
|        | Dec 6th  | Retrospective, Review | [slides](slides/retrospective.pdf) |
|----|---|-----|----|

## Planned schedule

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
