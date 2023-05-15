// 适配器模式（Adapter Pattern）：将一个类的接口转化为客户端所期望的接口，使得原本不兼容的类可以一起工作。在前端开发中，可以使用适配器模式来处理不同浏览器之间的兼容性问题。
// 适配器模式通常包含三个角色：客户端、目标对象和适配器对象。客户端调用适配器对象的接口，适配器对象再调用目标对象的接口，将目标对象的接口转换为客户端需要的接口，从而实现兼容性。
// 另外，适配器模式也可以用于将不同的第三方组件或插件进行整合和兼容。例如，当一个网站需要使用不同的图表库来绘制图表时，可以使用适配器模式将这些图表库进行封装，从而实现统一的调用接口，方便使用和维护。

// 目标接口
class Target {
    request() {
        return `Target: 请求完成!`
    }
}
// 需要适配的对象
class Adaptee {
    specificRequest() {
        return `Adaptee: 请求完成!`
    }
}
// 适配对象
class Adapter extends Target {
    constructor(adaptee) {
        super();
        this.adaptee = adaptee;
    }

    request() {
        const result = this.adaptee.specificRequest();
        return `Adapter: ${result}`;
    }
}

// 使用适配器模式
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
console.log(adapter.request()); // 输出：Adapter: Adaptee: 请求完成！

// 通过适配器模式，我们可以将不同接口的对象进行统一封装，从而方便我们使用和维护代码