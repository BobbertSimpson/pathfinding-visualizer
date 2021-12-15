// implementation of bfs
function breadthFirstSearchAnimate() {
  if (timeoutArray.length > 0) {
    stopAnimation();
  }
  if (alreadySearched) {
    refreshGraph();
  }
  const queue = getNeighbors(beginningNode.row, beginningNode.column);
  timeoutArray.push(
    setTimeout(breadthFirstSearchAnimateStep, animationSpeed, queue)
  );
  alreadySearched = true;
  lastSearchAlgorithm = "bfs";
}
function breadthFirstSearchAnimateStep(queue) {
  if (queue.length !== 0) {
    return;
  }
  if (currentNode.classList.contains("beenThere")) {
    return;
  }
  currentNode.classList.add("beenThere");
  if (currentNode === targetNode) {
    return;
  }
  let currentArray = getNeighbors(currentNode.row, currentNode.column);
  for (let i = 0; i < currentArray.length; i++) {
    queue.push(currentArray[i]);
  }
  timeoutArray.push(
    setTimeout(breadthFirstSearchAnimateStep, animationSpeed, queue)
  );
}
function breadthFirstSearch() {
  if (timeoutArray.length > 0) {
    stopAnimation();
  }
  if (alreadySearched) {
    refreshGraph();
  }
  const queue = getNeighbors(beginningNode.row, beginningNode.column);
  while (queue.length !== 0) {
    let currentNode = queue.shift();
    if (currentNode.classList.contains("beenThere")) {
      continue;
    }
    currentNode.classList.add("beenThere");
    if (currentNode === targetNode) {
      break;
    }
    let currentArray = getNeighbors(currentNode.row, currentNode.column);
    for (let i = 0; i < currentArray.length; i++) {
      queue.push(currentArray[i]);
    }
  }
  alreadySearched = true;
  lastSearchAlgorithm = "bfs";
}
// implementation of dfs
function depthFirstSearch() {
  if (timeoutArray.length > 0) {
    stopAnimation();
  }
  if (alreadySearched) {
    refreshGraph();
  }
  const stack = getNeighbors(beginningNode.row, beginningNode.column);
  while (stack.length !== 0) {
    let currentNode = stack.pop();
    if (currentNode.classList.contains("beenThere")) {
      continue;
    }
    currentNode.classList.add("beenThere");
    if (currentNode === targetNode) {
      break;
    }
    let currentArray = getNeighbors(currentNode.row, currentNode.column);
    for (let i = 0; i < currentArray.length; i++) {
      stack.push(currentArray[i]);
    }
  }
  alreadySearched = true;
  lastSearchAlgorithm = "dfs";
}
// gets all the close, unocupied squares that haven't been searched before
function getNeighbors(row, column) {
  let neighbors = [];
  let currentNode = graphArray[row][column];
  if (
    row - 1 > -1 &&
    !graphArray[row - 1][column].classList.contains("beenThere") &&
    !graphArray[row - 1][column].classList.contains("wall")
  ) {
    let bottom = graphArray[row - 1][column];
    neighbors.push(bottom);
    bottom.from = currentNode;
    bottom.classList.add("searched");
  }
  if (
    column + 1 < numberOfColumns &&
    !graphArray[row][column + 1].classList.contains("beenThere") &&
    !graphArray[row][column + 1].classList.contains("wall")
  ) {
    let right = graphArray[row][column + 1];
    neighbors.push(right);
    right.from = currentNode;
    right.classList.add("searched");
  }
  if (
    row + 1 < numberOfRows &&
    !graphArray[row + 1][column].classList.contains("beenThere") &&
    !graphArray[row + 1][column].classList.contains("wall")
  ) {
    let top = graphArray[row + 1][column];
    neighbors.push(top);
    top.from = currentNode;
    top.classList.add("searched");
  }
  if (
    column - 1 > -1 &&
    !graphArray[row][column - 1].classList.contains("beenThere") &&
    !graphArray[row][column - 1].classList.contains("wall")
  ) {
    let left = graphArray[row][column - 1];
    neighbors.push(left);
    left.from = currentNode;
    left.classList.add("searched");
  }
  return neighbors;
}
