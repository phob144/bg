import { Container, Graphics, Sprite } from 'pixi.js';
import { PixiEvents } from '../utils/PixiEvents';

export class TileButton extends Container {
    private _background: Graphics;
    private _clickBackground: Graphics;
    private _image: Sprite;

    public xPos: number;
    public yPos: number;

    constructor(
        width: number,
        height: number,
        color: number,
        xPos: number,
        yPos: number
    ) {
        super();

        this.interactive = true;
        this.buttonMode = true;

        this.width = width;
        this.height = height;

        this.xPos = xPos;
        this.yPos = yPos;

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
        this.on(PixiEvents.POINTER_DOWN, this.onButtonDown);
        this.on(PixiEvents.POINTER_UP, this.onButtonUp);
        this.on(PixiEvents.POINTER_UP_OUTSIDE, this.onButtonUp);
    }

    private onButtonDown() {
        this.addChild(this._clickBackground);
    }

    private onButtonUp() {
        this.removeChild(this._clickBackground);
    }

    public set backgroundColor(color: number) {
        this.initBackground(this.width, this.height, color);
    }
}
