import * as PIXI from 'pixi.js';
import { IEventDispatcher, inject, injectable, Event } from '@robotlegsjs/core';
import { GameView } from '../views/GameView';
import { BoardModel } from '../models/BoardModel';
import { SelectionModel } from '../models/SelectionModel';

@injectable()
export class LoadAssetsCommand {
    @inject(IEventDispatcher) private _eventDispatcher: IEventDispatcher;
    @inject(BoardModel) private _boardModel: BoardModel;
    @inject(SelectionModel) private _selectionModel: SelectionModel;

    public execute() {
        // load assets
        const loader = PIXI.loader;

        loader.add('assets/spritesheet.json');

        // on load assets
        loader.load(() => {
            console.log('load assets finished');

            this._boardModel.clear();
            this._selectionModel.clear();

            this._eventDispatcher.dispatchEvent(new Event(GameView.ID));
        });
    }
}
