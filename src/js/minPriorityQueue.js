class minPriorityQueue {
  constructor(comparator) {
    this.queue = [-1];
    this.index = 1;
    this.comparator = comparator;
  }
  enqueueElement(element) {
    this.queue[this.index] = element;
    this.swim(this.index); // recursively return the array into heap order
    this.index++;
  }
  swim(index) {
    if (index === 1) {
      return;
    }
    let indexHeap = Math.floor(index / 2);
    if (this.comparator(this.queue[index], this.queue[indexHeap]) === -1) {
      this.swap(index, indexHeap);
      this.swim(indexHeap);
    }
    return;
  }
  swap(a, b) {
    let temp = this.queue[a];
    this.queue[a] = this.queue[b];
    this.queue[b] = temp;
  }
  dequeue() {
    if (this.index === 1) {
      alert("Something went wrong!");
    }
    this.index--;
    this.swap(this.index, 1);
    this.sink(1);
    return this.queue[this.index];
  }
  sink(index) {
    let leftChild = 2 * index;
    let rightChild = 2 * index + 1;
    if (leftChild < this.index) {
      if (this.comparator(this.queue[index], this.queue[leftChild]) === 1) {
        this.swap(index, leftChild);
        this.sink(leftChild);
      } else if (
        rightChild < this.index &&
        this.comparator(this.queue[index], this.queue[rightChild] === 1)
      ) {
        this.swap(index, rightChild);
        this.sink(rightChild);
      }
    }
    return;
  }
  isEmpty() {
    return this.index == 1;
  }
}
