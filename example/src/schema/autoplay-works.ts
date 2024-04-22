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
const p1 = addQuestionPage109(
  s,
  "Q1:\n (audio-auto-play=false) skal bare sjekke hvor stor plass denne teksten tar dersom jeg har makismalt antall tegn. ",
  "q1",
  {
    audio: true,
    autoplayAudio: false,
    audioDelay: 0,
    video: true,
    autoplayVideo: false,
    videoDelay: 0,
  },
);

const p2 = addQuestionPage109(s, "Q2:\n (audio-autoplay=false) \n (video-autoplay=false)", "q2", {
  audio: true,
  autoplayAudio: false,
  audioDelay: 0,
  video: true,
  autoplayVideo: false,
  videoDelay: 0,
});

const questionAutoPlayPage = addQuestionPage109(s, "Q3:\n (audio-autoplay=true)", "q3", {
  audio: true,
  autoplayAudio: true,
  audioDelay: 0,
  video: false,
  autoplayVideo: false,
  videoDelay: 0,
});

const autoplayVideoAndAudio = addQuestionPage109(
  s,
  "Q4:\n (audio-autoplay=true) \n (video-autoplay=true)",
  "q4",
  {
    audio: true,
    autoplayAudio: true,
    audioDelay: 0,
    video: true,
    autoplayVideo: true,
    videoDelay: 0,
  },
);
addQuestionPage109(
  s,
  "Q5:\n (audio-autoplay=true, delay: 2000) \n (video-autoplay=true), delay: 2000",
  "q4",
  {
    audio: true,
    autoplayAudio: true,
    audioDelay: 2000,
    video: true,
    autoplayVideo: true,
    videoDelay: 2000,
  },
);

export const autoplayWorks: IExampleSchema = {
  menuLabel: "autoplay",
  schema: s.compile({ blockAutoplayQuestion: false, blockAutoplayVideo: false, mediaAssets: null })
    .schema,
};
