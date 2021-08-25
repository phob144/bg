import {
    EventDispatcher,
    IEventDispatcher,
    inject,
    injectable,
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

        this._selectedState = State.empty;
    }

    public get selectedState(): State {
        return this._selectedState;
    }

    public set selectedState(state: State) {
        this._selectedState = state;

        // this.dispatchChanged();
    }

    private dispatchChanged() {
        this._eventDispatcher.dispatchEvent(new Event(SelectionModel.CHANGE));
    }
}
