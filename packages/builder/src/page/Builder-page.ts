import type { BuilderQuestionDto, BuilderQuestionType } from "../Builder-question";
import { BuilderQuestion } from "../Builder-question";
import { BuilderObject } from "../BuilderObject";
import type { BuilderOptionDto } from "../Builder-option";
import { BuilderOption } from "../Builder-option";
import type { BuilderMainVideoDto } from "../BuilderMainVideoDto";
import type { BuilderMainImageDto } from "../BuilderMainImageDto";
import type { BuilderMainTextDto } from "../BuilderMainText";
import { BuilderMainText } from "../BuilderMainText";
import { RuleVariableOption, RuleQuestionVariable } from "../rulebuilder";
import { DUtil } from "@media-quest/engine";
import { PagePrefix, PagePrefixValue } from "../primitives/page-prefix";
import { VarID } from "../primitives/varID";
import { SchemaPrefix } from "../primitives/schema-prefix";
import { PageID, SumScoreVariableID } from "../primitives/ID";
import { SumScoreVariable } from "../sum-score/sum-score-variable";

const U = DUtil;
export type BuilderPageType = "info-page" | "question";

export interface BuilderPageDto {
  readonly id: PageID;
  readonly prefix: PagePrefixValue;
  _type: BuilderPageType;
  mainText: BuilderMainTextDto;
  nextButton: BuilderOptionDto;
  defaultQuestion: BuilderQuestionDto;
  mainMedia?: BuilderMainImageDto | BuilderMainVideoDto;
  includedInSumScores: Array<{ sumScoreVariableId: SumScoreVariableID; weight: number }>;
  autoplaySequence: Array<string>;
  tags: ReadonlyArray<string>;
}

export class BuilderPage extends BuilderObject<"builder-page", BuilderPageDto> {
  readonly objectType: "builder-page" = "builder-page";
  readonly id: PageID;
  private _pageType: BuilderPageType;
  private _prefix: PagePrefix;
  private readonly _tags: Set<string>;
  private _backgroundColor = "#FFFFFF";
  private _includedInSumScores: Map<
    SumScoreVariableID,
    {
      sumScoreVariableId: SumScoreVariableID;
      weight: number;
      name: string;
      description: string;
    }
  > = new Map();

  mainMedia: BuilderMainVideoDto | BuilderMainImageDto | false = false;
  defaultQuestion: BuilderQuestion;
  mainText: BuilderMainText;
  nextButton = BuilderOption.create(-1, "Neste");

  public static create(type: BuilderPageType, _prefix: PagePrefixValue) {
    const id = PageID.create();
    const mainTextDto: BuilderMainTextDto = {
      text: "",
      audioFile: false,
      autoplay: false,
      autoplayDelay: 0,
    };
    const nextButtonDto = BuilderOption.create(-1, "page-next-button-text").toJson();
    const defaultQuestionDto = BuilderQuestion.create("select-one").toJson();

    const dto: BuilderPageDto = {
      _type: type,
      autoplaySequence: [],
      defaultQuestion: defaultQuestionDto,
      id,
      nextButton: nextButtonDto,
      mainText: mainTextDto,
      prefix: _prefix,
      includedInSumScores: [],
      tags: [],
    };

    const page = new BuilderPage(dto);
    return page;
  }
  public static fromJson(dto: BuilderPageDto): BuilderPage {
    const page = new BuilderPage(dto);
    return page;
  }

  private constructor(dto: BuilderPageDto) {
    super(dto);
    this.id = dto.id;
    this._pageType = dto._type;
    const prefixInstance = PagePrefix.castOrCreateRandom(dto.prefix);
    this._prefix = prefixInstance;
    this.mainText = BuilderMainText.fromJson(dto.mainText);
    this.nextButton = BuilderOption.fromJson(dto.nextButton);
    this.defaultQuestion = BuilderQuestion.fromJson(dto.defaultQuestion);
    const tagList: string[] = Array.isArray(dto.tags) ? dto.tags : [];
    const sumScores = Array.isArray(dto.includedInSumScores) ? dto.includedInSumScores : [];
    sumScores.forEach((item) => {
      this._includedInSumScores.set(item.sumScoreVariableId, {
        sumScoreVariableId: item.sumScoreVariableId,
        weight: item.weight,
        name: "",
        description: "",
      });
    });
    this._tags = new Set(tagList);
    if (dto.mainMedia) {
      this.mainMedia = dto.mainMedia;
    }
  }

