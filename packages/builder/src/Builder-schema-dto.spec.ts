import { BuilderSchema } from "./Builder-schema";
import { OptionID, PageID, QuestionID, SchemaID, SumScoreVariableID } from "./primitives/ID";
import { SchemaPrefixValue } from "./primitives/schema-prefix";
import { BuilderSchemaDto } from "./Builder-schema-dto";
import { PagePrefix } from "./primitives/page-prefix";
import { BuilderPageDto } from "./page/Builder-page";
import { Options } from "tsup";
import { AudioFile, ImageFile, VideoFile } from "./media-files";

const SCHEMA_ID = "schema_id" as SchemaID;
const SCHEMA_PREFIX_A = "schema_prefix_a" as SchemaPrefixValue;
let s1 = BuilderSchema.create(SCHEMA_ID, "test-name", SCHEMA_PREFIX_A);

const createPage = (options: {
  pageNumber: number;
  audioUrl: string;
  mainMedia: { type: "image" | "video"; url: string; id: string };
}): BuilderPageDto => {
  const { pageNumber, audioUrl, mainMedia } = options;

  const audioId = "audio" + pageNumber + "_id";

  let media: BuilderPageDto["mainMedia"] = undefined;
  if (mainMedia.type === "image") {
    media = {
      kind: "main-image",
      file: {
        kind: "image-file",
        id: mainMedia.id,
        downloadUrl: mainMedia.url,
        name: "video",
        size: 1000,
        type: "video",
        originalFileName: "",
      },
      overlay: false,
    };
  }
  if (mainMedia.type === "video") {
    media = {
      kind: "main-video",
      file: {
        kind: "video-file",
        id: mainMedia.id,
        downloadUrl: mainMedia.url,
        duration: 2,
        name: "video",
        size: 1000,
        type: "video",
        originalFileName: "",
      },
      controls: false,
      volume: 1,
      mode: "optional",
      preDelay: 0,
    };
  }
  return {
    id: ("p" + pageNumber) as PageID,
    _type: "question",
    mainMedia: media,
    prefix: PagePrefix.fromStringOrThrow("p" + pageNumber),
    mainText: {
      text: "test",
      audioFile: {
        kind: "audio-file",
        id: audioId,
        name: audioId + " beskrivelse",
        downloadUrl: audioUrl,
        duration: 2,
        originalFileName: "",
        size: 1000,
        relativePath: "asd",
      },
      autoplay: false,
      autoplayDelay: 0,
    },
    defaultQuestion: {
      id: "q1" as QuestionID,
      _type: "select-one",
      prefix: "1",
      text: "test",
      options: [],
    },
    includedInSumScores: [],
    autoplaySequence: [],
    // id: "p1",
    // _type: "question",
    nextButton: { label: "", id: "ja" as OptionID, value: 1 },
    tags: [],
  };
};
describe("BuilderSchemaDto utilities works", () => {
  test("Can override media-urls", () => {
    const page1 = createPage({
      pageNumber: 1,
      audioUrl: "audio1_url",
      mainMedia: { type: "image", url: "image1_url", id: "image1_id" },
    });

    const page2 = createPage({
      pageNumber: 2,
      audioUrl: "audio2_url",
      mainMedia: { type: "video", url: "video2_url", id: "video2_id" },
    });
    const page3 = createPage({
      pageNumber: 3,
      audioUrl: "audio3_url",
      mainMedia: { type: "video", url: "video3_url", id: "video3_id" },
    });

    expect(page1.mainMedia?.file.downloadUrl).toBe("image1_url");
    expect(page1.mainText.audioFile && page1.mainText.audioFile.downloadUrl).toBe("audio1_url");
    expect(page2.mainMedia?.file.downloadUrl).toBe("video2_url");
    expect(page2.mainText.audioFile && page2.mainText.audioFile.downloadUrl).toBe("audio2_url");
    expect(page3.mainMedia?.file.downloadUrl).toBe("video3_url");
    expect(page3.mainText.audioFile && page3.mainText.audioFile.downloadUrl).toBe("audio3_url");
    const dto: BuilderSchemaDto = {
      id: SCHEMA_ID,
      prefix: SCHEMA_PREFIX_A,
      mainImage: false,
      backgroundColor: "#FFFFFF",
      name: "test-name",
      pages: [page1, page2, page3],
      baseHeight: 100,
      baseWidth: 100,
      rules: [],
      tags: [],
    };

    const newDto = BuilderSchemaDto.overrideAllMediaUrls(dto, {
      videoFilesBaseUrl: "base_url/video_folder",
      audioFilesBaseUrl: "base_url/audio_folder",
      imageFilesBaseUrl: "base_url/image_folder",
    });

    const pages = newDto.pages;
    const page1Media = pages[0].mainMedia;
    const page1Audio = pages[0].mainText.audioFile as AudioFile;
    const page2Media = pages[1].mainMedia;
    const page2Audio = pages[1].mainText.audioFile as AudioFile;
    const page3Media = pages[2].mainMedia;
    const page3Audio = pages[2].mainText.audioFile as AudioFile;

    expect(page1Media?.file.downloadUrl).toBe("base_url/image_folder/image1_id");
    expect(page1Media?.file.kind).toBe("image-file");
    expect(page1Audio.downloadUrl).toBe("base_url/audio_folder/audio1_id");
    expect(page2Media?.file.downloadUrl).toBe("base_url/video_folder/video2_id");
    expect(page2Media?.file.kind).toBe("video-file");
    expect(page2Audio.downloadUrl).toBe("base_url/audio_folder/audio2_id");
    expect(page3Media?.file.downloadUrl).toBe("base_url/video_folder/video3_id");
    expect(page3Media?.file.kind).toBe("video-file");
    expect(page3Audio.downloadUrl).toBe("base_url/audio_folder/audio3_id");
  });
});
