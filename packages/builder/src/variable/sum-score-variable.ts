import { MqVariable } from "./mq-variable";

export interface SumScoreVariable extends MqVariable {
  readonly origin: "sum-score";
  initialValue: number;
  basedOn: Array<{ varId: string; weight?: number }>;
}

/**
 *
 * A constant Array that contains all legal
 */
const ALLOWED_SUM_SCORE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export interface SumScoreResult {
  sumScore: number;
  basedOn: Array<{ varId: string; value: number; weight: number; varLabel: string }>;
}
const calculate = (
  sumScoreVariable: SumScoreVariable,
  allVariables: Array<Pick<MqVariable, "varId" | "numericValue" | "kind" | "label">>,
): SumScoreResult => {
  const basedOnList = sumScoreVariable.basedOn;
  // let sum = sumScoreVariable.initialValue ?? 0;
  const result: SumScoreResult = {
    sumScore: sumScoreVariable.initialValue ?? 0,
    basedOn: [],
  };
  const legalValues: Array<number> = [...ALLOWED_SUM_SCORE_VALUES];
  allVariables.forEach((v) => {
    if (v.kind !== "numeric-variable") return;
    const numValue = v.numericValue;
    if (typeof numValue !== "number") return;
    if (!legalValues.includes(numValue)) return;

    basedOnList.forEach((item) => {
      if (item.varId === v.varId) {
        const weight = typeof item.weight === "number" ? item.weight : 1;
        const weightedValue = numValue * weight;

        result.basedOn.push({
          varId: item.varId,
          weight: weight,
          varLabel: v.label,
          value: numValue,
        });
        result.sumScore = result.sumScore + weightedValue;
        // sum = sum + weightedValue;
      }
    });
  });
  return result;
};
export const SumScoreVariable = {
  ALLOWED_SUM_SCORE_VALUES,
  calculate,
};
