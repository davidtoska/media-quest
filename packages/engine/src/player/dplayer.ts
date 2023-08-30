import { AnsweredQuestion, HistoryQue, PageHistory } from "./history-que";
import { RuleEngine } from "../rules/rule-engine";
import { NextQue } from "./next-que";
import { PageDto, SchemaDto } from "../dto/SchemaDto";
import { NavigationCommand, PageQueCommand } from "../commands/DCommand";
import { DUtil } from "../utils/DUtil";

export type DPlayerData = Pick<SchemaDto, "pages" | "pageSequences" | "rules">;
export class DPlayer {
  private history = new HistoryQue();
  private ruleEngine = new RuleEngine<PageQueCommand, PageQueCommand>();
  private nextQue = new NextQue();
  private data: DPlayerData;

  constructor(data: DPlayerData) {
    this.data = data;
    this.nextQue.resetQue(data.pages);
  }

  saveHistory(pageHistory: PageHistory) {
    console.log("SAVE HISTORY", pageHistory);
    this.history.addToHistory(pageHistory);
    const facts = this.history.getFacts();
    const result = this.ruleEngine.solveAll(this.data.rules, facts);
    const matchingRules = result.matching;
    const actions = matchingRules.map((r) => r.actionList).flat(1);
    actions.forEach((a) => {
      console.log(a.payload);
      switch (a.kind) {
        case "PAGE_QUE_JUMP_TO_PAGE_COMMAND":
          this.nextQue.jumpToPageById(a.payload.pageId);
          break;
        case "PAGE_QUE_EXCLUDE_BY_PAGE_ID_COMMAND":
          this.nextQue.removeByPageId(a.payload.pageIds);
          break;
        case "PAGE_QUE_EXCLUDE_BY_TAG_COMMAND":
          this.nextQue.removeByTag(a.payload.tagIds);
          break;
        default:
          console.log("UNKNOWN ACTION", a);
          const check: never = a;
      }
    });
    console.log(actions);
  }

  getResults(): AnsweredQuestion[] {
    return this.history.getAnswers();
  }

  private goToPageById(pageId: string) {
    this.nextQue.jumpToPageById(pageId);
  }

  handleNavigationCommand(command: NavigationCommand) {
    switch (command.kind) {
      case "PAGE_QUE_NEXT_PAGE_COMMAND":
        // NO NEED TO DO ANYTHING
        break;
      case "PAGE_QUE_GO_TO_PAGE_COMMAND":
        this.goToPageById(command.payload.pageId);
        break;
      case "PAGE_QUE_GO_TO_SEQUENCE_COMMAND":
        this.insertSequenceById(command.payload.sequenceId);
        break;

      default:
        DUtil.neverCheck(command);
    }
  }

  getNextPage(): PageDto | false {
    // TODO HANDLE RULES!!
    return this.nextQue.pop();
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
