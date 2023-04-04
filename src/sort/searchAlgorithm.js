/**
 * 搜索算法
 */
const DOES_NOT_EXIST = -1;

const array = [1, 3, 5, 6, 2, 4, 0, 9, 8, 10];

// 顺序排序
function sequentialSearch(array, key) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === key) {
            return i;
        }
    }
    return DOES_NOT_EXIST;
}
// console.log(sequentialSearch(array, 10));
function wrap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

function quickSort(array) {
    const partiton = (ary, left, right) => {
        const middle = Math.floor((right + left) / 2);
        const pivot = ary[middle];
        let i = left, j = right;
        while (i <= j) {
            while (ary[i] < pivot) {
                i++;
            }
            while (ary[j] > pivot) {
                j--;
            }
            if (i <= j) {
                wrap(ary, i, j);
                i++;
                j--;
            }
        }
        return i;
    }
    const quick = (ary, left, right) => {
        const len = ary.length;
        let index;
        if (len > 1) {
            index = partiton(ary, left, right);
            if (left < index - 1) {
                quick(ary, left, index - 1)
            }
            if (index < right) {
                quick(ary, index, right)
            }
        }
        return ary;
    }
    return quick(array, 0, array.length - 1);
}

const array1 = quickSort(array);
// 二分查找
function binarySearch(array, key) {
    let min = 0, max = array.length - 1;
    while (min <= max) {
        let mid = Math.floor((max + min) / 2); // 取中间数，数组为偶数是向下取整
        if (key < array[mid]) {
            max = mid - 1;
        } else if (key > array[mid]) {
            min = mid + 1;
        } else {
            return mid
        }
    }
    return DOES_NOT_EXIST;
}
// console.log(binarySearch(array1, 5));