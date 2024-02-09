import { SumScore } from "./sum-score";
import { SumScoreVariable, SumScoreVariableDto } from "./sum-score-variable";
import { SchemaID, SumScoreVariableID } from "../primitives/ID";
import { SumScoreAnswer } from "./sum-score-answer";
import { BuilderSchema } from "../Builder-schema";
import { SchemaPrefix } from "../primitives/schema-prefix";
import { CodeBook } from "../code-book/codebook";
import { BuilderPage } from "../page/Builder-page";
import { VarID } from "../primitives/varID";

const createAnswer = (value: number): SumScoreAnswer => {
  const varId = "v" + value;
  const varLabel = "label for " + varId;
  const valueLabel = "label for value " + value;
  return {
    varId,
    varLabel,
    value,
    valueLabel,
  };
};

const createSumScore = () => {
  const id = SumScoreVariableID.create();
  const sumVar1: SumScoreVariableDto = {
    id,
    name: "",
    description: "",
    useAvg: true,
  };
  return sumVar1;
};

const a0 = createAnswer(0);
const a1 = createAnswer(1);
const a2 = createAnswer(2);
const a3 = createAnswer(3);
const a4 = createAnswer(4);
const a5 = createAnswer(5);
const a6 = createAnswer(6);
const a7 = createAnswer(7);
const a8 = createAnswer(8);
const a9 = createAnswer(9);

const all = [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9];

