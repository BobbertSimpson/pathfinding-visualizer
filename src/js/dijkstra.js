// implementation of dijkstras' algorithm
function dijkstrasAlgorithm(comparator = dijkstrasComparator) {
  if (timeoutArray.length > 0) {
    stopAnimation();
  }
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
    currentNode.classList.add("beenThere");
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
  alreadySearched = true;
  lastSearchAlgorithm = comparator("type");
}

function dijkstrasComparator(node1, node2) {
  // checks the type
  if (node1 === "type") {
    return "dijkstra";
  } else if (node1.distanceTo > node2.distanceTo) {
    return 1;
  } else if (node1.distanceTo === node2.distanceTo) {
    return 0;
  } else {
    return -1;
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
    !graphArray[row + 1][column].classList.contains("wall")
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
    !graphArray[row - 1][column].classList.contains("wall")
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
    !graphArray[row][column + 1].classList.contains("wall")
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
    !graphArray[row][column - 1].classList.contains("wall")
  ) {
    let left = graphArray[row][column - 1];
    neighbors.push(left);
    left.from = currentNode;
    left.distanceTo = currentNode.distanceTo + left.weight;
    left.classList.add("searched");
  }
  return neighbors;
}
