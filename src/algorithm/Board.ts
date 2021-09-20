import { Face } from './enums/Face';
import { Goal } from './enums/Goal';
import { Item } from './enums/Item';
import { Move } from './enums/Move';
import { Player } from './Player';
import { Tile } from './Tile';
import { ArrayUtil } from './utils/ArrayUtil';
import { TreeNode } from './utils/TreeNode';
import { TreeUtil } from './utils/TreeUtil';
import { Vector } from './utils/Vector';

export class Board {
    private _board: Tile[][];

    constructor(board: Tile[][]) {
        this._board = board;
    }

    public getSolutions(board: Tile[][], player: Player): Array<Array<Move>> {
        let result = new Array<Array<Move>>();

        let goals = this.getGoals(board);

        let width = board.length;
        let height = board[0].length;

        for (let i = 0; i < goals.length; i++) {
            let goal = goals[i];
            let goalX = goal.position.x;
            let goalY = goal.position.y;

            let tile = board[goalX][goalY];

            let singleResult = TreeUtil.toArray(
                this.getSegmentSolutions(player, goals[i].position, board, Move.none, tile.requiredItem, null)
            );

            // null => nie ma rozwiązań dla tej kombinacji
            if (singleResult == null) {
                continue;
            }

            // .requiredItem == Item.key => drzwi, koniec rekursji (chyba lepiej zrobić Tile.state?)
            if (board[goal.toDelete.x][goal.toDelete.y].requiredItem == Item.key) {
                return singleResult;
            }

            let newBoard = ArrayUtil.clone(board);
            newBoard[goal.toDelete.x][goal.toDelete.y] = new Tile(Face.none, Goal.none, Item.none, Item.none);

            //////////////////////// tu się zaczyna akcja, normalnie getSegmentSolutions powinno zwracać status gracza, ale nie mam pojęcia jak to zrobić
            let newPlayer = player.move(goalX, goalY);

            newPlayer.face = Face.z;

            if (tile.hasItem != Item.none) {
                if (newPlayer.items.keys.length == 1) {
                    // ???
                    newPlayer.value = newPlayer.items.values[0] - 2;
                    newPlayer.addItem(tile.hasItem);
                } else {
                    newPlayer.value = 0;
                    newPlayer.addItem(tile.hasItem);
                }
            } else {
                newPlayer.value = 0;
            }

            result = ArrayUtil.combine(singleResult, this.getSolutions(newBoard, newPlayer));
        }
    }

    private getGoals(board: Tile[][]) {
        let result = new Array<{ position: Vector; toDelete: Vector }>();

        let width = board.length;
        let height = board[0].length;

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                let tile = board[i][j];

                if (tile.isGoal == Goal.direct) {
                    result.push({ position: new Vector(i, j), toDelete: new Vector(i, j) });
                } else if (tile.isGoal == Goal.surround) {
                    if (i - 1 >= 0) {
                        result.push({ position: new Vector(i, j), toDelete: new Vector(i - 1, j) });
                    }

                    if (i + 1 >= width) {
                        result.push({ position: new Vector(i, j), toDelete: new Vector(i + 1, j) });
                    }

                    if (j - 1 >= 0) {
                        result.push({ position: new Vector(i, j), toDelete: new Vector(i, j - 1) });
                    }

                    if (j + 1 >= height) {
                        result.push({ position: new Vector(i, j), toDelete: new Vector(i, j + 1) });
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
