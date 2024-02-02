import { BuilderPageDto } from "../Builder-page";
import { BuilderSchemaDto } from "../Builder-schema";
import { CodeBookQuestionVariable, CodebookPredefinedVariable } from "./codebook-variable";

export interface Codebook {
  readonly predefinedVariables: ReadonlyArray<CodebookPredefinedVariable>;
  readonly pageVariables: ReadonlyArray<CodeBookQuestionVariable>;
}

const fromPage = (
  page: BuilderPageDto,
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

  const variable: CodeBookQuestionVariable = {
    kind: "codebook-question-variable",
    label: page.mainText.text,
    pageId: page.id,
    pagePrefix: page.prefix,
    options,
    modulePrefix,
    pagePosition,
    questionPrefix: "",
    varId: modulePrefix + "_" + page.prefix,
  };

  variables.push(variable);

  return variables;
};

/**
 * Converts a list of pages into a list of question-variables
 * @param pages
 * @param modulePrefix
 */
const getPageVariablesFromPages = (
  pages: BuilderPageDto[],
  modulePrefix: string,
): CodeBookQuestionVariable[] => {
  const variables: CodeBookQuestionVariable[] = [];
  pages.forEach((page, index) => {
    const pageVariables = fromPage(page, index, modulePrefix);
    variables.push(...pageVariables);
  });
  return variables;
};

const fromSchema = (schema: BuilderSchemaDto): Codebook => {
  const modulePrefix = schema.prefix;
  const pageVariables = getPageVariablesFromPages(schema.pages, modulePrefix);
  const vs = schema.predefinedVariables;
  const predefinedVariables: CodebookPredefinedVariable[] = vs ? [...vs] : [];
  return { pageVariables, predefinedVariables };
};

export const _CodeBook = {
  fromSchema,
} as const;

export const CodeBook = Object.freeze(_CodeBook);
