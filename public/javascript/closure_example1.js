// Make a function that assigns event handler functions to an array of nodes. 
//When you click on a node, an alert box is supposed to display the index
// of the node.


var add_the_handlers = function (nodes) {
    var i;
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = (function (nodeIndex) {
            return function(e){
                alert(nodeIndex);
            }
        })(i);
    }
}