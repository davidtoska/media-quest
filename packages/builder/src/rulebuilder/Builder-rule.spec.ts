import { BuilderRule, type BuilderRuleDto } from "./Builder-rule";
import { RuleBuilderTestUtils as U } from "./RuleBuilder-test-utils";
import { RuleInput } from "./RuleInput";
import type { BuilderConditionGroupDto } from "./condition/Builder-condition-group";
import { BuilderConditionDto } from "./condition/Builder-condition";
import { Condition } from "@media-quest/engine";
import { PagePrefix } from "../primitives/page-prefix";
import { VarID } from "../primitives/varID";
import { SchemaPrefix } from "../primitives/schema-prefix";
import { PageID } from "../primitives/ID";

const { createPagesAndVars_A_H } = U;

const sxx = SchemaPrefix.fromValueOrThrow("sxx");
let varsAndPages_A_H = createPagesAndVars_A_H(sxx);

const varId = (sxx: SchemaPrefix, pxx: string): VarID => {
  const pagePrefix = PagePrefix.fromStringOrThrow(pxx);
  return VarID.create(sxx.value, pagePrefix);
};
const createDto = (
  modulePrefix: SchemaPrefix,
): {
  ruleInput: RuleInput;
  builderRuleDto: BuilderRuleDto;
} => {
  const v1 = U.createRuleVariable(varId(modulePrefix, "v1"), 1);
  const v2 = U.createRuleVariable(varId(modulePrefix, "v2"), 2);
  const v3 = U.createRuleVariable(varId(modulePrefix, "v3"), 3);
  const v4 = U.createRuleVariable(varId(modulePrefix, "v4"), 4);
  const vg1 = U.createRuleVariable(varId(modulePrefix, "vg1"), 5);
  const vg2 = U.createRuleVariable(varId(modulePrefix, "vg2"), 6);
  const vg3 = U.createRuleVariable(varId(modulePrefix, "vg3"), 7);
  const vg4 = U.createRuleVariable(varId(modulePrefix, "vg4"), 8);
  const variableList = [v1, v2, v3, v4, vg1, vg2, vg3, vg4];
  const tagAction1 = U.excludeByTagAction("tag1");
  const tagAction2 = U.excludeByTagAction("tag2");
  const tagAction3 = U.excludeByTagAction("tag3");
  const tagAction4 = U.excludeByTagAction("tag4");
  const pageId1 = PageID.create();
  const pageId2 = PageID.create();
  const pageId3 = PageID.create();
  const pageId4 = PageID.create();
  const pageAction1 = U.excludeByPageIdAction(pageId1, v1.pageNumber);
  const pageAction2 = U.excludeByPageIdAction(pageId2, v2.pageNumber);
  const pageAction3 = U.excludeByPageIdAction(pageId3, v3.pageNumber);
  const pageAction4 = U.excludeByPageIdAction(pageId4, v4.pageNumber);
  const jumpToPageAction1 = U.jumpToPageAction(pageId1, v1.pageNumber);
  const jumpToPageAction2 = U.jumpToPageAction(pageId2, v2.pageNumber);
  const jumpToPageAction3 = U.jumpToPageAction(pageId3, v3.pageNumber);
  const jumpToPageAction4 = U.jumpToPageAction(pageId4, v1.pageNumber);

  const ruleInput = new RuleInput(
    variableList,
    [],
    [pageAction1, pageAction2, pageAction3, pageAction4],
    [tagAction1, tagAction2, tagAction3, tagAction4],
    [jumpToPageAction1, jumpToPageAction2, jumpToPageAction3, jumpToPageAction4],
  );
  const c1 = U.createConditionDto(v1);
  const c2 = U.createConditionDto(v2);
  const c3 = U.createConditionDto(v3);
  const c4 = U.createConditionDto(v4);
  const cg1 = U.createConditionDto(vg1);
  const cg2 = U.createConditionDto(vg2);
  const cg3 = U.createConditionDto(vg3);
  const cg4 = U.createConditionDto(vg4);
  const group3: BuilderConditionGroupDto = {
    kind: "condition-group",
    name: "group3",
    type: "all",
    conditions: [cg1, cg2, cg3, cg4],
  };

  const builderRuleDto1: BuilderRuleDto = {
    type: "any",
    jumpToPage: false,
    excludePages: [pageId1, pageId3],
    excludeTags: [tagAction1.tag, tagAction2.tag],
    name: "kitchen-sink",
    conditions: [c1, c2, group3, c3, c4],
  };

  return { ruleInput, builderRuleDto: builderRuleDto1 };
};
let dto: BuilderRuleDto = {
  name: "test-rule",
  conditions: [],
  type: "all",
  excludePages: [],
  excludeTags: [],
  jumpToPage: false,
};

