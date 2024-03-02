import { CodebookPredefinedVariable } from "./code-book/codebook-variable";

import { BuilderSchemaDto } from "./Builder-schema-dto";

/**
 * This interface is ment to define all information that a schema-admin app
 * needs to generate a dynamic form for setting values for predefined variables.
 */
export interface SchemaConfig {
  readonly schemaName: string;
  readonly schemaId: string;
  readonly schemaPrefix: string;
  readonly variables: ReadonlyArray<CodebookPredefinedVariable>;
}

export const SchemaConfig = {
  fromSchema: (schema: BuilderSchemaDto): SchemaConfig => {
    const variables = schema.predefinedVariables ?? [];
    return {
      schemaId: schema.id,
      schemaName: schema.name,
      schemaPrefix: schema.prefix,
      variables,
    };
  },
} as const;
