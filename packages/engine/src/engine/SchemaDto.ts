import { Rule } from "../rules/rule";
import { Fact } from "../rules/fact";
import { RuleActionPageQue } from "./page-que-ruleengine-action";
import { PageDto } from "../page/Page";

export type PageQueRules = Rule<RuleActionPageQue, never>;

export interface PageSequenceDto {
  readonly id: string;
  readonly rules: Array<PageQueRules>;
  readonly pages: Array<PageDto>;
}

export interface SchemaDto {
  readonly id: string;
  readonly baseHeight: number;
  readonly baseWidth: number;
  readonly backgroundColor: string;
  readonly pages: Array<PageDto>;
  readonly rules: Array<PageQueRules>;
  readonly pageSequences?: Array<PageSequenceDto>;
  readonly predefinedFacts?: ReadonlyArray<Fact>;
}
