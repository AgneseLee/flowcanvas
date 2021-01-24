// import _util from './util';
const setStringPrototype = require('./util').setStringPrototype;

export default class Modifier {
    constructor(tpl) {
        const copyTpl = JSON.parse(JSON.stringify(tpl));
        // debugger;
        this.tpl = copyTpl;
        this.views = copyTpl.views;
    }

    // target 插入的对象节点
    // parentId 被插入的父亲节点
    // index 父亲节点的第几个元素
    insert(target, parentId, index) {
        if (parentId && !Number.isNaN(index)) {
            // debugger;
            const flag = this.find(parentId);
            if (flag.length === 0) return;
            const node = { children: this.views };
            target.f_sid = parentId;
            return insertNode(parentId, index, node, target);
        }
    }

    find(targetId) {
        const xx = cusGetElementByIdByDFS2({ children: this.views }, targetId);
        return xx;
        // xx.name = 'pfpfp';
        // debugger;
        // return findPathDFS(this.views, targetId);
    }

    findParentNodeOf(node) {
        const targetId = node.f_sid;
        if (!targetId) return null;
        // const targetNode = this.find(targetId);
        // if (targetNode.length < 2) { return; }
        // const parentNode = targetNode.slice(-2)[0];
        // return parentNode;
        // const xx = cusGetElementByIdByDFS2({ children: this.views }, targetId);
        return this.find(targetId);
    }

    del(parentId, index) {
        if (parentId && !Number.isNaN(index)) {
            const flag = this.find(parentId);
            if (flag.length === 0) return;
            const node = { children: this.views };
            return delNode(parentId, index, node);
        }
    }

    // 修改某个节点的信息
    update(target, parentId, index) {
        if (parentId && !Number.isNaN(index)) {
            const flag = this.find(parentId);
            if (flag.length === 0) return;
            const node = { children: this.views };
            return updateNode(parentId, index, node, target);
        }
    }

    // 更新某节点的所有父节点、祖先节点信息(宽高、位置)
    // 兄弟节点默认更新top，不更新left
    updateTree(changeNodeId, updateLeft = false, updateTop = true) {
        const targetNode = this.find(changeNodeId);
        const parentNode = this.find(targetNode.f_sid);
        const targetHeight = targetNode.css.height.toPx();

        // 更新父节点和祖先节点的高度
        const _z = this;
        (function dfs(target) {
            if (!target) return false;
            const _parentNode = _z.findParentNodeOf(target);
            if (!_parentNode) {
                // 根节点高度更新
                if (_z.tpl.height === 'auto') {
                    // 只需计算一级子节点的中高度即可
                    let allH = _z.views.reduce((pre, next) => {
                        const nextHeight = next.css.height ? next.css.height : '0px';
                        const sum = pre.toPx() + nextHeight.toPx();
                        return `${sum}px`;
                    }, '0px');
                    if (_z.tpl.paddingbottom) {
                        allH = allH.toPx() + _z.tpl.paddingbottom.toPx();
                        allH = `${allH}px`;
                    }
                    _z.tpl.height = allH;
                } else {
                    _z.tpl.height += targetHeight;
                    _z.tpl.height = `${_z.tpl.height}px`;
                }
                return false;
            }

            // 如果父节点有自定义高度，则以自身设置为准
            if (_parentNode.css.height.indexOf('px') < 0) {
                const height = _parentNode.children.reduce((pre, next) => {
                    const nextHeight = next.css.height ? next.css.height : '0px';
                    const sum = pre.toPx() + nextHeight.toPx();
                    return `${sum}px`;
                }, '0px');
                _parentNode.css.height = height;
                _parentNode.processedLocation.height = height.toPx();
            }

            return dfs(_parentNode);
        }(targetNode));

        // 后面所有兄弟节点更新left/top
        const allSiblingNodes = parentNode.children;
        let startChangeBtn = false;
        for (const n of allSiblingNodes) {
            if (n.vid === changeNodeId) {
                startChangeBtn = true;
            }
            if (!startChangeBtn) continue; // 前面的兄弟节点不用变

            // n.css.left = (n.css.left).toPx();
            // n.css.top = (n.css.top).toPx();
            // n.css.left += targetNode.css ? targetNode.css.left : 0;
            // n.css.top += targetNode.css ? targetNode.css.top : 0;
            if (updateTop) {
                // debugger;
                const paddingbottom = targetNode.css.paddingbottom ? targetNode.css.paddingbottom.toPx() : 0;
                n.processedLocation.y += targetNode.processedLocation ? targetNode.processedLocation.height : 0;
                n.processedLocation.y += paddingbottom;
            }
            if (updateLeft) {
                n.processedLocation.x += (targetNode.processedLocation ? targetNode.processedLocation.width : 0);
            }
        }
        this.views = this.tpl.views;
        // debugger;
        return this.tpl;
    }

