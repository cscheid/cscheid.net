---
title: NOIRLab Lunch Talk, 2020-10-16
layout: markdown_talk
---

# [title: line-fit] Three short pieces on dimensionality reduction

<div class="author">Carlos Scheidegger<br>Associate Professor, UA CS, HDC Lab</div>
<div><img class="logo" src="../images/logos/hdc.svg"><img class="logo" src="../images/logos/ua.svg"></div>

## Where I come from

<div>
  <div style="width: 120vh; height: 60vh; display: grid; margin: auto; grid-template-rows: auto auto auto; grid-template-columns: auto auto auto auto auto auto auto auto; ">
    <img class="headshot" src="../2019-11-15/images/headshots/bigelow.png">
    <img class="headshot" src="../2019-11-15/images/headshots/iqbal.png">
    <img class="headshot" src="../2019-11-15/images/headshots/nivan.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/berger.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/cscullyallison.png">
    <img class="headshot" src="../2019-11-15/images/headshots/glickenstein.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/remco.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/josh.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/kindlmann.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/sorelle.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/suresh.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/jiangkairong.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/mingwei.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/zhe.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/zhenge.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/rfaust.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/dylan.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/jixianli.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/cscheid.png">
    <img class="headshot" src="../2019-11-15/images/headshots/dilshadurrahman.png">
    <img class="headshot" src="../2019-11-15/images/headshots/kisaacs.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/kawilliams.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/skobourov.jpg">
    <img class="headshot" src="../2019-11-15/images/headshots/bahadorsaket.jpg">
  </div>
</div>

<div style="position: relative">
  <div style="display: inline-block; width: 80vh; height: 20vh; margin: 2vh; transform: translate(0,-2vh)"> <!-- this is pretty gross.. -->
    <!-- <div class="line-fit">https://cscheid.net</div> -->
    <div class="line-fit">https://hdc.cs.arizona.edu</div>
    <!-- <div class="line-fit">cscheid@cs.arizona.edu</div> -->
  </div>
  <div style="display: inline-block; margin: 2vh 0;">
    <img class="logo" src="../2019-11-15/images/logos/hdc.svg">
  <!--   <img class="logo" src="images/logos/ua.svg"> -->
  <!--   <img class="logo" src="images/logos/nsf.png"> -->
  <!--   <img class="logo" src="images/logos/att.png"> -->
  </div>
</div>

## This talk

* <https://cscheid.net/talks/2020-10-16> (I'm using Google Chrome)
* Three pieces on dimensionality reduction (DR):
  * DimReader
  * Deep Inverse
  * UMAP Tour

## [slide-data: backgroundImage ../tandon-march-2019/images/tsne/cnn_embed_6k.jpg] [title: line-fit bg-black] t-SNE plots are beautiful, but what are they showing us?

<div class="bg-black" style="position: fixed; top: 90vh; left: 1vh"><a href="https://cs.stanford.edu/people/karpathy/cnnembed/cnn_embed_6k.jpg">https://cs.stanford.edu/people/karpathy/cnnembed/cnn_embed_6k.jpg</a></div>

## [slide-data: backgroundImage ../tandon-march-2019/images/tsne/cnn_embed_6k.jpg] 

<div class="contents" style="position: relative; width: 100%; height: 100%"><div class="bg-black line-fit" style="position: absolute; width: 100%; font-size: 2em; top: 40vh">Shouldn't our tools provide mechanisms for inspecting their own behavior?</div></div>

## DimReader

* [Rebecca Faust, David Glickenstein, C.S., InfoVis 2018](http://cscheid.net/2018/09/29/dimreader-axis-lines-that-explain-nonlinear-projections.html)
* We give DR plots a new visual affordance: where will a point go if one of its attributes changes infinitesimally?

## A simple scatterplot

<div class="fig-container" style="width: 80%; display:inline-block" data-file="../tandon-march-2019/iframes/dimreader-demo-1/" data-scrollable="no" data-transitions="6"></div>

## t-SNE

<div id="slide-iris-tsne"><p>t-SNE visualization <span id="slide-iris-tsne-attribute-name"></span></p><div class="fig-container" style="width: 80%; display:inline-block" data-file="../tandon-march-2019/iframes/dimreader-demo-1/demo2.html" data-scrollable="no" data-transitions="4"></div></div>

## How: tangent maps

<div style="position: relative"><img class="plain" style="height: 70vh;" src="../tandon-march-2019/images/pushforward.svg"/><div class="small right">author: "User from reddit", CC BY 3.0</div></div>

## How: Automatic Differentiation (autodiff)

* For many programs which produce values of functions, you can get derivatives for about the same effort as just computing thefunction value (!)
* The procedure is entirely synctatic, so a compiler can generate code that produces derivatives
* This is how pytorch and tensorflow work, and partly why neural nets are now so popular
* a [quick tutorial on autodiff](https://cscheid.net/writing/data_science/automatic_differentiation/index.html).

## Examples, Applications

<img class="plain" style="height: 70vh; margin-top: 2em" src="../tandon-march-2019/images/dimreader/comparison-2.png"/>

## Examples, Applications

<img class="plain" style="height: 70vh; margin-top: 2em" src="../tandon-march-2019/images/dimreader/comparison-1.png"/>

## 2: Deep Inverse

* (This is unpublished work by my student Mingwei Li - unpublished because it's too simple!)
* Same general setup: we have the result of a DR method and we want to "explain it"
* Here, we attempt to find a good "inverse": a mapping from projection back into input
* This allows us to interactively with the projection

## Deep Inverse, cont.

* Obviously no exact solution exists, so we minimize an error measure
* The mapping is given by a deep neural network
* The codebase is a ~300-line Python program and a simple Javascript front-end

## Demo

* [Digits dataset](http://hdc.cs.arizona.edu/~mwli/2d-generator/)
* [Fashion Items dataset](http://hdc.cs.arizona.edu/~mwli/2d-generator-fashion/)

## Why is this exciting?

* This technique is broadly applicable
* The space of UI interactions can be low dimensional (eg. a screen is only 2D)
* Low-dimensional domains are "easy" to learn
* Other stupid ML tricks: use this to hide latency from a slow server

## 3: UMAP Tour

* Finally, I want to demo what's currently possible with modern browser technology 
* We will use DR to understand the behavior of deep neural networks (the opposite of what we just did!)
* [Toward Comparing DNNs with UMAP Tour](https://tiga1231.github.io/umap-tour/), by Mingwei Li as well. He will be present this work next Monday.

## Thank you!

* I'm cscheid@email.arizona.edu
* I'll be spending the Fall and Spring working in the ANTARES project
* I'm looking forward to meeting all of you, even if COVID-19 won't let it be in person!
* Questions?
