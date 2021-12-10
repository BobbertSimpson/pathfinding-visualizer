
// Classes
class priorityQueue {
    constructor(comparator) {
        this.queue = [-1];
        this.index = 1;
        this.comparator = comparator;
    }
    enqueueElement(element) {
        this.queue[this.index] = element;
        this.swim(this.index); // recursively return the array into heap order
        this.index++;
    }
    swim(index) {
        if (index === 1) {
            return;
        }
        let indexHeap = Math.floor(index/2);
        if (this.comparator(this.queue[index], this.queue[indexHeap]) === -1) {
            this.swap(index, indexHeap);
            this.swim(indexHeap);
        }
        return;
    }
    swap(a, b) {
        let temp = this.queue[a];
        this.queue[a] = this.queue[b];
        this.queue[b] = temp;
    }
    min() {
        return this.queue[1];
    }
    dequeue() {
        if (this.index === 1) {
            alert("Something went wrong!");
        }
        this.index--;
        this.swap(this.index, 1);
        this.sink(1);
        return this.queue[this.index];

    }
    sink(index) {
        let leftChild = 2 * index;
        let rightChild = 2 * index + 1;
        if (leftChild < this.index) {
            if (this.comparator(this.queue[index], this.queue[leftChild]) === 1) {
                this.swap(index, leftChild);
                this.sink(leftChild);
            }
            else if (rightChild < this.index && this.comparator(this.queue[index], this.queue[rightChild] === 1)) {
                this.swap(index, rightChild);
                this.sink(rightChild);
            }
        }
        return;
    }
    isEmpty() {
        return this.index == 1;
    }
}



const rows = 10;
const columns = 25;

// Arbitrary size of the graph

const graphElement = document.getElementById('graph');
let line;
let hasBeginningNode = false;
let hasTargetNode = false;
const graphArray = [];
let beginningNode; // the beginning node and it's coordinates
let targetNode; // the target node and it's coordinates


// Build the html graph and the two dimensional graphArray
for (let i = 0; i < rows; i++) {
    line = document.createElement('div');
    line.setAttribute("class", "line");
    graphArray[i] = [];
    for (let j = 0; j < columns; j++) {
        const node = document.createElement('div');
        // Adding values that are needed for the search algorithms
        node.distance = Infinity;
        node.i = i;
        node.j = j;
        // A root node is either a target node or the beginning node
        node.addEventListener('click', () => {
            // this will execute if the beginning node has been selected
            if (hasBeginningNode && !(beginningNode.i === i && beginningNode.j === j) && !hasTargetNode) { 
                targetNode = node;
                node.setAttribute("id", "targetNode");
                hasTargetNode = true;
            }
    // this will execute if the beginning node has not been selected
            else if (!hasTargetNode){
                beginningNode = node;
                node.setAttribute("id", "beginningNode");
                hasBeginningNode = true;
            }
                })
        node.setAttribute("class", "node");
        graphArray[i][j] = node;
        line.appendChild(node);
    }
    graphElement.appendChild(line);
}
document.getElementById("dijkstrasAlgorithm").addEventListener("click", dijkstrasAlgorithm);

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
    const dijkstrasPQ = new priorityQueue(dijkstrasComparator);
    if (!hasBeginningNode || !hasTargetNode) {
        return;
    }
    beginningNode.distance = 0;
    startArray = getDijkstrasNeighbors(beginningNode.i, beginningNode.j);
    console.log(startArray);
    for (let i = 0; i < startArray.length; i++) {
        dijkstrasPQ.enqueueElement(graphArray[startArray[i][0]][startArray[i][1]]);
    }
    console.log("THE WHILE LOOP BEGAN");
    while (!dijkstrasPQ.isEmpty()) {
        let currentNode = dijkstrasPQ.dequeue();
        if (currentNode.i == targetNode.i && currentNode.j == targetNode.j) {
            break;
        }
        let currentArray =  getDijkstrasNeighbors(currentNode.i, currentNode.j);
        console.log(currentArray);
        for (let i = 0; i < currentArray.length; i++) {
            dijkstrasPQ.enqueueElement(graphArray[currentArray[i][0]][currentArray[i][1]]);
        } 
    }
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


function getDijkstrasNeighbors(i, j) {
    console.log(i + ", " + j + " entered the neighbors function");
    let neighbors = [];
    const currentNode = graphArray[i][j];
    if (i + 1 < rows && graphArray[i + 1][j].distance > currentNode.distance + 1) {
        let top = graphArray[i + 1][j];
        neighbors.push([i + 1, j]);
        top.from = currentNode;
        top.distance = currentNode.distance + 1;
        top.classList.add("searched");
    }
    if (i - 1 > -1 && graphArray[i - 1][j].distance > currentNode.distance + 1) {
        let bottom = graphArray[i - 1][j]
        neighbors.push([i - 1, j]);
        bottom.from = currentNode;
        bottom.distance = currentNode.distance + 1;
        bottom.classList.add("searched");
    }
    if (j + 1 < columns && graphArray[i][j + 1].distance > currentNode.distance + 1) {
        let right = graphArray[i][j + 1];
        neighbors.push([i, j + 1]);
        right.from = currentNode;
        right.distance = currentNode.distance + 1;
        right.classList.add("searched");
    }
    if (j - 1 > -1 && graphArray[i][j - 1].distance > currentNode.distance + 1) {
        let left = graphArray[i][j - 1];
        neighbors.push([i, j - 1]);
        left.from = currentNode;
        left.distance = currentNode.distance + 1;
        left.classList.add("searched");
    }
    return neighbors;
}