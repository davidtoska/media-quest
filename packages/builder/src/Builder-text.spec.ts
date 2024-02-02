import type { BuilderTextDto } from "./Builder-text";
import { BuilderText } from "./Builder-text";
import { TextID } from "./primitives/ID";

const textDto: BuilderTextDto = {
  id: "dto1" as TextID,
  name: "dto1-name",
  text: "text one",
  translationRequired: true,
};

let text1 = BuilderText.create("text one created");

beforeEach(() => {
  text1 = BuilderText.create("text one created");
});

describe("Builder Text", () => {
  test("Can serialize", () => {
    const instance1 = BuilderText.fromJson(textDto);
    const json = instance1.toJson();
    expect(textDto).toStrictEqual(json);
  });
});
