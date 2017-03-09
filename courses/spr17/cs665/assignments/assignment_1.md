---
layout: bootstrap
title: Assignment 1 for CS 665, Spr 2017
---

# Assignment 1

- Posting date: Jan 17th 2017
- Due date: Jan 31st 2017, 11:59PM local time.

You will turn in the assignment by emailing a PDF to
[cscheid+csc665_2017@cs.arizona.edu](mailto:cscheid+csc665_2017@cs.arizona.edu). *Do
not use other email addresses*: I get a lot of email and will be using
a filter to find your submissions. (In other words, the "+csc665_2017"
is important)

When I say "FODS XYZ", I mean an exercise in our [textbook](https://www.cs.cornell.edu/jeh/book.pdf).

*Note*: the exercise numbering for the textbook changed from one
 version to another. I'm now quoting the entire exercise on the
 assignment itself.

## Part 1: Questionnaire (20/100 points)

The first part of the assignment is a questionnaire, mostly so that I
have a chance to learn something about you.

You are not required to answer any of the questions if you don't want
to, but non-submission does not count: please write "no answer" if
that's the case. 

I am going to use the answers to calibrate the remainder of the
course, so this is an opportunity for you to influence where the
course goes. There are no right or wrong answers in this
questionnaire. All I ask is you answer honestly, without trying to
figure out what I might want to read. The more you write, the more
I'll know about your expectations and what you are interested in.

1. Why are you taking this course?

2. What do you think you'll learn in this course?

3. What programming languages are you comfortable with?

4. Which programming language are you *most comfortable* with?

5. During the course of your studies, what's
the largest dataset you've had to deal with? What tools did you use?

6. Tell me about something cool you learned recently. Possible answers:
books, movies, TV shows, blogs, podcasts, etc. It does not have to be
about data science. (This is, squarely, "old man tries to stay
relevant". Take this either as "Humor me" or "Tell me what I should be
thinking about with respect to the class")

## Part 2. Sketching, Sampling (80/100)

1. (FODS 6.1) Given a stream of symbols $a_1, a_2, \ldots, a_n$ each an integer in $\{1, \ldots, m\}$,
   give an algorithm that will select one symbol uniformly at random
   from the stream. How much memory does your algorithm require?

2. (FODS 6.2) Give an algorithm to select an $a_i$ from a stream of
   symbols $a_1, a_2, \ldots, a_n$ with probability proportional to
   $a_i^2$.

3. (FODS 6.3) How would one pick a random word from a very large book
   where the probability of picking a word is proportional to the
   number of occurrences of the word in the book?

4. (FODS 6.4) Consider a matrix where each element has a probability
   of being selected.  Can you select a row according to the sum of
   probabilities of elements in that row by just selecting an element
   according to its probability and selecting the row that the
   element is in?

5. (FODS 6.5) For the streaming model give an algorithm to draw $t$ of indices $i$
   independent samples each with the probability proportional to the value of $a_i$.
   Justify that your algorithm works correctly.

6. You are given a data stream in the turnstile model, and an
   associated *mergeable* sketch (as we have defined in class) that
   describes the stream after step $i$.

   * If, instead of holding one copy of the sketch you are allowed to
     store $n$ versions of the sketch, describe an $O(n)$-time
     algorithm to produce the sketch that describes the stream at $n$
     other steps. (For example, imagine wanting sketches that describe
     server activity for up to each of the last 30 days). You are not
     allowed to revisit the stream.
	 
   * If you are hold $2n$ versions of the sketch, describe how to produce
     the same $n$ sketches as before, but now in time proportional to
     $O(\log n)$.

## Submission instructions

*Do not turn in zip files*. Instead of emailing a zip file, please
send the PDF file directly.
