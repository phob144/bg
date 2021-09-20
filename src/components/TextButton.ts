import { PixiBundle } from '@robotlegsjs/pixi';
import { Container, Graphics, Sprite } from 'pixi.js';
import { PixiEvents } from '../utils/PixiEvents';

export class TextButton extends Container {
    private _background: Graphics;
    private _clickBackground: Graphics;

    private _color: number;

    constructor(width: number, height: number, color: number, text: string) {
        super();

        this.interactive = true;
        this.buttonMode = true;

        this._color = color;

        this.initBackground(width, height, color, text);
        this.initEvents();
    }

    private initBackground(
        width: number,
        height: number,
        color: number,
        text: string
    ) {
        const backgroundText = new PIXI.Text(text);
        backgroundText.anchor.set(0.5, 0.5);
        backgroundText.x = width / 2;
        backgroundText.y = height / 2;

        this._background = new Graphics();
        this._background.beginFill(color);
        this._background.drawRect(0, 0, width, height);
        this._background.endFill();
        this._background.addChild(backgroundText);

        const clickBackgroundText = new PIXI.Text(text);
        clickBackgroundText.anchor.set(0.5, 0.5);
        clickBackgroundText.x = width / 2;
        clickBackgroundText.y = height / 2;

        this._clickBackground = new Graphics();
        this._clickBackground.beginFill(Math.min(color + 0x101010, 0xffffff));
        this._clickBackground.drawRect(0, 0, width, height);
        this._clickBackground.endFill();
        this._clickBackground.addChild(clickBackgroundText);

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
}
