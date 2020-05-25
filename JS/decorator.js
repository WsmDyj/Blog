// class Model1 {
//   getData () {
//     return [
//       {id: 1, name: 'Tom'},
//       {id: 2, name: 'Bob'}
//     ]
//   }
// }

// function wrap (Model, key) {
//   let target = Model.prototype
//   let descriptor = Object.getOwnPropertyDescriptor(target, key)
//   let log = function (...arg) {
//     let start = new Date().valueOf()
//     try {
//       return descriptor.value.apply(this, arg)
//     } finally {
//       let end = new Date().valueOf()
//       console.log(`start: ${start} end: ${end}`)
//     }
//   }
//   Object.defineProperty(target, key, {
//     ...descriptor,
//     value: log
//   })
// }
// wrap(Model1, 'getData')
// console.log(new Model1().getData())

@name
class Person {
  sayHi() {
    console.log('my name is:', this.name)
  }
}
function name(constructor) {
  return class extends constructor {
    name = 'Niko'
  }
}

new Person().sayHi()