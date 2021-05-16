var data;

d3.json("va.json")
  .then(function (json) {
    data = topojson.feature(json, json.objects.precincts).features;
    data.forEach(function(d) {
      var area = 0;
      if (d.geometry.type !== "MultiPolygon") {
        console.error("Can't handle object of type " + d.geometry.type);
        return;
      }
      // this is slightly incorrect because it's using the _projected_ area.
      d.geometry.coordinates.forEach(function(p) {
        p.forEach(function(loop) {
          for (var i=0; i<loop.length - 1; ++i) {
            var d1 = loop[i], d2 = loop[i+1];
            area += 0.5 * (d1[0] * d2[1] - d2[0] * d1[1]);
          }
        });
      });
      d.properties.area = area;
      d.properties.percentDemocrat = 100 * (d.properties.d / d.properties.t);
      d.properties.percentRepublican = 100 * (d.properties.r / d.properties.t);
    });

    var div = d3.select("#main");
    var svg = div.append("svg")
        .attr("width", 1200)
        .attr("height", 800)
    ;
    
    map = svg.append("g").attr("transform", "scale(1.2, 1.2)");
    
    var path = d3.geoPath().projection(null);

    var totalExtent = d3.extent(data, function(d) { return d.properties.t; });

    //////////////////////////////////////////////////////////////////////////
    // 1: winnerColormap
    function winnerColor(d)
    {
      if (d.properties.percentDemocrat > d.properties.percentRepublican)
        return "blue";
      else
        return "red";
    }

    //////////////////////////////////////////////////////////////////////////
    // 2: "purple states" colormap
    var purpleStatesColormap = d3.scaleLinear()
        .domain([0, 100])
        .range(["blue", "red"]);
    
    //////////////////////////////////////////////////////////////////////////
    // 3: "close-races" colormap
    var closeRacesColormap = d3.scaleLinear()
        .domain([0, 50, 100])
        .range(["blue", "white", "red"]);

    //////////////////////////////////////////////////////////////////////////
    // this is the final colormap we designed in class, using two
    // separate numerical scales to build an appropriate color in
    // Lab colorspace
    var luminanceScale = d3.scaleLinear().domain(totalExtent).range([100, 30]);
    var bScale = d3.scaleLinear().domain([0, 100]).range([70, -70]);
    
    var polygons = map.selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", function(d) {
          return d3.lab(luminanceScale(d.properties.t), 0,
                        bScale(d.properties.percentDemocrat));
        })
        .attr("stroke", "black")
        .attr("stroke-opacity", 0.3);
  });
