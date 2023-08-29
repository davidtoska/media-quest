import type { RuleInput } from "./RuleInput";
import { ExcludeByTagSelectItem } from "./multi-select-item";
import { ExcludeByTagAction } from "./RuleAction";

export class TagActionManager {
  private readonly _initialSelection: Set<string>;
  readonly selectItems: ReadonlyArray<ExcludeByTagSelectItem>;
  constructor(
    readonly validOptions: RuleInput["_tagActions"],
    readonly initialSelection: ReadonlyArray<string>,
  ) {
    this._initialSelection = new Set([...initialSelection]);
    this.selectItems = validOptions.map((opt) => {
      const isSelected = this._initialSelection.has(opt.tag);
      return ExcludeByTagSelectItem.create(opt, isSelected);
    });
  }
  getCurrentSelection(): ReadonlyArray<string> {
    const selected = this.selectItems.filter((item) => item.isSelected).map((itm) => itm.data.tag);
    return selected;
  }

  getEngineActions(): ReadonlyArray<ExcludeByTagAction> {
    const selected = this.selectItems.filter((item) => item.isSelected);
    const tagActions = selected.map((s) => s.data);
    return [...tagActions];
  }
}
