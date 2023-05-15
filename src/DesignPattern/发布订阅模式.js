/**
 * 发布-订阅模式（Publish-Subscribe Pattern）：也叫消息队列模式，它是一种将发布者和订阅者解耦的设计模式。
 * 在前端开发中，可以使用发布-订阅模式来实现组件之间的通信。
 * JavaScript中的发布/订阅模式（Pub/Sub）是一种常用的设计模式。它允许在应用程序中定义对象之间的一对多的依赖关系，当一个对象的状态发生变化时，所有依赖于它的对象都会被通知和更新。
 * 在发布/订阅模式中，有两种类型的对象：发布者和订阅者。发布者是事件的发出者，它通常维护一个事件列表，并且可以向列表中添加或删除事件。当某个事件发生时，它会将这个事件通知给所有订阅者。订阅者则是事件的接收者，它们订阅感兴趣的事件，并且在事件发生时接收通知。
 * 发布订阅模式可以帮助我们实现松耦合的设计，让对象之间的依赖关系变得更加灵活。它在前端开发中的应用非常广泛，例如 Vue.js 中的事件总线、Redux 中的 store 等。
 */
// 发布者对象
const publisher = {
    events: {},
    // 添加事件到列表中
    addEvent: function (event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    },
    // 发布事件
    publishEvent: function (event, data) {
        if (this.events[event]) {
            const eventList = this.events[event];
            for (let i = 0; i < eventList.length; i++) {
                eventList[i](data);
            }
        }
    },
    // 移除事件
    removeEvent: function (event, callback) {
        if (this.events[event]) {
            const eventList = this.events[event];
            for (let i = 0; i < eventList.length; i++) {
                if (eventList[i] === callback) {
                    eventList.splice(i, 1);
                    break;
                }
            }
        }
    }
}
// 订阅者对象
const subscriber = {
    handleEvent: function (data) {
        console.log(data);
    }
}

// 订阅一个事件
publisher.addEvent('event1', subscriber.handleEvent);

console.log(publisher.events);
// 发布一个事件
publisher.publishEvent('event1', 'Hello, world!');

console.log(publisher.events);

// 取消订阅一个事件
publisher.removeEvent('event1', subscriber.handleEvent);

console.log(publisher.events);