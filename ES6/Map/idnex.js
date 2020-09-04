function test() {
  const m = new Map()
  const o = {p: 'hello world'}
  m.set(o, 'content')
  console.log(m.get(o));
}

test()