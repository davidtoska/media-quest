import { BuilderCondition, type BuilderConditionDto } from "./Builder-condition";
import { BuilderObject } from "../../BuilderObject";
import type { BuilderVariable } from "../RuleVariable";
import { Condition } from "@media-quest/engine";

const ConditionGroupType = {
  all: true,
  any: true,
  count: true,
};

export type ConditionGroupType = keyof typeof ConditionGroupType;
export interface BuilderConditionGroupDto {
  readonly kind: "condition-group";
  readonly name: string;
  readonly count?: number;
  readonly type: ConditionGroupType;
  readonly conditions: ReadonlyArray<BuilderConditionDto>;
}

export class BuilderConditionGroup extends BuilderObject<"builder-condition-group", BuilderConditionGroupDto> {
  static readonly isConditionGroupType = (value: string | symbol): value is ConditionGroupType => {
    if (typeof value !== "string") {
      return false;
    }
    const validValues = Object.keys(ConditionGroupType);
    return validValues.includes(value);
  };

  readonly objectType: "builder-condition-group" = "builder-condition-group";
  private _type: ConditionGroupType;
  name = "";
  private readonly _conditions: Array<BuilderCondition>;
  private readonly _variableList: ReadonlyArray<BuilderVariable>;

  public static readonly fromDto = (dto: BuilderConditionGroupDto, variableList: ReadonlyArray<BuilderVariable>) => {
    return new BuilderConditionGroup(dto, variableList);
  };
  protected constructor(dto: BuilderConditionGroupDto, variableList: ReadonlyArray<BuilderVariable>) {
    super(dto);
    this.name = dto.name;
    this._type = dto.type;
    const conditionList = Array.isArray(dto.conditions) ? dto.conditions : [];
    this._conditions = conditionList.map((dto) => BuilderCondition.fromDto(dto, variableList));
    this._variableList = variableList;
  }
  get conditions(): ReadonlyArray<BuilderCondition> {
    return this._conditions;
  }

  get conditionCount() {
    return this._conditions.length;
  }

  addCondition(): BuilderCondition {
    const newConditions = BuilderCondition.create(this._variableList);
    this._conditions.push(newConditions);
    return newConditions;
  }

  removeCondition(condition: BuilderCondition): boolean {
    // this._conditions.
    const index = this._conditions.indexOf(condition);
    if (index < 0) {
      return false;
    }
    this._conditions.splice(index, 1);
    return true;
  }

  clone(): BuilderConditionGroupDto {
    return this.toJson();
  }

  toJson(): BuilderConditionGroupDto {
    const conditions: ReadonlyArray<BuilderConditionDto> = [...this._conditions.map((c) => c.toJson())];
    return {
      name: this.name,
      conditions,
      type: this._type,
      kind: "condition-group",
    };
  }

  toEngineConditionComplex(modulePrefix: string): Condition.Complex | false {
    const comp: Condition.Complex = {
      kind: "complex-condition",
      all: [],
      some: [],
      name: "",
    };
    const conditions: Condition.Simple[] = [];
    this.conditions.forEach((c) => {
      const maybeSimple = c.toEngineCondition(modulePrefix);
      if (maybeSimple) {
        conditions.push(maybeSimple);
      }
    });
    if (this._type === "all") {
      return { ...comp, all: conditions };
    }
    if (this._type === "any") {
      return { ...comp, some: conditions };
    }

    console.log("INVALID COMPLEX CONDITION. TODO IMPLEMENT range, and count.");

    return false;
  }
  get type(): ConditionGroupType {
    return this._type;
  }
  set type(conditionGroupType: ConditionGroupType) {
    if (BuilderConditionGroup.isConditionGroupType(conditionGroupType)) {
      this._type = conditionGroupType;
    }
  }
}
