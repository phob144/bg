import { Container, Graphics, Sprite } from 'pixi.js';
import { Move } from '../algorithm/enums/Move';
import { SpriteMap } from '../utils/SpriteMap';

export class OutputView extends Container {
    private static readonly _TILE_COLOR_2: number = 0x404040;
    private static readonly _TILE_COLOR_1: number = 0x202020;

    private _output: Sprite[][];

    private _background: Graphics;

    public initialize() {
        this.initBackground();
        this.initOutput();
    }

    private initBackground() {
        this._background = new Graphics();
        this._background.beginFill(0x202020);
        this._background.drawRect(0, 0, 800, 500);
        this._background.endFill();
        this.addChild(this._background);
    }

    private initOutput() {
        this._output = [];

        const mock = [
            [Move.up, Move.up, Move.down, Move.left],
            [Move.down, Move.right, Move.left, Move.down],
            [Move.down, Move.left, Move.up, Move.right, Move.right],
            [Move.up, Move.down, Move.down, Move.right, Move.right, Move.left, Move.down],
            [Move.up, Move.down, Move.down, Move.left, Move.left, Move.right, Move.down],
        ];

        for (let i = 0; i < mock.length; i++) {
            for (let j = 0; j < mock[i].length; j++) {
                let sprite = Sprite.from(SpriteMap.output.get(mock[i][j]));
                sprite.x = j * 50;
                sprite.y = i * 50;
                this.addChild(sprite);
            }
        }
    }
}
