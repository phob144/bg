import { Container, Graphics } from 'pixi.js';
import { State } from '../enums/State';
import { PixiEvents } from '../utils/PixiEvents';
import { TileButton } from './TileButton';

export class ToggleButton extends Container {
    private _background: Graphics;
    private _clickBackground: Graphics;

    private _toggled: boolean;

    public state: State;

    constructor(width: number, height: number, color: number) {
        super();

        this.interactive = true;
        this.buttonMode = true;

        this.width = width;
        this.height = height;

        this.initBackground(width, height, color);
        this.initEvents();
    }

    private initBackground(width: number, height: number, color: number) {
        this._background = new Graphics();
        this._background.beginFill(color);
        this._background.drawRect(0, 0, width, height);
        this._background.endFill();

        this._clickBackground = new Graphics();
        this._clickBackground.beginFill(Math.min(color + 0x101010, 0xffffff));
        this._clickBackground.drawRect(0, 0, width, height);
        this._clickBackground.endFill();

        this.addChild(this._background);
    }

    private initEvents() {
        this.on(PixiEvents.POINTER_DOWN, this.toggle);
    }

    public toggle() {
        if (!this._toggled) {
            this.addChild(this._clickBackground);
        } else {
            this.removeChild(this._clickBackground);
        }

        this._toggled = !this._toggled;
    }
}
