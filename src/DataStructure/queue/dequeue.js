
/**
 * 双端队列：是一种允许我们同时从前端和后端添加和移除元素的特殊队列。
 * 双端队列同时遵守了先进先出和后进先出原则，可以说它是把队列和栈相结合的一种数据结构。
 * addFront(element)：该方法在双端队列前端添加新的元素。
 * addBack(element)：该方法在双端队列后端添加新的元素（实现方法和Queue类中的enqueue方法相同）。
 * removeFront()：该方法会从双端队列前端移除第一个元素（实现方法和Queue类中的dequeue方法相同）。
 * removeBack()：该方法会从双端队列后端移除第一个元素（实现方法和Stack类中的pop方法一样）。
 * peekFront()：该方法返回双端队列前端的第一个元素（实现方法和Queue类中的peek方法一样）。
 * peekBack()：该方法返回双端队列后端的第一个元素（实现方法和Stack类中的peek方法一样）。
 */

class Dequeue {
    constructor() {
        this._count = 0;
        this._lowestCount = 0;
        this._items = {};
    }
    addFront(el) {
        if (this.isEmpty()) {
            this.addBack(el);
        } else if (this._lowestCount > 0) {
            this._items[--this._lowestCount] = el
        } else {
            let i = this._count;
            while (i > 0) {
                this._items[i] = this._items[i - 1];
                i--;
            }
            this._count++;
            this._lowestCount = 0;
            this._items[0] = el;
        }
    }
    addBack(el) {
        this._items[this._count++] = el;
    }
    removeFront() {
        if (this.isEmpty()) return undefined;
        const result = this._items[this._lowestCount];
        Reflect.deleteProperty(this._items, this._lowestCount++);
        return result;
    }
    removeBack() {
        if (this.isEmpty()) return undefined;
        const result = this._items[--this._count];
        Reflect.deleteProperty(this._items, this._count);
        return result;
    }
    peekFront() {
        if (this.isEmpty()) return undefined;
        return this._items[this._lowestCount];
    }
    peekBack() {
        if (this.isEmpty()) return undefined;
        return this._items[this._count - 1]
    }
    isEmpty() {
        return this.size() === 0;
    }
    clear() {
        this._count = 0;
        this._lowestCount = 0;
        this._items = {}
    }
    size() {
        return this._count - this._lowestCount;
    }
    toString() {
        if (this.isEmpty()) return '';
        let objString = `${this._items[this._lowestCount]}`;
        for (let i = this._lowestCount + 1; i < this._count; i++) {
            objString = `${objString},${this._items[i]}`;
        }
        return objString;
    }
}

// const deque = new Dequeue();
// console.log(deque.isEmpty()); // 输出true
// deque.addBack('John');
// deque.addBack('Jack');
// console.log(deque.toString()); // John, Jack
// deque.addBack('Camila');
// console.log(deque.toString()); // John, Jack, Camila
// console.log(deque.size()); // 输出3
// console.log(deque.isEmpty()); // 输出false
// deque.removeFront(); // 移除John
// console.log(deque.toString()); // Jack, Camila
// deque.removeBack(); // Camila决定离开
// console.log(deque.toString()); // Jack
// deque.addFront('John'); // John回来询问一些信息
// console.log(deque.toString()); // John, Jack

/**
 * 回文检查器
 * “回文”是指正读反读都能读通的句子，它是古今中外都有的一种修辞方式和文字游戏，如“我为人人，人人为我”等
 */

function palindromeChecker(aString) {
    if (!aString && typeof aString !== 'string' && aString.length === 0) return false;
    const dequeue = new Dequeue();
    const lowerString = aString.toLocaleLowerCase().split(' ').join('');
    let isEqual = true, firstChild, lastChild;
    for (let i = 0; i < lowerString.length; i++) {
        dequeue.addBack(lowerString.charAt(i));
    }
    while (dequeue.size() > 1 && isEqual) {
        firstChild = dequeue.removeFront();
        lastChild = dequeue.removeBack();
        if (firstChild !== lastChild) {
            isEqual = false;
        }
    }
    return isEqual;
}

const str = '123,321,123,321';
console.log(palindromeChecker(str));
