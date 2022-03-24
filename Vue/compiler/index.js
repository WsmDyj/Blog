import { parse } from "./parser.js"
import { transform } from "./transform.js"
import { generate } from "./generate.js"

const ast = parse(`<div><p>vue</p><p>template</p></div>`)
transform(ast)
console.log(generate(ast.jsNode))

function compiler(template) {
  const templateAST = parse(template) // 模版AST
  const jsAST = transform(templateAST) // javascript AST
  const code = generate(jsAST.jsNode)  // 代码生成
  return code
}
