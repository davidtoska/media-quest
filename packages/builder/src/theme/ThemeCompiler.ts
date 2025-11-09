import type { BuilderSchemaDto } from "../Builder-schema";
import { SchemaDto } from "@media-quest/engine";

export interface ThemeCompiler<ThemeSchema> {
  currentTheme: ThemeSchema;
  allThemes: ThemeSchema[];
  setTheme(theme: ThemeSchema): void;
  // protected constructor(protected readonly theme: ThemeSchema) {}
  compile(schema: BuilderSchemaDto): SchemaDto;
}
