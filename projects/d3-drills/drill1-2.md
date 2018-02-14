---
title: Selections, Drill 2
layout: d3_project
---

# Selections, Drill 2

Write the function `createSvg` to create an `svg` element with
attributes `width` and `height` both equal to 300. This svg element
should be a child of the `div` with id `svg-parent`.

    <body>
	  <div id="svg-parent">
	  </div>
	  <script>
	    createSvg(); // write this function
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

<div style="clear:both"></div>
<div>
  <div class="full-width-float">
    <div>DOM</div>
	<pre id="domText"></pre>
  </div>
</div>

<div id="svg-parent"></div>

<script src="ace.js"></script>

<script src="drill1-2.js"></script>
