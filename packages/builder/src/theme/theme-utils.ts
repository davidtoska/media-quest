import { DElementDto, DStyle } from "@media-quest/engine";

export const ThemeUtils = {
  spaceEvenlyX: <T extends Pick<DElementDto, "style">>(
    items: ReadonlyArray<T>,
    options: { startAt: number; endAt: number; defaultItemWidth: number } = {
      startAt: 0,
      endAt: 100,
      defaultItemWidth: 5,
    },
  ): ReadonlyArray<T> => {
    const startAt = options?.startAt ?? 0;
    const endAt = options?.endAt ?? 100;
    const range = Math.abs(endAt - startAt);
    if (items.length === 0) {
      return [];
    }
    const marginCount = items.length + 1;
    const defaultWidth = options.defaultItemWidth ?? 150 / marginCount;

    let totalWidthOfElements = items.reduce((prev, curr) => {
      const w = curr.style.w ?? defaultWidth;
      return prev + w;
    }, 0);

    let cursor = startAt;
    const rest = Math.max(range - totalWidthOfElements, 0);
    const margin = rest / marginCount;

    items.forEach((item) => {
      cursor = cursor + margin;
      const w = item.style.w ?? defaultWidth;
      const x = cursor;
      cursor = cursor + w;
      item.style.w = w;
      item.style.x = x;
    });

    return items;
  },

  centerY: (): Pick<DStyle, "y" | "transform"> => ({
    y: 50,
    transform: "translate(0%, 50%)",
  }),
  centerX: (): Pick<DStyle, "x" | "transform"> => ({
    x: 50,
    transform: "translate(-50%, 0%)",
  }),

  centerXY: (): Pick<DStyle, "x" | "y" | "transform"> => ({
    x: 50,
    y: 50,
    transform: "translate(-50%, 50%)",
  }),
};
