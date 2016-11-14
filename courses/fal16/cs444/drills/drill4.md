---
title: Drill 4
layout: d3_project
---

# Drill 4

Write the function `selectCircles` to return a d3 selection of all the
circles that are children of the `group-2` element.

    <body>
      <div>
        <svg id="svg">
          <g id="group-1">
            <circle cx="100" cy="50" r="20" fill="red"></circle>
            <circle cx="130" cy="50" r="20" fill="green"></circle>
            <circle cx="160" cy="50" r="20" fill="blue"></circle>
          </g>
          <g id="group-2">
            <circle cx="100" cy="90" r="20" fill="cyan"></circle>
            <circle cx="130" cy="90" r="20" fill="magenta"></circle>
            <circle cx="160" cy="90" r="20" fill="yellow"></circle>
          </g>
        </svg>
      </div>
      <script>
        var sel = selectCircles(); // write this function
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
	  <g id="group-1">
 	      <circle cx="100" cy="50" r="20" fill="red"></circle>
		  <circle cx="130" cy="50" r="20" fill="green"></circle>
		  <circle cx="160" cy="50" r="20" fill="blue"></circle>
	  </g>
	  <g id="group-2">
 	      <circle cx="100" cy="90" r="20" fill="cyan"></circle>
		  <circle cx="130" cy="90" r="20" fill="magenta"></circle>
		  <circle cx="160" cy="90" r="20" fill="yellow"></circle>
	  </g>
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

<script src="drill4.js"></script>
