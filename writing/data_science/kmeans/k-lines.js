/*global cscheid */

function generateData(k, n) {
    var lines = [], i, j;
    var points = [];
    for (i=0; i<k; ++i) {
        var m = cscheid.random.normalVariate();
        var b = cscheid.random.normalVariate();
        lines.push([m, b]);
    }
    for (i=0; i<k; ++k) {
        for (j=0; j<n; ++j) {
            var x = Math.random();
            var y = lines[i][0] * x + lines[i][1];
            points.push(cscheid.geometry.vec2(x, y));
        }
    }
    return points;
}

function kLines(data, k) {
    var assignments = [], i, j;
    var changed;

    for (i=0; i<data.length; ++i) {
        assignments.push(cscheid.random.uniformRange(0, k));
    }
    var xs = [], ys = [];

    do {
        changed = false;
        xs = [];
        for (i=0; i<k; ++i) {
            xs.push([]);
            ys.push([]);
        }
        for (i=0; i<data.length; ++i) {
            xs[assignments[i]].push([data[i][0], 1]);
            ys[assignments[i]].push(data[i][1]);
        }
        
    } while (1);
}
