// 策略模式（Strategy Pattern）：定义一系列的算法，将每一个算法都封装起来，并且使它们可以相互替换。在前端开发中，可以使用策略模式来动态切换组件的算法和行为。
// 它可以让我们在不改变对象本身的情况下，通过修改其内部的算法实现不同的行为。策略模式常常被用于实现一些复杂的业务逻辑，特别是需要根据不同的条件进行处理的情况。
// 实际上它可以应用于许多其他的场景中，例如表单验证、图表绘制等。策略模式可以让我们通过修改策略对象来改变对象的行为，从而实现更加灵活和可扩展的代码。

const strategies = {
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    },
    multiply(a, b) {
        return a * b
    },
    divide(a, b) {
        return a / b
    }
}
// 定义一个计算器对象
const Calculator = function (strategy) {
    this.calculate = function (a, b) {
        return strategy(a, b);
    }
}

// 使用策略模式来创建一个计算器对象
const addCalculator = new Calculator(strategies.add);
const subtractCalculator = new Calculator(strategies.subtract);
const multiplyCalculator = new Calculator(strategies.multiply);
const divideCalculator = new Calculator(strategies.divide);

// 使用计算器对象进行计算
console.log(addCalculator.calculate(10, 5)); // 输出 15
console.log(subtractCalculator.calculate(10, 5)); // 输出 5
console.log(multiplyCalculator.calculate(10, 5)); // 输出 50
console.log(divideCalculator.calculate(10, 5)); // 输出 2
