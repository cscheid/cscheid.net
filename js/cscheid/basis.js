/*global cscheid */

// THESE FUNCTIONS ASSUME YOU'VE INCLUDED NUMERIC.JS!!!

(function() {
    var basis = {};
    cscheid.basis = basis;

    function bernstein(n, v) {
        var c = cscheid.math.choose(n, v);
        return function(x) {
            return c * Math.pow(x, v) * Math.pow(1-x, n-v);
        };
    }
    basis.bernstein = bernstein;
})();
