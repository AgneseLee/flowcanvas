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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3h4cGFpbnQvbGliL3Blbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLCtCQUFrRjtBQUdsRixpQ0FBb0Q7QUFDcEQsK0JBQTZDO0FBQzdDLG1DQUF5RDtBQUN6RCwrQkFBcUM7QUFDckMsaUNBQXlDO0FBRXpDLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNwQyxJQUFNLG9CQUFvQixHQUFHO0lBQzNCLFVBQVUsRUFBRSxDQUFDO0lBQ2IsYUFBYSxFQUFFLENBQUM7SUFDaEIsV0FBVyxFQUFFLENBQUM7SUFDZCxZQUFZLEVBQUUsQ0FBQztJQUNmLFVBQVUsRUFBRSxDQUFDO0lBQ2IsV0FBVyxFQUFFLENBQUM7SUFDZCxTQUFTLEVBQUUsQ0FBQztJQUNaLFlBQVksRUFBRSxDQUFDO0NBQ2hCLENBQUM7QUFFRjtJQUNFLGlCQUFZLEdBQUcsRUFBRSxJQUFJO1FBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFFekIsQ0FBQztJQUVLLDZCQUFXLEdBQWpCOzs7OzRCQUVFLFdBQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFBOzt3QkFBMUIsU0FBMEIsQ0FBQzt3QkFJM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QyxXQUFPLElBQUksQ0FBQyxJQUFJLEVBQUM7Ozs7S0FDbEI7SUFFSyx1QkFBSyxHQUFYLFVBQVksUUFBUTs7Ozs7O3dCQUNsQixJQUFJLENBQUMs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QUFBLEtBQVcsSUFBSSxDQUFDLFdBQVcsRUFBekIsQ0FBQyxPQUFBLEVBQUUsQ0FBQyxPQUFxQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsR0FBQSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFekUsSUFBSSxDQUFDLENBQUM7UUFDTixJQUFJLFlBQVksRUFBRTtZQUNoQixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7YUFBTTtZQUNMLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDUDtRQUNELElBQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVB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QUUsQ0FBQyxDQUFDO1FBRXJELElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1RDthQUFNO1lBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDckM7UUFDRCxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztRQUMzQyxJQUFNLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFJRCwyQkFBUyxHQUFULFVBQVUsSUFBSTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBQ0QsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0QsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDN0MsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCwyQkFBUyxHQUFULFVBQVUsS0FBSztRQUNiLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBQ3ZDLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQTkrQkQsSUE4K0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbi8vIGltcG9ydCBEb3dubG9hZGVyIGZyb20gJy4vZG93bmxvYWRlcic7XG4vLyBpbXBvcnQgVHJlZU5vZGUgZnJvbSAnLi90cmVlTm9kZSdcbmltcG9ydCB7IGJyZWFkdGhGaXJzdFNlYXJjaFJpZ2h0LCBicmVhZHRoRmlyc3RTZWFyY2gsIGZvcm1hdFRvTnVtIH0gZnJvbSAnLi91dGlsJztcbi8vIGNvbnN0IE1vZGlmaWVyID0gcmVxdWlyZSgnLi9tb2RpZmllcicpLmRlZmF1bHQ7XG4vLyBjb25zdCBkb3dubG9hZGVyID0gbmV3IERvd25sb2FkZXIoKTtcbmltcG9ydCB7IGluaXRWbm9kZVRyZWUsIHhtbFRvVm5vZGUgfSBmcm9tICcuL3Zub2RlJztcbmltcG9ydCB7IGluc2VydFZub2RlSW50b0xpbmUgfSBmcm9tICcuL2xpbmUnO1xuaW1wb3J0IHsgZ2V0SXNDaGFuZ2VMaW5lLCBnZXRQcmVMYXlvdXQgfSBmcm9tICcuL2xheW91dCc7XG5pbXBvcnQgeyB3eG1sLCBzdHlsZSB9IGZyb20gJy4vaHRtbCc7XG5pbXBvcnQgeyBkb3dubG9hZEltYWdlcyB9IGZyb20gJy4vaW1hZ2UnO1xuLy8gaW1wb3J0IElWbm9kZSBmcm9tICcuLi8uLi8uLi90eXBpbmdzL3Zub2RlJ1xuY29uc3QgR0QgPSByZXF1aXJlKCcuL2dyYWRpZW50LmpzJyk7XG5jb25zdCBkZWZhdWx0UGFkZGluZ01hcmdpbiA9IHtcbiAgcGFkZGluZ1RvcDogMCxcbiAgcGFkZGluZ0JvdHRvbTogMCxcbiAgcGFkZGluZ0xlZnQ6IDAsXG4gIHBhZGRpbmdSaWdodDogMCxcbiAgbWFyZ2luTGVmdDogMCxcbiAgbWFyZ2luUmlnaHQ6IDAsXG4gIG1hcmdpblRvcDogMCxcbiAgbWFyZ2luQm90dG9tOiAwLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFpbnRlciB7XG4gIGNvbnN0cnVjdG9yKGN0eCwgZGF0YSkge1xuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5nbG9iYWxXaWR0aCA9IHt9O1xuICAgIHRoaXMuZ2xvYmFsSGVpZ2h0ID0ge307XG4gICAgLy8gdGhpcy5fcHJlUHJvY2Vzc2VkID0ge307IC8vIOmihOWkhOeQhuiuoeeul+WHuueahOavj+S4quWFg+e0oOeahOS9jee9rlxuICB9XG5cbiAgYXN5bmMgYmVmb3JlUGFpbnQoKSB7XG4gICAgLy8g5LuObue6p+i9rOaNouaIkOS4gOe6p2pzb27mqKHmnb9cbiAgICBhd2FpdCB0aGlzLnRyYW5zZm9ybU5UbzEoKTtcblxuICAgIC8vIOW8gOWni+e7p+aJv2Nzc1xuXG4gICAgY29uc29sZS5sb2coJ2VlZWVlZWVlZWUgJywgdGhpcy5kYXRhKTtcbiAgICByZXR1cm4gdGhpcy5kYXRhO1xuICB9XG5cbiAgYXN5bmMgcGFpbnQoY2FsbGJhY2spIHtcbiAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgd2lkdGg6IHRoaXMuZGF0YS5jaGlsZHJlblswXS5jc3Mud2lkdGgudG9QeCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLmRhdGEuY2hpbGRyZW5bMF0uY3NzLmhlaWdodC50b1B4KCksXG4gICAgfTtcblxuICAgIC8vIHRoaXMuX2JhY2tncm91bmQoKTtcbiAgICAvLyDlvIDlp4vnlLtcbiAgICBmb3IgKGNvbnN0IHZpZXcgb2YgdGhpcy5kYXRhLnZpZXdzKSB7XG4gICAgICBhd2FpdCB0aGlzLl9kcmF3QWJzb2x1dGUodmlldyk7XG4gICAgICAvLyBkZWJ1Z2dlcjtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YS5jYW5pdXNlKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN0eC5kcmF3KGZhbHNlLCAoKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyB0cmFuc2Zvcm1OVG8xKCkge1xuICAgIC8vIHRoaXMuZGF0YVxuICAgIC8vIGRlYnVnZ2VyXG4gICAgLy8gaW5pdFZub2RlVHJlZSh0aGlzLmRhdGEpXG4gICAgY29uc3QgcnIgPSB4bWxUb1Zub2RlKHd4bWwsIHN0eWxlKTtcbiAgICBjb25zb2xlLmxvZygnKiogJywgcnIpO1xuICAgIHRoaXMuZGF0YS5jaGlsZHJlblswXSA9IHJyO1xuICAgIGNvbnN0IHRwbFRvMSA9IHRoaXMuZGF0YTtcbiAgICAvLyBkZWJ1Z2dlclxuICAgIGNvbnNvbGUubG9nKCctLS0gJywgdHBsVG8xKTtcblxuICAgIC8vIOS4i+i9veaJgOacieeUqOWIsOeahOWbvueJh1xuICAgIGF3YWl0IGRvd25sb2FkSW1hZ2VzKHRwbFRvMSk7XG5cbiAgICAvLyDorqHnrpfmr4/kuKroioLngrnnmoTlrr3pq5hcbiAgICB0aGlzLmNhbGNFbGVtZW50V2lkdGhIZWlnaHQodHBsVG8xLmNoaWxkcmVuWzBdKTtcblxuICAgIC8vIOiuoeeul+avj+S4quiKgueCueS9jee9rlxuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5jYWxjRWxlbWVudFBvc2l0aW9uKHRwbFRvMS5jaGlsZHJlblswXSk7XG4gICAgdGhpcy5kYXRhLnZpZXdzID0gbm9kZXM7XG4gIH1cblxuICBjYWxjRWxlbWVudFdpZHRoSGVpZ2h0KHJvb3ROb2RlKSB7XG4gICAgY29uc3QgcmV2ZXJzZUJmc05vZGVzID0gYnJlYWR0aEZpcnN0U2VhcmNoUmlnaHQocm9vdE5vZGUpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXZlcnNlQmZzTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIGxldCB3aWR0aFN1bSA9IDAsIGhlaWdodFN1bSA9IDAsIGlzTGluZXMgPSBmYWxzZVxuICAgICAgdGhpcy5wcmVQcm9jZXNzT2JqKHJldmVyc2VCZnNOb2Rlc1tpXSk7XG4gICAgICAvLyBpbmxpbmUtYmxvY2vlrr3pq5jpnaDlrZDoioLngrnmkpHlpKdcbiAgICAgIGlmIChbJ3ZpZXcnLCAncmVjdCddLmluY2x1ZGVzKHJldmVyc2VCZnNOb2Rlc1tpXS50eXBlKSkge1xuICAgICAgICBjb25zdCB7IHdpZHRoOiBwYXJlbnRXaWR0aCwgaGVpZ2h0OiBwYXJlbnRIZWlnaHQgfSA9IHJldmVyc2VCZnNOb2Rlc1tpXS5wcm9jZXNzZWRMb2NhdGlvbjtcbiAgICAgICAgbGV0IHdpZHRoU3VtID0gMDsgbGV0IGhlaWdodFN1bSA9IDA7IGxldFxuICAgICAgICAgIGlzTGluZXMgPSBmYWxzZTtcbiAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSByZXZlcnNlQmZzTm9kZXNbaV0uY2hpbGRyZW4gfHwgW107XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBjb25zdCBjaGlsZFdpZHRoID0gY2hpbGRyZW5bal0ucHJvY2Vzc2VkTG9jYXRpb24ud2lkdGg7XG4gICAgICAgICAgY29uc3QgY2hpbGRIZWlnaHQgPSBjaGlsZHJlbltqXS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQ7XG4gICAgICAgICAgY29uc3QgY2hpbGRQYWRkaW5nTGVmdCA9IGNoaWxkcmVuW2pdLmNzcy5wYWRkaW5nTGVmdCA/IGNoaWxkcmVuW2pdLmNzcy5wYWRkaW5nTGVmdC50b1B4KCkgOiAwO1xuICAgICAgICAgIGNvbnN0IGNoaWxkTWFyZ2luTGVmdCA9IGNoaWxkcmVuW2pdLmNzcy5tYXJnaW5MZWZ0ID8gY2hpbGRyZW5bal0uY3NzLm1hcmdpbkxlZnQudG9QeCgpIDogMDtcbiAgICAgICAgICBjb25zdCBjaGlsZE1hcmdpblRvcCA9IGNoaWxkcmVuW2pdLmNzcy5tYXJnaW5Ub3AgPyBjaGlsZHJlbltqXS5jc3MubWFyZ2luVG9wLnRvUHgoKSA6IDA7XG4gICAgICAgICAgY29uc3QgY2hpbGRQYWRkaW5nVG9wID0gY2hpbGRyZW5bal0uY3NzLnBhZGRpbmdUb3AgPyBjaGlsZHJlbltqXS5jc3MucGFkZGluZ1RvcC50b1B4KCkgOiAwO1xuXG4gICAgICAgICAgY29uc3QgeEFkZGVyID0gY2hpbGRXaWR0aCArIGNoaWxkUGFkZGluZ0xlZnQgKyBjaGlsZE1hcmdpbkxlZnQ7XG4gICAgICAgICAgY29uc3QgeUFkZGVyID0gY2hpbGRIZWlnaHQgKyBjaGlsZE1hcmdpblRvcCArIGNoaWxkUGFkZGluZ1RvcDtcblxuICAgICAgICAgIGlzTGluZXMgPSBjaGlsZHJlbltqXS50eXBlID09PSAnYmxvY2snO1xuICAgICAgICAgIGlmICghaXNMaW5lcykge1xuICAgICAgICAgICAgLy8g5LiN5o2i6KGMXG4gICAgICAgICAgICB3aWR0aFN1bSArPSAoeEFkZGVyKTtcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgICAgICBpZiAod2lkdGhTdW0gPj0gcGFyZW50V2lkdGggJiYgaiA9PT0gMCkge1xuICAgICAgICAgICAgICAvLyByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24ud2lkdGggPSB3aWR0aFN1bVxuICAgICAgICAgICAgICBpc0xpbmVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaGVpZ2h0U3VtICs9IHlBZGRlcjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2lkdGhTdW0gPiBwYXJlbnRXaWR0aCkge1xuICAgICAgICAgICAgICBpc0xpbmVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaGVpZ2h0U3VtICs9IHlBZGRlcjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod2lkdGhTdW0gPCBwYXJlbnRXaWR0aCAmJiBqID09PSAwKSB7XG4gICAgICAgICAgICAgIGlzTGluZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgaGVpZ2h0U3VtICs9IHlBZGRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g5o2i6KGMXG4gICAgICAgICAgICBoZWlnaHRTdW0gKz0geUFkZGVyO1xuICAgICAgICAgICAgaXNMaW5lcyA9IGZhbHNlO1xuICAgICAgICAgICAgd2lkdGhTdW0gPSAwO1xuICAgICAgICAgICAgLy8gcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCA9IE1hdGgubWF4KGhlaWdodFN1bSwgcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCA9IE1hdGgubWF4KGhlaWdodFN1bSwgcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJldmVyc2VCZnNOb2Rlc1tpXS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQpO1xuICAgICAgfSBlbHNlIGlmIChyZXZlcnNlQmZzTm9kZXNbaV0udHlwZSA9PT0gJ2Jsb2NrJykge1xuICAgICAgICAvLyDlnZfnuqflhYPntKBcbiAgICAgICAgLy8g5a695bqm5ouJ5ruh55S75biDLOmrmOW6puWumumrmOaIluiAheiHqumAguW6lFxuICAgICAgICBjb25zdCB7IHdpZHRoOiBwYXJlbnRXaWR0aCwgaGVpZ2h0OiBwYXJlbnRIZWlnaHQgfSA9IHJldmVyc2VCZnNOb2Rlc1tpXS5wcm9jZXNzZWRMb2NhdGlvbjtcbiAgICAgICAgLy8gaWYgKCEocGFyZW50V2lkdGguaW5kZXhPZigncHgnKSA+IC0xIHx8IHBhcmVudFdpZHRoLmluZGV4T2YoJyUnKSA+IC0xKSkge1xuICAgICAgICAvLyAgIGNvbnNvbGUuZXJyb3IoJ3BsZWFzZSBpbml0IHdpZHRoIGZvciBibG9jayBlbGVtZW50LicpXG4gICAgICAgIC8vICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG4gICAgICAgIGNvbnN0IGlzQXV0b0hlaWdodCA9ICEhcGFyZW50SGVpZ2h0O1xuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICBpZiAoaXNBdXRvSGVpZ2h0KSB7XG4gICAgICAgICAgLy8g6Ieq6YCC5bqU6auY5bqmXG4gICAgICAgICAgbGV0IHdpZHRoU3VtID0gMDsgbGV0IGhlaWdodFN1bSA9IDA7IGxldFxuICAgICAgICAgICAgaXNMaW5lcyA9IGZhbHNlO1xuICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gcmV2ZXJzZUJmc05vZGVzW2ldLmNoaWxkcmVuIHx8IFtdO1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkV2lkdGggPSBjaGlsZHJlbltqXS5wcm9jZXNzZWRMb2NhdGlvbi53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkSGVpZ2h0ID0gY2hpbGRyZW5bal0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgY2hpbGRQYWRkaW5nTGVmdCA9IGNoaWxkcmVuW2pdLmNzcy5wYWRkaW5nTGVmdCA/IGNoaWxkcmVuW2pdLmNzcy5wYWRkaW5nTGVmdC50b1B4KCkgOiAwO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRNYXJnaW5MZWZ0ID0gY2hpbGRyZW5bal0uY3NzLm1hcmdpbkxlZnQgPyBjaGlsZHJlbltqXS5jc3MubWFyZ2luTGVmdC50b1B4KCkgOiAwO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRNYXJnaW5Ub3AgPSBjaGlsZHJlbltqXS5jc3MubWFyZ2luVG9wID8gY2hpbGRyZW5bal0uY3NzLm1hcmdpblRvcC50b1B4KCkgOiAwO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRQYWRkaW5nVG9wID0gY2hpbGRyZW5bal0uY3NzLnBhZGRpbmdUb3AgPyBjaGlsZHJlbltqXS5jc3MucGFkZGluZ1RvcC50b1B4KCkgOiAwO1xuICAgICAgICAgICAgY29uc3QgeEFkZGVyID0gY2hpbGRXaWR0aCArIGNoaWxkUGFkZGluZ0xlZnQgKyBjaGlsZE1hcmdpbkxlZnQ7XG4gICAgICAgICAgICBjb25zdCB5QWRkZXIgPSBjaGlsZEhlaWdodCArIGNoaWxkTWFyZ2luVG9wICsgY2hpbGRQYWRkaW5nVG9wO1xuICAgICAgICAgICAgaWYgKCFpc0xpbmVzKSB7XG4gICAgICAgICAgICAgIC8vIOS4jeaNouihjFxuICAgICAgICAgICAgICB3aWR0aFN1bSArPSAoeEFkZGVyKTtcbiAgICAgICAgICAgICAgLy8g5pyJ5a6a5a6977yM5Y+v6IO95rqi5Ye677yb5peg5a6a5a6977yM6Ieq6YCC5bqU5a695bqmXG4gICAgICAgICAgICAgIGlmICh3aWR0aFN1bSA+PSBwYXJlbnRXaWR0aCAmJiBqID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLndpZHRoID0gd2lkdGhTdW1cbiAgICAgICAgICAgICAgICBpc0xpbmVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBoZWlnaHRTdW0gKz0geUFkZGVyO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpZHRoU3VtID4gcGFyZW50V2lkdGgpIHtcbiAgICAgICAgICAgICAgICBpc0xpbmVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBoZWlnaHRTdW0gKz0geUFkZGVyO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpZHRoU3VtIDwgcGFyZW50V2lkdGggJiYgaiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlzTGluZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBoZWlnaHRTdW0gKz0geUFkZGVyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldmVyc2VCZnNOb2Rlc1tpXS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQgPSBNYXRoLm1heChoZWlnaHRTdW0sIHJldmVyc2VCZnNOb2Rlc1tpXS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8g5o2i6KGMXG4gICAgICAgICAgICAgIGhlaWdodFN1bSArPSB5QWRkZXI7XG4gICAgICAgICAgICAgIGlzTGluZXMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgd2lkdGhTdW0gPSAwO1xuICAgICAgICAgICAgICByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0U3VtLCByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8g5a6a6auYXG4gICAgICAgICAgLy8gcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCA9IE1hdGgubWF4KGhlaWdodFN1bSwgcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodClcblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVidWdnZXJcbiAgICBjb25zb2xlLmxvZygnKCgoKCgoICcsIHJldmVyc2VCZnNOb2Rlcyk7XG4gICAgcmV0dXJuIHJldmVyc2VCZnNOb2RlcztcbiAgfVxuXG4gIGNhbGNFbGVtZW50UG9zaXRpb24ocm9vdE5vZGUpIHtcbiAgICBjb25zdCBiZnNOb2RlcyA9IGJyZWFkdGhGaXJzdFNlYXJjaChyb290Tm9kZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiZnNOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcGFyZW50ID0gYmZzTm9kZXNbaV0ucGFyZW50O1xuICAgICAgY29uc3QgeyBwYWRkaW5nTGVmdCwgbWFyZ2luTGVmdCwgcGFkZGluZ1RvcCwgbWFyZ2luVG9wIH0gPSB7IC4uLmRlZmF1bHRQYWRkaW5nTWFyZ2luLCAuLi5iZnNOb2Rlc1tpXS5jc3MgfTtcbiAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgIGJmc05vZGVzW2ldLnJlbmRlclN0eWxlID0ge1xuICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgeTogMCxcbiAgICAgICAgICBjb250ZW50WDogZm9ybWF0VG9OdW0ocGFkZGluZ0xlZnQsIGJmc05vZGVzW2ldLnBhcmVudCwgJ3dpZHRoJykgKyBmb3JtYXRUb051bShtYXJnaW5MZWZ0LCBiZnNOb2Rlc1tpXS5wYXJlbnQsICd3aWR0aCcpLFxuICAgICAgICAgIGNvbnRlbnRZOiBmb3JtYXRUb051bShwYWRkaW5nVG9wLCBiZnNOb2Rlc1tpXS5wYXJlbnQsICdoZWlnaHQnKSArIGZvcm1hdFRvTnVtKG1hcmdpblRvcCwgYmZzTm9kZXNbaV0ucGFyZW50LCAnaGVpZ2h0JyksXG4gICAgICAgIH07XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3QgaXNMaW5lcyA9IGdldElzQ2hhbmdlTGluZShiZnNOb2Rlc1tpXSk7XG4gICAgICAvLyBkZWJ1Z2dlclxuICAgICAgdGhpcy5pbnNlcnRWbm9kZShiZnNOb2Rlc1tpXSwgaXNMaW5lcyk7XG4gICAgICAvLyBkZWJ1Z2dlclxuICAgICAgLy8gaWYgKGlzTGluZXMpIHtcbiAgICAgIC8vICAgLy8g5o2i6KGM5pe2LCB5OuWPoOWKoHByZeWFhOW8n+iKgueCueWdkOaghywgeDrlj6DliqDniLboioLngrnlnZDmoIdcbiAgICAgIC8vICAgY29uc3QgeCA9IHBhcmVudC5yZW5kZXJTdHlsZS5jb250ZW50WFxuICAgICAgLy8gICBjb25zdCB5ID0gdGhpcy5fZ2V0UHJlTGF5b3V0KGJmc05vZGVzW2ldKS55ICsgdGhpcy5fZ2V0UHJlTGF5b3V0KGJmc05vZGVzW2ldKS5oZWlnaHRcbiAgICAgIC8vICAgLy8gZGVidWdnZXJcbiAgICAgIC8vICAgY29uc3QgcmVuZGVyU3R5bGUgPSB7XG4gICAgICAvLyAgICAgeCxcbiAgICAgIC8vICAgICB5LFxuICAgICAgLy8gICAgIGNvbnRlbnRYOiB4ICsgZm9ybWF0VG9QeChwYWRkaW5nTGVmdCkgKyBmb3JtYXRUb1B4KG1hcmdpbkxlZnQpLFxuICAgICAgLy8gICAgIGNvbnRlbnRZOiB5ICsgZm9ybWF0VG9QeChwYWRkaW5nVG9wKSArIGZvcm1hdFRvUHgobWFyZ2luVG9wKVxuICAgICAgLy8gICB9XG4gICAgICAvLyAgIC8vIGRlYnVnZ2VyXG4gICAgICAvLyAgIGJmc05vZGVzW2ldLnJlbmRlclN0eWxlID0gcmVuZGVyU3R5bGU7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICAvLyDkuI3mjaLooYzml7YsIHk65Y+g5Yqg54i26IqC54K55Z2Q5qCHLCB4OuWPoOWKoHByZeWFhOW8n+iKguWdkOagh1xuICAgICAgLy8gICBjb25zdCB4ID0gdGhpcy5fZ2V0UHJlTGF5b3V0KGJmc05vZGVzW2ldKS54ICsgdGhpcy5fZ2V0UHJlTGF5b3V0KGJmc05vZGVzW2ldKS53aWR0aFxuICAgICAgLy8gICBjb25zdCB5ID0gdGhpcy5fZ2V0UHJlTGF5b3V0KGJmc05vZGVzW2ldKS55XG4gICAgICAvLyAgIGNvbnN0IHJlbmRlclN0eWxlID0ge1xuICAgICAgLy8gICAgIHgsXG4gICAgICAvLyAgICAgeSxcbiAgICAgIC8vICAgICBjb250ZW50WDogeCArIGZvcm1hdFRvUHgocGFkZGluZ0xlZnQpICsgZm9ybWF0VG9QeChtYXJnaW5MZWZ0KSxcbiAgICAgIC8vICAgICBjb250ZW50WTogeSArIGZvcm1hdFRvUHgocGFkZGluZ1RvcCkgKyBmb3JtYXRUb1B4KG1hcmdpblRvcClcbiAgICAgIC8vICAgfVxuICAgICAgLy8gICBiZnNOb2Rlc1tpXS5yZW5kZXJTdHlsZSA9IHJlbmRlclN0eWxlO1xuICAgICAgLy8gfVxuICAgIH1cbiAgICByZXR1cm4gYmZzTm9kZXM7XG4gIH1cblxuICBpbnNlcnRWbm9kZSh2bm9kZSwgaXNDaGFuZ2VMaW5lKSB7XG4gICAgaWYgKFsnYmxvY2snXS5pbmNsdWRlcyh2bm9kZS50eXBlKSkge1xuICAgICAgLy8g5Z2X57qn5YWD57SgXG4gICAgICBjb25zdCB7IHBhZGRpbmdMZWZ0LCBtYXJnaW5MZWZ0LCBwYWRkaW5nVG9wLCBtYXJnaW5Ub3AgfSA9IHsgLi4uZGVmYXVsdFBhZGRpbmdNYXJnaW4sIC4uLnZub2RlLmNzcyB9O1xuICAgICAgLy8g5o2i6KGM5pe2LCB5OuWPoOWKoHByZeWFhOW8n+iKgueCueWdkOaghywgeDrlj6DliqDniLboioLngrnlnZDmoIdcbiAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICBjb25zdCB4ID0gdm5vZGUucGFyZW50LnJlbmRlclN0eWxlLmNvbnRlbnRYO1xuICAgICAgY29uc3QgeSA9IGdldFByZUxheW91dCh2bm9kZSkueSArIGdldFByZUxheW91dCh2bm9kZSkuaGVpZ2h0O1xuICAgICAgY29uc3QgcmVuZGVyU3R5bGUgPSB7XG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIC8vIGNvbnRlbnRYOiB4ICsgZm9ybWF0VG9QeChwYWRkaW5nTGVmdCkgKyBmb3JtYXRUb1B4KG1hcmdpbkxlZnQpLFxuICAgICAgICAvLyBjb250ZW50WTogeSArIGZvcm1hdFRvUHgocGFkZGluZ1RvcCkgKyBmb3JtYXRUb1B4KG1hcmdpblRvcClcbiAgICAgICAgY29udGVudFg6IHggKyBmb3JtYXRUb051bShwYWRkaW5nTGVmdCwgdm5vZGUucGFyZW50LCAnd2lkdGgnKSArIGZvcm1hdFRvTnVtKG1hcmdpbkxlZnQsIHZub2RlLnBhcmVudCwgJ3dpZHRoJyksXG4gICAgICAgIGNvbnRlbnRZOiB5ICsgZm9ybWF0VG9OdW0ocGFkZGluZ1RvcCwgdm5vZGUucGFyZW50LCAnaGVpZ2h0JykgKyBmb3JtYXRUb051bShtYXJnaW5Ub3AsIHZub2RlLnBhcmVudCwgJ2hlaWdodCcpLFxuICAgICAgfTtcbiAgICAgIHZub2RlLnJlbmRlclN0eWxlID0gcmVuZGVyU3R5bGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOihjOWGheWFg+e0oFxuICAgICAgaW5zZXJ0Vm5vZGVJbnRvTGluZSh2bm9kZSwgaXNDaGFuZ2VMaW5lKTtcbiAgICB9XG4gIH1cblxuICAvLyDmoLnmja7kuIDnuqdqc29u5pu05paw5q+P5Liq6IqC54K555qE6auY5bqmXG4gIC8vIGNhbGNFYWNoSGVpZ2h0KHRwbCkge1xuICAvLyAgIGNvbnN0IHBhcmVudElkcyA9IHRwbC5tYXAoKHNiKSA9PiB7IHJldHVybiBzYi5mX3NpZDsgfSk7XG4gIC8vICAgbGV0IHNvcnRlZCA9IHBhcmVudElkcy5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBiIC0gYTsgfSk7XG4gIC8vICAgc29ydGVkID0gQXJyYXkuZnJvbShuZXcgU2V0KHNvcnRlZCkpO1xuICAvLyAgIHNvcnRlZC5mb3JFYWNoKChmX3NpZCkgPT4ge1xuICAvLyAgICAgLy8gZGVidWdnZXI7XG4gIC8vICAgICBpZiAoZl9zaWQpIHtcbiAgLy8gICAgICAgLy8g5pyJ54i26IqC54K5XG4gIC8vICAgICAgIGNvbnN0IHBhcmVudE5vZGUgPSB0cGwuZmluZCgobGwpID0+IHsgcmV0dXJuIGxsLnNpZCA9PT0gZl9zaWQ7IH0pO1xuICAvLyAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRwbC5maWx0ZXIoKHgpID0+IHsgcmV0dXJuIHguZl9zaWQgPT09IGZfc2lkOyB9KTtcbiAgLy8gICAgICAgLy8gY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tICcsIGNoaWxkcmVuKTtcbiAgLy8gICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgLy8gICAgICAgICBwYXJlbnROb2RlLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCA9IGNoaWxkcmVuLnJlZHVjZSgocHJlLCBuZXh0KSA9PiB7XG4gIC8vICAgICAgICAgICByZXR1cm4gcHJlICsgbmV4dC5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQ7XG4gIC8vICAgICAgICAgfSwgMCk7XG4gIC8vICAgICAgICAgY29uc3QgcGFkZGluZ2JvdHRvbSA9IHBhcmVudE5vZGUuY3NzLnBhZGRpbmdib3R0b20gPyBwYXJlbnROb2RlLmNzcy5wYWRkaW5nYm90dG9tLnRvUHgoKSA6IDA7XG4gIC8vICAgICAgICAgcGFyZW50Tm9kZS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQgKz0gcGFkZGluZ2JvdHRvbTtcbiAgLy8gICAgICAgICBwYXJlbnROb2RlLmNzcy5oZWlnaHQgPSBgJHtwYXJlbnROb2RlLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodH1weGA7XG4gIC8vICAgICAgIH0gZWxzZSB7XG4gIC8vICAgICAgICAgLy8g5qC56IqC54K5XG4gIC8vICAgICAgICAgdGhpcy5kYXRhLmhlaWdodCA9IGNoaWxkcmVuLnJlZHVjZSgocHJlLCBuZXh0KSA9PiB7XG4gIC8vICAgICAgICAgICByZXR1cm4gcHJlICsgbmV4dC5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQ7XG4gIC8vICAgICAgICAgfSwgMCk7XG4gIC8vICAgICAgICAgY29uc3QgcGFkZGluZ2JvdHRvbSA9IHRoaXMuZGF0YS5wYWRkaW5nYm90dG9tID8gdGhpcy5kYXRhLnBhZGRpbmdib3R0b20udG9QeCgpIDogMDtcbiAgLy8gICAgICAgICB0aGlzLmRhdGEuaGVpZ2h0ICs9IHBhZGRpbmdib3R0b207XG4gIC8vICAgICAgICAgdGhpcy5kYXRhLmhlaWdodCA9IGAke3RoaXMuZGF0YS5oZWlnaHR9cHhgO1xuICAvLyAgICAgICB9XG4gIC8vICAgICB9XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICAvLyDmt7vliqBpZFxuICByb3V0ZUJ5REZTKCkge1xuICAgIGNvbnN0IHBhcmVudE5vZGUgPSB7IGNoaWxkcmVuOiB0aGlzLmRhdGEudmlld3MgfTtcblxuICAgIGlmICghcGFyZW50Tm9kZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGxldCBzaWQgPSAxO1xuICAgIHBhcmVudE5vZGUuc2lkID0gc2lkO1xuICAgIHNpZCsrO1xuICAgIC8vIOa3seW6puS8mOWFiCwg6Z2e6YCS5b2S5a6e546w77yMIOS9v+eUqOagiFxuICAgIGxldCBzdGFjayA9IFtdO1xuICAgIGZvciAobGV0IGkgPSBwYXJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgcGFyZW50Tm9kZS5jaGlsZHJlbltpIC0gMV0uc2lkID0gc2lkO1xuICAgICAgcGFyZW50Tm9kZS5jaGlsZHJlbltpIC0gMV0uZl9zaWQgPSAxO1xuICAgICAgc2lkKys7XG4gICAgICBzdGFjay5wdXNoKHBhcmVudE5vZGUuY2hpbGRyZW5baSAtIDFdKTtcbiAgICB9XG4gICAgd2hpbGUgKHN0YWNrLmxlbmd0aCkge1xuICAgICAgY29uc3Qgbm9kZSA9IHN0YWNrLnBvcCgpO1xuICAgICAgaWYgKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgICAgIHguc2lkID0gc2lkO1xuICAgICAgICAgIHguZl9zaWQgPSBub2RlLnNpZDtcbiAgICAgICAgICBzaWQrKztcbiAgICAgICAgfSk7XG4gICAgICAgIHN0YWNrID0gQXJyYXkuZnJvbShub2RlLmNoaWxkcmVuKS5jb25jYXQoc3RhY2spO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIOW5v+W6puS8mOWFiOmBjeWOhuiuoeeul+WQjOe6p+WFhOW8nyjlm6DkuLrlj6/og73lh7rnjrDnm7jlr7nlhYTlvJ/oioLngrnjgIHniLboioLngrnlrprkvY3jgIJkZnPml6Dms5XorrDlvZXlhYTlvJ/oioLngrnkv6Hmga/vvIxiZnPkuKTogIXpg73lj6/orrDlvZUp6IqC54K555qE55u45a+55L2N572uXG4gIHJvdXRlQnlCRlMoKSB7XG4gICAgY29uc3Qgbm9kZSA9IHsgY2hpbGRyZW46IHRoaXMuZGF0YS52aWV3cyB9O1xuICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgaWYgKG5vZGUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHF1ZXVlID0gW107XG4gICAgICBxdWV1ZS51bnNoaWZ0KG5vZGUpO1xuICAgICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBsZXQgaXRlbSA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIC8vIOiuoeeul1xuICAgICAgICBpdGVtID0gdGhpcy5wcmVQcm9jZXNzT2JqKGl0ZW0pO1xuICAgICAgICBub2Rlcy5wdXNoKGl0ZW0pO1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGl0ZW0uY2hpbGRyZW47XG4gICAgICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goY2hpbGRyZW5baV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByZVByb2Nlc3NPYmoodmlldykge1xuICAgIC8vIOiOt+WPluWOn+Wni2Nzc+WuvemrmC/mloflrZfmjaLooYzpq5jluqZcbiAgICBsZXQganNvbjtcbiAgICBzd2l0Y2ggKHZpZXcudHlwZSkge1xuICAgIGNhc2UgJ2ltYWdlJzpcbiAgICAgIGpzb24gPSB0aGlzLl9wcmVQcm9jZXNzKHZpZXcpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndGV4dCc6XG4gICAgICBqc29uID0gdGhpcy5fcHJlUHJvY2Vzcyh2aWV3LCB2aWV3LmNzcy5iYWNrZ3JvdW5kICYmIHZpZXcuY3NzLmJvcmRlclJhZGl1cyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyZWN0JzpcbiAgICAgIGpzb24gPSB0aGlzLl9wcmVQcm9jZXNzKHZpZXcpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmxvY2snOlxuICAgICAganNvbiA9IHRoaXMuX3ByZVByb2Nlc3Modmlldyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIHZpZXcuX2lkID0gaTtcbiAgICB2aWV3LnByb2Nlc3NlZExvY2F0aW9uID0ganNvbjtcbiAgICByZXR1cm4gdmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiDnlLvog4zmma9cbiAgICovXG4gIF9iYWNrZ3JvdW5kKCkge1xuICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICBjb25zdCB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICB9ID0gdGhpcy5zdHlsZTtcbiAgICAvLyBjb25zdCBoZWlnaHQgPSA3OThcbiAgICBjb25zdCBiZyA9IHRoaXMuZGF0YS5iYWNrZ3JvdW5kO1xuICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuXG4gICAgdGhpcy5fZG9DbGlwKHRoaXMuZGF0YS5ib3JkZXJSYWRpdXMsIHdpZHRoLCBoZWlnaHQpO1xuICAgIC8vIGRlYnVnZ2VyO1xuICAgIGlmICghYmcpIHtcbiAgICAgIC8vIOWmguaenOacquiuvue9ruiDjOaZr++8jOWImem7mOiupOS9v+eUqOeZveiJslxuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJyNmZmYnO1xuICAgICAgdGhpcy5jdHguZmlsbFJlY3QoLSh3aWR0aCAvIDIpLCAtKGhlaWdodCAvIDIpLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9IGVsc2UgaWYgKGJnLnN0YXJ0c1dpdGgoJyMnKSB8fCBiZy5zdGFydHNXaXRoKCdyZ2JhJykgfHwgYmcudG9Mb3dlckNhc2UoKSA9PT0gJ3RyYW5zcGFyZW50Jykge1xuICAgICAgLy8g6IOM5pmv5aGr5YWF6aKc6ImyXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBiZztcbiAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfSBlbHNlIGlmIChHRC5hcGkuaXNHcmFkaWVudChiZykpIHtcbiAgICAgIEdELmFwaS5kb0dyYWRpZW50KGJnLCB3aWR0aCwgaGVpZ2h0LCB0aGlzLmN0eCk7XG4gICAgICB0aGlzLmN0eC5maWxsUmVjdCgtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDog4zmma/loavlhYXlm77niYdcbiAgICAgIC8vIGRlYnVnZ2VyO1xuICAgICAgLy8gdGhpcy5jdHgudHJhbnNsYXRlKDAuNSwgMC41KTtcbiAgICAgIHRoaXMuX2RyYXdJbWFnZShiZywgLSh3aWR0aCAvIDIpLCAtKGhlaWdodCAvIDIpLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG4gICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgYXN5bmMgX2RyYXdBYnNvbHV0ZSh2aWV3KSB7XG4gICAgaWYgKCF2aWV3KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIC8vIOivgeaYjiBjc3Mg5Li65pWw57uE5b2i5byP77yM6ZyA6KaB5ZCI5bm2XG4gICAgLy8gaWYgKHZpZXcuY3NzICYmIHZpZXcuY3NzLmxlbmd0aCkge1xuICAgIC8vICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAvLyAgIHZpZXcuY3NzID0gT2JqZWN0LmFzc2lnbiguLi52aWV3LmNzcyk7XG4gICAgLy8gfVxuICAgIHN3aXRjaCAodmlldy50eXBlKSB7XG4gICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgYXdhaXQgdGhpcy5fZHJhd0Fic0ltYWdlKHZpZXcpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndGV4dCc6XG4gICAgICB0aGlzLl9maWxsQWJzVGV4dCh2aWV3KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlY3QnOlxuICAgICAgdGhpcy5fZHJhd0Fic1JlY3Qodmlldyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdibG9jayc6XG4gICAgICB0aGlzLl9kcmF3QWJzUmVjdCh2aWV3KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5qC55o2uIGJvcmRlclJhZGl1cyDov5vooYzoo4Hlh49cbiAgICovXG4gIF9kb0NsaXAoYm9yZGVyUmFkaXVzLCB3aWR0aCwgaGVpZ2h0LCBpc09ubHlVcEhhbGYgPSBmYWxzZSkge1xuICAgIC8vIGRlYnVnZ2VyXG4gICAgaWYgKGJvcmRlclJhZGl1cyAmJiB3aWR0aCAmJiBoZWlnaHQpIHtcbiAgICAgIGNvbnN0IHIgPSBNYXRoLm1pbihib3JkZXJSYWRpdXMudG9QeCgpLCB3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgICAgLy8g6Ziy5q2i5Zyo5p+Q5Lqb5py65Z6L5LiK5ZGo6L655pyJ6buR5qGG546w6LGh77yM5q2k5aSE5aaC5p6c55u05o6l6K6+572uIGZpbGxTdHlsZSDkuLrpgI/mmI7vvIzlnKggQW5kcm9pZCDmnLrlnovkuIrkvJrlr7zoh7Tooqvoo4Hlh4/nmoTlm77niYfkuZ/lj5jkuLrpgI/mmI7vvIwgaU9TIOWSjCBJREUg5LiK5LiN5LyaXG4gICAgICAvLyBnbG9iYWxBbHBoYSDlnKggMS45LjkwIOi1t+aUr+aMge+8jOS9jueJiOacrOS4i+aXoOaViO+8jOS9huaKiiBmaWxsU3R5bGUg6K6+5Li65LqGIHdoaXRl77yM55u45a+56buY6K6k55qEIGJsYWNrIOimgeWlveeCuVxuICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSAwO1xuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jdHguYXJjKC13aWR0aCAvIDIgKyByLCAtaGVpZ2h0IC8gMiArIHIsIHIsIDEgKiBNYXRoLlBJLCAxLjUgKiBNYXRoLlBJKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh3aWR0aCAvIDIgLSByLCAtaGVpZ2h0IC8gMik7XG4gICAgICB0aGlzLmN0eC5hcmMod2lkdGggLyAyIC0gciwgLWhlaWdodCAvIDIgKyByLCByLCAxLjUgKiBNYXRoLlBJLCAyICogTWF0aC5QSSk7XG5cbiAgICAgIGlmIChpc09ubHlVcEhhbGYpIHtcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVUbygtd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVUbyh3aWR0aCAvIDIsIGhlaWdodCAvIDIgLSByKTtcbiAgICAgICAgdGhpcy5jdHguYXJjKHdpZHRoIC8gMiAtIHIsIGhlaWdodCAvIDIgLSByLCByLCAwLCAwLjUgKiBNYXRoLlBJKTtcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKC13aWR0aCAvIDIgKyByLCBoZWlnaHQgLyAyKTtcbiAgICAgICAgdGhpcy5jdHguYXJjKC13aWR0aCAvIDIgKyByLCBoZWlnaHQgLyAyIC0gciwgciwgMC41ICogTWF0aC5QSSwgMSAqIE1hdGguUEkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICAgIC8vIOWcqCBpb3Mg55qEIDYuNi42IOeJiOacrOS4iiBjbGlwIOaciSBidWfvvIznpoHmjonmraTnsbvlnovkuIrnmoQgY2xpcO+8jOS5n+WwseaEj+WRs+edgO+8jOWcqOatpOeJiOacrOW+ruS/oeeahCBpb3Mg6K6+5aSH5LiL5peg5rOV5L2/55SoIGJvcmRlciDlsZ7mgKdcbiAgICAgIGNvbnN0IHsgdmVyc2lvbiwgcGxhdGZvcm0gfSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICAvLyDlhbzlrrnlsI/nqIvluo/mj5Lku7ZcbiAgICAgIGlmICghKHZlcnNpb24gPD0gJzYuNi42JyAmJiBwbGF0Zm9ybSA9PT0gJ2lvcycpKSB7XG4gICAgICAgIHRoaXMuY3R4LmNsaXAoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3R4Lmdsb2JhbEFscGhhID0gMTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog55S76L655qGGXG4gICAqL1xuICBfZG9Cb3JkZXIodmlldywgd2lkdGgsIGhlaWdodCkge1xuICAgIGlmICghdmlldy5jc3MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgYm9yZGVyUmFkaXVzLFxuICAgICAgYm9yZGVyV2lkdGgsXG4gICAgICBib3JkZXJDb2xvcixcbiAgICB9ID0gdmlldy5jc3M7XG4gICAgaWYgKCFib3JkZXJXaWR0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgLy8gY29uc3QgeyB4LCB5LCBoZWlnaHQ6IHJhd0hlaWdodCwgd2lkdGg6IHJhd1dpZHRoIH0gPSB0aGlzLl9wcmVQcm9jZXNzKHZpZXcsIHRydWUpO1xuICAgIGNvbnN0IHsgaGVpZ2h0OiByYXdIZWlnaHQsIHdpZHRoOiByYXdXaWR0aCB9ID0gdmlldy5wcm9jZXNzZWRMb2NhdGlvbjtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHZpZXcucmVuZGVyU3R5bGU7XG4gICAgdGhpcy5fcHJlUGFpbnQodmlldywgdHJ1ZSwgeyB4LCB5LCBoZWlnaHQ6IHJhd0hlaWdodCwgd2lkdGg6IHJhd1dpZHRoIH0pO1xuXG4gICAgbGV0IHI7XG4gICAgaWYgKGJvcmRlclJhZGl1cykge1xuICAgICAgciA9IE1hdGgubWluKGJvcmRlclJhZGl1cy50b1B4KCksIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHIgPSAwO1xuICAgIH1cbiAgICBjb25zdCBsaW5lV2lkdGggPSBib3JkZXJXaWR0aC50b1B4KCk7XG4gICAgdGhpcy5jdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xuICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gKGJvcmRlckNvbG9yIHx8ICdibGFjaycpO1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmFyYygtd2lkdGggLyAyICsgciwgLWhlaWdodCAvIDIgKyByLCByICsgbGluZVdpZHRoIC8gMiwgMSAqIE1hdGguUEksIDEuNSAqIE1hdGguUEkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbyh3aWR0aCAvIDIgLSByLCAtaGVpZ2h0IC8gMiAtIGxpbmVXaWR0aCAvIDIpO1xuICAgIHRoaXMuY3R4LmFyYyh3aWR0aCAvIDIgLSByLCAtaGVpZ2h0IC8gMiArIHIsIHIgKyBsaW5lV2lkdGggLyAyLCAxLjUgKiBNYXRoLlBJLCAyICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHgubGluZVRvKHdpZHRoIC8gMiArIGxpbmVXaWR0aCAvIDIsIGhlaWdodCAvIDIgLSByKTtcbiAgICB0aGlzLmN0eC5hcmMod2lkdGggLyAyIC0gciwgaGVpZ2h0IC8gMiAtIHIsIHIgKyBsaW5lV2lkdGggLyAyLCAwLCAwLjUgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5saW5lVG8oLXdpZHRoIC8gMiArIHIsIGhlaWdodCAvIDIgKyBsaW5lV2lkdGggLyAyKTtcbiAgICB0aGlzLmN0eC5hcmMoLXdpZHRoIC8gMiArIHIsIGhlaWdodCAvIDIgLSByLCByICsgbGluZVdpZHRoIC8gMiwgMC41ICogTWF0aC5QSSwgMSAqIE1hdGguUEkpO1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDpooTlpITnkIboioLngrnlr7nosaFcbiAgICogQHBhcmFtIHtvYmplY3R9fSB2aWV3XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbm90Q2xpcFxuICAgKiBAcmV0dXJuXG4gICAqIHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgeCxcbiAgICAgIHksXG4gICAgICBleHRyYSxcbiAgICB9O1xuICAgKi9cbiAgX3ByZVByb2Nlc3Modmlldywgbm90Q2xpcCkge1xuICAgIC8vIGRlYnVnZ2VyXG4gICAgbGV0IHdpZHRoID0gMDtcbiAgICBsZXQgaGVpZ2h0O1xuICAgIGxldCBleHRyYTtcbiAgICBzd2l0Y2ggKHZpZXcudHlwZSkge1xuICAgIGNhc2UgJ3RleHQnOiB7XG4gICAgICBjb25zdCB0ZXh0QXJyYXkgPSB2aWV3LnRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgLy8g5aSE55CG5aSa5Liq6L+e57ut55qEJ1xcbidcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dEFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0ZXh0QXJyYXlbaV0gPT09ICcnKSB7XG4gICAgICAgICAgdGV4dEFycmF5W2ldID0gJyAnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBmb250V2VpZ2h0ID0gdmlldy5jc3MuZm9udFdlaWdodCA9PT0gJ2JvbGQnID8gJ2JvbGQnIDogJ25vcm1hbCc7XG4gICAgICB2aWV3LmNzcy5mb250U2l6ZSA9IHZpZXcuY3NzLmZvbnRTaXplID8gdmlldy5jc3MuZm9udFNpemUgOiAnMjBycHgnO1xuICAgICAgLy8g6ZyA6KaB6K6h566X5paH5a2X5a695bqm77yM6L+Z6YeM5Yid5aeL5YyW5LiN6IO955yB55WlXG4gICAgICB0aGlzLmN0eC5mb250ID0gYG5vcm1hbCAke2ZvbnRXZWlnaHR9ICR7dmlldy5jc3MuZm9udFNpemUudG9QeCgpfXB4ICR7dmlldy5jc3MuZm9udEZhbWlseSA/IGBcIiR7dmlldy5jc3MuZm9udEZhbWlseX1cImAgOiAnc2Fucy1zZXJpZid9YDtcblxuICAgICAgLy8gdGhpcy5jdHguc2V0Rm9udFNpemUodmlldy5jc3MuZm9udFNpemUudG9QeCgpKTtcbiAgICAgIC8vIOiuoeeul+ihjOaVsFxuICAgICAgbGV0IGxpbmVzID0gMDtcbiAgICAgIGNvbnN0IGxpbmVzQXJyYXkgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dEFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvbnN0IHRleHRMZW5ndGggPSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0QXJyYXlbaV0pLndpZHRoO1xuICAgICAgICBjb25zdCBwYXJ0V2lkdGggPSB2aWV3LmNzcy53aWR0aCA/IGZvcm1hdFRvTnVtKHZpZXcuY3NzLndpZHRoLCB2aWV3LnBhcmVudCwgJ3dpZHRoJykgOiB0ZXh0TGVuZ3RoO1xuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICBjb25zdCBjYWxMaW5lcyA9IE1hdGguY2VpbCh0ZXh0TGVuZ3RoIC8gcGFydFdpZHRoKTtcbiAgICAgICAgd2lkdGggPSBwYXJ0V2lkdGggPiB3aWR0aCA/IHBhcnRXaWR0aCA6IHdpZHRoO1xuICAgICAgICBsaW5lcyArPSBjYWxMaW5lcztcbiAgICAgICAgbGluZXNBcnJheVtpXSA9IGNhbExpbmVzO1xuICAgICAgfVxuICAgICAgbGluZXMgPSB2aWV3LmNzcy5tYXhMaW5lcyA8IGxpbmVzID8gdmlldy5jc3MubWF4TGluZXMgOiBsaW5lcztcbiAgICAgIGNvbnN0IGxpbmVIZWlnaHQgPSB2aWV3LmNzcy5saW5lSGVpZ2h0ID8gdmlldy5jc3MubGluZUhlaWdodC50b1B4KCkgOiB2aWV3LmNzcy5mb250U2l6ZS50b1B4KCk7XG4gICAgICBoZWlnaHQgPSBsaW5lSGVpZ2h0ICogbGluZXM7XG5cbiAgICAgIGV4dHJhID0ge1xuICAgICAgICBsaW5lcyxcbiAgICAgICAgbGluZUhlaWdodCxcbiAgICAgICAgdGV4dEFycmF5LFxuICAgICAgICBsaW5lc0FycmF5LFxuICAgICAgfTtcbiAgICAgIC8vIOaWh+Wtl+WPluWunumZheWuveW6plxuICAgICAgaWYgKHZpZXcuaWQpIHtcbiAgICAgICAgbGV0IHRleHRXaWR0aCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dEFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgdGV4dFdpZHRoID0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dEFycmF5W2ldKS53aWR0aCA+IHRleHRXaWR0aCA/IHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHRBcnJheVtpXSkud2lkdGggOiB0ZXh0V2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgd2lkdGggPSB3aWR0aCA/ICh0ZXh0V2lkdGggPCB3aWR0aCA/IHRleHRXaWR0aCA6IHdpZHRoKSA6IHRleHRXaWR0aDtcbiAgICAgICAgLy8gdGhpcy5nbG9iYWxXaWR0aFt2aWV3LmlkXSA9IHdpZHRoID8gKHRleHRXaWR0aCA8IHdpZHRoID8gdGV4dFdpZHRoIDogd2lkdGgpIDogdGV4dFdpZHRoO1xuICAgICAgfVxuICAgICAgLy8gZGVidWdnZXI7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAnaW1hZ2UnOiB7XG4gICAgICAvLyBpbWFnZeeahOmVv+Wuveiuvue9ruaIkGF1dG/nmoTpgLvovpHlpITnkIZcbiAgICAgIGNvbnN0IHsgcGl4ZWxSYXRpbyB9ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgIGNvbnN0IHJhdGlvID0gcGl4ZWxSYXRpbyB8fCAyO1xuICAgICAgLy8gY29uc3QgcmF0aW8gPSAyXG4gICAgICAvLyDmnIljc3PljbTmnKrorr7nva53aWR0aOaIlmhlaWdodO+8jOWImem7mOiupOS4umF1dG9cbiAgICAgIGlmICh2aWV3LmNzcykge1xuICAgICAgICBpZiAoIXZpZXcuY3NzLndpZHRoKSB7XG4gICAgICAgICAgdmlldy5jc3Mud2lkdGggPSAnYXV0byc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF2aWV3LmNzcy5oZWlnaHQpIHtcbiAgICAgICAgICB2aWV3LmNzcy5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF2aWV3LmNzcyB8fCAodmlldy5jc3Mud2lkdGggPT09ICdhdXRvJyAmJiB2aWV3LmNzcy5oZWlnaHQgPT09ICdhdXRvJykpIHtcbiAgICAgICAgd2lkdGggPSBNYXRoLnJvdW5kKHZpZXcuc1dpZHRoIC8gcmF0aW8pO1xuICAgICAgICBoZWlnaHQgPSBNYXRoLnJvdW5kKHZpZXcuc0hlaWdodCAvIHJhdGlvKTtcbiAgICAgIH0gZWxzZSBpZiAodmlldy5jc3Mud2lkdGggPT09ICdhdXRvJykge1xuICAgICAgICBoZWlnaHQgPSB2aWV3LmNzcy5oZWlnaHQudG9QeCgpO1xuICAgICAgICB3aWR0aCA9IHZpZXcuc1dpZHRoIC8gdmlldy5zSGVpZ2h0ICogaGVpZ2h0O1xuICAgICAgfSBlbHNlIGlmICh2aWV3LmNzcy5oZWlnaHQgPT09ICdhdXRvJykge1xuICAgICAgICB3aWR0aCA9IHZpZXcuY3NzLndpZHRoLnRvUHgoKTtcbiAgICAgICAgaGVpZ2h0ID0gdmlldy5zSGVpZ2h0IC8gdmlldy5zV2lkdGggKiB3aWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpZHRoID0gdmlldy5jc3Mud2lkdGgudG9QeCgpO1xuICAgICAgICBoZWlnaHQgPSB2aWV3LmNzcy5oZWlnaHQudG9QeCgpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAoISh2aWV3LmNzcy53aWR0aCAmJiB2aWV3LmNzcy5oZWlnaHQpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1lvdSBzaG91bGQgc2V0IHdpZHRoIGFuZCBoZWlnaHQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB3aWR0aCA9IGZvcm1hdFRvTnVtKHZpZXcuY3NzLndpZHRoLCB2aWV3LnBhcmVudCwgJ3dpZHRoJyk7XG4gICAgICBoZWlnaHQgPSBmb3JtYXRUb051bSh2aWV3LmNzcy5oZWlnaHQsIHZpZXcucGFyZW50LCAnaGVpZ2h0Jyk7XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBsZXQgeDtcbiAgICAvLyBpZiAodmlldy5jc3MgJiYgdmlldy5jc3MucmlnaHQpIHtcbiAgICAvLyAgIGlmICh0eXBlb2Ygdmlldy5jc3MucmlnaHQgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gICAgIHggPSB0aGlzLnN0eWxlLndpZHRoIC0gdmlldy5jc3MucmlnaHQudG9QeCh0cnVlKTtcbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIC8vIOWPr+S7peeUqOaVsOe7hOaWueW8j++8jOaKiuaWh+Wtl+mVv+W6puiuoeeul+i/m+WOu1xuICAgIC8vICAgICAvLyBbcmlnaHQsIOaWh+Wtl2lkLCDkuZjmlbDvvIjpu5jorqQgMe+8iV1cbiAgICAvLyAgICAgLy8gW3JpZ2h0LCBb5paH5a2XaWQxLCDmloflrZdpZDIsIOaWh+Wtl2lkM10sIOS5mOaVsO+8iOm7mOiupCAx77yJXVxuICAgIC8vICAgICBjb25zdCByaWdodHMgPSB2aWV3LmNzcy5yaWdodDtcbiAgICAvLyAgICAgeCA9IHRoaXMuc3R5bGUud2lkdGggLSByaWdodHNbMF0udG9QeCh0cnVlKSAtIHRoaXMuZ2xvYmFsV2lkdGhbcmlnaHRzWzFdXSAqIChyaWdodHNbMl0gfHwgMSk7XG4gICAgLy8gICB9XG4gICAgLy8gfSBlbHNlIGlmICh2aWV3LmNzcyAmJiB2aWV3LmNzcy5sZWZ0KSB7XG4gICAgLy8gICAvLyBkZWJ1Z2dlclxuICAgIC8vICAgaWYgKHR5cGVvZiB2aWV3LmNzcy5sZWZ0ID09PSAnc3RyaW5nJykge1xuICAgIC8vICAgICB4ID0gdmlldy5jc3MubGVmdC50b1B4KHRydWUpO1xuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgY29uc3QgbGVmdHMgPSB2aWV3LmNzcy5sZWZ0O1xuXG4gICAgLy8gICAgIGlmIChBcnJheS5pc0FycmF5KGxlZnRzWzFdKSkge1xuICAgIC8vICAgICAgIGNvbnN0IGR5bmFtaWNXaWR0aCA9IGxlZnRzWzFdLnJlZHVjZSgocHJlLCBuZXh0KSA9PiB7XG4gICAgLy8gICAgICAgICByZXR1cm4gcHJlICsgdGhpcy5nbG9iYWxXaWR0aFtuZXh0XTtcbiAgICAvLyAgICAgICB9LCAwKTtcbiAgICAvLyAgICAgICB4ID0gbGVmdHNbMF0udG9QeCh0cnVlKSArIGR5bmFtaWNXaWR0aCAqIChsZWZ0c1syXSB8fCAxKTtcbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICB4ID0gbGVmdHNbMF0udG9QeCh0cnVlKSArIHRoaXMuZ2xvYmFsV2lkdGhbbGVmdHNbMV1dICogKGxlZnRzWzJdIHx8IDEpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIC8vIGRlYnVnZ2VyXG4gICAgLy8gICB9XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHggPSAwO1xuICAgIC8vIH1cbiAgICAvLyAvLyBjb25zdCB5ID0gdmlldy5jc3MgJiYgdmlldy5jc3MuYm90dG9tID8gdGhpcy5zdHlsZS5oZWlnaHQgLSBoZWlnaHQgLSB2aWV3LmNzcy5ib3R0b20udG9QeCh0cnVlKSA6ICh2aWV3LmNzcyAmJiB2aWV3LmNzcy50b3AgPyB2aWV3LmNzcy50b3AudG9QeCh0cnVlKSA6IDApO1xuICAgIC8vIGxldCB5O1xuICAgIC8vIGlmICh2aWV3LmNzcyAmJiB2aWV3LmNzcy5ib3R0b20pIHtcbiAgICAvLyAgIHkgPSB0aGlzLnN0eWxlLmhlaWdodCAtIGhlaWdodCAtIHZpZXcuY3NzLmJvdHRvbS50b1B4KHRydWUpO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICBpZiAodmlldy5jc3MgJiYgdmlldy5jc3MudG9wKSB7XG4gICAgLy8gICAgIC8vIGRlYnVnZ2VyO1xuICAgIC8vICAgICBpZiAodHlwZW9mIHZpZXcuY3NzLnRvcCA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyAgICAgICB5ID0gdmlldy5jc3MudG9wLnRvUHgodHJ1ZSk7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgY29uc3QgdG9wcyA9IHZpZXcuY3NzLnRvcDtcbiAgICAvLyAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0b3BzWzFdKSkge1xuICAgIC8vICAgICAgICAgY29uc3QgZHluYW1pY0hlaWdodCA9IHRvcHNbMV0ucmVkdWNlKChwcmUsIG5leHQpID0+IHtcbiAgICAvLyAgICAgICAgICAgcmV0dXJuIHByZSArIHRoaXMuZ2xvYmFsSGVpZ2h0W25leHRdO1xuICAgIC8vICAgICAgICAgfSwgMCk7XG4gICAgLy8gICAgICAgICB5ID0gdG9wc1swXS50b1B4KHRydWUpICsgZHluYW1pY0hlaWdodCAqICh0b3BzWzJdIHx8IDEpO1xuICAgIC8vICAgICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICB5ID0gdG9wc1swXS50b1B4KHRydWUpICsgdGhpcy5nbG9iYWxIZWlnaHRbdG9wc1sxXV0gKiAodG9wc1syXSB8fCAxKTtcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgICAgLy8gZGVidWdnZXJcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgeSA9IDA7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuXG4gICAgaWYgKHZpZXcuaWQpIHtcbiAgICAgIHRoaXMuZ2xvYmFsV2lkdGhbdmlldy5pZF0gPSB3aWR0aDtcbiAgICAgIHRoaXMuZ2xvYmFsSGVpZ2h0W3ZpZXcuaWRdID0gaGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICAvLyB4OiAwLFxuICAgICAgLy8geTogMCxcbiAgICAgIGV4dHJhLFxuICAgIH07XG4gIH1cblxuICBfcHJlUGFpbnQodmlldywgbm90Q2xpcCwgeyB4LCB5LCBoZWlnaHQsIHdpZHRoIH0pIHtcbiAgICAvLyDlvZPorr7nva7kuoYgcmlnaHQg5pe277yM6buY6K6kIGFsaWduIOeUqCByaWdodO+8jOWPjeS5i+eUqCBsZWZ0XG4gICAgLy8g5bmz56e755S75biDbGVmdC90b3BcbiAgICBjb25zdCBhbGlnbiA9IHZpZXcuY3NzICYmIHZpZXcuY3NzLmFsaWduID8gdmlldy5jc3MuYWxpZ24gOiAodmlldy5jc3MgJiYgdmlldy5jc3MucmlnaHQgPyAncmlnaHQnIDogJ2xlZnQnKTtcbiAgICBzd2l0Y2ggKGFsaWduKSB7XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh4LCB5ICsgaGVpZ2h0IC8gMik7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdyaWdodCc6XG4gICAgICB0aGlzLmN0eC50cmFuc2xhdGUoeCAtIHdpZHRoIC8gMiwgeSArIGhlaWdodCAvIDIpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh4ICsgd2lkdGggLyAyLCB5ICsgaGVpZ2h0IC8gMik7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gZGVidWdnZXI7XG4gICAgLy8g5peL6L2s6KeS5bqmXG4gICAgY29uc3QgYW5nbGUgPSB2aWV3LmNzcyAmJiB2aWV3LmNzcy5yb3RhdGUgPyB0aGlzLl9nZXRBbmdsZSh2aWV3LmNzcy5yb3RhdGUpIDogMDtcbiAgICB0aGlzLmN0eC5yb3RhdGUoYW5nbGUpO1xuICAgIC8vIOWchuinkuijgeWJqlxuICAgIGlmICghbm90Q2xpcCAmJiB2aWV3LmNzcyAmJiB2aWV3LmNzcy5ib3JkZXJSYWRpdXMgJiYgdmlldy50eXBlICE9PSAncmVjdCcpIHtcbiAgICAgIHRoaXMuX2RvQ2xpcCh2aWV3LmNzcy5ib3JkZXJSYWRpdXMsIHdpZHRoLCBoZWlnaHQsICEhdmlldy5jc3MuaXNPbmx5VXBIYWxmKTtcbiAgICB9XG4gICAgLy8g6Zi05b2xXG4gICAgdGhpcy5fZG9TaGFkb3codmlldyk7XG4gIH1cblxuICAvLyDnlLvmloflrZfnmoTog4zmma/lm77niYdcbiAgX2RvQmFja2dyb3VuZCh2aWV3KSB7XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIGNvbnN0IHsgaGVpZ2h0OiByYXdIZWlnaHQsIHdpZHRoOiByYXdXaWR0aCB9ID0gdmlldy5wcm9jZXNzZWRMb2NhdGlvbjtcbiAgICBjb25zdCB7IGNvbnRlbnRYOiB4LCBjb250ZW50WTogeSB9ID0gdmlldy5yZW5kZXJTdHlsZTtcblxuICAgIHRoaXMuX3ByZVBhaW50KHZpZXcsIHRydWUsIHtcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgd2lkdGg6IHJhd1dpZHRoLFxuICAgICAgaGVpZ2h0OiByYXdIZWlnaHQsXG4gICAgfSk7XG5cbiAgICBjb25zdCB7XG4gICAgICBiYWNrZ3JvdW5kLFxuICAgICAgcGFkZGluZyxcbiAgICB9ID0gdmlldy5jc3M7XG4gICAgbGV0IHBkID0gWzAsIDAsIDAsIDBdO1xuICAgIGlmIChwYWRkaW5nKSB7XG4gICAgICBjb25zdCBwZGcgPSBwYWRkaW5nLnNwbGl0KC9cXHMrLyk7XG4gICAgICBpZiAocGRnLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBjb25zdCB4ID0gcGRnWzBdLnRvUHgoKTtcbiAgICAgICAgcGQgPSBbeCwgeCwgeCwgeF07XG4gICAgICB9XG4gICAgICBpZiAocGRnLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBjb25zdCB4ID0gcGRnWzBdLnRvUHgoKTtcbiAgICAgICAgY29uc3QgeSA9IHBkZ1sxXS50b1B4KCk7XG4gICAgICAgIHBkID0gW3gsIHksIHgsIHldO1xuICAgICAgfVxuICAgICAgaWYgKHBkZy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgY29uc3QgeCA9IHBkZ1swXS50b1B4KCk7XG4gICAgICAgIGNvbnN0IHkgPSBwZGdbMV0udG9QeCgpO1xuICAgICAgICBjb25zdCB6ID0gcGRnWzJdLnRvUHgoKTtcbiAgICAgICAgcGQgPSBbeCwgeSwgeiwgeV07XG4gICAgICB9XG4gICAgICBpZiAocGRnLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICBjb25zdCB4ID0gcGRnWzBdLnRvUHgoKTtcbiAgICAgICAgY29uc3QgeSA9IHBkZ1sxXS50b1B4KCk7XG4gICAgICAgIGNvbnN0IHogPSBwZGdbMl0udG9QeCgpO1xuICAgICAgICBjb25zdCBhID0gcGRnWzNdLnRvUHgoKTtcbiAgICAgICAgcGQgPSBbeCwgeSwgeiwgYV07XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHdpZHRoID0gcmF3V2lkdGggKyBwZFsxXSArIHBkWzNdO1xuICAgIGNvbnN0IGhlaWdodCA9IHJhd0hlaWdodCArIHBkWzBdICsgcGRbMl07XG5cbiAgICB0aGlzLl9kb0NsaXAodmlldy5jc3MuYm9yZGVyUmFkaXVzLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAvLyBkZWJ1Z2dlcjtcbiAgICBpZiAoR0QuYXBpLmlzR3JhZGllbnQoYmFja2dyb3VuZCkpIHtcbiAgICAgIEdELmFwaS5kb0dyYWRpZW50KGJhY2tncm91bmQsIHdpZHRoLCBoZWlnaHQsIHRoaXMuY3R4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gJyNGRjYxNDYnO1xuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gYmFja2dyb3VuZDtcbiAgICB9XG4gICAgdGhpcy5jdHguZmlsbFJlY3QoLSh3aWR0aCAvIDIpLCAtKGhlaWdodCAvIDIpLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBfZHJhd0ltYWdlKHVybCwgLi4uYXJncykge1xuICAgIGNvbnN0IGltZyA9IHRoaXMuZGF0YS5fY2FudmFzLmNyZWF0ZUltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHVybDtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5jdHguZHJhd0ltYWdlLmFwcGx5KG51bGwsIFtpbWcsIC4uLmFyZ3NdKTtcbiAgICB9O1xuICB9XG5cbiAgX2RyYXdBYnNJbWFnZSh2aWV3KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghdmlldy51cmwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICBjb25zdCB7IGhlaWdodCwgd2lkdGggfSA9IHZpZXcucHJvY2Vzc2VkTG9jYXRpb247XG4gICAgICAgIC8vIGNvbnN0IHsgeCwgeSB9ID0gdmlldy5yZW5kZXJTdHlsZVxuICAgICAgICBjb25zdCB7IGNvbnRlbnRYOiB4LCBjb250ZW50WTogeSB9ID0gdmlldy5yZW5kZXJTdHlsZTtcblxuICAgICAgICB0aGlzLl9wcmVQYWludCh2aWV3LCBmYWxzZSwgeyB4LCB5LCBoZWlnaHQsIHdpZHRoIH0pO1xuXG4gICAgICAgIC8vIOiOt+W+l+e8qeaUvuWIsOWbvueJh+Wkp+Wwj+e6p+WIq+eahOijgeWHj+ahhlxuICAgICAgICBsZXQgcldpZHRoID0gdmlldy5zV2lkdGg7XG4gICAgICAgIGxldCBySGVpZ2h0ID0gdmlldy5zSGVpZ2h0O1xuICAgICAgICBsZXQgc3RhcnRYID0gMDtcbiAgICAgICAgbGV0IHN0YXJ0WSA9IDA7XG4gICAgICAgIC8vIGxldCBkU3RhcnRYID0gMFxuICAgICAgICAvLyBsZXQgZFN0YXJ0WSA9IDBcbiAgICAgICAgLy8g57uY55S75Yy65Z+f5q+U5L6LXG4gICAgICAgIGNvbnN0IGNwID0gd2lkdGggLyBoZWlnaHQ7XG4gICAgICAgIC8vIOWOn+WbvuavlOS+i1xuICAgICAgICBjb25zdCBvcCA9IHZpZXcuc1dpZHRoIC8gdmlldy5zSGVpZ2h0O1xuICAgICAgICBpZiAoY3AgPj0gb3ApIHtcbiAgICAgICAgICBySGVpZ2h0ID0gcldpZHRoIC8gY3A7XG4gICAgICAgICAgc3RhcnRZID0gTWF0aC5yb3VuZCgodmlldy5zSGVpZ2h0IC0gckhlaWdodCkgLyAyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByV2lkdGggPSBySGVpZ2h0ICogY3A7XG4gICAgICAgICAgc3RhcnRYID0gTWF0aC5yb3VuZCgodmlldy5zV2lkdGggLSByV2lkdGgpIC8gMik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpZXcuY3NzICYmIHZpZXcuY3NzLmFscGhhKSB7XG4gICAgICAgICAgdGhpcy5jdHguc2V0R2xvYmFsQWxwaGEodmlldy5jc3MuYWxwaGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpZXcuY3NzICYmIHZpZXcuY3NzLm1vZGUgPT09ICdzY2FsZVRvRmlsbCcpIHtcbiAgICAgICAgICBpZiAodGhpcy5kYXRhLmNhbml1c2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IHRoaXMuZGF0YS5fY2FudmFzLmNyZWF0ZUltYWdlKCk7XG4gICAgICAgICAgICBpbWcuc3JjID0gdmlldy51cmw7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoaW1nLCBzdGFydFgsIHN0YXJ0WSwgcldpZHRoLCBySGVpZ2h0LCAtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICAgIHRoaXMuX2RvQm9yZGVyKHZpZXcsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZHJhd0ltYWdlKHZpZXcudXJsLCAtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgICAgICAgICAgdGhpcy5fZG9Cb3JkZXIodmlldywgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5kYXRhLmNhbml1c2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGltZyA9IHRoaXMuZGF0YS5fY2FudmFzLmNyZWF0ZUltYWdlKCk7XG4gICAgICAgICAgICBpbWcuc3JjID0gdmlldy51cmw7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UoaW1nLCBzdGFydFgsIHN0YXJ0WSwgcldpZHRoLCBySGVpZ2h0LCAtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICAgIHRoaXMuX2RvQm9yZGVyKHZpZXcsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHZpZXcudXJsLCBzdGFydFgsIHN0YXJ0WSwgcldpZHRoLCBySGVpZ2h0LCAtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgICAgICAgICAgdGhpcy5fZG9Cb3JkZXIodmlldywgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgX2ZpbGxBYnNUZXh0KHZpZXcpIHtcbiAgICBpZiAoIXZpZXcudGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodmlldy5jc3MuYmFja2dyb3VuZCkge1xuICAgICAgLy8g55Sf5oiQ6IOM5pmvXG4gICAgICB0aGlzLl9kb0JhY2tncm91bmQodmlldyk7XG4gICAgfVxuICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICBjb25zdCBmb250V2VpZ2h0ID0gdmlldy5jc3MuZm9udFdlaWdodCA9PT0gJ2JvbGQnID8gJ2JvbGQnIDogJ25vcm1hbCc7XG4gICAgdmlldy5jc3MuZm9udFNpemUgPSB2aWV3LmNzcy5mb250U2l6ZSA/IHZpZXcuY3NzLmZvbnRTaXplIDogJzIwcnB4JztcbiAgICB0aGlzLmN0eC5mb250ID0gYG5vcm1hbCAke2ZvbnRXZWlnaHR9ICR7dmlldy5jc3MuZm9udFNpemUudG9QeCgpfXB4ICR7dmlldy5jc3MuZm9udEZhbWlseSA/IGBcIiR7dmlldy5jc3MuZm9udEZhbWlseX1cImAgOiAnc2Fucy1zZXJpZid9YDtcbiAgICBjb25zdCB7IGhlaWdodCwgd2lkdGgsIGV4dHJhIH0gPSB2aWV3LnByb2Nlc3NlZExvY2F0aW9uO1xuICAgIC8vIGNvbnN0IHsgeCwgeSB9ID0gdmlldy5yZW5kZXJTdHlsZVxuICAgIGNvbnN0IHsgY29udGVudFg6IHgsIGNvbnRlbnRZOiB5IH0gPSB2aWV3LnJlbmRlclN0eWxlO1xuXG4gICAgdGhpcy5fcHJlUGFpbnQodmlldywgdmlldy5jc3MuYmFja2dyb3VuZCAmJiB2aWV3LmNzcy5ib3JkZXJSYWRpdXMsIHsgeCwgeSwgaGVpZ2h0LCB3aWR0aCB9KTtcblxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICh2aWV3LmNzcy5jb2xvciB8fCAnYmxhY2snKTtcbiAgICBjb25zdCB7XG4gICAgICBsaW5lcyxcbiAgICAgIGxpbmVIZWlnaHQsXG4gICAgICB0ZXh0QXJyYXksXG4gICAgICBsaW5lc0FycmF5LFxuICAgIH0gPSBleHRyYTtcbiAgICAvLyBkZWJ1Z2dlclxuXG4gICAgbGV0IGxpbmVJbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCB0ZXh0QXJyYXkubGVuZ3RoOyArK2opIHtcbiAgICAgIGNvbnN0IHByZUxpbmVMZW5ndGggPSBNYXRoLnJvdW5kKHRleHRBcnJheVtqXS5sZW5ndGggLyBsaW5lc0FycmF5W2pdKTtcbiAgICAgIGxldCBzdGFydCA9IDA7XG4gICAgICBsZXQgYWxyZWFkeUNvdW50ID0gMDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXNBcnJheVtqXTsgKytpKSB7XG4gICAgICAgIC8vIOe7mOWItuihjOaVsOWkp+S6juacgOWkp+ihjOaVsO+8jOWImeebtOaOpei3s+WHuuW+queOr1xuICAgICAgICBpZiAobGluZUluZGV4ID49IGxpbmVzKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYWxyZWFkeUNvdW50ID0gcHJlTGluZUxlbmd0aDtcbiAgICAgICAgbGV0IHRleHQgPSB0ZXh0QXJyYXlbal0uc3Vic3RyKHN0YXJ0LCBhbHJlYWR5Q291bnQpO1xuICAgICAgICBsZXQgbWVhc3VyZWRXaXRoID0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGg7XG4gICAgICAgIC8vIOWmguaenOa1i+mHj+Wkp+Wwj+Wwj+S6jndpZHRo5LiA5Liq5a2X56ym55qE5aSn5bCP77yM5YiZ6L+b6KGM6KGl6b2Q77yM5aaC5p6c5rWL6YeP5aSn5bCP6LaF5Ye6IHdpZHRo77yM5YiZ6L+b6KGM5YeP6ZmkXG4gICAgICAgIC8vIOWmguaenOW3sue7j+WIsOaWh+acrOacq+Wwvu+8jOS5n+S4jeimgei/m+ihjOivpeW+queOr1xuICAgICAgICB3aGlsZSAoKHN0YXJ0ICsgYWxyZWFkeUNvdW50IDw9IHRleHRBcnJheVtqXS5sZW5ndGgpICYmICh3aWR0aCAtIG1lYXN1cmVkV2l0aCA+IHZpZXcuY3NzLmZvbnRTaXplLnRvUHgoKSB8fCBtZWFzdXJlZFdpdGggPiB3aWR0aCkpIHtcbiAgICAgICAgICBpZiAobWVhc3VyZWRXaXRoIDwgd2lkdGgpIHtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0QXJyYXlbal0uc3Vic3RyKHN0YXJ0LCArK2FscmVhZHlDb3VudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgIC8vIOWmguaenOWPquacieS4gOS4quWtl+espuaXtu+8jOebtOaOpei3s+WHuuW+queOr1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHQgPSB0ZXh0QXJyYXlbal0uc3Vic3RyKHN0YXJ0LCAtLWFscmVhZHlDb3VudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1lYXN1cmVkV2l0aCA9IHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHN0YXJ0ICs9IHRleHQubGVuZ3RoO1xuICAgICAgICAvLyDlpoLmnpzmmK/mnIDlkI7kuIDooYzkuobvvIzlj5HnjrDov5jmnInmnKrnu5jliLblroznmoTlhoXlrrnvvIzliJnliqAuLi5cbiAgICAgICAgaWYgKGxpbmVJbmRleCA9PT0gbGluZXMgLSAxICYmIChqIDwgdGV4dEFycmF5Lmxlbmd0aCAtIDEgfHwgc3RhcnQgPCB0ZXh0QXJyYXlbal0ubGVuZ3RoKSkge1xuICAgICAgICAgIHdoaWxlICh0aGlzLmN0eC5tZWFzdXJlVGV4dChgJHt0ZXh0fS4uLmApLndpZHRoID4gd2lkdGgpIHtcbiAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgIC8vIOWmguaenOWPquacieS4gOS4quWtl+espuaXtu+8jOebtOaOpei3s+WHuuW+queOr1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCB0ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0ZXh0ICs9ICcuLi4nO1xuICAgICAgICAgIG1lYXN1cmVkV2l0aCA9IHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHQpLndpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGF0YS5jYW5pdXNlKSB7XG4gICAgICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gdmlldy5jc3MudGV4dEFsaWduID8gdmlldy5jc3MudGV4dEFsaWduIDogJ2xlZnQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3R4LnNldFRleHRBbGlnbih2aWV3LmNzcy50ZXh0QWxpZ24gPyB2aWV3LmNzcy50ZXh0QWxpZ24gOiAnbGVmdCcpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB4O1xuICAgICAgICBzd2l0Y2ggKHZpZXcuY3NzLnRleHRBbGlnbikge1xuICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgIHggPSAwO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgeCA9ICh3aWR0aCAvIDIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHggPSAtKHdpZHRoIC8gMik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeSA9IC0oaGVpZ2h0IC8gMikgKyAobGluZUluZGV4ID09PSAwID8gdmlldy5jc3MuZm9udFNpemUudG9QeCgpIDogKHZpZXcuY3NzLmZvbnRTaXplLnRvUHgoKSArIGxpbmVJbmRleCAqIGxpbmVIZWlnaHQpKTtcbiAgICAgICAgbGluZUluZGV4Kys7XG4gICAgICAgIGlmICh2aWV3LmNzcy50ZXh0U3R5bGUgPT09ICdzdHJva2UnKSB7XG4gICAgICAgICAgdGhpcy5jdHguc3Ryb2tlVGV4dCh0ZXh0LCB4LCB5LCBtZWFzdXJlZFdpdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KHRleHQsIHgsIHksIG1lYXN1cmVkV2l0aCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZm9udFNpemUgPSB2aWV3LmNzcy5mb250U2l6ZS50b1B4KCk7XG4gICAgICAgIGlmICh2aWV3LmNzcy50ZXh0RGVjb3JhdGlvbikge1xuICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgIGlmICgvXFxidW5kZXJsaW5lXFxiLy50ZXN0KHZpZXcuY3NzLnRleHREZWNvcmF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHggKyBtZWFzdXJlZFdpdGgsIHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoL1xcYm92ZXJsaW5lXFxiLy50ZXN0KHZpZXcuY3NzLnRleHREZWNvcmF0aW9uKSkge1xuICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHgsIHkgLSBmb250U2l6ZSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCArIG1lYXN1cmVkV2l0aCwgeSAtIGZvbnRTaXplKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKC9cXGJsaW5lLXRocm91Z2hcXGIvLnRlc3Qodmlldy5jc3MudGV4dERlY29yYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSAtIGZvbnRTaXplIC8gMyk7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCArIG1lYXN1cmVkV2l0aCwgeSAtIGZvbnRTaXplIC8gMyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gdmlldy5jc3MuY29sb3I7XG4gICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgIHRoaXMuX2RvQm9yZGVyKHZpZXcsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgX2RyYXdBYnNSZWN0KHZpZXcpIHtcbiAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgY29uc3QgeyBoZWlnaHQsIHdpZHRoIH0gPSB2aWV3LnByb2Nlc3NlZExvY2F0aW9uO1xuICAgIC8vIGNvbnN0IHsgeCwgeSB9ID0gdmlldy5yZW5kZXJTdHlsZVxuICAgIGNvbnN0IHsgY29udGVudFg6IHgsIGNvbnRlbnRZOiB5IH0gPSB2aWV3LnJlbmRlclN0eWxlO1xuXG4gICAgdGhpcy5fcHJlUGFpbnQodmlldywgZmFsc2UsIHsgeCwgeSwgaGVpZ2h0LCB3aWR0aCB9KTtcblxuICAgIGlmIChHRC5hcGkuaXNHcmFkaWVudCh2aWV3LmNzcy5jb2xvcikpIHtcbiAgICAgIEdELmFwaS5kb0dyYWRpZW50KHZpZXcuY3NzLmNvbG9yLCB3aWR0aCwgaGVpZ2h0LCB0aGlzLmN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHZpZXcuY3NzLmNvbG9yO1xuICAgIH1cbiAgICBjb25zdCBib3JkZXJSYWRpdXMgPSB2aWV3LmNzcy5ib3JkZXJSYWRpdXM7XG4gICAgY29uc3QgciA9IGJvcmRlclJhZGl1cyA/IE1hdGgubWluKGJvcmRlclJhZGl1cy50b1B4KCksIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMikgOiAwO1xuICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuY3R4LmFyYygtd2lkdGggLyAyICsgciwgLWhlaWdodCAvIDIgKyByLCByLCAxICogTWF0aC5QSSwgMS41ICogTWF0aC5QSSk7IC8vIOW3puS4iuinkuWchuW8p1xuICAgIHRoaXMuY3R4LmxpbmVUbyh3aWR0aCAvIDIgLSByLCAtaGVpZ2h0IC8gMik7XG4gICAgdGhpcy5jdHguYXJjKHdpZHRoIC8gMiAtIHIsIC1oZWlnaHQgLyAyICsgciwgciwgMS41ICogTWF0aC5QSSwgMiAqIE1hdGguUEkpOyAvLyDlj7PkuIrop5LlnIblvKdcbiAgICB0aGlzLmN0eC5saW5lVG8od2lkdGggLyAyLCBoZWlnaHQgLyAyIC0gcik7XG4gICAgdGhpcy5jdHguYXJjKHdpZHRoIC8gMiAtIHIsIGhlaWdodCAvIDIgLSByLCByLCAwLCAwLjUgKiBNYXRoLlBJKTsgLy8g5Y+z5LiL6KeS5ZyG5bynXG4gICAgdGhpcy5jdHgubGluZVRvKC13aWR0aCAvIDIgKyByLCBoZWlnaHQgLyAyKTtcbiAgICB0aGlzLmN0eC5hcmMoLXdpZHRoIC8gMiArIHIsIGhlaWdodCAvIDIgLSByLCByLCAwLjUgKiBNYXRoLlBJLCAxICogTWF0aC5QSSk7IC8vIOW3puS4i+inkuWchuW8p1xuICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgdGhpcy5fZG9Cb3JkZXIodmlldywgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICAvLyBzaGFkb3cg5pSv5oyBICh4LCB5LCBibHVyLCBjb2xvciksIOS4jeaUr+aMgSBzcHJlYWRcbiAgLy8gc2hhZG93OjBweCAwcHggMTBweCByZ2JhKDAsMCwwLDAuMSk7XG4gIF9kb1NoYWRvdyh2aWV3KSB7XG4gICAgaWYgKCF2aWV3LmNzcyB8fCAhdmlldy5jc3Muc2hhZG93KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJveCA9IHZpZXcuY3NzLnNoYWRvdy5yZXBsYWNlKC8sXFxzKy9nLCAnLCcpLnNwbGl0KCcgJyk7XG4gICAgaWYgKGJveC5sZW5ndGggPiA0KSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdzaGFkb3cgZG9uXFwndCBzcHJlYWQgb3B0aW9uJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3R4LnNoYWRvd09mZnNldFggPSBwYXJzZUludChib3hbMF0sIDEwKTtcbiAgICB0aGlzLmN0eC5zaGFkb3dPZmZzZXRZID0gcGFyc2VJbnQoYm94WzFdLCAxMCk7XG4gICAgdGhpcy5jdHguc2hhZG93Qmx1ciA9IHBhcnNlSW50KGJveFsyXSwgMTApO1xuICAgIHRoaXMuY3R4LnNoYWRvd0NvbG9yID0gYm94WzNdO1xuICB9XG5cbiAgX2dldEFuZ2xlKGFuZ2xlKSB7XG4gICAgcmV0dXJuIE51bWJlcihhbmdsZSkgKiBNYXRoLlBJIC8gMTgwO1xuICB9XG59XG4iXX0=