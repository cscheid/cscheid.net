---
title: Automatic Differentiation
layout: d3_project
---

<script src="peg-0.10.0.js"></script>

# Automatic Differentiation

## Introduction

Derivatives show up everywhere in data science, and most notably in
optimization, because of gradient descent (and its variants). Writing
derivatives by hand is error-prone and annoying, especially for
complicated expressions. Automatic differentiation ("autodiff") is an
algorithm that solves all of these problems: evaluating gradients is
usually only as expensive as evaluating the functions themselves, and
since it's the computer doing it, you're never going to miss a term
again. Autodiff is also the backbone of libraries like PyTorch and
TensorFlow.

Automatic differentiation works by traversing a data structure
representing the value we want to compute. People call this
"expression graph", "expression tree", or an "computation graph":
they're the same thing. Usually, we ask Python to compute
the value of an expression directly:

    >>> 3 + (5 * 6)
	33

Instead, we can build a data structure representing that, and ask
Python to derive the value:

    class Variable:
        def __init__(self, value):
            self.v = value
        def evaluate(self):
            return self.v

    class Sum:
        def __init__(self, left, right):
            self.l = left
            self.r = right
        def evaluate(self):
            return self.l.evaluate() + self.r.evaluate()

    class Mult:
        def __init__(self, left, right):
            self.l = left
            self.r = right
        def evaluate(self):
            return self.l.evaluate() * self.r.evaluate()
    
    >>> x = Sum(Variable(3), Mult(Variable(5), Variable(6)))
    >>> x.evaluate()
    33

(This is, in fact, pretty much how Python actually evaluates
expressions internally.)

## Given a computation graph, derivatives are *local*

The first important bit of intuition on how derivatives can be
computed comes from the way the chain rule works. You've probably seen
the chain rule written in this way:

$$ \frac{df}{dx} = \frac{df}{du} \times \frac{du}{dx} $$

This version of the chain rule says that if $f$ depends on $x$ only
through $u$, and $u$ depends on $x$, then the derivative $df/dx$ is
the product of the "immediate derivative" from $f$ to $u$, $df/du$,
and the "immediate derivative" from $u$ to $x$, $du/dx$.

This lets us compute the derivative of $f = \sin (\cos x)$ knowing
only the base case rules that if $u = \sin x$, then $du/dx = \cos x$,
and if $v = \cos x$, then $dv/dx = -\cos{x}$:

$$ df/dx = \cos (\cos x) \times - \sin (x) $$

# Forward-mode autodiff

If we organize our computation in terms of nodes that know how to
evaluate their own derivatives, that computation will only need the
derivatives of the immediate neighbors.  This is because, as we saw above,
the chain rule means that "dependencies propagate one node at a time".

Imagine the computation of the example above, $3 + (5 \times 6)$, except
that we create named variables: $a + bc$, $a = 3, b = 5, c =
6$. Say we wanted to compute the derivative of that expression with
respect to $b$: $d \{ a + bc \}/db = c = 6$. Can we come up with an
algorithmic way to do this? The easiest way is called "forward-mode
automatic differentiation".

## Just carry the derivatives with the values

If you inspect the source code for the Python evaluation library we
wrote above, the evaluation of each node needs only to know the values
of its immediate neighbors. Forward-mode autodiff simply takes this
idea one step further, and carries the derivatives together with the
values:

    class Variable:
        def __init__(self, value, derivative):
            self.v = value
            self.d = derivative
        def evaluate(self):
            return (self.v, self.d)

    class Sum:
        def __init__(self, left, right):
            self.l = left
            self.r = right
        def evaluate(self):
            (left_v, left_d) = self.l.evaluate()
            (right_v, right_d) = self.r.evaluate()
            return (left_v + right_v, left_d + right_d)

    class Mult:
        def __init__(self, left, right):
            self.l = left
            self.r = right
        def evaluate(self):
            (left_v, left_d) = self.l.evaluate()
            (right_v, right_d) = self.r.evaluate()
            return (left_v * right_v,
                    left_v * right_d + left_d * right_v) # product rule
    
    >>> a = Variable(3, 0)
    >>> b = Variable(5, 1)
    >>> c = Variable(6, 0)
    >>> x = Sum(a, Mult(b, c))
    >>> x.evaluate()
    (33, 6)

There is a bit of a trick going on, which is how we encode which
variable we are taking the derivative over. We simply ask variables to
store the values of their derivatives with respect to whatever
variable we're interested in. In our example, we want to take a
derivative over $b$, and so $da/db = 0, db/db = 1, dc/db = 0$.

Of course, you have to teach your library about other expressions and
derivative rules as well:

    class Sin:
        def __init__(self, v):
            self.v = v
        def evaluate(self):
            (v, d) = self.v.evaluate()
            return (math.sin(v), math.cos(v) * d)

    class Cos:
        def __init__(self, v):
            self.v = v
        def evaluate(self):
            (v, d) = self.v.evaluate()
            return (math.cos(v), -math.sin(v) * d)

    # class Exp, Log, etc.

