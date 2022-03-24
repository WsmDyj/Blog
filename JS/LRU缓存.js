// 清除最近最少使用的元素
class LRUCache1 {
  constructor(n) {
    this.size = n
    this.data = new Map()
  }
  put(domain, info) {
    if (this.data.has(domain)) {
      this.data.delete(domain)
      this.data.set(domain, info)
      return
    }
    if (this.data.size >= this.size) {
      const firstKey = this.data.keys().next().value
      this.data.delete(firstKey)
    }
    this.data.set(domain, info)
  }
  get(domain) {
    if (!this.data.has(domain)) {
      return
    }
    const info = this.data.get(domain)
    this.data.delete(domain)
    this.data.set(domain, info)
    return info
  }
}

