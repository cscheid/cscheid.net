---
layout: bootstrap
title: Syllabus for CSC 444, Data Visualization, Fall 2018
---

# CSC 444, Data Visualization

* When: Tuesdays and Thursdays, 12:30-1:45PM
* Where: GS 906

## Preface: Recommendation Letters and references

I'm happy to write you a recommendation letter, but I will not write a
letter for you simply based on your course performance: transcripts
already exist as indicators of course performance.  If you intend me
to write a letter because of a course I taught you, please talk to me
*at the beginning of the semester*, and you should read [this section
on my advice page](/advice/students.html#recommendation-letters).

Also, if you want to use me as a reference in a job application
somewhere, that is completely ok, but talk to me about it first. I
need your written permission to be able to discuss your performance
and participation in the course.

# Syllabus

## Description of Course

In this course, you will learn how, and why, to create data
visualizations.

A "visualization" is simply a visual representation of an object of
our interest. It's *visual*: we consume them with our eyes, and so it is
essential that we know how our eyes work --- and, more importantly,
the parts of our brains connected to our eyes. It's also a
*representation*; we get to choose what this representation will be,
and different choices lead to different pictures, some good and some
bad. We will learn how to tell those apart, and how to make pictures
that are more good than bad.

Good data visualization involves perceptual psychology, mathematics,
and computer science. This makes our subject uniquely challenging:
sometimes the way our eyes work stands in way of applying some
beautiful result from computer science. Sometimes it's the other way
around: something deep about the math in the data will help guide the
design process and let us make a picture that is beautiful,
informative, and truthful.

The content of the course is split roughly in three distinct aspects:
mechanics, principles, and techniques.

Although there are no specific prerequisites to this regard, we will
write most of our code using the web stack. This means we are
targeting modern web browsers, and writing our programs in a
combination of HTML, CSS, and JavaScript. If you don't know these
technologies, you will be expected to learn them.

## Course Prerequisites or Co-requisites

* CSC 335
* CSC 345

## Instructor and Contact Information

* Carlos Scheidegger, GS 734, [cscheid@cs.arizona.edu](mailto:cscheid+fall2019csc444@cs.arizona.edu)
* Office Hours (otherwise by appointment only)
  * Carlos Scheidegger: Wednesdays, 8-10AM, GS734
  * Jordan Siaha, TBD.
  
* Course home page:
  [http://cscheid.net/courses/fal18/csc444/](http://cscheid.net/courses/fal19/csc444/)

## Course Format and Teaching Methods

Lectures, individual projects and assignments, in-class discussions.

## Course Objectives and Expected Learning Outcomes

Principles: You will learn about perceptual psychology, and how it
constrains the ways in which we design algorithms for displaying data
effectively and efficiently.

* Scales of measurement
* Perceptual channels and color vision specifically
* Preattentiveness
* Interaction, animation
* Informed critique, visualization design processes

Mechanics: You will learn how the modern web stack enables performant
and portable data visualization programs. You will learn to use some
of the most popular data visualization libraries, you will learn how
they are implemented, and their limitations. For some of the methods,
you will need to know some linear algebra. You will learn about the
importance (and intuition, I promise!) of eigenvalues and eigenvectors
of real symmetric matrices.

* Remedial linear algebra
  * Specifically, eigenanalysis of real symmetric matrices
* HTML, CSS, Scalable Vector Graphics, Javascript
* d3: selections, scales, transitions, events

Techniques: You will learn the fundamental algorithms behind many of
the techniques created to display data effectively.

* Basics: Scatterplots, line plots, small multiples
* Distributions: Histograms, Kernel Density Estimation
* 2D Scalar fields: Choropleths, heatmaps, isocontours
* 2D Vector fields: Streamlines, derived fields
* 3D Scalar fields: Isocontours, Direct volume rendering
* High-dimensional data: Principal Component Analysis,
  Multidimensional Scaling, Isomap, LLE, t-SNE
* Hierarchies and Networks
  * Force-directed layouts, metric embeddings
* Interaction: Linked views, visual querying
* Scalability: Sampling and preaggregation

## Absence and Class Participation Policy

UA's policy concerning Class Attendance, Participation, and Administrative Drops is available [here](http://catalog.arizona.edu/policy/class-attendance-participation-and-administrative-drop).

UA's policy regarding absences for any sincerely held religious belief, observance, or practice [will be accommodated where reasonable](http://policy.arizona.edu/human-resources/religious-accommodation-policy).

Absences preapproved by the UA Dean of Students (or dean’s designee) [will be honored](https://deanofstudents.arizona.edu/absences).

## Makeup Policy for Students Who Register Late

If you register late for this class, contact me as soon as you do. You
will be expected to submit all missed assignments within a week of
your registration. It is your responsibility to catch up to the class
content.

## Course Communications

We will use [Piazza](https://piazza.com/arizona/fall2019/csc444/home)
for communications and discussion.

## Required Texts or Readings

There is no required textbook. All material will be available online, including lecture slides.

There are many good visualization textbooks, all optional:

* Tamara Munzner, [Visualization Analysis and Design](http://www.cs.ubc.ca/~tmm/vadbook/).
* Scott Murray, [Interactive Data Visualization for the Web](http://shop.oreilly.com/product/0636920026938.do).

## Assessment

As mentioned above, you will be assessed based on your performance on
programming assignments, one midterm exam and one final exam, and
in-class participation.

I will grade your assignments, midterms, and final exam on a scale
from 0 to 100, with respective weights of 60%, 20% and 20%. 
In addition, I will give class participation 5% weight. This will
give you a score from 0 to 105. Your final grade in the course of be
the *best* of a per-class grading curve and overall performance:

Overall performance: 

* 90% or better: A;
* 80% or better: B;
* 70% or better: C;
* 60% or better: D;
* below 60%: F.

By October 30th (your last day to withdraw), you will know more than 40%
of your grade by weight.

The class participation grading is *discretionary*. I will give you
feedback on class participation on request.

Grades for assignments, midterm and final exam will be posted on
D2L as soon as we have them. The grading for each assignment will be
provided one week after the assignment is due.

There will be a total of 11 programming assignments paced at around
one assignment per week, skipping weeks for the midterm, spring break,
and final. Each assignment will be due at least one week after it is posted.

### Assignments

* [Assignment 1](assignment_1.html)
* [Assignment 2](assignment_2.html)
* [Assignment 3](assignment_3.html)
* [Assignment 4](assignment_4.html)
* [Assignment 5](assignment_5.html)
* [Assignment 6](assignment_6.html)
* [Assignment 7](assignment_7.html)
* [Assignment 8](assignment_8.html)
* [Assignment 9](assignment_9.html)
* [Assignment 10](assignment_10.html)
* [Assignment 11](assignment_11.html)

Assignments will be submitted through Github classroom. This means each
student will need to have a Github account.

### Dispute of Grade Policy

If you wish to dispute your grade for an assignment, midterm or
project, you have two weeks after the grade has been turned in. In
addition, even if only you dispute one portion of the grading for that
unit, I reserve the right to revisit the entire unit (assignment,
midterm, or project).

### Honors Credit

Students wishing to contract this course for Honors Credit should
e-mail me to set up an appointment to discuss the terms of the contact
and to sign the [Honors Course Contract Request
Form](http://www.honors.arizona.edu/honors-contracts).

## Scheduled Topics/Activities

|------------|-------|------------------------------------|--------------------------------------------------------------------------|
|            | Date  | Topic                              | Materials                                                                |
|------------|-------|------------------------------------|--------------------------------------------------------------------------|
| Intro      | 08/27 | Introduction                       | [slides](slides/lecture%201.pdf)                                         |
|------------|-------|------------------------------------|--------------------------------------------------------------------------|
| Mechanics  | 09/03 | HTML/CSS/SVG Basics                | no slides                                                                |
|            | 09/05 | Javascript Basics                  | no slides                                                                |
|            | 09/10 | Javascript + DOM, SVG              | no slides                                                                |
|            | 09/12 | d3 intro                           | no slides                                                                |
|            | 09/17 | d3 joins and scales                | no slides                                                                |
|------------|-------|------------------------------------|--------------------------------------------------------------------------|
| Principles | 09/19 | Color vision                       | [slides](slides/Color%20Fal16.pdf)                                       |
|            | 09/24 | Color vision                       | [slides](slides/Color%202%20Fal16.pdf)                                   |
|            | 09/26 | Other perceptual channels          | [slides](slides/Other%20Channels%201.pdf)                                |
|            | 10/01 | Other perceptual channels          | [slides](slides/Other%20Channels%202.pdf)                                |
|            | 10/03 | Interaction                        | [slides](slides/interaction.pdf)                                         |
|            | 10/08 | Design Criticism, Algebraic Design | [slides](slides/algebraic_design.pdf)                                    |
|------------|-------|------------------------------------|--------------------------------------------------------------------------|
| Techniques | 10/10 | Basic Spatial Arrangements         | [slides](slides/basic%20spatial%20arrangements.pdf)                      |
|            | 10/15 | High-Dimensional Data              | [slides](slides/Dimensionality%20Reduction.pdf)                          |
|            | 10/17 | Hierarchies                        | [slides](slides/Hierarchies.pdf)                                         |
|            | 10/22 | MIDTERM                            |                                                                          |
|            | 10/24 | Graphs                             | [slides](slides/Graphs.pdf)                                              |
|            | 10/29 | Graphs+Spatial Data                | [slides](slides/spatial_data.pdf)                                        |
|            | 10/31 | Spatial Data                       | [slides](slides/spatial_data.pdf), [slides 2](slides/spatial_data_2.pdf) |
|            | 11/05 | Spatial Data                       | [slides 2](slides/spatial_data_2.pdf)                                    |
|------------|-------|------------------------------------|--------------------------------------------------------------------------|
| Topics     | 11/07 | Cartography                        | [slides](slides/cartography.pdf)                                         |
|            | 11/12 | Large Data                         | [slides](slides/large%20data.pdf)                                        |
|            | 11/19 | Putting it all together            |                                                                          |
|            | 11/21 | The Human Side of Data             |                                                                          |
|            | 11/26 | Retrospective, Review              | [slides](slides/retrospective.pdf)                                       |
|------------|-------|------------------------------------|--------------------------------------------------------------------------|
| Catchup    | 11/28 |                                    |                                                                          |
|            | 12/04 |                                    |                                                                          |
|------------|-------|------------------------------------|--------------------------------------------------------------------------|

### Exam dates

* Midterm: Tuestday, Oct 22th, 12:30-1:45PM, GS 906
* Final exam: Tuesday, December 18th, 1:00PM-3:00PM, GS 906.

## Department of Computer Science Code of Conduct

The Department of Computer Science is committed to providing and
maintaining a supportive educational environment for all.  We strive
to be welcoming and inclusive, respect privacy and confidentiality,
behave respectfully and courteously, and practice intellectual
honesty.  Disruptive behaviors (such as physical or emotional
harassment, dismissive attitudes, and abuse of department resources)
will not be tolerated.  The complete Code of Conduct is available on
our department web site.  We expect that you will adhere to this code,
as well as the UA Student Code of Conduct, while you are a member of
this class.

## Classroom Behavior Policy

To foster a positive learning environment, students and instructors
have a shared responsibility. We want a safe, welcoming, and inclusive
environment where all of us feel comfortable with each other and where
we can challenge ourselves to succeed. To that end, our focus is on
the tasks at hand and not on extraneous activities (e.g., texting,
chatting, reading a newspaper, making phone calls, web surfing, etc.).

Students are asked to refrain from disruptive conversations with
people sitting around them during lecture. Students observed engaging
in disruptive activity will be asked to cease this behavior. Those who
continue to disrupt the class will be asked to leave lecture or
discussion and may be reported to the Dean of Students. 

<!-- Alternate language for those who want to restrict computers and -->
<!-- laptops to an area of the classroom: Some learning styles are best -->
<!-- served by using personal electronics, such as laptops and iPads. These -->
<!-- devices can be distracting to other learners. Therefore, students who -->
<!-- prefer to use electronic devices for note-taking during lecture should -->
<!-- use one side of the classroom. -->

## Pronoun Preferences

All people have the right to be addressed and referred to in
accordance with their personal identity. In this class, we will have
the chance to indicate the name that we prefer to be called and, if we
choose, to identify pronouns with which we would like to be
addressed. I will do my best to address and refer to all students
accordingly and support classmates in doing so as well.


## Threatening Behavior Policy 

The UA Threatening Behavior by Students Policy prohibits threats of
physical harm to any member of the University community, including to
oneself. See
<http://policy.arizona.edu/education-and-student-affairs/threatening-behavior-students>. 


## Notification of Objectionable Materials

This course will, at times, contain material of a mature nature, which
may include references to historical violence as collected and
depicted in datasets and data visualizations. The instructor will
provide advance notice when such materials will be used.  Students are
not automatically excused from interacting with such materials, but
they are encouraged to speak with the instructor to voice concerns and
to provide feedback.


## Accessibility and Accommodations

At the University of Arizona, we strive to make learning experiences
as accessible as possible. If you anticipate or experience barriers
based on disability or pregnancy, please contact the Disability
Resource Center (520-621-3268, https://drc.arizona.edu/) to establish
reasonable accommodations.

## Code of Academic Integrity

Students are encouraged to share intellectual views and discuss freely
the principles and applications of course materials. However, graded
work/exercises must be the product of independent effort unless
otherwise instructed. Students are expected to adhere to the UA Code
of Academic Integrity as described in the UA General Catalog. See
<http://deanofstudents.arizona.edu/academic-integrity/students/academic-integrity>.

The University Libraries have
some excellent tips for avoiding plagiarism, available at
<http://www.library.arizona.edu/help/tutorials/plagiarism/index.html>.


## UA Nondiscrimination and Anti-harassment Policy 

The University is committed to creating and maintaining an environment
free of discrimination; see
<http://policy.arizona.edu/human-resources/nondiscrimination-and-anti-harassment-policy>.

Our classroom is a place where everyone is encouraged to express
well-formed opinions and their reasons for those opinions. We also
want to create a tolerant and open environment where such opinions can
be expressed without resorting to bullying or discrimination of
others.

## Additional Resources for Students

UA Academic policies and procedures are available at <http://catalog.arizona.edu/policies>

Student Assistance and Advocacy information is available at <http://deanofstudents.arizona.edu/student-assistance/students/student-assistance>


Campus Health information may be found here: <http://www.health.arizona.edu/counseling-and-psych-services>

OASIS Sexual Assault and Trauma Services: <http://oasis.health.arizona.edu/hpps_oasis_program.htm>


## Confidentiality of Student Records

Please see
<http://www.registrar.arizona.edu/personal-information/family-educational-rights-and-privacy-act-1974-ferpa?topic=ferpa>
for information on confidentiality of student records. **This has
concrete consequences for you if you give my name as a
reference!** In other words, if you intend to give my name as a
reference, **please contact me ahead of time so we can discuss**.


## Subject to Change Statement

Information contained in the course syllabus, other than the grade and
absence policy, may be subject to change with advance notice, as
deemed appropriate by the instructor.


## Land Acknowledgement

The University of Arizona sits on the original homelands of indigenous
peoples who have stewarded this land since time immemorial. Aligning
with the university's core value of a diverse and inclusive community,
it is an institutional responsibility to recognize and acknowledge the
people, culture, and history that make up the Wildcat community. At
the institutional level, it is important to be proactive in broadening
awareness throughout campus to ensure our students feel represented
and valued.