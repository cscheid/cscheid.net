function loadJson(url, handler)
{
    var xhr = new XMLHttpRequest;

    xhr.open("GET", url, true);

    var ready = false;
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200 && !ready) {
            handler(JSON.parse(xhr.response), url);
            ready = true;
        }
    };
    xhr.send(null);
};

loadJson("example.json", function(json) {
    console.log("HI 2");
    var node = document.getElementById("data");
    for (var i=0; i<json.length; ++i) {
        var child = document.createElement("div");
        child.textContent = json[i];
        node.appendChild(child);
    }
    console.log("HI 1");
});

