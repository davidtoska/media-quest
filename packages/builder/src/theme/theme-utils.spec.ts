import { ThemeUtils } from "./theme-utils";
import { DStyle } from "@media-quest/engine";

describe("Theme-utils works", () => {
  test("Can space evenly when all is even", () => {
    const btn1 = {};
    const els = ThemeUtils.spaceEvenlyX<{ style: Partial<DStyle> }>([
      { style: { w: 20 } },
      { style: { w: 20 } },
      { style: { w: 20 } },
    ]);

    const first = els[0];
    const second = els[1];
    const third = els[2];
    expect(first.style.x).toBe(10);
    expect(second.style.x).toBe(40);
    expect(third.style.x).toBe(70);
    // responseButtons.forEach((el) => {
    //     expect(el._tag === "div").toBe(true);
    //     expect(el.children.length).toBe(1);
    // });
  });

  test("Can space evenly even if uneven lengths", () => {
    const btn1 = {};
    const els = ThemeUtils.spaceEvenlyX([
      { style: { w: 10, x: 0 } },
      { style: { w: 30, x: 10 } },
      { style: { w: 20, x: 30 } },
    ]);

    const first = els[0];
    const second = els[1];
    const third = els[2];
    expect(first.style.x).toBe(10);
    expect(second.style.x).toBe(30);
    expect(third.style.x).toBe(70);
  });

  test("Can space evenly on a shorter scale 10-90", () => {
    const els = ThemeUtils.spaceEvenlyX([{ style: {} }, { style: {} }, { style: {} }], {
      startAt: 10,
      endAt: 90,
      defaultItemWidth: 20,
    }) as ReadonlyArray<{ style: { x: number; w: number } }>;

    expect(els[0].style.x).toBe(15);
    // expect(els[1].style.x).toBe(10);
    // expect(els[2].style.x).toBe(10);
  });
});
