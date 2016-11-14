// Here is a list with objects that specify some buttons.
var buttonList = [
    {
        name: "button1",
        text: "Button 1",
        click: function() { alert("You clicked on button 1!"); }
    },
    {
        name: "button2",
        text: "Button 2",
        click: function() { alert("You clicked on button 2!"); }
    }
];

// In the same way that we have been using d3 to create SVG elements,
// we can use d3 to create buttons and give them attributes.
//
// The only new feature in the code below is the use of the on()
// method, which defines *event handlers*.  In this case, we are
// telling d3 to call a function in the event that a button is
// clicked.

d3.select("#main")
    .selectAll("button")
    .data(buttonList)
    .enter()
    .append("button")
    .attr("id", function(d) { return d.name; })
    .text(function(d) { return d.text; })
    .on("click", function(d) {
        // Since the button is bound to the objects from buttonList,
        // the expression below calls the click function from either
        // of the two button specifications in the list.
        return d.click();
    });
