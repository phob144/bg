import { EventDispatcher, IEventDispatcher, inject, injectable } from '@robotlegsjs/core';
import { State } from '../enums/State';
import { BoardClickEvent } from '../events/BoardClickEvent';
import { SelectedEvent } from '../events/SelectedEvent';
import { BoardModel } from '../models/BoardModel';
import { SelectionModel } from '../models/SelectionModel';
import { ArrayUtil as ArrayUtil } from '../utils/ArrayUtil';

@injectable()
export class BoardClickCommand {
    @inject(IEventDispatcher) private _dispatcher: EventDispatcher;
    @inject(BoardModel) private _boardModel: BoardModel;
    @inject(SelectionModel) private _selectionModel: SelectionModel;
    @inject(BoardClickEvent) private _event: BoardClickEvent;

    public execute() {
        console.log(this._selectionModel.selectedState);

        const unique = [State.door, State.key, State.sword];

        const playerUnique = [State.player_east, State.player_west, State.player_north, State.player_south];

        let state =
            this._boardModel.boardState[this._event.x][this._event.y] == this._selectionModel.selectedState
                ? State.empty
                : this._selectionModel.selectedState;

        if (unique.indexOf(state) != -1) {
            if (ArrayUtil.contains(this._boardModel.boardState, state)) {
                return;
            }
        }

        if (playerUnique.indexOf(state) != -1) {
            if (ArrayUtil.containsAny(this._boardModel.boardState, playerUnique)) {
                return;
            }
        }

        this._boardModel.setTile(this._event.x, this._event.y, state);
    }
}
