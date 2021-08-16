import { IEventDispatcher, inject, injectable } from '@robotlegsjs/core';
import { Mediator } from '@robotlegsjs/pixi';
import { State } from '../enums/State';
import { BoardClickEvent } from '../events/BoardClickEvent';
import { SelectedEvent } from '../events/SelectedEvent';
import { ItemListView } from '../views/ItemListView';

@injectable()
export class ItemListViewMediator extends Mediator<ItemListView> {
    @inject(IEventDispatcher) private _eventDispatcher: IEventDispatcher;

    constructor() {
        super();
    }

    public initialize(): void {
        this.addViewListener(ItemListView.SELECTED, this.onToggled, this);

        this.view.initialize();
    }

    public destroy(): void {
        this.view.destroy();
    }

    public onToggled(state: State) {
        console.log(state);

        this._eventDispatcher.dispatchEvent(
            new SelectedEvent(SelectedEvent.SELECTED, state)
        );
    }
}
