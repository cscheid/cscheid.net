---
layout: bootstrap
title: Week 2, The basics of the web stack
---

# Week 2, The basics of the web stack

This week, we go over the very basics of how the content of a web page
is represented in HTML. We will learn some simple CSS, which lets us separate the content of
the web page with how we want it to look; this separation will let us
change both things independently of one another, which will help a lot
when we're quickly iterating over designs. For visual elements such as
lines, circles and polygons, we will learn SVG.

## Reading material

Scott Murray's "Interactive Data Visualization for the Web" has an
[entire chapter devoted to this](http://chimera.labs.oreilly.com/books/1230000000345/ch03.html).
Scott has graciously managed to convince his publisher to put the
entire book online. Still, you should totally buy it. It's short,
sweet, and [only 25 bucks on Amazon](http://smile.amazon.com/s/ref=nb_sb_ss_i_0_14?url=search-alias%3Daps&field-keywords=interactive+data+visualization+for+the+web&sprefix=interactive+da%2Caps%2C398).

# HTML

In this course we will use HTML to create our data
visualizations. HTML stands for "HyperText Markup Language". 25 years
ago, [that used to be a meaningful description of what HTML actually
did](http://www.w3.org/People/Raggett/book4/ch02.html): it has links
([hypertext](http://en.wikipedia.org/wiki/Hypertext)), and it is a
[markup language](http://en.wikipedia.org/wiki/Markup_language). But
we will be using many things from the HTML5 standard, which does much,
much more:
[graphics](https://developer.mozilla.org/en-US/docs/Web/SVG),
[audio, video](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video),
[full-duplex communication between web browser and web server](https://developer.mozilla.org/en-US/docs/WebSockets),
etc. So I find it easier to think of HTML as "whatever it is that web
browsers know how to interpret", and just not think about the actual
term, like
[cutting open a book](http://www.themillions.com/2010/02/deckle-edge-in-the-age-of-mechanical-reproduction.html)
or [dialing a phone](http://en.wikipedia.org/wiki/Rotary_dial).

## Elements

The important thing about HTML is that the markup is represented by
*elements*. An HTML *element* is a portion of the content that is
surrounded by a pair of *tags* of the same name. Like this:

    <strong>This is an HTML element.</strong>

In this element, `strong` is the name of the tag; the open tag is `<strong>`,
and the matching closing tag is `</strong>`. The way you should
interpret this is that the text "This is an HTML element" should be
"strong", for some strong (typically this will be bold text). HTML
elements can nest:

    <strong>This is strong, and <u>this is underlined and
    strong.</u></strong>

(Line breaks in HTML do not translate to line breaks in the rendered
result.) In addition to the names, opening tags can contain extra
information about the element. These are called *attributes*:

    <a href="http://www.google.com">A link to Google's main page</a>

In this case, we're using the `a` element (which stood for "anchor",
but now is almost universally used as a "link" --- go figure). `href`
means "HTML reference", which actually makes sense for a change. The
meaning given to each attribute changes from element to element. In
this case, the above element would be rendered as below:

[A link to Google's main page](http://www.google.com)

We will use element attributes in pretty much very example from now
on. The most important ones are `id`, `class`, and
`style`. The `id` attribute gives the attribute a name, which can then
be used to access the element via Javascript (we'll see how next
week). Think of it as making the element accessible via a global
variable. This is as convenient as a global variable, and potentially
just as confusing: needing lots of different element `id`s might be
a sign that you could organize your code better (in the next weeks
we'll learn about good practices like this). (The `class` and `style`
attributes will be explained soon, in the [CSS](#CSS) section below.)

## Necessary boilerplate

An HTML5 document has a little bit of necessary boilerplate that you
should just copy and paste every time you need to get started (and no,
you won't get charged with plagiarism for this one bit.). Every HTML5
document you create in class should have this skeleton:

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8"/>
        <title>Ceci n'est pas un document HTML</title>
      </head>
      <body>
      </body>
    </html>

(The perceptive reader will note that the first line is not an
element. It's actually a
[document type declaration](http://en.wikipedia.org/wiki/Document_type_declaration),
which betrays the origin of HTML as a simplified version of
[SGML](http://en.wikipedia.org/wiki/Standard_Generalized_Markup_Language). You
*really* don't need to know about SGML.)

HTML5 documents need a header, and this header should in most cases
include a charset declaration. We'll always use UTF-8, so that when I
write about the Blue Öyster Cult, you'll be able to read
it. (Actually, it's because Mike Bostock loves
[Unicode identifiers](https://github.com/mbostock/d3/issues/1817)
[ಠ_ಠ](http://knowyourmeme.com/memes/%E0%B2%A0_%E0%B2%A0-look-of-disapproval). Ensuring
we use the same character set as d3 will save ourselves some potential
debugging trouble.)

## Self-closing elements

Some elements rarely have internal content, and it becomes a bit of a
pain to type the closing tags every time. In that case, you can use
the following shorthand notation: `<foo/>` is equivalent to
`<foo></foo>` (you might have noticed that in the charset declaration above).

# DOM

As we have seen above, a markup document
looks a lot like a tree: it has a root, the `HTML` element, and
elements can have children that are containing elements themselves. 

While HTML is a textual representation of a markup document, the DOM
is a programming interface for it. DOM stands for "Document Object
Model", and in this class we will use "DOM" to mean the tree
created by the web browsers to represent the document, and the API
that they provide in order to access it. This week, we will not use
the API part of it, but the examples we'll go over in class will
highlight the tree structure of the DOM.

## Inspecting the DOM in a live browser

Perhaps the most important habit you will learn in these first web
lessons is the following: when in doubt, go to the Developer
Tools. In this case, we'll look at the Element tree, by clicking on
the menu bar: View
&rarr; Developer &rarr; Developer Tools. (Alternatively, you can right click
on any part of the webpage, and choose "Inspect Element")

Here's a very simple separate web page, embedded inside this document:

<div><iframe src="week2/index.html" width="960" height="480">boo</iframe></div>

Go ahead, play around with the element tree in there. If you want to
see that page in a new tab, <a href="week2/index.html"
target="_blank">click here</a>. Compare what you see with the source
code, by clicking View &rarr; Developer &rarr; View Source, or
right-click on the webpage, and View Page Source.

# CSS

HTML specifies the content of a web page, but plain HTML says
relatively little about how the content *looks*. This is where CSS
comes in. CSS stands for Cascading Style Sheeets: they are external
declarations that control the way your elements will get rendered by a
web browser. A full discussion of CSS syntax is, as usual, given at
the
[MDN CSS website](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax);
we show the very basics here.

A stylesheet will usually consist of a list of CSS *rules* that are
inserted in `<style>` elements on the HTML header, `<head>`. A single
CSS rule associates a CSS *selector* with a set of CSS
*declarations*. These are easier to see through examples. 

## CSS element selectors

Let's look
at a very simple CSS rule:

    strong {
        background-color: red;
        font-size: 300%;
    }

In this rule, `strong` is the selector, and each line inside the curly
brackets is a declaration. Roughly, the way this goes is: for every
DOM element with tag name `strong`, make its background color red, and
its font size 300% of the base size. CSS rules are applied in order
that they appear in the document, and if more than one rule matches
the element, then they both apply. For instance, the example below is
entirely equivalent to the above:

    strong {
        background-color: red;
    }
    
    strong {
        font-size: 300%;
    }

## CSS class selectors

CSS selectors can be much more powerful than selecting on element
names. For example, we can create user-defined "classes" of
style. Imagine I had HTML that looked like this:

    <div class="important">Some text</div>
    <div class="footnote">Some other text</div>

I might choose to do something like this after deciding that no HTML
element serves my needs sufficiently well. But now how do I give them
different styles? CSS selectors can act on the *class* of an element:

    .important {
        font-weight: bold;
    }
    
    .footnote {
        font-size: 75%;
    }

This way, every element with the matching class will be affected by
the CSS rules that match that class. This is a very convenient way of
controlling the style not only of text but of graphical elements; we
will use this idea extensively in class.

Another important observation is that an element can have more than
one class:

    <div class="important footnote">Small but bold!</div>

This element will get both the `important` and the `footnote` style.

## CSS id selectors

There are many different ways to specify CSS selectors. We've seen
selectors by element name and class; you can also create a selector
that is specific to an element `id`. If I have an HTML snippet like this:

    <div>Search returned <span id="counter">10</span> results</div>

Then I can control the appearance of the number with a CSS declaration
like this:

    #counter {
        color: green;
    }

## CSS relationship selectors

CSS selectors let you match elements based on their relationship with
other elements. While I will simply refer you to the
[MDN Selectors](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors)
webpage for the full reference, I want to highlight two particularly
important ones, the *child* selector, and the *descendant*
selector.

The *child* selector matches every time an element is directly
enclosed by a different element. For example, consider the following
rule involving the child selector:

    em > u { color: red; } /* the child selector is denoted by > */

and the following self-explaining HTML snippet:

    <em><u>this will be red</u> <strong><u>but this will not</u></em>

The *descendant* selector, on the other hand, matches every time an
element is contained by another element, even if indirectly. In that
case, the CSS selector is simply the juxtaposition of both simpler selectors:

    em u { color: red; } /* the descendant selector is denoted by juxtaposition */

where the self-explaining HTML snippet would be:

    <em><u>this will be red</u> <strong><u>and this will also be red</u></em>

## Multiple rules

When more than one CSS rule matches, then different CSS declarations
migh conflict with one another. In that case, then, "the
most specific declaration wins". The rules for what counts as more
specific are
[really disgusting](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity),
so if you find yourself debugging CSS code because the styles "don't
take", the first thing you should try is to set completely different
classes for the element, add all the declarations to this class. Then,
with help from the Developer Tools, you can add classes back to your
element to see which declarations might be winning the specificity
race. In order to avoid this kind of trouble, it's better to stick to
simple declarations as much as possible.

### Other ways of declaring CSS

You can provide CSS stylesheets as an external file. This is very
useful when you want to share CSS rules across many different
documents. In that case, you include the following element in your
`<head>`:

    <link rel="stylesheet" href="style.css"/>
    
In this case, `style.css` should be an additional file that consists
entirely of CSS rules.

Finally, you can place CSS declarations directly inside an
element. You do this using the `style` attribute, which most HTML
elements support. For example, if you have this CSS rule:

    .aclass {
        color: red;
    };
    
And this element, `<div class="aclass">content</div>`, then the same
result can be achieved with `<div style="color:red">content</div>`.
It's a bad idea to do this in HTML that you write manually: you're
mixing content with presentation, and making it hard to reuse the
declarations. But later on we will be writing code to generate
elements in the DOM for us, and in that case, this will be a very
common and good thing to do. In this latter situation it's a good
thing to do because the reusability will be represented in our
Javascript source code.

# SVG

So far we have only seen textual content in HTML, and this is a data
visualization course. SVG ("Scalable Vector Graphics") is a subset of
the HTML5 standard that will provide us with essentially all of our
graphical needs (some of your final projects will, *perhaps*, require
an alternative graphics standard like
[Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
or [WebGL](https://developer.mozilla.org/en-US/docs/Web/WebGL). I'll
help you individually should that be the case). SVG is extremely
powerful, broadly supported, and very easy to program for. It's also
the preferred target for d3, the javascript library we'll use for our
visualization design.

## Minimal Example

An SVG drawing starts with an `svg` element, which requires `width`
and `height` attributes, specified in pixels:

    <svg width="400" height="400">
    </svg>

By itself, that will be a blank canvas:

<svg width="400" height="400">
</svg>

That's kind of boring, but you should be able to verify, using the
Developer Tools, that there is in fact an honest-to-goodness SVG
element there.  In the following, you'll learn how to add basic
graphical shapes to the SVG element.

## SVG coordinate system

The first thing to know about SVG is that although it's tempting to
think of SVG as "graph paper", its coordinate system has a flipped y
coordinate: it points in the same direction as the HTML
y-coordinate. This is necessarily confusing because although we tend
to think of text as going from top to bottom, we tend to think of the
*y* coordinate in graphical displays (like graph paper) as increasing
from bottom to top.

## Basic SVG elements

### Circle

    <svg width="400" height="200">
        <circle cx="200" cy="100" r="50"
                 style="fill:yellow; stroke:brown; stroke-width:5px"/>
    </svg>

<svg width="400" height="200">
    <circle cx="200" cy="100" r="50"
             style="fill:yellow; stroke:brown; stroke-width:5px"/>
</svg>

### Ellipse

    <svg width="400" height="200">
        <ellipse cx="200" cy="100" rx="100" ry="50"
                 style="fill:blue; stroke:green; stroke-width:5px"/>
    </svg>

<svg width="400" height="200">
    <ellipse cx="200" cy="100" rx="100" ry="50"
        style="fill:blue; stroke:green; stroke-width:5px"/>
</svg>

### Rect (rectangle)

    <svg width="400" height="200">
        <rect x="50" y="50" width="200" height="100" 
              style="fill:red; stroke:black; stroke-width:3px"/>
    </svg>

<svg width="400" height="200">
    <rect x="50" y="50" width="200" height="100" style="fill:red; stroke:black; stroke-width:3px"/>
</svg>

### Line

    <svg width="400" height="200" style="stroke: red">
        <line x1="30" y1="30" x2="200" y2="80"/>
        <line x1="30" y1="50" x2="150" y2="120"/>
    </svg>

<svg width="400" height="200" style="stroke: red">
    <line x1="30" y1="30" x2="200" y2="80"/>
    <line x1="30" y1="50" x2="150" y2="120"/>
</svg>

### Text

    <svg width="400" height="100">
        <text x="30" y="30">Some text</text>
        <text x="30" y="50">Some more text</text>
    </svg>

<svg width="400" height="100">
    <text x="30" y="30">Some text</text>
    <text x="30" y="50">Some more text</text>
</svg>

### Path

The SVG `path` element is how you "escape" the basic SVG shapes. In
case none of the predefined shapes are good enough for you, you can
draw any arbitrary shape you want using the `path` element. We will
not use it very often in class, but it's important that you know it
exists, because it helps you understand how much of d3 works under the
hood. 

    <svg width="200" height="60" style="stroke:blue; fill:none">
        <path d="M 10 10 L 50 10 L 50 50 L 100 50 L 100 10 C 150 50
        150 50 150 10"/>
    </svg>

<svg width="200" height="60" style="stroke:blue; fill:none">
    <path d="M 10 10 L 50 10 L 50 50 L 100 50 L 100 10 C 150 50
    150 50 150 10"/>
</svg>

Instead of giving you just one simple example that wouldn't do the `path`
element justice, I will ask you to simply take a look at the
[MDN path tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).

*IMPORTANT HINT*: You will need to understand the "arc" command in order
to draw the wedges of a pie chart in
[Assignment 2](../assignment_2.html). The easiest way to understand
how they work is to play around with the path description in the
DevTools Element Inspector, changing the `d` attribute until you get a
feel for what each part does.

### Ordering

The order in which elements are drawn is the order in which they
appear in the element:

    <svg width="400" height="200">
        <ellipse cx="200" cy="100" rx="100" ry="50"
                 style="fill:blue; stroke:green; stroke-width:5px"/>
        <rect x="50" y="50" width="200" height="100" 
              style="fill:red; stroke:black; stroke-width:3px"/>
    </svg>

<svg width="400" height="200">
    <ellipse cx="200" cy="100" rx="100" ry="50"
             style="fill:blue; stroke:green; stroke-width:5px"/>
    <rect x="50" y="50" width="200" height="100" 
          style="fill:red; stroke:black; stroke-width:3px"/>
</svg>

### Grouping

Grouping elements is a very powerful idea, and we will use it
extensively when we get to use SVG for actual visualizations. It is
powerful because it gives us *abstraction*, in the same way that a
procedure groups a sequence of operations under a single name. In
dynamic visualizations, it will make it possible for us to move a
large number of elements by simply taking one branch of the DOM and
placing it in a different subtree; without groups, we would have to
remember over and over again which elements we cared about.

In addition, SVG groups give us *geometric transformations*. Geometric
transformations are amazingly useful when we want to change the
positions of a large number of elements in the same way, or when we
want to express the positions of the elements in a more convenient
manner. For example, recall that SVG's basic coordinate system
increases the *y* coordinate in the downward direction. If we were to
simulate graph paper directly, then we'd have to remember every time
to subtract the *y* coordinate we want from the height of the SVG
element: 

    <svg width="200" height="200">
        <circle cx="50" cy="50" r="10"/>
        <circle cx="80" cy="80" r="10"/>
        <circle cx="110" cy="50" r="10"/>
        <circle cx="140" cy="90" r="10"/>
    </svg>

<svg width="200" height="200">
    <circle cx="50" cy="50" r="10"/>
    <circle cx="80" cy="80" r="10"/>
    <circle cx="110" cy="50" r="10"/>
    <circle cx="140" cy="90" r="10"/>
</svg>

This is annoying and error-prone. Instead, we can encode that transformation
directly, using SVG's grouping node `g`, and its `transform` attribute:

    <svg width="200" height="200">
        <g transform="translate(0, 200) scale(1, -1)">
            <circle cx="50" cy="50" r="10"/>
            <circle cx="80" cy="80" r="10"/>
            <circle cx="110" cy="50" r="10"/>
            <circle cx="140" cy="90" r="10"/>
        </g>
    </svg>

<svg width="200" height="200">
    <g transform="translate(0, 200) scale(1, -1)">
        <circle cx="50" cy="50" r="10"/>
        <circle cx="80" cy="80" r="10"/>
        <circle cx="110" cy="50" r="10"/>
        <circle cx="140" cy="90" r="10"/>
    </g>
</svg>

The transform attribute is read right-to-left, and it's saying:
to get the outer *y* coordinate, multiply the inner *y* coordinate by
-1, and then add 200. In other words, `outer_y = 200 - inner_y`, which
is precisely the flipping we need. Now the y coordinates behave as
those in graph paper: increasing y means going up.

The main problem with these transformations, as we saw in class, is
that they apply to everything:

    <svg width="200" height="200">
        <g transform="translate(0, 200) scale(1, -1)">
            <text x="10" y="50">Text</text>
            <text x="70" y="50">as they read</text>
            <text x="40" y="80">in</text>
            <text x="100" y="90">Australia</text>
        </g>
    </svg>

<svg width="200" height="200">
    <g transform="translate(0, 200) scale(1, -1)">
        <text x="10" y="50">Text</text>
        <text x="70" y="50">as they read</text>
        <text x="40" y="80">in</text>
        <text x="100" y="90">Australia</text>
    </g>
</svg>

Clearly, we don't want that to happen in every situation. In practice,
this will be the difference between
[geometric zooming](http://bl.ocks.org/mbostock/3680999) and
[semantic zooming](http://bl.ocks.org/mbostock/3680957). We will learn
how to use d3 appropriately so no strange issues like the above show
up.


## Presentation attributes

As you might have noticed by comparing the HTML examples with the SVG
ones, some appearance aspects are controlled by HTML attributes;
others are controlled by CSS properties.  Which is which is a
perennial source of confusion, and unfortunately there's no good way
around it. To add to the confusion, a subset of SVG attributes can
also be specified via CSS: these are the
["presentation attributes"](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute).

It's worth remembering this because CSS declarations for these
attributes will override inline attribute definitions in the DOM. This
is in turn inconsistent with the rule for the `style` attribute
itself, which overrides CSS definitions (on behalf of whoever designed
this standard: I am sorry).

# Resources, hints, etc.

An
[overview of the Chrome DevTools](https://developer.chrome.com/devtools).
You should try to become intimately familiar with the developer tools
in at least one browser. I know Chrome and that's what I'm going to
use in class (and what I can help you with), but you're free to pick
whatever you want.

During development, consider disabling the browser cache. In Chrome,
you do this by opening the DevTools, clicking on the gear icon on the
right of the DevTools menu bar, and then "Disable cache" under
General.  Caching issues have bit me repeatedly in the past (and in
class, as it turned out), and disabling the cache during development
saves a lot of potential hassle.

You should always go to [http://bl.ocks.org](http://bl.ocks.org) for
ideas and inspiration, but I told you about that one already.

The [Mozilla Developer Network](https://developer.mozilla.org/) is the
best source of high-quality documentation about web development out
there. When I'm googling around for information on anything that
involves the web, I usually add "mdn" to my search terms, to make sure
I don't accidentally click on anything from w3schools.com (they have
some information, but it's usually bad practices, it's not up-to-date,
and they got famous by essentially pretending to be associated with
[w3.org](http://w3.org), the World Wide Web Consoritum. That's just
awful.)

HTML5 validator: [http://validator.w3.org/](http://validator.w3.org/)
A syntax checker for HTML5. Why browsers don't offer this by default
is entirely bewildering, but there you have it. When something goes
wrong on your webpage and you don't quite know what it is, it's a good
idea to try validating your HTML. Syntax errors are not very loud in
web browsers (because web browser GUIs are tuned for web page *users*,
not *developers*); sometimes a simple syntax error can be the very
reason your webpage is behaving strangely.
