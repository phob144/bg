import {
    EventDispatcher,
    IEventDispatcher,
    inject,
    injectable,
} from '@robotlegsjs/core';
import { BoardClickEvent } from '../events/BoardClickEvent';
import { BoardModel } from '../models/BoardModel';
import { SelectionModel } from '../models/SelectionModel';

@injectable()
export class BoardClickCommand {
    @inject(IEventDispatcher) private _dispatcher: EventDispatcher;
    @inject(BoardModel) private _boardModel: BoardModel;
    @inject(SelectionModel) private _listModel: SelectionModel;
    @inject(BoardClickEvent) private _event: BoardClickEvent;

    public execute() {
        console.log(this._event);
    }
}
