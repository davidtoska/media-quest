import { SumScoreVariable, SumScoreVariableDto } from "./sum-score-variable";
import { SumScoreVariableID } from "../primitives/ID";

export class SumScoreVariableCollection implements Iterable<SumScoreVariable> {
  private _all: Array<SumScoreVariable> = [];

  [Symbol.iterator]() {
    const list = [...this._all];
    return list[Symbol.iterator]();
  }

  public static readonly create = (
    variables?: SumScoreVariableDto[],
  ): SumScoreVariableCollection => {
    return new SumScoreVariableCollection(variables);
  };

  private constructor(sumScoreVariables?: SumScoreVariableDto[]) {
    const all = Array.isArray(sumScoreVariables) ? sumScoreVariables : [];
    this._all = all.map((dto) => SumScoreVariable.fromDto(dto));
    this.checkForErrors();
  }

  init(variables: SumScoreVariableDto[]) {
    this._all = variables.map((variable) => SumScoreVariable.fromDto(variable));
    this.checkForErrors();
  }
  addNew(options: { name: string; description: string; useAvg: boolean }) {
    // console.log(options);
    const newVariable = SumScoreVariable.create({ ...options });
    this._all.push(newVariable);
    this.checkForErrors();
    return newVariable;
  }

  get size() {
    return this._all.length;
  }

  get errorsCount() {
    return this._all.filter((variable) => variable.hasErrors).length;
  }

  toJson() {
    return this._all.map((item) => item.toJson());
  }

  /**
   * @internal
   */
  _deleteVariable(id: SumScoreVariableID) {
    const initialSize = this._all.length;
    this._all = this._all.filter((variable) => variable.id !== id);
    this.checkForErrors();
    return initialSize === this.size + 1;
  }

  /**
   * @internal
   */
  _updateOne(
    id: SumScoreVariableID,
    updates: { name?: string; description?: string; useAvg?: boolean },
  ): boolean {
    const variable = this._all.find((variable) => variable.id === id);
    if (variable) {
      variable._update(updates);
      this.checkForErrors();
      return true;
    } else {
      return false;
    }
  }

  /** @internal */
  _getVariableById(id: SumScoreVariableID): SumScoreVariable | undefined {
    return this._all.find((variable) => variable.id === id);
  }

  private checkForErrors() {
    const nameMap = new Map<string, SumScoreVariable[]>();
    this._all.forEach((v) => {
      const array = nameMap.get(v.name) ?? [];
      array.push(v);
      nameMap.set(v.name, array);
    });
    nameMap.forEach((sameNameArray) => {
      sameNameArray.forEach((sameNameItem) => {
        if (sameNameArray.length > 1) {
          sameNameItem._setError("Duplicate name");
        } else {
          sameNameItem._setError("");
        }
      });
    });
  }
}
