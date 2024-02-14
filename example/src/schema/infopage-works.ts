import * as B from "@media-quest/builder";
import { IExampleSchema } from "./IExample-schema";
import { addPage } from "./helpers";

const s = B.BuilderSchema.create(
  B.SchemaID.create(),
  "Dummy-schema",
  B.SchemaPrefix.fromValueOrThrow("spxx").value,
);

s.backgroundColor = "white";

addPage(s, "p1", "info-page")
  .withMainText("P1: Information page - No image\n  Text should be on top.")
  .addAudio();
addPage(s, "p2", "info-page")
  .addImage()
  .addAudio()
  .withMainText("P2: Information page - With image\n  Text should be bottom.");
addPage(s, "p3", "question").withMainText("P3: Question page No Image -> Text up.");
addPage(s, "p4", "question").addImage().withMainText("P3: Question With image -> Text down.");
export const infopageWorks: IExampleSchema = {
  menuLabel: "infopage",
  schema: s.compile().schema,
};
