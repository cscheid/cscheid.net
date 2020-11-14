/*global d3 */

import { lsqr } from "./cscheid/cscheid/sparse.js";
import * as blas from "./cscheid/cscheid/blas.js";
import * as linalg from "./cscheid/cscheid/linalg.js";

export function dimReader(options)
{
  function project(d) {
    var x = blas.dot(d.block[0], perturbation(d.i)),
        y = blas.dot(d.block[1], perturbation(d.i));
    return [x, y];
  }

  var points       = options.points;
  var perturbation = options.perturbation;

  var boundsX      = d3.extent(points, d => d.p[0]);
  var boundsY      = d3.extent(points, d => d.p[1]);
  var boxDim       = [boundsX[1] - boundsX[0], boundsY[1] - boundsY[0]];
  var aspectRatio  = boxDim[0] / boxDim[1];

  var radius = options.radius || Math.sqrt(linalg.norm2(boxDim)) / 5;
  var sigma2 = Math.pow(radius / 3, 2);

  function gaussianKernel(p1, p2) {
    return Math.exp(-linalg.distance2(p1, p2) / sigma2);
  }

  var lScale = d3.scaleLinear().range([0, 30]);
  setLScale();
  function setLScale() {
    lScale.domain(d3.extent(points,
                            d => Math.sqrt(linalg.norm2(project(d)))));
  }

  function update() {
    function smoothedGradientWeighted(query) {
      var result = [0, 0];
      var sum = 0;
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
          var w = gaussianKernel(node.data.p, query);
          result = linalg.add(result, linalg.scale(project(node.data), w));
          sum += w;
        }
        return false;
      }
      t.visit(gradientVisitor);
      return [result, sum];
    }
    function smoothedGradient(query) {
      var r = smoothedGradientWeighted(query);
      if (r[1] === 0)
        return [0, 0];
      else
        return linalg.scale(r[0], 1/r[1]);
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
        var g = smoothedGradient(p);
        x += stepSize;
        row.push([p, g]);
      }
      y += stepSize;
      lst.push(row);
    }
    result.scalarField = solveLinearSystem(lst);
    result.scalarFieldDims = [lst[0].length, lst.length];
    result.stepSize = stepSize;
    result.getGradient = smoothedGradient;
  }

  var result = {
    points: points,
    getGradient: undefined,
    scalarField: undefined,
    scalarFieldDims: undefined,
    stepSize: undefined,
    lScale: lScale,
    project: project,
    bounds: [boundsX, boundsY],
    update: update
  };
  result.update();
  return result;
}

/**
 *
 * This builds a sparse matrix expressing the gradient constraints from which
 * we build a least-squares solution. This implementation is slightly different
 * from that described in the paper, and I think it's simpler.
 *
 * Assume some way of measuring the gradient at grid points. (This
 * needs to be provided externally and passed as parameters. In this
 * current implementation, we use a nadaraya-watson kernel regression
 * with a straightforward gaussian kernel)
 *
 * From that, we create linear constraints, of three kinds:

 * 1) one set of constraints per grid point that
 * says that the local gradient of the scalar field evaluated at that
 * point -- for which we use simple finite differencing of values --
 * needs to match the measured gradient.
 *
 * 2) field smoothness constraints. We add a Laplacian regularizer,
 * currently hard-coded at weight 1 (but that is a FIXME). This yields
 * one additional constraint per grid point which states that the
 * field should be harmonic (the value needs to be equal to the
 * average of its neighbors). At the boundaries, we evaluate the
 * average only on the available neighbors (that is, these are *not*
 * periodic boundary conditions, and they're Neumann conditions).
 *
 * 3) field magnitude constraints. This is simply there to avoid an
 * extraneous translational degree of freedom - if we don't constrain
 * the magnitude, then adding a constant value to the field doesn't
 * move the constraints, and we have an indefinite system. The
 * current implementation of my LSQR solver does not support indefinite
 * systems, so we add a small constraint on the overall L_2 norm of the
 * solution.
 *
 */

