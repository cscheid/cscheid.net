---
title: Shapley Values
layout: bootstrap_wide
---

# Shapley Values

Imagine you have a game where any of $n$ players can play. This is a
cooperative game, so each player can choose whether or not to
participate in playing. When a subset $S \subset \{1 \ldots N\}$ of
the players play the game, they are given a reward, a number
$r(S)$ ($r$, then, is a function from sets of players to numbers).

If players 1 and 2 work well together, then this will be reflected in
that the reward for the two of them playing together outweighs either
of them playing by themselves and in that case, $v(\{1, 2\}) \ge
v(\{1\}) + v(\{2\})$. If they don't play well together, then the
reward function will reflect that as well.

What we will ultimately want to find is a way to define and calculate
the "worth" of each individual. Shapley values are an attractive way
to do so. It's a classic tool in game theory, but it has found
applications in data science as well. In data science, we will think
of each *feature* of a dataset (ie. each column in a table) as a
player, and we want to understand how each feature contributes to the
value in (typically) a regression task.

## Shapley value as expected marginal reward

Here is one way to define of the Shapley value, which we will
spend some time unpacking:

$$\varphi\_r(i) = E_{s : s \subset \{1 \ldots N\} , i \notin s}[r(s) - r(s \backslash \{i\})]$$

In other words, the Shapley value $\varphi\_r(i)$ of player $i$ in a game with reward $r$ is the
expected _additional reward_ player $i$ would add to each possible
team they could join. This makes intuitive sense; the part that is not
very intuitive is that the probability distribution that we use for
this expectation does _not_ give equal weight to every team. Instead,
it gives equal weight to every *order* in which players could be added
to an initially empty team. Let's consider a simple 3 player game and
think about Player 1 and the possible orderings: $(1, 2, 3)$, 
$(1, 3, 2)$, 
$(2, 1, 3)$, 
$(2, 3, 1)$, 
$(3, 1, 2)$, and
$(3, 2, 1)$.

How do we weigh the contributions from Player 1 
when they're the first team to be added? In that case, the expectation
computes $r(\{1\}) - r(\{\})$, but that value needs to be counted
_twice_, because there are two separate permutations in which Player 1
participates as the first player in the team. When Player 1 is the
_second_ player in the team, we must count two marginal contributions
separately: $r(\{1, 2\}) - r(\{2\})$ and $r(\{1, 3\} - r(\{3\})$, but
each of these only counts once, because after Player 1 is added to the
set, there's only one way to add an additional player. Finally, when
Player 1 is the _last_ player to be added to the team, we have only
one contribution to consider, $r(\{1, 2, 3\} - r(\{2, 3\})$, but we
must count this twice, since there are two permutations that arrive at
the team configuration \{2, 3\}. After adding Player 1 to the team,
there's only one way to proceed ("we're done"), so no additional
weighting is necessary. In 4 player games and above, most of the times
the weighting will take into account the number of ways to arrive at
the current team, _and_ the number of times the new team will
participate in future permutations.

This gives the classic definition of Shapley values, presented here as defined by Molnar[^2], but using our notation:

$$\varphi_r(i) = \sum_{s \subset \{1, \ldots, n \}} \frac{|s|! (n - |s| - 1)!}{n!} (r(s \cup \{i\}) - r(s))$$

(Most presentations of the Shapley value assume the set
is non-empty, but here we're allowing empty teams. This implicitly allows
empty teams to have non-zero rewards, which is also not usually
consider, but we have good reasons to need this later.)


[^1]: Osborne, Martin J., and Ariel Rubinstein. _A course in game theory_. MIT press, 1994.

[^2]:
