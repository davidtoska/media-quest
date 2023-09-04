import { BuilderSchema, SchemaPrefix } from "@media-quest/builder";
import { IExampleSchema } from "./IExample-schema";
import { addQuestionPage109 } from "./helpers";
import { SchemaID } from "../../../packages/engine";

const s = BuilderSchema.create(SchemaID.create(), "Dummy-schema", SchemaPrefix.fromValueOrThrow("spu").value);

s.backgroundColor = "white";

// const addPage10 =
const p1 = addQuestionPage109(s, "Q1:\n (audio-auto-play=false)", "q1", {
  audio: true,
  autoplayAudio: false,
  video: false,
  autoplayVideo: false,
});

const p2 = addQuestionPage109(s, "Q2:\n (audio-autoplay=false) \n (video-autoplay=false)", "q2", {
  audio: true,
  autoplayAudio: false,
  video: true,
  autoplayVideo: false,
});

const questionAutoPlayPage = addQuestionPage109(s, "Q3:\n (audio-autoplay=true)", "q3", {
  audio: true,
  autoplayAudio: true,
  video: false,
  autoplayVideo: false,
});

const autoplayVideoAndAudio = addQuestionPage109(s, "Q4:\n (audio-autoplay=true) \n (video-autoplay=true)", "q4", {
  audio: true,
  autoplayAudio: true,
  video: true,
  autoplayVideo: true,
});

export const autoplayWorks: IExampleSchema = {
  menuLabel: "autoplay",
  schema: s.compile().schema,
};
