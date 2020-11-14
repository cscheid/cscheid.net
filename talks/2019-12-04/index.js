import * as mt from '/js/markdown_talk.js';
import * as cscheid from '/js/cscheid/cscheid.js';

/* global vegaEmbed*/
Promise.all([mt.makeSlidesFromMarkdown(),
             d3.csv('vis-acceptance-rates.csv')])
  .then(([mt, acceptanceRates]) => {
    var data = [], totals = [];
    acceptanceRates
        .filter(d => Number(d["SciVis"]) > 0 && !isNaN(Number(d[""])))
        .map(d => {
          return {
            year: d[""],
            SciVis: Number(d["SciVis"]),
            InfoVis: Number(d["InfoVis"]),
            VAST: Number(d["VAST"]),
            TVCG: Number(d["TVCG @ VIS"])
          };
        }).forEach(d => {
          ["SciVis", "InfoVis", "VAST", "TVCG"]
            .forEach(venue => {
              // there appears to be a nasty bug on vega which
              // subtracts one year from the year date. Sigh.
              data.push({ year: String(Number(d.year)+1), venue: venue, count: d[venue] });
              totals.push({ year: String(Number(d.year)+1),
                            total: d.SciVis + d.InfoVis + d.VAST + d.TVCG });
            });
        });

    let vegaBaseFontSize = cscheid.dom.convertToPixelUnits("2.5vh");
    var vegaConfig =  {
      background: null,
      strokeColor: null,
      padding: 0,
      axis: {
        titleFont: "Lato",
        labelFont: "Lato",
        labelColor: "#fff",
        titleColor: "#fff",
        labelFontSize: vegaBaseFontSize,
        titleFontSize: vegaBaseFontSize * 1.5,
        titlePadding: vegaBaseFontSize,
        gridColor: "rgba(255, 255, 255, 0.1)",
        tickColor: "rgba(255, 255, 255, 0.1)",
        tickCount: 5
      },
      legend: {
        titleFont: "Lato",
        labelFont: "Lato",
        labelColor: "#fff",
        titleColor: "#fff",
        labelFontSize: vegaBaseFontSize,
        titleFontSize: vegaBaseFontSize * 1.5,
        titlePadding: vegaBaseFontSize
      }
    };

    cscheid.dom.makeCenteredElement(
      d3.select("#vis-submissions-1"), "div").attr("id", "vega-1");
    cscheid.dom.makeCenteredElement(
      d3.select("#vis-submissions-2"), "div").attr("id", "vega-2");
    
    vegaEmbed('#vega-1', {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      data: { "values": data },
      mark: 'line',
      encoding: {
        y: {field: 'count', type: 'quantitative'},
        color: {field: 'venue', type: 'nominal'},
        x: {
          field: 'year',
          type: 'temporal',
          timeUnit: 'year',
          axis: {
            title: 'Conference Year'
          }
        }
      },
      config: vegaConfig
    }, {
      width: 800,
      height: 600
    });

    vegaEmbed('#vega-2', {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      data: { "values": totals },
      mark: 'line',
      encoding: {
        y: {field: 'total', type: 'quantitative'},
        x: {
          field: 'year',
          type: 'temporal',
          timeUnit: 'year',
          axis: {
            title: 'Conference Year'
          }
        }
      },
      config: vegaConfig
    }, {
      width: 800,
      height: 600
    });

    
  });
