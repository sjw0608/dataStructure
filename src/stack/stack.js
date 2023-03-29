/**
 * 基于Object的实现
 */

class Stack {
    constructor() {
        this._count = 0; // 记录栈的大小
        this._items = {};
    }
    push(el) {
        this._items[this._count++] = el;
    }
    pop() {
        if (this.isEmpty()) return undefined;
        const result = this._items[--this._count];
        Reflect.deleteProperty(this._items, this._count);
        return result;
    }
    peek() {
        if (this.isEmpty()) return undefined;
        return this._items[this._count - 1];
    }
    toString() {
        if (this.isEmpty()) return '';
        let objString = `${this._items[0]}`
        for (let i = 1; i < this._count; i++) {
            objString += `,${this._items[i]}`
        }
        return objString;
    }
    clear() {
        while (!this.isEmpty()) {
            this.pop()
        }
    }
    isEmpty() {
        return this._count === 0;
    }
    size() {
        return this._count;
    }
}

// 十进制数转位二进制熟
function decimalToBinary(decNum) {
    const stack = new Stack();
    let number = decNum, binaryString = '';
    while (number > 0) {
        stack.push(Math.floor(number % 2));
        number = Math.floor(number / 2);
    }
    while (!stack.isEmpty()) {
        binaryString += stack.pop().toString();
    }
    return binaryString
}

// 进阶: 把十进制数转化为基数2～36的任意进制
function baseConverter(decNum, base = 2) {
    const stack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = decNum, baseString = '';
    if (!(base >= 2 && base <= 36)) return number;
    while (number > 0) {
        stack.push(Math.floor(number % base));
        number = Math.floor(number / base);
    }
    while (!stack.isEmpty()) {
        baseString += digits[stack.pop()];
    }
    return baseString
}

