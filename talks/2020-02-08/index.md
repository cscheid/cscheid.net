---
title: UA CS Lightning Talk
layout: markdown_talk
---

<script src="https://cdn.jsdelivr.net/npm/vega@5.8.1"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4.0.0-beta.12"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6.1.0"></script>

# [title: line-fit] Machine Learning: for whom, by whom, to whom?

<div class="author">Carlos Scheidegger, HDC Lab</div>
<div><img class="logo" src="../images/logos/hdc.svg"><img class="logo" src="../images/logos/ua.svg"></div>

# Who we are

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

## Computing is cheap

<div id="cost-per-gflop"></div>

## Storage is cheap

<div id="cost-per-megabyte"></div>

## Software is expensive!

* We spend U$312 billion per year on debugging alone

## Machine Learning is a way out

* Instead of writing code, we come up with examples of the expected
  behavior.
  
* Then, we write one (pretty weird) program *once*, and make
  the computer adapt this program so that it does the things
  in the data.
  
* Then we need data!

## [slide-data: backgroundImage /talks/2020-02-08/jason-pacheco.jpg] [title: bg-black] The Promise of Machine Learning

* Milstein, *Pacheco*, et al.  
  Intracortical Brain-Computer  
  Interfaces, NeurIPS 2017

## [title: line-fit] The Peril of Machine Learning, 2009

<iframe width="100%" height="600vh" src="https://www.youtube.com/embed/t4DT3tQqgRM" data-autoplay></iframe>

## [title: line-fit] The Peril of Machine Learning, 2018

<iframe width="100%" height="600vh" src="https://www.youtube.com/embed/TWWsW1w-BVo" data-autoplay></iframe>

## But how does it all work?

## [title: line-fit] Yet another AI CS admissions app

* YAICS, for short
* AI will determine which PhD applicants to accept
* ... using features associated with good and bad applications
* ... using historical data
* *It is data-driven, it will be objective!*

## [slide-data: backgroundImage /talks/2020-02-08/fifa.jpg] [title: bg-black line-fit] The features are obvious and exact, right?

## In reality...

* GPA 
* GRE scores
* Relevant Major?
* Good School?
* Research Experience?
* ...
* Our goal: evaluate application *quality*.


## YAICS

* create a rule that assigns a score to each candidate
* select the high-scoring candidates
* What rule?

## Here's the data

<table style="font-size: 1.5em">
<tr><th></th><th>Ajit</th><th>Blake</th><th>Cedric</th><th>Daniela</th></tr>
<tr><td>GPA</td><td>3.75</td><td>4.0</td><td>3.5</td><td>3.8</td></tr>
<tr><td>GRE-V</td><td>120</td><td>105</td><td>120</td><td>95</td></tr>
<tr><td>GRE-Q</td><td>110</td><td>117</td><td>100</td><td>130</td></tr>
<tr><td>GRE-A</td><td>5</td><td>4</td><td>3</td><td>6</td></tr>
<tr><td>major</td><td>CS</td><td>CS</td><td>Math</td><td>ECE</td></tr>
<tr><td>school</td><td>MIT</td><td>ASU</td><td>NAU</td><td>UA</td></tr>
<tr><td>research?</td><td>yes</td><td>no</td><td>no</td><td>yes</td></tr>
<tr><td><b>PhD in 6?</b></td><td><b class="yes">yes</b></td><td><b class="no">no</b></td><td><b class="yes">yes</b></td><td><b class="yes">yes</b></td></tr>
</table>

## How do we evaluate our rule?

<table style="font-size: 0.8em">
<tr><th></th><th>Ajit</th><th>Blake</th><th>Cedric</th><th>Daniela</th></tr>
<tr><td>GPA</td><td>3.75</td><td>4.0</td><td>3.5</td><td>3.8</td></tr>
<tr><td>GRE-V</td><td>120</td><td>105</td><td>120</td><td>95</td></tr>
<tr><td>GRE-Q</td><td>110</td><td>117</td><td>100</td><td>130</td></tr>
<tr><td>GRE-A</td><td>5</td><td>4</td><td>3</td><td>6</td></tr>
<tr><td>major</td><td>CS</td><td>CS</td><td>Math</td><td>ECE</td></tr>
<tr><td>school</td><td>MIT</td><td>ASU</td><td>NAU</td><td>UA</td></tr>
<tr><td>research?</td><td>yes</td><td>no</td><td>no</td><td>yes</td></tr>
<tr><td><b>PhD in 6?</b></td><td><b class="yes">yes</b></td><td><b class="no">no</b></td><td><b class="yes">yes</b></td><td><b class="yes">yes</b></td></tr>
</table>

