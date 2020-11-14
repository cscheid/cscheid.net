/*global d3 */

import { dimReader }    from "./dimreader.js";
import { valueHeatmap } from "./valueHeatmap.js";
import * as linalg      from "./cscheid/cscheid/linalg.js";
import * as plot        from "./cscheid/cscheid/plot.js";
import * as debug       from "./cscheid/cscheid/debug.js";

function setupSVG(div, reader)
{
  var points      = reader.points;
  var boundsX     = reader.bounds[0];
  var boundsY     = reader.bounds[1];
  var boxDim      = [boundsX[1] - boundsX[0], boundsY[1] - boundsY[0]];
  var aspectRatio = boxDim[0] / boxDim[1];

  var scene = plot.create(div, ~~(600 * aspectRatio), 600);
  scene.setXDomain(boundsX);
  scene.setYDomain(boundsY);
  scene.setMargins({
    bottom: 30,
    left: 30
  });
  var xAxisObject = scene.addXAxis({
    yBaseline: scene.yScale.domain()[0]
  });
  var yAxisObject = scene.addYAxis({
    xBaseline: scene.xScale.domain()[0]
  });
  xAxisObject.group.attr("opacity", 0);
  yAxisObject.group.attr("opacity", 0);

  var contourScale = d3.scaleLinear()
      .domain([0, 11])
      .range(d3.extent(reader.scalarField));
  var contourColorScale = d3.scaleLinear()
      .domain(contourScale.range())
      .range([d3.lab(80, 10, 15), d3.lab(40,10,-15)])
      .interpolate(d3.interpolateLab);
  var contourThresholds = d3.range(0, 11)
      .map(d => contourScale(d));

  var contourData = {
    scalarField: reader.scalarField,
    dims: reader.scalarFieldDims,
    contourValues: contourThresholds
  };

  var contourObject = scene.addContours(contourData, {
    layer: "annotations",
    fill: d => contourColorScale(d.value),
    stroke: d => "none"
  });
  contourObject.moveToBack();

  // we can get range perturbations from two sources:
  // from the tangent map itself (which only applies to input points)
  // or from the gradient estimate (which applies to arbitrary points)
  //
  // That explains the (d.rangePerturbation || reader.project(d)) construct
  // var arrowObject = scene.addArrows(points, {
  //   vector: d => d.rangePerturbation || reader.project(d),
  //   color: d => "white",
  //   scale: 0.05,
  //   custom: sel => sel.style("stroke-width", 2)
  // });
  var pointObject = scene.addPoints(points, {
    class: d => d.input[5],
    x: d => d.p[0],
    y: d => d.p[1],
    r: d => 3
  });

  var xTicks = xAxisObject.axisObject.scale().ticks();
  var xAxisLines = scene.addLines(xTicks, {
    "x1": d => d,
    "x2": d => d,
    "y1": d => scene.yScale.domain()[0],
    "y2": d => scene.yScale.domain()[1],
    "stroke": d => d3.lab(75, 0, 0)
  });
  xAxisLines.moveToBack();
  xAxisLines.group.attr("opacity", 0);

  var yTicks = yAxisObject.axisObject.scale().ticks();
  var yAxisLines = scene.addLines(yTicks, {
    "y1": d => d,
    "y2": d => d,
    "x1": d => scene.xScale.domain()[0],
    "x2": d => scene.xScale.domain()[1],
    "stroke": d => d3.lab(75, 0, 0)
  });
  yAxisLines.moveToBack();
  yAxisLines.group.attr("opacity", 0);

  var stage = 0;

  function stateTransition(sel) {
    sel.duration(1000);
  };

  var states = {
    0: () => {
      // contourObject.group.attr("opacity", 1);
      // contourObject.group.transition().call(stateTransition).attr("opacity", "0");
      // arrowObject.group.attr("opacity", 1);
      // arrowObject.group.transition().call(stateTransition).attr("opacity", "0");
    },
    1: () => {
      // contourObject.group.transition().attr("opacity", "1");
      xAxisObject.group.transition().call(stateTransition).attr("opacity", "1");
      yAxisObject.group.transition().call(stateTransition).attr("opacity", "1");
    },
    2: () => {
      xAxisLines.group.transition().call(stateTransition).attr("opacity", "1");
      yAxisLines.group.transition().call(stateTransition).attr("opacity", "1");
    },
    3: () => {
      xAxisLines.group.transition().call(stateTransition).attr("opacity", "0");
      yAxisLines.group.transition().call(stateTransition).attr("opacity", "0");

      // contourObject.marks().attr("fill", "none")
      //   .attr("stroke", d3.lab(75, 0, 0));
      // contourObject.group.transition().call(stateTransition).attr("opacity", "1");

      // arrowObject.marks()
      //   .attr("stroke", d3.lab(60, 0, 0));

      // arrowObject.group.transition()
      //   .call(stateTransition)
      //   .attr("opacity", 1);

    },
    4: () => {
      xAxisObject.group.transition().call(stateTransition).attr("opacity", "0");
      yAxisObject.group.transition().call(stateTransition).attr("opacity", "0");
      // contourObject.marks()
      //   .attr("fill", "white")
      //   .attr("stroke-opacity", 1)
      //   .transition()
      //   .call(stateTransition)
      //   .attr("stroke-opacity", 0)
      //   .attr("fill", d => contourColorScale(d.value));
      // arrowObject.marks().transition().call(stateTransition)
      //   .attr("stroke", d3.lab(100, 0, 0));
    },
    5: () => {
      // arrowObject.group.transition()
      //   .call(stateTransition)
      //   .attr("opacity", 0);
    }
  };
  debug.expose(states, "states");

  var result = {
    scene: scene,
    update: function() {
      reader.update();
      contourScale.range(d3.extent(reader.scalarField));
      contourColorScale.domain(contourScale.range());
      contourThresholds = d3.range(0,11).map(contourScale);
      contourData.scalarField = reader.scalarField;
      contourData.dims = reader.scalarFieldDims;
      contourData.contourValues = contourThresholds;
      // signals default transition
      scene.render(sel => sel.duration(1500));
    }
  };
  return result;
}

