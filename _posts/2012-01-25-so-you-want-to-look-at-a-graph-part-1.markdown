---
layout: post
title: "So you want to look at a graph, part 1"
---

This series of posts is a tour through of the design space of graph
visualization. As I promised, I will do my best to objectively justify
as many visualization decisions as I can.  This means we will have to
go slow; I won't even draw anything today!  In this post, I will only
take the very first step: all we will do is think about graphs, and
what might be interesting about them.

## What is in a graph?

A graph $G$ has two things: a set of **vertices** $V$, and a set of
**edges** $E$, where each edge is represented by an ordered pair of
distinct vertices (so in this definition we will not have multiple
edges and "self-edges"). To denote that $(a, b)$ is in $E$, I will
use $a \to b$.

Usually, we also have a mapping v_\textrm{attr} from
$V$ to some other space $V_A$. This gives us attributes of these
vertices (names of the people in your social network, names of the
computers in your intranet, etc.). A similar mapping $e_\text{attr}$
from $E$ to $E_A$ does the same for edges (is $b$ married to $c$ or
does $b$ work for $c$? How far is $h$ from $j$?, etc.).

These define a graph, but they don't say much of what is interesting
about them. So let's list some properties of (these very general)
graphs. By explicitly thinking about them, we can see the impact they
will have on our choices of pictures.

### Graphs are directed or undirected

One important characteristic of graphs is whether they are
**directed** or **undirected**. When we say that a graph is
undirected, we mean that whenever $(a,b) \in E$, it is implied
that $(b,a) \in E$: in other words, the has-edge relation is
symmetric, and $e_\textrm{attr}((a,b)) = e_\textrm{attr}((b,a))$. 
(For undirected graphs, I will write $a -- b$ to mean
that both $(a, b) \in E$ and $(b, a) \in E$ are true).  Otherwise, we
say that $G$ is directed. 

This distinction is important because, remember, the first rule of
visualization is "draw all there is, but no more". If our graph is
such that $a \to b$ does not imply $b \to a$, our visualization of it
better not imply that the relationship between $a$ and $b$
look symmetric. Of course, "making the relationship look symmetric"
is not a formal statement, and we might argue about what it
really says. But this is what I meant about the
difference between a formal systematization and an "informal" one:
we should not disconsider the notion simply because we don't know how
to formalize it! And, as we will see, I believe this distinction
**does** guide the visualization choice.


### Graphs have paths

An edge $a \to b$ in a graph implies some sort of connection between
$a$ and $b$, and we typically think of these connections being
*transitive*. So if $a \to b$ and $b \to c$ encode some
relationship, we tend to think of there existing some relationship
between $a$ and $c$ as well (we will say $a \leadsto b$ to say that
there exists some path $a \to \ldots \to b$).

This reveals another interesting property of graphs. Let's say you send
the elements of $V$ into new sets, such
that whenever $a \leadsto b$ and $b \leadsto a$, $a$ and
$b$ must go into the same set. Then, every element of $V$ ends up in exactly
one new set. These sets form a **partition** (into "strongly
connected components", SCCs). Natural partitions like this 
are your data's way of telling you to consider divide-and-conquer. If
you think paths are important (implying that SCCs are important as well), then
your resulting visualization should be "partition-preserving"
too: 1) your visualization should have the ability to visually
represent a partition of vertices (call it a "visual partition") and 
2) iff $a$ and $b$ are in the same partition, then the visualization 
of $G$ should put $a$ and $b$ in the same "visual partition".


### Paths have cycles

We will call a path $a \leadsto a$ which does not repeat internal
vertices a **cycle** (and we will require that cycles in undirected
graphs have at least three two internal vertices). A directed graph
with no cycles is a dag ("directed acyclic graph") and an undirected
graph with no cycles is a tree.

Vertices of a dag can be assigned natural numbers such that for every
pair of vertices $a$ and $b$ such that $a \leadsto b$, $f(a) < f(b)$. If your paths encode
dependencies, this assignment of numbers **ranks** the
dependencies, and is good information to have around.


### Many undirected graphs have a metric structure

The final structure I want to mention is the **metric
structure**. For some undirected graphs, there is a very natural way to
come up with a distance function between two vertices such it
resembles the familiar distances in plain old
two- and three-dimensional space. Our eyes are reasonably good at
distance judgements (yes, that's somewhat controversial because of
optical illusions and such. But if we are sensitive to these issues, I
believe we can use Cleveland to back the statement.)

Anyway, a function $d: V \times V \to R$ is a **metric** if:

* $d(a, b) \ge 0$, with equality iff $a = b$.
* $d(a, b) = d(b, a)$
* $d(a, c) \le d(a, b) + d(b, c)$, for all $b$

(Assume that the graph is connected for now; any pair of vertices
(a,b) is such that $a \leadsto b$ or $b \leadsto a$.) If one of the
attributes of undirected graph edges is a positive **weight**
associated with each edge, then the standard metric to assign to a
graph is the **shortest-path metric**, where we say that the
distance $d(a, b)$ is given by the smallest cost of a path, this cost
being the sum of the edge weights along the path.

"But what if my graph has negative edge attributes?", you ask. Good
question!  Then you simply can't use a metric to describe that
particular attribute of your graph. And slightly less trivially, if your
visualization technique implies that your graph obeys some metric, then
it is telling a lie. As a preview of the next few posts, this
"metric-friendliness" will be a crucial distinction between network
diagrams and matrix diagrams.

Next up, I will talk about 2D space; a sheet of blank paper where we
get to write. Then we will put those things together, and bam,
**visualization**.

## Previous posts

* [Series introduction](http://cscheid.net/blog/so_you_want_to_look_at_a_graph)
