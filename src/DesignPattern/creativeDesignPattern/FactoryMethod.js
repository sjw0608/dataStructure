/**
 * 工厂方法模式(Factory Method)：通过对产品类的抽象使其创建业务主要负责用于创建多类产品的实例。
 * 
 * 前面学过的简单工厂模式，每次只要有新的类，就需要添加做一次类型判断。因此，当创建多类对象时，简单工厂模式就不太适用了。
 * 所以此时使用工厂模式，就可以轻松地创建多类对象，避免了使用者与对象类之间的耦合，用户不必关心创建对象的具体方法，只要调用工厂方法即可。
 * 另外，这里使用了安全模式，避免新来的同事忘记使用new关键字而导致的错误。
*/

// 安全模式创建的工厂类
var Factory = function (type, content) {
    if (this instanceof Factory) {
        let s = new this[type](content);
        return s;
    } else {
        return new Factory(type, content)
    }
}

Factory.prototype = {
    Aaa: function (content) {
        this.content = content;
        //...
    },
    Bbb: function (content) {
        this.content = content;
        //...
    }
    // ...
};

let aaa = Factory('Aaa', 'red')
let bbb = Factory('Bbb', 'block');