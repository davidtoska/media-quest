import * as B from "../../../packages/builder/src/public-api";
import { addPage, addQuestionPage109 } from "./helpers";

const schema = B.BuilderSchema.create(
  B.SchemaID.create(),
  "Test Schema",
  B.SchemaPrefix.fromValueOrThrow("test").value,
);

const p1 = addPage(schema, "p1", "question");
p1.addAudio(true, 1000);
p1.addVideo("autoplay", 1000);
const p2 = addPage(schema, "p1", "question");
p2.addImage().build();

const json = schema.compile({
  blockAutoplayQuestion: false,
  blockAutoplayVideo: false,
  mediaAssets: {
    audioFilesBaseUrl: "mindme.health/audio-files",
    videoFilesBaseUrl: "mindme.health/video-files",
    imageFilesBaseUrl: "mindme.health/image-files",
    fileNameStrategy: "id",
  },
});
const pages = json.schema.pages;
console.log(pages);
export const overrideMediaPathsWorks = {
  dto: schema.toJson(),
};

// addQuestionPage109(schema, "q1", "p1", {audio: true, video: true, image: true});
// const p1 = schema.addPage("question");
// const p2 = schema.addPage("question");
// const p3 = schema.addPage("question");
