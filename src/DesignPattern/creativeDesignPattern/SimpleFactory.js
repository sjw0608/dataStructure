/**
 * 神奇的魔术师--简单工厂模式(Simple Factory)
 * 简单工厂模式(Simple Factory)：又叫静态工厂方法，由一个工厂对象决定创建某一种产品对象类的实例。主要用来创建同一类对象。
 * 
 * 谈谈简单工厂模式和类的异同点？
 * 相同点：都是为了方便创建对象
 * 不同点：简单工厂模式其实类，不同的是，它对类进行了进一步的分类，通过类型参数判断创建哪种类型的类。就像例子中的Child类，通过type参数，判断是创建一个Boy，还是创建一个Girl。
 */

// 简单工厂模式一：
function Boy(name) {
    this.sex = 'male';
    this.name = name;
}

Boy.prototype = {
    play: function () {
        console.log('我们喜欢打篮球');
    }
}

function Girl(name) {
    this.sex = 'female';
    this.name = name;
}

Girl.prototype = {
    play: function () {
        console.log('我们喜欢打排球');
    }
}

function Child(type, name) {
    if (type === 'boy') {
        return new Boy(name);
    } else {
        return new Girl(name);
    }
}

let Mike = new Child('boy', 'Mike');
let Jean = new Child('girl', 'Jean');
console.log(Mike.sex, Mike.name); // male Mike
Mike.play(); // 我们喜欢打篮球
console.log(Jean.sex, Jean.name); // female Jean
Jean.play(); // 我们喜欢打排球

// 简单工厂模式二：

function ChildII(type, name) {
    let obj = new Object();
    obj.name = name;
    if (type === 'boy') {
        obj.sex = 'male';
        obj.play = function () {
            console.log('我们喜欢打篮球');
        }
    } else {
        obj.sex = 'female';
        obj.play = function () {
            console.log('我们喜欢打排球');
        }
    }
    return obj;
}

let Jack = new ChildII('boy', 'Jack');
let Tom = new ChildII('girl', 'Tom');
console.log(Jack.sex, Jack.name); // male Jack
Jack.play(); // 我们喜欢打篮球
console.log(Tom.sex, Tom.name); // female Tom
Tom.play(); // 我们喜欢打排球

/**
 * 第一种简单工厂模式是通过类实例化对象创建的，
 * 第二种是通过创建一个新对象然后包装增强其功能和属性实现的。
 * 他们实现方式的差异性也导致了，第一种通过类创建的对象可以共用他们父类上的原型方法。
 * 而后面通过寄生方式创建的对象都是一个新的个体，他们的方法就不能共用了。
 */