import Downloader from './downloader';
// import TreeNode from './treeNode'
import {initVnodeTree} from './vnode'
import { breadthFirstSearchRight, breadthFirstSearch } from './util'
const GD = require('./gradient.js');
const Modifier = require('./modifier').default;
const downloader = new Downloader();
const defaultPaddingMargin = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
}

export default class Painter {
  constructor(ctx, data) {
    this.ctx = ctx;
    this.data = data;
    this.globalWidth = {};
    this.globalHeight = {};
    // this._preProcessed = {}; // 预处理计算出的每个元素的位置
  }

  beforePaint() {
    // 从n级转换成一级json模板
    this.transformNTo1();

    // 开始继承css

    console.log('eeeeeeeeee ', this.data);
    return this.data;
  }

  async paint(callback) {
    this.style = {
      width: this.data.children[0].css.width.toPx(),
      height: this.data.children[0].css.height.toPx()
    };

    // this._background();
    // 开始画
    for (const view of this.data.views) {
      await this._drawAbsolute(view);
      // debugger;
    }
    if (this.data.caniuse) {
      callback();
    } else {
      this.ctx.draw(false, () => {
        callback();
      });
    }
  }

  transformNTo1() {
    // 给每个节点标记id
    // this.routeByDFS();
    // this.createTree()
    // 基于嵌套层级json计算每个节点的宽高和位置
    // this.routeByBFS();

    // const nTpl = this.data;
    // const mmodif = new Modifier(nTpl);
    // this.data.mmodif = mmodif;


    // 计算嵌套模板每个节点相对(0,0)的位置,output 平级节点
    // const tplTo1 = mmodif.getAbsoluteTpl({ globalWidth: this.globalWidth, globalHeight: this.globalHeight });
    // this.data = tplTo1;

    // this.calcEachHeight(tplTo1.views);
    initVnodeTree(this.data)
    const tplTo1 = this.data

    // 关联父子兄弟节点和样式继承
    this.connectChildren(tplTo1)

    // 计算每个节点的宽高
    this.calcElementWidthHeight(tplTo1.children[0])

    // 计算每个节点位置
    const nodes = this.calcElementPosition(tplTo1.children[0])

    this.data.views = nodes

  }

  calcElementWidthHeight(rootNode) {
    const reverseBfsNodes = breadthFirstSearchRight(rootNode)

    for (let i = 0; i < reverseBfsNodes.length; i++) {
      this.preProcessObj(reverseBfsNodes[i]);
      // inline-block宽高靠子节点撑大
      if (['view', 'rect'].includes(reverseBfsNodes[i].type)) {
        const { width: parentWidth, height: parentHeight } = reverseBfsNodes[i].css
        let widthSum = 0, heightSum = 0, isLines = false
        // debugger
        const children = reverseBfsNodes[i].children || []
        for (let j = 0; j < children.length; j++) {
          const childWidth = children[j].processedLocation.width
          const childHeight = children[j].processedLocation.height
          const childPaddingLeft = children[j].css.paddingLeft ? children[j].css.paddingLeft.toPx() : 0
          const childMarginLeft = children[j].css.marginLeft ? children[j].css.marginLeft.toPx() : 0
          const childMarginTop = children[j].css.marginTop ? children[j].css.marginTop.toPx() : 0
          const childPaddingTop = children[j].css.paddingTop ? children[j].css.paddingTop.toPx() : 0

          const xAdder = childWidth + childPaddingLeft + childMarginLeft
          const yAdder = childHeight + childMarginTop + childPaddingTop
          if (!isLines) {
            // 不换行
            widthSum += (xAdder)
            // 有定宽，可能溢出；无定宽，自适应宽度
            if (widthSum >= parentWidth.toPx() && j === 0) {
              // reverseBfsNodes[i].processedLocation.width = widthSum
              isLines = true;
              heightSum += yAdder
            } else if (widthSum > parentWidth.toPx()) {
              isLines = true;
              heightSum += yAdder
            } else if (widthSum < parentWidth.toPx() && j === 0) {
              isLines = false
              heightSum += yAdder
            }
            reverseBfsNodes[i].processedLocation.height = Math.max(heightSum, reverseBfsNodes[i].processedLocation.height)
          } else {
            // 换行
            heightSum += yAdder
            isLines = false
            widthSum = 0
            reverseBfsNodes[i].processedLocation.height = Math.max(heightSum, reverseBfsNodes[i].processedLocation.height)
            // debugger
          }
          // reverseBfsNodes[i].processedLocation.height = Math.max(heightSum, reverseBfsNodes[i].processedLocation.height)


        }
      }
    }
    // debugger
    console.log('(((((( ', reverseBfsNodes)
    return reverseBfsNodes
  }

