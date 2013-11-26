---
layout: post
title: "The technology behind cscheid.net: the backend"
---

In which I tell you, in two installments, how I
run [cscheid.net]("http://cscheid.net"). Here, I will give an
overview of the backend of the site. Next, I will write about the
user-visible aspects.

## Hosting

I use [Linode]("http://linode.com") to get a (virtual) box with
root privileges. I share one physical host with 3 other OS instances,
and so far I have had no problems with resource contention.  The
cheapest plan is USD20.00/month, and has enough disk and RAM to do fun
things; I'm running Lucid Lynx on the machine. Linode's monitoring
infrastructure is especially good (and includes iPhone and iPad apps
which beep if you run out of bandwidth or memory, for example). As an
example, the machine hosting my virtual image had a hardware failure,
and their watchdogs caught the problem before I did.

## PLT Web Server

The website itself uses [Racket's web server
libraries]("http://docs.racket-lang.org/web-server/"). xexprs are much
more pleasant to work with than raw HTML.  And although the huge
libraries and popularity make me a Python fan, Racket is obviously a
much better language to write for the web than PHP, Python, Perl or
just about anything else I tried. I'm not sure how this setup will
handle heavy traffic, but we'll cross that bridge when we get to it.

In addition, the web server itself does not directly handle traffic: I
was too concerned about writing my own applications running as root
(for port 80), and I didn't want to learn more about security than I
absolutely have to. The solution, as suggested by the Racket
documentations, was to use Apache to proxy the requests to my
webserver running with reduced privileges. This has the advantage that
it will be easy to switch to static content (or, say, serving from
[memcached](http://memcached.org)) whenever necessary. I
haven't written the code for that yet.

Right now, the whole website runs on 800 lines of code.

## Scribble

As I mentioned in
my [earlier
post](/blog/welcome_to_the_new_visualization__etc__)}, I really don't like Wordpress's posting infrastructure. WYSIWIG
is very convenient, but Wordpress's rendition was never particularly
consistent. The road to full control of Web content ends at raw HTML
files, but the separation of content and presentation was important to
me when I change the look of the website. I wanted something like
LaTeX, but which also let control how it compiles down to HTML: enter
Scribble.

[Scribble](http://docs.racket-lang.org/scribble/) is a ``system
for writing library documentation, user guides, and
tutorials''. Designed
by [Matthew
Flatt](http://www.cs.utah.edu/~mflatt/), [Eli Barzilay](http://barzilay.org) and
[Robert Findler](http://www.eecs.northwestern.edu/~robby/), the
syntax feels superficially like a variant of LaTeX. However, a Scribble
document is actually a [Racket](http://racket-lang.org) module,
and all the translation happens at read-time.

Scribble feels like LaTeX with Scheme under the hood. It lets me write
with a much more pleasant syntax, and it lets me cleanly separate
content and appearance by *writing the right code*. Every
post on this blog is a Scribble file (you can see the
Scribble [source](/source/blog/the_technology_behind_cscheid_net__the_backend)
for this post).

Scribble typically only supports HTML generation as a batch process,
but I hacked together something based on Racket's dynamic loading
mechanism which seems to work so far. This setup is nice in that
modules are only loaded the first time a request arrives at the
server, and so access times are pretty acceptable.

## Analytics

I don't have enough traffic to need any more analytics than what
Google Analytics gives me. The one thing I'd like to know better is
how many people read this via RSS feeds, and I'm not sure what's the
best to get to that information. Monitoring server logs, for example,
doesn't work in the case of Google Reader, which I'm guessing accounts
for a big chunk of my traffic. Any ideas?
