function hasCycle(head) {
  let slow = head, fast = head
  while(fast !== null && fast.next !== null) {
    fast = fast.next.next
    slow = slow.next
    if (slow === fast) return true
  }
  return false
}
