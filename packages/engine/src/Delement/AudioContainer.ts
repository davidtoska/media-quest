import { CanPlayToEnd } from "./VideoContainer";
import { DAudioDto } from "../dto/DElement.dto";
import { DEventDispatcher } from "../events/event-bus";
import { DTimestamp } from "../common/DTimestamp";

export class AudioContainer implements CanPlayToEnd {
    private readonly TAG = "[ DAudio ]: ";
    protected dto: DAudioDto | null = null;
    private el: HTMLAudioElement;
    constructor(private readonly eventBus: DEventDispatcher) {
        this.el = document.createElement("audio");
        this.el.style.position = "absolute";
        this.el.style.visibility = "hidden";
        // this.el.on
        this.onLoad = this.onLoad.bind(this);
        this.el.onload = this.onLoad;
        this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
        this.el.onloadedmetadata = this.onLoadedMetadata;
        this.el.onplay = () => {
            // TODO
        };
        this.onCanPlayThrough = this.onCanPlayThrough.bind(this);
        this.el.oncanplaythrough = this.onCanPlayThrough;
        this.el.onended = (_) => {
            const url = this.el.src;
            this.eventBus.emit({
                kind: "AUDIO_ENDED_EVENT",
                data: { url },
                producer: "DAudio",
                timestamp: DTimestamp.now(),
                producerId: this.id,
            });
        };
        this.el.ondurationchange = (_: Event) => {
            const duration = this.el.duration;
            const isInfinity = duration === Number.POSITIVE_INFINITY;
            this.eventBus.emit({
                kind: "AUDIO_DURATION_CHANGE_EVENT",
                timestamp: DTimestamp.now(),
                producer: "DAudio",
                producerId: this.id,
                data: { duration: this.el.duration, isInfinity },
            });
        };
    }

    setAudio(dto: DAudioDto) {
        this.dto = dto;
        this.el.src = dto.url;
        this.el.load();
    }

    destroy() {
        try {
            this.el.pause();
            this.el.src = "";
            this.el.load();
        } catch (e) {
            console.log(e);
        }
    }

    pause() {
        try {
            this.el.pause();
        } catch (e) {
            // TODO EMIT ERROR EVENT.
            console.log(e);
        }
    }

    play(url: string) {
        if (this.el.src !== url) {
            this.el.src = url;
        }
        this.eventBus.emit({
            kind: "AUDIO_PLAY_EVENT",
            producerId: this.id,
            data: {},
            producer: "DAudio",
            timestamp: DTimestamp.now(),
        });
        this.el
            .play()
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    onLoadedMetadata(_: Event) {
        this.eventBus.emit({
            kind: "AUDIO_METADATA_LOADED_EVENT",
            timestamp: DTimestamp.now(),
            producer: "DAudio",
            producerId: this.id,
            data: {},
        });
    }

    onLoad(_: Event) {
        this.eventBus.emit({
            kind: "AUDIO_LOAD_EVENT",
            timestamp: DTimestamp.now(),
            producer: "DAudio",
            producerId: this.id,
            data: {},
        });
        // console.log(this.TAG + event.type);
    }

    get id() {
        return this.dto?.id ?? "DAudio";
    }

    private onCanPlayThrough(_: Event) {
        this.eventBus.emit({
            kind: "AUDIO_CAN_PLAY_THROUGH_EVENT",
            data: {},
            producer: "DAudio",
            timestamp: DTimestamp.now(),
            producerId: this.id,
        });
    }

    // private onPlay(_: Event) {}

    async playToEnd(): Promise<boolean> {
        const endedOrErrored = new Promise<boolean>((resolve) => {
            this.el.addEventListener(
                "ended",
                (_) => {
                    // console.log(e);
                    resolve(true);
                },
                { once: true }
            );
            this.el.addEventListener(
                "error",
                (_) => {
                    // console.log(e);
                    resolve(false);
                },
                { once: true }
            );
        });
        try {
            this.play(this.el.src);
            await endedOrErrored;
            return true;
        } catch (e) {
            // TODO LET PARENT DEAL WITH ERRORS? THE MANAGER?? MANAGERS CALL ABORT.
            console.log(e);
            this.eventBus.emit({
                kind: "AUDIO_ERROR_EVENT",
                timestamp: DTimestamp.now(),
                producer: "DAudio",
                producerId: this.id,
                data: { error: e },
            });
            return false;
        } finally {
        }

        return Promise.resolve(false);
    }
}
