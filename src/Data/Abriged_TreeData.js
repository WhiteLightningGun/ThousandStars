import Abriged_StarData from "./Abriged_StarData";

/*
Each entry in Abriged'_StarData obeys following schematic:
    ['StarID', 'ProperName', RA, Dec, Mag, 'Spectrum', [x,y,z]]
*/

class KDTreeNode {
  constructor(entry, axis) {
    this.entry = entry;
    this.point = entry[6]; // Cartesian coordinates
    this.axis = axis;
    this.left = null;
    this.right = null;
  }
}

// Quickselect algorithm to find the median
function quickselect(arr, k, axis) {
  if (arr.length <= 1) return arr[0];

  const pivot = arr[Math.floor(Math.random() * arr.length)][6][axis];
  const lows = arr.filter((item) => item[6][axis] < pivot);
  const highs = arr.filter((item) => item[6][axis] > pivot);
  const pivots = arr.filter((item) => item[6][axis] === pivot);

  if (k < lows.length) return quickselect(lows, k, axis);
  else if (k < lows.length + pivots.length) return pivots[0];
  else return quickselect(highs, k - lows.length - pivots.length, axis);
}

function buildKDTree(entries, depth = 0) {
  if (entries.length === 0) {
    return null;
  }

  const k = entries[0][6].length; // Assuming all points have the same dimension
  const axis = depth % k;

  // Use quickselect to find the median
  const medianIndex = Math.floor(entries.length / 2);
  const median = quickselect(entries, medianIndex, axis);

  // Partition the array around the median
  const leftEntries = entries.filter(
    (entry) => entry[6][axis] < median[6][axis]
  );
  const rightEntries = entries.filter(
    (entry) => entry[6][axis] > median[6][axis]
  );

  // Create node and construct subtrees
  const node = new KDTreeNode(median, axis);
  node.left = buildKDTree(leftEntries, depth + 1);
  node.right = buildKDTree(rightEntries, depth + 1);

  return node;
}

function distanceSquared(point1, point2) {
  return point1.reduce(
    (sum, value, index) => sum + (value - point2[index]) ** 2,
    0
  );
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(element) {
    this.heap.push(element);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let element = this.heap[index];
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      if (parent.dist >= element.dist) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  extractMax() {
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return max;
  }

  sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild.dist > element.dist) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild.dist > element.dist) ||
          (swap !== null && rightChild.dist > leftChild.dist)
        ) {
          swap = rightChildIndex;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }
}

function nthNearestNeighbors(node, target, n, depth = 0, heap = new MaxHeap()) {
  if (node === null) {
    return heap;
  }

  const axis = node.axis;
  const point = node.point;
  const entry = node.entry;
  const dist = distanceSquared(target, point);

  if (heap.size() < n) {
    heap.insert({ dist, entry });
  } else if (dist < heap.peek().dist) {
    heap.extractMax();
    heap.insert({ dist, entry });
  }

  const nextBranch = target[axis] < point[axis] ? node.left : node.right;
  const otherBranch = target[axis] < point[axis] ? node.right : node.left;

  heap = nthNearestNeighbors(nextBranch, target, n, depth + 1, heap);

  if (
    heap.size() < n ||
    Math.abs(target[axis] - point[axis]) ** 2 < heap.peek().dist
  ) {
    heap = nthNearestNeighbors(otherBranch, target, n, depth + 1, heap);
  }

  return heap;
}

function nthNearestNeighborsFOV(
  node,
  target,
  n,
  depth = 0,
  heap = new MaxHeap(),
  maxMag
) {
  if (node === null) {
    return heap;
  }

  const axis = node.axis;
  const point = node.point;
  const entry = node.entry;
  const dist = distanceSquared(target, point);
  // Check if the entry's magnitude is within the acceptable range for the given Fov
  const maxMagnitude = maxMag;

  if (entry[4] <= maxMagnitude) {
    // Assuming entry[4] is the magnitude
    if (heap.size() < n) {
      heap.insert({ dist, entry });
    } else if (dist < heap.peek().dist) {
      heap.extractMax();
      heap.insert({ dist, entry });
    }
  }

  const nextBranch = target[axis] < point[axis] ? node.left : node.right;
  const otherBranch = target[axis] < point[axis] ? node.right : node.left;

  heap = nthNearestNeighborsFOV(
    nextBranch,
    target,
    n,
    depth + 1,
    heap,
    maxMagnitude
  );

  if (
    heap.size() < n ||
    Math.abs(target[axis] - point[axis]) ** 2 < heap.peek().dist
  ) {
    heap = nthNearestNeighborsFOV(
      otherBranch,
      target,
      n,
      depth + 1,
      heap,
      maxMagnitude
    );
  }

  return heap;
}

// Build KD-Tree from Abriged_StarData
const kdTree = buildKDTree(Abriged_StarData);

// Export functions to query the KD-Tree
export function findNearestNeighbors(ra, dec, n) {
  const targetPoint = raDecToCartesian(ra, dec);
  const neighbors = nthNearestNeighbors(kdTree, targetPoint, n);
  const result = [];
  while (neighbors.size() > 0) {
    result.push(neighbors.extractMax().entry);
  }
  return result.reverse(); // Return in ascending order of distance
}

export function findNearestNeighborsFOV(ra, dec, n, maxMag) {
  const targetPoint = raDecToCartesian(ra, dec);
  const neighbors = nthNearestNeighborsFOV(
    kdTree,
    targetPoint,
    n,
    0,
    new MaxHeap(),
    maxMag
  );
  const result = [];
  while (neighbors.size() > 0) {
    result.push(neighbors.extractMax().entry);
  }
  return result.reverse(); // Return in ascending order of distance
}

function raDecToCartesian(ra, dec) {
  // Convert RA and Dec from degrees to radians
  const raRad = ra;
  const decRad = dec;

  // Calculate Cartesian coordinates
  const x = Math.cos(decRad) * Math.cos(raRad);
  const y = Math.cos(decRad) * Math.sin(raRad);
  const z = Math.sin(decRad);

  return [x, y, z];
}
