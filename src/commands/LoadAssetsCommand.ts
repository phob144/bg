import * as PIXI from 'pixi.js';
import {
    EventDispatcher,
    IEventDispatcher,
    inject,
    injectable,
} from '@robotlegsjs/core';
import { State } from '../enums/State';
import { BoardModel } from '../models/BoardModel';
import { SelectionModel } from '../models/SelectionModel';
import { GameView } from '../views/GameView';
import { AppEvent } from '../events/AppEvent';

@injectable()
export class LoadAssetsCommand {
    @inject(IEventDispatcher) private _eventDispatcher: IEventDispatcher;

    public execute() {
        // load assets
        const loader = PIXI.loader;

        loader.add('assets/spritesheet.json');

        // on load assets
        loader.load(() => {
            console.log('load assets finished');
            this._eventDispatcher.dispatchEvent(new Event(GameView.ID));
        });
    }
}
