let array = [3,5,1,4,2]

/* 插入排序 */
const insertSort = function() {
  let length = array.length, j, temp;
  for (let i = 1; i < length; i++) {
    j = i
    temp = array[i]
    while(j > 0 && array[j - 1] > temp) {
      array[j] = array[j - 1]
      j--
    }
    array[j] = temp
  }
  return array
}

/* 冒泡排序 */
const bubbleSort = function() {
  let length = array.length
  for (let i = 0; i< length; i++) {
    for (let j = 0; j < length-1-i; j++) {
      if (array[j] > array[j+1]) {
        swap(j, j+1)
      }
    }
  }
  return array
}

/* 选择排序 */
const selectionSort = function() {
  let length = array.length, indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i
    for (let j = i; j < length; j++) {
      if (array[indexMin] > array[j]) {
        indexMin = j
      }
    }
    if (i !== indexMin) {
      swap(i, indexMin)
    }
  }
  return array
}

const swap = function(index1, index2) {
  var aux = array[index1]
  array[index1] = array[index2]
  array[index2] = aux
}

// console.log(bubbleSort())
// console.log(selectionSort())
console.log(insertSort())