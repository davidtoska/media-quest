import { DTimestamp } from "../common/DTimestamp";
import { Fact } from "../rules/fact";

export interface PageResult {
  readonly pageId: string;
  readonly pagePrefix?: string;
  readonly pageEntered: DTimestamp;
  readonly pageExited: DTimestamp;
  readonly pageTime: DTimestamp.Diff;
  readonly collectedFacts: Fact[];
}
