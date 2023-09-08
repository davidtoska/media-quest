import { HistoryQue } from "./history-que";
import { RuleEngine } from "../rules/rule-engine";
import { NextQue } from "./next-que";
import { SchemaDto } from "./SchemaDto";
import { RuleActionPageQue } from "./page-que-ruleengine-action";
import { PageDto } from "../page/Page";
import { PageResult } from "../page/page-result";
import { Fact } from "../rules/fact";

export type DPlayerData = Pick<SchemaDto, "pages" | "pageSequences" | "rules">;
export class DPlayer {
  private history = new HistoryQue();
  private ruleEngine = new RuleEngine<RuleActionPageQue, never>();
  private nextQue = new NextQue();
  private data: DPlayerData;

  constructor(data: DPlayerData) {
    this.data = data;
    const pages = data.pages ?? [];
    this.nextQue.resetQue(pages);
  }

  saveHistory(pageHistory: PageResult) {
    // console.log("SAVE HISTORY", pageHistory);
    this.history.addToHistory(pageHistory);
    const facts = this.history.getFacts();
    const result = this.ruleEngine.solveAll(this.data.rules, facts);
    const matchingRules = result.matching;
    const actions = matchingRules.map((r) => r.actionList).flat(1);
    actions.forEach((a) => {
      // console.log(a.payload);
      switch (a.kind) {
        case "jumpToPage":
          this.nextQue.jumpToPageById(a.pageId);
          break;
        case "excludeByPageId":
          this.nextQue.removeByPageId(a.pageIds);
          break;
        case "excludeByTag":
          this.nextQue.removeByTag(a.tagIds);
          break;
        default:
          console.log("UNKNOWN ACTION", a);
          const check: never = a;
      }
    });
    // console.log(actions);
  }

  getResults(): Fact[] {
    return this.history.getFacts();
  }

  insertSequence(sequenceId: string) {
    this.insertSequenceById(sequenceId);
  }
  // getNextPage():
  //   | { kind: "first-page"; readonly page: PageDto }
  //   | { kind: "next-page"; readonly page: PageDto }
  //   | { kind: "no-more-pages" } {
  //   const next = this.nextQue.pop();
  //   const a = this.nextQue.
  // if (next) {
  //   return { kind: "next-page", page: next };
  // }
  // return { kind: "no-more-pages" };
  // }

  getNextPage(): PageDto | false {
    const next = this.nextQue.pop();
    return next ?? false;
  }

  private insertSequenceById(id: string) {
    const seq = this.data.pageSequences?.find((s) => s.id === id);
    if (seq) {
      this.nextQue.insertAsNextByForce([...seq.pages]);
    } else {
      // HOW TO HANDLE INVALID ID_REFS?? LOGGER??
      // LOG INVALID COMMAND.
    }
  }

  /**
   * Total number of pages.
   */
  get pageCount(): number {
    return this.nextQue.pageCount;
  }
}
