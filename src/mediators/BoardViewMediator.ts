import { Event, IEventDispatcher, inject, injectable } from '@robotlegsjs/core';
import { Mediator } from '@robotlegsjs/pixi';
import { TileButton } from '../components/TileButton';
import { BoardClickEvent } from '../events/BoardClickEvent';
import { BoardModel } from '../models/BoardModel';
import { BoardView } from '../views/BoardView';

@injectable()
export class BoardViewMediator extends Mediator<BoardView> {
    @inject(IEventDispatcher) private _eventDispatcher: IEventDispatcher;
    @inject(BoardModel) private _model: BoardModel;

    constructor() {
        super();
    }

    public initialize(): void {
        this.addContextListener(BoardModel.CHANGE, this.onModelChanged, this);

        this.addViewListener(BoardView.TILE_CLICKED, this.onTileClicked, this);

        this.view.initialize();
    }

    public destroy(): void {
        this.view.destroy();
    }

    private onModelChanged() {
        this.view.update(this._model.boardState);
    }

    private onTileClicked(xPos: number, yPos: number) {
        this._eventDispatcher.dispatchEvent(
            new BoardClickEvent(BoardClickEvent.TILE_CLICKED, xPos, yPos)
        );
    }
}
