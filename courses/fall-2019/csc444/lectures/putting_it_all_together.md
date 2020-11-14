---
layout: bootstrap
title: Lecture 25, Putting it all together
---

# Lecture 25, Putting it all together.

In this lecture, we will cover a topic not directly related to data
visualization, but that will inevitably come up when you try to write
a larger project. In larger projects, you will need to have your web
page communicate with the web server, typically to request data
on-demand. You will almost never want to load the entirety of the
database of interest upon loading, and so you need to know how these
communications work.

Specifically, we will go through the source code of a small, but
complete, project that creates a **custom** web server. We will write
the web server in Python using [Flask](http://flask.pocoo.org), but
there are many other options (see [below](#additional-material)).

There are no slides for today's lecture, but the source code for the
web server and the webpage that talks to it is available here:

* [Zip file](lecture25/server.zip),
* [tarball](lecture25/server.tar.gz).

### Additional Material

* [Sinatra](http://www.sinatrarb.com/), one of the original web
  microframeworks, for Ruby.
* [Flask](http://flask.pocoo.org/), the Python web library we used in
  class.
* [Spark](http://sparkjava.com/), a web library for Java.
