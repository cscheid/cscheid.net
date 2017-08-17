---
layout: bootstrap
title: Assignment 6 for CS 665, Spr 2017
---

# Assignment 6

- Posting date: Apr 13th 2017
- Due date: last day of classes

In this assignment, you will use the German credit dataset to predict
credit risks, and will explore issues of attribute predictability in
the presence of potentially-protected classes.

**Important note: Although the German credit dataset is publicly
available, please make sure to use the version I link to in this
document, so everyone shares the same training and validation
datasets. It also means that if you use the full dataset that is
available online, I will consider that to be cheating (for reasons
described below).**

This is a relatively open-ended assignment. You will need to download
the dataset, convert it to a format of your choice, and then use a
machine learning library of your choice to do predictions based on it.

In addition to the a PDF of your report, you will submit your
predictions for the tasks below. Send one plain text file for each
pair of (data, task), named as follows:

* `training_credit.txt`: your prediction vector on the
  credit-worthiness task for the training set.
* `validation_credit.txt`: your prediction vector on the
  credit-worthiness task for the validation set.
* `test_credit.txt`: your prediction vector on the
  credit-worthiness task for the test set.
* `training_age.txt`: your prediction vector on the
  age-prediction task for the training set.
* `validation_age.txt`: your prediction vector on the
  age-prediction task for the validation set.
* `test_age.txt`: your prediction vector on the
  age-prediction task for the test set.
* `training_gender.txt`: your prediction vector on the
  gender-prediction task for the training set.
* `validation_gender.txt`: your prediction vector on the
  gender-prediction task for the validation set.
* `test_gender.txt`: your prediction vector on the
  gender-prediction task for the test set.

Each line of the file should have one single word with your
prediction:

* for the credit-worthiness task, use "GOOD" or "BAD".

* for the age-prediction task, use "YOUNG" or "OLD".

* for the gender task, use "MALE" or "FEMALE".

The order of the lines in your file should match the order of the rows
in the datasets being provided.

### Datasets

The original dataset is split in 80%-10%-10%, so you will have 800
training points, 100 validation points, and you will need to make 100
predictions.

* [Training set](assignment_6/training.txt)
* [Validation set](assignment_6/validation.txt)
* [Test set](assignment_6/test.txt)

### Dataset description

