import { injectable } from '@robotlegsjs/core';
import { Mediator } from '@robotlegsjs/pixi';
import { GameView } from '../views/GameView';

@injectable()
export class GameViewMediator extends Mediator<GameView> {
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
