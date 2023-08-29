import { BuilderSchema } from "@media-quest/builder";
import { IExampleSchema } from "./IExample-schema";

export const addQuestionPage109 = (schema: BuilderSchema, question: string, pagePrefix: string) => {
  const questionPage = schema.addPage("question");
  questionPage.mainText.text = question;
  questionPage.defaultQuestion.addOption("Ja", 1);
  questionPage.defaultQuestion.addOption("Nei", 0);
  questionPage.defaultQuestion.addOption("Vet ikke", 9);
  questionPage.prefix = pagePrefix;
  return questionPage;
};

const createSchema = () => {
  const s = BuilderSchema.create("rw1", "Rules-work-schema", "rw");
  s.backgroundColor = "white";
  const p1 = addQuestionPage109(s, "Q1:\n  Ja -> Utelukker q2.\n Nei -> Utelukker q.\n Vet-ikke -> hopp til q4 ", "q1");
  const p2 = addQuestionPage109(s, "Q2", "q2");
  const p3 = addQuestionPage109(s, "Q3", "q3");
  const p4 = addQuestionPage109(s, "Q4", "q4");
  const p5 = addQuestionPage109(s, "Q5", "q5");
  const p6 = addQuestionPage109(s, "Q6", "q6");

  const rule1 = s.addRule();
  // console.log(rule1);
  rule1.name = "jump-to-q3-if: q1===ja ";
  const condition = rule1.addCondition();
  condition.variable = condition.variableSelectItemsInUniverse[0].data;
  condition.value = condition.selectValueItems[0].data;
  condition.operator = "equal";
  const pageActions = rule1.getValidPageActions();
  const excludePage2 = pageActions[1];
  excludePage2.isSelected = true;
  console.assert(excludePage2.data.pageId === p2.prefix, "Expected exclude-by-page2 to be q2");
  // rule1
  console.log(pageActions[1]);
  console.log(condition.toEngineCondition());
  console.log(rule1.toEngineRule());
  return s;
};

const schema = createSchema();
export const rulesWork: IExampleSchema = {
  menuLabel: "Rule",
  schema: schema.compile().schema,
};
console.log();