var dims = [
  {
    name: "Sepal Length",
    perturbation: [1, 0, 0, 0]
  }, {
    name: "Sepal Width",
    perturbation: [0, 1, 0, 0],
  }, {
    name: "Petal Length",
    perturbation: [0, 0, 1, 0],
  }, {
    name: "Petal Width",
    perturbation: [0, 0, 0, 1]
  }
];

// var dims = [
//   {
//     name: "x",
//     perturbation: [1, 0, 0]
//   }, {
//     name: "y",
//     perturbation: [0, 1, 0],
//   }, {
//     name: "z",
//     perturbation: [0, 0, 1],
//   }
// ];

var selectedDim = 0;
var selected = dims[selectedDim];

function setupDimReader(points) {
  var reader = dimReader({
    points: points,
    perturbation: () => selected.perturbation
  });
  return setupSVG(d3.select("#main"), reader);
}

function setupValueHeatmap(points) {
  var heatmap = valueHeatmap({
    points: points,
    domain: d => d.input[selectedDim],
    range:  d => d.p
  });
  return setupSVG(d3.select("#main"), heatmap);
}

d3.json("data/iris-linear.dimreader")
// d3.json("data/swiss-roll-pca.dimreader")
  .then(data => {
    var points = data.points.map((d, i) => {
      return {
        p: d.range,
        i: i,
        input: d.domain,
        block: d.tangent
      };
    });

    var index = 0;
    var plot1 = setupDimReader(points);
    var plot2 = setupValueHeatmap(points);

    d3.select("#main").append("div")
      .selectAll("button")
      .data(dims)
      .enter()
      .append("button")
      .text(d => d.name)
      .on("click", (d, i) => {
        selectedDim = i;
        selected = dims[selectedDim];
        plot1.update();
        plot2.update();
      });
  });
