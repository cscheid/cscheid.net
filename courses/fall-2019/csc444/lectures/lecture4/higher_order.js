// -*- js2 -*-

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var ukDriverFatalities = [
    { month: 0, year: 1969, count: 1687 },
    { month: 1, year: 1969, count: 1508 },
    { month: 2, year: 1969, count: 1507 },
    { month: 3, year: 1969, count: 1385 },
    { month: 4, year: 1969, count: 1632 },
    { month: 5, year: 1969, count: 1511 },
    { month: 6, year: 1969, count: 1559 },
    { month: 7, year: 1969, count: 1630 },
    { month: 8, year: 1969, count: 1579 },
    { month: 9, year: 1969, count: 1653 },
    { month: 10, year: 1969, count: 2152 },
    { month: 11, year: 1969, count: 2148 },
    { month: 0, year: 1970, count: 1752 },
    { month: 1, year: 1970, count: 1765 },
    { month: 2, year: 1970, count: 1717 },
    { month: 3, year: 1970, count: 1558 },
    { month: 4, year: 1970, count: 1575 },
    { month: 5, year: 1970, count: 1520 },
    { month: 6, year: 1970, count: 1805 },
    { month: 7, year: 1970, count: 1800 },
    { month: 8, year: 1970, count: 1719 },
    { month: 9, year: 1970, count: 2008 },
    { month: 10, year: 1970, count: 2242 },
    { month: 11, year: 1970, count: 2478 },
    { month: 0, year: 1971, count: 2030 },
    { month: 1, year: 1971, count: 1655 },
    { month: 2, year: 1971, count: 1693 },
    { month: 3, year: 1971, count: 1623 },
    { month: 4, year: 1971, count: 1805 },
    { month: 5, year: 1971, count: 1746 },
    { month: 6, year: 1971, count: 1795 },
    { month: 7, year: 1971, count: 1926 },
    { month: 8, year: 1971, count: 1619 },
    { month: 9, year: 1971, count: 1992 },
    { month: 10, year: 1971, count: 2233 },
    { month: 11, year: 1971, count: 2192 },
    { month: 0, year: 1972, count: 2080 },
    { month: 1, year: 1972, count: 1768 },
    { month: 2, year: 1972, count: 1835 },
    { month: 3, year: 1972, count: 1569 },
    { month: 4, year: 1972, count: 1976 },
    { month: 5, year: 1972, count: 1853 },
    { month: 6, year: 1972, count: 1965 },
    { month: 7, year: 1972, count: 1689 },
    { month: 8, year: 1972, count: 1778 },
    { month: 9, year: 1972, count: 1976 },
    { month: 10, year: 1972, count: 2397 },
    { month: 11, year: 1972, count: 2654 },
    { month: 0, year: 1973, count: 2097 },
    { month: 1, year: 1973, count: 1963 },
    { month: 2, year: 1973, count: 1677 },
    { month: 3, year: 1973, count: 1941 },
    { month: 4, year: 1973, count: 2003 },
    { month: 5, year: 1973, count: 1813 },
    { month: 6, year: 1973, count: 2012 },
    { month: 7, year: 1973, count: 1912 },
    { month: 8, year: 1973, count: 2084 },
    { month: 9, year: 1973, count: 2080 },
    { month: 10, year: 1973, count: 2118 },
    { month: 11, year: 1973, count: 2150 },
    { month: 0, year: 1974, count: 1608 },
    { month: 1, year: 1974, count: 1503 },
    { month: 2, year: 1974, count: 1548 },
    { month: 3, year: 1974, count: 1382 },
    { month: 4, year: 1974, count: 1731 },
    { month: 5, year: 1974, count: 1798 },
    { month: 6, year: 1974, count: 1779 },
    { month: 7, year: 1974, count: 1887 },
    { month: 8, year: 1974, count: 2004 },
    { month: 9, year: 1974, count: 2077 },
    { month: 10, year: 1974, count: 2092 },
    { month: 11, year: 1974, count: 2051 },
    { month: 0, year: 1975, count: 1577 },
    { month: 1, year: 1975, count: 1356 },
    { month: 2, year: 1975, count: 1652 },
    { month: 3, year: 1975, count: 1382 },
    { month: 4, year: 1975, count: 1519 },
    { month: 5, year: 1975, count: 1421 },
    { month: 6, year: 1975, count: 1442 },
    { month: 7, year: 1975, count: 1543 },
    { month: 8, year: 1975, count: 1656 },
    { month: 9, year: 1975, count: 1561 },
    { month: 10, year: 1975, count: 1905 },
    { month: 11, year: 1975, count: 2199 },
    { month: 0, year: 1976, count: 1473 },
    { month: 1, year: 1976, count: 1655 },
    { month: 2, year: 1976, count: 1407 },
    { month: 3, year: 1976, count: 1395 },
    { month: 4, year: 1976, count: 1530 },
    { month: 5, year: 1976, count: 1309 },
    { month: 6, year: 1976, count: 1526 },
    { month: 7, year: 1976, count: 1327 },
    { month: 8, year: 1976, count: 1627 },
    { month: 9, year: 1976, count: 1748 },
    { month: 10, year: 1976, count: 1958 },
    { month: 11, year: 1976, count: 2274 },
    { month: 0, year: 1977, count: 1648 },
    { month: 1, year: 1977, count: 1401 },
    { month: 2, year: 1977, count: 1411 },
    { month: 3, year: 1977, count: 1403 },
    { month: 4, year: 1977, count: 1394 },
    { month: 5, year: 1977, count: 1520 },
    { month: 6, year: 1977, count: 1528 },
    { month: 7, year: 1977, count: 1643 },
    { month: 8, year: 1977, count: 1515 },
    { month: 9, year: 1977, count: 1685 },
    { month: 10, year: 1977, count: 2000 },
    { month: 11, year: 1977, count: 2215 },
    { month: 0, year: 1978, count: 1956 },
    { month: 1, year: 1978, count: 1462 },
    { month: 2, year: 1978, count: 1563 },
    { month: 3, year: 1978, count: 1459 },
    { month: 4, year: 1978, count: 1446 },
    { month: 5, year: 1978, count: 1622 },
    { month: 6, year: 1978, count: 1657 },
    { month: 7, year: 1978, count: 1638 },
    { month: 8, year: 1978, count: 1643 },
    { month: 9, year: 1978, count: 1683 },
    { month: 10, year: 1978, count: 2050 },
    { month: 11, year: 1978, count: 2262 },
    { month: 0, year: 1979, count: 1813 },
    { month: 1, year: 1979, count: 1445 },
    { month: 2, year: 1979, count: 1762 },
    { month: 3, year: 1979, count: 1461 },
    { month: 4, year: 1979, count: 1556 },
    { month: 5, year: 1979, count: 1431 },
    { month: 6, year: 1979, count: 1427 },
    { month: 7, year: 1979, count: 1554 },
    { month: 8, year: 1979, count: 1645 },
    { month: 9, year: 1979, count: 1653 },
    { month: 10, year: 1979, count: 2016 },
    { month: 11, year: 1979, count: 2207 },
    { month: 0, year: 1980, count: 1665 },
    { month: 1, year: 1980, count: 1361 },
    { month: 2, year: 1980, count: 1506 },
    { month: 3, year: 1980, count: 1360 },
    { month: 4, year: 1980, count: 1453 },
    { month: 5, year: 1980, count: 1522 },
    { month: 6, year: 1980, count: 1460 },
    { month: 7, year: 1980, count: 1552 },
    { month: 8, year: 1980, count: 1548 },
    { month: 9, year: 1980, count: 1827 },
    { month: 10, year: 1980, count: 1737 },
    { month: 11, year: 1980, count: 1941 },
    { month: 0, year: 1981, count: 1474 },
    { month: 1, year: 1981, count: 1458 },
    { month: 2, year: 1981, count: 1542 },
    { month: 3, year: 1981, count: 1404 },
    { month: 4, year: 1981, count: 1522 },
    { month: 5, year: 1981, count: 1385 },
    { month: 6, year: 1981, count: 1641 },
    { month: 7, year: 1981, count: 1510 },
    { month: 8, year: 1981, count: 1681 },
    { month: 9, year: 1981, count: 1938 },
    { month: 10, year: 1981, count: 1868 },
    { month: 11, year: 1981, count: 1726 },
    { month: 0, year: 1982, count: 1456 },
    { month: 1, year: 1982, count: 1445 },
    { month: 2, year: 1982, count: 1456 },
    { month: 3, year: 1982, count: 1365 },
    { month: 4, year: 1982, count: 1487 },
    { month: 5, year: 1982, count: 1558 },
    { month: 6, year: 1982, count: 1488 },
    { month: 7, year: 1982, count: 1684 },
    { month: 8, year: 1982, count: 1594 },
    { month: 9, year: 1982, count: 1850 },
    { month: 10, year: 1982, count: 1998 },
    { month: 11, year: 1982, count: 2079 },
    { month: 0, year: 1983, count: 1494 },
    { month: 1, year: 1983, count: 1057 },
    { month: 2, year: 1983, count: 1218 },
    { month: 3, year: 1983, count: 1168 },
    { month: 4, year: 1983, count: 1236 },
    { month: 5, year: 1983, count: 1076 },
    { month: 6, year: 1983, count: 1174 },
    { month: 7, year: 1983, count: 1139 },
    { month: 8, year: 1983, count: 1427 },
    { month: 9, year: 1983, count: 1487 },
    { month: 10, year: 1983, count: 1483 },
    { month: 11, year: 1983, count: 1513 },
    { month: 0, year: 1984, count: 1357 },
    { month: 1, year: 1984, count: 1165 },
    { month: 2, year: 1984, count: 1282 },
    { month: 3, year: 1984, count: 1110 },
    { month: 4, year: 1984, count: 1297 },
    { month: 5, year: 1984, count: 1185 },
    { month: 6, year: 1984, count: 1222 },
    { month: 7, year: 1984, count: 1284 },
    { month: 8, year: 1984, count: 1444 },
    { month: 9, year: 1984, count: 1575 },
    { month: 10, year: 1984, count: 1737 },
    { month: 11, year: 1984, count: 1763 }
];

