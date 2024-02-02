import { SumScoreVariableID } from "../primitives/ID";
import { BuilderObject } from "../BuilderObject";

export interface SumScoreVariableDto {
  id: SumScoreVariableID;
  name: string;
  description: string;
  useAvg: boolean;
  /**
   * All variables that the sum-score should be based on.
   */
  basedOn: Array<{ varId: string; varLabel: string; weight?: number }>;
}

export class SumScoreVariable extends BuilderObject<
  "builder-sum-score-variable",
  SumScoreVariableDto
> {
  readonly objectType = "builder-sum-score-variable";
  useAvg = true;
  name = "";
  description = "";
  private _basedOn: Array<{ varId: string }> = [];
  public static readonly create = () => {
    const id = SumScoreVariableID.create();
  };
  private constructor(dto: SumScoreVariableDto) {
    super(dto);
  }
  toJson(): SumScoreVariableDto {
    throw new Error("Method not implemented.");
  }
  clone(): SumScoreVariableDto {
    throw new Error("Method not implemented.");
  }
}
