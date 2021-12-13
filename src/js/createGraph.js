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
let lastSearchAlgorithm = "";
w;

let movingBeginningNode = false;
let movingTargetNode = false;
let creatingWalls = false;
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
document.getElementById("resetGraph").addEventListener("click", refreshGraph);
document.getElementById("resetWalls").addEventListener("click", () => {
  refreshGraph(true);
});
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
function refreshGraph(removeWalls = false) {
  console.log(removeWalls);
  for (let row = 0; row < numberOfRows; row++) {
    for (let column = 0; column < numberOfColumns; column++) {
      refreshNode(row, column, removeWalls);
    }
  }
  alreadySearched = false;
}
// Reset the node to it's innitial state
function refreshNode(row, column, removeWalls) {
  let node = graphArray[row][column];
  node.distanceTo = Infinity;
  if (node === beginningNode) {
    node.distanceTo = 0;
  }
  node.from = undefined;
  node.classList.remove("searched");
  node.classList.remove("path");
  if (removeWalls) {
    node.isWall = false;
    node.classList.remove("wall");
  }
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
  graphElement.addEventListener("mouseleave", handleMouseLeave);
  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("mousemove", handleMouseMove);
  node.addEventListener("mouseup", handleMouseUp);
  if (row === beginningNodeRow && column === beginningNodeColumn) {
    makeBeginningNode(node);
  } else if (row === targetNodeRow && column === targetNodeColumn) {
    makeTargetNode(node);
  }
  return node;
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
