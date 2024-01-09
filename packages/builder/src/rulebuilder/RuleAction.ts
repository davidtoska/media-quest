import { PageID } from "@media-quest/engine";

import { PagePrefixValue } from "../primitives/page-prefix";

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

// interface ISearchable {
//   getLabel(): string;
//   getTooltip(): string;
//   getSearchString(): string;
// }
// interface ISelectable {
//   isSelected: boolean;
// }
//
// export class PageAction implements ISearchable, ISelectable {
//   public readonly description = "Will exclude this page from the survey.";
//   private _isSelected: boolean = false;
//   get isSelected(): boolean {
//     return this._isSelected;
//   }
//   set isSelected(value: boolean) {
//     const casted = value as unknown;
//     if (typeof casted === "boolean") {
//       this._isSelected = casted;
//     }
//   }
//   get pageId(): PageID {
//     return this.data.pageId;
//   }
//   get pagePrefix(): PagePrefixValue {
//     return this.data.pagePrefix;
//   }
//   get mainText(): string {
//     return this.data.mainText;
//   }
//   get pageNumber(): number {
//     return this.data.pageNumber;
//   }
//   constructor(
//     private readonly data: {
//       pageId: PageID;
//       pagePrefix: PagePrefixValue;
//       mainText: string;
//       pageNumber: number;
//       isSelected: boolean;
//     },
//   ) {
//     this.isSelected = this.data.isSelected;
//   }
//
//   getLabel(): string {
//     return this.data.pagePrefix + " (" + this.data.pageNumber + ")";
//   }
//   getTooltip(): string {
//     return this.data.mainText;
//   }
//   getSearchString(): string {
//     return this.data.pagePrefix + this.data.mainText;
//   }
// }
// export class TagAction implements ISearchable {
//   constructor(
//     readonly tag: string,
//     readonly description: string,
//     readonly usedInPages: { pageNumber: number; pagePrefix: PagePrefixValue }[],
//   ) {}
//   getLabel(): string {
//     return this.tag + " (" + this.usedInPages.length + ")";
//   }
//   getTooltip(): string {
//     return this.description;
//   }
//   getSearchString(): string {
//     return this.tag;
//   }
// }

// class SelectableCollection<T> {
//   private readonly _items: Array<T>;
//   private selected: T | false = false;
//   constructor(items: ReadonlyArray<T>) {
//     this._items = [...items];
//   }
// }
