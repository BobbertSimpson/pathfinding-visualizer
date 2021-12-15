let movingBeginningNode = false;
let movingTargetNode = false;
let creatingWalls = false;
let prevIsWall = false;

function handleMouseDown(event) {
  event.preventDefault();
  const node = event.target;
  if (node === beginningNode) {
    movingBeginningNode = true;
  } else if (node === targetNode) {
    movingTargetNode = true;
  } else if (node.classList.contains("wall")) {
    creatingWalls = true;
    node.classList.remove("wall");
  } else if (!node.classList.contains("wall")) {
    creatingWalls = true;
    node.classList.add("wall");
  }
  if (alreadySearched) {
    stopAnimation();
    runLastAlgorithm();
  }
}
function handleMouseEnter(event) {
  event.preventDefault();
  const node = event.target;
  if (movingTargetNode && node !== beginningNode) {
    // dragging the target node
    targetNode.id = "";
    if (prevIsWall) {
      targetNode.classList.add("wall");
    }
    node.id = "targetNode";
    prevIsWall = node.classList.contains("wall");
    targetNode = node;
    // Stops being a wall so that the search algorithms can find it
    targetNode.classList.remove("wall");
    targetNode.classList.remove("wall");
    if (alreadySearched) {
      stopAnimation();
      runLastAlgorithm();
    }
  } else if (movingBeginningNode && node !== targetNode) {
    beginningNode.id = "";
    node.id = "beginningNode";
    beginningNode = node;
    if (alreadySearched) {
      stopAnimation();
      runLastAlgorithm();
    }
  } else if (creatingWalls) {
    if (node.classList.contains("wall")) {
      node.classList.remove("wall");
    } else {
      node.classList.add("wall");
    }
    if (alreadySearched) {
      runLastAlgorithm();
    }
  }
}

// function handleMouseMove(event) {
//   event.preventDefault();
//   let node = event.target;
//   if (movingTargetNode && node !== beginningNode) {
//     // dragging the target node
//     targetNode.id = "";
//     node.id = "targetNode";
//     targetNode = node;
//     targetNode.isWall = false;
//     if (alreadySearched) {
//       stopAnimation();
//       runLastAlgorithm();
//     }
//   } else if (movingBeginningNode && node !== targetNode) {
//     beginningNode.id = "";
//     node.id = "beginningNode";
//     beginningNode = node;
//     if (alreadySearched) {
//       stopAnimation();
//       runLastAlgorithm();
//     }
//   } else if (creatingWalls) {
//     node.isWall = true;
//     node.classList.add("wall");
//   }
// }

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
  } else if (lastSearchAlgorithm === "best") {
    bestFirstSearch();
  } else {
    alert("Something is wrong");
  }
  if (targetNode.classList.contains("beenThere")) {
    showAnswerImmediate();
  }
}
// a somewhat hacky way to stop the animation of the path
function stopAnimation() {
  while (timeoutArray.length > 0) {
    clearTimeout(timeoutArray.pop());
  }
}
