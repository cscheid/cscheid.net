//////////////////////////////////////////////////////////////////////////////

var attributes = [
  "Sepal Length",
  "Sepal Width",
  "Petal Length",
  "Petal Width"
];

var slideDispatchers = {
  "slide-iris-tsne": {
    "fragmentshown": function(event) {
      var frag = Number(event.fragment.getAttribute("data-fragment-index"));
      var a = attributes[frag];
      if (!a) {
        d3.select("#slide-iris-tsne-attribute-name").text("");
      }
      d3.select("#slide-iris-tsne-attribute-name").text(" (showing " + a + ")");
    },
    "fragmenthidden": function(event) {
      var frag = Number(event.fragment.getAttribute("data-fragment-index"));
      var a = attributes[frag-1];
      if (!a) {
        d3.select("#slide-iris-tsne-attribute-name").text("");
      }
      d3.select("#slide-iris-tsne-attribute-name").text(" (showing " + a + ")");
    },
  }
};

