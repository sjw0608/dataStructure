/**
 * 队列和双端队列
 * 队列遵循：先进先出(FIFO)
 * 
 * enqueue(element(s))：向队列尾部添加一个（或多个）新的项。
 * dequeue()：移除队列的第一项（即排在队列最前面的项）并返回被移除的元素。
 * peek()：返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与Stack类的peek方法非常类似）。该方法在其他语言中也可以叫作front方法。
 * isEmpty()：如果队列中不包含任何元素，返回true，否则返回false。
 * size()：返回队列包含的元素个数，与数组的length属性类似。
 */

class Queue {
    constructor() {
        this._count = 0;
        this._lowestCount = 0;
        this._items = {}; // 存储队列中的元素
    }
    enqueue(el) {
        this._items[this._count++] = el;
    }
    dequeue() {
        if (this.isEmpty()) return undefined;
        const result = this._items[this._lowestCount];
        Reflect.deleteProperty(this._items, this._lowestCount++);
        return result;
    }
    peek() {
        if (this.isEmpty()) return undefined;
        return this._items[this._lowestCount];
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this._count - this._lowestCount;
    }
    clear() {
        this._count = 0;
        this._lowestCount = 0;
        this._items = {};
    }
    toString() {
        if (this.isEmpty()) return '';
        let objString = `${this._items[this._lowestCount]
            }`;
        for (let i = this._lowestCount + 1; i < this._count; i++) {
            objString = `${objString}, ${this._items[i]} `;
        }
        return objString;
    }
}

// const queue = new Queue();
// console.log(queue.isEmpty()); // 输出true
// queue.enqueue('John');
// queue.enqueue('Jack');
// console.log(queue.toString()); // John, Jack
// queue.enqueue('Camila');
// console.log(queue.toString()); // John, Jack, Camila
// console.log(queue.size()); // 输出3
// console.log(queue.isEmpty()); // 输出false
// queue.dequeue(); // 移除John
// queue.dequeue(); // 移除Jack
// console.log(queue.toString()); // Camila

/**
 * 击鼓传花游戏
 * 模拟击鼓传花（如果你把花传给了旁边的人，你被淘汰的威胁就立刻解除了）。
 * 一旦达到给定的传递次数，拿着花的那个人就被淘汰了（从队列中移除——行）。
 * 最后只剩下一个人的时候，这个人就是胜者
 */
function hotPotato(elementsList, num) {
    const queue = new Queue();
    const elimitatedList = []; // 淘汰顺序
    for (let i = 0; i < elementsList.length; i++) {
        queue.enqueue(elementsList[i]);
    }
    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue());
        }
        elimitatedList.push(queue.dequeue());
    }
    return {
        elimitated: elimitatedList,
        winner: queue.dequeue(),
    }
}
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(hotPotato(arr, 8));