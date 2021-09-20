import { Goal } from './enums/Goal';
import { Item } from './enums/Item';
import { Move } from './enums/Move';
import { Player } from './Player';
import { Tile } from './Tile';
import { TreeNode } from './utils/TreeNode';
import { Vector } from './utils/Vector';

export class Board {
    private _board: Tile[][];

    constructor(board: Tile[][]) {
        this._board = board;
    }

    private getGoals(board: Tile[][]) {
        let result = new Array<{ goal: Vector; toDelete: Vector }>();

        let width = board.length;
        let height = board[0].length;

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let tile = board[i][j];

                if (tile.isGoal == Goal.direct) {
                    result.push({ goal: new Vector(i, j), toDelete: new Vector(i, j) });
                } else if (tile.isGoal == Goal.surround) {
                    if (i - 1 >= 0) {
                        result.push({ goal: new Vector(i, j), toDelete: new Vector(i - 1, j) });
                    }

                    if (i + 1 >= width) {
                        result.push({ goal: new Vector(i, j), toDelete: new Vector(i + 1, j) });
                    }

                    if (j - 1 >= 0) {
                        result.push({ goal: new Vector(i, j), toDelete: new Vector(i, j - 1) });
                    }

                    if (j + 1 >= height) {
                        result.push({ goal: new Vector(i, j), toDelete: new Vector(i, j + 1) });
                    }
                }
            }
        }

        return result;
    }

    private getSegmentSolutions(
        player: Player,
        goal: Vector,
        board: Tile[][],
        move: Move,
        requiredItem: Item,
        parent: TreeNode<Move>
    ): TreeNode<Move> {
        let tree = new TreeNode<Move>(move, parent);
        let tile = board[goal.x][goal.y];

        if (player.position == goal && player.value % 2 == 0) {
            if (requiredItem == Item.none) {
                return tree;
            } else if ((player.value - player.items[requiredItem]) % 4 == 0) {
                return tree;
            }
        }

        tile.blacklist |= player.face;

        let left = player.moveLeft();
        let right = player.moveRight();
        let up = player.moveUp();
        let down = player.moveDown();

        let leftTile = board[goal.x - 1][goal.y];
        let rightTile = board[goal.x + 1][goal.y];
        let upTile = board[goal.x][goal.y - 1];
        let downTile = board[goal.x][goal.y + 1];

        if (leftTile.canVisit(left)) {
            let solutions = this.getSegmentSolutions(left, goal, board, Move.left, requiredItem, tree);

            if (solutions != null) {
                tree.children.push(solutions);
            }
        }

        if (rightTile.canVisit(right)) {
            let solutions = this.getSegmentSolutions(right, goal, board, Move.right, requiredItem, tree);

            if (solutions != null) {
                tree.children.push(solutions);
            }
        }

        if (upTile.canVisit(up)) {
            let solutions = this.getSegmentSolutions(up, goal, board, Move.up, requiredItem, tree);

            if (solutions != null) {
                tree.children.push(solutions);
            }
        }

        if (downTile.canVisit(down)) {
            let solutions = this.getSegmentSolutions(down, goal, board, Move.down, requiredItem, tree);

            if (solutions != null) {
                tree.children.push(solutions);
            }
        }

        // dead end
        if (tree.children.length == 0) {
            return null;
        }

        return tree;
    }
}
