/* eslint-disable */
/**
 * 获取前一个兄弟节点（无前一个兄弟节点则读取父节点的）的宽高位置
 * @param {object} targetNode
 */
export const getPreLayout = (targetNode) => {
  const cur = targetNode.pre;
  // 如果没有前一个或者前面的都不在文档流中，获取容器的
  if (cur) {
    return {
      width: cur.processedLocation.width,
      height: cur.processedLocation.height,
      x: cur.renderStyle.contentX,
      y: cur.renderStyle.contentY,
    };
  }
  return {
    width: 0,
    height: 0,
    x: _getContainerLayout(targetNode.parent).contentX,
    y: _getContainerLayout(targetNode.parent).contentY,
  };
};

/**
 * 获取父节点宽高位置padding/margin属性
 * @param {object} container 父节点
 */
function _getContainerLayout(container) {
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
  };
}

/**
 * 节点是否换行
 * @param {object} targetNode
 */
export const getIsChangeLine = (targetNode) => {
  // debugger
  const parent = targetNode.parent;
  const pre = targetNode.pre;
  if (pre) {
    // 非第一个子节点
    if (pre.type && pre.type === 'block') {
      // 前一个兄弟节点是block，当前节点必须换行
      targetNode.isLines = true;
    } else {
      const { width: pw, height: ph } = _getContainerLayout(parent);
      const { x, y, width: preW, height: preH } = getPreLayout(targetNode);
      const childPaddingLeft = targetNode.css.paddingLeft ? targetNode.css.paddingLeft.toPx() : 0;
      const childMarginLeft = targetNode.css.marginLeft ? targetNode.css.marginLeft.toPx() : 0;
      const currW = targetNode.processedLocation.width;
      const nextStartX = x + preW + childPaddingLeft + childMarginLeft + currW;

      targetNode.isLines = nextStartX >= pw;
    }
    // debugger
  } else {
    // 第一个子节点不需判断是否换行
    targetNode.isLines = false;
  }
  return targetNode.isLines;
};
