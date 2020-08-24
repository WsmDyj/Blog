const Koa = require('koa')
const axios = require('axios')
const app = new Koa()
const sha1 = require("sha1");

app.use(async (ctx) => {
  let params = {
    jsapi_ticket: 'kgt8ON7yVITDhtdwci0qeTFYlr0msEHyMX65oLfCEO3VSVj1gDtDkX5LO406F8Uzranb9kMUxPdVjwRZ6lTa7A',
    noncestr: 'Wm3WZYTPz0wzccnW',
    timestamp: Date.parse(new Date()),
    url: 'http://localhost:8080/',
  }
  const signature = sha1(`jsapi_ticket=${params.jsapi_ticket}&noncestr=${params.noncestr}&timestamp=${params.timestamp}&url=${params.url}`)
  ctx.body = 'signature:' + signature
})


app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')