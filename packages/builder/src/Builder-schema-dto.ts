import { SchemaID } from "./primitives/ID";
import { SchemaPrefixValue } from "./primitives/schema-prefix";
import { ImageFile } from "./media-files";
import type { BuilderPageDto } from "./page/Builder-page";
import { CodebookPredefinedVariable } from "./code-book/codebook-variable";
import { SumScoreVariableDto } from "./sum-score/sum-score-variable";
import type { BuilderRuleDto } from "./rulebuilder";
import type { BuilderTagDto } from "./tag/BuilderTag";

const setUrl = <T extends { downloadUrl: string }>(dto: T, newUrl: string): T => {
  return { ...dto, downloadUrl: newUrl };
};

export interface BuilderSchemaDto {
  readonly id: SchemaID;
  readonly prefix: SchemaPrefixValue;
  readonly mainImage: ImageFile | false;
  readonly backgroundColor: string;
  readonly name: string;
  readonly pages: ReadonlyArray<BuilderPageDto>;
  readonly baseHeight: number;
  readonly baseWidth: number;
  readonly predefinedVariables?: Array<CodebookPredefinedVariable>;
  readonly sumScoreVariables?: ReadonlyArray<SumScoreVariableDto>;
  readonly rules: ReadonlyArray<BuilderRuleDto>;
  readonly tags: ReadonlyArray<BuilderTagDto>;
}

const blockAutoplayVideo = (dto: BuilderPageDto): BuilderPageDto => {
  if (dto.mainMedia && dto.mainMedia.kind === "main-video") {
    dto.mainMedia.mode = "optional";
  }
  return dto;
};

const overrideVideoUrl = (dto: BuilderPageDto, baseUrl: string): BuilderPageDto => {
  if (dto.mainMedia && dto.mainMedia.kind === "main-video") {
    dto.mainMedia.file.downloadUrl = [baseUrl, dto.mainMedia.file.id].join("/");
  }
  return dto;
};
const overrideImageUrl = (dto: BuilderPageDto, baseUrl: string): BuilderPageDto => {
  if (dto.mainMedia && dto.mainMedia.kind === "main-image") {
    dto.mainMedia.file.downloadUrl = [baseUrl, dto.mainMedia.file.id].join("/");
  }
  return dto;
};
const overrideAudioUrl = (dto: BuilderPageDto, baseUrl: string): BuilderPageDto => {
  if (dto.mainText.audioFile) {
    dto.mainText.audioFile.downloadUrl = [baseUrl, dto.mainText.audioFile.id].join("/");
  }
  return dto;
};

const overrideAllMediaUrls = (
  schema: BuilderSchemaDto,
  options: {
    videoFilesBaseUrl: string;
    audioFilesBaseUrl: string;
    imageFilesBaseUrl: string;
  },
): BuilderSchemaDto => {
  // const videoFolder = [options.baseUrl, options.videoFileFolder].join("/");
  // const audioFolder = [options.baseUrl, options.audioFileFolder].join("/");
  // const imageFolder = [options.baseUrl, options.imageFileFolder].join("/");
  const pages = schema.pages.map((page) => {
    page = overrideVideoUrl(page, options.videoFilesBaseUrl);
    page = overrideImageUrl(page, options.imageFilesBaseUrl);
    page = overrideAudioUrl(page, options.audioFilesBaseUrl);
    return page;
  });
  return { ...schema, pages };
};
export const BuilderSchemaDto = {
  blockAutoplayVideo,
  overrideAllMediaUrls,
};
