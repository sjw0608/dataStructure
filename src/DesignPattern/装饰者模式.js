// 装饰者模式（Decorator Pattern）：动态地给一个对象添加额外的职责。在前端开发中，可以使用装饰者模式来动态修改组件的行为和样式。

// 1.通过扩展对象的属性或方法来实现装饰者模式
const obj = {
    foo() {
        console.log('foo');
    }
}
// 定义一个装饰函数，用来拓展原始对象的方法
function barDecorator(obj) {
    obj.bar = function () {
        console.log('bar');
    }
    return obj;
}
const decoratedObj = barDecorator(obj);
decoratedObj.foo(); // foo
decoratedObj.bar(); // bar

// 2.通过扩展对象的原型来实现装饰者模式

function Foo() { }
Foo.prototype.foo = function () {
    console.log('foo');
}
function barDecorator2(clazz) {
    clazz.prototype.bar = function () {
        console.log('bar');
    }
}
barDecorator2(Foo);
const obj2 = new Foo();
obj2.foo(); // foo
obj2.bar(); // bar

// 需要注意的是，装饰者模式可以嵌套使用，也就是说，我们可以通过多个装饰函数来依次为一个组件添加多个不同的功能。
// 同时，装饰者模式也可以用于对已有的组件进行扩展，使得我们可以在不改变原有代码的情况下，给组件添加新的行为和样式