import type { RuleInput } from "./RuleInput";
import { JumpToPageSelectItem } from "./SingleSelectItem";

export class JumpToActionManager {
  readonly options: ReadonlyArray<JumpToPageSelectItem>;
  private _selected: JumpToPageSelectItem | false;
  constructor(
    private readonly validOptions: RuleInput["_jumpActions"],
    private readonly initialSelection: string | false | undefined,
  ) {
    this.options = validOptions.map(JumpToPageSelectItem.create);
    this._selected = this.findSelected(initialSelection);
  }
  get selected(): JumpToPageSelectItem | false {
    return this._selected;
  }
  set selected(selected: JumpToPageSelectItem | false) {
    this._selected = this.findSelected(selected);
  }
  getSelectedPageId(): string | false {
    return this._selected ? this._selected.data.pageId : false;
  }
  private findSelected(value: unknown): JumpToPageSelectItem | false {
    if (!value) return false;
    if (value instanceof JumpToPageSelectItem) {
      return this.options.find((v) => v === value) || false;
    }
    if (typeof value === "string") {
      return this.options.find((v) => v.data.pageId === value) || false;
    }
    return false;
  }
}
