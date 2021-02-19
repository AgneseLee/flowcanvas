"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var vnode_1 = require("./vnode");
var line_1 = require("./line");
var layout_1 = require("./layout");
var html_1 = require("./html");
var image_1 = require("./image");
var GD = require('./gradient.js');
var vnodd = {};
var dl = {};
var defaultPaddingMargin = {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
};
var Painter = (function () {
    function Painter(ctx, data) {
        this.ctx = ctx;
        this.data = data;
        this.globalWidth = {};
        this.globalHeight = {};
    }
    Painter.prototype.beforePaint = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.transformNTo1()];
                    case 1:
                        _a.sent();
                        console.log('eeeeeeeeee ', this.data);
                        return [2, this.data];
                }
            });
        });
    };
    Painter.prototype.paint = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, view;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.style = {
                            width: this.data.children[0].css.width.toPx(),
                            height: this.data.children[0].css.height.toPx(),
                        };
                        _i = 0, _a = this.data.views;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        view = _a[_i];
                        return [4, this._drawAbsolute(view)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        if (this.data.caniuse) {
                            callback();
                        }
                        else {
                            this.ctx.draw(false, function () {
                                callback();
                            });
                        }
                        return [2];
                }
            });
        });
    };
    Painter.prototype.transformNTo1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rr, tplTo1, nodes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rr = vnode_1.xmlToVnode(html_1.wxml, html_1.style);
                        console.log('** ', rr);
                        this.data.children[0] = rr;
                        tplTo1 = this.data;
                        console.log('--- ', tplTo1);
                        return [4, image_1.downloadImages(tplTo1)];
                    case 1:
                        _a.sent();
                        this.calcElementWidthHeight(tplTo1.children[0]);
                        nodes = this.calcElementPosition(tplTo1.children[0]);
                        this.data.views = nodes;
                        return [2];
                }
            });
        });
    };
    Painter.prototype.calcElementWidthHeight = function (rootNode) {
        var reverseBfsNodes = util_1.breadthFirstSearchRight(rootNode);
        for (var i = 0; i < reverseBfsNodes.length; i++) {
            this.preProcessObj(reverseBfsNodes[i]);
            if (['view', 'rect'].includes(reverseBfsNodes[i].type)) {
                var _a = reverseBfsNodes[i].processedLocation, parentWidth = _a.width, parentHeight = _a.height;
                var widthSum = 0;
                var heightSum = 0;
                var isLines = false;
                var children = reverseBfsNodes[i].children || [];
                for (var j = 0; j < children.length; j++) {
                    var childWidth = children[j].processedLocation.width;
                    var childHeight = children[j].processedLocation.height;
                    var childPaddingLeft = children[j].css.paddingLeft ? children[j].css.paddingLeft.toPx() : 0;
                    var childMarginLeft = children[j].css.marginLeft ? children[j].css.marginLeft.toPx() : 0;
                    var childMarginTop = children[j].css.marginTop ? children[j].css.marginTop.toPx() : 0;
                    var childPaddingTop = children[j].css.paddingTop ? children[j].css.paddingTop.toPx() : 0;
                    var xAdder = childWidth + childPaddingLeft + childMarginLeft;
                    var yAdder = childHeight + childMarginTop + childPaddingTop;
                    isLines = children[j].type === 'block';
                    if (!isLines) {
                        widthSum += (xAdder);
                        if (widthSum >= parentWidth && j === 0) {
                            isLines = true;
                            heightSum += yAdder;
                        }
                        else if (widthSum > parentWidth) {
                            isLines = true;
                            heightSum += yAdder;
                        }
                        else if (widthSum < parentWidth && j === 0) {
                            isLines = false;
                            heightSum += yAdder;
                        }
                    }
                    else {
                        heightSum += yAdder;
                        isLines = false;
                        widthSum = 0;
                    }
                }
                reverseBfsNodes[i].processedLocation.height = Math.max(heightSum, reverseBfsNodes[i].processedLocation.height);
                console.log(reverseBfsNodes[i].processedLocation.height);
            }
            else if (reverseBfsNodes[i].type === 'block') {
                var _b = reverseBfsNodes[i].processedLocation, parentWidth = _b.width, parentHeight = _b.height;
                var isAutoHeight = !!parentHeight;
                if (isAutoHeight) {
                    var widthSum = 0;
                    var heightSum = 0;
                    var isLines = false;
                    var children = reverseBfsNodes[i].children || [];
                    for (var j = 0; j < children.length; j++) {
                        var childWidth = children[j].processedLocation.width;
                        var childHeight = children[j].processedLocation.height;
                        var childPaddingLeft = children[j].css.paddingLeft ? children[j].css.paddingLeft.toPx() : 0;
                        var childMarginLeft = children[j].css.marginLeft ? children[j].css.marginLeft.toPx() : 0;
                        var childMarginTop = children[j].css.marginTop ? children[j].css.marginTop.toPx() : 0;
                        var childPaddingTop = children[j].css.paddingTop ? children[j].css.paddingTop.toPx() : 0;
                        var xAdder = childWidth + childPaddingLeft + childMarginLeft;
                        var yAdder = childHeight + childMarginTop + childPaddingTop;
                        if (!isLines) {
                            widthSum += (xAdder);
                            if (widthSum >= parentWidth && j === 0) {
                                isLines = true;
                                heightSum += yAdder;
                            }
                            else if (widthSum > parentWidth) {
                                isLines = true;
                                heightSum += yAdder;
                            }
                            else if (widthSum < parentWidth && j === 0) {
                                isLines = false;
                                heightSum += yAdder;
                            }
                            reverseBfsNodes[i].processedLocation.height = Math.max(heightSum, reverseBfsNodes[i].processedLocation.height);
                        }
                        else {
                            heightSum += yAdder;
                            isLines = false;
                            widthSum = 0;
                            reverseBfsNodes[i].processedLocation.height = Math.max(heightSum, reverseBfsNodes[i].processedLocation.height);
                        }
                    }
                }
                else {
                }
            }
        }
        console.log('(((((( ', reverseBfsNodes);
        return reverseBfsNodes;
    };
    Painter.prototype.calcElementPosition = function (rootNode) {
        var bfsNodes = util_1.breadthFirstSearch(rootNode);
        for (var i = 0; i < bfsNodes.length; i++) {
            var parent = bfsNodes[i].parent;
            var _a = __assign(__assign({}, defaultPaddingMargin), bfsNodes[i].css), paddingLeft = _a.paddingLeft, marginLeft = _a.marginLeft, paddingTop = _a.paddingTop, marginTop = _a.marginTop;
            if (!parent) {
                bfsNodes[i].renderStyle = {
                    x: 0,
                    y: 0,
                    contentX: util_1.formatToNum(paddingLeft, bfsNodes[i].parent, 'width') + util_1.formatToNum(marginLeft, bfsNodes[i].parent, 'width'),
                    contentY: util_1.formatToNum(paddingTop, bfsNodes[i].parent, 'height') + util_1.formatToNum(marginTop, bfsNodes[i].parent, 'height'),
                };
                continue;
            }
            var isLines = layout_1.getIsChangeLine(bfsNodes[i]);
            this.insertVnode(bfsNodes[i], isLines);
        }
        return bfsNodes;
    };
    Painter.prototype.insertVnode = function (vnode, isChangeLine) {
        if (['block'].includes(vnode.type)) {
            var _a = __assign(__assign({}, defaultPaddingMargin), vnode.css), paddingLeft = _a.paddingLeft, marginLeft = _a.marginLeft, paddingTop = _a.paddingTop, marginTop = _a.marginTop;
            var x = vnode.parent.renderStyle.contentX;
            var y = layout_1.getPreLayout(vnode).y + layout_1.getPreLayout(vnode).height;
            var renderStyle = {
                x: x,
                y: y,
                contentX: x + util_1.formatToNum(paddingLeft, vnode.parent, 'width') + util_1.formatToNum(marginLeft, vnode.parent, 'width'),
                contentY: y + util_1.formatToNum(paddingTop, vnode.parent, 'height') + util_1.formatToNum(marginTop, vnode.parent, 'height'),
            };
            vnode.renderStyle = renderStyle;
        }
        else {
            line_1.insertVnodeIntoLine(vnode, isChangeLine);
        }
    };
    Painter.prototype.routeByDFS = function () {
        var parentNode = { children: this.data.views };
        if (!parentNode) {
            return null;
        }
        var sid = 1;
        parentNode.sid = sid;
        sid++;
        var stack = [];
        for (var i = parentNode.children.length; i > 0; i--) {
            parentNode.children[i - 1].sid = sid;
            parentNode.children[i - 1].f_sid = 1;
            sid++;
            stack.push(parentNode.children[i - 1]);
        }
        var _loop_1 = function () {
            var node = stack.pop();
            if (node.children && node.children.length > 0) {
                node.children.forEach(function (x) {
                    x.sid = sid;
                    x.f_sid = node.sid;
                    sid++;
                });
                stack = Array.from(node.children).concat(stack);
            }
        };
        while (stack.length) {
            _loop_1();
        }
    };
    Painter.prototype.routeByBFS = function () {
        var node = { children: this.data.views };
        var nodes = [];
        if (node !== null) {
            var queue = [];
            queue.unshift(node);
            while (queue.length) {
                var item = queue.shift();
                item = this.preProcessObj(item);
                nodes.push(item);
                var children = item.children;
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        queue.push(children[i]);
                    }
                }
            }
        }
    };
    Painter.prototype.preProcessObj = function (view) {
        var json;
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
            case 'block':
                json = this._preProcess(view);
                break;
            default:
                break;
        }
        view.processedLocation = json;
        return view;
    };
    Painter.prototype._background = function () {
        this.ctx.save();
        var _a = this.style, width = _a.width, height = _a.height;
        var bg = this.data.background;
        this.ctx.translate(width / 2, height / 2);
        this._doClip(this.data.borderRadius, width, height);
        if (!bg) {
            this.ctx.fillStyle = '#fff';
            this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
        }
        else if (bg.startsWith('#') || bg.startsWith('rgba') || bg.toLowerCase() === 'transparent') {
            this.ctx.fillStyle = bg;
            this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
        }
        else if (GD.api.isGradient(bg)) {
            GD.api.doGradient(bg, width, height, this.ctx);
            this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
        }
        else {
            this._drawImage(bg, -(width / 2), -(height / 2), width, height);
        }
        this.ctx.restore();
    };
    Painter.prototype._drawAbsolute = function (view) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!view) {
                            return [2];
                        }
                        _a = view.type;
                        switch (_a) {
                            case 'image': return [3, 1];
                            case 'text': return [3, 3];
                            case 'rect': return [3, 4];
                            case 'block': return [3, 5];
                        }
                        return [3, 6];
                    case 1: return [4, this._drawAbsImage(view)];
                    case 2:
                        _b.sent();
                        return [3, 7];
                    case 3:
                        this._fillAbsText(view);
                        return [3, 7];
                    case 4:
                        this._drawAbsRect(view);
                        return [3, 7];
                    case 5:
                        this._drawAbsRect(view);
                        return [3, 7];
                    case 6: return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    Painter.prototype._doClip = function (borderRadius, width, height, isOnlyUpHalf) {
        if (isOnlyUpHalf === void 0) { isOnlyUpHalf = false; }
        if (borderRadius && width && height) {
            var r = Math.min(borderRadius.toPx(), width / 2, height / 2);
            this.ctx.globalAlpha = 0;
            this.ctx.fillStyle = 'white';
            this.ctx.beginPath();
            this.ctx.arc(-width / 2 + r, -height / 2 + r, r, 1 * Math.PI, 1.5 * Math.PI);
            this.ctx.lineTo(width / 2 - r, -height / 2);
            this.ctx.arc(width / 2 - r, -height / 2 + r, r, 1.5 * Math.PI, 2 * Math.PI);
            if (isOnlyUpHalf) {
                this.ctx.lineTo(width / 2, height / 2);
                this.ctx.lineTo(-width / 2, height / 2);
            }
            else {
                this.ctx.lineTo(width / 2, height / 2 - r);
                this.ctx.arc(width / 2 - r, height / 2 - r, r, 0, 0.5 * Math.PI);
                this.ctx.lineTo(-width / 2 + r, height / 2);
                this.ctx.arc(-width / 2 + r, height / 2 - r, r, 0.5 * Math.PI, 1 * Math.PI);
            }
            this.ctx.closePath();
            this.ctx.fill();
            var _a = wx.getSystemInfoSync(), version = _a.version, platform = _a.platform;
            if (!(version <= '6.6.6' && platform === 'ios')) {
                this.ctx.clip();
            }
            this.ctx.globalAlpha = 1;
        }
    };
    Painter.prototype._doBorder = function (view, width, height) {
        if (!view.css) {
            return;
        }
        var _a = view.css, borderRadius = _a.borderRadius, borderWidth = _a.borderWidth, borderColor = _a.borderColor;
        if (!borderWidth) {
            return;
        }
        this.ctx.save();
        var _b = view.processedLocation, rawHeight = _b.height, rawWidth = _b.width;
        var _c = view.renderStyle, x = _c.x, y = _c.y;
        this._prePaint(view, true, { x: x, y: y, height: rawHeight, width: rawWidth });
        var r;
        if (borderRadius) {
            r = Math.min(borderRadius.toPx(), width / 2, height / 2);
        }
        else {
            r = 0;
        }
        var lineWidth = borderWidth.toPx();
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
    };
    Painter.prototype._preProcess = function (view, notClip) {
        var width = 0;
        var height;
        var extra;
        switch (view.type) {
            case 'text': {
                var textArray = view.text.split('\n');
                for (var i = 0; i < textArray.length; ++i) {
                    if (textArray[i] === '') {
                        textArray[i] = ' ';
                    }
                }
                var fontWeight = view.css.fontWeight === 'bold' ? 'bold' : 'normal';
                view.css.fontSize = view.css.fontSize ? view.css.fontSize : '20rpx';
                this.ctx.font = "normal " + fontWeight + " " + view.css.fontSize.toPx() + "px " + (view.css.fontFamily ? "\"" + view.css.fontFamily + "\"" : 'sans-serif');
                var lines = 0;
                var linesArray = [];
                for (var i = 0; i < textArray.length; ++i) {
                    var textLength = this.ctx.measureText(textArray[i]).width;
                    var partWidth = view.css.width ? util_1.formatToNum(view.css.width, view.parent, 'width') : textLength;
                    var calLines = Math.ceil(textLength / partWidth);
                    width = partWidth > width ? partWidth : width;
                    lines += calLines;
                    linesArray[i] = calLines;
                }
                lines = view.css.maxLines < lines ? view.css.maxLines : lines;
                var lineHeight = view.css.lineHeight ? view.css.lineHeight.toPx() : view.css.fontSize.toPx();
                height = lineHeight * lines;
                extra = {
                    lines: lines,
                    lineHeight: lineHeight,
                    textArray: textArray,
                    linesArray: linesArray,
                };
                if (view.id) {
                    var textWidth = 0;
                    for (var i = 0; i < textArray.length; ++i) {
                        textWidth = this.ctx.measureText(textArray[i]).width > textWidth ? this.ctx.measureText(textArray[i]).width : textWidth;
                    }
                    width = width ? (textWidth < width ? textWidth : width) : textWidth;
                }
                break;
            }
            case 'image': {
                var pixelRatio = wx.getSystemInfoSync().pixelRatio;
                var ratio = pixelRatio || 2;
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
                }
                else if (view.css.width === 'auto') {
                    height = view.css.height.toPx();
                    width = view.sWidth / view.sHeight * height;
                }
                else if (view.css.height === 'auto') {
                    width = view.css.width.toPx();
                    height = view.sHeight / view.sWidth * width;
                }
                else {
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
                width = util_1.formatToNum(view.css.width, view.parent, 'width');
                height = util_1.formatToNum(view.css.height, view.parent, 'height');
                break;
        }
        if (view.id) {
            this.globalWidth[view.id] = width;
            this.globalHeight[view.id] = height;
        }
        return {
            width: width,
            height: height,
            extra: extra,
        };
    };
    Painter.prototype._prePaint = function (view, notClip, _a) {
        var x = _a.x, y = _a.y, height = _a.height, width = _a.width;
        var align = view.css && view.css.align ? view.css.align : (view.css && view.css.right ? 'right' : 'left');
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
        var angle = view.css && view.css.rotate ? this._getAngle(view.css.rotate) : 0;
        this.ctx.rotate(angle);
        if (!notClip && view.css && view.css.borderRadius && view.type !== 'rect') {
            this._doClip(view.css.borderRadius, width, height, !!view.css.isOnlyUpHalf);
        }
        this._doShadow(view);
    };
    Painter.prototype._doBackground = function (view) {
        this.ctx.save();
        var _a = view.processedLocation, rawHeight = _a.height, rawWidth = _a.width;
        var _b = view.renderStyle, x = _b.contentX, y = _b.contentY;
        this._prePaint(view, true, {
            x: x,
            y: y,
            width: rawWidth,
            height: rawHeight,
        });
        var _c = view.css, background = _c.background, padding = _c.padding;
        var pd = [0, 0, 0, 0];
        if (padding) {
            var pdg = padding.split(/\s+/);
            if (pdg.length === 1) {
                var x_1 = pdg[0].toPx();
                pd = [x_1, x_1, x_1, x_1];
            }
            if (pdg.length === 2) {
                var x_2 = pdg[0].toPx();
                var y_1 = pdg[1].toPx();
                pd = [x_2, y_1, x_2, y_1];
            }
            if (pdg.length === 3) {
                var x_3 = pdg[0].toPx();
                var y_2 = pdg[1].toPx();
                var z = pdg[2].toPx();
                pd = [x_3, y_2, z, y_2];
            }
            if (pdg.length === 4) {
                var x_4 = pdg[0].toPx();
                var y_3 = pdg[1].toPx();
                var z = pdg[2].toPx();
                var a = pdg[3].toPx();
                pd = [x_4, y_3, z, a];
            }
        }
        var width = rawWidth + pd[1] + pd[3];
        var height = rawHeight + pd[0] + pd[2];
        this._doClip(view.css.borderRadius, width, height);
        if (GD.api.isGradient(background)) {
            GD.api.doGradient(background, width, height, this.ctx);
        }
        else {
            this.ctx.fillStyle = background;
        }
        this.ctx.fillRect(-(width / 2), -(height / 2), width, height);
        this.ctx.restore();
    };
    Painter.prototype._drawImage = function (url) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var img = this.data._canvas.createImage();
        img.src = url;
        img.onload = function () {
            _this.ctx.drawImage.apply(null, __spreadArrays([img], args));
        };
    };
    Painter.prototype._drawAbsImage = function (view) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!view.url) {
                return;
            }
            try {
                _this.ctx.save();
                var _a = view.processedLocation, height_1 = _a.height, width_1 = _a.width;
                var _b = view.renderStyle, x = _b.contentX, y = _b.contentY;
                _this._prePaint(view, false, { x: x, y: y, height: height_1, width: width_1 });
                var rWidth_1 = view.sWidth;
                var rHeight_1 = view.sHeight;
                var startX_1 = 0;
                var startY_1 = 0;
                var cp = width_1 / height_1;
                var op = view.sWidth / view.sHeight;
                if (cp >= op) {
                    rHeight_1 = rWidth_1 / cp;
                    startY_1 = Math.round((view.sHeight - rHeight_1) / 2);
                }
                else {
                    rWidth_1 = rHeight_1 * cp;
                    startX_1 = Math.round((view.sWidth - rWidth_1) / 2);
                }
                if (view.css && view.css.alpha) {
                    _this.ctx.setGlobalAlpha(view.css.alpha);
                }
                if (view.css && view.css.mode === 'scaleToFill') {
                    if (_this.data.caniuse) {
                        var img_1 = _this.data._canvas.createImage();
                        img_1.src = view.url;
                        img_1.onload = function () {
                            _this.ctx.drawImage(img_1, startX_1, startY_1, rWidth_1, rHeight_1, -(width_1 / 2), -(height_1 / 2), width_1, height_1);
                            _this.ctx.restore();
                            _this._doBorder(view, width_1, height_1);
                            resolve(true);
                        };
                    }
                    else {
                        _this._drawImage(view.url, -(width_1 / 2), -(height_1 / 2), width_1, height_1);
                        _this.ctx.restore();
                        _this._doBorder(view, width_1, height_1);
                        resolve(true);
                    }
                }
                else {
                    if (_this.data.caniuse) {
                        var img_2 = _this.data._canvas.createImage();
                        img_2.src = view.url;
                        img_2.onload = function () {
                            _this.ctx.drawImage(img_2, startX_1, startY_1, rWidth_1, rHeight_1, -(width_1 / 2), -(height_1 / 2), width_1, height_1);
                            _this.ctx.restore();
                            _this._doBorder(view, width_1, height_1);
                            resolve(true);
                        };
                    }
                    else {
                        _this.ctx.drawImage(view.url, startX_1, startY_1, rWidth_1, rHeight_1, -(width_1 / 2), -(height_1 / 2), width_1, height_1);
                        _this.ctx.restore();
                        _this._doBorder(view, width_1, height_1);
                        resolve(true);
                    }
                }
            }
            catch (err) {
                reject(err);
            }
        });
    };
    Painter.prototype._fillAbsText = function (view) {
        if (!view.text) {
            return;
        }
        if (view.css.background) {
            this._doBackground(view);
        }
        this.ctx.save();
        var fontWeight = view.css.fontWeight === 'bold' ? 'bold' : 'normal';
        view.css.fontSize = view.css.fontSize ? view.css.fontSize : '20rpx';
        this.ctx.font = "normal " + fontWeight + " " + view.css.fontSize.toPx() + "px " + (view.css.fontFamily ? "\"" + view.css.fontFamily + "\"" : 'sans-serif');
        var _a = view.processedLocation, height = _a.height, width = _a.width, extra = _a.extra;
        var _b = view.renderStyle, x = _b.contentX, y = _b.contentY;
        this._prePaint(view, view.css.background && view.css.borderRadius, { x: x, y: y, height: height, width: width });
        this.ctx.fillStyle = (view.css.color || 'black');
        var lines = extra.lines, lineHeight = extra.lineHeight, textArray = extra.textArray, linesArray = extra.linesArray;
        var lineIndex = 0;
        for (var j = 0; j < textArray.length; ++j) {
            var preLineLength = Math.round(textArray[j].length / linesArray[j]);
            var start = 0;
            var alreadyCount = 0;
            for (var i = 0; i < linesArray[j]; ++i) {
                if (lineIndex >= lines) {
                    break;
                }
                alreadyCount = preLineLength;
                var text = textArray[j].substr(start, alreadyCount);
                var measuredWith = this.ctx.measureText(text).width;
                while ((start + alreadyCount <= textArray[j].length) && (width - measuredWith > view.css.fontSize.toPx() || measuredWith > width)) {
                    if (measuredWith < width) {
                        text = textArray[j].substr(start, ++alreadyCount);
                    }
                    else {
                        if (text.length <= 1) {
                            break;
                        }
                        text = textArray[j].substr(start, --alreadyCount);
                    }
                    measuredWith = this.ctx.measureText(text).width;
                }
                start += text.length;
                if (lineIndex === lines - 1 && (j < textArray.length - 1 || start < textArray[j].length)) {
                    while (this.ctx.measureText(text + "...").width > width) {
                        if (text.length <= 1) {
                            break;
                        }
                        text = text.substring(0, text.length - 1);
                    }
                    text += '...';
                    measuredWith = this.ctx.measureText(text).width;
                }
                if (this.data.caniuse) {
                    this.ctx.textAlign = view.css.textAlign ? view.css.textAlign : 'left';
                }
                else {
                    this.ctx.setTextAlign(view.css.textAlign ? view.css.textAlign : 'left');
                }
                var x_5 = void 0;
                switch (view.css.textAlign) {
                    case 'center':
                        x_5 = 0;
                        break;
                    case 'right':
                        x_5 = (width / 2);
                        break;
                    default:
                        x_5 = -(width / 2);
                        break;
                }
                var y_4 = -(height / 2) + (lineIndex === 0 ? view.css.fontSize.toPx() : (view.css.fontSize.toPx() + lineIndex * lineHeight));
                lineIndex++;
                if (view.css.textStyle === 'stroke') {
                    this.ctx.strokeText(text, x_5, y_4, measuredWith);
                }
                else {
                    this.ctx.fillText(text, x_5, y_4, measuredWith);
                }
                var fontSize = view.css.fontSize.toPx();
                if (view.css.textDecoration) {
                    this.ctx.beginPath();
                    if (/\bunderline\b/.test(view.css.textDecoration)) {
                        this.ctx.moveTo(x_5, y_4);
                        this.ctx.lineTo(x_5 + measuredWith, y_4);
                    }
                    if (/\boverline\b/.test(view.css.textDecoration)) {
                        this.ctx.moveTo(x_5, y_4 - fontSize);
                        this.ctx.lineTo(x_5 + measuredWith, y_4 - fontSize);
                    }
                    if (/\bline-through\b/.test(view.css.textDecoration)) {
                        this.ctx.moveTo(x_5, y_4 - fontSize / 3);
                        this.ctx.lineTo(x_5 + measuredWith, y_4 - fontSize / 3);
                    }
                    this.ctx.closePath();
                    this.ctx.strokeStyle = view.css.color;
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.restore();
        this._doBorder(view, width, height);
    };
    Painter.prototype._drawAbsRect = function (view) {
        this.ctx.save();
        var _a = view.processedLocation, height = _a.height, width = _a.width;
        var _b = view.renderStyle, x = _b.contentX, y = _b.contentY;
        this._prePaint(view, false, { x: x, y: y, height: height, width: width });
        if (GD.api.isGradient(view.css.color)) {
            GD.api.doGradient(view.css.color, width, height, this.ctx);
        }
        else {
            this.ctx.fillStyle = view.css.color;
        }
        var borderRadius = view.css.borderRadius;
        var r = borderRadius ? Math.min(borderRadius.toPx(), width / 2, height / 2) : 0;
        this.ctx.beginPath();
        this.ctx.arc(-width / 2 + r, -height / 2 + r, r, 1 * Math.PI, 1.5 * Math.PI);
        this.ctx.lineTo(width / 2 - r, -height / 2);
        this.ctx.arc(width / 2 - r, -height / 2 + r, r, 1.5 * Math.PI, 2 * Math.PI);
        this.ctx.lineTo(width / 2, height / 2 - r);
        this.ctx.arc(width / 2 - r, height / 2 - r, r, 0, 0.5 * Math.PI);
        this.ctx.lineTo(-width / 2 + r, height / 2);
        this.ctx.arc(-width / 2 + r, height / 2 - r, r, 0.5 * Math.PI, 1 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
        this._doBorder(view, width, height);
    };
    Painter.prototype._doShadow = function (view) {
        if (!view.css || !view.css.shadow) {
            return;
        }
        var box = view.css.shadow.replace(/,\s+/g, ',').split(' ');
        if (box.length > 4) {
            console.error('shadow don\'t spread option');
            return;
        }
        this.ctx.shadowOffsetX = parseInt(box[0], 10);
        this.ctx.shadowOffsetY = parseInt(box[1], 10);
        this.ctx.shadowBlur = parseInt(box[2], 10);
        this.ctx.shadowColor = box[3];
    };
    Painter.prototype._getAngle = function (angle) {
        return Number(angle) * Math.PI / 180;
    };
    return Painter;
}());
exports.default = Painter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsK0JBQWtGO0FBR2xGLGlDQUFvRDtBQUNwRCwrQkFBNkM7QUFDN0MsbUNBQXlEO0FBQ3pELCtCQUFxQztBQUNyQyxpQ0FBeUM7QUFFekMsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3BDLElBQU0sS0FBSyxHQUFpQixFQUFFLENBQUE7QUFDOUIsSUFBTSxFQUFFLEdBQXFCLEVBQUUsQ0FBQTtBQUMvQixJQUFNLG9CQUFvQixHQUFHO0lBQzNCLFVBQVUsRUFBRSxDQUFDO0lBQ2IsYUFBYSxFQUFFLENBQUM7SUFDaEIsV0FBVyxFQUFFLENBQUM7SUFDZCxZQUFZLEVBQUUsQ0FBQztJQUNmLFVBQVUsRUFBRSxDQUFDO0lBQ2IsV0FBVyxFQUFFLENBQUM7SUFDZCxTQUFTLEVBQUUsQ0FBQztJQUNaLFlBQVksRUFBRSxDQUFDO0NBQ2hCLENBQUM7QUFFRjtJQUNFLGlCQUFZLEdBQUcsRUFBRSxJQUFJO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFFekIsQ0FBQztJQUVLLDZCQUFXLEdBQWpCOzs7OzRCQUVFLFdBQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFBOzt3QkFBMUIsU0FBMEIsQ0FBQzt3QkFJM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QyxXQUFPLElBQUksQ0FBQyxJQUFJLEVBQUM7Ozs7S0FDbEI7SUFFSyx1QkFB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QUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFF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QyxHQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxDQUFDO1FBRXJELElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1RDthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDckM7UUFDRCxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztRQUMzQyxJQUFNLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFJRCwyQkFBUyxHQUFULFVBQVUsSUFBSTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0QsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDN0MsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCwyQkFBUyxHQUFULFVBQVUsS0FBSztRQUNiLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ3ZDLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQTkrQkQsSUE4K0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbi8vIGltcG9ydCBEb3dubG9hZGVyIGZyb20gJy4vZG93bmxvYWRlcic7XG4vLyBpbXBvcnQgVHJlZU5vZGUgZnJvbSAnLi90cmVlTm9kZSdcbmltcG9ydCB7IGJyZWFkdGhGaXJzdFNlYXJjaFJpZ2h0LCBicmVhZHRoRmlyc3RTZWFyY2gsIGZvcm1hdFRvTnVtIH0gZnJvbSAnLi91dGlsJztcbi8vIGNvbnN0IE1vZGlmaWVyID0gcmVxdWlyZSgnLi9tb2RpZmllcicpLmRlZmF1bHQ7XG4vLyBjb25zdCBkb3dubG9hZGVyID0gbmV3IERvd25sb2FkZXIoKTtcbmltcG9ydCB7IGluaXRWbm9kZVRyZWUsIHhtbFRvVm5vZGUgfSBmcm9tICcuL3Zub2RlJztcbmltcG9ydCB7IGluc2VydFZub2RlSW50b0xpbmUgfSBmcm9tICcuL2xpbmUnO1xuaW1wb3J0IHsgZ2V0SXNDaGFuZ2VMaW5lLCBnZXRQcmVMYXlvdXQgfSBmcm9tICcuL2xheW91dCc7XG5pbXBvcnQgeyB3eG1sLCBzdHlsZSB9IGZyb20gJy4vaHRtbCc7XG5pbXBvcnQgeyBkb3dubG9hZEltYWdlcyB9IGZyb20gJy4vaW1hZ2UnO1xuLy8gaW1wb3J0IElWbm9kZSBmcm9tICcuLi8uLi8uLi90eXBpbmdzL3Zub2RlJ1xuY29uc3QgR0QgPSByZXF1aXJlKCcuL2dyYWRpZW50LmpzJyk7XG5jb25zdCB2bm9kZDpJVm5vZGUuQmFzZUF0dHI9e31cbmNvbnN0IGRsOklQcm9kdWN0Q29tbS5qZm5mbiA9e31cbmNvbnN0IGRlZmF1bHRQYWRkaW5nTWFyZ2luID0ge1xuICBwYWRkaW5nVG9wOiAwLFxuICBwYWRkaW5nQm90dG9tOiAwLFxuICBwYWRkaW5nTGVmdDogMCxcbiAgcGFkZGluZ1JpZ2h0OiAwLFxuICBtYXJnaW5MZWZ0OiAwLFxuICBtYXJnaW5SaWdodDogMCxcbiAgbWFyZ2luVG9wOiAwLFxuICBtYXJnaW5Cb3R0b206IDAsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWludGVyIHtcbiAgY29uc3RydWN0b3IoY3R4LCBkYXRhKSB7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLmdsb2JhbFdpZHRoID0ge307XG4gICAgdGhpcy5nbG9iYWxIZWlnaHQgPSB7fTtcbiAgICAvLyB0aGlzLl9wcmVQcm9jZXNzZWQgPSB7fTsgLy8g6aKE5aSE55CG6K6h566X5Ye655qE5q+P5Liq5YWD57Sg55qE5L2N572uXG4gIH1cblxuICBhc3luYyBiZWZvcmVQYWludCgpIHtcbiAgICAvLyDku45u57qn6L2s5o2i5oiQ5LiA57qnanNvbuaooeadv1xuICAgIGF3YWl0IHRoaXMudHJhbnNmb3JtTlRvMSgpO1xuXG4gICAgLy8g5byA5aeL57un5om/Y3NzXG5cbiAgICBjb25zb2xlLmxvZygnZWVlZWVlZWVlZSAnLCB0aGlzLmRhdGEpO1xuICAgIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cblxuICBhc3luYyBwYWludChjYWxsYmFjaykge1xuICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICB3aWR0aDogdGhpcy5kYXRhLmNoaWxkcmVuWzBdLmNzcy53aWR0aC50b1B4KCksXG4gICAgICBoZWlnaHQ6IHRoaXMuZGF0YS5jaGlsZHJlblswXS5jc3MuaGVpZ2h0LnRvUHgoKSxcbiAgICB9O1xuXG4gICAgLy8gdGhpcy5fYmFja2dyb3VuZCgpO1xuICAgIC8vIOW8gOWni+eUu1xuICAgIGZvciAoY29uc3QgdmlldyBvZiB0aGlzLmRhdGEudmlld3MpIHtcbiAgICAgIGF3YWl0IHRoaXMuX2RyYXdBYnNvbHV0ZSh2aWV3KTtcbiAgICAgIC8vIGRlYnVnZ2VyO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhLmNhbml1c2UpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3R4LmRyYXcoZmFsc2UsICgpID0+IHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHRyYW5zZm9ybU5UbzEoKSB7XG4gICAgLy8gdGhpcy5kYXRhXG4gICAgLy8gZGVidWdnZXJcbiAgICAvLyBpbml0Vm5vZGVUcmVlKHRoaXMuZGF0YSlcbiAgICBjb25zdCByciA9IHhtbFRvVm5vZGUod3htbCwgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCcqKiAnLCBycik7XG4gICAgdGhpcy5kYXRhLmNoaWxkcmVuWzBdID0gcnI7XG4gICAgY29uc3QgdHBsVG8xID0gdGhpcy5kYXRhO1xuICAgIC8vIGRlYnVnZ2VyXG4gICAgY29uc29sZS5sb2coJy0tLSAnLCB0cGxUbzEpO1xuXG4gICAgLy8g5LiL6L295omA5pyJ55So5Yiw55qE5Zu+54mHXG4gICAgYXdhaXQgZG93bmxvYWRJbWFnZXModHBsVG8xKTtcblxuICAgIC8vIOiuoeeul+avj+S4quiKgueCueeahOWuvemrmFxuICAgIHRoaXMuY2FsY0VsZW1lbnRXaWR0aEhlaWdodCh0cGxUbzEuY2hpbGRyZW5bMF0pO1xuXG4gICAgLy8g6K6h566X5q+P5Liq6IqC54K55L2N572uXG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLmNhbGNFbGVtZW50UG9zaXRpb24odHBsVG8xLmNoaWxkcmVuWzBdKTtcbiAgICB0aGlzLmRhdGEudmlld3MgPSBub2RlcztcbiAgfVxuXG4gIGNhbGNFbGVtZW50V2lkdGhIZWlnaHQocm9vdE5vZGUpIHtcbiAgICBjb25zdCByZXZlcnNlQmZzTm9kZXMgPSBicmVhZHRoRmlyc3RTZWFyY2hSaWdodChyb290Tm9kZSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJldmVyc2VCZnNOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gbGV0IHdpZHRoU3VtID0gMCwgaGVpZ2h0U3VtID0gMCwgaXNMaW5lcyA9IGZhbHNlXG4gICAgICB0aGlzLnByZVByb2Nlc3NPYmoocmV2ZXJzZUJmc05vZGVzW2ldKTtcbiAgICAgIC8vIGlubGluZS1ibG9ja+WuvemrmOmdoOWtkOiKgueCueaSkeWkp1xuICAgICAgaWYgKFsndmlldycsICdyZWN0J10uaW5jbHVkZXMocmV2ZXJzZUJmc05vZGVzW2ldLnR5cGUpKSB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGg6IHBhcmVudFdpZHRoLCBoZWlnaHQ6IHBhcmVudEhlaWdodCB9ID0gcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uO1xuICAgICAgICBsZXQgd2lkdGhTdW0gPSAwOyBsZXQgaGVpZ2h0U3VtID0gMDsgbGV0XG4gICAgICAgICAgaXNMaW5lcyA9IGZhbHNlO1xuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHJldmVyc2VCZnNOb2Rlc1tpXS5jaGlsZHJlbiB8fCBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNvbnN0IGNoaWxkV2lkdGggPSBjaGlsZHJlbltqXS5wcm9jZXNzZWRMb2NhdGlvbi53aWR0aDtcbiAgICAgICAgICBjb25zdCBjaGlsZEhlaWdodCA9IGNoaWxkcmVuW2pdLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodDtcbiAgICAgICAgICBjb25zdCBjaGlsZFBhZGRpbmdMZWZ0ID0gY2hpbGRyZW5bal0uY3NzLnBhZGRpbmdMZWZ0ID8gY2hpbGRyZW5bal0uY3NzLnBhZGRpbmdMZWZ0LnRvUHgoKSA6IDA7XG4gICAgICAgICAgY29uc3QgY2hpbGRNYXJnaW5MZWZ0ID0gY2hpbGRyZW5bal0uY3NzLm1hcmdpbkxlZnQgPyBjaGlsZHJlbltqXS5jc3MubWFyZ2luTGVmdC50b1B4KCkgOiAwO1xuICAgICAgICAgIGNvbnN0IGNoaWxkTWFyZ2luVG9wID0gY2hpbGRyZW5bal0uY3NzLm1hcmdpblRvcCA/IGNoaWxkcmVuW2pdLmNzcy5tYXJnaW5Ub3AudG9QeCgpIDogMDtcbiAgICAgICAgICBjb25zdCBjaGlsZFBhZGRpbmdUb3AgPSBjaGlsZHJlbltqXS5jc3MucGFkZGluZ1RvcCA/IGNoaWxkcmVuW2pdLmNzcy5wYWRkaW5nVG9wLnRvUHgoKSA6IDA7XG5cbiAgICAgICAgICBjb25zdCB4QWRkZXIgPSBjaGlsZFdpZHRoICsgY2hpbGRQYWRkaW5nTGVmdCArIGNoaWxkTWFyZ2luTGVmdDtcbiAgICAgICAgICBjb25zdCB5QWRkZXIgPSBjaGlsZEhlaWdodCArIGNoaWxkTWFyZ2luVG9wICsgY2hpbGRQYWRkaW5nVG9wO1xuXG4gICAgICAgICAgaXNMaW5lcyA9IGNoaWxkcmVuW2pdLnR5cGUgPT09ICdibG9jayc7XG4gICAgICAgICAgaWYgKCFpc0xpbmVzKSB7XG4gICAgICAgICAgICAvLyDkuI3mjaLooYxcbiAgICAgICAgICAgIHdpZHRoU3VtICs9ICh4QWRkZXIpO1xuICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgIGlmICh3aWR0aFN1bSA+PSBwYXJlbnRXaWR0aCAmJiBqID09PSAwKSB7XG4gICAgICAgICAgICAgIC8vIHJldmVyc2VCZnNOb2Rlc1tpXS5wcm9jZXNzZWRMb2NhdGlvbi53aWR0aCA9IHdpZHRoU3VtXG4gICAgICAgICAgICAgIGlzTGluZXMgPSB0cnVlO1xuICAgICAgICAgICAgICBoZWlnaHRTdW0gKz0geUFkZGVyO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aWR0aFN1bSA+IHBhcmVudFdpZHRoKSB7XG4gICAgICAgICAgICAgIGlzTGluZXMgPSB0cnVlO1xuICAgICAgICAgICAgICBoZWlnaHRTdW0gKz0geUFkZGVyO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aWR0aFN1bSA8IHBhcmVudFdpZHRoICYmIGogPT09IDApIHtcbiAgICAgICAgICAgICAgaXNMaW5lcyA9IGZhbHNlO1xuICAgICAgICAgICAgICBoZWlnaHRTdW0gKz0geUFkZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDmjaLooYxcbiAgICAgICAgICAgIGhlaWdodFN1bSArPSB5QWRkZXI7XG4gICAgICAgICAgICBpc0xpbmVzID0gZmFsc2U7XG4gICAgICAgICAgICB3aWR0aFN1bSA9IDA7XG4gICAgICAgICAgICAvLyByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0U3VtLCByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0U3VtLCByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0KTtcbiAgICAgICAgY29uc29sZS5sb2cocmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCk7XG4gICAgICB9IGVsc2UgaWYgKHJldmVyc2VCZnNOb2Rlc1tpXS50eXBlID09PSAnYmxvY2snKSB7XG4gICAgICAgIC8vIOWdl+e6p+WFg+e0oFxuICAgICAgICAvLyDlrr3luqbmi4nmu6HnlLvluIMs6auY5bqm5a6a6auY5oiW6ICF6Ieq6YCC5bqUXG4gICAgICAgIGNvbnN0IHsgd2lkdGg6IHBhcmVudFdpZHRoLCBoZWlnaHQ6IHBhcmVudEhlaWdodCB9ID0gcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uO1xuICAgICAgICAvLyBpZiAoIShwYXJlbnRXaWR0aC5pbmRleE9mKCdweCcpID4gLTEgfHwgcGFyZW50V2lkdGguaW5kZXhPZignJScpID4gLTEpKSB7XG4gICAgICAgIC8vICAgY29uc29sZS5lcnJvcigncGxlYXNlIGluaXQgd2lkdGggZm9yIGJsb2NrIGVsZW1lbnQuJylcbiAgICAgICAgLy8gICByZXR1cm47XG4gICAgICAgIC8vIH1cbiAgICAgICAgY29uc3QgaXNBdXRvSGVpZ2h0ID0gISFwYXJlbnRIZWlnaHQ7XG4gICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgIGlmIChpc0F1dG9IZWlnaHQpIHtcbiAgICAgICAgICAvLyDoh6rpgILlupTpq5jluqZcbiAgICAgICAgICBsZXQgd2lkdGhTdW0gPSAwOyBsZXQgaGVpZ2h0U3VtID0gMDsgbGV0XG4gICAgICAgICAgICBpc0xpbmVzID0gZmFsc2U7XG4gICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSByZXZlcnNlQmZzTm9kZXNbaV0uY2hpbGRyZW4gfHwgW107XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRXaWR0aCA9IGNoaWxkcmVuW2pdLnByb2Nlc3NlZExvY2F0aW9uLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRIZWlnaHQgPSBjaGlsZHJlbltqXS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFBhZGRpbmdMZWZ0ID0gY2hpbGRyZW5bal0uY3NzLnBhZGRpbmdMZWZ0ID8gY2hpbGRyZW5bal0uY3NzLnBhZGRpbmdMZWZ0LnRvUHgoKSA6IDA7XG4gICAgICAgICAgICBjb25zdCBjaGlsZE1hcmdpbkxlZnQgPSBjaGlsZHJlbltqXS5jc3MubWFyZ2luTGVmdCA/IGNoaWxkcmVuW2pdLmNzcy5tYXJnaW5MZWZ0LnRvUHgoKSA6IDA7XG4gICAgICAgICAgICBjb25zdCBjaGlsZE1hcmdpblRvcCA9IGNoaWxkcmVuW2pdLmNzcy5tYXJnaW5Ub3AgPyBjaGlsZHJlbltqXS5jc3MubWFyZ2luVG9wLnRvUHgoKSA6IDA7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFBhZGRpbmdUb3AgPSBjaGlsZHJlbltqXS5jc3MucGFkZGluZ1RvcCA/IGNoaWxkcmVuW2pdLmNzcy5wYWRkaW5nVG9wLnRvUHgoKSA6IDA7XG4gICAgICAgICAgICBjb25zdCB4QWRkZXIgPSBjaGlsZFdpZHRoICsgY2hpbGRQYWRkaW5nTGVmdCArIGNoaWxkTWFyZ2luTGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHlBZGRlciA9IGNoaWxkSGVpZ2h0ICsgY2hpbGRNYXJnaW5Ub3AgKyBjaGlsZFBhZGRpbmdUb3A7XG4gICAgICAgICAgICBpZiAoIWlzTGluZXMpIHtcbiAgICAgICAgICAgICAgLy8g5LiN5o2i6KGMXG4gICAgICAgICAgICAgIHdpZHRoU3VtICs9ICh4QWRkZXIpO1xuICAgICAgICAgICAgICAvLyDmnInlrprlrr3vvIzlj6/og73muqLlh7rvvJvml6Dlrprlrr3vvIzoh6rpgILlupTlrr3luqZcbiAgICAgICAgICAgICAgaWYgKHdpZHRoU3VtID49IHBhcmVudFdpZHRoICYmIGogPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24ud2lkdGggPSB3aWR0aFN1bVxuICAgICAgICAgICAgICAgIGlzTGluZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGhlaWdodFN1bSArPSB5QWRkZXI7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAod2lkdGhTdW0gPiBwYXJlbnRXaWR0aCkge1xuICAgICAgICAgICAgICAgIGlzTGluZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGhlaWdodFN1bSArPSB5QWRkZXI7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAod2lkdGhTdW0gPCBwYXJlbnRXaWR0aCAmJiBqID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5lcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGhlaWdodFN1bSArPSB5QWRkZXI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCA9IE1hdGgubWF4KGhlaWdodFN1bSwgcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyDmjaLooYxcbiAgICAgICAgICAgICAgaGVpZ2h0U3VtICs9IHlBZGRlcjtcbiAgICAgICAgICAgICAgaXNMaW5lcyA9IGZhbHNlO1xuICAgICAgICAgICAgICB3aWR0aFN1bSA9IDA7XG4gICAgICAgICAgICAgIHJldmVyc2VCZnNOb2Rlc1tpXS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQgPSBNYXRoLm1heChoZWlnaHRTdW0sIHJldmVyc2VCZnNOb2Rlc1tpXS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyDlrprpq5hcbiAgICAgICAgICAvLyByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0U3VtLCByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0KVxuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZWJ1Z2dlclxuICAgIGNvbnNvbGUubG9nKCcoKCgoKCggJywgcmV2ZXJzZUJmc05vZGVzKTtcbiAgICByZXR1cm4gcmV2ZXJzZUJmc05vZGVzO1xuICB9XG5cbiAgY2FsY0VsZW1lbnRQb3NpdGlvbihyb290Tm9kZSkge1xuICAgIGNvbnN0IGJmc05vZGVzID0gYnJlYWR0aEZpcnN0U2VhcmNoKHJvb3ROb2RlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJmc05vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwYXJlbnQgPSBiZnNOb2Rlc1tpXS5wYXJlbnQ7XG4gICAgICBjb25zdCB7IHBhZGRpbmdMZWZ0LCBtYXJnaW5MZWZ0LCBwYWRkaW5nVG9wLCBtYXJnaW5Ub3AgfSA9IHsgLi4uZGVmYXVsdFBhZGRpbmdNYXJnaW4sIC4uLmJmc05vZGVzW2ldLmNzcyB9O1xuICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgYmZzTm9kZXNbaV0ucmVuZGVyU3R5bGUgPSB7XG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICB5OiAwLFxuICAgICAgICAgIGNvbnRlbnRYOiBmb3JtYXRUb051bShwYWRkaW5nTGVmdCwgYmZzTm9kZXNbaV0ucGFyZW50LCAnd2lkdGgnKSArIGZvcm1hdFRvTnVtKG1hcmdpbkxlZnQsIGJmc05vZGVzW2ldLnBhcmVudCwgJ3dpZHRoJyksXG4gICAgICAgICAgY29udGVudFk6IGZvcm1hdFRvTnVtKHBhZGRpbmdUb3AsIGJmc05vZGVzW2ldLnBhcmVudCwgJ2hlaWdodCcpICsgZm9ybWF0VG9OdW0obWFyZ2luVG9wLCBiZnNOb2Rlc1tpXS5wYXJlbnQsICdoZWlnaHQnKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBpc0xpbmVzID0gZ2V0SXNDaGFuZ2VMaW5lKGJmc05vZGVzW2ldKTtcbiAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICB0aGlzLmluc2VydFZub2RlKGJmc05vZGVzW2ldLCBpc0xpbmVzKTtcbiAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAvLyBpZiAoaXNMaW5lcykge1xuICAgICAgLy8gICAvLyDmjaLooYzml7YsIHk65Y+g5YqgcHJl5YWE5byf6IqC54K55Z2Q5qCHLCB4OuWPoOWKoOeItuiKgueCueWdkOagh1xuICAgICAgLy8gICBjb25zdCB4ID0gcGFyZW50LnJlbmRlclN0eWxlLmNvbnRlbnRYXG4gICAgICAvLyAgIGNvbnN0IHkgPSB0aGlzLl9nZXRQcmVMYXlvdXQoYmZzTm9kZXNbaV0pLnkgKyB0aGlzLl9nZXRQcmVMYXlvdXQoYmZzTm9kZXNbaV0pLmhlaWdodFxuICAgICAgLy8gICAvLyBkZWJ1Z2dlclxuICAgICAgLy8gICBjb25zdCByZW5kZXJTdHlsZSA9IHtcbiAgICAgIC8vICAgICB4LFxuICAgICAgLy8gICAgIHksXG4gICAgICAvLyAgICAgY29udGVudFg6IHggKyBmb3JtYXRUb1B4KHBhZGRpbmdMZWZ0KSArIGZvcm1hdFRvUHgobWFyZ2luTGVmdCksXG4gICAgICAvLyAgICAgY29udGVudFk6IHkgKyBmb3JtYXRUb1B4KHBhZGRpbmdUb3ApICsgZm9ybWF0VG9QeChtYXJnaW5Ub3ApXG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgLy8gZGVidWdnZXJcbiAgICAgIC8vICAgYmZzTm9kZXNbaV0ucmVuZGVyU3R5bGUgPSByZW5kZXJTdHlsZTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgIC8vIOS4jeaNouihjOaXtiwgeTrlj6DliqDniLboioLngrnlnZDmoIcsIHg65Y+g5YqgcHJl5YWE5byf6IqC5Z2Q5qCHXG4gICAgICAvLyAgIGNvbnN0IHggPSB0aGlzLl9nZXRQcmVMYXlvdXQoYmZzTm9kZXNbaV0pLnggKyB0aGlzLl9nZXRQcmVMYXlvdXQoYmZzTm9kZXNbaV0pLndpZHRoXG4gICAgICAvLyAgIGNvbnN0IHkgPSB0aGlzLl9nZXRQcmVMYXlvdXQoYmZzTm9kZXNbaV0pLnlcbiAgICAgIC8vICAgY29uc3QgcmVuZGVyU3R5bGUgPSB7XG4gICAgICAvLyAgICAgeCxcbiAgICAgIC8vICAgICB5LFxuICAgICAgLy8gICAgIGNvbnRlbnRYOiB4ICsgZm9ybWF0VG9QeChwYWRkaW5nTGVmdCkgKyBmb3JtYXRUb1B4KG1hcmdpbkxlZnQpLFxuICAgICAgLy8gICAgIGNvbnRlbnRZOiB5ICsgZm9ybWF0VG9QeChwYWRkaW5nVG9wKSArIGZvcm1hdFRvUHgobWFyZ2luVG9wKVxuICAgICAgLy8gICB9XG4gICAgICAvLyAgIGJmc05vZGVzW2ldLnJlbmRlclN0eWxlID0gcmVuZGVyU3R5bGU7XG4gICAgICAvLyB9XG4gICAgfVxuICAgIHJldHVybiBiZnNOb2RlcztcbiAgfVxuXG4gIGluc2VydFZub2RlKHZub2RlLCBpc0NoYW5nZUxpbmUpIHtcbiAgICBpZiAoWydibG9jayddLmluY2x1ZGVzKHZub2RlLnR5cGUpKSB7XG4gICAgICAvLyDlnZfnuqflhYPntKBcbiAgICAgIGNvbnN0IHsgcGFkZGluZ0xlZnQsIG1hcmdpbkxlZnQsIHBhZGRpbmdUb3AsIG1hcmdpblRvcCB9ID0geyAuLi5kZWZhdWx0UGFkZGluZ01hcmdpbiwgLi4udm5vZGUuY3NzIH07XG4gICAgICAvLyDmjaLooYzml7YsIHk65Y+g5YqgcHJl5YWE5byf6IqC54K55Z2Q5qCHLCB4OuWPoOWKoOeItuiKgueCueWdkOagh1xuICAgICAgLy8gZGVidWdnZXJcbiAgICAgIGNvbnN0IHggPSB2bm9kZS5wYXJlbnQucmVuZGVyU3R5bGUuY29udGVudFg7XG4gICAgICBjb25zdCB5ID0gZ2V0UHJlTGF5b3V0KHZub2RlKS55ICsgZ2V0UHJlTGF5b3V0KHZub2RlKS5oZWlnaHQ7XG4gICAgICBjb25zdCByZW5kZXJTdHlsZSA9IHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgLy8gY29udGVudFg6IHggKyBmb3JtYXRUb1B4KHBhZGRpbmdMZWZ0KSArIGZvcm1hdFRvUHgobWFyZ2luTGVmdCksXG4gICAgICAgIC8vIGNvbnRlbnRZOiB5ICsgZm9ybWF0VG9QeChwYWRkaW5nVG9wKSArIGZvcm1hdFRvUHgobWFyZ2luVG9wKVxuICAgICAgICBjb250ZW50WDogeCArIGZvcm1hdFRvTnVtKHBhZGRpbmdMZWZ0LCB2bm9kZS5wYXJlbnQsICd3aWR0aCcpICsgZm9ybWF0VG9OdW0obWFyZ2luTGVmdCwgdm5vZGUucGFyZW50LCAnd2lkdGgnKSxcbiAgICAgICAgY29udGVudFk6IHkgKyBmb3JtYXRUb051bShwYWRkaW5nVG9wLCB2bm9kZS5wYXJlbnQsICdoZWlnaHQnKSArIGZvcm1hdFRvTnVtKG1hcmdpblRvcCwgdm5vZGUucGFyZW50LCAnaGVpZ2h0JyksXG4gICAgICB9O1xuICAgICAgdm5vZGUucmVuZGVyU3R5bGUgPSByZW5kZXJTdHlsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6KGM5YaF5YWD57SgXG4gICAgICBpbnNlcnRWbm9kZUludG9MaW5lKHZub2RlLCBpc0NoYW5nZUxpbmUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIOagueaNruS4gOe6p2pzb27mm7TmlrDmr4/kuKroioLngrnnmoTpq5jluqZcbiAgLy8gY2FsY0VhY2hIZWlnaHQodHBsKSB7XG4gIC8vICAgY29uc3QgcGFyZW50SWRzID0gdHBsLm1hcCgoc2IpID0+IHsgcmV0dXJuIHNiLmZfc2lkOyB9KTtcbiAgLy8gICBsZXQgc29ydGVkID0gcGFyZW50SWRzLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGIgLSBhOyB9KTtcbiAgLy8gICBzb3J0ZWQgPSBBcnJheS5mcm9tKG5ldyBTZXQoc29ydGVkKSk7XG4gIC8vICAgc29ydGVkLmZvckVhY2goKGZfc2lkKSA9PiB7XG4gIC8vICAgICAvLyBkZWJ1Z2dlcjtcbiAgLy8gICAgIGlmIChmX3NpZCkge1xuICAvLyAgICAgICAvLyDmnInniLboioLngrlcbiAgLy8gICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IHRwbC5maW5kKChsbCkgPT4geyByZXR1cm4gbGwuc2lkID09PSBmX3NpZDsgfSk7XG4gIC8vICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdHBsLmZpbHRlcigoeCkgPT4geyByZXR1cm4geC5mX3NpZCA9PT0gZl9zaWQ7IH0pO1xuICAvLyAgICAgICAvLyBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0gJywgY2hpbGRyZW4pO1xuICAvLyAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAvLyAgICAgICAgIHBhcmVudE5vZGUucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0ID0gY2hpbGRyZW4ucmVkdWNlKChwcmUsIG5leHQpID0+IHtcbiAgLy8gICAgICAgICAgIHJldHVybiBwcmUgKyBuZXh0LnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodDtcbiAgLy8gICAgICAgICB9LCAwKTtcbiAgLy8gICAgICAgICBjb25zdCBwYWRkaW5nYm90dG9tID0gcGFyZW50Tm9kZS5jc3MucGFkZGluZ2JvdHRvbSA/IHBhcmVudE5vZGUuY3NzLnBhZGRpbmdib3R0b20udG9QeCgpIDogMDtcbiAgLy8gICAgICAgICBwYXJlbnROb2RlLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCArPSBwYWRkaW5nYm90dG9tO1xuICAvLyAgICAgICAgIHBhcmVudE5vZGUuY3NzLmhlaWdodCA9IGAke3BhcmVudE5vZGUucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0fXB4YDtcbiAgLy8gICAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgICAvLyDmoLnoioLngrlcbiAgLy8gICAgICAgICB0aGlzLmRhdGEuaGVpZ2h0ID0gY2hpbGRyZW4ucmVkdWNlKChwcmUsIG5leHQpID0+IHtcbiAgLy8gICAgICAgICAgIHJldHVybiBwcmUgKyBuZXh0LnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodDtcbiAgLy8gICAgICAgICB9LCAwKTtcbiAgLy8gICAgICAgICBjb25zdCBwYWRkaW5nYm90dG9tID0gdGhpcy5kYXRhLnBhZGRpbmdib3R0b20gPyB0aGlzLmRhdGEucGFkZGluZ2JvdHRvbS50b1B4KCkgOiAwO1xuICAvLyAgICAgICAgIHRoaXMuZGF0YS5oZWlnaHQgKz0gcGFkZGluZ2JvdHRvbTtcbiAgLy8gICAgICAgICB0aGlzLmRhdGEuaGVpZ2h0ID0gYCR7dGhpcy5kYXRhLmhlaWdodH1weGA7XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfVxuXG4gIC8vIOa3u+WKoGlkXG4gIHJvdXRlQnlERlMoKSB7XG4gICAgY29uc3QgcGFyZW50Tm9kZSA9IHsgY2hpbGRyZW46IHRoaXMuZGF0YS52aWV3cyB9O1xuXG4gICAgaWYgKCFwYXJlbnROb2RlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbGV0IHNpZCA9IDE7XG4gICAgcGFyZW50Tm9kZS5zaWQgPSBzaWQ7XG4gICAgc2lkKys7XG4gICAgLy8g5rex5bqm5LyY5YWILCDpnZ7pgJLlvZLlrp7njrDvvIwg5L2/55So5qCIXG4gICAgbGV0IHN0YWNrID0gW107XG4gICAgZm9yIChsZXQgaSA9IHBhcmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICBwYXJlbnROb2RlLmNoaWxkcmVuW2kgLSAxXS5zaWQgPSBzaWQ7XG4gICAgICBwYXJlbnROb2RlLmNoaWxkcmVuW2kgLSAxXS5mX3NpZCA9IDE7XG4gICAgICBzaWQrKztcbiAgICAgIHN0YWNrLnB1c2gocGFyZW50Tm9kZS5jaGlsZHJlbltpIC0gMV0pO1xuICAgIH1cbiAgICB3aGlsZSAoc3RhY2subGVuZ3RoKSB7XG4gICAgICBjb25zdCBub2RlID0gc3RhY2sucG9wKCk7XG4gICAgICBpZiAobm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICAgICAgeC5zaWQgPSBzaWQ7XG4gICAgICAgICAgeC5mX3NpZCA9IG5vZGUuc2lkO1xuICAgICAgICAgIHNpZCsrO1xuICAgICAgICB9KTtcbiAgICAgICAgc3RhY2sgPSBBcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4pLmNvbmNhdChzdGFjayk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g5bm/5bqm5LyY5YWI6YGN5Y6G6K6h566X5ZCM57qn5YWE5byfKOWboOS4uuWPr+iDveWHuueOsOebuOWvueWFhOW8n+iKgueCueOAgeeItuiKgueCueWumuS9jeOAgmRmc+aXoOazleiusOW9leWFhOW8n+iKgueCueS/oeaBr++8jGJmc+S4pOiAhemDveWPr+iusOW9lSnoioLngrnnmoTnm7jlr7nkvY3nva5cbiAgcm91dGVCeUJGUygpIHtcbiAgICBjb25zdCBub2RlID0geyBjaGlsZHJlbjogdGhpcy5kYXRhLnZpZXdzIH07XG4gICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICBpZiAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgcXVldWUgPSBbXTtcbiAgICAgIHF1ZXVlLnVuc2hpZnQobm9kZSk7XG4gICAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGxldCBpdGVtID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgLy8g6K6h566XXG4gICAgICAgIGl0ZW0gPSB0aGlzLnByZVByb2Nlc3NPYmooaXRlbSk7XG4gICAgICAgIG5vZGVzLnB1c2goaXRlbSk7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcXVldWUucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJlUHJvY2Vzc09iaih2aWV3KSB7XG4gICAgLy8g6I635Y+W5Y6f5aeLY3Nz5a696auYL+aWh+Wtl+aNouihjOmrmOW6plxuICAgIGxldCBqc29uO1xuICAgIHN3aXRjaCAodmlldy50eXBlKSB7XG4gICAgY2FzZSAnaW1hZ2UnOlxuICAgICAganNvbiA9IHRoaXMuX3ByZVByb2Nlc3Modmlldyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGpzb24gPSB0aGlzLl9wcmVQcm9jZXNzKHZpZXcsIHZpZXcuY3NzLmJhY2tncm91bmQgJiYgdmlldy5jc3MuYm9yZGVyUmFkaXVzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlY3QnOlxuICAgICAganNvbiA9IHRoaXMuX3ByZVByb2Nlc3Modmlldyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdibG9jayc6XG4gICAgICBqc29uID0gdGhpcy5fcHJlUHJvY2Vzcyh2aWV3KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gdmlldy5faWQgPSBpO1xuICAgIHZpZXcucHJvY2Vzc2VkTG9jYXRpb24gPSBqc29uO1xuICAgIHJldHVybiB2aWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIOeUu+iDjOaZr1xuICAgKi9cbiAgX2JhY2tncm91bmQoKSB7XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLnN0eWxlO1xuICAgIC8vIGNvbnN0IGhlaWdodCA9IDc5OFxuICAgIGNvbnN0IGJnID0gdGhpcy5kYXRhLmJhY2tncm91bmQ7XG4gICAgdGhpcy5jdHgudHJhbnNsYXRlKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG5cbiAgICB0aGlzLl9kb0NsaXAodGhpcy5kYXRhLmJvcmRlclJhZGl1cywgd2lkdGgsIGhlaWdodCk7XG4gICAgLy8gZGVidWdnZXI7XG4gICAgaWYgKCFiZykge1xuICAgICAgLy8g5aaC5p6c5pyq6K6+572u6IOM5pmv77yM5YiZ6buY6K6k5L2/55So55m96ImyXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgICB0aGlzLmN0eC5maWxsUmVjdCgtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH0gZWxzZSBpZiAoYmcuc3RhcnRzV2l0aCgnIycpIHx8IGJnLnN0YXJ0c1dpdGgoJ3JnYmEnKSB8fCBiZy50b0xvd2VyQ2FzZSgpID09PSAndHJhbnNwYXJlbnQnKSB7XG4gICAgICAvLyDog4zmma/loavlhYXpopzoibJcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgdGhpcy5jdHguZmlsbFJlY3QoLSh3aWR0aCAvIDIpLCAtKGhlaWdodCAvIDIpLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9IGVsc2UgaWYgKEdELmFwaS5pc0dyYWRpZW50KGJnKSkge1xuICAgICAgR0QuYXBpLmRvR3JhZGllbnQoYmcsIHdpZHRoLCBoZWlnaHQsIHRoaXMuY3R4KTtcbiAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOiDjOaZr+Whq+WFheWbvueJh1xuICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAvLyB0aGlzLmN0eC50cmFuc2xhdGUoMC41LCAwLjUpO1xuICAgICAgdGhpcy5fZHJhd0ltYWdlKGJnLCAtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBhc3luYyBfZHJhd0Fic29sdXRlKHZpZXcpIHtcbiAgICBpZiAoIXZpZXcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gLy8g6K+B5piOIGNzcyDkuLrmlbDnu4TlvaLlvI/vvIzpnIDopoHlkIjlubZcbiAgICAvLyBpZiAodmlldy5jc3MgJiYgdmlldy5jc3MubGVuZ3RoKSB7XG4gICAgLy8gICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgIC8vICAgdmlldy5jc3MgPSBPYmplY3QuYXNzaWduKC4uLnZpZXcuY3NzKTtcbiAgICAvLyB9XG4gICAgc3dpdGNoICh2aWV3LnR5cGUpIHtcbiAgICBjYXNlICdpbWFnZSc6XG4gICAgICBhd2FpdCB0aGlzLl9kcmF3QWJzSW1hZ2Uodmlldyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0ZXh0JzpcbiAgICAgIHRoaXMuX2ZpbGxBYnNUZXh0KHZpZXcpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmVjdCc6XG4gICAgICB0aGlzLl9kcmF3QWJzUmVjdCh2aWV3KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jsb2NrJzpcbiAgICAgIHRoaXMuX2RyYXdBYnNSZWN0KHZpZXcpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDmoLnmja4gYm9yZGVyUmFkaXVzIOi/m+ihjOijgeWHj1xuICAgKi9cbiAgX2RvQ2xpcChib3JkZXJSYWRpdXMsIHdpZHRoLCBoZWlnaHQsIGlzT25seVVwSGFsZiA9IGZhbHNlKSB7XG4gICAgLy8gZGVidWdnZXJcbiAgICBpZiAoYm9yZGVyUmFkaXVzICYmIHdpZHRoICYmIGhlaWdodCkge1xuICAgICAgY29uc3QgciA9IE1hdGgubWluKGJvcmRlclJhZGl1cy50b1B4KCksIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgICAvLyDpmLLmraLlnKjmn5DkupvmnLrlnovkuIrlkajovrnmnInpu5HmoYbnjrDosaHvvIzmraTlpITlpoLmnpznm7TmjqXorr7nva4gZmlsbFN0eWxlIOS4uumAj+aYju+8jOWcqCBBbmRyb2lkIOacuuWei+S4iuS8muWvvOiHtOiiq+ijgeWHj+eahOWbvueJh+S5n+WPmOS4uumAj+aYju+8jCBpT1Mg5ZKMIElERSDkuIrkuI3kvJpcbiAgICAgIC8vIGdsb2JhbEFscGhhIOWcqCAxLjkuOTAg6LW35pSv5oyB77yM5L2O54mI5pys5LiL5peg5pWI77yM5L2G5oqKIGZpbGxTdHlsZSDorr7kuLrkuoYgd2hpdGXvvIznm7jlr7npu5jorqTnmoQgYmxhY2sg6KaB5aW954K5XG4gICAgICB0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IDA7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmN0eC5hcmMoLXdpZHRoIC8gMiArIHIsIC1oZWlnaHQgLyAyICsgciwgciwgMSAqIE1hdGguUEksIDEuNSAqIE1hdGguUEkpO1xuICAgICAgdGhpcy5jdHgubGluZVRvKHdpZHRoIC8gMiAtIHIsIC1oZWlnaHQgLyAyKTtcbiAgICAgIHRoaXMuY3R4LmFyYyh3aWR0aCAvIDIgLSByLCAtaGVpZ2h0IC8gMiArIHIsIHIsIDEuNSAqIE1hdGguUEksIDIgKiBNYXRoLlBJKTtcblxuICAgICAgaWYgKGlzT25seVVwSGFsZikge1xuICAgICAgICB0aGlzLmN0eC5saW5lVG8od2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKC13aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiAtIHIpO1xuICAgICAgICB0aGlzLmN0eC5hcmMod2lkdGggLyAyIC0gciwgaGVpZ2h0IC8gMiAtIHIsIHIsIDAsIDAuNSAqIE1hdGguUEkpO1xuICAgICAgICB0aGlzLmN0eC5saW5lVG8oLXdpZHRoIC8gMiArIHIsIGhlaWdodCAvIDIpO1xuICAgICAgICB0aGlzLmN0eC5hcmMoLXdpZHRoIC8gMiArIHIsIGhlaWdodCAvIDIgLSByLCByLCAwLjUgKiBNYXRoLlBJLCAxICogTWF0aC5QSSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgICAgLy8g5ZyoIGlvcyDnmoQgNi42LjYg54mI5pys5LiKIGNsaXAg5pyJIGJ1Z++8jOemgeaOieatpOexu+Wei+S4iueahCBjbGlw77yM5Lmf5bCx5oSP5ZGz552A77yM5Zyo5q2k54mI5pys5b6u5L+h55qEIGlvcyDorr7lpIfkuIvml6Dms5Xkvb/nlKggYm9yZGVyIOWxnuaAp1xuICAgICAgY29uc3QgeyB2ZXJzaW9uLCBwbGF0Zm9ybSB9ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgIC8vIOWFvOWuueWwj+eoi+W6j+aPkuS7tlxuICAgICAgaWYgKCEodmVyc2lvbiA8PSAnNi42LjYnICYmIHBsYXRmb3JtID09PSAnaW9zJykpIHtcbiAgICAgICAgdGhpcy5jdHguY2xpcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSAxO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDnlLvovrnmoYZcbiAgICovXG4gIF9kb0JvcmRlcih2aWV3LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgaWYgKCF2aWV3LmNzcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICBib3JkZXJSYWRpdXMsXG4gICAgICBib3JkZXJXaWR0aCxcbiAgICAgIGJvcmRlckNvbG9yLFxuICAgIH0gPSB2aWV3LmNzcztcbiAgICBpZiAoIWJvcmRlcldpZHRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAvLyBjb25zdCB7IHgsIHksIGhlaWdodDogcmF3SGVpZ2h0LCB3aWR0aDogcmF3V2lkdGggfSA9IHRoaXMuX3ByZVByb2Nlc3ModmlldywgdHJ1ZSk7XG4gICAgY29uc3QgeyBoZWlnaHQ6IHJhd0hlaWdodCwgd2lkdGg6IHJhd1dpZHRoIH0gPSB2aWV3LnByb2Nlc3NlZExvY2F0aW9uO1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gdmlldy5yZW5kZXJTdHlsZTtcbiAgICB0aGlzLl9wcmVQYWludCh2aWV3LCB0cnVlLCB7IHgsIHksIGhlaWdodDogcmF3SGVpZ2h0LCB3aWR0aDogcmF3V2lkdGggfSk7XG5cbiAgICBsZXQgcjtcbiAgICBpZiAoYm9yZGVyUmFkaXVzKSB7XG4gICAgICByID0gTWF0aC5taW4oYm9yZGVyUmFkaXVzLnRvUHgoKSwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgciA9IDA7XG4gICAgfVxuICAgIGNvbnN0IGxpbmVXaWR0aCA9IGJvcmRlcldpZHRoLnRvUHgoKTtcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAoYm9yZGVyQ29sb3IgfHwgJ2JsYWNrJyk7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKC13aWR0aCAvIDIgKyByLCAtaGVpZ2h0IC8gMiArIHIsIHIgKyBsaW5lV2lkdGggLyAyLCAxICogTWF0aC5QSSwgMS41ICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHgubGluZVRvKHdpZHRoIC8gMiAtIHIsIC1oZWlnaHQgLyAyIC0gbGluZVdpZHRoIC8gMik7XG4gICAgdGhpcy5jdHguYXJjKHdpZHRoIC8gMiAtIHIsIC1oZWlnaHQgLyAyICsgciwgciArIGxpbmVXaWR0aCAvIDIsIDEuNSAqIE1hdGguUEksIDIgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5saW5lVG8od2lkdGggLyAyICsgbGluZVdpZHRoIC8gMiwgaGVpZ2h0IC8gMiAtIHIpO1xuICAgIHRoaXMuY3R4LmFyYyh3aWR0aCAvIDIgLSByLCBoZWlnaHQgLyAyIC0gciwgciArIGxpbmVXaWR0aCAvIDIsIDAsIDAuNSAqIE1hdGguUEkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbygtd2lkdGggLyAyICsgciwgaGVpZ2h0IC8gMiArIGxpbmVXaWR0aCAvIDIpO1xuICAgIHRoaXMuY3R4LmFyYygtd2lkdGggLyAyICsgciwgaGVpZ2h0IC8gMiAtIHIsIHIgKyBsaW5lV2lkdGggLyAyLCAwLjUgKiBNYXRoLlBJLCAxICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOmihOWkhOeQhuiKgueCueWvueixoVxuICAgKiBAcGFyYW0ge29iamVjdH19IHZpZXdcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RDbGlwXG4gICAqIEByZXR1cm5cbiAgICoge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIGV4dHJhLFxuICAgIH07XG4gICAqL1xuICBfcHJlUHJvY2Vzcyh2aWV3LCBub3RDbGlwKSB7XG4gICAgLy8gZGVidWdnZXJcbiAgICBsZXQgd2lkdGggPSAwO1xuICAgIGxldCBoZWlnaHQ7XG4gICAgbGV0IGV4dHJhO1xuICAgIHN3aXRjaCAodmlldy50eXBlKSB7XG4gICAgY2FzZSAndGV4dCc6IHtcbiAgICAgIGNvbnN0IHRleHRBcnJheSA9IHZpZXcudGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICAvLyDlpITnkIblpJrkuKrov57nu63nmoQnXFxuJ1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0QXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHRleHRBcnJheVtpXSA9PT0gJycpIHtcbiAgICAgICAgICB0ZXh0QXJyYXlbaV0gPSAnICc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGZvbnRXZWlnaHQgPSB2aWV3LmNzcy5mb250V2VpZ2h0ID09PSAnYm9sZCcgPyAnYm9sZCcgOiAnbm9ybWFsJztcbiAgICAgIHZpZXcuY3NzLmZvbnRTaXplID0gdmlldy5jc3MuZm9udFNpemUgPyB2aWV3LmNzcy5mb250U2l6ZSA6ICcyMHJweCc7XG4gICAgICAvLyDpnIDopoHorqHnrpfmloflrZflrr3luqbvvIzov5nph4zliJ3lp4vljJbkuI3og73nnIHnlaVcbiAgICAgIHRoaXMuY3R4LmZvbnQgPSBgbm9ybWFsICR7Zm9udFdlaWdodH0gJHt2aWV3LmNzcy5mb250U2l6ZS50b1B4KCl9cHggJHt2aWV3LmNzcy5mb250RmFtaWx5ID8gYFwiJHt2aWV3LmNzcy5mb250RmFtaWx5fVwiYCA6ICdzYW5zLXNlcmlmJ31gO1xuXG4gICAgICAvLyB0aGlzLmN0eC5zZXRGb250U2l6ZSh2aWV3LmNzcy5mb250U2l6ZS50b1B4KCkpO1xuICAgICAgLy8g6K6h566X6KGM5pWwXG4gICAgICBsZXQgbGluZXMgPSAwO1xuICAgICAgY29uc3QgbGluZXNBcnJheSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0QXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgdGV4dExlbmd0aCA9IHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHRBcnJheVtpXSkud2lkdGg7XG4gICAgICAgIGNvbnN0IHBhcnRXaWR0aCA9IHZpZXcuY3NzLndpZHRoID8gZm9ybWF0VG9OdW0odmlldy5jc3Mud2lkdGgsIHZpZXcucGFyZW50LCAnd2lkdGgnKSA6IHRleHRMZW5ndGg7XG4gICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgIGNvbnN0IGNhbExpbmVzID0gTWF0aC5jZWlsKHRleHRMZW5ndGggLyBwYXJ0V2lkdGgpO1xuICAgICAgICB3aWR0aCA9IHBhcnRXaWR0aCA+IHdpZHRoID8gcGFydFdpZHRoIDogd2lkdGg7XG4gICAgICAgIGxpbmVzICs9IGNhbExpbmVzO1xuICAgICAgICBsaW5lc0FycmF5W2ldID0gY2FsTGluZXM7XG4gICAgICB9XG4gICAgICBsaW5lcyA9IHZpZXcuY3NzLm1heExpbmVzIDwgbGluZXMgPyB2aWV3LmNzcy5tYXhMaW5lcyA6IGxpbmVzO1xuICAgICAgY29uc3QgbGluZUhlaWdodCA9IHZpZXcuY3NzLmxpbmVIZWlnaHQgPyB2aWV3LmNzcy5saW5lSGVpZ2h0LnRvUHgoKSA6IHZpZXcuY3NzLmZvbnRTaXplLnRvUHgoKTtcbiAgICAgIGhlaWdodCA9IGxpbmVIZWlnaHQgKiBsaW5lcztcblxuICAgICAgZXh0cmEgPSB7XG4gICAgICAgIGxpbmVzLFxuICAgICAgICBsaW5lSGVpZ2h0LFxuICAgICAgICB0ZXh0QXJyYXksXG4gICAgICAgIGxpbmVzQXJyYXksXG4gICAgICB9O1xuICAgICAgLy8g5paH5a2X5Y+W5a6e6ZmF5a695bqmXG4gICAgICBpZiAodmlldy5pZCkge1xuICAgICAgICBsZXQgdGV4dFdpZHRoID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0QXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICB0ZXh0V2lkdGggPSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0QXJyYXlbaV0pLndpZHRoID4gdGV4dFdpZHRoID8gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dEFycmF5W2ldKS53aWR0aCA6IHRleHRXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICB3aWR0aCA9IHdpZHRoID8gKHRleHRXaWR0aCA8IHdpZHRoID8gdGV4dFdpZHRoIDogd2lkdGgpIDogdGV4dFdpZHRoO1xuICAgICAgICAvLyB0aGlzLmdsb2JhbFdpZHRoW3ZpZXcuaWRdID0gd2lkdGggPyAodGV4dFdpZHRoIDwgd2lkdGggPyB0ZXh0V2lkdGggOiB3aWR0aCkgOiB0ZXh0V2lkdGg7XG4gICAgICB9XG4gICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlICdpbWFnZSc6IHtcbiAgICAgIC8vIGltYWdl55qE6ZW/5a696K6+572u5oiQYXV0b+eahOmAu+i+keWkhOeQhlxuICAgICAgY29uc3QgeyBwaXhlbFJhdGlvIH0gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgY29uc3QgcmF0aW8gPSBwaXhlbFJhdGlvIHx8IDI7XG4gICAgICAvLyBjb25zdCByYXRpbyA9IDJcbiAgICAgIC8vIOaciWNzc+WNtOacquiuvue9rndpZHRo5oiWaGVpZ2h077yM5YiZ6buY6K6k5Li6YXV0b1xuICAgICAgaWYgKHZpZXcuY3NzKSB7XG4gICAgICAgIGlmICghdmlldy5jc3Mud2lkdGgpIHtcbiAgICAgICAgICB2aWV3LmNzcy53aWR0aCA9ICdhdXRvJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZpZXcuY3NzLmhlaWdodCkge1xuICAgICAgICAgIHZpZXcuY3NzLmhlaWdodCA9ICdhdXRvJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXZpZXcuY3NzIHx8ICh2aWV3LmNzcy53aWR0aCA9PT0gJ2F1dG8nICYmIHZpZXcuY3NzLmhlaWdodCA9PT0gJ2F1dG8nKSkge1xuICAgICAgICB3aWR0aCA9IE1hdGgucm91bmQodmlldy5zV2lkdGggLyByYXRpbyk7XG4gICAgICAgIGhlaWdodCA9IE1hdGgucm91bmQodmlldy5zSGVpZ2h0IC8gcmF0aW8pO1xuICAgICAgfSBlbHNlIGlmICh2aWV3LmNzcy53aWR0aCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIGhlaWdodCA9IHZpZXcuY3NzLmhlaWdodC50b1B4KCk7XG4gICAgICAgIHdpZHRoID0gdmlldy5zV2lkdGggLyB2aWV3LnNIZWlnaHQgKiBoZWlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKHZpZXcuY3NzLmhlaWdodCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIHdpZHRoID0gdmlldy5jc3Mud2lkdGgudG9QeCgpO1xuICAgICAgICBoZWlnaHQgPSB2aWV3LnNIZWlnaHQgLyB2aWV3LnNXaWR0aCAqIHdpZHRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2lkdGggPSB2aWV3LmNzcy53aWR0aC50b1B4KCk7XG4gICAgICAgIGhlaWdodCA9IHZpZXcuY3NzLmhlaWdodC50b1B4KCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmICghKHZpZXcuY3NzLndpZHRoICYmIHZpZXcuY3NzLmhlaWdodCkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignWW91IHNob3VsZCBzZXQgd2lkdGggYW5kIGhlaWdodCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHdpZHRoID0gZm9ybWF0VG9OdW0odmlldy5jc3Mud2lkdGgsIHZpZXcucGFyZW50LCAnd2lkdGgnKTtcbiAgICAgIGhlaWdodCA9IGZvcm1hdFRvTnVtKHZpZXcuY3NzLmhlaWdodCwgdmlldy5wYXJlbnQsICdoZWlnaHQnKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIGxldCB4O1xuICAgIC8vIGlmICh2aWV3LmNzcyAmJiB2aWV3LmNzcy5yaWdodCkge1xuICAgIC8vICAgaWYgKHR5cGVvZiB2aWV3LmNzcy5yaWdodCA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyAgICAgeCA9IHRoaXMuc3R5bGUud2lkdGggLSB2aWV3LmNzcy5yaWdodC50b1B4KHRydWUpO1xuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgLy8g5Y+v5Lul55So5pWw57uE5pa55byP77yM5oqK5paH5a2X6ZW/5bqm6K6h566X6L+b5Y67XG4gICAgLy8gICAgIC8vIFtyaWdodCwg5paH5a2XaWQsIOS5mOaVsO+8iOm7mOiupCAx77yJXVxuICAgIC8vICAgICAvLyBbcmlnaHQsIFvmloflrZdpZDEsIOaWh+Wtl2lkMiwg5paH5a2XaWQzXSwg5LmY5pWw77yI6buY6K6kIDHvvIldXG4gICAgLy8gICAgIGNvbnN0IHJpZ2h0cyA9IHZpZXcuY3NzLnJpZ2h0O1xuICAgIC8vICAgICB4ID0gdGhpcy5zdHlsZS53aWR0aCAtIHJpZ2h0c1swXS50b1B4KHRydWUpIC0gdGhpcy5nbG9iYWxXaWR0aFtyaWdodHNbMV1dICogKHJpZ2h0c1syXSB8fCAxKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9IGVsc2UgaWYgKHZpZXcuY3NzICYmIHZpZXcuY3NzLmxlZnQpIHtcbiAgICAvLyAgIC8vIGRlYnVnZ2VyXG4gICAgLy8gICBpZiAodHlwZW9mIHZpZXcuY3NzLmxlZnQgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gICAgIHggPSB2aWV3LmNzcy5sZWZ0LnRvUHgodHJ1ZSk7XG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICBjb25zdCBsZWZ0cyA9IHZpZXcuY3NzLmxlZnQ7XG5cbiAgICAvLyAgICAgaWYgKEFycmF5LmlzQXJyYXkobGVmdHNbMV0pKSB7XG4gICAgLy8gICAgICAgY29uc3QgZHluYW1pY1dpZHRoID0gbGVmdHNbMV0ucmVkdWNlKChwcmUsIG5leHQpID0+IHtcbiAgICAvLyAgICAgICAgIHJldHVybiBwcmUgKyB0aGlzLmdsb2JhbFdpZHRoW25leHRdO1xuICAgIC8vICAgICAgIH0sIDApO1xuICAgIC8vICAgICAgIHggPSBsZWZ0c1swXS50b1B4KHRydWUpICsgZHluYW1pY1dpZHRoICogKGxlZnRzWzJdIHx8IDEpO1xuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgIHggPSBsZWZ0c1swXS50b1B4KHRydWUpICsgdGhpcy5nbG9iYWxXaWR0aFtsZWZ0c1sxXV0gKiAobGVmdHNbMl0gfHwgMSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLy8gZGVidWdnZXJcbiAgICAvLyAgIH1cbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgeCA9IDA7XG4gICAgLy8gfVxuICAgIC8vIC8vIGNvbnN0IHkgPSB2aWV3LmNzcyAmJiB2aWV3LmNzcy5ib3R0b20gPyB0aGlzLnN0eWxlLmhlaWdodCAtIGhlaWdodCAtIHZpZXcuY3NzLmJvdHRvbS50b1B4KHRydWUpIDogKHZpZXcuY3NzICYmIHZpZXcuY3NzLnRvcCA/IHZpZXcuY3NzLnRvcC50b1B4KHRydWUpIDogMCk7XG4gICAgLy8gbGV0IHk7XG4gICAgLy8gaWYgKHZpZXcuY3NzICYmIHZpZXcuY3NzLmJvdHRvbSkge1xuICAgIC8vICAgeSA9IHRoaXMuc3R5bGUuaGVpZ2h0IC0gaGVpZ2h0IC0gdmlldy5jc3MuYm90dG9tLnRvUHgodHJ1ZSk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIGlmICh2aWV3LmNzcyAmJiB2aWV3LmNzcy50b3ApIHtcbiAgICAvLyAgICAgLy8gZGVidWdnZXI7XG4gICAgLy8gICAgIGlmICh0eXBlb2Ygdmlldy5jc3MudG9wID09PSAnc3RyaW5nJykge1xuICAgIC8vICAgICAgIHkgPSB2aWV3LmNzcy50b3AudG9QeCh0cnVlKTtcbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICBjb25zdCB0b3BzID0gdmlldy5jc3MudG9wO1xuICAgIC8vICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRvcHNbMV0pKSB7XG4gICAgLy8gICAgICAgICBjb25zdCBkeW5hbWljSGVpZ2h0ID0gdG9wc1sxXS5yZWR1Y2UoKHByZSwgbmV4dCkgPT4ge1xuICAgIC8vICAgICAgICAgICByZXR1cm4gcHJlICsgdGhpcy5nbG9iYWxIZWlnaHRbbmV4dF07XG4gICAgLy8gICAgICAgICB9LCAwKTtcbiAgICAvLyAgICAgICAgIHkgPSB0b3BzWzBdLnRvUHgodHJ1ZSkgKyBkeW5hbWljSGVpZ2h0ICogKHRvcHNbMl0gfHwgMSk7XG4gICAgLy8gICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgIHkgPSB0b3BzWzBdLnRvUHgodHJ1ZSkgKyB0aGlzLmdsb2JhbEhlaWdodFt0b3BzWzFdXSAqICh0b3BzWzJdIHx8IDEpO1xuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgICAvLyBkZWJ1Z2dlclxuICAgIC8vICAgICB9XG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICB5ID0gMDtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG5cbiAgICBpZiAodmlldy5pZCkge1xuICAgICAgdGhpcy5nbG9iYWxXaWR0aFt2aWV3LmlkXSA9IHdpZHRoO1xuICAgICAgdGhpcy5nbG9iYWxIZWlnaHRbdmlldy5pZF0gPSBoZWlnaHQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIC8vIHg6IDAsXG4gICAgICAvLyB5OiAwLFxuICAgICAgZXh0cmEsXG4gICAgfTtcbiAgfVxuXG4gIF9wcmVQYWludCh2aWV3LCBub3RDbGlwLCB7IHgsIHksIGhlaWdodCwgd2lkdGggfSkge1xuICAgIC8vIOW9k+iuvue9ruS6hiByaWdodCDml7bvvIzpu5jorqQgYWxpZ24g55SoIHJpZ2h077yM5Y+N5LmL55SoIGxlZnRcbiAgICAvLyDlubPnp7vnlLvluINsZWZ0L3RvcFxuICAgIGNvbnN0IGFsaWduID0gdmlldy5jc3MgJiYgdmlldy5jc3MuYWxpZ24gPyB2aWV3LmNzcy5hbGlnbiA6ICh2aWV3LmNzcyAmJiB2aWV3LmNzcy5yaWdodCA/ICdyaWdodCcgOiAnbGVmdCcpO1xuICAgIHN3aXRjaCAoYWxpZ24pIHtcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHgsIHkgKyBoZWlnaHQgLyAyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh4IC0gd2lkdGggLyAyLCB5ICsgaGVpZ2h0IC8gMik7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHggKyB3aWR0aCAvIDIsIHkgKyBoZWlnaHQgLyAyKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBkZWJ1Z2dlcjtcbiAgICAvLyDml4vovazop5LluqZcbiAgICBjb25zdCBhbmdsZSA9IHZpZXcuY3NzICYmIHZpZXcuY3NzLnJvdGF0ZSA/IHRoaXMuX2dldEFuZ2xlKHZpZXcuY3NzLnJvdGF0ZSkgOiAwO1xuICAgIHRoaXMuY3R4LnJvdGF0ZShhbmdsZSk7XG4gICAgLy8g5ZyG6KeS6KOB5YmqXG4gICAgaWYgKCFub3RDbGlwICYmIHZpZXcuY3NzICYmIHZpZXcuY3NzLmJvcmRlclJhZGl1cyAmJiB2aWV3LnR5cGUgIT09ICdyZWN0Jykge1xuICAgICAgdGhpcy5fZG9DbGlwKHZpZXcuY3NzLmJvcmRlclJhZGl1cywgd2lkdGgsIGhlaWdodCwgISF2aWV3LmNzcy5pc09ubHlVcEhhbGYpO1xuICAgIH1cbiAgICAvLyDpmLTlvbFcbiAgICB0aGlzLl9kb1NoYWRvdyh2aWV3KTtcbiAgfVxuXG4gIC8vIOeUu+aWh+Wtl+eahOiDjOaZr+WbvueJh1xuICBfZG9CYWNrZ3JvdW5kKHZpZXcpIHtcbiAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgY29uc3QgeyBoZWlnaHQ6IHJhd0hlaWdodCwgd2lkdGg6IHJhd1dpZHRoIH0gPSB2aWV3LnByb2Nlc3NlZExvY2F0aW9uO1xuICAgIGNvbnN0IHsgY29udGVudFg6IHgsIGNvbnRlbnRZOiB5IH0gPSB2aWV3LnJlbmRlclN0eWxlO1xuXG4gICAgdGhpcy5fcHJlUGFpbnQodmlldywgdHJ1ZSwge1xuICAgICAgeCxcbiAgICAgIHksXG4gICAgICB3aWR0aDogcmF3V2lkdGgsXG4gICAgICBoZWlnaHQ6IHJhd0hlaWdodCxcbiAgICB9KTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGJhY2tncm91bmQsXG4gICAgICBwYWRkaW5nLFxuICAgIH0gPSB2aWV3LmNzcztcbiAgICBsZXQgcGQgPSBbMCwgMCwgMCwgMF07XG4gICAgaWYgKHBhZGRpbmcpIHtcbiAgICAgIGNvbnN0IHBkZyA9IHBhZGRpbmcuc3BsaXQoL1xccysvKTtcbiAgICAgIGlmIChwZGcubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNvbnN0IHggPSBwZGdbMF0udG9QeCgpO1xuICAgICAgICBwZCA9IFt4LCB4LCB4LCB4XTtcbiAgICAgIH1cbiAgICAgIGlmIChwZGcubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGNvbnN0IHggPSBwZGdbMF0udG9QeCgpO1xuICAgICAgICBjb25zdCB5ID0gcGRnWzFdLnRvUHgoKTtcbiAgICAgICAgcGQgPSBbeCwgeSwgeCwgeV07XG4gICAgICB9XG4gICAgICBpZiAocGRnLmxlbmd0aCA9PT0gMykge1xuICAgICAgICBjb25zdCB4ID0gcGRnWzBdLnRvUHgoKTtcbiAgICAgICAgY29uc3QgeSA9IHBkZ1sxXS50b1B4KCk7XG4gICAgICAgIGNvbnN0IHogPSBwZGdbMl0udG9QeCgpO1xuICAgICAgICBwZCA9IFt4LCB5LCB6LCB5XTtcbiAgICAgIH1cbiAgICAgIGlmIChwZGcubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIGNvbnN0IHggPSBwZGdbMF0udG9QeCgpO1xuICAgICAgICBjb25zdCB5ID0gcGRnWzFdLnRvUHgoKTtcbiAgICAgICAgY29uc3QgeiA9IHBkZ1syXS50b1B4KCk7XG4gICAgICAgIGNvbnN0IGEgPSBwZGdbM10udG9QeCgpO1xuICAgICAgICBwZCA9IFt4LCB5LCB6LCBhXTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgd2lkdGggPSByYXdXaWR0aCArIHBkWzFdICsgcGRbM107XG4gICAgY29uc3QgaGVpZ2h0ID0gcmF3SGVpZ2h0ICsgcGRbMF0gKyBwZFsyXTtcblxuICAgIHRoaXMuX2RvQ2xpcCh2aWV3LmNzcy5ib3JkZXJSYWRpdXMsIHdpZHRoLCBoZWlnaHQpO1xuICAgIC8vIGRlYnVnZ2VyO1xuICAgIGlmIChHRC5hcGkuaXNHcmFkaWVudChiYWNrZ3JvdW5kKSkge1xuICAgICAgR0QuYXBpLmRvR3JhZGllbnQoYmFja2dyb3VuZCwgd2lkdGgsIGhlaWdodCwgdGhpcy5jdHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGNjE0Nic7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBiYWNrZ3JvdW5kO1xuICAgIH1cbiAgICB0aGlzLmN0eC5maWxsUmVjdCgtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIF9kcmF3SW1hZ2UodXJsLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgaW1nID0gdGhpcy5kYXRhLl9jYW52YXMuY3JlYXRlSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gdXJsO1xuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UuYXBwbHkobnVsbCwgW2ltZywgLi4uYXJnc10pO1xuICAgIH07XG4gIH1cblxuICBfZHJhd0Fic0ltYWdlKHZpZXcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF2aWV3LnVybCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCB9ID0gdmlldy5wcm9jZXNzZWRMb2NhdGlvbjtcbiAgICAgICAgLy8gY29uc3QgeyB4LCB5IH0gPSB2aWV3LnJlbmRlclN0eWxlXG4gICAgICAgIGNvbnN0IHsgY29udGVudFg6IHgsIGNvbnRlbnRZOiB5IH0gPSB2aWV3LnJlbmRlclN0eWxlO1xuXG4gICAgICAgIHRoaXMuX3ByZVBhaW50KHZpZXcsIGZhbHNlLCB7IHgsIHksIGhlaWdodCwgd2lkdGggfSk7XG5cbiAgICAgICAgLy8g6I635b6X57yp5pS+5Yiw5Zu+54mH5aSn5bCP57qn5Yir55qE6KOB5YeP5qGGXG4gICAgICAgIGxldCByV2lkdGggPSB2aWV3LnNXaWR0aDtcbiAgICAgICAgbGV0IHJIZWlnaHQgPSB2aWV3LnNIZWlnaHQ7XG4gICAgICAgIGxldCBzdGFydFggPSAwO1xuICAgICAgICBsZXQgc3RhcnRZID0gMDtcbiAgICAgICAgLy8gbGV0IGRTdGFydFggPSAwXG4gICAgICAgIC8vIGxldCBkU3RhcnRZID0gMFxuICAgICAgICAvLyDnu5jnlLvljLrln5/mr5TkvotcbiAgICAgICAgY29uc3QgY3AgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgLy8g5Y6f5Zu+5q+U5L6LXG4gICAgICAgIGNvbnN0IG9wID0gdmlldy5zV2lkdGggLyB2aWV3LnNIZWlnaHQ7XG4gICAgICAgIGlmIChjcCA+PSBvcCkge1xuICAgICAgICAgIHJIZWlnaHQgPSByV2lkdGggLyBjcDtcbiAgICAgICAgICBzdGFydFkgPSBNYXRoLnJvdW5kKCh2aWV3LnNIZWlnaHQgLSBySGVpZ2h0KSAvIDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJXaWR0aCA9IHJIZWlnaHQgKiBjcDtcbiAgICAgICAgICBzdGFydFggPSBNYXRoLnJvdW5kKCh2aWV3LnNXaWR0aCAtIHJXaWR0aCkgLyAyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlldy5jc3MgJiYgdmlldy5jc3MuYWxwaGEpIHtcbiAgICAgICAgICB0aGlzLmN0eC5zZXRHbG9iYWxBbHBoYSh2aWV3LmNzcy5hbHBoYSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmlldy5jc3MgJiYgdmlldy5jc3MubW9kZSA9PT0gJ3NjYWxlVG9GaWxsJykge1xuICAgICAgICAgIGlmICh0aGlzLmRhdGEuY2FuaXVzZSkge1xuICAgICAgICAgICAgY29uc3QgaW1nID0gdGhpcy5kYXRhLl9jYW52YXMuY3JlYXRlSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSB2aWV3LnVybDtcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWcsIHN0YXJ0WCwgc3RhcnRZLCByV2lkdGgsIHJIZWlnaHQsIC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgdGhpcy5fZG9Cb3JkZXIodmlldywgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kcmF3SW1hZ2Uodmlldy51cmwsIC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB0aGlzLl9kb0JvcmRlcih2aWV3LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmRhdGEuY2FuaXVzZSkge1xuICAgICAgICAgICAgY29uc3QgaW1nID0gdGhpcy5kYXRhLl9jYW52YXMuY3JlYXRlSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSB2aWV3LnVybDtcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWcsIHN0YXJ0WCwgc3RhcnRZLCByV2lkdGgsIHJIZWlnaHQsIC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgdGhpcy5fZG9Cb3JkZXIodmlldywgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2Uodmlldy51cmwsIHN0YXJ0WCwgc3RhcnRZLCByV2lkdGgsIHJIZWlnaHQsIC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB0aGlzLl9kb0JvcmRlcih2aWV3LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBfZmlsbEFic1RleHQodmlldykge1xuICAgIGlmICghdmlldy50ZXh0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh2aWV3LmNzcy5iYWNrZ3JvdW5kKSB7XG4gICAgICAvLyDnlJ/miJDog4zmma9cbiAgICAgIHRoaXMuX2RvQmFja2dyb3VuZCh2aWV3KTtcbiAgICB9XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIGNvbnN0IGZvbnRXZWlnaHQgPSB2aWV3LmNzcy5mb250V2VpZ2h0ID09PSAnYm9sZCcgPyAnYm9sZCcgOiAnbm9ybWFsJztcbiAgICB2aWV3LmNzcy5mb250U2l6ZSA9IHZpZXcuY3NzLmZvbnRTaXplID8gdmlldy5jc3MuZm9udFNpemUgOiAnMjBycHgnO1xuICAgIHRoaXMuY3R4LmZvbnQgPSBgbm9ybWFsICR7Zm9udFdlaWdodH0gJHt2aWV3LmNzcy5mb250U2l6ZS50b1B4KCl9cHggJHt2aWV3LmNzcy5mb250RmFtaWx5ID8gYFwiJHt2aWV3LmNzcy5mb250RmFtaWx5fVwiYCA6ICdzYW5zLXNlcmlmJ31gO1xuICAgIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCwgZXh0cmEgfSA9IHZpZXcucHJvY2Vzc2VkTG9jYXRpb247XG4gICAgLy8gY29uc3QgeyB4LCB5IH0gPSB2aWV3LnJlbmRlclN0eWxlXG4gICAgY29uc3QgeyBjb250ZW50WDogeCwgY29udGVudFk6IHkgfSA9IHZpZXcucmVuZGVyU3R5bGU7XG5cbiAgICB0aGlzLl9wcmVQYWludCh2aWV3LCB2aWV3LmNzcy5iYWNrZ3JvdW5kICYmIHZpZXcuY3NzLmJvcmRlclJhZGl1cywgeyB4LCB5LCBoZWlnaHQsIHdpZHRoIH0pO1xuXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gKHZpZXcuY3NzLmNvbG9yIHx8ICdibGFjaycpO1xuICAgIGNvbnN0IHtcbiAgICAgIGxpbmVzLFxuICAgICAgbGluZUhlaWdodCxcbiAgICAgIHRleHRBcnJheSxcbiAgICAgIGxpbmVzQXJyYXksXG4gICAgfSA9IGV4dHJhO1xuICAgIC8vIGRlYnVnZ2VyXG5cbiAgICBsZXQgbGluZUluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRleHRBcnJheS5sZW5ndGg7ICsraikge1xuICAgICAgY29uc3QgcHJlTGluZUxlbmd0aCA9IE1hdGgucm91bmQodGV4dEFycmF5W2pdLmxlbmd0aCAvIGxpbmVzQXJyYXlbal0pO1xuICAgICAgbGV0IHN0YXJ0ID0gMDtcbiAgICAgIGxldCBhbHJlYWR5Q291bnQgPSAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lc0FycmF5W2pdOyArK2kpIHtcbiAgICAgICAgLy8g57uY5Yi26KGM5pWw5aSn5LqO5pyA5aSn6KGM5pWw77yM5YiZ55u05o6l6Lez5Ye65b6q546vXG4gICAgICAgIGlmIChsaW5lSW5kZXggPj0gbGluZXMpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBhbHJlYWR5Q291bnQgPSBwcmVMaW5lTGVuZ3RoO1xuICAgICAgICBsZXQgdGV4dCA9IHRleHRBcnJheVtqXS5zdWJzdHIoc3RhcnQsIGFscmVhZHlDb3VudCk7XG4gICAgICAgIGxldCBtZWFzdXJlZFdpdGggPSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aDtcbiAgICAgICAgLy8g5aaC5p6c5rWL6YeP5aSn5bCP5bCP5LqOd2lkdGjkuIDkuKrlrZfnrKbnmoTlpKflsI/vvIzliJnov5vooYzooaXpvZDvvIzlpoLmnpzmtYvph4/lpKflsI/otoXlh7ogd2lkdGjvvIzliJnov5vooYzlh4/pmaRcbiAgICAgICAgLy8g5aaC5p6c5bey57uP5Yiw5paH5pys5pyr5bC+77yM5Lmf5LiN6KaB6L+b6KGM6K+l5b6q546vXG4gICAgICAgIHdoaWxlICgoc3RhcnQgKyBhbHJlYWR5Q291bnQgPD0gdGV4dEFycmF5W2pdLmxlbmd0aCkgJiYgKHdpZHRoIC0gbWVhc3VyZWRXaXRoID4gdmlldy5jc3MuZm9udFNpemUudG9QeCgpIHx8IG1lYXN1cmVkV2l0aCA+IHdpZHRoKSkge1xuICAgICAgICAgIGlmIChtZWFzdXJlZFdpdGggPCB3aWR0aCkge1xuICAgICAgICAgICAgdGV4dCA9IHRleHRBcnJheVtqXS5zdWJzdHIoc3RhcnQsICsrYWxyZWFkeUNvdW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgICAgLy8g5aaC5p6c5Y+q5pyJ5LiA5Liq5a2X56ym5pe277yM55u05o6l6Lez5Ye65b6q546vXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGV4dCA9IHRleHRBcnJheVtqXS5zdWJzdHIoc3RhcnQsIC0tYWxyZWFkeUNvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVhc3VyZWRXaXRoID0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnQgKz0gdGV4dC5sZW5ndGg7XG4gICAgICAgIC8vIOWmguaenOaYr+acgOWQjuS4gOihjOS6hu+8jOWPkeeOsOi/mOacieacque7mOWItuWujOeahOWGheWuue+8jOWImeWKoC4uLlxuICAgICAgICBpZiAobGluZUluZGV4ID09PSBsaW5lcyAtIDEgJiYgKGogPCB0ZXh0QXJyYXkubGVuZ3RoIC0gMSB8fCBzdGFydCA8IHRleHRBcnJheVtqXS5sZW5ndGgpKSB7XG4gICAgICAgICAgd2hpbGUgKHRoaXMuY3R4Lm1lYXN1cmVUZXh0KGAke3RleHR9Li4uYCkud2lkdGggPiB3aWR0aCkge1xuICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgICAgLy8g5aaC5p6c5Y+q5pyJ5LiA5Liq5a2X56ym5pe277yM55u05o6l6Lez5Ye65b6q546vXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIHRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRleHQgKz0gJy4uLic7XG4gICAgICAgICAgbWVhc3VyZWRXaXRoID0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRhLmNhbml1c2UpIHtcbiAgICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSB2aWV3LmNzcy50ZXh0QWxpZ24gPyB2aWV3LmNzcy50ZXh0QWxpZ24gOiAnbGVmdCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdHguc2V0VGV4dEFsaWduKHZpZXcuY3NzLnRleHRBbGlnbiA/IHZpZXcuY3NzLnRleHRBbGlnbiA6ICdsZWZ0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHg7XG4gICAgICAgIHN3aXRjaCAodmlldy5jc3MudGV4dEFsaWduKSB7XG4gICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgeCA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICB4ID0gKHdpZHRoIC8gMik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgeCA9IC0od2lkdGggLyAyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB5ID0gLShoZWlnaHQgLyAyKSArIChsaW5lSW5kZXggPT09IDAgPyB2aWV3LmNzcy5mb250U2l6ZS50b1B4KCkgOiAodmlldy5jc3MuZm9udFNpemUudG9QeCgpICsgbGluZUluZGV4ICogbGluZUhlaWdodCkpO1xuICAgICAgICBsaW5lSW5kZXgrKztcbiAgICAgICAgaWYgKHZpZXcuY3NzLnRleHRTdHlsZSA9PT0gJ3N0cm9rZScpIHtcbiAgICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRleHQsIHgsIHksIG1lYXN1cmVkV2l0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGV4dCwgeCwgeSwgbWVhc3VyZWRXaXRoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb250U2l6ZSA9IHZpZXcuY3NzLmZvbnRTaXplLnRvUHgoKTtcbiAgICAgICAgaWYgKHZpZXcuY3NzLnRleHREZWNvcmF0aW9uKSB7XG4gICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgaWYgKC9cXGJ1bmRlcmxpbmVcXGIvLnRlc3Qodmlldy5jc3MudGV4dERlY29yYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCArIG1lYXN1cmVkV2l0aCwgeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgvXFxib3ZlcmxpbmVcXGIvLnRlc3Qodmlldy5jc3MudGV4dERlY29yYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSAtIGZvbnRTaXplKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4ICsgbWVhc3VyZWRXaXRoLCB5IC0gZm9udFNpemUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoL1xcYmxpbmUtdGhyb3VnaFxcYi8udGVzdCh2aWV3LmNzcy50ZXh0RGVjb3JhdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5IC0gZm9udFNpemUgLyAzKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4ICsgbWVhc3VyZWRXaXRoLCB5IC0gZm9udFNpemUgLyAzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB2aWV3LmNzcy5jb2xvcjtcbiAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgdGhpcy5fZG9Cb3JkZXIodmlldywgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBfZHJhd0Fic1JlY3Qodmlldykge1xuICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICBjb25zdCB7IGhlaWdodCwgd2lkdGggfSA9IHZpZXcucHJvY2Vzc2VkTG9jYXRpb247XG4gICAgLy8gY29uc3QgeyB4LCB5IH0gPSB2aWV3LnJlbmRlclN0eWxlXG4gICAgY29uc3QgeyBjb250ZW50WDogeCwgY29udGVudFk6IHkgfSA9IHZpZXcucmVuZGVyU3R5bGU7XG5cbiAgICB0aGlzLl9wcmVQYWludCh2aWV3LCBmYWxzZSwgeyB4LCB5LCBoZWlnaHQsIHdpZHRoIH0pO1xuXG4gICAgaWYgKEdELmFwaS5pc0dyYWRpZW50KHZpZXcuY3NzLmNvbG9yKSkge1xuICAgICAgR0QuYXBpLmRvR3JhZGllbnQodmlldy5jc3MuY29sb3IsIHdpZHRoLCBoZWlnaHQsIHRoaXMuY3R4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdmlldy5jc3MuY29sb3I7XG4gICAgfVxuICAgIGNvbnN0IGJvcmRlclJhZGl1cyA9IHZpZXcuY3NzLmJvcmRlclJhZGl1cztcbiAgICBjb25zdCByID0gYm9yZGVyUmFkaXVzID8gTWF0aC5taW4oYm9yZGVyUmFkaXVzLnRvUHgoKSwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKSA6IDA7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKC13aWR0aCAvIDIgKyByLCAtaGVpZ2h0IC8gMiArIHIsIHIsIDEgKiBNYXRoLlBJLCAxLjUgKiBNYXRoLlBJKTsgLy8g5bem5LiK6KeS5ZyG5bynXG4gICAgdGhpcy5jdHgubGluZVRvKHdpZHRoIC8gMiAtIHIsIC1oZWlnaHQgLyAyKTtcbiAgICB0aGlzLmN0eC5hcmMod2lkdGggLyAyIC0gciwgLWhlaWdodCAvIDIgKyByLCByLCAxLjUgKiBNYXRoLlBJLCAyICogTWF0aC5QSSk7IC8vIOWPs+S4iuinkuWchuW8p1xuICAgIHRoaXMuY3R4LmxpbmVUbyh3aWR0aCAvIDIsIGhlaWdodCAvIDIgLSByKTtcbiAgICB0aGlzLmN0eC5hcmMod2lkdGggLyAyIC0gciwgaGVpZ2h0IC8gMiAtIHIsIHIsIDAsIDAuNSAqIE1hdGguUEkpOyAvLyDlj7PkuIvop5LlnIblvKdcbiAgICB0aGlzLmN0eC5saW5lVG8oLXdpZHRoIC8gMiArIHIsIGhlaWdodCAvIDIpO1xuICAgIHRoaXMuY3R4LmFyYygtd2lkdGggLyAyICsgciwgaGVpZ2h0IC8gMiAtIHIsIHIsIDAuNSAqIE1hdGguUEksIDEgKiBNYXRoLlBJKTsgLy8g5bem5LiL6KeS5ZyG5bynXG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB0aGlzLl9kb0JvcmRlcih2aWV3LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIC8vIHNoYWRvdyDmlK/mjIEgKHgsIHksIGJsdXIsIGNvbG9yKSwg5LiN5pSv5oyBIHNwcmVhZFxuICAvLyBzaGFkb3c6MHB4IDBweCAxMHB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgX2RvU2hhZG93KHZpZXcpIHtcbiAgICBpZiAoIXZpZXcuY3NzIHx8ICF2aWV3LmNzcy5zaGFkb3cpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYm94ID0gdmlldy5jc3Muc2hhZG93LnJlcGxhY2UoLyxcXHMrL2csICcsJykuc3BsaXQoJyAnKTtcbiAgICBpZiAoYm94Lmxlbmd0aCA+IDQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3NoYWRvdyBkb25cXCd0IHNwcmVhZCBvcHRpb24nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdHguc2hhZG93T2Zmc2V0WCA9IHBhcnNlSW50KGJveFswXSwgMTApO1xuICAgIHRoaXMuY3R4LnNoYWRvd09mZnNldFkgPSBwYXJzZUludChib3hbMV0sIDEwKTtcbiAgICB0aGlzLmN0eC5zaGFkb3dCbHVyID0gcGFyc2VJbnQoYm94WzJdLCAxMCk7XG4gICAgdGhpcy5jdHguc2hhZG93Q29sb3IgPSBib3hbM107XG4gIH1cblxuICBfZ2V0QW5nbGUoYW5nbGUpIHtcbiAgICByZXR1cm4gTnVtYmVyKGFuZ2xlKSAqIE1hdGguUEkgLyAxODA7XG4gIH1cbn1cbiJdfQ==