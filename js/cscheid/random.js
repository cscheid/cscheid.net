/*global cscheid */

//////////////////////////////////////////////////////////////////////////////
// we're trusting Math.random() here.. likely a bad idea.

(function() {
    var random = {};
    cscheid.random = random;

    // plain box-muller

    var hasPrevGauss = false, prevGauss;
    function normalVariate() {
        if (hasPrevGauss) {
            hasPrevGauss = false;
            return prevGauss;
        }
        var u1 = Math.random(), u2 = Math.random();
        var r = Math.sqrt(-2 * Math.log(u1));
        var theta = Math.PI * 2 * u2;
        hasPrevGauss = true;
        prevGauss = r * Math.cos(theta);
        return r * Math.sin(theta);
    }
    random.normalVariate = normalVariate;

    function choose(lst) {
        var u = ~~(Math.random() * lst.length);
        return lst[u];
    }
    random.choose = choose;

    function uniformRange(min, max) {
        var i = ~~(Math.random() * (max - min));
        return min + i;
    }
    random.uniformRange = uniformRange;

    function uniformReal(lo, hi) {
        return Math.random() * (hi - lo) + lo;
    }
    random.uniformReal = uniformReal;
})();
