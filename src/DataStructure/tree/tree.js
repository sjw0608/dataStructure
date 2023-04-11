const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
}

const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
};

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
    toString() {
        return `${this.key}`;
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
        this.compareFn = compareFn;
        this.root = null;
    }
    // 计算节点的高度
    getNodeHeight(node) {
        if (node == null) return -1;
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
    }
    // 计算一个节点的平衡因子
    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }
    /**
     * 左->左：向右的单旋转
     * 右->右：向左的单旋转
     * 左->右：向右的双旋转（先LL旋转，再RR旋转）
     * 右->左：向左的双旋转（先RR旋转，再LL旋转）
     */
    /**
     * 左->左: 向右的单旋转
     * 这种情况出现于节点的左侧子节点的高度大于右侧子节点的高度时，并且左侧子节点也是平衡或左侧较重的
     *
     *       b                           a
     *      / \                         / \
     *     a   e -> rotationLL(b) ->   c   b
     *    / \                             / \
     *   c   d                           d   e
     *
     * @param node Node<T>
     */
    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }
    /**
     * 右->右: 向左的单旋转
     * 它出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点也是平衡或右侧较重的
     *
     *     a                              b
     *    / \                            / \
     *   c   b   -> rotationRR(a) ->    a   e
     *      / \                        / \
     *     d   e                      c   d
     *
     * @param node Node<T>
     */
    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }
    /**
     * 左->右：向右的双旋转（先LL旋转，再RR旋转）
     * 这种情况出现于左侧子节点的高度大于右侧子节点的高度，并且左侧子节点右侧较重
     * @param {*} node Node<T>
     */
    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }
    /**
     * 右->左：向左的双旋转（先RR旋转，再LL旋转）
     * 这种情况出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点左侧较重
     * @param {*} node Node<T>
     */
    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }
    insert(key) {
        this.root = this.insertNode(this.root, key);
    }
    insertNode(node, key) {
        if (node == null) return new Node(key);
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
        } else {
            return node;
        }
        const balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
                node = this.rotationLL(node);
            } else {
                node = this.rotationLR(node);
            }
        }
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
                node = this.rotationRR(node);
            } else {
                node = this.rotationRL(node);
            }
        }
        return node;
    }
    removeNode(node, key) {
        node = super.removeNode(node, key);
        if (node == null) return node;
        const balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            const balanceFactorLeft = this.getBalanceFactor(node.left);
            if (balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationLL(node);
            }
            if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLR(node.left);
            }
        }

        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            const balanceFactorRight = this.getBalanceFactor(node.left);
            if (balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationRR(node);
            }
            if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationRL(node.right);
            }
        }
        return node;
    }
}

/**
 * 红黑树
 * 红黑树也是一个自平衡二叉搜索树
 * 对AVL树插入和移除节点可能会造成旋转，所以我们需要一个包含多次插入和删除的自平衡树，红黑树是比较好的。
 * 如果插入和删除频率较低（我们更需要多次进行搜索操作），那么AVL树比红黑树更好
 * 
 * 在红黑树中，每个节点都遵循以下规则：
 * (1) 顾名思义，每个节点不是红的就是黑的；
 * (2) 树的根节点是黑的；
 * (3) 所有叶节点都是黑的（用NULL引用表示的节点）；
 * (4) 如果一个节点是红的，那么它的两个子节点都是黑的；
 * (5) 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点；
 * (6) 从给定的节点到它的后代节点（NULL叶节点）的所有路径包含相同数量的黑色节点。
 */

const Colors = {
    RED: 'red',
    BLACK: 'black'
}

class RedBlackNode extends Node {
    constructor(key) {
        super(key);
        this.key = key;
        this.color = Colors.RED;
        this.parent = null;
    }

    isRed() {
        return this.color === Colors.RED;
    }
}

class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }
    fixTreeProperties(node) {
        while (node && node.parent && node.parent.color.isRed()
            && node.color == Colors.BLACK) {
            let parent = node.parent;
            const grandParent = parent.parent;
            // 情形A：父节点是左侧子节点
            if (grandParent && grandParent.left === parent) {
                const uncle = grandParent.right;
                // 情形1A：叔节点也是红色——只需要重新填色
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    // 情形2A：节点是右侧子节点——左旋转
                    if (node === parent.right) {
                        this.rotationRR(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    // 情形3A：节点是左侧子节点——右旋转
                    this.rotationLL(grandParent);
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            }
            else { // 情形B：父节点是右侧子节点
                const uncle = grandParent.left;
                // 情形1B：叔节点是红色——只需要重新填色
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    // 情形2B：节点是左侧子节点——左旋转
                    if (node === parent.left) {
                        this.rotationLL(parent); // {19}
                        node = parent;
                        parent = node.parent;
                    }
                    // 情形3B：节点是右侧子节点——左旋转
                    this.rotationRR(grandParent); // {20}
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            }
        }
        this.root.color = Colors.BLACK;
    }
    // 左-左旋转（右旋转）
    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        if (tmp.right && tmp.right.key) {
            tmp.right.parent = node;
        }
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        }
        else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            }
            else {
                node.parent.right = tmp;
            }
        }
        tmp.right = node;
        node.parent = tmp;
    }
    // 右-右旋转（左旋转）
    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        if (tmp.left && tmp.left.key) {
            tmp.left.parent = node;
        }
        tmp.parent = node.parent;
        if (!node.parent) {
            this.root = tmp;
        }
        else {
            if (node === node.parent.left) {
                node.parent.left = tmp;
            }
            else {
                node.parent.right = tmp;
            }
        }
        tmp.left = node;
        node.parent = tmp;
    }
    insert(key) {
        if (this.root == null) {
            this.root = new RedBlackNode(key);
            this.root.color = Colors.BLACK;
        } else {
            const newNode = this.insertNode(this.root, key);
            this.fixTreeProperties(newNode);
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key);
                node.left.parent = node;
                return node.left;
            } else {
                return this.insertNode(node.left, key);
            }
        } else if (node.right == null) {
            node.right = new RedBlackNode(key);
            node.right.parent = node;
            return node.right;
        } else {
            return this.insertNode(node.right, key);
        }
    }
}