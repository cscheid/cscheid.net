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
    
})();
