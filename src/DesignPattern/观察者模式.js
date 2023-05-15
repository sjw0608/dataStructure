/**
 * 观察者模式（Observer Pattern）：当对象间存在一对多的关系时，使用观察者模式。
 * 当被观察的对象发生变化时，其所有的观察者都会收到通知并进行相应的操作。在JavaScript中，可以使用回调函数或事件监听来实现观察者模式。
 */

// 在前端开发中，观察者模式常被用来实现组件间的数据传递和事件处理。比如，当一个组件的状态发生改变时，可以通过观察者模式来通知其他组件更新自身的状态或视图。
// 在观察者模式中，通常会定义两种角色：
// Subject（主题）：它是被观察的对象，当其状态发生改变时会通知所有的观察者。
// Observer（观察者）：它是观察主题的对象，当主题状态发生改变时会接收到通知并进行相应的处理。

class Subject {
    constructor() {
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    notify(data) {
        this.observers.forEach(obs => obs.update(data));
    }
}

class Observer {
    update(data) {
        console.log(data);
    }
}
const subject = new Subject()
const observer1 = new Observer()
const observer2 = new Observer()

subject.addObserver(observer1)
subject.addObserver(observer2)

subject.notify('Hello, world!')
// Output:
// Received data: Hello, world!
// Received data: Hello, world!

subject.removeObserver(observer1)

subject.notify('Goodbye, world!')
