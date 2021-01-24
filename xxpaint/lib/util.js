
function isValidUrl(url) {
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
function equal(a, b) {
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
function canUseNewCanvas() {
  const version = wx.getSystemInfoSync().SDKVersion
  // console.warn("version", version)
  return compareVersion(version, '2.9.0') >= 0;
}

// 字符串rpx/px转换成数字，单位为px
function setStringPrototype(screenK, scale) {
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
function breadthFirstSearchRight(node) {

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
function breadthFirstSearch(node) {

  var nodes = [];

  if (node != null) {

    var queue = [];

    queue.unshift(node);

    while (queue.length != 0) {

      var item = queue.shift();

      nodes.push(item);

      var children = item.children||[];

      for (var i = 0; i < children.length; i++)
        queue.push(children[i]);

    }

  }

  return nodes;

}



module.exports = {
  isValidUrl,
  equal,
  canUseNewCanvas,
  setStringPrototype,
  breadthFirstSearchRight,
  breadthFirstSearch
};

