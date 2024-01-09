import { BuilderVariable, BuilderVariableOption } from "./RuleVariable";
import { BuilderOperator } from "./condition/Builder-operator";
import { JumpToPageAction } from "./RuleAction";

export abstract class SingleSelectItem<T> {
  private readonly _selectLabel;
  private readonly _toolTip;
  private readonly _searchString;
  get selectLabel(): string {
    return this._selectLabel;
  }
  get tooltip() {
    return this._toolTip;
  }

  get searchString() {
    return this._searchString;
  }

  protected constructor(readonly data: T) {
    this._selectLabel = this.getSelectLabel();
    this._toolTip = this.getTooltip();
    this._searchString = this.getSearchString();
  }
  protected abstract getSelectLabel(): string;
  protected abstract getTooltip(): string;
  protected abstract getSearchString(): string;
}

export class RuleVariableSelectItem extends SingleSelectItem<BuilderVariable> {
  public static create = (data: BuilderVariable) => {
    return new RuleVariableSelectItem(data);
  };
  readonly options: ReadonlyArray<RuleOptionSelectItem>;
  constructor(readonly data: BuilderVariable) {
    super(data);
    this.options = data.options.map(RuleOptionSelectItem.create);
  }

  protected getSearchString(): string {
    return this.data.varId + this.data.label;
  }

  getSelectLabel(): string {
    return this.data.varId;
  }

  getTooltip(): string {
    return this.data.label;
  }
}

export class RuleOptionSelectItem extends SingleSelectItem<BuilderVariableOption> {
  public static create = (option: BuilderVariableOption) => {
    return new RuleOptionSelectItem(option);
  };
  private constructor(option: BuilderVariableOption) {
    super(option);
  }
  protected getSearchString(): string {
    return "";
  }

  protected getSelectLabel(): string {
    return this.data.label + "(" + this.data.value + ")";
  }

  protected getTooltip(): string {
    return "";
  }
}

export class OperatorSelectItem extends SingleSelectItem<BuilderOperator | ""> {
  public static readonly EQ = new OperatorSelectItem("equal");
  public static readonly NOT_EQ = new OperatorSelectItem("notEqual");
  public static readonly fromSymbol = (
    symbol: BuilderOperator | Omit<string, BuilderOperator>,
  ): OperatorSelectItem | false => {
    if (symbol === "equal") {
      return OperatorSelectItem.EQ;
    }
    if (symbol === "notEqual") {
      return OperatorSelectItem.NOT_EQ;
    }
    return false;
  };
  private constructor(operator: BuilderOperator) {
    super(operator);
  }

  protected getSearchString(): string {
    return "";
  }

  protected getSelectLabel(): string {
    const operator = this.data;
    if (operator === "equal") {
      return "Equals";
    }
    if (operator === "notEqual") {
      return "Not equals";
    }
    return "";
  }

  protected getTooltip(): string {
    const operator = this.data;
    if (operator === "equal") {
      return "Equals";
    }
    if (operator === "notEqual") {
      return "Not equals";
    }
    return "";
  }
}

export class JumpToPageSelectItem extends SingleSelectItem<JumpToPageAction> {
  public static readonly create = (pageData: JumpToPageAction) => new JumpToPageSelectItem(pageData);
  protected constructor(pageData: JumpToPageAction) {
    super(pageData);
  }

  protected getSearchString(): string {
    return this.data.pagePrefix + this.data.mainText;
  }

  protected getSelectLabel(): string {
    return this.data.pagePrefix + " (" + this.data.pageNumber + ")";
  }

  protected getTooltip(): string {
    return this.data.mainText;
  }
}
