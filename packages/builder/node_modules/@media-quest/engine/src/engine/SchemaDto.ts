import { Rule } from "../rules/rule";
import { Fact } from "../rules/fact";
import { RuleActionPageQue } from "./page-que-ruleengine-action";
import { SchemaID } from "../utils/ID";
import { PageDto } from "../page/Page";

export type PageQueRules = Rule<RuleActionPageQue, never>;

export interface PageSequenceDto {
  readonly id: string;
  readonly rules: Array<PageQueRules>;
  readonly pages: Array<PageDto>;
}

export interface SchemaDto {
  readonly id: SchemaID;
  readonly baseHeight: number;
  readonly baseWidth: number;
  readonly backgroundColor: string;
  readonly pages: Array<PageDto>;
  readonly rules: Array<PageQueRules>;
  readonly pageSequences?: Array<PageSequenceDto>;
  readonly predefinedFacts?: ReadonlyArray<Fact>;
}
