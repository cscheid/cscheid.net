---
layout: bootstrap
title: CSC580, Principles of Machine Learning
---

# Principles of Machine Learning

This is the course website for CSC580, Principles of Machine Learning.

* Instructor: [Carlos Scheidegger](http://cscheid.net)
* [Piazza](https://piazza.com/class/k5pgep4orjm7ae?cid=8)
* class email:
  [cscheid+spr20csc580@cs.arizona.edu](mailto:cscheid+spring2020csc580@cs.arizona.edu)
  *Use this email for urgent class-related questions and
  comments*. For content
  discussions, please use [Piazza](https://piazza.com/arizona/spring2020/csc580/home).
* Lectures: Mondays and Wednesdays, 9:30-10:45, GS 701.
* Office Hours (otherwise by appointment only)
  * Carlos Scheidegger: Wednesdays, 3:00PM-5:00PM, GS 734
* Materials
  * [Syllabus](syllabus.html)
  * Slides
	* [intro](slides/csc580-spring-2020-intro.pdf)
    * [decision trees](slides/csc580-spring-2020-decision-trees.pdf)
	* [limits of learning](slides/csc580-spring-2020-limits-of-learning.pdf)
  * [Lecture Notes](../principles-of-ml/notes/index.html)
  * [In-class notes](lectures/index.html)
  * Remote Teaching Materials
    * 2020-03-16 [notes](/to/csc580-2020-03-16-notes.html), [slides](/to/csc580-2020-03-16-slides.html), [whiteboard](/to/csc580-2020-03-16-whiteboard.html)
    * 2020-03-18 [notes](/to/csc580-2020-03-18-notes.html), [slides](/to/csc580-2020-03-18-slides.html), [whiteboard](/to/csc580-2020-03-18-whiteboard.html)
    * 2020-03-23 [notes](/to/csc580-2020-03-23-notes.html), [slides](/to/csc580-2020-03-23-slides.html), [whiteboard](/to/csc580-2020-03-23-whiteboard.html)
    * 2020-03-25 [notes](/to/csc580-2020-03-25-notes.html), [slides](/to/csc580-2020-03-25-slides.html), [whiteboard](/to/csc580-2020-03-25-whiteboard.html)
    * 2020-03-30 [notes](/to/csc580-2020-03-30-notes.html), [slides](/to/csc580-2020-03-30-slides.html), [whiteboard](/to/csc580-2020-03-30-whiteboard.html)
    * 2020-04-01 [notes](/to/csc580-2020-04-01-notes.html), [slides](/to/csc580-2020-04-01-slides.html), [whiteboard](/to/csc580-2020-04-01-whiteboard.html)
    * 2020-04-06 [notes](/to/csc580-2020-04-06-notes.html), [slides](/to/csc580-2020-04-06-slides.html), [whiteboard](/to/csc580-2020-04-06-whiteboard.html)
    * 2020-04-08 [notes](/to/csc580-2020-04-08-notes.html), [slides](/to/csc580-2020-04-08-slides.html), [whiteboard](/to/csc580-2020-04-08-whiteboard.html)
    * 2020-04-13 [notes](/to/csc580-2020-04-13-notes.html), [slides](/to/csc580-2020-04-13-slides.html), [whiteboard](/to/csc580-2020-04-13-whiteboard.html)
* Assignments
  * [Assignment 1](assignments/assignment-1.html)
  * [Assignment 2](assignments/assignment-2.html)
  * [Assignment 3](assignments/assignment-3.html)
  * [Assignment 4](assignments/assignment-4.html)
  * [Assignment 5](assignments/assignment-5.html)
  * [Assignment 6](assignments/assignment-6.html)
  * [Assignment 7](assignments/assignment-7.html)
  
## 2019 Coronavirus mitigation

The University of Arizona is moving from in-person instruction to
remote instruction as part of the COVID-19 mitigation efforts.

Specifically, this will impact CSC580 in the following ways:

* March 16th classes are canceled
* Starting on March 18th, we will be having all of our class meetings
  on zoom.us. I have been contacting students on Piazza and D2L
  directly. If you haven't received these emails, please contact me
  ASAP.
* The midterm and final exams have been replaced with take-home
  exams. These changes are now reflected on the course syllabus.

## Recommendation Letters

Yes, I can write you a letter, but I will not write a letter for you
simply based on your course performance: transcripts are already good
indicators of course performance. If you intend me to write a letter
because of a course I taught you, you need to talk to me at the
beginning of the semester (in this specific case, before the end of
January 2020), and you should read [this section on my advice
page](/advice/students.html#recommendation-letters).

## Rationale and description

This course will provide the necessary background in machine learning
for graduate students to be able to use modern machine-learning
methods in their research. Machine Learning has become the preferred
method for creating programs that must work with noisy data, or for
which it is easier to obtain examples of the desired program behavior
(training data) than it is to directly write a program that achieves
the desired behavior.

It’s now common to see machine learning being used throughout Computer
Science, including areas not traditionally considered to be amenable
to data-driven methods such as human-computer interaction, data
structures, and software systems. As a result, students who do not
have a firm grasp of the potential (and pitfalls and limitations) of
machine learning may have a limited ability to understand some of the
current research in their own fields.

Students will learn why machine learning is a fundamentally different
way of writing computer programs, and why this approach is often a
uniquely attractive way of solving practical problems. Machine
learning is all about automatic ways for computers to find patterns in
datasets; students will learn both advantages and unique risks that
this approach offers. They will learn the fundamental computational
methods, algorithms, and perspectives which underlie current machine
learning methods, and how to derive and implement many of them.

Students will learn the fundamentals of unsupervised and supervised
machine learning methods, the computational and quality tradeoffs
between different methods, and how to adapt existing methods to fit
their own research needs.

## Prerequisites

A strong background in linear algebra and calculus is
necessary. Students will be expected to understand and construct
arguments based on the relationship between matrices and linear
transformations, and the interpretation of inner products as
projections onto subspaces. We will at times refer to ideas in
statistics, probability, and optimization. Students will also need a
good amount of programming experience and maturity.

Programming assignments will be in Python, and will make heavy use of
Python’s ubiquitous linear algebra and scientific computing libraries
(numpy and scipy).

The textbook will be Hal Daumé’s [Course in Machine Learning](http://ciml.info), and some content from Bishop’s
[Pattern Recognition and Machine Learning](https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf).

## Coursework

The course will have a heavy assignment load: there are many concepts to cover. There are 11 total assignments (in both writing and programming forms), in addition to a written midterm and written final, and a comprehensive project.

The grading of the course is heavily weighted towards assignments and projects:

* Assignments: 50%
  * Programming Assignments: 35%
  * Written Assignments: 15%
* Project: 15%
* Midterm: 15%
* Final: 20%

Content the course will not cover in detail:

* the Bayesian and probabilistic view of machine learning - CSC has a great Probabilistic Graphical Models course already
* Extended discussion of applications (natural language, computer vision, health care, etc), or existing frameworks for machine learning (scikit-learn, TensorFlow, torch, etc). There are other excellent courses on campus that cover these in detail. The goal of this course is to provide fundamentals in the uniquely computational aspects of machine learning to enable students to conduct research in their own field.
* Sequential learning, reinforcement learning - we expect this to be covered by other future offerings
* Extended discussion on ML theory, either from a statistical perspective or a computational learning theory perspective - the statistical perspective is offered by MATH574 and MIS601


## Course syllabus

The full course syllabus is available [here](syllabus.html), and should
be considered the authoritative source of information about the course
offering and assessment.

## Materials

* [intro](slides/csc580-spring-2020-intro.pdf) (slides)
* [decision trees](slides/csc580-spring-2020-decision-trees.pdf) (slides)
* [limits of learning](slides/csc580-spring-2020-limits-of-learning.pdf) (slides)
* [nearest-neighbor methods](/courses/principles-of-ml/notes/nearest-neighbors.html) (notes)
* [high-dimensional geometry](/courses/principles-of-ml/notes/high-dimensional-geometry.html) (notes)

<!-- * Lecture 3: nearest neighbors -->
<!-- * Lecture 4: high-dimensional data -->

## Assignments

* [Assignment 1](assignments/assignment-1.html)
* [Assignment 2](assignments/assignment-2.html)
* [Assignment 3](assignments/assignment-3.html)
* [Assignment 4](assignments/assignment-4.html)
* [Assignment 5](assignments/assignment-5.html)
<!-- * [Assignment 6](assignments/assignment-6.html) -->
<!-- * [Assignment 7](assignments/assignment-7.html) -->
<!-- * [Assignment 9](assignments/assignment-9.html) -->

## Info

Other useful courses:

* [Other ML courses at Arizona](http://ml.arizona.edu)
* Advanced Linear Algebra for Data Science: MATH 496T (577-01), Harvill
318, T Th 11:00AM-12:15PM.

