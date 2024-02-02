import type { BuilderQuestionDto, BuilderQuestionType } from "./Builder-question";
import { BuilderQuestion } from "./Builder-question";
import { BuilderObject } from "./BuilderObject";
import type { BuilderOptionDto } from "./Builder-option";
import { BuilderOption } from "./Builder-option";
import type { BuilderMainVideoDto } from "./BuilderMainVideoDto";
import type { BuilderMainImageDto } from "./BuilderMainImageDto";
import type { BuilderMainTextDto } from "./BuilderMainText";
import { BuilderMainText } from "./BuilderMainText";
import { RuleVariableOption, RuleQuestionVariable } from "./rulebuilder";
import { DUtil } from "@media-quest/engine";
import { PagePrefix, PagePrefixValue } from "./primitives/page-prefix";
import { VarID } from "./primitives/varID";
import { SchemaPrefix } from "./primitives/schema-prefix";
import { PageID } from "./primitives/ID";

const U = DUtil;
export type BuilderPageType = "info-page" | "question" | "multi-select" | "form";

export interface BuilderPageDto {
  readonly id: PageID;
  readonly prefix: PagePrefixValue;
  _type: BuilderPageType;
  mainText: BuilderMainTextDto;
  nextButton: BuilderOptionDto;
  defaultQuestion: BuilderQuestionDto;
  questions: Array<BuilderQuestionDto>;
  mainMedia?: BuilderMainImageDto | BuilderMainVideoDto;
  autoplaySequence: Array<string>;
  tags: ReadonlyArray<string>;
  // sumScoreVariables: Array<BuilderObjectId.SumScoreVariableId>
}

export class BuilderPage extends BuilderObject<"builder-page", BuilderPageDto> {
  readonly objectType: "builder-page" = "builder-page";
  readonly id: PageID;
  private _pageType: BuilderPageType;
  private _prefix: PagePrefix;
  private _questions: Array<BuilderQuestion> = [];
  private readonly _tags: Set<string>;
  private _backgroundColor = "#FFFFFF";
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
      questions: [],
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
    this._questions = dto.questions.map((q) => BuilderQuestion.fromJson(q));
    const tagList: string[] = Array.isArray(dto.tags) ? dto.tags : [];
    this._tags = new Set(tagList);
    if (dto.mainMedia) {
      this.mainMedia = dto.mainMedia;
    }
    this.updateRows();
  }

  insertQuestion(question: BuilderQuestion, atIndex: number): boolean {
    const validIndexFn = U.isInRange(0, this._questions.length);
    if (!validIndexFn(atIndex)) {
      return false;
    }
    const hasQuestion = !!this._questions.find((q) => q.id === question.id);
    if (hasQuestion) {
      return false;
    }
    this._questions.splice(atIndex, 0, question);
    return true;
  }

  addQuestion(type: BuilderQuestionType, atIndex = -1): BuilderQuestion {
    const question = BuilderQuestion.create(type);
    if (atIndex < this._questions.length && atIndex >= 0) {
      this._questions.splice(atIndex, 0, question);
    } else {
      this._questions.push(question);
    }
    return question;
  }

  /**
   * Move a question in questions-array
   * @param question (reference)
   * @param toIndex
   */
  moveQuestion(question: BuilderQuestion, toIndex: number): boolean {
    const validToIndexFn = U.isInRange(0, this._questions.length);
    if (!validToIndexFn(toIndex)) {
      return false;
    }
    const currentIndex = this._questions.indexOf(question);
    if (currentIndex < 0) {
      return false;
    }
    this._questions.splice(currentIndex, 1);
    this._questions.splice(toIndex, 0, question);
    return true;
  }

  deleteQuestion(question: BuilderQuestion) {
    this._questions = this._questions.filter((q) => q !== question);
    // TODO EMIT DELETED QUESTION.
    this.updateRows();
  }
  private updateRows() {
    if (this._pageType === "question" || this._pageType === "info-page") {
      this._questions = [];
    }
    if (this._pageType === "form" && this._questions.length === 0) {
      this._questions = [];
      this.addQuestion("text");
    }
    if (this._pageType === "multi-select" && this._questions.length === 0) {
      this._questions = [];
      this.addQuestion("text");
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
    // TODO Emit All questions that are deleted? Listen for removed variables??
    this.updateRows();
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

  toJson(): BuilderPageDto {
    const questions = this._questions.map((q) => q.toJson());
    const mainText = this.mainText.toJson();
    const nextButton = this.nextButton.toJson();
    const mainMedia = this.mainMedia;
    const dto: BuilderPageDto = {
      _type: this.pageType,
      mainText,
      autoplaySequence: [],
      nextButton,
      id: this.id,
      tags: [...this.tags],
      prefix: this._prefix.value,
      defaultQuestion: this.defaultQuestion.toJson(),
      questions,
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
    // const pagesClone = this
    const questionsClone = this.questions.map((q) => q.clone());
    const newId = PageID.create();
    const clone: BuilderPageDto = {
      ...dto,
      id: newId,
      defaultQuestion: defaultQuestionClone,
      mainText: mainTextClone,
      questions: questionsClone,
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

  get questions(): ReadonlyArray<BuilderQuestion> {
    return this._questions;
  }
}
