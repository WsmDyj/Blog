// 基础类型
let isDone: boolean = false
let num: number = 1
let names: string = 'tom'
let list: number[] = [1, 2, 3]
let lists : Array<string> = ['1', '2', '3']

// 元组Tuple
let x: [string, number]
x = ['hello', 1]

// 枚举enum
enum Color { red=1, green=2, blue=3 }
let c: Color = Color.green

// Any
let data: any[] = [1, 'string', true]

// void 没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void
function warn(): void {
  console.log('hello ts')
}


// 接口 interface