This is called *forward-mode* autodiff because the derivatives "flow
forward" with the computation of values. You can see the algorithm in
action here, with uniformly random values between 0 and 1 assigned to
the variables:

<div id="fm-autodiff-exp">Expression: <input id="fm-autodiff-input" value="a + b*c"/><button id="fm-autodiff-go"/>Compute d/da</div>
<div id="fm-autodiff"></div>

This works well for simple expressions. However, consider the case of
computing the *gradient* of a function: the vector of partial
derivatives with respect to all variables. If we want to use
forward-mode autodiff to compute the gradient, we end up having to evaluate the
same expression over and over again, just changing the values of the `d` fields
of the variables `a`, `b`, and `c`. That's quite inefficient, so let's try to
identify where the inefficiency comes from.

Pay attention to the partial derivatives we are computing with
forward-mode autodiff.  For every invocation, we choose one variable
to compute the derivative over. We are keeping the "denominator" of
the derivative fixed, and varying the "numerator" over all possible
computation nodes. But a gradient does the opposite. It keeps the
"numerator" fixed, and varies the "denominator" over all variables of
the function: $\nabla f(x, y, z, w) = [ \partial f / \partial x,
\partial f / \partial y, \partial f / \partial z, \partial f /
\partial w ]$. So if we use forward-mode autodiff to compute
gradients, all the computations of the derivatives of the intermediate
nodes are wasted.

There is a better way to do this! It's called reverse-mode autodiff.

# Reverse-mode Autodiff

Let's start with that same original expression, $f = a + bc$. First, you should convince yourself that the gradient of $f$, $\nabla f = [\partial f/\partial a, \partial f/\partial b, \partial f/\partial c]$ is equal to $[1, c, b]$, and then break $f$ into simple expressions:

$$\begin{eqnarray*}d &=& b \times c\\ f &=& a + d\end{eqnarray*}$$

If we wanted to compute the gradient of $f$, we could replace this with a slightly more general thing: let's think about computing "all possible denominators of the fraction $\partial f/\partial *$". 
At the very start, we only know how to compute one of these: $\partial f/\partial f = 1$. 
It's a bit weird to think about taking a derivative of a function with respect to itself. 
But if you think of it as a variable that has some constraints, then it makes sense: as long as you find a way to change the value of the variable, the rate of change of $f$ with respect to $f$ itself is just $1$.

Ok, so we found $\partial f/\partial f = 1$. How does that help us at all? 
Well, we can use that to percolate the derivative information "backwards" up the expression tree. 

Say we want to find the derivative of $f$ with respect to $d$. 
Because $d$ (and $a$) define $f$ directly, this case is "easy": we take the derivative of the whole expression $f = a + d$ with respect to $d$, and get $\partial f/\partial d = \partial a / \partial d + \partial d / \partial d$, or $\partial f / \partial d = \partial d / \partial d = 1$. 
The same trick works for $a$ (and so $\partial f / \partial a = 1$).
However, for $b$ and $c$ we need something different.

Let's start with $b$. We want $\partial f / \partial b$, so somewhere
along the way we will need to take a derivative over $b$. Since the
only simple expression we have involving $b$ is $d = b \times c$,
we might as well take a derivative over $b$, and get $\partial d /
\partial b = c$.  And now, just like in the forward-mode case, we can
use the chain rule: $\partial f / \partial b = \partial f / \partial d
\times \partial d / \partial b$. Since we know from before that
$\partial f / \partial d = 1$, we get $\partial f / \partial b = c$. The
same argument works for a derivative with respect to $c$, and we get
that the gradient will be $[1, c, b]$, as expected.

In forward-mode autodiff, the chain rule lets us "push derivatives
down the tree along with the values"; in reverse-mode autodiff, the
chain rule lets us "push derivatives up the tree": notice how
$\partial f / \partial b$ is defined in terms of $\partial f /
\partial d$, a derivative that is "towards the bottom". This really is
working in the "reverse" direction of evaluation (and that's why this
is called "reverse-mode" autodiff), but the chain rule is symmetric,
so it all works out.

I've described to you in words how reverse-mode autodiff works, but haven't
really given you an algorithm that's easy to implement.

## "Pushing derivatives up"

There's a trick that highly simplifies the implementation of
reverse-mode autodiff. The main issue with the above explanation is
that the base case needs to be handled differently for every kind of
expression, and there can be very many different expression kinds to
handle: sums, products, sines, cosines, etc. 

It's much easier to write the code if every base case behaves the same
way.  The trick to make everything uniform is simply to posit that the
"reverse-mode pass" always starts at a special variable (let's call it
$g$), and that $g$ is defined to be equal to the expression you care
about (in our case $g = f$).

