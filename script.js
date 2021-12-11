// Add the needed properties for the node
function constructNode(row, column) {
    const node = document.createElement('td');
    node.distance = Infinity;
    node.row = row;
    node.column = column;
    node.setAttribute("class", "node");
    if (row === beginningNodeRow && column === beginningNodeColumn) { 
        makeBeginningNode(node);
    }
    else if (row === targetNodeRow && column === targetNodeColumn){
        makeTargetNode(node);
    }
    return node;
}
function makeTargetNode(node) {
    targetNode = node;
    node.id = "targetNode";
}
function makeBeginningNode(node) {
    beginningNode = node;
    beginningNode.id ="beginningNode";
}
function refreshGraph() {
    for (let row = 0; row < numberOfRows; row++) {
        for (let column = 0; column < numberOfColumns; column++) {
            refreshNode(row, column);
        }
    }
    alreadySearched = false;
}
// Reset the node to it's innitial state
function refreshNode(row, column) {
    let node = graphArray[row][column];
    node.distance = Infinity;
    node.from = undefined;
    node.classList.remove("searched");
    node.classList.remove("path");
}
// Arbitrary size of the graph
const numberOfRows = 15;
const numberOfColumns = 50;

// original position of the beginning and end nodes
let beginningNodeRow = Math.floor(numberOfRows/2);
let beginningNodeColumn = Math.floor(numberOfColumns/6);
let targetNodeColumn = Math.floor(numberOfColumns/6) * 5
let targetNodeRow = Math.floor(numberOfRows/2);

const graphElement = document.getElementById('graph');
const graphArray = [];
let beginningNode;
let targetNode;
let alreadySearched = false; 

// Activate the buttons
document.getElementById("dijkstrasAlgorithm").addEventListener("click", dijkstrasAlgorithm);
document.getElementById("breadthFirstSearch").addEventListener("click", breadthFirstSearch);
document.getElementById("deapthFirstSearch").addEventListener("click", deapthFirstSearch);
document.getElementById("reset").addEventListener("click", refreshGraph);

// Build the html graph and the two dimensional graphArray
for (let row = 0; row < numberOfRows; row++) {
    line = document.createElement('tr');
    line.setAttribute("class", "line");
    graphArray[row] = [];
    for (let column = 0; column < numberOfColumns; column++) {
        const node = constructNode(row, column);
        graphArray[row][column] = node;
        line.appendChild(node);
    }
    graphElement.appendChild(line);
}

function dijkstrasComparator(node1, node2) {
    if (node1.distance > node2.distance) {
        return 1;
    }
    else if (node1.distance === node2.distance) {
        return 0;
    }
    else {
        return -1;
    }
}
function dijkstrasAlgorithm() {
    if (alreadySearched) {
        return;
    }
    const dijkstrasPQ = new minPriorityQueue(dijkstrasComparator);
    beginningNode.distance = 0;
    startArray = getDijkstrasNeighbors(beginningNode.row, beginningNode.column);
    console.log(startArray);
    for (let i = 0; i < startArray.length; i++) {
        dijkstrasPQ.enqueueElement(startArray[i]);
    }

    console.log("THE WHILE LOOP BEGAN");
    while (!dijkstrasPQ.isEmpty()) {
        let currentNode = dijkstrasPQ.dequeue();
        if (currentNode === targetNode) {
            break;
        }
        let currentArray =  getDijkstrasNeighbors(currentNode.row, currentNode.column);
        console.log(currentArray);
        for (let i = 0; i < currentArray.length; i++) {
            dijkstrasPQ.enqueueElement(currentArray[i]);
        } 
    }
    showAnswer();
    alreadySearched = true;
}
function showAnswer() {
    if (targetNode.className.includes("searched")) {
        let node = targetNode;
        while (node !== beginningNode) {
            node.classList.add("path");
            node = node.from;
            setTimeout(() => {node.classList.add("path")}, 1000);
        }
    }
    else {
        console.log("Couldn't find")
    }
}
function getDijkstrasNeighbors(row, column) {
    let neighbors = [];
    const currentNode = graphArray[row][column];
    if (row + 1 < numberOfRows && graphArray[row + 1][column].distance > currentNode.distance + 1) {
        let top = graphArray[row + 1][column];
        neighbors.push(top);
        top.from = currentNode;
        top.distance = currentNode.distance + 1;
        top.classList.add("searched");
    }
    if (row - 1 > -1 && graphArray[row - 1][column].distance > currentNode.distance + 1) {
        let bottom = graphArray[row - 1][column];
        neighbors.push(bottom);
        bottom.from = currentNode;
        bottom.distance = currentNode.distance + 1;
        bottom.classList.add("searched");
    }
    if (column + 1 < numberOfColumns && graphArray[row][column + 1].distance > currentNode.distance + 1) {
        let right = graphArray[row][column + 1];
        neighbors.push(right);
        right.from = currentNode;
        right.distance = currentNode.distance + 1;
        right.classList.add("searched");
    }
    if (column - 1 > -1 && graphArray[row][column - 1].distance > currentNode.distance + 1) {
        let left = graphArray[row][column - 1];
        neighbors.push(left);
        left.from = currentNode;
        left.distance = currentNode.distance + 1;
        left.classList.add("searched");
    }
    return neighbors;
}

function breadthFirstSearch() {
    if (alreadySearched) {
        return;
    }
    const queue = getNeighbors(beginningNode.row, beginningNode.column);
    while (queue.length !== 0) {
        let currentNode = queue.shift();
        if (currentNode === targetNode) {break;}
        let currentArray = getNeighbors(currentNode.row, currentNode.column);
        for (let i = 0; i < currentArray.length; i++) {
            queue.push(currentArray[i]);
        }
    }
    showAnswer();
    alreadySearched = true;
}

function deapthFirstSearch() {
    if (alreadySearched) {
        return;
    }
    const stack = getNeighbors(beginningNode.row, beginningNode.column);
    while (stack.length !== 0) {
        let currentNode = stack.pop();
        if (currentNode === targetNode) {break;}
        let currentArray = getNeighbors(currentNode.row, currentNode.column);
        for (let i = 0; i < currentArray.length; i++) {
            stack.push(currentArray[i]);
        }
    }
    showAnswer();
    alreadySearched = true;
}

function getNeighbors(row, column) {
    let neighbors = [];
    let currentNode = graphArray[row][column];
    if (row - 1 > -1 && !graphArray[row - 1][column].className.includes("searched")) {
        let bottom = graphArray[row - 1][column];
        neighbors.push(bottom);
        bottom.from = currentNode;
        bottom.classList.add("searched");
    }
    if (column + 1 < numberOfColumns && !graphArray[row][column + 1].className.includes("searched")) {
        let right = graphArray[row][column + 1];
        neighbors.push(right);
        right.from = currentNode;
        right.classList.add("searched");
    }
    if (row + 1 < numberOfRows && !graphArray[row + 1][column].className.includes("searched")) {
        let top = graphArray[row + 1][column];
        neighbors.push(top);
        top.from = currentNode;
        top.classList.add("searched");
    }
    if (column - 1 > -1 && !graphArray[row][column - 1].className.includes("searched")) {
        let left = graphArray[row][column - 1];
        neighbors.push(left);
        left.from = currentNode;
        left.classList.add("searched");
    }
    return neighbors;
}