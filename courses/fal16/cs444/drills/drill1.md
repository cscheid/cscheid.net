---
title: Drill 1
layout: d3_project
---

# Drill 1

Write the function `selectSvg` so that it returns a d3 selection
object which contains a selection of a single node with id `svg`.

    <body>
	  <svg id="svg">
	  </svg>
	  <script>
	    selection = selectSvg(); // write this function
	  </script>
	</body>
	
## Try it

<div style="clear:both"></div>
<div>
  <div class="full-width-float short">
    <div>Editor</div>
	<div id="editor"></div>
	<div id="run"></div>
  </div>
</div>

<div style="clear:both"></div>
<div>
  <div class="full-width-float">
    <div>Messages</div>
	<pre id="reports"></pre>
  </div>
</div>

<div id="svg"></div>

<script src="ace.js"></script>

<script src="drill1.js"></script>

