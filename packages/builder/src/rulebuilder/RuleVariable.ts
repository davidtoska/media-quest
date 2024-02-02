import { VarID } from "../primitives/varID";

/*******************************************
 ** ONLY USE THESE TYPES IN RULE-BUILDER  **
 ******************************************/

export class RuleVariableOption {
  constructor(
    readonly label: string,
    readonly value: number,
  ) {}
}

export class RuleQuestionVariable {
  readonly kind: "question-variable" = "question-variable";
  constructor(
    readonly varId: VarID,
    readonly label: string,
    readonly options: ReadonlyArray<RuleVariableOption>,
    readonly pageNumber: number,
  ) {}
}

export class RuleCustomVariable {
  readonly kind: "configuration-variable" = "configuration-variable";
  constructor(
    readonly varId: string,
    readonly label: string,
    readonly options: ReadonlyArray<RuleVariableOption>,
  ) {}
}

// export class RuleVariable {}
export type RuleVariable = RuleQuestionVariable | RuleCustomVariable;
