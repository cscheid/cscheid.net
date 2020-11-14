/*global Reveal */

// We need this to get responsive rules to work.
Reveal.configure({ slideNumber: 'c/t' });
Reveal.initialize({
  width: "95%",
  height: "95%",
  margin: 0,
  minScale: 1,
  maxScale: 1,
  transition: 'fadeout',
  transitionSpeed: 'fast',
  dependencies: [
    { src: 'js/reveald3.js' }
  ],
  keyboard: {
    82: resetSlide,
    78: forceNextSlide,
    80: forcePrevSlide,
  }
});

function resetSlide() {
  var urlFrag = d3.select("div.slide-number a").attr("href");
  document.location = document.location.origin + "/" + urlFrag;
  window.location.reload();
}
function forceNextSlide() {
  var slideNumber = Number(d3.select("div.slide-number span.slide-number-a").text()) - 1;
  document.location = document.location.origin + "/#/" + (slideNumber + 1);
  window.location.reload();
}
function forcePrevSlide() {
  var slideNumber = Number(d3.select("div.slide-number span.slide-number-a").text()) - 1;
  document.location = document.location.origin + "/#/" + (slideNumber - 1);
  window.location.reload();
}

Reveal.addEventListener('slidechanged', function(event) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
  fixCSS();
}, false);

Reveal.addEventListener('ready', function(event) {
  fixCSS();
}, false);

Reveal.addEventListener('fragmentshown', function(event) {
  var dispatcher = slideDispatchers[event.fragment.parentElement.id];
  if (!dispatcher)
    return undefined;
  dispatcher = dispatcher['fragmentshown'];
  if (!dispatcher)
    return undefined;
  return dispatcher(event);
});

Reveal.addEventListener('fragmenthidden', function(event) {
  var dispatcher = slideDispatchers[event.fragment.parentElement.id];
  if (!dispatcher)
    return undefined;
  dispatcher = dispatcher['fragmenthidden'];
  if (!dispatcher)
    return undefined;
  return dispatcher(event);
});

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
      console.log("SHOWN");
      var frag = Number(event.fragment.getAttribute("data-fragment-index"));
      var a = attributes[frag];
      if (!a) {
        d3.select("#slide-iris-tsne-attribute-name").text("");
      }
      d3.select("#slide-iris-tsne-attribute-name").text(" (showing " + a + ")");
    },
    "fragmenthidden": function(event) {
      console.log("HIDDEN");
      var frag = Number(event.fragment.getAttribute("data-fragment-index"));
      var a = attributes[frag-1];
      if (!a) {
        d3.select("#slide-iris-tsne-attribute-name").text("");
      }
      d3.select("#slide-iris-tsne-attribute-name").text(" (showing " + a + ")");
    },
  }
};

