import { BVariable } from "./b-variable";
import { SumScore } from "./sum-score";
import { SumScoreVariableDto } from "./sum-score-variable";
const createVariable = (value: number): BVariable => {
  return {
    varId: "v" + value,
    label: "label for v" + value,
    numericValue: value,
    origin: "question",
    kind: "numeric-variable",
  };
};

const createSumScore = (basedOn: Array<{ variable: BVariable; weight?: number }>) => {
  const sumVar1: SumScoreVariableDto = {
    kind: "numeric-variable",
    initialValue: 0,
    min: 0,
    origin: "sum-score",
    label: "Sum 123",
    varId: "sum-score-variable-id",
    basedOn: basedOn.map((v) => ({ varId: v.variable.varId, weight: v.weight })),
  };
  return sumVar1;
};

const v0 = createVariable(0);
const v1 = createVariable(1);
const v2 = createVariable(2);
const v3 = createVariable(3);
const v4 = createVariable(4);
const v5 = createVariable(5);
const v6 = createVariable(6);
const v7 = createVariable(7);
const v8 = createVariable(8);
const v9 = createVariable(9);

const all = [v0, v1, v2, v3, v4, v5, v6, v7, v8, v9];
describe("Sum score variable.", () => {
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
    const ss1 = createSumScore([
      { variable: v1, weight: 1 },
      { variable: v2, weight: 1 },
      { variable: v9, weight: 1 },
    ]);
    const score = SumScore.calculate(ss1, all);
    expect(score.sumScore).toBe(3);
    expect(score.basedOn.length).toBe(3);
    expect(score.avg).toBe(1.5);
    expect(score.skippedBy9Count).toBe(1);
  });
  test("Will calculate 5 values", () => {
    const ss1 = createSumScore([
      { variable: v1, weight: 1 },
      { variable: v2, weight: 1 },
      { variable: v4, weight: 1 },
      { variable: v5, weight: 1 },
      { variable: v6, weight: 1 },
      { variable: v9, weight: 0.5 },
    ]);
    const score = SumScore.calculate(ss1, all);
    expect(score.sumScore).toBe(18);
    expect(score.avg).toBe(3.6);
    const basedOn1 = score.basedOn[0];
    expect(basedOn1.value).toBe(v1.numericValue);
    expect(basedOn1.weight).toBe(1);
    expect(basedOn1.varId).toBe(v1.varId);
    expect(basedOn1.varLabel).toBe(v1.label);
  });
  test("Will not include 9 in includedAnswersCount", () => {
    const ss1 = createSumScore([
      { variable: v0, weight: 1 },
      { variable: v1, weight: 1 },
      { variable: v5, weight: 1 },
      { variable: v9, weight: 1 },
    ]);
    const score = SumScore.calculate(ss1, all);
    expect(score.sumScore).toBe(6);
    expect(score.avg).toBe(2);
    expect(score.includedAnswerCount).toBe(3);
  });
  test("Will calculate weight", () => {
    const ss1 = createSumScore([
      { variable: v1, weight: 1 },
      { variable: v8, weight: 0.5 },
    ]);
    const score = SumScore.calculate(ss1, all);
    expect(score.sumScore).toBe(5);
  });
  test("Will calculate many weighted variables.", () => {
    const ss1 = createSumScore([
      { variable: v1, weight: 1 },
      { variable: v2, weight: 0.5 },
      { variable: v5, weight: 1.2 },
      { variable: v8, weight: 2 },
    ]);
    const score = SumScore.calculate(ss1, all);
    expect(score.sumScore).toBe(24);
  });
  test("Will count missing answers (missingAnswersCount)", () => {
    const ss1 = createSumScore([
      { variable: v1 },
      { variable: v2 },
      { variable: v3 },
      { variable: v5 },
      { variable: v9 },
    ]);
    const missing5InDataSet = [v1, v2, v8];
    const score = SumScore.calculate(ss1, missing5InDataSet);
    expect(score.sumScore).toBe(3);
    expect(score.includedAnswerCount).toBe(2);
    expect(score.missingAnswerCount).toBe(3);
    expect(score.avg).toBe(1.5);
    expect(score.basedOn.length).toBe(2);
    expect(score.avg).toBe(1.5);
    expect(score.errorMessages.length).toBe(0);
  });
  test("includedAnswerCount + missingAnswerCount + skippedBy9Count = SumScoreVariable.basedOn.length", () => {
    const ss1 = createSumScore([
      { variable: v0 },
      { variable: v1 },
      { variable: v2 },
      { variable: v9 },
    ]);
    const answers = [v1, v7, v8, v9];
    const score = SumScore.calculate(ss1, answers);

    expect(score.includedAnswerCount + score.missingAnswerCount + score.skippedBy9Count).toBe(
      ss1.basedOn.length,
    );
  });
});
