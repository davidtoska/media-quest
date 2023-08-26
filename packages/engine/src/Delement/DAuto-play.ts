import { DCommand } from "../commands/DCommand";

/**
 * Autoplay video by Id.
 */
export interface AutoPlayVideo {
    readonly kind: "autoplay-video";
    readonly muted?: boolean;
    readonly startAt?: number;
    readonly videoId: string;
}

/**
 * Add a pause between auto-play elements.
 * TODO Not implemented
 */
export interface AutoPlayPause {
    readonly kind: "autoplay-pause";
    readonly duration: number;
}

export interface AutoPlayAudio {
    readonly kind: "autoplay-audio";
    readonly audioId: string;
    readonly startAt?: number;
}

export type AutoPlayElement = AutoPlayVideo | AutoPlayAudio | AutoPlayPause;

export interface DAutoPlaySequence {
    readonly id: string;
    readonly blockUserInput: boolean;
    readonly items: Array<AutoPlayAudio | AutoPlayVideo | AutoPlayPause>;
    readonly startCommands: ReadonlyArray<DCommand>;
    readonly endCommands: ReadonlyArray<DCommand>;
}
