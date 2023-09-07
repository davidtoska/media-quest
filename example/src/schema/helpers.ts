import { BuilderPage, BuilderSchema, PagePrefix, PagePrefixValue } from "@media-quest/builder";
import { dummyAudioFiles, dummyImageFiles, dummyVideoFiles } from "../dummy-data/hardcoded-media";
const audio = dummyAudioFiles[0];
const video = dummyVideoFiles[1];
const image = dummyImageFiles[0];

export const addPage = (schema: BuilderSchema, prefix: string, type: "question" | "info-page" = "question") =>
  new PageBuilder(schema, prefix, type);

class PageBuilder {
  private readonly page: BuilderPage;
  constructor(
    private readonly schema: BuilderSchema,
    prefix: string,
    type: "question" | "info-page" = "question",
  ) {
    this.page = schema.addPage(type);
    const prefixCasted = PagePrefix.fromStringOrThrow(prefix);
    this.page.prefix = prefixCasted;
    if (type === "question") {
      this.page.defaultQuestion.addOption("Ja", 1);
      this.page.defaultQuestion.addOption("Nei", 0);
      this.page.defaultQuestion.addOption("Vet ikke", 9);
    } else {
      this.page.nextButton.label = "Neste";
    }
  }
  addAudio(autoplay = false) {
    this.page.mainText.audioFile = audio;
    this.page.mainText.autoplay = autoplay;
    return this;
  }
  addVideo(mode: "autoplay" | "optional" | "gif-mode" = "optional", preDelay = 1000) {
    this.page.mainMedia = {
      kind: "main-video",
      file: video,
      controls: false,
      volume: 1,
      mode,
      preDelay: 1000,
    };
    return this;
  }
  public withMainText(text: string) {
    this.page.mainText.text = text;
    return this;
  }
  addImage() {
    this.page.mainMedia = {
      kind: "main-image",
      file: image,
      overlay: false,
    };
    return this;
  }
  build() {
    return this.page;
  }
}
export const addQuestionPage109 = (
  schema: BuilderSchema,
  question: string,
  pagePrefix: string,
  options?: { audio: boolean; autoplayAudio: boolean; video: boolean; autoplayVideo: boolean },
) => {
  const questionPage = schema.addPage("question");
  questionPage.mainText.text = question;
  questionPage.defaultQuestion.addOption("Ja", 1);
  questionPage.defaultQuestion.addOption("Nei", 0);
  questionPage.defaultQuestion.addOption("Vet ikke", 9);
  const prefix = PagePrefix.fromStringOrThrow(pagePrefix);
  questionPage.prefix = prefix;
  if (options?.audio) {
    questionPage.mainText.audioFile = audio;
    questionPage.mainText.autoplay = options.autoplayAudio;
  }
  if (options?.video) {
    questionPage.mainMedia = {
      kind: "main-video",
      file: video,
      controls: false,
      volume: 1,
      mode: options.autoplayVideo ? "autoplay" : "optional",
      preDelay: 2000,
    };
  }
  return questionPage;
};
