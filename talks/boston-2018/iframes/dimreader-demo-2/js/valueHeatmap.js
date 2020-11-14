/*global d3 */

import { lsqr } from "./cscheid/cscheid/sparse.js";
import * as blas from "./cscheid/cscheid/blas.js";
import * as linalg from "./cscheid/cscheid/linalg.js";
import { concat } from "./cscheid/cscheid/array.js";

export function valueHeatmap(options)
{
  var points         = options.points;
  var domainFunction = options.domain;
  var rangeFunction  = options.range;
  var boundsX        = d3.extent(points, d => d.p[0]);
  var boundsY        = d3.extent(points, d => d.p[1]);
  var boxDim         = [boundsX[1] - boundsX[0], boundsY[1] - boundsY[0]];
  var aspectRatio    = boxDim[0] / boxDim[1];
  var mode           = options.mode || "value";


  var radius = options.radius || Math.sqrt(linalg.norm2(boxDim)) / 5;
  var sigma2 = Math.pow(radius / 3, 2);

  function gaussianKernel(p1, p2) {
    return Math.exp(-linalg.distance2(p1, p2) / sigma2);
  }

  function update() {
    var probeFunction = {
      value: smoothedValue,
      variance: smoothedVariance,
    }[mode];
    function smoothedWeighted(query) {
      var sum1 = 0, sumX = 0, sumXX = 0;
      function gradientVisitor(node, x0, y0, x1, y1) {
        if (query[0] < x0 || x1 < query[0] ||
            query[1] < y0 || y1 < query[1]) {
          // we might be able to throw this away.
          var points = [[x0, y0], [x1, y0], [x0, y1], [x1, y1]];
          var weights = points.map((p) => gaussianKernel(p, query));
          if (Math.max.apply(null, weights) < 1e-4) {
            return true;
          }
        }
        if (node.data) {
          var x = domainFunction(node.data);
          var w = gaussianKernel(rangeFunction(node.data), query);
          sum1 += w;
          sumX += w * x;
          sumXX += w * x * x;
        }
        return false;
      }
      t.visit(gradientVisitor);
      return [sum1, sumX, sumXX];
    }
    function smoothedValue(query) {
      var r = smoothedWeighted(query);
      if (r[0] === 0)
        return 0;
      else
        return r[1] / r[0];
    }
    function smoothedVariance(query) {
      var r = smoothedWeighted(query);
      if (r[0] === 0)
        return 0;
      else {
        var ex = r[1] / r[0];
        var exx = r[2] / r[0];
        return exx - ex * ex;
      }
    }

    var t = d3.quadtree()
        .x(d => d.p[0])
        .y(d => d.p[1])
        .addAll(points);
    var stepSize = boxDim[1] / 20;
    var y = boundsY[0];
    var lst = [];
    while (y < boundsY[1] + stepSize) {
      var x = boundsX[0];
      var row = [];
      while (x < boundsX[1] + stepSize) {
        var p = [x, y];
        var g = probeFunction(p);
        x += stepSize;
        row.push(g);
      }
      y += stepSize;
      lst.push(row);
    }
    result.scalarField     = new Float64Array(concat(lst));
    result.scalarFieldDims = [lst[0].length, lst.length];
    result.stepSize        = stepSize;
    result.getValue        = smoothedValue;
    result.getVariance     = smoothedVariance;
  }

  var result = {
    points: points,
    getGradient: undefined,
    scalarField: undefined,
    scalarFieldDims: undefined,
    stepSize: undefined,
    bounds: [boundsX, boundsY],
    update: update
  };
  result.update();
  return result;



}
