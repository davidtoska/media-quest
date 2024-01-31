import { BuilderOption } from "../Builder-option";
import { type BuilderVariable, QuestionVariable } from "./RuleVariable";
import type { BuilderRuleDto } from "./Builder-rule";
import type { BuilderConditionGroupDto } from "./condition/Builder-condition-group";
import type { BuilderConditionDto } from "./condition/Builder-condition";
import type { BuilderOperator } from "./condition/Builder-operator";
import type { ExcludeByPageAction, ExcludeByTagAction, JumpToPageAction } from "./RuleAction";
import { ExcludeByPageIdSelectItem, ExcludeByTagSelectItem } from "./multi-select-item";
import { PagePrefix } from "../primitives/page-prefix";
import { VarID } from "../primitives/varID";
import { SchemaPrefix } from "../primitives/schema-prefix";
import { PageID } from "../primitives/ID";

const idPxx = () => {
  const id = PageID.create();
  const prefix = PagePrefix.fromStringOrThrow("pxx");
  return { id, prefix: prefix };
};
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

  export const excludeByPageIdAction = (pageId: PageID, pageNumber: number) => {
    const pagePrefix = PagePrefix.castOrCreateRandom("").value;
    const action: ExcludeByPageAction = {
      kind: "exclude-by-pageId",
      mainText: "",
      pageId,
      pagePrefix,
      pageNumber,
    };
    return action;
  };
  export const jumpToPageAction = (pageId: PageID, pageNumber: number) => {
    const pagePrefix = PagePrefix.castOrCreateRandom("").value;
    const action: JumpToPageAction = {
      kind: "jump-to-page",
      mainText: "TEXT: " + pageId,
      pagePrefix,
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
  export const createRuleVariable = (varId: VarID, pageNumber: number): QuestionVariable =>
    new QuestionVariable(varId, "Har du " + varId + "?", createOptions(), pageNumber);

  /**
   *
   */
  export const createPagesAndVars_A_H = (schemaPrefix: SchemaPrefix) => {
    const varId = (pagePrefix: string) => {
      const pxx = PagePrefix.fromStringOrThrow(pagePrefix);
      const qxx = VarID.create(schemaPrefix.value, pxx);
      return qxx;
    };
    const pageAID = PageID.create();
    const pageBID = PageID.create();
    const pageCID = PageID.create();
    const pageDID = PageID.create();
    const pageEID = PageID.create();
    const pageFID = PageID.create();
    const pageGID = PageID.create();
    const pageHID = PageID.create();
    const a = createRuleVariable(varId("a"), 3);
    const b = createRuleVariable(varId("b"), 4);
    const c = createRuleVariable(varId("c"), 5);
    const d = createRuleVariable(varId("d"), 6);
    const e = createRuleVariable(varId("e"), 7);
    const f = createRuleVariable(varId("f"), 8);
    const g = createRuleVariable(varId("g"), 9);
    const h = createRuleVariable(varId("h"), 10);
    const list = [a, b, c, d, e, f, g, h];
    const items = { a, b, c, d, e, f, g, h };
    const pageIds = {
      a: pageAID,
      b: pageBID,
      c: pageCID,
      d: pageDID,
      e: pageEID,
      f: pageFID,
      g: pageGID,

      h: pageHID,
    };
    const pageIdList = [pageAID, pageBID, pageCID, pageDID, pageEID, pageFID, pageGID, pageHID];
    return { list, items, pageIds, pageIdList };
  };

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

  export const createConditionGroupDto = (
    conditions: BuilderConditionDto[],
  ): BuilderConditionGroupDto => {
    return {
      kind: "condition-group",
      conditions,
      type: "all",
      name: "random-group-name",
    };
  };

  export const createBuilderRuleDto = (
    schemaPrefix: SchemaPrefix,
  ): ReadonlyArray<BuilderRuleDto> => {
    const v = createPagesAndVars_A_H(schemaPrefix);
    const condition0 = createConditionDto(v.items.a);
    const condition1 = createConditionDto(v.items.b);
    const condition3 = createConditionDto(v.items.c);
    const condition5 = createConditionDto(v.items.e);
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
        pageId: idPxx().id,
        pagePrefix: idPxx().prefix,
        pageNumber: 5,
        mainText: "Har du noen gang vært deprimeri?? ",
      },
      false,
    ),

    ExcludeByPageIdSelectItem.create(
      {
        kind: "exclude-by-pageId",
        pageId: idPxx().id,
        pagePrefix: idPxx().prefix,
        pageNumber: 5,
        mainText: "Har du noen gang vært deprimeri?? ",
      },
      true,
    ),

    ExcludeByPageIdSelectItem.create(
      {
        kind: "exclude-by-pageId",
        pageId: idPxx().id,
        pagePrefix: idPxx().prefix,
        pageNumber: 5,
        mainText: "Har du noen gang vært deprimeri?? ",
      },
      false,
    ),

    ExcludeByPageIdSelectItem.create(
      {
        kind: "exclude-by-pageId",
        pageId: idPxx().id,
        pagePrefix: idPxx().prefix,
        pageNumber: 5,
        mainText: "Har du noen gang vært deprimeri?? ",
      },
      false,
    ),

    ExcludeByPageIdSelectItem.create(
      {
        kind: "exclude-by-pageId",
        pageId: idPxx().id,
        pagePrefix: idPxx().prefix,
        pageNumber: 5,
        mainText: "Har du noen gang vært deprimeri?? ",
      },
      true,
    ),
    ExcludeByPageIdSelectItem.create(
      {
        kind: "exclude-by-pageId",
        pageId: idPxx().id,
        pagePrefix: idPxx().prefix,
        pageNumber: 5,
        mainText: "Har du noen gang vært deprimeri?? ",
      },
      false,
    ),

    ExcludeByPageIdSelectItem.create(
      {
        kind: "exclude-by-pageId",
        pageId: idPxx().id,
        pagePrefix: idPxx().prefix,
        pageNumber: 5,
        mainText: "Har du noen gang vært deprimeri?? ",
      },
      true,
    ),

    ExcludeByPageIdSelectItem.create(
      {
        kind: "exclude-by-pageId",
        pageId: idPxx().id,
        pagePrefix: idPxx().prefix,
        pageNumber: 5,
        mainText: "Har du noen gang vært deprimeri?? ",
      },
      false,
    ),

    ExcludeByPageIdSelectItem.create(
      {
        kind: "exclude-by-pageId",
        pageId: idPxx().id,
        pagePrefix: idPxx().prefix,
        pageNumber: 5,
        mainText: "Har du noen gang vært deprimeri?? ",
      },
      false,
    ),

    ExcludeByPageIdSelectItem.create(
      {
        kind: "exclude-by-pageId",
        pageId: idPxx().id,
        pagePrefix: idPxx().prefix,
        pageNumber: 5,
        mainText: "Har du noen gang vært deprimeri?? ",
      },
      true,
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
      false,
    ),
    ExcludeByTagSelectItem.create(
      {
        kind: "exclude-by-tag",
        tag: "Is grownup",
        pageCount: 1,
        description: "",
      },
      true,
    ),
    ExcludeByTagSelectItem.create(
      {
        kind: "exclude-by-tag",
        tag: "speaks english",
        pageCount: 3,
        description: "",
      },
      false,
    ),
    ExcludeByTagSelectItem.create(
      {
        kind: "exclude-by-tag",
        tag: "has work",
        pageCount: 7,
        description: "",
      },
      false,
    ),
    ExcludeByTagSelectItem.create(
      {
        kind: "exclude-by-tag",
        tag: "is-depressed",
        pageCount: 2,
        description: "",
      },
      false,
    ),
  ];
}
