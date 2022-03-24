class LazyManClass {
  constructor(name) {
    this.name = name
    this.taskList = []
    setTimeout(() => this.next(), 0)
    console.log('Hi I am' + this.name)
  }
  sleep(time) {
    let that = this
    let fn = function (t) {
      return function () {
        setTimeout(() => {
          console.log('等待了' + t + '秒...')
          that.next()
        }, time * 1000)
      }
    }(time)
    that.taskList.push(fn)
    return that
  }
  eat(food) {
    let that = this
    const fn = function (name) {
      return function () {
        console.log("I am eating " + name)
        that.next()
      }
    }(food)
    that.taskList.push(fn)
    return that
  }
  next() {
    const fn = this.taskList.shift()
    fn && fn()
  }
  sleepFirst(time) {
    let that = this
    const fn = function (t) {
      setTimeout(() => {
        console.log('等待了' + t + '秒...')
        that.next()
      }, time * 1000)
    }(time)
    that.taskList.unshift(fn)
    return that
  }
}

function LazyMan (name) {
  return new LazyManClass(name);
}


LazyMan('Tony').sleep(1).eat('lunch').eat('dinner').sleepFirst(5);
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');


// 红黄绿
function red(){
  console.log('red');
}
function green(){
  console.log('green');
}
function yellow(){
  console.log('yellow');
}

function light (timer, fn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fn()
      resolve()
    }, timer)
  })
}

function step() {
  Promise.resolve().then(function(){
    return light(3000, red);
  }).then(function(){
    return light(2000, green);
  }).then(function(){
    return light(1000, yellow);
  }).then(function(){
    step();
  });
}
step()
