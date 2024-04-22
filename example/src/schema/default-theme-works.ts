import * as B from "../../../packages/builder/src/public-api";
import { IExampleSchema } from "./IExample-schema";
import { addPage, addQuestionPage109 } from "./helpers";

const s = B.BuilderSchema.create(
  B.SchemaID.create(),
  "Dummy-schema",
  B.SchemaPrefix.fromValueOrThrow("def").value,
);

s.backgroundColor = "white";
addPage(s, "imgi", "info-page").withMainText("Bilde på på informasjonsside.").addAudio().addImage();
addPage(s, "ivi", "info-page")
  .withMainText("Video på informasjonsside.")

  .addAudio()
  .addVideo();

addPage(s, "xy", "question")
  .withMainText("Video på spørsmålsside.")

  .addAudio()
  .addVideo();

addPage(s, "p3", "info-page")
  .withMainText(
    "Blir teksen satt på midten? hvordan ser dette ut når det er en velig lang tekst ? Ok da sier vi det sånn. hei ppå deg",
  )
  .addAudio();
addPage(s, "a", "info-page")
  .withMainText(
    "InfoSide Tekst med bilde skal stå midt mellom bilde og knapper alaøkj ølaksdj faølksdjf ølakdsfj ølakdsjf øalkdsfj øakdsf aøkdsfølksdksf",
  )
  .addAudio()
  .addImage();

addPage(s, "b", "question")
  .withMainText(
    "SPØRSMÅLSSIDE  Tekst med bilde skal stå midt mellom bilde og knapper alaøkj ølaksdj faølksdjf ølakdsfj ølakdsjf øalkdsfj øakdsf aøkdsfølksdksf",
  )
  .addAudio()
  .addImage();

addPage(s, "c", "info-page")
  .withMainText(
    "INFOSIDE Uten noe bilde eller video, skal teksten stå oppe der bildet ville vært. ",
  )
  .addAudio();
export const defaultThemeWorks: IExampleSchema = {
  menuLabel: "Default theme works",
  schema: s.compile({
    blockAutoplayQuestion: false,
    blockAutoplayVideo: false,
    mediaAssets: null,
  }).schema,
};
