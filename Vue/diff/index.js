import {patch} from "../渲染器/src/patch";

// 简单diff
function patchChildren(newChildren, oldChildren, container) {
  let newLen = newChildren.length
  let oldLen = oldChildren.length
  let lastIndex = 0 // 存储过程中遇到的最大索引值
  for (let i = 0; i < newLen; i++) {
    const newVnode = newChildren[i]
    let j = 0
    let find = false
    for (j; j < oldLen; j++) {
      const oldVnode = oldChildren[j]
      if (newVnode.key === oldVnode.key) {
        find = true
        patch(oldVnode, newVnode)
        if (j < lastIndex) {
          // 获取newVnode的前一个节点
          const prevVNode = newChildren[i -1]
          if (prevVNode) {
            // 获取prevnode 对应的真实的dom的下一个兄弟子节点，将其作为锚点
            const anchor = prevVNode.el.nextSibling
            // 对应的真实dom插入到锚点的前面
            insert(newVnode.el, anchor)
          }
          
        } else {
          lastIndex = j
        }
        break
      }
      if (!find) {
        const prevVNode = newChildren[i - 1]
        let anchor = null
        if (prevVNode) {
          anchor = prevVNode.el.nextSibling
        } else {
          anchor = container.firstChild
        }
        patch(null, newVnode, container, anchor) // 挂载 newVnode
      }
    }
  }
  for (let i = 0; i < oldLen; i++) {
    const oldVNode = oldChildren[i]
    const has = newChildren.find(vnode => vnode.key === oldVNode.key)
    if (!has) {
      unmount(oldVNode) // 卸载该节点
    }
  }
}

// 双端diff
function patchKeyedChildren(oldChildren, newChildren, container) {
  // 四个索引
  let newStartIdx = 0
  let newEndIdx = newChildren.length - 1
  let oldStartIdx = 0
  let oldEndIdx = oldChildren.length - 1
  // 四个索引指向的vnode节点
  let newStartVNode = newChildren[newStartIdx]
  let newEndVNode = newChildren[newEndIdx]
  let oldStartVNode = oldChildren[oldStartIdx]
  let oldEndVNode = oldChildren[oldEndIdx]
  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if (!oldStartVNode) {
      oldStartVNode = oldChildren[++oldStartIdx]
    } else if (!oldEndVNode) {
      oldEndVNode = newChildren[--oldEndIdx]
    } else if (newStartVNode.key === oldStartVNode.key) {
      // 第一步
      patch(oldStartVNode, newStartVNode, container) // 补丁修改不同
      newStartVNode = newChildren[++newStartIdx] // 更新索引值
      oldStartVNode = oldChildren[++oldStartIdx]
    } else if (newEndVNode.key === oldEndVNode.key) {
      // 第二步
      patch(oldEndVNode, newEndVNode, container) // 补丁修改不同
      newEndVNode = newChildren[--newEndIdx] // 更新索引值
      oldEndVNode = oldChildren[--oldEndIdx]
    } else if (newEndVNode.key === oldStartVNode.key) {
      // 第三步
      patch(oldStartVNode, newEndVNode, container) // 补丁修改不同
      insert(oldStartVNode.el, container, oldEndVNode.el.nextSibling) // 插入到最后一个节点兄弟节点的前面
      newStartVNode = newChildren[++newStartIdx] // // 更新索引值
      oldEndVNode = oldChildren[--oldEndIdx]
    } else if (newStartVNode.key = oldEndVNode.key) {
      // 第四步
      patch(oldEndVNode, newStartVNode, container) // 补丁修改不同
      insert(oldEndVNode.el, container, oldStartVNode.el) // 移动dom到旧节点第一个前面
      newStartVNode = newChildren[++newStartIdx] // 更新索引值，指向下一个节点
      oldEndVNode = oldChildren[--oldEndIdx]
    } else {
      // 特殊情况
      const idxInOld = oldChildren.findIndex(node => node.key === newStartVNode.key)
      if (idxInOld > 0) {
        const vnodeToMove = oldChildren[idxInOld]
        patch(vnodeToMove, newStartVNode, container) // 补丁修改不同
        insert(vnodeToMove.el, container, oldStartVNode.el) // 移动dom到旧节点第一个前面
        oldChildren[idxInOld] = undefined // 将旧节点设置为undefined
      } else {
        patch(null, newStartVNode, container, oldStartVNode.el)
      }
      newStartVNode = newChildren[++newStartIdx]
    }
    
  }
  if (oldStartIdx > oldEndIdx && newStartIdx <= newEndIdx) {
    // 新的节点遗漏
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      patch(null, newChildren[i], container, oldStartVNode.el)
    }
  } else if (newStartIdx > newEndIdx && oldStartIdx <= oldEndIdx) {
    // 移除操作
    for (let i = oldStartIdx; i < oldEndIdx; i++) {
      unmount(oldChildren[i])
    }
  }
}


