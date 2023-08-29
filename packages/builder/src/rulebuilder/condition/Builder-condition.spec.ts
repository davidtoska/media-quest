import { BuilderCondition, type BuilderConditionDto } from "./Builder-condition";
import { RuleBuilderTestUtils } from "../RuleBuilder-test-utils";
import type { BuilderVariable, BuilderVariableOption } from "../RuleVariable";
import { QuestionVariable } from "../RuleVariable";

let condition = BuilderCondition.create([]);

beforeEach(() => {
  condition = BuilderCondition.create([]);
});

describe("Builder Operator", () => {
  test("Can create", () => {
    expect(condition).toBeInstanceOf(BuilderCondition);
  });
  test("Can resolve dto from Variables in universe.", () => {
    const vs = RuleBuilderTestUtils.createBuilderVariables_A_H();
    const a = vs[0];
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "a",
      variableId: a.varId,
      operator: "equal",
      value: 1,
    };
    const c = BuilderCondition.fromDto(dto, vs);
    // c.setVariableList(vs);
    expect(c.operatorsSelectItems.length).toBe(2);
    expect(c.operator === "equal").toBe(true);
    expect(c.value).toBeTruthy();
  });
  test("Can not resolve value if invalid value", () => {
    const vs = RuleBuilderTestUtils.createBuilderVariables_A_H();
    const a = vs[0];
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "a",
      variableId: a.varId,
      operator: "equal",
      value: 8,
    };
    const c = BuilderCondition.fromDto(dto, vs);
    expect(c.operatorsSelectItems.length).toBe(2);
    expect(c.value).toBe(false);
    // expect(match).toBe(false);
  });
  test("Will nullify dto if not matchedFrom is called", () => {
    const vs = RuleBuilderTestUtils.createBuilderVariables_A_H();
    const a = vs[0];
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "a",
      variableId: a.varId,
      operator: "equal",
      value: 0,
    };
    const c = BuilderCondition.fromDto(dto, []);
    expect(c.operatorsSelectItems.length).toBe(0);
    expect(c.toJson().name).toBe(dto.name);
    expect(c.toJson().value).toBe("");
    expect(c.toJson().operator).toBe("");
    expect(c.toJson().variableId).toBe("");
    // expect(match).toBe(false);
  });
  test("Will not nullify if created with valid universe", () => {
    const vs = RuleBuilderTestUtils.createBuilderVariables_A_H();
    const a = vs[0];
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "a",
      variableId: a.varId,
      operator: "equal",
      value: 0,
    };
    const c = BuilderCondition.fromDto(dto, vs);
    expect(c.variable).toBeInstanceOf(QuestionVariable);
    expect(c.operator === "equal").toBe(true);
    const value = c.value as BuilderVariableOption;
    expect(value.value).toBe(0);
    expect(value.label).toBe("Nei");
    expect(c.variable).toBe(a);
  });
  test("Condition is valid, when in sync with universe.", () => {
    const vs = RuleBuilderTestUtils.createBuilderVariables_A_H();
    const a = vs[0];
    const dto: BuilderConditionDto = {
      kind: "condition",

      name: "name of a",
      variableId: a.varId,
      operator: "equal",
      value: 0,
    };
    const c = BuilderCondition.fromDto(dto, vs);
    expect(c.variable).toBeInstanceOf(QuestionVariable);
    expect(c.operator === "equal").toBe(true);
    const value = c.value as BuilderVariableOption;
    expect(value.value).toBe(0);
    expect(value.label).toBe("Nei");
    expect(c.validate().isValid).toBe(true);
  });
  test("Condition is invalid, when not matched against universe", () => {
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "name of a",
      variableId: "a",
      operator: "equal",
      value: 0,
    };
    const c = BuilderCondition.fromDto(dto, []);
    expect(c.validate().isValid).toBe(false);
  });
  test("Condition is invalid, when variable dont exist in universe.", () => {
    const universe = RuleBuilderTestUtils.createBuilderVariables_A_H();
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "invalid variable name in dto",
      variableId: "kkk",
      operator: "equal",
      value: 9,
    };
    const c = BuilderCondition.fromDto(dto, universe);
    expect(c.variable).toBe(false);
    expect(c.validate().isValid).toBe(false);
  });
  test("Condition is invalid if not all set, when variable dont exist in universe.", () => {
    const universe = RuleBuilderTestUtils.createBuilderVariables_A_H();
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "invalid variable name in dto",
      variableId: "kkk",
      operator: "equal",
      value: 9,
    };
    const c = BuilderCondition.fromDto(dto, universe);
    expect(c.variable).toBe(false);
    expect(c.validate().isValid).toBe(false);
  });
  test("Condition is invalid if operator is not set", () => {
    const universe = RuleBuilderTestUtils.createBuilderVariables_A_H();
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "invalid variable name in dto",
      variableId: "a",
      operator: "",
      value: 1,
    };
    const c = BuilderCondition.fromDto(dto, universe);
    expect(c.variable).toBeInstanceOf(QuestionVariable);
    expect(c.validate().isValid).toBe(false);
    expect(c.value).toBe(false);
  });
  test("Condition is invalid if value (from dto) is not found in variable", () => {
    const universe = RuleBuilderTestUtils.createBuilderVariables_A_H();
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "invalid variable name in dto",
      variableId: "a",
      operator: "equal",
      value: 7,
    };
    const c = BuilderCondition.fromDto(dto, universe);
    expect(c.variable).toBeInstanceOf(QuestionVariable);
    expect(c.operator).toBe("equal");
    expect(c.operatorsSelectItems.length).toBe(BuilderCondition.NUMBER_OPERATORS.length);
    expect(c.value).toBe(false);
    expect(c.validate().isValid).toBe(false);
  });
  test("toEngineConditionWorks", () => {
    const universe = RuleBuilderTestUtils.createBuilderVariables_A_H();
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "invalid variable name in dto",
      variableId: "a",
      operator: "equal",
      value: 7,
    };
    const c = BuilderCondition.fromDto(dto, universe);
    expect(c.variable).toBeInstanceOf(QuestionVariable);
    expect(c.operator).toBe("equal");
    expect(c.operatorsSelectItems.length).toBe(BuilderCondition.NUMBER_OPERATORS.length);
    expect(c.value).toBe(false);
    expect(c.validate().isValid).toBe(false);
  });
});
