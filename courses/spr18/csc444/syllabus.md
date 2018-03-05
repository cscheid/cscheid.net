---
layout: bootstrap
title: Syllabus for CSC 444, Data Visualization, Spring 2018
---

# CSC 444, Advanced Data Visualization

* When: Tuesdays and Thursdays, 8:00-9:15 AM.
* Where: GS 906

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

* Carlos Scheidegger, GS 734, [cscheid@cs.arizona.edu](mailto:cscheid@cs.arizona.edu)
* Office Hours (otherwise by appointment only)
  * Carlos: Tuesdays, 10:00-11AM, 1:00PM-2:00PM, GS734
  only.
  * Ashwin: Mondays, 2:00PM-3:30PM, GS 938
  * Alex: Thursdays, 9:30-11:00AM, GS 903
* Course home page:
  [http://cscheid.net/courses/fal18/csc444/](http://cscheid.net/courses/fal18/csc444/)

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
they are implemented, and their limitations.

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

The UA's policy concerning Class Attendance, Participation, and Administrative Drops is available [here](http://catalog.arizona.edu/policy/class-attendance-participation-and-administrative-drop).
The [UA policy regarding absences for any sincerely held religious belief, observance or practice](http://policy.arizona.edu/human-resources/religious-accommodation-policy) will be accommodated where reasonable.
Absences pre approved by the UA Dean of Students (or dean’s designee)
will be honored. See
[the dean of students's website](https://deanofstudents.arizona.edu/absences)
for details.

## Makeup Policy for Students Who Register Late

If you register late for this class, contact me as soon as you do. You
will be expected to submit all missed assignments within a week of
your registration. It is your responsibility to catch up to the class
content.

## Course Communications

We will use [Piazza](https://piazza.com/arizona/fall2017/csc544/home)
for communications and discussion.

## Required Texts or Readings

There is no required textbook. All material will be available online, including lecture slides.

There are many good visualization textbooks, all optional:

* Tamara Munzner, [Visualization Analysis and Design](http://www.cs.ubc.ca/~tmm/vadbook/).
* Scott Murray, [Interactive Data Visualization for the Web](http://chimera.labs.oreilly.com/books/1230000000345).

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

By March 27th (your last day to withdraw), you will know more than 40%
of your grade by weight.

The class participation grading is *discretionary*. I will give you
feedback on class participation on request.

Grades for assignments, midterm and final exam will be posted on
D2L as soon as we have them. The grading for each assignment will be
provided one week after the assignment is due.

There will be a total of 11 programming assignments paced at around
one assignment per week, skipping weeks for the midterm, spring break,
and final. Each assignment will be due at least week after it is posted.

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

## Scheduled Topics/Activities

|----|---|-----|----|
|  | Date | Topic | Materials |
|----|---|-----|----|
|Intro | 01/11 | Introduction | [slides](slides/lecture%201.pdf) |
|----|---|-----|----|
| Mechanics | 01/16 | HTML/CSS/SVG Basics | no slides |
|           | 01/18 | Javascript Basics | no slides |
|           | 01/23 | Javascript + DOM, SVG | no slides |
|           | 01/25 | d3 intro | no slides |
|           | 01/30 | d3 joins and scales | no slides |
|----|---|-----|----|
| Principles | 02/01 | Color vision | [slides](slides/Color%20Fal16.pdf) |
|            | 02/06 | Color vision | [slides](slides/Color%202%20Fal16.pdf) |
|            | 02/08 | Other perceptual channels | [slides](slides/Other%20Channels%201.pdf) |
|            | 02/13 | Other perceptual channels | [slides](slides/Other%20Channels%202.pdf) |
|            | 02/15 | Interaction | [slides](slides/interaction.pdf) |
|            | 02/20 | Design Criticism, Algebraic Design | [slides](slides/algebraic_design.pdf) |
|----|---|-----|----|
| Techniques | 02/22 | Basic Spatial Arrangements | [slides](slides/basic%20spatial%20arrangements.pdf) |
|            | 02/27 | cont'd. | |
|            | 03/01 | High-Dimensional Data | [slides](slides/Dimensionality%20Reduction.pdf) |
|            | 03/13 | High-Dimensional Data | |
|----|---|-----|----|
| Review | 03/15 | Review | [slides](slides/midterm%20review.pdf) |
|----|---|-----|----|
| Techniques       | 03/20 | MIDTERM | 
|        | 03/22 | Hierarchies | [slides](slides/Hierarchies.pdf) |
|        | 03/27 | Graphs | [slides](slides/Graphs.pdf) |
|        | 03/29 | Graphs+Spatial Data| [slides](slides/spatial_data.pdf) |
|        | 04/03 | Spatial Data | [slides](slides/spatial_data.pdf), [slides 2](slides/spatial_data_2.pdf)|
|        | 04/05 | Spatial Data | [slides 2](slides/spatial_data_2.pdf) |
|----|---|-----|----|
| Topics | 04/10 | Cartography | [slides](slides/cartography.pdf) |
|        | 04/12 | Large Data | [slides](slides/large%20data.pdf) |
|        | 04/17 | Putting it all together |  |
|        | 04/19 | The Human Side of Data |  |
|        | 04/24 | Retrospective, Review | [slides](slides/retrospective.pdf) |
|----|---|-----|----|

### Exam dates

* Midterm: Tuesday, March 20th, 8:00-9:15AM, GS 906
* Final exam: Thursday, May 10th, 8:00-10:00AM, GS 906

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

Alternate language for those who want to restrict computers and
laptops to an area of the classroom: Some learning styles are best
served by using personal electronics, such as laptops and iPads. These
devices can be distracting to other learners. Therefore, students who
prefer to use electronic devices for note-taking during lecture should
use one side of the classroom.

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

At the University of Arizona we strive to make learning experiences as
accessible as possible. If you anticipate or experience physical or
academic barriers based on disability or pregnancy, you are welcome to
let me know so that we can discuss options.  You are also encouraged
to contact Disability Resources (520-621-3268) to explore reasonable
accommodation. 

If our class meets at a campus location: Please be aware that the
accessible table and chairs in this room should remain available for
students who find that standard classroom seating is not usable.

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

Information contained in the course syllabus, other than the grade and absence policy, may be subject to change with advance notice, as deemed appropriate by the instructor.
