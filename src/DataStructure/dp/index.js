/**
 * 动态规划
 * 动态规划（dynamic programming, DP）是一种将复杂问题分解成更小的子问题来解决的优化技术。
 * 动态规划和分而治之是不同的方法。分而治之方法是把问题分解成相互独立的子问题，然后组合它们的答案，而动态规划则是将问题分解成相互依赖的子问题。
 *
 * 用动态规划解决问题时，要遵循三个重要步骤：
 * (1) 定义子问题；
 * (2) 实现要反复执行来解决子问题的部分（这一步要参考前一节讨论的递归的步骤）；
 * (3) 识别并求解出基线条件。
 *
 * 能用动态规划解决的一些著名问题如下。
 * 背包问题：给出一组项，各自有值和容量，目标是找出总值最大的项的集合。这个问题的限制是，总容量必须小于等于“背包”的容量。
 * 最长公共子序列：找出一组序列的最长公共子序列（可由另一序列删除元素但不改变余下元素的顺序而得到）。
 * 矩阵链相乘：给出一系列矩阵，目标是找到这些矩阵相乘的最高效办法（计算次数尽可能少）。相乘运算不会进行，解决方案是找到这些矩阵各自相乘的顺序。
 * 硬币找零：给出面额为d1, …, dn的一定数量的硬币和要找零的钱数，找出有多少种找零的方法。
 * 图的全源最短路径：对所有顶点对(u, v)，找出从顶点u到顶点v的最短路径。
 */

/**
 * 最少硬币找零
 * 最少硬币找零问题是硬币找零问题的一个变种。
 * 硬币找零问题是给出要找零的钱数，以及可用的硬币面额d 1,…, dn及其数量，找出有多少种找零方法。
 * 最少硬币找零问题是给出要找零的钱数，以及可用的硬币面额d1,…, dn及其数量，找到所需的最少的硬币个数。
 * 
 * 例如，美国有以下面额（硬币）:d1= 1, d2= 5, d3= 10, d4= 25。
 * 如果要找36美分的零钱，我们可以用1个25美分、1个10美分和1个便士（1美分）。
 */

/**
 * 最少硬币找零
 * @param {*} coins 面额数组
 * @param {*} amount 找零
 * @returns 
 */
function minCoinChange(coins, amount) {
    const cache = [];
    const makeChange = (value) => {
        if (!value) return [];
        if (cache[value]) return cache[value];
        let min = [], newMin, newAmount;
        for (let i = 0; i < coins.length; i++) {
            const coin = coins[i];
            newAmount = value - coin;
            if (newAmount >= 0) {
                newMin = makeChange(newAmount);
            }
            if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
                min = [coin].concat(newMin);
            }
        }
        return (cache[value] = min);
    }
    return makeChange(amount);
}
// console.log(minCoinChange([1, 5, 10, 25], 36));
// 贪心算法 - > 最少硬币找零
function minCoinGreedyChangge(coins, amount) {
    const change = [];
    let total = 0;
    for (let i = coins.length; i >= 0; i--) {
        const coin = coins[i];
        while (total + coin <= amount) {
            change.push(coin);
            total += coin;
        }
    }
    return change;
}
// console.log(minCoinGreedyChangge([1, 5, 10, 25], 36));


/**
 * 背包问题
 * 给定一个固定大小、能够携重量W的背包，以及一组有价值和重量的物品，找出一个最佳解决方案，使得装入背包的物品总重量不超过W，且总价值最大。
 */
/**
 * 用矩阵来解决
 * @param {*} capacity 携带的最大重量
 * @param {*} weights 物品的重量集合
 * @param {*} values 物品的对应价值集合
 * @returns 最大价值
 */
function knapSack(capacity, weights, values) {
    const n = values.length;
    const ks = [];
    // 初始化矩阵 来存储收益
    for (let i = 0; i <= n; i++) {
        ks[i] = []
    }
    for (let i = 0; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            // 矩阵的第一行和第一列为0
            if (i == 0 || w == 0) {
                ks[i][w] = 0;
            } else if (weights[i - 1] <= w) {
                // 物品的重量要小于等于背包的承载重量
                const a = values[i - 1] + ks[i - 1][w - weights[i - 1]];
                const b = ks[i - 1][w];
                ks[i][w] = a > b ? a : b;
            } else {
                ks[i][w] = ks[i - 1][w];
            }
        }
    }

    return ks[n][capacity];
}
// const values = [3, 4, 5],
//     weights = [2, 3, 4],
//     capacity = 5;
// console.log(knapSack(capacity, weights, values)); // 输出7

/**
 * 回溯算法
 * 回溯是一种渐进式寻找并构建问题解决方式的策略。我们从一个可能的动作开始并试着用这个动作解决问题。
 * 如果不能解决，就回溯并选择另一个动作直到将问题解决。
 * 根据这种行为，回溯算法会尝试所有可能的动作（如果更快找到了解决办法就尝试较少的次数）来解决问题
 * 
 * 有一些可用回溯解决的著名问题：
 * 骑士巡逻问题
 * N皇后问题
 * 迷宫老鼠问题
 * 数独解题器
 */

/**
 * 老鼠迷宫
 * 
 * 假设我们有一个大小为N × N的矩阵，矩阵的每个位置是一个方块。
 * 每个位置（或块）可以是空闲的（值为1）或是被阻挡的（值为0），如下图所示，其中S是起点，D是终点。
 * 
 * [
 *  [1(S), 0, 0, 0],
 *  [1, 1, 1, 1],
 *  [0, 0, 1, 0],
 *  [0, 1, 1, 1(D)],
 * ]
 * 老鼠”的目标是从位置[0][0]开始并移动到[n-1][n-1]（终点）。
 * 老鼠可以在垂直或水平方向上任何未被阻挡的位置间移动。
 */

function isSafe(maze, x, y) {
    const n = maze.length;
    if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) {
        return true;
    }
    return false;
}
function findPath(maze, x, y, solution) {
    const n = maze.length;
    if (x === n - 1 && y === n - 1) {
        solution[x][y] = 1;
        return true;
    }
    if (isSafe(maze, x, y)) {
        solution[x][y] = 1;
        if (findPath(maze, x + 1, y, solution)) {
            return true;
        }
        if (findPath(maze, x, y + 1, solution)) {
            return true;
        }
        solution[x][y] = 0;
        return false;
    }
    return false;
}

function ratInAMaze(maze) {
    const solution = [];
    // 将矩阵每个位置初始化为0
    for (let i = 0; i < maze.length; i++) {
        solution[i] = [];
        for (let j = 0; j < maze[i].length; j++) {
            solution[i][j] = 0;
        }
    }
    if (findPath(maze, 0, 0, solution) === true) {
        return solution;
    }
    return 'NO PATH FOUND';
}

const maze = [
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 1, 0],
    [0, 1, 1, 1]
];
console.log(ratInAMaze(maze));