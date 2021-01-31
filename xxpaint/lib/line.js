/**
 * 创建行对象
 * @param {object} node 被插入行中的某个节点
 */
export const createLine = (node) => {
    const parent = node.parent
    const { paddingLeft, marginLeft, paddingTop, marginTop } = formatPaddingMargin(node.css)

    // 换行时, y:叠加pre兄弟节点坐标, x:叠加父节点坐标
    const x = parent.renderStyle.contentX
    const y = _getPreLayout(node).y + _getPreLayout(node).height
    // debugger
    const renderStyle = {
        x,
        y,
        contentX: x + paddingLeft + marginLeft,
        contentY: y + paddingTop + marginTop
    }
    const line = {
        width: node.parent.processedLocation.width, //行宽由行内元素宽度总和决定
        height: node.processedLocation.height, // 行高由行内最高元素决定
        // x: node.renderStyle.x,
        // y: node.renderStyle.y,
        paddingTop: node.css.paddingTop ? node.css.paddingTop.toPx() : 0,
        paddingBottom: node.css.paddingBottom ? node.css.paddingBottom.toPx() : 0,
        paddingLeft: node.css.paddingLeft ? node.css.paddingLeft.toPx() : 0,
        paddingRight: node.css.paddingRight ? node.css.paddingRight.toPx() : 0,
        marginLeft: node.css.marginLeft ? node.css.marginLeft.toPx() : 0,
        marginRight: node.css.marginRight ? node.css.marginRight.toPx() : 0,
        marginTop: node.css.marginTop ? node.css.marginTop.toPx() : 0,
        marginBottom: node.css.marginBottom ? node.css.marginBottom.toPx() : 0,
        children: [], // 行内节点
    }
    return Object.assign(line, renderStyle)
}

function _getPreLayout(targetNode) {
    let cur = targetNode.pre

    // 如果没有前一个或者前面的都不在文档流中，获取容器的
    if (cur) {
        return {
            width: cur.processedLocation.width,
            height: cur.processedLocation.height,
            x: cur.renderStyle.contentX,
            y: cur.renderStyle.contentY
        }
    } else {
        return {
            width: 0,
            height: 0,
            x: _getContainerLayout(targetNode.parent).contentX,
            y: _getContainerLayout(targetNode.parent).contentY
        }
    }
}
function _getContainerLayout(container) {
    // debugger
    if (!container) {
        // root
        if (!container) {
            debugger
        }
        container = {
            renderStyles: {
                width: container.processedLocation.width,
                height: container.processedLocation.height,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0,
                // contentWidth: container.processedLocation.width,
                // contentHeight: container.processedLocation.height
            },
            x: 0,
            y: 0,
            contentX: 0,
            contentY: 0
        }
    }
    return {
        width: container.processedLocation.width,
        height: container.processedLocation.height,
        x: container.x,
        y: container.y,
        paddingTop: container.css.paddingTop ? container.css.paddingTop.toPx() : 0,
        paddingBottom: container.css.paddingBottom ? container.css.paddingBottom.toPx() : 0,
        paddingLeft: container.css.paddingLeft ? container.css.paddingLeft.toPx() : 0,
        paddingRight: container.css.paddingRight ? container.css.paddingRight.toPx() : 0,
        marginLeft: container.css.marginLeft ? container.css.marginLeft.toPx() : 0,
        marginRight: container.css.marginRight ? container.css.marginRight.toPx() : 0,
        marginTop: container.css.marginTop ? container.css.marginTop.toPx() : 0,
        marginBottom: container.css.marginBottom ? container.css.marginBottom.toPx() : 0,
        contentX: container.renderStyle.contentX,
        contentY: container.renderStyle.contentY,
        // contentWidth: container.renderStyles.contentWidth,
        // contentHeight: container.renderStyles.contentHeight
    }
}

/**
 * 把节点插入行
 * @param {object} vnode 
 * @param {boolean} changeLine 该元素是否换行
 */
export const insertVnodeIntoLine = (vnode, changeLine) => {
    if (changeLine || vnode.parent.lines.length === 0) {
        const newLine = createLine(vnode)
        // debugger
        newLine.children.push(vnode)
        vnode.parent.lines.push(newLine)
        _updateLineLayout(newLine)
        return
    }
    if (vnode.parent.lines.length > 0) {
        const currLine = vnode.parent.lines[vnode.parent.lines.length - 1]
        currLine.children.push(vnode)
        _updateLineLayout(currLine)
        return
    }

}

/**
 * 更新行的宽高
 * @param {object} line 
 */
