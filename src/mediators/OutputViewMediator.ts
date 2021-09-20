import { Mediator } from '@robotlegsjs/pixi';
import { injectable } from 'inversify';
import { OutputView } from '../views/OutputView';

@injectable()
export class OutputViewMediator extends Mediator<OutputView> {
    constructor() {
        super();
    }

    public initialize(): void {
        this.view.initialize();
    }

    public destroy(): void {
        this.view.destroy();
    }
}
