"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTree = exports.cusGetElementByIdByDFS2 = void 0;
var cusGetElementByIdByDFS2 = function (parentNode, id) {
    if (!parentNode) {
        return null;
    }
    var stack = [];
    if (parentNode.vid === id) {
        return parentNode;
    }
    for (var i = parentNode.children.length; i > 0; i--) {
        stack.push(parentNode.children[i - 1]);
    }
    while (stack.length) {
        var node = stack.pop();
        if (node.vid === id) {
            return node;
        }
        if (node.children && node.children.length > 0) {
            stack = Array.from(node.children).concat(stack);
        }
    }
};
exports.cusGetElementByIdByDFS2 = cusGetElementByIdByDFS2;
function computedCss(treeNodes) {
}
var createTree = function (jsonTpl) {
    return jsonTpl;
};
exports.createTree = createTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBTU8sSUFBTSx1QkFBdUIsR0FBRyxVQUFVLFVBQVUsRUFBRSxFQUFFO0lBQzdELElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDZixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsSUFBSSxVQUFVLENBQUMsR0FBRyxLQUFLLEVBQUUsRUFBRTtRQUN6QixPQUFPLFVBQVUsQ0FBQztLQUNuQjtJQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuRCxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEM7SUFDRCxPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDbkIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0MsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqRDtLQUNGO0FBQ0gsQ0FBQyxDQUFDO0FBckJXLFFBQUEsdUJBQXVCLDJCQXFCbEM7QUFFRixTQUFTLFdBQVcsQ0FBQyxTQUFTO0FBRTlCLENBQUM7QUFFTSxJQUFNLFVBQVUsR0FBRyxVQUFDLE9BQU87SUFDaEMsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBRlcsUUFBQSxVQUFVLGNBRXJCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qKlxuICog5rex5bqm5LyY5YWI6YGN5Y6G5p+l5om+6IqC54K577yM6LW354K55Li6cGFyZW50Tm9kZe+8jOe7iOeCueS4uuebruagh2lkXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyZW50Tm9kZVxuICogQHBhcmFtIHtudW1iZXJ9IGlkXG4gKi9cbmV4cG9ydCBjb25zdCBjdXNHZXRFbGVtZW50QnlJZEJ5REZTMiA9IGZ1bmN0aW9uIChwYXJlbnROb2RlLCBpZCkge1xuICBpZiAoIXBhcmVudE5vZGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyDmt7HluqbkvJjlhYgsIOmdnumAkuW9kuWunueOsO+8jCDkvb/nlKjmoIhcbiAgbGV0IHN0YWNrID0gW107XG4gIGlmIChwYXJlbnROb2RlLnZpZCA9PT0gaWQpIHtcbiAgICByZXR1cm4gcGFyZW50Tm9kZTtcbiAgfVxuICBmb3IgKGxldCBpID0gcGFyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICBzdGFjay5wdXNoKHBhcmVudE5vZGUuY2hpbGRyZW5baSAtIDFdKTtcbiAgfVxuICB3aGlsZSAoc3RhY2subGVuZ3RoKSB7XG4gICAgY29uc3Qgbm9kZSA9IHN0YWNrLnBvcCgpO1xuICAgIGlmIChub2RlLnZpZCA9PT0gaWQpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBpZiAobm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIHN0YWNrID0gQXJyYXkuZnJvbShub2RlLmNoaWxkcmVuKS5jb25jYXQoc3RhY2spO1xuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gY29tcHV0ZWRDc3ModHJlZU5vZGVzKSB7XG5cbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyZWUgPSAoanNvblRwbCkgPT4ge1xuICByZXR1cm4ganNvblRwbDtcbn07XG4iXX0=