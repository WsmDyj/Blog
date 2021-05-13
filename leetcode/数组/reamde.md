# 前缀和

- 给定一个数组 nums,开辟一个前缀和数组预处理

```js
let n = nums.length;
let preSum = new Array(n + 1);
preSum[0] = 0;
for (let i = 0; i < n; i++) {
  preSum[i + 1] = preSum[i] + nums[i];
}
```
