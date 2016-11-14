var editor = ace.edit("editor");
editor.setTheme("ace/theme/solarized_light");
editor.getSession().setMode("ace/mode/javascript");

function writeDomText(node)
{
    var text = node && prettyPrintDOM(node) || "";
    d3.select("#domText").text(text);
}

function reset()
{
    d3.select("#preview").selectAll("*").remove();
    d3.select("#preview")
        .append("svg")
        .attr("id", "svg");
    d3.select("#reports").text("\n");
    resetDrill();
    writeDomText(document.getElementById("svg"));
}

function writeReport(report)
{
    if (report.length === 0) {
        d3.select("#reports").text("\n");
    } else {
        d3.select("#reports").text(report.join("\n"));
    }
}

function prettyPrintDOM(element)
{
    var result = [];
    function prettyPrintDOMInner(element, indent)
    {
        var is = ' '.repeat(indent), i;
        var attrs = [];
        for (i=0; i<element.attributes.length; ++i) {
            attrs.push(' ' + element.attributes[i].nodeName.toLocaleLowerCase() + '="' + element.attributes[i].nodeValue + '"');
        }
        var openTag = '<' + element.nodeName.toLocaleLowerCase() + attrs.join('') + '>';
        var closeTag = '</' + element.nodeName.toLocaleLowerCase() + '>';
        if (element.childNodes.length === 0) {
            result.push(is + openTag + closeTag);
        } else {
            result.push(is + openTag);
            for (i=0; i<element.childNodes.length; ++i) {
                prettyPrintDOMInner(element.childNodes[i], indent+2);
            }
            result.push(is + '</' + element.nodeName.toLocaleLowerCase() + '>');
        }
    }
    prettyPrintDOMInner(element, 0);
    return result.join('\n');
}

//////////////////////////////////////////////////////////////////////////////

drillChecks = {
    isSelection: {
        test: function(sel, data, result) {
            // does it smell like a d3 selection object?
            return result && result._groups;
        },
        error: function(sel, data, result) {
            return "Expected d3 selection object, got " + (typeof result) + " instead.";
        },
        stopIfFailed: true,
        name: "returns selection object"
    },
    selectionContainsOnlyGivenElementName: function(nodeName) {
        nodeName = nodeName.toLocaleLowerCase();
        return {
            test: function(sel, data, result) {
                return result.filter(function(d) {
                    return this.nodeName.toLocaleLowerCase() === nodeName;
                }).nodes().length == result.nodes().length;
            },
            error: function(sel, data, result) {
                var counterExample = result.filter(function(d) { return this.nodeName !== nodeName; }).node();
                return ("Expected selection to only contain " + nodeName +
                        " elements, but found " + counterExample.nodeName.toLocaleLowerCase() + " instead.");
            },
            name: "selection has only " + nodeName + " elements."
        };
    },
    selectionHasLength: function(l) {
        return {
            test: function(sel, data, result) {
                return result.nodes().length === l;
            },
            error: function(sel, data, result) {
                return ("Expected selection to only contain " + String(l) + " elements, but found " + result.nodes().length + " instead.");
            },
            name: "selection has " + l + " elements."
        };
    },
    selectionPassesPredicate: function(p, counterExampleAccessor, name) {
        return {
            test: function(sel, data, result) {
                return result.filter(p).nodes().length === result.nodes().length;
            },
            error: function(sel, data, result) {
                var counterExample = result.filter(function(d) { return !p.call(this, d); }).node();
                return ("Did not expect element " + prettyPrintDOM(counterExample) + " in selection to have " + counterExampleAccessor(counterExample) + ".");
            },
            name: name
        };
    }
};

//////////////////////////////////////////////////////////////////////////////

function run()
{
    var f, results;
    reset();
    try {
        f = eval("(" + editor.getValue() + ")");
    } catch (e) {
        results = ["Compilation failed: " + e.toString()];
        if (e.lineNumber)
            results.push("Line number: " + String(e.lineNumber));
        writeReport(results);
        return;
    }
    var setup_values = setup();
    var function_result = f.apply(null, setup_values);
    setup_values.push(function_result);
    results = check.apply(null, setup_values);
    writeReport(results);
    writeDomText(setup_values[0] && setup_values[0].node());
}
        
d3.select("#run")
    .append("button")
    .text("Run")
    .on("click", run);

d3.select("#reset")
    .append("button")
    .text("Reset")
    .on("click", reset);

function init()
{
    editor.setValue(String(skeleton()));
}

function makeChecker(calls)
{
    return function(sel, data, result) {
        var report = [];
        for (var i=0; i<calls.length; ++i) {
            var passed = false;
            try {
                passed = calls[i].test(sel, data, result);
                if (!passed) {
                    report.push("Failed: " + calls[i].error(sel, data, result));
                }
            } catch (e) {
                report.push("Error: Couldn't run check for '" + calls[i].name + "': " + e.toString());
            }
            if (!passed && calls[i].stopIfFailed)
                break;
        }
        if (report.length === 0)
            report.push("Success!");
        return report;
    };
}

init();
reset();

editor.focus();
editor.gotoLine(4, editor.getSession().getLine(4).length);

editor.commands.addCommand({
    name: "replace",
    bindKey: {win: "Ctrl-Enter", linux: "Ctrl-Enter", mac: "Ctrl-Enter"},
    exec: function() { run(); }
});
