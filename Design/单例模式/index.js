var CreateDiv = (function () {
  var instance;
  var CreateDiv = function(html) {
    if (instance) {
      return instance
    }
    this.html = html
    this.init()
    return instance = this
  }
  CreateDiv.prototype.init = function() {
    var div = document.createElement('div')
    div.innerHTML = this.html
    document.body.append(div)
  }
  return CreateDiv
})()

const Moudel = (function () {
  let instance = null;
  let CreateModule = function (html) {
    
  }
})()