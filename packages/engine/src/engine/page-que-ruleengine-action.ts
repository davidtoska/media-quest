export type RuleActionPageQue =
  | { kind: "excludeByTag"; tagIds: string[] }
  | { kind: "excludeByPageId"; pageIds: Array<string> }
  | { kind: "jumpToPage"; pageId: string };
