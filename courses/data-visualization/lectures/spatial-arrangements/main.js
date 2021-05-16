import * as cscheid from "/js/cscheid/cscheid.js";

function verticalDotPlotLabel(sel)
{
  return sel.attr("text-anchor", "begin")
    .attr("alignment-baseline", "middle")
    .style("font", '8pt "Helvetica Neue", "Open Sans"')
    .attr("transform", cscheid.svg.centeredTextRotate(-90));
}

function rightAlignedDotPlotLabel(sel)
{
  return sel.attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .style("font", '8pt "Helvetica Neue", "Open Sans"')
    .attr("transform", cscheid.svg.translate(-5, 0));
}

function leftAlignedDotPlotLabel(sel)
{
  return sel.attr("text-anchor", "begin")
    .attr("alignment-baseline", "middle")
    .style("font", '8pt "Helvetica Neue", "Open Sans"')
    .attr("transform", cscheid.svg.translate(5, 0));
}

function makeDotplots(data)
{
  var width   = 400;
  var height  = 400;
  var margins = { bottom: 40 };

  ////////////////////////////////////////////////////////////////////////////
  
  var d1 = cscheid.plot.create(
    cscheid.dom.makeCenteredElement(d3.select("#dotplot-1")),
    width, height
  );
  d1.setMargins(margins);
  d1.setXDomain([0, d3.max(data, d => d.men)]);
  d1.setYDomain([0, data.length + 1]);
  
  data.forEach((d, i) => {
    d.order = i;
  });

  d1.addXAxis({
    yBaseline: -1,
    ticks: 3
  });
  
  d1.addPoints(data, {
    x: d => d.men,
    y: d => d.order,
    r: 3,
    fill: "black"
  });

  d1.addText(data, {
    text: d => d.country,
    x: d => d.men,
    y: d => d.order,
    custom: rightAlignedDotPlotLabel
  });

  ////////////////////////////////////////////////////////////////////////////

  data.sort(function(v1, v2) { return v1.men - v2.men; });
  data.forEach((d, i) => {
    d.order = i;
  });

  var d2 = cscheid.plot.create(
    cscheid.dom.makeCenteredElement(d3.select("#dotplot-2")),
    width, height
  );
  d2.setMargins(margins);
  d2.setXDomain([0, d3.max(data, d => d.men)]);
  d2.setYDomain([0, data.length + 1]);
  
  data.forEach((d, i) => {
    d.order = i;
  });

  d2.addXAxis({
    yBaseline: -1,
    ticks: 3
  });
  
  d2.addPoints(data, {
    x: d => d.men,
    y: d => d.order,
    r: 3,
    fill: "black"
  });

  d2.addText(data, {
    text: d => d.country,
    x: d => d.men,
    y: d => d.order,
    custom: rightAlignedDotPlotLabel
  });

  ////////////////////////////////////////////////////////////////////////////

  // d1, d2, d3... um, crap

  d3.select("#dotplot-3").append("span").text("Something like this:");

  var dp3div = d3.select("#dotplot-3").append("div");
  dp3div
    .style("position", "relative")
    .style("left", "-20px");
  var dp3 = cscheid.plot.create(
    dp3div,
    150,
    400
  );
 

  dp3.setMargins({left: 20});
  dp3.setYDomain(d3.extent(data, d => d.men));

  dp3.addPoints(data, {
    x: d => 0.05,
    y: d => d.men,
    r: 3,
    fill: "black"
  });

  dp3.addYAxis({ ticks: 5, xBaseline: 0, orientation: "left" });
  dp3.addText(data, {
    text: d => d.country,
    x: d => 0.05,
    y: d => d.men,
    custom: leftAlignedDotPlotLabel
  });

  var d4 = cscheid.plot.create(
    cscheid.dom.makeCenteredElement(d3.select("#dotplot-4")),
    400, 150
  );
  d4.setXDomain([0, d3.max(data, d => d.men)]);
  d4.addPoints(data, {
    x: d => d.men,
    y: d => 0.3,
    r: 3,
    fill: "black"
  });

  d4.addXAxis({
    yBaseline: 0.2,
    ticks: 3
  });

  d4.addText(data, {
    text: d => d.country,
    x: d => d.men,
    y: d => 0.4,
    custom: verticalDotPlotLabel
  });
}

