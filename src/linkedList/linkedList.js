function defaultEquals(a, b) {
    return a === b;
}

class Node {
    constructor(element, next) {
        this.element = element; // 加入链表元素的值
        this.next = next; // 指向链表中下一个元素的指针
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
export default class LinkedList {
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
list.insert(55, 2)
console.log(list.toString());
