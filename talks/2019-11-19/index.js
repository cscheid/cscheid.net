import * as mt from "/js/markdown_talk.js";
import * as cscheid from "/js/cscheid/cscheid.js";

mt.makeSlidesFromMarkdown()
  .then(function() {

    //////////////////////////////////////////////////////////////////////////
    // dispatchers to update the iris dimreader slides
    
    var irisAttributes = [
      "Sepal Length",
      "Sepal Width",
      "Petal Length",
      "Petal Width"
    ];

    var slideDispatchers = {
      "slide-iris-tsne": {
        "fragmentshown": function(event) {
          console.log("SHOWN");
          var frag = Number(event.fragment.getAttribute("data-fragment-index"));
          var a = irisAttributes[frag];
          if (!a) {
            d3.select("#slide-iris-tsne-attribute-name").text("");
          }
          d3.select("#slide-iris-tsne-attribute-name").text(" (showing " + a + ")");
        },
        "fragmenthidden": function(event) {
          console.log("HIDDEN");
          var frag = Number(event.fragment.getAttribute("data-fragment-index"));
          var a = irisAttributes[frag-1];
          if (!a) {
            d3.select("#slide-iris-tsne-attribute-name").text("");
          }
          d3.select("#slide-iris-tsne-attribute-name").text(" (showing " + a + ")");
        },
      }
    };

    cscheid.reveal.setSlideDispatchers(slideDispatchers);

    d3.csv("/courses/data-visualization/data/iris.csv", d3.autoType)
      .then(iris => {
        function irisVec(d)
        {
          return new Float32Array([d.sepalLength, d.sepalWidth, d.petalLength, d.petalWidth]);
        }
        
        // we copied this from /courses/data-visualization/lectures/dimensionality-reduction/main.js
        var gt = cscheid.vis.grandTour(4);

        var sz = Number(cscheid.dom.convertToPixelUnits("60vh"));
        var svg = cscheid.dom.makeCenteredElement(d3.select("#grand-tour-iris"))
            .append("svg")
            .attr("width", sz)
            .attr("height", sz);

        // we're avoiding reallocations as much as possible, so
        // this is ugly.
        iris = iris.map(function(d) {
          var result = irisVec(d);
          result.copy = new Float32Array(result);
          result.proj = new Float32Array([0, 0]);
          result.obj = d;
          return result;
        });
        var fillScale = d3.scaleOrdinal(cscheid.svg.categoricalColorScheme);

        var dots = svg.selectAll("circle")
            .data(iris)
            .enter()
            .append("circle")
            .attr("r", 4)
            .attr("fill", d => fillScale(d.obj.species))
            .attr("stroke", d => d3.color(fillScale(d.obj.species)).darker());

        var beginning = cscheid.time.elapsed();
        function updateProj() {
          iris.forEach(d => {
            cscheid.blas.copy(d, d.copy);
            var t = (cscheid.time.elapsed() - beginning) / 1.5;
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
            .range([10, sz-10]);
        var yScale = d3.scaleLinear()
            .range([sz-10, 10]);
        
        updateDots();

        function tick() {
          // FIXME: only update if visible.
          updateProj();
          updateDots();
          requestAnimationFrame(tick);
        }
        tick();
      });

  });
