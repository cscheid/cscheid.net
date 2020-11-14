import * as cscheid from "./cscheid/cscheid.js";

export function makeSlidesFromMarkdown()
{
  // var slideStarts = d3.selectAll("h1");
  var root = d3.select("div.slides");
  _.toArray(document.querySelectorAll("h1,h2,h3,h4"))
    .map(node => {
      // I could try to append these to the slide section directly
      // but I'd rather not disturb that part of the DOM as I'm
      // walking it
      var titleNode = node;
      var lst = [];
      var slide = d3.select(document.body)
          .append("section");
      var frame = slide.append("div")
          .classed("frame", true);

      var titleText = titleNode.innerText;
      let title = frame.append("div")
          .classed("title", true);
      
      ////////////////////////////////////////////////////////////////////////
      // process directives

      var directives = [
        {
          re: /^ *\[ *slide-data: ([^ ]*) ([^ ]*)\] ?(.*)/,
          onMatch: m => {
            slide.node().dataset[m[1]] = m[2];
            titleText = m[3];
          },
        },
        {
          re: /^ *\[ *attribute: ([^ ]*) ([^ ]*)\] ?(.*)/,
          onMatch: m => {
            slide.attr(m[1], m[2]);
            titleText = m[3];
          },
        },
        {
          re: /^ *\[ *title: +([^\]]*)\] ?(.*)/,
          onMatch: m => {
            titleText = m[2];
            m[1].trim().split(/ +/).forEach(c => title.classed(c, true));
          }
        },
        {
          re: /^ *\[ *slide: +([^\]]*)\] ?(.*)/,
          onMatch: m => {
            titleText = m[2];
            m[1].trim().split(/ +/).forEach(c => slide.classed(c, true));
          }
        }];

      do {
        var matched = false;
        directives.forEach(d => {
          var m = titleText.match(d.re);
          if (m) {
            d.onMatch(m);
            matched = true;
          }
        });
      } while (matched);

      ////////////////////////////////////////////////////////////////////////
      
      while (node.nextElementSibling !== null &&
             node.nextElementSibling.tagName !== "H1" &&
             node.nextElementSibling.tagName !== "H2" &&
             node.nextElementSibling.tagName !== "H3" &&
             node.nextElementSibling.tagName !== "H4") {
        node = node.nextElementSibling;
        lst.push(node);
      }

      title.text(titleText);

      let contents;
      if (titleNode.tagName === "H1") {
        // in an H1, we don't want a frame, sigh.
        // steal title from frame
        if (titleText.trim().length > 0)
          slide.node().appendChild(title.node());

        frame.remove();
        slide.classed("grid", true);
        slide.classed("title-slide", true);
        lst.forEach(contentNode => {
          slide.node().appendChild(contentNode);
        });
      } else if (titleNode.tagName === "H2") {
        if (titleText.trim().length === 0)
          title.remove();
        contents = frame.append("div").classed("contents", true);
        lst.forEach(contentNode => {
          contents.node().appendChild(contentNode);
        });
      } else {
        throw new Error("Unsupported tag: " + titleNode.tagName);
      }
      
      d3.select(titleNode).remove();
      return slide.node();
    }).forEach(slideNode => {
      root.node().appendChild(slideNode);
    });

  // now we remove the visibility:hidden style from the main div so we
  // actually see things
  d3.select("div.slides").style("opacity", null);
  // massive, horrible hack here.
  return cscheid.dom.loadScript("/lib/reveal/reveal.js-3.7.0/js/reveal.js")
    .then(() => cscheid.dom.loadScript("/lib/reveal/js/reveal-main.js"));
}