  calcElementPosition(rootNode) {
    const bfsNodes = breadthFirstSearch(rootNode)
    for (let i = 0; i < bfsNodes.length; i++) {
      const parent = bfsNodes[i].parent
      const { paddingLeft, marginLeft, paddingTop, marginTop } = Object.assign({}, defaultPaddingMargin, bfsNodes[i].css)
      if (!parent) {
        bfsNodes[i].renderStyle = {
          x: 0,
          y: 0,
          contentX: paddingLeft + marginLeft,
          contentY: paddingTop + marginTop
        }
        continue;
      }
      const isLines = this._getIsChangeLine(bfsNodes[i])
      // debugger
      if (isLines) {
        // 换行时, y:叠加pre兄弟节点坐标, x:叠加父节点坐标
        const x = parent.renderStyle.contentX
        const y = this._getPreLayout(bfsNodes[i]).y + this._getPreLayout(bfsNodes[i]).height
        // debugger
        const renderStyle = {
          x,
          y,
          contentX: x + (paddingLeft === 0 ? 0 : paddingLeft.toPx()) + (marginLeft === 0 ? 0 : marginLeft.toPx()),
          contentY: y + (paddingTop === 0 ? 0 : paddingTop.toPx()) + (marginTop === 0 ? 0 : marginTop.toPx())
        }
        // debugger
        bfsNodes[i].renderStyle = renderStyle;
      } else {
        // 不换行时, y:叠加父节点坐标, x:叠加pre兄弟节坐标
        const x = this._getPreLayout(bfsNodes[i]).x + this._getPreLayout(bfsNodes[i]).width
        const y = this._getPreLayout(bfsNodes[i]).y
        const renderStyle = {
          x,
          y,
          contentX: x + (paddingLeft === 0 ? 0 : paddingLeft.toPx()) + (marginLeft === 0 ? 0 : marginLeft.toPx()),
          contentY: y + (paddingTop === 0 ? 0 : paddingTop.toPx()) + (marginTop === 0 ? 0 : marginTop.toPx())
        }
        // debugger
        bfsNodes[i].renderStyle = renderStyle;
      }
    }
    // debugger
    return bfsNodes
  }

