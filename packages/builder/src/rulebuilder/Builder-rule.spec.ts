import { BuilderRule, type BuilderRuleDto } from "./Builder-rule";
import { RuleBuilderTestUtils as U } from "./RuleBuilder-test-utils";
import { RuleInput } from "./RuleInput";
import type { BuilderConditionGroupDto } from "./Builder-condition-group";

const { createBuilderVariables_A_H } = U;
let questionVariables = createBuilderVariables_A_H();
const createDto = (): {
    ruleInput: RuleInput;
    builderRuleDto: BuilderRuleDto;
} => {
    const v1 = U.createRuleVariable("v1", 2);
    const v2 = U.createRuleVariable("v2", 2);
    const v3 = U.createRuleVariable("v3", 2);
    const v4 = U.createRuleVariable("v4", 2);
    const vg1 = U.createRuleVariable("vg1", 2);
    const vg2 = U.createRuleVariable("vg2", 2);
    const vg3 = U.createRuleVariable("vg3", 2);
    const vg4 = U.createRuleVariable("vg4", 2);
    const variableList = [v1, v2, v3, v4, vg1, vg2, vg3, vg4];
    const tagAction1 = U.excludeByTagAction("tag1");
    const tagAction2 = U.excludeByTagAction("tag2");
    const tagAction3 = U.excludeByTagAction("tag3");
    const tagAction4 = U.excludeByTagAction("tag4");
    const pageAction1 = U.excludeByPageIdAction(v1.varId);
    const pageAction2 = U.excludeByPageIdAction(v2.varId);
    const pageAction3 = U.excludeByPageIdAction(v3.varId);
    const pageAction4 = U.excludeByPageIdAction(v4.varId);

    // const pageAction =
    // const excludeByTagList = [];
    const ruleInput = new RuleInput(
        variableList,
        [],
        [pageAction1, pageAction2, pageAction3, pageAction4],
        [tagAction1, tagAction2, tagAction3, tagAction4],
        []
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
        excludePages: [v1.varId, v3.varId],
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
const pageActions = questionVariables.map((q) => U.excludeByPageIdAction(q.varId, q.pageNumber));
let ruleInput = new RuleInput(questionVariables, [], [...pageActions], excludeByTagActionList, []);

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

    test("Conditions have no operators available before variable is set.", () => {
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
        const data = createDto();

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
});
