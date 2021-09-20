import { Container } from 'pixi.js';
import { TextButton } from '../components/TextButton';
import { TileButton } from '../components/TileButton';
import { State } from '../enums/State';
import { PixiEvents } from '../utils/PixiEvents';
import { SimpleItemPool } from '../utils/SimpleItemPool';
import { SpriteMap } from '../utils/SpriteMap';
import { unique } from '../utils/unique';

export class BoardView extends Container {
    private static readonly _BUTTON_COLOR_1: number = 0x202020;
    private static readonly _BUTTON_COLOR_2: number = 0x404040;

    private static readonly _COLUMNS: number = 5;
    private static readonly _ROWS: number = 5;

    private static readonly _WIDTH: number = 500;
    private static readonly _HEIGHT: number = 500;

    private static readonly _BUTTON_WIDTH: number = BoardView._WIDTH / BoardView._COLUMNS;
    private static readonly _BUTTON_HEIGHT: number = BoardView._HEIGHT / BoardView._ROWS;

    @unique
    public static readonly ID: string;
    @unique
    public static readonly TILE_CLICKED: string;
    @unique
    public static readonly CLEAR_CLICKED: string;
    @unique
    public static readonly RUN_CLICKED: string;

    private _tiles: TileButton[][];

    private _clear: TextButton;
    private _run: TextButton;

    constructor() {
        super();
    }

    public update(state: State[][]) {
        for (let i = 0; i < BoardView._COLUMNS; i++) {
            for (let j = 0; j < BoardView._ROWS; j++) {
                this._tiles[i][j].sprite = SpriteMap.assets.get(state[i][j]);
            }
        }
    }

    public initialize() {
        this.width = BoardView._WIDTH;
        this.height = BoardView._HEIGHT;

        this.initSquares();
        this.initButtons();
    }

    private initSquares() {
        this._tiles = [];

        for (let i = 0; i < BoardView._COLUMNS; i++) {
            let row = [];

            for (let j = 0; j < BoardView._ROWS; j++) {
                // alternate between color 1 and color 2
                let color = (i * BoardView._ROWS + (j + 1)) % 2 ? BoardView._BUTTON_COLOR_1 : BoardView._BUTTON_COLOR_2;

                let square = new TileButton(BoardView._BUTTON_WIDTH, BoardView._BUTTON_HEIGHT, color, null);
                square.x = i * BoardView._BUTTON_WIDTH;
                square.y = j * BoardView._BUTTON_HEIGHT;
                square.xPos = i;
                square.yPos = j;
                square.on(PixiEvents.CLICK, this.onTileClick, this);

                row.push(square);

                this.addChild(square);
            }

            this._tiles.push(row);
        }
    }

    private initButtons() {
        this._clear = new TextButton(200, 50, 0xbbbbbb, 'CLEAR');
        this._clear.x = 25;
        this._clear.y = 525;
        this._clear.on(PixiEvents.CLICK, this.onClearClick, this);
        this.addChild(this._clear);

        this._run = new TextButton(200, 50, 0xbbbbbb, 'RUN');
        this._run.x = 275;
        this._run.y = 525;
        this._run.on(PixiEvents.CLICK, this.onRunClick, this);
        this.addChild(this._run);
    }

    private onTileClick(e: Event) {
        const tile = e.target as TileButton;

        this.emit(BoardView.TILE_CLICKED, tile.xPos, tile.yPos);
    }

    private onClearClick(e: Event) {
        this.emit(BoardView.CLEAR_CLICKED);
    }

    private onRunClick(e: Event) {
        this.emit(BoardView.RUN_CLICKED);
    }
}
