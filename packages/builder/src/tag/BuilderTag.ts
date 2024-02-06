import { BuilderObject } from "../BuilderObject";
import { TagID } from "../primitives/ID";

export interface BuilderTagDto {
  readonly id: TagID;
  readonly tag: string;
  readonly description: string;
}

export class BuilderTag extends BuilderObject<"builder-tag", BuilderTagDto> {
  readonly objectType: "builder-tag" = "builder-tag";
  readonly id: TagID;
  tagText = "";
  tagDescription = "";
  public static readonly MAX_LENGTH = 20;
  public static readonly MIN_LENGTH = 1;

  public static readonly create = (tag: string, description: string = "") => {
    const id = TagID.create();
    const dto: BuilderTagDto = {
      id,
      tag,
      description,
    };
    return new BuilderTag(dto);
  };
  public static readonly fromDto = (dto: BuilderTagDto) => {
    return new BuilderTag(dto);
  };
  protected constructor(dto: BuilderTagDto) {
    const id = TagID.validateOrCreate(dto.id);
    const withId = { ...dto, id };
    super(withId);
    this.id = id;
    this.tagText = dto.tag ?? "";
    this.tagDescription = dto.description ?? "";
  }
  clone(): BuilderTagDto {
    return this.toJson();
  }

  toJson(): BuilderTagDto {
    return { tag: this.tagText, description: this.tagDescription, id: this.id };
  }
}
