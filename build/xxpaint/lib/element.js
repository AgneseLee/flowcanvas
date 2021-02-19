"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constants_1 = require("./constants");
var utils_1 = require("./utils");
var line_1 = require("./line");
var flex_box_1 = require("./flex-box");
var tree_node_1 = require("./tree-node");
var complete_styles_1 = require("./complete-styles");
var Element = (function (_super) {
    tslib_1.__extends(Element, _super);
    function Element(options, children) {
        var _this = _super.call(this, children) || this;
        _this.options = tslib_1.__assign({ attrs: {}, styles: {}, on: {} }, options);
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
        this.styles = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, this._getDefaultStyles()), this._getParentStyles(this.options.styles)), this.options.styles || {});
        this._completeStyles();
        this._initRenderStyles();
    };
    Element.prototype._initRenderStyles = function () {
        var renderStyles = tslib_1.__assign({}, this.styles);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy94eHBhaW50L2xpYi9lbGVtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlDQUFpQztBQUVqQyxpQ0FBK0g7QUFDL0gsK0JBQTBCO0FBQzFCLHVDQUFpQztBQUNqQyx5Q0FBbUM7QUFDbkMscURBQStDO0FBUS9DO0lBQXFDLG1DQUFRO0lBQzNDLGlCQUFZLE9BQU8sRUFBRSxRQUFRO1FBQTdCLFlBQ0Usa0JBQU0sUUFBUSxDQUFDLFNBU2hCO1FBUkMsS0FBSSxDQUFDLE9BQU8sc0JBQUssS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUssT0FBTyxDQUFFLENBQUM7UUFDN0QsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsS0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxLQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOztJQUN0QixDQUFDO0lBRUQsc0JBQUksR0FBSjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUVyQixDQUFDO0lBRUQsNkJBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCwwQkFBUSxHQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsMkJBQVMsR0FBVDtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUks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SSxDQUFDLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsMkJBQVMsR0FBVCxVQUFVLE1BQU07UUFBaEIsaUJBa0JDO1FBakJDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7WUFDOUIsSUFBSSxrQkFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNuQixXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQ3BCO2lCQUFNO2dCQUNMLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLFdBQVcsRUFBRTtZQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRztnQkFDOUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FFM0M7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNuQztJQUNILENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQXBaRCxDQUFxQyxtQkFBUSxHQW9aNUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IFNUWUxFUyBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgcHhVdGlsIGZyb20gJy4vcHgnO1xuaW1wb3J0IHsgaXNFeGFjdCwgd2FsaywgaXNPdXRlciwgcGFyc2VPdXRlciwgd2Fsa1BhcmVudCwgaXNFbmROb2RlLCBpc0F1dG8sIGZpbmRSZWxhdGl2ZVRvLCBuZWVkUmVmbG93LCBmbG9vciB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IExpbmUgZnJvbSAnLi9saW5lJztcbmltcG9ydCBGbGV4Qm94IGZyb20gJy4vZmxleC1ib3gnO1xuaW1wb3J0IFRyZWVOb2RlIGZyb20gJy4vdHJlZS1ub2RlJztcbmltcG9ydCBjb21wbGV0ZVN0eWxlcyBmcm9tICcuL2NvbXBsZXRlLXN0eWxlcyc7XG5cbi8qKlxuICogRWxlbWVudOexu+WunueOsOebkuaooeWei+S7peWPiuWumuS9je+8jOS4jeWFt+Wkh+e7mOWItlxuICog5YW25LuW57G757un5om/5a6e546wXG4gKlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnQgZXh0ZW5kcyBUcmVlTm9kZSB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMsIGNoaWxkcmVuKSB7XG4gICAgc3VwZXIoY2hpbGRyZW4pO1xuICAgIHRoaXMub3B0aW9ucyA9IHsgYXR0cnM6IHt9LCBzdHlsZXM6IHt9LCBvbjoge30sIC4uLm9wdGlvbnMgfTtcbiAgICB0aGlzLnN0eWxlcyA9IG51bGw7XG4gICAgdGhpcy5yZW5kZXJTdHlsZXMgPSBudWxsO1xuICAgIHRoaXMueCA9IDA7XG4gICAgdGhpcy55ID0gMDtcbiAgICB0aGlzLnJlbmRlciA9IG51bGw7XG4gICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuX2luaXRTdHlsZXMoKTtcbiAgICAvLyB0aGlzLmluaXRFdmVudCgpXG4gIH1cblxuICByZW1vdmVFdmVudCgpIHtcbiAgICB0aGlzLmdldExheWVyKCkuZXZlbnRNYW5hZ2VyLnJlbW92ZUVsZW1lbnQodGhpcyk7XG4gIH1cblxuICBnZXRMYXllcigpIHtcbiAgICByZXR1cm4gdGhpcy5yb290LmxheWVyO1xuICB9XG5cbiAgZ2V0UmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLnJvb3QubGF5ZXIucmVuZGVyO1xuICB9XG5cbiAgX3BhaW50KCkge1xuXG4gIH1cblxuICBtb3VudChsYXllcikge1xuICAgIGxheWVyLm1vdW50Tm9kZSh0aGlzKTtcbiAgfVxuXG4gIF9pbml0U3R5bGVzKCkge1xuICAgIHRoaXMuc3R5bGVzID0geyAuLi50aGlzLl9nZXREZWZhdWx0U3R5bGVzKCksIC4uLnRoaXMuX2dldFBhcmVudFN0eWxlcyh0aGlzLm9wdGlvbnMuc3R5bGVzKSwgLi4udGhpcy5vcHRpb25zLnN0eWxlcyB8fCB7fSB9O1xuXG4gICAgdGhpcy5fY29tcGxldGVTdHlsZXMoKTtcblxuICAgIHRoaXMuX2luaXRSZW5kZXJTdHlsZXMoKTtcbiAgfVxuXG4gIF9pbml0UmVuZGVyU3R5bGVzKCkge1xuICAgIGNvbnN0IHJlbmRlclN0eWxlcyA9IHsgLi4udGhpcy5zdHlsZXMgfTtcbiAgICBjb25zdCBwYXJlbnRXaWR0aCA9IHRoaXMuX2dldENvbnRhaW5lckxheW91dCgpLmNvbnRlbnRXaWR0aDtcbiAgICBjb25zdCBwYXJlbnRIZWlnaHQgPSB0aGlzLl9nZXRDb250YWluZXJMYXlvdXQoKS5jb250ZW50SGVpZ2h0O1xuXG4gICAgaWYgKGlzQXV0byhyZW5kZXJTdHlsZXMud2lkdGgpKSB7XG4gICAgICByZW5kZXJTdHlsZXMucGFkZGluZ1dpZHRoID0gMDtcbiAgICB9IGVsc2UgaWYgKGlzT3V0ZXIocmVuZGVyU3R5bGVzLndpZHRoKSkge1xuICAgICAgcmVuZGVyU3R5bGVzLnBhZGRpbmdXaWR0aCA9IHBhcnNlT3V0ZXIocmVuZGVyU3R5bGVzLndpZHRoKSAqIHBhcmVudFdpZHRoIC0gcmVuZGVyU3R5bGVzLm1hcmdpbkxlZnQgLSByZW5kZXJTdHlsZXMubWFyZ2luUmlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbmRlclN0eWxlcy5wYWRkaW5nV2lkdGggPSByZW5kZXJTdHlsZXMud2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKGlzQXV0byhyZW5kZXJTdHlsZXMuaGVpZ2h0KSkge1xuICAgICAgcmVuZGVyU3R5bGVzLnBhZGRpbmdIZWlnaHQgPSAwO1xuICAgIH0gZWxzZSBpZiAoaXNPdXRlcihyZW5kZXJTdHlsZXMuaGVpZ2h0KSkge1xuICAgICAgcmVuZGVyU3R5bGVzLnBhZGRpbmdIZWlnaHQgPSBwYXJzZU91dGVyKHJlbmRlclN0eWxlcy5oZWlnaHQpICogcGFyZW50SGVpZ2h0IC0gcmVuZGVyU3R5bGVzLm1hcmdpblRvcCAtIHJlbmRlclN0eWxlcy5tYXJnaW5Cb3R0b207XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbmRlclN0eWxlcy5wYWRkaW5nSGVpZ2h0ID0gcmVuZGVyU3R5bGVzLmhlaWdodDtcbiAgICB9XG5cbiAgICBpZiAoIXJlbmRlclN0eWxlcy5wYWRkaW5nV2lkdGgpIHJlbmRlclN0eWxlcy5wYWRkaW5nV2lkdGggPSAwO1xuICAgIGlmICghcmVuZGVyU3R5bGVzLnBhZGRpbmdIZWlnaHQpIHJlbmRlclN0eWxlcy5wYWRkaW5nSGVpZ2h0ID0gMDtcblxuICAgIC8vIOWIneWni+WMlmNvbnRlbnRXaWR0aFxuICAgIHJlbmRlclN0eWxlcy5jb250ZW50V2lkdGggPSByZW5kZXJTdHlsZXMucGFkZGluZ1dpZHRoIC0gcmVuZGVyU3R5bGVzLnBhZGRpbmdMZWZ0IC0gcmVuZGVyU3R5bGVzLnBhZGRpbmdSaWdodDtcbiAgICByZW5kZXJTdHlsZXMuY29udGVudEhlaWdodCA9IHJlbmRlclN0eWxlcy5wYWRkaW5nSGVpZ2h0IC0gcmVuZGVyU3R5bGVzLnBhZGRpbmdUb3AgLSByZW5kZXJTdHlsZXMucGFkZGluZ0JvdHRvbTtcblxuICAgIHJlbmRlclN0eWxlcy53aWR0aCA9IHJlbmRlclN0eWxlcy5wYWRkaW5nV2lkdGggKyByZW5kZXJTdHlsZXMubWFyZ2luTGVmdCArIHJlbmRlclN0eWxlcy5tYXJnaW5SaWdodCArIHRoaXMuX2dldFRvdGFsQm9yZGVyV2lkdGgocmVuZGVyU3R5bGVzKTtcbiAgICByZW5kZXJTdHlsZXMuaGVpZ2h0ID0gcmVuZGVyU3R5bGVzLnBhZGRpbmdIZWlnaHQgKyByZW5kZXJTdHlsZXMubWFyZ2luVG9wICsgcmVuZGVyU3R5bGVzLm1hcmdpbkJvdHRvbSArIHRoaXMuX2dldFRvdGFsQm9yZGVySGVpZ2h0KHJlbmRlclN0eWxlcyk7XG5cbiAgICB0aGlzLnJlbmRlclN0eWxlcyA9IHJlbmRlclN0eWxlcztcblxuICAgIGlmICh0aGlzLl9JbkZsZXhCb3goKSkge1xuICAgICAgdGhpcy5fYmluZEZsZXhCb3goKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzSW5GbG93KCkpIHtcbiAgICAgIHRoaXMucmVsYXRpdmVUbyA9IGZpbmRSZWxhdGl2ZVRvKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDpnIDopoHnu6fmib/nmoRzdHlsZXPmlL7lnKjov5nph4xcbiAgICovXG4gIF9nZXRQYXJlbnRTdHlsZXMoY3VyU3R5bGVzKSB7XG4gICAgY29uc3QgeyB0ZXh0QWxpZ24sIGxpbmVIZWlnaHQsIGZvbnRTaXplLCBjb2xvciwgZm9udEZhbWlseSwgYWxpZ25JdGVtcywgdmlzaWJsZSA9IHRydWUgfSA9IHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LnJlbmRlclN0eWxlcyB8fCB7fTtcbiAgICBjb25zdCBleHRlbmRTdHlsZXMgPSB7fTtcbiAgICBpZiAodGV4dEFsaWduKSBleHRlbmRTdHlsZXMudGV4dEFsaWduID0gdGV4dEFsaWduO1xuICAgIGlmIChmb250U2l6ZSkgZXh0ZW5kU3R5bGVzLmZvbnRTaXplID0gZm9udFNpemU7XG4gICAgaWYgKGNvbG9yKSBleHRlbmRTdHlsZXMuY29sb3IgPSBjb2xvcjtcbiAgICBpZiAoZm9udEZhbWlseSkgZXh0ZW5kU3R5bGVzLmZvbnRGYW1pbHkgPSBmb250RmFtaWx5O1xuICAgIGlmIChhbGlnbkl0ZW1zICYmICFjdXJTdHlsZXMuYWxpZ25TZWxmKSBleHRlbmRTdHlsZXMuYWxpZ25TZWxmID0gYWxpZ25JdGVtcztcbiAgICBleHRlbmRTdHlsZXMudmlzaWJsZSA9IHZpc2libGU7XG4gICAgcmV0dXJuIGV4dGVuZFN0eWxlcztcbiAgfVxuXG4gIF9jb21wbGV0ZVN0eWxlcygpIHtcbiAgICBjb21wbGV0ZVN0eWxlcyh0aGlzKTtcbiAgfVxuXG4gIF9nZXREZWZhdWx0U3R5bGVzKCkge1xuICAgIHJldHVybiBTVFlMRVMuREVGQVVMVF9TVFlMRVM7XG4gIH1cblxuICAvLyDojrflj5bmlofmoaPmtYHkuK3nmoTlrZDoioLngrlcbiAgX2dldENoaWxkcmVuSW5GbG93KCkge1xuICAgIHJldHVybiB0aGlzLl9nZXRDaGlsZHJlbigpLmZpbHRlcigoaXRlbSkgPT4geyByZXR1cm4gaXRlbS5pc0luRmxvdygpOyB9KTtcbiAgfVxuXG4gIC8vIOaYr+WQpuWcqOaWh+aho+a1geS4rVxuICBpc0luRmxvdygpIHtcbiAgICBjb25zdCB7IHBvc2l0aW9uLCBkaXNwbGF5IH0gPSB0aGlzLnN0eWxlcztcbiAgICByZXR1cm4gcG9zaXRpb24gIT09IFNUWUxFUy5QT1NJVElPTi5BQlNPTFVURSAmJiBwb3NpdGlvbiAhPT0gU1RZTEVTLlBPU0lUSU9OLkZJWEVEO1xuICB9XG5cbiAgaXNWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLnJlbmRlclN0eWxlcy52aXNpYmxlICYmIHRoaXMudmlzaWJsZTtcbiAgfVxuXG4gIF9nZW5lcmF0ZVJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldEN0eCgpIHtcbiAgICByZXR1cm4gdGhpcy5yb290LmxheWVyLmN0eDtcbiAgfVxuXG4gIC8qKlxuICAgKiDlrp7njrDmlofmoaPmtYEg6ZyA6KaB55+l6YGT5LiK5LiA5Liq5YWE5byf6IqC54K5XG4gICAqL1xuICBfcmVmbG93KCkge1xuXG4gIH1cblxuICBfaW5pdFdpZHRoSGVpZ2h0KCkge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgZGlzcGxheSwgZmxleCwgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHQsIG1hcmdpblRvcCwgbWFyZ2luQm90dG9tIH0gPSB0aGlzLnN0eWxlcztcbiAgICBpZiAoaXNBdXRvKHdpZHRoKSB8fCBpc0F1dG8oaGVpZ2h0KSkge1xuICAgICAgLy8g6L+Z5LiA5q2l6ZyA6KaB6YGN5Y6G77yM5Yik5pat5LiA5LiLXG4gICAgICBjb25zdCBsYXlvdXQgPSB0aGlzLl9tZWFzdXJlTGF5b3V0KCk7XG4gICAgICAvLyDliJ3lp4vljJblrr3luqbpq5jluqZcbiAgICAgIGlmIChpc0F1dG8od2lkdGgpKSB7XG4gICAgICAgIHRoaXMucmVuZGVyU3R5bGVzLmNvbnRlbnRXaWR0aCA9IGZsb29yKGxheW91dC53aWR0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0F1dG8oaGVpZ2h0KSkge1xuICAgICAgICAvLyDkuI3loavlsLHmmK9hdXRvXG4gICAgICAgIHRoaXMucmVuZGVyU3R5bGVzLmNvbnRlbnRIZWlnaHQgPSBmbG9vcihsYXlvdXQuaGVpZ2h0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9yZWZyZXNoTGF5b3V0V2l0aENvbnRlbnQoKTtcblxuICAgIGlmICh0aGlzLl9JbkZsZXhCb3goKSkge1xuICAgICAgdGhpcy5saW5lLnJlZnJlc2hXaWR0aEhlaWdodCh0aGlzKTtcbiAgICB9IGVsc2UgaWYgKGRpc3BsYXkgPT09IFNUWUxFUy5ESVNQTEFZLklOTElORV9CTE9DSykge1xuICAgICAgLy8g5aaC5p6c5pivaW5saW5lLWJsb2NrICDov5nph4zku4XorqHnrpfpq5jluqZcbiAgICAgIHRoaXMuX2JpbmRMaW5lKCk7XG4gICAgfVxuICB9XG5cbiAgX2luaXRQb3NpdGlvbigpIHtcbiAgICBjb25zdCB7IGNvbnRlbnRYIH0gPSB0aGlzLl9nZXRDb250YWluZXJMYXlvdXQoKTtcbiAgICBjb25zdCB7IHBhZGRpbmdMZWZ0LCBwYWRkaW5nVG9wLCBib3JkZXJMZWZ0V2lkdGgsIGJvcmRlclRvcFdpZHRoLCBtYXJnaW5MZWZ0LCBtYXJnaW5Ub3AgfSA9IHRoaXMucmVuZGVyU3R5bGVzO1xuICAgIC8vIOWIneWni+WMlmN0eOS9jee9rlxuICAgIGlmICghdGhpcy5pc0luRmxvdygpKSB7XG4gICAgICAvLyDkuI3lnKjmlofmoaPmtYHkuK1cbiAgICAgIGNvbnN0IHsgY29udGVudFgsIGNvbnRlbnRZLCBjb250ZW50V2lkdGgsIGNvbnRlbnRIZWlnaHQgfSA9IHRoaXMuX2dldENvbnRhaW5lckxheW91dCh0aGlzLnJlbGF0aXZlVG8pO1xuICAgICAgbGV0IHsgdG9wLCBib3R0b20sIHJpZ2h0LCBsZWZ0LCB3aWR0aCwgaGVpZ2h0IH0gPSB0aGlzLnJlbmRlclN0eWxlcztcbiAgICAgIGlmIChpc091dGVyKHRvcCkpIHRvcCA9IHBhcnNlT3V0ZXIodG9wKSAqIGNvbnRlbnRIZWlnaHQ7XG4gICAgICBpZiAoaXNPdXRlcihib3R0b20pKSBib3R0b20gPSBwYXJzZU91dGVyKGJvdHRvbSkgKiBjb250ZW50SGVpZ2h0O1xuICAgICAgaWYgKGlzT3V0ZXIobGVmdCkpIGxlZnQgPSBwYXJzZU91dGVyKGxlZnQpICogY29udGVudFdpZHRoO1xuICAgICAgaWYgKGlzT3V0ZXIocmlnaHQpKSByaWdodCA9IHBhcnNlT3V0ZXIocmlnaHQpICogY29udGVudFdpZHRoO1xuICAgICAgaWYgKGlzRXhhY3QodG9wKSkge1xuICAgICAgICB0aGlzLnkgPSBjb250ZW50WSArIHRvcDtcbiAgICAgIH0gZWxzZSBpZiAoaXNFeGFjdChib3R0b20pKSB7XG4gICAgICAgIHRoaXMueSA9IGNvbnRlbnRZICsgY29udGVudEhlaWdodCAtIGJvdHRvbSAtIGhlaWdodDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRXhhY3QobGVmdCkpIHtcbiAgICAgICAgdGhpcy54ID0gY29udGVudFggKyBsZWZ0O1xuICAgICAgfSBlbHNlIGlmIChpc0V4YWN0KHJpZ2h0KSkge1xuICAgICAgICB0aGlzLnggPSBjb250ZW50WCArIGNvbnRlbnRXaWR0aCAtIHJpZ2h0IC0gd2lkdGg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLl9JbkZsZXhCb3goKSkge1xuICAgICAgdGhpcy5saW5lLnJlZnJlc2hFbGVtZW50UG9zaXRpb24odGhpcyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJlbmRlclN0eWxlcy5kaXNwbGF5ID09PSBTVFlMRVMuRElTUExBWS5JTkxJTkVfQkxPQ0spIHtcbiAgICAgIC8vIGlubGluZS1ibG9ja+WIsGxpbmXph4zorqHnrpdcbiAgICAgIC8vIHRoaXMuX2JpbmRMaW5lKClcbiAgICAgIHRoaXMubGluZS5yZWZyZXNoRWxlbWVudFBvc2l0aW9uKHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnggPSBjb250ZW50WDtcbiAgICAgIHRoaXMueSA9IHRoaXMuX2dldFByZUxheW91dCgpLnkgKyB0aGlzLl9nZXRQcmVMYXlvdXQoKS5oZWlnaHQ7XG4gICAgfVxuICAgIHRoaXMueCA9IGZsb29yKHRoaXMueCk7XG4gICAgdGhpcy55ID0gZmxvb3IodGhpcy55KTtcbiAgICB0aGlzLmNvbnRlbnRYID0gdGhpcy54ICsgcGFkZGluZ0xlZnQgKyBib3JkZXJMZWZ0V2lkdGggKyBtYXJnaW5MZWZ0O1xuICAgIHRoaXMuY29udGVudFkgPSB0aGlzLnkgKyBwYWRkaW5nVG9wICsgYm9yZGVyVG9wV2lkdGggKyBtYXJnaW5Ub3A7XG4gIH1cblxuICBfSW5GbGV4Qm94KCkge1xuICAgIGlmICghdGhpcy5pc0luRmxvdygpKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCF0aGlzLnBhcmVudCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5yZW5kZXJTdHlsZXMuZGlzcGxheSA9PT0gU1RZTEVTLkRJU1BMQVkuRkxFWCkgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyDniLblhYPntKDmoLnmja7lrZDlhYPntKDmkpHlvIBjb250ZW505ZCO77yM5YaN6K6h566Xd2lkdGhcbiAgX3JlZnJlc2hMYXlvdXRXaXRoQ29udGVudCgpIHtcbiAgICB0aGlzLnJlbmRlclN0eWxlcy5oZWlnaHQgPSBmbG9vcih0aGlzLnJlbmRlclN0eWxlcy5jb250ZW50SGVpZ2h0ICsgdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ1RvcCArIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdCb3R0b20gKyB0aGlzLnJlbmRlclN0eWxlcy5tYXJnaW5Ub3AgKyB0aGlzLnJlbmRlclN0eWxlcy5tYXJnaW5Cb3R0b20gKyB0aGlzLl9nZXRUb3RhbEJvcmRlckhlaWdodCgpKTtcbiAgICB0aGlzLnJlbmRlclN0eWxlcy53aWR0aCA9IGZsb29yKHRoaXMucmVuZGVyU3R5bGVzLmNvbnRlbnRXaWR0aCArIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdMZWZ0ICsgdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ1JpZ2h0ICsgdGhpcy5yZW5kZXJTdHlsZXMubWFyZ2luTGVmdCArIHRoaXMucmVuZGVyU3R5bGVzLm1hcmdpblJpZ2h0ICsgdGhpcy5fZ2V0VG90YWxCb3JkZXJXaWR0aCgpKTtcbiAgICB0aGlzLnJlbmRlclN0eWxlcy5wYWRkaW5nV2lkdGggPSBmbG9vcih0aGlzLnJlbmRlclN0eWxlcy5jb250ZW50V2lkdGggKyB0aGlzLnJlbmRlclN0eWxlcy5wYWRkaW5nTGVmdCArIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdSaWdodCk7XG4gICAgdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ0hlaWdodCA9IGZsb29yKHRoaXMucmVuZGVyU3R5bGVzLmNvbnRlbnRIZWlnaHQgKyB0aGlzLnJlbmRlclN0eWxlcy5wYWRkaW5nVG9wICsgdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ0JvdHRvbSk7XG4gIH1cblxuICAvLyDniLblhYPntKDmoLnmja7lrZDlhYPntKDmkpHlvIBjb250ZW505ZCO77yM5YaN6K6h566Xd2lkdGhcbiAgX3JlZnJlc2hDb250ZW50V2l0aExheW91dCgpIHtcbiAgICB0aGlzLnJlbmRlclN0eWxlcy5jb250ZW50SGVpZ2h0ID0gdGhpcy5yZW5kZXJTdHlsZXMuaGVpZ2h0IC0gdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ1RvcCAtIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdCb3R0b20gLSB0aGlzLnJlbmRlclN0eWxlcy5tYXJnaW5Ub3AgLSB0aGlzLnJlbmRlclN0eWxlcy5tYXJnaW5Cb3R0b20gLSB0aGlzLl9nZXRUb3RhbEJvcmRlckhlaWdodCgpO1xuICAgIHRoaXMucmVuZGVyU3R5bGVzLmNvbnRlbnRXaWR0aCA9IHRoaXMucmVuZGVyU3R5bGVzLndpZHRoIC0gdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ0xlZnQgLSB0aGlzLnJlbmRlclN0eWxlcy5wYWRkaW5nUmlnaHQgLSB0aGlzLnJlbmRlclN0eWxlcy5tYXJnaW5MZWZ0IC0gdGhpcy5yZW5kZXJTdHlsZXMubWFyZ2luUmlnaHQgLSB0aGlzLl9nZXRUb3RhbEJvcmRlcldpZHRoKCk7XG4gICAgdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ1dpZHRoID0gZmxvb3IodGhpcy5yZW5kZXJTdHlsZXMuY29udGVudFdpZHRoICsgdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ0xlZnQgKyB0aGlzLnJlbmRlclN0eWxlcy5wYWRkaW5nUmlnaHQpO1xuICAgIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdIZWlnaHQgPSBmbG9vcih0aGlzLnJlbmRlclN0eWxlcy5jb250ZW50SGVpZ2h0ICsgdGhpcy5yZW5kZXJTdHlsZXMucGFkZGluZ1RvcCArIHRoaXMucmVuZGVyU3R5bGVzLnBhZGRpbmdCb3R0b20pO1xuICB9XG5cbiAgX2dldFRvdGFsQm9yZGVyV2lkdGgocmVuZGVyU3R5bGVzID0gdGhpcy5yZW5kZXJTdHlsZXMpIHtcbiAgICByZXR1cm4gcmVuZGVyU3R5bGVzLmJvcmRlckxlZnRXaWR0aCArIHJlbmRlclN0eWxlcy5ib3JkZXJSaWdodFdpZHRoO1xuICB9XG5cbiAgX2dldFRvdGFsQm9yZGVySGVpZ2h0KHJlbmRlclN0eWxlcyA9IHRoaXMucmVuZGVyU3R5bGVzKSB7XG4gICAgcmV0dXJuIHJlbmRlclN0eWxlcy5ib3JkZXJUb3BXaWR0aCArIHJlbmRlclN0eWxlcy5ib3JkZXJCb3R0b21XaWR0aDtcbiAgfVxuXG4gIF9iaW5kTGluZSgpIHtcbiAgICBpZiAodGhpcy5wcmUgJiYgdGhpcy5wcmUubGluZSAmJiB0aGlzLnByZS5saW5lLmNhbklFbnRlcih0aGlzKSkge1xuICAgICAgdGhpcy5wcmUubGluZS5hZGQodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOaWsOihjFxuICAgICAgbmV3IExpbmUoKS5iaW5kKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIF9iaW5kRmxleEJveCgpIHtcbiAgICBpZiAodGhpcy5wcmUgJiYgdGhpcy5wcmUubGluZSkge1xuICAgICAgdGhpcy5wcmUubGluZS5hZGQodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOaWsOihjFxuICAgICAgbmV3IEZsZXhCb3goKS5iaW5kKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIF9nZXRDb250YWluZXJMYXlvdXQoY29udGFpbmVyID0gdGhpcy5wYXJlbnQpIHtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgLy8gcm9vdFxuICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lcikge1xuICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgIH1cbiAgICAgIGNvbnRhaW5lciA9IHtcbiAgICAgICAgcmVuZGVyU3R5bGVzOiB7XG4gICAgICAgICAgd2lkdGg6IHRoaXMuY29udGFpbmVyLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogdGhpcy5jb250YWluZXIuaGVpZ2h0LFxuICAgICAgICAgIHBhZGRpbmdUb3A6IDAsXG4gICAgICAgICAgcGFkZGluZ0JvdHRvbTogMCxcbiAgICAgICAgICBwYWRkaW5nTGVmdDogMCxcbiAgICAgICAgICBwYWRkaW5nUmlnaHQ6IDAsXG4gICAgICAgICAgbWFyZ2luTGVmdDogMCxcbiAgICAgICAgICBtYXJnaW5SaWdodDogMCxcbiAgICAgICAgICBtYXJnaW5Ub3A6IDAsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiAwLFxuICAgICAgICAgIGNvbnRlbnRXaWR0aDogdGhpcy5jb250YWluZXIud2lkdGgsXG4gICAgICAgICAgY29udGVudEhlaWdodDogdGhpcy5jb250YWluZXIuaGVpZ2h0LFxuICAgICAgICB9LFxuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwLFxuICAgICAgICBjb250ZW50WDogMCxcbiAgICAgICAgY29udGVudFk6IDAsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IGNvbnRhaW5lci5yZW5kZXJTdHlsZXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IGNvbnRhaW5lci5yZW5kZXJTdHlsZXMuaGVpZ2h0LFxuICAgICAgeDogY29udGFpbmVyLngsXG4gICAgICB5OiBjb250YWluZXIueSxcbiAgICAgIHBhZGRpbmdUb3A6IGNvbnRhaW5lci5yZW5kZXJTdHlsZXMucGFkZGluZ1RvcCxcbiAgICAgIHBhZGRpbmdCb3R0b206IGNvbnRhaW5lci5yZW5kZXJTdHlsZXMucGFkZGluZ0JvdHRvbSxcbiAgICAgIHBhZGRpbmdMZWZ0OiBjb250YWluZXIucmVuZGVyU3R5bGVzLnBhZGRpbmdMZWZ0LFxuICAgICAgcGFkZGluZ1JpZ2h0OiBjb250YWluZXIucmVuZGVyU3R5bGVzLnBhZGRpbmdSaWdodCxcbiAgICAgIG1hcmdpbkxlZnQ6IGNvbnRhaW5lci5yZW5kZXJTdHlsZXMubWFyZ2luTGVmdCxcbiAgICAgIG1hcmdpblJpZ2h0OiBjb250YWluZXIucmVuZGVyU3R5bGVzLm1hcmdpblJpZ2h0LFxuICAgICAgbWFyZ2luVG9wOiBjb250YWluZXIucmVuZGVyU3R5bGVzLm1hcmdpblRvcCxcbiAgICAgIG1hcmdpbkJvdHRvbTogY29udGFpbmVyLnJlbmRlclN0eWxlcy5tYXJnaW5Cb3R0b20sXG4gICAgICBjb250ZW50WDogY29udGFpbmVyLmNvbnRlbnRYLFxuICAgICAgY29udGVudFk6IGNvbnRhaW5lci5jb250ZW50WSxcbiAgICAgIGNvbnRlbnRXaWR0aDogY29udGFpbmVyLnJlbmRlclN0eWxlcy5jb250ZW50V2lkdGgsXG4gICAgICBjb250ZW50SGVpZ2h0OiBjb250YWluZXIucmVuZGVyU3R5bGVzLmNvbnRlbnRIZWlnaHQsXG4gICAgfTtcbiAgfVxuXG4gIC8vIOi/memHjOWJjeS4gOS4quiKgueCueW/hemhu+WcqOaWh+aho+a1geS4rVxuICBfZ2V0UHJlTGF5b3V0KCkge1xuICAgIGxldCBjdXIgPSB0aGlzLnByZTtcbiAgICB3aGlsZSAoY3VyICYmICFjdXIuaXNJbkZsb3coKSkge1xuICAgICAgY3VyID0gY3VyLnByZTtcbiAgICB9XG4gICAgLy8g5aaC5p6c5rKh5pyJ5YmN5LiA5Liq5oiW6ICF5YmN6Z2i55qE6YO95LiN5Zyo5paH5qGj5rWB5Lit77yM6I635Y+W5a655Zmo55qEXG4gICAgaWYgKGN1cikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd2lkdGg6IGN1ci5yZW5kZXJTdHlsZXMud2lkdGgsXG4gICAgICAgIGhlaWdodDogY3VyLnJlbmRlclN0eWxlcy5oZWlnaHQsXG4gICAgICAgIHg6IGN1ci54LFxuICAgICAgICB5OiBjdXIueSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIHg6IHRoaXMuX2dldENvbnRhaW5lckxheW91dCgpLmNvbnRlbnRYLFxuICAgICAgeTogdGhpcy5fZ2V0Q29udGFpbmVyTGF5b3V0KCkuY29udGVudFksXG4gICAgfTtcbiAgfVxuXG4gIC8vIOiuoeeul+iHqui6q+eahOmrmOW6plxuICBfbWVhc3VyZUxheW91dCgpIHtcbiAgICBsZXQgd2lkdGggPSAwOyAvLyDpnIDopoHogIPomZHljp/mnKznmoTlrr3luqZcbiAgICBsZXQgaGVpZ2h0ID0gMDtcbiAgICB0aGlzLl9nZXRDaGlsZHJlbkluRmxvdygpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBpZiAoY2hpbGQubGluZSkge1xuICAgICAgICBpZiAoY2hpbGQubGluZS5zdGFydCA9PT0gY2hpbGQpIHtcbiAgICAgICAgICBpZiAoY2hpbGQubGluZS53aWR0aCA+IHdpZHRoKSB7XG4gICAgICAgICAgICB3aWR0aCA9IGNoaWxkLmxpbmUud2lkdGg7XG4gICAgICAgICAgfVxuICAgICAgICAgIGhlaWdodCArPSBjaGlsZC5saW5lLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjaGlsZC5yZW5kZXJTdHlsZXMud2lkdGggPiB3aWR0aCkge1xuICAgICAgICB3aWR0aCA9IGNoaWxkLnJlbmRlclN0eWxlcy53aWR0aDtcbiAgICAgICAgaGVpZ2h0ICs9IGNoaWxkLnJlbmRlclN0eWxlcy5oZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoZWlnaHQgKz0gY2hpbGQucmVuZGVyU3R5bGVzLmhlaWdodDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7IHdpZHRoLCBoZWlnaHQgfTtcbiAgfVxuXG4gIC8vIOiOt+WPluWFg+e0oO+8jOWPquS8muaJvuivpeWFg+e0oOWtkOe6p1xuICBnZXRFbGVtZW50Qnkoa2V5LCB2YWx1ZSkge1xuICAgIGNvbnN0IG1hdGNoID0gW107XG4gICAgd2Fsayh0aGlzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQub3B0aW9ucy5hdHRyc1trZXldID09PSB2YWx1ZSkge1xuICAgICAgICBtYXRjaC5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtYXRjaDtcbiAgfVxuXG4gIC8vIOa3u+WKoOWcqOacgOWQjlxuICBhcHBlbmRDaGlsZChlbGVtZW50KSB7XG4gICAgc3VwZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgdGhpcy5nZXRMYXllcigpLm9uRWxlbWVudEFkZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8vXG4gIHByZXBlbmRDaGlsZChlbGVtZW50KSB7XG4gICAgc3VwZXIucHJlcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIHRoaXMuZ2V0TGF5ZXIoKS5vbkVsZW1lbnRBZGQoZWxlbWVudCk7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICByZW1vdmVDaGlsZChlbGVtZW50KSB7XG4gICAgc3VwZXIucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgdGhpcy5nZXRMYXllcigpLm9uRWxlbWVudFJlbW92ZShlbGVtZW50KTtcbiAgfVxuXG4gIGFwcGVuZChlbGVtZW50KSB7XG4gICAgc3VwZXIuYXBwZW5kKGVsZW1lbnQpO1xuICAgIHRoaXMuZ2V0TGF5ZXIoKS5vbkVsZW1lbnRBZGQoZWxlbWVudCk7XG4gIH1cblxuICBwcmVwZW5kKGVsZW1lbnQpIHtcbiAgICBzdXBlci5wcmVwZW5kKGVsZW1lbnQpO1xuICAgIHRoaXMuZ2V0TGF5ZXIoKS5vbkVsZW1lbnRBZGQoZWxlbWVudCk7XG4gIH1cblxuICBzZXRTdHlsZXMoc3R5bGVzKSB7XG4gICAgbGV0IF9uZWVkUmVmbG93ID0gZmFsc2U7XG4gICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmIChuZWVkUmVmbG93KGtleSkpIHtcbiAgICAgICAgX25lZWRSZWZsb3cgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW5kZXJTdHlsZXNba2V5XSA9IHN0eWxlc1trZXldO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChfbmVlZFJlZmxvdykge1xuICAgICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnN0eWxlc1trZXldID0gc3R5bGVzW2tleV07XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZ2V0TGF5ZXIoKS5yZWZsb3dFbGVtZW50KHRoaXMsIHRoaXMpO1xuICAgICAgLy8gY29uc29sZS53YXJuKCflrp7pqozmgKflip/og70nKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldFJlbmRlcigpLnJlcXVlc3RSZXBhaW50KCk7XG4gICAgfVxuICB9XG59XG4iXX0=