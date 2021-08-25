import { Container, Graphics, Sprite } from 'pixi.js';
import { PixiEvents } from '../utils/PixiEvents';

export class TileButton extends Container {
    private _background: Graphics;
    private _clickBackground: Graphics;

    private _color: number;

    public xPos: number;
    public yPos: number;

    constructor(
        width: number,
        height: number,
        color: number,
        spritePath: string
    ) {
        super();

        this.interactive = true;
        this.buttonMode = true;

        this.width = width;
        this.height = height;

        this.initBackground(width, height, color, spritePath);
        this.initEvents();
    }

    private initBackground(
        width: number,
        height: number,
        color: number,
        spritePath: string
    ) {
        this._background = new Graphics();
        this._background.beginFill(color);
        this._background.drawRect(0, 0, width, height);
        this._background.endFill();

        this._clickBackground = new Graphics();
        this._clickBackground.beginFill(Math.min(color + 0x101010, 0xffffff));
        this._clickBackground.drawRect(0, 0, width, height);
        this._clickBackground.endFill();

        if (spritePath != null) {
            const backgroundSprite = Sprite.from(spritePath);
            backgroundSprite.anchor.set(-0.5, -0.5);

            this._background.addChild(backgroundSprite);

            const clickBackgroundSprite = Sprite.from(spritePath);
            clickBackgroundSprite.anchor.set(-0.5, -0.5);

            this._clickBackground.addChild(clickBackgroundSprite);
        } else {
            this._background.removeChildren();
            this._clickBackground.removeChildren();
        }

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

    public set sprite(path: string) {
        this.initBackground(this.width, this.height, this._color, path);
    }
}
