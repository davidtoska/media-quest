import { BuilderPage } from "./Builder-page";
import type { BuilderPageDto } from "./Builder-page";
import type { BuilderQuestionDto } from "./Builder-question";
import { BuilderQuestion } from "./Builder-question";
import type { BuilderObjectId } from "./BuilderObject";
import { DUtil } from "@media-quest/engine";

const U = DUtil;
const deleteIdsFromPage = (page: BuilderPageDto) => {
  const deleteIdsFromQuestion = (q: BuilderQuestionDto) => {
    U.deleteProp(q, "id");
    q.options.forEach((o) => {
      U.deleteProp(o, "id");
    });
  };
  U.deleteProp(page, "id");
  page.questions.forEach(deleteIdsFromQuestion);
  deleteIdsFromQuestion(page.defaultQuestion);
  return page;
};

const questionPageDto: BuilderPageDto = {
  _type: "question",
  autoplaySequence: [],
  mainText: {
    text: "Velkommen til denne undersøkelsen.",
    audioFile: false,
    autoplayDelay: 0,
    autoplay: false,
  },
  tags: [],

  nextButton: {
    id: "next-button-id-5" as BuilderObjectId.QuestionOptionID,
    label: "Neste",
    value: -1,
  },
  defaultQuestion: {
    id: "q1" as BuilderObjectId.QuestionID,
    prefix: "q1",
    text: "sadf",
    options: [
      {
        id: "q1-opt1" as BuilderObjectId.QuestionOptionID,
        value: 0,
        label: "Nei",
      },
      {
        id: "q1-opt2" as BuilderObjectId.QuestionOptionID,
        value: 1,
        label: "Ja",
      },
      {
        id: "q1-opt3" as BuilderObjectId.QuestionOptionID,
        value: 9,
        label: "Vet ikke",
      },
    ],
    _type: "select-one",
  },
  id: "p1" as BuilderObjectId.PageID,
  prefix: "",
  questions: [],
};

const multiQuestionPageDto: BuilderPageDto = {
  _type: "multi-select",
  mainText: {
    text: "Velkommen til denne undersøkelsen.",
    audioFile: false,
    autoplay: false,
    autoplayDelay: 0,
  },
  autoplaySequence: [],
  defaultQuestion: {
    id: "q1" as BuilderObjectId.QuestionID,
    prefix: "",
    text: "",
    options: [],
    _type: "select-one",
  },
  tags: [],
  nextButton: {
    id: "next-button-id-3" as BuilderObjectId.QuestionOptionID,
    label: "Neste",
    value: -1,
  },

  id: "p2" as BuilderObjectId.PageID,
  prefix: "",
  questions: [
    {
      id: "q3" as BuilderObjectId.QuestionID,
      prefix: "a",
      text: "har du..",
      _type: "select-one",
      // options: []
      options: [
        {
          id: "q3-opt1" as BuilderObjectId.QuestionOptionID,
          value: 0,
          label: "Nei",
        },
        {
          id: "q3-opt2" as BuilderObjectId.QuestionOptionID,
          value: 1,
          label: "Ja",
        },
        {
          id: "q3-opt3" as BuilderObjectId.QuestionOptionID,
          value: 9,
          label: "Vet ikke",
        },
      ],
    },
    {
      id: "q4" as BuilderObjectId.QuestionID,
      prefix: "a",
      text: "har du..",
      _type: "select-one",
      // options: []
      options: [
        {
          id: "q4-opt1" as BuilderObjectId.QuestionOptionID,
          value: 0,
          label: "Nei",
        },
        {
          id: "q4-opt2" as BuilderObjectId.QuestionOptionID,
          value: 1,
          label: "Ja",
        },
        {
          id: "q4-opt3" as BuilderObjectId.QuestionOptionID,
          value: 9,
          label: "Vet ikke",
        },
      ],
    },
  ],
};

let page = BuilderPage.create("info-page", "a");

