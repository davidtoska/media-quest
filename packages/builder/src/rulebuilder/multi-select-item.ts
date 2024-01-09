import { ExcludeByPageAction, ExcludeByTagAction } from "./RuleAction";

export abstract class MultiSelectItem<T> {
  private readonly _isSelectedInitially: boolean;
  private readonly _selectLabel;
  private readonly _toolTip;
  private readonly _searchString;
  public isSelected: boolean;
  get selectLabel(): string {
    return this._selectLabel;
  }
  get tooltip() {
    return this._toolTip;
  }

  get searchString() {
    return this._searchString;
  }
  protected constructor(
    readonly data: T,
    isSelected: boolean,
  ) {
    this._isSelectedInitially = isSelected;
    this.isSelected = isSelected;
    this._searchString = this.getSearchString();
    this._toolTip = this.getTooltip();
    this._selectLabel = this.getSelectLabel();
  }
  protected abstract getSelectLabel(): string;
  protected abstract getTooltip(): string;
  protected abstract getSearchString(): string;
}

export class ExcludeByTagSelectItem extends MultiSelectItem<ExcludeByTagAction> {
  public static readonly create = (tagData: ExcludeByTagAction, isSelected: boolean) => {
    return new ExcludeByTagSelectItem(tagData, isSelected);
  };
  protected constructor(data: ExcludeByTagAction, isSelected: boolean) {
    super(data, isSelected);
  }
  protected getSearchString(): string {
    return this.data.tag;
  }

  protected getSelectLabel(): string {
    return this.data.tag + " (" + this.data.pageCount + ")";
  }

  protected getTooltip(): string {
    return this.data.tag + "  (used in " + this.data.pageCount + " pages)";
  }
}

export class ExcludeByPageIdSelectItem extends MultiSelectItem<ExcludeByPageAction> {
  public static create = (ruleActionPage: ExcludeByPageAction, isSelected: boolean) => {
    return new ExcludeByPageIdSelectItem(ruleActionPage, isSelected);
  };

  protected constructor(data: ExcludeByPageAction, isSelected: boolean) {
    super(data, isSelected);
  }
  protected getSearchString(): string {
    return this.data.pagePrefix + this.data.mainText;
  }

  protected getSelectLabel(): string {
    return this.data.pagePrefix + " (" + this.data.pageNumber + ")";
  }

  protected getTooltip(): string {
    return this.data.mainText;
  }
}
