---
title: UA CS Lightning Talk
layout: markdown_talk
---

# [title: line-fit] better vis through math and cs!

<div class="author">Carlos Scheidegger, HDC Lab</div>
<div><img class="logo" src="../images/logos/hdc.svg"><img class="logo" src="../images/logos/ua.svg"></div>
 
## DimReader

* joint work with Rebecca Faust and David Glickenstein
* published at IEEE VIS 2018

## [slide-data: backgroundImage /talks/boston-2018/images/tsne/cnn\_embed\_6k.jpg] [title: line-fit bg-black] t-SNE plots are beautiful, but what are they actually showing us?

<p style="position:absolute; top:70vh;" class="bg-black">Source: <a href="https://cs.stanford.edu/people/karpathy/cnnembed/">Andrej Karpathy</a></p>

## a simpler example: the iris dataset

<table>
	<tr><th>Sepal Length</th><th>Sepal Width</th><th>Petal Length</th><th>Petal Width</th><th>Species</th></tr>
	<tr><td>5.1</td><td>3.5</td><td>1.4</td><td>0.2</td><td>setosa</td></tr>
	<tr><td>4.9</td><td>3.0</td><td>1.4</td><td>0.2</td><td>setosa</td></tr>
	<tr><td>4.7</td><td>3.2</td><td>1.3</td><td>0.2</td><td>setosa</td></tr>
	<tr><td>...</td><td></td><td></td><td></td><td></td></tr>
	<tr><td>7.0</td><td>3.2</td><td>4.7</td><td>1.4</td><td>versicolor</td></tr>
	<tr><td>6.4</td><td>3.2</td><td>4.5</td><td>1.5</td><td>versicolor</td></tr>
	<tr><td>6.9</td><td>3.1</td><td>4.9</td><td>1.5</td><td>versicolor</td></tr>
	<tr><td>...</td><td></td><td></td><td></td><td></td></tr>
	<tr><td>6.3</td><td>3.3</td><td>6.0</td><td>2.5</td><td>virginica</td></tr>
	<tr><td>5.8</td><td>2.7</td><td>5.1</td><td>1.9</td><td>virginica</td></tr>
	<tr><td>7.1</td><td>3.0</td><td>5.9</td><td>2.1</td><td>virginica</td></tr>
	<tr><td>...</td><td></td><td></td><td></td><td></td></tr>
</table>

## [title: empty] 

<div class="fig-container" style="width: 100%; display:inline-block"
     data-file="../boston-2018/iframes/dimreader-demo-1/"
     data-scrollable="no"
     data-transitions="6">
</div>

## [title: empty] [attribute: id slide-iris-tsne]

<p>t-SNE visualization <span id="slide-iris-tsne-attribute-name"></span></p>
<div class="fig-container" style="width: 100%; display:inline-block"
     data-file="../boston-2018/iframes/dimreader-demo-1/demo2.html"
	 data-scrollable="no"
	 data-transitions="4">
</div>

## how?

* we use automatic differentiation to compute how the projection would
  change if the data changed
* the rest is linear algebra and classic computer graphics algorithms


## DNNs through the Grand Tour

* under revisions for [distill.pub](https://distill.pub)
* joint work with Mingwei Li and Zhenge Zhao


## idea: DNNs are almost linear

* every layer is a linear map followed by a simple
  elementwise operation
  
* linear maps "just" change the basis under which the
  dnn works
	
* pick a DR algorithm robust to linear maps to see the
  neural network change the input layer-by-layer
  
  
## example: grand tour of iris

<div id="grand-tour-iris"></div>

* now do this for inputs as they go through a dnn

## demo

* [Distill article pre-print](http://hdc.cs.arizona.edu/~mwli/distill-gt/)

## takeaways

* ~~you can get through a lot of slides by speaking fast~~
* ~~i spend too much time hacking javascript slides~~
* you can do better vis with better math
* thanks
