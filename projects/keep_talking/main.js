//////////////////////////////////////////////////////////////////////////////
// Utilities

function createCheckButtonSet(data, sel, labelFun) {
}

function createToggleButtonSet(data, sel, labelFun) {
    var buttons = sel.selectAll()
            .data(data)
            .enter()
            .append("span");
    
    buttons
        .classed("wire-button", true)
        .text(labelFun)
        .on("click.highlight", function(d) {
            buttons.classed("unselected", true);
            d3.select(this).classed("unselected", false);
        });
    
    return buttons;
}

//////////////////////////////////////////////////////////////////////////////
// Bomb information

var bombInformation = {
    lastDigitIsOdd: undefined,
    lastDigitIsEven: undefined,
    litIndicators: {},
    unlitIndicators: {},
    unansweredIndicators: {},
    batteryCount: undefined
};

function setupBombInformationUI() {
    
    var indicators = [
        "BOB",
        "CAR",
        "CLR",
        "FRK",
        "FRQ",
        "IND",
        "MSA",
        "NSA",
        "SIG",
        "SND",
        "TRN",
    ];
    indicators.forEach(function(d) {
        bombInformation.unansweredIndicators[d] = true;
    });
    
    var span = d3.select("#lit-indicators")
            .selectAll()
            .data(indicators)
            .enter()
            .append("span");
    
    span.append("span")
        .classed("small-button", true)
        .text(function(d) { return d+"?"; })
        .on("click", function(d) {
            bombInformation.litIndicators[d] = true;
            bombInformation.unlitIndicators[d] = false;
            bombInformation.unansweredIndicators[d] = false;
        });
    span.append("span")
        .classed("tiny-button", true)
        .text("Y")
        .on("click", function(d) {
            bombInformation.litIndicators[d] = true;
            bombInformation.unlitIndicators[d] = false;
            bombInformation.unansweredIndicators[d] = false;
        });
    span.append("span")
        .classed("tiny-button", true)
        .text("N")
        .on("click", function(d) {
            bombInformation.litIndicators[d] = false;
            bombInformation.unlitIndicators[d] = true;
            bombInformation.unansweredIndicators[d] = false;
        });
    span.append("span").style("padding-left", "5px")
        .style("display", function(d, i) {
            if (i % 4 == 3)
                return "block";
            else
                return "inherit";
        });
    
    //////////////////////////////////////////////////////////////////////////
    // last serial number digit UI
  
    d3.select("#sn-even").on("click", function() {
        d3.select("#sn-odd").property("checked", false);
        bombInformation.lastDigitIsOdd = false;
        bombInformation.lastDigitIsEven = true;
        updateUI();
    });
    d3.select("#sn-odd").on("click", function() {
        d3.select("#sn-even").property("checked", false);
        bombInformation.lastDigitIsOdd = true;
        bombInformation.lastDigitIsEven = false;
        updateUI();
    });

}

//////////////////////////////////////////////////////////////////////////////
// Simple Wires

