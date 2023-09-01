import { BuilderCondition, type BuilderConditionDto } from "./Builder-condition";
import { RuleBuilderTestUtils } from "../RuleBuilder-test-utils";
import type { BuilderVariable, BuilderVariableOption } from "../RuleVariable";
import { QuestionVariable } from "../RuleVariable";

import { SchemaPrefix } from "../../primitives/schema-prefix";

let condition = BuilderCondition.create([]);

beforeEach(() => {
  condition = BuilderCondition.create([]);
});

const as = SchemaPrefix.fromValueOrThrow("as");

describe("Builder Operator", () => {
  test("Can create", () => {
    expect(condition).toBeInstanceOf(BuilderCondition);
  });
  test("Can resolve dto from Variables in universe.", () => {
    const vs = RuleBuilderTestUtils.createPagesAndVars_A_H(as);
    const a = vs.items.a;
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "a",
      variableId: a.varId,
      operator: "equal",
      value: 1,
    };
    const c = BuilderCondition.fromDto(dto, vs.list);
    // c.setVariableList(vs);
    expect(c.operatorsSelectItems.length).toBe(2);
    expect(c.operator === "equal").toBe(true);
    expect(c.value).toBeTruthy();
  });
  test("Can not resolve value if invalid value", () => {
    const vs = RuleBuilderTestUtils.createPagesAndVars_A_H(as);
    const a = vs.items.a;
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "a",
      variableId: a.varId,
      operator: "equal",
      value: 8,
    };
    const c = BuilderCondition.fromDto(dto, vs.list);
    expect(c.operatorsSelectItems.length).toBe(2);
    expect(c.value).toBe(false);
    // expect(match).toBe(false);
  });
  test("Will nullify dto if not matchedFrom is called", () => {
    const vs = RuleBuilderTestUtils.createPagesAndVars_A_H(as);
    const a = vs.items.a;
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
    const vs = RuleBuilderTestUtils.createPagesAndVars_A_H(as);
    const a = vs.items.a;
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "a",
      variableId: a.varId,
      operator: "equal",
      value: 0,
    };
    const c = BuilderCondition.fromDto(dto, vs.list);
    expect(c.variable).toBeInstanceOf(QuestionVariable);
    expect(c.operator === "equal").toBe(true);
    const value = c.value as BuilderVariableOption;
    expect(value.value).toBe(0);
    expect(value.label).toBe("Nei");
    expect(c.variable).toBe(a);
  });
  test("Condition is valid, when in sync with universe.", () => {
    const vs = RuleBuilderTestUtils.createPagesAndVars_A_H(as);
    const a = vs.items.a;
    const dto: BuilderConditionDto = {
      kind: "condition",

      name: "name of a",
      variableId: a.varId,
      operator: "equal",
      value: 0,
    };
    const c = BuilderCondition.fromDto(dto, vs.list);
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
    const variables = RuleBuilderTestUtils.createPagesAndVars_A_H(as);
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "invalid variable name in dto",
      variableId: "kkk",
      operator: "equal",
      value: 9,
    };
    const c = BuilderCondition.fromDto(dto, variables.list);
    expect(c.variable).toBe(false);
    expect(c.validate().isValid).toBe(false);
  });
  test("Condition is invalid if not all set, when variable dont exist in variables.", () => {
    const variables = RuleBuilderTestUtils.createPagesAndVars_A_H(as);
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "invalid variable name in dto",
      variableId: "kkk",
      operator: "equal",
      value: 9,
    };
    const c = BuilderCondition.fromDto(dto, variables.list);
    expect(c.variable).toBe(false);
    expect(c.validate().isValid).toBe(false);
  });

  test("Condition is invalid if operator is not set", () => {
    const variables = RuleBuilderTestUtils.createPagesAndVars_A_H(as);
    const a = variables.items.a;
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "invalid variable name in dto",
      variableId: a.varId,
      operator: "",
      value: 1,
    };
    expect(a.varId).toBe("as_a");
    const c = BuilderCondition.fromDto(dto, variables.list);
    expect(c.variable).toBeInstanceOf(QuestionVariable);
    expect(c.validate().isValid).toBe(false);
    expect(c.value).toBe(false);
  });
  test("Condition is invalid if value (from dto) is not found in variable", () => {
    const { list, items } = RuleBuilderTestUtils.createPagesAndVars_A_H(as);
    expect(items.a.varId).toBe("as_a");
    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "invalid variable name in dto",
      variableId: items.a.varId,
      operator: "equal",
      value: 42,
    };
    const c = BuilderCondition.fromDto(dto, list);
    expect(c).toBeInstanceOf(BuilderCondition);
    expect(c.variable).toBeInstanceOf(QuestionVariable);
    expect(c.operator).toBe("equal");
    expect(c.operatorsSelectItems.length).toBe(BuilderCondition.NUMBER_OPERATORS.length);
    expect(c.value).toBe(false);
    expect(c.validate().isValid).toBe(false);
  });
  test("toEngineConditionWorks", () => {
    const variables = RuleBuilderTestUtils.createPagesAndVars_A_H(as);

    const dto: BuilderConditionDto = {
      kind: "condition",
      name: "invalid variable name in dto",
      variableId: variables.items.a.varId,
      operator: "equal",
      value: 7,
    };
    const c = BuilderCondition.fromDto(dto, variables.list);
    expect(c.variable).toBeInstanceOf(QuestionVariable);
    expect(c.operator).toBe("equal");
    expect(c.operatorsSelectItems.length).toBe(BuilderCondition.NUMBER_OPERATORS.length);
    expect(c.value).toBe(false);
    expect(c.validate().isValid).toBe(false);
  });
});