beforeEach(() => {
  page = BuilderPage.create("info-page", "a");
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
  test("Can change question type", () => {
    expect(page.questions.length).toBe(0);
    page.addQuestion("select-one");
    page.addQuestion("select-one");
    expect(page.questions.length).toBe(2);
    page.pageType = "question";
    expect(page.questions.length).toBe(0);
  });
  test("Can add and delete questions", () => {
    page.pageType = "multi-select";
    expect(page.questions.length).toBe(1);
    const q1 = page.addQuestion("select-one");
    const q2 = page.addQuestion("select-one");
    expect(page.questions.length).toBe(3);
    page.deleteQuestion(q1);
    expect(page.questions.length).toBe(2);
    page.deleteQuestion(q2);
    expect(page.questions.length).toBe(1);
    // page.pageType = 'question';
    // expect(page.questions.length).toBe(0);
  });
  test("Can add question at concrete index. ", () => {
    page.pageType = "multi-select";
    expect(page.questions.length).toBe(1);
    const q1 = page.addQuestion("select-one", 0);
    expect(page.questions[0].id).toBe(q1.id);
    const q2 = page.addQuestion("select-one", 1);
    expect(page.questions[1].id).toBe(q2.id);
    expect(page.questions.length).toBe(3);
    const q3 = page.addQuestion("email", 2);
    expect(page.questions[2]).toBe(q3);
    expect(q3.type).toBe("email");
  });
  test("Can clone a page and everything except id is equal ", () => {
    const page1 = BuilderPage.create("info-page", "as");
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
    const page1 = BuilderPage.create("info-page", "as");
    const clone1 = BuilderPage.fromJson(page1.clone());
    expect(page1.id).not.toBe(clone1.id);

    const testDtoIds = (dto: BuilderPageDto) => {
      const instance = BuilderPage.fromJson(dto);
      const clone = BuilderPage.fromJson(instance.clone());
      const p2QuestionIds = instance.questions.map((q) => q.id);
      const cloneQuestionIds = clone.questions.map((q) => q.id);

      // expect(instance.id).to.not.eq(clone.id);
      // expect(instance.defaultQuestion.id).to.not.eq(clone.defaultQuestion.id);
      expect(p2QuestionIds.length).toBe(cloneQuestionIds.length);
      p2QuestionIds.forEach((id, index) => {
        expect(id).not.toBe(cloneQuestionIds[index]);
      });

      instance.questions.forEach((q, qIndex) => {
        const cloneQ = clone.questions[qIndex];
        expect(cloneQ).toBeDefined();
        expect(q.id).not.toBe(cloneQ.id);
        q.options.forEach((op, opIndex) => {
          const cloneOp = cloneQ.options[opIndex];
          expect(cloneOp).toBeDefined();
          expect(op.id).not.toBe(cloneOp.id);
        });
      });

      // expect(p)
    };
    testDtoIds(questionPageDto);
    testDtoIds(multiQuestionPageDto);
  });
  test("Can insert a new Question at index", () => {
    const page1 = BuilderPage.create("form", "as");
    const q1 = page1.addQuestion("select-one");
    const q2 = page1.addQuestion("select-many");
    expect(page1.questions.length).toBe(3);
    expect(page1.questions[1]).toBe(q1);
    const q1Clone = BuilderQuestion.fromJson(q1.clone());
    const result10 = page1.insertQuestion(q1Clone, 10);
    expect(result10).toBeFalsy();
    const result1 = page1.insertQuestion(q1Clone, 1);
    expect(result1).toBeTruthy();
    expect(page1.questions[1]).toBe(q1Clone);
  });
  test("Can not  insert a duplicate question", () => {
    const page1 = BuilderPage.create("form", "as");
    const q1 = page1.addQuestion("select-one");
    expect(page1.questions.length).toBe(2);
    expect(page1.questions[1]).toBe(q1);
    const result1 = page1.insertQuestion(q1, 0);
    expect(page1.questions.length).toBe(2);
    expect(result1).toBeFalsy();
  });

  test("Can move a question", () => {
    const page1 = BuilderPage.create("form", "as1");
    const q1 = page1.addQuestion("select-many");
    const q2 = page1.addQuestion("select-one");
    const q3 = page1.addQuestion("select-one");
    const q4 = page1.addQuestion("select-one");
    expect(page1.questions.length).toBe(5);
    const m1 = page1.moveQuestion(q1, 0);
    expect(page1.questions.length).toBe(5);
    expect(page1.questions[0]).toBe(q1);
    expect(m1).toBeTruthy();
    const illegalMove = page1.moveQuestion(q2, -1);
    expect(illegalMove).toBeFalsy();
    expect(page1.questions.length).toBe(5);
    const m3 = page1.moveQuestion(q4, 1);
    expect(m3).toBe(true);
    expect(page1.questions[1]).toBe(q4);
  });

  test("Can not move a question that is not in questions-array", () => {
    const page1 = BuilderPage.create("form", "as1");
    const q1 = page1.addQuestion("select-many");
    const q2 = page1.addQuestion("select-one");
    expect(page1.questions.length).toBe(3);
    const newQuestion = BuilderQuestion.create("select-one");
    const m1 = page1.moveQuestion(newQuestion, 0);
    expect(page1.questions.length).toBe(3);
    expect(m1).toBe(false);
  });
  test("Can get all rule-variables.", () => {
    const page = BuilderPage.create("question", "as1");
    page.mainText.text = "Hva heter du?";
    page.defaultQuestion.addOption("Ja", 1);
    page.defaultQuestion.addOption("Nei", 0);
    const variables = page.getQuestionVariables("ax", 1);
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
});
