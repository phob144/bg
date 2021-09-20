import { IEventDispatcher, inject, injectable } from '@robotlegsjs/core';
import { Mediator } from '@robotlegsjs/pixi';
import { State } from '../enums/State';
import { BoardClickEvent } from '../events/BoardClickEvent';
import { SelectedEvent } from '../events/SelectedEvent';
import { SelectionModel } from '../models/SelectionModel';
import { ItemListView } from '../views/ItemListView';

@injectable()
export class ItemListViewMediator extends Mediator<ItemListView> {
    @inject(IEventDispatcher) private _eventDispatcher: IEventDispatcher;
    @inject(SelectionModel) private _model: SelectionModel;

    constructor() {
        super();
    }

    public initialize(): void {
        this.addContextListener(
            SelectionModel.CHANGE,
            this.onModelChanged,
            this
        );

        this.addViewListener(ItemListView.SELECTED, this.onToggled, this);

        this.view.initialize();
    }

    public destroy(): void {
        this.view.destroy();
    }

    private onModelChanged() {
        this.view.update(this._model.selectedState);
    }

    public onToggled(state: State) {
        this._eventDispatcher.dispatchEvent(
            new SelectedEvent(SelectedEvent.SELECTED, state)
        );
    }
}
