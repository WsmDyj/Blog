// 广度从第一个定点开始遍历，先访问其所有的相邻点

// 创建一个队列


var initialzeColor = function() {
  var color = []
  for (let i = 0; i< vertices.length; i++) {
    color[vertices[i]] = 'white'
  }
  return color
}

let bfs = function(v, callback) {
  var color = initialzeColor(), queue = new Queue()
}