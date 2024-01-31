import { BVariable } from "./b-variable";
import { BuilderObjectId } from "../BuilderObject";
// import { PageID } from "@media-quest/engine";
// import { BuilderObject, BuilderObjectId } from "../BuilderObject";
//
// export class SumScoreVariable {}
export interface SumScoreVariableDto extends BVariable {
  readonly origin: "sum-score";
  useAvg?: boolean;
  /**
   * All variables that the sum-score should be based on.
   */
  basedOn: Array<{ varId: string; weight?: number }>;
}
export interface SumScoreEntry {
  sumScoreId: BuilderObjectId.SumScoreVariableId;
  // pageId: PageID;
}
// export class SumScoreVariable extends BuilderObject<
//   "builder-sum-score-variable",
//   SumScoreVariableDto
// > {
//   readonly useAvg = false;
//   readonly basedOn: Array<{ varId: string; weight?: number }>;
//   readonly id: BuilderObjectId.SumScoreVariableId;
//   label = ""
//   description = ""
//   toJson(): SumScoreVariableDto {
//     const basedOn = [...this.basedOn]
//     const varId = this.id
//     const label = this.label;
//
//     return {
//           origin: "sum-score",
//       varId,
//       label,
//           useAvg: this.useAvg,
//           basedOn,
//         };
//   }
//   clone(): SumScoreVariableDto {
//     throw new Error("Method not implemented.");
//   }
//   readonly objectType = "builder-sum-score-variable";
//   constructor(dto: SumScoreVariableDto) {
//     super(dto);
//     this.useAvg = dto.useAvg;
//     this.basedOn = dto.basedOn;
//   }
// }
