import { Container, Graphics } from 'pixi.js';
import { UIConst } from '../utils/UIConst';
import { unique } from '../utils/unique';
import { BoardView } from './BoardView';
import { ItemListView } from './ItemListView';

export class GameView extends Container {
    @unique
    public static readonly ID: string;

    private _background: Graphics;
    private _boardView: BoardView;
    private _itemListView: ItemListView;

    constructor() {
        super();
    }

    public initialize() {
        this._background = new Graphics();
        this._background.beginFill(0xa0a0a0);
        this._background.drawRect(
            0,
            0,
            UIConst.WINDOW_WIDTH,
            UIConst.WINDOW_HEIGHT
        );
        this._background.endFill();
        this.addChild(this._background);

        this._boardView = new BoardView();
        this._boardView.x = 50;
        this._boardView.y = 50;
        this.addChild(this._boardView);

        this._itemListView = new ItemListView();
        this._itemListView.x = 600;
        this._itemListView.y = 50;
        this.addChild(this._itemListView);
    }
}
