import { Container } from 'pixi.js';
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

    private static readonly _BUTTON_WIDTH: number =
        BoardView._WIDTH / BoardView._COLUMNS;
    private static readonly _BUTTON_HEIGHT: number =
        BoardView._HEIGHT / BoardView._ROWS;

    @unique
    public static readonly ID: string;
    @unique
    public static readonly TILE_CLICKED: string;

    private _tiles: TileButton[][];

    constructor() {
        super();
    }

    public update(state: State[][]) {
        for (let i = 0; i < BoardView._COLUMNS; i++) {
            for (let j = 0; j < BoardView._ROWS; j++) {
                this.removeChild(this._tiles[i][j]);

                this._tiles[i][j].sprite = SpriteMap.assets.get(state[i][j]);
            }
        }
    }

    public initialize() {
        this.width = BoardView._WIDTH;
        this.height = BoardView._HEIGHT;

        this.initSquares();
    }

    private initSquares() {
        this._tiles = [];

        for (let i = 0; i < BoardView._COLUMNS; i++) {
            let row = [];

            for (let j = 0; j < BoardView._ROWS; j++) {
                // alternate between color 1 and color 2
                let color =
                    (i * BoardView._ROWS + (j + 1)) % 2
                        ? BoardView._BUTTON_COLOR_1
                        : BoardView._BUTTON_COLOR_2;

                let square = new TileButton(
                    BoardView._BUTTON_WIDTH,
                    BoardView._BUTTON_HEIGHT,
                    color,
                    null
                );
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

    private onTileClick(e: Event) {
        const tile = e.target as TileButton;

        this.emit(BoardView.TILE_CLICKED, tile.xPos, tile.yPos);
    }
}
