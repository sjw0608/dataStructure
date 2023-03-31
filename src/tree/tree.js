const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
}

function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class Node {
    constructor(key) {
        this.key = key; // 节点值
        this.left = null; // 左侧节点
        this.right = null; // 右侧节点
    }
}

/**
 * 二叉搜索树
 * insert(key)：向树中插入一个新的键。
 * search(key)：在树中查找一个键。如果节点存在，则返回true；如果不存在，则返回false。
 * inOrderTraverse()：通过中序遍历方式遍历所有节点。
 * preOrderTraverse()：通过先序遍历方式遍历所有节点。
 * postOrderTraverse()：通过后序遍历方式遍历所有节点。
 * min()：返回树中最小的值/键。
 * max()：返回树中最大的值/键。
 * remove(key)：从树中移除某个键。
 */
class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.root = null; // 根节点
    }
    insert(key) {
        if (this.root == null) {
            this.root = new Node(key);
        } else {
            this.insert(this.root, key);
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (!node.left) {
                node.left = new Node(key);
            } else {
                this.insertNode(node.left, key);
            }
        } else {
            if (!node.right) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }
    search(key) { }
    inOrderTraverse() { }
    preOrderTraverse() { }
    postOrderTraverse() { }
    min() { }
    max() { }
    remove() { }
}