The dataset has some columns that are numerical, and some columns that
are categorical (or qualitative). Most ML algorithms expect all
columns to be numerical. Use
[one-hot encoding](https://www.quora.com/What-is-one-hot-encoding-and-when-is-it-used-in-data-science)
to convert categorical columns.

See the [codebook](#dataset-codebook) for more information.

## Part 1. You're a bank

Build a classifier to predict whether a customer will be "good"
(presumably, this means they will pay the loan) or "bad". This is the
last column of the dataset above.

You should try more than one classifier (or, equivalently, more than
one choice of hyperparameter settings like the parameters in k-NN, or
choice of kernels in SVMs) to investigate the differences in
performance of different classifiers.

1. What is the observed performance of your model?

2. When you breakdown the performance of your model in different
   subclasses (for training and validation), do you see anything that can
   be concerning? Specifically:
   
   * show figures of the performance of your model on training and
     validation when you split the dataset on age (attribute 13), using
     decade-wide bins.
	 
   * show figures of the performance of your model on training and
     validation when you split the dataset on gender (attribute 9,
     though note that the
     [information is encoded across different values of the attribute](#attribute-9-qualitative))
	 

### Extra credit: good performance

You will be given 10% overall extra credit if your the quality of your
classifier is within the top 10% of the class, *measured on the test
set*.  (This is why you're not supposed to look at the full dataset
available online).

### Extra credit: little disparate impact

You will be given an *additional* 10% overall extra credit on your
assignment if, in addition to being within the top 10% of the class in
test set performance, your classifier exhibits relatively little
disparate impact (We will use $DI < 0.8$). For this portion, we will
measure disparate impact with respect to two attributes:

* gender (reported, on this dataset, on attribute 9). Note that, as
  mentioned above, you will need to merge a few attribute values for
  this assessment.

* age (reported, on this dataset, on attribute 13). Although
  age is a numerical attribute, for the purposes of assessing DI,
  follow the convention from the literature, which splits this
  attribute on applicants with age 25 or less, and applications older
  than 25.
  
You will be eligible for extra credit if your solution exhibits little
DI to either one of the attributes.

## Part 2. You're an auditor

In this part of the assignment, you will explore the extent to which
dropping individual features from a dataset is enough to "protect" the
attribute. 

1. Remove the age attribute from your dataset, and rerun the
   predictions. Does the accuracy change, and how? After running the
   predictions without using age, try to measure the DI of the
   decisions you made, using an age split of 25.
   
2. Again, remove the age attribute from your dataset, but now attempt
   to predict the attribute "age <= 25". What is the accuracy of your
   model?
   
3. Do the same thing as 2.1, but removing attribute 9, which encodes
   gender.
   
4. Do the same thing as 2.2 (that is, attempt to predict gender from
   the dataset without attribute 9).

# Extra Information

## Dataset codebook

The information below is taken directly from the
[UCI repository page for the German credit dataset](<https://archive.ics.uci.edu/ml/datasets/Statlog+(German+Credit+Data)>):

### Attribute 1: (qualitative) 

Status of existing checking account: (note: DM is Deutsche Mark, the
german currency).

* A11 : ... < 0 DM 
* A12 : 0 <= ... < 200 DM 
* A13 : ... >= 200 DM / salary assignments for at least 1 year 
* A14 : no checking account 

### Attribute 2: (numerical) 

Duration in month 

### Attribute 3: (qualitative) 

Credit history 

* A30 : no credits taken/ all credits paid back duly 
* A31 : all credits at this bank paid back duly 
* A32 : existing credits paid back duly till now 
* A33 : delay in paying off in the past 
* A34 : critical account/ other credits existing (not at this bank) 

### Attribute 4: (qualitative) 

Purpose 

* A40 : car (new) 
* A41 : car (used) 
* A42 : furniture/equipment 
* A43 : radio/television 
* A44 : domestic appliances 
* A45 : repairs 
* A46 : education 
* A47 : (vacation - does not exist?) 
* A48 : retraining 
* A49 : business 
* A410 : others 

### Attribute 5: (numerical) 

Credit amount 

### Attribute 6: (qualitative) 

Savings account/bonds 

* A61 : ... < 100 DM 
* A62 : 100 <= ... < 500 DM 
* A63 : 500 <= ... < 1000 DM 
* A64 : .. >= 1000 DM 
* A65 : unknown/ no savings account 

### Attribute 7: (qualitative) 

Present employment since 

* A71 : unemployed 
* A72 : ... < 1 year 
* A73 : 1 <= ... < 4 years 
* A74 : 4 <= ... < 7 years 
* A75 : .. >= 7 years 

### Attribute 8: (numerical) 

Installment rate in percentage of disposable income 

### Attribute 9: (qualitative) 

Personal status and sex 

* A91 : male : divorced/separated 
* A92 : female : divorced/separated/married 
* A93 : male : single 
* A94 : male : married/widowed 
* A95 : female : single 

### Attribute 10: (qualitative) 

Other debtors / guarantors 

* A101 : none 
* A102 : co-applicant 
* A103 : guarantor 

### Attribute 11: (numerical) 

Present residence since 

### Attribute 12: (qualitative) 

Property 

* A121 : real estate 
* A122 : if not A121 : building society savings agreement/ life insurance 
* A123 : if not A121/A122 : car or other, not in attribute 6 
* A124 : unknown / no property 

### Attribute 13: (numerical) 

Age in years 

### Attribute 14: (qualitative) 

Other installment plans 

* A141 : bank 
* A142 : stores 
* A143 : none 

### Attribute 15: (qualitative) 

Housing 

* A151 : rent 
* A152 : own 
* A153 : for free 

### Attribute 16: (numerical) 

Number of existing credits at this bank 

### Attribute 17: (qualitative) 

Job 

* A171 : unemployed/ unskilled - non-resident 
* A172 : unskilled - resident 
* A173 : skilled employee / official 
* A174 : management/ self-employed/ highly qualified employee/ officer 

### Attribute 18: (numerical) 

Number of people being liable to provide maintenance for 

### Attribute 19: (qualitative) 

Telephone 

* A191 : none 
* A192 : yes, registered under the customers name 

### Attribute 20: (qualitative) 

foreign worker 

* A201 : yes 
* A202 : no 


