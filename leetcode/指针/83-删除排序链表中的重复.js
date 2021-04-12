/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  let slow = head, fast = head
  while (fast !==null) {
    if (fast.val !== slow.val) {
      slow.next = fast.val
      slow = slow.next
    }
    fast = fast.next
  }
  slow.next = null
  return slow
};