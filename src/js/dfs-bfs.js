// implementation of bfs
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
  lastSearchAlgorithm = "bfs";
}
// implementation of dfs
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
  lastSearchAlgorithm = "dfs";
}
// gets all the close, unocupied squares that haven't been searched before
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
