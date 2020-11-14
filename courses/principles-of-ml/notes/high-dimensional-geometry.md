---
layout: d3_page
title: High-Dimensional Geometry
---

<script src="underscore-min.js"></script>

# Intro

High-dimensional geometry is one of those topics that some researchers
spend their entire careers on. While we only be able to spend one
lecture on the topic, this should be enough for you to gain the
intuition we need to explain a lot of the trouble we find ourselves in
when doing ML.

The goal for this lecture is to convince you that Euclidean spaces
with many dimensions look *nothing* like the three dimensional space
we live in. We will spend some time unlearning some things that seem
like they should exist, and some time learning "what high-dimensional
space feels like".

## Background: tail bounds

We need to use a little bit of probability in this lecture.
Specifically, we will need to know about *tail bounds*, ways to
characterize the behavior of random variables far away from the center
(at "the tails"). These are all inequalities and they all will say, 
in different ways, that it's unlikely (ie. low probability) that a draw from a
random variable will be far from the expectation of the random variable.

Tail bounds are exceedingly useful because calculating expectations of
random variables is an easy thing to do, but calculating probabilities
of extreme events directly is a very hard thing to do. Tail bounds
provide us a way to convert statements about expectations to
statements about probabilities, at the expense of some looseness
coming from the inequality. We will see that more sophisticated tail bounds
are progressively less loose.

Let's start with the simplest one.

### Markov's inequality

I find it easier to remember Markov's inequality by using a mnemonic:
"If the average population height is 5 feet, a random person is at
most 10% likely to be taller than 50ft." Markov's inequality is merely a generalization of the idea.
Instead of height and 5 feet, it's any non-negative random
variable $X$ and its expectation. Instead of 10%, it's any probability $a$:

$$ P(X \ge a) \le \frac{E[X]}{a} $$

While Markov's inequality is the most fundamental tail bound, it's
fairly loose. For example, in the US the average male is $5.86$ feet
tall, but clearly the probability of being $58$ feet tall is less than
$10%$. What we're not taking into account here is the *standard
deviation* of the population, (roughly) the expected distance of any
point from the mean of the population[^1].

[^1]: More precisely, the standard deviation is the square root of the expected squared distance from the mean. The squares and square roots are there ultimately because of mathematical convenience, like we've seen before in class.

If we know that the standard deviation is bounded, how can we take
advantage of that?

### Chebyshev's inequality

Chebyshev's inequality comes out directly from applying Markov's
inequality to the squared distance of a draw from a variable $X$ to
its mean $\mu$, $(X - \mu)^2$, using the probability that this
is larger than $(k\sigma)^2$:

$$ \begin{eqnarray*} P((X - \mu)^2 \ge (k\sigma)^2) & \le & \frac{E[(X - \mu)^2]}{(k\sigma)^2} \\ P (|X - \mu| \ge k\sigma) & = & \frac{\sigma^2}{k^2 \sigma^2} \\ & = & 1/(k^2) \end{eqnarray*} $$

Now, we can add additional information to our original problem, namely
that the standard deviation of male height is about 4 inches.  In our
original problem, 58 feet is about 13 standard deviations away from
the mean, which means that the probability of seeing someone that tall
is at most 1/169. This is much closer to our intuition than 1/10, but
it's still not great, right? Clearly it's not the case that about one
in two hundred men are 60 feet tall.

So what do we do? This is where the math gets more intricate. The
important intuition to keep in mind is that the next tail bounds we
will study take advantage of bounding not only standard deviations
(which are about the expectation of *quadratic* distances to the
mean), but we will bound the expectation of *all powers* of distances
to the mean. This will let us get *exponentially better* bounds.

### Exponential tail bounds, Chernoff bound

