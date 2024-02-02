import { PageID } from "../primitives/ID";

/**
 * Interface representing a code book question sum-score.
 *
 * @interface
 */
export interface CodeBookQuestionVariable {
  readonly kind: "codebook-question-variable";
  readonly label: string;
  readonly varId: string;
  readonly pageId: PageID;
  readonly pagePrefix: string;
  readonly modulePrefix: string;
  /**
   * Show the position of the question on page (a, b, c, d, ...)
   */
  readonly questionPrefix: string;
  readonly pagePosition: number;
  readonly options: ReadonlyArray<{ label: string; value: number }>;
}

export interface CodebookPredefinedVariable {
  readonly kind: "codebook-predefined-variable";
  readonly modulePrefix: string;
  readonly moduleID: string;
  defaultValue: number;
  options: Array<{ label: string; value: number }>;
}
