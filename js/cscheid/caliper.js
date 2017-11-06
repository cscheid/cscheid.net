/*global cscheid */
// THESE FUNCTIONS ASSUME YOU'VE INCLUDED NUMERIC.JS!!!

// caliper is entirely inspired by gage http://teem.sourceforge.net/gage/

(function() {
    // all of caliper's reconstruction are uniformly spaced, so these
    // are uniform b-splines, and they 
    var caliper = {};
    cscheid.caliper = caliper;
    
    function bSpline(order) {
        var n = order;
        var result = function(x) {
            // http://bigwww.epfl.ch/publications/unser9301.pdf, eq 2.6
            var t1 = 1 / cscheid.math.fact(n);
            var result = 0;
            for (var j=0; j<=n+1; ++j) {
                var u = x + (n+1)/2 - j;
                if (u < 0)
                    continue;
                var t2 = cscheid.math.choose(n+1, j);
                var t3 = Math.pow(u, n);
                result += t1 * t2 * t3;
                t1 *= -1;
            }
            return result;
        };
        // as a hack, we make the order-0 kernel support artificially larger,
        // so that the centering trick we use in makeFunction below works.
        // this will be a little inefficient, but oh well.
        if (order === 0) {
            result.support = [-1, 1];
        } else {
            result.support = [-0.5 * (order + 1), 0.5 * (order + 1)];
        }
        return result;
    };
    var kernels = {};
    caliper.kernels = kernels;
    kernels.bSpline = bSpline;

    // assumes data has been sampled at integer values
    // also fairly inefficient.
    function makeFunction(array, kernel) {
        return function(s) {
            var ix = ~~s, u, j;
            var result = 0;
            for (j=Math.min(ix, array.length-1), u = s - j;
                 j>=0 && u <= kernel.support[1];
                 --j, ++u) {
                result += array[j] * kernel(u);
            }
            for (j=Math.max(ix+1, 0), u = s - j;
                 j<array.length && u >= kernel.support[0];
                 ++j, --u) {
                result += array[j] * kernel(u);
            }
            return result;
        };
    }
    caliper.makeFunction = makeFunction;

    // creates a function from two separable filters
    // 
    // FIXME I should be writing this generically, so that I have a
    // makeNDFunction that just works.
    function make2DFunction(array, dims, kernelX, kernelY) {
        debugger;
        function sampleArray(x, y) {
            if (x >= dims[0] && x < 0)
                return 0;
            var ix = y * dims[0] + x;
            if (ix < 0 || ix >= array.length)
                return 0;
            return array[ix];
        }
        return function(s, t) {
            var ixX = ~~s, ixY = ~~t, uX, jX;
            var result = 0;

            // FIXME
            // this inner loop is almost adversarially cache-line unfriendly
            function innerLoop(jX, uX) {
                var uY, jY;
                var kx = kernelX(uX);
                for (jY = Math.min(ixY, dims[1]-1), uY = t - jY;
                     jY >= 0 && uY <= kernelY.support[1];
                     --jY, ++uY) {
                    result += sampleArray(jX, jY) * kx * kernelY(uY);
                }
                for (jY=Math.max(ixY+1, 0), uY = t - jY;
                     jY < dims[1] && uY >= kernelY.support[0];
                     ++jY, --uY) {
                    result += sampleArray(jX, jY) * kx * kernelY(uY);
                }
            }
            for (jX = Math.min(ixX, dims[0]-1), uX = s - jX;
                 jX >= 0 && uX <= kernelX.support[1];
                 --jX, ++uX) {
                innerLoop(jX, uX);
            }
            for (jX=Math.max(ixX+1, 0), uX = s - jX;
                 jX < dims[0] && uX >= kernelX.support[0];
                 ++jX, --uX) {
                innerLoop(jX, uX);
            }

            return result;
        };
    }
    caliper.make2DFunction = make2DFunction;
})();