<ul><li>Don't assess your rule on the data you used to compute the rule!</li>
    <li><b>Overfitting</b>: You don't want your ML to memorize</li>
	<li>Split the data into <b>training</b> and <b>testing</b></li>
	</ul>

## [slide-data: backgroundImage /talks/2020-02-08/yaicsv1.png] How about a very simple rule?

## [slide-data: backgroundImage /talks/2020-02-08/yaicsv2.png] ... Maybe more complicated?

<table style="font-size:0.8em; margin-right: 0px">
<tr><th></th><th>Ajit</th><th>Blake</th><th>Cedric</th><th>Daniela</th></tr>
<tr><td>GPA</td><td>3.75</td><td>4.0</td><td>3.5</td><td>3.8</td></tr>
<tr><td>GRE-V</td><td>120</td><td>105</td><td>120</td><td>95</td></tr>
<tr><td>GRE-Q</td><td>110</td><td>117</td><td>100</td><td>130</td></tr>
<tr><td>GRE-A</td><td>5</td><td>4</td><td>3</td><td>6</td></tr>
<tr><td>major</td><td>CS</td><td>CS</td><td>Math</td><td>ECE</td></tr>
<tr><td>school</td><td>MIT</td><td>ASU</td><td>NAU</td><td>UA</td></tr>
<tr><td>research?</td><td>yes</td><td>no</td><td>no</td><td>yes</td></tr>
<tr><td><b>PhD in 6?</b></td><td><b class="yes">yes</b></td><td><b class="no">no</b></td><td><b class="yes">yes</b></td><td><b class="yes">yes</b></td></tr>
</table>
<div style="float:right; margin-top: 100px">$p_1 \textrm{GPA} + p_2 \textrm{GRE-V} + p_3 \textrm{GRE-Q} + p_4 \textrm{GRE-A} + $</div>
<div style="float:right; margin-top: 20px">$p_5 \textrm{major} + p_6\textrm{school} + p_7\textrm{research}$</div>

## [slide-data: backgroundImage /talks/2020-02-08/yaicsv3.png]

## [slide-data: backgroundImage /talks/2020-02-08/yaicsv4.png] [title: line-fit] And this is a "deep" neural network

## How do we find the right values?

* Often, it's just *gradient descent*
* Force the (bad) model to make a prediction at a random data point
* Measure the error, take the gradient of the error wrt the parameters
* Nudge parameters in the (negative) direction, repeat
* Eventually, stop

## So now that you know how to do it.. (often) don't!

## Where did you get that data?

* Who decided if the previous admission process was good?
* What if (and hear me out here) there were times where the admissions committee made a mistake?
  * What if your recruiting efforts were imbalanced with respect to gender?
* What if you were giving out mortgages instead?

## [slide-data: backgroundImage /talks/2020-02-08/redlining.jpg]

## [slide-data: backgroundImage /talks/2020-02-08/bullshit-gaydar.png]

## [slide-data: backgroundImage /talks/2020-02-08/criminality-paper.png]

## [slide-data: backgroundImage /talks/2020-02-08/phrenology.png]

## We don't really understand this!

<div style="float:left"><img style="margin:auto" src="adversarial-stop.png" width="700vh"></div>
<div style="float:right">
<ul><li>Computer says:</li>
	<li>Left: "stop"</li>
	<li>Right: "45 mph"</li></ul></div>
<div style="clear:both"></div>	
<ul><li>"Robust Physical-World Attacks on Deep Learning Visual Classification", CVPR 2018</li></ul>

## [title: line-fit]

## [title: line-fit] So you're going to use ML. Great!

* But if it's about people, *please ask yourself this*:
  * **Who benefits from it?** (For whom?)
  * **Who are the targets, and who suffers from mistakes?** (To whom?)
  
## [title: line-fit] So you're going to use ML. Great!

* But if it's about people, *please ask yourself this*:
  * Is your data going to repeat our racist, sexist past?
  * Did you ask them if they want it? 
  * Are you ready to stop if they say no?
  * **Do you truly know the domain? Why you?** (By whom?)

## ML is not an excuse to ignore ethics, history, and society!

## Thank you!

* and thank you to 
  * my colleagues Stephen Kobourov and Jason Pacheco for their examples and materials
  * McCallum and Blok for storage data
* Come to mine and Stephen's talk at the Centennial Hall, Feb 25th!
* @scheidegger, https://cscheid.net
