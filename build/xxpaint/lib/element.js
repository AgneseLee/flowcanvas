"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var utils_1 = require("./utils");
var line_1 = require("./line");
var flex_box_1 = require("./flex-box");
var tree_node_1 = require("./tree-node");
var complete_styles_1 = require("./complete-styles");
var Element = (function (_super) {
    __extends(Element, _super);
    function Element(options, children) {
        var _this = _super.call(this, children) || this;
        _this.options = __assign({ attrs: {}, styles: {}, on: {} }, options);
        _this.styles = null;
        _this.renderStyles = null;
        _this.x = 0;
        _this.y = 0;
        _this.render = null;
        _this.container = null;
        _this.visible = true;
        return _this;
    }
    Element.prototype.init = function () {
        this._initStyles();
    };
    Element.prototype.removeEvent = function () {
        this.getLayer().eventManager.removeElement(this);
    };
    Element.prototype.getLayer = function () {
        return this.root.layer;
    };
    Element.prototype.getRender = function () {
        return this.root.layer.render;
    };
    Element.prototype._paint = function () {
    };
    Element.prototype.mount = function (layer) {
        layer.mountNode(this);
    };
    Element.prototype._initStyles = function () {
        this.styles = __assign(__assign(__assign({}, this._getDefaultStyles()), this._getParentStyles(this.options.styles)), this.options.styles || {});
        this._completeStyles();
        this._initRenderStyles();
    };
    Element.prototype._initRenderStyles = function () {
        var renderStyles = __assign({}, this.styles);
        var parentWidth = this._getContainerLayout().contentWidth;
        var parentHeight = this._getContainerLayout().contentHeight;
        if (utils_1.isAuto(renderStyles.width)) {
            renderStyles.paddingWidth = 0;
        }
        else if (utils_1.isOuter(renderStyles.width)) {
            renderStyles.paddingWidth = utils_1.parseOuter(renderStyles.width) * parentWidth - renderStyles.marginLeft - renderStyles.marginRight;
        }
        else {
            renderStyles.paddingWidth = renderStyles.width;
        }
        if (utils_1.isAuto(renderStyles.height)) {
            renderStyles.paddingHeight = 0;
        }
        else if (utils_1.isOuter(renderStyles.height)) {
            renderStyles.paddingHeight = utils_1.parseOuter(renderStyles.height) * parentHeight - renderStyles.marginTop - renderStyles.marginBottom;
        }
        else {
            renderStyles.paddingHeight = renderStyles.height;
        }
        if (!renderStyles.paddingWidth)
            renderStyles.paddingWidth = 0;
        if (!renderStyles.paddingHeight)
            renderStyles.paddingHeight = 0;
        renderStyles.contentWidth = renderStyles.paddingWidth - renderStyles.paddingLeft - renderStyles.paddingRight;
        renderStyles.contentHeight = renderStyles.paddingHeight - renderStyles.paddingTop - renderStyles.paddingBottom;
        renderStyles.width = renderStyles.paddingWidth + renderStyles.marginLeft + renderStyles.marginRight + this._getTotalBorderWidth(renderStyles);
        renderStyles.height = renderStyles.paddingHeight + renderStyles.marginTop + renderStyles.marginBottom + this._getTotalBorderHeight(renderStyles);
        this.renderStyles = renderStyles;
        if (this._InFlexBox()) {
            this._bindFlexBox();
        }
        else if (!this.isInFlow()) {
            this.relativeTo = utils_1.findRelativeTo(this);
        }
    };
    Element.prototype._getParentStyles = function (curStyles) {
        var _a = this.parent && this.parent.renderStyles || {}, textAlign = _a.textAlign, lineHeight = _a.lineHeight, fontSize = _a.fontSize, color = _a.color, fontFamily = _a.fontFamily, alignItems = _a.alignItems, _b = _a.visible, visible = _b === void 0 ? true : _b;
        var extendStyles = {};
        if (textAlign)
            extendStyles.textAlign = textAlign;
        if (fontSize)
            extendStyles.fontSize = fontSize;
        if (color)
            extendStyles.color = color;
        if (fontFamily)
            extendStyles.fontFamily = fontFamily;
        if (alignItems && !curStyles.alignSelf)
            extendStyles.alignSelf = alignItems;
        extendStyles.visible = visible;
        return extendStyles;
    };
    Element.prototype._completeStyles = function () {
        complete_styles_1.default(this);
    };
    Element.prototype._getDefaultStyles = function () {
        return constants_1.default.DEFAULT_STYLES;
    };
    Element.prototype._getChildrenInFlow = function () {
        return this._getChildren().filter(function (item) { return item.isInFlow(); });
    };
    Element.prototype.isInFlow = function () {
        var _a = this.styles, position = _a.position, display = _a.display;
        return position !== constants_1.default.POSITION.ABSOLUTE && position !== constants_1.default.POSITION.FIXED;
    };
    Element.prototype.isVisible = function () {
        return this.renderStyles.visible && this.visible;
    };
    Element.prototype._generateRender = function () {
        return this;
    };
    Element.prototype.getCtx = function () {
        return this.root.layer.ctx;
    };
    Element.prototype._reflow = function () {
    };
    Element.prototype._initWidthHeight = function () {
        var _a = this.styles, width = _a.width, height = _a.height, display = _a.display, flex = _a.flex, marginLeft = _a.marginLeft, marginRight = _a.marginRight, marginTop = _a.marginTop, marginBottom = _a.marginBottom;
        if (utils_1.isAuto(width) || utils_1.isAuto(height)) {
            var layout = this._measureLayout();
            if (utils_1.isAuto(width)) {
                this.renderStyles.contentWidth = utils_1.floor(layout.width);
            }
            if (utils_1.isAuto(height)) {
                this.renderStyles.contentHeight = utils_1.floor(layout.height);
            }
        }
        this._refreshLayoutWithContent();
        if (this._InFlexBox()) {
            this.line.refreshWidthHeight(this);
        }
        else if (display === constants_1.default.DISPLAY.INLINE_BLOCK) {
            this._bindLine();
        }
    };
    Element.prototype._initPosition = function () {
        var contentX = this._getContainerLayout().contentX;
        var _a = this.renderStyles, paddingLeft = _a.paddingLeft, paddingTop = _a.paddingTop, borderLeftWidth = _a.borderLeftWidth, borderTopWidth = _a.borderTopWidth, marginLeft = _a.marginLeft, marginTop = _a.marginTop;
        if (!this.isInFlow()) {
            var _b = this._getContainerLayout(this.relativeTo), contentX_1 = _b.contentX, contentY = _b.contentY, contentWidth = _b.contentWidth, contentHeight = _b.contentHeight;
            var _c = this.renderStyles, top = _c.top, bottom = _c.bottom, right = _c.right, left = _c.left, width = _c.width, height = _c.height;
            if (utils_1.isOuter(top))
                top = utils_1.parseOuter(top) * contentHeight;
            if (utils_1.isOuter(bottom))
                bottom = utils_1.parseOuter(bottom) * contentHeight;
            if (utils_1.isOuter(left))
                left = utils_1.parseOuter(left) * contentWidth;
            if (utils_1.isOuter(right))
                right = utils_1.parseOuter(right) * contentWidth;
            if (utils_1.isExact(top)) {
                this.y = contentY + top;
            }
            else if (utils_1.isExact(bottom)) {
                this.y = contentY + contentHeight - bottom - height;
            }
            if (utils_1.isExact(left)) {
                this.x = contentX_1 + left;
            }
            else if (utils_1.isExact(right)) {
                this.x = contentX_1 + contentWidth - right - width;
            }
        }
        else if (this._InFlexBox()) {
            this.line.refreshElementPosition(this);
        }
        else if (this.renderStyles.display === constants_1.default.DISPLAY.INLINE_BLOCK) {
            this.line.refreshElementPosition(this);
        }
        else {
            this.x = contentX;
            this.y = this._getPreLayout().y + this._getPreLayout().height;
        }
        this.x = utils_1.floor(this.x);
        this.y = utils_1.floor(this.y);
        this.contentX = this.x + paddingLeft + borderLeftWidth + marginLeft;
        this.contentY = this.y + paddingTop + borderTopWidth + marginTop;
    };
    Element.prototype._InFlexBox = function () {
        if (!this.isInFlow())
            return false;
        if (!this.parent)
            return false;
        if (this.parent && this.parent.renderStyles.display === constants_1.default.DISPLAY.FLEX)
            return true;
    };
    Element.prototype._refreshLayoutWithContent = function () {
        this.renderStyles.height = utils_1.floor(this.renderStyles.contentHeight + this.renderStyles.paddingTop + this.renderStyles.paddingBottom + this.renderStyles.marginTop + this.renderStyles.marginBottom + this._getTotalBorderHeight());
        this.renderStyles.width = utils_1.floor(this.renderStyles.contentWidth + this.renderStyles.paddingLeft + this.renderStyles.paddingRight + this.renderStyles.marginLeft + this.renderStyles.marginRight + this._getTotalBorderWidth());
        this.renderStyles.paddingWidth = utils_1.floor(this.renderStyles.contentWidth + this.renderStyles.paddingLeft + this.renderStyles.paddingRight);
        this.renderStyles.paddingHeight = utils_1.floor(this.renderStyles.contentHeight + this.renderStyles.paddingTop + this.renderStyles.paddingBottom);
    };
    Element.prototype._refreshContentWithLayout = function () {
        this.renderStyles.contentHeight = this.renderStyles.height - this.renderStyles.paddingTop - this.renderStyles.paddingBottom - this.renderStyles.marginTop - this.renderStyles.marginBottom - this._getTotalBorderHeight();
        this.renderStyles.contentWidth = this.renderStyles.width - this.renderStyles.paddingLeft - this.renderStyles.paddingRight - this.renderStyles.marginLeft - this.renderStyles.marginRight - this._getTotalBorderWidth();
        this.renderStyles.paddingWidth = utils_1.floor(this.renderStyles.contentWidth + this.renderStyles.paddingLeft + this.renderStyles.paddingRight);
        this.renderStyles.paddingHeight = utils_1.floor(this.renderStyles.contentHeight + this.renderStyles.paddingTop + this.renderStyles.paddingBottom);
    };
    Element.prototype._getTotalBorderWidth = function (renderStyles) {
        if (renderStyles === void 0) { renderStyles = this.renderStyles; }
        return renderStyles.borderLeftWidth + renderStyles.borderRightWidth;
    };
    Element.prototype._getTotalBorderHeight = function (renderStyles) {
        if (renderStyles === void 0) { renderStyles = this.renderStyles; }
        return renderStyles.borderTopWidth + renderStyles.borderBottomWidth;
    };
    Element.prototype._bindLine = function () {
        if (this.pre && this.pre.line && this.pre.line.canIEnter(this)) {
            this.pre.line.add(this);
        }
        else {
            new line_1.default().bind(this);
        }
    };
    Element.prototype._bindFlexBox = function () {
        if (this.pre && this.pre.line) {
            this.pre.line.add(this);
        }
        else {
            new flex_box_1.default().bind(this);
        }
    };
    Element.prototype._getContainerLayout = function (container) {
        if (container === void 0) { container = this.parent; }
        if (!container) {
            if (!this.container) {
                debugger;
            }
            container = {
                renderStyles: {
                    width: this.container.width,
                    height: this.container.height,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    contentWidth: this.container.width,
                    contentHeight: this.container.height,
                },
                x: 0,
                y: 0,
                contentX: 0,
                contentY: 0,
            };
        }
        return {
            width: container.renderStyles.width,
            height: container.renderStyles.height,
            x: container.x,
            y: container.y,
            paddingTop: container.renderStyles.paddingTop,
            paddingBottom: container.renderStyles.paddingBottom,
            paddingLeft: container.renderStyles.paddingLeft,
            paddingRight: container.renderStyles.paddingRight,
            marginLeft: container.renderStyles.marginLeft,
            marginRight: container.renderStyles.marginRight,
            marginTop: container.renderStyles.marginTop,
            marginBottom: container.renderStyles.marginBottom,
            contentX: container.contentX,
            contentY: container.contentY,
            contentWidth: container.renderStyles.contentWidth,
            contentHeight: container.renderStyles.contentHeight,
        };
    };
    Element.prototype._getPreLayout = function () {
        var cur = this.pre;
        while (cur && !cur.isInFlow()) {
            cur = cur.pre;
        }
        if (cur) {
            return {
                width: cur.renderStyles.width,
                height: cur.renderStyles.height,
                x: cur.x,
                y: cur.y,
            };
        }
        return {
            width: 0,
            height: 0,
            x: this._getContainerLayout().contentX,
            y: this._getContainerLayout().contentY,
        };
    };
    Element.prototype._measureLayout = function () {
        var width = 0;
        var height = 0;
        this._getChildrenInFlow().forEach(function (child) {
            if (child.line) {
                if (child.line.start === child) {
                    if (child.line.width > width) {
                        width = child.line.width;
                    }
                    height += child.line.height;
                }
            }
            else if (child.renderStyles.width > width) {
                width = child.renderStyles.width;
                height += child.renderStyles.height;
            }
            else {
                height += child.renderStyles.height;
            }
        });
        return { width: width, height: height };
    };
    Element.prototype.getElementBy = function (key, value) {
        var match = [];
        utils_1.walk(this, function (element) {
            if (element.options.attrs[key] === value) {
                match.push(element);
            }
        });
        return match;
    };
    Element.prototype.appendChild = function (element) {
        _super.prototype.appendChild.call(this, element);
        this.getLayer().onElementAdd(element);
        return element;
    };
    Element.prototype.prependChild = function (element) {
        _super.prototype.prependChild.call(this, element);
        this.getLayer().onElementAdd(element);
        return element;
    };
    Element.prototype.removeChild = function (element) {
        _super.prototype.removeChild.call(this, element);
        this.getLayer().onElementRemove(element);
    };
    Element.prototype.append = function (element) {
        _super.prototype.append.call(this, element);
        this.getLayer().onElementAdd(element);
    };
    Element.prototype.prepend = function (element) {
        _super.prototype.prepend.call(this, element);
        this.getLayer().onElementAdd(element);
    };
    Element.prototype.setStyles = function (styles) {
        var _this = this;
        var _needReflow = false;
        Object.keys(styles).forEach(function (key) {
            if (utils_1.needReflow(key)) {
                _needReflow = true;
            }
            else {
                _this.renderStyles[key] = styles[key];
            }
        });
        if (_needReflow) {
            Object.keys(styles).forEach(function (key) {
                _this.options.styles[key] = styles[key];
            });
            this.getLayer().reflowElement(this, this);
        }
        else {
            this.getRender().requestRepaint();
        }
    };
    return Element;
}(tree_node_1.default));
exports.default = Element;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy94eHBhaW50L2xpYi9lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EseUNBQWlDO0FBRWpDLGlDQUErSDtBQUMvSCwrQkFBMEI7QUFDMUIsdUNBQWlDO0FBQ2pDLHlDQUFtQztBQUNuQyxxREFBK0M7QUFRL0M7SUFBcUMsMkJBQVE7SUFDM0MsaUJBQVksT0FBTyxFQUFFLFFBQVE7UUFBN0IsWUFDRSxrQkFBTSxRQUFRLENBQUMsU0FTaEI7UUFSQyxLQUFJLENBQUMsT0FBTyxjQUFLLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFLLE9BQU8sQ0FBRSxDQUFDO1FBQzdELEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLEtBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsS0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7SUFDdEIsQ0FBQztJQUVELHNCQUFJLEdBQUo7UUFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFckIsQ0FBQztJQUVELDZCQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsMEJBQVEsR0FBUjtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELDJCQUFTLEdBQVQ7UUFD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QU8sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELDJCQUFTLEdBQVQsVUFBVSxNQUFNO1FBQWhCLGlCQWtCQztRQWpCQyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQzlCLElBQUksa0JBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbkIsV0FBVyxHQUFHLElBQUksQ0FBQzthQUNwQjtpQkFBTTtnQkFDTCxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxXQUFXLEVBQUU7WUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7Z0JBQzlCLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBRTNDO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDbkM7SUFDSCxDQUFDO0lBQ0gsY0FBQztBQUFELENBQUMsQUFwWkQsQ0FBcUMsbUJBQVEsR0FvWjVDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbmltcG9ydCBTVFlMRVMgZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHB4VXRpbCBmcm9tICcuL3B4JztcbmltcG9ydCB7IGlzRXhhY3QsIHdhbGssIGlzT3V0ZXIsIHBhcnNlT3V0ZXIsIHdhbGtQYXJlbnQsIGlzRW5kTm9kZSwgaXNBdXRvLCBmaW5kUmVsYXRpdmVUbywgbmVlZFJlZmxvdywgZmxvb3IgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBMaW5lIGZyb20gJy4vbGluZSc7XG5pbXBvcnQgRmxleEJveCBmcm9tICcuL2ZsZXgtYm94JztcbmltcG9ydCBUcmVlTm9kZSBmcm9tICcuL3RyZWUtbm9kZSc7XG5pbXBvcnQgY29tcGxldGVTdHlsZXMgZnJvbSAnLi9jb21wbGV0ZS1zdHlsZXMnO1xuXG4vKipcbiAqIEVsZW1lbnTnsbvlrp7njrDnm5LmqKHlnovku6Xlj4rlrprkvY3vvIzkuI3lhbflpIfnu5jliLZcbiAqIOWFtuS7luexu+e7p+aJv+WunueOsFxuICpcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50IGV4dGVuZHMgVHJlZU5vZGUge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zLCBjaGlsZHJlbikge1xuICAgIHN1cGVyKGNoaWxkcmVuKTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7IGF0dHJzOiB7fSwgc3R5bGVzOiB7fSwgb246IHt9LCAuLi5vcHRpb25zIH07XG4gICAgdGhpcy5zdHlsZXMgPSBudWxsO1xuICAgIHRoaXMucmVuZGVyU3R5bGVzID0gbnVsbDtcbiAgICB0aGlzLnggPSAwO1xuICAgIHRoaXMueSA9IDA7XG4gICAgdGhpcy5yZW5kZXIgPSBudWxsO1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLl9pbml0U3R5bGVzKCk7XG4gICAgLy8gdGhpcy5pbml0RXZlbnQoKVxuICB9XG5cbiAgcmVtb3ZlRXZlbnQoKSB7XG4gICAgdGhpcy5nZXRMYXllcigpLmV2ZW50TWFuYWdlci5yZW1vdmVFbGVtZW50KHRoaXMpO1xuICB9XG5cbiAgZ2V0TGF5ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdC5sYXllcjtcbiAgfVxuXG4gIGdldFJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5yb290LmxheWVyLnJlbmRlcjtcbiAgfVxuXG4gIF9wYWludCgpIHtcblxuICB9XG5cbiAgbW91bnQobGF5ZXIpIHtcbiAgICBsYXllci5tb3VudE5vZGUodGhpcyk7XG4gIH1cblxuICBfaW5pdFN0eWxlcygpIHtcbiAgICB0aGlzLnN0eWxlcyA9IHsgLi4udGhpcy5fZ2V0RGVmYXVsdFN0eWxlcygpLCAuLi50aGlzLl9nZXRQYXJlbnRTdHlsZXModGhpcy5vcHRpb25zLnN0eWxlcyksIC4uLnRoaXMub3B0aW9ucy5zdHlsZXMgfHwge30gfTtcblxuICAgIHRoaXMuX2NvbXBsZXRlU3R5bGVzKCk7XG5cbiAgICB0aGlzLl9pbml0UmVuZGVyU3R5bGVzKCk7XG4gIH1cblxuICBfaW5pdFJlbmRlclN0eWxlcygpIHtcbiAgICBjb25zdCByZW5kZXJTdHlsZXMgPSB7IC4uLnRoaXMuc3R5bGVzIH07XG4gICAgY29uc3QgcGFyZW50V2lkdGggPSB0aGlzLl9nZXRDb250YWluZXJMYXlvdXQoKS5jb250ZW50V2lkdGg7XG4gICAgY29uc3QgcGFyZW50SGVpZ2h0ID0gdGhpcy5fZ2V0Q29udGFpbmVyTGF5b3V0KCkuY29udGVudEhlaWdodDtcblxuICAgIGlmIChpc0F1dG8ocmVuZGVyU3R5bGVzLndpZHRoKSkge1xuICAgICAgcmVuZGVyU3R5bGVzLnBhZGRpbmdXaWR0aCA9IDA7XG4gICAgfSBlbHNlIGlmIChpc091dGVyKHJlbmRlclN0eWxlcy53aWR0aCkpIHtcbiAgICAgIHJlbmRlclN0eWxlcy5wYWRkaW5nV2lkdGggPSBwYXJzZU91dGVyKHJlbmRlclN0eWxlcy53aWR0aCkgKiBwYXJlbnRXaWR0aCAtIHJlbmRlclN0eWxlcy5tYXJnaW5MZWZ0IC0gcmVuZGVyU3R5bGVzLm1hcmdpblJpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJTdHlsZXMucGFkZGluZ1dpZHRoID0gcmVuZGVyU3R5bGVzLndpZHRoO1xuICAgIH1cblxuICAgIGlmIChpc0F1dG8ocmVuZGVyU3R5bGVzLmhlaWdodCkpIHtcbiAgICAgIHJlbmRlclN0eWxlcy5wYWRkaW5nSGVpZ2h0ID0gMDtcbiAgICB9IGVsc2UgaWYgKGlzT3V0ZXIocmVuZGVyU3R5bGVzLmhlaWdodCkpIHtcbiAgICAgIHJlbmRlclN0eWxlcy5wYWRkaW5nSGVpZ2h0ID0gcGFyc2VPdXRlcihyZW5kZXJTdHlsZXMuaGVpZ2h0KSAqIHBhcmVudEhlaWdodCAtIHJlbmRlclN0eWxlcy5tYXJnaW5Ub3AgLSByZW5kZXJTdHlsZXMubWFyZ2luQm90dG9tO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW5kZXJTdHlsZXMucGFkZGluZ0hlaWdodCA9IHJlbmRlclN0eWxlcy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgaWYgKCFyZW5kZXJTdHlsZXMucGFkZGluZ1dpZHRoKSByZW5kZXJTdHlsZXMucGFkZGluZ1dpZHRoID0gMDtcbiAgICBpZiAoIXJlbmRlclN0eWxlcy5wYWRkaW5nSGVpZ2h0KSByZW5kZXJTdHlsZXMucGFkZGluZ0hlaWdodCA9IDA7XG5cbiAgICAvLyDliJ3lp4vljJZjb250ZW50V2lkdGhcbiAgICByZW5kZXJTdHlsZXMuY29udGVudFdpZHRoID0gcmVuZGVyU3R5bGVzLnBhZGRpbmdXaWR0aCAtIHJlbmRlclN0eWxlcy5wYWRkaW5nTGVmdCAtIHJlbmRlclN0eWxlcy5wYWRkaW5nUmlnaHQ7XG4gICAgcmVuZGVyU3R5bGVzLmNvbnRlbnRIZWlnaHQgPSByZW5kZXJTdHlsZXMucGFkZGluZ0hlaWdodCAtIHJlbmRlclN0eWxlcy5wYWRkaW5nVG9wIC0gcmVuZGVyU3R5bGVzLnBhZGRpbmdCb3R0b207XG5cbiAgICByZW5kZXJTdHlsZXMud2lkdGggPSByZW5kZXJTdHlsZXMucGFkZGluZ1dpZHRoICsgcmVuZGVyU3R5bGVzLm1hcmdpbkxlZnQgKyByZW5kZXJTdHlsZXMubWFyZ2luUmlnaHQgKyB0aGlzLl9nZXRUb3RhbEJvcmRlcldpZHRoKHJlbmRlclN0eWxlcyk7XG4gICAgcmVuZGVyU3R5bGVzLmhlaWdodCA9IHJlbmRlclN0eWxlcy5wYWRkaW5nSGVpZ2h0ICsgcmVuZGVyU3R5bGVzLm1hcmdpblRvcCArIHJlbmRlclN0eWxlcy5tYXJnaW5Cb3R0b20gKyB0aGlzLl9nZXRUb3RhbEJvcmRlckhlaWdodChyZW5kZXJTdHlsZXMpO1xuXG4gICAgdGhpcy5yZW5kZXJTdHlsZXMgPSByZW5kZXJTdHlsZXM7XG5cbiAgICBpZiAodGhpcy5fSW5GbGV4Qm94KCkpIHtcbiAgICAgIHRoaXMuX2JpbmRGbGV4Qm94KCk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5pc0luRmxvdygpKSB7XG4gICAgICB0aGlzLnJlbGF0aXZlVG8gPSBmaW5kUmVsYXRpdmVUbyh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6ZyA6KaB57un5om/55qEc3R5bGVz5pS+5Zyo6L+Z6YeMXG4gICAqL1xuICBfZ2V0UGFyZW50U3R5bGVzKGN1clN0eWxlcykge1xuICAgIGNvbnN0IHsgdGV4dEFsaWduLCBsaW5lSGVpZ2h0LCBmb250U2l6ZSwgY29sb3IsIGZvbnRGYW1pbHksIGFsaWduSXRlbXMsIHZpc2libGUgPSB0cnVlIH0gPSB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5yZW5kZXJTdHlsZXMgfHwge307XG4gICAgY29uc3QgZXh0ZW5kU3R5bGVzID0ge307XG4gICAgaWYgKHRleHRBbGlnbikgZXh0ZW5kU3R5bGVzLnRleHRBbGlnbiA9IHRleHRBbGlnbjtcbiAgICBpZiAoZm9udFNpemUpIGV4dGVuZFN0eWxlcy5mb250U2l6ZSA9IGZvbnRTaXplO1xuICAgIGlmIChjb2xvcikgZXh0ZW5kU3R5bGVzLmNvbG9yID0gY29sb3I7XG4gICAgaWYgKGZvbnRGYW1pbHkpIGV4dGVuZFN0eWxlcy5mb250RmFtaWx5ID0gZm9udEZhbWlseTtcbiAgICBpZiAoYWxpZ25JdGVtcyAmJiAhY3VyU3R5bGVzLmFsaWduU2VsZikgZXh0ZW5kU3R5bGVzLmFsaWduU2VsZiA9IGFsaWduSXRlbXM7XG4gICAgZXh0ZW5kU3R5bGVzLnZpc2libGUgPSB2aXNpYmxlO1xuICAgIHJldHVybiBleHRlbmRTdHlsZXM7XG4gIH1cblxuICBfY29tcGxldGVTdHlsZXMoKSB7XG4gICAgY29tcGxldGVTdHlsZXModGhpcyk7XG4gIH1cblxuICBfZ2V0RGVmYXVsdFN0eWxlcygpIHtcbiAgICByZXR1cm4gU1RZTEVTLkRFRkFVTFRfU1RZTEVTO1xuICB9XG5cbiAgLy8g6I635Y+W5paH5qGj5rWB5Lit55qE5a2Q6IqC54K5XG4gIF9nZXRDaGlsZHJlbkluRmxvdygpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0Q2hpbGRyZW4oKS5maWx0ZXIoKGl0ZW0pID0+IHsgcmV0dXJuIGl0ZW0uaXNJbkZsb3coKTsgfSk7XG4gIH1cblxuICAvLyDmmK/lkKblnKjmlofmoaPmtYHkuK1cbiAgaXNJbkZsb3coKSB7XG4gICAgY29uc3QgeyBwb3NpdGlvbiwgZGlzcGxheSB9ID0gdGhpcy5zdHlsZXM7XG4gICAgcmV0dXJuIHBvc2l0aW9uICE9PSBTVFlMRVMuUE9TSVRJT04uQUJTT0xVVEUgJiYgcG9zaXRpb24gIT09IFNUWUxFUy5QT1NJVElPTi5GSVhFRDtcbiAgfVxuXG4gIGlzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJTdHlsZXMudmlzaWJsZSAmJiB0aGlzLnZpc2libGU7XG4gIH1cblxuICBfZ2VuZXJhdGVSZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRDdHgoKSB7XG4gICAgcmV0dXJuIHRoaXMucm9vdC5sYXllci5jdHg7XG4gIH1cblxuICAvKipcbiAgICog5a6e546w5paH5qGj5rWBIOmcgOimgeefpemBk+S4iuS4gOS4quWFhOW8n+iKgueCuVxuICAgKi9cbiAgX3JlZmxvdygpIHtcblxuICB9XG5cbiAgX2luaXRXaWR0aEhlaWdodCgpIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGRpc3BsYXksIGZsZXgsIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0LCBtYXJnaW5Ub3AsIG1hcmdpbkJvdHRvbSB9ID0gdGhpcy5zdHlsZXM7XG4gICAgaWYgKGlzQXV0byh3aWR0aCkgfHwgaXNBdXRvKGhlaWdodCkpIHtcbiAgICAgIC8vIOi/meS4gOatpemcgOimgemBjeWOhu+8jOWIpOaWreS4gOS4i1xuICAgICAgY29uc3QgbGF5b3V0ID0gdGhpcy5fbWVhc3VyZUxheW91dCgpO1xuICAgICAgLy8g5Yid5aeL5YyW5a695bqm6auY5bqmXG4gICAgICBpZiAoaXNBdXRvKHdpZHRoKSkge1xuICAgICAgICB0aGlzLnJlbmRlclN0eWxlcy5jb250ZW50V2lkdGggPSBmbG9vcihsYXlvdXQud2lkdGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNBdXRvKGhlaWdodCkpIHtcbiAgICAgICAgLy8g5LiN5aGr5bCx5pivYXV0b1xuICAgICAgICB0aGlzLnJlbmRlclN0eWxlcy5jb250ZW50SGVpZ2h0ID0gZmxvb3IobGF5b3V0LmhlaWdodCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fcmVmcmVzaExheW91dFdpdGhDb250ZW50KCk7XG5cbiAgICBpZiAodGhpcy5fSW5GbGV4Qm94KCkpIHtcbiAgICAgIHRoaXMubGluZS5yZWZyZXNoV2lkdGhIZWlnaHQodGhpcyk7XG4gICAgfSBlbHNlIGlmIChkaXNwbGF5ID09PSBTVFlMRVMuRElTUExBWS5JTkxJTkVfQkxPQ0spIHtcbiAgICAgIC8vIOWmguaenOaYr2lubGluZS1ibG9jayAg6L+Z6YeM5LuF6K6h566X6auY5bqmXG4gICAgICB0aGlzLl9iaW5kTGluZSgpO1xuICAgIH1cbiAgfVxuXG4gIF9pbml0UG9zaXRpb24oKSB7XG4gICAgY29uc3QgeyBjb250ZW50WCB9ID0gdGhpcy5fZ2V0Q29udGFpbmVyTGF5b3V0KCk7XG4gICAgY29uc3QgeyBwYWRkaW5nTGVmdCwgcGFkZGluZ1RvcCwgYm9yZGVyTGVmdFdpZHRoLCBib3JkZXJUb3BXaWR0aCwgbWFyZ2luTGVmdCwgbWFyZ2luVG9wIH0gPSB0aGlzLnJlbmRlclN0eWxlcztcbiAgICAvLyDliJ3lp4vljJZjdHjkvY3nva5cbiAgICBpZiAoIXRoaXMuaXNJbkZsb3coKSkge1xuICAgICAgLy8g5LiN5Zyo5paH5qGj5rWB5LitXG4gICAgICBjb25zdCB7IGNvbnRlbnRYLCBjb250ZW50WSwgY29udGVudFdpZHRoLCBjb250ZW50SGVpZ2h0IH0gPSB0aGlzLl9nZXRDb250YWluZXJMYXlvdXQodGhpcy5yZWxhdGl2ZVRvKTtcbiAgICAgIGxldCB7IHRvcCwgYm90dG9tLCByaWdodCwgbGVmdCwgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5yZW5kZXJTdHlsZXM7XG4gICAgICBpZiAoaXNPdXRlcih0b3ApKSB0b3AgPSBwYXJzZU91dGVyKHRvcCkgKiBjb250ZW50SGVpZ2h0O1xuICAgICAgaWYgKGlzT3V0ZXIoYm90dG9tKSkgYm90dG9tID0gcGFyc2VPdXRlcihib3R0b20pICogY29udGVudEhlaWdodDtcbiAgICAgIGlmIChpc091dGVyKGxlZnQpKSBsZWZ0ID0gcGFyc2VPdXRlcihsZWZ0KSAqIGNvbnRlbnRXaWR0aDtcbiAgICAgIGlmIChpc091dGVyKHJpZ2h0KSkgcmlnaHQgPSBwYXJzZU91dGVyKHJpZ2h0KSAqIGNvbnRlbnRXaWR0aDtcbiAgICAgIGlmIChpc0V4YWN0KHRvcCkpIHtcbiAgICAgICAgdGhpcy55ID0gY29udGVudFkgKyB0b3A7XG4gICAgICB9IGVsc2UgaWYgKGlzRXhhY3QoYm90dG9tKSkge1xuICAgICAgICB0aGlzLnkgPSBjb250ZW50WSArIGNvbnRlbnRIZWlnaHQgLSBib3R0b20gLSBoZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0V4YWN0KGxlZnQpKSB7XG4gICAgICAgIHRoaXMueCA9IGNvbnRlbnRYICsgbGVmdDtcbiAgICAgIH0gZWxzZSBpZiAoaXNFeGFjdChyaWdodCkpIHtcbiAgICAgICAgdGhpcy54ID0gY29udGVudFggKyBjb250ZW50V2lkdGggLSByaWdodCAtIHdpZHRoO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fSW5GbGV4Qm94KCkpIHtcbiAgICAgIHRoaXMubGluZS5yZWZyZXNoRWxlbWVudFBvc2l0aW9uKHRoaXMpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5yZW5kZXJTdHlsZXMuZGlzcGxheSA9PT0gU1RZTEVTLkRJU1BMQVkuSU5MSU5FX0JMT0NLKSB7XG4gICAgICAvLyBpbmxpbmUtYmxvY2vliLBsaW5l6YeM6K6h566XXG4gICAgICAvLyB0aGlzLl9iaW5kTGluZSgpXG4gICAgICB0aGlzLmxpbmUucmVmcmVzaEVsZW1lbnRQb3NpdGlvbih0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy54ID0gY29udGVudFg7XG4gICAgICB0aGlzLnkgPSB0aGlzLl9nZXRQcmVMYXlvdXQoKS55ICsgdGhpcy5fZ2V0UHJlTGF5b3V0KCkuaGVpZ2h0O1xuICAgIH1cbiAgICB0aGlzLnggPSBmbG9vcih0aGlzLngpO1xuICAgIHRoaXMueSA9IGZsb29yKHRoaXMueSk7XG4gICAgdGhpcy5jb250ZW50WCA9IHRoaXMueCArIHBhZGRpbmdMZWZ0ICsgYm9yZGVyTGVmdFdpZHRoICsgbWFyZ2luTGVmdDtcbiAgICB0aGlzLmNvbnRlbnRZID0gdGhpcy55ICsgcGFkZGluZ1RvcCArIGJvcmRlclRvcFdpZHRoICsgbWFyZ2luVG9wO1xuICB9XG5cbiAgX0luRmxleEJveCgpIHtcbiAgICBpZiAoIXRoaXMuaXNJbkZsb3coKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghdGhpcy5wYXJlbnQpIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQucmVuZGVyU3R5bGVzLmRpc3BsYXkgPT09IFNUWUxFUy5ESVNQTEFZLkZMRVgpIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8g54i25YWD57Sg5qC55o2u5a2Q5YWD57Sg5pKR5byAY29udGVudOWQju+8jOWGjeiuoeeul3dpZHRoXG4gIF9yZWZyZXNoTGF5b3V0V2l0aENvbnRlbnQoKSB7XG4gICAgdGhpcy5yZW5kZXJTdHlsZXMuaGVpZ2h0ID0gZmxvb3IodGhpcy5yZW5kZXJTdHlsZXMuY29udGVudEhlaWdodCArIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdUb3AgKyB0aGlzLnJlbmRlclN0eWxlcy5wYWRkaW5nQm90dG9tICsgdGhpcy5yZW5kZXJTdHlsZXMubWFyZ2luVG9wICsgdGhpcy5yZW5kZXJTdHlsZXMubWFyZ2luQm90dG9tICsgdGhpcy5fZ2V0VG90YWxCb3JkZXJIZWlnaHQoKSk7XG4gICAgdGhpcy5yZW5kZXJTdHlsZXMud2lkdGggPSBmbG9vcih0aGlzLnJlbmRlclN0eWxlcy5jb250ZW50V2lkdGggKyB0aGlzLnJlbmRlclN0eWxlcy5wYWRkaW5nTGVmdCArIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdSaWdodCArIHRoaXMucmVuZGVyU3R5bGVzLm1hcmdpbkxlZnQgKyB0aGlzLnJlbmRlclN0eWxlcy5tYXJnaW5SaWdodCArIHRoaXMuX2dldFRvdGFsQm9yZGVyV2lkdGgoKSk7XG4gICAgdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ1dpZHRoID0gZmxvb3IodGhpcy5yZW5kZXJTdHlsZXMuY29udGVudFdpZHRoICsgdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ0xlZnQgKyB0aGlzLnJlbmRlclN0eWxlcy5wYWRkaW5nUmlnaHQpO1xuICAgIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdIZWlnaHQgPSBmbG9vcih0aGlzLnJlbmRlclN0eWxlcy5jb250ZW50SGVpZ2h0ICsgdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ1RvcCArIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdCb3R0b20pO1xuICB9XG5cbiAgLy8g54i25YWD57Sg5qC55o2u5a2Q5YWD57Sg5pKR5byAY29udGVudOWQju+8jOWGjeiuoeeul3dpZHRoXG4gIF9yZWZyZXNoQ29udGVudFdpdGhMYXlvdXQoKSB7XG4gICAgdGhpcy5yZW5kZXJTdHlsZXMuY29udGVudEhlaWdodCA9IHRoaXMucmVuZGVyU3R5bGVzLmhlaWdodCAtIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdUb3AgLSB0aGlzLnJlbmRlclN0eWxlcy5wYWRkaW5nQm90dG9tIC0gdGhpcy5yZW5kZXJTdHlsZXMubWFyZ2luVG9wIC0gdGhpcy5yZW5kZXJTdHlsZXMubWFyZ2luQm90dG9tIC0gdGhpcy5fZ2V0VG90YWxCb3JkZXJIZWlnaHQoKTtcbiAgICB0aGlzLnJlbmRlclN0eWxlcy5jb250ZW50V2lkdGggPSB0aGlzLnJlbmRlclN0eWxlcy53aWR0aCAtIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdMZWZ0IC0gdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ1JpZ2h0IC0gdGhpcy5yZW5kZXJTdHlsZXMubWFyZ2luTGVmdCAtIHRoaXMucmVuZGVyU3R5bGVzLm1hcmdpblJpZ2h0IC0gdGhpcy5fZ2V0VG90YWxCb3JkZXJXaWR0aCgpO1xuICAgIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdXaWR0aCA9IGZsb29yKHRoaXMucmVuZGVyU3R5bGVzLmNvbnRlbnRXaWR0aCArIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdMZWZ0ICsgdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ1JpZ2h0KTtcbiAgICB0aGlzLnJlbmRlclN0eWxlcy5wYWRkaW5nSGVpZ2h0ID0gZmxvb3IodGhpcy5yZW5kZXJTdHlsZXMuY29udGVudEhlaWdodCArIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdUb3AgKyB0aGlzLnJlbmRlclN0eWxlcy5wYWRkaW5nQm90dG9tKTtcbiAgfVxuXG4gIF9nZXRUb3RhbEJvcmRlcldpZHRoKHJlbmRlclN0eWxlcyA9IHRoaXMucmVuZGVyU3R5bGVzKSB7XG4gICAgcmV0dXJuIHJlbmRlclN0eWxlcy5ib3JkZXJMZWZ0V2lkdGggKyByZW5kZXJTdHlsZXMuYm9yZGVyUmlnaHRXaWR0aDtcbiAgfVxuXG4gIF9nZXRUb3RhbEJvcmRlckhlaWdodChyZW5kZXJTdHlsZXMgPSB0aGlzLnJlbmRlclN0eWxlcykge1xuICAgIHJldHVybiByZW5kZXJTdHlsZXMuYm9yZGVyVG9wV2lkdGggKyByZW5kZXJTdHlsZXMuYm9yZGVyQm90dG9tV2lkdGg7XG4gIH1cblxuICBfYmluZExpbmUoKSB7XG4gICAgaWYgKHRoaXMucHJlICYmIHRoaXMucHJlLmxpbmUgJiYgdGhpcy5wcmUubGluZS5jYW5JRW50ZXIodGhpcykpIHtcbiAgICAgIHRoaXMucHJlLmxpbmUuYWRkKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDmlrDooYxcbiAgICAgIG5ldyBMaW5lKCkuYmluZCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBfYmluZEZsZXhCb3goKSB7XG4gICAgaWYgKHRoaXMucHJlICYmIHRoaXMucHJlLmxpbmUpIHtcbiAgICAgIHRoaXMucHJlLmxpbmUuYWRkKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDmlrDooYxcbiAgICAgIG5ldyBGbGV4Qm94KCkuYmluZCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBfZ2V0Q29udGFpbmVyTGF5b3V0KGNvbnRhaW5lciA9IHRoaXMucGFyZW50KSB7XG4gICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgIC8vIHJvb3RcbiAgICAgIGlmICghdGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgZGVidWdnZXI7XG4gICAgICB9XG4gICAgICBjb250YWluZXIgPSB7XG4gICAgICAgIHJlbmRlclN0eWxlczoge1xuICAgICAgICAgIHdpZHRoOiB0aGlzLmNvbnRhaW5lci53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMuY29udGFpbmVyLmhlaWdodCxcbiAgICAgICAgICBwYWRkaW5nVG9wOiAwLFxuICAgICAgICAgIHBhZGRpbmdCb3R0b206IDAsXG4gICAgICAgICAgcGFkZGluZ0xlZnQ6IDAsXG4gICAgICAgICAgcGFkZGluZ1JpZ2h0OiAwLFxuICAgICAgICAgIG1hcmdpbkxlZnQ6IDAsXG4gICAgICAgICAgbWFyZ2luUmlnaHQ6IDAsXG4gICAgICAgICAgbWFyZ2luVG9wOiAwLFxuICAgICAgICAgIG1hcmdpbkJvdHRvbTogMCxcbiAgICAgICAgICBjb250ZW50V2lkdGg6IHRoaXMuY29udGFpbmVyLndpZHRoLFxuICAgICAgICAgIGNvbnRlbnRIZWlnaHQ6IHRoaXMuY29udGFpbmVyLmhlaWdodCxcbiAgICAgICAgfSxcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgY29udGVudFg6IDAsXG4gICAgICAgIGNvbnRlbnRZOiAwLFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiBjb250YWluZXIucmVuZGVyU3R5bGVzLndpZHRoLFxuICAgICAgaGVpZ2h0OiBjb250YWluZXIucmVuZGVyU3R5bGVzLmhlaWdodCxcbiAgICAgIHg6IGNvbnRhaW5lci54LFxuICAgICAgeTogY29udGFpbmVyLnksXG4gICAgICBwYWRkaW5nVG9wOiBjb250YWluZXIucmVuZGVyU3R5bGVzLnBhZGRpbmdUb3AsXG4gICAgICBwYWRkaW5nQm90dG9tOiBjb250YWluZXIucmVuZGVyU3R5bGVzLnBhZGRpbmdCb3R0b20sXG4gICAgICBwYWRkaW5nTGVmdDogY29udGFpbmVyLnJlbmRlclN0eWxlcy5wYWRkaW5nTGVmdCxcbiAgICAgIHBhZGRpbmdSaWdodDogY29udGFpbmVyLnJlbmRlclN0eWxlcy5wYWRkaW5nUmlnaHQsXG4gICAgICBtYXJnaW5MZWZ0OiBjb250YWluZXIucmVuZGVyU3R5bGVzLm1hcmdpbkxlZnQsXG4gICAgICBtYXJnaW5SaWdodDogY29udGFpbmVyLnJlbmRlclN0eWxlcy5tYXJnaW5SaWdodCxcbiAgICAgIG1hcmdpblRvcDogY29udGFpbmVyLnJlbmRlclN0eWxlcy5tYXJnaW5Ub3AsXG4gICAgICBtYXJnaW5Cb3R0b206IGNvbnRhaW5lci5yZW5kZXJTdHlsZXMubWFyZ2luQm90dG9tLFxuICAgICAgY29udGVudFg6IGNvbnRhaW5lci5jb250ZW50WCxcbiAgICAgIGNvbnRlbnRZOiBjb250YWluZXIuY29udGVudFksXG4gICAgICBjb250ZW50V2lkdGg6IGNvbnRhaW5lci5yZW5kZXJTdHlsZXMuY29udGVudFdpZHRoLFxuICAgICAgY29udGVudEhlaWdodDogY29udGFpbmVyLnJlbmRlclN0eWxlcy5jb250ZW50SGVpZ2h0LFxuICAgIH07XG4gIH1cblxuICAvLyDov5nph4zliY3kuIDkuKroioLngrnlv4XpobvlnKjmlofmoaPmtYHkuK1cbiAgX2dldFByZUxheW91dCgpIHtcbiAgICBsZXQgY3VyID0gdGhpcy5wcmU7XG4gICAgd2hpbGUgKGN1ciAmJiAhY3VyLmlzSW5GbG93KCkpIHtcbiAgICAgIGN1ciA9IGN1ci5wcmU7XG4gICAgfVxuICAgIC8vIOWmguaenOayoeacieWJjeS4gOS4quaIluiAheWJjemdoueahOmDveS4jeWcqOaWh+aho+a1geS4re+8jOiOt+WPluWuueWZqOeahFxuICAgIGlmIChjdXIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdpZHRoOiBjdXIucmVuZGVyU3R5bGVzLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGN1ci5yZW5kZXJTdHlsZXMuaGVpZ2h0LFxuICAgICAgICB4OiBjdXIueCxcbiAgICAgICAgeTogY3VyLnksXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDAsXG4gICAgICB4OiB0aGlzLl9nZXRDb250YWluZXJMYXlvdXQoKS5jb250ZW50WCxcbiAgICAgIHk6IHRoaXMuX2dldENvbnRhaW5lckxheW91dCgpLmNvbnRlbnRZLFxuICAgIH07XG4gIH1cblxuICAvLyDorqHnrpfoh6rouqvnmoTpq5jluqZcbiAgX21lYXN1cmVMYXlvdXQoKSB7XG4gICAgbGV0IHdpZHRoID0gMDsgLy8g6ZyA6KaB6ICD6JmR5Y6f5pys55qE5a695bqmXG4gICAgbGV0IGhlaWdodCA9IDA7XG4gICAgdGhpcy5fZ2V0Q2hpbGRyZW5JbkZsb3coKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgaWYgKGNoaWxkLmxpbmUpIHtcbiAgICAgICAgaWYgKGNoaWxkLmxpbmUuc3RhcnQgPT09IGNoaWxkKSB7XG4gICAgICAgICAgaWYgKGNoaWxkLmxpbmUud2lkdGggPiB3aWR0aCkge1xuICAgICAgICAgICAgd2lkdGggPSBjaGlsZC5saW5lLndpZHRoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBoZWlnaHQgKz0gY2hpbGQubGluZS5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY2hpbGQucmVuZGVyU3R5bGVzLndpZHRoID4gd2lkdGgpIHtcbiAgICAgICAgd2lkdGggPSBjaGlsZC5yZW5kZXJTdHlsZXMud2lkdGg7XG4gICAgICAgIGhlaWdodCArPSBjaGlsZC5yZW5kZXJTdHlsZXMuaGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGVpZ2h0ICs9IGNoaWxkLnJlbmRlclN0eWxlcy5oZWlnaHQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4geyB3aWR0aCwgaGVpZ2h0IH07XG4gIH1cblxuICAvLyDojrflj5blhYPntKDvvIzlj6rkvJrmib7or6XlhYPntKDlrZDnuqdcbiAgZ2V0RWxlbWVudEJ5KGtleSwgdmFsdWUpIHtcbiAgICBjb25zdCBtYXRjaCA9IFtdO1xuICAgIHdhbGsodGhpcywgKGVsZW1lbnQpID0+IHtcbiAgICAgIGlmIChlbGVtZW50Lm9wdGlvbnMuYXR0cnNba2V5XSA9PT0gdmFsdWUpIHtcbiAgICAgICAgbWF0Y2gucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF0Y2g7XG4gIH1cblxuICAvLyDmt7vliqDlnKjmnIDlkI5cbiAgYXBwZW5kQ2hpbGQoZWxlbWVudCkge1xuICAgIHN1cGVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIHRoaXMuZ2V0TGF5ZXIoKS5vbkVsZW1lbnRBZGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvL1xuICBwcmVwZW5kQ2hpbGQoZWxlbWVudCkge1xuICAgIHN1cGVyLnByZXBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB0aGlzLmdldExheWVyKCkub25FbGVtZW50QWRkKGVsZW1lbnQpO1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmVtb3ZlQ2hpbGQoZWxlbWVudCkge1xuICAgIHN1cGVyLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIHRoaXMuZ2V0TGF5ZXIoKS5vbkVsZW1lbnRSZW1vdmUoZWxlbWVudCk7XG4gIH1cblxuICBhcHBlbmQoZWxlbWVudCkge1xuICAgIHN1cGVyLmFwcGVuZChlbGVtZW50KTtcbiAgICB0aGlzLmdldExheWVyKCkub25FbGVtZW50QWRkKGVsZW1lbnQpO1xuICB9XG5cbiAgcHJlcGVuZChlbGVtZW50KSB7XG4gICAgc3VwZXIucHJlcGVuZChlbGVtZW50KTtcbiAgICB0aGlzLmdldExheWVyKCkub25FbGVtZW50QWRkKGVsZW1lbnQpO1xuICB9XG5cbiAgc2V0U3R5bGVzKHN0eWxlcykge1xuICAgIGxldCBfbmVlZFJlZmxvdyA9IGZhbHNlO1xuICAgIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAobmVlZFJlZmxvdyhrZXkpKSB7XG4gICAgICAgIF9uZWVkUmVmbG93ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyU3R5bGVzW2tleV0gPSBzdHlsZXNba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoX25lZWRSZWZsb3cpIHtcbiAgICAgIE9iamVjdC5rZXlzKHN0eWxlcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5zdHlsZXNba2V5XSA9IHN0eWxlc1trZXldO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmdldExheWVyKCkucmVmbG93RWxlbWVudCh0aGlzLCB0aGlzKTtcbiAgICAgIC8vIGNvbnNvbGUud2Fybign5a6e6aqM5oCn5Yqf6IO9JylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRSZW5kZXIoKS5yZXF1ZXN0UmVwYWludCgpO1xuICAgIH1cbiAgfVxufVxuIl19