import { NProgressOptions } from "nprogress";

export class Progress {
    static calculatePercentage(loaded: DoubleRange | number, total: number): DoubleRange | number;

    static init(config: NProgressOptions);
}