We're almost ready to write the algorithm. But we need two reminders.
First, in forward-mode autodiff, the derivative values of a node $v$
stored $\partial v/\partial x$, where $x$ was the chosen variable of
interest. In reverse-mode autodiff, the derivative values of a node
$v$ will store $\partial f/\partial v$, where $f$ is the overall
expression. Second, the version of the chain rule which we need for
reverse-mode autodiff is a little more general than what we've seen
before. Specifically, we need to handle a situation when $f$ depends
on $x$ through multiple "intermediate paths".  In that case, the chain
rule sums over all of terms of each independent path:

$$ \frac{\partial f}{\partial x} = \sum_v \frac{\partial f}{\partial v} \frac{\partial v}{\partial x} $$

With that in mind, here's the algorithm for reverse-mode autodiff:

1. Evaluate the expression tree for the *values* as you would do in
   forward-mode autodiff, but without computing derivatives. This is
   the "forward pass".

2. Initialize the derivative values of all nodes to 0, except $g$,
   which is initialized to 1.
  
3. Traverse the computation graph in some topological order, from the node of the
   final expression (the "root" if it were a tree) up. The invariant
   we seek here is that by traversing the graph in this way, for
   every node we visit, the derivative of $g$ with respect to that node
   will have been fully computed by the time we visit it. 
  
4. When we visit a node, we "push derivatives up" the tree, *adding*
   the appropriate derivative values to the derivative of the node's
   parents.
   
5. When this "backward pass" is finished, each node's derivative
   values will hold the value of the derivative of $g$ with respect to
   the node itself.
   
Let's make things more concrete. Consider, for example, the case where
we visit the node $d = c \times b$. By our invariant, at that point we
will have fully computed $\partial f / \partial d$. By taking the two
possible derivatives, we see that $\partial d / \partial b = c$, and
$\partial d / \partial c = b$. The chain rule says $\partial f /
\partial b = \sum_v (\partial f / \partial v) (\partial v / \partial
b)$. Setting $v = b$ gives us *one* term of the sum, so we need to
increment the currently-stored value of $\partial f / \partial b$ by
$(\partial f / \partial d) \times c$. We increment (as opposed to storing) because there could be other
nodes in the graph that *also* use $b$, and those will eventually have
to add their own contribution to the chain rule sum.

As a result, reverse-mode autodiff "pushes derivatives" up the tree
based on specific rules for each kind of expression, and you can
derive each one of them by taking derivatives with respect to the
possible parameters. Here are a few examples of the behavior of the
algorithm when visiting nodes of different types, always assuming that
$g$ is the variable representing the entire expression:

* $a = b + c$ adds $\partial g / \partial a$ to both $\partial g / \partial b$ and $\partial g / \partial c$,
* $a = b - c$ adds $\partial g / \partial a$ to $\partial g / \partial b$, and subtracts $\partial g / \partial a$ from $\partial g / \partial c$,
* $a = \sin b$ adds $(\partial g / \partial a) \times \cos b$ to $\partial g / \partial b$,
* $a = \log b$ adds $(\partial g / \partial a) \times (1 / b)$ to $\partial g / \partial b$, etc.

You can see this new algorithm in action below, again with uniformly
random values between 0 and 1 assigned to the variables.  First, the
algorithm performs a forward pass to compute the expression values,
and then the algorithm performs a backward pass, to propagate the
derivatives up the tree back to the variables. Note that the
derivatives with respect to the variable nodes here are represented in
text field separate from the variable nodes.  We do this so that different branches can
refer to the same variable, and the derivative with respect to that
variable can accumulate correctly.

<div id="rm-autodiff-exp">Expression: <input id="rm-autodiff-input" value="a + b * c"/><button id="rm-autodiff-go"/>Compute gradient</div>
<div id="rm-autodiff"></div>

## Backpropagation?

In neural networks, "reverse-mode autodiff" is often referred to as
"error back-propagation", from the paper that made it popular for
[neural
networks](http://www.cs.toronto.edu/~hinton/absps/naturebp.pdf). The
general algorithm for reverse-mode automatic differentiation was known
before the specific use-case was published for neural networks,
and was developed in a [1970 master's
thesis](https://en.wikipedia.org/wiki/Seppo_Linnainmaa) (!).

# Why does this matter?

Although forward-mode autodiff is more straightforward than the reverse-mode varient, the performance gains of using reverse-mode autodiff in the case of gradient calculations are big.
Consider, for example, the notorious [VGG19](https://arxiv.org/pdf/1409.1556.pdf) neural network, which in 2014 set the state of the art for classification accuracy in a 1000-class image classification problem. 
It has 144 million parameters, so evaluating the gradient using forward-mode autodiff would have taken 144 million times as long, turning a problem which in 2014 took about 3 weeks to train into a problem that would have taken over 8 million years!

# Acknowledgments

Before I built this (and also during!), I extensively referenced
[Rufflewind's AD
tutorial](https://rufflewind.com/2016-12-30/reverse-mode-automatic-differentiation). I
still highly recommend it.

Thanks to Matthew Conlen for spotting mistakes on this.
