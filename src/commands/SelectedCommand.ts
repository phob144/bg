import {
    EventDispatcher,
    IEventDispatcher,
    inject,
    injectable,
} from '@robotlegsjs/core';
import { BoardClickEvent } from '../events/BoardClickEvent';
import { SelectedEvent } from '../events/SelectedEvent';
import { BoardModel } from '../models/BoardModel';
import { SelectionModel } from '../models/SelectionModel';

@injectable()
export class BoardClickCommand {
    @inject(IEventDispatcher) private _dispatcher: EventDispatcher;
    @inject(SelectedEvent) private _event: SelectedEvent;

    public execute() {
        console.log(this._event);
    }
}
