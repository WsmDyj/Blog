class EventEmitter {
  constructor() {
    this.listener = {}
  }
  on(event, fn) {
    (this.listener[event] || (this.listener[event] = [])).push(fn)
    return this
  }
  emit(event, data) {
    const callbacks = this.listener[event]
    if (callbacks) {
      callbacks.forEach(fn => {
        fn.call(this, data)
      })
    }
  }
  off(event, fn) {
    const callbacks = this.listener[event]
    if (!callbacks) return
    this.listener[event] = callbacks.filter(it => it !== fn)
  }
  once(event, fn) {
    let on = () => {
      fn.apply(this, arguments)
      this.off(event, on)
    }
    this.on(event, on)
  }
}

let event = new EventEmitter();

// a.once("kak", aa)
let a = 11
let obj = {
  a: '1',
  text: function () {
    console.log(this)
  }
}

event.on("kak", obj.text)
event.emit('kak', 'hahahah');

