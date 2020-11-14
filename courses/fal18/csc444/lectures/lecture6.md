---
layout: bootstrap
title: Lecture 6, d3 scales
---

# Lecture 6: d3 scales

In this lecture we will learn about one of the most important ideas in
building data visualizations effectively, which is the use of
**transformations** to encode the process of going from one space to
another. In your Assignment 3, you have already been asked to create
transformations from one space to another. To build your scatterplot,
you will need to have transformed the space of SATM scores to
the space of X coordinates, for example.

D3 has an extensive "scale" library. In d3, a "scale" is an object
that encodes one such transformation in a particular way. But before
we study d3 scale objects, let's consider the previous simple example more
explicitly:

## Quiz

1) You have data from SATM scores, and you want to give each SAT score
   a position in x coordinates in an SVG that goes from 0 to 500.

   Write the following function:
  
       function convert(satm) { 
           var result = ...; // write this
           return result;
       }

2) You have data from ACT scores (which range from 1 to 36), and you
   want to give each ACT score a **color**, such that low ACT scores
   are encoded in red, and high ACT scores are encoded in
   green. Remember that, for now, we will be using values between 0
   and 255 to encode the amount of red, green, and blue.
   
       function convert(act) {
           var r = ...; // write this
           var g = ...; // write this
           var b = ...; // write this
           return "rgb(" + r + "," + g + "," + b + ")";
       }

3) You have data from CO2 concentration in the atmosphere around Mauna
   Loa (which ranges from 313ppm in 1959 to 360ppm in 1997), and you
   want to convert it to y coordinates. Write the following function:

       function convert(ppm) {
           var result = ...;
           return result;
       }

# D3 scales

* Linear scales
  * What do they do
  * More than numbers
  * You could have invented them
* Log scales
  * and others
* Interpolators

## Reading material

* d3 v4
  [API reference](https://github.com/d3/d3/blob/master/API.md#scales-d3-scale).
* Chapter 7 from Scott Murray's book.