//////////////////////////////////////////////////////////////////////////////

function make(name)
{
    return document.createElementNS("http://www.w3.org/2000/svg", name);
}

function makeSVG(width, height)
{
    if (!width) width = 400;
    if (!height) height = 400;
    var svg = make("svg");
    svg.setAttributeNS(null, "width", width);
    svg.setAttributeNS(null, "height", height);
    return svg;
}

function makeRect(width, height, x, y)
{
    var rect = make("rect");
    rect.setAttributeNS(null, "width", width);
    rect.setAttributeNS(null, "height", height);
    rect.setAttributeNS(null, "x", x);
    rect.setAttributeNS(null, "y", y);
    return rect;
}

function make(name, attrs)
{
    var element = document.createElementNS("http://www.w3.org/2000/svg", name);
    if (attrs === undefined) attrs = {};
    for (var key in attrs) {
        element.setAttributeNS(null, key, attrs[key]);
    }
    return element;
}

//////////////////////////////////////////////////////////////////////////////
// how would we plot all fatalities

function plotAll(svg)
{
    for (var i=0; i<ukDriverFatalities.length; ++i) {
        svg.appendChild(make("rect", { 
            width: 3, 
            height: ukDriverFatalities[i].count / 2500 * 400, 
            x: i * 3,
            y: 400 - (ukDriverFatalities[i].count / 2500 * 400 )
        }));
    }
}

var chart1 = make("svg", { width: 800, height: 400, "class": "my-chart" });
document.getElementById("chart1").appendChild(chart1);
plotAll(chart1);

var chart2 = make("svg", { width: 500, height: 300, "class": "my-chart" });
document.getElementById("chart2").appendChild(chart2);
plotAll(chart2);

var chart3 = make("svg", { width: 300, height: 500, "class": "my-chart" });
document.getElementById("chart3").appendChild(chart3);
plotAll(chart3);

