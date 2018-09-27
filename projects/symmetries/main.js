var arrow = d3.select("#arrow")
        .append("svg")
        .attr("width", 200)
        .attr("height", 200)
        .append("g")
        .attr("transform", "translate(100,100) scale(1, -1)");

function radians(v)
{
    return v * Math.PI / 180;
}

function rotateBy(v, rot)
{
    return [Math.cos(rot) * v[0] - Math.sin(rot) * v[1],
            Math.sin(rot) * v[0] + Math.cos(rot) * v[1]];
}

var v = [1, 0];

d3.select("#vector").text("[" + String(v) + "]");

//////////////////////////////////////////////////////////////////////////////

function addArrow(svg, rotation)
{
    var p1 = [0,    50];
    var p2 = [15,  -15];
    var p3 = [-15,  15];
    var p4 = [-15, -15];
    
    p1 = rotateBy(p1, rotation);
    p2 = rotateBy(p2, rotation);
    p3 = rotateBy(p3, rotation);
    p4 = rotateBy(p4, rotation);

    svg.append("path")
        .attr("d", "M 0 0 L " + p1[0] + " " + p1[1] +
              " l " + p2[0] + " " + p2[1] +
              " m " + p3[0] + " " + p3[1] +
              " l " + p4[0] + " " + p4[1])
        .attr("stroke", "black")
        .attr("fill", "none");
}

addArrow(arrow, radians(30));
