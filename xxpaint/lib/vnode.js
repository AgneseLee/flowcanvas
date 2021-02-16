import xmlParse from './xml-parser'
import { deepFirstSearch } from './util'

/**
 * 创建虚拟节点
 * @param {object} node 配置文件中的节点
 */
export const createVnode = (node) => {
    const _node = {
        // id:
        text: node.text || '', // 文本类型才有
        url: node.url || '', //图片类型才有
        type: node.type,
        css: node.css || {},
        islines: false, //是否换行
        // layoutSize: { height: 0, width: 0 }, // 绘制宽高
        renderStyle: { x: 0, y: 0, contentX: 0, contentY: 0 }, // 绘制位置
        children: node.children || [],
        lines: [],
        parent: null,
        pre: null,
        next: null
    }
    return Object.assign(node, _node)
}

/**
 * 挂载兄弟节点、父节点
 * @param {Vnode} el 
 */

export const connectChildren = (el, isRoot = false) => {
    // debugger
    if (hasChildren(el)) {
        _getChildren(el).forEach((child, index) => {
            if (child.attributes['p-if'] === 'false') { 
                // console.log(el)
                // _delNode(el, child)
            }
            else {
                // 继承父节点样式
                child.css = _inheritStyle(el, child)
                // debugger
                // 设置parent
                // debugger
                _setParent(child, el, isRoot)
                isRoot = false
                // 设置了上一个兄弟节点
                _setSibling(child, _getChildren(el)[index - 1], _getChildren(el)[index + 1])
                connectChildren(child, isRoot)
            }
        })
    }
}

/**
 * 创建虚拟节点树
 * @param {object} jsonObj json文件中的配置
 */
export const initVnodeTree = (node) => {
    var nodes = [];
    if (node != null) {
        var queue = [];
        queue.unshift(node);
        while (queue.length != 0) {
            var item = queue.shift();
            item = createVnode(item)
            nodes.push(item);
            var children = item.children || [];
            for (var i = 0; i < children.length; i++)
                queue.push(children[i]);
        }
    }
    // 关联父子兄弟节点和样式继承
    connectChildren(node)
    console.log('vnodeTree is: ', node)
    return node
}


// 是否有子节点
function hasChildren(vnode) {
    return Array.isArray(vnode.children) && vnode.children.length ? true : false
}

// 返回子节点
function _getChildren(el) {
    return hasChildren(el) ? el.children : []
}
function _delNode(parent,child) {
    // const parent = el.parent
    const idx = parent.children.findIndex(x => x === child)
    parent.children.splice(idx, 1)
}

function _setParent(curr, element, isRoot) {
    curr.parent = isRoot ? null : element
    // this.root = element.root
}

function _setSibling(curr, pre, next) {
    curr.pre = pre || null
    curr.next = next || null
}

/**
 * 继承父节点样式
 * @param {vnode} parent 
 * @param {vnode} child 
 */
function _inheritStyle(parent, child) {
    const copyParentCss = JSON.parse(JSON.stringify(parent.css))
    // debugger
    const notInheritStyleOfParent = ['height', 'width', 'margin', 'padding', 'marginTop', 'marginLeft', 'marginBottom', 'marginRight', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']
    for (const cssName of Object.keys(copyParentCss)) {
        if (!notInheritStyleOfParent.includes(cssName)) continue;
        delete copyParentCss[cssName]
    }
    const style = Object.assign({}, copyParentCss, child.css)
    return style
}

/**
 * 在转换成node的树级结构中添加css/text/url, 对齐渲染所需属性
 * @param {object} xom 
 * @param {object} style 
 */
function _formatVnode(xom, style) {
    deepFirstSearch(xom, (node) => {
        const classNames = node.attributes.class.split(' ')
     
        // 样式
        const css = classNames.reduce((pre, next) => {
            return Object.assign({}, pre, style[next])
        }, {})
        node.css = css
        // 图片
        if (node.attributes.class === 'img' && node.attributes.src) {
            node.url = node.attributes.src
        }
        // 文字
        if (node.name === 'text') {
            node.text = node.content;
        }
        node.type = node.name

        createVnode(node)
    })
    // 关联父子兄弟节点和样式继承
    connectChildren(xom)
}

/**
 * 从模板转换成vnode对象树
 * @param {string} wxml html模板
 * @param {object} style css对象
 */
export const xmlToVnode = (wxml, style) => {
    const { root: xom } = xmlParse(wxml)
    // console.log('## ', xom)
    _formatVnode(xom, style)
    return xom;
}