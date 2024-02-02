import { SumScoreVariableDto } from "./sum-score-variable";
import { SumScoreMemberShipID, SumScoreVariableID } from "../primitives/ID";
import { SumScoreMembershipDto } from "./sum-score-membership";
import { DUtil } from "@media-quest/engine";

const cloneItem = <const T extends object>(item: T): T => ({ ...item });

export class SumScoreManager implements Iterable<SumScoreVariableDto> {
  public static readonly create = (
    variables: Array<SumScoreVariableDto>,
    memberships: Array<SumScoreMembershipDto>,
  ): SumScoreManager => {
    return new SumScoreManager(variables, memberships);
  };

  private _variables: SumScoreVariableDto[];
  private _memberShips: SumScoreMembershipDto[];

  private constructor(variables: SumScoreVariableDto[], memberships: SumScoreMembershipDto[]) {
    this._variables = [...variables];
    this._memberShips = [...memberships];
  }

  get variables(): ReadonlyArray<SumScoreVariableDto> {
    return [...this._variables];
  }
  get memberShips(): ReadonlyArray<SumScoreMembershipDto> {
    return [...this._memberShips];
  }

  toJson(): { variables: SumScoreVariableDto[]; memberShips: SumScoreMembershipDto[] } {
    const variables = this._variables.map(cloneItem);
    const memberShips = this._memberShips.map(cloneItem);
    return { variables, memberShips };
  }

  /**
   * Deletes a variable by its ID.
   * @param {SumScoreVariableID} id - The ID of the variable to delete.
   * @return An object containing the deleted variable and the deleted memberships.
   */
  variableDeleteById(id: SumScoreVariableID) {
    const toDelete = this.variableGetById(id);
    if (!toDelete) return false;

    const keepMemberships: SumScoreMembershipDto[] = [];
    const toDeleteMemberships: SumScoreMembershipDto[] = [];

    this._memberShips.forEach((memberShip) => {
      if (memberShip.sumScoreId === id) {
        toDeleteMemberships.push(memberShip);
      } else {
        keepMemberships.push(memberShip);
      }
    });
    this._variables = this._variables.filter((v) => v.id !== id);
    this._memberShips = keepMemberships;
    return { variableDeleted: toDelete, membershipsDeleted: toDeleteMemberships };
    // this._memberShips = this._memberShips.filter((m) => m !== id);
  }

  variableAddNew(data: {
    name?: string;
    description?: string;
    useAvg?: boolean;
  }): SumScoreVariableDto {
    const ssv: SumScoreVariableDto = {
      id: SumScoreVariableID.create(),
      basedOn: [],
      description: "",
      name: "",
      useAvg: true,
    };
    this._variables.push(ssv);
    return ssv;
  }

  variableGetById(id: SumScoreVariableID) {
    return this._variables.find((variable) => variable.id === id) ?? false;
  }

  variableUpdate(
    sumScoreVariableId: SumScoreVariableID,
    changes: { name?: string; description?: string; useAvg?: boolean },
  ) {
    const maybeVariable = this.variableGetById(sumScoreVariableId);
    if (!maybeVariable) {
      return false;
    }
    if (typeof changes.name === "string") {
      maybeVariable.name = changes.name;
    }
    if (typeof changes.description === "string") {
      maybeVariable.description = changes.description;
    }
    if (typeof changes.useAvg === "boolean") {
      maybeVariable.useAvg = changes.useAvg;
    }
    return true;
  }

  [Symbol.iterator](): Iterator<SumScoreVariableDto> {
    return this._variables[Symbol.iterator]();
  }

  membershipAdd(
    sumScoreVariableID: SumScoreVariableID,
    varId: string,
    weight?: number,
  ): SumScoreMembershipDto | false {
    let variableExist = false;
    let memberShipIsMissing = false;

    // const variableExists = this._variables.some((v) => {
    //
    // });
    this._memberShips.forEach((m) => {
      if (m.sumScoreId === sumScoreVariableID && m.varId === varId) {
        variableExist = true;
      }
    });

    if (variableExist) {
      return false;
    }
    if (memberShipIsMissing) {
      return false;
    }

    const membership: SumScoreMembershipDto = {
      id: SumScoreMemberShipID.create(),
      sumScoreId: sumScoreVariableID,
      varId: varId,
      weight: DUtil.isNumber(weight) ? weight : 1,
    };

    this._memberShips.push(membership);
    return membership;
  }

  membershipGetById(id: SumScoreMemberShipID): SumScoreMembershipDto | false {
    // return false;
    return this._memberShips.find((m) => m.id === id) ?? false;
  }

  membershipDelete(id: SumScoreMemberShipID) {
    this._memberShips = this._memberShips.filter((m) => m.id === id);
  }

  membershipGetByVarId(varId: string): SumScoreMembershipDto[] {
    const filtered = this._memberShips.filter((m) => m.varId === varId);
    return filtered.map(cloneItem);
  }
}