describe("Sum score sum-score.", () => {
  test("Is allowed SumScoreValue", () => {
    expect(SumScore.isAllowedValue(-1)).toBeFalsy();
    expect(SumScore.isAllowedValue(0)).toBeTruthy();
    expect(SumScore.isAllowedValue(1)).toBeTruthy();
    expect(SumScore.isAllowedValue(2)).toBeTruthy();
    expect(SumScore.isAllowedValue(3)).toBeTruthy();
    expect(SumScore.isAllowedValue(4)).toBeTruthy();
    expect(SumScore.isAllowedValue(5)).toBeTruthy();
    expect(SumScore.isAllowedValue(6)).toBeTruthy();
    expect(SumScore.isAllowedValue(7)).toBeTruthy();
    expect(SumScore.isAllowedValue(8)).toBeTruthy();
    expect(SumScore.isAllowedValue(9)).toBeFalsy();
    expect(SumScore.isAllowedValue(999)).toBeFalsy();
  });

  test("Will calculate 2", () => {
    const ss1 = createSumScore();
    const basedOn = [
      { varId: a1.varId, varLabel: a1.varLabel, weight: 1 },
      { varId: a2.varId, varLabel: a2.varLabel, weight: 1 },
      { varId: a9.varId, varLabel: a9.varLabel, weight: 1 },
    ];

    const score = SumScore.calculate(ss1, basedOn, all);
    expect(score.sumScore).toBe(3);
    expect(score.basedOn.length).toBe(3);
    expect(score.avg).toBe(1.5);
    expect(score.skippedBy9Count).toBe(1);
  });
  test("Will calculate 5 values", () => {
    const ss1 = createSumScore();
    const basedOn = [
      { varId: a1.varId, varLabel: a1.varLabel, weight: 1 },
      { varId: a2.varId, varLabel: a2.varLabel, weight: 1 },
      { varId: a4.varId, varLabel: a4.varLabel, weight: 1 },
      { varId: a5.varId, varLabel: a5.varLabel, weight: 1 },
      { varId: a6.varId, varLabel: a6.varLabel, weight: 1 },
      { varId: a9.varId, varLabel: a9.varLabel, weight: 0.5 },
    ];
    const score = SumScore.calculate(ss1, basedOn, all);
    expect(score.sumScore).toBe(18);
    expect(score.avg).toBe(3.6);
    const basedOn1 = score.basedOn[0];
    expect(basedOn1.value).toBe(a1.value);
    expect(basedOn1.weight).toBe(1);
    expect(basedOn1.varId).toBe(a1.varId);
    expect(basedOn1.varLabel).toBe(a1.varLabel);
  });
  test("Will not include 9 in includedAnswersCount", () => {
    const ss1 = createSumScore();
    const basedOn = [
      { varId: a0.varId, varLabel: a0.varLabel, weight: 1 },
      { varId: a1.varId, varLabel: a1.varLabel, weight: 1 },
      { varId: a5.varId, varLabel: a5.varLabel, weight: 1 },
      { varId: a9.varId, varLabel: a9.varLabel, weight: 1 },
    ];
    const score = SumScore.calculate(ss1, basedOn, all);
    expect(score.sumScore).toBe(6);
    expect(score.avg).toBe(2);
    expect(score.includedAnswerCount).toBe(3);
  });
  test("Will calculate weight", () => {
    const ss1 = createSumScore();
    const basedOn = [
      { varId: a1.varId, varLabel: a1.varLabel, weight: 1 },
      { varId: a8.varId, varLabel: a8.varLabel, weight: 0.5 },
    ];
    const score = SumScore.calculate(ss1, basedOn, all);
    expect(score.sumScore).toBe(5);
  });
  test("Will calculate many weighted variables.", () => {
    const ss1 = createSumScore();
    const basedOn = [
      { varId: a1.varId, varLabel: a1.varLabel, weight: 1 },
      { varId: a2.varId, varLabel: a2.varLabel, weight: 0.5 },
      { varId: a5.varId, varLabel: a5.varLabel, weight: 1.2 },
      { varId: a8.varId, varLabel: a8.varLabel, weight: 2 },
    ];
    const score = SumScore.calculate(ss1, basedOn, all);
    expect(score.sumScore).toBe(24);
  });
  test("Will count missing answers (missingAnswersCount)", () => {
    const ss1 = createSumScore();
    const basedOn = [
      { varId: a1.varId, varLabel: a1.varLabel, weight: 1 },
      { varId: a2.varId, varLabel: a2.varLabel, weight: 1 },
      { varId: a3.varId, varLabel: a3.varLabel, weight: 1 },
      { varId: a5.varId, varLabel: a5.varLabel, weight: 1 },
      { varId: a9.varId, varLabel: a9.varLabel, weight: 1 },
    ];
    const missing5InDataSet = [a1, a2, a8];
    const score = SumScore.calculate(ss1, basedOn, missing5InDataSet);
    expect(score.sumScore).toBe(3);
    expect(score.includedAnswerCount).toBe(2);
    expect(score.missingAnswerCount).toBe(3);
    expect(score.avg).toBe(1.5);
    expect(score.basedOn.length).toBe(2);
    expect(score.avg).toBe(1.5);
    expect(score.errorMessages.length).toBe(0);
  });
  test("includedAnswerCount + missingAnswerCount + skippedBy9Count = SumScoreVariable.basedOn.length", () => {
    const ss1 = createSumScore();
    const basedOn = [
      { varId: a0.varId, varLabel: a0.varLabel, weight: 1 },
      { varId: a1.varId, varLabel: a1.varLabel, weight: 1 },
      { varId: a2.varId, varLabel: a2.varLabel, weight: 1 },
      { varId: a9.varId, varLabel: a9.varLabel, weight: 1 },
    ];
    const answers = [a1, a7, a8, a9];
    const score = SumScore.calculate(ss1, basedOn, answers);

    expect(score.includedAnswerCount + score.missingAnswerCount + score.skippedBy9Count).toBe(
      basedOn.length,
    );
  });
  test("variable will also have copy of all questions it used in.", () => {
    const prefix = SchemaPrefix.fromValueOrThrow("dep4");
    const schema = BuilderSchema.create(SchemaID.create(), "testing-dep4", prefix.value);
    const p1 = schema.addPage("question");
    const p2 = schema.addPage("question");
    const p3 = schema.addPage("question");

    // Setting question text
    p1.mainText.text = "q1 text";
    p2.mainText.text = "q2 text";
    p3.mainText.text = "q3 text";
    const v1 = schema.sumScoreVariableCreate({
      name: "ss1",
      description: "ss1-desc",
      useAvg: true,
    });
    const v2 = schema.sumScoreVariableCreate({
      name: "ss2",
      description: "ss2-desc",
      useAvg: true,
    });
    const v3 = schema.sumScoreVariableCreate({
      name: "ss3",
      description: "ss3-desc",
      useAvg: true,
    });
    schema.sumScoreVariableAddToPage(v1, p1, 1);
    schema.sumScoreVariableAddToPage(v1, p2, 1);
    schema.sumScoreVariableAddToPage(v2, p2, 1);
    schema.sumScoreVariableAddToPage(v3, p1, 1);
    schema.sumScoreVariableAddToPage(v3, p2, 1);
    schema.sumScoreVariableAddToPage(v3, p3, 1);

    expect(v1.usedIn.length).toBe(2);
    expect(v2.usedIn.length).toBe(1);
    expect(v3.usedIn.length).toBe(3);
    schema.sumScoreVariableDeleteFromPage(p3.id, v3.id);
    expect(v3.usedIn.length).toBe(2);

    schema.sumScoreVariableDeleteFromPage(p2.id, v3.id);
    expect(v3.usedIn.length).toBe(1);

    const json = schema.toJson();
    const clone = BuilderSchema.fromJson(json);
    const clonedVariables = clone.sumScoreVariables;
    expect(clonedVariables.length).toBe(3);

    const v1Clone = clonedVariables.find((v) => v.id === v1.id) as SumScoreVariable;
    const v2Clone = clonedVariables.find((v) => v.id === v2.id) as SumScoreVariable;
    const v3Clone = clonedVariables.find((v) => v.id === v3.id) as SumScoreVariable;
    expect(v1Clone.usedIn.length).toBe(2);
    expect(v2Clone.usedIn.length).toBe(1);
    expect(v3Clone.usedIn.length).toBe(1);
  });

  test("calculateAll", () => {
    const prefix = SchemaPrefix.fromValueOrThrow("angst");
    const schema = BuilderSchema.create(SchemaID.create(), "testing", prefix.value);
    const p1 = schema.addPage("question");
    const p2 = schema.addPage("question");
    const p3 = schema.addPage("question");

    // Setting question text
    p1.mainText.text = "q1";
    p2.mainText.text = "q2";
    p3.mainText.text = "q3";
    const v1 = schema.sumScoreVariableCreate({
      name: "ss1",
      description: "ss1-desc",
      useAvg: true,
    });
    const v2 = schema.sumScoreVariableCreate({
      name: "ss2",
      description: "ss2-desc",
      useAvg: true,
    });
    const v3 = schema.sumScoreVariableCreate({
      name: "ss3",
      description: "ss3-desc",
      useAvg: true,
    });
    const success_v1_p1 = schema.sumScoreVariableAddToPage(v1, p1, 1);
    const success_v1_p2 = schema.sumScoreVariableAddToPage(v1, p2, 1);
    const success_v2_p2 = schema.sumScoreVariableAddToPage(v2, p2, 1);
    const success_v3_p1 = schema.sumScoreVariableAddToPage(v3, p1, 1);
    const success_v3_p2 = schema.sumScoreVariableAddToPage(v3, p2, 1);
    const success_v3_p3 = schema.sumScoreVariableAddToPage(v3, p3, 1);
    expect(success_v1_p1).toBeTruthy();
    expect(success_v1_p2).toBeTruthy();
    expect(success_v2_p2).toBeTruthy();
    expect(success_v3_p1).toBeTruthy();
    expect(success_v3_p2).toBeTruthy();
    expect(success_v3_p3).toBeTruthy();

    // const v = schema.
    const p1_questionVariable = p1.getQuestionVariables(prefix, 0)[0];
    const p2_questionVariable = p2.getQuestionVariables(prefix, 1)[0];
    const p3_questionVariable = p3.getQuestionVariables(prefix, 2)[0];

    const ans1: SumScoreAnswer = {
      varId: p1_questionVariable.varId,
      value: 1,
      varLabel: p1_questionVariable.label,
      valueLabel: "Ja",
    };

    const ans2: SumScoreAnswer = {
      varId: p2_questionVariable.varId,
      value: 2,
      varLabel: p2_questionVariable.label,
      valueLabel: "Ja",
    };
    const ans3: SumScoreAnswer = {
      varId: p3_questionVariable.varId,
      value: 3,
      varLabel: p3_questionVariable.label,
      valueLabel: "Ja",
    };

    const sumScores = SumScore.calculateAll(schema.toJson(), [ans1, ans2, ans3]);
    const ss1 = sumScores[0] as SumScore;
    const ss2 = sumScores[1] as SumScore;
    const ss3 = sumScores[2] as SumScore;

    expect(sumScores.length).toBe(3);
    // BASED ON IS WORKING.
    expect(ss1.basedOn.length).toBe(2);
    expect(ss2.basedOn.length).toBe(1);
    expect(ss3.basedOn.length).toBe(3);
    const isBasedOn = (sumScore: SumScore, variableId: string, variableLabel: string) => {
      const found = sumScore.basedOn.find((basedOnItem) => basedOnItem.varId === variableId);

      expect(found?.varId).toBe(variableId);
      expect(found?.varLabel).toBe(variableLabel);
    };
    isBasedOn(ss1, ans1.varId, p1_questionVariable.label);
    isBasedOn(ss1, ans2.varId, p2_questionVariable.label);
    isBasedOn(ss2, ans2.varId, p2_questionVariable.label);
    isBasedOn(ss3, ans1.varId, p1_questionVariable.label);
    isBasedOn(ss3, ans2.varId, p2_questionVariable.label);
    isBasedOn(ss3, ans3.varId, p3_questionVariable.label);
    expect(ss1.sumScore).toBe(3);
    expect(ss2.sumScore).toBe(2);
    expect(ss3.sumScore).toBe(6);
  });
});
