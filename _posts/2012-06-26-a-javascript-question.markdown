---
layout: post
title: "A Javascript question on performance vs. convenience"
---

Here's a Javascript-specific software engineering problem I'm
considering within [Facet](http://cscheid.github.io/lux). 
I'm trying to decide how (or even whether) to approach type-checking 
in the API, and I'm looking for input.

Since Javascript is dynamically checked, if a user passes a bad value
into a function, the error might only manifest itself much further
down the code. Tracking this error down is a slow and opaque problem: 
the error message will typically come from the innards of Facet, which
will confuse users that are not intimately familiar with the library
(at present, anyone but me).

The easy way to solve this problem is to add a strict layer of
type-checking into every function. This works, but carries a runtime
penalty, and good code pays the cost of debugging over and over
again. This is not a problem if the API call is not on the application
hot path, but some calls are unavoidable: anything that happens
per-frame on WebGL should be considered on the hotpath, since spare
cycles can be used for more features. The canonical example of this
type of thing is in
[Shade.parameter](https://github.com/cscheid/lux/blob/master/src/shade/parameter.js).

I'm leaning towards creating two sets of methods; the
slow, type-checked method, and the fast,
non-type-checked version.  But what's the best way to expose this in
an API? 
Is this even hopeful to do robustly and effectively?
