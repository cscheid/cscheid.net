---
layout: post
title: "So you want to look at a graph, part 2"
---

This series of posts is a thorough examination of the design space of
graph visualization
([Intro](http://cscheid.net/blog/so_you_want_to_look_at_a_graph),
[part
1](http://cscheid.net/blog/so_you_want_to_look_at_a_graph__part_1)). In the previous post, we talked about graphs and their
properties.  We will now talk about constraints arising from the
process of transforming our data into a visualization.

## What is in a sheet of paper? Marks

<div class="sidebar"><img src="http://cscheid.net/static/20120229/marks.png"></div>
Paper is like external memory. We can make marks on it, and later we
can *read* marks that we made on a particular spots. We will say
then that visualizations are encodings of data as particular
configurations of marks on paper. The process of "reading a
visualization", of getting the dataset back into our heads, is simply
the decoding of the marks of paper into what they mean. I will refrain
from defining a mark precisely: it is only important that the writer
and the reader both agree as to what constitutes one, and that they're
both capable of reading and writing marks. Let's see how far this notion takes
us.

We can draw marks of different shapes, and we use the difference
between the shapes to encode aspects of our data.  Using this idea,
we could just write down a description of a graph in english prose.
If we wanted to "visualize" the data, we would then literally read
the prose, reconstruct the graph in our heads, and be done. But
this is not a visualization!

If we went ahead with this boneheaded idea, we would clearly be
employing our visual system to read the prose describing the graph,
even though no one in their right minds would describe that encoding
as "visual".  One reason for this is we know that the process of
reading prose feels fundamentally different than the process of
looking at a scatterplot, or other abstract graphical depictions.  So
let's constrain our encodings to be "graphical" in nature. I'll keep
this notion underspecified, but for now think of it as requiring
encodings to only be configurations of dots, lines, circles and their
shapes and positions. This makes the encoding more "visual", and
that should be enough.

... or should it?

## Even the simplest possible abstract encoding can go boink

<div class="sidebar"><img src="http://cscheid.net/static/20120229/innocent_marks.png"></div>
When there are *two* dot marks on a piece of paper, it turns out
that we immediately see that these two marks have some distance
between them. Given two marks written on paper, I can then read a real
number, in principle to arbitrarily large precision. Since we know how
to read and write this configuration, we know how to *encode* a
number as distance between two points.

This two-mark encoding appears to be completely innocent and boring,
but it turns out that we can already get ourselves in deep trouble if
we're not careful! If you've ever read about Godel encodings, you
should have started feeling uneasy around where I said "arbitrarily
large precision". With arbitrarily large precision, I can encode
a number with as many decimal places as I want, and I can define the
encoding of my graph to be, roughly, the ASCII string representing the
graph vertices, edges and properties. Furthermore, this encoding is
lossless.

<div class="sidebar"><img
src="http://cscheid.net/static/20120229/oh_oh.png"></div> 
Although
encoding an entire graph as a single distance between two points is
valid, it's clearly ludicrous. What went wrong?  Remember that we
decided the prose encoding was bad because "it wasn't visual". Now
this new encoding of ours is (superficially) visual, but it feels
similarly bad to the prose encoding. One thing the two encodings have
in common is that the part of the decoding process that confers
"graphitude" to the data does not seem to come from our vision
system, but from some other part of the brain. We are using
arbitrarily small differences in distances to distinguish potentially
arbitrarily large differences in graphs, this encoding needs
"additional decoding". Somehow, there are these visual bits (in this
case, a distance) which get sent to other parts of the brain for
further interpretation. And this indirectness is precisely what is bad
about the encoding.

*A good visual encoding is "direct"*. Such encodings get their
"meaning" straight from the vision system, without requiring an
explicit "reading". This notion should be familiar to you, if you
read Bertin before: it is related to his ideas of "perception of
correspondences" and "retinal legibility" in Semiology of
Graphics.

## How is any of this at all relevant?

At this point, you may be thinking that this entire discussion
is a gigantic waste of time, a treatise in picking nits. But the fact
of the matter is that arguing about the effectiveness of different
visualization techniques *is exactly* arguing about encoding
choices. And if we ever hope our theoretical arguments to be valid
regardless of which encoding we use to examine, we need to be able to
articulate why stupid encodings like the above are, in fact, stupid.

<div class="sidebar-large"><img src="http://cscheid.net/static/20120229/chernoff_faces.png"></div>
And even armed with the simplest of the observations above, 
we can already make some nontrivial statements.
If you've ever heard about Chernoff faces and
wondered why they're a terrible idea, worry no more. Remember that the idea behind
Chernoff faces is that since we're incredibly good at face
recognition, then we should encode different attributes of our data as
different aspects of a face. (If you've never heard about them before:
yes, they are hilariously bad. But I assure you they were proposed
completely seriously.)

So why are Chernoff faces bad? It's simple: although recognizing
different faces and telling them apart is something we do thousands of
times a day, we almost never think "yes, George Clooney's face is
different from Julia Roberts's face because his eyes are obviously
12.3% larger, his ears are 15.7% smaller, and his nose is half as
hooked."  In fact, Chris Morris, David Ebert and Penny Rheingans have
experimentally confirmed this:
[Chernoff faces are not pre-attentive](http://www.research.ibm.com/people/c/cjmorris/publications/Chernoff_990402.pdf).  The important point is that
even though we can, given enough time, make precise judgements
of face proportions, the values don't jump at us: we have to
*read* faces in the same way we would read numbers from a
spreadsheet. And, if the encoding forces me to read, then it's not a
visual encoding at all. If they were visual, we'd just stick with spreadsheet rows
in the first place!

## Next

The above argument means that, right now, settling almost every
question of which visual encodings are good and which are bad (and at
what) needs the heavy lifting of experiments in perceptual
psychology. Morris, Ebert and Rheingans's study is important, and
appears to answer that one question definitively. But we would like to
have a theory which would explain, ahead of time, why Chernoff faces
are bad, and many other ideas we might have, without needing to
recruit 500 people on Mechanical Turk. I might come back to this later
on in the series, when we have enough theory under our belts to
actually say something about Chernoff faces.
Still, a lot of work has been done in evaluating visual encodings in
isolation, and we will have to recap the most important ones.

Next: what do we know about good visual encodings, and can we use
these encodings directly for graph visualization? If not, *why not*?
