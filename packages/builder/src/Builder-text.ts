import { BuilderObject } from "./BuilderObject";
import { TextID } from "./primitives/ID";

export interface BuilderTextDto {
  readonly id: TextID;
  text: string;
  name: string;
  translationRequired: boolean;
}

export class BuilderText extends BuilderObject<"builder-text", BuilderTextDto> {
  readonly objectType = "builder-text";
  id: TextID;
  text = "";
  name = "";
  translateRequired = false;
  // audio: {id: B}
  private constructor(dto: BuilderTextDto) {
    super(dto);
    this.id = dto.id;
    this.translateRequired = dto.translationRequired;
    this.name = dto.name;
    this.text = dto.text;
  }

  public static create(name: string) {
    const id = TextID.create();
    const dto: BuilderTextDto = {
      id,
      name,
      text: "",
      translationRequired: false,
    };
    const instance = new BuilderText(dto);
    return instance;
  }
  public static fromJson(dto: BuilderTextDto) {
    const instance = new BuilderText(dto);
    return instance;
  }

  clone(): BuilderTextDto {
    const dto = this.toJson();
    const withNewId: BuilderTextDto = { ...dto, id: TextID.create() };
    return withNewId;
  }

  toJson(): BuilderTextDto {
    const dto: BuilderTextDto = {
      id: this.id,
      name: this.name,
      text: this.text,
      translationRequired: this.translateRequired,
    };
    return dto;
  }
}
