function handleMouseDown(event) {
  event.preventDefault();
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
  if (movingTargetNode) {
    // dragging the target node
    targetNode.id = "";
    event.target.id = "targetNode";
    targetNode = eventj.target;
  } else if (movingBeginningNode) {
    beginningNode.id = "";
    event.target.id = "beginningNode";
    beginningNode = event.target;
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
