import { TreeNode } from './TreeNode';

export class TreeUtil {
    public static getDeepestNodes<T>(tree: TreeNode<T>): Array<TreeNode<T>> {
        let result = new Array<TreeNode<T>>();

        if (tree.children.length == 0) {
            result.push(tree);
            return result;
        }

        for (let i = 0; i < tree.children.length; i++) {
            result.concat(TreeUtil.getDeepestNodes(tree.children[i]));
        }

        return result;
    }

    public static traverseBackwards<T>(tree: TreeNode<T>): Array<T> {
        let result = new Array<T>();

        if (tree.parent != null) {
            result.concat(TreeUtil.traverseBackwards(tree.parent));
        }

        result.push(tree.value);

        return result;
    }

    public static toArray<T>(tree: TreeNode<T>): Array<Array<T>> {
        if (tree == null) {
            return null;
        }

        let result = new Array<Array<T>>();
        let deepestNodes = new Array<TreeNode<T>>();

        for (let i = 0; i < deepestNodes.length; i++) {
            result.push(TreeUtil.traverseBackwards(deepestNodes[i]));
        }

        return result;
    }
}
