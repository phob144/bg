import {
    Event,
    IConfig,
    IEventCommandMap,
    IEventDispatcher,
    IInjector,
    inject,
    injectable,
} from '@robotlegsjs/core';

import { IMediatorMap } from '@robotlegsjs/pixi';
import { IFlowManager } from '@robotlegsjs/pixi-palidor';
import { BoardClickCommand } from '../commands/BoardClickCommand';
import { LoadAssetsCommand } from '../commands/LoadAssetsCommand';
import { SelectedCommand } from '../commands/SelectedCommand';
import { AppEvent } from '../events/AppEvent';
import { BoardClickEvent } from '../events/BoardClickEvent';
import { SelectedEvent } from '../events/SelectedEvent';
import { BoardViewMediator } from '../mediators/BoardViewMediator';
import { GameViewMediator } from '../mediators/GameViewMediator';
import { ItemListViewMediator } from '../mediators/ItemListViewMediator';
import { BoardModel } from '../models/BoardModel';
import { SelectionModel } from '../models/SelectionModel';
import { BoardView } from '../views/BoardView';
import { GameView } from '../views/GameView';
import { ItemListView } from '../views/ItemListView';

@injectable()
export class Config implements IConfig {
    @inject(IFlowManager) private _flowManager: IFlowManager;
    @inject(IEventDispatcher) private _dispatcher: IEventDispatcher;
    @inject(IMediatorMap) private _mediatorMap: IMediatorMap;
    @inject(IEventCommandMap) private _commandMap: IEventCommandMap;
    @inject(IInjector) private _injector: IInjector;

    public configure(): void {
        this.mapCommands();
        this.mapPalidor();
        this.mapMediators();
        this.mapModels();

        this._dispatcher.dispatchEvent(new Event(AppEvent.LOAD_ASSETS));

        // setTimeout(() => {
        //     this._dispatcher.dispatchEvent(new Event(GameView.ID));
        // }, 1000);

        console.log('loaded');
    }

    private mapCommands() {
        this._commandMap
            .map(BoardClickEvent.TILE_CLICKED)
            .toCommand(BoardClickCommand);
        this._commandMap.map(SelectedEvent.SELECTED).toCommand(SelectedCommand);
        this._commandMap.map(AppEvent.LOAD_ASSETS).toCommand(LoadAssetsCommand);
    }

    private mapPalidor(): void {
        this._flowManager.map(GameView.ID).toView(GameView);
    }

    private mapMediators(): void {
        this._mediatorMap.map(GameView).toMediator(GameViewMediator);
        this._mediatorMap.map(BoardView).toMediator(BoardViewMediator);
        this._mediatorMap.map(ItemListView).toMediator(ItemListViewMediator);
    }

    private mapModels() {
        this._injector.bind(BoardModel).toSelf().inSingletonScope();
        this._injector.bind(SelectionModel).toSelf().inSingletonScope();
    }
}
