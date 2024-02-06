import type { BuilderOptionDto } from "./Builder-option";
import { BuilderOption } from "./Builder-option";
import { BuilderObject } from "./BuilderObject";
import { QuestionID } from "./primitives/ID";

export type BuilderQuestionType =
  | "select-one"
  | "select-many"
  | "text"
  | "time"
  | "textarea"
  | "date"
  | "numeric-range"
  | "duration";

export interface BuilderQuestionDto {
  readonly id: QuestionID;
  _type: BuilderQuestionType;
  text: string;
  options: ReadonlyArray<BuilderOptionDto>;
  prefix: string;
}

export class BuilderQuestion extends BuilderObject<"builder-question", BuilderQuestionDto> {
  readonly objectType = "builder-question";
  id: QuestionID;
  type: BuilderQuestionType;
  questionText = "";
  options: BuilderOption[] = [];
  prefix = "";

  static create = (type: BuilderQuestionType) => {
    const id = QuestionID.create();

    return new BuilderQuestion({
      id,
      _type: type,
      text: "",
      options: [],
      prefix: "",
    });
  };

  public static fromJson(dto: BuilderQuestionDto): BuilderQuestion {
    const question = new BuilderQuestion(dto);
    return question;
  }

  private constructor(dto: BuilderQuestionDto) {
    super(dto);
    this.id = QuestionID.validateOrCreate(dto.id);
    this.type = dto._type;
    this.questionText = dto.text;
    this.prefix = dto.prefix;
    this.options = dto.options.map((o) => BuilderOption.fromJson(o));
  }

  addOption(label: string, value: number, atIndex = -1) {
    const option = BuilderOption.create(value, label);
    if (atIndex >= 0 && atIndex < this.options.length) {
      this.options.splice(atIndex, 0, option);
    } else {
      this.options.push(option);
    }
    return option;
  }

  deleteOption(option: BuilderOption): boolean {
    const filtered = this.options.filter((o) => o.id !== option.id);
    const didDelete = filtered.length === this.options.length - 1;
    this.options = filtered;
    return didDelete;
  }

  toJson() {
    const optionsJson = this.options.map((o) => o.toJson());
    const dto: BuilderQuestionDto = {
      id: this.id,
      prefix: this.prefix,
      _type: this.type,
      text: this.questionText,
      options: optionsJson,
    };
    return dto;
  }

  clone(): BuilderQuestionDto {
    const cloneId = QuestionID.create();
    const dto = this.toJson();
    const optionsClone = this.options.map((o) => o.clone());
    const clonedDto: BuilderQuestionDto = {
      ...dto,
      id: cloneId,
      options: optionsClone,
    };
    return clonedDto;
  }
}
