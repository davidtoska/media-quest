import { PageID } from "@media-quest/engine";
import { PagePrefixValue } from "../prefix";

export interface ExcludeByPageAction {
  readonly kind: "exclude-by-pageId";
  readonly pageId: PageID;
  readonly pagePrefix: PagePrefixValue;
  readonly mainText: string;
  readonly pageNumber: number;
}

export interface JumpToPageAction {
  readonly kind: "jump-to-page";
  readonly pageId: PageID;
  readonly pagePrefix: PagePrefixValue;
  readonly mainText: string;
  readonly pageNumber: number;
}

export interface ExcludeByTagAction {
  readonly kind: "exclude-by-tag";
  readonly tag: string;
  readonly description: string;
  readonly pageCount: number;
}

interface ISearchable {
  getLabel(): string;
  getTooltip(): string;
  getSearchString(): string;
}
interface ISelectable {
  isSelected: boolean;
}

export class ExcludeByPage implements ISearchable, ISelectable {
  isSelected: boolean = false;
  constructor(
    readonly pageId: PageID,
    readonly pagePrefix: PagePrefixValue,
    readonly mainText: string,
    readonly pageNumber: number,
    isSelected: boolean,
  ) {
    this.isSelected = isSelected;
  }
  getLabel(): string {
    return this.pagePrefix + " (" + this.pageNumber + ")";
  }
  getTooltip(): string {
    return this.mainText;
  }
  getSearchString(): string {
    return this.pagePrefix + this.mainText;
  }
}
class ExcludeByTag implements ISearchable {
  constructor(
    readonly tag: string,
    readonly description: string,
    readonly usedInPages: number,
  ) {}
  getLabel(): string {
    return this.tag + " (" + this.usedInPages + ")";
  }
  getTooltip(): string {
    return this.description;
  }
  getSearchString(): string {
    return this.tag;
  }
}
class SelectableCollection<T> {
  private readonly _items: Array<T>;
  private selected: T | false = false;
  constructor(items: ReadonlyArray<T>) {
    this._items = [...items];
  }
}
