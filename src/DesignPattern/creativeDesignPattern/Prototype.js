/**
 * 原型模式
 * JavaScript 中的继承是靠原型链实现的，而原型模式就是将原型对象指向创建对象的类，使这些类共享原型对象的方法与属性，而不是对属性和方法的复制。
 */

// 场景：车的类型有很多，比如卡车、公交车、桥车、火车等。每种车都有不同的价格和速度以及功能。
// 现在就以交通工具为父类，轿车和卡车为子类，实现继承。
// 不实用原型实现继承
// const Vehicle = function (price, speed) {
//     this.price = price;
//     this.speed = speed;
//     this.getPrice = function () {
//         return this.price;
//     }
//     this.changePrice = function () { }
// }
// // 汽车类
// const Car = function (price, speed) {
//     // 构造函数继承交通工具
//     Vehicle.call(this, price, speed)
//     // 重写修改价格方法
//     this.changePrice = function () {
//         return this.price * 0.9
//     }
// }
// // 卡车类
// const Truck = function (price, speed, weight) {
//     Vehicle.call(this, price, speed);
//     // 添加卡车私有变量
//     this.weight = weight;
//     // 重写修改价格方法
//     this.changePrice = function () {
//         return this.price * 0.85
//     }
// }
// const BMW = new Car(3999999, 100);
// console.log('BMW:', BMW.changePrice());
// const BenzTruck = new Truck(1000000, 200, 150);
// console.log(BenzTruck.price, BenzTruck.speed, BenzTruck.weight);
// console.log('奔驰:', BenzTruck.changePrice());
/**
 * 使用构造函数继承，将 Vehicle 为基类，可以实现继承。但每次子类继承都要创建一次父类，当父类构造函数创建时存在很多耗时较长的逻辑，
 * 或者说每次创建的时候都要进行一些重复性的操作，这样对性能的消耗有点大。
 * 所以我们需要引入一种共享机制，这样每当创建基类时，我们将一些简单又差异化的属性可以直接放在构造函数中，
 * 而将一些消耗资源比较大的方法放在基类的原型中，这样我们就会避免很多不必要的消耗。
 */

// 原型模型
const Vehicle = function (price, speed) {
    this.price = price;
    this.speed = speed;
}
Vehicle.prototype = {
    getPrice: function () {
        return this.price;
    },
    changePrice: function () { }
}
// 汽车类
const Car = function (price, speed) {
    Vehicle.call(this, price, speed);
    this.changePrice = function () {
        return this.price * 0.9
    }
}
Car.prototype = new Vehicle();
// 卡车类
const Truck = function (price, speed, weight) {
    Vehicle.call(this, price, speed);
    this.weight = weight;
    this.changePrice = function () {
        return this.price * 0.85
    }
}
Truck.prototype = new Vehicle();

const BMW = new Car(1000000, 200);
console.log('BMW');
console.log('继承的原型方法:', BMW.getPrice());
console.log('重写的原型方法:', BMW.changePrice());
const BenzTruck = new Truck(2000000, 150, 100);
console.log('奔驰');
console.log(BenzTruck.price, BenzTruck.speed, BenzTruck.weight);
console.log('重写的原型方法:', BenzTruck.changePrice());

/**
 * 原型继承
 * 原型模式更多的用在对象的创建上，当创建一个实例对象的构造函数比较特殊，或者要继承多个基类时，此事最好不要用new关键字去复制这些基类，但可以通过对这些对象属性通过复制来实现创建
 */

function prototypeExtend() {
    // 缓存类
    let F = function () { };
    for (let i = 0; i < arguments.length; i++) {
        // 遍历各个模版对象的属性，将这些属性复制到缓存类原型中
        for (let key in arguments[i]) {
            F.prototype[key] = arguments[i][key]
        }
    }
    // 返回一个原型对象的实例
    return new F();
}

const plugin = prototypeExtend({
    price: 100,
    changePrice: function () { return this.price * 0.9 }
}, {
    speed: 150,
    changeSpeed: function () { console.log('不能提速了～～～') }
}, {
    weight: 200,
})

console.log(plugin.changePrice()); // 90
plugin.changeSpeed(); // 不能提速了～～～
console.log(plugin.weight); // 200

// 什么时候用原型继承？
// 原型模式可以让多个对象分享同一个原型对象的属性和方法，这也是一种继承方式，这种继承方式的实现时不需要创建的，而是将原型对象分享给那些继承的对象。
// 有时候每个继承对象独立拥有一份原型对象，此事我们就需要对原型队形进行复制。
// 原型对象更适合在创建复杂的对象时，对于那些需要一直在变化而导致对象结构不停改变时，将那些比较稳定的属性与方法公用而提取的继承实现。

// '原型继承的实现不需要了解创建过程'?
// 原型继承的关键就是将父类的实例赋值给子类的原型prototype，而我们在实例化子类时，是不会对prototype进行 new 的操作。
// 换句话说，原型继承的精髓就是让子类的实例共享prototype上的属性和方法，减少消耗，而非重新复制或者创建一个新的对象，这也是原型继承的初衷。