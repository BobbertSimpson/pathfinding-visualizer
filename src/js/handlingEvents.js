let movingBeginningNode = false;
let movingTargetNode = false;
let creatingWalls = false;

function handleMouseDown(event) {
  event.preventDefault();
  if (timeoutArray.length > 0) {
    stopAnimation();
    runLastAlgorithm();
  }
  if (event.target === beginningNode) {
    movingBeginningNode = true;
  } else if (event.target === targetNode) {
    movingTargetNode = true;
  } else {
    creatingWalls = true;
    event.target.isWall = true;
    event.target.classList.add("wall");
  }
}
function handleMouseMove(event) {
  event.preventDefault();
  if (movingTargetNode && event.target !== beginningNode) {
    // dragging the target node
    targetNode.id = "";
    event.target.id = "targetNode";
    targetNode = event.target;
    targetNode.isWall = false;
    if (alreadySearched) {
      stopAnimation();
      runLastAlgorithm();
    }
  } else if (movingBeginningNode && event.target !== targetNode) {
    beginningNode.id = "";
    event.target.id = "beginningNode";
    beginningNode = event.target;
    if (alreadySearched) {
      stopAnimation();
      runLastAlgorithm();
    }
  } else if (creatingWalls) {
    event.target.isWall = true;
    event.target.classList.add("wall");
  }
}
function handleMouseLeave(event) {
  event.preventDefault();
  movingBeginningNode = false;
  movingTargetNode = false;
  creatingWalls = false;
}
function handleMouseUp(event) {
  event.preventDefault();
  movingBeginningNode = false;
  movingTargetNode = false;
  creatingWalls = false;
}
function runLastAlgorithm() {
  if (lastSearchAlgorithm === "dijkstra") {
    dijkstrasAlgorithm();
  } else if (lastSearchAlgorithm === "dfs") {
    depthFirstSearch();
  } else if (lastSearchAlgorithm === "bfs") {
    breadthFirstSearch();
  } else if (lastSearchAlgorithm === "manhattan") {
    aStarManhattan();
  } else if (lastSearchAlgorithm === "euclid") {
    aStarEuclid();
  } else {
    alert("Something is wrong");
  }
  showAnswerImmediate();
}
// a somewhat hacky way to stop the animation of the path
function stopAnimation() {
  while (timeoutArray.length > 0) {
    clearTimeout(timeoutArray.pop());
  }
}