function solveLinearSystem(lst)
{
  var gridRows = lst.length, gridCols = lst[0].length;

  function varIndex(x, y) {
    var result = y * gridCols + x;
    return result;
  }

  var nRows = (gridRows * gridCols) +   // laplacian constraints
      (gridCols - 1) * gridRows +       // x+1, y constraints
      gridCols * (gridRows - 1) +       // x, y+1 constraints
      (gridCols - 1) * (gridRows - 1) + // x, y constraints
      gridCols * gridRows;              // ridge regression. sigh

  var nCols = gridRows * gridCols;
  var lambda = 0.01;

  function makeA() {
    var result = [];
    var row = 0;
    // laplacian constraints
    for (var i=0; i<gridRows; ++i) {
      for (var j=0; j<gridCols; ++j) {
        var count = 0;
        if (i > 0) {
          result.push([row, varIndex(j, i-1), 1]);
          count += 1;
        }
        if (i < gridRows - 1) {
          result.push([row, varIndex(j, i+1), 1]);
          count += 1;
        }
        if (j > 0) {
          result.push([row, varIndex(j-1, i), 1]);
          count += 1;
        }
        if (j < gridCols - 1) {
          result.push([row, varIndex(j+1, i), 1]);
          count += 1;
        }
        result.push([row, varIndex(j, i), -count]);
        ++row;
      }
    }
    // x+1, y constraints
    for (i=0; i<gridRows; ++i) {
      for (j=0; j<gridCols-1; ++j) {
        result.push([row, varIndex(j+1, i), 1]);
        result.push([row, varIndex(j, i), -1]);
        ++row;
      }
    }
    // x, y+1 constraints
    for (i=0; i<gridRows-1; ++i) {
      for (j=0; j<gridCols; ++j) {
        result.push([row, varIndex(j, i+1), 1]);
        result.push([row, varIndex(j, i), -1]);
        ++row;
      }
    }
    // x, y, constraints
    for (i=0; i<gridRows-1; ++i) {
      for (j=0; j<gridCols-1; ++j) {
        result.push([row, varIndex(j+1, i), -1]);
        result.push([row, varIndex(j, i), 2]);
        result.push([row, varIndex(j, i+1), -1]);
        ++row;
      }
    }
    // ridge constraints
    for (i=0; i<gridRows; ++i) {
      for (j=0; j<gridCols; ++j) {
        result.push([row, varIndex(j, i), lambda]);
      }
    }
    return result;
  }
  var A = makeA();

  function makeB() {
    var result = new Float64Array(nRows);
    var row = 0;
    // laplacian constraints: zero, easy
    row += gridRows * gridCols;
    // x+1, y constraints
    for (var i=0; i<gridRows; ++i) {
      for (var j=0; j<gridCols-1; ++j) {
        result[row] = lst[i][j+1][1][0];
        ++row;
      }
    }
    // x, y+1 constraints
    for (i=0; i<gridRows-1; ++i) {
      for (j=0; j<gridCols; ++j) {
        result[row] = lst[i+1][j][1][1];
        ++row;
      }
    }
    // x, y constraints
    for (i=0; i<gridRows-1; ++i) {
      for (j=0; j<gridCols-1; ++j) {
        result[row] = -lst[i+1][j][1][0] - lst[i][j+1][1][1];
        ++row;
      }
    }
    // ridge constraints are also zero.
    return result;
  }
  var b = makeB();

  function Av(v) {
    var result = new Float64Array(nRows);
    A.forEach(entry => {
      var row    = entry[0];
      var col    = entry[1];
      var weight = entry[2];
      result[row] += v[col] * weight;
      // if (result[row] !== result[row]) {
      //   debugger;
      // }
    });
    return result;
  }

  function ATv(v) {
    var result = new Float64Array(nCols);
    A.forEach(entry => {
      var row    = entry[0];
      var col    = entry[1];
      var weight = entry[2];
      result[col] += v[row] * weight;
    });
    return result;
  }

  return lsqr(Av, ATv, b);
}
