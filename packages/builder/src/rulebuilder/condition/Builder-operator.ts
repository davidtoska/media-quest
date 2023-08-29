const BuilderOperatorSymbols = {
  equal: true,
  notEqual: true,
  lessThan: true,
  lessThanOrEqual: true,
  greaterThan: true,
  greaterThanOrEqual: true,
  between: true,
  notBetween: true,
  in: true,
  notIn: true,
  missing: true,
  notMissing: true,
  contains: true,
  notContains: true,
  empty: true,
  notEmpty: true,
  startsWith: true,
  endsWith: true,
} as const;

export type BuilderOperator = keyof typeof BuilderOperatorSymbols;

export namespace BuilderOperator {
  export const is = (symbol?: string): symbol is BuilderOperator => {
    if (typeof symbol !== "string") {
      return false;
    }
    return Object.keys(BuilderOperatorSymbols).includes(symbol);
  };
}
