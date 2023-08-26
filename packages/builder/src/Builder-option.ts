import { BuilderObjectId, BuilderObject } from "./BuilderObject";
import type { BuilderOptionTheme } from "./theme/IDefaultTheme";
import { DefaultTheme } from "./theme/IDefaultTheme";
import { AudioFile } from "./media-files";

export interface BuilderOptionDto {
    readonly id: BuilderObjectId.QuestionOptionID;
    readonly value: number;
    readonly label: string;
    readonly labelAudio?: AudioFile;
    // readonly theme: BuilderPageTheme['nextButtonTheme'];
}

export class BuilderOption extends BuilderObject<"builder-question-option", BuilderOptionDto> {
    readonly objectType = "builder-question-option";
    theme: BuilderOptionTheme = DefaultTheme.responseButtons;

    id: BuilderObjectId.QuestionOptionID;
    value: number;
    label = "";
    private _labelAudioFile: AudioFile | false = false;
    get labelAudioFile() {
        return this._labelAudioFile;
    }
    set labelAudioFile(audioFile: AudioFile | false) {
        this._labelAudioFile = audioFile;
    }

    private constructor(dto: BuilderOptionDto) {
        super(dto);
        this.id = dto.id;
        this.value = dto.value;
        this.label = dto.label;
        // this.theme = dto.theme;
    }
    public static create(value: number, label: string) {
        const id = BuilderObjectId.questionOptionId();
        const dto: BuilderOptionDto = {
            id,
            value,
            label,
        };
        const instance = new BuilderOption(dto);
        return instance;
    }

    public static fromJson(dto: BuilderOptionDto) {
        const instance = new BuilderOption(dto);
        return instance;
    }

    toJson(): BuilderOptionDto {
        const dto: BuilderOptionDto = {
            id: this.id,
            value: this.value,
            label: this.label,
        };
        return dto;
    }

    clone(): BuilderOptionDto {
        const cloneId = BuilderObjectId.questionOptionId();
        const dto = this.toJson();
        const cloneDto: BuilderOptionDto = { ...dto, id: cloneId };
        return cloneDto;
    }
}
