export function isValidUrl(url) {
  return /(ht|f)tp(s?):\/\/([^ \\/]*\.)+[^ \\/]*(:[0-9]+)?\/?/.test(url);
}

/**
 * 深度对比两个对象是否一致
 * from: https://github.com/epoberezkin/fast-deep-equal
 * @param  {Object} a 对象a
 * @param  {Object} b 对象b
 * @return {Boolean}   是否相同
 */
/* eslint-disable */
export function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = Array.isArray(a)
      , arrB = Array.isArray(b)
      , i
      , length
      , key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = Object.keys(a);
    length = keys.length;

    if (length !== Object.keys(b).length)
      return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a !== a && b !== b;
}

// 判断基础库版本
function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

// >=2.9.0 的基础库可以用新版canvas
export function canUseNewCanvas() {
  const version = wx.getSystemInfoSync().SDKVersion
  // console.warn("version", version)
  return compareVersion(version, '2.9.0') >= 0;
}

// 字符串rpx/px转换成数字，单位为px
export function setStringPrototype(screenK, scale) {
  /* eslint-disable no-extend-native */
  /**
   * 是否支持负数
   * @param {Boolean} minus 是否支持负数
   */
  String.prototype.toPx = function toPx(minus) {
    let reg;
    if (minus) {
      reg = /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
    } else {
      reg = /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
    }
    const results = reg.exec(this);
    if (!this || !results) {
      console.error(`The size: ${this} is illegal`);
      return 0;
    }
    const unit = results[2];
    const value = parseFloat(this);

    let res = 0;
    if (unit === 'rpx') {
      res = Math.round(value * screenK * (scale || 1));
    } else if (unit === 'px') {
      res = Math.round(value * (scale || 1));
    }
    return res;
  };
}

// 逆序广度优先
export function breadthFirstSearchRight(node) {
  var nodes = [];
  if (node != null) {
    var queue = [];
    queue.unshift(node);
    while (queue.length != 0) {
      var item = queue.shift();
      nodes.push(item);
      var children = item.children || []
      for (var i = children.length - 1; i >= 0; i--)
        queue.push(children[i]);
    }
  }
  return nodes.reverse();
}
// 顺序广度优先
export function breadthFirstSearch(node) {
  var nodes = [];
  if (node != null) {
    var queue = [];
    queue.unshift(node);
    while (queue.length != 0) {
      var item = queue.shift();
      nodes.push(item);
      var children = item.children || [];
      for (var i = 0; i < children.length; i++)
        queue.push(children[i]);
    }
  }
  return nodes;
}

/**
 * 把css中的padding/margin统一格式化成数字输出
 * @param {object} css 
 * @param {object} parent 父节点
 */
export function formatPaddingMargin(css, parent) {
  const copy = JSON.parse(JSON.stringify(css))
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
 * 转换成px
 * @param {string} _w 5px or 50% 
 * @param {object} parent 父节点对象
 * @param {string} sizeName width/height
 */
export function formatToNum(_w, parent, sizeName) {
  let width = 0
  if (!_w) {
    return width
  }
  else if (_w.indexOf('px') > -1) {
    width = _w.toPx();
  } else if (_w.indexOf('%') && parent) {
    width = (_w.replace('%', '')) / 100
    while (parent && parent.css[sizeName].indexOf('%') > -1) {
      const percentage = (parent.css[sizeName].replace('%', '')) / 100
      width = width * percentage
      parent = parent.parent
    }
    width = width * parent.css[sizeName].toPx()

  } else {
    console.error(`please enter legal ${sizeName} of number or percentage.`)
  }
  // debugger
  return width
}

export function deepFirstSearch(node, fn) {
  var nodes = [];
  if (node != null) {
      var stack = [];
      stack.push(node);
      while (stack.length != 0) {
      var item = stack.pop();
      fn && fn.call(null, item)
      nodes.push(item);
      var children = item.children;
      for (var i = children.length - 1; i >= 0; i--)
          stack.push(children[i]);
      }
  }
  return nodes;
}