var simpleWires = {
    nWires: undefined,
    selections: [],
    
    guessWire: function() {
        var that = this;
        function count(color) {
            return _.filter(that.selections.slice(0,that.nWires),
                            function(c) { return c === color; }).length;
        }
        function lastWireIs(color) {
            return that.selections[that.nWires] === color;
        }
        switch (this.nWires) {
        /* 3 wires:
         If there are no red wires, cut the second wire.
         Otherwise, if the last wire is white, cut the last wire.
         Otherwise, if there is more than one blue wire, cut the last blue wire.
         Otherwise, cut the last wire.*/
        case 3:
            if (count("red") === 0) { return "second"; }
            if (lastWireIs("white")) { return "last"; }
            if (count("blue") > 1) { return "last blue"; }
            return "last";
        /*
         4 wires:
         If there is more than one red wire and the last digit of the serial number is odd, cut the last red wire.
         Otherwise, if the last wire is yellow and there are no red wires, cut the first wire.
         Otherwise, if there is exactly one blue wire, cut the first wire.
         Otherwise, if there is more than one yellow wire, cut the last wire.
         Otherwise, cut the second wire. */
        case 4:
            if (count("red") > 1) {
                if (bombInformation.lastDigitIsOdd) { return "last red"; }
                if (!bombInformation.lastDigitIsOdd &&
                    !bombInformation.lastDigitIsEven)
                    return "[[WHAT'S LAST DIGIT OF SERIAL NUMBER?]]";
            }
            if (lastWireIs("yellow") && (count("red") === 0)) { return "first"; }
            if (count("blue") === 1) { return "first"; }
            if (count("yellow") > 1) { return "last"; }
            return "second";
        
        /*
         5 wires:
         If the last wire is black and the last digit of the serial number is odd, cut the fourth wire.
         Otherwise, if there is exactly one red wire and there is more than one yellow wire, cut the first wire.
         Otherwise, if there are no black wires, cut the second wire.
         Otherwise, cut the first wire.
         */
        case 5:
            if (lastWireIs("black")) {
                if (bombInformation.lastDigitIsOdd) { return "fourth"; }
                if (!bombInformation.lastDigitIsOdd && !bombInformation.lastDigitIsEven)
                    return "[[WHAT'S LAST DIGIT OF SERIAL NUMBER?]]";
            }
            if (count("red") === 1 && count("yellow") > 1) { return "first"; }
            if (count("black") === 0) { return "second"; }
            return "first";
            
        /*6 wires:
         If there are no yellow wires and the last digit of the serial number is odd, cut the third wire.
         Otherwise, if there is exactly one yellow wire and there is more than one white wire, cut the fourth wire.
         Otherwise, if there are no red wires, cut the last wire.
         Otherwise, cut the fourth wire.        */
        case 6:
            if (count("yellow") === 0) {
                if (bombInformation.lastDigitIsOdd) { return "third"; }
                if (!bombInformation.lastDigitIsOdd &&
                    !bombInformation.lastDigitIsEven)
                    return "[[WHAT'S LAST DIGIT OF SERIAL NUMBER?]]";
            }
            if (count("yellow") === 1 && count("white") > 1) { return "fourth"; }
            if (count("red") === 0) { return "last"; }
            return "fourth";
        }       
        return "(choose a wire count)";
    },
    updateUI: function() {
        d3.select("#simpleWires-answer").text(this.guessWire());
    }
};

function setupSimpleWires() {

    //////////////////////////////////////////////////////////////////////////
    // number of wires UI

    var nWiresButtons = createToggleButtonSet(
        [3,4,5,6], d3.select("#simpleWires-n"), function(d) { return d; });
    
    nWiresButtons
        .on("click", function(d) {
            simpleWires.nWires = d;
            console.log(d, simpleWires.nWires);
            wireDivs.style("display", null);
            wireDivs.filter(function(d2) {
                return d2 > d;
            }).style("display", "none");
            updateUI();
        });
    
    //////////////////////////////////////////////////////////////////////////
    // which wires UI
    
    var data = [1,2,3,4,5,6];
    var wires = [ { name: "r", color: "red", textColor: "white" },
                  { name: "g", color: "green", textColor: "white" },
                  { name: "b", color: "blue", textColor: "white" },
                  { name: "y", color: "yellow" },
                  { name: "w", color: "white" },
                  { name: "k", color: "black", textColor: "white" } ];
    var wireDivs = d3.select("#simpleWires-wires")
        .selectAll("div")
        .data(data)
        .enter()
            .append("div");

    wireDivs.append("span").text(function(d) { return d; })
        .style("width", 50)
        .style("display", "inline-block")
    ;
    
    wireDivs.selectAll()
        .data(function(d) {
            return wires.map(function(wire) {
                return _.defaults({ which: d }, wire);
            });
        })
        .enter()
        .append("span")
        .classed("wire-button", true)
        .on("click", function(d) {
            console.log("Clicked " + d.which + " " + d.color);
            simpleWires.selections[d.which] = d.color;
            updateUI();
            d3.select("#simpleWires-wires")
                .selectAll("div")
                .filter(function(d2) {
                    return d.which === d2;
                }).selectAll("div > span")
                .filter(function(d) {
                    return d !== undefined;
                })
                .classed("unselected", true);
            d3.select(this).classed("unselected", false);
        })
        .style("background-color", function(d) { return d.color; })
        .style("color", function(d) { return d.textColor || "black"; })
        .append("span")
        .classed("wire-caption", true)
        .text(function(d) { return d.color; })
    ;
}

//////////////////////////////////////////////////////////////////////////////

