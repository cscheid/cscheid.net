---
layout: bootstrap
title: Assignment 2 for CS 665, Spr 2017
---

# Assignment 2

- Posting date: Jan 31st 2017
- Due date: Feb 14th 2017, 11:59PM local time.

You will turn in the assignment by emailing a PDF to
[cscheid+csc665_2017@cs.arizona.edu](mailto:cscheid+csc665_2017@cs.arizona.edu). *Do
not use other email addresses*: I get a lot of email and will be using
a filter to find your submissions. (In other words, the "+csc665_2017"
is important)

When I say "FODS XYZ", I mean an exercise in our [textbook](https://www.cs.cornell.edu/jeh/book.pdf).

*Note*: the exercise numbering for the textbook changed from one
version to another. I'm now quoting the entire exercise on the
assignment itself.

## Part 1: High dimensions, Hashing
	  
1. Let $M$ be an orthogonal matrix. What are the values of the
   off-diagonal entries of $M^T \times M$? What about the diagonal
   entries? What happens to the distances between vectors under
   orthogonal transformations?

2. Write a program (in any language you want) that creates a $100 \times 100$
   matrix $D$, where each entry in the matrix is a random number,
   independently drawn from a normal distribution with mean 0 and
   variance 0.01.
   
   1. Compute the inner products of each column with itself, and plot a
      histogram of the distribution of these values. How would you
      describe this distribution? What does its mean appear to be? 

   2. Compute the inner products between pairs of columns of this matrix,
      and plot a histogram of the distribution of these values. How
      would you describe this distribution? What does its mean appear
      to be?
	  
   3. Based on your previous answers, what kind of matrix does $D$ appear to be?
	  
   4. Now, write a program to create a $100 \times 50$ matrix $D_2$
      (100 rows and 50 columns), where each entry in the matrix is
      generated the same as before. Make similar plots to 2.2.1 and
      2.2.2. What kind of matrix does $D_2$ appear to be?
	  
   5. Generate 10000 pairs of random vectors in $100$-dimensional
      space (using the same procedure as you did to generate values of
      the matrix), and compute their Euclidean distance. Then,
      multiply each of vectors by $D_2$, and compute the new
      distance. Plot a histogram of the difference between the
      distances, before and after projection. *What kind of matrix does $D_2$ appear to be?* 

3. The Hamming distance $H(a,b)$ between two strings $a$ and $b$ of
   equal length is defined as the total number of positions on the
   strings in which the respective symbols differ. The Simple Matching
   Coefficient (SMC) of two strings is defined as $1 - (H(a,b)/L)$, where
   $L$ is the length of the string.
   
   Using a programming language of your choice, compute hash values
   for the words in [this file](dict_sample.txt), as binary
   strings. For your hash function, use the first 32 bits of the
   [SHA-1](https://en.wikipedia.org/wiki/SHA-1) digest. In other
   words, take the binary representation of the SHA-1 digest and pick
   the first 32 binary digits. (Don't try to implement SHA-1 yourself:
   use an existing library).
   
   1. Plot a histogram of the SMC between all pairs of word hashes.
   
   2. Plot a histogram of the SMC of the hash of each words with itself.
   
   3. If we think of the SMC as an inner product, and the hashing
   function as "a linear transformation", then what kind of
   transformation does the hashing function appear
   to be?

## Part 2: Singular Value Decomposition

1. (FODS 3.1) In many experiments one collects the
value of a parameter at various instances of time. Let $y_i$ be the value of the parameter $y$
at time $x_i$. Suppose we wish to construct the best linear approximation to the data in the
sense that we wish to minimize the mean square error. Here error is measured vertically
rather than perpendicular to the line. Develop formulas for $m$ and $b$ to minimize the mean
square error of the points $ \\{ (x_i, y_i)|1 \le i \le n \\} $ to the line
$y = mx + b$.

2. (FODS 3.13) Let $ \sum_i \sigma_i u_i v_i^T $ be the singular value
   decomposition of a rank $r$ matrix A. Let $A_k = \sum_{i=1}^k
   \sigma_i u_i v_i^T$ be a rank-$k$ approximation to A for some $k <
   r$. Express the following quantities in terms of the singular
   values $\\{ \sigma_i, 1 \le i \le r \\}$.

   1. $\norm{A_k}^2_F$
   
   2. $\norm{A_k}^2_2$
   
   3. $\norm{A − A_k}^2_F$
   
   4. $\norm{A − A_k}^2_2$
   
   (Reminder: $\norm{M}\_2$ denotes the 2-norm of matrix M, and 
   is defined as $\sup_{v \neq 0} \norm{A_v}_2 / \norm{v}_2$)

3. (FODS 3.21) Suppose $A$ is square, but not necessarily invertible
   and has SVD $A = \sum\_{i=1}^r \sigma\_i u\_i v\_i^T$. Let $B =
   \sum_{i=1}^r \frac{1}{\sigma_i} v_i u_i^T$. Show that $BAx = x$ for
   all $x$ in the span of the right-singular vectors of $A$.

4. Express the solution of problem 1 in terms of the SVD of a matrix.


## Submission instructions

*Do not turn in zip files*. Instead of emailing a zip file, please
send the PDF file directly.
