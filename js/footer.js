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

// based on http://stackoverflow.com/a/1480137/221007
function cumulativeOffset(element, parent) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element && element !== parent);

    return {
        top: top,
        left: left
    };
};

function extractFootnotes() {
    var div = d3.select("div.footnotes");
    if (div.nodes().length > 0) {
        div.select("ol").selectAll("li").each(function() {
            // can't d3.select() here because using the id actually makes an invalid
            // selector (it has a colon in it)
            var refId = d3.select(this).selectAll("a").attr("href").substr(1);
            var link = document.getElementById(refId);
            var offset = cumulativeOffset(link, d3.select("#content").node());
            var that = this;
            var dthis = d3.select(this);
            dthis.remove();
            d3.select("#footnotes-ol-sidebar").append(function() { return that; });
            d3.select(this)
                .style("position", "relative")
                .style("top", offset.top + "px");
        });
    }
}
extractFootnotes();
