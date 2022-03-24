const babylon = require("babylon")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default

const code = `
  const nokk = 5;
`
const ast = babylon.parse(code)

traverse(ast, {
  enter(path) {
    if (path.node.type === "Identifier") {
      path.node.name = path.node.name.split("").reverse().join("")
    }
  },
})

const targetCode = generator(ast)

console.log(targetCode)

// console.log("%o", ast)
