function defaultEquals(a, b) {
    return a === b;
}

class DoublyNode {
    constructor(element, next, prev) {
        this.element = element;
        this.next = next;
        this.prev = prev;
    }
}
/**
 * 双向链表
 */
class DoublyLinkedList {
    constructor(equalsFn = defaultEquals) {
        this.count = 0; // 存储链表中的元素数量
        this.head = null; // 保存第一个元素的引用
        this.tail = null; // 保存第最后一个元素的引用
        this.equalsFn = equalsFn;
    }
    getElementAt(index) {
        if (!(index >= 0 && index <= this.count)) return;
        let node = this.hear;
        for (let i = 0; i < index && node != null; i++) {
            node = node.next;
        }
        return node;
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
    remove(el) {
        const index = this.indexOf(el);
        if (index >= 0) return this.removeAt(index);
        return;
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
    getHead() { return this.head }
    getTail() {
        return this.tail;
    }
    isEmpty() { return this.size() === 0 }
    size() { return this.count }
    clear() {
        this.count = 0;
        this.head = null;
        this.tail = null;
    }
    toString() {
        if (!this.head) return;
        let str = `${this.head.element}`;
        let current = this.hear.next;
        while (current != null) {
            str = `${str}, ${current.element}`;
            current = current.next;
        }
        return str;
    }
}