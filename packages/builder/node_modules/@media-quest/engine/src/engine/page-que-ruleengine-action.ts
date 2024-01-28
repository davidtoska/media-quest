import { PageID } from "../utils/ID";

export type RuleActionPageQue =
  | { kind: "excludeByTag"; tagIds: string[] }
  | { kind: "excludeByPageId"; pageIds: Array<PageID> }
  | { kind: "jumpToPage"; pageId: PageID };
