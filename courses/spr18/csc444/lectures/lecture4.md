---
layout: bootstrap
title: Lecture 4, JavaScript DOM Manipulation, Basic Visualizations (Jan 23rd, 2018)
---

## Before we start

Here are some links you shared with me throughout the course offering
(from this semester and others). These are great - thank you!

* [Visualgo: visualizing data structures and algorithms through animation](http://visualgo.net/)
* [The Fallen of World War II](http://www.fallen.io/ww2) - incredibly
  well-done visual storytelling.
* Hans Rosling's [gapminder](https://www.gapminder.org/)
* [mars trek](https://trek.nasa.gov/mars/)
* [Data Looks Dope's Ice Bucket Challenge Visualization](http://datalooksdope.com/als).
* [infogr.am](https://infogr.am/)

# DOM Manipulation

In the last lecture, we've seen all of the JavaScript we need. What
we're going to do now is start using JavaScript to change the DOM.
Like
we've seen in class, the HTML we write is represented as a tree inside
a web browser. What we are going to turn to now are the JavaScript APIs that web
browsers provide to let you *edit* the DOM dynamically, so that we can
build our visualizations with code instead of text editors.

<div id="hi"></div>

Let's get some boilerplate out of the way. (Note that the following
assumes that your document contains an element with `id` "hi". If not,
you'll have to create one such element first)

    function radians(v) { return v * (Math.PI / 180); }
    
The method `getElementById` is used to return get an element from the
DOM (remember that an 'element' is simply a tree node):
	
    mainDiv = document.getElementById("hi");
	
To add nodes to an existing node, use `appendChild`. To create text
content, use `document.createTextNode`:
	
    mainDiv.appendChild(document.createTextNode("This is some text"));
	
With these, we can start to build software that creates more complex trees:
    
    function divWithText(text) {
        var result = document.createElement("div");
        var textNode = document.createTextNode(text);
        result.appendChild(textNode);
        return result;
    }
    
    for (i=0; i<10; ++i) {
        mainDiv.appendChild(divWithText(String(i*i)));
    }
    
    x = divWithText("X");
    mainDiv.appendChild(x);
	
Sometimes, the appearance of an element is controlled by its
*attributes* (the things inside the opening tag; in `<div id="foo"/>`,
the attribute `id` has value `foo`:
    
    function textAt(text, x, y) {
        var node = divWithText(text);
        node.setAttribute("style", "position:absolute; left: " + x + "px; top: " + y + "px;");
        return node;
    }

With this, we can place text at specific positions on the screen:

    mainDiv.appendChild(textAt("hi", 20, 30));
    for (i=0; i<360; i+=30) {
        mainDiv.appendChild(textAt(
            String(i), 
            100 + 100 * Math.cos(radians(i)), 
            100 + 100 * Math.sin(radians(i))));
    }

Remember that in JavaScript we can attach new fields to existing
objects. You can do this to DOM elements returned by the API, and that
turns out to be very powerful:

    function numberText(v) {
        var node = divWithText(String(Math.floor(v)));
        node.update = function(amount) {
            v = v + amount;
            node.textContent = String(Math.floor(v));
            var x = 130 + 100 * Math.cos(radians(v));
            var y = 130 + 100 * Math.sin(radians(v));
            node.setAttribute("style", "position:absolute; left: " + x + "px; top: " + y + "px;");
        };
        node.update(0);
        return node;
    }

Note how in the above snippet, we are adding a new method `update` to
the node returned by `divWithText`. When this method is called, we use
add passed value to the current amount (stored at `v`), compute new
positions from `v`, and update the text content of the node.

With this function on hand, we can start working towards an animated
demo. We begin by creating a list of nodes and storing them in an
array.

    var nodes = [];
    for (i=0; i<360; i+=30) {
        node = numberText(i);
        mainDiv.appendChild(node);
        nodes.push(node);
    }

Then every time we want to move the nodes around the circle, we simply
call the `update` method:

    for (i=0; i<nodes.length; ++i) {
        nodes[i].update(10);
    }

If we put this in a function, then all we need to do is call the
function over and over again.

    function tick() {
        var i;
        for (i=0; i<nodes.length; ++i) {
            nodes[i].update(1);
        }
    }

We're almost there. The main issue, now, is that we have to be careful
not to send the web browser into an endless loop. For example, the
following does *not* work:

	// This will crash your browser (well, it'll send it looping
    // forever until Chrome decides to kill the JavaScript process)
	while (true) {
        tick();
    }
	
The reason for it is that although the element attributes are being
changed, the user of the web browser does not get to see it, because
the web browser does not ever get a chance to update the graphical
representation of the DOM. The way to solve this problem is by using a
special browser API called `requestAnimationFrame`. This API lets you
tell a web browser that you'd like the opportunity to change something
in the DOM. The next time the web browser is sitting idly,
after having drawn all of its needed graphics, it will call the
function passed as a parameter. Then, we just need to make sure that
after updating the graphics, we call `requestAnimationFrame` again. It
looks like this:

	// this works!
    function tickForever() {
        tick();
        window.requestAnimationFrame(tickForever);
    }
   
This is very much like a recursive version of the endless loop above
(`function f() { tick(); f(); }`).  The fundamental difference here is
that instead of making the recursive call directly, we ask the browser
to make the recursive call, *after* it has updated the graphics. This
way there's always a step in between every update where the web
browser updates the UI and graphics, and you get nice animations as a
result.

# Now let's build some visualizations!

Now that we've seen how SVG works, how JavaScript works, and how
web browsers provide a JavaScript API for manipulating the DOM, we
will create a very basic library for visualizations in
JavaScript. Although the library is very limited, its basic idea is
similar in spirit to an important part of d3, and when you understand how our library
works, you will better understand why d3 works the way
it does.

We will start with a very straightforward program that draws a
visualization in a very hard-coded way, and we'll systematically make
small changes to this program to make it more generic.

## The data

We'll be working with a small, but real-world dataset that records the
number of road fatalities in the United Kingdom, from 1969 to 1984.

Since parsing the data from a typical format like CSV to something
that JavaScript can easily process is a boring task, and since we
haven't yet learned how to actually load external data, we'll simply
include an additional JavaScript file called [data.js](lecture4/data.js)
that contains a variable storing this dataset. It is an array of
objects, where every object has the fields `month`, `year`, and `count`:

    var ukDriverFatalities = [
        { month: 0, year: 1969, count: 1687 },
        { month: 1, year: 1969, count: 1508 },
        { month: 2, year: 1969, count: 1507 },
		...
        { month: 9, year: 1984, count: 1575 },
        { month: 10, year: 1984, count: 1737 },
        { month: 11, year: 1984, count: 1763 }
    ];

## From zero to visualizations in eight steps

We will build a minimal, but reasonably powerful, SVG visualization
library by repeatedly improving a piece of source code, little by
little. **This is a crucial part the first part
of the course. Make sure can understand what we are doing by working through it on your own**.

This is the list of programs we will go through:

1. [No reuse](lecture4/iteration_1.html)
2. [Generic element creator](lecture4/iteration_2.html)
3. [Loop over arbitrary data](lecture4/iteration_3.html)
4. [getter functions for specific attributes](lecture4/iteration_4.html)
5. [use getters of iteration 4 to adjust visualizations](lecture4/iteration_5.html)
6. [getter generators, higher-order functions](lecture4/iteration_6.html)
7. [generic plotAll for any SVG element, just like generic make in iteration 2](lecture4/iteration_7.html)
8. [Three different visualizations, each with 10 lines of code](lecture4/iteration_8.html)

As you can see, until iteration 7, all the visualizations look
essentially the same. What we are doing is setting up our program so
that it becomes easy to explore different visualizations and
datasets.

## Iteration 1: [No reuse](lecture4/iteration_1.html) [(source)](lecture4/iteration_1.js)

The first version of our program is completely hard-coded in terms of
the dataset and the visual encoding. It is
a simple bar-chart that encodes the number of fatalities as the height
of the element, and the position along the x axis as a chronological
axis.

## Iteration 2: [Generic element creator](lecture4/iteration_2.html) [(source)](lecture4/iteration_2.js)

We'll start improving the program by noticing that, in iteration 1,
our functions `make`, `makeSVG` and `makeRect` all look very
similar. Let's replace them with a single function that creates any
elements and sets whatever attributes we might want. We do this by
passing an *object* whose keys and values are respectively the
attribute keys and values to be set on the created element (we loop
over the object keys using the `for (x in obj) ...` syntax.

As a result, our code now creates `rect` elements with the same call
it uses to create `svg` elements. This paves the way to create, for example,
`circle` elements without needing to write new `makeCircle` functions.

The next thing we do is we notice that we are looping over a global
variable. That's a bad idea.

## Iteration 3: [Loop over arbitrary data](lecture4/iteration_3.html) [(source)](lecture4/iteration_3.js)

Instead, what we do now is simply pass an extra parameter to
`plotAll`, so that it doesn't need to know where the data is coming
from (that's the extra `data` parameter). Still, the *body* of
`plotAll` remains dependent on the content of the
dataset: if the elements of the `data` array are not objects with
`count` field, `plotAll` will just not work.

The next change we need to do is to be able to change the values of
`width`, `height`, `x`, and `y` from *outside* of `plotAll`.

## Iteration 4: [getter functions for specific attributes](lecture4/iteration_4.html) [(source)](lecture4/iteration_4.js)

We do this by passing extra parameters to `plotAll`. These parameters
will be *functions* that pluck the right things from each entry of the
`data` array. Then, what `plotAll` does is iterate over `data`, and at
each step, it calls `widthGetter`, `heightGetter`, and so on. This
way, if the dataset changes, we can pass different getters into
`plotAll`, so it will know how to interpret the dataset
correctly. 

`plotAll` is now starting to be generally useful, so we will spend the
next iteration changing the calls to `plotAll` for charts 2 and 3.

## Iteration 5: [use getters of iteration 4 to adjust visualizations](lecture4/iteration_5.html) [(source)](lecture4/iteration_5.js)
   
The only changes we will make here are that instead of calling a
single function for all charts, we will call different functions for
each chart. We do this because the charts have different dimensions,
and so we need to set the `x`, `y`, `width` and `height` attributes
differently for each.

The result is that now the charts "scale" correctly. Regardless of the
size of the SVG element, all the bars for all the data points in the
visualization fit the visualization. That's nice.

At the same time, you can see how our source code is starting to get a
bit cluttered. Lines 27--50 of [iteration_5.js](lecture4/iteration_5.js), specifically,
are quite dense and similar to one another. It's hard to tell the
difference between them. So let's fix that.

## Iteration 6: [getter generators, higher-order functions](lecture4/iteration_6.html) [(source)](lecture4/iteration_6.js)

In the previous iteration we created getters "directly", and their
only difference was how they used the dimensions of the different SVG
elements (`300` vs. `400` vs. `500` for the height, and similarly for
the other elements). What we do in
[iteration_6.js](lecture4/iteration_6.js) is that we will create a
higher-order function for each of these getters, whose only job is to
return a getter specifically configured for the correct width, height,
and so on. These are called `rectWidth`, `rectHeight`, `rectX`,
`rectY` as before, but now, notice that these functions, instead of
*being* getters, they *return* getters. This way, when you write
`rectWidth(800)`, the result you get is a getter that is exactly
configured to return the correct rectangle width for an SVG element of
width 800. The same thing happens with the other "getter generators".

We are now ready for the final big change in our visualization
library. The main problem left is that `plotAll` still only knows how
to draw rectangles, and how to set some attributes of each
rectangle. We want a `plotAll` function that works for *any* element
and attribute. How would you solve it? Before you read on, take some
time to think about this.

<br>

## Iteration 7: [generic plotAll for any SVG element, just like generic make in iteration 2](lecture4/iteration_7.html) [(source)](lecture4/iteration_7.js)

(Got it?) We could create a `plotRects` function, and a `plotCircle`
function, and so on. That would work, but it would have the same
problem that we saw with `makeRect` and `makeSVG` on our first
iteration. Every time we wanted to create a new visualization, we'd
have to create a new function. That's not great.

The solution we will use is exactly the same as the one we did in
[iteration_2.js](lecture4/iteration_2.js). Instead of passing parameters
specific to `rect`, we will pass a value that says which element we
want `plotAll` to create, and we will pass an *object* that contains
all the getters that will be called to set specific attributes of the
object. 

The way `plotAll` works, then, is that it creates an intermediate
object with the same keys as the keys of the `attributeGetters`
parameter it was passed. But `plotAll` *calls* each getters with all
elements of the array. The getters then configure the attributes,
which are passed to the (generic!) `make` function.

As a result, `plotAll` now knows nothing about the dataset or specific
attributes. The important thing it does, though, is that for *each*
row in the `data` array, it creates one SVG element, and calls the
same getters, consistently, for all elements in the array.

With this, we are ready to create quite different visualizations by just
passing the right parameters to `plotAll`.

## Iteration 8: [Three different visualizations, each with 10 lines of code](lecture4/iteration_8.html) [(source)](lecture4/iteration_8.js)

Our last code iteration is a first look into *design* iterations: we
can generate quite different visualizations by just changing the
elements we create, and what we map to each of the element attributes.

Note that in the space of 32 lines of code, we create 3 different
visualizations. That is really good expressivity for a very simple
function like `plotAll`, which is itself only 12 lines of code.

# Outlook

If you understand how the visualizations in
[iteration_8.js](lecture4/iteration_8.js) work, you already understood
the most important concept of d3, which is to match *data* elements to
*visual* elements by implicitly looping over the dataset with the
specified attribute getters.

Starting with the next lecture, we will study how d3 works, and what
it will enable you to create.
