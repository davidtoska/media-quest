import { DTimestamp } from "../common/DTimestamp";
import { Fact } from "../rules/fact";
import { MqEvent } from "../events/mq-events";

export interface PageResult {
  readonly pageId: string;
  readonly pagePrefix: string;
  readonly eventLog: ReadonlyArray<MqEvent>;
  readonly pageTime: DTimestamp.Diff;
  readonly collectedFacts: Fact[];
}
