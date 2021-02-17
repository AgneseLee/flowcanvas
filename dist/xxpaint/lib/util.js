"use strict";function _typeof(r){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}function isValidUrl(r){return/(ht|f)tp(s?):\/\/([^ \\/]*\.)+[^ \\/]*(:[0-9]+)?\/?/.test(r)}function equal(r,e){if(r===e)return!0;if(r&&e&&"object"==_typeof(r)&&"object"==_typeof(e)){var t,n,i=Array.isArray(r),o=Array.isArray(e);if(i&&o){if((a=r.length)!=e.length)return!1;for(t=a;0!=t--;)if(!equal(r[t],e[t]))return!1;return!0}if(i!=o)return!1;i=r instanceof Date,o=e instanceof Date;if(i!=o)return!1;if(i&&o)return r.getTime()==e.getTime();i=r instanceof RegExp,o=e instanceof RegExp;if(i!=o)return!1;if(i&&o)return r.toString()==e.toString();var a,f=Object.keys(r);if((a=f.length)!==Object.keys(e).length)return!1;for(t=a;0!=t--;)if(!Object.prototype.hasOwnProperty.call(e,f[t]))return!1;for(t=a;0!=t--;)if(!equal(r[n=f[t]],e[n]))return!1;return!0}return r!=r&&e!=e}function compareVersion(r,e){r=r.split("."),e=e.split(".");for(var t=Math.max(r.length,e.length);r.length<t;)r.push("0");for(;e.length<t;)e.push("0");for(var n=0;n<t;n++){var i=parseInt(r[n]),o=parseInt(e[n]);if(o<i)return 1;if(i<o)return-1}return 0}function canUseNewCanvas(){return 0<=compareVersion(wx.getSystemInfoSync().SDKVersion,"2.9.0")}function setStringPrototype(n,i){String.prototype.toPx=function(r){var e=r?/^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g:/^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g,t=e.exec(this);if(!this||!t)return console.error("The size: ".concat(this," is illegal")),0;r=t[2],e=parseFloat(this),t=0;return"rpx"===r?t=Math.round(e*n*(i||1)):"px"===r&&(t=Math.round(e*(i||1))),t}}function breadthFirstSearchRight(r){var e=[];if(null!=r){var t=[];for(t.unshift(r);0!=t.length;){var n=t.shift();e.push(n);for(var i=n.children||[],o=i.length-1;0<=o;o--)t.push(i[o])}}return e.reverse()}function breadthFirstSearch(r){var e=[];if(null!=r){var t=[];for(t.unshift(r);0!=t.length;){var n=t.shift();e.push(n);for(var i=n.children||[],o=0;o<i.length;o++)t.push(i[o])}}return e}function formatPaddingMargin(r,e){for(var t=JSON.parse(JSON.stringify(r)),n=0,i=["paddingLeft","marginLeft","paddingTop","marginTop","paddingRight","paddingBottom","marginRight","marginBottom"];n<i.length;n++){var o=i[n],a=-1<o.indexOf("Left")||-1<o.indexOf("Right")?"width":"height";if(t[o])if(-1<t[o].indexOf("px"))t[o]=t[o].toPx();else if(t[o].indexOf("%")&&e){for(t[o]=t[o].replace("%","")/100;e&&-1<e.css[a].indexOf("%");){var f=e.css[a].replace("%","")/100;t[o]=t[o]*f,e=e.parent}t[o]=t[o]*e.css[a].toPx()}else console.error("please enter legal ".concat(o," of number or percentage."));else t[o]=0}return t}function formatToNum(r,e,t){var n=0;if(!r)return n;if(-1<r.indexOf("px"))n=r.toPx();else if(r.indexOf("%")&&e){for(n=r.replace("%","")/100;e&&-1<e.css[t].indexOf("%");)n*=e.css[t].replace("%","")/100,e=e.parent;n*=e.css[t].toPx()}else console.error("please enter legal ".concat(t," of number or percentage."));return n}function deepFirstSearch(r,e){var t=[];if(null!=r){var n=[];for(n.push(r);0!=n.length;){var i=n.pop();e&&e.call(null,i),t.push(i);for(var o=i.children,a=o.length-1;0<=a;a--)n.push(o[a])}}return t}module.exports={isValidUrl:isValidUrl,equal:equal,canUseNewCanvas:canUseNewCanvas,setStringPrototype:setStringPrototype,breadthFirstSearchRight:breadthFirstSearchRight,breadthFirstSearch:breadthFirstSearch,formatPaddingMargin:formatPaddingMargin,formatToNum:formatToNum,deepFirstSearch:deepFirstSearch};