import { HistoryQue } from "./history-que";
import { DTimestamp } from "../common/DTimestamp";
import { PageDto } from "../page/Page";
import { PageResult } from "../page/page-result";
import { DUtil } from "../utils/DUtil";

const p = (id: number): PageDto => {
  return {
    id: DUtil.randomObjectId(),
    prefix: "prefix" + id,
    elements: [],
    initialTasks: [],
    // staticElements: [],
    background: "",
    tags: [],
  };
};

const pageResult = (id: number, value: number): PageResult => {
  const pageEntered = DTimestamp.now();
  const pageExited = DTimestamp.addMills(pageEntered, 1000);
  const pageTime = DTimestamp.diff(pageEntered, pageExited);

  const result: PageResult = {
    pageId: "_dummyId" + id,
    pagePrefix: "prefix" + id,
    eventLog: [],
    pageTime,
    collectedFacts: [
      {
        referenceId: "" + id,
        referenceLabel: "label-for-" + id,
        value,
        label: "value-label " + value,
        kind: "numeric-fact",
      },
    ],
  };
  return result;
};
// const h = (page: PageDto, answeredQuestions: AnsweredQuestion[]): PageResult => ({
//   pageId: page.id,
//   answeredQuestions,
// });
const p1 = p(1);
const p2 = p(2);
const p3 = p(3);
const p4 = p(4);
const p5 = p(5);
const p6 = p(6);
const all = [p1, p2, p3, p4, p5, p6];

let history = new HistoryQue();
beforeEach(() => {
  history = new HistoryQue();
});

describe("HistoryQue", () => {
  it("should create an instance", () => {
    expect(history).toBeTruthy();
  });

  it("Can add history, and get facts back", () => {
    history.addToHistory(pageResult(1, 2));
    expect(history.getFacts().length).toBe(1);
  });
});
