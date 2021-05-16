import * as cscheid from "/js/cscheid/cscheid.js";

function highDVolumeChart()
{
  let plot = cscheid.plot.create(
    cscheid.dom.makeCenteredElement(d3.select("#high-d-volume")),
    500, 300);
  plot.setMargins( {left: 45, bottom: 40, right: 15, top: 5 });
  plot.setXDomain([1, 50]);
  plot.setYDomain([0, 1]);

  plot.addXAxis({ ticks: 5, title: "Dimensions" });
  plot.addYAxis({ ticks: 5, title: "Volume Fraction" });

  plot.addFunction(d => {
    return Math.pow(0.9, d);
  });
}

highDVolumeChart();