function makeScatterplots(data)
{
  var width      = 500;
  var height     = 420;
  var margins    = { right: 110, top: 30, bottom: 30, left: 50 };
  
  var pointsConf = {
    x: d => d.men,
    y: d => d.women,
    r: 3,
    fill: "black",
    stroke: "white"
  };
  
  //////////////////////////////////////////////////////////////////////////
  // scatterplot 1
  
  var s1 = cscheid.plot.create(
    cscheid.dom.makeCenteredElement(d3.select("#scatterplot-1")),
    width, height);

  s1.setMargins(margins);

  s1.setXDomain(d3.extent(data, d => d.men));
  s1.setYDomain(d3.extent(data, d => d.women));
  
  s1.addXAxis({ ticks: 5, yBaseline: d3.min(data, d => d.women) });
  s1.addYAxis({ ticks: 5, xBaseline: d3.min(data, d => d.men) });
  s1.addPoints(data, pointsConf);

  //////////////////////////////////////////////////////////////////////////
  // scatterplot 2

  var s2 = cscheid.plot.create(
    cscheid.dom.makeCenteredElement(d3.select("#scatterplot-2")),
    width, height
  );

  s2.setMargins(margins);

  var menExtent = d3.extent(data, d => d.men);
  var womenExtent = d3.extent(data, d => d.women);

  var minV = Math.min(menExtent[0], womenExtent[0]);
  var maxV = Math.max(menExtent[1], womenExtent[1]);
  s2.setXDomain([minV, maxV]);
  s2.setYDomain([minV, maxV]);

  s2.addXAxis({ ticks: 5, yBaseline: minV });
  s2.addYAxis({ ticks: 5, xBaseline: minV });
  s2.addPoints(data, pointsConf);

  //////////////////////////////////////////////////////////////////////////
  // scatterplot 3

  var s3 = cscheid.plot.create(
    cscheid.dom.makeCenteredElement(d3.select("#scatterplot-3")),
    width, height
  );

  s3.setMargins(margins);

  s3.setXDomain([minV, maxV]);
  s3.setYDomain([minV, maxV]);

  s3.addXAxis({ ticks: 5, yBaseline: minV });
  s3.addYAxis({ ticks: 5, xBaseline: minV });

  s3.addLines([ { x1: 0, y1: 0, x2: maxV, y2: maxV } ],
              {
                x1: d => d.x1,
                x2: d => d.x2,
                y1: d => d.y1,
                y2: d => d.y2,
                stroke: d => d3.lab(80,0,0)
              });

  s3.addLines(data, {
    x1: d => (d.men + d.women) / 2,
    x2: d => d.men,
    y1: d => (d.men + d.women) / 2,
    y2: d => d.women,
    stroke: d => d3.lab(90,0,0)
  });
  
  s3.addPoints(data, pointsConf);

  //////////////////////////////////////////////////////////////////////////
  // scatterplot 4

  var s4 = cscheid.plot.create(
    cscheid.dom.makeCenteredElement(d3.select("#scatterplot-4")),
    width, height
  );

  s4.setMargins(margins);

  s4.setXDomain([minV, maxV]);
  s4.setYDomain([minV, maxV]);

  s4.addXAxis({ ticks: 5, yBaseline: minV });
  s4.addYAxis({ ticks: 5, xBaseline: minV });

  s4.addLines([ { x1: 0, y1: 0, x2: maxV, y2: maxV } ],
              {
                x1: d => d.x1,
                x2: d => d.x2,
                y1: d => d.y1,
                y2: d => d.y2,
                stroke: d => d3.lab(80,0,0)
              });

  s4.addLines(data, {
    x1: d => (d.men + d.women) / 2,
    x2: d => d.men,
    y1: d => (d.men + d.women) / 2,
    y2: d => d.women,
    stroke: d => d3.lab(90,0,0)
  });
  
  s4.addPoints(data, pointsConf);

  s4.addGroup(data, {
    custom: function(sel) {
      sel.attr("transform", d => cscheid.svg.translate({
        x: s4.xScale(d.men) + 3,
        y: s4.yScale(d.women) + 3
      }));
      sel.append("text").classed("bg", true).text(d => d.country)
        .style("font", "8pt Helvetica Neue")
        .style("stroke", "white")
        .style("stroke-width", 5);
      sel.append("text").classed("fg", true).text(d => d.country)
        .style("font", "8pt Helvetica Neue")
        .style("fill", "black");
    }
  });
}

