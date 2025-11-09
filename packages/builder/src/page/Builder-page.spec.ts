import { BuilderPage } from "./Builder-page";
import type { BuilderPageDto } from "./Builder-page";
import type { BuilderQuestionDto } from "../Builder-question";
import { DUtil } from "@media-quest/engine";
import { PagePrefix } from "../primitives/page-prefix";
import { SchemaPrefix } from "../primitives/schema-prefix";
import { OptionID, PageID, QuestionID, SumScoreVariableID } from "../primitives/ID";
import { SumScoreVariable } from "../sum-score/sum-score-variable";

const U = DUtil;
const deleteIdsFromPage = (page: BuilderPageDto) => {
  const deleteIdsFromQuestion = (q: BuilderQuestionDto) => {
    U.deleteProp(q, "id");
    q.options.forEach((o) => {
      U.deleteProp(o, "id");
    });
  };
  U.deleteProp(page, "id");
  deleteIdsFromQuestion(page.defaultQuestion);
  return page;
};

const pxx = PagePrefix.fromStringOrThrow("pxx");
const questionPageDto: BuilderPageDto = {
  _type: "question",
  autoplaySequence: [],
  includedInSumScores: [],
  mainText: {
    text: "Velkommen til denne undersøkelsen.",
    audioFile: false,
    autoplayDelay: 0,
    autoplay: false,
  },
  tags: [],

  nextButton: {
    id: OptionID.dummy.a,
    label: "Neste",
    value: -1,
  },
  defaultQuestion: {
    id: QuestionID.validateOrThrow("default-question-id"),
    prefix: "q1",
    text: "sadf",
    options: [
      {
        id: "q1-opt1" as OptionID,
        value: 0,
        label: "Nei",
      },
      {
        id: "q1-opt2" as OptionID,
        value: 1,
        label: "Ja",
      },
      {
        id: "q1-opt3" as OptionID,
        value: 9,
        label: "Vet ikke",
      },
    ],
    _type: "select-one",
  },
  // id: "p1" as BuilderObjectId.PageID,
  id: PageID.create(),
  prefix: PagePrefix.fromStringOrThrow("pxx"),
};

const multiQuestionPageDto: BuilderPageDto = {
  _type: "question",
  includedInSumScores: [],
  mainText: {
    text: "Velkommen til denne undersøkelsen.",
    audioFile: false,
    autoplay: false,
    autoplayDelay: 0,
  },
  autoplaySequence: [],
  defaultQuestion: {
    id: QuestionID.create(),
    prefix: "",
    text: "",
    options: [],
    _type: "select-one",
  },
  tags: [],
  nextButton: {
    id: "next-button-id-3" as OptionID,
    label: "Neste",
    value: -1,
  },

  id: PageID.create(),
  prefix: PagePrefix.fromStringOrThrow("pxx"),
};

let page = BuilderPage.create("info-page", PagePrefix.fromStringOrThrow("a"));

beforeEach(() => {
  page = BuilderPage.create("info-page", PagePrefix.fromStringOrThrow("a"));
});

describe("Builder Page", () => {
  test("Can create page, and convert to json, and back", () => {
    const page1 = BuilderPage.fromJson(questionPageDto);
    const asJson = page1.toJson();
    expect(questionPageDto).toStrictEqual(asJson);
    const page2 = BuilderPage.fromJson(multiQuestionPageDto);
    const asJson2 = page2.toJson();
    expect(multiQuestionPageDto).toStrictEqual(asJson2);
    // expect(page1.prefix).toBe(pageDto.prefix);
  });
  test("Can clone a page and everything except id is equal ", () => {
    const page1 = BuilderPage.create("info-page", PagePrefix.fromStringOrThrow("as"));
    const clone1 = BuilderPage.fromJson(page1.clone());
    const page1Json = deleteIdsFromPage(page1.clone());
    const clone1Json = deleteIdsFromPage(page1.clone());
    expect(page1Json).toStrictEqual(clone1Json);

    const page2 = BuilderPage.fromJson(questionPageDto);
    const clone2 = BuilderPage.fromJson(page2.clone());
    const page2Json = deleteIdsFromPage(page2.toJson());
    const clone2Json = deleteIdsFromPage(clone2.toJson());
    expect(page2Json).toStrictEqual(clone2Json);

    const page3 = BuilderPage.fromJson(multiQuestionPageDto);
    const clone3 = BuilderPage.fromJson(page3.clone());
    const page3Json = deleteIdsFromPage(page3.toJson());
    const clone3Json = deleteIdsFromPage(clone3.toJson());
    expect(page3Json).toStrictEqual(clone3Json);
  });
  test("Can clone a page and no id is equal", () => {
    const page1 = BuilderPage.create("info-page", pxx);
    const clone1 = BuilderPage.fromJson(page1.clone());
    expect(page1.id).not.toBe(clone1.id);

    const testDtoIds = (dto: BuilderPageDto) => {
      const instance = BuilderPage.fromJson(dto);
      const clone = BuilderPage.fromJson(instance.clone());

      testDtoIds(questionPageDto);
      testDtoIds(multiQuestionPageDto);
    };
  });

  test("Can get all rule-variables.", () => {
    const prefix = PagePrefix.fromStringOrThrow("as1");
    const page = BuilderPage.create("question", prefix);
    page.mainText.text = "Hva heter du?";
    page.defaultQuestion.addOption("Ja", 1);
    page.defaultQuestion.addOption("Nei", 0);
    const shemaPrefix = SchemaPrefix.fromValueOrThrow("ax");
    const variables = page.getQuestionVariables(shemaPrefix, 1);
    const first = variables[0];
    expect(variables.length).toBe(1);
    expect(first.options.length).toBe(2);
    expect(first.options[0].value).toBe(1);
    expect(first.kind === "question-variable").toBe(true);
    // const newQuestion = BuilderQuestion.create('select-one');
    // const m1 = page1.moveQuestion(newQuestion, 0);
    // expect(page1.questions.length).toBe(3);
    // expect(m1).toBe(false);
  });
  test("Can check if page is included in sum-score-variable", () => {
    const prefix = PagePrefix.fromStringOrThrow("as1");
    const page = BuilderPage.create("question", prefix);
    const ss1 = SumScoreVariable.create({ name: "ss1", description: "ss1_desc", useAvg: true });
    const ss2 = SumScoreVariable.create({ name: "ss1", description: "ss1_desc", useAvg: true });
    const success1 = page.sumScoreVariableSet(ss1, 1);
    const success2 = page.sumScoreVariableSet(ss2, 1);
    expect(success1).toBe(true);
    expect(success2).toBe(true);
    expect(page._isIncludedInSumScore(ss1.id)).toBe(true);
    expect(page._isIncludedInSumScore(ss2.id)).toBe(true);
    expect(page._isIncludedInSumScore(SumScoreVariableID.dummy.a)).toBe(false);
  });
});
