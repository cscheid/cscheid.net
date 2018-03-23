---
layout: post
title: "So you want to look at a graph"
---

Say you are given a
[graph](http://en.wikipedia.org/wiki/Graph_theory) and are
told: "Tell me everything that is interesting about this graph". 
What do you do? We visualization folks like to
believe that good pictures show much of what is interesting about
data; this series of posts will
carve a path from graph data to good graph plots. The path will take
us mostly through well-known research results and techniques; 
the trick here is I will try to motivate the choices from first
principles, or at least as close to it as I can manage.

One of the ideas I hope to get across is that, when
designing a visualization, it pays to systematically
consider the design space.
Jock MacKinlay's 1986 real breakthrough was not the
technique for turning a relational schema into a drawing
specification. It was the realization that this systematization was
possible and desirable. That his technique was formal enough to be
encoded in a computer program is great gravy, but the
basic insight is deeper.

Of course, the theory and practice of visualization in general is not
ready for a complete systematization, but there are portions
ripe for the picking. In this series, I want to see what I can do
about graph visualization.

## Why graphs?

Graphs have enough structure to make this discussion possible and
interesting, while not being so complicated that the specific lessons
they have to teach us would not translate well to other domains.

They also happen to be the [expertise](http://www.graphviz.org) of the research
department [where I am](http://www.research.att.com/groups/infovis).
I have spent a good amount of time in the last two years learning
the graph drawing landscape, and this seems like an
opportunity for a braindump.

## What to draw

The first rule of visualization is to **draw all there is, but no
more. This goal is usually not attainable.

But as we will see, keeping the rule in mind helps us
navigate the design space. When we are aware of the rule, the process
of thinking how we are bending it gives
natural descriptions of the trade-offs. 
It also raises the question "have we missed any spots", and I
[think](https://cscheid.net/blog/how_many_visweek_papers_could_the_nyt_write_in_three_weeks_)
this is a fundamental question to ask.

## What not to draw

I am a huge fan of data visualization. Often, it gives the most
effective path from data to insight.

Still, if we are to defend visualization as a first-class citizen in data
analysis, we have to be honest about it. One of my pet peeves is
that some visualizations suffer from "Something must
be done; visualization is something; therefore, we must visualize it"
trap. So here's another rule: **use visualization only when
writing an algorithm would be harder, or not as
effective**.

As a corollary of this rule, visualizations forever must
be judged against a moving goalpost. Humans will continually become
better at solving problems with algorithms; visualization as a field 
exists to help from the other side of the fence.

Incidentally, this is why
"automatic outlier detection" is always a big red flag for me: outliers are by definition
things which fall outside a model. "Outlier detection" as performed by
a computer is, necessarily, a model. Good visualization techniques
don't try to detect outliers: if the goal of the task is to detect
outliers, and the outliers could be detected effectively by
a computer, then a visualization wouldn't be the right tool to find
them! (Now, replace "outliers" with "feature", and think
about machine learning as it relates to visualization 
practices.)

## Roadmap, or, where are we headed?

These will be some of our stops along the way:

* What are you actually showing? Network diagrams vs. matrix
  diagrams
* What do you want to show? Distance embedding and energy
  minimization
* Stress majorization, and breaking the $O(|V|^3)$ barrier
* Edge bundling: pesky visuals, always getting in the way

Some possible interludes:

* Reading Bertin
* "Your drawings are hairballs! Graph drawing doesn't work for
large graphs!" A quick digression into lower bounds}
* Where are your users?!
* A visualization blog with so few pictures! Isn't that ironic?

If you have a particular request, let me know. Much of this is
shaping up as I write it.
