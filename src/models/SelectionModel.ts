import {
    EventDispatcher,
    IEventDispatcher,
    inject,
    injectable,
    Event,
} from '@robotlegsjs/core';
import { State } from '../enums/State';
import { unique } from '../utils/unique';

@injectable()
export class SelectionModel extends EventDispatcher {
    @unique
    public static readonly CHANGE: string;

    @inject(IEventDispatcher)
    private _eventDispatcher: IEventDispatcher;

    private _selectedState: State;

    constructor() {
        super();
    }

    public clear() {
        this._selectedState = State.empty;

        this.dispatchChanged();
    }

    public get selectedState(): State {
        return this._selectedState;
    }

    public set selectedState(state: State) {
        this._selectedState = state;

        this.dispatchChanged();
    }

    private dispatchChanged() {
        this._eventDispatcher.dispatchEvent(new Event(SelectionModel.CHANGE));
    }
}
