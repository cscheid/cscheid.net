---
title: Joins, Drill 4
layout: d3_project
---

# Joins, Drill 4

Write the function `removeEvenCircles` that will take a selection of
elements, remove the elements whose `value` fields are even, and
return a selection with those elements.  As before, each circle is
bound to an object with the shape `{key: ..., value: ...}`.

    <body>
      <svg id="svg">
      </svg>
      <script>
        var elements = d3.selectAll("#svg")
            .data([{ key: "4", value: 6},
                   { key: "3", value: 12},
                   { key: "2", value: 5},
                   { key: "1", value: 10}],
                  function(d) { return d.key; })
            .enter().append("circle");
        removeEvenCircles(elements); // write this function
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
    <div>HTML Output</div>
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
<script src="drill2-4.js"></script>
