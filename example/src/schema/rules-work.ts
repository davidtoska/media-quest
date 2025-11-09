import * as B from "../../../packages/builder/src/public-api";
import { IExampleSchema } from "./IExample-schema";
import { addQuestionPage109 } from "./helpers";

const createExcludeByPageId = () => {
  const SchemaId = B.SchemaID.create();
  const modulePrefix = B.SchemaPrefix.fromValueOrThrow("ex_pid");
  const s = B.BuilderSchema.create(SchemaId, "Rules-work-schema", modulePrefix.value);
  s.backgroundColor = "white";
  const p1 = addQuestionPage109(s, "Q1:\n  Ja -> Exclude q2.", "q1");
  const p2 = addQuestionPage109(s, "Q2", "q2");
  const p3 = addQuestionPage109(s, "Q3", "q3");
  const p4 = addQuestionPage109(s, "Q4", "q4");

  // RULES

  const rule = s.addRule();
  // console.log(rule1);
  rule.name = "jump-to-q3-if: q1===ja ";
  const c = rule.addCondition();
  c.variable = c.variableSelectItemsInUniverse[0].data;
  c.value = c.selectValueItems[0].data;
  c.operator = "equal";

  // const r2_jump_to_page_actions = rule2.jumpToActionManager.options;
  rule.getValidPageActions()[1].isSelected = true;
  return s;
};
const jumpToPage = () => {
  const SchemaId = B.SchemaID.create();
  const modulePrefix = B.SchemaPrefix.fromValueOrThrow("rw");
  const s = B.BuilderSchema.create(SchemaId, "Rules-work-schema", modulePrefix.value);
  s.backgroundColor = "white";
  const p1 = addQuestionPage109(s, "Q1:\n  Ja -> Jump to Q5", "q1");
  const p2 = addQuestionPage109(s, "Q2", "q2");
  const p3 = addQuestionPage109(s, "Q3", "q3");
  const p4 = addQuestionPage109(s, "Q4", "q4");
  const p5 = addQuestionPage109(s, "Q5", "q5");
  const p6 = addQuestionPage109(s, "Q6", "q6");

  // RULES

  const rule = s.addRule();
  // console.log(rule1);
  rule.name = "jump-toq5-if: q1===ja ";
  const c = rule.addCondition();
  const vars = c.variableSelectItemsInUniverse;
  c.variable = vars[0].data;
  c.value = c.selectValueItems[0].data;
  c.operator = "equal";

  const a = rule.jumpToActionManager.options[4];
  rule.jumpToActionManager.selected = a;
  return s;
};
const excludeByTagPage = () => {
  const schemaId = B.SchemaID.create();
  const schemaPrefix = B.SchemaPrefix.fromValueOrThrow("ex_tag");
  const s = B.BuilderSchema.create(schemaId, "Exclude by tag.", schemaPrefix.value);
  s.backgroundColor = "white";
  const p1 = addQuestionPage109(s, "Q1:\n  Ja -> Exclude q2 abd q3 by tag", "q1");
  const p2 = addQuestionPage109(s, "Q2-text", "q2");
  const p3 = addQuestionPage109(s, "Q3-text", "q3");
  const p4 = addQuestionPage109(s, "Q4-text", "q4");
  const p5 = addQuestionPage109(s, "Q5-text", "q5");
  const p6 = addQuestionPage109(s, "Q6-text", "q6");
  const tag = B.BuilderTag.create("tag1", "Tag1");
  s.addTag(tag);
  p2.addTag(tag.tagText);
  p3.addTag(tag.tagText);
  // RULES

  const rule = s.addRule();
  // console.log(rule1);
  rule.name = "exclude_by_tag_if: q1===ja ";
  const c = rule.addCondition();
  const vars = c.variableSelectItemsInUniverse;
  c.variable = vars[0].data;
  c.value = c.selectValueItems[0].data;
  c.operator = "equal";

  const tagSelectItem = rule.getTagActions()[0];
  tagSelectItem.isSelected = true;
  // console.log(tagSelectItem);
  // console.log(a);
  // console.log(a);
  // console.log(a);
  // console.log(s.toJson());
  // console.log(s.compile().schema);
  // rule.jumpToActionManager.selected = a;
  return s;
};

export const excludeByPageIdRuleWorks: IExampleSchema = {
  menuLabel: "Exclude page id rule",
  schema: createExcludeByPageId().compile().schema,
};
export const jumpToRuleWorks: IExampleSchema = {
  menuLabel: "Jump to rule",
  schema: jumpToPage().compile().schema,
};
export const excludeByTagWorks: IExampleSchema = {
  menuLabel: "Exclude by tag",
  schema: excludeByTagPage().compile().schema,
};
console.log();
