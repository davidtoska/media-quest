import { PageID, SumScoreVariableID } from "../primitives/ID";
import { BuilderObject } from "../BuilderObject";
import { DUtil } from "@media-quest/engine";
import { BuilderPage } from "../page/Builder-page";

export interface SumScoreVariableDto {
  id: SumScoreVariableID;
  name: string;
  description: string;
  useAvg: boolean;
}
export class SumScoreVariable extends BuilderObject<
  "builder-sum-score-variable",
  SumScoreVariableDto
> {
  readonly objectType = "builder-sum-score-variable";
  readonly id: SumScoreVariableID;
  private _useAvg = true;
  private _name = "";
  private _description = "";
  private _error = "";
  private _usedIn: ReadonlyArray<BuilderPage> = [];
  // private _basedOn = new Map<pageId: Page>()
  get usedIn() {
    return [...this._usedIn];
  }

  // private _basedOn: Array<{ varId: string }> = [];
  public static readonly create = (data: {
    name: string;
    description: string;
    useAvg: boolean;
  }): SumScoreVariable => {
    const id = SumScoreVariableID.create();
    return new SumScoreVariable({ id, ...data });
  };

  get hasErrors() {
    return this._error.length !== 0;
  }

  public static fromDto = (dto: SumScoreVariableDto): SumScoreVariable => {
    return new SumScoreVariable(dto);
  };

  private constructor(dto: SumScoreVariableDto) {
    super(dto);
    this.id = dto.id;
    this._name = dto.name;
    this._useAvg = dto.useAvg;
    this._description = dto.description;
  }
  toJson(): SumScoreVariableDto {
    const dto: SumScoreVariableDto = {
      description: this.description,
      id: this.id,
      name: this.name,
      useAvg: this.useAvg,
    };
    return dto;
  }
  clone(): SumScoreVariableDto {
    const id = SumScoreVariableID.create();
    const dto = this.toJson();
    return { ...dto, id };
  }

  /** @internal*/
  _update(data: { name?: string; description?: string; useAvg?: boolean }) {
    const d = data ?? {};

    if (DUtil.isString(d.name)) {
      this._name = d.name;
    }
    if (DUtil.isString(d.description)) {
      this._description = d.description;
    }
    if (DUtil.isBool(d.useAvg)) {
      this._useAvg = d.useAvg;
    }
  }

  /**
   * @internal - used by sum-score-variable-collection.
   */
  _setError(error: "" | "Duplicate name") {
    this._error = error;
  }
  /** @internal - used by sum-score-variable-collection */
  _setUsedInPages(pages: BuilderPage[]) {
    this._usedIn = [...pages];
  }

  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get useAvg() {
    return this._useAvg;
  }
}
