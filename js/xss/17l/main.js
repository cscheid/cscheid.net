// https://www.evanmiller.org/how-not-to-sort-by-average-rating.html
function ciLowerBound(wins, trials) // at 95% confidence
{
  if (trials == 0) {
    return 0;
  }
  let positive = wins;
  let negative = trials - wins;
  return ((positive + 1.9208) / (positive + negative) - 
          1.96 * Math.sqrt((positive * negative) / (positive + negative) + 0.9604) / 
          (positive + negative)) / (1 + 3.8416 / (positive + negative));
}

function extractLeaderboardData()
{
  let rows = d3.selectAll("tr");
  let data = rows.nodes().slice(1).map(row => {
    let entries = d3.select(row).selectAll("td").nodes().map(x => x.innerText);
    let result = {
      name: entries[1],
      matchesWon: Number(entries[2]),
      winPercentage: Number(entries[3].slice(0, -1)),
      trophies: Number(entries[4]),
      trophyRate: Number(entries[5].slice(0, -1))
    };
    return result;
  });
  data.forEach(d => {
    let n = d.matchesWon / (d.winPercentage / 100);
    d.winRate95 = ciLowerBound(d.matchesWon, n);
  });
  return data;
}

addScript("https://d3js.org/d3.v6.js")
  .then(() => {
    console.log("17 lands xss!");
    let data = extractLeaderboardData();
  });


