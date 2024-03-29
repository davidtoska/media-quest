import { BuilderObject } from "../../BuilderObject";
import { BuilderOperator } from "./Builder-operator";
import type { RuleVariable, RuleVariableOption } from "../RuleVariable";
import {
  OperatorSelectItem,
  RuleOptionSelectItem,
  RuleVariableSelectItem,
} from "../SingleSelectItem";
import { Condition } from "@media-quest/engine";
export interface BuilderConditionDto {
  readonly kind: "condition";
  readonly operator: BuilderOperator | "";
  readonly name: string;
  readonly variableId: string;
  readonly value: number | string | boolean;
}

export class BuilderCondition extends BuilderObject<"builder-condition", BuilderConditionDto> {
  readonly objectType: "builder-condition" = "builder-condition";
  public static readonly NUMBER_OPERATORS: ReadonlyArray<OperatorSelectItem> = [
    OperatorSelectItem.EQ,
    OperatorSelectItem.NOT_EQ,
  ];

  private initialDto: BuilderConditionDto;
  name = "";

  public static create = (variableList: ReadonlyArray<RuleVariable>) => {
    const condition = new BuilderCondition(
      {
        kind: "condition",
        name: "",
        operator: "",
        variableId: "",
        value: "",
      },
      variableList,
    );
    return condition;
  };

  public static fromDto = (dto: BuilderConditionDto, variables: ReadonlyArray<RuleVariable>) => {
    const _dto: BuilderConditionDto = {
      kind: "condition",
      name: dto.name ?? "",
      value: dto.value ?? "",
      operator: dto.operator ?? "",
      variableId: dto.variableId ?? "",
    };
    const instance = new BuilderCondition(_dto, variables);
    return instance;
  };
  private _variable: RuleVariable | false = false;
  private _operator: BuilderOperator | "" = "";
  private _value: RuleVariableOption | false = false;
  private _variableList: ReadonlyArray<RuleVariable> = [];

  /**
   * Can only set variables that exist in variableList.
   * @param variable
   */
  set variable(variable: RuleVariable | false) {
    if (variable === this._variable) {
      return;
    }
    this._variable = variable;
    this._operator = "";
    this._value = false;
  }

  get variable() {
    return this._variable;
  }

  set value(variableValue: RuleVariableOption | false) {
    this._value = variableValue;
  }
  get value() {
    return this._value;
  }

  validate(): { isValid: true } | { isValid: false; message: string } {
    if (this._variableList.length === 0) {
      return {
        isValid: false,
        message: "Has no variableList to check dto against.",
      };
    }
    if (!this._variable) {
      return {
        isValid: false,
        message: "Variable has not been initialized from variableList.",
      };
    }

    if (!this._operator) {
      return { isValid: false, message: "Operator has not been initialized" };
    }

    if (!this._value) {
      return {
        isValid: false,
        message: "Value (RuleVariableOption) is not initialized",
      };
    }

    return { isValid: true };
  }

  toEngineCondition(): Condition.Simple | false {
    const val = this.value;
    const op = this._operator;
    const v = this._variable;
    if (!val) return false;
    if (!op) return false;
    if (!v) return false;
    if (op === "equal") {
      const engineCondition: Condition.Simple = {
        kind: "numeric-condition",
        value: val.value,
        valueLabel: val.label,
        referenceId: v.varId,
        referenceLabel: v.label,
        operator: "eq",
      };
      return engineCondition;
    }
    return false;
  }

  private findVariableInUniverse(variableId: string): RuleVariable | false {
    const v = this._variableList.find((v) => v.varId === variableId);
    return v ?? false;
  }

  set operator(operator: BuilderOperator | "") {
    if (BuilderOperator.is(operator)) {
      this._operator = operator;
    } else {
      this._operator = "";
    }
  }

  get operator() {
    return this._operator;
  }

  private constructor(dto: BuilderConditionDto, variables: ReadonlyArray<RuleVariable>) {
    super(dto);
    this.initialDto = dto;
    this.name = dto.name;
    this._setVariableList(variables);
  }

  get variableSelectItemsInUniverse(): ReadonlyArray<RuleVariableSelectItem> {
    return this._variableList.map(RuleVariableSelectItem.create);
  }

  get operatorsSelectItems(): ReadonlyArray<OperatorSelectItem> {
    return this._variable ? BuilderCondition.NUMBER_OPERATORS : [];
  }

  get selectValueItems(): ReadonlyArray<RuleOptionSelectItem> {
    if (!this._variable) {
      return [];
    }
    const opt = this._variable.options.map(RuleOptionSelectItem.create);
    return opt;
  }

  clone(): BuilderConditionDto {
    return this.toJson();
  }

  private _setVariableList(variables: ReadonlyArray<RuleVariable>): boolean {
    this._variableList = variables;
    const v = this._variableList.find((v) => v.varId === this.originalDto.variableId);
    if (!v) {
      this._variable = false;
      this._operator = "";
      this._value = false;
      return false;
    }
    this._variable = v;
    const op = this.originalDto.operator;

    if (!BuilderOperator.is(op)) {
      return false;
    }
    this._operator = op;
    const maybeOption = v.options.find((op) => op.value === this.originalDto.value);
    if (!maybeOption) {
      return false;
    }
    this._value = maybeOption;
    return true;
  }

  toJson(): BuilderConditionDto {
    const name = this.name;
    const variableId = this._variable ? this._variable.varId : "";
    const operator = this._operator ? this._operator : "";
    const value = this._value ? this._value.value : "";
    return {
      kind: "condition",
      name,
      operator,
      variableId,
      value,
    };
  }
}
