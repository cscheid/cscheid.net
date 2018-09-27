---
title: Board Games
layout: d3_project
---

<script src="https://cdnjs.cloudflare.com/ajax/libs/crossfilter/1.3.12/crossfilter.min.js"></script>

# Board Games

<div id="main"></div>

# About

The data for this visualization comes from
[BoardGameGeek](https://boardgamegeek.com/), via
[Gabriele Baldassarre](https://www.kaggle.com/gabrio/board-games-dataset/data),
on Kaggle. Specifically, we ran this R script on the sqlite data:

     > library(dbplyr)
	 > library(RSQLite)
	 > dbi = DBI::dbConnect(SQLite(), "boardgamegeek.sqlite")
	 > df = tbl(dbi, "BoardGames")
	 > export = data.frame(df %>% 
	     select(stats.usersrated, stats.numweights, stats.owned, 
		        details.name, stats.average, stats.averageweight, details.yearpublished) %>% 
	     filter(stats.average > 1) %>% 
		 filter(stats.averageweight>0.5) %>% 
		 filter(details.yearpublished > 1960))
	 > write.csv(export, "~/data/boardgame-export.csv")

