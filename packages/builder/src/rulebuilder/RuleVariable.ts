import { PagePrefix } from "../primitives/page-prefix";
import { VarID } from "../primitives/varID";
import { SchemaPrefix } from "../primitives/schema-prefix";

const BuilderVariableType = {
  numericWithOptions: true,
  numeric: true,
  numericRange: true,
  text: true,
  date: true,
  dateRange: true,
  time: true,
  duration: true,
  boolean: true,
} as const;

export type BuilderVariableType = keyof typeof BuilderVariableType;

export class BuilderVariableOption {
  constructor(
    readonly label: string,
    readonly value: number,
  ) {}
}

export class QuestionVariable {
  readonly kind: "question-variable" = "question-variable";
  readonly dataType: BuilderVariableType = "numericWithOptions";
  constructor(
    // private schemaPrefix: SchemaPrefix,
    // private pagePrefix: PagePrefix,
    readonly varId: VarID,
    readonly label: string,
    readonly options: ReadonlyArray<BuilderVariableOption>,
    readonly pageNumber: number,
  ) {}
}

export class CustomVariable {
  readonly kind: "configuration-variable" = "configuration-variable";
  readonly dataType: BuilderVariableType = "numericWithOptions";
  constructor(
    readonly varId: VarID,
    readonly label: string,
    readonly options: ReadonlyArray<BuilderVariableOption>,
  ) {}
}

export type BuilderVariable = QuestionVariable | CustomVariable;
