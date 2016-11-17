/*global cscheid */

(function() {
    var debug = {};
    cscheid.debug = debug;

    var trace = [];
    function add(obj, attrs) {
        trace.push({ obj: obj,
                     attrs: attrs });
    }
    debug.add = add;

    function appendToD3(sel) {
        for (var i=0; i<trace.length; ++i) {
            sel.append(trace[i].obj)
                .attrs(trace[i].attrs);
        }
    }
    debug.appendToD3 = appendToD3;

    function clear() {
        trace = [];
    }
    debug.clear = clear;
})();