//////////////////////////////////////////////////////////////////////////////
// log-scale examples

function makeImdbScatterplots(imdbData)
{
  var fill = d3.lab(40, 0, 0);
  var p1 = cscheid.plot.create(
    cscheid.dom.makeCenteredElement(d3.select("#scatterplot-5")),
    500, 500
  );
  p1.setMargins({top: 10, bottom: 40, left: 50, right: 10});
  p1.setXDomain([0, 10]);
  p1.setYDomain([0, d3.max(imdbData, d => d.numVotes)]);
  p1.addPoints(imdbData, {
    x: d => d.averageRating,
    y: d => d.numVotes,
    r: 3,
    custom: sel => sel.attr("fill", fill)
  });
  p1.addXAxis({ ticks: 5, yBaseline: 0 });
  p1.addYAxis({ ticks: 5, xBaseline: 0 });

  var p2 = cscheid.plot.create(
    cscheid.dom.makeCenteredElement(d3.select("#scatterplot-6")),
    500, 500, {
      yScale: d3.scaleLog
    }
  );
  p2.setMargins({top: 10, bottom: 40, left: 40, right: 10});
  p2.setXDomain([0, 10]);
  p2.setYDomain(d3.extent(imdbData, d => d.numVotes));
  p2.addPoints(imdbData, {
    x: d => d.averageRating,
    y: d => d.numVotes,
    r: 3,
    custom: sel => sel.attr("fill", fill)
  });
  p2.addXAxis({ ticks: 5, yBaseline: d3.min(imdbData, d => d.numVotes) });
  p2.addYAxis({ ticks: 5, xBaseline: 0 });
}

//////////////////////////////////////////////////////////////////////////////
// line charts

function makeLinePlots(data)
{
  function makeMaunaLoaPlot(div, height, yDomain) {
    var l1 = cscheid.plot.create(
      cscheid.dom.makeCenteredElement(div),
      500, height, {
        xScale: d3.scaleTime
      });
    l1.setMargins({top: 10, bottom: 40, left: 40, right: 10});
    l1.setXDomain(d3.extent(data, d => d.date));
    l1.setYDomain(yDomain);

    l1.addXAxis({ yBaseline: yDomain[0] });
    l1.addYAxis({ xBaseline: d3.min(data, d => d.date) });

    var lineGroup = l1.addGroup(data, {});
    var line = d3.line()
        .x(function(d, i) {
          return l1.xScale(d.date);
        })
        .y(function(d, i) {
          return l1.yScale(d.CO2);
        });
    
    lineGroup.group.append("path")
      .attr("d", line(data))
      .attr("stroke", "black")
      .attr("fill", "none");
    
  }
  
  makeMaunaLoaPlot(
    d3.select("#mauna-loa-line-1"),
    500, d3.extent(data, d => d.CO2));

  makeMaunaLoaPlot(
    d3.select("#mauna-loa-line-2"),
    200, [0, d3.max(data, d => d.CO2)]);

  makeMaunaLoaPlot(
    d3.select("#mauna-loa-line-3"),
    200, [300, d3.max(data, d => d.CO2)]);

  makeMaunaLoaPlot(
    d3.select("#mauna-loa-line-4"),
    150, d3.extent(data, d => d.CO2));

  ////////////////////////////////////////////////////////////////////////////
    
  function zoomedInChart(div, width, height, yDomain)
  {
    var l1 = cscheid.plot.create(
      cscheid.dom.makeCenteredElement(div),
      width, height, {
        xScale: d3.scaleTime
      });
    l1.setMargins({top: 10, bottom: 40, left: 40, right: 15});
    l1.setXDomain([new Date(1985, 0), new Date(1990, 0)]);
    l1.setYDomain(yDomain);

    l1.addXAxis({ ticks: 5, yBaseline: yDomain[0] });
    l1.addYAxis({ ticks: 5, xBaseline: new Date(1985, 0) });

    var lineGroup = l1.addGroup(data, {});
    var line = d3.line()
        .x(function(d, i) {
          return l1.xScale(d.date);
        })
        .y(function(d, i) {
          return l1.yScale(d.CO2);
        });
    
    lineGroup.group.append("path")
      .attr("d", line(data))
      .attr("stroke", "black")
      .attr("fill", "none");

    var clip = l1.addAxisClipPath();
    
    var points = l1.addPoints(data, {
      x: d => d.date,
      y: d => d.CO2,
      r: 2,
      custom: sel => sel
        .attr("fill", "white")
        .attr("stroke", "black")
    });

    var useClip = cscheid.svg.useClipPath(clip);
    points.group.call(useClip);
    lineGroup.group.call(useClip);
  }

  zoomedInChart(d3.select("#mauna-loa-line-15"), 500, 200, [330, 360]);
  zoomedInChart(d3.select("#mauna-loa-line-16"), 200, 200, [340, 358]);
}

