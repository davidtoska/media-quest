import { ImageFile } from "./media-files";

export interface BuilderMainImageDto {
    readonly kind: "main-image";
    readonly file: ImageFile;
    readonly overlay: { text: string; fontsize: number; xPos: number; yPos: number } | false;
}
