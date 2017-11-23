---
title: Drill 6
layout: d3_project
---

# Drill 6

Write the function `setCircleRadii` to change the radii of the circles
to be 10 times the bound value.

    <body>
      <div>
        <svg id="svg">
            <circle cx="100" cy="50" r="5" fill="red"></circle>
            <circle cx="130" cy="50" r="5" fill="green"></circle>
            <circle cx="160" cy="50" r="5" fill="blue"></circle>
        </svg>
      </div>
      <script>
        var data = [1, 2, 3];
        d3.selectAll("circle").data(data);
        setCircleRadii(d3.selectAll("circle")); // write this function
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
	<div id="preview"><svg id="svg">
            <circle cx="100" cy="50" r="5" fill="red"></circle>
            <circle cx="130" cy="50" r="5" fill="green"></circle>
            <circle cx="160" cy="50" r="5" fill="blue"></circle>
        </svg></div>
	<div id="reset"></div>
  </div>
</div>

<div style="clear:both"></div>
<div>
  <div class="full-width-float">
    <div>Messages</div>
	<pre id="reports"></pre>
  </div>
</div>

<div style="clear:both"></div>
<div>
  <div class="full-width-float">
    <div>DOM</div>
	<pre id="domText"></pre>
  </div>
</div>

<script src="ace.js"></script>

<script src="drill6.js"></script>
