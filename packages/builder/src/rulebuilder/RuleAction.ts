export interface ExcludeByPageAction {
  readonly kind: 'exclude-by-pageId';
  readonly pageId: string;
  readonly mainText: string;
  readonly pageNumber: number;
}

export interface JumpToPageAction {
  readonly kind: 'jump-to-page';
  readonly pageId: string;
  readonly mainText: string;
  readonly pageNumber: number;
}

export interface ExcludeByTagAction {
  readonly kind: 'exclude-by-tag';
  readonly tag: string;
  readonly description: string;
  readonly pageCount: number;
}
