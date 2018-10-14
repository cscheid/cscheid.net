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
    { src: '/lib/reveal/js/reveald3.js' }
  ],
  keyboard: {
    82: resetSlide,
    78: forceNextSlide,
    80: forcePrevSlide,
  },
  reveald3: {
    runLastState: true
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

var slideDispatchers = {};

