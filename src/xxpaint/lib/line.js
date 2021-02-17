/* eslint-disable */
import { getPreLayout } from './layout';
import { formatPaddingMargin } from './util';

/**
 * 创建行对象
 * @param {object} node 被插入行中的某个节点
 */
function _createLine(node) {
  const parent = node.parent;
  const { paddingLeft, marginLeft, paddingTop, marginTop } = formatPaddingMargin(node.css);

  // 换行时, y:叠加pre兄弟节点坐标, x:叠加父节点坐标
  const x = parent.renderStyle.contentX;
  const y = getPreLayout(node).y + getPreLayout(node).height;
  // debugger
  const renderStyle = {
    x,
    y,
    contentX: x + paddingLeft + marginLeft,
    contentY: y + paddingTop + marginTop,
  };
  const line = {
    width: node.parent.processedLocation.width, // 行宽由行内元素宽度总和决定
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
  };
  return Object.assign(line, renderStyle);
}

/**
 * 更新行的宽高
 * @param {object} line
 */
function _updateLineLayout(line) {
  // 宽度
  const widthSum = line.children.reduce((pre, next) => {
    // const { paddingLeft, paddingRight, paddingTop, paddingBottom, marginTop, marginBottom, marginLeft, marginRight } = next.css
    const { x, y, width: preW } = _getPreLayoutInLine(next, line);
    const childPaddingLeft = next.css.paddingLeft ? next.css.paddingLeft.toPx() : 0;
    const childMarginLeft = next.css.marginLeft ? next.css.marginLeft.toPx() : 0;
    const currW = next.processedLocation.width;
    const nextStartX = x + preW + childPaddingLeft + childMarginLeft + currW;
    return nextStartX + pre;
  }, 0);
  line.width = Math.max(widthSum, line.width);

  // 高度,padding,margin
  const updatedLayout = line.children.reduce((pre, next) => {
    const childPaddingTop = next.css.paddingTop ? next.css.paddingTop.toPx() : 0;
    const childPaddingBottom = next.css.paddingBochildPaddingBottom ? next.css.paddingBochildPaddingBottom.toPx() : 0;
    const childMarginTop = next.css.marginTop ? next.css.marginTop.toPx() : 0;
    const childMarginBottom = next.css.marginBottom ? next.css.marginBottom.toPx() : 0;
    const currH = next.processedLocation.height;
    // const nextStartY = childPaddingTop + childMarginTop + currH
    return {
      h: Math.max(currH, pre.h),
      pt: Math.max(childPaddingTop, pre.pt),
      pb: Math.max(childPaddingBottom, pre.pb),
      mt: Math.max(childMarginTop, pre.mt),
      mb: Math.max(childMarginBottom, pre.mb),
    };
  }, { h: 0, pt: 0, pb: 0, mt: 0, mb: 0 });
  const { h, pt, pb, mt, mb } = updatedLayout;
  line.paddingTop = pt;
  line.paddingBottom = pb;
  line.marginTop = mt;
  line.marginBottom = mb;
  line.height = h;
  // debugger
  // 更新完行属性，更新行内元素布局
  _updateElementLayout(line);
}

function _getPreLayoutInLine(targetNode, line) {
  const idx = line.children.findIndex((x) => { return x === targetNode; });
  const preEleInLine = line.children[idx - 1];
  if (idx < 0) {
    console.error('找不到行内元素');
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
  }
  if (idx > 0) {
    return {
      width: preEleInLine.processedLocation.width,
      height: preEleInLine.processedLocation.height,
      x: preEleInLine.renderStyle.contentX,
      y: preEleInLine.renderStyle.contentY,
    };
    // 如果没有前一个或者前面的都不在文档流中，获取所在行的
  }
  return {
    width: 0,
    height: 0,
    x: line && _getContainerLineLayout(line).contentX,
    y: line && _getContainerLineLayout(line).contentY,
  };
}

function _getContainerLineLayout(container) {
  // debugger
  if (!container) {
    // root
    if (!container) {
      debugger;
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
      contentY: 0,
    };
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
  };
  res.contentX = res.x + res.paddingLeft;
  res.contentY = res.y + res.paddingTop;
  return res;
}

/**
 * 更新行中元素位置
 * @param {object} line
 */
function _updateElementLayout(line) {
  line.children.forEach((el) => {
    const { paddingLeft, marginLeft, paddingTop, marginTop } = formatPaddingMargin(el.css);
    const x = _getPreLayoutInLine(el, line).x + _getPreLayoutInLine(el, line).width;
    const y = line.y;
    const renderStyle = {
      x,
      y,
      contentX: x + paddingLeft + marginLeft,
      contentY: y + line.paddingTop + line.marginTop,
    };
    // el.lineRender = renderStyle
    el.renderStyle = renderStyle;
  });
}

/**
 * 把节点插入行
 * @param {object} vnode
 * @param {boolean} changeLine 该元素是否换行
 */
export const insertVnodeIntoLine = (vnode, changeLine) => {
  if (changeLine || vnode.parent.lines.length === 0) {
    const newLine = _createLine(vnode);
    // debugger
    newLine.children.push(vnode);
    vnode.parent.lines.push(newLine);
    _updateLineLayout(newLine);
    return;
  }
  if (vnode.parent.lines.length > 0) {
    const currLine = vnode.parent.lines[vnode.parent.lines.length - 1];
    currLine.children.push(vnode);
    _updateLineLayout(currLine);
  }
};
