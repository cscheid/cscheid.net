---
layout: bootstrap
title: Readings
---

## A log of readings

Mostly to myself, in case I need to refer to it in the future.

#### December 2017

* [How differential steering works](https://www.youtube.com/watch?v=yYAw79386WI). What an amazing explanation of how differential gears work.
* [Face2Face: Real-time Face Capture and Reenactment of RGB Videos](https://www.youtube.com/watch?v=ohmajJTcpNk). We are all doomed.

#### October 2017

* [Conditioning on a collider](https://www.theatlantic.com/business/archive/2012/05/when-correlation-is-not-causation-but-something-much-more-screwy/256918/),
  one of those statistical ideas that show up everywhere and explain
  a lot once you know to look for them.

#### September 2017

* [Very nice explanation of the IEEE 754 float representation](https://twitter.com/paulsmith/status/908407225240182784)

#### August 2017

* [Automated Testing of Graphics Shader Compilers](https://www.doc.ic.ac.uk/~afd/homepages/papers/pdfs/2017/OOPSLA.pdf). Ok, so this is 95% bragging, but I just want to say I [called it](https://blog.regehr.org/archives/631#comment-3256) 6 years ago.

* Sometimes you get [crepuscular rays](http://www.atoptics.co.uk/atoptics/rayim1.htm) in the sky. But sometimes you get [anti-crepuscular rays](http://www.atoptics.co.uk/atoptics/anti1.htm), which appear to converge _away_ from the sun.

* Yonatan Zunger ["on this Googler's manifesto"](https://medium.com/@yonatanzunger/so-about-this-googlers-manifesto-1e3773ed1788).
  * Ken White's take on the whole thing is good too, although that will require looking around his [twitter account](http://twitter.com/popehat).

#### June 2017

* Jill Lepore on Wonder Woman
  * [On Fresh Air](http://www.npr.org/2014/10/27/359078315/the-man-behind-wonder-woman-was-inspired-by-both-suffragists-and-centerfolds)
  * [On Here and Now](http://www.wbur.org/hereandnow/2017/06/05/wonder-woman-jill-lepore-feminism)
  * [On All Things Considered](http://www.npr.org/2017/06/03/531397415/wonder-woman-shows-girls-that-men-arent-the-only-superheros-who-rescue-people)
  * [The book](https://www.amazon.com/Secret-History-Wonder-Woman/dp/0804173400)

#### May 2017

* [Two key properties of dimensionality reduction methods](http://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=7008663)
  * The two key properties:
    * how does a method handle concentration of measure? Notably, all "classical" methods (MDS, CCA, Sammon mapping, etc) fail at recognizing the issue of concentration of measure. SNE and t-SNE do not.
	* when a method is interpreted as a dynamical system, how does it handle relative forces as distances go to infinity? Is the method *elastic* (forces increase without bound) or *plastic* (forces have a maximum at finite distances)? Notably, under these definitions SNE is elastic, while t-SNE is plastic.
* [Same Stats, Different Graphs: Generating Datasets with Varied Appearance and Identical Statistics through Simulated Annealing](https://www.autodeskresearch.com/sites/default/files/SameStats-DifferentGraphs.pdf)
  * All of this work on adversarial examples makes me think of kernels (in the algebra sense) in the space of data analysis (classifiers, statistics, visualizations): if we are summarizing data, then necessarily these will exist. Maybe we really *should* be thinking of $\alpha$s and $\omega$s (in [this sense](http://algebraicvis.net/paper.pdf)) more generally than in visualizations.

#### April 2017

* [Adjoint Neural Networks](http://download.springer.com/static/pdf/217/chp%253A10.1007%252F978-3-319-00248-4_7.pdf?originUrl=http%3A%2F%2Flink.springer.com%2Fchapter%2F10.1007%2F978-3-319-00248-4_7&token2=exp=1492725655~acl=%2Fstatic%2Fpdf%2F217%2Fchp%25253A10.1007%25252F978-3-319-00248-4_7.pdf%3ForiginUrl%3Dhttp%253A%252F%252Flink.springer.com%252Fchapter%252F10.1007%252F978-3-319-00248-4_7*~hmac=2b4c7d346d845b30e68d0d33ea1597682508b66331aeef3b84fd1408133486b5)
  * Layer-wise relevance propagation seems very related to a conservative,
    linear network going backwards. Kind of like an adjoint. That led
    me to adjoint neural networks. Now I need to understand this more carefully.
* [Kernels for Periodic Time Series Arising in Astronomy](http://www.cs.tufts.edu/~roni/PUB/ecml09-tskernels.pdf)
  * Cross-correlation is not a kernel (even though it's a metric), but something similar is (kind
    of a softmax without the normalization term)
* [Rope Science - Advanced CS concepts inside a text editor](https://github.com/google/xi-editor/blob/master/doc/rope_science/intro.md)
  * They had me at monoids for efficient updates. Think something like
    [Fenwick trees](https://en.wikipedia.org/wiki/Fenwick_tree) for
    text editor algorithms: editing, determining line width, paren
    matching, etc.
* Gelman and Hennig. [Beyond subjective and objective in statistics](http://www.rss.org.uk/Images/PDF/publications/2017/Gelman-Hennig-April-17.pdf)
  * "Cluster analysis aims at grouping similar objects and separating
    dissimilar objects, and as such is based, explicitly or
    implicitly, on some measure of dissimilarity."
  * "At the present time, we feel that concerns about objectivity are
    obstructing researchers trying out different ideas and considering
    different sources of inputs to their model, whereas an ideology of
    subjectivity is limiting the degree to which researchers are
    justifying and understanding their model."
* Zook, Barocas et al., [Ten simple rules for responsible big data research](http://journals.plos.org/ploscompbiol/article/file?id=10.1371/journal.pcbi.1005399&type=printable)
* Propublica, [How We Examined Racial Discrimination in Auto Insurance Prices](https://www.propublica.org/article/minority-neighborhoods-higher-car-insurance-premiums-methodology)
	
