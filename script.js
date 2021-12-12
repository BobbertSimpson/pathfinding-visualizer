// Arbitrary size of the graph
const numberOfRows = 15;
const numberOfColumns = 50;

// original position of the beginning and end nodes
let beginningNodeRow = Math.floor(numberOfRows / 2);
let beginningNodeColumn = Math.floor(numberOfColumns / 6);
let targetNodeColumn = Math.floor(numberOfColumns / 6) * 5;
let targetNodeRow = Math.floor(numberOfRows / 2);

const graphElement = document.getElementById("graph");
const graphArray = [];
let beginningNode;
let targetNode;
let alreadySearched = false;

// Activate the buttons
document.getElementById("dijkstrasAlgorithm").addEventListener("click", () => {
  dijkstrasAlgorithm(dijkstrasComparator);
});
document
  .getElementById("breadthFirstSearch")
  .addEventListener("click", breadthFirstSearch);
document
  .getElementById("deapthFirstSearch")
  .addEventListener("click", deapthFirstSearch);
document.getElementById("reset").addEventListener("click", refreshGraph);
document.getElementById("aStarEuclid").addEventListener("click", aStarEuclid);
document
  .getElementById("aStarManhattan")
  .addEventListener("click", aStarManhattan);

// Build the html graph and the two dimensional graphArray
for (let row = 0; row < numberOfRows; row++) {
  line = document.createElement("tr");
  line.setAttribute("class", "line");
  graphArray[row] = [];
  for (let column = 0; column < numberOfColumns; column++) {
    const node = constructNode(row, column);
    graphArray[row][column] = node;
    line.appendChild(node);
  }
  graphElement.appendChild(line);
}

function makeTargetNode(node) {
  targetNode = node;
  node.id = "targetNode";
}
function makeBeginningNode(node) {
  beginningNode = node;
  beginningNode.id = "beginningNode";
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
  node.distanceTo = Infinity;
  node.from = undefined;
  node.classList.remove("searched");
  node.classList.remove("path");
}

// Add the needed properties for the node
function constructNode(row, column) {
  const node = document.createElement("td");
  node.distanceTo = Infinity;
  node.row = row;
  node.column = column;
  node.weight = 1;
  node.setAttribute("class", "node");
  node.isWall = false;
  if (row === beginningNodeRow && column === beginningNodeColumn) {
    makeBeginningNode(node);
  } else if (row === targetNodeRow && column === targetNodeColumn) {
    makeTargetNode(node);
  }
  return node;
}
function dijkstrasComparator(node1, node2) {
  if (node1.distanceTo > node2.distanceTo) {
    return 1;
  } else if (node1.distanceTo === node2.distanceTo) {
    return 0;
  } else {
    return -1;
  }
}
// implementation of dijkstras' algorithm
function dijkstrasAlgorithm(comparator) {
  if (alreadySearched) {
    refreshGraph();
  }
  const dijkstrasPQ = new minPriorityQueue(comparator);
  beginningNode.distanceTo = 0;
  startArray = getDijkstrasNeighbors(beginningNode.row, beginningNode.column);
  console.log(startArray);
  for (let i = 0; i < startArray.length; i++) {
    dijkstrasPQ.enqueueElement(startArray[i]);
  }

  while (!dijkstrasPQ.isEmpty()) {
    let currentNode = dijkstrasPQ.dequeue();
    if (currentNode === targetNode) {
      break;
    }
    let currentArray = getDijkstrasNeighbors(
      currentNode.row,
      currentNode.column
    );
    for (let i = 0; i < currentArray.length; i++) {
      dijkstrasPQ.enqueueElement(currentArray[i]);
    }
  }
  showAnswer();
  alreadySearched = true;
}

