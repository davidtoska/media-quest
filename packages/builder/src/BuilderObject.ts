import { DUtil } from "@media-quest/engine";

const U = DUtil;
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
  | "builder-condition"
  | "builder-variable"
  | "builder-condition-group";

export namespace BuilderObjectId {
  export type QuestionOptionID = string & { __OPTION__ID__: true };
  export type QuestionID = string & { __QUESTION__ID__: true };
  export type VideoFileID = string & { __VIDEO__ID__: true };
  export type AudioFileID = string & { __AUDIO__ID__: true };
  export type ImageID = string & { __IMAGE__ID__: true };
  export type TextID = string & { __TEXT__ID__: true };
  export type MainTextID = string & { __MAIN__TEXT__ID__: true };
  export type PageID = string & { __PAGE__ID__: true };
  export type TagId = string & { __TAG__ID__: true };

  export const createTagId = (): TagId => {
    return createId("builder-tag") as TagId;
  };

  export const mainTextId = (): MainTextID => {
    return createId("builder-main-text") as MainTextID;
  };
  export const textId = (): TextID => {
    return createId("builder-text") as TextID;
  };

  export const questionOptionId = (): QuestionOptionID => {
    return createId("builder-question-option") as QuestionOptionID;
  };
  export const questionId = (): QuestionID => {
    return createId("builder-question") as QuestionID;
  };
  export const pageId = (): PageID => {
    return createId("builder-page") as PageID;
  };

  const createId = (type: BuilderObjectType): string => {
    const id = U.randomString(24);
    return type + "-" + id;
  };
}

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
