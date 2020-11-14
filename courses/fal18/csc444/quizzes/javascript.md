---
layout: bootstrap
title: "Quiz: Javascript"
---

# Quiz: Javascript

## Pitfalls

1. What do the following expressions evaluate to?

       var k = "x";
       var a = { x: 1, y: 3 };
       a.x
       a["x"]
       a[k]
       a.k

2. What do the following expressions evaluate to?

       1 == true
       1 === true
       1 == "1"
       1 === "1"

3. What do the following expressions evaluate to?

       var x = 5;
       function f(y) {
           var x = y * y;
           return y + x;
       }
       function g(y) {
           x = y * y;
           return y + x;
       }
       f(10);
       console.log(x);
       g(10);
       console.log(x);
    
4. What do the following expressions evaluate to?

       var x = 5;
       function f() {
           var result = 0;
           for (var x=0; x<10; ++x) {
               result += x;
           },
           return result;
       }
       console.log(f());
       var result = 0;
       for (var x=0; x<10; ++x) {
           result += x;
       }
       console.log(result);

## Objects

1. What do the following expressions evaluate to?

       function create(x) {
           var result = {
               double: function() {
                   this.value *= 2;
                   return this.value;
               }
               value: x
           };
           return result;
       }
       
       var obj = create(1);
       obj.double();
       obj.double();
       
       obj.triple = function() {
           this.value *= 3;
           return this.value;
       }
       obj.triple();


## Functions, basics of functional programming

1. What do the following expressions evaluate to?

       function f(x) {
           return x*x;
       }
       
       [1, 2, 3].map(f);
       
       function odd(x) {
           return x % 2 === 1;
       }
       
       [1, 2, 3].map(f).filter(odd);

2. What do the following expressions evaluate to?

       function makeFunction(x) {
           function f(k) {
               x += k;
               return x;
           }
           return f;
       }
       var a1 = makeFunction(3);
       var a2 = makeFunction(3);
       a1(1);
       a1(3);
       a1(5);
       a2(1);
       a2(3);
       a2(5);

