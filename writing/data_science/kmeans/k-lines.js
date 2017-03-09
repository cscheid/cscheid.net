/*global cscheid */

function generateData(k, n) {
    var lines = [], i, j;
    for (i=0; i<k; ++i) {
        var m = cscheid.random.normalVariate();
        var b = cscheid.random.normalVariate();
        lines.push([m, b]);
    }
    for (i=0; i<n; ++i) {
        for (j=0; j<k; ++j) {
        }
    }
}
