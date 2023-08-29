import { dummyAudioFiles, dummyVideoFiles } from "../dummy-data/hardcoded-media";
import { BuilderSchema } from "@media-quest/builder";
import { IExampleSchema } from "./IExample-schema";

const s = BuilderSchema.create("test", "Dummy-schema", "xy");

const audio = dummyAudioFiles[0];
const video = dummyVideoFiles[1];
s.backgroundColor = "white";
const q1 = s.addPage("question");
q1.defaultQuestion.addOption("Ja", 1);
q1.defaultQuestion.addOption("Nei", 0);
q1.defaultQuestion.addOption("Kanckje", 2);
q1.defaultQuestion.addOption("Vet ikke", 9);
q1.mainText.text = "Sjekk at lyd-avspilling virker: (auto-play=false)";

q1.mainText.audioFile = audio;
q1.mainText.autoplay = false;

const p1 = s.addPage("question");
p1.defaultQuestion.addOption("Ja", 1);
p1.defaultQuestion.addOption("Nei", 0);
p1.mainMedia = {
  kind: "main-video",
  mode: "optional",
  preDelay: 0,
  volume: 1,
  controls: false,
  file: video,
};
p1.mainText.text = "Sjekk at lyd-avspilling virker: (auto-play=false)";
p1.mainText.autoplay = false;

const questionAutoPlayPage = s.addPage("question");
questionAutoPlayPage.mainText.text = "Autoplay av spørsmål virker.";
questionAutoPlayPage.defaultQuestion.addOption("Ja", 1);
questionAutoPlayPage.defaultQuestion.addOption("Nei", 0);
questionAutoPlayPage.mainText.audioFile = audio;
questionAutoPlayPage.mainText.autoplay = true;

const autoplayVideoAndAudio = s.addPage("question", 3);
autoplayVideoAndAudio.mainText.text = "Autoplay Video og Audio virker.";
autoplayVideoAndAudio.defaultQuestion.addOption("Ja", 1);
autoplayVideoAndAudio.defaultQuestion.addOption("Nei", 0);
autoplayVideoAndAudio.defaultQuestion.addOption("Vet ikke", 9);
autoplayVideoAndAudio.mainText.audioFile = audio;
autoplayVideoAndAudio.mainText.autoplay = true;
autoplayVideoAndAudio.mainMedia = {
  kind: "main-video",
  file: video,
  controls: true,
  volume: 1,
  mode: "autoplay",
  preDelay: 2000,
};

export const autoplayWorks: IExampleSchema = {
  menuLabel: "autoplay",
  schema: s.compile().schema,
};
