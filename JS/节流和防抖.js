// # 节流和防抖
// 节流和防抖对于前端开发者来说基本耳熟能详了，但是还有许多人只是知道这个名词，对于一些细节还是只知甚少。
//
// 如果在实际开发场景中，比如防止表单提交按钮多次触发，我们应该选择使用`节流`还是`防抖`？
//
// **节流 throttle**
// `节流的意思是，规定时间内，只触发一次。`比如我们设定500ms，在这个时间内，无论点击按钮多少次，它都只会触发一次。具体场景主要在抢购时候，由于有无数人 快速点击按钮，如果每次点击都发送请求，就会给服务器带来巨大的压力，但是我们进行节流后，就会大大减少请求的次数
//
// **防抖 debounce**
//
// `防抖的意思是，在连续的操作中，无论进行了多长时间，只有某一次的操作后在指定的时间内没有在操作，这一次才判定有效。`
// 具体的场景可以搜索框输入关键字的过程实时请求服务器匹配搜索结果，如果不进行处理，那么就是输入框内容一直变化，导致一直发送请求，如果进行防抖，结果就是当我们输入内容完成后，一定时间没有在输入内容，这时再触发请求。

// 时间戳
function throttle(func, wait) {
  let context, args, pre = 0
  return function () {
    context = this
    args = arguments
    let now = new Date().getTime()
    if (now - pre <= wait) {
      func.apply(context, arguments)
      pre = now
    }
  }
}
// setTimeout
function throttle1(func, wait) {
  let context, args, timeout
  return function () {
    context = this
    args = arguments
    if (!timeout) {
      timeout = setTimeout(function () {
        func.apply(context, args)
        timeout = null
      }, wait)
    }
  }
}
// 两者结合，即开始执行最后也执行
function throttle2(func, wait) {
  let context, args, pre = 0, timeout
  function later() {
    pre = new Date().getTime();
    timeout = null;
    func.apply(context, args)
  }
  return function () {
    let now = new Date().getTime()
    // 剩余的时间
    let remaining = wait - (now - pre)
    context = this
    args = arguments
    // 如果没有剩余的时间了
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      pre = now
      func.apply(context, args)
    } else if (!timeout) {
      // 结束
      timeout = setTimeout(later, remaining);
    }
  }
}


function debounce(func, wait) {
  let context, args, timeout, result
  return function () {
    context = this
    args = arguments
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(function () {
      result = func.apply(context, args)
    }, wait)
    return result
  }
}
// 需要立即运行
function debounce2(func, wait, immediate) {
  let context, args, timeout, result
  return function () {
    context = this
    args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(function(){
        timeout = null;
      }, wait)
      if (callNow) {
        result = func.apply(context, args)
      }
    } else {
      timeout = setTimeout(function () {
        result = func.apply(context, args)
      }, wait)
    }
  }
 
}
