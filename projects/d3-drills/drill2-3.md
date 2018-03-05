---
title: Joins, Drill 3
layout: d3_project
---

# Joins, Drill 3

Write the function `updateEvenCircles` that will take a selection of
elements, and update the data bound
to circles with even keys to the values in the variable `parameter`.
Each circle is bound to an object with the shape `{key: ..., value:
...]`, and the join selection 
corresponding to the `key` field of each value in the array.

    <body>
      <svg id="svg">
      </svg>
      <script>
        var elements = d3.selectAll("#svg")
            .data([{ key: "1", value: 10},
                   { key: "2", value: 5},
                   { key: "3", value: 12},
                   { key: "4", value: 6}],
                  function(d) { return d.key; })
            .enter().append("circle");
        data = [{ key: "2", value: 100},
                { key: "4", value: 200}];
        updateEvenCircles(elements, data); // write this function
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
<script src="drill2-3.js"></script>