var button = {
    selectedColor: undefined,
    selectedWord: undefined,
    selectedStripColor: undefined,
    updateUI: function() {
        var that = this;
        function buttonIs(color) {
            return that.selectedColor === color;
        }
        function buttonSays(word) {
            return that.selectedWord === word;
        }
        function stripColorClicked() {
            return that.selectedStripColor !== undefined;
        }
        
        var action1 = "[[more information needed]]";
        var action2 = "[[more information needed]]";
        var holding = false;
        
        function hold() {
            action1 = "Hold";
            holding = true;
        };
        function pressAndRelease() {
            action1 = "Press and immediately release";
            holding = false;
        }
        function fillOutLitIndicators() {
            action1 = "[[REPORT LIT INDICATORS]]";
            holding = false;
        }
        function fillOutBatteryCount() {
            action1 = "[[REPORT BATTERY COUNT]]";
            holding = false;
        }
        /*
         1. If the button is blue and the button says "Abort", hold the button and refer
         to "Releasing a Held Button".
         2. If there is more than 1 battery on the bomb and the button says "Detonate",
         press and immediately release the button.
         3. If the button is white and there is a lit indicator with label CAR, hold the
         button and refer to "Releasing a Held Button".
         4. If there are more than 2 batteries on the bomb and there is a lit indicator
         with label FRK, press and immediately release the button.
         5. If the button is yellow, hold the button and refer to "Releasing a Held
         Button".
         6. If the button is red and the button says "Hold", press and immediately
         release the button.
         7. If none of the above apply, hold the button and refer to "Releasing a Held
         Button".
         */
        if (buttonIs("blue") && buttonSays("Abort")) {
            hold();
        } else if (buttonSays("Detonate")) {
            if (bombInformation.batteryCount === undefined) {
                fillOutBatteryCount();
            } else if (bombInformation.batteryCount > 1) {
                pressAndRelease();
            } else if (buttonIs("white")) {
                if (!bombInformation.unansweredIndicators.CAR) {
                    fillOutLitIndicators();
                } else if (bombInformation.litIndicators.CAR) {
                    hold();
                } else if (bombInformation.batteryCount > 2 && bombInformation.litIndicators.FRK) {
                    pressAndRelease();
                } else if (buttonIs("yellow")) {
                    hold();
                } else if (buttonIs("red") && buttonSays("Hold")) {
                    pressAndRelease();
                } else {
                    hold();
                }
            }
        }

        if (holding && !stripColorClicked()) {
            action2 = " and [[TELL ME WHAT COLOR THE STRIP IS]]";
        } else if (holding) {
            var numberMap = { "blue": 4, "white": 1, "yellow": 5, "[[other]]": 1 };
            var number = numberMap[that.selectedStripColor];
            action2 = " and release when the countdown timer has a " + number + " in any position.";
        } else {
            action2 = ".";
        }
        
        d3.select("#button-action-1").text(action1);
        d3.select("#button-action-2").text(action2);
    }
};

function setupButton()
{
    var buttonColors = [
        { backgroundColor: "blue", caption: "blue", color: "white" },
        { backgroundColor: "white", caption: "white" },
        { backgroundColor: "yellow", caption: "yellow" },
        { backgroundColor: "red", caption: "red" }, 
        { backgroundColor: "white", caption: "[[other]]" }
    ];
    var buttonWords = ["Abort", "Detonate", "Hold", "[[other]]"];
    var stripColors = [
        { backgroundColor: "blue", caption: "blue", color: "white" },
        { backgroundColor: "white", caption: "white" },
        { backgroundColor: "yellow", caption: "yellow" },
        { backgroundColor: "white", caption: "[[other]]" }
    ];

    var colorButtons = createToggleButtonSet(
        buttonColors, d3.select("#button-colors"), function(d) {
            return d.caption;
        }).style("background-color", function(d) {
            return d.backgroundColor;
        }).style("color", function(d) {
            return d.color || "black";
        }).on("click", function(d) {
            button.selectedColor = d;
            updateUI();
        });

    var wordButtons = createToggleButtonSet(
        buttonWords, d3.select("#button-words"), function(d) {
            return d;
        }).on("click", function(d) {
            button.selectedWord = d.caption;
            updateUI();
        });

    var stripColorButtons = createToggleButtonSet(
        stripColors, d3.select("#button-strips"), function(d) {
            return d.caption;
        }).style("background-color", function(d) {
            return d.backgroundColor;
        }).style("color", function(d) {
            return d.color || "black";
        }).on("click", function(d) {
            button.selectedStripColor = d.caption;
            updateUI();
        });
}

//////////////////////////////////////////////////////////////////////////////

function updateUI() {
    simpleWires.updateUI();
    button.updateUI();
}

window.onload = function() {
    setupBombInformationUI();
    setupSimpleWires();
    setupButton();
    updateUI();
};


