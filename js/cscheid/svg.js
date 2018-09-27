/*global cscheid */
(function() {
  var svg = {};
  cscheid.svg = svg;

  function translateVec(v) {
    return translate(v.x, v.y);
  }
  svg.translateVec = translateVec;
  
  function translate(x, y) {
    if (y === undefined) {
      return "translate(" + x.x + ", " + x.y + ") ";
    } else {
      return "translate(" + x + ", " + y + ") ";
    }
  }
  svg.translate = translate;

  function rotate(r) {
    return "rotate(" + r + ") ";
  }
  svg.rotate = rotate;

  //////////////////////////////////////////////////////////////////////////
  // extra methods for the selection prototype

  // http://stackoverflow.com/questions/14167863/how-can-i-bring-a-circle-to-the-front-with-d3

  d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
      this.parentNode.appendChild(this);
    });
  };

  d3.selection.prototype.callReturn = function(callable)
  {
    return callable(this);
  };

  d3.selection.prototype.enterMany = function(data)
  {
    return this.selectAll(".c :not(.c)")
      .data(data)
      .enter();
  };
})();
