const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
};
function defaultEquals(a, b) {
    return a === b;
}
function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
class Node {
    constructor(element, next) {
        this.element = element; // 加入链表元素的值
        this.next = next; // 指向链表中下一个元素的指针
    }
}

class DoublyNode extends Node {
    constructor(element, next, prev) {
        super(element, next,)
        this.prev = prev;
    }
}
/**
 * 单向链表
 * push(element)：向链表尾部添加一个新元素。
 * insert(element, position)：向链表的特定位置插入一个新元素。
 * getElementAt(index)：返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回undefined。
 * remove(element)：从链表中移除一个元素。
 * indexOf(element)：返回元素在链表中的索引。如果链表中没有该元素则返回-1。
 * removeAt(position)：从链表的特定位置移除一个元素。
 * isEmpty()：如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。
 * size()：返回链表包含的元素个数，与数组的length属性类似。
 * toString()：返回表示整个链表的字符串。由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的toString方法，让其只输出元素的值
 */
class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0; // 存储链表中的元素数量
        this.head = null; // 保存第一个元素的引用
        this.equalsFn = equalsFn;
    }
    push(el) {
        const node = new Node(el);
        let current;
        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            // 找到链表的最后一项
            while (current.next != null) {
                current = current.next;
            }
            // 将最后一项的next赋值 node 建立链接
            current.next = node;
        }
        this.count++;
    }
    insert(el, index) {
        if (!(index >= 0 && index <= this.count)) return false;
        const node = new Node(el);
        if (index == 0) {
            const current = this.head;
            node.next = current;
            this.head = node;
        } else {
            let previous = this.getElementAt(index - 1);
            const current = previous.next;
            node.next = current;
            previous.next = node;
        }
        this.count++;
        return true;
    }
    getElementAt(index) {
        if (!(index >= 0 && index <= this.count)) return undefined;
        let node = this.head;
        for (let i = 0; i < index && node != null; i++) {
            node = node.next;
        }
        return node;
    }
    remove(el) {
        const index = this.indexOf(el);
        if (index >= 0) return this.removeAt(index);
        return;
    }
    removeAt(index) {
        if (!(index >= 0 && index < this.count)) return undefined;
        let current = this.head;
        if (index === 0) {
            this.head = current.next;
        } else {
            let previous = this.getElementAt(index - 1);
            current = previous.next;
            previous.next = current.next;
        }
        this.count--;
        return current.element;
    }
    indexOf(el) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(el, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    getHead() {
        return this.head;
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.count;
    }
    clear() {
        this.head = null;
        this.count = 0;
    }
    toString() {
        if (!this.head) return;
        let str = `${this.head.element}`;
        let current = this.head.next;
        while (current != null) {
            str = `${str},${current.element}`;
            current = current.next;
        }
        return str;
    }
}
const list = new LinkedList();
list.push(15);
list.push(10);
list.push(23);
list.push(33);
list.push(43);
// list.insert(55, 2)
list.removeAt(2)
console.log(list.toString());
/**
 * 双向链表
 */
