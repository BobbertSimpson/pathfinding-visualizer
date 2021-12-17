// implementation of bfs
// Great for small graphs
function breadthFirstSearchAnimate() {
  if (timeoutArray.length > 0) {
    stopAnimation();
  }
  if (alreadySearched) {
    refreshGraph();
  }
  const queue = new Queue();
  const startArray = getNeighbors(beginningNode);
  beginningNode.classList.add("beenThereAnimate");
  for (let i = 0; i < startArray.length; i++) {
    queue.enqueue(startArray[i]);
  }
  timeoutArray.push(setTimeout(breadthFirstSearchAnimateStep, 1, queue));
  alreadySearched = true;
  lastSearchAlgorithm = "bfs";
}
function breadthFirstSearchAnimateStep(queue) {
  if (queue.isEmpty()) {
    return;
  }
  let currentNode = queue.dequeue();
  if (currentNode === targetNode) {
    stopAnimation();
    showAnswerAnimate();
    return;
  }
  currentNode.classList.add("beenThereAnimate");
  let currentArray = getNeighbors(currentNode);
  for (let i = 0; i < currentArray.length; i++) {
    currentArray[i].classList.add("searched");
    queue.enqueue(currentArray[i]);
  }
  timeoutArray.push(setTimeout(breadthFirstSearchAnimateStep, 1, queue));
}
// function breadthFirstSearchAnimate() {
//   if (timeoutArray.length > 0) {
//     stopAnimation();
//   }
//   if (alreadySearched) {
//     refreshGraph();
//   }
//   const queue = new Queue();
//   const startArray = getNeighbors(beginningNode);
//   console.log(startArray);
//   for (let i = 0; i < startArray.length; i++) {
//     queue.enqueue(startArray[i]);
//   }
//   const searchPath = new Queue();
//   // an array of all the nodes that we would traverse in a bfs

//   while (!queue.isEmpty()) {
//     let currentNode = queue.dequeue();
//     searchPath.enqueue(currentNode);
//     if (currentNode === targetNode) {
//       break;
//     }
//     let currentArray = getNeighbors(currentNode);
//     for (let i = 0; i < currentArray.length; i++) {
//       queue.enqueue(currentArray[i]);
//     }
//   }
//   alreadySearched = true;
//   lastSearchAlgorithm = "bfs";
//   timeoutArray.push(setTimeout(breadthFirstSearchAnimateStep, 5, searchPath));
// }
// function breadthFirstSearchAnimateStep(path) {
//   if (path.isEmpty()) {
//     return;
//   }
//   const currentNode = path.dequeue();
//   currentNode.classList.add("beenThereAnimate");
//   if (currentNode === targetNode) {
//     console.log("Found the target node");
//     showAnswerAnimate();
//     return;
//   }
//   timeoutArray.push(setTimeout(breadthFirstSearchAnimateStep, 5, path));
// }
function breadthFirstSearch() {
  if (timeoutArray.length > 0) {
    stopAnimation();
  }
  if (alreadySearched) {
    refreshGraph();
  }

  let startArray = getNeighbors(beginningNode);
  const queue = new Queue();
  beginningNode.classList.add("beenThere");
  for (let i = 0; i < startArray.length; i++) {
    queue.enqueue(startArray[i]);
    startArray[i].classList.add("searched");
  }

  while (!queue.isEmpty()) {
    let currentNode = queue.dequeue();
    if (currentNode.classList.contains("beenThere")) {
      continue;
    }
    currentNode.classList.add("beenThere");
    if (currentNode === targetNode) {
      break;
    }
    let currentArray = getNeighbors(currentNode);
    for (let i = 0; i < currentArray.length; i++) {
      queue.enqueue(currentArray[i]);
      currentArray[i].classList.add("searched");
    }
  }
  alreadySearched = true;
  lastSearchAlgorithm = "bfs";
}

