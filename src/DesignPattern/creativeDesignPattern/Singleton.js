/**
 * 单例模式(Singleton)：又称单体模式，是只允许实例化一次的对象类。有时我们也用一个对象类规划一个命名空间，井井有条地管理对象上的属性和方法。
 */

// 单例模式的作用
// 1、定义命名空间。将所有的方法都放在了一个对象里，而这个对象我们就称为命名空间（namespace）,也有人称之为名称空间。
// 解决的问题：为了让代码更容易懂，我们经常用单词或者拼音的方式定义变量或者方法。但是这样就会出现一个问题，不同人定义的变量使用的单词可能重复，此时就需要使用命名空间约束每个人定义的变量来解决这个问题。
const xxx = {
    aaa: function () { },
    bbb: function () { },
    ccc: function () { },
    ddd: function () { },
    // ...
}
// 2、区分模块
const action = {
    delete: {
        aaa: function () { }
    },
    create: {
        add: function () { },
        update: function () { },
    },
    // ...
}

// 惰性单例：在很多情况下，有的对象和方法根本不需要创建或者执行，或者创建/执行之后只需要沿用上次生成的结果即可。此时我们就可以用到单例模式。
const LazySingle = (function () {
    // 单例实例引用
    let _instance = null

    function Single() {
        console.log('create start');
        // 私有属性和方法
        return {
            publicProperty: '1',
            publicMethod: function () {
                console.log(1111);
            }
        }
    }
    // 获取单例对象
    return function () {
        // 如果未创建单例将创建单例
        if (!_instance) {
            _instance = Single;
        }
        // 返回单例
        return _instance;
    }
})();

console.log(LazySingle().publicProperty);
console.log(LazySingle().publicProperty);
console.log(LazySingle().publicProperty);
/**
 * create start
 * 1
 * 1
 * 1
 */

// 总结
// 单例模式提供了命名空间，区分了不同的模块，并且可以用于模拟静态变量，甚至可以用于延迟创建（对象，方法都可以）。
// 最出名的单例模式应该就是jQuery代码库了，它提供了一个变量jQuery（别名$）, 用于管理每个模块的代码。