class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
        this.tail = null; // 保存第最后一个元素的引用
    }
    push(el) {
        const node = new DoublyLinkedList(el);
        if (this.count == null) {
            this.head = node;
            this.tail = node;
        } else {
            let current = this.tail;
            node.prev = current;
            current.next = node;
            this.tail = node;
        }
        this.count++;
    }
    insert(el, index) {
        if (!(index >= 0 && index <= this.count)) return false;
        const node = new DoublyNode(el);
        let current = this.head;
        if (index === 0) {
            if (this.heade == null) {
                this.head = node;
                this.tail = node;
            } else {
                current.prev = node;
                node.next = current;
                this.head = node;
            }
        } else if (index === this.count) {
            current = this.tail;
            current.next = node;
            node.prev = current;
            this.tail = node;
        } else {
            let previous = this.getElementAt(index - 1);
            current = previous.next;
            previous.next = node;
            node.prev = previous;
            node.next = current;
            current.prev = node;
        }
        this.count++;
        return true;
    }
    removeAt(index) {
        if (!(index >= 0 && index < this.count)) return;
        let current = this.head;
        if (index === 0) {
            this.head = current.next;
            if (this.count === 1) {
                this.tail = null;
            } else {
                this.head.prev = null;
            }
        } else if (index === this.count - 1) {
            current = this.tail;
            this.tail = current.prev;
            this.tail.next = null;
        } else {
            current = this.getElementAt(index);
            let previous = current.prev;
            previous.next = current.next;
            current.next.prev = previous;
        }
        this.count--;
        return current.element;
    }
    indexOf(el) {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(el, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    getTail() {
        return this.tail;
    }
    clear() {
        this.count = 0;
        this.head = null;
        this.tail = null;
    }
}
/**
 * 循环链表
 * 循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。
 * 循环链表和链表之间唯一的区别在于，最后一个元素指向下一个元素的指针（tail.next）不是引用undefined，而是指向第一个元素（head）
 */
/**
 * 单向循环链表
 */
class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
        super(equalsFn)
    }
    push(el) {
        const node = new Node(el);
        let current;
        if (this.head == null) {
            this.head = node;
        } else {
            current = this.getElementAt(this.count - 1);
            current.next = node;
        }
        node.next = node;
        this.count++;
    }
    insert(el, index) {
        if (!(index >= 0 && index <= this.count)) return false;
        const node = new Node(el);
        let current = this.head;
        if (index === 0) {
            if (!current) {
                this.head = node;
                node.next = node;
            } else {
                node.next = current;
                current = this.getElementAt(this.count - 1);
                current.next = node;
                this.head = node;
            }
        } else {
            let previous = this.getElementAt(index - 1);
            current = previous.next;
            previous.next = node;
            node.next = current;
        }
        this.count++;
        return true;
    }
    removeAt(index) {
        if (!(index >= 0 && index < this.count)) return;
        let current = this.head;
        if (index === 0) {
            if (this.count === 1) {
                this.head = null;
            } else {
                let lastElement = this.getElementAt(this.count);
                this.head = current.next;
                lastElement.next = this.head;
            }
        } else {
            let previous = this.getElementAt(index - 1);
            current = previous.next;
            previous.next = current.next;
        }
        this.count--;
        return current.element;
    }
}
/**
 * 有序链表
 * 有序链表是指保持元素有序的链表结构。
 * 除了使用排序算法之外，我们还可以将元素插入到正确的位置来保证链表的有序性。
 */
class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
        super(equalsFn);
        this.compareFn = compareFn;
    }
    push(element) {
        if (this.isEmpty()) {
            super.push(element);
        } else {
            const index = this.getIndexNextSortedElement(element);
            super.insert(element, index);
        }
    }
    insert(element, index = 0) {
        if (this.isEmpty()) {
            return super.insert(element, index === 0 ? index : 0);
        }
        const pos = this.getIndexNextSortedElement(element);
        return super.insert(element, pos);
    }
    getIndexNextSortedElement(element) {
        let current = this.head;
        for (let i = 0; i < this.size() && current; i++) {
            const comp = this.compareFn(element, current.element);
            if (comp === Compare.LESS_THAN) {
                return i;
            }
            current = current.next;
        }
        return i;
    }
}
/**
 * 用双向链表创建栈数据结构
 */
class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList();
    }
    push(el) {
        this.items.push(el)
    }
    pop() {
        if (this.isEmpty()) return;
        return this.items.removeAt(this.size() - 1);
    }
    peek() {
        if (this.isEmpty()) return;
        return this.items.getElementAt(this.size() - 1).element;
    }
    isEmpty() {
        return this.items.isEmpty();
    }
    size() {
        return this.items.size();
    }
    clear() {
        this.items = new DoublyLinkedList();
    }
    toString() {
        return this.items.toString()
    }
}