import { PageID } from "../utils/ID";

type CommandTarget = "PAGE_QUE";
type CommandKind = `${Uppercase<CommandTarget>}_${Uppercase<string>}_COMMAND`;

export type NavigationCommand =
  // | CommandDto<"PAGE_QUE_NEXT_PAGE_COMMAND", "PAGE_QUE", {}>
  | CommandDto<"PAGE_QUE_GO_TO_SEQUENCE_COMMAND", "PAGE_QUE", { sequenceId: string }>
  | CommandDto<"PAGE_QUE_GO_TO_PAGE_COMMAND", "PAGE_QUE", { pageId: string }>;

interface CommandDto<K extends CommandKind, T extends CommandTarget, P> {
  readonly kind: K;
  readonly target: T;
  readonly targetId: T | Omit<string, T>;
  readonly payload: P;
}

export type PageQueCommand =
  | CommandDto<"PAGE_QUE_EXCLUDE_BY_TAG_COMMAND", "PAGE_QUE", { tagIds: string[] }>
  | CommandDto<"PAGE_QUE_EXCLUDE_BY_PAGE_ID_COMMAND", "PAGE_QUE", { pageIds: Array<PageID> }>
  | CommandDto<"PAGE_QUE_JUMP_TO_PAGE_COMMAND", "PAGE_QUE", { readonly pageId: string }>;
