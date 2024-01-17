import { BuilderPageDto } from "./Builder-page";
import { BuilderSchemaDto } from "./Builder-schema";
import { PageVariable, PredefinedVariable } from "./variable/mq-variable";

export interface Codebook {
  readonly predefinedVariables: ReadonlyArray<PredefinedVariable>;
  readonly pageVariables: ReadonlyArray<PageVariable>;
}

const fromPage = (
  page: BuilderPageDto,
  pagePosition: number,
  modulePrefix: string,
): PageVariable[] => {
  const variables: PageVariable[] = [];

  if (page._type !== "question") {
    // TODO Implement form field variables
    return [];
  }

  const options: PageVariable["options"] = page.defaultQuestion.options.map((o) => {
    return { value: o.value, label: o.label };
  });

  const variable: PageVariable = {
    kind: "numeric-variable",
    label: page.mainText.text,
    options,
    modulePrefix,
    origin: "question",
    pageId: page.id,
    pagePosition,
    pagePrefix: page.prefix,
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
): PageVariable[] => {
  const variables: PageVariable[] = [];
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
  const predefinedVariables: PredefinedVariable[] = vs ? [...vs] : [];
  return { pageVariables, predefinedVariables };
};

export const _CodeBook = {
  fromSchema,
} as const;

export const CodeBook = Object.freeze(_CodeBook);
