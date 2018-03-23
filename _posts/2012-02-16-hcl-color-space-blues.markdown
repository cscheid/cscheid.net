---
layout: post_narrow
title: "HCL color space blues"
---

{::nomarkdown}
<div style="position:absolute; right: -450px"><iframe
src="https://cscheid.net/static/20120216/xyz_frame.html" width=400
height=480></iframe></div>
{:/nomarkdown}

I've been playing around with the HCL color space. HCL, if you've
never heard of it before, is a color space that tries to combine the
advantages of perceptual uniformity of Luv, and the simplicity of
specification of HSV and HSL. HCL is an improvement over HSV and HSL,
but it is not exactly ideal: there is a nasty discontinuity at some
bits of the transformation! I have been trying to find a way around
this, but I'm stumped. Let me explain, and maybe you can help me.

The transformation from RGB to HCL is somewhat complicated, and
involves two intermediate color spaces,
[CIEXYZ](http://en.wikipedia.org/wiki/CIE_1931_color_space) and
[CIELUV](http://en.wikipedia.org/wiki/CIELUV).
Going from RGB to XYZ is a simple matrix transformation: $(x,y,z) = M
. (r,g,b)$. For arcane reasons, there are many possible matrices: the
one most relevant nowadays is the
[sRGB/D65
matrix](http://www.brucelindbloom.com/index.html?Eqn_XYZ_to_RGB.html). This is a linear transformation designed to make a
"brightness" coordinate, Y, while encoding the rest of the space in
the other coordinates by roughly mapping them to "red" and "blue"
stimuli.

To go from XYZ to CIELUV, things are a bit more complicated: this is
the bit that tries to match the physiology of a typical human vision
system, which is much better at telling shades
of yellow and green apart than it is at telling shades of blue
apart.

{::nomarkdown}
<div style="position:absolute; right: -450px"><iframe
src="https://cscheid.net/static/20120216/luv_frame.html" width=400
height=480></iframe></div> 
{:/nomarkdown}

The [full
transformation](http://en.wikipedia.org/wiki/CIELUV) behaves nonlinearly, and tries to make the euclidean
distance in CIELUV correspond roughly to perceptual differences. In
this space, L encodes the lightness of the color, or how bright it is,
and uv encodes the chromaticity portion: the particular tint or shade
of the color.

Finally, HCL is then obtained by simply transforming the UV
coordinates of Luv to polar coordinates. The phase is interpreted as
*hue*, and the length of the vector as "saturation"
(specifically, it's then called *chroma*). 

The goal of HCL is to be perceptually uniform along its axis, and so
the thing to notice is how the apparent brightness of the colors all
appear roughly the same for any given slider setting; and while moving
along the horizontal axis changes the hue of the color, it doesn't
change the perceived lightness or saturation. Compare this with the
HSV colorspace.

So you can play with these color spaces, I've written a few little
demos of the color spaces using
[Lux](http://cscheid.github.io/lux/). The sliders control
the axes which resemble brightness, and the image then shows a slice
of the resulting parameter space. You will need WebGL and Chrome for
these to work (sorry!). Pay attention to the boundary of the gamut.

{::nomarkdown}
<div style="position:absolute; right: -450px"><iframe
src="https://cscheid.net/static/20120216/hsv_frame.html" width=400
height=480></iframe></div>
{:/nomarkdown}

One of the great conveniences of HSV is that no matter what you do in
HSV, you will end up somewhere inside the (0,0,0)-(1,1,1) cube of
valid RGB colors. That means nothing too strange happens. 

On the other hand, if you play a bit with the LUV and HCL colorspaces
in low luminances, you will see a discontinuity in the
conversion. Although it happens outside the RGB gamut, it is still
quite annoying: some paths through HCL are cut off in RGB. The issue
happens when clamping the values from outside of the gamut back into
(0,0,0)-(1,1,1). This is what I would like to solve: is there a simple
way to create a (clamped) conversion from HCL to RGB that is
continuous and reasonable?

The procedure that is used in the
[R
package for colorspace management](http://cran.r-project.org/web/packages/colorspace/index.html) is the one I'm currently using in
the demo above: after converting from HCL to a value, we find the
closest point to the raw conversion that is inside the RGB cube.

Here's a different approach that *is* continuous: instead of
converting the color $c$, we instead search for the closest color in
HCL space $c'$, which converts to a value inside the RGB gamut. Now
the problem is: how do we actually find such a transformation
efficiently? It's easy to see that if $c$ goes outside the RGB gamut,
then $c'$ will be on the boundary of the gamut. So this is "merely"
a two-dimensional search problem. Except that the boundary of HCL or
CIELUV in RGB space is complicated. So we're looking for the minimum
of a function constrained to a complicated 2D surface, and I don't
think there's any simple algorithm to do this.

{::nomarkdown}
<div style="position:absolute; right:-450px"><iframe
src="https://cscheid.net/static/20120216/hcl_frame.html" width=400
height=480></iframe></div>
Or is there?
{:/nomarkdown}

## Acknowledgements

Thanks to [Hadley Wickham](http://had.co.nz/) for teaching me
about HCL, whose [ggplot](http://had.co.nz/ggplot/) library
uses that color space extensively. This post grew out of trying to
make continuous HCL scales easier to specify.
