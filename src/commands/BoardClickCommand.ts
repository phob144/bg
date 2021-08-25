import {
    EventDispatcher,
    IEventDispatcher,
    inject,
    injectable,
} from '@robotlegsjs/core';
import { State } from '../enums/State';
import { BoardClickEvent } from '../events/BoardClickEvent';
import { SelectedEvent } from '../events/SelectedEvent';
import { BoardModel } from '../models/BoardModel';
import { SelectionModel } from '../models/SelectionModel';

@injectable()
export class BoardClickCommand {
    @inject(IEventDispatcher) private _dispatcher: EventDispatcher;
    @inject(BoardModel) private _boardModel: BoardModel;
    @inject(SelectionModel) private _selectionModel: SelectionModel;
    @inject(BoardClickEvent) private _event: BoardClickEvent;

    public execute() {
        console.log(this._selectionModel.selectedState);

        this._boardModel.setTile(
            this._event.x,
            this._event.y,
            this._selectionModel.selectedState
        );
    }
}
