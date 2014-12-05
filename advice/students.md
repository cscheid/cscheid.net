---
layout: static
title: Resources for Students
date: 2014-12-05 11:00:00
---

So we're going to work together. That's great! I wrote this thing to
help us both get started. 

All of the [general academic advice](index.html) I wrote applies, and
then there's this.

## "What is going on inside his head?"

At this point I've interacted with more students than you have with
research supervisors. And I've been a student before, but you (I don't
think!) haven't been a research supervisor before. These give me
better odds of knowing what's going on in your head, research-wise,
than you knowing what's in mine. I'm writing this to give you a better
idea of where I'm coming from.

As we work together, I will try hard to understand where you're coming
from, and try to make it clear to you where I'm coming from. We'll do
well together to the extent that we know what one another's thinking,
and that we both expect the same things to happen.

The general rule for our interactions should be the following. If you
don't understand something, *think*, *google*, and *ask me about it*.

## let's decide on a problem

When we get to work on some problem, it should be something that makes
you excited. If you don't like a particular research problem, *tell me
about it*. I will do my best to supply enthusiasm, but if you are not
enthusiastic about it yourself, I won't be much help.

## day-to-day

My job is to help you become a good researcher. I want you to become
independent and go forth and learn and discover and build amazing
things (because I want you to teach them to me later!). But in the
process, you will get tripped up, make mistakes, get stuck and be
generally overwhelmed. After you are a good researcher, you will
still get tripped up, make mistakes, get stuck and be generally
overwhelmed. But I hope to have prepared you for some of it.  It's not
that I'm trying to scare you. It's that I've been there, I
understand what you're going through. Research advising is *idea
gardening*.

When I started doing research, I had no idea how important
*perseverance* is. Good research is equal amounts intelligence
and grit. You already have plenty of the former (you would not be here
otherwise), and the good news is that we can train the latter. But
don't underestimate the extent to which continued work on a single
hard problem can be emotionally draining. 

This is why I want to meet with you regularly, why I want to hear
from you regularly. I want to know if you're getting frustrated, and
I don't want you to get burned out. In addition, *steady work is
better than spiky work*. We cannot help that progress is usually
spiky, but we can (and should!) have steady effort instead of spiky
effort. Deadlines and milestones are
[beautiful motivators](http://www.nytimes.com/2014/04/23/upshot/what-good-marathons-and-bad-investments-have-in-common.html?_r=0),
but they're also the easiest way to burn out.

When we meet, you should expect a lively discussion. That's because I
want our mistakes and bad ideas to show up sooner rather than
later. If you're getting started in research, you will have read more research papers
than written them. Maybe you think that the research process is neat and
orderly, like the structure of a good paper: we think of a problem, we find related
work, come up with a new idea, test it, and then think of what's next.

Well, it's nothing like that. It's messy:
we know where we want to go, but we do not really know how to get
there (that's the point!). Matt Might has a famous, great
[illustrated guide to a PhD](http://matt.might.net/articles/phd-school-in-pictures/),
which I will only nitpick in one way. Navigating towards boundary feel
more
[like this](http://boingboing.net/2010/02/09/deep-zoom-into-mande.html).
It also feels as great as that looks: noticing something no one else
has noticed before is a *huge rush*. But as you maybe already know, I
(and you, and everyone else, including true
[geniuses](http://mathoverflow.net/questions/879/most-interesting-mathematics-mistake/921#921))
make a *lot* of mistakes, and so it's important to not let the
excitement get us ahead of the truth. I want you to become comfortable
at staring at ideas (both mine and your own) that you want to be true,
and learning to spot the ones that are not[^1].

## workflow, or command-line bullshittery

I'm stealing the section title from Philip Guo's
[excellent, *excellent*](http://www.pgbovine.net/command-line-bullshittery.htm)
writeup (I'm not going to hold it against you if you leave now and go
read everything Guo has written. Seriously).

It is more than a little embarassing for our field that the best way
we know how to carry our day-to-day research is by interacting with
computers through a command-line interface that's been the same for,
more or less, 40 years. But them's the breaks, so my job is to make it
as easy as possible for you to get used to it yourself.

You will need to learn either [git](http://git-scm.com/) or
[mercurial](http://mercurial.selenic.com/). We are going to use
version control to share source code, paper manuscripts, and possibly
data. Dropbox is nice, but when the time of a paper deadline arrives,
we will want to be editing the same files at the same time. We want to
avoid the dreadful "who has the writing token?" emails, and, even more
so, we want to avoid the
"paper\_version1\_ab\_november\_please\_stop.tex" madness. Distributed
version-control systems are *wonderful* for that.

You will need to learn one of the standard shells: `bash`, `tcsh`,
`zsh`, or whatever you like. 

You can use an IDE for developing your code if you like, but if you do
so, I will want you to make sure everything builds from the
command-line (ideally from a single Makefile, but I'll take `ant`,
`scons`, `autotools`, `CMake`, or something like that). I'm happy to
share with you whatever little Emacs I've picked up over the years,
and if you know vi, I want to learn!

## back up your files. Back. up. your. files.

Don't lose a month of writing because someone stole your
laptop, or because some idiot walking past you at the coffee shop
decided it was time to plaster your keyboard with caffeine and you
with awkward apologies.

Everything that is important about your research should be saved in a
system that's backed up, *automatically*, by someone other than
yourself (emailing files to yourself does not count). Dropbox is not backup,
[unless you pay for the packrat option](https://www.dropbox.com/en/help/113). For
example, have a [cron job that rsyncs](#command-line-bullshittery)
your contents with the university machines, or run CrashPlan, or
*something*. I will ask you about your backups.

<br/><br/><br/>

-------

[^1]: Take the [famous story by Feynman about Wheeler](http://www.nobelprize.org/nobel_prizes/physics/laureates/1965/feynman-lecture.html) (the paragraph starts with "as a by-product..."). Wheeler suggests to Feynman that the reason all electrons have the same mass is that *they are the same electron*. This is beautiful, and, that's why positrons exists: *they are just the same electron going back in time*. But wait, says Feynman, in that case the direction of time can't matter, so why do we see more electrons than positrons? Wheeler tries to salvage the idea but no, it doesn't really work. At the same time, the idea that a positron is indistinguishable to an electron when you flip time *does* work. Moral: be willing to attack any idea. Good ideas survive, and bad ideas can be turned into good ones.
