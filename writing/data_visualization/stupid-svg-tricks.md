---
title: Stupid SVG Tricks
layout: bootstrap
---

# Stupid SVG Tricks

Things that are useful to know when writing code that emits SVG.

* [use pointer-events to have SVG elements ignore mouseover, etc.](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)

## D3-specific hacks

Things you'll probably want to know about when writing D3 code.

* [`moveToFront` is very useful](https://stackoverflow.com/a/14426477/221007)
* [D3 brushes](https://github.com/d3/d3-brush) create an invisible,
  SVG-wide rectangle in order to capture mouse events (for making
  selections, etc). This means that if you want to capture events on
  *other* elements of your SVG, the D3 brush should appear *before*
  the other SVG elements in the DOM order (so the other SVG elements
  are drawn).
