import { BuilderObject } from "./BuilderObject";
import { AudioFile } from "./media-files";
import { OptionID } from "./primitives/ID";
import { PStyle } from "@media-quest/engine";

export interface BuilderOptionDto {
  readonly id: OptionID;
  readonly value: number;
  readonly label: string;
  readonly labelAudio?: AudioFile;
  readonly cssOverride?: PStyle;
}

export class BuilderOption extends BuilderObject<"builder-question-option", BuilderOptionDto> {
  readonly objectType = "builder-question-option";

  id: OptionID;

  value: number;

  label = "";

  cssOverride: PStyle = {}

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
    if(dto.cssOverride) {
      this.cssOverride = { ...dto.cssOverride };
    }
    // this.theme = dto.theme;
  }
  public static create(value: number, label: string, css: PStyle = {}) {
    const id = OptionID.create();
    const dto: BuilderOptionDto = {
      id,
      value,
      label,
      cssOverride: css
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
      cssOverride: {...this.cssOverride}
    };
    return dto;
  }

  clone(): BuilderOptionDto {
    const dto = this.toJson();
    const cloneDto: BuilderOptionDto = { ...dto, id: OptionID.create() };
    return cloneDto;
  }
}
