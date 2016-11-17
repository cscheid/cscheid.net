/*global cscheid */
(function() {
    var math = {};
    cscheid.math = math;
    math.eps = 1e-6;

    function withEps(eps, f) {
        var oldEps = math.eps;
        try {
            math.eps = eps;
            f();
        } finally {
            math.eps = oldEps;
        }
    }
    math.withEps = withEps;

    function withinEps(v) {
        return Math.abs(v) < math.eps;
    }
   
    // numerics sucks.
    function quadratic(a, b, c) {
        if (a === 0)
            return { root1: -c/b, root2: -c/b };
        if (b === 0 && c === 0) {
            return { root1: 0, root2: 0 };
        }
        var discriminant = b * b - 4 * a * c;
        if (discriminant < 0 && withinEps(discriminant)) {
            discriminant = 0;
        }
        if (discriminant === 0) {
            return { root1: -b/(2*a), root2: -b/(2*a) };
        }
        var d = Math.sqrt(discriminant);
        if (b >= 0) {
            return { root1: (-b - d) / (2 * a), root2: (2 * c) / (-b - d) };
        } else {
            return { root1: (2 * c) / (-b + d), root2: (-b + d) / (2 * a) };
        }
    }
    math.quadratic = quadratic;

    // bisection search for root-finding
    function findRoot(f, lo, up) {
        var fLo = f(lo), fUp = f(up);
        if (fLo >= 0)
            throw new Error("Expected f(lo) to be negative, got " + fLo +
                            " instead.");
        if (fUp <= 0)
            throw new Error("Expected f(up) to be positive, got " + fUp +
                            " instead.");
        if (up <= lo)
            throw new Error("Expected up > lo.");
        var d = up - lo;
        var eps = math.eps, mid, fMid;
        while (d > eps) {
            console.log(mid);
            mid = (lo + up) / 2;
            fMid = f(mid);
            if (fMid === 0)
                return mid;
            if (fMid > 0)
                up = mid;
            else
                lo = mid;
            d = up - lo;
        }
        return mid;
    }
    math.findRoot = findRoot;

    function radians(d) {
        return d * (Math.PI/180);
    }
    math.radians = radians;
    
    function degrees(r) {
        return r / (Math.PI/180);
    }
    math.degrees = degrees;
})();
