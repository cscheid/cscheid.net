---
title: Dimensionality Reduction
layout: d3_project_narrow
---

<script src="/lib/svd.js" type="application/javascript"></script>

# Dimensionality Reduction

Throughout this course, one of the principles we have adhered to can
be summarized as "don't show too much in a single plot". In other
words, instead of creating a visualization where every single record
is mapped to a different visual channel, we tend to use visual
channels sparingly. We choose only a few variables to display at a
time, and use something like Small Multiples displays to portray
variable differences.

In this module, however, we will break this rule is a very specific
way. "Dimensionality reduction" techniques, in essence, compute a
position on the plane based on _every_ variable of the
dataset. Specifically, we will think of every one of these methods as
a procedure that, given a set of input points $s_i \in S$, determines
a position in $x$ and $y$ coordinates for each $s_i$.

As we will see, there is sometimes good reasons to use dimensionality
reduction (and often there isn't).

## From records to vectors

In the rest of the course, we have assumed that our data is represented
by a set of records (concretely, Javascript objects), such as

    { "GPA": 3.5, "SATV": 780, "SATM": 800, "ACT": 23 }

or

    { "Sepal Length": 3, 
	  "Petal Length": 4, 
	  "Sepal Width": 2,
	  "Petal Length": 3.5 }

In this module, we will require our data to be in a different format.
To start, we will convert every data point into a vector of finite
dimension, and the dimension will need to be decided ahead of time.
In the two examples above, the conversion is quite obvious: we choose
some order for the fields, and simply list all of the numbers:
`[3.5, 780, 800, 23]`, or `[3, 4, 2, 3.5]`.

Sometimes, the conversion is not that straightforward. For example, if
one of the data fields store strings, how should we represent those as
vectors? A full discussion of this is well beyond the scope of this
module and course, Still, whenever you take use dimensionality
reduction on complicated datasets, remember that one important
question to consider is how to encode the data into vectors.

## Linear dimensionality reduction

The first class of dimensionality reduction techniques we'll consider
are _linear_ dimensionality reduction techniques. They're called this
because they are, well, linear methods. Specifically, they involve
computing some matrix $M$ in one way or another, and then the result
of the method is the multiplication of each input vector $d_i$ by $M$.

Linear dimensionality reduction methods are a good object of study
because they are quite simple, very elegant, and often surprisingly
powerful.

### Scatterplots

When we earlier discussed
[scatterplots](../spatial-arrangements/#scatterplots), we didn't call
them dimensionality reduction methods. But it's easy to see how they
are. Consider the iris dataset, from which the second above example is
drawn. For every field in the dataset, there exists a vector $f$ such
that $\langle f, d \rangle = \texttt{record}[\texttt{field}]$. For
example, for the vector representation and example record we chose
above, $\langle [3, 4, 2, 3.5], [1, 0, 0, 0] \rangle = 3$, the value
of the $\texttt{Sepal Length}$ field. Similarly, the vector $[0, 1, 0,
0]$ extracts the field $\texttt{Petal Length}$ from the vectors. So consider the matrix

$$ M = \left ( \begin{array}{cccc} 1&0&0&0 \\ 0&1&0&0 \end{array} \right ) $$

This matrix $M$ creates a vector whose two coordinates are the values
of the fields $\texttt{Sepal Length}$ and $\texttt{Petal Length}$. So
if we simply plot those 2-dimensional vectors in a plane, we get
precisely the scatterplot of those two variables:

<div id="scatterplot-iris-length"></div>

However, there's nothing stopping us from choosing _other_ vectors for
the $x$ and $y$ coordinates. Sometimes, these come naturally from the
data. For example, if we wanted to plot the average of the petal measurements
against the average of the sepal measurements, we would use the matrix

$$ M' = \left (\begin{array}{cccc} 0.5 & 0 & 0.5 & 0 \\ 0 & 0.5 & 0 & 0.5 \end{array}\right ) $$

<div id="scatterplot-iris-sepal-petal"></div>

Notice how this is a slightly different plot from the first one; we
can pick weirder ones, too:

$$ M'' = \left (\begin{array}{cccc} 0.2 & -0.4 & -0.3 & 0.5 \\ -0.7 & 0.3 & -0.3 & 0.8 \end{array}\right ) $$

<div id="scatterplot-iris-weird"></div>

Now it's hard to come up with a name for the axes, and it's also
become hard to see the clustered structure that we had before. This
makes us think: is there a notion of a *best* matrix? How do we
know which matrix is good?

### The Grand Tour

Now, before we discuss how to think of the "best" possible 2D linear
projection of a dataset, what if we could animate along *all* possible
such views? The Grand Tour is one classic algorithm that achieves
this.  In the animation below, we are slowly---and smoothly---moving
through all possible 2D views of the dataset:

<div id="grand-tour-iris"></div>

As the animation progresses, notice how some of the points of view
make a visualization that's all bunched up in the middle. This happens
because that particular point of view behaves like the shadow of a
sheet of paper when we light it along its edge. So, in a sense, that
point of view is not very informative of the dataset: all the
interesting stuff is getting "squashed on the screen". Conversely, the
"best" possible point of view is the one that squashed the data the
least. This brings us directly to the canonical dimensionality
reduction method: Principal Components Analysis, or PCA.

### Principal Components Analysis

(In what follows, we are going to assume that each feature in the
dataset is *centered*, or has mean 0).

Let's start considering a simpler case, that of one-dimensional
projections. That is, instead of thinking of a matrix $M$, let's
consider a single vector $m$. Now if we think of the intuition of the
Grand Tour visualization, what we want is a vector for which most of
the values of $\langle m, d_i \rangle$ are large (so they don't "bunch
up" near zero). We have to be a little careful, though. Imagine that
you somehow find a relatively good $m$. If that $m$ is good, then I
could give you a new vector that's twice as good, by simply
multiplying it by $2$, since that would spread out the points twice as
much. That means that we need to search for a good $m$, but we need to
make sure we fix its length, to avoid this artificial situation in
which we find a good vector, but it's good only because its
length is very large.

Let's make this a bit more formal. We have a list of vectors $d_i$,
which we will organize on a matrix $A$:

$$ A = \left ( \begin{array}{c} d_0 \\ d_1 \\ \vdots \\ d_{n-1} \end{array} \right ) $$

What we are looking for is a vector $m$, such that the length of $Am$
is maximized, but constrained to having length 1: $\arg \max _m\ \langle Am, Am \rangle$, subject to $ \langle m, m \rangle - 1 = 0$.

We can solve this directly, but first you'll need to remember your [Lagrangian
multipliers](https://www.khanacademy.org/math/multivariable-calculus/applications-of-multivariable-derivatives/constrained-optimization/a/lagrange-multipliers-single-constraint), though. The expression we need to maximize is:

$$\begin{eqnarray*} L(m, \lambda) & = & \langle Am, Am \rangle - \lambda (\langle m, m \rangle - 1) \\ & = & m^T A^T A m - \lambda m^T m \end{eqnarray*}$$

When we take the gradient of $L$ with respect to $m$, we end up with

$$ A^T A m = \lambda m $$

In other words, the vector $m$ that maximizes the one-dimensional
projection of the vectors $d_i$ is one of the eigenvectors of $A^T
A$. Specifically, it is the eigenvector associated to the largest
eigenvalue. (Since $A^T A$ is symmetric and positive-definite, its
eigenvalues are all non-negative and real, which means we can choose
the largest.) To get the _first principal component of $\{ d_i \}$_,
we simply compute $A m$. And, although we won't prove it here, it's
relatively easy to show that the $n$-th principal component of the
dataset is the result of projecting the points using the eigenvector
corresponding to the $n$-th largest eigenvalue. When we plot the PCA components on the screen,
we usually plot the first principal component against the second principal component, since
those are the two projection directions that minimize the degree to which
the dataset is squashed:

<div id="pca-iris"></div>

It is important to consider how to interpret a PCA plot, especially
when compared to a regular scatterplot. In a regular scatterplot,
the axes are decided by someone, and so by definition they correspond
to some phenomenon of interest of the analyst. The PCA, on the other hand,
can have fairly arbitrary axes. So how are we supposed to read it?
The main way in which we do this is to project the axes of interest:

<div id="pca-iris-biplot"></div>

Here, what we've done is we've projected the basis vectors of the
dataset. Because PCA is a linear method, we can use those vector to
make judgments of "where the points would go if those column values
changed", since adding or (subtracting) a certain amount along one
coordinate changes the overall projection exactly by the amount given
by the projection of the change:

$$M(v + [1, 0, 0, 0]) = Mv + M[1,0,0,0]$$

This is one of the main advantages of PCA: even though the axes of the
scatterplot it generates are a potentially complicated combination of
all the data features, it is still possible to interpret the plot
somewhat effectively, since we can easily "work out" what the plot
would look like, if the data values were different. (In a way, this is
exactly how we interpret regular scatterplots: if the data were
different along the axes we plot in a scatterplot, then the point
would move horizontally or vertically)

But let's get back to the math of the PCA. We defined it in
terms of the eigenvectors of $A^T A$, but there's a slightly more general
way to think of what's happening.  We start by writing $A$ in terms of
its [singular value
decomposition](https://www.youtube.com/watch?v=rYz83XPxiZo): $A = U
\Sigma V^T$, where $U$ and $V$ are orthogonal matrices, and $\Sigma$
is diagonal with non-negative, non-increasing real entries along the
diagonal (we index the diagonal values by $i$ and call them
$\sigma_i$). The main trick we'll use with singular value
decompositions is that if $u_i$ is the $i$-th column of $U$, then
$u_i^T A = \sigma_i v_i$, where $v_i$ is the $i$-th column of $V$
($u_i$ and $v_i$ are known as _left_ and _right singular vectors_,
respectively).

This helps because we can see that if we have the SVD of A, then $m$
(the eigenvector of $A^T A$) is necessarily a right singular vector of
$a$. And, because of that, the result of projecting $A$ along $m$
comes out directly from the definition of SVD, and it is the
corresponding left singular vector, scaled by its singular value. If
$m = v_i$, then $A m = u_i \sigma_i$. As a result, the SVD not only
gives us the projection vectors, but also the coordinates for the
projected vectors themselves. So far, it's mostly a notational
convenience. Hold on, though, because it's about to get really cool.


### Classical MDS

In the beginning of this lecture, we started by assuming that we
needed a vector representation for each value in our
dataset. Sometimes, this is not really feasible. Often, it's much more
convenient to think of a black-box subroutine that reports the
distance between two points in the dataset, without resorting to any
vector representation. For example, consider the situation of using
[edit distance](https://en.wikipedia.org/wiki/Edit_distance) to
compare strings. It's entirely unclear how to create a vector
representation for strings such that the vector distance between them
corresponds to edit distances. Miraculously, though, it's often
possible to recover vector representations direct from the distance
subroutines. This is what we're going to do now.

Imagine, to start, that we have a square matrix where each entry
records the *squared distance* between point $i$ and $j$. We
informally proceed by the method of hope: we pretend that there exist
vector representations $d_i$ and $d_j$ for the data points, and we
just don't know what they are. Instead, we have the matrix $D$ with
entries $D_{ij} = || d_i - d_j ||^2$. The expression $||d_i - d_j||^2$ can be massaged a bit:

$$ \begin{eqnarray*} ||d_i - d_j||^2 & = & \langle d_i - d_j , d_i - d_j \rangle \\ & = & \langle d_i - d_j, d_i \rangle - \langle d_i - d_j, d_j \rangle \\ & = & \langle d_i, d_i \rangle - 2 \langle d_i, d_j \rangle + \langle d_j, d_j \rangle \end{eqnarray*} $$

We now write $D$ as $\alpha - 2 \beta + \gamma$. $\alpha$ is a matrix
where the $i$-th row has repeated values $\langle d_i, d_i
\rangle$. $\beta_{ij}$ simply holds the inner products: $\beta_{ij} =
\langle d_i, d_j \rangle$. $\gamma$, finally, is a matrix where the
$j$-th *column* has repeated values $\langle d_j, d_j \rangle$. The
next trick is that we subtract row averages from $D$, as well as
column averages. Because the average is a linear operator, this is
equivalent to subtracting row and column averages from $\alpha$,
$\beta$, and $\gamma$. 

But notice what subtracting row averages does
to $\alpha$: since each row is made of a single value, the row average
is exactly $\langle d_i, d_i \rangle$, if we subtract that, we end up
canceling $\alpha$ exactly. In addition, subtracting column averages
cancels $\gamma$ in turn. And, finally, if we assume that our $d_i$
representation is already centered around the origin (that is, if we
assume that $\sum_i d_i = 0$), then subtracting row and column averages
from $\beta$ does precisely _nothing_[^1]! As a result, subtracting
row and column averages from $D$ leaves us precisely with $-2
\beta$. So to actually get the inner products, divide each entry by
$-1/2$, and call the resulting matrix $B$.

What now? Well, let's pretend that we had a matrix $A$ like the one we
used for PCA. If we had that matrix $A$, then it would be the case
that $A A^T = B$ (because the $(i,j)$-th entry of $B$ is the inner
product of the $i$-th row and $j$-th columns of $A$ and $A^T$
respectively).  Notice how this is pretty similar to the PCA case
(where we dealt with $A^T A$). We come to the next leap of faith: *maybe
the same eigenvalue and SVD tricks could work*.

Let's see how far we can get. Since we started with distances between
vectors, talking about projection directions doesn't really make
sense.  What we're looking for are the positions of the projected
vectors themselves.  Using the notation from the PCA above, what we
are looking for is the equivalent of $A m = u_i \sigma_i$, that is,
the left singular values of $A$.  But expand $A A^T$ in terms of the
SVD of $A$: $A A^T = U \Sigma V^T V \Sigma U^T = U \Sigma^2 U^T$ [^2].
If you remember that the eigendecomposition of a matrix $M$ gives $M =
Q \Lambda Q^T$, where Q is orthogonal and $\Lambda$ is diagonal, then
you notice that the eigenvectors of $B$ (the matrix we are pretending
is equal to $B = A A^T$) would be equal to the left singular vectors
of $A$ (the matrix we don't even have!). And, in that case, $A m = u_i
\sigma_i$, and we can recover $\sigma$ values as the square roots of
the eigenvalues of $B$, and so we can pretend that $Q \Lambda^{1/2}$
are the principal components of the matrix $A$ we don't actually
have. *And it actually works!* This piece of linear algebra magic is
called _Classical Multidimensional Scaling_, or "CMDS". You can do some really
very cool things with it, and here's the actual pseudocode for the
algorithm.

    D[i,j] = distance(i, j) ** 2
	D = subtract-row-averages(D)
	D = subtract-column-averages(D)
	B = -D/2
	Compute eigenvectors Q and eigenvalues Lambda of B
	return Q * sqrt(Lambda) as the coordinates of your vectors

Let's start with a basic example. Imagine you have a table with highway
distances between major cities:

         ATL  BOS  ORD  DCA  DEN  LAX  MIA  JFK  SEA  SFO  MSY
    ATL    0  934  585  542 1209 1942  605  751 2181 2139  424
    BOS  934    0  853  392 1769 2601 1252  183 2492 2700 1356
    ORD  585  853    0  598  918 1748 1187  720 1736 1857  830
    DCA  542  392  598    0 1493 2305  922  209 2328 2442  964
    DEN 1209 1769  918 1493    0  836 1723 1636 1023  951 1079
    LAX 1942 2601 1748 2305  836    0 2345 2461  957  341 1679
    MIA  605 1252 1187  922 1723 2345    0 1092 2733 2594  669
    JFK  751  183  720  209 1636 2461 1092    0 2412 2577 1173
    SEA 2181 2492 1736 2328 1023  957 2733 2412    0  681 2101
    SFO 2139 2700 1857 2442  951  341 2594 2577  681    0 1925
    MSY  424 1356  830  964 1079 1679  669 1173 2101 1925    0

You can use this data to recover an approximate map of the US:

<div id="cmds-city-distances"></div>

(Full disclosure, I had to mildly cheat here; the map as returned by
the algorithm doesn't know east from west or north from south, and so
it's flipped upside down. This is because CMDS only knows distances,
and not our notions of what to expect from a map.)

This is already neat. But we can do much better. Notice that the gist
of the CMDS trick above is to extract a matrix of inner products
between the vectors that we don't actually have[^3]. But remember that
one way to think of inner products is as a kind of similarity between
objects.  So if you have a way to roughly measure how similar two
objects are, then you can extract vector representations, and you can
even visualize them. One of the coolest instances of this trick is a
way to visualize the way that people make Morse code mistakes. In a
classic experiment, Rothkopf asked subjects to judge whether two Morse
code sounds were perceived to be the same or different.  With this
setup, one can record how often the Morse code for a given letter (or
number) is perceived to be the Morse code of a *different* letter. The
more often people confuse two Morse codes, the more we can think of
those codes as being "humanly" similar. By performing CMDS on that
matrix, then, we can get, quite literally, a picture of human auditory
perception of Morse code:

<div id="cmds-morse-code"></div>

Notice how this is even somewhat interpretable: vertically, we go from
codes that are predominantly dots to codes that are predominantly
dashes; horizontally, we go from short codes to long codes. The
multi-dimensional scaling principle, this idea that we can convert
similarities and distances to positions, is quite striking and
general.

[^1]: As an exercise, see if you can prove why this is the case.

[^2]: Try to prove that this holds as well.

[^3]: This is an instance of a much more general idea, namely that if we have access to operations that behave like inner products, we can do pretty much anything we could do with the vectors themselves. This is known in machine learning as the *kernel trick*, and it's a central, celebrated tool in the field.


## Nonlinear dimensionality reduction

TBF.

### Isomap

TBF.

### t-SNE, UMAP, oh my

TBF.
