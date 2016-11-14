---
title: Drill 11
layout: d3_project
---

# Drill 11

Write the function `createCircles` to complete the following snippet and insert three
circles into the svg element `#svg`, each bound to one of the elements
in `data`, in order:

    <body>
      <svg id="svg">
      </svg>
      <script>
        data = [{ v1: 10, v2: 20 }, { v1: 30, v2: 20 }, { v1: 40, v2: 30 }];
        selection = d3.select("#svg");
        createCircles(selection, data); // write this function
      </script>
    </body>

## Try it

<div style="clear:both"></div>
<div>
  <div class="half-width-float tall">
    <div>Editor</div>
	<div id="editor"></div>
	<div id="run"></div>
  </div>
  <div class="half-width-float tall">
    <div>SVG Output</div>
	<div id="preview"><svg id="svg"></svg></div>
	<div id="reset"></div>
  </div>
</div>

<div>
  <div class="half-width-float">
    <div>Messages</div>
	<pre id="reports"></pre>
  </div>
  <div class="half-width-float">
    <div>DOM</div>
	<pre id="domText"></pre>
  </div>
</div>

<script src="ace.js"></script>
<script src="drill11.js"></script>
