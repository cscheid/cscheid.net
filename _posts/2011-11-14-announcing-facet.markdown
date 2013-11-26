---
layout: post
title: "Announcing Facet, the EDSL for WebGL visualization and graphics"
---

[Facet](http://cscheid.github.com/facet) is a Javascript
library I'm writing, part of a research project on high-performance
visualization and graphics on the web. It's peculiar how historical
accidents are opportunities in disguise. If everyone knew Lisp, and if
Javascript and the WebGL shading languages were Lisp, Facet would be
what everyone would write. But Javascript is no Lisp, and WebGL's
vertex and fragment programming languages aren't Lisp either, and many
people still don't know about Lisp.

There's a massive opportunity, then, to narrow this chasm between the
Javascript and the WebGL worlds, a chasm that's currently giving every
WebGL programmer out there a world of hurt, even if they don't know
about it. This chasm must be narrowed by programming language
technology: WebGL embeds a set of programming languages into
Javascript, and it is the mismatch between the two that causes much of
the pain.

Facet is a Javascript library to bring high-level, composable
primitives to high-performance graphics and visualizations on the
web. Facet is an embedded, domain-specific language in Javascript, and
it is built around an optimizing source-to-source compiler. 

Facet is still very much work-in-progress. But if you care about this
sort of thing, jump over to the
[Github](http://cscheid.github.com/facet/) page, or just
[fork Facet](http://github.com/cscheid/facet) directly; I'd
love to hear your feedback.
