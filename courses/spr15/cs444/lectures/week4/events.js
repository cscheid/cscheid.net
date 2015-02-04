function log(msg)
{
    var span = document.createElement("span");
    span.textContent = msg;
    span.setAttribute("class", "log-entry");
    document.getElementById("logging").appendChild(span);
}

function setSVGEvents()
{
    var circle = document.getElementById("circle");
    var rect = document.getElementById("rect");
    var group = document.getElementById("group");

    circle.onclick = function() {
        log("click!");
    };
    circle.onmouseenter = function() {
        rect.setAttribute("fill", "#66bb33");
        log("enter!");
    };
    circle.onmouseleave = function() {
        rect.setAttribute("fill", "#336600");
        log("leave!");
    };
    // group.onmouseout = function(event) {
    //     log("[out this=" + this.getAttribute("id") + " fromElement=" + event.fromElement.getAttribute("id") + " toElement=" + event.toElement.getAttribute("id") + "]");
    // };
    group.onmouseleave = function(event) {
        log("[leave this=" + this.getAttribute("id") + " fromElement=" + event.fromElement.getAttribute("id") + " toElement=" + event.toElement.getAttribute("id") + "]");
    };
}

window.onload = setSVGEvents;

