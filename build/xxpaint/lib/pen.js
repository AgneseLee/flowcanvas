"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _i, _a, view;
            return tslib_1.__generator(this, function (_b) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rr, tplTo1, nodes;
            return tslib_1.__generator(this, function (_a) {
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
            var _a = tslib_1.__assign(tslib_1.__assign({}, defaultPaddingMargin), bfsNodes[i].css), paddingLeft = _a.paddingLeft, marginLeft = _a.marginLeft, paddingTop = _a.paddingTop, marginTop = _a.marginTop;
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
            var _a = tslib_1.__assign(tslib_1.__assign({}, defaultPaddingMargin), vnode.css), paddingLeft = _a.paddingLeft, marginLeft = _a.marginLeft, paddingTop = _a.paddingTop, marginTop = _a.marginTop;
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
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
            _this.ctx.drawImage.apply(null, tslib_1.__spreadArrays([img], args));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3h4cGFpbnQvbGliL3Blbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSwrQkFBa0Y7QUFHbEYsaUNBQW9EO0FBQ3BELCtCQUE2QztBQUM3QyxtQ0FBeUQ7QUFDekQsK0JBQXFDO0FBQ3JDLGlDQUF5QztBQUV6QyxJQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFcEMsSUFBTSxvQkFBb0IsR0FBRztJQUMzQixVQUFVLEVBQUUsQ0FBQztJQUNiLGFBQWEsRUFBRSxDQUFDO0lBQ2hCLFdBQVcsRUFBRSxDQUFDO0lBQ2QsWUFBWSxFQUFFLENBQUM7SUFDZixVQUFVLEVBQUUsQ0FBQztJQUNiLFdBQVcsRUFBRSxDQUFDO0lBQ2QsU0FBUyxFQUFFLENBQUM7SUFDWixZQUFZLEVBQUUsQ0FBQztDQUNoQixDQUFDO0FBRUY7SUFDRSxpQkFBWSxHQUFHLEVBQUUsSUFBSTtRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBRXpCLENBQUM7SUFFSyw2QkFBVyxHQUFqQjs7Ozs0QkFFRSxXQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQTs7d0JBQTFCLFNBQTBCLENBQUM7d0JBSTNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEMsV0FBTyxJQUFJLENBQUMsSUFBSSxFQUFDOzs7O0tBQ2xCO0lBRUssdUJBQUssR0FBWCxVQUFZLFFBQVE7Ozs7Ozt3QkFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRzs0QkFDWCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7NEJBQzdDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTt5QkFDaEQsQ0FBQzs4QkFJZ0MsRUFBZixLQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSzs7OzZCQUFmLENBQUEsY0FBZSxDQUFBO3dCQUF2QixJQUFJO3dCQUNiLFdBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQTlCLFNBQThCLENBQUM7Ozt3QkFEZCxJQUFlLENBQUE7Ozt3QkFJbEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTs0QkFDckIsUUFBUSxFQUFFLENBQUM7eUJBQ1o7NkJBQU07NEJBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dDQUNuQixRQUFRLEVBQUUsQ0FBQzs0QkFDYixDQUFDLENBQUMsQ0FBQzt5QkFDSjs7Ozs7S0FDRjtJQUVLLCtCQUFhLEdBQW5COzs7Ozs7d0JBSVEsRUFBRSxHQUFHLGtCQUFVLENBQUMsV0FBSSxFQUFFLFlBQUssQ0FBQyxDQUFDO3dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNyQixNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFFekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBRzVCLFdBQU0sc0JBQWMsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTVCLFNBQTRCLENBQUM7d0JBRzdCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBRzFDLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Ozs7O0tBQ3pCO0lBRUQsd0NBQXNCLEdBQXRCLFVBQXVCLFFBQVE7UUFDN0IsSUFBTSxlQUFlLEdBQUcsOEJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFMUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFFL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hELElBQUEsS0FBK0MsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUExRSxXQUFXLFdBQUEsRUFBVSxZQUFZLFlBQXlDLENBQUM7Z0JBQzFGLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFBQyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsSUFDbkMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFFbEIsSUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7Z0JBQ25ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN4QyxJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO29CQUN2RCxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDO29CQUN6RCxJQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5RixJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0YsSUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hGLElBQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUUzRixJQUFNLE1BQU0sR0FBRyxVQUFVLEdBQUcsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO29CQUMvRCxJQUFNLE1BQU0sR0FBRyxXQUFXLEdBQUcsY0FBYyxHQUFHLGVBQWUsQ0FBQztvQkFFOUQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDO29CQUN2QyxJQUFJLENBQUMsT0FBTyxFQUFFO3dCQUVaLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUVyQixJQUFJLFFBQVEsSUFBSSxXQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFFdEMsT0FBTyxHQUFHLElBQUksQ0FBQzs0QkFDZixTQUFTLElBQUksTUFBTSxDQUFDO3lCQUNyQjs2QkFBTSxJQUFJLFFBQVEsR0FBRyxXQUFXLEVBQUU7NEJBQ2pDLE9BQU8sR0FBRyxJQUFJLENBQUM7NEJBQ2YsU0FBUyxJQUFJLE1BQU0sQ0FBQzt5QkFDckI7NkJBQU0sSUFBSSxRQUFRLEdBQUcsV0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQzVDLE9BQU8sR0FBRyxLQUFLLENBQUM7NEJBQ2hCLFNBQVMsSUFBSSxNQUFNLENBQUM7eUJBQ3JCO3FCQUNGO3lCQUFNO3dCQUVMLFNBQVMsSUFBSSxNQUFNLENBQUM7d0JBQ3BCLE9BQU8sR0FBRyxLQUFLLENBQUM7d0JBQ2hCLFFBQVEsR0FBRyxDQUFDLENBQUM7cUJBRWQ7aUJBQ0Y7Z0JBQ0QsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9HLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFEO2lCQUFNLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBR3hDLElBQUEsS0FBK0MsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUExRSxXQUFXLFdBQUEsRUFBVSxZQUFZLFlBQXlDLENBQUM7Z0JBSzFGLElBQU0sWUFBWSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUM7Z0JBRXBDLElBQUksWUFBWSxFQUFFO29CQUVoQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7b0JBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO29CQUFDLElBQ25DLE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBQ2xCLElBQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO29CQUNuRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDeEMsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQzt3QkFDdkQsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQzt3QkFDekQsSUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUYsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNGLElBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4RixJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0YsSUFBTSxNQUFNLEdBQUcsVUFBVSxHQUFHLGdCQUFnQixHQUFHLGVBQWUsQ0FBQzt3QkFDL0QsSUFBTSxNQUFNLEdBQUcsV0FBVyxHQUFHLGNBQWMsR0FBRyxlQUFlLENBQUM7d0JBQzlELElBQUksQ0FBQyxPQUFPLEVBQUU7NEJBRVosUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBRXJCLElBQUksUUFBUSxJQUFJLFdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dDQUV0QyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dDQUNmLFNBQVMsSUFBSSxNQUFNLENBQUM7NkJBQ3JCO2lDQUFNLElBQUksUUFBUSxHQUFHLFdBQVcsRUFBRTtnQ0FDakMsT0FBTyxHQUFHLElBQUksQ0FBQztnQ0FDZixTQUFTLElBQUksTUFBTSxDQUFDOzZCQUNyQjtpQ0FBTSxJQUFJLFFBQVEsR0FBRyxXQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQ0FDNUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQ0FDaEIsU0FBUyxJQUFJLE1BQU0sQ0FBQzs2QkFDckI7NEJBQ0QsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ2hIOzZCQUFNOzRCQUVMLFNBQVMsSUFBSSxNQUFNLENBQUM7NEJBQ3BCLE9BQU8sR0FBRyxLQUFLLENBQUM7NEJBQ2hCLFFBQVEsR0FBRyxDQUFDLENBQUM7NEJBQ2IsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7eUJBQ2hIO3FCQUNGO2lCQUNGO3FCQUFNO2lCQUlOO2FBQ0Y7U0FDRjtRQUdELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxxQ0FBbUIsR0FBbkIsVUFBb0IsUUFBUTtRQUMxQixJQUFNLFFBQVEsR0FBRyx5QkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzVCLElBQUEsMkNBQTBELG9CQUFvQixHQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsRUFBbEcsV0FBVyxpQkFBQSxFQUFFLFVBQVUsZ0JBQUEsRUFBRSxVQUFVLGdCQUFBLEVBQUUsU0FBUyxlQUFvRCxDQUFDO1lBQzNHLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBRztvQkFDeEIsQ0FBQyxFQUFFLENBQUM7b0JBQ0osQ0FBQyxFQUFFLENBQUM7b0JBQ0osUUFBUSxFQUFFLGtCQUFXLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsa0JBQVcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7b0JBQ3RILFFBQVEsRUFBRSxrQkFBVyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxHQUFHLGtCQUFXLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDO2lCQUN2SCxDQUFDO2dCQUNGLFNBQVM7YUFDVjtZQUNELElBQU0sT0FBTyxHQUFHLHdCQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7U0EyQnhDO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELDZCQUFXLEdBQVgsVUFBWSxLQUFLLEVBQUUsWUFBWTtRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUU1QixJQUFBLDJDQUEwRCxvQkFBb0IsR0FBSyxLQUFLLENBQUMsR0FBRyxDQUFFLEVBQTVGLFdBQVcsaUJBQUEsRUFBRSxVQUFVLGdCQUFBLEVBQUUsVUFBVSxnQkFBQSxFQUFFLFNBQVMsZUFBOEMsQ0FBQztZQUdyRyxJQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDNUMsSUFBTSxDQUFDLEdBQUcscUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcscUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDN0QsSUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLENBQUMsR0FBQTtnQkFDRCxDQUFDLEdBQUE7Z0JBR0QsUUFBUSxFQUFFLENBQUMsR0FBRyxrQkFBVyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLGtCQUFXLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO2dCQUM5RyxRQUFRLEVBQUUsQ0FBQyxHQUFHLGtCQUFXLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEdBQUcsa0JBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7YUFDL0csQ0FBQztZQUNGLEtBQUssQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1NBQ2pDO2FBQU07WUFFTCwwQkFBbUIsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBbUNELDRCQUFVLEdBQVY7UUFDRSxJQUFNLFVBQVUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWpELElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osVUFBVSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDckIsR0FBRyxFQUFFLENBQUM7UUFFTixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkQsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNyQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLEdBQUcsRUFBRSxDQUFDO1lBQ04sS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hDOztZQUVDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7b0JBQ3RCLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO29CQUNaLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDbkIsR0FBRyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqRDs7UUFUSCxPQUFPLEtBQUssQ0FBQyxNQUFNOztTQVVsQjtJQUNILENBQUM7SUFHRCw0QkFBVSxHQUFWO1FBQ0UsSUFBTSxJQUFJLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzQyxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQ2pCLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNqQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUV6QixJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDL0IsSUFBSSxRQUFRLEVBQUU7b0JBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3pCO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFRCwrQkFBYSxHQUFiLFVBQWMsSUFBSTtRQUVoQixJQUFJLElBQUksQ0FBQztRQUNULFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNuQixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLE1BQU07WUFDUixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzVFLE1BQU07WUFDUixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1A7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUtELDZCQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1YsSUFBQSxLQUdGLElBQUksQ0FBQyxLQUFLLEVBRlosS0FBSyxXQUFBLEVBQ0wsTUFBTSxZQUNNLENBQUM7UUFFZixJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsRUFBRSxFQUFFO1lBRVAsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1lBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDL0Q7YUFBTSxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLEtBQUssYUFBYSxFQUFFO1lBRTVGLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQy9EO2FBQU0sSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNoQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMvRDthQUFNO1lBSUwsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVLLCtCQUFhLEdBQW5CLFVBQW9CLElBQUk7Ozs7Ozt3QkFDdEIsSUFBSSxDQUFDLElBQUksRUFBRTs0QkFDVCxXQUFPO3lCQUNSO3dCQU1PLEtBQUEsSUFBSSxDQUFDLElBQUksQ0FBQTs7aUNBQ1osT0FBTyxDQUFDLENBQVIsY0FBTztpQ0FHUCxNQUFNLENBQUMsQ0FBUCxjQUFNO2lDQUdOLE1BQU0sQ0FBQyxDQUFQLGNBQU07aUNBR04sT0FBTyxDQUFDLENBQVIsY0FBTzs7OzRCQVJWLFdBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQTs7d0JBQTlCLFNBQThCLENBQUM7d0JBQy9CLGNBQU07O3dCQUVOLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hCLGNBQU07O3dCQUVOLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hCLGNBQU07O3dCQUVOLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hCLGNBQU07NEJBRU4sY0FBTTs7Ozs7S0FFVDtJQUtELHlCQUFPLEdBQVAsVUFBUSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFvQjtRQUFwQiw2QkFBQSxFQUFBLG9CQUFvQjtRQUV2RCxJQUFJLFlBQVksSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQ25DLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRy9ELElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUU1RSxJQUFJLFlBQVksRUFBRTtnQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDekM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzdFO1lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRVYsSUFBQSxLQUF3QixFQUFFLENBQUMsaUJBQWlCLEVBQUUsRUFBNUMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUEyQixDQUFDO1lBRXJELElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLElBQUksUUFBUSxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pCO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUtELDJCQUFTLEdBQVQsVUFBVSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU07UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPO1NBQ1I7UUFDSyxJQUFBLEtBSUYsSUFBSSxDQUFDLEdBQUcsRUFIVixZQUFZLGtCQUFBLEVBQ1osV0FBVyxpQkFBQSxFQUNYLFdBQVcsaUJBQ0QsQ0FBQztRQUNiLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVWLElBQUEsS0FBeUMsSUFBSSxDQUFDLGlCQUFpQixFQUFyRCxTQUFTLFlBQUEsRUFBUyxRQUFRLFdBQTJCLENBQUM7UUFDaEUsSUFBQSxLQUFXLElBQUksQ0FBQyxXQUFXLEVBQXpCLENBQUMsT0FBQSxFQUFFLENBQUMsT0FBcUIsQ0FBQztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUEsRUFBRSxDQUFDLEdBQUEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRXpFLElBQUksQ0FBQyxDQUFDO1FBQ04sSUFBSSxZQUFZLEVBQUU7WUFDaEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzFEO2FBQU07WUFDTCxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ1A7UUFDRCxJQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQWVELDZCQUFXLEdBQVgsVUFBWSxJQUFJLEVBQUUsT0FB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LElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUQ7YUFBTTtZQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1NBQ3JDO1FBQ0QsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDM0MsSUFBTSxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBSUQsMkJBQVMsR0FBVCxVQUFVLElBQUk7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ2pDLE9BQU87U0FDUjtRQUNELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdELElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQzdDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsMkJBQVMsR0FBVCxVQUFVLEtBQUs7UUFDYixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUN2QyxDQUFDO0lBQ0gsY0FBQztBQUFELENBQUMsQUE5K0JELElBOCtCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlICovXG4vLyBpbXBvcnQgRG93bmxvYWRlciBmcm9tICcuL2Rvd25sb2FkZXInO1xuLy8gaW1wb3J0IFRyZWVOb2RlIGZyb20gJy4vdHJlZU5vZGUnXG5pbXBvcnQgeyBicmVhZHRoRmlyc3RTZWFyY2hSaWdodCwgYnJlYWR0aEZpcnN0U2VhcmNoLCBmb3JtYXRUb051bSB9IGZyb20gJy4vdXRpbCc7XG4vLyBjb25zdCBNb2RpZmllciA9IHJlcXVpcmUoJy4vbW9kaWZpZXInKS5kZWZhdWx0O1xuLy8gY29uc3QgZG93bmxvYWRlciA9IG5ldyBEb3dubG9hZGVyKCk7XG5pbXBvcnQgeyBpbml0Vm5vZGVUcmVlLCB4bWxUb1Zub2RlIH0gZnJvbSAnLi92bm9kZSc7XG5pbXBvcnQgeyBpbnNlcnRWbm9kZUludG9MaW5lIH0gZnJvbSAnLi9saW5lJztcbmltcG9ydCB7IGdldElzQ2hhbmdlTGluZSwgZ2V0UHJlTGF5b3V0IH0gZnJvbSAnLi9sYXlvdXQnO1xuaW1wb3J0IHsgd3htbCwgc3R5bGUgfSBmcm9tICcuL2h0bWwnO1xuaW1wb3J0IHsgZG93bmxvYWRJbWFnZXMgfSBmcm9tICcuL2ltYWdlJztcblxuY29uc3QgR0QgPSByZXF1aXJlKCcuL2dyYWRpZW50LmpzJyk7XG5cbmNvbnN0IGRlZmF1bHRQYWRkaW5nTWFyZ2luID0ge1xuICBwYWRkaW5nVG9wOiAwLFxuICBwYWRkaW5nQm90dG9tOiAwLFxuICBwYWRkaW5nTGVmdDogMCxcbiAgcGFkZGluZ1JpZ2h0OiAwLFxuICBtYXJnaW5MZWZ0OiAwLFxuICBtYXJnaW5SaWdodDogMCxcbiAgbWFyZ2luVG9wOiAwLFxuICBtYXJnaW5Cb3R0b206IDAsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWludGVyIHtcbiAgY29uc3RydWN0b3IoY3R4LCBkYXRhKSB7XG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLmdsb2JhbFdpZHRoID0ge307XG4gICAgdGhpcy5nbG9iYWxIZWlnaHQgPSB7fTtcbiAgICAvLyB0aGlzLl9wcmVQcm9jZXNzZWQgPSB7fTsgLy8g6aKE5aSE55CG6K6h566X5Ye655qE5q+P5Liq5YWD57Sg55qE5L2N572uXG4gIH1cblxuICBhc3luYyBiZWZvcmVQYWludCgpIHtcbiAgICAvLyDku45u57qn6L2s5o2i5oiQ5LiA57qnanNvbuaooeadv1xuICAgIGF3YWl0IHRoaXMudHJhbnNmb3JtTlRvMSgpO1xuXG4gICAgLy8g5byA5aeL57un5om/Y3NzXG5cbiAgICBjb25zb2xlLmxvZygnZWVlZWVlZWVlZSAnLCB0aGlzLmRhdGEpO1xuICAgIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cblxuICBhc3luYyBwYWludChjYWxsYmFjaykge1xuICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICB3aWR0aDogdGhpcy5kYXRhLmNoaWxkcmVuWzBdLmNzcy53aWR0aC50b1B4KCksXG4gICAgICBoZWlnaHQ6IHRoaXMuZGF0YS5jaGlsZHJlblswXS5jc3MuaGVpZ2h0LnRvUHgoKSxcbiAgICB9O1xuXG4gICAgLy8gdGhpcy5fYmFja2dyb3VuZCgpO1xuICAgIC8vIOW8gOWni+eUu1xuICAgIGZvciAoY29uc3QgdmlldyBvZiB0aGlzLmRhdGEudmlld3MpIHtcbiAgICAgIGF3YWl0IHRoaXMuX2RyYXdBYnNvbHV0ZSh2aWV3KTtcbiAgICAgIC8vIGRlYnVnZ2VyO1xuICAgIH1cbiAgICBpZiAodGhpcy5kYXRhLmNhbml1c2UpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3R4LmRyYXcoZmFsc2UsICgpID0+IHtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHRyYW5zZm9ybU5UbzEoKSB7XG4gICAgLy8gdGhpcy5kYXRhXG4gICAgLy8gZGVidWdnZXJcbiAgICAvLyBpbml0Vm5vZGVUcmVlKHRoaXMuZGF0YSlcbiAgICBjb25zdCByciA9IHhtbFRvVm5vZGUod3htbCwgc3R5bGUpO1xuICAgIGNvbnNvbGUubG9nKCcqKiAnLCBycik7XG4gICAgdGhpcy5kYXRhLmNoaWxkcmVuWzBdID0gcnI7XG4gICAgY29uc3QgdHBsVG8xID0gdGhpcy5kYXRhO1xuICAgIC8vIGRlYnVnZ2VyXG4gICAgY29uc29sZS5sb2coJy0tLSAnLCB0cGxUbzEpO1xuXG4gICAgLy8g5LiL6L295omA5pyJ55So5Yiw55qE5Zu+54mHXG4gICAgYXdhaXQgZG93bmxvYWRJbWFnZXModHBsVG8xKTtcblxuICAgIC8vIOiuoeeul+avj+S4quiKgueCueeahOWuvemrmFxuICAgIHRoaXMuY2FsY0VsZW1lbnRXaWR0aEhlaWdodCh0cGxUbzEuY2hpbGRyZW5bMF0pO1xuXG4gICAgLy8g6K6h566X5q+P5Liq6IqC54K55L2N572uXG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLmNhbGNFbGVtZW50UG9zaXRpb24odHBsVG8xLmNoaWxkcmVuWzBdKTtcbiAgICB0aGlzLmRhdGEudmlld3MgPSBub2RlcztcbiAgfVxuXG4gIGNhbGNFbGVtZW50V2lkdGhIZWlnaHQocm9vdE5vZGUpIHtcbiAgICBjb25zdCByZXZlcnNlQmZzTm9kZXMgPSBicmVhZHRoRmlyc3RTZWFyY2hSaWdodChyb290Tm9kZSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJldmVyc2VCZnNOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gbGV0IHdpZHRoU3VtID0gMCwgaGVpZ2h0U3VtID0gMCwgaXNMaW5lcyA9IGZhbHNlXG4gICAgICB0aGlzLnByZVByb2Nlc3NPYmoocmV2ZXJzZUJmc05vZGVzW2ldKTtcbiAgICAgIC8vIGlubGluZS1ibG9ja+WuvemrmOmdoOWtkOiKgueCueaSkeWkp1xuICAgICAgaWYgKFsndmlldycsICdyZWN0J10uaW5jbHVkZXMocmV2ZXJzZUJmc05vZGVzW2ldLnR5cGUpKSB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGg6IHBhcmVudFdpZHRoLCBoZWlnaHQ6IHBhcmVudEhlaWdodCB9ID0gcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uO1xuICAgICAgICBsZXQgd2lkdGhTdW0gPSAwOyBsZXQgaGVpZ2h0U3VtID0gMDsgbGV0XG4gICAgICAgICAgaXNMaW5lcyA9IGZhbHNlO1xuICAgICAgICAvLyBkZWJ1Z2dlclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHJldmVyc2VCZnNOb2Rlc1tpXS5jaGlsZHJlbiB8fCBbXTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGNvbnN0IGNoaWxkV2lkdGggPSBjaGlsZHJlbltqXS5wcm9jZXNzZWRMb2NhdGlvbi53aWR0aDtcbiAgICAgICAgICBjb25zdCBjaGlsZEhlaWdodCA9IGNoaWxkcmVuW2pdLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodDtcbiAgICAgICAgICBjb25zdCBjaGlsZFBhZGRpbmdMZWZ0ID0gY2hpbGRyZW5bal0uY3NzLnBhZGRpbmdMZWZ0ID8gY2hpbGRyZW5bal0uY3NzLnBhZGRpbmdMZWZ0LnRvUHgoKSA6IDA7XG4gICAgICAgICAgY29uc3QgY2hpbGRNYXJnaW5MZWZ0ID0gY2hpbGRyZW5bal0uY3NzLm1hcmdpbkxlZnQgPyBjaGlsZHJlbltqXS5jc3MubWFyZ2luTGVmdC50b1B4KCkgOiAwO1xuICAgICAgICAgIGNvbnN0IGNoaWxkTWFyZ2luVG9wID0gY2hpbGRyZW5bal0uY3NzLm1hcmdpblRvcCA/IGNoaWxkcmVuW2pdLmNzcy5tYXJnaW5Ub3AudG9QeCgpIDogMDtcbiAgICAgICAgICBjb25zdCBjaGlsZFBhZGRpbmdUb3AgPSBjaGlsZHJlbltqXS5jc3MucGFkZGluZ1RvcCA/IGNoaWxkcmVuW2pdLmNzcy5wYWRkaW5nVG9wLnRvUHgoKSA6IDA7XG5cbiAgICAgICAgICBjb25zdCB4QWRkZXIgPSBjaGlsZFdpZHRoICsgY2hpbGRQYWRkaW5nTGVmdCArIGNoaWxkTWFyZ2luTGVmdDtcbiAgICAgICAgICBjb25zdCB5QWRkZXIgPSBjaGlsZEhlaWdodCArIGNoaWxkTWFyZ2luVG9wICsgY2hpbGRQYWRkaW5nVG9wO1xuXG4gICAgICAgICAgaXNMaW5lcyA9IGNoaWxkcmVuW2pdLnR5cGUgPT09ICdibG9jayc7XG4gICAgICAgICAgaWYgKCFpc0xpbmVzKSB7XG4gICAgICAgICAgICAvLyDkuI3mjaLooYxcbiAgICAgICAgICAgIHdpZHRoU3VtICs9ICh4QWRkZXIpO1xuICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgIGlmICh3aWR0aFN1bSA+PSBwYXJlbnRXaWR0aCAmJiBqID09PSAwKSB7XG4gICAgICAgICAgICAgIC8vIHJldmVyc2VCZnNOb2Rlc1tpXS5wcm9jZXNzZWRMb2NhdGlvbi53aWR0aCA9IHdpZHRoU3VtXG4gICAgICAgICAgICAgIGlzTGluZXMgPSB0cnVlO1xuICAgICAgICAgICAgICBoZWlnaHRTdW0gKz0geUFkZGVyO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aWR0aFN1bSA+IHBhcmVudFdpZHRoKSB7XG4gICAgICAgICAgICAgIGlzTGluZXMgPSB0cnVlO1xuICAgICAgICAgICAgICBoZWlnaHRTdW0gKz0geUFkZGVyO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aWR0aFN1bSA8IHBhcmVudFdpZHRoICYmIGogPT09IDApIHtcbiAgICAgICAgICAgICAgaXNMaW5lcyA9IGZhbHNlO1xuICAgICAgICAgICAgICBoZWlnaHRTdW0gKz0geUFkZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDmjaLooYxcbiAgICAgICAgICAgIGhlaWdodFN1bSArPSB5QWRkZXI7XG4gICAgICAgICAgICBpc0xpbmVzID0gZmFsc2U7XG4gICAgICAgICAgICB3aWR0aFN1bSA9IDA7XG4gICAgICAgICAgICAvLyByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0U3VtLCByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0U3VtLCByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0KTtcbiAgICAgICAgY29uc29sZS5sb2cocmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCk7XG4gICAgICB9IGVsc2UgaWYgKHJldmVyc2VCZnNOb2Rlc1tpXS50eXBlID09PSAnYmxvY2snKSB7XG4gICAgICAgIC8vIOWdl+e6p+WFg+e0oFxuICAgICAgICAvLyDlrr3luqbmi4nmu6HnlLvluIMs6auY5bqm5a6a6auY5oiW6ICF6Ieq6YCC5bqUXG4gICAgICAgIGNvbnN0IHsgd2lkdGg6IHBhcmVudFdpZHRoLCBoZWlnaHQ6IHBhcmVudEhlaWdodCB9ID0gcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uO1xuICAgICAgICAvLyBpZiAoIShwYXJlbnRXaWR0aC5pbmRleE9mKCdweCcpID4gLTEgfHwgcGFyZW50V2lkdGguaW5kZXhPZignJScpID4gLTEpKSB7XG4gICAgICAgIC8vICAgY29uc29sZS5lcnJvcigncGxlYXNlIGluaXQgd2lkdGggZm9yIGJsb2NrIGVsZW1lbnQuJylcbiAgICAgICAgLy8gICByZXR1cm47XG4gICAgICAgIC8vIH1cbiAgICAgICAgY29uc3QgaXNBdXRvSGVpZ2h0ID0gISFwYXJlbnRIZWlnaHQ7XG4gICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgIGlmIChpc0F1dG9IZWlnaHQpIHtcbiAgICAgICAgICAvLyDoh6rpgILlupTpq5jluqZcbiAgICAgICAgICBsZXQgd2lkdGhTdW0gPSAwOyBsZXQgaGVpZ2h0U3VtID0gMDsgbGV0XG4gICAgICAgICAgICBpc0xpbmVzID0gZmFsc2U7XG4gICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSByZXZlcnNlQmZzTm9kZXNbaV0uY2hpbGRyZW4gfHwgW107XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRXaWR0aCA9IGNoaWxkcmVuW2pdLnByb2Nlc3NlZExvY2F0aW9uLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgY2hpbGRIZWlnaHQgPSBjaGlsZHJlbltqXS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFBhZGRpbmdMZWZ0ID0gY2hpbGRyZW5bal0uY3NzLnBhZGRpbmdMZWZ0ID8gY2hpbGRyZW5bal0uY3NzLnBhZGRpbmdMZWZ0LnRvUHgoKSA6IDA7XG4gICAgICAgICAgICBjb25zdCBjaGlsZE1hcmdpbkxlZnQgPSBjaGlsZHJlbltqXS5jc3MubWFyZ2luTGVmdCA/IGNoaWxkcmVuW2pdLmNzcy5tYXJnaW5MZWZ0LnRvUHgoKSA6IDA7XG4gICAgICAgICAgICBjb25zdCBjaGlsZE1hcmdpblRvcCA9IGNoaWxkcmVuW2pdLmNzcy5tYXJnaW5Ub3AgPyBjaGlsZHJlbltqXS5jc3MubWFyZ2luVG9wLnRvUHgoKSA6IDA7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFBhZGRpbmdUb3AgPSBjaGlsZHJlbltqXS5jc3MucGFkZGluZ1RvcCA/IGNoaWxkcmVuW2pdLmNzcy5wYWRkaW5nVG9wLnRvUHgoKSA6IDA7XG4gICAgICAgICAgICBjb25zdCB4QWRkZXIgPSBjaGlsZFdpZHRoICsgY2hpbGRQYWRkaW5nTGVmdCArIGNoaWxkTWFyZ2luTGVmdDtcbiAgICAgICAgICAgIGNvbnN0IHlBZGRlciA9IGNoaWxkSGVpZ2h0ICsgY2hpbGRNYXJnaW5Ub3AgKyBjaGlsZFBhZGRpbmdUb3A7XG4gICAgICAgICAgICBpZiAoIWlzTGluZXMpIHtcbiAgICAgICAgICAgICAgLy8g5LiN5o2i6KGMXG4gICAgICAgICAgICAgIHdpZHRoU3VtICs9ICh4QWRkZXIpO1xuICAgICAgICAgICAgICAvLyDmnInlrprlrr3vvIzlj6/og73muqLlh7rvvJvml6Dlrprlrr3vvIzoh6rpgILlupTlrr3luqZcbiAgICAgICAgICAgICAgaWYgKHdpZHRoU3VtID49IHBhcmVudFdpZHRoICYmIGogPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24ud2lkdGggPSB3aWR0aFN1bVxuICAgICAgICAgICAgICAgIGlzTGluZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGhlaWdodFN1bSArPSB5QWRkZXI7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAod2lkdGhTdW0gPiBwYXJlbnRXaWR0aCkge1xuICAgICAgICAgICAgICAgIGlzTGluZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGhlaWdodFN1bSArPSB5QWRkZXI7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAod2lkdGhTdW0gPCBwYXJlbnRXaWR0aCAmJiBqID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaXNMaW5lcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGhlaWdodFN1bSArPSB5QWRkZXI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCA9IE1hdGgubWF4KGhlaWdodFN1bSwgcmV2ZXJzZUJmc05vZGVzW2ldLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyDmjaLooYxcbiAgICAgICAgICAgICAgaGVpZ2h0U3VtICs9IHlBZGRlcjtcbiAgICAgICAgICAgICAgaXNMaW5lcyA9IGZhbHNlO1xuICAgICAgICAgICAgICB3aWR0aFN1bSA9IDA7XG4gICAgICAgICAgICAgIHJldmVyc2VCZnNOb2Rlc1tpXS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQgPSBNYXRoLm1heChoZWlnaHRTdW0sIHJldmVyc2VCZnNOb2Rlc1tpXS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyDlrprpq5hcbiAgICAgICAgICAvLyByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0ID0gTWF0aC5tYXgoaGVpZ2h0U3VtLCByZXZlcnNlQmZzTm9kZXNbaV0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0KVxuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkZWJ1Z2dlclxuICAgIGNvbnNvbGUubG9nKCcoKCgoKCggJywgcmV2ZXJzZUJmc05vZGVzKTtcbiAgICByZXR1cm4gcmV2ZXJzZUJmc05vZGVzO1xuICB9XG5cbiAgY2FsY0VsZW1lbnRQb3NpdGlvbihyb290Tm9kZSkge1xuICAgIGNvbnN0IGJmc05vZGVzID0gYnJlYWR0aEZpcnN0U2VhcmNoKHJvb3ROb2RlKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJmc05vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwYXJlbnQgPSBiZnNOb2Rlc1tpXS5wYXJlbnQ7XG4gICAgICBjb25zdCB7IHBhZGRpbmdMZWZ0LCBtYXJnaW5MZWZ0LCBwYWRkaW5nVG9wLCBtYXJnaW5Ub3AgfSA9IHsgLi4uZGVmYXVsdFBhZGRpbmdNYXJnaW4sIC4uLmJmc05vZGVzW2ldLmNzcyB9O1xuICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgYmZzTm9kZXNbaV0ucmVuZGVyU3R5bGUgPSB7XG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICB5OiAwLFxuICAgICAgICAgIGNvbnRlbnRYOiBmb3JtYXRUb051bShwYWRkaW5nTGVmdCwgYmZzTm9kZXNbaV0ucGFyZW50LCAnd2lkdGgnKSArIGZvcm1hdFRvTnVtKG1hcmdpbkxlZnQsIGJmc05vZGVzW2ldLnBhcmVudCwgJ3dpZHRoJyksXG4gICAgICAgICAgY29udGVudFk6IGZvcm1hdFRvTnVtKHBhZGRpbmdUb3AsIGJmc05vZGVzW2ldLnBhcmVudCwgJ2hlaWdodCcpICsgZm9ybWF0VG9OdW0obWFyZ2luVG9wLCBiZnNOb2Rlc1tpXS5wYXJlbnQsICdoZWlnaHQnKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBpc0xpbmVzID0gZ2V0SXNDaGFuZ2VMaW5lKGJmc05vZGVzW2ldKTtcbiAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICB0aGlzLmluc2VydFZub2RlKGJmc05vZGVzW2ldLCBpc0xpbmVzKTtcbiAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAvLyBpZiAoaXNMaW5lcykge1xuICAgICAgLy8gICAvLyDmjaLooYzml7YsIHk65Y+g5YqgcHJl5YWE5byf6IqC54K55Z2Q5qCHLCB4OuWPoOWKoOeItuiKgueCueWdkOagh1xuICAgICAgLy8gICBjb25zdCB4ID0gcGFyZW50LnJlbmRlclN0eWxlLmNvbnRlbnRYXG4gICAgICAvLyAgIGNvbnN0IHkgPSB0aGlzLl9nZXRQcmVMYXlvdXQoYmZzTm9kZXNbaV0pLnkgKyB0aGlzLl9nZXRQcmVMYXlvdXQoYmZzTm9kZXNbaV0pLmhlaWdodFxuICAgICAgLy8gICAvLyBkZWJ1Z2dlclxuICAgICAgLy8gICBjb25zdCByZW5kZXJTdHlsZSA9IHtcbiAgICAgIC8vICAgICB4LFxuICAgICAgLy8gICAgIHksXG4gICAgICAvLyAgICAgY29udGVudFg6IHggKyBmb3JtYXRUb1B4KHBhZGRpbmdMZWZ0KSArIGZvcm1hdFRvUHgobWFyZ2luTGVmdCksXG4gICAgICAvLyAgICAgY29udGVudFk6IHkgKyBmb3JtYXRUb1B4KHBhZGRpbmdUb3ApICsgZm9ybWF0VG9QeChtYXJnaW5Ub3ApXG4gICAgICAvLyAgIH1cbiAgICAgIC8vICAgLy8gZGVidWdnZXJcbiAgICAgIC8vICAgYmZzTm9kZXNbaV0ucmVuZGVyU3R5bGUgPSByZW5kZXJTdHlsZTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgIC8vIOS4jeaNouihjOaXtiwgeTrlj6DliqDniLboioLngrnlnZDmoIcsIHg65Y+g5YqgcHJl5YWE5byf6IqC5Z2Q5qCHXG4gICAgICAvLyAgIGNvbnN0IHggPSB0aGlzLl9nZXRQcmVMYXlvdXQoYmZzTm9kZXNbaV0pLnggKyB0aGlzLl9nZXRQcmVMYXlvdXQoYmZzTm9kZXNbaV0pLndpZHRoXG4gICAgICAvLyAgIGNvbnN0IHkgPSB0aGlzLl9nZXRQcmVMYXlvdXQoYmZzTm9kZXNbaV0pLnlcbiAgICAgIC8vICAgY29uc3QgcmVuZGVyU3R5bGUgPSB7XG4gICAgICAvLyAgICAgeCxcbiAgICAgIC8vICAgICB5LFxuICAgICAgLy8gICAgIGNvbnRlbnRYOiB4ICsgZm9ybWF0VG9QeChwYWRkaW5nTGVmdCkgKyBmb3JtYXRUb1B4KG1hcmdpbkxlZnQpLFxuICAgICAgLy8gICAgIGNvbnRlbnRZOiB5ICsgZm9ybWF0VG9QeChwYWRkaW5nVG9wKSArIGZvcm1hdFRvUHgobWFyZ2luVG9wKVxuICAgICAgLy8gICB9XG4gICAgICAvLyAgIGJmc05vZGVzW2ldLnJlbmRlclN0eWxlID0gcmVuZGVyU3R5bGU7XG4gICAgICAvLyB9XG4gICAgfVxuICAgIHJldHVybiBiZnNOb2RlcztcbiAgfVxuXG4gIGluc2VydFZub2RlKHZub2RlLCBpc0NoYW5nZUxpbmUpIHtcbiAgICBpZiAoWydibG9jayddLmluY2x1ZGVzKHZub2RlLnR5cGUpKSB7XG4gICAgICAvLyDlnZfnuqflhYPntKBcbiAgICAgIGNvbnN0IHsgcGFkZGluZ0xlZnQsIG1hcmdpbkxlZnQsIHBhZGRpbmdUb3AsIG1hcmdpblRvcCB9ID0geyAuLi5kZWZhdWx0UGFkZGluZ01hcmdpbiwgLi4udm5vZGUuY3NzIH07XG4gICAgICAvLyDmjaLooYzml7YsIHk65Y+g5YqgcHJl5YWE5byf6IqC54K55Z2Q5qCHLCB4OuWPoOWKoOeItuiKgueCueWdkOagh1xuICAgICAgLy8gZGVidWdnZXJcbiAgICAgIGNvbnN0IHggPSB2bm9kZS5wYXJlbnQucmVuZGVyU3R5bGUuY29udGVudFg7XG4gICAgICBjb25zdCB5ID0gZ2V0UHJlTGF5b3V0KHZub2RlKS55ICsgZ2V0UHJlTGF5b3V0KHZub2RlKS5oZWlnaHQ7XG4gICAgICBjb25zdCByZW5kZXJTdHlsZSA9IHtcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgLy8gY29udGVudFg6IHggKyBmb3JtYXRUb1B4KHBhZGRpbmdMZWZ0KSArIGZvcm1hdFRvUHgobWFyZ2luTGVmdCksXG4gICAgICAgIC8vIGNvbnRlbnRZOiB5ICsgZm9ybWF0VG9QeChwYWRkaW5nVG9wKSArIGZvcm1hdFRvUHgobWFyZ2luVG9wKVxuICAgICAgICBjb250ZW50WDogeCArIGZvcm1hdFRvTnVtKHBhZGRpbmdMZWZ0LCB2bm9kZS5wYXJlbnQsICd3aWR0aCcpICsgZm9ybWF0VG9OdW0obWFyZ2luTGVmdCwgdm5vZGUucGFyZW50LCAnd2lkdGgnKSxcbiAgICAgICAgY29udGVudFk6IHkgKyBmb3JtYXRUb051bShwYWRkaW5nVG9wLCB2bm9kZS5wYXJlbnQsICdoZWlnaHQnKSArIGZvcm1hdFRvTnVtKG1hcmdpblRvcCwgdm5vZGUucGFyZW50LCAnaGVpZ2h0JyksXG4gICAgICB9O1xuICAgICAgdm5vZGUucmVuZGVyU3R5bGUgPSByZW5kZXJTdHlsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g6KGM5YaF5YWD57SgXG4gICAgICBpbnNlcnRWbm9kZUludG9MaW5lKHZub2RlLCBpc0NoYW5nZUxpbmUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIOagueaNruS4gOe6p2pzb27mm7TmlrDmr4/kuKroioLngrnnmoTpq5jluqZcbiAgLy8gY2FsY0VhY2hIZWlnaHQodHBsKSB7XG4gIC8vICAgY29uc3QgcGFyZW50SWRzID0gdHBsLm1hcCgoc2IpID0+IHsgcmV0dXJuIHNiLmZfc2lkOyB9KTtcbiAgLy8gICBsZXQgc29ydGVkID0gcGFyZW50SWRzLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGIgLSBhOyB9KTtcbiAgLy8gICBzb3J0ZWQgPSBBcnJheS5mcm9tKG5ldyBTZXQoc29ydGVkKSk7XG4gIC8vICAgc29ydGVkLmZvckVhY2goKGZfc2lkKSA9PiB7XG4gIC8vICAgICAvLyBkZWJ1Z2dlcjtcbiAgLy8gICAgIGlmIChmX3NpZCkge1xuICAvLyAgICAgICAvLyDmnInniLboioLngrlcbiAgLy8gICAgICAgY29uc3QgcGFyZW50Tm9kZSA9IHRwbC5maW5kKChsbCkgPT4geyByZXR1cm4gbGwuc2lkID09PSBmX3NpZDsgfSk7XG4gIC8vICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdHBsLmZpbHRlcigoeCkgPT4geyByZXR1cm4geC5mX3NpZCA9PT0gZl9zaWQ7IH0pO1xuICAvLyAgICAgICAvLyBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0gJywgY2hpbGRyZW4pO1xuICAvLyAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAvLyAgICAgICAgIHBhcmVudE5vZGUucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0ID0gY2hpbGRyZW4ucmVkdWNlKChwcmUsIG5leHQpID0+IHtcbiAgLy8gICAgICAgICAgIHJldHVybiBwcmUgKyBuZXh0LnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodDtcbiAgLy8gICAgICAgICB9LCAwKTtcbiAgLy8gICAgICAgICBjb25zdCBwYWRkaW5nYm90dG9tID0gcGFyZW50Tm9kZS5jc3MucGFkZGluZ2JvdHRvbSA/IHBhcmVudE5vZGUuY3NzLnBhZGRpbmdib3R0b20udG9QeCgpIDogMDtcbiAgLy8gICAgICAgICBwYXJlbnROb2RlLnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodCArPSBwYWRkaW5nYm90dG9tO1xuICAvLyAgICAgICAgIHBhcmVudE5vZGUuY3NzLmhlaWdodCA9IGAke3BhcmVudE5vZGUucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0fXB4YDtcbiAgLy8gICAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgICAvLyDmoLnoioLngrlcbiAgLy8gICAgICAgICB0aGlzLmRhdGEuaGVpZ2h0ID0gY2hpbGRyZW4ucmVkdWNlKChwcmUsIG5leHQpID0+IHtcbiAgLy8gICAgICAgICAgIHJldHVybiBwcmUgKyBuZXh0LnByb2Nlc3NlZExvY2F0aW9uLmhlaWdodDtcbiAgLy8gICAgICAgICB9LCAwKTtcbiAgLy8gICAgICAgICBjb25zdCBwYWRkaW5nYm90dG9tID0gdGhpcy5kYXRhLnBhZGRpbmdib3R0b20gPyB0aGlzLmRhdGEucGFkZGluZ2JvdHRvbS50b1B4KCkgOiAwO1xuICAvLyAgICAgICAgIHRoaXMuZGF0YS5oZWlnaHQgKz0gcGFkZGluZ2JvdHRvbTtcbiAgLy8gICAgICAgICB0aGlzLmRhdGEuaGVpZ2h0ID0gYCR7dGhpcy5kYXRhLmhlaWdodH1weGA7XG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfVxuXG4gIC8vIOa3u+WKoGlkXG4gIHJvdXRlQnlERlMoKSB7XG4gICAgY29uc3QgcGFyZW50Tm9kZSA9IHsgY2hpbGRyZW46IHRoaXMuZGF0YS52aWV3cyB9O1xuXG4gICAgaWYgKCFwYXJlbnROb2RlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbGV0IHNpZCA9IDE7XG4gICAgcGFyZW50Tm9kZS5zaWQgPSBzaWQ7XG4gICAgc2lkKys7XG4gICAgLy8g5rex5bqm5LyY5YWILCDpnZ7pgJLlvZLlrp7njrDvvIwg5L2/55So5qCIXG4gICAgbGV0IHN0YWNrID0gW107XG4gICAgZm9yIChsZXQgaSA9IHBhcmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICBwYXJlbnROb2RlLmNoaWxkcmVuW2kgLSAxXS5zaWQgPSBzaWQ7XG4gICAgICBwYXJlbnROb2RlLmNoaWxkcmVuW2kgLSAxXS5mX3NpZCA9IDE7XG4gICAgICBzaWQrKztcbiAgICAgIHN0YWNrLnB1c2gocGFyZW50Tm9kZS5jaGlsZHJlbltpIC0gMV0pO1xuICAgIH1cbiAgICB3aGlsZSAoc3RhY2subGVuZ3RoKSB7XG4gICAgICBjb25zdCBub2RlID0gc3RhY2sucG9wKCk7XG4gICAgICBpZiAobm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICAgICAgeC5zaWQgPSBzaWQ7XG4gICAgICAgICAgeC5mX3NpZCA9IG5vZGUuc2lkO1xuICAgICAgICAgIHNpZCsrO1xuICAgICAgICB9KTtcbiAgICAgICAgc3RhY2sgPSBBcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4pLmNvbmNhdChzdGFjayk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8g5bm/5bqm5LyY5YWI6YGN5Y6G6K6h566X5ZCM57qn5YWE5byfKOWboOS4uuWPr+iDveWHuueOsOebuOWvueWFhOW8n+iKgueCueOAgeeItuiKgueCueWumuS9jeOAgmRmc+aXoOazleiusOW9leWFhOW8n+iKgueCueS/oeaBr++8jGJmc+S4pOiAhemDveWPr+iusOW9lSnoioLngrnnmoTnm7jlr7nkvY3nva5cbiAgcm91dGVCeUJGUygpIHtcbiAgICBjb25zdCBub2RlID0geyBjaGlsZHJlbjogdGhpcy5kYXRhLnZpZXdzIH07XG4gICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICBpZiAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgcXVldWUgPSBbXTtcbiAgICAgIHF1ZXVlLnVuc2hpZnQobm9kZSk7XG4gICAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGxldCBpdGVtID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgLy8g6K6h566XXG4gICAgICAgIGl0ZW0gPSB0aGlzLnByZVByb2Nlc3NPYmooaXRlbSk7XG4gICAgICAgIG5vZGVzLnB1c2goaXRlbSk7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaXRlbS5jaGlsZHJlbjtcbiAgICAgICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcXVldWUucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJlUHJvY2Vzc09iaih2aWV3KSB7XG4gICAgLy8g6I635Y+W5Y6f5aeLY3Nz5a696auYL+aWh+Wtl+aNouihjOmrmOW6plxuICAgIGxldCBqc29uO1xuICAgIHN3aXRjaCAodmlldy50eXBlKSB7XG4gICAgY2FzZSAnaW1hZ2UnOlxuICAgICAganNvbiA9IHRoaXMuX3ByZVByb2Nlc3Modmlldyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0ZXh0JzpcbiAgICAgIGpzb24gPSB0aGlzLl9wcmVQcm9jZXNzKHZpZXcsIHZpZXcuY3NzLmJhY2tncm91bmQgJiYgdmlldy5jc3MuYm9yZGVyUmFkaXVzKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JlY3QnOlxuICAgICAganNvbiA9IHRoaXMuX3ByZVByb2Nlc3Modmlldyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdibG9jayc6XG4gICAgICBqc29uID0gdGhpcy5fcHJlUHJvY2Vzcyh2aWV3KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gdmlldy5faWQgPSBpO1xuICAgIHZpZXcucHJvY2Vzc2VkTG9jYXRpb24gPSBqc29uO1xuICAgIHJldHVybiB2aWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIOeUu+iDjOaZr1xuICAgKi9cbiAgX2JhY2tncm91bmQoKSB7XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLnN0eWxlO1xuICAgIC8vIGNvbnN0IGhlaWdodCA9IDc5OFxuICAgIGNvbnN0IGJnID0gdGhpcy5kYXRhLmJhY2tncm91bmQ7XG4gICAgdGhpcy5jdHgudHJhbnNsYXRlKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG5cbiAgICB0aGlzLl9kb0NsaXAodGhpcy5kYXRhLmJvcmRlclJhZGl1cywgd2lkdGgsIGhlaWdodCk7XG4gICAgLy8gZGVidWdnZXI7XG4gICAgaWYgKCFiZykge1xuICAgICAgLy8g5aaC5p6c5pyq6K6+572u6IOM5pmv77yM5YiZ6buY6K6k5L2/55So55m96ImyXG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgICB0aGlzLmN0eC5maWxsUmVjdCgtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH0gZWxzZSBpZiAoYmcuc3RhcnRzV2l0aCgnIycpIHx8IGJnLnN0YXJ0c1dpdGgoJ3JnYmEnKSB8fCBiZy50b0xvd2VyQ2FzZSgpID09PSAndHJhbnNwYXJlbnQnKSB7XG4gICAgICAvLyDog4zmma/loavlhYXpopzoibJcbiAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgICAgdGhpcy5jdHguZmlsbFJlY3QoLSh3aWR0aCAvIDIpLCAtKGhlaWdodCAvIDIpLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9IGVsc2UgaWYgKEdELmFwaS5pc0dyYWRpZW50KGJnKSkge1xuICAgICAgR0QuYXBpLmRvR3JhZGllbnQoYmcsIHdpZHRoLCBoZWlnaHQsIHRoaXMuY3R4KTtcbiAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOiDjOaZr+Whq+WFheWbvueJh1xuICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAvLyB0aGlzLmN0eC50cmFuc2xhdGUoMC41LCAwLjUpO1xuICAgICAgdGhpcy5fZHJhd0ltYWdlKGJnLCAtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBhc3luYyBfZHJhd0Fic29sdXRlKHZpZXcpIHtcbiAgICBpZiAoIXZpZXcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gLy8g6K+B5piOIGNzcyDkuLrmlbDnu4TlvaLlvI/vvIzpnIDopoHlkIjlubZcbiAgICAvLyBpZiAodmlldy5jc3MgJiYgdmlldy5jc3MubGVuZ3RoKSB7XG4gICAgLy8gICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgIC8vICAgdmlldy5jc3MgPSBPYmplY3QuYXNzaWduKC4uLnZpZXcuY3NzKTtcbiAgICAvLyB9XG4gICAgc3dpdGNoICh2aWV3LnR5cGUpIHtcbiAgICBjYXNlICdpbWFnZSc6XG4gICAgICBhd2FpdCB0aGlzLl9kcmF3QWJzSW1hZ2Uodmlldyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0ZXh0JzpcbiAgICAgIHRoaXMuX2ZpbGxBYnNUZXh0KHZpZXcpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncmVjdCc6XG4gICAgICB0aGlzLl9kcmF3QWJzUmVjdCh2aWV3KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jsb2NrJzpcbiAgICAgIHRoaXMuX2RyYXdBYnNSZWN0KHZpZXcpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDmoLnmja4gYm9yZGVyUmFkaXVzIOi/m+ihjOijgeWHj1xuICAgKi9cbiAgX2RvQ2xpcChib3JkZXJSYWRpdXMsIHdpZHRoLCBoZWlnaHQsIGlzT25seVVwSGFsZiA9IGZhbHNlKSB7XG4gICAgLy8gZGVidWdnZXJcbiAgICBpZiAoYm9yZGVyUmFkaXVzICYmIHdpZHRoICYmIGhlaWdodCkge1xuICAgICAgY29uc3QgciA9IE1hdGgubWluKGJvcmRlclJhZGl1cy50b1B4KCksIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XG4gICAgICAvLyDpmLLmraLlnKjmn5DkupvmnLrlnovkuIrlkajovrnmnInpu5HmoYbnjrDosaHvvIzmraTlpITlpoLmnpznm7TmjqXorr7nva4gZmlsbFN0eWxlIOS4uumAj+aYju+8jOWcqCBBbmRyb2lkIOacuuWei+S4iuS8muWvvOiHtOiiq+ijgeWHj+eahOWbvueJh+S5n+WPmOS4uumAj+aYju+8jCBpT1Mg5ZKMIElERSDkuIrkuI3kvJpcbiAgICAgIC8vIGdsb2JhbEFscGhhIOWcqCAxLjkuOTAg6LW35pSv5oyB77yM5L2O54mI5pys5LiL5peg5pWI77yM5L2G5oqKIGZpbGxTdHlsZSDorr7kuLrkuoYgd2hpdGXvvIznm7jlr7npu5jorqTnmoQgYmxhY2sg6KaB5aW954K5XG4gICAgICB0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IDA7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmN0eC5hcmMoLXdpZHRoIC8gMiArIHIsIC1oZWlnaHQgLyAyICsgciwgciwgMSAqIE1hdGguUEksIDEuNSAqIE1hdGguUEkpO1xuICAgICAgdGhpcy5jdHgubGluZVRvKHdpZHRoIC8gMiAtIHIsIC1oZWlnaHQgLyAyKTtcbiAgICAgIHRoaXMuY3R4LmFyYyh3aWR0aCAvIDIgLSByLCAtaGVpZ2h0IC8gMiArIHIsIHIsIDEuNSAqIE1hdGguUEksIDIgKiBNYXRoLlBJKTtcblxuICAgICAgaWYgKGlzT25seVVwSGFsZikge1xuICAgICAgICB0aGlzLmN0eC5saW5lVG8od2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKC13aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdHgubGluZVRvKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiAtIHIpO1xuICAgICAgICB0aGlzLmN0eC5hcmMod2lkdGggLyAyIC0gciwgaGVpZ2h0IC8gMiAtIHIsIHIsIDAsIDAuNSAqIE1hdGguUEkpO1xuICAgICAgICB0aGlzLmN0eC5saW5lVG8oLXdpZHRoIC8gMiArIHIsIGhlaWdodCAvIDIpO1xuICAgICAgICB0aGlzLmN0eC5hcmMoLXdpZHRoIC8gMiArIHIsIGhlaWdodCAvIDIgLSByLCByLCAwLjUgKiBNYXRoLlBJLCAxICogTWF0aC5QSSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgdGhpcy5jdHguZmlsbCgpO1xuICAgICAgLy8g5ZyoIGlvcyDnmoQgNi42LjYg54mI5pys5LiKIGNsaXAg5pyJIGJ1Z++8jOemgeaOieatpOexu+Wei+S4iueahCBjbGlw77yM5Lmf5bCx5oSP5ZGz552A77yM5Zyo5q2k54mI5pys5b6u5L+h55qEIGlvcyDorr7lpIfkuIvml6Dms5Xkvb/nlKggYm9yZGVyIOWxnuaAp1xuICAgICAgY29uc3QgeyB2ZXJzaW9uLCBwbGF0Zm9ybSB9ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgIC8vIOWFvOWuueWwj+eoi+W6j+aPkuS7tlxuICAgICAgaWYgKCEodmVyc2lvbiA8PSAnNi42LjYnICYmIHBsYXRmb3JtID09PSAnaW9zJykpIHtcbiAgICAgICAgdGhpcy5jdHguY2xpcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSAxO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDnlLvovrnmoYZcbiAgICovXG4gIF9kb0JvcmRlcih2aWV3LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgaWYgKCF2aWV3LmNzcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICBib3JkZXJSYWRpdXMsXG4gICAgICBib3JkZXJXaWR0aCxcbiAgICAgIGJvcmRlckNvbG9yLFxuICAgIH0gPSB2aWV3LmNzcztcbiAgICBpZiAoIWJvcmRlcldpZHRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAvLyBjb25zdCB7IHgsIHksIGhlaWdodDogcmF3SGVpZ2h0LCB3aWR0aDogcmF3V2lkdGggfSA9IHRoaXMuX3ByZVByb2Nlc3ModmlldywgdHJ1ZSk7XG4gICAgY29uc3QgeyBoZWlnaHQ6IHJhd0hlaWdodCwgd2lkdGg6IHJhd1dpZHRoIH0gPSB2aWV3LnByb2Nlc3NlZExvY2F0aW9uO1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gdmlldy5yZW5kZXJTdHlsZTtcbiAgICB0aGlzLl9wcmVQYWludCh2aWV3LCB0cnVlLCB7IHgsIHksIGhlaWdodDogcmF3SGVpZ2h0LCB3aWR0aDogcmF3V2lkdGggfSk7XG5cbiAgICBsZXQgcjtcbiAgICBpZiAoYm9yZGVyUmFkaXVzKSB7XG4gICAgICByID0gTWF0aC5taW4oYm9yZGVyUmFkaXVzLnRvUHgoKSwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgciA9IDA7XG4gICAgfVxuICAgIGNvbnN0IGxpbmVXaWR0aCA9IGJvcmRlcldpZHRoLnRvUHgoKTtcbiAgICB0aGlzLmN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAoYm9yZGVyQ29sb3IgfHwgJ2JsYWNrJyk7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKC13aWR0aCAvIDIgKyByLCAtaGVpZ2h0IC8gMiArIHIsIHIgKyBsaW5lV2lkdGggLyAyLCAxICogTWF0aC5QSSwgMS41ICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHgubGluZVRvKHdpZHRoIC8gMiAtIHIsIC1oZWlnaHQgLyAyIC0gbGluZVdpZHRoIC8gMik7XG4gICAgdGhpcy5jdHguYXJjKHdpZHRoIC8gMiAtIHIsIC1oZWlnaHQgLyAyICsgciwgciArIGxpbmVXaWR0aCAvIDIsIDEuNSAqIE1hdGguUEksIDIgKiBNYXRoLlBJKTtcbiAgICB0aGlzLmN0eC5saW5lVG8od2lkdGggLyAyICsgbGluZVdpZHRoIC8gMiwgaGVpZ2h0IC8gMiAtIHIpO1xuICAgIHRoaXMuY3R4LmFyYyh3aWR0aCAvIDIgLSByLCBoZWlnaHQgLyAyIC0gciwgciArIGxpbmVXaWR0aCAvIDIsIDAsIDAuNSAqIE1hdGguUEkpO1xuICAgIHRoaXMuY3R4LmxpbmVUbygtd2lkdGggLyAyICsgciwgaGVpZ2h0IC8gMiArIGxpbmVXaWR0aCAvIDIpO1xuICAgIHRoaXMuY3R4LmFyYygtd2lkdGggLyAyICsgciwgaGVpZ2h0IC8gMiAtIHIsIHIgKyBsaW5lV2lkdGggLyAyLCAwLjUgKiBNYXRoLlBJLCAxICogTWF0aC5QSSk7XG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOmihOWkhOeQhuiKgueCueWvueixoVxuICAgKiBAcGFyYW0ge29iamVjdH19IHZpZXdcbiAgICogQHBhcmFtIHtib29sZWFufSBub3RDbGlwXG4gICAqIEByZXR1cm5cbiAgICoge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICB4LFxuICAgICAgeSxcbiAgICAgIGV4dHJhLFxuICAgIH07XG4gICAqL1xuICBfcHJlUHJvY2Vzcyh2aWV3LCBub3RDbGlwKSB7XG4gICAgLy8gZGVidWdnZXJcbiAgICBsZXQgd2lkdGggPSAwO1xuICAgIGxldCBoZWlnaHQ7XG4gICAgbGV0IGV4dHJhO1xuICAgIHN3aXRjaCAodmlldy50eXBlKSB7XG4gICAgY2FzZSAndGV4dCc6IHtcbiAgICAgIGNvbnN0IHRleHRBcnJheSA9IHZpZXcudGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICAvLyDlpITnkIblpJrkuKrov57nu63nmoQnXFxuJ1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0QXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHRleHRBcnJheVtpXSA9PT0gJycpIHtcbiAgICAgICAgICB0ZXh0QXJyYXlbaV0gPSAnICc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGZvbnRXZWlnaHQgPSB2aWV3LmNzcy5mb250V2VpZ2h0ID09PSAnYm9sZCcgPyAnYm9sZCcgOiAnbm9ybWFsJztcbiAgICAgIHZpZXcuY3NzLmZvbnRTaXplID0gdmlldy5jc3MuZm9udFNpemUgPyB2aWV3LmNzcy5mb250U2l6ZSA6ICcyMHJweCc7XG4gICAgICAvLyDpnIDopoHorqHnrpfmloflrZflrr3luqbvvIzov5nph4zliJ3lp4vljJbkuI3og73nnIHnlaVcbiAgICAgIHRoaXMuY3R4LmZvbnQgPSBgbm9ybWFsICR7Zm9udFdlaWdodH0gJHt2aWV3LmNzcy5mb250U2l6ZS50b1B4KCl9cHggJHt2aWV3LmNzcy5mb250RmFtaWx5ID8gYFwiJHt2aWV3LmNzcy5mb250RmFtaWx5fVwiYCA6ICdzYW5zLXNlcmlmJ31gO1xuXG4gICAgICAvLyB0aGlzLmN0eC5zZXRGb250U2l6ZSh2aWV3LmNzcy5mb250U2l6ZS50b1B4KCkpO1xuICAgICAgLy8g6K6h566X6KGM5pWwXG4gICAgICBsZXQgbGluZXMgPSAwO1xuICAgICAgY29uc3QgbGluZXNBcnJheSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0QXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgdGV4dExlbmd0aCA9IHRoaXMuY3R4Lm1lYXN1cmVUZXh0KHRleHRBcnJheVtpXSkud2lkdGg7XG4gICAgICAgIGNvbnN0IHBhcnRXaWR0aCA9IHZpZXcuY3NzLndpZHRoID8gZm9ybWF0VG9OdW0odmlldy5jc3Mud2lkdGgsIHZpZXcucGFyZW50LCAnd2lkdGgnKSA6IHRleHRMZW5ndGg7XG4gICAgICAgIC8vIGRlYnVnZ2VyXG4gICAgICAgIGNvbnN0IGNhbExpbmVzID0gTWF0aC5jZWlsKHRleHRMZW5ndGggLyBwYXJ0V2lkdGgpO1xuICAgICAgICB3aWR0aCA9IHBhcnRXaWR0aCA+IHdpZHRoID8gcGFydFdpZHRoIDogd2lkdGg7XG4gICAgICAgIGxpbmVzICs9IGNhbExpbmVzO1xuICAgICAgICBsaW5lc0FycmF5W2ldID0gY2FsTGluZXM7XG4gICAgICB9XG4gICAgICBsaW5lcyA9IHZpZXcuY3NzLm1heExpbmVzIDwgbGluZXMgPyB2aWV3LmNzcy5tYXhMaW5lcyA6IGxpbmVzO1xuICAgICAgY29uc3QgbGluZUhlaWdodCA9IHZpZXcuY3NzLmxpbmVIZWlnaHQgPyB2aWV3LmNzcy5saW5lSGVpZ2h0LnRvUHgoKSA6IHZpZXcuY3NzLmZvbnRTaXplLnRvUHgoKTtcbiAgICAgIGhlaWdodCA9IGxpbmVIZWlnaHQgKiBsaW5lcztcblxuICAgICAgZXh0cmEgPSB7XG4gICAgICAgIGxpbmVzLFxuICAgICAgICBsaW5lSGVpZ2h0LFxuICAgICAgICB0ZXh0QXJyYXksXG4gICAgICAgIGxpbmVzQXJyYXksXG4gICAgICB9O1xuICAgICAgLy8g5paH5a2X5Y+W5a6e6ZmF5a695bqmXG4gICAgICBpZiAodmlldy5pZCkge1xuICAgICAgICBsZXQgdGV4dFdpZHRoID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0QXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICB0ZXh0V2lkdGggPSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0QXJyYXlbaV0pLndpZHRoID4gdGV4dFdpZHRoID8gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dEFycmF5W2ldKS53aWR0aCA6IHRleHRXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICB3aWR0aCA9IHdpZHRoID8gKHRleHRXaWR0aCA8IHdpZHRoID8gdGV4dFdpZHRoIDogd2lkdGgpIDogdGV4dFdpZHRoO1xuICAgICAgICAvLyB0aGlzLmdsb2JhbFdpZHRoW3ZpZXcuaWRdID0gd2lkdGggPyAodGV4dFdpZHRoIDwgd2lkdGggPyB0ZXh0V2lkdGggOiB3aWR0aCkgOiB0ZXh0V2lkdGg7XG4gICAgICB9XG4gICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlICdpbWFnZSc6IHtcbiAgICAgIC8vIGltYWdl55qE6ZW/5a696K6+572u5oiQYXV0b+eahOmAu+i+keWkhOeQhlxuICAgICAgY29uc3QgeyBwaXhlbFJhdGlvIH0gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgY29uc3QgcmF0aW8gPSBwaXhlbFJhdGlvIHx8IDI7XG4gICAgICAvLyBjb25zdCByYXRpbyA9IDJcbiAgICAgIC8vIOaciWNzc+WNtOacquiuvue9rndpZHRo5oiWaGVpZ2h077yM5YiZ6buY6K6k5Li6YXV0b1xuICAgICAgaWYgKHZpZXcuY3NzKSB7XG4gICAgICAgIGlmICghdmlldy5jc3Mud2lkdGgpIHtcbiAgICAgICAgICB2aWV3LmNzcy53aWR0aCA9ICdhdXRvJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZpZXcuY3NzLmhlaWdodCkge1xuICAgICAgICAgIHZpZXcuY3NzLmhlaWdodCA9ICdhdXRvJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIXZpZXcuY3NzIHx8ICh2aWV3LmNzcy53aWR0aCA9PT0gJ2F1dG8nICYmIHZpZXcuY3NzLmhlaWdodCA9PT0gJ2F1dG8nKSkge1xuICAgICAgICB3aWR0aCA9IE1hdGgucm91bmQodmlldy5zV2lkdGggLyByYXRpbyk7XG4gICAgICAgIGhlaWdodCA9IE1hdGgucm91bmQodmlldy5zSGVpZ2h0IC8gcmF0aW8pO1xuICAgICAgfSBlbHNlIGlmICh2aWV3LmNzcy53aWR0aCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIGhlaWdodCA9IHZpZXcuY3NzLmhlaWdodC50b1B4KCk7XG4gICAgICAgIHdpZHRoID0gdmlldy5zV2lkdGggLyB2aWV3LnNIZWlnaHQgKiBoZWlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKHZpZXcuY3NzLmhlaWdodCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIHdpZHRoID0gdmlldy5jc3Mud2lkdGgudG9QeCgpO1xuICAgICAgICBoZWlnaHQgPSB2aWV3LnNIZWlnaHQgLyB2aWV3LnNXaWR0aCAqIHdpZHRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2lkdGggPSB2aWV3LmNzcy53aWR0aC50b1B4KCk7XG4gICAgICAgIGhlaWdodCA9IHZpZXcuY3NzLmhlaWdodC50b1B4KCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmICghKHZpZXcuY3NzLndpZHRoICYmIHZpZXcuY3NzLmhlaWdodCkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignWW91IHNob3VsZCBzZXQgd2lkdGggYW5kIGhlaWdodCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHdpZHRoID0gZm9ybWF0VG9OdW0odmlldy5jc3Mud2lkdGgsIHZpZXcucGFyZW50LCAnd2lkdGgnKTtcbiAgICAgIGhlaWdodCA9IGZvcm1hdFRvTnVtKHZpZXcuY3NzLmhlaWdodCwgdmlldy5wYXJlbnQsICdoZWlnaHQnKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIGxldCB4O1xuICAgIC8vIGlmICh2aWV3LmNzcyAmJiB2aWV3LmNzcy5yaWdodCkge1xuICAgIC8vICAgaWYgKHR5cGVvZiB2aWV3LmNzcy5yaWdodCA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyAgICAgeCA9IHRoaXMuc3R5bGUud2lkdGggLSB2aWV3LmNzcy5yaWdodC50b1B4KHRydWUpO1xuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgLy8g5Y+v5Lul55So5pWw57uE5pa55byP77yM5oqK5paH5a2X6ZW/5bqm6K6h566X6L+b5Y67XG4gICAgLy8gICAgIC8vIFtyaWdodCwg5paH5a2XaWQsIOS5mOaVsO+8iOm7mOiupCAx77yJXVxuICAgIC8vICAgICAvLyBbcmlnaHQsIFvmloflrZdpZDEsIOaWh+Wtl2lkMiwg5paH5a2XaWQzXSwg5LmY5pWw77yI6buY6K6kIDHvvIldXG4gICAgLy8gICAgIGNvbnN0IHJpZ2h0cyA9IHZpZXcuY3NzLnJpZ2h0O1xuICAgIC8vICAgICB4ID0gdGhpcy5zdHlsZS53aWR0aCAtIHJpZ2h0c1swXS50b1B4KHRydWUpIC0gdGhpcy5nbG9iYWxXaWR0aFtyaWdodHNbMV1dICogKHJpZ2h0c1syXSB8fCAxKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9IGVsc2UgaWYgKHZpZXcuY3NzICYmIHZpZXcuY3NzLmxlZnQpIHtcbiAgICAvLyAgIC8vIGRlYnVnZ2VyXG4gICAgLy8gICBpZiAodHlwZW9mIHZpZXcuY3NzLmxlZnQgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gICAgIHggPSB2aWV3LmNzcy5sZWZ0LnRvUHgodHJ1ZSk7XG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICBjb25zdCBsZWZ0cyA9IHZpZXcuY3NzLmxlZnQ7XG5cbiAgICAvLyAgICAgaWYgKEFycmF5LmlzQXJyYXkobGVmdHNbMV0pKSB7XG4gICAgLy8gICAgICAgY29uc3QgZHluYW1pY1dpZHRoID0gbGVmdHNbMV0ucmVkdWNlKChwcmUsIG5leHQpID0+IHtcbiAgICAvLyAgICAgICAgIHJldHVybiBwcmUgKyB0aGlzLmdsb2JhbFdpZHRoW25leHRdO1xuICAgIC8vICAgICAgIH0sIDApO1xuICAgIC8vICAgICAgIHggPSBsZWZ0c1swXS50b1B4KHRydWUpICsgZHluYW1pY1dpZHRoICogKGxlZnRzWzJdIHx8IDEpO1xuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgIHggPSBsZWZ0c1swXS50b1B4KHRydWUpICsgdGhpcy5nbG9iYWxXaWR0aFtsZWZ0c1sxXV0gKiAobGVmdHNbMl0gfHwgMSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgLy8gZGVidWdnZXJcbiAgICAvLyAgIH1cbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgeCA9IDA7XG4gICAgLy8gfVxuICAgIC8vIC8vIGNvbnN0IHkgPSB2aWV3LmNzcyAmJiB2aWV3LmNzcy5ib3R0b20gPyB0aGlzLnN0eWxlLmhlaWdodCAtIGhlaWdodCAtIHZpZXcuY3NzLmJvdHRvbS50b1B4KHRydWUpIDogKHZpZXcuY3NzICYmIHZpZXcuY3NzLnRvcCA/IHZpZXcuY3NzLnRvcC50b1B4KHRydWUpIDogMCk7XG4gICAgLy8gbGV0IHk7XG4gICAgLy8gaWYgKHZpZXcuY3NzICYmIHZpZXcuY3NzLmJvdHRvbSkge1xuICAgIC8vICAgeSA9IHRoaXMuc3R5bGUuaGVpZ2h0IC0gaGVpZ2h0IC0gdmlldy5jc3MuYm90dG9tLnRvUHgodHJ1ZSk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIGlmICh2aWV3LmNzcyAmJiB2aWV3LmNzcy50b3ApIHtcbiAgICAvLyAgICAgLy8gZGVidWdnZXI7XG4gICAgLy8gICAgIGlmICh0eXBlb2Ygdmlldy5jc3MudG9wID09PSAnc3RyaW5nJykge1xuICAgIC8vICAgICAgIHkgPSB2aWV3LmNzcy50b3AudG9QeCh0cnVlKTtcbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICBjb25zdCB0b3BzID0gdmlldy5jc3MudG9wO1xuICAgIC8vICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRvcHNbMV0pKSB7XG4gICAgLy8gICAgICAgICBjb25zdCBkeW5hbWljSGVpZ2h0ID0gdG9wc1sxXS5yZWR1Y2UoKHByZSwgbmV4dCkgPT4ge1xuICAgIC8vICAgICAgICAgICByZXR1cm4gcHJlICsgdGhpcy5nbG9iYWxIZWlnaHRbbmV4dF07XG4gICAgLy8gICAgICAgICB9LCAwKTtcbiAgICAvLyAgICAgICAgIHkgPSB0b3BzWzBdLnRvUHgodHJ1ZSkgKyBkeW5hbWljSGVpZ2h0ICogKHRvcHNbMl0gfHwgMSk7XG4gICAgLy8gICAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgIHkgPSB0b3BzWzBdLnRvUHgodHJ1ZSkgKyB0aGlzLmdsb2JhbEhlaWdodFt0b3BzWzFdXSAqICh0b3BzWzJdIHx8IDEpO1xuICAgIC8vICAgICAgIH1cbiAgICAvLyAgICAgICAvLyBkZWJ1Z2dlclxuICAgIC8vICAgICB9XG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICB5ID0gMDtcbiAgICAvLyAgIH1cbiAgICAvLyB9XG5cbiAgICBpZiAodmlldy5pZCkge1xuICAgICAgdGhpcy5nbG9iYWxXaWR0aFt2aWV3LmlkXSA9IHdpZHRoO1xuICAgICAgdGhpcy5nbG9iYWxIZWlnaHRbdmlldy5pZF0gPSBoZWlnaHQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIC8vIHg6IDAsXG4gICAgICAvLyB5OiAwLFxuICAgICAgZXh0cmEsXG4gICAgfTtcbiAgfVxuXG4gIF9wcmVQYWludCh2aWV3LCBub3RDbGlwLCB7IHgsIHksIGhlaWdodCwgd2lkdGggfSkge1xuICAgIC8vIOW9k+iuvue9ruS6hiByaWdodCDml7bvvIzpu5jorqQgYWxpZ24g55SoIHJpZ2h077yM5Y+N5LmL55SoIGxlZnRcbiAgICAvLyDlubPnp7vnlLvluINsZWZ0L3RvcFxuICAgIGNvbnN0IGFsaWduID0gdmlldy5jc3MgJiYgdmlldy5jc3MuYWxpZ24gPyB2aWV3LmNzcy5hbGlnbiA6ICh2aWV3LmNzcyAmJiB2aWV3LmNzcy5yaWdodCA/ICdyaWdodCcgOiAnbGVmdCcpO1xuICAgIHN3aXRjaCAoYWxpZ24pIHtcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHgsIHkgKyBoZWlnaHQgLyAyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgIHRoaXMuY3R4LnRyYW5zbGF0ZSh4IC0gd2lkdGggLyAyLCB5ICsgaGVpZ2h0IC8gMik7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhpcy5jdHgudHJhbnNsYXRlKHggKyB3aWR0aCAvIDIsIHkgKyBoZWlnaHQgLyAyKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBkZWJ1Z2dlcjtcbiAgICAvLyDml4vovazop5LluqZcbiAgICBjb25zdCBhbmdsZSA9IHZpZXcuY3NzICYmIHZpZXcuY3NzLnJvdGF0ZSA/IHRoaXMuX2dldEFuZ2xlKHZpZXcuY3NzLnJvdGF0ZSkgOiAwO1xuICAgIHRoaXMuY3R4LnJvdGF0ZShhbmdsZSk7XG4gICAgLy8g5ZyG6KeS6KOB5YmqXG4gICAgaWYgKCFub3RDbGlwICYmIHZpZXcuY3NzICYmIHZpZXcuY3NzLmJvcmRlclJhZGl1cyAmJiB2aWV3LnR5cGUgIT09ICdyZWN0Jykge1xuICAgICAgdGhpcy5fZG9DbGlwKHZpZXcuY3NzLmJvcmRlclJhZGl1cywgd2lkdGgsIGhlaWdodCwgISF2aWV3LmNzcy5pc09ubHlVcEhhbGYpO1xuICAgIH1cbiAgICAvLyDpmLTlvbFcbiAgICB0aGlzLl9kb1NoYWRvdyh2aWV3KTtcbiAgfVxuXG4gIC8vIOeUu+aWh+Wtl+eahOiDjOaZr+WbvueJh1xuICBfZG9CYWNrZ3JvdW5kKHZpZXcpIHtcbiAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgY29uc3QgeyBoZWlnaHQ6IHJhd0hlaWdodCwgd2lkdGg6IHJhd1dpZHRoIH0gPSB2aWV3LnByb2Nlc3NlZExvY2F0aW9uO1xuICAgIGNvbnN0IHsgY29udGVudFg6IHgsIGNvbnRlbnRZOiB5IH0gPSB2aWV3LnJlbmRlclN0eWxlO1xuXG4gICAgdGhpcy5fcHJlUGFpbnQodmlldywgdHJ1ZSwge1xuICAgICAgeCxcbiAgICAgIHksXG4gICAgICB3aWR0aDogcmF3V2lkdGgsXG4gICAgICBoZWlnaHQ6IHJhd0hlaWdodCxcbiAgICB9KTtcblxuICAgIGNvbnN0IHtcbiAgICAgIGJhY2tncm91bmQsXG4gICAgICBwYWRkaW5nLFxuICAgIH0gPSB2aWV3LmNzcztcbiAgICBsZXQgcGQgPSBbMCwgMCwgMCwgMF07XG4gICAgaWYgKHBhZGRpbmcpIHtcbiAgICAgIGNvbnN0IHBkZyA9IHBhZGRpbmcuc3BsaXQoL1xccysvKTtcbiAgICAgIGlmIChwZGcubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNvbnN0IHggPSBwZGdbMF0udG9QeCgpO1xuICAgICAgICBwZCA9IFt4LCB4LCB4LCB4XTtcbiAgICAgIH1cbiAgICAgIGlmIChwZGcubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIGNvbnN0IHggPSBwZGdbMF0udG9QeCgpO1xuICAgICAgICBjb25zdCB5ID0gcGRnWzFdLnRvUHgoKTtcbiAgICAgICAgcGQgPSBbeCwgeSwgeCwgeV07XG4gICAgICB9XG4gICAgICBpZiAocGRnLmxlbmd0aCA9PT0gMykge1xuICAgICAgICBjb25zdCB4ID0gcGRnWzBdLnRvUHgoKTtcbiAgICAgICAgY29uc3QgeSA9IHBkZ1sxXS50b1B4KCk7XG4gICAgICAgIGNvbnN0IHogPSBwZGdbMl0udG9QeCgpO1xuICAgICAgICBwZCA9IFt4LCB5LCB6LCB5XTtcbiAgICAgIH1cbiAgICAgIGlmIChwZGcubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIGNvbnN0IHggPSBwZGdbMF0udG9QeCgpO1xuICAgICAgICBjb25zdCB5ID0gcGRnWzFdLnRvUHgoKTtcbiAgICAgICAgY29uc3QgeiA9IHBkZ1syXS50b1B4KCk7XG4gICAgICAgIGNvbnN0IGEgPSBwZGdbM10udG9QeCgpO1xuICAgICAgICBwZCA9IFt4LCB5LCB6LCBhXTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgd2lkdGggPSByYXdXaWR0aCArIHBkWzFdICsgcGRbM107XG4gICAgY29uc3QgaGVpZ2h0ID0gcmF3SGVpZ2h0ICsgcGRbMF0gKyBwZFsyXTtcblxuICAgIHRoaXMuX2RvQ2xpcCh2aWV3LmNzcy5ib3JkZXJSYWRpdXMsIHdpZHRoLCBoZWlnaHQpO1xuICAgIC8vIGRlYnVnZ2VyO1xuICAgIGlmIChHRC5hcGkuaXNHcmFkaWVudChiYWNrZ3JvdW5kKSkge1xuICAgICAgR0QuYXBpLmRvR3JhZGllbnQoYmFja2dyb3VuZCwgd2lkdGgsIGhlaWdodCwgdGhpcy5jdHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLmN0eC5maWxsU3R5bGUgPSAnI0ZGNjE0Nic7XG4gICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBiYWNrZ3JvdW5kO1xuICAgIH1cbiAgICB0aGlzLmN0eC5maWxsUmVjdCgtKHdpZHRoIC8gMiksIC0oaGVpZ2h0IC8gMiksIHdpZHRoLCBoZWlnaHQpO1xuICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIF9kcmF3SW1hZ2UodXJsLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgaW1nID0gdGhpcy5kYXRhLl9jYW52YXMuY3JlYXRlSW1hZ2UoKTtcbiAgICBpbWcuc3JjID0gdXJsO1xuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UuYXBwbHkobnVsbCwgW2ltZywgLi4uYXJnc10pO1xuICAgIH07XG4gIH1cblxuICBfZHJhd0Fic0ltYWdlKHZpZXcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF2aWV3LnVybCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCB9ID0gdmlldy5wcm9jZXNzZWRMb2NhdGlvbjtcbiAgICAgICAgLy8gY29uc3QgeyB4LCB5IH0gPSB2aWV3LnJlbmRlclN0eWxlXG4gICAgICAgIGNvbnN0IHsgY29udGVudFg6IHgsIGNvbnRlbnRZOiB5IH0gPSB2aWV3LnJlbmRlclN0eWxlO1xuXG4gICAgICAgIHRoaXMuX3ByZVBhaW50KHZpZXcsIGZhbHNlLCB7IHgsIHksIGhlaWdodCwgd2lkdGggfSk7XG5cbiAgICAgICAgLy8g6I635b6X57yp5pS+5Yiw5Zu+54mH5aSn5bCP57qn5Yir55qE6KOB5YeP5qGGXG4gICAgICAgIGxldCByV2lkdGggPSB2aWV3LnNXaWR0aDtcbiAgICAgICAgbGV0IHJIZWlnaHQgPSB2aWV3LnNIZWlnaHQ7XG4gICAgICAgIGxldCBzdGFydFggPSAwO1xuICAgICAgICBsZXQgc3RhcnRZID0gMDtcbiAgICAgICAgLy8gbGV0IGRTdGFydFggPSAwXG4gICAgICAgIC8vIGxldCBkU3RhcnRZID0gMFxuICAgICAgICAvLyDnu5jnlLvljLrln5/mr5TkvotcbiAgICAgICAgY29uc3QgY3AgPSB3aWR0aCAvIGhlaWdodDtcbiAgICAgICAgLy8g5Y6f5Zu+5q+U5L6LXG4gICAgICAgIGNvbnN0IG9wID0gdmlldy5zV2lkdGggLyB2aWV3LnNIZWlnaHQ7XG4gICAgICAgIGlmIChjcCA+PSBvcCkge1xuICAgICAgICAgIHJIZWlnaHQgPSByV2lkdGggLyBjcDtcbiAgICAgICAgICBzdGFydFkgPSBNYXRoLnJvdW5kKCh2aWV3LnNIZWlnaHQgLSBySGVpZ2h0KSAvIDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJXaWR0aCA9IHJIZWlnaHQgKiBjcDtcbiAgICAgICAgICBzdGFydFggPSBNYXRoLnJvdW5kKCh2aWV3LnNXaWR0aCAtIHJXaWR0aCkgLyAyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmlldy5jc3MgJiYgdmlldy5jc3MuYWxwaGEpIHtcbiAgICAgICAgICB0aGlzLmN0eC5zZXRHbG9iYWxBbHBoYSh2aWV3LmNzcy5hbHBoYSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmlldy5jc3MgJiYgdmlldy5jc3MubW9kZSA9PT0gJ3NjYWxlVG9GaWxsJykge1xuICAgICAgICAgIGlmICh0aGlzLmRhdGEuY2FuaXVzZSkge1xuICAgICAgICAgICAgY29uc3QgaW1nID0gdGhpcy5kYXRhLl9jYW52YXMuY3JlYXRlSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSB2aWV3LnVybDtcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWcsIHN0YXJ0WCwgc3RhcnRZLCByV2lkdGgsIHJIZWlnaHQsIC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgdGhpcy5fZG9Cb3JkZXIodmlldywgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kcmF3SW1hZ2Uodmlldy51cmwsIC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB0aGlzLl9kb0JvcmRlcih2aWV3LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh0aGlzLmRhdGEuY2FuaXVzZSkge1xuICAgICAgICAgICAgY29uc3QgaW1nID0gdGhpcy5kYXRhLl9jYW52YXMuY3JlYXRlSW1hZ2UoKTtcbiAgICAgICAgICAgIGltZy5zcmMgPSB2aWV3LnVybDtcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZShpbWcsIHN0YXJ0WCwgc3RhcnRZLCByV2lkdGgsIHJIZWlnaHQsIC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgdGhpcy5fZG9Cb3JkZXIodmlldywgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2Uodmlldy51cmwsIHN0YXJ0WCwgc3RhcnRZLCByV2lkdGgsIHJIZWlnaHQsIC0od2lkdGggLyAyKSwgLShoZWlnaHQgLyAyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB0aGlzLl9kb0JvcmRlcih2aWV3LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBfZmlsbEFic1RleHQodmlldykge1xuICAgIGlmICghdmlldy50ZXh0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh2aWV3LmNzcy5iYWNrZ3JvdW5kKSB7XG4gICAgICAvLyDnlJ/miJDog4zmma9cbiAgICAgIHRoaXMuX2RvQmFja2dyb3VuZCh2aWV3KTtcbiAgICB9XG4gICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgIGNvbnN0IGZvbnRXZWlnaHQgPSB2aWV3LmNzcy5mb250V2VpZ2h0ID09PSAnYm9sZCcgPyAnYm9sZCcgOiAnbm9ybWFsJztcbiAgICB2aWV3LmNzcy5mb250U2l6ZSA9IHZpZXcuY3NzLmZvbnRTaXplID8gdmlldy5jc3MuZm9udFNpemUgOiAnMjBycHgnO1xuICAgIHRoaXMuY3R4LmZvbnQgPSBgbm9ybWFsICR7Zm9udFdlaWdodH0gJHt2aWV3LmNzcy5mb250U2l6ZS50b1B4KCl9cHggJHt2aWV3LmNzcy5mb250RmFtaWx5ID8gYFwiJHt2aWV3LmNzcy5mb250RmFtaWx5fVwiYCA6ICdzYW5zLXNlcmlmJ31gO1xuICAgIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCwgZXh0cmEgfSA9IHZpZXcucHJvY2Vzc2VkTG9jYXRpb247XG4gICAgLy8gY29uc3QgeyB4LCB5IH0gPSB2aWV3LnJlbmRlclN0eWxlXG4gICAgY29uc3QgeyBjb250ZW50WDogeCwgY29udGVudFk6IHkgfSA9IHZpZXcucmVuZGVyU3R5bGU7XG5cbiAgICB0aGlzLl9wcmVQYWludCh2aWV3LCB2aWV3LmNzcy5iYWNrZ3JvdW5kICYmIHZpZXcuY3NzLmJvcmRlclJhZGl1cywgeyB4LCB5LCBoZWlnaHQsIHdpZHRoIH0pO1xuXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gKHZpZXcuY3NzLmNvbG9yIHx8ICdibGFjaycpO1xuICAgIGNvbnN0IHtcbiAgICAgIGxpbmVzLFxuICAgICAgbGluZUhlaWdodCxcbiAgICAgIHRleHRBcnJheSxcbiAgICAgIGxpbmVzQXJyYXksXG4gICAgfSA9IGV4dHJhO1xuICAgIC8vIGRlYnVnZ2VyXG5cbiAgICBsZXQgbGluZUluZGV4ID0gMDtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRleHRBcnJheS5sZW5ndGg7ICsraikge1xuICAgICAgY29uc3QgcHJlTGluZUxlbmd0aCA9IE1hdGgucm91bmQodGV4dEFycmF5W2pdLmxlbmd0aCAvIGxpbmVzQXJyYXlbal0pO1xuICAgICAgbGV0IHN0YXJ0ID0gMDtcbiAgICAgIGxldCBhbHJlYWR5Q291bnQgPSAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lc0FycmF5W2pdOyArK2kpIHtcbiAgICAgICAgLy8g57uY5Yi26KGM5pWw5aSn5LqO5pyA5aSn6KGM5pWw77yM5YiZ55u05o6l6Lez5Ye65b6q546vXG4gICAgICAgIGlmIChsaW5lSW5kZXggPj0gbGluZXMpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBhbHJlYWR5Q291bnQgPSBwcmVMaW5lTGVuZ3RoO1xuICAgICAgICBsZXQgdGV4dCA9IHRleHRBcnJheVtqXS5zdWJzdHIoc3RhcnQsIGFscmVhZHlDb3VudCk7XG4gICAgICAgIGxldCBtZWFzdXJlZFdpdGggPSB0aGlzLmN0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aDtcbiAgICAgICAgLy8g5aaC5p6c5rWL6YeP5aSn5bCP5bCP5LqOd2lkdGjkuIDkuKrlrZfnrKbnmoTlpKflsI/vvIzliJnov5vooYzooaXpvZDvvIzlpoLmnpzmtYvph4/lpKflsI/otoXlh7ogd2lkdGjvvIzliJnov5vooYzlh4/pmaRcbiAgICAgICAgLy8g5aaC5p6c5bey57uP5Yiw5paH5pys5pyr5bC+77yM5Lmf5LiN6KaB6L+b6KGM6K+l5b6q546vXG4gICAgICAgIHdoaWxlICgoc3RhcnQgKyBhbHJlYWR5Q291bnQgPD0gdGV4dEFycmF5W2pdLmxlbmd0aCkgJiYgKHdpZHRoIC0gbWVhc3VyZWRXaXRoID4gdmlldy5jc3MuZm9udFNpemUudG9QeCgpIHx8IG1lYXN1cmVkV2l0aCA+IHdpZHRoKSkge1xuICAgICAgICAgIGlmIChtZWFzdXJlZFdpdGggPCB3aWR0aCkge1xuICAgICAgICAgICAgdGV4dCA9IHRleHRBcnJheVtqXS5zdWJzdHIoc3RhcnQsICsrYWxyZWFkeUNvdW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgICAgLy8g5aaC5p6c5Y+q5pyJ5LiA5Liq5a2X56ym5pe277yM55u05o6l6Lez5Ye65b6q546vXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGV4dCA9IHRleHRBcnJheVtqXS5zdWJzdHIoc3RhcnQsIC0tYWxyZWFkeUNvdW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVhc3VyZWRXaXRoID0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnQgKz0gdGV4dC5sZW5ndGg7XG4gICAgICAgIC8vIOWmguaenOaYr+acgOWQjuS4gOihjOS6hu+8jOWPkeeOsOi/mOacieacque7mOWItuWujOeahOWGheWuue+8jOWImeWKoC4uLlxuICAgICAgICBpZiAobGluZUluZGV4ID09PSBsaW5lcyAtIDEgJiYgKGogPCB0ZXh0QXJyYXkubGVuZ3RoIC0gMSB8fCBzdGFydCA8IHRleHRBcnJheVtqXS5sZW5ndGgpKSB7XG4gICAgICAgICAgd2hpbGUgKHRoaXMuY3R4Lm1lYXN1cmVUZXh0KGAke3RleHR9Li4uYCkud2lkdGggPiB3aWR0aCkge1xuICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgICAgLy8g5aaC5p6c5Y+q5pyJ5LiA5Liq5a2X56ym5pe277yM55u05o6l6Lez5Ye65b6q546vXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIHRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRleHQgKz0gJy4uLic7XG4gICAgICAgICAgbWVhc3VyZWRXaXRoID0gdGhpcy5jdHgubWVhc3VyZVRleHQodGV4dCkud2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kYXRhLmNhbml1c2UpIHtcbiAgICAgICAgICB0aGlzLmN0eC50ZXh0QWxpZ24gPSB2aWV3LmNzcy50ZXh0QWxpZ24gPyB2aWV3LmNzcy50ZXh0QWxpZ24gOiAnbGVmdCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdHguc2V0VGV4dEFsaWduKHZpZXcuY3NzLnRleHRBbGlnbiA/IHZpZXcuY3NzLnRleHRBbGlnbiA6ICdsZWZ0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHg7XG4gICAgICAgIHN3aXRjaCAodmlldy5jc3MudGV4dEFsaWduKSB7XG4gICAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICAgICAgeCA9IDA7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICB4ID0gKHdpZHRoIC8gMik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgeCA9IC0od2lkdGggLyAyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB5ID0gLShoZWlnaHQgLyAyKSArIChsaW5lSW5kZXggPT09IDAgPyB2aWV3LmNzcy5mb250U2l6ZS50b1B4KCkgOiAodmlldy5jc3MuZm9udFNpemUudG9QeCgpICsgbGluZUluZGV4ICogbGluZUhlaWdodCkpO1xuICAgICAgICBsaW5lSW5kZXgrKztcbiAgICAgICAgaWYgKHZpZXcuY3NzLnRleHRTdHlsZSA9PT0gJ3N0cm9rZScpIHtcbiAgICAgICAgICB0aGlzLmN0eC5zdHJva2VUZXh0KHRleHQsIHgsIHksIG1lYXN1cmVkV2l0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jdHguZmlsbFRleHQodGV4dCwgeCwgeSwgbWVhc3VyZWRXaXRoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmb250U2l6ZSA9IHZpZXcuY3NzLmZvbnRTaXplLnRvUHgoKTtcbiAgICAgICAgaWYgKHZpZXcuY3NzLnRleHREZWNvcmF0aW9uKSB7XG4gICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgaWYgKC9cXGJ1bmRlcmxpbmVcXGIvLnRlc3Qodmlldy5jc3MudGV4dERlY29yYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8oeCArIG1lYXN1cmVkV2l0aCwgeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgvXFxib3ZlcmxpbmVcXGIvLnRlc3Qodmlldy5jc3MudGV4dERlY29yYXRpb24pKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8oeCwgeSAtIGZvbnRTaXplKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4ICsgbWVhc3VyZWRXaXRoLCB5IC0gZm9udFNpemUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoL1xcYmxpbmUtdGhyb3VnaFxcYi8udGVzdCh2aWV3LmNzcy50ZXh0RGVjb3JhdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4LCB5IC0gZm9udFNpemUgLyAzKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4ICsgbWVhc3VyZWRXaXRoLCB5IC0gZm9udFNpemUgLyAzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB2aWV3LmNzcy5jb2xvcjtcbiAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgdGhpcy5fZG9Cb3JkZXIodmlldywgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBfZHJhd0Fic1JlY3Qodmlldykge1xuICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICBjb25zdCB7IGhlaWdodCwgd2lkdGggfSA9IHZpZXcucHJvY2Vzc2VkTG9jYXRpb247XG4gICAgLy8gY29uc3QgeyB4LCB5IH0gPSB2aWV3LnJlbmRlclN0eWxlXG4gICAgY29uc3QgeyBjb250ZW50WDogeCwgY29udGVudFk6IHkgfSA9IHZpZXcucmVuZGVyU3R5bGU7XG5cbiAgICB0aGlzLl9wcmVQYWludCh2aWV3LCBmYWxzZSwgeyB4LCB5LCBoZWlnaHQsIHdpZHRoIH0pO1xuXG4gICAgaWYgKEdELmFwaS5pc0dyYWRpZW50KHZpZXcuY3NzLmNvbG9yKSkge1xuICAgICAgR0QuYXBpLmRvR3JhZGllbnQodmlldy5jc3MuY29sb3IsIHdpZHRoLCBoZWlnaHQsIHRoaXMuY3R4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdmlldy5jc3MuY29sb3I7XG4gICAgfVxuICAgIGNvbnN0IGJvcmRlclJhZGl1cyA9IHZpZXcuY3NzLmJvcmRlclJhZGl1cztcbiAgICBjb25zdCByID0gYm9yZGVyUmFkaXVzID8gTWF0aC5taW4oYm9yZGVyUmFkaXVzLnRvUHgoKSwgd2lkdGggLyAyLCBoZWlnaHQgLyAyKSA6IDA7XG4gICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgdGhpcy5jdHguYXJjKC13aWR0aCAvIDIgKyByLCAtaGVpZ2h0IC8gMiArIHIsIHIsIDEgKiBNYXRoLlBJLCAxLjUgKiBNYXRoLlBJKTsgLy8g5bem5LiK6KeS5ZyG5bynXG4gICAgdGhpcy5jdHgubGluZVRvKHdpZHRoIC8gMiAtIHIsIC1oZWlnaHQgLyAyKTtcbiAgICB0aGlzLmN0eC5hcmMod2lkdGggLyAyIC0gciwgLWhlaWdodCAvIDIgKyByLCByLCAxLjUgKiBNYXRoLlBJLCAyICogTWF0aC5QSSk7IC8vIOWPs+S4iuinkuWchuW8p1xuICAgIHRoaXMuY3R4LmxpbmVUbyh3aWR0aCAvIDIsIGhlaWdodCAvIDIgLSByKTtcbiAgICB0aGlzLmN0eC5hcmMod2lkdGggLyAyIC0gciwgaGVpZ2h0IC8gMiAtIHIsIHIsIDAsIDAuNSAqIE1hdGguUEkpOyAvLyDlj7PkuIvop5LlnIblvKdcbiAgICB0aGlzLmN0eC5saW5lVG8oLXdpZHRoIC8gMiArIHIsIGhlaWdodCAvIDIpO1xuICAgIHRoaXMuY3R4LmFyYygtd2lkdGggLyAyICsgciwgaGVpZ2h0IC8gMiAtIHIsIHIsIDAuNSAqIE1hdGguUEksIDEgKiBNYXRoLlBJKTsgLy8g5bem5LiL6KeS5ZyG5bynXG4gICAgdGhpcy5jdHguY2xvc2VQYXRoKCk7XG4gICAgdGhpcy5jdHguZmlsbCgpO1xuICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICB0aGlzLl9kb0JvcmRlcih2aWV3LCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIC8vIHNoYWRvdyDmlK/mjIEgKHgsIHksIGJsdXIsIGNvbG9yKSwg5LiN5pSv5oyBIHNwcmVhZFxuICAvLyBzaGFkb3c6MHB4IDBweCAxMHB4IHJnYmEoMCwwLDAsMC4xKTtcbiAgX2RvU2hhZG93KHZpZXcpIHtcbiAgICBpZiAoIXZpZXcuY3NzIHx8ICF2aWV3LmNzcy5zaGFkb3cpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYm94ID0gdmlldy5jc3Muc2hhZG93LnJlcGxhY2UoLyxcXHMrL2csICcsJykuc3BsaXQoJyAnKTtcbiAgICBpZiAoYm94Lmxlbmd0aCA+IDQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3NoYWRvdyBkb25cXCd0IHNwcmVhZCBvcHRpb24nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdHguc2hhZG93T2Zmc2V0WCA9IHBhcnNlSW50KGJveFswXSwgMTApO1xuICAgIHRoaXMuY3R4LnNoYWRvd09mZnNldFkgPSBwYXJzZUludChib3hbMV0sIDEwKTtcbiAgICB0aGlzLmN0eC5zaGFkb3dCbHVyID0gcGFyc2VJbnQoYm94WzJdLCAxMCk7XG4gICAgdGhpcy5jdHguc2hhZG93Q29sb3IgPSBib3hbM107XG4gIH1cblxuICBfZ2V0QW5nbGUoYW5nbGUpIHtcbiAgICByZXR1cm4gTnVtYmVyKGFuZ2xlKSAqIE1hdGguUEkgLyAxODA7XG4gIH1cbn1cbiJdfQ==