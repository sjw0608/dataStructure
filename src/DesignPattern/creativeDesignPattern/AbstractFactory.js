/**
 * 抽象工厂模式(Abstract Factory)：
 * 
 * 抽象类就是一种声明但是不能够使用的类，当使用时就会报错。
 * 抽象类的一个意义就在于为子类忘记充血方法时提供一个友好的异常提示。
 */
// 在类的方法中手动地抛出错误来模拟抽象类
const Car = function () { }
Car.prototype = {
    getPrice: function () {
        return new Error('抽象方法不能调用');
    },
    getSpeed: function () {
        return new Error('抽象方法不能调用');
    }
}
let car = new Car();
console.log(car.getPrice());
console.log(car.getSpeed());
/**
 * 我们如何写一个抽象工厂呢？
 * 1、既然是抽象工厂，那么就需要将抽象类都放到一个工厂里，而这个工厂就是一个对象，抽象类就是它的各个属性。
 * 2、判断子类要继承哪一种父类。方法：直接将父类中的抽象类名称作为参数去做判断
 * 3、确定继承方式
 */
// 抽象工厂模式
const VehicleFactory = function (subType, superType) {
    // 判断抽象工厂中是否有该抽象类 
    if (typeof VehicleFactory[superType] === 'function') {
        // 缓存类
        function F() { }
        // 继承父类属性和方法
        F.prototype = new VehicleFactory[superType]();
        // 将子类 constructor 指向子类
        subType.constructor = subType;
        // 子类原型继承父类
        subType.prototype = new F();
    } else {
        // 不存在该抽象类时抛出错误
        throw new Error('未创建该抽象类');
    }
}

// 小汽车抽象类
VehicleFactory.Car = function () {
    this.type = 'car';
}
VehicleFactory.Car.prototype = {
    getPrice: function () {
        return new Error('抽象方法不能调用');
    },
    getSpeed: function () {
        return new Error('抽象方法不能调用');
    }
}
// 货车抽象类
VehicleFactory.Truck = function () {
    this.type = 'truck';
}
VehicleFactory.Truck.prototype = {
    getPrice: function () {
        return new Error('抽象方法不能调用');
    },
    getSpeed: function () {
        return new Error('抽象方法不能调用');
    }
}

// BMW汽车的子类
const BMW = function (price, speed) {
    this.price = price;
    this.speed = speed;
}
VehicleFactory(BMW, 'Car');
BMW.prototype.getPrice = function () {
    return this.price;
}
BMW.prototype.getSpeed = function () {
    return this.speed;
}

// 奔驰货车子类
const BenzTruck = function (price, speed) {
    this.price = price;
    this.speed = speed;
}
VehicleFactory(BenzTruck, 'Truck');

let myCar = new BMW(1000000, 500);
console.log(myCar.type); // car
console.log(myCar.getPrice()); // 1000000
console.log(myCar.getSpeed()); // 500

let myBenz = new BenzTruck(10000000, 200);
console.log(myBenz.type); // truck
console.log(myBenz.getPrice()); // Error: 抽象方法不能调用
console.log(myBenz.getSpeed()); // Error: 抽象方法不能调用

/**
 * 抽象工厂模式与工厂模式方法以及简单工厂模式之间的异同点及其关系
 * 1、简单工厂模式：声明多个相同类型的功能类和一个工厂类，工厂类至少有一个参数，用于判断创建何种类型的功能类。
 * 2、工厂模式方法：对简单工厂模式的封装优化。使用简单工厂模式的时候，如果相同类型的类过多，就要不断的增加工厂类的类型判断语句。不如直接将所有相同类型的功能类作为工厂类的属性，当需要创建某种类时，直接将类的名称作为参数传入即可。
 * 3、抽象工厂模式：对工厂模式方法的进一步优化。在创建不同类型的功能类的时候可能会忘记创建对应的方法，所以就自己制作一个抽象类作为父类，将每个类大概会用到的方法提前进行声明并抛出异常，如果子类没有重写这个方法，在调用的时候就会有一个异常提示。
 * 4、抽象工厂模式也是创建模式中唯一一种抽象化创建模式。该模式创建出的结果不是一个真实的对象实例，而是一个类簇，它制定了类的结构（类应该有哪些方法）。从而区别于简单工厂模式创建单一对象，工厂方法模式创建多类对象（虽然很多类挂在工厂原型下，但是实际上在创建的时候也会创建一个对象）。
 */