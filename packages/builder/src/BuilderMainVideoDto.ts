import { VideoFile } from "./media-files";

export interface BuilderMainVideoDto {
    readonly kind: "main-video";
    readonly file: VideoFile;
    mode: "autoplay" | "required" | "optional";
    preDelay: number;
    volume: number;
    controls: boolean;
}
