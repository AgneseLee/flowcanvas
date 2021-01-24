/**
 * 深度优先遍历查找节点，起点为parentNode，终点为目标id
 * @param {Object} parentNode 
 * @param {number} id 
 */
export const  cusGetElementByIdByDFS2= function(parentNode, id) {
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

function computedCss (treeNodes){
    
}


export const createTree = (jsonTpl) =>{
    return jsonTpl
}