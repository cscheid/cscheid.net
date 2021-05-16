import * as cscheid from "/js/cscheid/cscheid.js";

d3.csv("/courses/data-visualization/data/iris.csv", d3.autoType)
  .then(createIrisPlots);

d3.json("/courses/data-visualization/data/cities.json")
  .then(function(data) {
    let distances = data.distances.map(r => r.map(e => Math.pow(e, 2)));
    let result = cscheid.vis.CMDS(distances);
    let plot = create2DPlot({
      element: d3.select("#cmds-city-distances"),
      data: result,
      xAccessor: d => -d[0],
      yAccessor: d => -d[1],
      margins: { bottom: 10, left: 10, right: 30, top: 20 }
    });
    plot.setYDomain(plot.xDomain());
    plot.addText(d3.range(data.names.length), {
      text: i => data.names[i],
      x: i => -result[i][0],
      y: i => -result[i][1]
    });
  });

d3.json("/courses/data-visualization/data/morsecode.json")
  .then(function(data) {
    // let distances = data.distances.map(r => r.map(e => Math.pow(e, 2)));
    let result = cscheid.vis.CMDS(data.square_distances);
    let plot = create2DPlot({
      element: d3.select("#cmds-morse-code"),
      data: result,
      xAccessor: d =>  d[0] - d[1],
      yAccessor: d => -d[0] - d[1],
      margins: { bottom: 10, left: 10, right: 50, top: 20 }
    });
    plot.addText(d3.range(data.names.length), {
      text: i => data.names[i],
      x: i =>   result[i][0] - result[i][1],
      y: i => - result[i][0] - result[i][1]
    });
  });


function irisVec(d)
{
  return new Float32Array([d.sepalLength, d.sepalWidth, d.petalLength, d.petalWidth]);
}

function create2DPlot(opts)
{
  var data = opts.data;
  var xAcc = opts.xAccessor;
  var yAcc = opts.yAccessor;
  var width = opts.width || 400;
  var height = opts.height || 400;
  var margins = opts.margins || { bottom: 40, left: 50 };
  
  var plot = cscheid.plot.create(
    cscheid.dom.makeCenteredElement(opts.element),
    width, height);
      
  plot.setMargins(margins);

  plot.setXDomain(d3.extent(data, xAcc));
  plot.setYDomain(d3.extent(data, yAcc));

  if (opts.xLabel) {
    plot.addXAxis({ ticks: 5, title: opts.xLabel });
  }
  if (opts.yLabel) {
    plot.addYAxis({ ticks: 5, title: opts.yLabel });
  }
      
  plot.addPoints(data, {
    x: xAcc,
    y: yAcc,
    r: 3
  });
  
  return plot;
}

function createIrisPlots(iris)
{
  create2DPlot({
    data: iris,
    element: d3.select("#scatterplot-iris-sepal-petal"),
    xAccessor: d => (d.sepalLength + d.sepalWidth) / 2,
    yAccessor: d => (d.petalLength + d.petalWidth) / 2,
    xLabel: "Average Sepal Measurement",
    yLabel: "Average Petal Measurement",
  });

  create2DPlot({
    data: iris,
    element: d3.select("#scatterplot-iris-length"),
    xAccessor: d => d.sepalLength,
    yAccessor: d => d.petalLength,
    xLabel: "Sepal Length",
    yLabel: "Petal Length"
  });

  var xWeird = [ 0.2, -0.4, -0.3, 0.5];
  var yWeird = [-0.7,  0.3, -0.3, 0.8];
 
  create2DPlot({
    data: iris,
    element: d3.select("#scatterplot-iris-weird"),
    xAccessor: d => cscheid.blas.dot(irisVec(d), xWeird),
    yAccessor: d => cscheid.blas.dot(irisVec(d), yWeird)
  });

  createGrandTourPlot(iris);

  var A = cscheid.linalg.centerColumns(iris.map(irisVec));
  let SVD = window.SVDJS.SVD; // yeah, i know.
  let result = SVD(A);
  let t = cscheid.linalg.transpose;

  let pca = t(t(result.u).map(function(r, i) {
    return cscheid.linalg.scale(r, Math.sqrt(result.q[i]));
  }));

  create2DPlot({
    data: iris,
    element: d3.select("#pca-iris"),
    xAccessor: (d, i) => pca[i][0],
    yAccessor: (d, i) => pca[i][1],
    xLabel: "PC1",
    yLabel: "PC2"
  });

  debugger;
  var biplot = create2DPlot({
    data: iris,
    element: d3.select("#pca-iris-biplot"),
    xAccessor: (d, i) => pca[i][0],
    yAccessor: (d, i) => pca[i][1],
    xLabel: "PC1",
    yLabel: "PC2"
  });

  biplot.addArrows(result.v.map(function(d) {
    return {
      vec: [d[0], d[1]],
      p: [0,0]
    };
  }),{
    vector: d => d.vec,
    scale: 0.33,
  });

  biplot.addText([
    "Sepal Length",
    "Sepal Width",
    "Petal Length",
    "Petal Width"
  ], {
    text: d => d,
    x: (d, i) => result.v[i][0] / 3,
    y: (d, i) => result.v[i][1] / 3
  });
  
  window.setTimeout(function() {
    readjustFootnotePositions();
  }, 2000);
}

function createGrandTourPlot(iris)
{
  var gt = cscheid.vis.grandTour(4);

  var svg = cscheid.dom.makeCenteredElement(d3.select("#grand-tour-iris"))
      .append("svg")
      .attr("width", 400)
      .attr("height", 400);

  // we're avoiding reallocations as much as possible, so
  // this is ugly.
  iris = iris.map(function(d) {
    var result = irisVec(d);
    result.copy = new Float32Array(result);
    result.proj = new Float32Array([0, 0]);
    return result;
  });
  var dots = svg.selectAll("circle")
      .data(iris)
      .enter()
      .append("circle")
      .attr("r", 3)
      .attr("fill", "black");

  var beginning = cscheid.time.elapsed();
  function updateProj() {
    iris.forEach(d => {
      cscheid.blas.copy(d, d.copy);
      var t = (cscheid.time.elapsed() - beginning) / 2;
      var proj = gt(d.copy, t);
      d.proj[0] = proj[0];
      d.proj[1] = proj[1];
    });
  }

  function updateDots() {
    // let's hard code the largest singular value of this, :shrug:
    
    var xDomain = d3.extent(iris, d => d.proj[0]);
    var yDomain = d3.extent(iris, d => d.proj[1]);
    var xCenter = (xDomain[1] + xDomain[0]) / 2,
        yCenter = (yDomain[1] + yDomain[0]) / 2;
    
    xScale.domain([xCenter - 5, xCenter + 5]);
    yScale.domain([yCenter - 5, yCenter + 5]);
    
    dots.attr("cx", d => xScale(d.proj[0]))
      .attr("cy", d => yScale(d.proj[1]));
  };

  updateProj();

  var xScale = d3.scaleLinear()
      .range([10, 390]);
  var yScale = d3.scaleLinear()
      .range([390, 10]);
  
  updateDots();

  function tick() {
    updateProj();
    updateDots();
    requestAnimationFrame(tick);
  }
  tick();
}
