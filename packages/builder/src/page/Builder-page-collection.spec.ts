import { BuilderTag, BuilderTagDto } from "../tag/BuilderTag";
import { PagePrefix } from "../primitives/page-prefix";
import { BuilderPageCollection } from "./Builder-page-collection";
import { OptionID, PageID, QuestionID } from "../primitives/ID";
import { BuilderPage, BuilderPageDto } from "./Builder-page";
import { SumScoreVariable } from "../sum-score/sum-score-variable";
import { SumScoreVariableCollection } from "../sum-score/sum-score-variable-collection";

const tag1: BuilderTagDto = BuilderTag.create("tag1", "This tag is defined in schemaDto1").toJson();

const tag2: BuilderTagDto = BuilderTag.create("tag2", "This tag is defined in schemaDto1").toJson();
const tag3: BuilderTagDto = BuilderTag.create("tag3", "This tag is defined in schemaDto1").toJson();

const sumScoreVariable1 = SumScoreVariable.create({
  name: "ss1",
  useAvg: true,
  description: "ss1 description",
});
const sumScoreVariable2 = SumScoreVariable.create({
  name: "ss2",
  useAvg: true,
  description: "ss2 description",
});
const sumScoreVariable3 = SumScoreVariable.create({
  name: "ss3",
  useAvg: true,
  description: "ss3 description",
});

const pages: BuilderPageDto[] = [
  {
    id: PageID.validateOrCreate("a".repeat(24)),
    _type: "info-page",
    prefix: PagePrefix.fromStringOrThrow("p1"),
    mainText: {
      text: "hello from test",
      autoplay: false,
      autoplayDelay: 0,
      audioFile: false,
    },
    includedInSumScores: [{ sumScoreVariableId: sumScoreVariable1.id, weight: 1 }],

    nextButton: {
      id: OptionID.create(),
      label: "Neste",
      value: -1,
    },
    defaultQuestion: {
      id: QuestionID.create(),
      prefix: "one-prefix",
      _type: "select-one",
      text: "q1-text",
      options: [
        {
          id: "opt-nei" as OptionID,
          value: 0,
          label: "Nei",
        },
        {
          id: "opt-ja" as OptionID,
          value: 1,
          label: "Ja",
        },
        {
          id: "opt-vet-ikke" as OptionID,
          value: 9,
          label: "Vet ikke",
        },
      ],
    },
    tags: [
      tag1.tag,
      tag2.tag,
      // { tag: 'can_read', description: 'The patient can read' },
      // { tag: 'is grown up', description: 'Is grownUp.' }
    ],
    autoplaySequence: [],
  },
  {
    id: PageID.dummy.b,
    _type: "question",
    prefix: PagePrefix.fromStringOrThrow("page2-prefix"),
    tags: [tag3.tag],
    includedInSumScores: [],
    mainText: {
      text: "hello from test",
      autoplay: false,
      autoplayDelay: 0,
      audioFile: false,
    },
    nextButton: {
      id: "next-button-id-page2" as OptionID,
      label: "Neste",
      value: -1,
    },
    defaultQuestion: {
      id: QuestionID.validateOrCreate("default-question-id"),
      prefix: "one-prefix",
      _type: "select-one",
      text: "q1",
      options: [],
    },
    autoplaySequence: [],
  },
];

let sumScoreVariableCollection = SumScoreVariableCollection.create([
  sumScoreVariable1,
  sumScoreVariable2,
  sumScoreVariable3,
]);
let empty = BuilderPageCollection.create([]);
beforeEach(() => {
  sumScoreVariableCollection = SumScoreVariableCollection.create([
    sumScoreVariable1,
    sumScoreVariable2,
    sumScoreVariable3,
  ]);
  empty = BuilderPageCollection.create([]);
});

describe("Builder page collection", () => {
  test("Can add pages.", () => {
    const p1 = empty.add("question");
    const p2 = empty.add("info-page");
    expect(empty.size).toBe(2);
  });

  test("Can delete page by id,", () => {
    const p1 = empty.add("question");
    const p2 = empty.add("question");
    const p3 = empty.add("info-page");
    expect(empty.size).toBe(3);
    const result = empty.deleteById(p1.id);
    expect(empty.size).toBe(2);
    expect(result).toBe(true);
    const result2 = empty.deleteById(p2.id);
    expect(result2).toBe(true);
    expect(empty.size).toBe(1);
    expect(empty.pages[0]).toBe(p3);
    const result3 = empty.deleteById(PageID.create());
    expect(result3).toBe(false);
  });

  test("fromJson === toJson", () => {
    const col = BuilderPageCollection.create(pages);
    const json = col.toJson();
    expect(pages).toStrictEqual(json);
  });
  //

  test("Can add page at concrete index", () => {
    const p1 = empty.add("question");
    expect(p1.pageType).toBe("question");
    const p2 = empty.add("info-page", 0);
    expect(p2.pageType).toBe("info-page");

    expect(empty.pages[0].id).toBe(p2.id);
    empty.add("question");
    empty.add("question");
    const last = empty.add("question");
    expect(empty.pages[empty.pages.length - 1]).toBe(last);
    const p3 = empty.add("info-page", 4);
    expect(empty.pages[4].id).toBe(p3.id);
  });
  //
  test("Can move page up and down", () => {
    const p1 = empty.add("question");
    const p2 = empty.add("question");
    const p3 = empty.add("question");
    const p4 = empty.add("info-page");
    const last = empty.add("question");
    empty.movePage(p2, 0);
    expect(empty.pages[0]).toBe(p2);
    expect(empty.pages[1]).toBe(p1);
    expect(empty.movePage(p4, 4)).toBeTruthy();
    expect(empty.movePage(p4, 5)).toBeFalsy();
    expect(empty.movePage(p4, 10)).toBeFalsy();

    expect(empty.pages[4].id).toBe(p4.id);
    expect(empty.pages[3].id).toBe(last.id);
  });
  //
  test("Can clone a page and insert at index", () => {
    const p1 = empty.add("question");
    const p2 = empty.add("question");
    const p3 = empty.add("question");
    const mainTextContent = "Hello from test";
    const p4 = empty.add("info-page");
    p3.mainText.text = mainTextContent;
    const p1Clone = BuilderPage.fromJson(p1.clone());
    const beforSize = empty.size;
    empty.insertPage(p1Clone, 2);
    // const pages = s1.pages;
    expect(beforSize + 1).toBe(empty.size);
    expect(empty.pages[2]).toBe(p1Clone);
  });

  test("Will not insert a page that is already in array.", () => {
    const p1 = empty.add("question");
    const p2 = empty.add("question");
    const p3 = empty.add("question");
    const beforeSize = empty.size;
    const result = empty.insertPage(p1, 0);
    const pages = empty.pages;
    expect(beforeSize).toBe(empty.size);
    expect(result).toBe(false);
  });
});
