---
layout: bootstrap
title: CSC665, Principles of Machine Learning
---

# Lecture 1: Course Mechanics, Motivation

Slides for this lecture: [here](../slides/intro.pdf).

## Readings

We will have required readings, every week. You are expected to read
the relevant textbook chapter ahead of each lecture, as will be
pointed out in class and in the website.

For example, for the first actual lecture of the course on Monday, you
have the following *required reading*:

[CIML, Chapter 01](http://ciml.info/dl/v0_99/ciml-v0_99-ch01.pdf)

Much of the time in class will be spent in discussions and actually solving
problems: the readings are an essential part of class.

## Homework assignments

All homework assignments will be implemented and submitted in pure
Python; you will be provided with supporting libraries as necessary.
You will build on skeleton code that I'll provide you.

## Final project

Your final project will involve implementing a machine-learning
technique from the recent ML literature. For the project, you will are
encouraged to use whatever programming language and libraries you
choose (especially since pure Python, as you will learn, is very
likely going to be too slow for practical applications)

# Quiz: Calc and linalg Prereq Check 

Both of these problems can be solved entirely with the background
knowledge of linear algebra and calculus that I am assuming for this
course. It's ok if your calc or linalg is rusty, but I'm not
exaggerating in the following claim: if you cannot work out these two
problems in about 10 minutes (that is, after refreshing your memory),
then you will likely struggle with this class, and should take consult
the additional material described below.

1) You are given a set of $n$ observations $S = \{(x\_i, y\_i)\}$, and
   you believe the data will be well-fit to a model $f(x\_i) = p_0
   x_i + p_1$. You are told to measure the quality of the fit of the
   model to your data by *minimizing the total squared error* over the
   training data.  In other words: for any pair of values $\beta =
   (p_0, p_1)$, you can measure how badly a model $f$ fits your
   dataset by squared error $SE\\{f\\} = \sum_{(x\_i, y\_i)} (f(x\_i) -
   y\_i)^2$.
   
   Organize your data in a matrix $X$ and a vector $y$ of observations,
   
   $$ X = \left ( \begin{array}{cc} x_0 & 1 \\ \vdots & \vdots \\ x_{n-1} & 1 \end{array} \right ) $$

   and 
   
   $$ y = \left ( \begin{array}{c} y_0 \\ \vdots \\ y_{n-1} \end{array} \right ). $$
   
   Finally, organize your parameters in a vector 
   $$\beta = \left [ \begin{array}{c} p_0 \\ p_1\end{array} \right ]$$.
   
   Find the best model $\hat{f}(x) = \langle x, \hat{\beta} \rangle $,
   and express $\hat{\beta}$ in terms of $X$ and $y$.
   
2) Suppose you fit the data as described above, and are now interested
   in improving your model. You come up with the following idea.
   First, you fit the model to the data, then you measure the
   *residual*: $r_i = \hat{f}(x\_i) - y\_i$. Now, you fit a new model
   $f^\star$ to the residuals (instead of the $y\_i$ values), and your
   final prediction for a point is given by $f^\star(x) + \hat{f}(x)$.
   
   Prove that when $\hat{f}$ and $f^\star$ are found by minimizing the
   squared error, this idea does not work (and explain why).



# Additional material

Gil Strang's linear algebra course is a great resource, [completely
available
online](https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010/video-lectures/). Particularly
important lectures: 1, 3, 6, 9, 14, 16, 21, 22, 25, 27, 29, 33.
