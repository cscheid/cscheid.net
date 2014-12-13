---
layout: post
title: "Not Spirals"
---

The spirals optical illusion is making
[the](https://plus.google.com/117663015413546257905/posts/3V3PTcLLJa6)
[rounds](https://twitter.com/revodavid/status/543451599209639936)
again, so I thought it'd be great to have some fun with them.


Let's take some of [these](http://www.moillusions.com/circles-or-spiral) [optical](http://www.moillusions.com/i-dont-wanna-see-a-spiral-part-i) [illusions](http://www.moillusions.com/circular-optical-illusions-collection),
and play around with them in [d3](http://d3js.org).

## Squares in spirals?

Here's the
original version.

<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="/assets/js/d3.slider.js"></script>
<link rel="stylesheet" href="/assets/css/d3.slider.css"/>

![Spiral?](/assets/img/circleofspiral-vi.jpg)

We want to be able to play around with the amount of rotation in the
squares, and see what kind of optical illusion we get. So what we will
do is we will recreate the shapes in a d3 drawing and we'll tie the
rotation to a slider. Like this:

<div style="width:450px" class="center" id="spiral-1"></div>
<div style="width:450px" class="center"><div id="spiral-1-angle-slider"></div></div>

<br>
Pretty neat, huh? At 0 degrees we get no effect, and at 45 degrees there's no effect again.
But there's two peaks where the effect is really strong: one at around 10-12 degrees and another at around 
20 degrees. Notice how at 5 degrees there's no effect, but at 10 degrees there's a very strong one. The two images are *very* similar to one another, but the optical illusion effect is very different! Vision is complicated. We can also check if the effect gets stronger depending on the width of the line,

<div style="width:450px" class="center"><div id="spiral-1-width-slider"></div></div>

whether the squares are filled:

<div style="width:450px" class="center"><div id="spiral-1-fill-slider"></div></div>

or whether the colors need to alternate:

<div style="width:450px" class="center"><div id="spiral-1-color-slider"></div></div>

<br>
The color alternation turns out to be super important! That's fun
and unexpected, and shows that in vision, few things "separate":
many subsystems interact with one another, often weirdly.

### Another example

Here's the original image.

![Spiral?](/assets/img/waterspiral2.jpg)

Now we start reconstructing the same thing in SVG, with the help of d3:

<div style="width:590px" class="center" id="spiral-2"></div>

We could do the same kind of study of whether the corners should point one way or that. In fact, you can make the spiral turn the other way by flipping the colors of both bands of squares, and make something really disconcerting by having the inner band point one way, and the outer band point a different way.

But instead, let's try something different with this one:

<div id="spiral-2-engage"></div>

<br>
Whoa!





### Acknowledgments

Sliders from [d3.slider](https://github.com/turban/d3.slider), optical illusions from [Mighty Optical Illusions](http://www.moillusions.com/), via David Smith on Twitter and John Baez on G+.

<script src="/assets/js/2014-12-12-not-spirals.js"></script>