//////////////////////////////////////////////////////////////////////////////
// Small multiples

// Bad chart
function makeBadChartPackEverything(iris)
{
  var div = d3.select("#bad-chart-pack-everything");
  var l1 = cscheid.plot.create(
    cscheid.dom.makeCenteredElement(div),
    650, 400);
  l1.setMargins({ left: 50, bottom: 50, right: 200 });
  l1.setXDomain(d3.extent(iris, d => d.sepalLength));
  l1.setYDomain(d3.extent(iris, d => d.sepalWidth));
  
  var szScale = d3.scaleLinear()
      .domain(d3.extent(iris, d => d.petalWidth))
      .range([30, 1500]);
  
  var plScale = d3.scaleLinear()
      .domain(d3.extent(iris, d => d.petalLength))
      .range([d3.lab(20, 50, -50), d3.lab(60, 30, 30)])
      .interpolate(d3.interpolateHcl);
  var symbolScale = d3.scaleOrdinal(d3.symbols);
  
  l1.addPaths(iris, {
    d: d => d3.symbol()
      .size(szScale(d.petalWidth))
      .type(symbolScale(d.species))(),
    transform: d => cscheid.svg.translate(
      l1.xScale(d.sepalLength),
      l1.yScale(d.sepalWidth)),
    stroke: "white",
    fill: d => plScale(d.petalLength)
  });

  var colorLegend = cscheid.legend.colorLegend({
    plot: l1,
    axis: "left",
    scale: plScale,
    extent: [200, 350],
    title: "Petal Length"
  });
  colorLegend.mainGroup.attr("transform", "translate(500, 0)");

  var symbolTypeLegend = cscheid.legend.symbolTypeLegend({
    plot: l1,
    axis: "right",
    scale: symbolScale,
    extent: [250, 300],
    title: "Species"
  });
  symbolTypeLegend.mainGroup.attr("transform", "translate(560, 0)");

  // WORKING ON cscheid.legend.SYMBOLSIZELEGEND
  
  // l1.addPoints(iris, {
  //   x: d => d.sepalLength,
  //   y: d => d.sepalWidth,
  //   color: d => plScale(d.petalLength),
  //   // "class": d => d.species,
  //   r: d => rScale(d.petalWidth),
  // });

  l1.addXAxis({ ticks: 5, title: "Sepal Length" });
  l1.addYAxis({ ticks: 5, title: "Sepal Width" });

  var caption = cscheid.figure.addCaption(
    div, sel => sel.append("span").text("This ineffective plot uses too many different visual channels."));
  caption.number.text("1");
}

//////////////////////////////////////////////////////////////////////////////

Promise.all([
  d3.csv("/courses/data-visualization/data/iris.csv", d3.autoType)
    .then(function(data) {
      makeBadChartPackEverything(data);
    }),
  d3.csv("/courses/data-visualization/data/mauna-loa.csv")
    .then(function(data) {
      data.forEach(d => {
        d.year = Number(d.Yr);
        d.month = Number(d.Mn);
        d.date = new Date(d.year, d.month-1);
        d.CO2 = Number(d.CO2);
      });
      makeLinePlots(data);
    }),
  d3.csv("/courses/data-visualization/data/oecd-employment.csv")
    .then(function(data) {
      data.forEach(d => {
        d.men = Number(d.men);
        d.women = Number(d.women);
      });
      makeDotplots(data);
      makeScatterplots(data);
    }),
  d3.tsv("/courses/data-visualization/data/imdb-ratings-sample.tsv",
         function(d) {
           d.numVotes = Number(d.numVotes);
           d.averageRating = Number(d.averageRating);
           return d;
         })
    .then(function(data) {
      makeImdbScatterplots(data);
    })])
  .then(function() {
    readjustFootnotePositions();
  });


