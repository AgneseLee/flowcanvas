"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertVnodeIntoLine = void 0;
var layout_1 = require("./layout");
var util_1 = require("./util");
function _createLine(node) {
    var parent = node.parent;
    var _a = util_1.formatPaddingMargin(node.css), paddingLeft = _a.paddingLeft, marginLeft = _a.marginLeft, paddingTop = _a.paddingTop, marginTop = _a.marginTop;
    var x = parent.renderStyle.contentX;
    var y = layout_1.getPreLayout(node).y + layout_1.getPreLayout(node).height;
    var renderStyle = {
        x: x,
        y: y,
        contentX: x + paddingLeft + marginLeft,
        contentY: y + paddingTop + marginTop,
    };
    var line = {
        width: node.parent.processedLocation.width,
        height: node.processedLocation.height,
        paddingTop: node.css.paddingTop ? node.css.paddingTop.toPx() : 0,
        paddingBottom: node.css.paddingBottom ? node.css.paddingBottom.toPx() : 0,
        paddingLeft: node.css.paddingLeft ? node.css.paddingLeft.toPx() : 0,
        paddingRight: node.css.paddingRight ? node.css.paddingRight.toPx() : 0,
        marginLeft: node.css.marginLeft ? node.css.marginLeft.toPx() : 0,
        marginRight: node.css.marginRight ? node.css.marginRight.toPx() : 0,
        marginTop: node.css.marginTop ? node.css.marginTop.toPx() : 0,
        marginBottom: node.css.marginBottom ? node.css.marginBottom.toPx() : 0,
        children: [],
    };
    return Object.assign(line, renderStyle);
}
function _updateLineLayout(line) {
    var widthSum = line.children.reduce(function (pre, next) {
        var _a = _getPreLayoutInLine(next, line), x = _a.x, y = _a.y, preW = _a.width;
        var childPaddingLeft = next.css.paddingLeft ? next.css.paddingLeft.toPx() : 0;
        var childMarginLeft = next.css.marginLeft ? next.css.marginLeft.toPx() : 0;
        var currW = next.processedLocation.width;
        var nextStartX = x + preW + childPaddingLeft + childMarginLeft + currW;
        return nextStartX + pre;
    }, 0);
    line.width = Math.max(widthSum, line.width);
    var updatedLayout = line.children.reduce(function (pre, next) {
        var childPaddingTop = next.css.paddingTop ? next.css.paddingTop.toPx() : 0;
        var childPaddingBottom = next.css.paddingBochildPaddingBottom ? next.css.paddingBochildPaddingBottom.toPx() : 0;
        var childMarginTop = next.css.marginTop ? next.css.marginTop.toPx() : 0;
        var childMarginBottom = next.css.marginBottom ? next.css.marginBottom.toPx() : 0;
        var currH = next.processedLocation.height;
        return {
            h: Math.max(currH, pre.h),
            pt: Math.max(childPaddingTop, pre.pt),
            pb: Math.max(childPaddingBottom, pre.pb),
            mt: Math.max(childMarginTop, pre.mt),
            mb: Math.max(childMarginBottom, pre.mb),
        };
    }, { h: 0, pt: 0, pb: 0, mt: 0, mb: 0 });
    var h = updatedLayout.h, pt = updatedLayout.pt, pb = updatedLayout.pb, mt = updatedLayout.mt, mb = updatedLayout.mb;
    line.paddingTop = pt;
    line.paddingBottom = pb;
    line.marginTop = mt;
    line.marginBottom = mb;
    line.height = h;
    _updateElementLayout(line);
}
function _getPreLayoutInLine(targetNode, line) {
    var idx = line.children.findIndex(function (x) { return x === targetNode; });
    var preEleInLine = line.children[idx - 1];
    if (idx < 0) {
        console.error('找不到行内元素');
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
        };
    }
    if (idx > 0) {
        return {
            width: preEleInLine.processedLocation.width,
            height: preEleInLine.processedLocation.height,
            x: preEleInLine.renderStyle.contentX,
            y: preEleInLine.renderStyle.contentY,
        };
    }
    return {
        width: 0,
        height: 0,
        x: line && _getContainerLineLayout(line).contentX,
        y: line && _getContainerLineLayout(line).contentY,
    };
}
function _getContainerLineLayout(container) {
    if (!container) {
        if (!container) {
            debugger;
        }
        container = {
            renderStyles: {
                width: container.processedLocation.width,
                height: container.processedLocation.height,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0,
            },
            x: 0,
            y: 0,
            contentX: 0,
            contentY: 0,
        };
    }
    var res = {
        width: container.width,
        height: container.height,
        x: container.x,
        y: container.y,
        paddingTop: container.paddingTop ? container.paddingTop : 0,
        paddingBottom: container.paddingBottom ? container.paddingBottom : 0,
        paddingLeft: container.paddingLeft ? container.paddingLeft : 0,
        paddingRight: container.paddingRight ? container.paddingRight : 0,
        marginLeft: container.marginLeft ? container.marginLeft : 0,
        marginRight: container.marginRight ? container.marginRight : 0,
        marginTop: container.marginTop ? container.marginTop : 0,
        marginBottom: container.marginBottom ? container.marginBottom : 0,
    };
    res.contentX = res.x + res.paddingLeft;
    res.contentY = res.y + res.paddingTop;
    return res;
}
function _updateElementLayout(line) {
    line.children.forEach(function (el) {
        var _a = util_1.formatPaddingMargin(el.css), paddingLeft = _a.paddingLeft, marginLeft = _a.marginLeft, paddingTop = _a.paddingTop, marginTop = _a.marginTop;
        var x = _getPreLayoutInLine(el, line).x + _getPreLayoutInLine(el, line).width;
        var y = line.y;
        var renderStyle = {
            x: x,
            y: y,
            contentX: x + paddingLeft + marginLeft,
            contentY: y + line.paddingTop + line.marginTop,
        };
        el.renderStyle = renderStyle;
    });
}
var insertVnodeIntoLine = function (vnode, changeLine) {
    if (changeLine || vnode.parent.lines.length === 0) {
        var newLine = _createLine(vnode);
        newLine.children.push(vnode);
        vnode.parent.lines.push(newLine);
        _updateLineLayout(newLine);
        return;
    }
    if (vnode.parent.lines.length > 0) {
        var currLine = vnode.parent.lines[vnode.parent.lines.length - 1];
        currLine.children.push(vnode);
        _updateLineLayout(currLine);
    }
};
exports.insertVnodeIntoLine = insertVnodeIntoLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQXdDO0FBQ3hDLCtCQUE2QztBQU03QyxTQUFTLFdBQVcsQ0FBQyxJQUFJO0lBQ3ZCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsSUFBQSxLQUFxRCwwQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQWhGLFdBQVcsaUJBQUEsRUFBRSxVQUFVLGdCQUFBLEVBQUUsVUFBVSxnQkFBQSxFQUFFLFNBQVMsZUFBa0MsQ0FBQztJQUd6RixJQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUN0QyxJQUFNLENBQUMsR0FBRyxxQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxxQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUUzRCxJQUFNLFdBQVcsR0FBRztRQUNsQixDQUFDLEdBQUE7UUFDRCxDQUFDLEdBQUE7UUFDRCxRQUFRLEVBQUUsQ0FBQyxHQUFHLFdBQVcsR0FBRyxVQUFVO1FBQ3RDLFFBQVEsRUFBRSxDQUFDLEdBQUcsVUFBVSxHQUFHLFNBQVM7S0FDckMsQ0FBQztJQUNGLElBQU0sSUFBSSxHQUFHO1FBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSztRQUMxQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU07UUFHckMsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRSxhQUFhLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMs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S0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25FLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlCLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQzdCO0FBQ0gsQ0FBQyxDQUFDO0FBZFcsUUFBQSxtQkFBbUIsdUJBYzlCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbmltcG9ydCB7IGdldFByZUxheW91dCB9IGZyb20gJy4vbGF5b3V0JztcbmltcG9ydCB7IGZvcm1hdFBhZGRpbmdNYXJnaW4gfSBmcm9tICcuL3V0aWwnO1xuXG4vKipcbiAqIOWIm+W7uuihjOWvueixoVxuICogQHBhcmFtIHtvYmplY3R9IG5vZGUg6KKr5o+S5YWl6KGM5Lit55qE5p+Q5Liq6IqC54K5XG4gKi9cbmZ1bmN0aW9uIF9jcmVhdGVMaW5lKG5vZGUpIHtcbiAgY29uc3QgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XG4gIGNvbnN0IHsgcGFkZGluZ0xlZnQsIG1hcmdpbkxlZnQsIHBhZGRpbmdUb3AsIG1hcmdpblRvcCB9ID0gZm9ybWF0UGFkZGluZ01hcmdpbihub2RlLmNzcyk7XG5cbiAgLy8g5o2i6KGM5pe2LCB5OuWPoOWKoHByZeWFhOW8n+iKgueCueWdkOaghywgeDrlj6DliqDniLboioLngrnlnZDmoIdcbiAgY29uc3QgeCA9IHBhcmVudC5yZW5kZXJTdHlsZS5jb250ZW50WDtcbiAgY29uc3QgeSA9IGdldFByZUxheW91dChub2RlKS55ICsgZ2V0UHJlTGF5b3V0KG5vZGUpLmhlaWdodDtcbiAgLy8gZGVidWdnZXJcbiAgY29uc3QgcmVuZGVyU3R5bGUgPSB7XG4gICAgeCxcbiAgICB5LFxuICAgIGNvbnRlbnRYOiB4ICsgcGFkZGluZ0xlZnQgKyBtYXJnaW5MZWZ0LFxuICAgIGNvbnRlbnRZOiB5ICsgcGFkZGluZ1RvcCArIG1hcmdpblRvcCxcbiAgfTtcbiAgY29uc3QgbGluZSA9IHtcbiAgICB3aWR0aDogbm9kZS5wYXJlbnQucHJvY2Vzc2VkTG9jYXRpb24ud2lkdGgsIC8vIOihjOWuveeUseihjOWGheWFg+e0oOWuveW6puaAu+WSjOWGs+WumlxuICAgIGhlaWdodDogbm9kZS5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQsIC8vIOihjOmrmOeUseihjOWGheacgOmrmOWFg+e0oOWGs+WumlxuICAgIC8vIHg6IG5vZGUucmVuZGVyU3R5bGUueCxcbiAgICAvLyB5OiBub2RlLnJlbmRlclN0eWxlLnksXG4gICAgcGFkZGluZ1RvcDogbm9kZS5jc3MucGFkZGluZ1RvcCA/IG5vZGUuY3NzLnBhZGRpbmdUb3AudG9QeCgpIDogMCxcbiAgICBwYWRkaW5nQm90dG9tOiBub2RlLmNzcy5wYWRkaW5nQm90dG9tID8gbm9kZS5jc3MucGFkZGluZ0JvdHRvbS50b1B4KCkgOiAwLFxuICAgIHBhZGRpbmdMZWZ0OiBub2RlLmNzcy5wYWRkaW5nTGVmdCA/IG5vZGUuY3NzLnBhZGRpbmdMZWZ0LnRvUHgoKSA6IDAsXG4gICAgcGFkZGluZ1JpZ2h0OiBub2RlLmNzcy5wYWRkaW5nUmlnaHQgPyBub2RlLmNzcy5wYWRkaW5nUmlnaHQudG9QeCgpIDogMCxcbiAgICBtYXJnaW5MZWZ0OiBub2RlLmNzcy5tYXJnaW5MZWZ0ID8gbm9kZS5jc3MubWFyZ2luTGVmdC50b1B4KCkgOiAwLFxuICAgIG1hcmdpblJpZ2h0OiBub2RlLmNzcy5tYXJnaW5SaWdodCA/IG5vZGUuY3NzLm1hcmdpblJpZ2h0LnRvUHgoKSA6IDAsXG4gICAgbWFyZ2luVG9wOiBub2RlLmNzcy5tYXJnaW5Ub3AgPyBub2RlLmNzcy5tYXJnaW5Ub3AudG9QeCgpIDogMCxcbiAgICBtYXJnaW5Cb3R0b206IG5vZGUuY3NzLm1hcmdpbkJvdHRvbSA/IG5vZGUuY3NzLm1hcmdpbkJvdHRvbS50b1B4KCkgOiAwLFxuICAgIGNoaWxkcmVuOiBbXSwgLy8g6KGM5YaF6IqC54K5XG4gIH07XG4gIHJldHVybiBPYmplY3QuYXNzaWduKGxpbmUsIHJlbmRlclN0eWxlKTtcbn1cblxuLyoqXG4gKiDmm7TmlrDooYznmoTlrr3pq5hcbiAqIEBwYXJhbSB7b2JqZWN0fSBsaW5lXG4gKi9cbmZ1bmN0aW9uIF91cGRhdGVMaW5lTGF5b3V0KGxpbmUpIHtcbiAgLy8g5a695bqmXG4gIGNvbnN0IHdpZHRoU3VtID0gbGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZSwgbmV4dCkgPT4ge1xuICAgIC8vIGNvbnN0IHsgcGFkZGluZ0xlZnQsIHBhZGRpbmdSaWdodCwgcGFkZGluZ1RvcCwgcGFkZGluZ0JvdHRvbSwgbWFyZ2luVG9wLCBtYXJnaW5Cb3R0b20sIG1hcmdpbkxlZnQsIG1hcmdpblJpZ2h0IH0gPSBuZXh0LmNzc1xuICAgIGNvbnN0IHsgeCwgeSwgd2lkdGg6IHByZVcgfSA9IF9nZXRQcmVMYXlvdXRJbkxpbmUobmV4dCwgbGluZSk7XG4gICAgY29uc3QgY2hpbGRQYWRkaW5nTGVmdCA9IG5leHQuY3NzLnBhZGRpbmdMZWZ0ID8gbmV4dC5jc3MucGFkZGluZ0xlZnQudG9QeCgpIDogMDtcbiAgICBjb25zdCBjaGlsZE1hcmdpbkxlZnQgPSBuZXh0LmNzcy5tYXJnaW5MZWZ0ID8gbmV4dC5jc3MubWFyZ2luTGVmdC50b1B4KCkgOiAwO1xuICAgIGNvbnN0IGN1cnJXID0gbmV4dC5wcm9jZXNzZWRMb2NhdGlvbi53aWR0aDtcbiAgICBjb25zdCBuZXh0U3RhcnRYID0geCArIHByZVcgKyBjaGlsZFBhZGRpbmdMZWZ0ICsgY2hpbGRNYXJnaW5MZWZ0ICsgY3Vyclc7XG4gICAgcmV0dXJuIG5leHRTdGFydFggKyBwcmU7XG4gIH0sIDApO1xuICBsaW5lLndpZHRoID0gTWF0aC5tYXgod2lkdGhTdW0sIGxpbmUud2lkdGgpO1xuXG4gIC8vIOmrmOW6pixwYWRkaW5nLG1hcmdpblxuICBjb25zdCB1cGRhdGVkTGF5b3V0ID0gbGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZSwgbmV4dCkgPT4ge1xuICAgIGNvbnN0IGNoaWxkUGFkZGluZ1RvcCA9IG5leHQuY3NzLnBhZGRpbmdUb3AgPyBuZXh0LmNzcy5wYWRkaW5nVG9wLnRvUHgoKSA6IDA7XG4gICAgY29uc3QgY2hpbGRQYWRkaW5nQm90dG9tID0gbmV4dC5jc3MucGFkZGluZ0JvY2hpbGRQYWRkaW5nQm90dG9tID8gbmV4dC5jc3MucGFkZGluZ0JvY2hpbGRQYWRkaW5nQm90dG9tLnRvUHgoKSA6IDA7XG4gICAgY29uc3QgY2hpbGRNYXJnaW5Ub3AgPSBuZXh0LmNzcy5tYXJnaW5Ub3AgPyBuZXh0LmNzcy5tYXJnaW5Ub3AudG9QeCgpIDogMDtcbiAgICBjb25zdCBjaGlsZE1hcmdpbkJvdHRvbSA9IG5leHQuY3NzLm1hcmdpbkJvdHRvbSA/IG5leHQuY3NzLm1hcmdpbkJvdHRvbS50b1B4KCkgOiAwO1xuICAgIGNvbnN0IGN1cnJIID0gbmV4dC5wcm9jZXNzZWRMb2NhdGlvbi5oZWlnaHQ7XG4gICAgLy8gY29uc3QgbmV4dFN0YXJ0WSA9IGNoaWxkUGFkZGluZ1RvcCArIGNoaWxkTWFyZ2luVG9wICsgY3VyckhcbiAgICByZXR1cm4ge1xuICAgICAgaDogTWF0aC5tYXgoY3VyckgsIHByZS5oKSxcbiAgICAgIHB0OiBNYXRoLm1heChjaGlsZFBhZGRpbmdUb3AsIHByZS5wdCksXG4gICAgICBwYjogTWF0aC5tYXgoY2hpbGRQYWRkaW5nQm90dG9tLCBwcmUucGIpLFxuICAgICAgbXQ6IE1hdGgubWF4KGNoaWxkTWFyZ2luVG9wLCBwcmUubXQpLFxuICAgICAgbWI6IE1hdGgubWF4KGNoaWxkTWFyZ2luQm90dG9tLCBwcmUubWIpLFxuICAgIH07XG4gIH0sIHsgaDogMCwgcHQ6IDAsIHBiOiAwLCBtdDogMCwgbWI6IDAgfSk7XG4gIGNvbnN0IHsgaCwgcHQsIHBiLCBtdCwgbWIgfSA9IHVwZGF0ZWRMYXlvdXQ7XG4gIGxpbmUucGFkZGluZ1RvcCA9IHB0O1xuICBsaW5lLnBhZGRpbmdCb3R0b20gPSBwYjtcbiAgbGluZS5tYXJnaW5Ub3AgPSBtdDtcbiAgbGluZS5tYXJnaW5Cb3R0b20gPSBtYjtcbiAgbGluZS5oZWlnaHQgPSBoO1xuICAvLyBkZWJ1Z2dlclxuICAvLyDmm7TmlrDlrozooYzlsZ7mgKfvvIzmm7TmlrDooYzlhoXlhYPntKDluIPlsYBcbiAgX3VwZGF0ZUVsZW1lbnRMYXlvdXQobGluZSk7XG59XG5cbmZ1bmN0aW9uIF9nZXRQcmVMYXlvdXRJbkxpbmUodGFyZ2V0Tm9kZSwgbGluZSkge1xuICBjb25zdCBpZHggPSBsaW5lLmNoaWxkcmVuLmZpbmRJbmRleCgoeCkgPT4geyByZXR1cm4geCA9PT0gdGFyZ2V0Tm9kZTsgfSk7XG4gIGNvbnN0IHByZUVsZUluTGluZSA9IGxpbmUuY2hpbGRyZW5baWR4IC0gMV07XG4gIGlmIChpZHggPCAwKSB7XG4gICAgY29uc29sZS5lcnJvcign5om+5LiN5Yiw6KGM5YaF5YWD57SgJyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgfTtcbiAgfVxuICBpZiAoaWR4ID4gMCkge1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogcHJlRWxlSW5MaW5lLnByb2Nlc3NlZExvY2F0aW9uLndpZHRoLFxuICAgICAgaGVpZ2h0OiBwcmVFbGVJbkxpbmUucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0LFxuICAgICAgeDogcHJlRWxlSW5MaW5lLnJlbmRlclN0eWxlLmNvbnRlbnRYLFxuICAgICAgeTogcHJlRWxlSW5MaW5lLnJlbmRlclN0eWxlLmNvbnRlbnRZLFxuICAgIH07XG4gICAgLy8g5aaC5p6c5rKh5pyJ5YmN5LiA5Liq5oiW6ICF5YmN6Z2i55qE6YO95LiN5Zyo5paH5qGj5rWB5Lit77yM6I635Y+W5omA5Zyo6KGM55qEXG4gIH1cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogMCxcbiAgICBoZWlnaHQ6IDAsXG4gICAgeDogbGluZSAmJiBfZ2V0Q29udGFpbmVyTGluZUxheW91dChsaW5lKS5jb250ZW50WCxcbiAgICB5OiBsaW5lICYmIF9nZXRDb250YWluZXJMaW5lTGF5b3V0KGxpbmUpLmNvbnRlbnRZLFxuICB9O1xufVxuXG5mdW5jdGlvbiBfZ2V0Q29udGFpbmVyTGluZUxheW91dChjb250YWluZXIpIHtcbiAgLy8gZGVidWdnZXJcbiAgaWYgKCFjb250YWluZXIpIHtcbiAgICAvLyByb290XG4gICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgIGRlYnVnZ2VyO1xuICAgIH1cbiAgICBjb250YWluZXIgPSB7XG4gICAgICByZW5kZXJTdHlsZXM6IHtcbiAgICAgICAgd2lkdGg6IGNvbnRhaW5lci5wcm9jZXNzZWRMb2NhdGlvbi53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb250YWluZXIucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0LFxuICAgICAgICBwYWRkaW5nVG9wOiAwLFxuICAgICAgICBwYWRkaW5nQm90dG9tOiAwLFxuICAgICAgICBwYWRkaW5nTGVmdDogMCxcbiAgICAgICAgcGFkZGluZ1JpZ2h0OiAwLFxuICAgICAgICBtYXJnaW5MZWZ0OiAwLFxuICAgICAgICBtYXJnaW5SaWdodDogMCxcbiAgICAgICAgbWFyZ2luVG9wOiAwLFxuICAgICAgICBtYXJnaW5Cb3R0b206IDAsXG4gICAgICAgIC8vIGNvbnRlbnRXaWR0aDogY29udGFpbmVyLnByb2Nlc3NlZExvY2F0aW9uLndpZHRoLFxuICAgICAgICAvLyBjb250ZW50SGVpZ2h0OiBjb250YWluZXIucHJvY2Vzc2VkTG9jYXRpb24uaGVpZ2h0XG4gICAgICB9LFxuICAgICAgeDogMCxcbiAgICAgIHk6IDAsXG4gICAgICBjb250ZW50WDogMCxcbiAgICAgIGNvbnRlbnRZOiAwLFxuICAgIH07XG4gIH1cbiAgY29uc3QgcmVzID0ge1xuICAgIHdpZHRoOiBjb250YWluZXIud2lkdGgsXG4gICAgaGVpZ2h0OiBjb250YWluZXIuaGVpZ2h0LFxuICAgIHg6IGNvbnRhaW5lci54LFxuICAgIHk6IGNvbnRhaW5lci55LFxuICAgIHBhZGRpbmdUb3A6IGNvbnRhaW5lci5wYWRkaW5nVG9wID8gY29udGFpbmVyLnBhZGRpbmdUb3AgOiAwLFxuICAgIHBhZGRpbmdCb3R0b206IGNvbnRhaW5lci5wYWRkaW5nQm90dG9tID8gY29udGFpbmVyLnBhZGRpbmdCb3R0b20gOiAwLFxuICAgIHBhZGRpbmdMZWZ0OiBjb250YWluZXIucGFkZGluZ0xlZnQgPyBjb250YWluZXIucGFkZGluZ0xlZnQgOiAwLFxuICAgIHBhZGRpbmdSaWdodDogY29udGFpbmVyLnBhZGRpbmdSaWdodCA/IGNvbnRhaW5lci5wYWRkaW5nUmlnaHQgOiAwLFxuICAgIG1hcmdpbkxlZnQ6IGNvbnRhaW5lci5tYXJnaW5MZWZ0ID8gY29udGFpbmVyLm1hcmdpbkxlZnQgOiAwLFxuICAgIG1hcmdpblJpZ2h0OiBjb250YWluZXIubWFyZ2luUmlnaHQgPyBjb250YWluZXIubWFyZ2luUmlnaHQgOiAwLFxuICAgIG1hcmdpblRvcDogY29udGFpbmVyLm1hcmdpblRvcCA/IGNvbnRhaW5lci5tYXJnaW5Ub3AgOiAwLFxuICAgIG1hcmdpbkJvdHRvbTogY29udGFpbmVyLm1hcmdpbkJvdHRvbSA/IGNvbnRhaW5lci5tYXJnaW5Cb3R0b20gOiAwLFxuICB9O1xuICByZXMuY29udGVudFggPSByZXMueCArIHJlcy5wYWRkaW5nTGVmdDtcbiAgcmVzLmNvbnRlbnRZID0gcmVzLnkgKyByZXMucGFkZGluZ1RvcDtcbiAgcmV0dXJuIHJlcztcbn1cblxuLyoqXG4gKiDmm7TmlrDooYzkuK3lhYPntKDkvY3nva5cbiAqIEBwYXJhbSB7b2JqZWN0fSBsaW5lXG4gKi9cbmZ1bmN0aW9uIF91cGRhdGVFbGVtZW50TGF5b3V0KGxpbmUpIHtcbiAgbGluZS5jaGlsZHJlbi5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGNvbnN0IHsgcGFkZGluZ0xlZnQsIG1hcmdpbkxlZnQsIHBhZGRpbmdUb3AsIG1hcmdpblRvcCB9ID0gZm9ybWF0UGFkZGluZ01hcmdpbihlbC5jc3MpO1xuICAgIGNvbnN0IHggPSBfZ2V0UHJlTGF5b3V0SW5MaW5lKGVsLCBsaW5lKS54ICsgX2dldFByZUxheW91dEluTGluZShlbCwgbGluZSkud2lkdGg7XG4gICAgY29uc3QgeSA9IGxpbmUueTtcbiAgICBjb25zdCByZW5kZXJTdHlsZSA9IHtcbiAgICAgIHgsXG4gICAgICB5LFxuICAgICAgY29udGVudFg6IHggKyBwYWRkaW5nTGVmdCArIG1hcmdpbkxlZnQsXG4gICAgICBjb250ZW50WTogeSArIGxpbmUucGFkZGluZ1RvcCArIGxpbmUubWFyZ2luVG9wLFxuICAgIH07XG4gICAgLy8gZWwubGluZVJlbmRlciA9IHJlbmRlclN0eWxlXG4gICAgZWwucmVuZGVyU3R5bGUgPSByZW5kZXJTdHlsZTtcbiAgfSk7XG59XG5cbi8qKlxuICog5oqK6IqC54K55o+S5YWl6KGMXG4gKiBAcGFyYW0ge29iamVjdH0gdm5vZGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gY2hhbmdlTGluZSDor6XlhYPntKDmmK/lkKbmjaLooYxcbiAqL1xuZXhwb3J0IGNvbnN0IGluc2VydFZub2RlSW50b0xpbmUgPSAodm5vZGUsIGNoYW5nZUxpbmUpID0+IHtcbiAgaWYgKGNoYW5nZUxpbmUgfHwgdm5vZGUucGFyZW50LmxpbmVzLmxlbmd0aCA9PT0gMCkge1xuICAgIGNvbnN0IG5ld0xpbmUgPSBfY3JlYXRlTGluZSh2bm9kZSk7XG4gICAgLy8gZGVidWdnZXJcbiAgICBuZXdMaW5lLmNoaWxkcmVuLnB1c2godm5vZGUpO1xuICAgIHZub2RlLnBhcmVudC5saW5lcy5wdXNoKG5ld0xpbmUpO1xuICAgIF91cGRhdGVMaW5lTGF5b3V0KG5ld0xpbmUpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodm5vZGUucGFyZW50LmxpbmVzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBjdXJyTGluZSA9IHZub2RlLnBhcmVudC5saW5lc1t2bm9kZS5wYXJlbnQubGluZXMubGVuZ3RoIC0gMV07XG4gICAgY3VyckxpbmUuY2hpbGRyZW4ucHVzaCh2bm9kZSk7XG4gICAgX3VwZGF0ZUxpbmVMYXlvdXQoY3VyckxpbmUpO1xuICB9XG59O1xuIl19