// v3 快速Diff
function patchKeyedChildren(newChildren, oldChildren, container) {
  // 相同的前置节点
  let j = 0
  let oldVNode = oldChildren[j]
  let newVNode = newChildren[j]
  while (oldVNode.key === newVNode.key) {
    patch(oldVNode, newVNode, container)
    j++
    oldVNode = oldChildren[j]
    newVNode = newChildren[j]
  }
  // 相同的后置节点
  let newEnd = newChildren.length - 1
  let oldEnd = oldChildren.length - 1
  let newEndVNode = newChildren[newEnd]
  let oldEndVNode = oldChildren[oldEnd]
  while (newEndVNode.key === oldEndVNode.key) {
    patch(oldEndVNode, newEndVNode, container)
    oldEnd--
    newEnd--
    oldEndVNode = oldChildren[oldEnd]
    newEndVNode = newChildren[newEnd]
  }
  if (j > oldEnd && j <= newEnd) { // 新增
    const anchorIndex = newEnd + 1
    const anchor = anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null
    while (j <= newEnd) {
      patch(null, newChildren[j++], container, anchor)
    }
  } else if (j > newEnd && j <= oldEnd) { // 删除
    while (j <= oldEnd) {
      unmount(oldChildren[j++])
    }
  } else {
    let newStart = j
    let oldStart = j
    const count = newEnd - j + 1
    const source = new Array(count).fill(-1)
    const keyIndex = {} // 索引表
    for (let i = newStart; i <= newEnd; i++) {
      keyIndex[newChildren[i].key] = i
    }
    let moved = false
    let pos = 0
    let patched = 0 // 更新过的节点数量
    for (let i = oldStart; i <= oldEnd; i++) {
      oldVNode = oldChildren[i]
      if (patched <= count) {
        const k = keyIndex[oldVNode.key]
        if (typeof k !== 'undefined') {
          let newVNode = newChildren[k]
          patch(oldVNode, newVNode, container)
          patched++
          source[k - newStart] = i
          if (k < pos) {  // 判断节点需要移动
            moved = true
            const seq = lis(source)
            let s = seq.length - 1
            let i = count - 1
            for (i; i >= 0; i--) {
              if (source[i] === -1) {
                const pos = i + newStart
                const newVNode = newChildren[pos]
                const nextPos = pos + 1
                const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null
                patch(null, newVNode, container, anchor)
              } else if (i !== seq[s]) {
                const pos = i + newStart
                const newVNode = newChildren[pos]
                const nextPos = pos + 1
                const anchor = nextPos < newChildren.length ? newChildren[nextPos].el : null
                insert(newVNode.el, container, anchor)
              } else {
                s--
              }
            }
          } else {
            pos = k
          }
        } else {
          unmount(oldVNode)
        }
      } else {
        unmount(oldVNode)
      }
    }
  }
}

