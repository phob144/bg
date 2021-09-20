import { Container, Sprite } from 'pixi.js';
import { ToggleButton } from '../components/ToggleButton';
import { State } from '../enums/State';
import { PixiEvents } from '../utils/PixiEvents';
import { SpriteMap } from '../utils/SpriteMap';
import { unique } from '../utils/unique';

export class ItemListView extends Container {
    private static readonly _BUTTON_COLOR: number = 0x202020;

    private static readonly _BUTTON_WIDTH: number = 100;
    private static readonly _BUTTON_HEIGHT: number = 100;

    @unique
    public static readonly ID: string;
    @unique
    public static readonly SELECTED: string;

    private _toggles: ToggleButton[];

    constructor() {
        super();
    }

    public update(state: State) {
        if (!this._toggles) {
            return;
        }

        this._toggles.forEach((x) => {
            x.toggled = true;
        });

        if (state != State.empty) {
            this._toggles.find((x) => x.state == state).toggled = false;
        }
    }

    public initialize() {
        // this._wall = new ToggleButton(
        //     ItemListView._BUTTON_WIDTH,
        //     ItemListView._BUTTON_HEIGHT,
        //     ItemListView._BUTTON_COLOR
        // );
        // this._wall.x = 0;
        // this._wall.y = 0 * ItemListView._BUTTON_HEIGHT;
        // this._wall.state = State.wall;
        // this._wall.on(PixiEvents.CLICK, this.onToggled, this);

        // this._sword = new ToggleButton(
        //     ItemListView._BUTTON_WIDTH,
        //     ItemListView._BUTTON_HEIGHT,
        //     ItemListView._BUTTON_COLOR
        // );
        // this._sword.x = 0;
        // this._sword.y = 1 * ItemListView._BUTTON_HEIGHT;
        // this._sword.state = State.sword;
        // this._sword.on(PixiEvents.CLICK, this.onToggled, this);

        // this.addChild(this._wall);
        // this.addChild(this._sword);

        this.initToggles();
    }

    private initToggles() {
        this._toggles = [];

        const keys = Object.keys(State);

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i + 1];

            if (key == undefined) {
                continue;
            }

            let toggleButton = new ToggleButton(
                ItemListView._BUTTON_WIDTH,
                ItemListView._BUTTON_HEIGHT,
                ItemListView._BUTTON_COLOR,
                SpriteMap.assets.get(State[key])
            );
            toggleButton.x = Math.floor(i / 5) * ItemListView._BUTTON_WIDTH;
            toggleButton.y = (i % 5) * ItemListView._BUTTON_HEIGHT;
            toggleButton.state = State[key];
            toggleButton.on(PixiEvents.CLICK, this.onToggled, this);

            this._toggles.push(toggleButton);

            this.addChild(toggleButton);
        }
    }

    private onToggled(e: Event) {
        const tile = e.target as ToggleButton;

        this.emit(ItemListView.SELECTED, tile.state);
    }
}
