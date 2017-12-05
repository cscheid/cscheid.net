function paperClipSolverBoot() {
    var f = document.createElement("script");
    f.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.4/d3.js");
    f.onload = paperClipSolver;
    document.head.appendChild(f);
}

paperClipSolverBoot();

function paperClipSolver() {
    alert("Let's get this party started.");
    
    var uiBox = d3.select(document.body)
            .append("div")
            .style("position", "absolute")
            .style("right", "1em")
            .style("bottom", "1em")
            .style("background-color", "#ccddee");

    //////////////////////////////////////////////////////////////////////////////

    var makingPaperclips = false;

    uiBox.append("button")
        .text("Start making paperclips")
        .on("click", function() {
            if (makingPaperclips) {
                return;
            }
            makingPaperclips = true;
            var clipsPerSec = 45;
            var f = function() {
                d3.select("#btnMakePaperclip").node().click();
                if (makingPaperclips)
                    window.setTimeout(f, 1000/clipsPerSec);
            };
            f();
        });

    uiBox.append("button")
        .text("Stop making paperclips")
        .on("click", function () {
            makingPaperclips = false;
        });

    //////////////////////////////////////////////////////////////////////////
    // ahhh monkey-patching
    
    oldDisplayMessage = displayMessage;
    function handleDisplayMessage(msg) {
        console.log(msg);
    };

    displayMessage = function(msg) {
        handleDisplayMessage(msg);
        return oldDisplayMessage(msg);
    };
    
    //////////////////////////////////////////////////////////////////////////
    // Projects
    
    var currentProject = 0;
    var projectsByOrder = [
        "Improved AutoClippers",
        "Creativity",
        "Limerick",              // 10
        "Lexical Processing",    // 50 creat
        "Combinatory Harmonics", // 100 creat
        "Improved Wire Extrusion",
        "RevTracker",
        "Even Better AutoClippers",
        "The Hadwiger Problem",
        "Optimized Wire Extrusion",
        "New Slogan",
        "Catchy Jingle",
        "Optimized AutoClippers",
        "Hadwiger Clip Diagrams",
        "Microlattice Shapecasting",
        "Hypno Harmonics",
        "Quantum Computing",
    ];

/*
The Tóth Sausage Conjecture 
Donkey Space
Catchy Jingle

*/
    
    function observeProjects() {
        var isNextProjectReady = d3.selectAll("button")
                .filter(function() {
                    var id = this.getAttribute("id");
                    return id &&
                        id.startsWith("projectButton") &&
                        this.textContent.startsWith(projectsByOrder[currentProject]);
                });
        if (isNextProjectReady.nodes().length === 1) {
            if (!isNextProjectReady.property("disabled")) {
                var f = projectHook[projectsByOrder[currentProject]];
                f && f();
                isNextProjectReady.node().click();
                currentProject++;
            }
        }
    }

    var projectHook = {
        "RevTracker": function() {
            trackingRevenue = true;
        }
    };
    
    //////////////////////////////////////////////////////////////////////////
    // Rates of change, estimates, etc.

    var lst = ["funds", "wire", "fundsAtZeroWire", "avgSales", "clipmakerRate", "unsoldClips"];
    var ratesDiv = uiBox.append("div")
            .selectAll("div")
            .data(lst)
            .enter()
            .append("div");
    ratesDiv.append("span").text(d => d + " (d/dt): ");
    ratesDiv.append("span").attr("id", d => "rates-" + d);
    
    var estimatesDiv = uiBox.append("div")
            .selectAll("div")
            .data(lst)
            .enter()
            .append("div");
    estimatesDiv.append("span").text(d => d + ": ");
    estimatesDiv.append("span").attr("id", d => "estimates-" + d);

    function parseNumber(sel) {
        var n = Number(d3.select(sel).text().replace(/,/g, ''));
        return n;
    }
    
    var prevValues = {
        funds: 0,
        wire: 0,
        fundsAtZeroWire: 0,
        avgSales: 0,
        clipmakerRate: 0,
        unsoldClips: 0,
    }, prevTime = new Date().getTime() / 1000;
    var dvdt = {
        funds: 0,
        wire: 0,
        fundsAtZeroWire: 0,
        avgSales: 0,
        clipmakerRate: 0,
        unsoldClips: 0,
    };
    var estimates = {
        funds: 0,
        wire: 0,
        fundsAtZeroWire: 0,
        avgSales: 0,
        clipmakerRate: 0,
        unsoldClips: 0,
    };
    var fmt = d3.format(".2f");
    // fundsAtZeroWire = currentFunds + d funds/dt * 
    function updateRates() {
        var newValues = {
            funds: parseNumber("#funds"),
            wire: parseNumber("#wire"),
            fundsAtZeroWire: parseNumber("#funds") - dvdt.funds * parseNumber("#wire") / dvdt.wire,
            avgSales: parseNumber("#avgSales"),
            clipmakerRate: parseNumber("#clipmakerRate"),
            unsoldClips: parseNumber("#unsoldClips")
        };
        var curTime = new Date().getTime() / 1000;
        var dt = curTime - prevTime;
        var u = 0.95;
        for (var k in newValues) {
            var v = newValues[k];
            // to handle NaNs.
            estimates[k] = (u * estimates[k] + (1-u) * v) || 0;
            dvdt[k] = (u * dvdt[k] + (1-u) * (v - prevValues[k]) / dt) || 0;
            d3.select("#rates-" + k).text(fmt(dvdt[k]));
            d3.select("#estimates-" + k).text(fmt(estimates[k]));
        }
        prevValues = newValues;
        prevTime = curTime;
    }

    //////////////////////////////////////////////////////////////////////////
    // other displays

    function makeDisplay(title, id) {
        var b = uiBox.append("div");
        b.append("span").text(title + ": ");
        return b.append("span").attr("id", id);
    }
    
    var secondsUntilOutOfWire = makeDisplay("Seconds until out of wire");
    var fundsAtZeroWire = makeDisplay("Funds at zero wire");
    var currentProjectName = makeDisplay("Current project");

    function updateDisplays() {
        var secondsUntilOutOfWireV = - parseNumber("#wire") / dvdt.wire;
        secondsUntilOutOfWire.text(fmt(secondsUntilOutOfWireV));
        currentProjectName.text(projectsByOrder[currentProject]);
        fundsAtZeroWire.text(fmt(parseNumber("#funds") - dvdt.funds * parseNumber("#wire") / dvdt.wire));
    }

    //////////////////////////////////////////////////////////////////////////
    // autoWire
    
    var buyingWire = true;
    function autoWire() {
        var wireAmount = parseNumber("#wire");
        if (wireAmount < 100) { // this is not going to work if units change.
            // directly into the game API, whatever.
            buyWire();
        }
    }

    //////////////////////////////////////////////////////////////////////////
    // Computational Resources Tracking

    var currentResourceTarget = 0;
    var resourceTargets = [
        [6, 1],
        [6, 10],
        [1e10, 1e10]
    ];
    
    function updateResources() {
        var currentProcessors = parseNumber("#processors"),
            currentMemory = parseNumber("#memory");
        var currentResources = [currentProcessors, currentMemory];
        if (currentResources[0] < resourceTargets[currentResourceTarget][0]) {
            d3.select("#btnAddProc").node().click();
        } else if (currentResources[1] < resourceTargets[currentResourceTarget][1]) {
            d3.select("#btnAddMem").node().click();
        } else {
            currentResourceTarget++;
        };
    }

    function buyAutoClippers() {
        // var fundsAtZeroWire = estimates.fundsAtZeroWire;
        // // account for price fluctuations
        // if (fundsAtZeroWire > parseNumber("#wireCost") * 1.5) {
        //     console.log(fundsAtZeroWire, parseNumber("#wireCost") * 1.5);
        if (parseNumber("#funds") - parseNumber("#clipperCost") > parseNumber("#wireCost")) {
            makeClipper();
        }
    }

    // var trackingRevenue = false;
    // var targetPriceCents = 4;
    // function adjustPrice() {
    //     // if (trackingRevenue) {
    //     //     if (parseNumber("#avgSales") < parseNumber("#clipmakerRate")) {
    //     //         targetPriceCents--;
    //     //     } else if (parseNumber("#avgSales") > parseNumber("#clipmakerRate")) {
    //     //         targetPriceCents++;
    //     //     }
    //     // }
    //     // if (estimates.unsoldClips < 200) {
    //     //     d3.select("#btnRaisePrice").node().click();
    //     // } else if ((estimates.unsoldClips > 2000) || (parseNumber("#demand") < 100)) {
    //     //     d3.select("#btnLowerPrice").node().click();
    //     // }
    //     if (Math.round(parseNumber("#margin") * 100) > targetPriceCents) {
    //         lowerPrice();
    //     } else if (Math.round(parseNumber("#margin") * 100) < targetPriceCents) {
    //         raisePrice();
    //     }
    // }
    
    function mainTick() {
        observeProjects();
        updateRates();
        updateDisplays();
        if (buyingWire) {
            autoWire();
        }
        updateResources();
        buyAutoClippers();
        adjustPrice();
    }
    
    window.setInterval(mainTick, 100);
}

//////////////////////////////////////////////////////////////////////////////

var messageDispatch = {
    "Trust-Constrained Self-Modification enabled": function() {
    },
    "AutoClippers available for purchase": function() {
    }
};
