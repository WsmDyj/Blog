/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let prehead = new ListNode(-1)
  let pre = prehead
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      pre.next = l1
      l1 = l1.next
    } else {
      pre.next = l2
      l2 = l2.next
    }
    pre = pre.next
  }
  pre.next = l1 == null ? l2 : l1
  return prehead.next
};

l1 = [1,2,4], l2 = [1,3,4]
mergeTwoLists(l1, l2)
