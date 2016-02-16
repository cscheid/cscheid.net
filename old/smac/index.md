---
layout: static
title: 'Companion page to "Practical CFD Simulations on the GPU using SMAC"'
date: 2010-11-21 8:00:00
---

This is the companion page to the paper published in the December 2005 issue of
the Computer Graphics Forum entitled "Practical CFD Simulations on the GPU
using SMAC". About the only thing you might want to get here is the source code
to the project, with all vertex and fragment programs, and pre-built
binaries. *You should be warned, though, that GPGPU applications are notoriously
brittle to driver changes, and I have made no changes to the code
since late 2004*. The main purpose in releasing the source is to allow practitioners to
quickly get the inside scoop on GPGPU hacking (since it's definitely trickier than it
looks like).
*This has essentially been obsoleted by CUDA and friends* - oh well, it was fun while it lasted...

Feel free to use this code for your own projects. If you write a paper
using my code, or use it to compare against your own version, please
reference the journal version of the paper.

### Downloads

* [Zip file for PGHFlow, binaries pre-build for Windows](/static/software/smac/PGHFLow.zip)   (PGHFLow depends on   [Cg](http://developer.nvidia.com/object/cg_toolkit.html),   [GLEW](http://glew.sourceforge.net), and partly on   [GLUI](http://www.cs.unc.edu/~rademach/glui/). 
* [Manuscript](http://www.sci.utah.edu/~cscheid/pubs/smac-cgf.pdf)   (final version appeared on Computer Graphics Forum, 24(4):715-728)
