import { Event } from '@robotlegsjs/core';
import { unique } from '../utils/unique';

export class BoardClickEvent extends Event {
    @unique
    public static readonly TILE_CLICKED: string;

    public x: number;
    public y: number;

    constructor(type: string, x: number, y: number) {
        super(type);

        this.x = x;
        this.y = y;
    }
}
