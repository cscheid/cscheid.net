---
layout: bootstrap
title: "CSC580 Spring 2020 Assignment 1: Decision Trees"
---

# Assignment 1: Decision Trees

- Posting date: Jan 22th 2020.
- Due date: Jan 29th 2020, 11:59PM MST.
- Github Classroom link: [Assignment 1](https://classroom.github.com/a/FbaemY-I)

## Assignment description

In this assignment, we will implement a full ML classifier based on
*decision trees*. The datasets we will use to train and evaluate your
classifier are:

* the [Mushroom Data Set](https://archive.ics.uci.edu/ml/datasets/Mushroom)
* the [Primary Tumor Dataset](https://archive.ics.uci.edu/ml/datasets/primary+tumor)

Both datasets come from the [UCI ML
repository](https://archive.ics.uci.edu/ml/index.php).

You will not need to download the data from the repository: instead,
you will use the data provided in the repository that GitHub will
create automatically for you when you click on the GitHub Classroom link above.

You will submit Python 3 code that should work with Python 3.4, out of
the box (I myself run Python 3.6.3, for what's worth). This means
unless otherwise indicated, you're not supposed (or expected) to use
libraries such as numpy and scipy.

## Assignment Problems

1. Implement the basic decision tree procedure as described in the textbook.

   You will implement `DecisionTreeTrain` as described in page 13 of
   CIML (in the skeleton code we have provided, the name of the
   procedure is simply `train`).
   
2. Implement the information gain criterion as described in Quinlan 1986[^1].

   Provide a separate version of `DecisionTreeTrain` that uses the
   information gain criterion described in the paper (this is
   colloquially known as the ID3 criterion, for the system that first
   implemented it)
   
3. Implement tree depth control as a means of controlling model complexity.

   The Python procedure `train` you will implement takes a parameter
   `remaining_depth`. Use this parameter to stop further refinements
   of the tree.
   
4. Write a short report *in Markdown* (or, at best, plaintext) named
   `report.md` on the training and test accuracies you obtain with
   both datasets, as you vary the complexity of your model. Is there a
   qualitative difference between the two of them? Explain.

Each of those problems above is worth the same amount of credit.

In order for you to receive full credit for this (and future
assignments), I will need to be able to run the code you
submit. You're encouraged to split your code in multiple files (or
however else you see fit) for organization, reusability, and
clarity. But your code has to work under the following interface:

## Spec

In order to evaluate your homework, I will run it by typing the following, on
my shell:

    $ python3 decision-tree-basic.py <dataset.pickle> <tree-depth>
	
    $ python3 decision-tree-id3.py <dataset.pickle> <tree-depth>
	
Your code should produce output that looks like this:

    $ python3 decision_tree_basic.py primary-tumor.pickle 3
    Training...
    Training complete.
    
    Evaluating...
    Evaluation complete:
      Training:    73/169: 43.20%
      Validation:  37/85: 43.53%
      Testing:     33/85: 38.82%

## Data, source code

In case you want to access the files from the repository directly from
the web, they're also available [here](assignment-1-assets/).

Make sure you can run `describe-data.py` sooner rather than later! You
should get these outputs for the two datasets.

    $ python3 describe-data.py agaricus-lepiota.pickle
    Dataset description:
      Training set:   4062 observations
        Label distribution:
          Label e: 2108
          Label p: 1954
      Validation set: 2031 observations
        Label distribution:
          Label e: 1049
          Label p: 982
      Testing set:    2031 observations
        Label distribution:
          Label e: 1051
          Label p: 980
    
    $ python3 describe-data.py primary-tumor.pickle
    Dataset description:
      Training set:   169 observations
        Label distribution:
          Label 1: 36
          Label 2: 13
          Label 3: 7
          Label 4: 4
          Label 5: 25
          Label 7: 6
          Label 8: 3
          Label 11: 14
          Label 12: 9
          Label 13: 4
          Label 14: 14
          Label 16: 1
          Label 17: 4
          Label 18: 14
          Label 19: 3
          Label 20: 1
          Label 21: 1
          Label 22: 10
      Validation set: 85 observations
        Label distribution:
          Label 1: 24
          Label 2: 6
          Label 3: 2
          Label 4: 4
          Label 5: 3
          Label 7: 6
          Label 8: 1
          Label 10: 1
          Label 11: 5
          Label 12: 3
          Label 13: 2
          Label 14: 8
          Label 15: 1
          Label 17: 2
          Label 18: 8
          Label 19: 2
          Label 20: 1
          Label 22: 6
      Testing set:    85 observations
        Label distribution:
          Label 1: 24
          Label 2: 1
          Label 4: 6
          Label 5: 11
          Label 6: 1
          Label 7: 2
          Label 8: 2
          Label 10: 1
          Label 11: 9
          Label 12: 4
          Label 13: 1
          Label 14: 2
          Label 15: 1
          Label 17: 4
          Label 18: 7
          Label 19: 1
          Label 22: 8

## Other

One of the datasets we're using was originally collected by the
Audobon Society Field Guide, and comes the following warning: 'The
Guide clearly states that there is no simple rule for determining the
edibility of a mushroom; no rule like "leaflets three, let it be"
for Poisonous Oak and Ivy.' *Please* don't use this dataset to make
your foraging decisions!

[^1]: Quinlan, J. Ross. ["Induction of decision trees"](http://hunch.net/~coms-4771/quinlan.pdf). Machine learning 1, no. 1 (1986): 81-106.

