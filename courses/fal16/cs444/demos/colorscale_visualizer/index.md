---
title: Color Scale visualizer
layout: d3_project
---

# Visualizing continuous color scales

These three different curves show three continuous color scales as
they interpolate between two colors linearly, except the interpolation
happens in three different color spaces: RGB, Lab, and HCL. The
points in the curve are plotted in Lab coordinates, where
increasing luminance points "up", and the ab coordinates range in the other two
directions: horizontally and into the screen. The wireframe cube
delimits the Lab space in 0 <= L < 100, -100 < a < 100, -100 < b < 100.
The circle delimits the values with Chroma less than 100.

Can you tell which curve uses which color space?

<script src="lux.js"></script>

<div id="main"><canvas id="scatterplot" width="720" height="480"></canvas></div>

<table>
<tr> 
<td>From:</td>
<td id="l1-1">R</td> <td><input type="number" id="c1-1" min="0" max="255" step="10" value="255"></input></td>
<td id="l1-2">G</td> <td><input type="number" id="c1-2" min="0" max="255" step="10" value="255"></input></td>
<td id="l1-3">B</td> <td><input type="number" id="c1-3" min="0" max="255" step="10" value="255"></input></td>
<td>
<select id="c1-space">
  <option value="rgb" selected>RGB</option> 
  <option value="lab">Lab</option>
  <option value="hcl">HCL</option>
</select>
</td>
</tr>
<tr> 
<td>To:</td>
<td id="l2-1">R</td> <td><input type="number" id="c2-1" min="0" max="255" step="10" value="255"></input></td>
<td id="l2-2">G</td> <td><input type="number" id="c2-2" min="0" max="255" step="10" value="255"></input></td>
<td id="l2-3">B</td> <td><input type="number" id="c2-3" min="0" max="255" step="10" value="255"></input></td>
<td>
<select id="c2-space">
  <option value="rgb" selected>RGB</option> 
  <option value="lab">Lab</option>
  <option value="hcl">HCL</option>
</select>
</td>
</tr>
</table>

