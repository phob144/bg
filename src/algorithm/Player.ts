import { Item } from './enums/Item';
import { Face } from './enums/Face';
import { Vector } from './utils/Vector';

export class Player {
    public position: Vector;
    public face: Face;
    public value: number;
    public items: Map<Item, number>;

    constructor(position: Vector, face: Face) {
        this.position = position;
        this.face = face;

        this.value = face == Face.z ? 0 : -1;
        this.items = new Map<Item, number>();
    }

    public addItem(item: Item) {
        this.items.set(item, this.value % 4);
    }

    public moveLeft(): Player {
        let clone = new Player(this.position.add(new Vector(-1, 0)), this.face);

        clone.value = this.value;
        clone.items = this.items;
        clone.moveHorizontally();

        return clone;
    }

    public moveRight(): Player {
        let clone = new Player(this.position.add(new Vector(1, 0)), this.face);

        clone.value = this.value;
        clone.items = this.items;
        clone.moveHorizontally();

        return clone;
    }

    public moveUp(): Player {
        let clone = new Player(this.position.add(new Vector(0, -1)), this.face);

        clone.value = this.value;
        clone.items = this.items;
        clone.moveVertically();

        return clone;
    }

    public moveDown(): Player {
        let clone = new Player(this.position.add(new Vector(0, 1)), this.face);

        clone.value = this.value;
        clone.items = this.items;
        clone.moveVertically();

        return clone;
    }

    private moveVertically() {
        switch (this.face) {
            case Face.y: {
                this.face = Face.z;
                this.value++;
                break;
            }

            case Face.z: {
                this.face = Face.y;
                this.value++;
                break;
            }
        }
    }

    private moveHorizontally() {
        switch (this.face) {
            case Face.x: {
                this.face = Face.z;
                this.value++;
                break;
            }

            case Face.z: {
                this.face = Face.x;
                this.value++;
                break;
            }
        }
    }
}
