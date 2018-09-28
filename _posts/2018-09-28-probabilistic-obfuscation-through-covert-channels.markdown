---
layout: post_paper
title: "Probabilistic Obfuscation Through Covert Channels"
tags: paper
thumb: 2018-ieeesp-covertchannels
paper_link: /static/papers/ieeesp_covertchannels_2018.pdf
---

Jon Stephens, [Babak Yadegari](https://www2.cs.arizona.edu/~babaky/), [Christian Collberg](http://www.cs.arizona.edu/~collberg), [Saumya Debray](http://www.cs.arizona.edu/~debray), [Carlos Scheidegger](/)

This paper presents a program obfuscation framework that uses covert channels through the program's execution environment to obfuscate information flow through the program. Unlike prior works on obfuscation, the use of covert channels removes visible information flows from the computation of the program and reroutes them through the program's runtime system and/or the operating system. This renders these information flows, and the corresponding control and data dependencies, invisible to program analysis tools such as symbolic execution engines. Additionally, we present the idea of probabilistic obfuscation which uses imperfect covert channels to leak information with some probabilistic guarantees. Experimental evaluation of our approach against state of the art detection and analysis techniques show the engines are not well-equipped to handle these obfuscations, particularly those of the probabilistic variety.

[pdf](/).
