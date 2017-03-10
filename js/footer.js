$(document).ready(function() {
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
});

function guessGithubURL() {
    var path = window.location.pathname;
    if (path.endsWith("/"))
        path += "index.md";
    else if (path.endsWith(".html"))
        path = path.substr(0, path.length-4) + "md";
    return "http://github.com/cscheid/cscheid.net/edit/master" + path;
}

d3.select("#pull-request")
    .attr("href", guessGithubURL());
