---
title: VIS 2019 Retrospective
layout: markdown_talk
---

<script src="https://cdn.jsdelivr.net/npm/vega@5.8.1"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4.0.0-beta.12"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6.1.0"></script>

# [title: line-fit] VIS 2019 at a literal glance

## Long-term trends

<div id="vis-submissions-1"></div>

## But really, because of ReVISe,

<div id="vis-submissions-2"></div>

## What I did

* Glanced every paper
* Read every abstract

## What I wish I'd done

* Skimmed every paper
  * I could have done this
* Read every paper
  * You could have done this. Do it while community is small enough!

## Trends

* ML continues to eat the world
  * I don't know for how long "implement ML-X for VIS-Y" will continue
    to be a tenable strategy. This is a good thing.
  * But if you don't know how to do this, you're probably behind the
    field now...
  

# [title: line-fit] Work that caught my eye

## Better vis through ML

* Fujiwara et al., "Supporting Analysis of Dimensionality Reduction
  Results with Contrastive Learning"
  * "Let's explain DR results for clusters"
* Wexler et al., "The What-If Tool: Interactive Probing of ML Models"
* Chen et al., "LassoNet: Deep Lasso-Selection of 3D Point Clouds"
  * Use a latent representation of points to refine a coarse selection
    in 3D space

## Better vis through ML

* Kwon and Ma, "A Deep Generative Model for Graph Layout"

## Better ML through vis

* Cashman et al., "Ablate, Variate, and Contemplate: Visual Analytics
  for Discovering Neural Architectures"

## Participatory design

* Hall et al., "Design by Immersion: ...": "the literature does not
  address how to accomplish these goals in transdisciplinary teams in
  ways that advance all disciplines involved"

* Williams et al. :)

* Correll's [vis4dh keynote](https://medium.com/@mcorrell/counting-collaborating-and-coexisting-visualization-and-the-digital-humanities-1bf157400d8)

## New Tricks

* Lekschas et al., "Pattern-Driven Navigation in 2D Multiscale Visualizations
  with Scalable Insets"
* Lu et al., "Winglets: Visualizing Association with Uncertainty in
  Multi-class Scatterplots"
* Gortler et al., "Uncertainty-Aware PCA" 
* Pezzotti et al., "GPGPU Linear Complexity t-SNE Optimization"
* Smart et al., "Color Crafting: Automating the Construction of Designer Quality Color Ramps"

## Topology, etc

* Klacansky et al.: "Toward Localized Topological Data Structures: ..." 
  * topocubes?
* Liu et al.: "Scalable Topological Data Analysis..."
  * Section 5.1, "Therefore, to achieve the design goal, the data
aggregation structure should allow efficient query on different
topological partitions of the dataset"
	* inverse of topocubes, but clearly people's minds are going the
      same place we are

## Cartograms

* Pe&ntilde;a-Araya et al., "A Comparison of Visualization for
  Identifying Correlation over Space and Time"

## Statistical Biases that Vis lets in

* Borland et al., "Selection Bias Tracking and Detailed Subset
  Comparison for High-Dimensional Data"
  * Brushing introduces selection bias, how do you account for this
* Xiong et al., "Illusion of Causality in Visualized Data"
  * The coarser you aggregate, the more people ascribe causality

## Immersive

* Kraus et al., "The Impact of Immersion on Cluster Identification Tasks"

## Systems

* Xu et al., "CloudDet: Interactive Visual Analysis of Anomalous
  Performances in Cloud Computing Systems"
