import { DUtil } from "../utils/DUtil";

export namespace DCss {
  export interface Px {
    readonly _unit: "px";
    readonly value: number;
  }

  export type LengthString = `${number}px` | `${number}%`;
  export interface Percent {
    readonly _unit: "percent";
    readonly value: number;
  }

  export type LengthUnit = Px | Percent | number;

  /**
   * Will scale to 3% of baseScale
   * @param unit
   * @param scale
   */
  export const toString = (unit: Readonly<LengthUnit>, scale: number): LengthString => {
    const _mapped: Percent | Px =
      typeof unit === "number" ? { _unit: "percent", value: unit } : unit;
    return _toString(_mapped, scale);
  };
  const _toString = (unit: Readonly<Percent | Px>, scale: number): LengthString => {
    const clampedScale = Math.max(scale, 0.03);
    if (unit._unit === "px") {
      if (unit.value < 0.1) {
        return "0px";
      }

      const rounded = Math.round(unit.value * clampedScale);
      const clamped = Math.max(rounded, 1);
      return (clamped + "px") as LengthString;
    }
    return (unit.value + "%") as LengthString;
  };

  export const isLengthUnit = (unit?: LengthUnit): unit is LengthUnit => {
    if (typeof unit === "number") {
      return true;
    }

    if (!unit) {
      return false;
    }

    const unitKey: keyof DCss.Px = "_unit";
    const valueKey: keyof DCss.Px = "value";
    const hasUnitKey = DUtil.hasKey(unit, unitKey);
    const hasValueKey = DUtil.hasKey(unit, valueKey);
    return hasUnitKey && hasValueKey;
  };
}
