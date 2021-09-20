import { unique } from '../utils/unique';

export class OtherEvents {
    @unique
    public static readonly CLEAR_CLICKED: string;
    @unique
    public static readonly RUN_CLICKED: string;
}
