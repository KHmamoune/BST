import { mergeSort } from "./merge.js"

class BST {
  constructor() {
    this.root = null
  }

  buildTree(arr) {
    arr = mergeSort(arr)
    this.root = null
    this.root = this.build(arr)
  }

  build(arr, start = 0, end = arr.length - 1) {
    if (start > end) {
      return null;
    }

    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);

    node.left = this.build(arr, start, mid - 1);
    node.right = this.build(arr, mid + 1, end);

    return node;
  }

  insert(v) {
    let currNode = this.root
    let node = new Node(v)

    while (true) {
      if (v > currNode.value && currNode.right == null) {
        currNode.right = node
        return
      } else if (v < currNode.value && currNode.left == null) {
        currNode.left = node
        return
      }

      if (v >= currNode.value) {
        currNode = currNode.right
      } else {
        currNode = currNode.left
      }
    }
  }

  delete(v) {
    if (this.root.value == null) {
      return null
    }

    let currNode = this.root
    let prevNode = this.root

    while (currNode.value != v) {
      prevNode = currNode

      if (v < currNode.value) {
        currNode = currNode.left
      } else {
        currNode = currNode.right
      }
    }

    if (currNode.isLeaf()) {
      this.insertPrev(currNode, prevNode, null)
      return
    }

    if (currNode.left == null) {
      this.insertPrev(currNode, prevNode, currNode.right)
      return
    } else if (currNode.right == null) {
      this.insertPrev(currNode, prevNode, currNode.left)
      return
    }

    if (currNode.left != null && currNode.right != null) {
      let suc = currNode.successeur()

      this.delete(suc.value)

      suc.left = currNode.left
      suc.right = currNode.right

      this.insertPrev(currNode, prevNode, suc)
    }
  }

  insertPrev(currNode, prevNode, rep) {
    if (currNode.value == this.root.value) {
      this.root = rep
    }

    if (currNode.value < prevNode.value) {
      prevNode.left = rep
    } else {
      prevNode.right = rep
    }
  }

  find(v) {
    let currNode = this.root

    while (currNode.value != v) {
      if (v < currNode.value) {
        currNode = currNode.left
      } else {
        currNode = currNode.right
      }
    }

    return currNode
  }

  preOrder(cb = (v) => arr.push(v.value), node = this.root, arr = []) {
    if (node == null) {
      return
    }

    cb(node)
    this.preOrder(cb, node.left)
    this.preOrder(cb, node.right)
    return arr
  }

  inOrder(cb = (v) => arr.push(v.value), node = this.root, arr = []) {
    if (node == null) {
      return
    }

    this.inOrder(cb, node.left)
    cb(node)
    this.inOrder(cb, node.right)
    return arr
  }

  postOrder(cb = (v) => arr.push(v.value), node = this.root, arr = []) {
    if (node == null) {
      return
    }

    this.postOrder(cb, node.left)
    this.postOrder(cb, node.right)
    cb(node)
    return arr
  }

  height(v) {
    if (v == null) {
      return 0
    }

    let leftH = this.height(v.left)
    let rightH = this.height(v.right)

    if (leftH > rightH) {
      return leftH + 1
    } else {
      return rightH + 1
    }
  }

  depth(v) {
    let currNode = this.root
    let i = 1

    while (currNode.value != v.value) {
      if (v.value < currNode.value) {
        currNode = currNode.left
      } else {
        currNode = currNode.right
      }

      i++

      if (currNode == null) {
        return null
      }
    }

    return i
  }

  isBalanced() {
    let arr = []
    this.postOrder((v) => {
      if (this.height(v.left) == this.height(v.right) || this.height(v.left) + 1 == this.height(v.right) || this.height(v.left) == this.height(v.right) + 1) {
        arr.push(true)
        return
      }
      arr.push(false)
    })

    if (arr.includes(false)) {
      return false
    }

    return true
  }

  rebalance() {
    let arr = this.inOrder()
    this.root = null

    this.buildTree(arr)
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

class Node {
  constructor(v) {
    this.value = v
    this.left = null
    this.right = null
  }

  isLeaf() {
    if (this.left == null && this.right == null) {
      return true
    } else {
      return false
    }
  }

  successeur() {
    let currNode = this.right

    while (currNode.left != null) {
      currNode = currNode.left
    }

    return currNode
  }
}

let tree = new BST()
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
console.log(tree.isBalanced())
tree.insert(435)
tree.insert(436)
tree.insert(437)
console.log(tree.preOrder())
console.log(tree.inOrder())
console.log(tree.postOrder())
console.log(tree.isBalanced())
tree.rebalance()
console.log(tree.isBalanced())
console.log(tree.preOrder())
console.log(tree.inOrder())
console.log(tree.postOrder())
