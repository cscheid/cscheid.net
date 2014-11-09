var max_pop = 2369;
var max_density = 3000; //4881;
var quantile_min = 0.3;
var quantile_range = 0.7;
var bivariate, basic_range, transformation, invariance_transformation = "none";
var map, colorLegend, stateLegends, xScale;
var data;

window.onload = function()
{
    d3.selectAll("input").on("click", function() {
        selectScale(true);
    });
    d3.selectAll("input")
        .filter(function(d) {
            return this.name === "data";
        })
        .on("click", function() {
            selectData("pt" + whichRadio("data"), true);
        });
    d3.json("va.json", function(error, json) {
        if (error) {
            console.error(error);
            return;
        }
        initDiv(json);
    });
};
