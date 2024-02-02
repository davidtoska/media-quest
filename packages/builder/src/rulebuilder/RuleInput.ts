import type { RuleQuestionVariable, RuleCustomVariable, RuleVariable } from "./RuleVariable";
import type { ExcludeByPageAction, ExcludeByTagAction, JumpToPageAction } from "./RuleAction";
import { JumpToPageSelectItem } from "./SingleSelectItem";

/**
 * TODO Crate filters for "cardinality" or "order" of a sum-score;
 * Return legal lists of variables.
 */
export class RuleInput {
  constructor(
    private readonly _questionVariables: ReadonlyArray<RuleQuestionVariable>,
    private readonly _customVariables: ReadonlyArray<RuleCustomVariable>,
    private readonly _pageIdActions: ReadonlyArray<ExcludeByPageAction>,
    private readonly _tagActions: ReadonlyArray<ExcludeByTagAction>,
    private readonly _jumpActions: ReadonlyArray<JumpToPageAction>,
  ) {}

  get questionVars(): ReadonlyArray<RuleVariable> {
    return this._questionVariables;
  }

  getConditionInput(): ReadonlyArray<RuleVariable> {
    return [...this.questionVars, ...this.customVars];
  }

  getJumpToPageOptions(): ReadonlyArray<JumpToPageSelectItem> {
    return this._jumpActions.map(JumpToPageSelectItem.create);
  }

  get customVars(): ReadonlyArray<RuleCustomVariable> {
    return this._customVariables;
  }

  get excludeByPageIdActions() {
    return this._pageIdActions;
  }

  get excludeByTagActions() {
    return this._tagActions;
  }
  get jumpToPageActions() {
    return this._jumpActions;
  }
}
