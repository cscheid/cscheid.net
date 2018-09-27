---
title: Selections, Drill 1
layout: d3_project
---

# Selections, Drill 1

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

<svg id="svg"></svg>

<script src="ace.js"></script>

<script type="module" src="drill1-1.js"></script>
