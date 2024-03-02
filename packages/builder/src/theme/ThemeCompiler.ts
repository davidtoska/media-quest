import { SchemaDto } from "@media-quest/engine";
import { CompilerOption } from "../builder-compiler";
import { BuilderSchemaDto } from "../Builder-schema-dto";

export interface ThemeCompiler<ThemeSchema> {
  currentTheme: ThemeSchema;
  allThemes: ThemeSchema[];
  setTheme(theme: ThemeSchema): void;
  // protected constructor(protected readonly theme: ThemeSchema) {}
  compile(schema: BuilderSchemaDto): SchemaDto;
}
