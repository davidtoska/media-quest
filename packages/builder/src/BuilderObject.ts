/**
 * Builder objects are complex objects that are embedded inside
 * a Builder-schema, and needs to be serialized to json. Often these objects
 * are used in collections, and that is why most of them need an id.
 */
type BuilderObjectType =
  | "builder-page"
  | "builder-question-option"
  | "builder-question"
  | "builder-main-text"
  | "builder-text"
  | "builder-rule"
  | "builder-tag"
  | "builder-sum-score-variable"
  | "builder-sum-score-membership"
  | "builder-condition"
  | "builder-variable"
  | "builder-condition-group";

export abstract class BuilderObject<T extends BuilderObjectType, Dto extends {}> {
  // abstract readonly id: string;
  abstract readonly objectType: T;
  abstract toJson(): Dto;
  abstract clone(): Dto;
  protected readonly originalDto: Dto;
  protected constructor(dto: Dto) {
    this.originalDto = dto;
    // this.objectId = dto.objectId;
  }
}
