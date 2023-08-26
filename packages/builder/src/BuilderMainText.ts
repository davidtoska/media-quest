import { BuilderObject } from "./BuilderObject";
import { AudioFile } from "./media-files";

export interface BuilderMainTextDto {
    text: string;
    audioFile: AudioFile | false;
    autoplay: boolean;
    autoplayDelay: number;
}

export class BuilderMainText extends BuilderObject<"builder-main-text", BuilderMainTextDto> {
    readonly objectType: "builder-main-text" = "builder-main-text";
    autoplay = false;
    private _audioFile: AudioFile | false = false;
    autoplayDelay = 0;

    text = "";

    private constructor(dto: BuilderMainTextDto) {
        super(dto);
        this._audioFile = dto.audioFile ?? false;
        this.autoplay = dto.autoplay ?? false;
        this.autoplayDelay = dto.autoplayDelay ?? 0;
        this.text = dto.text ?? "";
    }

    get autoplayDelayInSeconds() {
        const delay = this.autoplayDelay;
        const s = delay / 1000;
        const formatted = s.toFixed(1);
        return formatted;
    }

    get durationTag() {
        if (!this.audioFile) return "";
        // console.log(this.audioFile.duration);
        const dur = this.audioFile.duration.toFixed(1);
        return "dur " + dur + " s";
    }

    static fromJson(dto: BuilderMainTextDto): BuilderMainText {
        const mainText = new BuilderMainText(dto);
        return mainText;
    }

    static create = () => {
        const dto: BuilderMainTextDto = {
            autoplay: false,
            autoplayDelay: 0,
            audioFile: false,
            text: "",
        };
        return new BuilderMainText(dto);
    };

    clone(): BuilderMainTextDto {
        const dto = this.toJson();
        const clone = JSON.parse(JSON.stringify(dto));
        return clone;
    }

    toJson(): BuilderMainTextDto {
        const dto: BuilderMainTextDto = {
            text: this.text,
            audioFile: this.audioFile,
            autoplay: this.autoplay,
            autoplayDelay: this.autoplayDelay,
        };
        return dto;
    }
    get audioFile(): AudioFile | false {
        return this._audioFile;
    }
    set audioFile(audioFile: AudioFile | false) {
        if (audioFile === false) {
            this.autoplayDelay = 0;
            this.autoplay = false;
        }
        this._audioFile = audioFile;
    }
}
