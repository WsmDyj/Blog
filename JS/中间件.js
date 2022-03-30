
function middlewareA(req, res, next) {
  console.log('中间件1');
  next();
}

function middlewareB(req, res, next) {
  console.log('中间件2');
  next();
}

function middlewareC(req, res, next) {
  console.log('中间件3');
  next();
}
var app = express();
app.use(middlewareA);
app.use(middlewareB);
app.use(middlewareC);

function express() {
  let stack = []
  const app = function (req, res) {
    let i = 0
    function next() {
      const curStack = stack[i++]
      if (!curStack) return
      curStack(req, res, next)
    }
    next()
  }
  app.use = function (track) {
    stack.push(track)
  }
  return app
}

