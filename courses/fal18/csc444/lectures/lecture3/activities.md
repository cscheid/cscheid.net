---
layout: bootstrap
title: Lecture 3 Activities, JavaScript (Aug 28th, 2018)
---

<script src="activities.js"></script>

# Lecture 3 Activities

We'll write a number of short procedures and library functions that
are similar to how some of d3's library is structured. This will work
both as a test of your knowledge and familiarity with Javascript, and
as a well to understand how you could have written much of d3 yourself.

## Global variables

    var objects = [{foo: 3, bar: "abc"},
	               {foo: 5, bar: "def"}];

## Functions

Exercises:

* Write a procedure that takes an array as a parameter, iterates over
  every object in that array, and prints the value of the field "foo" to
  the console.
  
      > f1(objects);
      3
      5
  
* Write a procedure that takes an array as a parameter, iterates over
  every object in that array and returns a new array with all the values of
  the field "foo".
  
* Write a procedure `map` that takes *two* parameters: an array
  `lst` and another procedure `f`. The procedure you'll write should
  iterate over the array and return a new array with the result of
  applying `f` to every object.

  * Rewrite both examples above in terms of `map`.

* Write a procedure `extract` that takes two parameters `lst` and `field`, and
  returns a new array with the values of the corresponding field for
  every object. Use `map` in your definition.

* Write a procedure `filter` that takes two parameters `lst` and `test`, and returns
  new array with all objects in `lst` that pass the test `test` (i.e., `test` is
  a procedure that returns `true` or `false`).
  
## Objects and chaining

You will need to know the following: in order to iterate over fields of a JavaScript object[^1],
use the following syntax:

    for (var key in obj) {
        ...
    }

Exercises:

* Write a procedure `pairs` that takes an object and returns a list of lists, like so:

      > pairs(objects[0])
      
      [["foo", "3"], ["bar", "abc"]]

  (the order of the elements in that illustration above may not be the same as what
  you get). Use `map` in your definition.

* Write a procedure `build` that takes a list of lists, and returns an object:

      > build([["foo", "3"], ["bar", "abc"]])
      
      { "foo": 3, "bar": "abc" }

  (the order of the elements in that illustration above you get may
  not be the same as what you get). Use `map` in your definition.

* Without worrying about performance, write a procedure `clone` that creates a new object
  with the same keys as the passed object, and whose fields point to the same values
  as the passed object.

* Write a procedure `makeObject1` that respects the transcript below:

      > x = makeObject1(10);
      > x.value();
        10
      > x.increment();
      > x.value();
        11
      > x.increment();
      > x.value();
        12

* Write a procedure `makeObject2` that respects the transcript below:

      > makeObject2(10)
          .printValue()
          .increment()
          .printValue()
          .increment()
          .increment()
          .printValue()
        10
        11
        13

## Conversions

* Write a procedure to convert Celsius to Fahrenheit. (0 degrees Celsius is 32 degrees Fahrenheit; 100 degrees Celsius is 212 degrees Fahrenheit)

* Write a procedure to convert Fahrenheit to Celsius.

* Write a `unitConverter` object that respects the following transcript:

      > celsiusToFahrenheit = unitConverter().from(0, 100).to(32, 212)
      > celsiusToFahrenheit.convert(10)
      50
      
      > fahrenheitToCelsius = unitConverter().from(32, 212).to(0, 100)
      > celsiusToFahrenheit.convert(50)
      10

* Write a procedure to convert feet to inches, using `unitConverter`.

## Putting it all together

Using the procedures above, write a small procedure that takes lists
representing weather forecasts and return a new list of objects where
the forecasts are in degrees Celsius.
  
      var forecasts = [
          { "city": "Washington, DC", "temperature": 92 },
          { "city": "New York", "temperature": 96 },
          { "city": "Seattle", "temperature": 77 },
          { "city": "Tucson", "temperature": 102 },
          { "city": "San Francisco", "temperature": 65 }
          ];

As we will see in the next lectures, these exercises really do have a
lot to do with d3 and data visualization!

[^1]: If you know JavaScript, you know the story isn't that simple. But then, you also know that this is close enough to get us to make progress.
