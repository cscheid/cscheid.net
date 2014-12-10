---
layout: post
title: "Data Mining, Fairness, Accountability, Visualization"
---

This Friday at the "Fairness, Accountability and Transparency in
Machine Learning" [workshop](http://www.fatml.org/),
[Sorelle](http://www.haverford.edu/computerscience/faculty/sorelle/)
will be presenting some work she,
[Suresh](http://www.cs.utah.edu/~suresh/web/) and I have been doing
this year. We've been studying the intersection of computational ideas
and [disparate impact](http://en.wikipedia.org/wiki/Disparate_impact),
a legal theory of discrimination that central to US
anti-discrimination law.

Why should a visualization researcher care, you say?

One of the themes of my research has been that user data (typically
process provenance in form of activity logs, like the version trees in
VisTrails and the git logs in RCloud) can be put to very good use.  We
can suggest new visualizations like we did in
[VisComplete](http://cscheid.net/2008/10/01/viscomplete.html), or
[study student dynamics in homework
assignments](http://cscheid.net/2008/07/01/examining-statistics-of-workflow-evolution.html). Understandably,
when I give talks about these ideas, people ask me whether users are
afraid or reluctant to share data, and my answer has so far been that
"cultural problems require cultural solutions". What I meant is if
problems might arise from the mere presence of the data, then we need
to make sure the root cause is eliminated ("can we just stop being
jerks to other people?"). This is still true, but I have come to the
realization that the problems may be getting worse *because* of data
collection and mining.

We CS researchers ought to be doing something about this. At the very
least, let's take a good, hard look at the risks.

If our culture causes a problem, then data mining can ossify this
problem just by mirroring our bad institutions. Then later, when we
look at our data mining outputs, we go "hey, [men must be better
violinists than women](http://www.nber.org/papers/w5903.pdf), because
that's what the stats say". Look: numbers! They can't be biased,
right? boyd and Crawford have [written extensively about
this](http://softwarestudies.com/cultural_analytics/Six_Provocations_for_Big_Data.pdf):
you should totally read that piece if you haven't yet.

This is not to say that we should give up on the project of
data-driven, algorithmic decision-making. "We have met the enemy, and
he is us", after all: we have [good
evidence](http://www.powells.com/biblio/1-9780374533557-38) that
humans are not decision-makers. On the contrary: we should directly
study how to characterize bias, how it shows up in data sources, and
how we go about fixing it. It's not only cool computer science: *it's
the right thing to do*.

There's already been a lot of work in the area, which I won't try to
distill into a single blog post. It might even turn out that what
Sorelle, Suresh and I have to say about this is in the grand scheme of
things a minor observation. But! I became interested in visualization
because of how well it connects the world of human experiences with
the world of computation, algorithms, and data. Our work at FATML has
nothing to do with visualization, but this process of looking at the
human impact of a computational phenomenon is something we should do
*more of*, not less.

And, in addition, I think there's an opportunity for vis (and
algorithmic aspects of human-computer interaction, more generally).
Not only this would be using visualization for the betterment of
mankind (and really, do you need a better reason than that?), but
there's good research questions here: can
visualization and interactive exploration help detect, explain, and
remove structural biases in data sources? How do we even define these
questions correctly?

This whole field is just getting started. We vis people know how it
can be a powerful way to bring clarity to messy problems. We *know*
how powerful visualizations [when they force us to face hard
truths](http://guns.periscopic.com/). (Hell, really I'm just badly repeating a
point Tamara has been making for, at least, [8
years](https://www.cs.ubc.ca/~tmm/talks/vis08/vis08-4x4.pdf): "concern
not only for truth, but also for justice")

So maybe we should be thinking about how visualizations can empower
people to detect sources of unfairness in their data-driven processes,
and how they fix these processes. Why not?
