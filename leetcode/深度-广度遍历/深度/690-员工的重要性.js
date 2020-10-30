/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */
var GetImportance = function (employees, id) {
  if (employees.length < 0) { return 0 }
  var sum = 0
  const dfs = (idx) => {
    for (var i = 0; i <= employees.length - 1; i++) {
      if (employees[i][0] === idx) {
        sum = sum + employees[i][1]
        console.log(sum)
        if (employees[i][2].length > 0) {
          for (let j = 0; j <= employees[i][2].length - 1; j++) {
            dfs(employees[i][2][j])
          }
        }
      }
    }
  }
  dfs(id)
};

console.log(GetImportance(
  [[1, 2, [2]], [2, 3, []]]
  , 2))