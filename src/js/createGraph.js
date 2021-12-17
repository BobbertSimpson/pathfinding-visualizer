// Arbitrary size of the graph
const numberOfRows = 23;
const numberOfColumns = 50;

// original position of the beginning and end nodes
let beginningNodeRow = Math.floor(numberOfRows / 2) + 1; // Math.floor(numberOfRows / 3);
let beginningNodeColumn = Math.floor(numberOfColumns / 2) - 2; // Math.floor(numberOfColumns / 6);
let targetNodeColumn = Math.floor(numberOfColumns / 2) + 2; // Math.floor(numberOfColumns / 6) * 5;
let targetNodeRow = Math.floor(numberOfRows / 2); // Math.floor(numberOfRows / 3) * 2;

const graphElement = document.getElementById("graph");
const graphArray = [];
let beginningNode;
let targetNode;
let alreadySearched = false;
let lastSearchAlgorithm = "";
let timeoutArray = [];
const distanceElement = document.getElementById("distance");
let animationSpeed = 50;
// Add on click function calls
document.getElementById("dijkstrasAlgorithm").addEventListener("click", () => {
  dijkstrasAlgorithmAnimated();
});
document.getElementById("breadthFirstSearch").addEventListener("click", () => {
  breadthFirstSearchAnimate();
});
document.getElementById("depthFirstSearch").addEventListener("click", () => {
  depthFirstSearchAnimate();
  showAnswerAnimate();
});
document.getElementById("resetGraph").addEventListener("click", refreshGraph);
document.getElementById("resetWalls").addEventListener("click", () => {
  refreshGraph(true);
});
document.getElementById("aStarEuclid").addEventListener("click", () => {
  aStarEuclidAnimated();
});
document.getElementById("aStarManhattan").addEventListener("click", () => {
  aStarManhattanAnimated();
});
document.getElementById("bestFirstSearch").addEventListener("click", () => {
  bestFirstSearchAnimated();
});
document.getElementById("slow").addEventListener("click", () => {
  animationSpeed = 100;
});
document.getElementById("medium").addEventListener("click", () => {
  animationSpeed = 75;
});
document.getElementById("fast").addEventListener("click", () => {
  animationSpeed = 50;
});

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
  distanceElement.textContent = "";
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
  node.classList.remove("beenThere");
  node.classList.remove("pathAnimate");
  node.classList.remove("beenThereAnimate");
  if (removeWalls) {
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
  graphElement.addEventListener("mouseleave", handleMouseLeave);
  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("mouseenter", handleMouseEnter);
  node.addEventListener("mouseup", handleMouseUp);
  if (row === beginningNodeRow && column === beginningNodeColumn) {
    makeBeginningNode(node);
  } else if (row === targetNodeRow && column === targetNodeColumn) {
    makeTargetNode(node);
  }
  return node;
}

// shows the result of the search
function showAnswerImmediate() {
  let node = targetNode.from;
  let distance = 0;
  while (node !== beginningNode) {
    node.classList.add("path");
    distance += node.weight;
    node = node.from;
  }
  distanceElement.textContent = distance;
  // resetting the distance to zero
  distance = 0;
}

function showAnswerAnimate() {
  if (targetNode.from === undefined) {
    return;
  }
  let node = targetNode.from;
  let stack = [];
  while (node !== beginningNode) {
    stack.push(node);
    node = node.from;
  }
  timeoutArray.push(setTimeout(animateStep, 75, stack));
  // resetting the distance to zero
  distance = 0;
}
let counter = 0;
function animateStep(stack, distance = 0) {
  if (stack.length == 0) {
    console.log(counter);
    counter += 1;
    return;
  } else {
    let node = stack.pop();
    distance += node.weight;
    node.classList.add("pathAnimate");
    distanceElement.textContent = distance;
    timeoutArray.push(setTimeout(animateStep, 75, stack, distance));
  }
}
