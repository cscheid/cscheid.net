---
layout: bootstrap
title: Syllabus for CS 630, Spr 2017
---

# CSC 630: Computational Data Science

* Location: GS 906
* Times: Tuesdays and Thursdays, 9:30AM-10:45AM
* Discussion: [Piazza](http://piazza.com/arizona/fall2016/cs444/).

## Description of Course

In this course, we will study the theory and practice of **data
science** from a computational perspective. Since data sources are
becoming ever larger and more complex, computer scientists have spent
a lot of time designing techniques to process it effectively. We can
use data to understand the world, to make predictions about it, and to
act on it.

This course will provide you computational principles to enable you to
understand and implement techniques in data mining, machine learning,
data visualization, computer vision, etc. 

On the theoretical side, we will study the how computer science lets
us uniquely combine geometry and algorithms to make sense of data sets
both small and large. We will study a small number of principles that
can applied broad

On the practical side, we will study the consequences of using
automated, data-driven decision making. 



## Covered Material

### The Computational Theory of Data Science

* Optimization in vector spaces: many data-processing problems can be
  described as finding the **best vector** in a vector space, for
  varying definitions of "vector" and "best".
  * ordinary least squares
  * kernel methods
  * principal component analysis
  * regularization
    * $\ell\_{2}$ vs $\ell\_{1}$ regularization: prediction error vs
      sparsity
  * Constrained optimization, and the duality principle
* Clustering
  * $k$-means clustering
    * kernel variants
  * Gaussian Mixture Models
  * subspace clustering
* Random walks
  * Markov Chains, Metropolis-Hastings, Gibbs sampling
  * Bootstrapping
* Sketching
  * Bloom filters
  * count-min sketch, and HyperLogLog sketch


### The Computational Practice of Data Science

* Computational methods for exploratory data science
  * What is your model sensitive to?
  * feature engineering: what do you choose to put in your columns?
  * bootstrapping
  * [Model debugging](http://nlpers.blogspot.com/2016/08/debugging-machine-learning.html)
  * Unbalanced data
* How does your model compare to their model?
  * Model interpretability. When your model makes a strange decision,
    can you explain it?
* Consequences of automated, model-driven decision making
  * What is your model sensitive to? What if you use your model for
    hiring, and it uses features prohibited by law (What if you
    collected age information?), or simply features you rather it
    didn't use? What about **proxy variables**?

## Absence and Class Participation Policy

The UA’s policy concerning Class Attendance, Participation, and Administrative Drops is available at [this page](http://catalog.arizona.edu/policy/class-attendance-participation-and-administrative-drop).

The UA policy regarding absences for any sincerely held religious belief, observance or practice will be accommodated where reasonable: see [this page](http://policy.arizona.edu/human-resources/religious-accommodation-policy).

Absences preapproved by the UA Dean of Students (or dean’s designee) will be honored. See [this page](https://deanofstudents.arizona.edu/absences).

Participating in the course and attending lectures and other course
events are vital to the learning process. As such, attendance is
required at all lectures and discussion section meetings. Students who
miss class due to illness or emergency are required to bring
documentation from their health-care provider or other relevant,
professional third parties. Failure to submit third-party
documentation will result in unexcused absences.

## Makeup Policy for Students Who Register Late

A central part of this course is a large number of small programming assignments. If you register after the first class meeting, you will be allowed to make up missed assignments, but those will *all* be due at the day that the next assignment is due. You are responsible for notifying me about a late registration so we can make grading accommodations.

## Course Assessment

We will have homework assignments, individual final projects, and a
midterm. Students who want to take a final exam in lieu of the
individual final project are allowed to, as long as they give the
instructing staff ample notice -- by drop date.

The final project (or exam) will be worth 30 points. Homework
assignments will be worth a combined total of 50 points, and the
midterm will be worth 20 points. I will give class participation 5%
weight, for a total score from 0 to 105. 

Your final grade in the course will be based on overall performance:

* 90% or better: A;
* 80% or better: B;
* 70% or better: C;
* 60% or better: D;
* below 60%: F.

Grades for assignments, midterm and final project will be posted on
D2L as soon as we have them. The grading for each assignment will be
provided one week after the assignment is due. 

### Assignments

The assignments will be based on selected problems from the course textbooks.

### Midterm and final exam

The midterm and final exam will be created from a small set of open-book problems.

* Time and location of final exam TBD

Please refer to the [UA Final exam regulations](https://www.registrar.arizona.edu/courses/final-examination-regulations-and-information) for more information.

### Final project

The final project for this course will involve implementing a
technique from a recent research paper of the student's choosing,
subject to the approval of the instructor. 



