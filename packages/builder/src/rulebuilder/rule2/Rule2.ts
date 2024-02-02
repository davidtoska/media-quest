import { BuilderOperator } from "../condition/Builder-operator";
import { BuilderConditionDto } from "../condition/Builder-condition";
import { BuilderConditionGroupDto } from "../condition/Builder-condition-group";
import { BuilderRuleDto } from "../Builder-rule";

type SolveErrorReason =
  | "INVALID_FACT_TYPE"
  | "INVALID_OPERATOR"
  | "INVALID_VALUE"
  | "INVALID_VARIABLE"
  | "UNIMPLEMENTED_VARIABLE_TYPE"
  | "UNIMPLEMENTED_OPERATOR";

type TrueResult = { readonly type: "IS_TRUE" };
type FalseResult = { readonly type: "IS_FALSE" };
type MissingFactsResult = {
  readonly type: "MISSING_FACTS";
  readonly missingVariables: ReadonlyArray<string>;
};
type ErrorResult = {
  readonly type: "HAS_ERROR";
  readonly reason: SolveErrorReason;
  readonly data: Record<string, string>;
};

export type EvalResult = FalseResult | TrueResult | MissingFactsResult | ErrorResult;

export interface Fact2 {
  readonly variableType: "numeric";
  readonly value: number;
  readonly valueLabel: string;
  readonly variableId: string;
  readonly variableLabel: string;
}

export class FactCollection {
  public static isFact = (value: unknown): value is Fact2 => {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      return false;
    }
    const fact = value as Partial<Fact2>;
    if (typeof fact.variableId !== "string" || fact.variableId.length === 0) {
      return false;
    }
    if (typeof fact.variableLabel !== "string") {
      return false;
    }
    if (typeof fact.value !== "number") {
      return false;
    }
    if (typeof fact.valueLabel !== "string") {
      return false;
    }
    // NB: This is a temporary check until we have more sum-score types.
    if (typeof fact.variableType !== "string" || fact.variableType !== "numeric") {
      return false;
    }

    return true;
  };
  public static create = (facts: ReadonlyArray<Fact2>): FactCollection => {
    return new FactCollection(facts);
  };

  private readonly _facts: ReadonlyArray<Fact2>;

  private constructor(facts: ReadonlyArray<Fact2>) {
    if (!Array.isArray(facts)) {
      console.log("Invalid facts", facts);
      this._facts = [];
    } else {
      this._facts = [...facts];
    }
  }
  byId(variableId: string): Fact2 | false {
    const result = this._facts.find((fact) => fact.variableId === variableId);
    if (!result) {
      return false;
    }
    return { ...result };
  }
}
interface FactEvaluator {
  isTrue(facts: FactCollection): boolean;
  evaluate(facts: FactCollection): EvalResult;
}
interface IsValid {
  isValid(): boolean;
}
export class Condition implements FactEvaluator, IsValid {
  public static create = (dto: BuilderConditionDto): Condition => {
    return new Condition(dto);
  };
  private constructor(private readonly dto: BuilderConditionDto) {}
  isTrue(facts: FactCollection): boolean {
    const dto = this.dto;
    const op = dto.operator;
    const value = dto.value;
    const varId = dto.variableId;
    if (!BuilderOperator.is(op)) {
      return false;
    }

    if (typeof value !== "number") {
      return false;
    }

    const fact = facts.byId(this.dto.variableId);

    if (!FactCollection.isFact(fact)) {
      return false;
    }

    if (fact.variableType !== "numeric" && typeof fact.value !== "number") {
      return false;
    }

    if (op === "equal") {
      return fact.value === value;
    }

    if (op === "notEqual") {
      return fact.value !== value;
    }

    return false;
  }
  isValid(): boolean {
    return false;
  }

  evaluate(facts: FactCollection): EvalResult {
    return { type: "HAS_ERROR", reason: "UNIMPLEMENTED_VARIABLE_TYPE", data: {} }; // TODO
  }
}
export class ConditionGroup implements FactEvaluator, IsValid {
  public static readonly create = (dto: BuilderConditionGroupDto): ConditionGroup => {
    return new ConditionGroup(dto);
  };

  private readonly _conditions: ReadonlyArray<Condition>;
  private constructor(private readonly dto: BuilderConditionGroupDto) {
    this._conditions = dto.conditions.map(Condition.create);
  }

  isTrue(facts: FactCollection): boolean {
    const results = this._conditions.map((condition) => condition.isTrue(facts));
    let trueCount = 0;
    let falseCount = 0;
    results.forEach((results) => {
      if (results) {
        trueCount++;
      } else {
        falseCount++;
      }
    });
    if (trueCount === 0 || falseCount === 0) {
      return false;
    }
    const type = this.dto.type;

    if (type === "all" && trueCount === this._conditions.length) {
      return true;
    }

    if (type === "any" && trueCount > 0) {
      return true;
    }

    const minLimit = this.dto.count;
    return type === "count" && typeof minLimit === "number" && trueCount >= minLimit;
  }

  isValid(): boolean {
    return true;
  }

  evaluate(facts: FactCollection): EvalResult {
    return { type: "HAS_ERROR", reason: "UNIMPLEMENTED_VARIABLE_TYPE", data: {} }; // TODO
  }
}
export class Rule2 implements FactEvaluator {
  readonly name: string;
  private readonly _conditions: ReadonlyArray<Condition | ConditionGroup>;
  public static readonly create = (dto: BuilderRuleDto): Rule2 => {
    return new Rule2(dto);
  };
  private _count = -1;
  constructor(private readonly dto: BuilderRuleDto) {
    this.name = dto.name;
    const conditions: Array<Condition | ConditionGroup> = [];
    dto.conditions.forEach((condition) => {
      if (condition.kind === "condition-group") {
        conditions.push(ConditionGroup.create(condition));
      } else if (condition.kind === "condition") {
        conditions.push(Condition.create(condition));
      } else {
        console.log("Unknown condition", condition);
      }
    });
    this._conditions = conditions;
  }

  isTrue(facts: FactCollection): boolean {
    return false;
  }

  evaluate(facts: FactCollection): EvalResult {
    return { type: "HAS_ERROR", reason: "UNIMPLEMENTED_VARIABLE_TYPE", data: {} }; // TODO
  }
}
