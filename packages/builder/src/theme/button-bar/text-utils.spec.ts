import { ButtonBarState, ButtonTextState, buttonTextUtils } from "./button-text-utils";

const lineCount2 = 2;
describe("Button-text-utils", () => {
  test("ButtonTextState works", () => {
    const b1 = new ButtonTextState("vet ikke");

    expect(b1.canSplit).toBe(true);
    expect(b1.splitDiff).toBe(4);
    expect(b1.width).toBe(8);
    expect(b1.isSplit).toBe(false);
    b1.tryToSplit();
    expect(b1.width).toBe(4);
    expect(b1.isSplit).toBe(true);
    b1.unSplit();
    expect(b1.width).toBe(8);
    expect(b1.isSplit).toBe(false);

    const b2 = new ButtonTextState("ja");
    expect(b2.splitDiff).toBe(0);
    expect(b2.canSplit).toBe(false);
    expect(b2.width).toBe(2);
    expect(b2.isSplit).toBe(false);
    b2.tryToSplit();
    expect(b2.width).toBe(2);
    expect(b2.isSplit).toBe(true);
    const b3 = new ButtonTextState("Mer enn 30 minutter");
    expect(b3.canSplit).toBe(true);
    expect(b3.splitDiff).toBe(9);
    expect(b3.width).toBe(19);
    expect(b3.isSplit).toBe(false);
    b3.tryToSplit();
    expect(b3.width).toBe(10);
    expect(b3.isSplit).toBe(true);
    b3.unSplit();
    expect(b3.getState().width).toBe(19);
  });

  test("ButtonBarState workss", () => {
    const bar = new ButtonBarState(["ja", "nei", "vet ikke"], { oneLineMax: 10, twoLineMax: 10 });
    expect(bar.getWidth()).toBe(13);
    expect(bar.isFitting()).toBe(false);
    expect(bar.isOneLine()).toBe(true);
    expect(bar.canCompress()).toBe(true);
    expect(bar.compressOneButton()).toBe(true);
  });

  test("Max word length works", () => {
    const a = buttonTextUtils.maxWordLength("ja");
    expect(buttonTextUtils.maxWordLength("ja")).toBe(2);
    expect(buttonTextUtils.maxWordLength("Ganske fin i dag")).toBe(6);
    expect(buttonTextUtils.maxWordLength("rått")).toBe(4);
  });

  test("All splitts work. ", () => {
    const a = buttonTextUtils.allSplits("del da");
    expect(a.length).toBe(2);
  });

  test("Can split a string into two lines at the middle", () => {
    const text = "del da for helvete";
    const a = buttonTextUtils.splitInTwo(text);
    expect(a.first).toBe("del da for");
    const b = buttonTextUtils.splitInTwo("Mer enn 10 minutter");
    expect(b.longest).toBe(10);
    const c = buttonTextUtils.splitInTwo("litt vanskelig og");
    expect(c.first).toBe("litt");
    expect(c.last).toBe("vanskelig og");
  });

  test("Will check if a text can fit within bounds.", () => {
    const text = "dette blir en altfor lang text. Faen.";
    const a = buttonTextUtils.checkLength(text);
    expect(a.max).toBe(text.length);
    expect(a.min).toBe(20);
  });

  test("Fit all will detect if buttons dont fit on a single line.", () => {
    const buttons = ["ja", "nei", "vet ikke"];
    const r1 = buttonTextUtils.fitAll(buttons, {
      oneLine: { min: 5, max: 12 },
      twoLine: { min: 10, max: 20 },
    });

    expect(r1.isSingleLine).toEqual(false);
    expect(r1.requiredSpace).toEqual(buttons.join("").length);
    expect(r1.twoLineCount).toEqual(1);
    const r2 = buttonTextUtils.fitAll(buttons, {
      oneLine: { min: 5, max: 13 },
      twoLine: { min: 10, max: 20 },
    });
    expect(r2.isSingleLine).toEqual(true);
    expect(r2.twoLineCount).toEqual(0);
  });
  test("Will calculate required space, when break", () => {
    const buttons = ["ja", "nei", "vet ikke"];
    const r1 = buttonTextUtils.fitAll(buttons, {
      oneLine: { min: 5, max: 10 },
      twoLine: { min: 5, max: 10 },
    });
    // expect(r1.isSingleLine).toEqual(false);
    // expect(r1.requiredSpace).toEqual("ja".length + "nei".length + "ikke".length);
    // expect(r1.twoLineCount).toEqual(1);
  });
});
