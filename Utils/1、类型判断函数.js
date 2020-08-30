function getType (obj) {
  return typeof obj === 'object' ? 
    Object.prototype.toString.call(obj).replace('[object ', '').replace(']', '').toLowerCase() 
    : typeof obj
}