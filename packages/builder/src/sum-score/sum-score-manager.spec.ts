import { SumScoreVariableDto } from "./sum-score-variable";
import { SumScoreMemberShipID, SumScoreVariableID } from "../primitives/ID";
import { SumScoreAnswer } from "./sum-score-answer";
import { SumScoreManager } from "./sum-score-manager";
import { SumScoreMembershipDto } from "./sum-score-membership";

const createAnswer = (value: number): SumScoreAnswer => {
  const varId = "v" + value;
  const varLabel = "label for " + varId;
  const valueLabel = "label for value " + value;
  return {
    varId,
    varLabel,
    value,
    valueLabel,
  };
};

const a0 = createAnswer(0);
const a1 = createAnswer(1);
const a2 = createAnswer(2);
const a3 = createAnswer(3);
const a4 = createAnswer(4);
const a5 = createAnswer(5);
const a6 = createAnswer(6);
const a7 = createAnswer(7);
const a8 = createAnswer(8);
const a9 = createAnswer(9);

const all = [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9];

const getData = () => {
  const dep: SumScoreVariableDto = {
    basedOn: [],
    description: "Hvis depresjons index er høyere enn 20, så er det alvorlig.",
    id: SumScoreVariableID.dummy.a,
    name: "Depresjons index",
    useAvg: false,
  };

  const angst: SumScoreVariableDto = {
    basedOn: [],
    description: "Index for angst. Grenseverdi 28.",
    id: SumScoreVariableID.dummy.d,
    name: "Angst",
    useAvg: false,
  };

  const depA0: SumScoreMembershipDto = {
    id: SumScoreMemberShipID.create(),
    sumScoreId: dep.id,
    varId: a0.varId,
    weight: 1,
  };

  const depA1: SumScoreMembershipDto = {
    id: SumScoreMemberShipID.create(),
    sumScoreId: dep.id,
    varId: a1.varId,
    weight: 1,
  };

  const angstA0: SumScoreMembershipDto = {
    id: SumScoreMemberShipID.create(),
    sumScoreId: dep.id,
    varId: a0.varId,
    weight: 1,
  };

  const angstA1: SumScoreMembershipDto = {
    id: SumScoreMemberShipID.create(),
    sumScoreId: dep.id,
    varId: a1.varId,
    weight: 1,
  };

  const angstA5: SumScoreMembershipDto = {
    id: SumScoreMemberShipID.create(),
    sumScoreId: dep.id,
    varId: a5.varId,
    weight: 1,
  };
  return { dep, angst, depA1, depA0, angstA1, angstA0, angstA5 };
};

describe("Sum-score-manager", () => {
  test("Crud for variables work", () => {
    const d = getData();
    const m = SumScoreManager.create([d.dep, d.angst], [d.depA0, d.depA1, d.angstA5]);
    expect(m.memberShips.length).toBe(3);
    expect(m.variables.length).toBe(2);
    const newVar = m.variableAddNew({});
    expect(m.variables.length).toBe(3);
    const newVar2 = m.variableAddNew({
      name: "var 2 name",
      description: "var 2 description",
      useAvg: true,
    });
    expect(m.variables.length).toBe(4);

    // Will not delete a variable that is not there.
    m.variableDeleteById(SumScoreVariableID.create());
    expect(m.variables.length).toBe(4);
    m.variableDeleteById(d.dep.id);
    expect(m.variables.length).toBe(3);
  });
  test("Can not add same variable twice", () => {
    const d = getData();
    const m = SumScoreManager.create([d.dep, d.angst], [d.depA0, d.depA1, d.angstA5]);
    expect(m.memberShips.length).toBe(3);
    expect(m.variables.length).toBe(2);
    const newVar = m.variableAddNew({});
    expect(m.variables.length).toBe(3);
    const newVar2 = m.variableAddNew({ name: "søvnløshet", description: "", useAvg: true });
    expect(m.variables.length).toBe(4);

    // Will not delete a variable that is not there.
    m.variableDeleteById(SumScoreVariableID.create());
    expect(m.variables.length).toBe(4);
    m.variableDeleteById(d.dep.id);
    expect(m.variables.length).toBe(3);
  });

  test("Can update variable", () => {
    const m = SumScoreManager.create([], []);
    const v = m.variableAddNew({});
    expect(m.variables.length).toBe(1);
    expect(v.useAvg).toBe(true);
    // Will update dep
    const updatedName = "Updated name";
    const updatedDescription = "Updated description";
    m.variableUpdate(v.id, {
      name: updatedName,
      description: updatedDescription,
      useAvg: false,
    });
    const updatedVariable = m.variableGetById(v.id) as SumScoreVariableDto;

    expect(updatedVariable.name).toBe(updatedName);
    expect(updatedVariable.description).toBe(updatedDescription);
    expect(updatedVariable.useAvg).toBe(false);
  });

  test("Crud membership works", () => {
    const m = SumScoreManager.create([], []);
    const v1 = m.variableAddNew({ name: "V1" });
    const v2 = m.variableAddNew({ name: "V2" });
    expect(m.variables.length).toBe(2);
    const m1 = m.membershipAdd(v1.id, "a") as SumScoreMembershipDto;
    expect(m1).toBeTruthy();
    const m2 = m.membershipAdd(v1.id, "b") as SumScoreMembershipDto;
    expect(m2).toBeTruthy();
    expect(m.memberShips.length).toBe(2);
    const m2_duplicate = m.membershipAdd(v1.id, "b");
    expect(m.memberShips.length).toBe(2);
    expect(m.membershipGetById(m1.id)).toEqual(m1);
    expect(m.membershipGetById(m2.id)).toEqual(m2);
    m.membershipDelete(m2.id);
    expect(m.memberShips.length).toBe(1);
  });

  test("Get membership by varId works", () => {
    const m = SumScoreManager.create([], []);
    const v1 = m.variableAddNew({ name: "V1" });
    const v2 = m.variableAddNew({ name: "V2" });
    const membership1 = m.membershipAdd(v1.id, "a") as SumScoreMembershipDto;
    const membership2 = m.membershipAdd(v2.id, "a") as SumScoreMembershipDto;
    const membership3 = m.membershipAdd(v1.id, "c") as SumScoreMembershipDto;

    expect(membership1).toBeTruthy();
    expect(membership2).toBeTruthy();
    expect(membership3).toBeTruthy();

    expect(m.membershipGetByVarId("a")).toEqual([membership1, membership2]);
    expect(m.membershipGetByVarId("c")).toEqual([membership3]);
  });

  test("When a variable is deleted, the memberships will be deleted too.", () => {
    const m = SumScoreManager.create([], []);
    const v1 = m.variableAddNew({ name: "V1" });
    const v2 = m.variableAddNew({ name: "V2" });
    const membership1 = m.membershipAdd(v1.id, "a") as SumScoreMembershipDto;
    const membership2 = m.membershipAdd(v2.id, "a") as SumScoreMembershipDto;
    const membership3 = m.membershipAdd(v1.id, "c") as SumScoreMembershipDto;
    expect(m.memberShips.length).toBe(3);
    m.variableDeleteById(v1.id);
    expect(m.membershipGetByVarId("a")).toEqual([membership2]);
  });
});
