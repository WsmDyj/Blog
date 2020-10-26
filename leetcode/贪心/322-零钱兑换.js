var coinChange = function (coins, amount) {
  coins = coins.sort((a,b) => {return a-b})
  let change = [], total = 0;
  for (let i = coins.length; i >= 0; i--) {
    var _coins = coins[i]
    while (total + _coins <= amount) {
      change.push(_coins)
      total += _coins
    }
  }
  if (total !== amount) {
    return -1
  }else {
    return change.length
  }
};

console.log(coinChange([186, 419, 83, 408], 6249))