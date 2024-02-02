import { SumScore } from "./sum-score";
import { SumScoreVariableDto } from "./sum-score-variable";
import { SumScoreVariableID } from "../primitives/ID";
import { SumScoreAnswer } from "./sum-score-answer";

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

const createSumScore = (basedOn: SumScoreVariableDto["basedOn"]) => {
  const id = SumScoreVariableID.create();
  const sumVar1: SumScoreVariableDto = {
    id,
    name: "",
    description: "",
    useAvg: true,
    basedOn,
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
    const ss1 = createSumScore([
      { varId: a1.varId, varLabel: a1.varLabel, weight: 1 },
      { varId: a2.varId, varLabel: a2.varLabel, weight: 1 },
      { varId: a9.varId, varLabel: a9.varLabel, weight: 1 },
    ]);
    const score = SumScore.calculate(ss1, all);
    expect(score.sumScore).toBe(3);
    expect(score.basedOn.length).toBe(3);
    expect(score.avg).toBe(1.5);
    expect(score.skippedBy9Count).toBe(1);
  });
  test("Will calculate 5 values", () => {
    const ss1 = createSumScore([
      { varId: a1.varId, varLabel: a1.varLabel, weight: 1 },
      { varId: a2.varId, varLabel: a2.varLabel, weight: 1 },
      { varId: a4.varId, varLabel: a4.varLabel, weight: 1 },
      { varId: a5.varId, varLabel: a5.varLabel, weight: 1 },
      { varId: a6.varId, varLabel: a6.varLabel, weight: 1 },
      { varId: a9.varId, varLabel: a9.varLabel, weight: 0.5 },
    ]);
    const score = SumScore.calculate(ss1, all);
    expect(score.sumScore).toBe(18);
    expect(score.avg).toBe(3.6);
    const basedOn1 = score.basedOn[0];
    expect(basedOn1.value).toBe(a1.value);
    expect(basedOn1.weight).toBe(1);
    expect(basedOn1.varId).toBe(a1.varId);
    expect(basedOn1.varLabel).toBe(a1.varLabel);
  });
  test("Will not include 9 in includedAnswersCount", () => {
    const ss1 = createSumScore([
      { varId: a0.varId, varLabel: a0.varLabel, weight: 1 },
      { varId: a1.varId, varLabel: a1.varLabel, weight: 1 },
      { varId: a5.varId, varLabel: a5.varLabel, weight: 1 },
      { varId: a9.varId, varLabel: a9.varLabel, weight: 1 },
    ]);
    const score = SumScore.calculate(ss1, all);
    expect(score.sumScore).toBe(6);
    expect(score.avg).toBe(2);
    expect(score.includedAnswerCount).toBe(3);
  });
  test("Will calculate weight", () => {
    const ss1 = createSumScore([
      { varId: a1.varId, varLabel: a1.varLabel, weight: 1 },
      { varId: a8.varId, varLabel: a8.varLabel, weight: 0.5 },
    ]);
    const score = SumScore.calculate(ss1, all);
    expect(score.sumScore).toBe(5);
  });
  test("Will calculate many weighted variables.", () => {
    const ss1 = createSumScore([
      { varId: a1.varId, varLabel: a1.varLabel, weight: 1 },
      { varId: a2.varId, varLabel: a2.varLabel, weight: 0.5 },
      { varId: a5.varId, varLabel: a5.varLabel, weight: 1.2 },
      { varId: a8.varId, varLabel: a8.varLabel, weight: 2 },
    ]);
    const score = SumScore.calculate(ss1, all);
    expect(score.sumScore).toBe(24);
  });
  test("Will count missing answers (missingAnswersCount)", () => {
    const ss1 = createSumScore([
      { varId: a1.varId, varLabel: a1.varLabel },
      { varId: a2.varId, varLabel: a2.varLabel },
      { varId: a3.varId, varLabel: a3.varLabel },
      { varId: a5.varId, varLabel: a5.varLabel },
      { varId: a9.varId, varLabel: a9.varLabel },
    ]);
    const missing5InDataSet = [a1, a2, a8];
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
      { varId: a0.varId, varLabel: a0.varLabel },
      { varId: a1.varId, varLabel: a1.varLabel },
      { varId: a2.varId, varLabel: a2.varLabel },
      { varId: a9.varId, varLabel: a9.varLabel },
    ]);
    const answers = [a1, a7, a8, a9];
    const score = SumScore.calculate(ss1, answers);

    expect(score.includedAnswerCount + score.missingAnswerCount + score.skippedBy9Count).toBe(
      ss1.basedOn.length,
    );
  });
});
