/*
* 链表
*/
function LinkedList() {
  // Node表示要加入列表的项
  let Node = function(elment) {
    this.elment = elment
    this.next = null
  }

  let length = 0
  let head = null

  this.display = function () {
    let currNode = head
    while (currNode) {
      console.log(currNode.elment)
      currNode = currNode.next
    }
  }
  // 添加元素
  this.append = function(elment) {
    let node = new Node(elment), current;
    if (head === null) {
      head = node
    } else {
      current = head
      while(current.next) {
        current = current.next
      }
      current.next = node
    }
    length++ 
  }
  // 删除元素（1、从指定位置删除）
  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      let current = head, previous, index = 0
      // 移除第一项
      if (position === 0) {
        head = current.next
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
      }
      length--
      return current.elment
    } else {
      return null
    }
  }
  // 插入元素
  this.insert = function(position, elment) {
    if (position >= 0 && position <= length) {
      let node = new Node(elment), current = head, previous, index = 0
      if (position === 0) {
        node.next = current
        head = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      length++
      return true
    } else {
      return false
    }
  }
  this.size = function() {
    return length
  }
  this.indexOf = function(elment) {
    let current = head, index = 0
    while (current) {
      if ( elment === current.elment) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }
}

let list = new LinkedList()
list.append(9)
list.append(8)
list.append(7)
list.append(6)

console.log(list.indexOf(9))

// list.display()