  public addTag(tag: string) {
    this._tags.add(tag);
  }
  public deleteTag(tag: string) {
    this._tags.delete(tag);
  }

  set pageType(value: BuilderPageType) {
    this._pageType = value;
  }

  get includedInSumScores() {
    return [...this._includedInSumScores.values()];
  }

  getQuestionVariables(
    modulePrefix: SchemaPrefix,
    pageNumber: number,
  ): ReadonlyArray<RuleQuestionVariable> {
    const variables: RuleQuestionVariable[] = [];

    if (this._pageType === "question") {
      const pagePrefix = this.prefix;
      const varId = VarID.create(modulePrefix.value, pagePrefix);
      const label = this.mainText.text;
      const op = this.defaultQuestion.options.map((o) => {
        const label = o.label;
        const value = o.value;
        return new RuleVariableOption(label, value);
      });
      const singleVar = new RuleQuestionVariable(varId, label, op, pageNumber);
      variables.push(singleVar);
    }
    return variables;
  }

  get tags(): ReadonlyArray<string> {
    return [...this._tags];
  }
  get pageType() {
    return this._pageType;
  }

  get prefix() {
    return this._prefix.value;
  }

  set prefix(value: PagePrefixValue) {
    this._prefix.value = value;
  }

  sumScoreVariableSet(sumScoreVariable: SumScoreVariable, weight: number) {
    const { id, name, description } = sumScoreVariable;

    this._includedInSumScores.set(sumScoreVariable.id, {
      sumScoreVariableId: id,
      weight,
      name,
      description,
    });

    return true;
  }

  sumScoreVariableUpdateData(variables: ReadonlyArray<SumScoreVariable>) {
    variables.forEach((v) => {
      const sumScoreEntry = this._includedInSumScores.get(v.id);
      if (sumScoreEntry) {
        this.sumScoreVariableSet(v, sumScoreEntry.weight);
      }
    });
  }

  toJson(): BuilderPageDto {
    const mainText = this.mainText.toJson();
    const nextButton = this.nextButton.toJson();
    const mainMedia = this.mainMedia;
    const includedInSumScores = this.includedInSumScores.map(({ sumScoreVariableId, weight }) => ({
      sumScoreVariableId,
      weight,
    }));
    const dto: BuilderPageDto = {
      _type: this.pageType,
      mainText,
      autoplaySequence: [],
      nextButton,
      id: this.id,
      tags: [...this.tags],
      includedInSumScores,
      prefix: this._prefix.value,
      defaultQuestion: this.defaultQuestion.toJson(),
    };
    if (mainMedia) {
      dto.mainMedia = mainMedia;
    }
    return dto;
  }

  clone(): BuilderPageDto {
    const dto = this.toJson();
    const defaultQuestionClone = this.defaultQuestion.clone();
    const mainTextClone = JSON.parse(JSON.stringify(this.mainText));
    const newId = PageID.create();
    const clone: BuilderPageDto = {
      ...dto,
      id: newId,
      defaultQuestion: defaultQuestionClone,
      mainText: mainTextClone,
    };
    // const cloneDto
    return clone;
  }

  get backgroundColor() {
    return this._backgroundColor;
  }

  set backgroundColor(color: string) {
    if (typeof color === "string") {
      this._backgroundColor = color;
    }
  }

  sumScoreVariableDelete(sumScoreVariableID: SumScoreVariableID) {
    this._includedInSumScores.delete(sumScoreVariableID);
  }
}
