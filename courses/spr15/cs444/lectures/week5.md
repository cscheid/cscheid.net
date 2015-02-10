---
layout: bootstrap
title: Week 5a, D3 selections and joins
---

# Week 5a, D3 selections and joins

Today we are going to talk about the two most important notions in D3:
selections, and joins.

# Method chaining

D3 uses a style of *method chaining* that might be unfamiliar to
you. It works as follows: many methods in d3 (particularly the
selection methods) themselves return *new* selections as their
result. On this new selection, you can call a selection method, which
might return a selection, on which you call selection methods... For
example:

    d3.select("body")     // returns a selection!
        .selectAll("div") // from which we select all divs, into a new selection!
        .data([1,2,3,4])  // which d3 associates with that array, 
                          // and returns a new selection
        .text(function(d) { return "value: " + String(d); })
                          // to which we add some text, and get a new selection...
        .style("font-weight", "bold");
		                  // which we make all elements bold. 

This style has many advantages. When you get used to it, it is
more readable (you scan the code like this: select, then set some
data, then change the text, then set the style). But, in addition to
making code easier to read, returning selections make code easier to
*write*. If you structure your code around creating and d3 selections,
then d3 helps you make small reusable pieces of code, as we will see.

# D3 selections

You should go to the
[d3 API reference on selections](https://github.com/mbostock/d3/wiki/API-Reference#selections)
for the full story. Here, we describe the most common methods and the
general patterns.

The basic logic of d3 selection is that *selections choose DOM elements,
and selection methods operate on data*. Take this basic example:

    d3.select("body")
        .selectAll("div")
        .data([1,2,3,4,5])
        .enter()
        .append("div")
        .text(function(d) { return String(d); });

We will unpack the meaning of all of these methods in a bit. But for
now, simply pay attention to the kinds of things referenced used in
different methods. Methods that create selections almost always take
parameters that have to do with the DOM (`.select("body")`,
`.selectAll("div")`), while methods that manipulate the selection
(`.data()`, `.text()`) almost always take parameters that have to do
with the *data*[^1].

When the methods take a name and a value pair (like the `attr` and
`style` methods), then the name field is always a string, and the value field
is one of:

- a function: when the value passed is a function, d3 will use this
  function as an *accessor*: it will pass the data value bound to the
  DOM element to the accessor function, and use the result of the
  function (this is exactly like). The DOM element matching the data
  value will be available as the `this` object in the accessor
  function.

- a constant value: if you pass a regular value `v` (a string, a
  number, etc) to d3, it will behave exactly as if you had passed
  `function() { return v; }`. In other words, it will use the passed
  value for all the elements in the selection.

- `null`: when `null` is passed as a value, d3 uses that to mean
  "remove value". This way you can delete an attribute, remove a CSS
  style, etc.

In addition to the usual interface, all the name-value pair functions
also take objects to be iterated on pair-by-pair, exactly like
the [minimal library we developed in class](week3/iteration_8.js).

For a selection object named `selection`, you have the following
basic methods available:

- `selection.append(name)`: For every data value in the selection,
  append a new DOM element given by `name` and associate the data
  value to it.

- `selection.attr(name, value)`: Sets the attributes of the HTML
  elements given by `name` to the result of the `value` accessor.
  
  Example: `selection.attr('href', function (d) { return d.link; })`

- `selection.style(name, value)`: Operates just like `attr`, but sets
  the CSS style directly.
  
  Example: `selection.style('background-color', 'red')`

- `selection.classed(name, value)`: If `value` is
  [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy),
  then d3 will add the CSS class given by `name` to the corresponding
  DOM element. If it's
  [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy),
  then d3 will remove that CSS class. 
  
  The name `classed` is super awkward to my ears. It's meant as a past
  participle of `class`, so that code like this:
  
      selection.classed('important', function(d) { return d.value > 100; })
  
  is read like this: elements should be *classed* ("of class") `important` if the
  data value exceeds 100.
  
- `selection.text(value)`: Sets the text content of the element.
  Example:
  
      selection.append("div").text(function(d) { return d.blogComment; });

- `selection.each(function)`: For each value in the selection, simply
  the given function. This call by itself does not affect the DOM in
  any way, but it is how, for example, you could implement most of the
  other selection methods if you wanted to.

- `selection.call(function)`: Calls the given function *only once*,
  passing the current selection as a parameter. This is a convenience
  method, but it's very helpful. Imagine you need to set the same
  attributes of some d3 selection in many places in your code. In
  order to increase abstraction, you wrap it in a function:
  
      function setManyAttributes(selection) {
          return selection.classed("important", true)
              .attr("href", function(d) { return d.link; });
      }
      
  You could write, for example,
  
      setManyAttributes(d3.selectAll("a.my-links"))
          .style("color", "blue");

  but now you have to read it all out of order: first, the selection
  of `a.my-links` happens, then you `setManyAttributes`, and finally
  you set the color. Awkward. Instead, `.call()` lets you write the
  same code like this:
  
      d3.selectAll("a.my-links")
          .call(setManyAttributes)
          .style("color", "blue");

  That's much nicer.
  
- `selection.remove()`: Remove all elements of the selection from the
  DOM.
  
- `selection.filter(function)`: Returns a new subselection, based on
  the given accessor function. This is useful in conjunction to
  subsequent `append` calls (in case you want to add new elements to
  *some* of the selection), but it is especially useful in conjunction
  with `remove` calls.

# Joins

To a beginner user of d3, the most confusing notion is possibly the
one of *joins*, so let's take some time to go over it carefully.  D3
joins are the reason that your code has those mysterious `enter()`
methods; we'll see why they exist and why they make sense. Mike
Bostock has written a
[specific tutorial about joins](http://bost.ocks.org/mike/join/), but
here's an alternative explanation that might be helpful too.

As we have mentioned before, d3 is fundamentally about matching *data*
to *elements* in your document (divs, circles, table rows, etc). If
your document were already set up so that the array you pass to
`data()` has as many values as there are elements in your selection,
then you wouldn't need to worry about `enter()`.

But when you're initializing your visualization, chances are you don't
actually *have* any DOM elements. So how does d3 do it? This is where
joins come in.

Every time you have a selection and you call the `data` method, you're
going to have one of three cases:

- You give `data()` an array with *the same number of values* as there
  are DOM elements in your selection. This case is clear: d3 matches
  the data values to the selection elements precisely one-to-one, in order.
  
- You give `data()` an array with *fewer values* than there are DOM
  elements in your selection. Here, d3 needs to decide what to do with
  the spare DOM elements.

- You give `data()` an array with *more values* than there are DOM
  elements in your selection. Here, d3 needs to decide what to do with
  the spare data values.
  
d3 separates those cases in three distinct kinds of selections: the
*update* selection, the *enter* selection, and the *exit* selection
(for theater buffs, *enter* and *exit* are in analogy to stage
speak). They refer to the data values: values about to "enter the
stage" are associated with `enter`, and similarly for "exiting the
stage".

When you call `data()`, d3 returns the *update* selection: precisely
the subset of values that it matched to a specific DOM element. The
update selection has all the methods we've seen above, and an
extra pair of methods: `enter()` and `exit()`.

These two methods return, respectively, the enter and exit
selections. This is why when you want to create new elements, the
pattern in your code that calls d3 looks like this:

    d3.select("body")
        .selectAll("div")   // empty selection!
        .data([1,2,3,4,5])  // empty *update* selection, but...
        .enter()            // nonempty *enter* selection!
        .append("div")      // append a div for every value in enter selection

Conversely, if you want to *remove* unneeded DOM elements from your
visualization (because, for example, your dataset dynamically changed,
and now there are only half as many values), you use the *exit*
selection and `remove`

    d3.selectAll("div")    // assume there were 20 elements
        .data([1,2,3,4,5]) // update selection with 5 elements
        .text(...)         // update text of DOM elements we want to keep
        .exit()            // get the 15 elements with no data
        .remove()          // and remove them from DOM

## Recap

Now, looking back at our basic example, every part of it
should make perfect sense:

    d3.select("body")       // selects the body element
        .selectAll("div")   // selects every div inside it (none!)
        .data([1,2,3,4,5])  // creates (empty!) update selection with data,
        .enter()            // get the enter selection from the update selection
        .append("div")      // append div elements for all data, bind data to it
        .text(function(d) { return String(d); }); // set text

# Data ordering, keys

Imagine, now, that you are building a dynamic visualization of movie
data using IMDB's dataset, and that the user issues movie queries
based on actors. 

For example query of "Sandra Bullock" would include some
subset of movies, and a query of "George Clooney" would include an
overlapping set of movies. Imagine that each value in this movie dataset looks like this:

    {
	  title: "Gravity",
	  id: "tt1454468",
	  year: 2013,
	  gross: 274084951
	}

As you switch the data from a Bullock view to a Clooney one, you know
that Gravity will be part of both plots (so you want that data point
to persist in your visualization). But you don't know the *order* in
which the elements to call in the `data` array come, so how can you
make sure d3 matches Gravity in Sandra Bullock's cast, to Gravity in
Clooney's? The answer is in d3's optional `key` parameter to
`data`. When you only pass an array of values to `data`, d3 assumes
that the index in that array is the key; but if you pass an extra *key accessor*,
then d3 uses that function to retrieve keys. In this example, you would say:


    var imdbResult = [ 
  	  {
	    title: "Gravity",
	    id: "tt1454468",
	    year: 2013,
	    gross: 274084951
	  }, ... ];
	  
    selection.data(imdbResult, function(entry) { return entry.id; })
	   ...

This way, when a new dataset comes in, you use the same key accessor on
the same selection, and d3 knows to match DOM elements to values via
the `id` key.

# Nested selections

The final d3 technique we will see today is that of nested
selections. Recall, from our discussion above, that selection methods
usually operate on data: `attr`, `style`, `text`, etc. Up until now,
we discussed `data` as a special method, which binds the passed array
to the selection. The truth, though, is that `data` is *almost* like
any other regular method of a d3 selection.

Unlike other selection methods, `data()` interprets arrays differently
from other constant values. Instead of setting the appropriate
property (attribute, style, etc) to each DOM element separately, d3
*broadcasts* this array to the matching selection elements.

On the other hand, `data()` accepts functions, exactly like other
selection methods. In this case, the function is expected to return
arrays of data values, just like you typically just pass `data()` an
array of data values. Instead of these being constant, however, they
can be *computed based on the currently* bound data. The end result is
that nested selections happen automatically.

Take some time to read the code below. It's a good example of d3's
incredibly elegant design:

    var data = [[1,2,3],
	            [4,5,6],
			    [7,8,9]];
    d3.select("body").append("table")
	    .selectAll("tr")
		.data(data)      // give the 'tr' selection a nested array
		.enter()         // pick the enter selection
		.append("tr")    // append a 'tr' element for each element in the outer array
		.selectAll("td") // now select 'td' elements
		.data(function(r) { return r; }) // for each 'tr' element, return its row!
		.enter()                         // now do the same thing!
		.append("td")                    // for each row, append a 'td' element
		.text(function(d) { return String(d); });
		                                  // and set its text

Notice how this completely replaces the need for explicit `for` loops,
and in addition lets you use custom keys for any of the inner selections.

As we will see next, all of the selections work well with d3
*transitions* and *scales*: its pieces fit together very well.  In
other words, every time you update, insert or remove an element, you
can use the *same* piece of code to do it *in an animation*. In
addition, you will be able to control the way an animation looks by
using many of the same d3 concepts.

---

[^1]: In fact, even `.append()` operates on data! But that's rare enough that 99% of the time you just give it a constant string. It has special-case behavior when you do, creating fresh elements of the given node type instead of just using it. That's why we only mention it in footnotes.
