import { Container } from 'pixi.js';

export interface IPoolItem extends Container {
    reset: () => void;
}

export class SimpleItemPool<T extends IPoolItem> {
    private _items: Array<T> = [];
    private _poolItems: WeakSet<T> = new WeakSet();

    private readonly _instantiate: () => T = null;

    constructor(instantiate: () => T) {
        this._instantiate = instantiate;
    }

    public destroy(args?) {
        this._items.forEach((value) => {
            value.destroy(args);
        });
        this._items.length = 0;
    }

    public add(value: number = 1): void {
        for (let i: number = 0; i < value; ++i) {
            const item = this.createItem();
            this._items.push(item);
            this._poolItems.add(item);
        }
    }

    public checkIn(item: T): void {
        if (this._poolItems.has(item)) {
            if (item.reset) {
                item.reset();
            }
            item.renderable = item.visible = false;
            this._items.push(item);
        }
    }

    public checkOut(): T {
        if (this._items.length === 0) {
            this.add();
        }
        const item = this._items.pop();
        item.renderable = item.visible = true;
        return item;
    }

    public get size(): number {
        return this._items.length;
    }

    private createItem(): T {
        const item: T = this._instantiate();
        if (item.reset) {
            item.reset();
        }
        return item;
    }
}
