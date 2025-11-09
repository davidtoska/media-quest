import { DefaultThemeCompiler } from "./default-theme-compiler";
import { BuilderSchema } from "../Builder-schema";
import { SchemaID } from "../primitives/ID";
import { SchemaPrefix } from "../primitives/schema-prefix";
import { Theme2 } from "./theme2";

let builder = BuilderSchema.create(
  SchemaID.create(),
  "test-schema",
  SchemaPrefix.fromValueOrThrow("prefix").value,
);

beforeEach(() => {
  builder = BuilderSchema.create(
    SchemaID.create(),
    "test-schema",
    SchemaPrefix.fromValueOrThrow("prefix").value,
  );
});
describe("Default Theme compiler works", () => {
  test("Dimensions from theme is used.", () => {
    const compiler = new DefaultThemeCompiler();
    compiler.setTheme(Theme2);
    builder.baseHeight = 100;
    builder.baseWidth = 100;

    const compiledSchema = compiler.compile(builder.toJson());
    expect(compiledSchema.baseHeight).toBe(Theme2.dimensions.baseHeight);
    expect(compiledSchema.baseWidth).toBe(Theme2.dimensions.baseWidth);
  });
});
