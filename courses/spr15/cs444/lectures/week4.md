---
layout: bootstrap
title: Week 4a, Using JavaScript for interaction
---

# Week 4a, Using JavaScript for interaction

Last week, we learned about [JavaScript](week3.html), and how to
create [basic SVG visualizations with it](week3b.html). While the
small amount of code we wrote already takes us a long way, there are a
few important bits about doing data visualization on a browser that we
have not seen yet. 

First, these visualizations are all *static*: while
[we know](week3.html) how to create basic animations, we don't know
how to make them react to user input. In other words, our
visualizations might be animated, but so far they're not
*interactive*. We'll start by learning how JavaScript handles user
input.

In addition, many modern visualization tools do not load the entire
dataset in the browser memory. Imagine Google Maps, for example: it
makes no sense to load the traffic map for New York when the user is
zoomed into the Tokyo metropolitan area. There must be some way, then,
for JavaScript to request new data from a server, depending on the
state of the program. In other words, we'll learn how to make
JavaScript interact *with a web server*. 

In the process, we will learn a little about how to write a customized
web server, for the cases where your visualization needs to talk to a
special-purpose program in the back end. This will not be a common scenario,
but in the situations where you need it, it will save you a whole lot
of trouble.

## Event Handling

MDN:
[Event handlers](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers),
[Event references](https://developer.mozilla.org/en-US/docs/Web/Events)

## AJAX

[MDN Ajax Reference](https://developer.mozilla.org/en-US/docs/AJAX)

### HTTP basics

The easiest way to write a backend to talk to a specific visualization
is to use a "web microframework": these are generally refer to a style
of writing web servers that is meant to be minimalistic and easy to
get started. Here are some examples for a variety of programming languages:

- Java: [Spark](http://sparkjava.com/documentation.html)
- Python: [Flask](http://flask.pocoo.org/)
- Ruby: [Sinatra](http://www.sinatrarb.com/)
- Node: [Express](http://expressjs.com/starter/hello-world.html)

Some of you will not need to think about what happens in the
back end, but for some final projects, writing a custom web server
will make your life easier. These microframeworks are all
designed to let you get started quickly, and are worth spending an
hour or so learning about.
