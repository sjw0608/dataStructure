/**
 * 排序和搜索算法
 */

function wrap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

// 冒泡排序
function bubbleSort(array) {
    const len = array.length;
    for (let i = 0; i < len; i++) {
        for (j = 0; j < len - 1; j++) {
            if (array[j] > array[j + 1]) {
                wrap(array, j, j + 1);
            }
        }
    }
    return array;
}
// console.log(bubbleSort([1, 3, 5, 6, 2, 4, 0, 9, 8, 10]));

// 选择排序
function selectionSort(array) {
    const len = array.length;
    let indexMin;
    for (let i = 0; i < len - 1; i++) {
        indexMin = i; // 每次都认为当前的值是最小的
        for (let j = i; j < len; j++) {
            if (array[indexMin] > array[j]) {
                indexMin = j;
            }
        }
        if (i !== indexMin) {
            wrap(array, i, indexMin);
        }
    }
    return array;
}
// console.log(selectionSort([1, 3, 5, 6, 2, 4, 0, 9, 8, 10]));

// 插入排序
function insertionSort(array) {
    const len = array.length;
    let temp;
    for (let i = 1; i < len; i++) {
        let j = i;
        temp = array[i];
        while (j > 0 && array[j - 1] > temp) {
            array[j] = array[j - 1];
            j--;
        }
        array[j] = temp;
    }
    return array;
}
// console.log(insertionSort([1, 3, 5, 6, 2, 4, 0, 9, 8, 10]));

// 归并排序
function mergeSort(array) {
    const len = array.length;
    const merge = (left, right) => {
        let i = 0, j = 0;
        const result = [];
        while (i < left.length && j < right.length) {
            result.push(left[i] < right[j] ? left[i++] : right[j++]);
        }
        return result.concat(i < left.length ? left.slice(i) : right.slice(j));
    }
    if (len > 1) {
        const middle = Math.floor(len / 2);
        const left = mergeSort(array.slice(0, middle))
        const right = mergeSort(array.slice(middle, len));
        array = merge(left, right);
    }
    return array;
}
// console.log(mergeSort([1, 3, 5, 6, 2, 4, 0, 9, 8, 10]));

// 快速排序
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
// console.log(quickSort([1, 3, 5, 6, 2, 4, 0, 9, 8, 10]));

// 计数排序：需要更多的内存来放临时数组
function countSort(array) {
    if (array.length < 2) return array;
    const findMaxValue = (arr) => {
        let maxValue = arr[0];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > maxValue) {
                maxValue = arr[i];
            }
        }
        return maxValue
    }
    const maxValue = findMaxValue(array);
    const counts = new Array(maxValue + 1);
    array.forEach(ele => {
        if (!counts[ele]) {
            counts[ele] = 0
        }
        counts[ele] += 1;
    })
    let sortedIndex = 0;
    counts.forEach((count, i) => {
        while (count > 0) {
            array[sortedIndex++] = i;
            count--;
        }
    })
    return array;
}
// console.log(countSort([1, 3, 5, 6, 2, 4, 0, 9, 8, 10]));

// 桶排序
// 基数排序
