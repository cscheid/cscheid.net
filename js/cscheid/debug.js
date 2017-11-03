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

    https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript
    function UnrecoverableError(message) {
        this.name = 'UnrecoverableError';
        this.message = message;
        this.stack = (new Error()).stack;
    }
    UnrecoverableError.prototype = new Error;
    debug.UnrecoverableError = UnrecoverableError;
    
    function die(msg) {
        throw new UnrecoverableError(msg);
    }
    debug.die = assert;
    
    function assert(cond, msg) {
        if (!cond)
            die(msg);
    }
    debug.assert = assert;
})();
