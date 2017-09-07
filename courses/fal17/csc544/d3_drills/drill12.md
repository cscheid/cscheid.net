---
title: Drill 12
layout: d3_project
---

# Drill 12: challenge

Write the function `createTable` to complete the following snippet and
create the elements in a `table`, based on the data array.

    <body>
      <table id="table">
      </table>
      <script>
        data = [{ c1: "row 1, col 1", c2: "row 1, col 2" }, 
                { c1: "row 2, col 1", c2: "row 2, col 2" }];
        selection = d3.select("#table");
        createTable(selection, data); // write this function
      </script>
    </body>

The elements in the resulting table should look like this:

    <table id="table">
	  <tr>
	    <td>row 1, col 1</td>
	    <td>row 1, col 2</td>
	  </tr>
	  <tr>
	    <td>row 2, col 1</td>
	    <td>row 2, col 2</td>
	  </tr>
	</table>

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
	<div id="preview"><table id="table"></table></div>
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
