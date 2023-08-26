import type { BuilderSchemaDto } from "../Builder-schema";
import { SchemaDto } from "@media-quest/engine";

export abstract class AbstractThemeCompiler<ThemeSchema> {
  protected constructor(protected readonly theme: ThemeSchema) {}
  abstract compile(schema: BuilderSchemaDto): SchemaDto;
}
