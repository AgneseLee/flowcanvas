"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var error, screenK, _a, width, height, calcTpl, _b, calcWidth, calcHeight, innerpalette, _palette, ctx, canvasNode, pen;
                return tslib_1.__generator(this, function (_c) {
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
                            pen = new pen_1.default(ctx, tslib_1.__assign(tslib_1.__assign({}, _palette), { caniuse: this.data.caniuse, _canvas: canvasNode }));
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
                        .exec(function (res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var canvasNode, ctx, pen, layout;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    canvasNode = res[0].node;
                                    ctx = canvasNode.getContext('2d');
                                    this.data.canvasNode = canvasNode;
                                    this.data.canvasCtx = ctx;
                                    pen = new pen_1.default(ctx, tslib_1.__assign(tslib_1.__assign({}, palette), { caniuse: this.data.caniuse, _canvas: canvasNode }));
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var palette, dpr;
                return tslib_1.__generator(this, function (_a) {
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
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var width, height, textArray, i, fontWeight, lines, linesArray, i, textLength, partWidth, calLines, lineHeight;
                return tslib_1.__generator(this, function (_a) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFpbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy94eHBhaW50L3BhaW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaUNBQTRCO0FBRTVCLG1DQUE2QztBQUU3QyxzQkFBbUI7QUFDbkIsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBR25DLElBQU0sZUFBZSxHQUFHLENBQUMsQ0FBQztBQUMxQixTQUFTLENBQUM7SUFDUixvQkFBb0IsRUFBRSxDQUFDO0lBQ3ZCLHFCQUFxQixFQUFFLENBQUM7SUFDeEIsVUFBVSxFQUFFLENBQUM7SUFJYixVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsWUFBQyxNQUFNLEVBQUUsTUFBTTtnQkFDckIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtvQkFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7b0JBQ3BCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDZixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ25CO1lBQ0gsQ0FBQztTQUNGO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsQ0FBQztTQUNUO1FBRUQsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsS0FBSztTQUNiO1FBQ0QsaUJBQWlCLEVBQUU7WUFDakIsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsRUFBRTtTQUNWO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDaEIsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsRUFBRTtTQUNWO0tBQ0Y7SUFFRCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsRUFBRTtRQUNWLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFlBQVksRUFBRSxFQUFF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LENBQUMsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbmltcG9ydCBQZW4gZnJvbSAnLi9saWIvcGVuJztcbmltcG9ydCB7IGRvd25sb2FkSW1hZ2VzIH0gZnJvbSAnLi9saWIvaW1hZ2UnO1xuaW1wb3J0IHsgY2FuVXNlTmV3Q2FudmFzIH0gZnJvbSAnLi9saWIvdXRpbCc7XG5pbXBvcnQgeyBjcmVhdGVUcmVlIH0gZnJvbSAnLi9saWIvdHJlZSc7XG5pbXBvcnQgJy4vbGliL2h0bWwnXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi9saWIvdXRpbCcpO1xuXG4vLyDmnIDlpKflsJ3or5XnmoTnu5jliLbmrKHmlbBcbmNvbnN0IE1BWF9QQUlOVF9DT1VOVCA9IDU7XG5Db21wb25lbnQoe1xuICBjYW52YXNTdHlsZVdpZHRoSW5QeDogMCxcbiAgY2FudmFzU3R5bGVIZWlnaHRJblB4OiAwLFxuICBwYWludENvdW50OiAwLFxuICAvKipcbiAgICog57uE5Lu255qE5bGe5oCn5YiX6KGoXG4gICAqL1xuICBwcm9wZXJ0aWVzOiB7XG4gICAgcGFsZXR0ZToge1xuICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgb2JzZXJ2ZXIobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNOZWVkUmVmcmVzaChuZXdWYWwsIG9sZFZhbCkpIHtcbiAgICAgICAgICB0aGlzLnBhaW50Q291bnQgPSAwO1xuICAgICAgICAgIGNvbnNvbGUudGltZSgpO1xuICAgICAgICAgIHRoaXMuc3RhcnRQYWludCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gICAgd2lkdGhQaXhlbHM6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiAwLFxuICAgIH0sXG4gICAgLy8g5ZCv55So6ISP5qOA5p+l77yM6buY6K6kIGZhbHNlXG4gICAgZGlydHk6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogZmFsc2UsXG4gICAgfSxcbiAgICBzZXRJbWdTY3JlZW5XaWR0aDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnLFxuICAgIH0sXG4gICAgcGFpbnRlckJvZHlTdHlsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnLFxuICAgIH0sXG4gIH0sXG5cbiAgZGF0YToge1xuICAgIHBpY1VSTDogJycsXG4gICAgc2hvd0NhbnZhczogdHJ1ZSxcbiAgICBwYWludGVyU3R5bGU6ICcnLFxuICAgIG91dHB1dFBpYzogJycsXG4gICAgY2FuaXVzZTogZmFsc2UsXG4gICAgcmVhbEFsbEg6IDAsXG4gICAgcmVhbFdoaXRlSDogMCxcbiAgICBjYW52YXNOb2RlOiB7fSxcbiAgICBjYW52YXNDdHg6IHt9LFxuICAgIHBlbjoge30sXG4gICAgY2FsY1RwbDoge30sIC8vIOiuoeeul+WQjueahOaooeadv+S/oeaBr1xuICB9LFxuXG4gIGxpZmV0aW1lczoge1xuICAgIGF0dGFjaGVkKCkge1xuICAgICAgY29uc3QgY2FuaXVzZSA9IGNhblVzZU5ld0NhbnZhcygpO1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgY2FuaXVzZSxcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgfSxcblxuICBtZXRob2RzOiB7XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3kuIDkuKogb2JqZWN0IOaYr+WQpuS4uiDnqbpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICovXG4gICAgaXNFbXB0eShvYmplY3QpIHtcbiAgICAgIGZvciAoY29uc3QgaSBpbiBvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIGlzTmVlZFJlZnJlc2gobmV3VmFsLCBvbGRWYWwpIHtcbiAgICAgIGlmICghbmV3VmFsIHx8IHRoaXMuaXNFbXB0eShuZXdWYWwpIHx8ICh0aGlzLmRhdGEuZGlydHkgJiYgdXRpbC5lcXVhbChuZXdWYWwsIG9sZFZhbCkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBhc3luYyBzdGFydFBhaW50KCkge1xuICAgICAgaWYgKHRoaXMuaXNFbXB0eSh0aGlzLnByb3BlcnRpZXMucGFsZXR0ZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyDlhbzlrrnlsI/nqIvluo/mj5Lku7ZcbiAgICAgIHRyeSB7XG4gICAgICAgIHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gYFBhaW50ZXIgZ2V0IHN5c3RlbSBpbmZvIGZhaWxlZCwgJHtKU09OLnN0cmluZ2lmeShlKX1gO1xuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudCgnaW1nRXJyJywge1xuICAgICAgICAgIGVycm9yLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNjcmVlbksgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLnNjcmVlbldpZHRoIC8gNzUwO1xuICAgICAgc2V0U3RyaW5nUHJvdG90eXBlKHNjcmVlbkssIDEpO1xuXG4gICAgICBjb25zdCB7XG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICB9ID0gdGhpcy5wcm9wZXJ0aWVzLnBhbGV0dGUuY2hpbGRyZW5bMF0uY3NzO1xuXG4gICAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgWW91IHNob3VsZCBzZXQgd2lkdGggYW5kIGhlaWdodCBjb3JyZWN0bHkgZm9yIHBhaW50ZXIsIHdpZHRoOiAke3dpZHRofSwgaGVpZ2h0OiAke2hlaWdodH1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjYWxjVHBsID0gYXdhaXQgdGhpcy5nZXRDYWxjVHBsKHRoaXMucHJvcGVydGllcy5wYWxldHRlKTtcbiAgICAgIHRoaXMuZGF0YS5jYWxjVHBsID0gY2FsY1RwbDtcbiAgICAgIGNvbnN0IHsgd2lkdGg6IGNhbGNXaWR0aCwgaGVpZ2h0OiBjYWxjSGVpZ2h0IH0gPSBjYWxjVHBsLmNoaWxkcmVuWzBdLnByb2Nlc3NlZExvY2F0aW9uO1xuXG4gICAgICAvLyBkZWJ1Z2dlcjtcblxuICAgICAgLy8gLS0tLS0tLS0tYmVnaW4tLS0tLS0tLS0tLSDnlKjkvZzlsZXnpLpjYW52YXPvvIzkuI3lvbHlk43mnIDlkI7kv53lrZjnmoTlm77niYc76L+Z6YeM5Y+q5Li65LqG5ZKM5Zu+54mH5L+d6K+BMXYx55qE5bGV56S65q+U5L6LXG4gICAgICB0aGlzLmNhbnZhc1N0eWxlV2lkdGhJblB4ID0gY2FsY1dpZHRoO1xuICAgICAgdGhpcy5jYW52YXNTdHlsZUhlaWdodEluUHggPSBjYWxjSGVpZ2h0O1xuICAgICAgaWYgKHRoaXMucHJvcGVydGllcy53aWR0aFBpeGVscykge1xuICAgICAgICAvLyDlpoLmnpzph43mlrDorr7nva7ov4flg4/ntKDlrr3luqbvvIzliJnph43mlrDorr7nva7mr5TkvotcbiAgICAgICAgc2V0U3RyaW5nUHJvdG90eXBlKHNjcmVlbkssIHRoaXMucHJvcGVydGllcy53aWR0aFBpeGVscyAvIHRoaXMuY2FudmFzU3R5bGVXaWR0aEluUHgpO1xuICAgICAgICB0aGlzLmNhbnZhc1N0eWxlV2lkdGhJblB4ID0gdGhpcy5wcm9wZXJ0aWVzLndpZHRoUGl4ZWxzO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgcGFpbnRlclN0eWxlOiBgd2lkdGg6JHt0aGlzLmNhbnZhc1N0eWxlV2lkdGhJblB4fXB4O2hlaWdodDoke3RoaXMuY2FudmFzU3R5bGVIZWlnaHRJblB4fXB4O3Bvc2l0aW9uOiBmaXhlZDt0b3A6MHB4O2AsXG4gICAgICB9KTtcbiAgICAgIC8vIC0tLS0tLS0tLWVuZC0tLS0tLS0tLS0tXG5cbiAgICAgIGNvbnN0IGlubmVycGFsZXR0ZSA9IGF3YWl0IHRoaXMuaW5pdENhbnZhc05ldyh0aGlzLmRhdGEuY2FsY1RwbCk7XG4gICAgICBjb25zdCBfcGFsZXR0ZSA9IGlubmVycGFsZXR0ZTtcbiAgICAgIGNvbnN0IGN0eCA9IHRoaXMuZGF0YS5jYW52YXNDdHg7XG4gICAgICBjb25zdCBjYW52YXNOb2RlID0gdGhpcy5kYXRhLmNhbnZhc05vZGU7XG4gICAgICBjb25zdCBwZW4gPSBuZXcgUGVuKGN0eCwgeyAuLi5fcGFsZXR0ZSwgY2FuaXVzZTogdGhpcy5kYXRhLmNhbml1c2UsIF9jYW52YXM6IGNhbnZhc05vZGUgfSk7XG4gICAgICBwZW4ucGFpbnQoKCkgPT4ge1xuICAgICAgICAvLyBjYW52YXNOb2RlLmhlaWdodCA9ICh0aGlzLmRhdGEucmVhbEFsbEgpICogMztcbiAgICAgICAgLy8gdGhpcy5zYXZlSW1nVG9Mb2NhbCgpO1xuICAgICAgfSk7XG4gICAgICAvLyB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5b6A55S756yU5rOo5YWl5Yid5aeL5YyWY2FudmFzXG4gICAgICogQHBhcmFtIHsqfSBwYWxldHRlXG4gICAgICovXG4gICAgZ2V0Q2FsY1RwbChwYWxldHRlKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gd3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpLmluKHRoaXMpO1xuICAgICAgICAgIHF1ZXJ5XG4gICAgICAgICAgICAuc2VsZWN0KCcjY2FudmFzcCcpXG4gICAgICAgICAgICAuZmllbGRzKHsgbm9kZTogdHJ1ZSwgc2l6ZTogdHJ1ZSB9KVxuICAgICAgICAgICAgLmV4ZWMoYXN5bmMgKHJlcykgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjYW52YXNOb2RlID0gcmVzWzBdLm5vZGU7XG4gICAgICAgICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhc05vZGUuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgICAgdGhpcy5kYXRhLmNhbnZhc05vZGUgPSBjYW52YXNOb2RlO1xuICAgICAgICAgICAgICB0aGlzLmRhdGEuY2FudmFzQ3R4ID0gY3R4O1xuICAgICAgICAgICAgICBjb25zdCBwZW4gPSBuZXcgUGVuKGN0eCwgeyAuLi5wYWxldHRlLCBjYW5pdXNlOiB0aGlzLmRhdGEuY2FuaXVzZSwgX2NhbnZhczogY2FudmFzTm9kZSB9KTtcbiAgICAgICAgICAgICAgdGhpcy5kYXRhLnBlbiA9IHBlbjtcbiAgICAgICAgICAgICAgY29uc3QgbGF5b3V0ID0gYXdhaXQgcGVuLmJlZm9yZVBhaW50KCk7XG4gICAgICAgICAgICAgIHJlc29sdmUobGF5b3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGFzeW5jIGluaXRDYW52YXNOZXcoKSB7XG4gICAgICAvLyDlpJbpg6jlj6rpnIDopoHlnKjlrp7kvovljJZjYW52YXPml7bnn6XpgZPlrp7pmYXlrr3pq5jljbPlj69cbiAgICAgIGNvbnN0IHBhbGV0dGUgPSB0aGlzLmRhdGEuY2FsY1RwbDtcbiAgICAgIGNvbnN0IGRwciA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCkucGl4ZWxSYXRpbztcblxuICAgICAgLy8g6YeN572uY2FudmFz5oC76auY5bqmXG4gICAgICB0aGlzLmRhdGEuY2FudmFzTm9kZS5oZWlnaHQgPSAocGFsZXR0ZS5jaGlsZHJlblswXS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQpICogZHByO1xuICAgICAgdGhpcy5kYXRhLmNhbnZhc05vZGUud2lkdGggPSAocGFsZXR0ZS5jaGlsZHJlblswXS5wcm9jZXNzZWRMb2NhdGlvbi53aWR0aCkgKiBkcHI7XG4gICAgICB0aGlzLmRhdGEuY2FudmFzQ3R4LnNjYWxlKGRwciwgZHByKTtcbiAgICAgIHJldHVybiBwYWxldHRlO1xuICAgIH0sXG4gICAgaW5pdENhbnZhc09sZCh3aW5kb3dXaWR0aCwgd2lkdGgpIHtcbiAgICAgIC8vIGNvbnN0IHsgd2luZG93V2lkdGggfSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICBjb25zdCBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KCdrLWNhbnZhcycsIHRoaXMpO1xuICAgICAgLy8g5oyJ5bGP5bmV5a695bqm57yp5pS+XG4gICAgICBjb25zdCByYXRpbyA9IHdpbmRvd1dpZHRoIC8gd2lkdGgudG9QeCgpO1xuICAgICAgY3R4LnNjYWxlKHJhdGlvLCByYXRpbyk7XG4gICAgICByZXR1cm4gY3R4O1xuICAgIH0sXG5cbiAgICBzYXZlSW1nVG9Mb2NhbCgpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgY29uc3QgeyBoZWlnaHQsIHdpZHRoIH0gPSB0aGlzLnByb3BlcnRpZXMucGFsZXR0ZTtcbiAgICAgIGNvbnN0IHsgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCwgcGl4ZWxSYXRpbyB9ID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdkcHJgYGBgYGBgYGBgYGBgYGBgYGAgJywgcGl4ZWxSYXRpbyk7XG4gICAgICBjb25zb2xlLnRpbWVFbmQoKTtcbiAgICAgIC8vIGNvbnN0IFtwV10gPSBbd2luZG93V2lkdGhdXG4gICAgICBjb25zdCBwVyA9IHdpZHRoLnRvUHgoKTtcbiAgICAgIGNvbnN0IGRwciA9IHBpeGVsUmF0aW87XG4gICAgICAvLyBjb25zdCBkcHIgPSAzXG4gICAgICBjb25zdCBkaXZpZGVyID0gMTtcblxuICAgICAgLy8gY29uc3QgW2gsIHddID0gW2hlaWdodC50b1B4KCksIHdpZHRoLnRvUHgoKV1cbiAgICAgIGNvbnN0IFtoLCB3XSA9IFt0aGlzLmRhdGEucmVhbEFsbEgsIHdpZHRoLnRvUHgoKV07XG4gICAgICAvLyBjb25zdCBbaCwgd10gPSBbd2luZG93SGVpZ2h0LCB3aW5kb3dXaWR0aF1cbiAgICAgIGNvbnN0IHJhdGlvID0gaCAvIHc7XG4gICAgICBjb25zdCBwSCA9IHBXICogcmF0aW87XG4gICAgICAvLyBjb25zdCBbYSxiLGMsZF0gPSBbcFcgLyBkaXZpZGVyLHBIIC8gZGl2aWRlcixwVyAvIGRpdmlkZXIgKmRwcixwSCAvIGRpdmlkZXIgKmRwcl1cbiAgICAgIC8vIGRlYnVnZ2VyXG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgICAgICBjYW52YXNJZDogJ2stY2FudmFzJyxcbiAgICAgICAgICB4OiAwLFxuICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgd2lkdGg6IHBXIC8gZGl2aWRlcixcbiAgICAgICAgICBoZWlnaHQ6IHBIIC8gZGl2aWRlcixcbiAgICAgICAgICBkZXN0V2lkdGg6IHBXIC8gZGl2aWRlciAqIGRwcixcbiAgICAgICAgICBkZXN0SGVpZ2h0OiBwSCAvIGRpdmlkZXIgKiBkcHIsXG4gICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICAgIHRoYXQuZ2V0SW1hZ2VJbmZvKHJlcy50ZW1wRmlsZVBhdGgpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFpbChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgY2FudmFzVG9UZW1wRmlsZVBhdGggZmFpbGVkLCAke0pTT04uc3RyaW5naWZ5KGVycm9yKX1gKTtcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlckV2ZW50KCdpbWdFcnInLCB7XG4gICAgICAgICAgICAgIGVycm9yLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgLy8gd3guZ2V0U2F2ZWRGaWxlTGlzdCh7XG4gICAgICAgIC8vICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgLy8gICAgIGlmIChyZXMuZmlsZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyAgICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgICAgLy8gICAgICAgLy8g5bCP56iL5bqP5pys5Zyw5paH5Lu25a2Y5YKo55qE5aSn5bCP6ZmQ5Yi25Li6MTBN77yM5q+P5qyh55Sf5oiQ5pe25Yig6Zmk5LiK5LiA5qyh5L+d5a2Y55qE5rW35oqlXG4gICAgICAgIC8vICAgICAgIHJlcy5maWxlTGlzdC5mb3JFYWNoKCh4KSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgd3gucmVtb3ZlU2F2ZWRGaWxlKHtcbiAgICAgICAgLy8gICAgICAgICAgIGZpbGVQYXRoOiB4LmZpbGVQYXRoLFxuICAgICAgICAvLyAgICAgICAgICAgY29tcGxldGUoKSB7XG5cbiAgICAgICAgLy8gICAgICAgICAgIH1cbiAgICAgICAgLy8gICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgfSk7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgfVxuICAgICAgICAvLyB9KTtcbiAgICAgICAgLy8gY29uc3QgY2FuaXVzZSA9IGNhblVzZU5ld0NhbnZhcygpO1xuICAgICAgICBjb25zdCBjYW5pdXNlID0gZmFsc2U7XG4gICAgICAgIGlmIChjYW5pdXNlKSB7XG4gICAgICAgICAgY29uc3QgaW1nUGF0aCA9IHRoaXMuZGF0YS5jYW52YXNOb2RlLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJywgMSk7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIG91dHB1dFBpYzogaW1nUGF0aCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IHJhbmRvbU51bSA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxMDAwKSArIDEpO1xuICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gd3guZW52LlVTRVJfREFUQV9QQVRIICsgYC9xcmNvZGUke3JhbmRvbU51bX0ucG5nYDtcbiAgICAgICAgICBjb25zdCBfeiA9IHRoaXM7XG5cbiAgICAgICAgICB3eC5nZXRGaWxlU3lzdGVtTWFuYWdlcigpLndyaXRlRmlsZSh7XG4gICAgICAgICAgICBmaWxlUGF0aCwgLy8g6L+Z6YeM5YWI5oqK5paH5Lu25YaZ5Yiw5Li05pe255uu5b2V6YeMLlxuICAgICAgICAgICAgZGF0YTogX3ouZGF0YS5vdXRwdXRQaWMuc2xpY2UoMjIpLCAvLyDms6jmhI/ov5nph4xcbiAgICAgICAgICAgIGVuY29kaW5nOiAnYmFzZTY0JyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MnKTtcblxuICAgICAgICAgICAgICBfei50cmlnZ2VyRXZlbnQoJ2ltZ09LJywge1xuICAgICAgICAgICAgICAgIHBhdGg6IGZpbGVQYXRoLFxuICAgICAgICAgICAgICAgIGlkOiAnI2NhbnZhc3AnLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wcy5jYW52YXMgPSB0aGlzLmRhdGEuY2FudmFzTm9kZTtcbiAgICAgICAgICB3eC5jYW52YXNUb1RlbXBGaWxlUGF0aChwcm9wcywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0sIDQ4MCk7XG4gICAgfSxcbiAgICBnZXRJbWFnZUluZm8oZmlsZVBhdGgpIHtcbiAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgICAgd3guZ2V0SW1hZ2VJbmZvKHtcbiAgICAgICAgc3JjOiBmaWxlUGF0aCxcbiAgICAgICAgc3VjY2VzczogKGluZm9SZXMpID0+IHtcbiAgICAgICAgICBpZiAodGhhdC5wYWludENvdW50ID4gTUFYX1BBSU5UX0NPVU5UKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IGBUaGUgcmVzdWx0IGlzIGFsd2F5cyBmYXVsdCwgZXZlbiB3ZSB0cmllZCAke01BWF9QQUlOVF9DT1VOVH0gdGltZXNgO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB0aGF0LnRyaWdnZXJFdmVudCgnaW1nRXJyJywge1xuICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDmr5Tkvovnm7jnrKbml7bmiY3or4HmmI7nu5jliLbmiJDlip/vvIzlkKbliJnov5vooYzlvLrliLbph43nu5jliLZcbiAgICAgICAgICAvLyBpZiAoTWF0aC5hYnMoKGluZm9SZXMud2lkdGggKiB0aGF0LmNhbnZhc1N0eWxlSGVpZ2h0SW5QeCAtIHRoYXQuY2FudmFzU3R5bGVXaWR0aEluUHggKiBpbmZvUmVzLmhlaWdodCkgLyAoaW5mb1Jlcy5oZWlnaHQgKiB0aGF0LmNhbnZhc1N0eWxlSGVpZ2h0SW5QeCkpIDwgMC4wMSkge1xuICAgICAgICAgIC8vICAgdGhhdC50cmlnZ2VyRXZlbnQoJ2ltZ09LJywge1xuICAgICAgICAgIC8vICAgICBwYXRoOiBmaWxlUGF0aCxcbiAgICAgICAgICAvLyAgICAgaWQ6ICcjY2FudmFzcCcsXG4gICAgICAgICAgLy8gICB9KTtcblxuICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgLy8gICB0aGF0LnN0YXJ0UGFpbnQoKTtcbiAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgb3V0cHV0UGljOiBmaWxlUGF0aCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGF0LnRyaWdnZXJFdmVudCgnaW1nT0snLCB7XG4gICAgICAgICAgICBwYXRoOiBmaWxlUGF0aCxcbiAgICAgICAgICAgIGlkOiAnI2NhbnZhc3AnLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoYXQucGFpbnRDb3VudCsrO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBnZXRJbWFnZUluZm8gZmFpbGVkLCAke0pTT04uc3RyaW5naWZ5KGVycm9yKX1gKTtcbiAgICAgICAgICB0aGF0LnRyaWdnZXJFdmVudCgnaW1nRXJyJywge1xuICAgICAgICAgICAgZXJyb3IsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGFzeW5jIGdldFRpdGxlSGVpZ2h0KGN0eCwgdmlldykge1xuICAgICAgLy8gY29uc3QgY3R4ID0gYXdhaXQgdGhpcy5nZXRUZXh0Q2FudmFzKClcbiAgICAgIGlmICghdmlldy50ZXh0KSByZXR1cm4gMDtcbiAgICAgIGxldCB3aWR0aCA9IDA7XG4gICAgICBsZXQgaGVpZ2h0O1xuICAgICAgLy8g5Zyo5Y6f5pyJaGVpZ2h05Z+656GA5LiK77yM5Yqo5oCB5Y+Y5YyWeHh4eHh45paH5a2X55qE6auY5bqmLS0tLS0tYmVnaW4tLS0tLS1cbiAgICAgIGNvbnN0IHRleHRBcnJheSA9IHZpZXcudGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICAvLyDlpITnkIblpJrkuKrov57nu63nmoQnXFxuJ1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0QXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHRleHRBcnJheVtpXSA9PT0gJycpIHtcbiAgICAgICAgICB0ZXh0QXJyYXlbaV0gPSAnICc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IGZvbnRXZWlnaHQgPSB2aWV3LmZvbnRXZWlnaHQgPT09ICdib2xkJyA/ICdib2xkJyA6ICdub3JtYWwnO1xuICAgICAgdmlldy5mb250U2l6ZSA9IHZpZXcuZm9udFNpemUgPyB2aWV3LmZvbnRTaXplIDogJzIwcnB4JztcbiAgICAgIGN0eC5mb250ID0gYG5vcm1hbCAke2ZvbnRXZWlnaHR9ICR7dmlldy5mb250U2l6ZS50b1B4KCl9cHggJHt2aWV3LmZvbnRGYW1pbHkgPyBgXCIke3ZpZXcuZm9udEZhbWlseX1cImAgOiAnc2Fucy1zZXJpZid9YDtcblxuICAgICAgLy8g6K6h566X6KGM5pWwXG4gICAgICBsZXQgbGluZXMgPSAwO1xuICAgICAgY29uc3QgbGluZXNBcnJheSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0QXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgdGV4dExlbmd0aCA9IGN0eC5tZWFzdXJlVGV4dCh0ZXh0QXJyYXlbaV0pLndpZHRoO1xuICAgICAgICBjb25zdCBwYXJ0V2lkdGggPSB2aWV3LndpZHRoID8gdmlldy53aWR0aC50b1B4KCkgOiB0ZXh0TGVuZ3RoO1xuICAgICAgICBjb25zdCBjYWxMaW5lcyA9IE1hdGguY2VpbCh0ZXh0TGVuZ3RoIC8gcGFydFdpZHRoKTtcbiAgICAgICAgd2lkdGggPSBwYXJ0V2lkdGggPiB3aWR0aCA/IHBhcnRXaWR0aCA6IHdpZHRoO1xuICAgICAgICBsaW5lcyArPSBjYWxMaW5lcztcbiAgICAgICAgbGluZXNBcnJheVtpXSA9IGNhbExpbmVzO1xuICAgICAgfVxuICAgICAgbGluZXMgPSB2aWV3Lm1heExpbmVzIDwgbGluZXMgPyB2aWV3Lm1heExpbmVzIDogbGluZXM7XG4gICAgICBjb25zdCBsaW5lSGVpZ2h0ID0gdmlldy5saW5lSGVpZ2h0ID8gdmlldy5saW5lSGVpZ2h0LnRvUHgoKSA6IHZpZXcuY3NzLmZvbnRTaXplLnRvUHgoKTtcbiAgICAgIGhlaWdodCA9IGxpbmVIZWlnaHQgKiBsaW5lcztcbiAgICAgIHJldHVybiBoZWlnaHQ7XG4gICAgICAvLyDlnKjljp/mnIloZWlnaHTln7rnoYDkuIrvvIzliqjmgIHlj5jljJZ4eHh4eHjmloflrZfnmoTpq5jluqYtLS0tLS1lbmQtLS0tLS1cbiAgICB9LFxuXG4gIH0sXG59KTtcblxuZnVuY3Rpb24gc2V0U3RyaW5nUHJvdG90eXBlKHNjcmVlbkssIHNjYWxlKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLWV4dGVuZC1uYXRpdmUgKi9cbiAgLyoqXG4gICAqIOaYr+WQpuaUr+aMgei0n+aVsFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG1pbnVzIOaYr+WQpuaUr+aMgei0n+aVsFxuICAgKi9cbiAgU3RyaW5nLnByb3RvdHlwZS50b1B4ID0gZnVuY3Rpb24gdG9QeChtaW51cykge1xuICAgIGxldCByZWc7XG4gICAgaWYgKG1pbnVzKSB7XG4gICAgICByZWcgPSAvXi0/WzAtOV0rKFsuXXsxfVswLTldKyl7MCwxfShycHh8cHgpJC9nO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWcgPSAvXlswLTldKyhbLl17MX1bMC05XSspezAsMX0ocnB4fHB4KSQvZztcbiAgICB9XG4gICAgY29uc3QgcmVzdWx0cyA9IHJlZy5leGVjKHRoaXMpO1xuICAgIGlmICghdGhpcyB8fCAhcmVzdWx0cykge1xuICAgICAgLy8gY29uc29sZS5lcnJvcihgVGhlIHNpemU6ICR7dGhpc30gaXMgaWxsZWdhbGApO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGNvbnN0IHVuaXQgPSByZXN1bHRzWzJdO1xuICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdCh0aGlzKTtcblxuICAgIGxldCByZXMgPSAwO1xuICAgIGlmICh1bml0ID09PSAncnB4Jykge1xuICAgICAgcmVzID0gTWF0aC5yb3VuZCh2YWx1ZSAqIHNjcmVlbksgKiAoc2NhbGUgfHwgMSkpO1xuICAgIH0gZWxzZSBpZiAodW5pdCA9PT0gJ3B4Jykge1xuICAgICAgcmVzID0gTWF0aC5yb3VuZCh2YWx1ZSAqIChzY2FsZSB8fCAxKSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG59XG4iXX0=