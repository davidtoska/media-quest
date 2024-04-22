import { Fact } from "../rules/fact";
import { PageResult } from "../page/page-result";

export class HistoryQue {
  private history: PageResult[] = [];

  getFacts(): Array<Fact> {
    const answers = this.history.map((h) => h.collectedFacts).flat(1);
    // const facts = answers.map((a) => a.fact);
    // TODO FIND LATEST FACT (answer) if have multiple.
    return answers;
  }

  getPageResults(): PageResult[] {
    return [...this.history];
  }

  addToHistory(result: PageResult) {
    this.history.push(result);
  }
}
