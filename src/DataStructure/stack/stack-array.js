
/**
 * 基于Array的栈结构
 * 栈遵循 LIFO（先进后出） 规则
 * 方法
 * push(element(s))：添加一个（或几个）新元素到栈顶。
 * pop()：移除栈顶的元素，同时返回被移除的元素。
 * peek()：返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）
 * isEmpty()：如果栈里没有任何元素就返回true，否则返回false。
 * clear()：移除栈里的所有元素。
 * size()：返回栈里的元素个数。该方法和数组的length属性很类似。
 */

class Stack {
    constructor() {
        this.items = [];
    }
    push(el) {
        // 如栈，添加元素到栈顶,也就是数组的末尾元素
        this.items.push(el);
    }
    pop() {
        // 出栈，删除最后一次入栈的元素
        return this.items.pop();
    }
    peek() {
        // 查看栈顶的元素
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return this.items.length;
    }
    clear() {
        this.items = [];
    }
}

const stack = new Stack();
stack.push(8);
stack.isEmpty();
console.log(stack.isEmpty());