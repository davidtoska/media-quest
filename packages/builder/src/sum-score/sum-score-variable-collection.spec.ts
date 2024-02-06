import { SumScoreVariableCollection } from "./sum-score-variable-collection";
import { SumScoreVariable } from "./sum-score-variable";

const v = (name: string) => {
  return SumScoreVariable.create({ name, description: "description for " + name, useAvg: true });
};

let empty = SumScoreVariableCollection.create([]);
beforeEach(() => {
  empty = SumScoreVariableCollection.create([]);
});
describe("Sum-score-variable-collection", () => {
  test("Add, update, delete works", () => {
    const v1 = empty.addNew({ name: "v1", description: "v1 desc", useAvg: true });
    const v2 = empty.addNew({ name: "v2", description: "v2 desc", useAvg: true });

    const v2_updated = empty._updateOne(v2.id, { name: "n2", description: "d2", useAvg: false });
    expect(v2_updated).toBeTruthy();
    expect(empty.size).toBe(2);
    const variable = empty._getVariableById(v2.id);
    expect(variable).toBeDefined();
    expect(variable!.name).toBe("n2");
    expect(variable!.description).toBe("d2");
    expect(variable!.useAvg).toBe(false);
    empty._deleteVariable(v1.id);
    expect(empty.size).toBe(1);
  });
  test("Duplicate names are detected", () => {
    const v1 = empty.addNew({ name: "v1", description: "desc", useAvg: true });
    const v2 = empty.addNew({ name: "v1", description: "desc", useAvg: true });
    expect(v1.hasErrors).toBe(true);
    expect(v2.hasErrors).toBe(true);
  });
  test("Error are removed on update", () => {
    const v1 = empty.addNew({ name: "v1", description: "desc", useAvg: true });
    const v2 = empty.addNew({ name: "v1", description: "desc", useAvg: true });
    expect(v1.hasErrors).toBe(true);
    expect(v2.hasErrors).toBe(true);
    empty._updateOne(v1.id, { name: "updated-name-updated" });
    expect(v1.hasErrors).toBe(false);
    expect(v2.hasErrors).toBe(false);
  });
  test("Error are removed on delete", () => {
    const v1 = empty.addNew({ name: "v1", description: "desc", useAvg: true });
    const v2 = empty.addNew({ name: "v1", description: "desc", useAvg: true });
    expect(v1.hasErrors).toBe(true);
    expect(v2.hasErrors).toBe(true);
    empty._deleteVariable(v1.id);

    expect(empty.size).toBe(1);
    expect(v2.hasErrors).toBe(false);
  });
  test("Error are detected on construction", () => {
    const col = SumScoreVariableCollection.create([v("v1"), v("v1")]);
    expect(col.errorsCount).toBe(2);
  });

  test("Error are detected after init", () => {
    const col = SumScoreVariableCollection.create([]);
    const v1 = v("v1");
    const v1_duplicate = v("v1");
    const v3 = v("v3");
    const v4 = v("v4");
    col.init([v1, v1_duplicate, v3, v4]);
    expect(col.errorsCount).toBe(2);
    expect(col.size).toBe(4);
  });
});
