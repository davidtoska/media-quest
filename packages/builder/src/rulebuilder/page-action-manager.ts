import type { RuleInput } from "./RuleInput";
import { ExcludeByPageIdSelectItem } from "./multi-select-item";
import { ExcludeByPageAction } from "./RuleAction";

export class PageActionManager {
  private readonly _initialSelection: Set<string>;
  readonly selectItems: ReadonlyArray<ExcludeByPageIdSelectItem>;

  constructor(
    readonly validOptions: RuleInput["_pageIdActions"],
    readonly initialSelection: ReadonlyArray<string>,
  ) {
    this._initialSelection = new Set([...initialSelection]);
    this.selectItems = validOptions.map((opt) => {
      const isSelected = this._initialSelection.has(opt.pageId);
      return ExcludeByPageIdSelectItem.create(opt, isSelected);
    });
  }

  getCurrentSelection(): ReadonlyArray<string> {
    const selected = this.selectItems.filter((item) => item.isSelected).map((itm) => itm.data.pageId);
    return selected;
  }

  getEngineAction(): ReadonlyArray<ExcludeByPageAction> {
    const selectItems = this.selectItems.filter((item) => item.isSelected);
    const actions = selectItems.map((item) => item.data);
    return [...actions];
  }
}
