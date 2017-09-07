---
title: Drill 3
layout: d3_project
---

# Drill 3

Write the function `selectCircles` to return a d3 selection of all the
circles in the `svg` element.

    <body>
      <div>
        <svg id="svg">
          <circle cx="100" cy="50" r="20" fill="red"></circle>
          <circle cx="130" cy="50" r="20" fill="green"></circle>
          <circle cx="160" cy="50" r="20" fill="blue"></circle>
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
          <circle cx="100" cy="50" r="20" fill="red"></circle>
          <circle cx="130" cy="50" r="20" fill="green"></circle>
          <circle cx="160" cy="50" r="20" fill="blue"></circle>
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

<script src="drill3.js"></script>
