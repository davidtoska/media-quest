import * as B from "@media-quest/builder";
import { IExampleSchema } from "./IExample-schema";
import { addPage } from "./helpers";
import { DefaultThemeCompiler } from "../../../packages/builder/src/theme/default-theme-compiler";

const s = B.BuilderSchema.create(
  B.SchemaID.create(),
  "Dummy-schema",
  B.SchemaPrefix.fromValueOrThrow("spxx").value,
);
const theme2 = s.compile();

s.backgroundColor = "white";

addPage(s, "p1", "info-page")
  .withMainText("P1: Information page - No image\n  Text should be on top.")
  .addImage();

const compiler = new DefaultThemeCompiler();
compiler.setTheme(compiler.theme2);
const schema = compiler.compile(s.toJson());
export const redesignWorks: IExampleSchema = {
  menuLabel: "redesign",
  schema,
};
