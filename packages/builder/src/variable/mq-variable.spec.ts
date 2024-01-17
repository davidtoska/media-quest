import { MqVariable } from "./mq-variable";
import { SumScoreVariable } from "./sum-score-variable";
const createVariable = (value: number): MqVariable => {
  return {
    varId: "v" + value,
    label: "label for v" + value,
    numericValue: value,
    origin: "question",
    kind: "numeric-variable",
  };
};

const createSumScore = (basedOn: Array<{ variable: MqVariable; weight?: number }>) => {
  const sumVar1: SumScoreVariable = {
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
  test("Will calculate 2", () => {
    const ss1 = createSumScore([
      { variable: v1, weight: 1 },
      { variable: v2, weight: 1 },
    ]);
    const score = SumScoreVariable.calculate(ss1, all);
    expect(score.sumScore).toBe(3);
    expect(score.basedOn.length).toBe(2);
  });
  test("Will calculate 5 values", () => {
    const ss1 = createSumScore([
      { variable: v1, weight: 1 },
      { variable: v2, weight: 1 },
      { variable: v4, weight: 1 },
      { variable: v5 },
      { variable: v6, weight: 1 },
    ]);
    const score = SumScoreVariable.calculate(ss1, all);
    expect(score.sumScore).toBe(18);
    const basedOn1 = score.basedOn[0];
    expect(basedOn1.value).toBe(v1.numericValue);
    expect(basedOn1.weight).toBe(1);
    expect(basedOn1.varId).toBe(v1.varId);
    expect(basedOn1.varLabel).toBe(v1.label);
  });
  test("Will not include 9", () => {
    const ss1 = createSumScore([
      { variable: v1, weight: 1 },
      { variable: v5, weight: 1 },
      { variable: v9, weight: 1 },
    ]);
    const score = SumScoreVariable.calculate(ss1, all);
    expect(score.sumScore).toBe(6);
  });
  test("Will not calculate weight", () => {
    const ss1 = createSumScore([
      { variable: v1, weight: 1 },
      { variable: v8, weight: 0.5 },
    ]);
    const score = SumScoreVariable.calculate(ss1, all);
    expect(score.sumScore).toBe(5);
  });
  test("Will not calculate many weighted variables.", () => {
    const ss1 = createSumScore([
      { variable: v1, weight: 1 },
      { variable: v2, weight: 0.5 },
      { variable: v5, weight: 1.2 },
      { variable: v8, weight: 2 },
    ]);
    const score = SumScoreVariable.calculate(ss1, all);
    expect(score.sumScore).toBe(24);
  });
});
