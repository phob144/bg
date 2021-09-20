export class TreeNode<T> {
    public value: T;
    public children: Array<TreeNode<T>>;
    public parent: TreeNode<T>;

    constructor(value: T, parent: TreeNode<T>) {
        this.value = value;
        this.parent = parent;

        this.children = new Array<TreeNode<T>>();
    }
}
