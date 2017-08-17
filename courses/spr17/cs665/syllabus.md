---
layout: bootstrap
title: Syllabus for CSC 665, Spr 2017
---

# CSC 665: Computational Data Science

* Lecture Times: Tuesdays and Thursdays, 3:30PM - 4:45PM
* Room: Bio Sciences West 212.
* Discussion: [Piazza](https://piazza.com/class/ixun6en0aa45li).
* Office Hours: GS 734, Mondays 1-2PM, Tuesdays 2:30PM-3:30PM (please email
  ahead of time for the Tuesday slot).
* Contact: [email](mailto:cscheid+csc665_2017@cs.arizona.edu)

## Description of Course

In this course, we will study the theory and practice of **data
science** from a computational perspective. Since data sources are
becoming ever larger and more complex, computer scientists have spent
a lot of time designing techniques to process it effectively. We can
use data to understand the world, to make predictions about it, and to
act on it.

This course will teach you computational principles that enable you to
understand and implement techniques in data mining, machine learning,
data visualization, computer vision, etc.

On the theoretical side, we will study the how computer science lets
us uniquely combine geometry and algorithms to make sense of data sets
both small and large. We will study a small number of principles that
can applied broadly.

On the practical side, we will study aspects of data science that are
currently not well-understood theoretically. In addition, we will look
at the consequences of using automated, data-driven decision making in
the real world. There are interesting software engineering
consequences, and there are important societal consequences. We will
study them both.

The primary textbook for the course is
[Foundations of Data Science](https://www.cs.cornell.edu/jeh/book.pdf),
by Blum, Hopcroft and Kannan. We will not be covering the entire book
back-to-back, but we will draw heavily from it. We will also use other
freely-available sources of material.

## Covered Material

### The Computational Theory of Data Science

* Computing in sublinear space - sketches
  * Reservoir sampling
  * Bloom filters
  * count-min sketch, and HyperLogLog sketch
* Optimization in vector spaces: many data-processing problems can be
  described as finding the **best vector** in a vector space, for
  varying definitions of "vector" and "best".
  * the SVD and matrix inverses
  * ordinary least squares
    * the Gram matrix
	* the hat matrix
  * principal component analysis
  * kernel methods
  * regularization
	* Regularization or constraints
    * Constrained optimization, and the duality principle
    * Ridge regression, Lasso regression
    * $\ell\_{2}$ vs $\ell\_{1}$ regularization: prediction error vs
      sparsity (skipped for lack of time)
  * Generalized linear methods, and logistic regression especially
  * Low-rank approximations, Nystr&ouml;m methods
* Clustering
  * $k$-means clustering
    * kernel variants
  * Gaussian Mixture Models
  * subspace clustering
* Random walks
  * Markov Chains, Metropolis-Hastings, Gibbs sampling
* Bootstrapping

### The Computational Practice of Data Science

* Computational methods for exploratory data science
  * What is your model sensitive to?
  * feature engineering: what do you choose to put in your columns?
  * bootstrapping
  * [Model debugging](http://nlpers.blogspot.com/2016/08/debugging-machine-learning.html)
  * Unbalanced data
* How does your model compare to their model?
  * Model interpretability. When your model makes a strange decision,
    can you explain it?
* Consequences of automated, model-driven decision making
  * What is your model sensitive to? What if you use your model for
    hiring, and it uses features prohibited by law (What if you
    collected age information?), or simply features you rather it
    didn't use? What about **proxy variables**?

# Student coursework

* [Assignment 1](assignments/assignment_1.html)
* [Assignment 2](assignments/assignment_2.html)
* [Assignment 3](assignments/assignment_3.html)
* Midterm
* [Assignment 4](assignments/assignment_4.html)
* [Assignment 5](assignments/assignment_5.html)
* [Assignment 6](assignments/assignment_6.html)
* Final Project (or Final Exam)

# Schedule

| Day | Week | Lecture | | 
|---|---|---|---|
| 1/12 | 1 | 1 | Introduction |
|---|---|---|---|
|   |   |   |  **The Computational Theory of Data Science** |
|---|---|---|---|
| 1/17 | 2 | 2 | [Data Science in sublinear time and space](lectures/lecture_2.html). [Assignment 1](assignments/assignment_1.html) posted. |
| 1/19 |   | 3 | [Lecture outline](lectures/lecture_3.html) |
|---|---|---|---|
| 1/24 | 3 | 4 | [Lecture outline](lectures/lecture_4.html) |
| 1/26 |   |  | [Morris counting](http://www.inf.ed.ac.uk/teaching/courses/exc/reading/morris.pdf); ["Sketch of the day: HyperLogLog"](https://research.neustar.biz/2012/10/25/sketch-of-the-day-hyperloglog-cornerstone-of-a-big-data-infrastructure/), [Illustrated HLL implementation](http://content.research.neustar.biz/blog/hll.html), [HyperLogLog paper](http://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf);  |
|---|---|---|---|
| 1/31 | 4 |  | [Assignment 1](assignments/assignment_1.html) Due (to be posted by Jan 17th). **Optimization in Vector Spaces** The Singular Value Decomposition |
| 2/2 |   |  | Ordinary Least Squares, Gram and Hat matrices |
|---|---|---|---|
| 2/7 | 5 |   | Constrained Optimization |
| 2/9 |   |   | Principal Component Analysis |
|---|---|---|---|
| 2/14 | 6 |  | [Assignment 2](assignments/assignment_2.html) Due (to be posted by Jan 31th). Kernel Methods |
| 2/16 |   |  | Classification, LDA |
|---|---|---|---|
| 2/21 | 7 |  | Logistic Regression |
| 2/23 |   |  | Regularization ([demo](https://cscheid.net/writing/data_science/regularization/)) |
|---|---|---|---|
| 2/28 | 8 |  | Assignment 3 Due (to be posted by Feb 14th) [Low-Rank Approximations](lectures/low_rank_approximations.html) |
| 3/2 |   |  | Clustering, [$k$-means](https://cscheid.net/writing/data_science/kmeans/) |
|---|---|---|---|
| 3/7 | 9 |  | Review |
| 3/9 |   | MIDTERM | |
|---|---|---|---|
| 3/14 | Spring Break |  |  |
| 3/16 | Spring Break |  |  |
|---|---|---|---|
| 3/21 | 10 |  | [Optimization wrap-up](lectures/other_formulations.html): other objective functions, regularization criteria, etc. |
| 3/23 |    |  | Generating random samples; inverse transform sampling; rejection sampling |
|---|---|---|---|
| 3/28 | 11 |  | **Random walks**, Markov Chains, Last day to drop, [Assignment 4](assignments/assignment_4.html) Due (to be posted by Mar 14th), Metropolis |
| 3/30 |    |  | Gibbs Sampling, Bootstrapping  |
|---|---|---|---|
|   |   |   |  **The Computational Practice of Data Science** |
|---|---|---|---|
| 4/4 | 12 |  | Bagging, Ensemble Methods |
| 4/6 |    |  | [FATML](http://fatml.org), [Ten Simple Rules](http://journals.plos.org/ploscompbiol/article/file?id=10.1371/journal.pcbi.1005399&type=printable) |
|---|---|---|---|
| 4/11 | 13 |  | [Certifying and Removing DI](https://arxiv.org/abs/1412.3756) Assignment 5 Due (to be posted by Mar 28th) |
| 4/13 |    |  | Feature influence methods: [A peek into the black box: exploring classifiers by randomization](http://link.springer.com/article/10.1007/s10618-014-0368-8), [Algorithmic Transparency via Quantitative Input Influence](https://www.andrew.cmu.edu/user/danupam/datta-sen-zick-oakland16.pdf). Other things we discussed: [The Code I'm Still Ashamed Of](https://medium.freecodecamp.com/the-code-im-still-ashamed-of-e4c021dff55e), [Haunted by Data](http://idlewords.com/talks/haunted_by_data.htm). |
|---|---|---|---|
| 4/18 | 14 |  | [Why should I trust you? Explaining the predictions of any classifier](https://arxiv.org/pdf/1602.04938.pdf) |
| 4/20 |    |  | [Layer-wise relevance propagation](http://journals.plos.org/plosone/article/file?id=10.1371/journal.pone.0130140&type=printable). Also, an entire workshop on interpretable ML: [Interpretable ML for Complex Systems NIPS 2016 Workshop](https://sites.google.com/site/nips2016interpretml/home). [Adversarial examples](https://arxiv.org/pdf/1312.6199.pdf), [Gradients as explanations](https://arxiv.org/pdf/1506.01066.pdf) |
|---|---|---|---|
| 4/25 | 15 |  | The replication crisis and data science's role in it. [The File Drawer problem](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.900.2720&rep=rep1&type=pdf), the [neutral model of inquiry](http://bactra.org/weblog/698.html), [Why Most Published Research Findings are False](http://faculty.dbmi.pitt.edu/day/Bioinf2118/Bioinf-2118-2013/Ioannidis-journal.pmed.0020124.pdf). [Restructuring incentives and practices to promote truth over publishability](https://arxiv.org/pdf/1205.4251.pdf). Debugging data science (and the [principle of assumed error](http://www.russpoldrack.org/2016/08/the-principle-of-assumed-error.html) -- assume your good result is a bug, because you'd have assumed it was a bug if your result had been bad.). The [Open Science Framework](https://osf.io/). |
| 4/27 |    |  | Data science interactions with software engineering. [Machine Learning: The High Interest Credit Card of Technical Debt](https://research.google.com/pubs/pub43146.html). |
|---|---|---|---|
| 5/2 | 16 |  | Assignment 6 and Final Project Due |
| 5/4 |    |  | Dead day - no classes |
|---|---|---|---|
| 5/9 | Finals Week |  |  |
| 5/11 |             |  |  |
|---|---|---|---|

# Additional Readings

* Hal Daume's [A Course in Machine Learning](http://ciml.info/)
* Michael Mahoney's [A Course in Randomized Linear Algebra](https://arxiv.org/pdf/1608.04481v1.pdf)

# Policies

## Late Work Policy 

As a rule, work will not be accepted late except
in case of documented emergency or illness. You may petition the
professor in writing for an exception if you feel you have a
compelling reason for turning work in late.

## Absence and Class Participation Policy

The UA’s policy concerning Class Attendance, Participation, and Administrative Drops is available at [this page](http://catalog.arizona.edu/policy/class-attendance-participation-and-administrative-drop).

The UA policy regarding absences for any sincerely held religious belief, observance or practice will be accommodated where reasonable: see [this page](http://policy.arizona.edu/human-resources/religious-accommodation-policy).

Absences preapproved by the UA Dean of Students (or dean’s designee) will be honored. See [this page](https://deanofstudents.arizona.edu/absences).

Participating in the course and attending lectures and other course
events are vital to the learning process. As such, attendance is
required at all lectures and discussion section meetings. Students who
miss class due to illness or emergency are required to bring
documentation from their health-care provider or other relevant,
professional third parties. Failure to submit third-party
documentation will result in unexcused absences.

From the [Dean of Students FAQ](https://deanofstudents.arizona.edu/faqs):

> A Dean’s Excuse provides excused absences for university-sponsored
> events/activities for academic, non-academic, and recognized student
> organizations. If a student must miss a class or classes for a
> university-sponsored event, the faculty or staff responsible for that
> event request a UA Official Activity Excused Absence Request Form from
> the Dean of Students Office.
> 
> The Dean of Students Office does not have oversight of academic
> departments or faculty members and does not grant individual excused
> absences. Each faculty member manages his or her classroom in the
> manner in which they see fit and are the only ones who may determine
> what constitutes an excused absence.  Therefore, we are unable to
> excuse absences for students, grant extensions, require that
> professors allow students to make-up missed work, or ensure students
> may miss class and submit late work without penalty, etc.
> 
> The best thing to do is for you to communicate directly with your
> professor regarding your absence.  Your professor is the only person
> who can excuse your absence, and determine if alternatives or make-up
> work is an option.  Your professor may also request documentation of
> your situation.  If your professor will not excuse your absence or
> grant make-up work the Dean of Students Office is not able to require
> them to do so.

## Makeup Policy for Students Who Register Late

A central part of this course is a number of small assignments. If you
register after the first class meeting, you will be allowed to make up
missed assignments, but those will *all* be due at the day that the
next assignment is due. You are responsible for notifying me about a
late registration so we can make grading accommodations.

## Course Assessment

We will have homework assignments, individual final projects, and a
midterm. Students who want to take a final exam in lieu of the
individual final project are allowed to, as long as they give the
instructing staff ample notice. In other words, if you want to take a
final exam instead of a final project, you need to notify the
instructing staff by the drop date: March 28th.

The final project (or exam) will be worth 20 points. Homework
assignments will be worth a combined total of 55 points, and the
midterm will be worth 20 points. I will give class participation 5%
weight, for a total score from 0 to 100. Notice that this means that
it will be hard for you to get an A in the course unless you actively
participate in class. This means attending class *and* participating in
discussions. Participation on the online forum also counts.

Your final grade in the course will be based on overall performance:

* 90% or better: A;
* 80% or better: B;
* 70% or better: C;
* 60% or better: D;
* below 60%: F.

Grades for assignments, midterm and final project will be posted on
D2L as soon as we have them. The grading for each assignment will be
provided one week after the assignment is due. 

### Assignments

The assignments will be based on a mix of selected problems from the
course textbooks and readings from research papers.

### Midterm and final exam

The midterm and final exam will be created from a small set of textbook problems.

* Time and location of final exam TBD

Please refer to the [UA Final exam regulations](https://www.registrar.arizona.edu/courses/final-examination-regulations-and-information) for more information.

### Final project

The final project for this course will involve implementing a
technique from a recent research paper of the student's choosing,
subject to the approval of the instructor. 

## Code of Conduct

All students, instructors, teaching assistants and section leaders in
this course are expected to treat each other respectfully at all
times. This includes refraining from boastful or demeaning behavior
and jokes.  Students who violate this expectation will be asked to
cease and, possibly, reported to the Dean of Students.

To foster a positive learning environment, students may not text,
chat, make phone calls, play games, read the newspaper, or surf the
web during lecture and discussion.  Students are asked to refrain from
disruptive conversations with people sitting around them during
lecture.  Students observed engaging in disruptive activity will be
asked to cease this behavior.  Students who continue to disrupt the
class will be asked to leave lecture or discussion and may be reported
to the Dean of Students.

Inclusive Excellence is a fundamental part of the University of
Arizona’s strategic plan and culture. As part of this initiative, the
institution embraces and practices diversity and inclusiveness.  These
values are expected, respected and welcomed in this course.

## Elective Name and Pronoun Usage

This course supports elective gender pronoun use and
self-identification; rosters indicating such choices will be updated
throughout the semester, upon student request.  As the course includes
group work and in-class discussion, it is vitally important for us to
create an educational environment of inclusion and mutual respect.

## Classroom Electronics

Some learning styles are best served by using personal electronics,
such as laptops and iPads.  These devices can be distracting to some
learners.  Therefore, people who prefer to use electronic devices for
note-taking during lecture should use one side of the classroom.

## Accessibility and Accomodations

It is the University’s goal that learning experiences be as accessible
as possible.  If you anticipate or experience physical or academic
barriers based on disability, please let me know immediately so that
we can discuss options.  You are also welcome to contact Disability
Resources (520-621-3268) to establish reasonable accommodations.  For
additional information on Disability Resources and reasonable
accommodations, please visit [their website](http://drc.arizona.edu/).

If you have reasonable accommodations, please plan to meet with me by
appointment or during office hours to discuss accommodations and how
my course requirements and activities may impact your ability to fully
participate.

Please be aware that the accessible table and chairs in this room
should remain available for students who find that standard classroom
seating is not usable.

## Subject to Change Statement

Information contained in the course syllabus, other than the grade and
absence policy, may be subject to change with advance notice, as
deemed appropriate by the instructor.

# Additional Resources

* [UA Non-discrimination and Anti-harassment policy](http://policy.arizona.edu/human-resources/nondiscrimination-and-anti-harassment-policy)
* [Student Assistance and Advocacy information](http://deanofstudents.arizona.edu/student-assistance/students/student-assistance)
* [Confidentiality of Student Records](http://www.registrar.arizona.edu/ferpa/ferpa-compliance)
 


