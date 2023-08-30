import { BuilderSchema } from "@media-quest/builder";
import { IExampleSchema } from "./IExample-schema";
import { addPage } from "./helpers";

const s = BuilderSchema.create("infopage-test-id", "Dummy-schema", "inf2");

s.backgroundColor = "white";

addPage(s, "p1", "P1: Information page - No image\n  Text should be on top.", "info-page");
addPage(s, "p2", "P2: Information page - With image\n  Text should be bottom.", "info-page").addImage();
addPage(s, "p3", "P3: Question page No Image -> Text up.", "question");
addPage(s, "p4", "P3: Question With image -> Text down.", "question").addImage();
export const infopageWorks: IExampleSchema = {
  menuLabel: "infopage",
  schema: s.compile().schema,
};
