import * as B from "../../../packages/builder/src/public-api";
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

addPage(s, "p1", "question").withMainText("P1: VIDEO").addImage().addVideo("optional").addAudio();
addPage(s, "p2", "question").withMainText("P2: IMAGE").addImage().addAudio();
addPage(s, "p3", "info-page")
  .withMainText("P2: Information page - No image\n  Text should be on top.")
  .addImage();

const compiler = new DefaultThemeCompiler();
compiler.setTheme(compiler.theme2);
const schema = compiler.compile(s.toJson());
export const redesignWorks: IExampleSchema = {
  menuLabel: "redesign",
  schema,
};
