import { VNodeFlags, ChildrenFlags } from './flags.js'
import { createTextVNode } from './h.js'
import { patch } from './patch.js'
// 第一个参数是将要被渲染的 VNode 对象，第二个参数是一个用来承载内容的容器(container)，通常也叫挂载点

export default function render (vnode, container) {
  const prevVode = container.vnode
  if (prevVode == null) {
    if (vnode) {
      // 没有旧的 vnode. 使用 mount 函数挂载全新的 vnode
      mount(vnode, container)
      // 将新的 vnode 添加在 container.vnode 属性下，这样下一次渲染时旧的 VNode 就存在了
      container.vnode = vnode
    }
  } else {
    if (vnode) {
      // 有旧的 vnode, 也有新的vnode, 则调用patch 函数
      patch(prevVode, vnode, container)
      container.vnode = vnode
    } else {
      // 有旧的vnode 但没有新的vnode, 这说明应该移除 DOM，在浏览器中可以使用 removeChild 函数。
      container.removeChild(prevVode.el)
      container.vnode = null
    }
  }
}

// mount 函数的作用是把一个 VNode 渲染成真实 DOM，根据不同类型的 VNode 需要采用不同的挂载方式
export function mount(vnode, container) {
  const { flags } = vnode
  if (flags & VNodeFlags.ELEMENT) {
    // 挂载普通标签
    mountElement(vnode, container)
  } else if (flags & VNodeFlags.COMPONENT) {
    // 挂载组件
    mountComponent(vnode, container)
  } else if (flags & VNodeFlags.TEXT) {
    // 挂载纯文本
    mountText(vnode, container)
  } else if (flags & VNodeFlags.FRAGMENT) {
    // 挂载 Fragment
    mountFragment(vnode, container)
  } else if (flags & VNodeFlags.PORTAL) {
    // 挂载 Portal
    mountPortal(vnode, container)
  }
}

const domPropsRE = /\[A-Z]|^(?:value|checked|selected|muted)$/


// 普通标签元素
function mountElement(vnode, container) {
  const el = document.createElement(vnode.tag)
  vnode.el = el
  const data = vnode.data
  if (data) {
    for (let key in data) {
      switch (key) {
        case 'style':
          for (let k in data.style) {
            el.style[k] = data.style[k]
          }
          break
        case 'class':
          el.className = data[key]
          break
        case 'on':
          for (let y in data.on) {
            el.addEventListener(y, data.on[y])
          }
          break
        default:
          if (domPropsRE.test(key)) {
            el[key] = data[key]
          } else {
            // 当作 Attr 处理
            el.setAttribute(key, data[key])
          }
        break
      }
    }
  }
  const childFlags = vnode.childFlags
  const children = vnode.children
  // 检测如果没有子节点则无需递归挂载
  if (childFlags !== ChildrenFlags.NO_CHILDREN) {
    if (childFlags & ChildrenFlags.SINGLE_VNODE) {
      // 如果是单个子节点则调用 mount 函数挂载
      mount(children, el)
    } else if (childFlags & ChildrenFlags.MULTIPLE_VNODES) {
      // 如果是单多个子节点则遍历并调用 mount 函数挂载
      for (let i = 0; i < children.length; i++) {
        mount(children[i], el)
      }
    }
  }
  container.appendChild(el)
}

function mountText(vnode, container) {
  const el = document.createTextNode(vnode.children)
  vnode.el = el
  container.appendChild(el)
}


function mountFragment(vnode, container) {
  const  { children,  childFlags } = vnode
  switch (childFlags) {
    case ChildrenFlags.SINGLE_VNODE:
      // 如果是单个子节点，则直接调用 mount
      mount(children, container)
      vnode.el = children.el
      break
      case ChildrenFlags.NO_CHILDREN:
        // 如果没有子节点，等价于挂载空片段，会创建一个空的文本节点占位
        const placeholder = createTextVNode('')
        mountText(placeholder, container)
        vnode.el = placeholder.el
        break
      default:
        // 多个子节点，遍历挂载之
        for (let i = 0; i < children.length; i++) {
          mount(children[i], container)
        }
        vnode.el = children[0].el
  }
}

function mountPortal(vnode, container) {
  const { tag, children, childFlags } = vnode

  // 获取挂载点
  const target = typeof tag === 'string' ? document.querySelector(tag) : tag

  if (childFlags & ChildrenFlags.SINGLE_VNODE) {
    // 将 children 挂在到 target 上，而非 container
    mount(children, target)
  } else if (childFlags & ChildrenFlags.MULTIPLE_VNODES) {
    for (let i = 0; i < children.length; i++) {
      // 将 children 挂在到 target 上，而非 container
      mount(children[i], target)
    }
  }

  // 占位的空文本节点
  const placeholder = createTextVNode('')
  // 将该节点挂载到 container 中
  mountText(placeholder, container)
  // el 属性引用该节点
  vnode.el = placeholder.el
}

function mountComponent(vnode, container) {
  if (vnode.flags & VNodeFlags.COMPONENT_STATEFUL) {  // 有状态组件
    mountStatefulComponent(vnode, container)
  } else {
    mountFunctionalComponent(vnode, container) // 函数式组件
  }
}

function mountStatefulComponent (vnode, container,) {
  // 创建组件实例
  const instance = (vnode.children = new vnode.tag())
  // 初始化 props
  instance.$props = vnode.data

  instance._update = function () {
    // 如果 instance._mounted 为真，说明组件已挂载，应该执行更新操作
    if (instance._mounted) {
      // 1、拿到旧的 VNode
      const prevVNode = instance.$vnode
      // 2、重渲染新的 VNode
      const nextVNode = (instance.$vnode = instance.render())
      // 3、patch 更新
      patch(prevVNode, nextVNode, prevVNode.el.parentNode)
      // 4、更新 vnode.el 和 $el
      instance.$el = vnode.el = instance.$vnode.el
    } else {
      // 1、渲染vnode
      instance.$vnode = instance.render()
      // 2、挂载
      mount(instance.$vnode, container)
      // 3、组件已挂载的标识
      instance._mounted = true
      // 4、el 属性值 和 组件实例的 $el 属性都引用组件的根DOM元素
      instance.$el = vnode.el = instance.$vnode
      // 5、调用 mounted 钩子
      instance.mounted && instance.mounted()
    }
  }
  instance._update()
}

function mountFunctionalComponent(vnode, container) {
  // 在函数式组件类型的 vnode 上添加 handle 属性，它是一个对象
  vnode.handle = {
    prev: null,
    next: vnode,
    container,
    update: () => {
      if (vnode.handle.prev) {
        // 更新的逻辑写在这里
        // prevVNode 是旧的组件VNode，nextVNode 是新的组件VNode
        const prevVNode = vnode.handle.prev
        const nextVNode = vnode.handle.next
        // prevTree 是组件产出的旧的 VNode
        const prevTree = prevVNode.children
        // 更新 props 数据
        const props = nextVNode.data
        // nextTree 是组件产出的新的 VNode
        const nextTree = (nextVNode.children = nextVNode.tag(props))
        // 调用 patch 函数更新
        patch(prevTree, nextTree, vnode.handle.container)
      } else {
        // 获取 props
        const props = vnode.data
        // 获取 VNode
        const $vnode = (vnode.children = vnode.tag(props))
        // 挂载
        mount($vnode, container)
        // el 元素引用该组件的根元素
        vnode.el = $vnode.el
      }
    }
  }
  // 立即调用 vnode.handle.update 完成初次挂载
  vnode.handle.update()
}