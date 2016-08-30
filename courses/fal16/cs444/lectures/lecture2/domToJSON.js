function nodeToJSON(node)
{
    var children = node.childNodes, i;
    var result = {
        name: node.nodeName,
        value: node.nodeValue,
        attributes: [],
        children: []
    };
    if (node.nodeType === document.ELEMENT_NODE) {
        for (i=0; i<node.attributes.length; ++i) {
            result.attributes.push({ name: node.attributes[i].name,
                                     value: node.attributes[i].value });
        }
    }
    for (i=0; i<children.length; ++i) {
        result.children.push(nodeToJSON(children[i]));
    }
    return result;
}

function deepCopy(v)
{
    return JSON.parse(JSON.stringify(v));
}

function domToJSON()
{
    return nodeToJSON(document.documentElement);
}
