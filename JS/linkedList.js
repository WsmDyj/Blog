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
    if (head === null) {
      console.log('链表中没有数')
      return
    } 
    while (currNode.next !== null) {
      console.log(currNode.next.elment)
      currNode = currNode.next
    }
  }

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
}

let list = new LinkedList()
list.append(1)
list.append(2)
list.append(3)

list.display()