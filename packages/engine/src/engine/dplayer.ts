import { HistoryQue } from "./history-que";
import { RuleEngine } from "../rules/rule-engine";
import { NextQue } from "./next-que";
import { SchemaDto } from "./SchemaDto";
import { RuleActionPageQue } from "./page-que-ruleengine-action";
import { PageDto } from "../page/Page";
import { PageResult } from "../page/page-result";
import { Fact } from "../rules/fact";
import { MqEvent } from "../events/mq-events";

export type DPlayerData = Pick<SchemaDto, "pages" | "pageSequences" | "rules" | "predefinedFacts">;
export class DPlayer {
  private readonly eventLog: Array<MqEvent> = [];
  private history = new HistoryQue();
  private ruleEngine = new RuleEngine<RuleActionPageQue, never>();
  private nextQue = new NextQue();
  private data: DPlayerData;
  private readonly predefinedFacts: ReadonlyArray<Fact>;

  constructor(data: DPlayerData) {
    this.data = data;
    const pages = data.pages ?? [];
    this.predefinedFacts = data.predefinedFacts ? [...data.predefinedFacts] : [];
    this.nextQue.resetQue(pages);
  }

  saveEvent(event: MqEvent) {
    this.eventLog.push(event);
  }

  saveHistory(pageHistory: PageResult) {
    // console.log("SAVE HISTORY", pageHistory);
    this.history.addToHistory(pageHistory);
    this.eventLog.push(...pageHistory.eventLog);
    // Evaluate rules
    const userGeneratedFact = this.history.getFacts();
    const predefinedFacts = this.predefinedFacts;
    const facts = [...userGeneratedFact, ...predefinedFacts];
    const result = this.ruleEngine.solveAll(this.data.rules, facts);

    const matchingRules = result.matching;
    const actions = matchingRules.map((r) => r.actionList).flat(1);
    // Execute actions
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
  }

  getResults() {
    const pagesLeft = this.nextQue.size;
    const answerFacts = this.history.getFacts();
    const predefinedFacts = this.predefinedFacts;
    const eventLog = [...this.eventLog];
    return { answerFacts, predefinedFacts, eventLog, pagesLeft };
  }

  insertSequence(sequenceId: string) {
    this.insertSequenceById(sequenceId);
  }

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
   * Total number of pages left in que
   */
  get pagesLeft(): number {
    return this.nextQue.pageCount;
  }

  /**
   * Total number of pages in test
   */
  get totalPageCount(): number {
    return this.data.pages.length;
  }
}
