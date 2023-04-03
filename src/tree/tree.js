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
 * 
 * BST树存在的一个问题：取决于添加的节点数，树的一条边会非常的深；也就是说树的一条分支会有很多层，而其它的分支却只有几层
 */
class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.root = null; // 根节点
    }
    insert(key) {
        if (this.root == null) {
            const treeNode = new Node(key);
            this.root = treeNode;
        } else {
            this.insertNode(this.root, key);
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
    // 中序遍历
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }
    inOrderTraverseNode(node, callback) {
        // 停止递归 判断传入的节点是否为null
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    // 先序遍历
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback);
    }
    preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }
    //  后续遍历
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
    min() {
        // 寻找树的最小值
        return this.minNode(this.root);
    }
    minNode(node) {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }
    max() {
        // 寻找树的最大值
        return this.maxNode(this.root);
    }
    maxNode(node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }
    search(key) {
        // 搜索特定的值
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        if (node == null) {
            return false;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }
    remove(key) {
        this.root = this.removeNode(this.root, key);
    }
    removeNode(node, key) {
        // 正在检测的节点为null，那么键不存在于树中
        if (node == null) return null;

        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            //  查找的键比当前节点小就沿着树的左节点往下找
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            //  查找的键比当前节点大就沿着树的右节点往下找
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            // 键等于 node.key 找到了
            // case 1: 该节点没有左节点和右节点， 直接给改节点赋值为null即可
            if (node.left == null && node.right == null) {
                node = null
                return node;
            }
            // case 2: 移除有一个左侧或右侧节点的节点
            // 该情况需要跳过这个节点，将原先父节点指向它的指针指向该节点的子节点。
            if (node.left == null) {
                node = node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            }
            // case 3: 移除有两个子节点的节点
            // 1、当找到了要移除的节点后，需要找到它右边子树中最小的节点
            // 2、用它右侧子树中最小节点的键去更新这个节点的值
            // 3、将右侧树中的最小节点移除也就是 将 aux移除。
            // 4、最后，向它的父节点返回更新后节点的引用
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }
}

// const tree = new BinarySearchTree();
// tree.insert(11);
// tree.insert(7);
// tree.insert(15);
// tree.insert(5);
// tree.insert(3);
// tree.insert(9);
// tree.insert(8);
// tree.insert(10);
// tree.insert(13);
// tree.insert(12);
// tree.insert(14);
// tree.insert(20);
// tree.insert(18);
// tree.insert(25);
// console.log(tree.root);
// const printNode = value => console.log(value);
// tree.inOrderTraverse(printNode); // 3 5 7 8 9 10 11 12 13 14 15 18 20 25
// tree.preOrderTraverse(printNode); // 11 7 5 3 9 8 10 15 13 12 14 20 18 25
// tree.postOrderTraverse(printNode); // 3 5 8 10 9 7 12 14 13 18 25 20 15 11
// console.log(tree.min()); // Node { key: 3, left: null, right: null }
// console.log(tree.max()); // Node { key: 25, left: null, right: null }
// console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.'); // Key 1 not found.
// console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.'); // Key 8 found.

/**
 * AVL树：一种自平衡二叉搜索树，任何一个节点左右两侧子树的高度之差最多为1。
 */

class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
    }

}