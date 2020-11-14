---
layout: bootstrap
title: The Nearest-Neighbor Method
---

# Prereqs

* The data generating distribution (DGD)

# Intro

In the previous lecture, we learned about the DGD, the ~~beautiful lie
we tell ourselves to make progress~~ model we use to think about many
of the problems in ML. Most importantly, we learned that if only we
had access to the DGD, then ML would be a trivial problem, because
it's fairly straightforward to go from the DGD to classifiers and
regressors that provably work as well as we can expect to.

The truth, of course, is that we do not have access to the DGD;
instead, we only have a finite sample, which we often obtain through a
process which could very rarely be described as "independent and
identically distributed". As we also learned last time, going from a
finite sample to something that looks a little more like the DGD
will always involve a bias of some kind (the *inductive bias*).

Today, we are going to study one of the most natural ways to build
classifiers and regressors. We will introduce a notion of similarity
between feature vectors, and make a prediction about an unseen feature
vector by comparing it to samples in the training set that are "near"
it.


## The nearest-neighbor method for classification

For now, let's assume that our features are all numeric, so that there
is a natural way to create a vector from each data point. Then, 
given any two vectors $a$ and $b$, we can setup a notion of *distance*.
Let's start with the most common one, euclidean distance:

$$d(a,b) = \sqrt{\sum_i (a_i - b_i)^2}$$

Clearly, $d(a, b)$ is zero if and only if $a = b$. So the closer $d(a,
b)$ is to zero, the more similar two points are. 

Now notice the connection to the Bayes optimal classifier under the
DGD. If only we could find infinitely many points in the training set
that are identical to the one we have (and had infinitely much time to
count them), then the optimal classifier would simply be the majority
vote, the class with the largest conditional probability at that
specific input point. But:

1. we don't have infinitely many training points
2. we almost always have *no* identical points to the point we need to predict

So, instead, we do the straightforward thing: we pick a notion of
distance, we pick a certain number of close-by points, and we classify
the new point by the majority vote. This is the nearest-neighbor
method.

In Python code, this is:

    def knn_predict(v, k):
        dists = list((d(v, p), label)
                     for (p, label) in training_set)
        top_labels = list(label for (_, label) in dists.sort()[0:k])
        return majority(top_labels)

There are important things to note with this naive method.

1. There is no training process: we just stash all of the data in the training set. 
2. There is no procedure in place to pick a value for `k`: this is another example of a hyperparameter.
3. (Similarly, there is no procedure to pick a definition of `d`!)
4. At prediction time, the naive method looks at every training point

Here is a [demo of Nearest-neighbor
classification](/writing/data_science/nearest_neighbors/) where you
can play with `k` to see its effect.

The most important property (and its biggest shortcoming) of
nearest-neighbor classification seems obvious to state, but is
surprisingly unintuitive, and leads us into the topic of the next
lecture. Imagine, hypothetically, a data generating distribution in
which every input point stays at the same distance from every other
point. This seems weird and unlikely. But if you accept that weirdness
for now, then you can see that in this case, "nearby
points" are impossible. If were point were equally close to one
another, then our heuristic for collecting a large subset of points
becomes useless.

What is more profoundly weird, though, is that when our data lives in
high dimensional spaces, the geometry of the situation is pretty much
this weird world. That will be the topic of our next lecture.


## Things to keep in mind for the future

Nearest-neighbor classification is the first method we have come
across which, surprisingly, does not necessarily need access to the
data features directly. The entirety of the method can be replaced by
the distance oracle. Although later in the course we will have deeper
reasons to take this point of view seriously, this is a good time to
note that there are practical reasons to like this.

First, it is often easier to come up with a defensible notion of
similarity (or distance) than it is to come up with methods that
combine data features directly. In this case, nearest-neighbor methods
are by far the most natural way to write ML code.

## Exercises

1. As `k` varies, which are the more complex models, and which are the less complex
   models? Justify your answer using the principles we discussed in class.
2. What is the equivalent method in the regression setting (as opposed
   to classification)?
3. There are deep connections between vector representations and
   distances. For the euclidean distance we used here, show the following
   property:

   $$d(a,b)^2 = \langle a, a \rangle + \langle b, b \rangle - 2 \langle a, b \rangle$$

   
# Additional Reading

* CIML 3
* PRML 2.5.2

