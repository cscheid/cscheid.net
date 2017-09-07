---
layout: bootstrap
title: Lecture 3 quiz
---

# Quiz

1. Fill in the code in ellipses so that the output matches what is
   shown below:

        var obj = ... ; // Write the definition here!
        console.log(obj.x);
		> 5
        console.log(obj.y);
		> 10

2. Fill in the code in ellipses so that the output matches what is
   shown below. Do not use global variables:

        var obj = ...; // write the definition here!
        > console.log(obj.inc())
        1
        > console.log(obj.inc())
        2
        > console.log(obj.add(3))
        5

3. Fill in the code in ellipses so that the output matches what is
   shown below (`%` is the operator that returns the integer remainder
   of a division):

        var pickOdd = ...; // write the definition here!
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        var odd = pickOdd(numbers);
        > console.log(odd)
        [1, 3, 5, 7, 9]

4. Fill in the code in ellipses so that the output matches what is
   shown below:

		var pickWhich = ...; // write the definition here!
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        function isOdd(x) { return x % 2 === 1; }
        function isEven(x) { return x % 2 === 0; }
        var even = pickWhich(isEven, numbers);
        var odd = pickWhich(isOdd, numbers);
        > console.log(odd)
        [1, 3, 5, 7, 9]
        > console.log(even)
        [2, 4, 6, 8]

[.](lecture-extras/lecture3/quiz-solutions.txt)
