import type { BuilderQuestionDto } from "./Builder-question";
import { BuilderQuestion } from "./Builder-question";
import { OptionID, QuestionID } from "./primitives/ID";

const question1: BuilderQuestionDto = {
  id: QuestionID.validateOrThrow("id-for-question-1"),
  prefix: "q1",
  text: "sadf",
  options: [],
  _type: "select-one",
};

const question2: BuilderQuestionDto = {
  id: QuestionID.validateOrThrow("id-for-question-2"),
  prefix: "a",
  text: "har du..",
  _type: "select-one",
  // options: []
  options: [
    {
      id: "q3-opt1" as OptionID,
      value: 0,
      label: "Nei",
    },
    {
      id: "q3-opt2" as OptionID,
      value: 1,
      label: "Ja",
    },
    {
      id: "q3-opt3" as OptionID,
      value: 9,
      label: "Vet ikke",
    },
  ],
};

describe("Builder Question", () => {
  test("Can create question from json", () => {
    const q1 = BuilderQuestion.fromJson(question1);
    const q1AsJson = q1.toJson();
    expect(question1).toStrictEqual(q1AsJson);
    const q2Instance = BuilderQuestion.fromJson(question2);
    const q2AsJson = q2Instance.toJson();
    expect(question2).toStrictEqual(q2AsJson);
  });
  test("Can add options", () => {
    const q1 = BuilderQuestion.fromJson(question1);
    expect(q1.options.length).toBe(0);
    q1.addOption("Ja", 1);
    expect(q1.options.length).toBe(1);
    const nei = q1.addOption("Nei", 0, 0);
    expect(q1.options.length).toBe(2);
    expect(q1.options[0]).toBe(nei);
    const vetIkke = q1.addOption("Vet-ikke", 9);
    expect(q1.options.length).toBe(3);
    expect(q1.options[2]).toBe(vetIkke);
  });
  test("Can delete options", () => {
    const q = BuilderQuestion.fromJson(question2);
    expect(q.options.length).toBe(3);
    const o1 = q.options[0];
    const o2 = q.options[1];
    const o3 = q.options[2];
    const didDelete = q.deleteOption(o1);
    expect(q.options.length).toBe(2);
  });
});
