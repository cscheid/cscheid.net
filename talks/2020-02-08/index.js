import * as mt from '/js/markdown_talk.js';
import * as cscheid from '/js/cscheid/cscheid.js';

/* global vegaEmbed*/
Promise.all([mt.makeSlidesFromMarkdown(),
             d3.csv("gflops-per-dollar.csv", d3.autoType),
             d3.csv("storage-cost-per-dollar.csv", d3.autoType),
            ])
  .then(([mt, gflops, mbytes]) => {
    let vegaBaseFontSize = cscheid.dom.convertToPixelUnits("2.5vh");
    let vegaConfig =  {
      background: null,
      rendered: "svg",
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
      d3.select("#cost-per-gflop"), "div").attr("id", "vega-1");
    cscheid.dom.makeCenteredElement(
      d3.select("#cost-per-megabyte"), "div").attr("id", "vega-2");
    
    vegaEmbed('#vega-1', {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      data: { "values": gflops },
      mark: 'line',
      encoding: {
        y: {
          field: 'gflops_per_dollar',
          type: 'quantitative',
          scale: { "type": "log" },
          axis: {
            tickCount: 3,
            title: "billion operations per dollar per second"
          },
        },
        color: {
          value: "#ffffff"
        },
        x: {
          field: 'date',
          type: 'temporal',
          timeUnit: 'yearmonth',
          axis: {
            title: 'Year'
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
      data: { "values": mbytes },
      mark: 'line',
      encoding: {
        y: {
          field: 'usd_per_mbyte',
          type: 'quantitative',
          scale: { "type": "log" },
          axis: {
            tickCount: 5,
            title: "Dollars per megabyte"
          },
        },
        color: {
          value: "#ffffff"
        },
        x: {
          field: 'date',
          type: 'quantitative',
          axis: {
            title: 'Year'
          }
        }
      },
      config: vegaConfig
    }, {
      width: 800,
      height: 600
    });

    
  });
             
