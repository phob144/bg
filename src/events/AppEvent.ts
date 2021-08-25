import { unique } from '../utils/unique';

export class AppEvent {
    @unique
    public static readonly LOAD_ASSETS: string;
}
