/*global cscheid */

(function() {
  var time = {};

  var epoch = Date.now();

  time.elapsed = function() {
    return (Date.now() - epoch) / 1000;
  };

  cscheid.time = time;
})();
