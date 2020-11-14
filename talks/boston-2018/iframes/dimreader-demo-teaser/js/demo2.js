/*global d3 */

import { dimReader } from "./dimreader.js";
import * as linalg from "./cscheid/cscheid/linalg.js";
import * as plot from "./cscheid/cscheid/plot.js";
import * as debug from "./cscheid/cscheid/debug.js";

var contourObject, arrowObject, pointObject;

function setupSVG(div, reader)
{
  var points = reader.points;
  var boundsX = reader.bounds[0];
  var boundsY = reader.bounds[1];
  var boxDim = [boundsX[1] - boundsX[0], boundsY[1] - boundsY[0]];
  var aspectRatio = boxDim[0] / boxDim[1];

  var scene = plot.create(div, window.innerWidth, ~~(window.innerWidth / aspectRatio));
  scene.setXDomain(boundsX);
  scene.setYDomain(boundsY);
  // scene.setMargins({
  //   bottom: 30,
  //   left: 30
  // });
  // var xAxisObject = scene.addXAxis({
  //   yBaseline: scene.yScale.domain()[0]
  // });
  // var yAxisObject = scene.addYAxis({
  //   xBaseline: scene.xScale.domain()[0]
  // });
  // xAxisObject.group.attr("opacity", 0);
  // yAxisObject.group.attr("opacity", 0);
  scene.classColorScale.range(
    ["rgb(2, 195, 219)", "rgb(255, 200, 0)", "rgb(244, 68, 82)", 
     "rgb(186, 216, 60)", "rgb(216, 145, 205)", "rgb(222, 222, 222)"]);

  var contourScale = d3.scaleLinear()
      .domain([0, 11])
      .range(d3.extent(reader.scalarField));
  var contourColorScale = d3.scaleLinear()
      .domain(contourScale.range())
      .range([d3.lab(40,10,-15), d3.lab(80, 10, 15)])
      .interpolate(d3.interpolateLab);
  var contourThresholds = d3.range(0, 11)
      .map(d => contourScale(d));

  var contourData = {
    scalarField: reader.scalarField,
    dims: reader.scalarFieldDims,
    contourValues: contourThresholds
  };

  contourObject = scene.addContours(contourData, {
    layer: "annotations",
    fill: d => contourColorScale(d.value),
    stroke: d => "none"
  });
  contourObject.group.attr("opacity", 0);
  contourObject.moveToBack();

  // we can get range perturbations from two sources:
  // from the tangent map itself (which only applies to input points)
  // or from the gradient estimate (which applies to arbitrary points)
  //
  // That explains the (d.rangePerturbation || reader.project(d)) construct
  arrowObject = scene.addArrows(points, {
    vector: d => d.rangePerturbation || reader.project(d),
    color: d => "white",
    scale: 0.1,
    custom: sel => sel.style("stroke-width", 3)
  });
  arrowObject.group.attr("opacity", 0);

  pointObject = scene.addPoints(points, {
    class: d => d.input[5],
    x: d => d.p[0],
    y: d => d.p[1],
    r: d => 6
  });

  function stateTransition(sel) {
    sel.duration(1000);
  };

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

var selected = dims[0];

d3.json("data/iris-tsne.dimreader")
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
    var reader = dimReader({
      points: points,
      perturbation: () => selected.perturbation,
    });

    var plot = setupSVG(d3.select("#main"), reader);

    function showDim(dim) {
      selected = dims[dim];
      plot.update();
    }

    debug.expose(showDim, "showDim");
    debug.expose(() => {
      contourObject.group.transition().duration(1500).attr("opacity", 1);
      arrowObject.group.transition().duration(1500).attr("opacity", 1);
    }, "showContours");
    debug.expose(() => {
      contourObject.group.transition().duration(1500).attr("opacity", 0);
      arrowObject.group.transition().duration(1500).attr("opacity", 0);
    }, "hideContours");
  });