const excludeByTagActionList = U.excludeByTagActionList();
// const pageActions = questionVariables.list.map((q) => U.excludeByPageIdAction(q.pageId, q.pageNumber));
// const pageActions = questionVariables.map((q) => U.excludeByPageIdAction(, q.pageNumber));
// const pageActions = varsAndPages_A_H.pageIds((p) => U.excludeByPageIdAction(p.pageId, p.pageNumber));
let ruleInput = new RuleInput(
  varsAndPages_A_H.list,
  [],
  [...varsAndPages_A_H.pageIdList.map((id, index) => U.excludeByPageIdAction(id, index))],
  excludeByTagActionList,
  [],
);
// let ruleInput = new RuleInput(questionVariables.list, [], [], excludeByTagActionList, []);

let rule: BuilderRule = BuilderRule.fromDto(dto, ruleInput);

beforeEach(() => {
  rule = BuilderRule.fromDto(dto, ruleInput);
});

describe("Builder Rule", () => {
  test("Can create rule", () => {
    expect(rule).toBeInstanceOf(BuilderRule);
  });
  test("Can add condition", () => {
    rule.addCondition();
    expect(rule.conditions.length).toBe(1);
  });
  test("Can delete condition", () => {
    const r1 = rule.addCondition();
    const r2 = rule.addCondition();
    const r3 = rule.addCondition();
    const r4 = rule.addCondition();
    const r5 = rule.addCondition();
    expect(rule.conditionCount).toBe(5);
    const result = rule.deleteCondition(r3);
    expect(result).toBeTruthy();
    expect(rule.conditionCount).toBe(4);
    expect(rule.conditions[0]).toBe(r1);
    expect(rule.conditions[1]).toBe(r2);
    expect(rule.conditions[2]).toBe(r4);
    expect(rule.conditions[3]).toBe(r5);
    expect(rule.deleteCondition(r3)).toBeFalsy();
    // expect(rule.conditions[0]).toBe(r1);
  });
  test("Can delete condition-group", () => {
    const r1 = rule.addCondition();
    const r2 = rule.addConditionGroup();
    const r3 = rule.addConditionGroup();
    const r4 = rule.addCondition();
    const r5 = rule.addConditionGroup();
    expect(rule.conditionCount).toBe(5);
    const result = rule.deleteCondition(r2);
    expect(result).toBeTruthy();
    expect(rule.conditionCount).toBe(4);
    expect(rule.conditions[0]).toBe(r1);
    expect(rule.conditions[1]).toBe(r3);
    expect(rule.conditions[2]).toBe(r4);
    expect(rule.conditions[3]).toBe(r5);
    expect(rule.deleteCondition(r2)).toBeFalsy();
    expect(rule.deleteCondition(r1)).toBeTruthy();
    expect(rule.deleteCondition(r5)).toBeTruthy();
    expect(rule.conditionCount).toBe(2);
  });

  test("Conditions have no operators available before sum-score is set.", () => {
    const c1 = rule.addCondition();
    expect(c1.operatorsSelectItems.length).toBe(0);

    const a = c1.variableSelectItemsInUniverse[0]?.data ?? false;
    c1.variable = a;
    expect(c1.operatorsSelectItems.length).toBe(2);
  });

  test("Conditions  and actions in dto will exist: ", () => {
    const v1 = ruleInput.questionVars[0];
    const v2 = ruleInput.questionVars[1];
    const tag1 = ruleInput.excludeByTagActions[0];
    const pageAction1 = ruleInput.excludeByPageIdActions[0];

    const dtoWithOneCondition: BuilderRuleDto = {
      ...dto,
      excludePages: [pageAction1.pageId],
      excludeTags: [tag1.tag],
      jumpToPage: v1.varId,
      conditions: [
        {
          kind: "condition",
          name: "condition 1",
          variableId: v1.varId,
          operator: "equal",
          value: v1.options[0].value,
        },
        {
          kind: "condition-group",
          type: "all",
          name: "condtion-grup-from-testing.",
          conditions: [
            {
              name: "nested-condition",
              kind: "condition",
              value: v2.options[0].value,
              operator: "equal",
              variableId: v2.varId,
            },
          ],
        },
      ],
    };

    const rule = BuilderRule.fromDto(dtoWithOneCondition, ruleInput);
    // console.log(rule);
    expect(rule.conditions.length).toBe(2);
    const excludeTags = rule.toJson().excludeTags;
    expect(excludeTags.length).toBe(1);
    expect(rule.jumpToActionManager).toBeTruthy();
  });

  test("fromJSON -> toJSON -> are equal.", () => {
    const schemaPrefix = SchemaPrefix.fromValueOrThrow("ax");
    const data = createDto(schemaPrefix);

    const localRule = BuilderRule.fromDto(data.builderRuleDto, data.ruleInput);

    const json = localRule.toJson();
    expect(data.builderRuleDto).toStrictEqual(json);
  });

  test("invalid tags will be removed.", () => {
    const ruleInput = new RuleInput([], [], [], U.excludeByTagActionList(), []);
    const dto: BuilderRuleDto = {
      conditions: [],
      excludePages: [],
      excludeTags: ["tag3", "tag1"],
      jumpToPage: false,
      name: "Rule-name-in-test",
      type: "all",
    };

    const localRule = BuilderRule.fromDto(dto, ruleInput);

    expect(ruleInput.excludeByTagActions.length).toStrictEqual(10);
    expect(ruleInput.excludeByTagActions.length).toStrictEqual(10);
  });

  // TODO FIX THIS TEST.
  test("toEngineRuleWorks: ", () => {
    const schemaPrefix = SchemaPrefix.fromValueOrThrow("ax");
    const dto = createDto(schemaPrefix);
    const input = dto.ruleInput;
    const v1 = input.questionVars[0];
    const v2 = input.questionVars[1];
    const tag1 = input.excludeByTagActions[0];
    const pageAction1 = input.excludeByPageIdActions[0];

    const c1: BuilderConditionDto = {
      kind: "condition",
      name: "condition 1",
      variableId: v1.varId,
      operator: "equal",
      value: v1.options[0].value,
    };
    const c2: BuilderConditionDto = {
      name: "nested-condition",
      kind: "condition",
      value: v2.options[0].value,
      operator: "equal",
      variableId: v2.varId,
    };
    const conditionGroupANY: BuilderConditionGroupDto = {
      kind: "condition-group",
      conditions: [c1, c2],
      name: "or-condition",
      type: "any",
    };

    const conditionGroupALL: BuilderConditionGroupDto = {
      kind: "condition-group",
      conditions: [c2],
      name: "condition group ALL - in testing.",
      type: "all",
    };

    expect(c1.variableId).toBe(schemaPrefix.value + "_v1");

    const dtoWithThreeCondition: BuilderRuleDto = {
      type: "all",
      name: "dto-with-one-condition",
      excludePages: [pageAction1.pageId],
      excludeTags: [tag1.tag],
      jumpToPage: pageAction1.pageId,
      conditions: [c1, conditionGroupALL, conditionGroupANY],
    };

    const actionCount =
      dtoWithThreeCondition.excludeTags.length +
      dtoWithThreeCondition.excludePages.length +
      (dtoWithThreeCondition.jumpToPage ? 1 : 0);

    const rule = BuilderRule.fromDto(dtoWithThreeCondition, input);

    const engineRule = rule.toEngineRule();

    // console.log(rule);
    expect(engineRule.all.length).toBe(3);
    expect(engineRule.some.length).toBe(0);
    // expect(engineRule.all[0]).toBe(0);

    const simple1 = engineRule.all.find(
      (c) => c.kind === "numeric-condition" && c.referenceId === c1.variableId,
    ) as Condition.Numeric;
    const complex1 = engineRule.all.find(
      (c) => c.kind === "complex-condition" && c.all.length === 1,
    ) as Condition.Complex;

    const complexChild1 = complex1.all[0] as Condition.Numeric;
    expect(simple1).toBeTruthy();
    expect(simple1.operator === "eq").toBeTruthy();
    expect(simple1.value === c1.value).toBeTruthy();
    expect(simple1.referenceLabel).toBe(v1.label);
    expect(complex1).toBeTruthy();
    expect(complexChild1).toBeTruthy();
    expect(complexChild1.referenceId).toBe(c2.variableId);
    expect(complexChild1.value).toBe(c2.value);
    expect(complexChild1.referenceLabel).toBe(v2.label);
    expect(complexChild1.operator === "eq").toBeTruthy();
    // expect(engineRule.onSuccess).toBe(1);
    expect(engineRule.onSuccess.length).toBe(actionCount);
  });
});
