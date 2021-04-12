/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  let slow = head, fast = head
  while (fast != null && fast.next != null) {
    fast = fast.next.next
    slow = slow.next
    if (fast == slow) return true
  }
  return false
}

var detectCycle = function(head) {
    
}