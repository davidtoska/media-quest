import { BuilderSchema, SchemaPrefix } from "@media-quest/builder";
import { IExampleSchema } from "./IExample-schema";
import { addPage, addQuestionPage109 } from "./helpers";
import { SchemaID } from "../../../packages/engine";

const s = BuilderSchema.create(SchemaID.create(), "Gif-mode-works", SchemaPrefix.fromValueOrThrow("spxx").value);

s.backgroundColor = "white";

addPage(s, "p1", "info-page").withMainText("Gif mode in next page");
addPage(s, "p2", "info-page").withMainText("Gifmode should work").addVideo("gif-mode");

console.log(s.toJson());
export const gifModeWorks: IExampleSchema = {
  menuLabel: "autoplay",
  schema: s.compile().schema,
};
