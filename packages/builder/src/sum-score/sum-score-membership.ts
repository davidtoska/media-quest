import { SumScoreMemberShipID, SumScoreVariableID } from "../primitives/ID";
import { BuilderObject } from "../BuilderObject";
import { DUtil } from "@media-quest/engine";

export interface SumScoreMembershipDto {
  id: SumScoreMemberShipID;
  sumScoreId: SumScoreVariableID;
  varId: string;
  weight: number;
}

export class SumScoreMemberShip extends BuilderObject<
  "builder-sum-score-membership",
  SumScoreMembershipDto
> {
  readonly objectType = "builder-sum-score-membership";
  toJson(): SumScoreMembershipDto {
    throw new Error("Method not implemented.");
  }
  clone(): SumScoreMembershipDto {
    throw new Error("Method not implemented.");
  }

  static create = (
    sumScoreVariableId: SumScoreVariableID,
    varId: string,
    weight?: number,
  ): SumScoreMemberShip => {
    const id = SumScoreMemberShipID.create();
    const w = DUtil.isNumber(weight) ? weight : 1;
    return new SumScoreMemberShip(id, sumScoreVariableId, varId, w);
  };

  get isValid() {
    return true;
  }
  private constructor(
    readonly id: SumScoreMemberShipID,
    readonly sumScoreId: SumScoreVariableID,
    readonly varId: string,
    readonly weight: number,
  ) {
    super({ id, sumScoreId, varId, weight });
  }
}