  // 这里前一个节点必须在文档流中，可能是父节点，可能是兄弟节点
  _getPreLayout(targetNode) {
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
        x: this._getContainerLayout(targetNode.parent).contentX,
        y: this._getContainerLayout(targetNode.parent).contentY
      }
    }
  }

  /**
   * 节点是否换行
   * @param {object} targetNode 
   */
  _getIsChangeLine(targetNode) {
    const parent = targetNode.parent
    const pre = targetNode.pre
    if (pre) {
      // 非第一个子节点
      const { width: pw, height: ph } = this._getContainerLayout(parent)
      const { x, y, width: preW, height: preH } = this._getPreLayout(targetNode)
      const childPaddingLeft = targetNode.css.paddingLeft ? targetNode.css.paddingLeft.toPx() : 0
      const childMarginLeft = targetNode.css.marginLeft ? targetNode.css.marginLeft.toPx() : 0
      const currW = targetNode.processedLocation.width
      const nextStartX = x + preW + childPaddingLeft + childMarginLeft + currW

      targetNode.isLines = nextStartX >= pw
      // debugger

    } else {
      // 第一个子节点不需判断是否换行
      targetNode.isLines = false
    }
    return targetNode.isLines

  }

  // 获取父节点的布局信息
  _getContainerLayout(container) {
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

  connectChildren(el, isRoot = true) {
    if (el.children && el.children.length) {
      el.children.map((child, index) => {
        // 继承父节点样式
        child.css = Object.assign({}, el.css, child.css)

        // 设置parent
        this._setParent(child, el, isRoot)
        isRoot = false
        // 设置了上一个兄弟节点
        this._setSibling(child, el.children[index - 1], el.children[index + 1])
        this.connectChildren(child, isRoot)
      })
    }
  }

  _setParent(curr, element, isRoot) {
    curr.parent = isRoot ? null : element
    // this.root = element.root
  }

  _setSibling(curr, pre, next) {
    curr.pre = pre || null
    curr.next = next || null
  }


  // 根据一级json更新每个节点的高度
  calcEachHeight(tpl) {
    const parentIds = tpl.map((sb) => { return sb.f_sid; });
    let sorted = parentIds.sort((a, b) => { return b - a; });
    sorted = Array.from(new Set(sorted));
    sorted.forEach((f_sid) => {
      // debugger;
      if (f_sid) {
        // 有父节点
        const parentNode = tpl.find((ll) => { return ll.sid === f_sid; });
        const children = tpl.filter((x) => { return x.f_sid === f_sid; });
        // console.log('-------------- ', children);
        if (parentNode) {
          parentNode.processedLocation.height = children.reduce((pre, next) => {
            return pre + next.processedLocation.height;
          }, 0);
          const paddingbottom = parentNode.css.paddingbottom ? parentNode.css.paddingbottom.toPx() : 0;
          parentNode.processedLocation.height += paddingbottom;
          parentNode.css.height = `${parentNode.processedLocation.height}px`;
        } else {
          // 根节点
          this.data.height = children.reduce((pre, next) => {
            return pre + next.processedLocation.height;
          }, 0);
          const paddingbottom = this.data.paddingbottom ? this.data.paddingbottom.toPx() : 0;
          this.data.height += paddingbottom;
          this.data.height = `${this.data.height}px`;
        }
      }
    });
  }


  // 添加id
  routeByDFS() {
    const parentNode = { children: this.data.views };

    if (!parentNode) {
      return null;
    }
    let sid = 1;
    parentNode.sid = sid;
    sid++;
    // 深度优先, 非递归实现， 使用栈
    let stack = [];
    for (let i = parentNode.children.length; i > 0; i--) {
      parentNode.children[i - 1].sid = sid;
      parentNode.children[i - 1].f_sid = 1;
      sid++;
      stack.push(parentNode.children[i - 1]);
    }
    while (stack.length) {
      const node = stack.pop();
      if (node.children && node.children.length > 0) {
        node.children.forEach((x) => {
          x.sid = sid;
          x.f_sid = node.sid;
          sid++;
        });
        stack = Array.from(node.children).concat(stack);
      }
    }
  }

  // 广度优先遍历计算同级兄弟(因为可能出现相对兄弟节点、父节点定位。dfs无法记录兄弟节点信息，bfs两者都可记录)节点的相对位置
  routeByBFS() {
    const node = { children: this.data.views };
    const nodes = [];
    if (node !== null) {
      const queue = [];
      queue.unshift(node);
      while (queue.length) {
        let item = queue.shift();
        // 计算
        item = this.preProcessObj(item);
        nodes.push(item);
        const children = item.children;
        if (children) {
          for (let i = 0; i < children.length; i++) {
            queue.push(children[i]);
          }
        }
      }
    }
  }

  preProcessObj(view) {
    let json;
    switch (view.type) {
      case 'image':
        json = this._preProcess(view);
        break;
      case 'text':
        json = this._preProcess(view, view.css.background && view.css.borderRadius);
        break;
      case 'rect':
        json = this._preProcess(view);
        break;
      default:
        break;
    }
    // view._id = i;
    view.processedLocation = json;
    return view;
  }


  // 获取某部分高度之和
  getBlockHeight(ids = [], isGlobal = false) {
    if (isGlobal) { return 786; }
    const filterd = this.data.views.filter((view) => { return ids.includes(view._id); });
    const res = filterd.reduce((pre, next) => {
      return pre + next.processedLocation.height;
    }, 0);
    return res;
  }

  /**
   * 画背景
   */
  _background() {
    this.ctx.save();
    const {
      width,
      height,
    } = this.style;
    // const height = 798
    const bg = this.data.background;
    this.ctx.translate(width / 2, height / 2);

    this._doClip(this.data.borderRadius, width, height);
    // debugger;
    if (!bg) {
      // 如果未设置背景，则默认使用白色
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
    } else if (bg.startsWith('#') || bg.startsWith('rgba') || bg.toLowerCase() === 'transparent') {
      // 背景填充颜色
      this.ctx.fillStyle = bg;
      this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
    } else if (GD.api.isGradient(bg)) {
      GD.api.doGradient(bg, width, height, this.ctx);
      this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
    } else {
      // 背景填充图片
      // debugger;
      // this.ctx.translate(0.5, 0.5);
      this._drawImage(bg, -(width / 2), -(height / 2), width, height);
    }
    this.ctx.restore();
  }

  async _drawAbsolute(view) {
    if (!view) {
      return;
    }
    // // 证明 css 为数组形式，需要合并
    // if (view.css && view.css.length) {
    //   /* eslint-disable no-param-reassign */
    //   view.css = Object.assign(...view.css);
    // }
    switch (view.type) {
      case 'image':
        await this._drawAbsImage(view);
        break;
      case 'text':
        this._fillAbsText(view);
        break;
      case 'rect':
        this._drawAbsRect(view);
        break;
      default:
        break;
    }
  }

  /**
   * 根据 borderRadius 进行裁减
   */
  _doClip(borderRadius, width, height, isOnlyUpHalf = false) {
    // debugger
    if (borderRadius && width && height) {
      const r = Math.min(borderRadius.toPx(), width / 2, height / 2);
      // 防止在某些机型上周边有黑框现象，此处如果直接设置 fillStyle 为透明，在 Android 机型上会导致被裁减的图片也变为透明， iOS 和 IDE 上不会
      // globalAlpha 在 1.9.90 起支持，低版本下无效，但把 fillStyle 设为了 white，相对默认的 black 要好点
      this.ctx.globalAlpha = 0;
      this.ctx.fillStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(-width / 2 + r, -height / 2 + r, r, 1 * Math.PI, 1.5 * Math.PI);
      this.ctx.lineTo(width / 2 - r, -height / 2);
      this.ctx.arc(width / 2 - r, -height / 2 + r, r, 1.5 * Math.PI, 2 * Math.PI);

      if (isOnlyUpHalf) {
        this.ctx.lineTo(width / 2, height / 2);
        this.ctx.lineTo(-width / 2, height / 2);
      } else {
        this.ctx.lineTo(width / 2, height / 2 - r);
        this.ctx.arc(width / 2 - r, height / 2 - r, r, 0, 0.5 * Math.PI);
        this.ctx.lineTo(-width / 2 + r, height / 2);
        this.ctx.arc(-width / 2 + r, height / 2 - r, r, 0.5 * Math.PI, 1 * Math.PI);
      }

      this.ctx.closePath();
      this.ctx.fill();
      // 在 ios 的 6.6.6 版本上 clip 有 bug，禁掉此类型上的 clip，也就意味着，在此版本微信的 ios 设备下无法使用 border 属性
      const { version, platform } = wx.getSystemInfoSync();
      // 兼容小程序插件
      if (!(version <= '6.6.6' && platform === 'ios')) {
        this.ctx.clip();
      }
      this.ctx.globalAlpha = 1;
    }
  }

  /**
   * 画边框
   */
  _doBorder(view, width, height) {
    if (!view.css) {
      return;
    }
    const {
      borderRadius,
      borderWidth,
      borderColor,
    } = view.css;
    if (!borderWidth) {
      return;
    }
    this.ctx.save();
    // const { x, y, height: rawHeight, width: rawWidth } = this._preProcess(view, true);
    const { height: rawHeight, width: rawWidth } = view.processedLocation;
    const { x, y } = view.renderStyle
    this._prePaint(view, true, { x, y, height: rawHeight, width: rawWidth });

    let r;
    if (borderRadius) {
      r = Math.min(borderRadius.toPx(), width / 2, height / 2);
    } else {
      r = 0;
    }
    const lineWidth = borderWidth.toPx();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = (borderColor || 'black');
    this.ctx.beginPath();
    this.ctx.arc(-width / 2 + r, -height / 2 + r, r + lineWidth / 2, 1 * Math.PI, 1.5 * Math.PI);
    this.ctx.lineTo(width / 2 - r, -height / 2 - lineWidth / 2);
    this.ctx.arc(width / 2 - r, -height / 2 + r, r + lineWidth / 2, 1.5 * Math.PI, 2 * Math.PI);
    this.ctx.lineTo(width / 2 + lineWidth / 2, height / 2 - r);
    this.ctx.arc(width / 2 - r, height / 2 - r, r + lineWidth / 2, 0, 0.5 * Math.PI);
    this.ctx.lineTo(-width / 2 + r, height / 2 + lineWidth / 2);
    this.ctx.arc(-width / 2 + r, height / 2 - r, r + lineWidth / 2, 0.5 * Math.PI, 1 * Math.PI);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
  }

  /**
   * 预处理节点对象
   * @param {object}} view 
   * @param {boolean} notClip 
   * @return 
   * {
      width,
      height,
      x,
      y,
      extra,
    };
   */
  _preProcess(view, notClip) {
    let width = 0;
    let height;
    let extra;
    switch (view.type) {
      case 'text': {
        const textArray = view.text.split('\n');
        // 处理多个连续的'\n'
        for (let i = 0; i < textArray.length; ++i) {
          if (textArray[i] === '') {
            textArray[i] = ' ';
          }
        }
        const fontWeight = view.css.fontWeight === 'bold' ? 'bold' : 'normal';
        view.css.fontSize = view.css.fontSize ? view.css.fontSize : '20rpx';
        // 需要计算文字宽度，这里初始化不能省略
        this.ctx.font = `normal ${fontWeight} ${view.css.fontSize.toPx()}px ${view.css.fontFamily ? `"${view.css.fontFamily}"` : 'sans-serif'}`;

        // this.ctx.setFontSize(view.css.fontSize.toPx());
        // 计算行数
        let lines = 0;
        const linesArray = [];
        for (let i = 0; i < textArray.length; ++i) {
          const textLength = this.ctx.measureText(textArray[i]).width;
          const partWidth = view.css.width ? view.css.width.toPx() : textLength;
          const calLines = Math.ceil(textLength / partWidth);
          width = partWidth > width ? partWidth : width;
          lines += calLines;
          linesArray[i] = calLines;
        }
        lines = view.css.maxLines < lines ? view.css.maxLines : lines;
        const lineHeight = view.css.lineHeight ? view.css.lineHeight.toPx() : view.css.fontSize.toPx();
        height = lineHeight * lines;

        extra = {
          lines,
          lineHeight,
          textArray,
          linesArray,
        };
        // 文字取实际宽度
        if (view.id) {
          let textWidth = 0;
          for (let i = 0; i < textArray.length; ++i) {
            textWidth = this.ctx.measureText(textArray[i]).width > textWidth ? this.ctx.measureText(textArray[i]).width : textWidth;
          }
          width = width ? (textWidth < width ? textWidth : width) : textWidth;
          // this.globalWidth[view.id] = width ? (textWidth < width ? textWidth : width) : textWidth;
        }
        // debugger;
        break;
      }
      case 'image': {
        // image的长宽设置成auto的逻辑处理
        const { pixelRatio } = wx.getSystemInfoSync();
        const ratio = pixelRatio || 2;
        // const ratio = 2
        // 有css却未设置width或height，则默认为auto
        if (view.css) {
          if (!view.css.width) {
            view.css.width = 'auto';
          }
          if (!view.css.height) {
            view.css.height = 'auto';
          }
        }
        if (!view.css || (view.css.width === 'auto' && view.css.height === 'auto')) {
          width = Math.round(view.sWidth / ratio);
          height = Math.round(view.sHeight / ratio);
        } else if (view.css.width === 'auto') {
          height = view.css.height.toPx();
          width = view.sWidth / view.sHeight * height;
        } else if (view.css.height === 'auto') {
          width = view.css.width.toPx();
          height = view.sHeight / view.sWidth * width;
        } else {
          width = view.css.width.toPx();
          height = view.css.height.toPx();
        }
        break;
      }
      default:
        if (!(view.css.width && view.css.height)) {
          console.error('You should set width and height');
          return;
        }
        if (view.css.width === 'auto') {
          width = 0;
        } else {
          width = view.css.width.toPx();
        }
        if (view.css.height === 'auto') {
          height = 0;
        } else {
          height = view.css.height.toPx();
        }
        break;
    }
    let x;
    if (view.css && view.css.right) {
      if (typeof view.css.right === 'string') {
        x = this.style.width - view.css.right.toPx(true);
      } else {
        // 可以用数组方式，把文字长度计算进去
        // [right, 文字id, 乘数（默认 1）]
        // [right, [文字id1, 文字id2, 文字id3], 乘数（默认 1）]
        const rights = view.css.right;
        x = this.style.width - rights[0].toPx(true) - this.globalWidth[rights[1]] * (rights[2] || 1);
      }
    } else if (view.css && view.css.left) {
      // debugger
      if (typeof view.css.left === 'string') {
        x = view.css.left.toPx(true);
      } else {
        const lefts = view.css.left;

        if (Array.isArray(lefts[1])) {
          const dynamicWidth = lefts[1].reduce((pre, next) => {
            return pre + this.globalWidth[next];
          }, 0);
          x = lefts[0].toPx(true) + dynamicWidth * (lefts[2] || 1);
        } else {
          x = lefts[0].toPx(true) + this.globalWidth[lefts[1]] * (lefts[2] || 1);
        }
        // debugger
      }
    } else {
      x = 0;
    }
    // const y = view.css && view.css.bottom ? this.style.height - height - view.css.bottom.toPx(true) : (view.css && view.css.top ? view.css.top.toPx(true) : 0);
    let y;
    if (view.css && view.css.bottom) {
      y = this.style.height - height - view.css.bottom.toPx(true);
    } else {
      if (view.css && view.css.top) {
        // debugger;
        if (typeof view.css.top === 'string') {
          y = view.css.top.toPx(true);
        } else {
          const tops = view.css.top;
          if (Array.isArray(tops[1])) {
            const dynamicHeight = tops[1].reduce((pre, next) => {
              return pre + this.globalHeight[next];
            }, 0);
            y = tops[0].toPx(true) + dynamicHeight * (tops[2] || 1);
          } else {
            y = tops[0].toPx(true) + this.globalHeight[tops[1]] * (tops[2] || 1);
          }
          // debugger
        }
      } else {
        y = 0;
      }
    }


    if (view.id) {
      this.globalWidth[view.id] = width;
      this.globalHeight[view.id] = height;
    }
    return {
      width,
      height,
      x,
      y,
      extra,
    };
  }

  _prePaint(view, notClip, { x, y, height, width }) {
    // 当设置了 right 时，默认 align 用 right，反之用 left
    // 平移画布left/top
    const align = view.css && view.css.align ? view.css.align : (view.css && view.css.right ? 'right' : 'left');
    switch (align) {
      case 'center':
        this.ctx.translate(x, y + height / 2);
        break;
      case 'right':
        this.ctx.translate(x - width / 2, y + height / 2);
        break;
      default:
        this.ctx.translate(x + width / 2, y + height / 2);
        break;
    }
    // debugger;
    // 旋转角度
    const angle = view.css && view.css.rotate ? this._getAngle(view.css.rotate) : 0;
    this.ctx.rotate(angle);
    // 圆角裁剪
    if (!notClip && view.css && view.css.borderRadius && view.type !== 'rect') {
      this._doClip(view.css.borderRadius, width, height, !!view.css.isOnlyUpHalf);
    }
    // 阴影
    this._doShadow(view);
  }

  // 画文字的背景图片
  _doBackground(view) {
    this.ctx.save();
    const { height: rawHeight, width: rawWidth } = view.processedLocation;
    const { contentX: x, contentY: y } = view.renderStyle

    this._prePaint(view, true, {
      x,
      y,
      width: rawWidth,
      height: rawHeight
    });

    const {
      background,
      padding,
    } = view.css;
    let pd = [0, 0, 0, 0];
    if (padding) {
      const pdg = padding.split(/\s+/);
      if (pdg.length === 1) {
        const x = pdg[0].toPx();
        pd = [x, x, x, x];
      }
      if (pdg.length === 2) {
        const x = pdg[0].toPx();
        const y = pdg[1].toPx();
        pd = [x, y, x, y];
      }
      if (pdg.length === 3) {
        const x = pdg[0].toPx();
        const y = pdg[1].toPx();
        const z = pdg[2].toPx();
        pd = [x, y, z, y];
      }
      if (pdg.length === 4) {
        const x = pdg[0].toPx();
        const y = pdg[1].toPx();
        const z = pdg[2].toPx();
        const a = pdg[3].toPx();
        pd = [x, y, z, a];
      }
    }
    const width = rawWidth + pd[1] + pd[3];
    const height = rawHeight + pd[0] + pd[2];

    this._doClip(view.css.borderRadius, width, height);
    // debugger;
    if (GD.api.isGradient(background)) {
      GD.api.doGradient(background, width, height, this.ctx);
    } else {
      // this.ctx.fillStyle = '#FF6146';
      this.ctx.fillStyle = background;
    }
    this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
    this.ctx.restore();
  }

  _drawImage(url, ...args) {
    const img = this.data._canvas.createImage();
    img.src = url;
    img.onload = () => {
      this.ctx.drawImage.apply(null, [img, ...args]);
    };
  }


  _drawAbsImage(view) {
    return new Promise((resolve, reject) => {
      if (!view.url) {
        return;
      }
      try {
        this.ctx.save();
        const { height, width } = view.processedLocation;
        // const { x, y } = view.renderStyle
        const { contentX: x, contentY: y } = view.renderStyle

        this._prePaint(view, false, { x, y, height, width });

        // 获得缩放到图片大小级别的裁减框
        let rWidth = view.sWidth;
        let rHeight = view.sHeight;
        let startX = 0;
        let startY = 0;
        // let dStartX = 0
        // let dStartY = 0
        // 绘画区域比例
        const cp = width / height;
        // 原图比例
        const op = view.sWidth / view.sHeight;
        if (cp >= op) {
          rHeight = rWidth / cp;
          startY = Math.round((view.sHeight - rHeight) / 2);
        } else {
          rWidth = rHeight * cp;
          startX = Math.round((view.sWidth - rWidth) / 2);
        }
        if (view.css && view.css.alpha) {
          this.ctx.setGlobalAlpha(view.css.alpha);
        }

        if (view.css && view.css.mode === 'scaleToFill') {
          if (this.data.caniuse) {
            const img = this.data._canvas.createImage();
            img.src = view.url;
            img.onload = () => {
              this.ctx.drawImage(img, startX, startY, rWidth, rHeight, -(width / 2), -(height / 2), width, height);
              this.ctx.restore();
              this._doBorder(view, width, height);
              resolve(true);
            };
          } else {
            this._drawImage(view.url, -(width / 2), -(height / 2), width, height);
            this.ctx.restore();
            this._doBorder(view, width, height);
            resolve(true);
          }
        } else {
          if (this.data.caniuse) {
            const img = this.data._canvas.createImage();
            img.src = view.url;
            img.onload = () => {
              this.ctx.drawImage(img, startX, startY, rWidth, rHeight, -(width / 2), -(height / 2), width, height);
              this.ctx.restore();
              this._doBorder(view, width, height);
              resolve(true);
            };
          } else {
            this.ctx.drawImage(view.url, startX, startY, rWidth, rHeight, -(width / 2), -(height / 2), width, height);
            this.ctx.restore();
            this._doBorder(view, width, height);
            resolve(true);
          }
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  _fillAbsText(view) {
    if (!view.text) {
      return;
    }
    if (view.css.background) {
      // 生成背景
      this._doBackground(view);
    }
    this.ctx.save();
    const fontWeight = view.css.fontWeight === 'bold' ? 'bold' : 'normal';
    view.css.fontSize = view.css.fontSize ? view.css.fontSize : '20rpx';
    this.ctx.font = `normal ${fontWeight} ${view.css.fontSize.toPx()}px ${view.css.fontFamily ? `"${view.css.fontFamily}"` : 'sans-serif'}`;
    const { height, width, extra } = view.processedLocation;
    // const { x, y } = view.renderStyle
    const { contentX: x, contentY: y } = view.renderStyle


    this._prePaint(view, view.css.background && view.css.borderRadius, { x, y, height, width });

    this.ctx.fillStyle = (view.css.color || 'black');
    const {
      lines,
      lineHeight,
      textArray,
      linesArray,
    } = extra;
    // debugger

    let lineIndex = 0;
    for (let j = 0; j < textArray.length; ++j) {
      const preLineLength = Math.round(textArray[j].length / linesArray[j]);
      let start = 0;
      let alreadyCount = 0;
      for (let i = 0; i < linesArray[j]; ++i) {
        // 绘制行数大于最大行数，则直接跳出循环
        if (lineIndex >= lines) {
          break;
        }
        alreadyCount = preLineLength;
        let text = textArray[j].substr(start, alreadyCount);
        let measuredWith = this.ctx.measureText(text).width;
        // 如果测量大小小于width一个字符的大小，则进行补齐，如果测量大小超出 width，则进行减除
        // 如果已经到文本末尾，也不要进行该循环
        while ((start + alreadyCount <= textArray[j].length) && (width - measuredWith > view.css.fontSize.toPx() || measuredWith > width)) {
          if (measuredWith < width) {
            text = textArray[j].substr(start, ++alreadyCount);
          } else {
            if (text.length <= 1) {
              // 如果只有一个字符时，直接跳出循环
              break;
            }
            text = textArray[j].substr(start, --alreadyCount);
          }
          measuredWith = this.ctx.measureText(text).width;
        }
        start += text.length;
        // 如果是最后一行了，发现还有未绘制完的内容，则加...
        if (lineIndex === lines - 1 && (j < textArray.length - 1 || start < textArray[j].length)) {
          while (this.ctx.measureText(`${text}...`).width > width) {
            if (text.length <= 1) {
              // 如果只有一个字符时，直接跳出循环
              break;
            }
            text = text.substring(0, text.length - 1);
          }
          text += '...';
          measuredWith = this.ctx.measureText(text).width;
        }

        if (this.data.caniuse) {
          this.ctx.textAlign = view.css.textAlign ? view.css.textAlign : 'left';
        } else {
          this.ctx.setTextAlign(view.css.textAlign ? view.css.textAlign : 'left');
        }
        let x;
        switch (view.css.textAlign) {
          case 'center':
            x = 0;
            break;
          case 'right':
            x = (width / 2);
            break;
          default:
            x = -(width / 2);
            break;
        }
        const y = -(height / 2) + (lineIndex === 0 ? view.css.fontSize.toPx() : (view.css.fontSize.toPx() + lineIndex * lineHeight));
        lineIndex++;
        if (view.css.textStyle === 'stroke') {
          this.ctx.strokeText(text, x, y, measuredWith);
        } else {
          this.ctx.fillText(text, x, y, measuredWith);
        }
        const fontSize = view.css.fontSize.toPx();
        if (view.css.textDecoration) {
          this.ctx.beginPath();
          if (/\bunderline\b/.test(view.css.textDecoration)) {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + measuredWith, y);
          }
          if (/\boverline\b/.test(view.css.textDecoration)) {
            this.ctx.moveTo(x, y - fontSize);
            this.ctx.lineTo(x + measuredWith, y - fontSize);
          }
          if (/\bline-through\b/.test(view.css.textDecoration)) {
            this.ctx.moveTo(x, y - fontSize / 3);
            this.ctx.lineTo(x + measuredWith, y - fontSize / 3);
          }
          this.ctx.closePath();
          this.ctx.strokeStyle = view.css.color;
          this.ctx.stroke();
        }
      }
    }
    this.ctx.restore();
    this._doBorder(view, width, height);
  }

  _drawAbsRect(view) {
    this.ctx.save();
    // const {
    //   width,
    //   height,
    //   x, y
    // } = this._preProcess(view);
    const { height, width } = view.processedLocation;
    // const { x, y } = view.renderStyle
    const { contentX: x, contentY: y } = view.renderStyle



    this._prePaint(view, false, { x, y, height, width });

    if (GD.api.isGradient(view.css.color)) {
      GD.api.doGradient(view.css.color, width, height, this.ctx);
    } else {
      this.ctx.fillStyle = view.css.color;
    }
    const borderRadius = view.css.borderRadius;
    const r = borderRadius ? Math.min(borderRadius.toPx(), width / 2, height / 2) : 0;
    this.ctx.beginPath();
    this.ctx.arc(-width / 2 + r, -height / 2 + r, r, 1 * Math.PI, 1.5 * Math.PI); // 左上角圆弧
    this.ctx.lineTo(width / 2 - r, -height / 2);
    this.ctx.arc(width / 2 - r, -height / 2 + r, r, 1.5 * Math.PI, 2 * Math.PI); // 右上角圆弧
    this.ctx.lineTo(width / 2, height / 2 - r);
    this.ctx.arc(width / 2 - r, height / 2 - r, r, 0, 0.5 * Math.PI); // 右下角圆弧
    this.ctx.lineTo(-width / 2 + r, height / 2);
    this.ctx.arc(-width / 2 + r, height / 2 - r, r, 0.5 * Math.PI, 1 * Math.PI); // 左下角圆弧
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
    this._doBorder(view, width, height);
  }


  // shadow 支持 (x, y, blur, color), 不支持 spread
  // shadow:0px 0px 10px rgba(0,0,0,0.1);
  _doShadow(view) {
    if (!view.css || !view.css.shadow) {
      return;
    }
    const box = view.css.shadow.replace(/,\s+/g, ',').split(' ');
    if (box.length > 4) {
      console.error('shadow don\'t spread option');
      return;
    }
    this.ctx.shadowOffsetX = parseInt(box[0], 10);
    this.ctx.shadowOffsetY = parseInt(box[1], 10);
    this.ctx.shadowBlur = parseInt(box[2], 10);
    this.ctx.shadowColor = box[3];
  }

  _getAngle(angle) {
    return Number(angle) * Math.PI / 180;
  }
}
