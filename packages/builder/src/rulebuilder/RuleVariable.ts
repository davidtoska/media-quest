const BuilderVariableType = {
  numericWithOptions: true,
  numericRange: true,
  text: true,
  date: true,
  dateRange: true,
  time: true,
  duration: true,
  boolean: true
} as const;

type BuilderVariableType = keyof typeof BuilderVariableType;

export class BuilderVariableOption {
  constructor(readonly label: string, readonly value: number) {}
}

export class QuestionVariable {
  readonly kind: 'question-variable' = 'question-variable';
  readonly dataType: BuilderVariableType = 'numericWithOptions';
  constructor(
    readonly varId: string,
    readonly label: string,
    readonly options: ReadonlyArray<BuilderVariableOption>,
    readonly pageNumber: number
  ) {}
}

export class CustomVariable {
  readonly kind: 'configuration-variable' = 'configuration-variable';
  readonly dataType: BuilderVariableType = 'numericWithOptions';
  constructor(
    readonly varId: string,
    readonly label: string,
    readonly options: ReadonlyArray<BuilderVariableOption>
  ) {}
}

export type BuilderVariable = QuestionVariable | CustomVariable;