function _updateLineLayout(line) {
    // 宽度
    const widthSum = line.children.reduce((pre, next) => {
        // const { paddingLeft, paddingRight, paddingTop, paddingBottom, marginTop, marginBottom, marginLeft, marginRight } = next.css
        const { x, y, width: preW } = _getPreLayoutInLine(next, line)
        const childPaddingLeft = next.css.paddingLeft ? next.css.paddingLeft.toPx() : 0
        const childMarginLeft = next.css.marginLeft ? next.css.marginLeft.toPx() : 0
        const currW = next.processedLocation.width
        const nextStartX = x + preW + childPaddingLeft + childMarginLeft + currW
        return nextStartX + pre
    }, 0)
    line.width = Math.max(widthSum, line.width)

    // 高度,padding,margin
    const updatedLayout = line.children.reduce((pre, next) => {
        const childPaddingTop = next.css.paddingTop ? next.css.paddingTop.toPx() : 0
        const childPaddingBottom = next.css.paddingBochildPaddingBottom ? next.css.paddingBochildPaddingBottom.toPx() : 0
        const childMarginTop = next.css.marginTop ? next.css.marginTop.toPx() : 0
        const childMarginBottom = next.css.marginBottom ? next.css.marginBottom.toPx() : 0
        const currH = next.processedLocation.height
        // const nextStartY = childPaddingTop + childMarginTop + currH
        return {
            h: Math.max(currH, pre.h),
            pt: Math.max(childPaddingTop, pre.pt),
            pb: Math.max(childPaddingBottom, pre.pb),
            mt: Math.max(childMarginTop, pre.mt),
            mb: Math.max(childMarginBottom, pre.mb),
        }
    }, { h: 0, pt: 0, pb: 0, mt: 0, mb: 0 })
    const { h, pt, pb, mt, mb } = updatedLayout
    line.paddingTop = pt
    line.paddingBottom = pb
    line.marginTop = mt
    line.marginBottom = mb
    line.height = h
    // debugger
    // 更新完行属性，更新行内元素布局
    _updateElementLayout(line)
}

function _getPreLayoutInLine(targetNode, line) {
    // let cur = targetNode.pre
    const idx = line.children.findIndex(x => x === targetNode)
    const preEleInLine = line.children[idx-1]
    // console.log(idx)
    if (idx < 0) {
        console.error('找不到行内元素')
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        }
    }
    else if (idx > 0) {
        return {
            width: preEleInLine.processedLocation.width,
            height: preEleInLine.processedLocation.height,
            x: preEleInLine.renderStyle.contentX,
            y: preEleInLine.renderStyle.contentY
        }
        // 如果没有前一个或者前面的都不在文档流中，获取所在行的
    } else {
        return {
            width: 0,
            height: 0,
            x: line && _getContainerLineLayout(line).contentX,
            y: line && _getContainerLineLayout(line).contentY
        }
    }
}

function _getContainerLineLayout(container) {
    // debugger
    if (!container) {
        // root
        if (!container) {
            debugger
        }
        container = {
            renderStyles: {
                width: container.processedLocation.width,
                height: container.processedLocation.height,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0,
                // contentWidth: container.processedLocation.width,
                // contentHeight: container.processedLocation.height
            },
            x: 0,
            y: 0,
            contentX: 0,
            contentY: 0
        }
    }
    const res = {
        width: container.width,
        height: container.height,
        x: container.x,
        y: container.y,
        paddingTop: container.paddingTop ? container.paddingTop : 0,
        paddingBottom: container.paddingBottom ? container.paddingBottom : 0,
        paddingLeft: container.paddingLeft ? container.paddingLeft : 0,
        paddingRight: container.paddingRight ? container.paddingRight : 0,
        marginLeft: container.marginLeft ? container.marginLeft : 0,
        marginRight: container.marginRight ? container.marginRight : 0,
        marginTop: container.marginTop ? container.marginTop : 0,
        marginBottom: container.marginBottom ? container.marginBottom : 0,
    }
    res.contentX = res.x + res.paddingLeft
    res.contentY = res.y + res.paddingTop
    return res;
}


function formatPaddingMargin(css, parent) {
    const copy = JSON.parse(JSON.stringify(css))
    // const {  } = copy
    const arr = ["paddingLeft", "marginLeft", "paddingTop", "marginTop", "paddingRight", "paddingBottom", "marginRight", "marginBottom"]
    for (const name of arr) {
        // const attribute = copy[name]
        const sizeName = (name.indexOf('Left') > -1 || name.indexOf('Right') > -1) ? 'width' : 'height'
        if (!copy[name]) {
            copy[name] = 0
        }
        else if (copy[name].indexOf('px') > -1) {
            copy[name] = copy[name].toPx();
        } else if (copy[name].indexOf('%') && parent) {
            copy[name] = (copy[name].replace('%', '')) / 100
            while (parent && parent.css[sizeName].indexOf('%') > -1) {
                const percentage = (parent.css[sizeName].replace('%', '')) / 100
                copy[name] = copy[name] * percentage
                parent = parent.parent
            }
            copy[name] = copy[name] * parent.css[sizeName].toPx()

        } else {
            console.error(`please enter legal ${name} of number or percentage.`)
        }
    }
    return copy
}

/**
 * 更新行中元素位置
 * @param {object} line 
 */
function _updateElementLayout(line) {
    line.children.forEach(el => {
        // debugger
        const { paddingLeft, marginLeft, paddingTop, marginTop } = formatPaddingMargin(el.css)
        const x = _getPreLayoutInLine(el, line).x + _getPreLayoutInLine(el, line).width
        const y = line.y
        const renderStyle = {
            x,
            y,
            contentX: x + paddingLeft + marginLeft,
            contentY: y + line.paddingTop + line.marginTop
        }
        // el.lineRender = renderStyle
        el.renderStyle = renderStyle; 
    })
}