The exposition here follows that of Martin Wainwright's course, and
specifically, [Chapter 2 of the course
notes](https://www.stat.berkeley.edu/~mjwain/stat210b/Chap2_TailBounds_Jan22_2015.pdf).

The main theoretical trick to achieve better bounds is to study not
only the deviations of the values and their squares, but all powers at
the same time. We do this by studying the random variable $Y =
e^{\lambda(X - \mu)}$[^2]. This gives a random variable that combines
all powers, which we plug into Markov's inequality to get

$$ P[X - \mu \ge t] = P[e^\lambda(X - \mu) \ge e^{\lambda t}] \le \frac{E[e^{\lambda(X - \mu)}}{e^{\lambda t}} $$

Taking the log of the left and right hand sides, we get an expression
that is true for all values of $\lambda$ where only the right side
depends on $\lambda$. So we should pick $\lambda$ to get the tightest
bound possible. This is "the" Chernoff bound:

$$\log P[X - \mu \ge t] \le - \sup_{\lambda \in [0, b]} \left \{ \lambda t - \log E [e^{\lambda (X - \mu)}] \right \} $$ 

[^2]: This trick works because $e^{\lambda x} = \sum_i (\lambda x)^i / i!$.

Where things get tricky is that there are different Chernoff bounds
for different random variables (since when you plug an actual specific
random variable, you need to also pick the best $\lambda$). As a
result, instead of a single bound, everyone who uses Chernoff bounds
pick whatever specific bound they need, and yet they all call it the
same thing. So one lesson that helps understand the literature is that
you should think of it as "a Chernoff-style bound" rather than "the
Chernoff bound". 

In addition, we're not going to derive all of these bounds ourselves
because it's not very useful for where we're going. We're just going
to use a few of them.

*(Upper) Chernoff bound for Gaussians:*

$$ P[X - \mu \ge t] \le \exp \left \{ -\frac{t^2}{2\sigma^2} \right \}, \forall t \ge 0. $$

The height distribution in adult males is clearly not a Gaussian, but for the
sake of comparison with the Chebyshev inequality, let's pretend it is. In that case,
$t = 52.14$, and so $P[X \ge 58] \le e^{-\frac{52^2}{32}} \approx 2 * 10^{-37}$.
That's *exceedingly* rare, and much more in line with our intuition.

*Chernoff bound for sub-Gaussians:*

Most random variables are not Gaussians, and so we need
something a little more general. It turns out that a large class of
random variables *do* support a single "kind" of Chernoff bound, and
they're called "sub-Gaussian random variables". A random variable is
sub-Gaussian if there exists a positive number $\sigma$ such that

$$ E[e^{\lambda(X - \mu)}] \le e^{\sigma^2 \lambda^2/2}, \forall \lambda \in R $$

Whenever a random variable is sub-Gaussian with parameter $\sigma$,
the Chernoff bound for Gaussians also holds for that variable, using
$\sigma^2$ instead of the variance. Gaussian random variables are
sub-Gaussian with the parameter $\sigma^2$ being equal to the variance
of the Gaussian.

*Chernoff bound for Rademachers ($+1$ or $-1$ random variables):* Rademachers are sub-Gaussian with $\sigma = 1$.

Rademachers are handy random variables for analysis, being a random
variable that is assigned $-1$ and $1$ with the same
probability. Rademacher random variables are sub-Gaussian with $\sigma
= 1$.

*Chernoff bound for bounded random variables:* Bounded random
variables in $[a, b]$ are sub-Gaussian with $\sigma = (b-a)/2$.

*Hoeffding bounds* are "just" Chernoff bounds for sums where each
random variable under the sum has a different expectation $\mu_i$ and
sub-Gaussian parameter $\sigma_i$:

$$ P \left [\sum_{i=1}^n (X_i - \mu_i) \ge t \right ] \le \exp \left \{-\frac{t^2}{2 \sum_{i=1}^n \sigma_i^2 } \right \} $$

### Notes

We've worked here with the Chernoff bounds for *additive* bounds,
of the form $P[X \ge \mu + t]$. There is a different class of Chernoff
bounds for *multiplicative* bounds, of the form $P[X \ge (1 + \delta)
\mu]$. I personally find it harder to remember what they look like so I
just look them up when I need them, and I didn't cover them here. You
should know they exist so you can look them up if you need them.

## High-dimensional spaces

<!-- The main tool we will use to study how weird high-dimensional spaces -->
<!-- truly are is the study of expected distances between points in these -->
<!-- spaces. -->

Here are five different observations about high-dimensional spaces and
Euclidean geometry. These are meant to show you how truly weird
high-dimensional spaces are, and to give you a few pictures that will
help understand why ML is particularly challenging in the absence of
the DGD.

### In high dimensions, lemons are "all" rind

The formula for the volume of a sphere of radius $r$ in
$d$-dimensional space is simple (if ugly):

$$V_d(r) = \frac{\pi^{d/2}}{\Gamma(n/2 + 1)} r^d$$

$\Gamma(x)$ is the Gamma function, which kind of generalizes
factorials to real numbers, $\Gamma(x) = (x-1)!$ whenever $x$ is a
large enough integer. More precisely, $\Gamma(x) = \int_0^\infty
t^{x-1} e^{-t}\; dt$. (If you remember your integration by parts and
inductions, you can prove the formula for the volume of the
$d$-dimensional sphere in a straightforward, if tedious, way.)

To see why it's the case that in high dimensions, most of the volume
of a sphere is near the surface (and hence, "lemons are all rind"), we
won't need to actually do anything with $\Gamma$. Simply consider the
ratio between a sphere of radius $0.9$ and one of radius $1$, as $d$
increases. Clearly, this ratio is just $0.9^d$, which decreases fast
as $d$ increases.

<div id="high-d-volume"></div>

In other words, the volume of the "90% core by radius" of the sphere
very quickly goes to zero.

### In high dimensions, gaussians are really like spherical shells

(The proof of this is not particularly insightful to me and,
annoyingly, I don't know of a proof of a similar bound using only the
Chernoff bounds we just learned about.)

Let's just state Theorem 2.9 from
[FODS](https://www.cs.cornell.edu/jeh/book.pdf): for a $d$-dimensional
Gaussian with unit variance in each direction, only $3
e^{-\beta^2/96}$ of the probability mass away from the shell
$\sqrt{d} - \beta \le |x| \le \sqrt{d} + \beta$. Because of this, we
call $\sqrt{d}$ the "radius" of the Gaussian.

In other words, when $d$ is large, the unit variance, $d$-dimensional
Gaussian really behaves like a $d$-dimensional sphere of radius
$\sqrt{d}$. Take $d = 10,000$, for example, and $\beta=15$, which
gives a band that's 30% of the radius of the Gaussian. For this case,
the bound says that at most about 30% of the mass will be outside of
the band.  If you check via simulations, you'll see this is pretty
loose!  But what's important here is the exponential nature of the
bound: take $d = 40,000$ and the equivalent $\beta = 60$ for 30% of
the radius of the Gaussian. Now, the bound says that less than one
part in a quadrillion ($1.55 \times 10^{-16} \le 10^{-15}) of the
gaussian mass is outside of that radius. 

What's very convenient (and surprising) about this theorem is that,
outside of using $\sqrt{d}$ in the definition of the shell, the
theorem does not depend on the dimension of the Gaussian: the
expression only depends on $\beta$!

From now on, we are going to treat high-dimensional gaussians and
high-dimensional spheres equally (sometimes scaling the variance of
the gaussian so that the radius is $1$). This is indeed a little
sloppy, but the lesson of the this section is that as dimensions
increase, this approximation gets exponentially less sloppy.

### In high dimensions, "everyone" lives near the equator

We now know that (high-dimensional) gaussians and spheres are "the
same". So let's measure the "latitude" of random points on a sphere.
While we usually measure latitude on the sphere in degrees north (or
south) of the equator, we will instead measure latitude as the "value
of the $y$ coordinate". And in fact, without loss of generality, we
rotate our coordinate system and define latitude as the value of the
_first_ coordinate, just to make our argument easy.

We will define the "equator" of a high-dimensional sphere as the set
of points on the sphere with a first coordinate that at between $-0.1$
and $0.1$ (so only 10% of the "range" of the sphere). How many points in
this sphere do we expect to lie in this range?

In fact, you can work this out directly yourself, by using the
Chernoff bound for Gaussians which we discussed above.

### In high dimensions, angles are all square

If you think about the argument we just used, picking the first
coordinate of the Gaussian was completely unnecessary. So there is an
equivalent process which picks *two* random vectors, then rotates both
of them so that the first vector is $[1, 0, \cdots, 0]$. As it turns
out, the second vector in this process is distributed with the same
probability as just picking one vector at a time.  More over, dot
products are invariant under rotation, and so computing the dot
product between these two vectors is the same as computing the
"latitude" of that point. So, a different way to state the previous
result is that, in high dimensions, the dot products between two
random points in a sphere is almost always close to zero. So random
angles are all square!


### In high dimensions, distances are "meaningless"

Use $||a - b|| ^ 2 = ||a||^2 + ||b||^2 - 2 \langle a, b \rangle$
to argue that in high dimensions, points on a sphere have essentially
the same distance to one another. Because of this, so do
high-dimensional points more generally.

## Why do we care?

You've had the chance to work with these bounds that use sums of
random variables, so you can now notice that since $||a - b||^2 =
\sum_i (a_i - b_i)^2$, we are combining each dimension through a sum,
and so the distances will tend to "bunch up in the
middle". This makes $k$-nearest neighbor methods very challenging in
high dimensions: we are hoping to pick "the close-by values", but
there is a sense in which this is an impossible task.

Now, the description in the above paragraph is inaccurate in one very
important way that you should be aware of.  In real datasets, features
along each dimension are *not* independent of one another, and
Chernoff bounds for sums require independently drawn samples. Still,
there is important intuition there.

(TBF.)


# Exercises

1. Prove Markov's inequality.

# Additional Reading

* CIML 3.5
* PRML 1.4
* FODS 2.3--2.7

# Acknowledgments

I've gotten the full derivations from Martin Wainwright's course[^3].

[^3]: [Tail Bounds, Martin Wainwright](https://www.stat.berkeley.edu/~mjwain/stat210b/Chap2_TailBounds_Jan22_2015.pdf)
