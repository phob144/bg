import { Container } from 'pixi.js';
import { ToggleButton } from '../components/ToggleButton';
import { State } from '../enums/State';
import { PixiEvents } from '../utils/PixiEvents';
import { unique } from '../utils/unique';

export class ItemListView extends Container {
    private static readonly _BUTTON_COLOR: number = 0x202020;

    private static readonly _BUTTON_WIDTH: number = 100;
    private static readonly _BUTTON_HEIGHT: number = 100;

    @unique
    public static readonly ID: string;
    @unique
    public static readonly SELECTED: string;

    private _wall: ToggleButton;
    private _player: ToggleButton;

    constructor() {
        super();
    }

    public initialize() {
        this._wall = new ToggleButton(
            ItemListView._BUTTON_WIDTH,
            ItemListView._BUTTON_HEIGHT,
            ItemListView._BUTTON_COLOR
        );
        this._wall.x = 0;
        this._wall.y = 0 * ItemListView._BUTTON_HEIGHT;
        this._wall.state = State.wall;
        this._wall.on(PixiEvents.CLICK, this.onToggled);

        this._player = new ToggleButton(
            ItemListView._BUTTON_WIDTH,
            ItemListView._BUTTON_HEIGHT,
            ItemListView._BUTTON_COLOR
        );
        this._player.x = 0;
        this._player.y = 1 * ItemListView._BUTTON_HEIGHT;
        this._player.state = State.player;
        this._player.on(PixiEvents.CLICK, this.onToggled);

        this.addChild(this._wall);
        this.addChild(this._player);
    }

    private onToggled(e: Event) {
        const tile = e.target as ToggleButton;

        this.emit(ItemListView.SELECTED, tile.state);
    }
}
