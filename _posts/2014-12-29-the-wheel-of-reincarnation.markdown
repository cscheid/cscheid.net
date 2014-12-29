---
layout: post
title: "Wheels of reincarnation, or 2014: where everything old is new again, and vice-versa (as usual)"
---

Year-end post, incoming!

Things that cycle are fun to think about. If something behaves
periodically, then you can make interesting predictions about its
behavior long into the future (and also long into the past).  Turns
out these cycles show up all over the place, and thinking about them
gives me an excuse to think about this year in vis.

One of my [favorite computer graphics
papers](http://www.cs.arizona.edu/~cscheid/reading/myer-sutherland-design-of-display-processors.pdf)
dates back to 1968. In it, Myer and Sutherland describe a "wheel of
reincarnation" of display processors. Simple display chips tie up your
CPU with boring display things, so you increase the complexity of the
display processor to help the CPU. If you make this
chip sufficiently powerful, you end up with a copy of your *original* CPU, but
inside the display. We've gone
around the wheel a full turn, and are now one rung
up[^1].
"so.. why not make these CPU commands a little more sophisticated?" And off we continue.
(Or: CPUs begat GPUs begat GPGPU begat Larrabee begat Xeon Phi...)

The same wheel of reincarnation is at play in CS in
general, where abstraction and performance fight one another.  We want
principles that generalize well and that work independently of one
another, so we can create big things the small existing. But the
bigger these abstractions get, the more likely they'll get in our way.

It's hard not to read Myer and Sutherland as essentially having
predicted something like the [X Window
System](http://en.wikipedia.org/wiki/X_Window_System), and why it
eventually must succumb to something like
[Mir](https://wiki.ubuntu.com/Mir/Spec?action=show&redirect=MirSpec),
which will of course be deemed too simple ("no network transparency?
well, we'll see about that", says Furious Hacker as she forks Mir and
creates X12 with everything that Mir does and more, one rung up).

For a long time computers got faster more rapidly than our data became
large. For exploratory visualization, this made the pendulum swing
long and slow in one direction. Because we essentially didn't have to
worry about efficiency, we spent a lot of time worrying about how to
make visualization infrastructure
[well-behaved](http://www2.parc.com/istl/groups/uir/publications/items/UIR-1986-02-Mackinlay-TOG-Automating.pdf),
modular, and [easily
programmable](http://idl.cs.washington.edu/files/2011-D3-InfoVis.pdf).
But data size has caught up to us, and we're now trying to figure out
how to push visualization deeper into the computation fabric: our
databases, analytics engines, data structures, and algorithms. That's
why you see [bigvis](http://vita.had.co.nz/papers/bigvis.html),
[immens](http://idl.cs.washington.edu/papers/immens),
[nanocubes](http://nanocubes.net),
[sampleAction](http://research.microsoft.com/apps/pubs/default.aspx?id=163220),
[NeedleTail](http://arxiv.org/pdf/1412.3040.pdf), and so on. I think
this is where a lot of the infovis backend work is going to happen
now: if we know that the information is going to be consumed visually
in a specific way, how does that inform our algorithm and storage
design? I'm starting to see many different specific solutions; so for
the "backend" of infovis, it feels like we're at about the halfway 
point in this particular turn.

But for the frontend, and for vis theory in particular, this year felt
very much like we're now "one rung up". In between our [algebraic design
process](http://algebraicvis.net), Cagatay (et al.)'s [perceptual
kernels](http://idl.cs.washington.edu/papers/perceptual-kernels/), and
Lane (et al.)'s [Weber's
law](http://www.cs.tufts.edu/~remco/publications/2014/InfoVis2014-JND.pdf),
it was a pretty good year for unifying ideas in vis.

Assuming this wheel cycling business has any value at all, then we can
predict that for the next few years, we'll start to see 1) particular
applications of the general theoretical groundwork that's now setup,
and 2) attempts at generalizing the backends so that they don't all
feel specific to one particular visualization type or task.

Books this year:

- Baxter and Pratchett, The Long Earth Trilogy. I read the three of them because I really love the setting. You should probably read the first one, but it's not fantastic, and if you don't like the first, don't bother with the rest.
- Neal Stephenson, Some Remarks. The non-fiction pieces are all great, and there's one particularly fun short story. Totally recommended if you're a fan, and it's a short read.
- Sheryl Sandberg, Lean In. Good read to start thinking about the mess that women in tech (and in the workplace in general) have to go through. I was mildly annoyed at the whiff of victim-blaming from Sandberg here ("all you need to do is lean in!" suggests a contrapositive that's not very accurate). With the foot-in-mouth festival that was the Grace Hopper Celebration this year, this still stands out nicely. But we have so much work to do.
- Bossypants, Tina Fey. I'm not a fan of SNL, but 30 Rock is brilliant. This is a breezy read, and although I think Fey writes better characters than memoirs, it's totally worth a Sunday afternoon with a beer or three to read through. Or airports. Lots of airports.
- [Philip Guo](http://pgbovine.net), The Ph. D. Grind. My experience in grad school was strikingly different from Philip's: I loved it pretty much from day 1. Still, students should read this as a cautionary tale: make sure your interests align with your advisor's. There are other really important lessons there. Just go read it.
- Kurt Vonnegut, Cat's Cradle. Can't remember the last time I didn't bother finishing a book. This was pretty surprising, because I *loved* Slaughterhouse Five. But I couldn't stomach more than 50 pages of this.
- William Poundstone, Fortune's Formula. Less mathy than I had hoped, but fun account of betting with Kelly's criterion, Claude Shannon's eccentricities and casino runs.
- Martha Nussbaum, Creating Capabilities. I stumbled across this book by accident, but it's truly excellent. It's kind of a manifesto for policy-makers that asks them to not give in to any easy numerical recipe for human development, and instead focus on *capabilities*. Think declaration of "universal human potentials" instead of "universal human rights": things that every human should be able to to do, instead of rights that every human should have. Really good political philosophy. Short and dense. It was slow-going for me since I've never read anything close to it, but easily worth the effort.
- Lexicon, Max Barry. I've read this book before, and Hiro Protagonist was a *much* better protagonist. I guess you should read it if you wish poets could actually kill, but you don't care for swordfighting, insane skateboarding skills, and sidecar nukes. In which case, are you dead inside? (on a positive note, Lexicon's first chapter is top-notch action. It's just that the setup doesn't lead anywhere nearly as interesting.)
- 1491, Charles Mann. How we think America looked like before Columbus got here. I was enticed by the theory I had read elsewhere that Amazon trees have much higher density of fruit-bearing trees than can be expected, and so we suspect that it's actually a gigantically-engineered farm created over hundreds of years (in other words, the noble savage myth is busted: indigenous populations muck around with the ecosystem as much as we do). But turns out there wasn't a lot of that in the book, and I had to read a whole lot of academic gossip I wasn't really interested in.
- ACM Turing Award Lectures, the First Twenty Years. What it says in the tin. I liked re-reading Dijkstra's and Backus's, but later in the year I read a bunch of Wirth, and now I want to go back and re-read his.
- The Circle, Dave Eggers. This is really not particularly well-written (it's got, easily, the most awkwardly written sex scenes I've ever read), but you can't beat the zeitgeist. In other words, I didn't care much for it, but I still tell people they should read it. It's the yin to Baxter and Clarke's Light of Other Days's yang.
- The Martian, Andy Weir. The most fun book I've read this year, hands down. It's totally nerd-bait, but it's a hilarious page-turner. I'm getting a poster with "What would Watney do?" for my office. Don't miss it.
- Ancillary Justice, Ann Leckie. I was so confused for the first 200 pages or so of this book, and was really close to giving up. But I'm glad I didn't: it's a subtler book than I was expecting, and once it gets going, it doesn't stop. This is how Vinge should have written the tines. If you liked them, then you should definitely read this (beware, though, it's the first of a trilogy).

I hope you've had a good 2014, and will have an even better 2015!

-----

[^1]: This seems like a perfect opportunity to mention the [complex logarithm](http://en.wikipedia.org/wiki/Complex_logarithm#The_associated_Riemann_surface), since I made my way through a few more chapters of Penrose's Road to Reality this year, and I find myself rereading the complex numbers chapters every time. Arc sines tell us where we are in the circle given an angle; In the boring plane they're forgetful, and can't count how many turns we've gone around the circle. But sines and cosines are really just [complex exponentials](http://www.phy.duke.edu/~rgb/Class/phy51/phy51/node15.html) in hiding. The complex logarithm is just The True Arc-Sine-Cosine, and its Riemann surface actually knows how to count. It goes up those rungs as the angle goes around the circle, and after turning $2 \pi$ radians around the origin, you've come full circle, [but you're not where you started](http://readingpenrose.com/2013/11/12/constructing-a-riemann-surface/). You're one rung up!
