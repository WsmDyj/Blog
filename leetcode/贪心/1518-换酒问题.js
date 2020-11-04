/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function (numBottles, numExchange) {
  let count = numBottles, empty = numBottles
  while (empty >= numExchange) {
    let drink = Math.floor(empty / numExchange)
    empty = drink + (empty % numExchange) // 剩下空瓶子 6
    count = count + drink
  }
  return count
};