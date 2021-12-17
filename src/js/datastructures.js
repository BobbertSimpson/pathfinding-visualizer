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
// https://code.iamkate.com/javascript/queues/
function Queue() {
  let queue = [],
    bottomIndex = 0;
  this.isEmpty = function () {
    return 0 == queue.length;
  };
  this.enqueue = function (item) {
    queue.push(item);
  };
  this.dequeue = function () {
    if (0 != queue.length) {
      var item = queue[bottomIndex];
      2 * ++bottomIndex >= queue.length &&
        ((queue = queue.slice(bottomIndex)), (bottomIndex = 0));
      return item;
    }
  };
  this.peek = function () {
    return 0 < a.length ? a[b] : void 0;
  };
}
