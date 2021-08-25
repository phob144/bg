import {
    EventDispatcher,
    IEventDispatcher,
    inject,
    injectable,
} from '@robotlegsjs/core';
import { unique } from '../utils/unique';
import { State } from '../enums/State';

@injectable()
export class BoardModel extends EventDispatcher {
    @unique
    public static readonly CHANGE: string;

    @inject(IEventDispatcher)
    private _eventDispatcher: IEventDispatcher;

    private _boardState: State[][];

    constructor() {
        super();

        this.clear();
    }

    public clear() {
        this._boardState = [];

        for (let i = 0; i < 5; i++) {
            let row = [];

            for (let j = 0; j < 5; j++) {
                row.push(State.empty);
            }

            this._boardState.push(row);
        }

        // this.dispatchChanged();
    }

    public setTile(x: number, y: number, state: State) {
        this._boardState[x][y] = state;

        this.dispatchChanged();
    }

    public resetTile(x: number, y: number) {
        this._boardState[x][y] = State.empty;

        this.dispatchChanged();
    }

    private dispatchChanged() {
        this._eventDispatcher.dispatchEvent(new Event(BoardModel.CHANGE));
    }

    public get boardState(): State[][] {
        return this._boardState;
    }
}
