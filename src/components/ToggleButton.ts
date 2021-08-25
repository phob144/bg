import { Container, Graphics, Sprite } from 'pixi.js';
import { State } from '../enums/State';
import { PixiEvents } from '../utils/PixiEvents';

export class ToggleButton extends Container {
    private _background: Graphics;
    private _clickBackground: Graphics;

    private _toggled: boolean;

    public state: State;

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
        const backgroundSprite = Sprite.from(spritePath);
        backgroundSprite.anchor.set(-0.5, -0.5);

        this._background = new Graphics();
        this._background.beginFill(color);
        this._background.drawRect(0, 0, width, height);
        this._background.endFill();
        this._background.addChild(backgroundSprite);

        const clickBackgroundSprite = Sprite.from(spritePath);
        clickBackgroundSprite.anchor.set(-0.5, -0.5);

        this._clickBackground = new Graphics();
        this._clickBackground.beginFill(Math.min(color + 0x101010, 0xffffff));
        this._clickBackground.drawRect(0, 0, width, height);
        this._clickBackground.endFill();
        this._clickBackground.addChild(clickBackgroundSprite);

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
