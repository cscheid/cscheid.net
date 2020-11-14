---
layout: bootstrap
title: Syllabus for CSC580, Principles of Machine Learning
---

# Syllabus

This is the syllabus for CSC580: Principles of Machine Learning.

## 2019 Coronavirus mitigation

The University of Arizona is moving from in-person instruction to
remote instruction as part of the COVID-19 mitigation efforts.

Specifically, this will impact CSC580 in the following ways:

* March 16th classes are canceled
* Starting on March 18th, we will be having all of our class meetings
  on zoom.us. I have been contacting students on Piazza and D2L
  directly. If you haven't received these emails, please contact me
  ASAP.
* The midterm and final exams have been replaced with take-home
  exams. These changes are now reflected on the course syllabus.
  
Please take your health as your first priority. If you foresee that
COVID-19 will interfere with your ability to attend class or finish
homework assignments, please contact me at your earliest convenience
to discuss it.

## Recommendation Letters

Yes, I can write you a letter, but I will not write a letter for you
simply based on your course performance: transcripts are already good
indicators of course performance. If you intend me to write a letter
because of a course I taught you, you need to talk to me at the
beginning of the semester (in this specific case, before the end of
January 2019), and you should read [this section on my advice
page](/advice/students.html#recommendation-letters).

# Description of course

Students will learn why machine learning is a fundamentally different way of writing computer programs from traditional programming, and why this is often an attractive way of solving practical problems. Machine learning is all about automatic ways for computers to find patterns in datasets; students will learn both advantages and unique risks that this approach offers. They will learn the fundamental computational methods, algorithms, and perspective which underlie current machine learning methods, and how to derive and implement many of them.

Students will learn the fundamentals of unsupervised and supervised machine learning methods, the computational and quality tradeoffs between different methods, and how to adapt existing methods to fit their own research needs.

# Course Prerequisites or co-requisites

* Linear Algebra or equivalent
  * you will need to understand the relationship between linear operators, linear transformations, change of bases, and matrices
  * we will make repeated use of matrix decompositions such as the SVD. Often we will need to use properties of the eigendecomposition of a matrix.
* Multivariate Calculus or equivalent:
  * you will need to understand the relationship between the total derivative, the gradient, and how to take advantage of the fact that the derivative is a linear operator
  * You will need a good amount of programming experience: a significant amount of programming maturity is expected.
  * Some knowledge of probability theory and statistics will be helpful, but not strictly necessary

# Instructor and Contact Information

* Instructor: [Carlos Scheidegger](/)
* Email: [cscheid+spring2020csc580@cs.arizona.edu](mailto:cscheid+spring2020csc580@cs.arizona.edu)

# Course Format and Teaching Methods

Videoconference lectures, individual assignments, written exams, projects, group discussions.

# Course Objectives and Expected Learning Outcomes

A successful student will be able to implement and explain the limitations of many of the central methods and techniques in machine learning: 

* Basic one-class classifiers: decision trees, perceptron, logistic regression
* Supervised vs. unsupervised learning - what’s possible in the absence of labels
* Reductions - how to handle imbalanced data; how to build multiclass classifiers
* Practical issues - how to detect overfitting and underfitting; how and when to use feature engineering
* Bias and fairness - how to be (computationally) mindful of using existing observations of society to make decisions about how society operates
* Efficiency issues - how to create classifiers that work well in the presence of large training sets, and large feature sets
* Modern techniques - students will be introduced, via classroom materials and projects, to recent methods in machine learning (this could include, for example, deep learning, reinforcement learning, recurrent neural networks, attention, and memory)

For a more granular description of the learning objectives, see the week-by-week schedule and the description of the assignments below.

Machine Learning is a big field, and there is no way we can cover all of it in one course. With that said, this course covers a large amount of material, and the assignments are a central part of the course. *Students are expected to dedicate a significant amount of time on the course outside of the classroom, especially if they have background deficiencies to make up*.

# Absence and Class Participation Policy

The UA's policy concerning Class Attendance, Participation, and Administrative Drops is available [here](http://catalog.arizona.edu/policy/class-attendance-participation-and-administrative-drop). The [UA policy regarding absences for any sincerely held religious belief] (http://policy.arizona.edu/human-resources/religious-accommodation-policy), observance or practice will be accommodated where reasonable. Absences pre approved by the UA Dean of Students (or dean’s designee) will be honored. See
the [dean of students's website](https://deanofstudents.arizona.edu/absences) for details.

# Makeup Policy for Students Who Register Late

If you register late for this class, contact me as soon as you do. You will be expected to submit all missed assignments within a week of your registration. It is solely your responsibility to catch up to the class content.

# Course Communications

We will use Piazza for communications and discussion. Make sure your Piazza account is up to date - class announcements are sent through the website.

# Required Texts or Readings

The required textbook is [Hal Daumé’s Course in Machine Learning](http://ciml.info/), fully and freely available online.

As mentioned above, you will be assessed based on your performance on programming assignments, one midterm exam, one final exam, and one project.

The instructing staff will grade your assignments, project, midterms, and final exam on a scale from 0 to 100, with the following weights:

* Assignments: 50%
* Project: 15%
* Midterm Exam: 15%
* Final Exam: 20%

Your final grade in the course of be the best of a per-class grading curve and overall performance:

* 90% or better: A;
* 80% or better: B;
* 70% or better: C;
* 60% or better: D;
* below 60%: F.

By your last day to withdraw, you will know more than 40% of your grade by weight.

Grades for assignments, midterm and final exam will be posted on D2L as soon as we have them. The grading for each assignment will be provided one week after the assignment is due.

There will be a total of 11 programming assignments paced at around one assignment per week, skipping weeks for the midterm, break, and final. Each assignment will be due at least one week after it is posted. The final project report is due at the last day of class.

## COVID-19 Updates

2020-03-17: The midterm exam will now be a take-home exams given on Mar 23rd 9:30AM. It will be an exam expected to take 75 minutes to complete, and students will be asked to take the exam at any contiguous period between 9:30AM and 11:59PM on that day. The final exam will have the same format, except it will be a comprehensive exam that is expected to take 120 minutes to complete, with a date currently TBD.

# Assignments

The (approximately weekly) assignments are described in the list of scheduled topics below.

The written assignments will serve to make sure students have a firm grasp of the theoretical foundations on which the course material is built, and will explore important variations of topics which were discussed in class.

The programming assignments, on the other hand, serve two purposes. First, they will provide the students an opportunity for hands-on experience with the kind of practical data science knowledge that is deeply relevant in applications:
* how should one convert a dataset from its original format into a format that is convenient for its use in machine-learning scenarios?
* how should one debug issues in dataset generation?
* how do assumptions about the features present in a dataset impact the performance of the developed models?

Second, the programming assignments will provide students an opportunity to understand how popular ML libraries are actually implemented, and why.


|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|                                        | Assignments                                                                                                                                                                                                                                                                |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [A1](assignments/assignment-1.html)    | Decision Trees (programming assignment)                                                                                                                                                                                                                                    |
|                                        | Students implement a procedure for creating decision trees and decision forests                                                                                                                                                                                            |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [A2](assignments/assignment-2.html)    | Naive nearest neighbors, k-means (programming assignment)                                                                                                                                                                                                                  |
|                                        | Students implement nearest-neighbor classification and the k-means clustering algorithm                                                                                                                                                                                    |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [A3](assignments/assignment-3.html)    | Project Proposal (written assignment)                                                                                                                                                                                                                                      |
|                                        | Students submit a proposal for their final project, identifying the paper they propose to implement, the datasets they will use for the experiments, and the strategy they will use to evaluate their results.                                                             |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [A4](assignments/assignment-4.html)    | Perceptron and Feature Selection (programming assignment)                                                                                                                                                                                                                  |
|                                        | Students implement the classic linear perceptron algorithm and use methods such as cross-validation to pick one among a number of candidate models based on which features are selected.                                                                                   |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [A5](assignments/assignment-5.html)    | Reductions (programming + written assignment)                                                                                                                                                                                                                              |
|                                        | Students derive reductions from single-class classifiers to create multiclass classifiers and implement the reductions using the classification software they developed from previous assignments.                                                                         |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [A6](assignments/assignments-6.html)   | Linear and Kernel Methods (programming + written assignments)                                                                                                                                                                                                              |
|                                        | Students derive the optimization procedures for linear least squares and the different formulations of the convex problem that underlies support vector machines, and implement a procedure to optimize both functionals.                                                  |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [A7](assignments/assignments-7.html)   | Naive Bayes (programming assignment)                                                                                                                                                                                                                                       |
|                                        | Students implement a basic spam filtering algorithm based on Naive Bayes and evaluate it on existing email corpora.                                                                                                                                                        |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [A8](assignments/assignments-8.html)   | Bias and Fairness (programming assignments)                                                                                                                                                                                                                                |
|                                        | Students observe how their own software can generate structurally-biased predictions and implement procedures to assess and mitigate these issues based on the literature                                                                                                  |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [A9](assignments/assignments-9.html)   | Neural Networks and Back-Propagation (programming assignment)                                                                                                                                                                                                              |
|                                        | Students implement reverse-mode automatic differentiation, use it to automatically synthesize back-propagation algorithms for a number of neural network configurations, and use these algorithms to train neural networks to classify images of digits and clothing items |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [A10](assignments/assignments-10.html) | Ensembling and Efficiency (programming assignment)                                                                                                                                                                                                                         |
|                                        | Students implement stochastic gradient descent for the loss function in A9, and boosting for the models in A1                                                                                                                                                              |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [A11](assignments/assignments-11.html) | Computational Learning Theory (written assignment)                                                                                                                                                                                                                         |
|                                        | TBD                                                                                                                                                                                                                                                                        |
|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

# Dispute of Grade Policy

If you wish to dispute your grade for an assignment, midterm or project, you have two weeks after the grade has been turned in. In addition, even if only you dispute one portion of the grading for that unit, I reserve the right to revisit the entire unit (assignment, midterm, or project).

# Scheduled Topics/Activities

* Week 1
  * Lecture:    Introduction, motivation, course mechanics
  * Lecture:    Basics - Decision Trees, algorithms for learning
    * Learning Objectives. Explain the difference between memorization and generalization • Implement a decision tree classifier • Take a concrete task and cast it as a learning problem, with a formal notion of input space, features, output space, generating distribution and loss function.
  * A1:        Decision Trees
* Week 2
  * Lecture:     Limits - Optimal Bayes rate and classifier; overfitting and underfitting
    * Learning Objectives. Define "inductive bias" and recognize the role of inductive bias in learning • Illustrate how regularization trades off between underfitting and overfitting • Evaluate whether a use of test data is “cheating” or not.
  * Lecture:     Geometry, nearest-neighbor classifiers, k-means (unsupervised learning preview)
    * Learning Objectives • Describe a data set as points in a high dimensional space • Explain the curse of dimensionality • Compute distances between points in high dimensional space • Implement a K-nearest neighbor model of learning • Implement the K-means algorithm for clustering.
  * A2:         Naive nearest neighbors, k-means
* Week 3
  * Lecture:    The perceptron (1/2)
    * Learning Objectives. Describe the biological motivation behind the perceptron • Classify learning algorithms based on whether they are error-driven or not • Implement the perceptron algorithm for binary classification • Draw perceptron weight vectors and the corresponding decision boundaries in two dimensions • Contrast the decision boundaries of decision trees, nearest neighbor algorithms and perceptrons • Compute the margin of a given weight vector on a given data set.
  * Lecture:    The perceptron (2/2)
  * A3:         Project Proposal
* Week 4
  * Lecture:    Practical Issues (1/2) - performance measures, underfitting, overfitting, cross validation, prediction confidence via statistical tests and bootstrapping, debugging ML models
    * Learning Objectives. Translate between a problem description and a concrete learning problem • Perform basic feature engineering on image and text data • Explain how to use cross-validation to tune hyperparameters and estimate future performance • Compare and contrast the differences between several evaluation metrics.
  * Lecture:    Practical Issues - (2/2)
  * A4:        Perceptron and Feature Selection
* Week 5
  * Lecture:    Bias-variance decomposition, and friends
    * Learning Objectives. Understand how classification errors naturally split in approximation error and estimation errors • Understand how error decompositions are useful for debugging.
  * Lecture:    Reductions (1/3)
    * Learning Objectives. Represent complex prediction problems in a formal learning setting • Be able to artificially “balance” imbalanced data • Understand the positive and negative aspects of several reductions from multiclass classification to binary classification • Recognize the difference between regression and ordinal regression.
* Week 6
  * Lecture:    Reductions
  * Lecture:    Reductions
  * A5:         Reductions
* Week 7
  * Midterm Exam (**2020-02-26 Update: Midterm now scheduled for 2020-03-18**)
  * Lecture:    Linear Models (1/2)
    * Learning Objectives. Define and plot four surrogate loss functions: squared loss, logistic loss, exponential loss and hinge loss • Compare and contrast the optimization of 0/1 loss and surrogate loss functions • Solve the optimization problem for squared loss with a quadratic regularizer in closed form • Implement and debug gradient descent and subgradient descent
  * A3b:        Project Check-In
* Week 8
  * Lecture:    Linear Models (2/2)
  * Lecture:    Kernel Methods (1/2)
    * Learning Objectives. Explain how kernels generalize both feature combinations and basis functions • Contrast dot products with kernel products • Implement kernelized perceptron • Derive a kernelized version of regularized least squares regression • Implement a kernelized version of the perceptron • Derive the dual formulation of the support vector machine.
  * A6:        Linear and Kernel Models
* Week 9
  * Lecture:    Kernel Methods (2/2)
  * Lecture:    Probability and Naive Bayes
    * Learning Objectives. Define the generative story for a naive Bayes classifier • Derive logistic loss with an l2 regularizer from a probabilistic perspective.
  * A7:        Naive Bayes
* Week 10
  * Lecture:    Bias and Fairness (1/2)
    * Learning Objectives. Identify how disparity along training/test data can generate bias/unfairness • Understand how a bad choice of metric to optimize can cause bias/unfairness • Identify how careless data collection practices can perpetuate bad decisions • Identify how different assumptions about the world change the way data should be processed for an ML method • Understand how feedback loops can cause arbitrarily bad predictions
  * Lecture:    Bias and Fairness (2/2)
  * A8:        Bias and Fairness
* Week 11
  * Lecture:    Neural Networks and Back-Propagation (1/2)
    * Learning Objectives. Explain the biological inspiration for multi-layer neural networks • Construct a two-layer network that can solve the XOR problem • Implement the back-propagation algorithm for training multi-layer networks • Explain the trade-off between depth and breadth in network structure • Contrast neural networks with radial basis functions with k-nearest neighbor learning.
  * Lecture:    Neural Networks and Back-Propagation (2/2)
  * A9:        Neural Networks and Back-Propagation
* Week 12
  * Lecture:    Ensembling
    * Learning Objectives. Implement bagging and explain how it reduces variance in a predictor • Explain the difference between a weak learner and a strong learner • Derive the AdaBoost algorithm • Understand the relationship between boosting decision stumps and linear classification.
  * Lecture:    Efficiency
    * Learning Objectives. Understand and be able to implement stochastic gradient descent algorithms • Compare and contrast small versus large batch sizes in stochastic optimization • Derive subgradients for sparse regularizers • Implement feature hashing.
  * A10:        Ensembling and Efficiency
* Week 13
  * Lecture:    Unsupervised Learning (1/2)
    * Learning Objectives. Explain the difference between linear and non-linear dimensionality reduction • Relate the view of PCA as maximizing variance with the view of it as minimizing reconstruction error • Implement latent semantic analysis for text data • Motivate manifold learning from the perspective of reconstruction error • Understand K-means clustering as distance minimization • Explain the importance of initialization in k-means and furthest-first heuristic • Implement agglomerative clustering • Argue whether spectral clustering is a clustering algorithm or a dimensionality reduction algorithm.
  * Lecture:    Unsupervised Learning (2/2)
  * A3c:        Unsupervised Learning and Project Check-In
* Week 14
  * Lecture:    Computational Learning Theory
    * Learning Objectives. Explain why inductive bias is necessary • Define the PAC model and explain why both the “P” and “A” are necessary • Explain the relationship between complexity measures and regularizers • Identify the role of complexity in generalization • Formalize the relationship between margins and complexity
  * Lecture:    Computational Learning Theory
  * A11:        Computational Learning Theory
* Week 15
  * (Reserved for catch-up)
  * (Reserved for catch-up)

# Scheduled Assignments

The scheduled assignments will present an opportunity for the students to develop important skills associated to machine learning, specifically about exploratory data analysis and data cleaning. Some of the assignments will require students to convert input data from a raw format to something more appropriate for the specific task. Students are expected to be familiar with UNIX command-line tools, and will be encouraged to develop their homework assignments so they can be executed in a shell.

# Comprehensive, Final Project

The final project for the course will involve the implementation of a recently-published machine learning technique of the student’s choice, subject to the approval of the instructor. The instructor will provide a list of suggested techniques for students who prefer not to make the choice from scratch. The instructor expects these techniques to be drawn from top research venues in the field, such as NIPS, ICML, ECCV, ICCV, ICLR, etc. 

# Exam dates

* Midterm: First day of week 7
* Final exam: Whenever scheduled by UA

# Department of Computer Science Code of Conduct

The Department of Computer Science is committed to providing and maintaining a supportive educational environment for all.  We strive to be welcoming and inclusive, respect privacy and confidentiality, behave respectfully and courteously, and practice intellectual honesty.  Disruptive behaviors (such as physical or emotional harassment, dismissive attitudes, and abuse of department resources) will not be tolerated.  The complete Code of Conduct is available on our department web site.  We expect that you will adhere to this code, as well as the UA Student Code of Conduct, while you are a member of this class.

# Classroom Behavior Policy

To foster a positive learning environment, students and instructors have a shared responsibility. We want a safe, welcoming, and inclusive environment where all of us feel comfortable with each other and where we can challenge ourselves to succeed. To that end, our focus is on the tasks at hand and not on extraneous activities (e.g., texting, chatting, reading a newspaper, making phone calls, web surfing, etc.). 

Students are asked to refrain from disruptive conversations with people sitting around them during lecture. Students observed engaging in disruptive activity will be asked to cease this behavior. Those who continue to disrupt the class will be asked to leave lecture or discussion and may be reported to the Dean of Students.

Some learning styles are best served by using personal electronics, such as laptops and iPads. These devices can be distracting to other learners. Therefore, students who prefer to use electronic devices for note-taking during lecture should use one side of the classroom.

# Threatening Behavior Policy

The UA Threatening Behavior by Students Policy prohibits threats of physical harm to any member of the University community, including to oneself. See <http://policy.arizona.edu/education-and-student-affairs/threatening-behavior-students>. 

# Notification of Objectionable Materials

This course will, at times, contain material of a mature nature, which may include references to historical violence as collected and depicted in datasets and historical events. The instructor will provide advance notice when such materials will be used.  Students are not automatically excused from interacting with such materials, but they are encouraged to speak with the instructor to voice concerns and to provide feedback.

# Accessibility and Accommodations

At the University of Arizona we strive to make learning experiences as accessible as possible. If you anticipate or experience physical or academic barriers based on disability or pregnancy, you are welcome to let me know so that we can discuss options.  You are also encouraged to contact Disability Resources (520-621-3268) to explore reasonable accommodation.

If our class meets at a campus location: Please be aware that the accessible table and chairs in this room should remain available for students who find that standard classroom seating is not usable.

# Code of Academic Integrity

Students are encouraged to share intellectual views and discuss freely the principles and applications of course materials. However, graded work/exercises must be the product of independent effort unless otherwise instructed. Students are expected to adhere to the UA Code of Academic Integrity as described in the UA General Catalog. See <http://deanofstudents.arizona.edu/academic-integrity/students/academic-integrity>.

The University Libraries have some excellent tips for avoiding plagiarism, available [here](http://www.library.arizona.edu/help/tutorials/plagiarism/index.html).

# UA Nondiscrimination and Anti-harassment Policy

The University is committed to creating and maintaining an environment free of discrimination; see the [policy document](http://policy.arizona.edu/human-resources/nondiscrimination-and-anti-harassment-policy).

Our classroom is a place where everyone is encouraged to express well-formed opinions and their reasons for those opinions. We also want to create a tolerant and open environment where such opinions can be expressed without resorting to bullying or discrimination of others.

# Additional Resources for Students

UA Academic policies and procedures are available [here](http://catalog.arizona.edu/policies).

Student Assistance and Advocacy information is available [here](http://deanofstudents.arizona.edu/student-assistance/students/student-assistance).

Campus Health information may be found [here](http://www.health.arizona.edu/counseling-and-psych-services).

OASIS Sexual Assault and Trauma Services: <http://oasis.health.arizona.edu/hpps_oasis_program.htm>.

# Confidentiality of Student Records

Please see
<http://www.registrar.arizona.edu/personal-information/family-educational-rights-and-privacy-act-1974-ferpa?topic=ferpa> for information on confidentiality of student records. *This has concrete consequences for you if you give my name as a reference*! In other words, if you intend to give my name as a reference, please contact me ahead of time so we can discuss. To give a concrete example: before you give me your permission, I'm not allowed to discuss your in-class performance with anyone else! This means that if your potential employer is not aware of the issue, they might take my "I cannot answer because of FERPA" answer to mean "I'm not comfortable sharing the student's performance", when I actually don't mean that.

# Subject to Change Statement

Information contained in the course syllabus, other than the grade and absence policy, may be subject to change with advance notice, as deemed appropriate by the instructor.


# Changelog

* 2020-03-17:
  * Changed format of course delivery
  * Changed midterm exam format
  * Changed final exam format
