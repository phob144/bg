import { Sprite } from 'pixi.js';
import { State } from '../enums/State';

export class UIConst {
    public static readonly WINDOW_WIDTH: number = 1280;
    public static readonly WINDOW_HEIGHT: number = 720;

    public static readonly MARGIN: number = 10;

    public static readonly SPRITES: Map<State, Sprite> = new Map<
        State,
        Sprite
    >();
}
