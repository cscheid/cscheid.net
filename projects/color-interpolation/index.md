---
title: Color Interpolation Demos
layout: d3_project
---

# Color Interpolation Demos

This is a quick demo I put together so you can see the difference
between interpolations using different color spaces. You can click on
the values below and edit them. (Known bug: The hue value setting is a
little fidgety because of the non-uniqueness of hue values).

## RGB

Interpolating directly in RGB space from `d3.rgb(`<span contenteditable="true" id="rgb_ro">255</span>`,`<span contenteditable="true" id="rgb_go">0</span>`,`<span contenteditable="true" contenteditable="true" id="rgb_bo">0</span>`)` to `d3.rgb(`<span contenteditable="true" id="rgb_rd">0</span>`,`<span contenteditable="true" id="rgb_gd">255</span>`,`<span contenteditable="true" id="rgb_bd">0</span>`)`:

<div id="rgb_div"></div>

## LAB

Interpolating in LAB space from `d3.lab(`<span contenteditable="true" id="lab_lo">0</span>`,`<span contenteditable="true" id="lab_ao">1</span>`,`<span contenteditable="true" id="lab_bo">0.5</span>`)` to `d3.hcl(`<span contenteditable="true" id="lab_ld">120</span>`,`<span contenteditable="true" id="lab_ad">1</span>`,`<span contenteditable="true" id="lab_bd">0.5</span>`)`:

<div id="lab_div"></div>

## HSL

Interpolating in HSL space from `d3.hsl(`<span contenteditable="true" id="hsl_ho">0</span>`,`<span contenteditable="true" id="hsl_so">1</span>`,`<span contenteditable="true" id="hsl_lo">0.5</span>`)` to `d3.hsl(`<span contenteditable="true" id="hsl_hd">120</span>`,`<span contenteditable="true" id="hsl_sd">1</span>`,`<span contenteditable="true" id="hsl_ld">0.5</span>`)`:

<div id="hsl_div"></div>

## HCL

Interpolating in HCL space from `d3.hcl(`<span contenteditable="true" id="hcl_ho">0</span>`,`<span contenteditable="true" id="hcl_co">1</span>`,`<span contenteditable="true" id="hcl_lo">0.5</span>`)` to `d3.hcl(`<span contenteditable="true" id="hcl_hd">120</span>`,`<span contenteditable="true" id="hcl_cd">1</span>`,`<span contenteditable="true" id="hcl_ld">0.5</span>`)`:

<div id="hcl_div"></div>

# Some fun examples

* [purple to green](javascript:set(255,0,255,0,255,0))
* [blue to orange](javascript:set(30,100,240,240,160,40))
* [red to yellow](javascript:set(255,0,0,255,255,0))
* [black to green](javascript:set(0,1,0,0,255,0))
