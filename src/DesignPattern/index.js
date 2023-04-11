
/**
 * call 和 apply
 */
// Function.prototype.myBind = function (context) {
//     var self = this;
//     return function () {
//         return self.apply(context, arguments);
//     }
// }

Function.prototype.myBind = function (context) {
    var self = this, context = [].shift.call(arguments), args = [].slice.call(arguments);
    return function () {
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
    }
}

var obj = {
    name: 'sven'
};

var func = function () {
    console.log(this.name);    // 输出：sven
}.myBind(obj);

func();

/**
 * 闭包和高阶函数
 */

/**
 * 闭包的作用：
 * 1、封装变量。可以把一些不需要暴露在全局的变量封装成“私有变量”
 * 2、延续局部变量的寿命。
 */
/**
 * 高阶函数
 * 1、函数可以作为参数被传递
 * 2、函数可以作为返回值输出
 */

/**
 * 函数节流
 */
var throttle = function (fn, interval = 500) {
    var __self = fn,    // 保存需要被延迟执行的函数引用
        timer,      // 定时器
        firstTime = true;    // 是否是第一次调用
    return function () {
        var args = arguments,
            __me = this;
        if (firstTime) {    // 如果是第一次调用，不需延迟执行
            __self.apply(__me, args);
            return firstTime = false;
        }
        if (timer) {    // 如果定时器还在，说明前一次延迟执行还没有完成
            return false;
        }
        timer = setTimeout(function () {  // 延迟一段时间执行
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);

        }, interval);
    };
};

window.onresize = throttle(function () {
    console.log(1);
}, 500);
