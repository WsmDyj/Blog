// function point (x, y) {
//   this.x = x
//   this.y = y
// }

// point.prototype.toString = () => {
//   return this.x + this.y
// }

// class point {
//   constructor (x, y) {
//     this.x = x
//     this.y = y  // this关键字代表实例对象
//   }
//   tostring () {
//     return this.x + this.y
//   }
// }

// let p = new point(1, 2)
// p.tostring()

// console.log('====================================');
// console.log(p);
// console.log('====================================');

class Logger {
  constructor() {
    this.printName = this.printName.bind(this)
  }
  printName(name = 'three') {
    this.point(`hello ${name}`)
  }
  point(text) {
    console.log(text)
  }
}

const logger = new Logger()
const { printName } = logger
printName()
