import { BuilderTag, BuilderTagDto } from "./BuilderTag";

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
    initialTags.forEach((tag) => {
      this._tags.add(tag);
    });
  }

  init(tags: ReadonlyArray<BuilderTagDto>) {
    const dtoList: ReadonlyArray<BuilderTagDto> = Array.isArray(tags) ? tags : [];
    const all = dtoList.map(BuilderTag.fromDto);
    all.forEach((tag) => {
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
    const dtoList = list.map((t) => t.toJson());
    return dtoList;
  }

  deleteAll(tags: Iterable<BuilderTag>) {
    const l = tags[Symbol.iterator]();
    const asList = [...tags];
    asList.forEach((t) => {
      this.delete(t);
    });
  }
}
