// implementation of A* (Manhattan)
function aStarManhattan() {
  dijkstrasAlgorithm(aStarManhattanComparator);
}
// Implementation of A* (Euclidean)
function aStarEuclid() {
  dijkstrasAlgorithm(aStarEuclidComparator);
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
    (node.row - targetNodeRow) ** 2 + (node.column - targetNode.column) ** 2
  );
}
