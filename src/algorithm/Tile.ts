import { Face } from './enums/Face';
import { Goal } from './enums/Goal';
import { Item } from './enums/Item';
import { Player } from './Player';

export class Tile {
    public blacklist: Face;
    public isGoal: Goal;
    public requiredItem: Item;
    public hasItem: Item;

    constructor(blacklist: Face, isGoal: Goal, requiredItem: Item, hasItem: Item) {
        this.blacklist = blacklist;
        this.isGoal = isGoal;
        this.requiredItem = requiredItem;
        this.hasItem = hasItem;
    }

    public canVisit(player: Player): boolean {
        // return true if flag is not blacklisted
        return (this.blacklist & player.face) != player.face;
    }
}
