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
Object.defineProperty(exports, "__esModule", { value: true });
var pen_1 = require("./lib/pen");
var util_1 = require("./lib/util");
require("./lib/html");
var util = require('./lib/util');
var MAX_PAINT_COUNT = 5;
Component({
    canvasStyleWidthInPx: 0,
    canvasStyleHeightInPx: 0,
    paintCount: 0,
    properties: {
        palette: {
            type: Object,
            observer: function (newVal, oldVal) {
                if (this.isNeedRefresh(newVal, oldVal)) {
                    this.paintCount = 0;
                    console.time();
                    this.startPaint();
                }
            },
        },
        widthPixels: {
            type: Number,
            value: 0,
        },
        dirty: {
            type: Boolean,
            value: false,
        },
        setImgScreenWidth: {
            type: String,
            value: '',
        },
        painterBodyStyle: {
            type: String,
            value: '',
        },
    },
    data: {
        picURL: '',
        showCanvas: true,
        painterStyle: '',
        outputPic: '',
        caniuse: false,
        realAllH: 0,
        realWhiteH: 0,
        canvasNode: {},
        canvasCtx: {},
        pen: {},
        calcTpl: {},
    },
    lifetimes: {
        attached: function () {
            var caniuse = util_1.canUseNewCanvas();
            this.setData({
                caniuse: caniuse,
            });
        },
    },
    methods: {
        isEmpty: function (object) {
            for (var i in object) {
                return false;
            }
            return true;
        },
        isNeedRefresh: function (newVal, oldVal) {
            if (!newVal || this.isEmpty(newVal) || (this.data.dirty && util.equal(newVal, oldVal))) {
                return false;
            }
            return true;
        },
        startPaint: function () {
            return __awaiter(this, void 0, void 0, function () {
                var error, screenK, _a, width, height, calcTpl, _b, calcWidth, calcHeight, innerpalette, _palette, ctx, canvasNode, pen;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (this.isEmpty(this.properties.palette)) {
                                return [2];
                            }
                            try {
                                wx.getSystemInfoSync();
                            }
                            catch (e) {
                                error = "Painter get system info failed, " + JSON.stringify(e);
                                this.triggerEvent('imgErr', {
                                    error: error,
                                });
                                console.error(error);
                                return [2];
                            }
                            screenK = wx.getSystemInfoSync().screenWidth / 750;
                            setStringPrototype(screenK, 1);
                            _a = this.properties.palette.children[0].css, width = _a.width, height = _a.height;
                            if (!width || !height) {
                                console.error("You should set width and height correctly for painter, width: " + width + ", height: " + height);
                                return [2];
                            }
                            return [4, this.getCalcTpl(this.properties.palette)];
                        case 1:
                            calcTpl = _c.sent();
                            this.data.calcTpl = calcTpl;
                            _b = calcTpl.children[0].processedLocation, calcWidth = _b.width, calcHeight = _b.height;
                            this.canvasStyleWidthInPx = calcWidth;
                            this.canvasStyleHeightInPx = calcHeight;
                            if (this.properties.widthPixels) {
                                setStringPrototype(screenK, this.properties.widthPixels / this.canvasStyleWidthInPx);
                                this.canvasStyleWidthInPx = this.properties.widthPixels;
                            }
                            this.setData({
                                painterStyle: "width:" + this.canvasStyleWidthInPx + "px;height:" + this.canvasStyleHeightInPx + "px;position: fixed;top:0px;",
                            });
                            return [4, this.initCanvasNew(this.data.calcTpl)];
                        case 2:
                            innerpalette = _c.sent();
                            _palette = innerpalette;
                            ctx = this.data.canvasCtx;
                            canvasNode = this.data.canvasNode;
                            pen = new pen_1.default(ctx, __assign(__assign({}, _palette), { caniuse: this.data.caniuse, _canvas: canvasNode }));
                            pen.paint(function () {
                            });
                            return [2];
                    }
                });
            });
        },
        getCalcTpl: function (palette) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                try {
                    var query = wx.createSelectorQuery().in(_this);
                    query
                        .select('#canvasp')
                        .fields({ node: true, size: true })
                        .exec(function (res) { return __awaiter(_this, void 0, void 0, function () {
                        var canvasNode, ctx, pen, layout;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    canvasNode = res[0].node;
                                    ctx = canvasNode.getContext('2d');
                                    this.data.canvasNode = canvasNode;
                                    this.data.canvasCtx = ctx;
                                    pen = new pen_1.default(ctx, __assign(__assign({}, palette), { caniuse: this.data.caniuse, _canvas: canvasNode }));
                                    this.data.pen = pen;
                                    return [4, pen.beforePaint()];
                                case 1:
                                    layout = _a.sent();
                                    resolve(layout);
                                    return [2];
                            }
                        });
                    }); });
                }
                catch (err) {
                    reject(err);
                }
            });
        },
        initCanvasNew: function () {
            return __awaiter(this, void 0, void 0, function () {
                var palette, dpr;
                return __generator(this, function (_a) {
                    palette = this.data.calcTpl;
                    dpr = wx.getSystemInfoSync().pixelRatio;
                    this.data.canvasNode.height = (palette.children[0].processedLocation.height) * dpr;
                    this.data.canvasNode.width = (palette.children[0].processedLocation.width) * dpr;
                    this.data.canvasCtx.scale(dpr, dpr);
                    return [2, palette];
                });
            });
        },
        initCanvasOld: function (windowWidth, width) {
            var ctx = wx.createCanvasContext('k-canvas', this);
            var ratio = windowWidth / width.toPx();
            ctx.scale(ratio, ratio);
            return ctx;
        },
        saveImgToLocal: function () {
            var _this = this;
            var that = this;
            var _a = this.properties.palette, height = _a.height, width = _a.width;
            var _b = wx.getSystemInfoSync(), windowWidth = _b.windowWidth, windowHeight = _b.windowHeight, pixelRatio = _b.pixelRatio;
            console.log('dpr`````````````````` ', pixelRatio);
            console.timeEnd();
            var pW = width.toPx();
            var dpr = pixelRatio;
            var divider = 1;
            var _c = [this.data.realAllH, width.toPx()], h = _c[0], w = _c[1];
            var ratio = h / w;
            var pH = pW * ratio;
            setTimeout(function () {
                var props = {
                    canvasId: 'k-canvas',
                    x: 0,
                    y: 0,
                    width: pW / divider,
                    height: pH / divider,
                    destWidth: pW / divider * dpr,
                    destHeight: pH / divider * dpr,
                    success: function (res) {
                        that.getImageInfo(res.tempFilePath);
                    },
                    fail: function (error) {
                        console.error("canvasToTempFilePath failed, " + JSON.stringify(error));
                        that.triggerEvent('imgErr', {
                            error: error,
                        });
                    },
                };
                var caniuse = false;
                if (caniuse) {
                    var imgPath = _this.data.canvasNode.toDataURL('image/png', 1);
                    _this.setData({
                        outputPic: imgPath,
                    });
                    var randomNum = Math.floor((Math.random() * 1000) + 1);
                    var filePath_1 = wx.env.USER_DATA_PATH + ("/qrcode" + randomNum + ".png");
                    var _z_1 = _this;
                    wx.getFileSystemManager().writeFile({
                        filePath: filePath_1,
                        data: _z_1.data.outputPic.slice(22),
                        encoding: 'base64',
                        success: function () {
                            console.log('success');
                            _z_1.triggerEvent('imgOK', {
                                path: filePath_1,
                                id: '#canvasp',
                            });
                        },
                        fail: function (error) {
                            console.log(error);
                        },
                    });
                }
                else {
                    props.canvas = _this.data.canvasNode;
                    wx.canvasToTempFilePath(props, _this);
                }
            }, 480);
        },
        getImageInfo: function (filePath) {
            var that = this;
            wx.getImageInfo({
                src: filePath,
                success: function (infoRes) {
                    if (that.paintCount > MAX_PAINT_COUNT) {
                        var error = "The result is always fault, even we tried " + MAX_PAINT_COUNT + " times";
                        console.error(error);
                        that.triggerEvent('imgErr', {
                            error: error,
                        });
                        return;
                    }
                    that.setData({
                        outputPic: filePath,
                    });
                    that.triggerEvent('imgOK', {
                        path: filePath,
                        id: '#canvasp',
                    });
                    that.paintCount++;
                },
                fail: function (error) {
                    console.error("getImageInfo failed, " + JSON.stringify(error));
                    that.triggerEvent('imgErr', {
                        error: error,
                    });
                },
            });
        },
        getTitleHeight: function (ctx, view) {
            return __awaiter(this, void 0, void 0, function () {
                var width, height, textArray, i, fontWeight, lines, linesArray, i, textLength, partWidth, calLines, lineHeight;
                return __generator(this, function (_a) {
                    if (!view.text)
                        return [2, 0];
                    width = 0;
                    textArray = view.text.split('\n');
                    for (i = 0; i < textArray.length; ++i) {
                        if (textArray[i] === '') {
                            textArray[i] = ' ';
                        }
                    }
                    fontWeight = view.fontWeight === 'bold' ? 'bold' : 'normal';
                    view.fontSize = view.fontSize ? view.fontSize : '20rpx';
                    ctx.font = "normal " + fontWeight + " " + view.fontSize.toPx() + "px " + (view.fontFamily ? "\"" + view.fontFamily + "\"" : 'sans-serif');
                    lines = 0;
                    linesArray = [];
                    for (i = 0; i < textArray.length; ++i) {
                        textLength = ctx.measureText(textArray[i]).width;
                        partWidth = view.width ? view.width.toPx() : textLength;
                        calLines = Math.ceil(textLength / partWidth);
                        width = partWidth > width ? partWidth : width;
                        lines += calLines;
                        linesArray[i] = calLines;
                    }
                    lines = view.maxLines < lines ? view.maxLines : lines;
                    lineHeight = view.lineHeight ? view.lineHeight.toPx() : view.css.fontSize.toPx();
                    height = lineHeight * lines;
                    return [2, height];
                });
            });
        },
    },
});
function setStringPrototype(screenK, scale) {
    String.prototype.toPx = function toPx(minus) {
        var reg;
        if (minus) {
            reg = /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
        }
        else {
            reg = /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
        }
        var results = reg.exec(this);
        if (!this || !results) {
            console.error("The size: " + this + " is illegal");
            return 0;
        }
        var unit = results[2];
        var value = parseFloat(this);
        var res = 0;
        if (unit === 'rpx') {
            res = Math.round(value * screenK * (scale || 1));
        }
        else if (unit === 'px') {
            res = Math.round(value * (scale || 1));
        }
        return res;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFpbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy94eHBhaW50L3BhaW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlDQUE0QjtBQUU1QixtQ0FBNkM7QUFFN0Msc0JBQW1CO0FBQ25CLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUluQyxJQUFNLGVBQWUsR0FBRyxDQUFDLENBQUM7QUFDMUIsU0FBUyxDQUFDO0lBQ1Isb0JBQW9CLEVBQUUsQ0FBQztJQUN2QixxQkFBcUIsRUFBRSxDQUFDO0lBQ3hCLFVBQVUsRUFBRSxDQUFDO0lBSWIsVUFBVSxFQUFFO1FBQ1YsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLFlBQUMsTUFBTSxFQUFFLE1BQU07Z0JBQ3JCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO29CQUNwQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2lCQUNuQjtZQUNILENBQUM7U0FDRjtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLENBQUM7U0FDVDtRQUVELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLEtBQUs7U0FDYjtRQUNELGlCQUFpQixFQUFFO1lBQ2pCLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLEVBQUU7U0FDVjtRQUNELGdCQUFnQixFQUFFO1lBQ2hCLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLEVBQUU7U0FDVjtLQUNGO0lBRUQsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFF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bEQ7YUFBTSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDeEIsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IFBlbiBmcm9tICcuL2xpYi9wZW4nO1xuLy8gaW1wb3J0IHsgZG93bmxvYWRJbWFnZXMgfSBmcm9tICcuL2xpYi9pbWFnZSc7XG5pbXBvcnQgeyBjYW5Vc2VOZXdDYW52YXMgfSBmcm9tICcuL2xpYi91dGlsJztcbmltcG9ydCB7IGNyZWF0ZVRyZWUgfSBmcm9tICcuL2xpYi90cmVlJztcbmltcG9ydCAnLi9saWIvaHRtbCdcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL2xpYi91dGlsJyk7XG5cblxuLy8g5pyA5aSn5bCd6K+V55qE57uY5Yi25qyh5pWwXG5jb25zdCBNQVhfUEFJTlRfQ09VTlQgPSA1O1xuQ29tcG9uZW50KHtcbiAgY2FudmFzU3R5bGVXaWR0aEluUHg6IDAsXG4gIGNhbnZhc1N0eWxlSGVpZ2h0SW5QeDogMCxcbiAgcGFpbnRDb3VudDogMCxcbiAgLyoqXG4gICAqIOe7hOS7tueahOWxnuaAp+WIl+ihqFxuICAgKi9cbiAgcHJvcGVydGllczoge1xuICAgIHBhbGV0dGU6IHtcbiAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgIG9ic2VydmVyKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTmVlZFJlZnJlc2gobmV3VmFsLCBvbGRWYWwpKSB7XG4gICAgICAgICAgdGhpcy5wYWludENvdW50ID0gMDtcbiAgICAgICAgICBjb25zb2xlLnRpbWUoKTtcbiAgICAgICAgICB0aGlzLnN0YXJ0UGFpbnQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICAgIHdpZHRoUGl4ZWxzOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICB2YWx1ZTogMCxcbiAgICB9LFxuICAgIC8vIOWQr+eUqOiEj+ajgOafpe+8jOm7mOiupCBmYWxzZVxuICAgIGRpcnR5OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IGZhbHNlLFxuICAgIH0sXG4gICAgc2V0SW1nU2NyZWVuV2lkdGg6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICB9LFxuICAgIHBhaW50ZXJCb2R5U3R5bGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICB9LFxuICB9LFxuXG4gIGRhdGE6IHtcbiAgICBwaWNVUkw6ICcnLFxuICAgIHNob3dDYW52YXM6IHRydWUsXG4gICAgcGFpbnRlclN0eWxlOiAnJyxcbiAgICBvdXRwdXRQaWM6ICcnLFxuICAgIGNhbml1c2U6IGZhbHNlLFxuICAgIHJlYWxBbGxIOiAwLFxuICAgIHJlYWxXaGl0ZUg6IDAsXG4gICAgY2FudmFzTm9kZToge30sXG4gICAgY2FudmFzQ3R4OiB7fSxcbiAgICBwZW46IHt9LFxuICAgIGNhbGNUcGw6IHt9LCAvLyDorqHnrpflkI7nmoTmqKHmnb/kv6Hmga9cbiAgfSxcblxuICBsaWZldGltZXM6IHtcbiAgICBhdHRhY2hlZCgpIHtcbiAgICAgIGNvbnN0IGNhbml1c2UgPSBjYW5Vc2VOZXdDYW52YXMoKTtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGNhbml1c2UsXG4gICAgICB9KTtcbiAgICB9LFxuXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuXG4gICAgLyoqXG4gICAgICog5Yik5pat5LiA5LiqIG9iamVjdCDmmK/lkKbkuLog56m6XG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAqL1xuICAgIGlzRW1wdHkob2JqZWN0KSB7XG4gICAgICBmb3IgKGNvbnN0IGkgaW4gb2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBpc05lZWRSZWZyZXNoKG5ld1ZhbCwgb2xkVmFsKSB7XG4gICAgICBpZiAoIW5ld1ZhbCB8fCB0aGlzLmlzRW1wdHkobmV3VmFsKSB8fCAodGhpcy5kYXRhLmRpcnR5ICYmIHV0aWwuZXF1YWwobmV3VmFsLCBvbGRWYWwpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgYXN5bmMgc3RhcnRQYWludCgpIHtcbiAgICAgIGlmICh0aGlzLmlzRW1wdHkodGhpcy5wcm9wZXJ0aWVzLnBhbGV0dGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8g5YW85a655bCP56iL5bqP5o+S5Lu2XG4gICAgICB0cnkge1xuICAgICAgICB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zdCBlcnJvciA9IGBQYWludGVyIGdldCBzeXN0ZW0gaW5mbyBmYWlsZWQsICR7SlNPTi5zdHJpbmdpZnkoZSl9YDtcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2ltZ0VycicsIHtcbiAgICAgICAgICBlcnJvcixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzY3JlZW5LID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKS5zY3JlZW5XaWR0aCAvIDc1MDtcbiAgICAgIHNldFN0cmluZ1Byb3RvdHlwZShzY3JlZW5LLCAxKTtcblxuICAgICAgY29uc3Qge1xuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgfSA9IHRoaXMucHJvcGVydGllcy5wYWxldHRlLmNoaWxkcmVuWzBdLmNzcztcblxuICAgICAgaWYgKCF3aWR0aCB8fCAhaGVpZ2h0KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFlvdSBzaG91bGQgc2V0IHdpZHRoIGFuZCBoZWlnaHQgY29ycmVjdGx5IGZvciBwYWludGVyLCB3aWR0aDogJHt3aWR0aH0sIGhlaWdodDogJHtoZWlnaHR9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2FsY1RwbCA9IGF3YWl0IHRoaXMuZ2V0Q2FsY1RwbCh0aGlzLnByb3BlcnRpZXMucGFsZXR0ZSk7XG4gICAgICB0aGlzLmRhdGEuY2FsY1RwbCA9IGNhbGNUcGw7XG4gICAgICBjb25zdCB7IHdpZHRoOiBjYWxjV2lkdGgsIGhlaWdodDogY2FsY0hlaWdodCB9ID0gY2FsY1RwbC5jaGlsZHJlblswXS5wcm9jZXNzZWRMb2NhdGlvbjtcblxuICAgICAgLy8gZGVidWdnZXI7XG5cbiAgICAgIC8vIC0tLS0tLS0tLWJlZ2luLS0tLS0tLS0tLS0g55So5L2c5bGV56S6Y2FudmFz77yM5LiN5b2x5ZON5pyA5ZCO5L+d5a2Y55qE5Zu+54mHO+i/memHjOWPquS4uuS6huWSjOWbvueJh+S/neivgTF2MeeahOWxleekuuavlOS+i1xuICAgICAgdGhpcy5jYW52YXNTdHlsZVdpZHRoSW5QeCA9IGNhbGNXaWR0aDtcbiAgICAgIHRoaXMuY2FudmFzU3R5bGVIZWlnaHRJblB4ID0gY2FsY0hlaWdodDtcbiAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMud2lkdGhQaXhlbHMpIHtcbiAgICAgICAgLy8g5aaC5p6c6YeN5paw6K6+572u6L+H5YOP57Sg5a695bqm77yM5YiZ6YeN5paw6K6+572u5q+U5L6LXG4gICAgICAgIHNldFN0cmluZ1Byb3RvdHlwZShzY3JlZW5LLCB0aGlzLnByb3BlcnRpZXMud2lkdGhQaXhlbHMgLyB0aGlzLmNhbnZhc1N0eWxlV2lkdGhJblB4KTtcbiAgICAgICAgdGhpcy5jYW52YXNTdHlsZVdpZHRoSW5QeCA9IHRoaXMucHJvcGVydGllcy53aWR0aFBpeGVscztcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHBhaW50ZXJTdHlsZTogYHdpZHRoOiR7dGhpcy5jYW52YXNTdHlsZVdpZHRoSW5QeH1weDtoZWlnaHQ6JHt0aGlzLmNhbnZhc1N0eWxlSGVpZ2h0SW5QeH1weDtwb3NpdGlvbjogZml4ZWQ7dG9wOjBweDtgLFxuICAgICAgfSk7XG4gICAgICAvLyAtLS0tLS0tLS1lbmQtLS0tLS0tLS0tLVxuXG4gICAgICBjb25zdCBpbm5lcnBhbGV0dGUgPSBhd2FpdCB0aGlzLmluaXRDYW52YXNOZXcodGhpcy5kYXRhLmNhbGNUcGwpO1xuICAgICAgY29uc3QgX3BhbGV0dGUgPSBpbm5lcnBhbGV0dGU7XG4gICAgICBjb25zdCBjdHggPSB0aGlzLmRhdGEuY2FudmFzQ3R4O1xuICAgICAgY29uc3QgY2FudmFzTm9kZSA9IHRoaXMuZGF0YS5jYW52YXNOb2RlO1xuICAgICAgY29uc3QgcGVuID0gbmV3IFBlbihjdHgsIHsgLi4uX3BhbGV0dGUsIGNhbml1c2U6IHRoaXMuZGF0YS5jYW5pdXNlLCBfY2FudmFzOiBjYW52YXNOb2RlIH0pO1xuICAgICAgcGVuLnBhaW50KCgpID0+IHtcbiAgICAgICAgLy8gY2FudmFzTm9kZS5oZWlnaHQgPSAodGhpcy5kYXRhLnJlYWxBbGxIKSAqIDM7XG4gICAgICAgIC8vIHRoaXMuc2F2ZUltZ1RvTG9jYWwoKTtcbiAgICAgIH0pO1xuICAgICAgLy8gfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOW+gOeUu+eslOazqOWFpeWIneWni+WMlmNhbnZhc1xuICAgICAqIEBwYXJhbSB7Kn0gcGFsZXR0ZVxuICAgICAqL1xuICAgIGdldENhbGNUcGwocGFsZXR0ZSkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBxdWVyeSA9IHd4LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKS5pbih0aGlzKTtcbiAgICAgICAgICBxdWVyeVxuICAgICAgICAgICAgLnNlbGVjdCgnI2NhbnZhc3AnKVxuICAgICAgICAgICAgLmZpZWxkcyh7IG5vZGU6IHRydWUsIHNpemU6IHRydWUgfSlcbiAgICAgICAgICAgIC5leGVjKGFzeW5jIChyZXMpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY2FudmFzTm9kZSA9IHJlc1swXS5ub2RlO1xuICAgICAgICAgICAgICBjb25zdCBjdHggPSBjYW52YXNOb2RlLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICAgIHRoaXMuZGF0YS5jYW52YXNOb2RlID0gY2FudmFzTm9kZTtcbiAgICAgICAgICAgICAgdGhpcy5kYXRhLmNhbnZhc0N0eCA9IGN0eDtcbiAgICAgICAgICAgICAgY29uc3QgcGVuID0gbmV3IFBlbihjdHgsIHsgLi4ucGFsZXR0ZSwgY2FuaXVzZTogdGhpcy5kYXRhLmNhbml1c2UsIF9jYW52YXM6IGNhbnZhc05vZGUgfSk7XG4gICAgICAgICAgICAgIHRoaXMuZGF0YS5wZW4gPSBwZW47XG4gICAgICAgICAgICAgIGNvbnN0IGxheW91dCA9IGF3YWl0IHBlbi5iZWZvcmVQYWludCgpO1xuICAgICAgICAgICAgICByZXNvbHZlKGxheW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBhc3luYyBpbml0Q2FudmFzTmV3KCkge1xuICAgICAgLy8g5aSW6YOo5Y+q6ZyA6KaB5Zyo5a6e5L6L5YyWY2FudmFz5pe255+l6YGT5a6e6ZmF5a696auY5Y2z5Y+vXG4gICAgICBjb25zdCBwYWxldHRlID0gdGhpcy5kYXRhLmNhbGNUcGw7XG4gICAgICBjb25zdCBkcHIgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLnBpeGVsUmF0aW87XG5cbiAgICAgIC8vIOmHjee9rmNhbnZhc+aAu+mrmOW6plxuICAgICAgdGhpcy5kYXRhLmNhbnZhc05vZGUuaGVpZ2h0ID0gKHBhbGV0dGUuY2hpbGRyZW5bMF0ucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0KSAqIGRwcjtcbiAgICAgIHRoaXMuZGF0YS5jYW52YXNOb2RlLndpZHRoID0gKHBhbGV0dGUuY2hpbGRyZW5bMF0ucHJvY2Vzc2VkTG9jYXRpb24ud2lkdGgpICogZHByO1xuICAgICAgdGhpcy5kYXRhLmNhbnZhc0N0eC5zY2FsZShkcHIsIGRwcik7XG4gICAgICByZXR1cm4gcGFsZXR0ZTtcbiAgICB9LFxuICAgIGluaXRDYW52YXNPbGQod2luZG93V2lkdGgsIHdpZHRoKSB7XG4gICAgICAvLyBjb25zdCB7IHdpbmRvd1dpZHRoIH0gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgICAgY29uc3QgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgnay1jYW52YXMnLCB0aGlzKTtcbiAgICAgIC8vIOaMieWxj+W5leWuveW6pue8qeaUvlxuICAgICAgY29uc3QgcmF0aW8gPSB3aW5kb3dXaWR0aCAvIHdpZHRoLnRvUHgoKTtcbiAgICAgIGN0eC5zY2FsZShyYXRpbywgcmF0aW8pO1xuICAgICAgcmV0dXJuIGN0eDtcbiAgICB9LFxuXG4gICAgc2F2ZUltZ1RvTG9jYWwoKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCB9ID0gdGhpcy5wcm9wZXJ0aWVzLnBhbGV0dGU7XG4gICAgICBjb25zdCB7IHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQsIHBpeGVsUmF0aW8gfSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICBjb25zb2xlLmxvZygnZHByYGBgYGBgYGBgYGBgYGBgYGBgICcsIHBpeGVsUmF0aW8pO1xuICAgICAgY29uc29sZS50aW1lRW5kKCk7XG4gICAgICAvLyBjb25zdCBbcFddID0gW3dpbmRvd1dpZHRoXVxuICAgICAgY29uc3QgcFcgPSB3aWR0aC50b1B4KCk7XG4gICAgICBjb25zdCBkcHIgPSBwaXhlbFJhdGlvO1xuICAgICAgLy8gY29uc3QgZHByID0gM1xuICAgICAgY29uc3QgZGl2aWRlciA9IDE7XG5cbiAgICAgIC8vIGNvbnN0IFtoLCB3XSA9IFtoZWlnaHQudG9QeCgpLCB3aWR0aC50b1B4KCldXG4gICAgICBjb25zdCBbaCwgd10gPSBbdGhpcy5kYXRhLnJlYWxBbGxILCB3aWR0aC50b1B4KCldO1xuICAgICAgLy8gY29uc3QgW2gsIHddID0gW3dpbmRvd0hlaWdodCwgd2luZG93V2lkdGhdXG4gICAgICBjb25zdCByYXRpbyA9IGggLyB3O1xuICAgICAgY29uc3QgcEggPSBwVyAqIHJhdGlvO1xuICAgICAgLy8gY29uc3QgW2EsYixjLGRdID0gW3BXIC8gZGl2aWRlcixwSCAvIGRpdmlkZXIscFcgLyBkaXZpZGVyICpkcHIscEggLyBkaXZpZGVyICpkcHJdXG4gICAgICAvLyBkZWJ1Z2dlclxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICAgICAgY2FudmFzSWQ6ICdrLWNhbnZhcycsXG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICB5OiAwLFxuICAgICAgICAgIHdpZHRoOiBwVyAvIGRpdmlkZXIsXG4gICAgICAgICAgaGVpZ2h0OiBwSCAvIGRpdmlkZXIsXG4gICAgICAgICAgZGVzdFdpZHRoOiBwVyAvIGRpdmlkZXIgKiBkcHIsXG4gICAgICAgICAgZGVzdEhlaWdodDogcEggLyBkaXZpZGVyICogZHByLFxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICB0aGF0LmdldEltYWdlSW5mbyhyZXMudGVtcEZpbGVQYXRoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGZhaWwoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYGNhbnZhc1RvVGVtcEZpbGVQYXRoIGZhaWxlZCwgJHtKU09OLnN0cmluZ2lmeShlcnJvcil9YCk7XG4gICAgICAgICAgICB0aGF0LnRyaWdnZXJFdmVudCgnaW1nRXJyJywge1xuICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIC8vIHd4LmdldFNhdmVkRmlsZUxpc3Qoe1xuICAgICAgICAvLyAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIC8vICAgICBpZiAocmVzLmZpbGVMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAgIC8vICAgICAgIC8vIOWwj+eoi+W6j+acrOWcsOaWh+S7tuWtmOWCqOeahOWkp+Wwj+mZkOWItuS4ujEwTe+8jOavj+asoeeUn+aIkOaXtuWIoOmZpOS4iuS4gOasoeS/neWtmOeahOa1t+aKpVxuICAgICAgICAvLyAgICAgICByZXMuZmlsZUxpc3QuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHd4LnJlbW92ZVNhdmVkRmlsZSh7XG4gICAgICAgIC8vICAgICAgICAgICBmaWxlUGF0aDogeC5maWxlUGF0aCxcbiAgICAgICAgLy8gICAgICAgICAgIGNvbXBsZXRlKCkge1xuXG4gICAgICAgIC8vICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgfSk7XG4gICAgICAgIC8vICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgIH1cbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIGNvbnN0IGNhbml1c2UgPSBjYW5Vc2VOZXdDYW52YXMoKTtcbiAgICAgICAgY29uc3QgY2FuaXVzZSA9IGZhbHNlO1xuICAgICAgICBpZiAoY2FuaXVzZSkge1xuICAgICAgICAgIGNvbnN0IGltZ1BhdGggPSB0aGlzLmRhdGEuY2FudmFzTm9kZS50b0RhdGFVUkwoJ2ltYWdlL3BuZycsIDEpO1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBvdXRwdXRQaWM6IGltZ1BhdGgsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCByYW5kb21OdW0gPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTAwMCkgKyAxKTtcbiAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHd4LmVudi5VU0VSX0RBVEFfUEFUSCArIGAvcXJjb2RlJHtyYW5kb21OdW19LnBuZ2A7XG4gICAgICAgICAgY29uc3QgX3ogPSB0aGlzO1xuXG4gICAgICAgICAgd3guZ2V0RmlsZVN5c3RlbU1hbmFnZXIoKS53cml0ZUZpbGUoe1xuICAgICAgICAgICAgZmlsZVBhdGgsIC8vIOi/memHjOWFiOaKiuaWh+S7tuWGmeWIsOS4tOaXtuebruW9lemHjC5cbiAgICAgICAgICAgIGRhdGE6IF96LmRhdGEub3V0cHV0UGljLnNsaWNlKDIyKSwgLy8g5rOo5oSP6L+Z6YeMXG4gICAgICAgICAgICBlbmNvZGluZzogJ2Jhc2U2NCcsXG4gICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJyk7XG5cbiAgICAgICAgICAgICAgX3oudHJpZ2dlckV2ZW50KCdpbWdPSycsIHtcbiAgICAgICAgICAgICAgICBwYXRoOiBmaWxlUGF0aCxcbiAgICAgICAgICAgICAgICBpZDogJyNjYW52YXNwJyxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHMuY2FudmFzID0gdGhpcy5kYXRhLmNhbnZhc05vZGU7XG4gICAgICAgICAgd3guY2FudmFzVG9UZW1wRmlsZVBhdGgocHJvcHMsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9LCA0ODApO1xuICAgIH0sXG4gICAgZ2V0SW1hZ2VJbmZvKGZpbGVQYXRoKSB7XG4gICAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICAgIHd4LmdldEltYWdlSW5mbyh7XG4gICAgICAgIHNyYzogZmlsZVBhdGgsXG4gICAgICAgIHN1Y2Nlc3M6IChpbmZvUmVzKSA9PiB7XG4gICAgICAgICAgaWYgKHRoYXQucGFpbnRDb3VudCA+IE1BWF9QQUlOVF9DT1VOVCkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBgVGhlIHJlc3VsdCBpcyBhbHdheXMgZmF1bHQsIGV2ZW4gd2UgdHJpZWQgJHtNQVhfUEFJTlRfQ09VTlR9IHRpbWVzYDtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgdGhhdC50cmlnZ2VyRXZlbnQoJ2ltZ0VycicsIHtcbiAgICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g5q+U5L6L55u456ym5pe25omN6K+B5piO57uY5Yi25oiQ5Yqf77yM5ZCm5YiZ6L+b6KGM5by65Yi26YeN57uY5Yi2XG4gICAgICAgICAgLy8gaWYgKE1hdGguYWJzKChpbmZvUmVzLndpZHRoICogdGhhdC5jYW52YXNTdHlsZUhlaWdodEluUHggLSB0aGF0LmNhbnZhc1N0eWxlV2lkdGhJblB4ICogaW5mb1Jlcy5oZWlnaHQpIC8gKGluZm9SZXMuaGVpZ2h0ICogdGhhdC5jYW52YXNTdHlsZUhlaWdodEluUHgpKSA8IDAuMDEpIHtcbiAgICAgICAgICAvLyAgIHRoYXQudHJpZ2dlckV2ZW50KCdpbWdPSycsIHtcbiAgICAgICAgICAvLyAgICAgcGF0aDogZmlsZVBhdGgsXG4gICAgICAgICAgLy8gICAgIGlkOiAnI2NhbnZhc3AnLFxuICAgICAgICAgIC8vICAgfSk7XG5cbiAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgIC8vICAgdGhhdC5zdGFydFBhaW50KCk7XG4gICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgIG91dHB1dFBpYzogZmlsZVBhdGgsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhhdC50cmlnZ2VyRXZlbnQoJ2ltZ09LJywge1xuICAgICAgICAgICAgcGF0aDogZmlsZVBhdGgsXG4gICAgICAgICAgICBpZDogJyNjYW52YXNwJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGF0LnBhaW50Q291bnQrKztcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgZ2V0SW1hZ2VJbmZvIGZhaWxlZCwgJHtKU09OLnN0cmluZ2lmeShlcnJvcil9YCk7XG4gICAgICAgICAgdGhhdC50cmlnZ2VyRXZlbnQoJ2ltZ0VycicsIHtcbiAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBhc3luYyBnZXRUaXRsZUhlaWdodChjdHgsIHZpZXcpIHtcbiAgICAgIC8vIGNvbnN0IGN0eCA9IGF3YWl0IHRoaXMuZ2V0VGV4dENhbnZhcygpXG4gICAgICBpZiAoIXZpZXcudGV4dCkgcmV0dXJuIDA7XG4gICAgICBsZXQgd2lkdGggPSAwO1xuICAgICAgbGV0IGhlaWdodDtcbiAgICAgIC8vIOWcqOWOn+aciWhlaWdodOWfuuehgOS4iu+8jOWKqOaAgeWPmOWMlnh4eHh4eOaWh+Wtl+eahOmrmOW6pi0tLS0tLWJlZ2luLS0tLS0tXG4gICAgICBjb25zdCB0ZXh0QXJyYXkgPSB2aWV3LnRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgLy8g5aSE55CG5aSa5Liq6L+e57ut55qEJ1xcbidcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dEFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0ZXh0QXJyYXlbaV0gPT09ICcnKSB7XG4gICAgICAgICAgdGV4dEFycmF5W2ldID0gJyAnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBmb250V2VpZ2h0ID0gdmlldy5mb250V2VpZ2h0ID09PSAnYm9sZCcgPyAnYm9sZCcgOiAnbm9ybWFsJztcbiAgICAgIHZpZXcuZm9udFNpemUgPSB2aWV3LmZvbnRTaXplID8gdmlldy5mb250U2l6ZSA6ICcyMHJweCc7XG4gICAgICBjdHguZm9udCA9IGBub3JtYWwgJHtmb250V2VpZ2h0fSAke3ZpZXcuZm9udFNpemUudG9QeCgpfXB4ICR7dmlldy5mb250RmFtaWx5ID8gYFwiJHt2aWV3LmZvbnRGYW1pbHl9XCJgIDogJ3NhbnMtc2VyaWYnfWA7XG5cbiAgICAgIC8vIOiuoeeul+ihjOaVsFxuICAgICAgbGV0IGxpbmVzID0gMDtcbiAgICAgIGNvbnN0IGxpbmVzQXJyYXkgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dEFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvbnN0IHRleHRMZW5ndGggPSBjdHgubWVhc3VyZVRleHQodGV4dEFycmF5W2ldKS53aWR0aDtcbiAgICAgICAgY29uc3QgcGFydFdpZHRoID0gdmlldy53aWR0aCA/IHZpZXcud2lkdGgudG9QeCgpIDogdGV4dExlbmd0aDtcbiAgICAgICAgY29uc3QgY2FsTGluZXMgPSBNYXRoLmNlaWwodGV4dExlbmd0aCAvIHBhcnRXaWR0aCk7XG4gICAgICAgIHdpZHRoID0gcGFydFdpZHRoID4gd2lkdGggPyBwYXJ0V2lkdGggOiB3aWR0aDtcbiAgICAgICAgbGluZXMgKz0gY2FsTGluZXM7XG4gICAgICAgIGxpbmVzQXJyYXlbaV0gPSBjYWxMaW5lcztcbiAgICAgIH1cbiAgICAgIGxpbmVzID0gdmlldy5tYXhMaW5lcyA8IGxpbmVzID8gdmlldy5tYXhMaW5lcyA6IGxpbmVzO1xuICAgICAgY29uc3QgbGluZUhlaWdodCA9IHZpZXcubGluZUhlaWdodCA/IHZpZXcubGluZUhlaWdodC50b1B4KCkgOiB2aWV3LmNzcy5mb250U2l6ZS50b1B4KCk7XG4gICAgICBoZWlnaHQgPSBsaW5lSGVpZ2h0ICogbGluZXM7XG4gICAgICByZXR1cm4gaGVpZ2h0O1xuICAgICAgLy8g5Zyo5Y6f5pyJaGVpZ2h05Z+656GA5LiK77yM5Yqo5oCB5Y+Y5YyWeHh4eHh45paH5a2X55qE6auY5bqmLS0tLS0tZW5kLS0tLS0tXG4gICAgfSxcblxuICB9LFxufSk7XG5cbmZ1bmN0aW9uIHNldFN0cmluZ1Byb3RvdHlwZShzY3JlZW5LLCBzY2FsZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1leHRlbmQtbmF0aXZlICovXG4gIC8qKlxuICAgKiDmmK/lkKbmlK/mjIHotJ/mlbBcbiAgICogQHBhcmFtIHtCb29sZWFufSBtaW51cyDmmK/lkKbmlK/mjIHotJ/mlbBcbiAgICovXG4gIFN0cmluZy5wcm90b3R5cGUudG9QeCA9IGZ1bmN0aW9uIHRvUHgobWludXMpIHtcbiAgICBsZXQgcmVnO1xuICAgIGlmIChtaW51cykge1xuICAgICAgcmVnID0gL14tP1swLTldKyhbLl17MX1bMC05XSspezAsMX0ocnB4fHB4KSQvZztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVnID0gL15bMC05XSsoWy5dezF9WzAtOV0rKXswLDF9KHJweHxweCkkL2c7XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdHMgPSByZWcuZXhlYyh0aGlzKTtcbiAgICBpZiAoIXRoaXMgfHwgIXJlc3VsdHMpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFRoZSBzaXplOiAke3RoaXN9IGlzIGlsbGVnYWxgKTtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBjb25zdCB1bml0ID0gcmVzdWx0c1syXTtcbiAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcyk7XG5cbiAgICBsZXQgcmVzID0gMDtcbiAgICBpZiAodW5pdCA9PT0gJ3JweCcpIHtcbiAgICAgIHJlcyA9IE1hdGgucm91bmQodmFsdWUgKiBzY3JlZW5LICogKHNjYWxlIHx8IDEpKTtcbiAgICB9IGVsc2UgaWYgKHVuaXQgPT09ICdweCcpIHtcbiAgICAgIHJlcyA9IE1hdGgucm91bmQodmFsdWUgKiAoc2NhbGUgfHwgMSkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xufVxuIl19