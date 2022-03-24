function get(source, path, defaultValue = undefined) {
  let result = source
  const paths = path.replace(/\[(\d+)\]/g, '.$').split('.')
  for (let key of paths) {
    result = result[key] || defaultValue
  }
  return result
}

function isObject (value) {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}
function merge(source, other) {
  if (!isObject(source) || !isObject(other)) {
    return other === undefined ? source : other
  }
  return Object.keys({...source, ...other}).reduce((acc, key) => {
    acc[key] = merge(source[key], other[key])
    return acc
  }, Array.isArray(source) ? [] : {})
}


