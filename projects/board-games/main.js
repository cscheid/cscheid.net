function binner(binCenter, binWidth) {
    return d => Math.round((d - binCenter) / binWidth);
}

function compose(g, f) {
    return x => g(f(x));
}

d3.csv("boardgame-export.csv", function(error, data) {
    if (error !== null) {
        console.error(error);
        throw new Exception("Couldn't load data!", error);
    }
    var columns = ["stats.usersrated", "stats.numweights", "stats.owned", "details.name","stats.average","stats.averageweight","details.yearpublished"];
    var cf = crossfilter(data);
    
    var dims = _.object(columns.map(
        column => [column, cf.dimension(d => d[column])]));

    var nUsersGroup  = dims["stats.usersrated"].group(binner(0, 1000));
    var nOwnersGroup = dims["stats.owned"].group(binner(0, 10));
});