function depthFirstSearchAnimate() {
  if (timeoutArray.length > 0) {
    stopAnimation();
  }
  if (alreadySearched) {
    refreshGraph();
  }
  const stack = [];
  const startArray = getNeighbors(beginningNode);
  beginningNode.classList.add("beenThereAnimate");
  for (let i = 0; i < startArray.length; i++) {
    stack.push(startArray[i]);
  }
  timeoutArray.push(setTimeout(depthFirstSearchAnimateStep, 1, stack));
  alreadySearched = true;
  lastSearchAlgorithm = "dfs";
}
function depthFirstSearchAnimateStep(stack) {
  if (stack.length === 0) {
    return;
  }
  let currentNode = stack.pop();
  if (currentNode === targetNode) {
    stopAnimation();
    showAnswerAnimate();
    return;
  }

  currentNode.classList.add("beenThereAnimate");
  let currentArray = getNeighbors(currentNode);
  for (let i = 0; i < currentArray.length; i++) {
    currentArray[i].classList.add("searched");
    stack.push(currentArray[i]);
  }
  timeoutArray.push(setTimeout(depthFirstSearchAnimateStep, 1, stack));
}

// implementation of dfs
function depthFirstSearch() {
  if (timeoutArray.length > 0) {
    stopAnimation();
  }
  if (alreadySearched) {
    refreshGraph();
  }

  const stack = [];
  let startArray = getNeighbors(beginningNode);
  beginningNode.classList.add("beenThere");

  for (let i = 0; i < startArray.length; i++) {
    console.log(startArray[i]);
    stack.push(startArray[i]);
    startArray[i].classList.add("searched");
  }

  while (stack.length !== 0) {
    let currentNode = stack.pop();
    if (currentNode.classList.contains("beenThere")) {
      continue;
    }
    currentNode.classList.add("beenThere");
    if (currentNode === targetNode) {
      console.log("Found the target node");
      break;
    }
    let currentArray = getNeighbors(currentNode);
    for (let i = 0; i < currentArray.length; i++) {
      stack.push(currentArray[i]);
      currentArray[i].classList.add("searched");
    }
  }
  alreadySearched = true;
  lastSearchAlgorithm = "dfs";
}
// gets all the close, unocupied squares that haven't been searched before
function getNeighbors(currentNode) {
  const row = currentNode.row;
  const column = currentNode.column;
  let neighbors = [];

  if (
    row - 1 > -1 &&
    !graphArray[row - 1][column].classList.contains("wall") &&
    !(
      graphArray[row - 1][column].classList.contains("beenThere") ||
      graphArray[row - 1][column].classList.contains("beenThereAnimate")
    )
  ) {
    let bottom = graphArray[row - 1][column];
    neighbors.push(bottom);
    bottom.from = currentNode;
  }
  if (
    column + 1 < numberOfColumns &&
    !graphArray[row][column + 1].classList.contains("wall") &&
    !(
      graphArray[row][column + 1].classList.contains("beenThere") ||
      graphArray[row][column + 1].classList.contains("beenThereAnimate")
    )
  ) {
    let right = graphArray[row][column + 1];
    neighbors.push(right);
    right.from = currentNode;
  }
  if (
    row + 1 < numberOfRows &&
    !graphArray[row + 1][column].classList.contains("wall") &&
    !(
      graphArray[row + 1][column].classList.contains("beenThere") ||
      graphArray[row + 1][column].classList.contains("beenThereAnimate")
    )
  ) {
    let top = graphArray[row + 1][column];
    neighbors.push(top);
    top.from = currentNode;
  }
  if (
    column - 1 > -1 &&
    !graphArray[row][column - 1].classList.contains("wall") &&
    !(
      graphArray[row][column - 1].classList.contains("beenThere") ||
      graphArray[row][column - 1].classList.contains("beenThereAnimate")
    )
  ) {
    let left = graphArray[row][column - 1];
    neighbors.push(left);
    left.from = currentNode;
  }
  return neighbors;
}
