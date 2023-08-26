import { BuilderConditionGroup } from "./Builder-condition-group";

let group = BuilderConditionGroup.fromDto(
    {
        kind: "condition-group",
        name: "g1",
        type: "all",
        conditions: [],
    },
    []
);
beforeEach(() => {});

describe("Builder Operator", () => {
    test("Can create", () => {
        expect(group).toBeInstanceOf(BuilderConditionGroup);
        group.name = "group1";
        expect(group.name).toBe("group1");
    });

    test("Can add condition", () => {
        const condition = group.addCondition();
        expect(group.conditions.length).toBe(1);
        const success = group.removeCondition(condition);
        expect(success).toBe(true);
        expect(group.conditions.length).toBe(0);
    });
    test("Can add condition when many", () => {
        const c1 = group.addCondition();
        const c2 = group.addCondition();
        const c3 = group.addCondition();
        const c4 = group.addCondition();
        const c5 = group.addCondition();
        expect(group.conditionCount).toBe(5);
        const success = group.removeCondition(c3);
        expect(success).toBe(true);
        const fail = group.removeCondition(c3);
        expect(fail).toBe(false);
        expect(group.conditions[0]).toBe(c1);
        expect(group.conditions[1]).toBe(c2);
        expect(group.conditions[2]).toBe(c4);
        expect(group.conditions[3]).toBe(c5);
        // expect(group.conditions.length).toBe(0);
    });

    test("Can create operator from symbol", () => {});
});
