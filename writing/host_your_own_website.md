---
layout: bootstrap_wide
title: Host your own website
---

# Host your own website

If you are at all technically minded and have some kind of public
presence (the appropriate test for this being "would someone want to
hire you based on what they know of *you in particular*?"), then you
should really host your own website. It's relatively cheap, easy, and
maintenance-free. 

This piece is not meant to be comprehensive. Use The Google.

## Control your personal infrastructure

The fundamental reason for having your own website is to control how
you present yourself. In other words, you don't want to depend on
other companies for this. Geocities has come and gone. Myspace has
come and gone, Facebook is here now -- although you shouldn't be using
Facebook for your online presence *anyway* -- but it will also one day go. As
will Twitter, GitHub, neocities, and most other services you can think
of. The web has existed
[since ~1990](https://en.wikipedia.org/wiki/History_of_the_World_Wide_Web),
and so as of the time I'm writing this, it's 26 years old. You can
then reasonably expect it to be at least 50. How many of the companies
above do you expect to exist in 2040? And yet, you should by all means
plan to be alive and professionally active by 2040.

Instead of depending of fleeting companies, you can invest a weekend
of time learning how to host your own website and your own server.

I currently use [namecheap](http://www.namecheap.com) for my domain
purchases, and you can get many of them for around a dollar a month.

I use [DigitalOcean](http://www.digitalocean.com) for the actual
hosting. This webserver is currently a U$20/month machine because I host
other services, but I'm considering downgrading it to a U$5/month
machine.

In case any of these companies go out of service, you can simply move
your domain and machines to competitors. The important thing is that
your website keeps the same address and look.

# Steps

### Boot up a Unix machine in the cloud

I used to host my server using [Linode](http://www.linode.com), but I
switched to [DigitalOcean](http://www.digitalocean.com) recently and
I've been happy with it. You can also use Amazon's famous
[EC2](https://aws.amazon.com/ec2/) service, but its UI is atrocious
for a simple use-case like this. I suppose you could use Microsoft's
Azure, but you can take the `/` mountpoint from my cold, dead hands.

Unix is older than windows, and
[yes, it's awful](https://en.wikipedia.org/wiki/The_Unix-Haters_Handbook). But
my bet is it will outlive Windows.

### Pick a boring Linux distribution

You don't want to be futzing around with the latest, coolest Linux
thing. Not for this. Remember, you're setting this up so that you need
to make real updates once every year or so. I like
Ubuntu LTS (Long-term support) versions for this, and currently that
means [16.04 LTS](http://releases.ubuntu.com/16.04/). Canonical
promises 5 years of support, which means that you'll ideally only have
to fully install a new operating system in your server once every five
years. That's not very long-term, but it's a good, sweet spot in
terms of longevity and convenience.

I am currently running Ubuntu 14.04 (although it's really not
important, and I actually had to check).

### Set up SSH keys

You will be doing a fair amount of logging into this remote machine
you now have, and you will want to automate a lot of it using
scripts. As a result, you really want to set up passwordless login
with SSH. Matt Might's excellent
[SSH hacks](http://matt.might.net/articles/ssh-hacks/) articles covers
all the bases here.

### Apache or nginx

You don't need PHP, ASP, Rails, Express, Flask, Tornado, or anything
that runs actual code every time a webpage is requested from your
server. Stick to HTML served from Apache or nginx, and that's more than
good enough for a personal webpage. It cuts down drastically on
maintenance: you don't want to keep worrying about security issues
that pop up with PHP or node or every other day, and you *really*
don't want your server being compromised, and used as a spam relayer
or Bitcoin miner.

Instead, choose one of the boring web servers - [Apache](https://httpd.apache.org/) or
[nginx](https://www.nginx.com/resources/wiki/) are both fine
choices. Most importantly, both have vast amounts of easily
searchable information online. For this, Google is really your friend.

I use nginx.

### Create your content

Create a webpage! Either use your favorite text editor to write HTML
by hand (I know, yuck), or use a static website generator. I currently
use [Jekyll](https://jekyllrb.com/).

# How much extra work will this be?

You'll need to maintain your server. I use
[automatic security updates on Ubuntu](https://help.ubuntu.com/community/AutomaticSecurityUpdates),
and plan to update the actual OS once every 4 years or so. Every once
in a while this means you'll want to run a new version of some
software that's not available in the Ubuntu repositories. That's
annoying, but it's far less annoying than having to worry about your
Wordpress deployment getting hacked on a weekly basis.

If your cloud provider (in our case, DigitalOcean) goes down, so will
your webpage. This is annoying, and is arguably a reason for you to go
with older, stodgier companies like Amazon. But Amazon services also go down,
and since we're shooting for a sweet spot between convenience and
longevity (and not an impressive number of nines in our uptimes), I
don't think you need to go with Amazon.

## Other options

* If you use Amazon's storage service, then you can host a static
  website
  [directly from one of your S3 buckets](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html). I
  don't expect S3 to go away in 25 years, so this might actually be a
  feasible long-term solution.

* [Site 44](https://www.site44.com/) (disclosure: I know one of the
  folks behind it) is a good short-term alternative if you don't want
  to host a server yourself. Buy a domain, get a Dropbox account, and
  you're there. When they eventually go out of service, though, you'll
  have to come back to this page.

* [Github pages with custom domains](
  https://help.github.com/articles/using-a-custom-domain-with-github-pages/). 
  If you already use Github, another option you have is to use
  Github pages and associate it to your domain. This has about the
  same trade-offs as site44 above: if you like Github, it'll be
  convenient. If you don't, it won't. In addition, if either of Github
  or Site44 or Dropbox go down, so will your webpage.
