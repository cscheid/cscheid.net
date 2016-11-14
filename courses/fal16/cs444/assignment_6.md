---
layout: bootstrap
title: "Assignment 6: Color Spaces, Bivariate Maps, Texton Sequences"
---

# Assignment 6

- Posting date: Sep. 27th
- Due date: Oct. 4th
- Assignment name for `turnin`: `cs444_assignment_6`


# Description

In this assignment, you will write code to build a visualization for a
weather simulation of
[Hurricane Isabel](https://en.wikipedia.org/wiki/Hurricane_Isabel).

You will build on the skeleton code we provide. 

# Data

The dataset has atmospheric and temperature and pressure value for a
50x50 square grid of positions, making a total of 2500 observations of
both temperature and pressure. The simulation values have been sampled
at an altitude of about 15 kilometers. The dataset values are available in
the skeleton code we provide under the global variable `data`, as an
array of objects:

    var data = [
	    { Lat: .., Lon: .., T: (temperature), P: (pressure) },
		...
	];

The atmospheric temperature ranges from about -70 to -60 degrees
Celsius (in the `T` field) , and the atmospheric pressure ranges from
-500 hPa to 200 hPa (in the `P` field). 

## Part 1: Separate visualization of the individual fields (20 points each)

Implement the functions `colorT1` and `colorP1` to portray temperature
and pressure appropriately. 

Remember that the pressure field has both positive and negative
values. Your pressure colormap should be **diverging**: it should:

- map zero to a neutral color
- map non-zero values such that values of the same magnitude but
different sign they are opponent to each other in Lab
space (**hint**: this means you have to be careful with how you design
your scale bounds)
- map values such that pressures moving **away** from zero change at
  the same rate.
  
Your temperature colormap can be designed however you want, as long
as:

- it is perceptually uniform as temperature varies (the perceived change
in color should approximate the change in temperature), 
- it change luminances monotonically along the scale (remember from our
principles class that you should indicate shape with luminance
whenever possible),
- it avoids the most common type of color deficiency among the
  population.
  
Hint: These two colormaps should take no more than 10 lines of code
for both of them.

## Part 2: Bivariate colormap for visualization of the fields (30 points)
   
Implement the function `colorPT` such that you give a single color
that portrays both temperature and pressure.

Your colormap should again map values of zero pressure to neutral
colors, and values of nonzero pressure should be opponent to each
other.

Map temperature however necessary, such that as temperature changes,
the colors change perceptually uniformly (**hint**: there's only one
way to do it after you've decided on pressure).

## Part 3: Implement Colin Ware's Qualitative Texton Sequence 1 (30 points)

Write the functions `glyphD`, and `glyphStroke` in order to implement
the texton sequence in
[Figure 1a (the top half) of this paper](http://ccom.unh.edu/vislab/PDFs/QTonS.pdf). Your
sequence should be such that positive pressure values use white
glyphs, and negative values use black glyphs. Values with the same
absolute pressure should map to the same glyphs.

Write `colorT2` to portray temperature. This can be any colormap which
respects the same constraints as the ones in Part 1, in addition to
being visible under the glyphs (so, for example, if you chose a
mapping from white to black in `colorT1`, you'll need to use a
different colormap here).

# Extra credit (40 points)

Implement color legends for all of your plots. Color legends should
show the range of shown values for each of plots, and should include
tickmarks and text labels for some values.

Hint: You can use d3 axes for part of this assignment, and you can
exactly reuse your color scales if you structure your code the right
way. Writing color legends for all plots should not take more than
50-100 lines of code in total if you do it right.


# General Hints

- d3's quantize scales will be helpful
- You can use scales to choose colors directly, but you can also
  use scales to choose individual values for the function calls in
  `d3.hcl` and `d3.lab`.

# Files

- [main.js](assignment_6/main.js) is the skeleton you will build on
  (implement the functions commented with "write this"),
- [index.html](assignment_6/index.html) has the HTML you'll need, and
- [data.js](assignment_6/data.js) has the data you will use.

## Acknowledgments

Thanks to [Joshua Levine](http://www.cs.arizona.edu/~josh/) for providing the dataset.
