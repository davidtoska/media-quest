import { BuilderObjectId, BuilderObject } from './BuilderObject';

export interface BuilderTagDto {
  readonly id: BuilderObjectId.TagId;
  readonly tag: string;
  readonly description: string;
}

export class BuilderTag extends BuilderObject<'builder-tag', BuilderTagDto> {
  readonly objectType: 'builder-tag' = 'builder-tag';
  readonly id: BuilderObjectId.TagId;
  tagText = '';
  tagDescription = '';
  public static readonly MAX_LENGTH = 20;
  public static readonly MIN_LENGTH = 1;

  public static readonly create = (tag: string, description: string = '') => {
    const id = BuilderObjectId.createTagId();
    const dto: BuilderTagDto = {
      id,
      tag,
      description
    };
    return new BuilderTag(dto);
  };
  public static readonly fromDto = (dto: BuilderTagDto) => {
    return new BuilderTag(dto);
  };
  protected constructor(dto: BuilderTagDto) {
    const id = dto.id ?? BuilderObjectId.createTagId();
    const withId = { ...dto, id };
    super(withId);
    this.id = id;
    this.tagText = dto.tag ?? '';
    this.tagDescription = dto.description ?? '';
  }
  clone(): BuilderTagDto {
    return this.toJson();
  }

  toJson(): BuilderTagDto {
    return { tag: this.tagText, description: this.tagDescription, id: this.id };
  }
}

export class TagCollection implements Iterable<BuilderTag> {
  private readonly _tags = new Set<BuilderTag>();
  public static readonly create = () => {
    return new TagCollection([]);
  };

  [Symbol.iterator]() {
    const list = [...this._tags];
    return list[Symbol.iterator]();
  }
  private constructor(initialTags: ReadonlyArray<BuilderTag>) {
    initialTags.forEach(tag => {
      this._tags.add(tag);
    });
  }

  init(tags: ReadonlyArray<BuilderTagDto>) {
    const dtoList: ReadonlyArray<BuilderTagDto> = Array.isArray(tags)
      ? tags
      : [];
    const all = dtoList.map(BuilderTag.fromDto);
    all.forEach(tag => {
      this._tags.add(tag);
    });
  }

  add(tag: BuilderTag) {
    this._tags.add(tag);
  }

  /**
   * Delete this tag from collection;
   * @param tag
   */
  delete(tag: BuilderTag) {
    this._tags.delete(tag);
  }

  toJson(): ReadonlyArray<BuilderTagDto> {
    const list = [...this._tags];
    const dtoList = list.map(t => t.toJson());
    return dtoList;
  }

  deleteAll(tags: Iterable<BuilderTag>) {
    const l = tags[Symbol.iterator]();
    const asList = [...tags];
    asList.forEach(t => {
      this.delete(t);
    });
  }
}
