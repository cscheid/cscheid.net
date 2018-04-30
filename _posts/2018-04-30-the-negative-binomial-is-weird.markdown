---
layout: post
title: "The negative binomial is weird"
---

Over at [Data Colada](http://datacolada.org/archives/2799), Leif
Nelson has a nice discussion about the shape of the probability
distribution that governs the [file drawer
problem](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.888.5463&rep=rep1&type=pdf).
Go read that first. It's good and simple, I promise.

On Twitter,
[John Myles White](https://twitter.com/johnmyleswhite/status/991007589268951041)
pointed out a problem with the argument. Yes, the mode, median and
mean are quite different than what we think they are, and this is cute
in itself. But is the difference between the median and the mean
really that big when $\alpha$ is small?

I was curious about this, and looked around online for an expression
of the median of the negative binomial, but couldn't find anything. So
here it is.

## The median

The PDF of the negative binomial, in our case, is $f(x) = \alpha (1 -
\alpha)^{x-1}$. The CDF of that is annoying to work with, so we'll try
to get to an approximation of it instead, by blatantly pretending it's a
continuous function and working with that.

The mean of the distribution is $1/\alpha$, and that is easy to find.
Then, note that the CDF of the negative binomial at its mean
$1/\alpha$ is approximately $1 - 1/e$; that's literally the limit of
$1 - (1 - 1/n)^n$ for large $n$. So we know $F(1/\alpha) = 1 -
1/e$. What we'll do is take a local (linear) approximation of $F$ at
that value and solve it for $F(x) = 1/2$, the median. We need the
slope of $F$ at the mean, but that's simply the PDF. So we need to know
$f(1/\alpha)$. The calculation is simple:

$$f(x) = \alpha(1-\alpha)^{1/\alpha - 1} = k$$

$$\log k = (1/\alpha - 1) \log (1 - \alpha) + \log \alpha$$

$$\log k \approx 1/\alpha \log (1 - \alpha) + \log \alpha$$

Then we just remember that $\log (1+x) \approx x$ when $x$ is small,
and everything cancels out neatly:

$$\log k \approx \log \alpha - 1$$

$$k \approx \alpha / e$$

So we know that $F(x) \approx (\alpha/e)x + b$. But we also know that
q$F(1/\alpha) = 1-1/e$, so we just solve for $b$, and get $b =
1-(2/e)$. Putting it all together, we get that

$$F(x) = (\alpha / e) x + (1 - 2/e)$$

Finally solving for $F(x) = 1/2$ gives $x = (1/\alpha) \times (2 - e/2) \approx (1/\alpha) \times 0.640$.

Numerically, I've found that the number tends to be closer to $0.69
(1/\alpha)$, but I'm happy with the first-order approximation you get
from this quick calculation. 

More importantly, what this shows is that the median is not _that_ far
from the mean. Yes, it's consistenly skewed. But no, it's not absurdly
small. In fact, it's within a constant factor of the mean, and a
factor that's pretty close to one. So the combination of ideas in the
original post, namely "the median is a better descriptor of this
distribution", "no one has good intuition for the skew of the
file-drawer distribution", and the implied conclusion "this partially
explains why the file drawer problem happens", now seems weak to me.

## The mode

On further discussion, John mentions that the weirdest part of the
argument is the reference to the mode: yes, the mode of the negative
binomial is $1$, so the most common outcome of the "count how many
times you lose a billion-to-one bet until you win" experiment _is_
"one". But the difference between this outcome and all other possible
outcomes is at most $10^{-9}$. So it seems better to think of a
"$\epsilon$-smeared mode" for a distribution, namely the set of all
values whose probability mass is within a factor of $1-\epsilon$ of
the probability at the mode. It'll be obvious in this case that the
mode is very smeared around one.
