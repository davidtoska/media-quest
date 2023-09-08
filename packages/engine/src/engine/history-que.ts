import { Fact } from "../rules/fact";
import { DTimestamp } from "../common/DTimestamp";
import { PageResult } from "../page/page-result";

// export interface AnsweredQuestion {
//   readonly timestamp: DTimestamp;
//   readonly fact: Fact;
// }

// export namespace AnsweredQuestion {
//     export const eq = (a: AnsweredQuestion, b: AnsweredQuestion): boolean => {
//         return a.fact === b.fact;
//     };
// }

// export interface PageHistory {
//   readonly pageId: string;
//   readonly answeredQuestions: AnsweredQuestion[];
// }

export class HistoryQue {
  private history: PageResult[] = [];

  getFacts(): Array<Fact> {
    const answers = this.history.map((h) => h.collectedFacts).flat(1);
    // const facts = answers.map((a) => a.fact);
    // TODO FIND LATEST FACT (answer) if have multiple.
    return answers;
  }

  // get(): Array<AnsweredQuestion> {
  //   const answers = this.history.map((h) => h.answeredQuestions).flat(1);
  //   return answers;
  // }

  addToHistory(result: PageResult) {
    this.history.push(result);
  }
}