    getAbsoluteTpl({ globalWidth, globalHeight }) {
        const node = { children: this.views };
        return { ...this.tpl, ...{ views: getNodeAbsoluteLeftTop(node, globalWidth, globalHeight) } };
    }
}


// 保持嵌套结构插入
function insertNode(parentId, index, node, target) {
    if (node) {
        // nodeList.push(node)
        const children = node.children;
        if (children) {
            for (let i = 0; i < children.length; i++) {
                if (children[i].vid === parentId) {
                    if (!children[i].children) {
                        children[i].children = [];
                    }
                    children[i].children.splice(index, 0, target);
                    break;
                } else {
                    insertNode(parentId, index, children[i], target);
                }
            }
        }
    }
    // debugger;
    return node;
}

function delNode(parentId, index, node) {
    if (node) {
        const children = node.children;
        if (children) {
            for (let i = 0; i < children.length; i++) {
                if (children[i].vid === parentId) {
                    if (!children[i].children) {
                        children[i].children = [];
                    }
                    children[i].children.splice(index, 1);
                    break;
                } else {
                    delNode(parentId, index, children[i]);
                }
            }
        }
    }
    return node;
}


function updateNode(parentId, index, node, target) {
    if (node) {
        const children = node.children;
        if (children) {
            for (let i = 0; i < children.length; i++) {
                if (children[i].vid === parentId) {
                    if (!children[i].children) {
                        children[i].children = [];
                    }
                    children[i].children.splice(index, 1, target);
                    break;
                } else {
                    updateNode(parentId, index, children[i], target);
                }
            }
        }
    }
    return node;
}


// 获取相对(0,0)的、打平为一级节点的绝对坐标tpl列表,left/top做层级叠加
function getNodeAbsoluteLeftTop(node, globalWidth, globalHeight, nodeList = []) {
    setStringPrototype(1, 1);
    if (node) {
        nodeList.push(node);
        const children = node.children;
        if (children) {
            for (let i = 0; i < children.length; i++) {
                // const x = children[i].processedLocation.x;
                // const y = children[i].processedLocation.y;
                // console.log(x, y);
                children[i].processedLocation.x += (node.processedLocation ? node.processedLocation.x : 0);
                children[i].processedLocation.y += node.processedLocation ? node.processedLocation.y : 0;

                getNodeAbsoluteLeftTop(children[i], globalWidth, globalHeight, nodeList);
            }
        } else {
            // 叶子节点位置

        }
    }
    return nodeList.slice(1);
}

function cusGetElementByIdByDFS2(parentNode, id) {
    if (!parentNode) {
        return null;
    }
    // 深度优先, 非递归实现， 使用栈
    let stack = [];
    if (parentNode.vid === id) {
        return parentNode;
    }
    for (let i = parentNode.children.length; i > 0; i--) {
        stack.push(parentNode.children[i - 1]);
    }
    while (stack.length) {
        const node = stack.pop();
        if (node.vid === id) {
            return node;
        }
        if (node.children && node.children.length > 0) {
            stack = Array.from(node.children).concat(stack);
        }
    }
}
