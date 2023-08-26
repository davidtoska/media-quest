import { BuilderOption } from "../Builder-option";
import { type BuilderVariable, QuestionVariable } from "./RuleVariable";
import type { BuilderRuleDto } from "./Builder-rule";
import type { BuilderConditionGroupDto } from "./Builder-condition-group";
import type { BuilderConditionDto } from "./Builder-condition";
import type { BuilderOperator } from "./Builder-operator";
import type { ExcludeByPageAction, ExcludeByTagAction } from "./RuleAction";
import { ExcludeByPageIdSelectItem, ExcludeByTagSelectItem } from "./multi-select-item";

export namespace RuleBuilderTestUtils {
    export const createOptions = () => [
        BuilderOption.create(0, "Nei"),
        BuilderOption.create(1, "Ja"),
        BuilderOption.create(9, "Vet ikke"),
    ];

    export const excludeByTagAction = (tag: string) => {
        const pageCount = Math.floor(Math.random() * 10);
        const action: ExcludeByTagAction = {
            kind: "exclude-by-tag",
            tag,
            description: "Description for tag: " + tag,
            pageCount,
        };
        return action;
    };
    export const excludeByPageIdAction = (pageId: string, pageNumber = 1) => {
        const action: ExcludeByPageAction = {
            kind: "exclude-by-pageId",
            mainText: "",
            pageId,
            pageNumber,
        };
        return action;
    };
    export const excludeByTagActionList = () => {
        const list = [
            excludeByTagAction("tag1"),
            excludeByTagAction("tag2"),
            excludeByTagAction("tag3"),
            excludeByTagAction("tag4"),
            excludeByTagAction("tag5"),
            excludeByTagAction("tag6"),
            excludeByTagAction("tag7"),
            excludeByTagAction("tag8"),
            excludeByTagAction("tag9"),
            excludeByTagAction("tag10"),
        ] as const;
        return list;
    };
    export const createRuleVariable = (id: string, pageNumber: number): QuestionVariable =>
        new QuestionVariable(id, "Har du " + id + "?", createOptions(), pageNumber);

    /**
     *
     */
    export const createBuilderVariables_A_H = (): ReadonlyArray<QuestionVariable> => [
        createRuleVariable("a", 3),
        createRuleVariable("b", 4),
        createRuleVariable("c", 5),
        createRuleVariable("d", 6),
        createRuleVariable("e", 7),
        createRuleVariable("f", 8),
        createRuleVariable("g", 9),
        createRuleVariable("h", 10),
    ];

    export const createConditionDto = (variable: BuilderVariable): BuilderConditionDto => {
        const operator: BuilderOperator = Math.random() > 0 ? "equal" : "notEqual";
        const opt = variable.options[0];
        return {
            kind: "condition",
            name: "condition 1",
            variableId: variable.varId,
            operator,
            value: opt.value,
        };
    };

    export const createConditionGroupDto = (conditions: BuilderConditionDto[]): BuilderConditionGroupDto => {
        return {
            kind: "condition-group",
            conditions,
            type: "all",
            name: "random-group-name",
        };
    };

    export const createBuilderRuleDto = (): ReadonlyArray<BuilderRuleDto> => {
        const variables = createBuilderVariables_A_H();
        const condition0 = createConditionDto(variables[0]);
        const condition1 = createConditionDto(variables[1]);
        const condition3 = createConditionDto(variables[3]);
        const condition5 = createConditionDto(variables[5]);
        const group = createConditionGroupDto([condition0, condition3]);
        // const action1: Exc
        const rule: BuilderRuleDto = {
            name: "rule-name",
            conditions: [condition1, group, condition5],
            excludeTags: [],
            excludePages: [],
            jumpToPage: false,
            type: "all",
        };
        return [];
    };
    export const createExcludeByPageIdList = (): ReadonlyArray<ExcludeByPageIdSelectItem> => [
        ExcludeByPageIdSelectItem.create(
            {
                kind: "exclude-by-pageId",
                pageId: "page_a",
                pageNumber: 5,
                mainText: "Har du noen gang vært deprimeri?? ",
            },
            false
        ),

        ExcludeByPageIdSelectItem.create(
            {
                kind: "exclude-by-pageId",
                pageId: "page_b",
                pageNumber: 5,
                mainText: "Har du noen gang vært deprimeri?? ",
            },
            true
        ),

        ExcludeByPageIdSelectItem.create(
            {
                kind: "exclude-by-pageId",
                pageId: "page_c",
                pageNumber: 5,
                mainText: "Har du noen gang vært deprimeri?? ",
            },
            false
        ),

        ExcludeByPageIdSelectItem.create(
            {
                kind: "exclude-by-pageId",
                pageId: "page_d",
                pageNumber: 5,
                mainText: "Har du noen gang vært deprimeri?? ",
            },
            false
        ),

        ExcludeByPageIdSelectItem.create(
            {
                kind: "exclude-by-pageId",
                pageId: "page_e",
                pageNumber: 5,
                mainText: "Har du noen gang vært deprimeri?? ",
            },
            true
        ),
        ExcludeByPageIdSelectItem.create(
            {
                kind: "exclude-by-pageId",
                pageId: "page_f",
                pageNumber: 5,
                mainText: "Har du noen gang vært deprimeri?? ",
            },
            false
        ),

        ExcludeByPageIdSelectItem.create(
            {
                kind: "exclude-by-pageId",
                pageId: "page_g",
                pageNumber: 5,
                mainText: "Har du noen gang vært deprimeri?? ",
            },
            true
        ),

        ExcludeByPageIdSelectItem.create(
            {
                kind: "exclude-by-pageId",
                pageId: "page_h",
                pageNumber: 5,
                mainText: "Har du noen gang vært deprimeri?? ",
            },
            false
        ),

        ExcludeByPageIdSelectItem.create(
            {
                kind: "exclude-by-pageId",
                pageId: "page_i",
                pageNumber: 5,
                mainText: "Har du noen gang vært deprimeri?? ",
            },
            false
        ),

        ExcludeByPageIdSelectItem.create(
            {
                kind: "exclude-by-pageId",
                pageId: "page_j",
                pageNumber: 5,
                mainText: "Har du noen gang vært deprimeri?? ",
            },
            true
        ),
    ];
    export const createExcludeByTagList = () => [
        ExcludeByTagSelectItem.create(
            {
                kind: "exclude-by-tag",
                tag: "Can_read",
                pageCount: 5,
                description: "",
            },
            false
        ),
        ExcludeByTagSelectItem.create(
            {
                kind: "exclude-by-tag",
                tag: "Is grownup",
                pageCount: 1,
                description: "",
            },
            true
        ),
        ExcludeByTagSelectItem.create(
            {
                kind: "exclude-by-tag",
                tag: "speaks english",
                pageCount: 3,
                description: "",
            },
            false
        ),
        ExcludeByTagSelectItem.create(
            {
                kind: "exclude-by-tag",
                tag: "has work",
                pageCount: 7,
                description: "",
            },
            false
        ),
        ExcludeByTagSelectItem.create(
            {
                kind: "exclude-by-tag",
                tag: "is-depressed",
                pageCount: 2,
                description: "",
            },
            false
        ),
    ];
}
