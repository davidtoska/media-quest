import { SumScoreVariableDto } from "./sum-score-variable";
import { SumScoreVariableID } from "../primitives/ID";
import { SumScoreAnswer } from "./sum-score-answer";
import { CodeBook } from "../code-book/codebook";
import { BuilderSchemaDto } from "../Builder-schema";

/**
 *
 * A constant Array that contains all legal
 */
const ALLOWED_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const isAllowedValue = (num: number) => {
  const notNegative = num >= 0;
  const lessThanNine = num < 9;
  return notNegative && lessThanNine;
};

type BasedOnEntry =
  | { kind: "missing"; varId: string }
  | { kind: "invalid-variable"; varId: string; message: string }
  | { kind: "has-value"; varId: string; value: number; weight: number; varLabel: string };

export interface SumScore {
  sumScore: number;
  avg: number; // Alle besvarte spørsmål som ikke er 9.
  useAvg: boolean;
  includedAnswerCount: number;
  missingAnswerCount: number;
  skippedBy9Count: number; // Antall vetikke / hopp over
  basedOn: Array<{ varId: string; value: number; weight: number; varLabel: string }>;
  errorMessages: string[];
}

const calculateAll = (
  schemaDto: BuilderSchemaDto,
  answers: Array<SumScoreAnswer>,
): ReadonlyArray<SumScore> => {
  const vs = schemaDto.sumScoreVariables ?? [];

  const basedOnMap = new Map<SumScoreVariableID, Array<{ varId: string; weight: number }>>();
  const codeBook = CodeBook.fromSchema(schemaDto);
  // codeBook.pageVariables.find(v => v.pageId === )
  const pages = schemaDto.pages;
  // const a: Array<{pageId: PageID,  sumScoreVariableId: SumScoreVariableID, weight: number, varId: string}> = []

  pages.forEach((page) => {
    page.includedInSumScores.forEach((includedInScores) => {
      const variableId = includedInScores.sumScoreVariableId;
      const weight = includedInScores.weight;
      const p = codeBook.pageVariables.find((v) => v.pageId === page.id);
      if (p) {
        const currentBasedOnArray = basedOnMap.get(variableId) ?? [];
        currentBasedOnArray.push({ varId: p.varId, weight });
        basedOnMap.set(variableId, currentBasedOnArray);
      } else {
        // TODO - Global event-bus for errors?
        console.error("INVALID DATA in calculate all sum-scores.");
        // throw Error("Invalid data...");
      }
    });
  });
  // const pages = Array.isArray(schemaDto.pages) ? schemaDto.pages : [];
  const results: ReadonlyArray<SumScore> = vs.map((v) => {
    const basedOn = basedOnMap.get(v.id) ?? [];
    return calculate(v, basedOn, answers);
  });

  return results;
};
const calculate = (
  sumScoreVariable: SumScoreVariableDto,
  basedOnVariables: Array<{ varId: string; weight: number }>,
  answers: Array<SumScoreAnswer>,
): SumScore => {
  const legalValues: Array<number> = [...ALLOWED_VALUES];
  // CALCULATE THESE!!
  let includedAnswerCount = 0;
  let skippedBy9Count = 0;
  let missingAnswerCount = 0;
  let sumScore = 0;
  const errorMessages: string[] = [];
  const basedOn: SumScore["basedOn"] = [];
  const useAvg = sumScoreVariable.useAvg;

  const basedOnEntries: BasedOnEntry[] = basedOnVariables.map((scv) => {
    const maybeAnswer = answers.find((v) => v.varId === scv.varId);
    let result: BasedOnEntry = { kind: "missing", varId: scv.varId };
    if (!maybeAnswer) {
      return result;
    }

    const value = maybeAnswer.value;
    const varLabel = maybeAnswer.varLabel;
    const weight = scv.weight ?? 1;
    const varId = maybeAnswer.varId;

    result = {
      kind: "has-value",
      varId,
      weight,
      value,
      varLabel,
    };

    return result;
  });

  basedOnEntries.forEach((entry) => {
    if (entry.kind === "missing") {
      missingAnswerCount++;
    }
    if (entry.kind === "has-value") {
      const { varId, varLabel, weight, value } = { ...entry };
      const isAllowed = isAllowedValue(value);
      if (isAllowed) {
        basedOn.push({ varId, weight, value, varLabel });
        sumScore += entry.value * entry.weight;
        includedAnswerCount++;
      }
      if (value === 9) {
        skippedBy9Count++;
        basedOn.push({ varId, weight, value, varLabel });
      }
    }
    if (entry.kind === "invalid-variable") {
      errorMessages.push(entry.message);
    }
  });

  const avg = sumScore / includedAnswerCount;
  const result: SumScore = {
    avg,
    useAvg,
    includedAnswerCount,
    skippedBy9Count,
    sumScore,
    basedOn,
    missingAnswerCount,
    errorMessages,
  };
  // Calculate avg

  return result;
};
const createVariable = (): SumScoreVariableDto => {
  const id = SumScoreVariableID.create();
  return {
    id,
    name: "",
    useAvg: true,
    description: "",
    // basedOn: [],
  };
};
export const SumScore = {
  ALLOWED_VALUES,
  calculate,
  calculateAll,
  isAllowedValue,
  createVariable,
};