// shows the result of the search
function showAnswer() {
  if (targetNode.className.includes("searched")) {
    let node = targetNode;
    while (node !== beginningNode) {
      node.classList.add("path");
      node = node.from;
      setTimeout(() => {
        node.classList.add("path");
      }, 1000);
    }
  } else {
    return;
  }
}
// finds the neighbors for dijkstras' algorithm
function getDijkstrasNeighbors(row, column, checkState) {
  let neighbors = [];
  const currentNode = graphArray[row][column];
  // Every if statement checks whether the neighbor exists and that it's not a wall and that the path to it is the shortest path
  if (
    row + 1 < numberOfRows &&
    graphArray[row + 1][column].distanceTo >
      currentNode.distanceTo + graphArray[row + 1][column].weight &&
    !graphArray[row + 1][column].isWall
  ) {
    let top = graphArray[row + 1][column];
    neighbors.push(top);
    top.from = currentNode;
    top.distanceTo = currentNode.distanceTo + top.weight;
    top.classList.add("searched");
  }
  if (
    row - 1 > -1 &&
    graphArray[row - 1][column].distanceTo >
      currentNode.distanceTo + graphArray[row - 1][column].weight &&
    !graphArray[row - 1][column].isWall
  ) {
    let bottom = graphArray[row - 1][column];
    neighbors.push(bottom);
    bottom.from = currentNode;
    bottom.distanceTo = currentNode.distanceTo + bottom.weight;
    bottom.classList.add("searched");
  }
  if (
    column + 1 < numberOfColumns &&
    graphArray[row][column + 1].distanceTo >
      currentNode.distanceTo + graphArray[row][column + 1].weight &&
    !graphArray[row][column + 1].isWall
  ) {
    let right = graphArray[row][column + 1];
    neighbors.push(right);
    right.from = currentNode;
    right.distanceTo = currentNode.distanceTo + right.weight;
    right.classList.add("searched");
  }
  if (
    column - 1 > -1 &&
    graphArray[row][column - 1].distanceTo >
      currentNode.distanceTo + graphArray[row][column - 1].weight &&
    !graphArray[row][column - 1].isWall
  ) {
    let left = graphArray[row][column - 1];
    neighbors.push(left);
    left.from = currentNode;
    left.distanceTo = currentNode.distanceTo + left.weight;
    left.classList.add("searched");
  }
  return neighbors;
}

function breadthFirstSearch() {
  if (alreadySearched) {
    refreshGraph();
  }
  const queue = getNeighbors(beginningNode.row, beginningNode.column);
  while (queue.length !== 0) {
    let currentNode = queue.shift();
    if (currentNode === targetNode) {
      break;
    }
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
    refreshGraph();
  }
  const stack = getNeighbors(beginningNode.row, beginningNode.column);
  while (stack.length !== 0) {
    let currentNode = stack.pop();
    if (currentNode === targetNode) {
      break;
    }
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
  if (
    row - 1 > -1 &&
    !graphArray[row - 1][column].className.includes("searched") &&
    !graphArray[row - 1][column].isWall
  ) {
    let bottom = graphArray[row - 1][column];
    neighbors.push(bottom);
    bottom.from = currentNode;
    bottom.classList.add("searched");
  }
  if (
    column + 1 < numberOfColumns &&
    !graphArray[row][column + 1].className.includes("searched") &&
    !graphArray[row][column + 1].isWall
  ) {
    let right = graphArray[row][column + 1];
    neighbors.push(right);
    right.from = currentNode;
    right.classList.add("searched");
  }
  if (
    row + 1 < numberOfRows &&
    !graphArray[row + 1][column].className.includes("searched") &&
    !graphArray[row + 1][column].isWall
  ) {
    let top = graphArray[row + 1][column];
    neighbors.push(top);
    top.from = currentNode;
    top.classList.add("searched");
  }
  if (
    column - 1 > -1 &&
    !graphArray[row][column - 1].className.includes("searched") &&
    !graphArray[row][column - 1].isWall
  ) {
    let left = graphArray[row][column - 1];
    neighbors.push(left);
    left.from = currentNode;
    left.classList.add("searched");
  }
  return neighbors;
}
function aStarManhattan() {
  dijkstrasAlgorithm(aStarManhattanComparator);
}
function aStarEuclid() {
  dijkstrasAlgorithm(aStarEuclidComparator);
}
// a comparator for A* (Euclidean)
function aStarEuclidComparator(node1, node2) {
  if (
    node1.distanceTo + getEuclidDistanceTo(node1) >
    node2.distanceTo + getEuclidDistanceTo(node2)
  ) {
    return 1;
  } else if (
    node1.distanceTo + getEuclidDistanceTo(node1) ===
    node2.distanceTo + getEuclidDistanceTo(node2)
  ) {
    return 0;
  } else {
    return -1;
  }
}
// a comparator for A* (Manhattan)
function aStarManhattanComparator(node1, node2) {
  if (
    node1.distanceTo + getManhattanDistanceTo(node1) >
    node2.distanceTo + getManhattanDistanceTo(node2)
  ) {
    return 1;
  } else if (
    node1.distanceTo + getManhattanDistanceTo(node1) ===
    node2.distanceTo + getManhattanDistanceTo(node2)
  ) {
    return 0;
  } else {
    return -1;
  }
}
// finds the manhattan distance
function getManhattanDistanceTo(node) {
  return (
    Math.abs(node.row - targetNodeRow) +
    Math.abs(node.column - targetNodeColumn)
  );
}
// finds the euclidean distance
function getEuclidDistanceTo(node) {
  return Math.sqrt(
    (node.row - targetNodeRow) ** 2 + (node.column - targetNodeColumn) ** 2
  );
}
