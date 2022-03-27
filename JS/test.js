

class U {
  constructor() {
    this.taskList = []
    setTimeout(() => this.next() ,0)
  }
  next() {
    const fn = this.taskList.shift()
    fn && fn()
  }
  
  console(name) {
    let that = this
    const fn = function () {
     return function () {
       console.log(name)
       that.next()
     }
    }()
    this.taskList.push(fn)
    return this
  }
  setTimeout(time) {
    const that = this
    const fn = function (t) {
      return function () {
        console.log('等待' + t + '秒')
        setTimeout(() => {
          that.next()
        }, t)
      }
    }(time)
    that.taskList.push(fn)
    return that
  }
}

const u = new U()
u.console('breakfast')
.setTimeout(3000)
.console('lunch').setTimeout(3000)
.console('dinner')
