import {
    EventDispatcher,
    IEventDispatcher,
    inject,
    injectable,
} from '@robotlegsjs/core';
import { State } from '../enums/State';
import { SelectedEvent } from '../events/SelectedEvent';
import { BoardModel } from '../models/BoardModel';
import { SelectionModel } from '../models/SelectionModel';

@injectable()
export class SelectedCommand {
    @inject(IEventDispatcher) private _dispatcher: IEventDispatcher;
    @inject(SelectedEvent) private _event: SelectedEvent;
    @inject(SelectionModel) private _model: SelectionModel;

    public execute() {
        if (this._model.selectedState == this._event.selectedState) {
            this._model.selectedState = State.empty;
        } else {
            this._model.selectedState = this._event.selectedState;
        }
    }
}
