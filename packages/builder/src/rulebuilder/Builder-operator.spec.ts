import { BuilderOperator } from "./Builder-operator";

describe("Builder Operator", () => {
    test("Can validate symbol", () => {
        let symbol: BuilderOperator = "notBetween";
        expect(BuilderOperator.is("invalid")).toBe(false);
        expect(BuilderOperator.is(symbol)).toBe(true);
    });
});
