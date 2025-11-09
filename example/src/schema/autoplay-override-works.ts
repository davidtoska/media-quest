import * as B from "../../../packages/builder/src/public-api";
import { IExampleSchema } from "./IExample-schema";
import { addQuestionPage109 } from "./helpers";

const s = B.BuilderSchema.create(
  B.SchemaID.create(),
  "Dummy-schema",
  B.SchemaPrefix.fromValueOrThrow("spu").value,
);

s.backgroundColor = "white";

// const addPage10 =
addQuestionPage109(s, "Q1: Start-page", "q1", {
  audio: true,
  autoplayAudio: false,
  audioDelay: 0,
  video: true,
  autoplayVideo: false,
  videoDelay: 0,
});

addQuestionPage109(s, "Q2: Override autoplay question", "q2", {
  audio: true,
  autoplayAudio: true,
  audioDelay: 0,
  video: true,
  autoplayVideo: true,
  videoDelay: 0,
});

addQuestionPage109(s, "Q3: Override autoplay video", "q3", {
  audio: true,
  autoplayAudio: true,
  audioDelay: 0,
  video: true,
  autoplayVideo: true,
  videoDelay: 0,
});

const autoplayVideoAndAudio = addQuestionPage109(s, "Q4: Override both", "q4", {
  audio: true,
  autoplayAudio: true,
  audioDelay: 0,
  video: true,
  autoplayVideo: true,
  videoDelay: 0,
});

export const autoplayOverrideWorks: IExampleSchema = {
  menuLabel: "autoplay-override",
  schema: s.compile({ blockAutoplayQuestion: true, blockAutoplayVideo: true }).schema,
};
