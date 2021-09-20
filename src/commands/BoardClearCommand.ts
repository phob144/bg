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
export class BoardClearCommand {
    @inject(IEventDispatcher) private _dispatcher: EventDispatcher;
    @inject(BoardModel) private _boardModel: BoardModel;

    public execute() {
        this._boardModel.clear();
    }
}
