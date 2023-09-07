import { DAudioDto, DElementDto, DVideoDto } from "../dto/DElement.dto";
import { Rule } from "../rules/rule";
import { Fact } from "../rules/fact";
import { AudioCommand, PageQueCommand, VideoCommand } from "../commands/DCommand";
import { PageID, SchemaID } from "../utils/ID";
import { Task } from "../page2/task";
import { Page2Dto } from "../page2/Page2";
import { DImgDto } from "../Delement/DImg";
import { DDivDto } from "../Delement/Ddiv";

export type PageQueRules = Rule<PageQueCommand, never>;
export interface PageDto {
  readonly id: PageID;
  readonly elements: Array<DElementDto>;
  readonly tags?: string[];
  readonly mainVideoId?: string;
  readonly backgroundColor?: string;
  readonly video?: Array<DVideoDto>;
  readonly audio?: Array<DAudioDto>;

  // TESTING
  readonly responseButtons?: ReadonlyArray<{ el: DDivDto; facts: [] }>;
  readonly mediaButtons?: ReadonlyArray<{ el: DDivDto; onClick: AudioCommand | VideoCommand }>;
  readonly initialTasks?: ReadonlyArray<Task>;
}

export interface PageSequenceDto {
  readonly id: string;
  readonly rules: Array<PageQueRules>;
  readonly pages: Array<Page2Dto>;
}

export interface SchemaDto {
  readonly id: SchemaID;
  readonly baseHeight: number;
  readonly baseWidth: number;
  readonly backgroundColor: string;
  readonly pages: PageDto[];
  readonly pages2: Array<Page2Dto>;
  readonly rules: Array<PageQueRules>;
  readonly pageSequences?: Array<PageSequenceDto>;
  readonly predefinedFacts?: ReadonlyArray<Fact>;
}
