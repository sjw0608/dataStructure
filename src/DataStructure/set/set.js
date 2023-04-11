/**
 * 集合
 * 集合是由一组无序且唯一（即不能重复）的项组成的。集合是一个既没用重复元素，也没有顺序概念的数组。
 * 空集
 * 空集就是不包含任何元素的集合。比如24和29之间的素数集合，由于24和29之间没有素数（除了1和自身，没有其他正因数的、大于1的自然数），这个集合就是空集。空集用{ }表示。
 */

/**
 * add(element)：向集合添加一个新元素。
 * delete(element)：从集合移除一个元素。
 * has(element)：如果元素在集合中，返回true，否则返回false。
 * clear()：移除集合中的所有元素。
 * size()：返回集合所包含元素的数量。它与数组的length属性类似。
 * values()：返回一个包含集合中所有值（元素）的数组。
 */
class Set {
    constructor() {
        this.items = {};
    }
    add(ele) {
        if (this.has(ele)) return false;
        this.items[ele] = ele;
        return true;
    }
    delete(ele) {
        if (!this.has(ele)) return false;
        Reflect.deleteProperty(this.items, ele);
        return true;
    }
    has(ele) {
        // hasOwnProperty方法 该方法返回一个表明对象是否具有特定属性的布尔值
        return Object.prototype.hasOwnProperty.call(this.items, ele);
    }
    clear() {
        this.items = {};
    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return Object.keys(this.items).length;
    }
    values() {
        return Object.values(this.items);
    }
    // 并集
    union(otherSet) {
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }
    // 交集
    intersection(otherSet) {
        const intersectionSet = new Set();
        const values = this.values(), otherValues = otherSet.values();
        let biggerSet = values, smallerSet = otherValues;
        if (otherSet.length - values.length > 0) {
            biggerSet = otherValues;
            smallerSet = values;
        }
        smallerSet.forEach(value => {
            if (biggerSet.includes(value)) {
                intersectionSet.add(value)
            }
        })
        return intersectionSet;
    }
    // 差集
    difference(otherSet) {
        const differenceSet = new Set();
        this.values().forEach(value => {
            if (!otherSet.has(value)) {
                differenceSet.add(value);
            }
        })
        return differenceSet;
    }
    // 子集
    isSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) return false;
        const values = this.values();
        return values.every((value) => otherSet.has(value));
    }
}

// const set = new Set();
// set.add(1);
// console.log(set.values()); // 输出[1]
// console.log(set.has(1)); // 输出true
// console.log(set.size()); // 输出1
// set.add(2);
// console.log(set.values()); // 输出[1, 2]
// console.log(set.has(2)); // 输出true
// console.log(set.size()); // 输出2
// set.delete(1);
// console.log(set.values()); // 输出[2]
// set.delete(2);
// console.log(set.values()); // 输出[]

// const set1 = new Set();
// const set2 = new Set();
// set1.add(2); set1.add(4);
// set2.add(3); set2.add(4); set2.add(5); set2.add(6);
// console.log(set1.union(set2).values());
// console.log(set1.intersection(set2).values());
// console.log(set1.difference(set2).values());
// console.log(set1.isSubsetOf(set2));