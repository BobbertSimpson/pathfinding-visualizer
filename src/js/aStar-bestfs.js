// implementation of A* (Manhattan)
function aStarManhattan() {
  dijkstrasAlgorithm(aStarManhattanComparator);
}
function aStarManhattanAnimated() {
  dijkstrasAlgorithmAnimated(aStarManhattanComparator);
}
// Implementation of A* (Euclidean)
function aStarEuclid() {
  dijkstrasAlgorithm(aStarEuclidComparator);
}
function aStarEuclidAnimated() {
  dijkstrasAlgorithmAnimated(aStarEuclidComparator);
}
// a comparator for A* (Euclidean)
function aStarEuclidComparator(node1, node2) {
  // checks the type
  if (node1 === "type") {
    return "euclid";
  } else if (
    node1.distanceTo + getEuclidDistanceTo(node1) >
    node2.distanceTo + getEuclidDistanceTo(node2)
  ) {
    return 1;
  } else if (
    node1.distanceTo + getEuclidDistanceTo(node1) ===
    node2.distanceTo + getEuclidDistanceTo(node2)
  ) {
    if (getEuclidDistanceTo(node1) > getEuclidDistanceTo(node2)) {
      return 1;
    } else if (getEuclidDistanceTo(node1) < getEuclidDistanceTo(node2)) {
      return -1;
    } else {
      if (
        Math.abs(node1.row - targetNode.row) <
        Math.abs(node2.row - targetNode.row)
      ) {
        return 1;
      } else if (
        Math.abs(node1.row - targetNode.row) >
        Math.abs(node2.row - targetNode.row)
      ) {
        return -1;
      }
    }
    return 0;
  } else {
    return -1;
  }
}
// a comparator for A* (Manhattan)
function aStarManhattanComparator(node1, node2) {
  // used to check the type
  if (node1 === "type") {
    return "manhattan";
  } else if (
    node1.distanceTo + getManhattanDistanceTo(node1) >
    node2.distanceTo + getManhattanDistanceTo(node2)
  ) {
    return 1;
  } else if (
    node1.distanceTo + getManhattanDistanceTo(node1) ===
    node2.distanceTo + getManhattanDistanceTo(node2)
  ) {
    if (getManhattanDistanceTo(node1) > getManhattanDistanceTo(node2)) {
      return 1;
    } else if (getManhattanDistanceTo(node1) < getManhattanDistanceTo(node2)) {
      return -1;
    } else {
      if (
        Math.abs(node1.row - targetNode.row) <
        Math.abs(node2.row - targetNode.row)
      ) {
        return 1;
      } else if (
        Math.abs(node1.row - targetNode.row) >
        Math.abs(node2.row - targetNode.row)
      ) {
        return -1;
      }
    }
    return 0;
  } else {
    return -1;
  }
}
// finds the manhattan distance
function getManhattanDistanceTo(node) {
  return (
    Math.abs(node.row - targetNode.row) +
    Math.abs(node.column - targetNode.column)
  );
}
// finds the euclidean distance
function getEuclidDistanceTo(node) {
  return Math.sqrt(
    (node.row - targetNode.row) ** 2 + (node.column - targetNode.column) ** 2
  );
}
function bestFirstSearchComparator(node1, node2) {
  if (node1 === "type") {
    return "best";
  }
  const node1Manhattan = getManhattanDistanceTo(node1);
  const node2Manhattan = getManhattanDistanceTo(node2);

  if (node1Manhattan > node2Manhattan) {
    return 1;
  } else if (node1Manhattan === node2Manhattan) {
    return 0;
  } else {
    return -1;
  }
}
function bestFirstSearch() {
  dijkstrasAlgorithm(bestFirstSearchComparator);
}
function bestFirstSearchAnimated() {
  dijkstrasAlgorithmAnimated(bestFirstSearchComparator);
}
