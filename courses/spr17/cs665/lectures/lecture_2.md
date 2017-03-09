---
layout: bootstrap
title: Lecture 2 for CSC 665, Spr 2017
---

# Jan 17, Lecture 2

Reading: FODS, Chapter 6, in addition to papers listed below. 

## Admin

* [Assignment 1](../assignments/assignment_1.html) has been posted.
* If you haven't been signed up to Piazza, let me know (or [sign up
  yourself](https://piazza.com/class/ixun6en0aa45li)).

## Data Science in sublinear time and space

Following [Muthukrishnan](https://www.cs.rutgers.edu/~muthu/)'s [survey](https://sites.google.com/site/algoresearch/eight.ps):

* Data streaming models
  * Time-Series
  * Cash-Register
  * Turnstile

* Performance measures
  * Processing time per item $a_i$ in the stream. (Proc. Time)
  * Space used to store the data structure on $A_t$ at time $t$. (Storage)
  * Time needed to compute functions on $A$. (Compute or query time.)
  
## Basic techniques
  
* [Reservoir Sampling](https://www.cs.umd.edu/~samir/498/vitter.pdf)
* Hashing
* [Bloom Filters](https://www.jasondavies.com/bloomfilter/), Hash Families
* Mergeable summaries

