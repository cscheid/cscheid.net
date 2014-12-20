---
layout: post
title: "Sometimes, 3D is better"
---

For a quick saturday morning hack, I took NASA's video of their
[Nature run simulation](https://www.youtube.com/watch?v=x1SgmFa0r04)
and put it [in a WebGL demo](/static/projects/polar_vortices),
wrapping it on sphere you can rotate, zoom in, and zoom out.  One of
the few reasons to use 3D is when your data is, in fact, 3D. Look at
how the vortices get smooshed out on the top and bottom of the 2D
video. In this case, I don't think any one 2D projection would be good
enough.

It's also amazing that this only took 110 lines of clunky HTML and
Javascript to put together. [Lux](http://github.com/cscheid/lux) is
nice, but 99% of the credit goes to the infrastructure under it. I
can't imagine making this demo as easily in any other ecosystem.
The web is awful, but the web is awesome.
