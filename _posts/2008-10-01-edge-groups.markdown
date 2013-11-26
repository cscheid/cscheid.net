---
layout: post_paper
title: "Edge Groups: An Approach to Understanding the Mesh Quality of Marching Methods"
tags: paper
---

Carlos A. Dietrich, Carlos Scheidegger, Joao
Comba, Luciana Nedel, Claudio T. Silva.
IEEE TVCG 14(6):1651-1658, 2008.

Marching Cubes is the most popular isosurface extraction algorithm due
to its simplicity, efficiency and robustness. It has been widely
studied, improved, and extended. While a lot of early work was
concerned with efficiency and correctness issues, lately there is a
push to improve the quality of Marching Cubes meshes so that they can
be used for computational experiments. In this work we present a new
classification of MC cases that we call Edge Groups, which helps
elucidate the issues that impact the triangle quality of the meshes
that the method generates. This formulation allows a more systematic
way to bound the triangle quality, and is general enough to extend to
other polyhedral cell shapes used in other polygonization
algorithms. Using this analysis, we also discuss ways to improve the
quality of the resulting triangle mesh, including some that require
only minor modifications of the original algorithm.

Paper in [PDF](http://www.sci.utah.edu/~cscheid/pubs/edge_groups.pdf)
format (16MB).

## Regenerating figures

### Edge group datasets

Archive with all the volumes used to generate the volume renderings of triangle quality per case, in VTK format.

* [quality_volumes_float.zip](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/quality_volumes_float.zip), 32 bit floats (~150MB)
* [quality_volumes_float.tar.gz](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/quality_volumes_float.tar.gz), 32 bit floats (~150MB)
* [quality_volumes_char.zip](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/quality_volumes_char.zip), 8-bit quantized (~8 MB) -- recommended.
* [quality_volumes_char.tar.gz](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/quality_volumes_char.tar.gz), 8-bit quantized (~8 MB) -- recommended.

### Regenerate Volume Renderings

The volume renderings in Tables 1 and 5 were generated with [VisTrails](http://www.vistrails.org). Download the software and get the vistrail [here](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering.vt). This vistrail actually downloads the 8-bit zip file above from the web and unzips a particular file inside it. Change the Unzip module to pick a different case. The available lattices are *cubic*, *BCC* and *CFK*, each with as many cases as described on the paper.

### Cubic Lattice

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_0_small.png")](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_0.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_1_small.png")](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_1.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_2_small.png")](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_2.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_3_small.png")](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_3.png)

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_4_small.png")](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_4.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_5_small.png")](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_5.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_6_small.png")](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_6.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_7_small.png")](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/cubic_7.png)

### BCC Lattice

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/BCC_0_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/BCC_0.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/BCC_1_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/BCC_1.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/BCC_2_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/BCC_2.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/BCC_3_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/BCC_3.png)

### CFK Lattice

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_0_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_0.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_1_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_1.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_2_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_2.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_3_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_3.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_4_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_4.png)

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_5_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_5.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_6_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_6.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_7_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_7.png)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_8_small.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/volume_rendering/CFK_8.png)

## Code, Scripts

The quality volumes were generated with a set of Python scripts. These scripts can also generate SVG files of parallel coordinate plots. You will need:

* Python 2.5 with a reasonably new version of numpy (we are currently running Ubuntu 8.04 (Hardy Heron)'s version on Linux, and the MacPorts version on Macs).
* teem, compiled with VTK support.
* The teem python bindings.

Download the scripts into a new directory and run them according to the instructions in the files. The main files are parallel_coordinates_svg.py, quality_histogram.py and quality_volume.py.

## Regenerate parallel coordinate plots

This visualization didn't make it into the final paper - we include it here for completeness. The script will generate an SVG file. Notice that most SVG renderers are slow, so if you want a nice parallel coordinate plot, expect Firefox to take a few seconds to render. Run the script as follows:

`./parallel_coordinates_svg.py lattice case number_of_lines > output_svg_file`

### Parallel Coordinate Plots

These illustrations are meant to highlight the worst-case edge configurations for each case. We only show the bottom 5% quality of each case - anything above that is fully transparent.

### Cubic Lattice

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_0_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_0_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_1_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_1_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_2_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_2_med.svg)

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_3_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_3_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_0_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_0_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_1_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_1_med.svg)

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_2_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_2_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_3_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/cubic_3_med.svg)

Note: The colorbar for cases 4, 5 and 7 is slightly wrong. The numbers
in the colorbar are actual indicators of minimum and maximum quality,
but the color scale is closer to what the other cases show. In these
cases, black is around 0.7, while no lines with quality above 0.77 are
shown.

### BCC Lattice

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/BCC_0_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/BCC_0_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/BCC_1_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/BCC_1_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/BCC_2_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/BCC_2_med.svg)

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/BCC_3_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/BCC_3_med.svg)

### CFK Lattice

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_0_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_0_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_1_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_1_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_2_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_2_med.svg)

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_3_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_3_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_4_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_4_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_5_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_5_med.svg)

[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_6_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_6_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_7_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_7_med.svg)
[![](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_8_large.png)](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/parallel_coordinates/CFK_8_med.svg)

### Datasets

These datasets are stored in NRRD format.

* [Silicium](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/silicium.nrrd) - Courtesy VolVis SUNY Stony Brook.
* [Engine](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/engine.nrrd) - Courtesy General Electric.
* [Lobster](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/lobster.nrrd) - Courtesy VolVis SUNY Stony Brook.
* [Bonsai](http://www.sci.utah.edu/~cscheid/vis2008/edge_groups/bonsai.nrrd) - Courtesy Bernd Tomandl and Stefan Roettger

### Talk slides

[PDF file](http://www.sci.utah.edu/~cscheid/edge_groups/edge_groups_talk_vis.pdf) with slides of talk (7.7MB)

## Source code

2009-02-08: Tarball of source code with Makefiles for Linux and OSX: [here](http://www.sci.utah.edu/~cscheid/software/macet.tar.gz). This version incorporates recent changes we made to the code, including a few tricks to remove edge group 2 entirely from the table (see talk slides for more details), and [our CiSE article](http://www.sci.utah.edu/~cscheid/pubs/noskinny.pdf). Macet is GPL v2.
