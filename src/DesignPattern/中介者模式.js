// 中介者模式（Mediator Pattern）：通过一个中介对象来封装一系列对象之间的交互。在JavaScript中，可以使用事件调度器来实现中介者模式。
// 在前端开发中，中介者模式常常被用于管理复杂的用户界面或组件之间的交互，
// 比如 GUI 组件、聊天室、游戏等等。通过引入一个中介者对象，各个组件可以向中介者对象发送消息或事件，而不需要知道消息或事件的接收者是谁。
// 中介者对象负责接收并分发消息或事件，从而实现组件之间的解耦和统一管理。

const Mediator = {
    components: [],
    addComponent(component) {
        this.components.push(component);
    },
    broadcast(source, message) {
        this.components
            .filter(component => component !== source)
            .forEach(component => component.receive(message));
    }
}

class Component {
    constructor() {
        this.mediator = Mediator;
        this.mediator.addComponent(this);
    }
    send(message) {
        this.mediator.broadcast(this, message);
    }
    receive(message) {
        console.log(`Received message: ${message}`);
    }
}
// 使用中介者模式进行组件之间的通信
const componentA = new Component();
const componentB = new Component();
componentA.send("Hello from Component A");
componentB.send("Hi from Component B");