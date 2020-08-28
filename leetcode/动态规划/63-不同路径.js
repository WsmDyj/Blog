/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    if(obstacleGrid[0][0] === 1) return 0
    let row = obstacleGrid.length  // 行
    let col = obstacleGrid[0].length // 列
    let dp = Array.from(new Array(row), () => new Array(col).fill(0))
    dp[0][0] = 1;   
    for(let m = 1;m<row;m++) {
        dp[m][0] = obstacleGrid[m][0] === 1 || dp[m-1][0] === 0 ? 0 : 1
    }
    for(let n = 1;n<col;n++) {
        dp[0][n] = obstacleGrid[0][n] === 1 || dp[0][n-1] === 0 ? 0 : 1
    }
    for (let i = 1;i<row;i++) {
        for (let j = 1;j<col; j++) {
            
            if (obstacleGrid[i][j] === 1) {
                dp[i][j] = 0
            } else {
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
            }
        }
    }
    console.log(dp)
    return dp[row-1][col-1]
};
console.log(uniquePathsWithObstacles([[0,0]]))