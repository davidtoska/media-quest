import { Fact } from "../rules/fact";
import { MqEvent } from "../events/mq-events";
import { PageResult } from "../page/page-result";

export interface SchemaResult {
  readonly schemaId: string;
  readonly pagesLeft: number;
  readonly predefinedFacts: ReadonlyArray<Fact>;
  readonly eventLog: ReadonlyArray<MqEvent>;
  readonly answers: ReadonlyArray<Fact>;
  readonly pageResults?: ReadonlyArray<PageResult>;
}
