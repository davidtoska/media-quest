import { PageID } from "../primitives/ID";
import { SumScoreVariableDto } from "../sum-score/sum-score-variable";

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
  readonly pagePosition: number;
  readonly options: ReadonlyArray<{ label: string; value: number }>;
  readonly includedInSumScores: ReadonlyArray<SumScoreVariableDto>;
}

export interface CodebookPredefinedVariable {
  readonly kind: "codebook-predefined-variable";
  readonly modulePrefix: string;
  readonly moduleID: string;
  defaultValue: number;
  options: Array<{ label: string; value: number }>;
}
