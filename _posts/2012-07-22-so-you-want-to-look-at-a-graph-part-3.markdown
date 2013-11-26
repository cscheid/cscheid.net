---
layout: post
title: "So you want to look at a graph, part 3"
---

This series of posts is a tour of the design space of
graph visualization. I've written about
[graphs
and their properties](http://cscheid.net/blog/so_you_want_to_look_at_a_graph), and how the
[encoding
of data into a visual representation is crucial](http://cscheid.net/blog/so_you_want_to_look_at_a_graph__part_1). In this post, I will
use those ideas to justify the choices behind a classic algorithm for laying
out directed, mostly-acyclic graphs.

## Putting what we know to work

In a way, this sequence of posts is an attempt to understand how we
turn the process of designing visualizations from mostly art with some
craft, to mostly craft with some art. We do know a few rules which
work, but we don't really know *how we know them*.

In part 1, I asked: "what is in a graph?". In part 2, I asked "what
is in a sheet of paper?". It is my view that every visualization design
should start answering those two questions: what are the structures 
which we care about in our data? what can we work with?

These questions have little to do with the actual design of a visualization, 
but they lead right away to what in my mind is the fundamental axiom of
visualization design: *A visualization design must match
structures in data to structures in visual encodings.* From here
on out, I will call this *The Axiom* (tongue possibly in cheek).

Following The Axiom means we identify important structures
about the data domain, study the
medium in which we are going to encode them, and create an
encoding *in which these match*: the graph properties should be
represented by the closest matching properties in a sheet of paper.

This notion is of course central in Cleveland and McGill's
[classic
paper](https://secure.cs.uvic.ca/twiki/pub/Research/Chisel/ComputationalAestheticsProject/cleveland.pdf), and you can also see something like it driving much of what
Bertin wrote about in his
[seminal
book](http://www.amazon.com/Semiology-Graphics-Diagrams-Networks-Maps/dp/1589482611). For example, Cleveland and McGill famously showed that
positions along a common scale are a very effective way to portray a
set of real numbers. So if you have a single set of numbers you want
your users to understand, following The Axiom means using a
[dot
plot](http://www.perceptualedge.com/articles/b-eye/dot_plots.pdf).

Big whoop, right?

But there are other types of structures we would like to portray in
our visualizations. In this post, we will see some of them.

## Looking at a DAG

To make this exercise simpler, assume that our visualizations will be
node-link diagrams. So your mission is simply to specify positions of
the nodes on a cartesian plane, and edges will be drawn as
straight lines (directed edges will use traditional arrowheads).

<div style="position: absolute; right: -250px"><iframe src="http://cscheid.net/static/20120722/iframe1.html" width=250 height=250></iframe></div>
You're given a graph $G$ which happens to have a "mostly
acyclic structure". That is, there are either no cycles, or
relatively few of them, such that you expect that the majority of the
interesting properties of $G$ come from its acyclicity. If your
mission were to portray this graph faithfully on paper, what would you
do?  As the simplest possible "null plot", this is 
a graph whose coordinates are just positions on the unit square chosen
uniformly at random. Aside from (maybe) being able to tell which
vertices appear to have more edges than others, we cannot see
much. But we didn't really expect much to begin with.

Following The Axiom, we already identified one property we want to
preserve, namely the "directionality" of the graph. This is good, but it
is not very actionable: how do we design a visualization around
that? Going back to part 1, remember that we learned that the
[vertices
of acyclic graphs can be ranked](http://cscheid.net/blog/so_you_want_to_look_at_a_graph): we can give every vertex $v$ an
integer $r(v)$ such that if there is a path from vertex $v\_1$ to
 $v\_2$, then $r(v\_1) < r(v\_2)$.

<div style="position: absolute; right: -250px"><iframe src="http://cscheid.net/static/20120722/iframe2.html" width=250 height=250></iframe></div>
Let's set aside the fact that there are many such possible
rankings, and accept for now that a rank ordering is a good
representation of the notion of acyclicity. The question is then: can
we design a visualization that uses it?  One possibility is to use the
rank as one of the coordinates of the node positions. As a direct
consequence, all graph edges will point in the same direction.  We're
still using random numbers for the horizontal position of the
vertices, but it's clear that the ranks are encoding some decent
amount of structure in the graph (of course, if we wanted to know for
sure, we should be using
[formal
inference methods](http://stat.wharton.upenn.edu/~buja/PAPERS/Wickham-Cook-Hofmann-Buja-IEEE-TransVizCompGraphics_2010-Graphical%20Inference%20for%20Infovis.pdf), but that's another story).

To decide the horizontal positions of the nodes, there are many
possible solutions. To begin with, we are going to use the Axiom to
state that positions should be unique ("every node is different" becomes
"different nodes should be drawn in different places").

In addition, we will need a new postulate that sounds a little like the
contrapositive of The Axiom. Let's call it *The Other Axiom:
Everything shown by a visualization should exist in the data*. That
is, if something "looks like a feature", then it had better exist in
the data. Of course, what is a feature and what is not a feature can only
be determined by psychological experiments, but let's ignore that important 
point for now.

This notion is obviously close to Tufte's principle of maximizing data
ink. From my reading, Tufte advocates maximizing data ink as
economy in service of aesthetics. I, however, want to use the Other
Axiom to try and keep a bijective mapping between data and visual
representation: if the Axiom is violated, then two different datasets
will look the same, and that's a problem. But if the Other Axiom is
violated, then even if the visual mapping is unique, inspecting the
resulting visualization might make you think the data is different
from what it actually is. The Axiom tries to prevent blurred vision;
the Other Axiom, hallucinations.

Since we are using one of the coordinates for the node ranks,
the plot naturally grows an axis perpendicular to
the rank coordinate. We need to assign this remaining coordinate, but
we want to be careful to avoid giving the impression that our
visualization is encoding information in how the edges point one way
or another (when ranks are drawn vertically, edges will generally
point left or right; we want to avoid implying that this direction is meaningful). 
In addition, edge crossings are an obvious
visual feature, and since adjacent edges meet at a node, we don't
want to give the impression of "ghost nodes" by introducing
unnecessary edge crossings. Preferring vertical edges seems to be a sensible way to
convey "no additional information", so we will try to position nodes 
so that edges are "mostly vertical". It also prevents edge crossings.

There are two main problems in this solution. First, the goal of vertical edges clashes directly with the goal of unique node positions. So we need to compromise somehow (and the devil is in the algorithmic details). But just as importantly, what constitutes a "natural 
arrangement" with "no additional information" is a mix of cultural
and innate characteristics about which we know very little (but there has been
[recent work in the area](http://www.cs.brown.edu/people/cziemki/documents/ziemkiewicz10_laws-of-attraction.pdf)).

<div style="position: absolute; right: -250px"><iframe src="http://cscheid.net/static/20120722/iframe3.html" width=250 height=250></iframe></div>
Leaving aside all those important details, this is what an
algorithm which (roughly) encodes the above principles
generates. Aside from one important step, this is a result from
graphviz's classic
["dot"
algorithm](http://www.graphviz.org/Documentation/TSE93.pdf). Visually, the main problem with this approach is in the
edges. For simplicity, I have completely ignored the problem of edge
occlusion, but that has led to a violation of The Axiom: in a subgraph
of the kind $a \to b, b \to c, a \to c$, the principles I set above
mean that the edge $a \to c$ will necessarily be obscured. One can
explicitly route edges around nodes, and this is precisely what
"dot" does; I left that out in my crude drawing.

The paper describing "dot" is worth, at the very least, skimming over; I like that it sets forth a few visual principles and then the algorithm itself (which is, alas, fairly complicated) is designed around those simple principles. The same kinds of statements can be found in the classic Reingold-Tilford [tree drawing algorithm](http://emr.cs.iit.edu/~reingold/tidier-drawings.pdf). I don't think I see this structure in more recent visualization papers. Should we be asking ourselves why?

So there you have it, a very basic graph drawing algorithm distilled
to its very basics: Find some structure you care about (in this case,
acyclicity); find a way to encode it visually, and make sure
your encoding is *effective* (the Axiom) and *faithful* (the
Other Axiom).

## Next, undirected graphs

Of course, defining the entirety of graph visualization as choosing
node positions in the plane is a gross simplification, and one
which lets us apply the Axioms straightforwardly. It will not always
be this simple, and in this series we will get to more delicate
cases. But before we go there, the next post will discuss (albeit in
less detail) a few popular graph drawing algorithms for undirected
graphs.
