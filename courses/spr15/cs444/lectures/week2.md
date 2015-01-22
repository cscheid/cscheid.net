---
layout: bootstrap
title: Week 2, The basics of the web stack
---

# Reading material

Scott Murray's "Interactive Data Visualization for the Web",
[chapter 3](http://chimera.labs.oreilly.com/books/1230000000345/ch03.html).
Scott has graciously put the entire book online, but it is
nevertheless a book that is entirely worth buying.

# HTML

## Elements

# DOM

# CSS

# SVG

## Presentation attributes

Some things are HTML attributes; some are CSS properties. Confusingly,
a subset of SVG attributes can also be specified via CSS: these are
the
["presentation attributes"](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute).
It's worth remembering this because CSS definitions for these
attributes will override the attribute definitions. This is
inconsistent with the rule for the `style` attribute itself, which
overrides CSS definitions (on behalf of whoever designed this
standard: I am sorry).

### Things I should remember to tell you in class

- Become (very) familiar with the developer tools in at least one
  browser. I know Chrome and that's what I'm going to use in class
  (and what I can help you with), but you're free to pick whatever you
  want.

- During development, consider disabling browser cache.

#### Resources I find invaluable

- http://bl.ocks.org, but I told you about that one already.

- The [Mozilla Developer Network](https://developer.mozilla.org/) is
  the best source of high-quality documentation about web development
  out there. When I'm googling around for information on anything that
  involves the web, I usually add "mdn" to my search terms, to make
  sure I don't accidentally click on anything from w3schools.com (they
  have some information, but it's usually bad practices, it's not
  up-to-date, and they got famous by essentially pretending to
  be associated with [w3.org](http://w3.org), the World Wide Web
  Consoritum. That's just awful.)

- HTML5 validator: http://validator.w3.org/ Syntax checker for
  HTML5. Why browsers don't offer this by default is entirely
  bewildering, but there you have it.
