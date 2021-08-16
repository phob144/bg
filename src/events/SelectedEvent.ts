import { Event } from '@robotlegsjs/core';
import { State } from '../enums/State';
import { unique } from '../utils/unique';

export class SelectedEvent extends Event {
    @unique
    public static readonly SELECTED: string;

    public selectedState: State;

    constructor(type: string, selectedState: State) {
        super(type);

        this.selectedState = selectedState;
    }
}
