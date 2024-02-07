import { BuilderPageDto } from "../page/Builder-page";
import { BuilderSchemaDto } from "../Builder-schema";
import { CodeBookQuestionVariable, CodebookPredefinedVariable } from "./codebook-variable";
import { SumScoreVariableDto } from "../sum-score/sum-score-variable";

export interface Codebook {
  readonly predefinedVariables: ReadonlyArray<CodebookPredefinedVariable>;
  readonly pageVariables: ReadonlyArray<CodeBookQuestionVariable>;
}

const fromPage = (
  page: BuilderPageDto,
  sumScoreVariables: ReadonlyArray<SumScoreVariableDto>,
  pagePosition: number,
  modulePrefix: string,
): CodeBookQuestionVariable[] => {
  const variables: CodeBookQuestionVariable[] = [];

  if (page._type !== "question") {
    // TODO Implement form field variables
    return [];
  }

  const options: CodeBookQuestionVariable["options"] = page.defaultQuestion.options.map((o) => {
    return { value: o.value, label: o.label };
  });

  const varId = modulePrefix + "_" + page.prefix;

  const includedInSumScores = page.includedInSumScores.filter((a) => true);

  const variable: CodeBookQuestionVariable = {
    kind: "codebook-question-variable",
    label: page.mainText.text,
    pageId: page.id,
    pagePrefix: page.prefix,
    options,
    modulePrefix,
    pagePosition,
    varId,
    includedInSumScores: [],
  };

  variables.push(variable);

  return variables;
};

/**
 * Converts a list of pages into a list of question-variables
 * @param pages
 * @param sumScoreVariables
 * @param modulePrefix
 */
const getPageVariablesFromPages = (
  pages: ReadonlyArray<BuilderPageDto>,
  sumScoreVariables: ReadonlyArray<SumScoreVariableDto>,
  modulePrefix: string,
): CodeBookQuestionVariable[] => {
  const variables: CodeBookQuestionVariable[] = [];
  pages.forEach((page, index) => {
    const pageVariables = fromPage(page, sumScoreVariables, index, modulePrefix);
    variables.push(...pageVariables);
  });
  return variables;
};

const fromSchema = (schema: BuilderSchemaDto): Codebook => {
  const modulePrefix = schema.prefix;
  const sumScoreVariables = schema.sumScoreVariables ?? [];
  const pageVariables = getPageVariablesFromPages(schema.pages, sumScoreVariables, modulePrefix);
  const vs = schema.predefinedVariables;
  const predefinedVariables: CodebookPredefinedVariable[] = vs ? [...vs] : [];
  return { pageVariables, predefinedVariables };
};

export const _CodeBook = {
  fromSchema,
} as const;

export const CodeBook = Object.freeze(_CodeBook);
