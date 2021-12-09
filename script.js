let rows = 10;
let columns = 25;

// Arbitrary size of the graph

var graphElement = document.getElementById('graph');
let line;
let hasBeginningNode = false;
let hasTargetNode = false;
const graphArray = [];
let beginningNode, beginningi, beginningj; // the beginning node and it's coordinates
let targetNode, targeti, targetj; // the target node and it's coordinates


// Build the html graph and the two dimensional graphArray
for (let i = 0; i < rows; i++) {
    line = document.createElement('div');
    line.setAttribute("class", "line");
    graphArray[i] = [];
    for (let j = 0; j < columns; j++) {
        const node = document.createElement('div');
        // A root node is either a target node or the beginning node
        node.addEventListener('click', () => {
            // this will execute if the beginning node has been selected
    if (hasBeginningNode) { 
        targeti = i;
        targetj = j;
        node.setAttribute("id", "targetNode");
        hasTargetNode = true;
    }
    // this will execute if the beginning node has not been selected
    else {
        hasBeginningNode = true;
        beginningi = i;
        beginningj = j;
        node.setAttribute("id", "beginningNode");
    }
        })
        node.setAttribute("class", "node");
        graphArray[i][j] = node;
        line.appendChild(node);
    }
    graphElement.appendChild(line);
}

function dijkstrasAlgorithm() {
    
}