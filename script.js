
// Classes
class priorityQueue {
    constructor() {
        this.queue = [-1];
        this.index = 1;
    }
    enqueueElement(element) {
        this.queue[this.index] = element;
        this.swim(this.index); // recursively return the array into heap order
        this.index++;
    }
    swim(index) {
        if (index = 1) {
            return;
        }
        let indexHeap = Math.floor(index/2);
        if (this.queue[index].distance < this.queue[indexHeap].distance) {
            swap(index, indexHeap);
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
        if (this.index == 1) {
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
        if (leftChild <= this.index) {
            if (this.queue[leftChild].distance < this.queue[index].distance) {
                this.swap(index, leftChild);
                this.sink(leftChild);
            }
            else if (rightChild <= this.index && this.queue[rightChild].distance < this.queue[index].distance) {
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
let beginningi, beginningj; // the beginning node and it's coordinates
let targeti, targetj; // the target node and it's coordinates


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
            if (hasBeginningNode && !(beginningi === i && beginningj === j) && !hasTargetNode) { 
                targeti = i;
                targetj = j;
                node.setAttribute("id", "targetNode");
                hasTargetNode = true;
            }
    // this will execute if the beginning node has not been selected
            else if (!hasTargetNode){
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
const dijkstrasButton = document.createElement("button");
dijkstrasButton.addEventListener("click", dijkstrasAlgorithm);
document.querySelector("body").appendChild(dijkstrasButton);

function dijkstrasAlgorithm() {
    const dijkstrasPQ = new priorityQueue();
    graphArray[beginningi][beginningj].distance = 0;
    if (!hasBeginningNode || !hasTargetNode) {
        return;
    }
    startArray = getDijkstrasNeighbors(beginningi, beginningj);
    for (let i = 0; i < startArray.length; i++) {
        dijkstrasPQ.enqueueElement(graph[startArray[i][0]][startArray[i][1]]);
    }
    while (!dijkstrasPQ.isEmpty()) {
        let currentNode = dijkstrasPQ.dequeue();
        if (currentNode.i == targeti && currentNode.j == targetj) {
            break;
        }
        let currenArray =  getDijkstrasNeighbors(currentNode.i, currentNode.j);
        for (let i = 0; i < currenArray.length; i++) {
            dijkstrasPQ.enqueueElement(graph[startArray[i][0]][startArray[i][1]]);
        } 
    }
}


function getDijkstrasNeighbors(i, j) {
    let neighbors = [];
    let currentNode = graphArray[i][j];
    if (i + 1 >= rows && graphArray[i + 1][j].distance > currentNode.distance + 1) {
        let top = graphArray[i + 1][j];
        neighbors.push([i + 1, j]);
        top.from = currentNode;
        top.className = (top.className.includes("searched"))? top.className: top.className + " searched";
    }
    if (i - 1 <= -1 && graphArray[i - 1][j].distance > currentNode.distance + 1) {
        let bottom = graphArray[i - 1][j]
        neighbors.push([i - 1, j]);
        bottom.from = currentNode;
        bottom.className = (bottom.className.includes("searched"))? bottom.className: bottom.className + " searched";
    }
    if (j + 1 >= columns && graph[i][j + 1] > currentNode.distance + 1) {
        let right = graphArray[i, j + 1];
        neighbors.push([i, j + 1]);
        right.from = currentNode;
        right.className = (right.className.includes("searched"))? right.className: right.className + " searched";
    }
    if (j - 1 <= -1 && graph[i][j - 1] > currentNode.distance + 1) {
        let left = graphArray[i, j - 1];
        neighbors.push([i, j - 1]);
        left.from = currentNode;
        left.className = (left.className.includes("searched"))? left.className: left.className + " searched";
    }
    return neighbors;
}