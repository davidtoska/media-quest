import type { BuilderPageDto, BuilderPageType } from "./Builder-page";
import { BuilderPage } from "./Builder-page";
import type {
  BuilderRuleDto,
  RuleCustomVariable,
  ExcludeByPageAction,
  ExcludeByTagAction,
  JumpToPageAction,
} from "./rulebuilder";
import { BuilderRule, RuleInput } from "./rulebuilder";
import type { RuleQuestionVariable } from "./rulebuilder/RuleVariable";
import type { BuilderTagDto } from "./BuilderTag";
import { BuilderTag, TagCollection } from "./BuilderTag";
import { DefaultThemeCompiler } from "./theme/default-theme-compiler";
import { ImageFile } from "./media-files";
import { DUtil } from "@media-quest/engine";
import { PagePrefix } from "./primitives/page-prefix";
import { SchemaPrefix, SchemaPrefixValue } from "./primitives/schema-prefix";
import { CodeBook } from "./code-book/codebook";
import { CodebookPredefinedVariable } from "./code-book/codebook-variable";
import { SchemaConfig } from "./schema-config";
import { CompilerOption, CompilerOutput } from "./builder-compiler";

import { SumScoreVariableDto } from "./sum-score/sum-score-variable";
import { SchemaID } from "./primitives/ID";
import { SumScoreMemberShip, SumScoreMembershipDto } from "./sum-score/sum-score-membership";

const U = DUtil;

export interface BuilderSchemaDto {
  readonly id: SchemaID;
  readonly prefix: SchemaPrefixValue;
  readonly mainImage: ImageFile | false;
  readonly backgroundColor: string;
  readonly name: string;
  readonly pages: BuilderPageDto[];
  readonly baseHeight: number;
  readonly baseWidth: number;
  readonly predefinedVariables?: Array<CodebookPredefinedVariable>;
  readonly sumScoreVariables?: ReadonlyArray<SumScoreVariableDto>;
  readonly sumScoreMemberShips?: ReadonlyArray<SumScoreMembershipDto>;
  readonly rules: ReadonlyArray<BuilderRuleDto>;
  readonly tags: ReadonlyArray<BuilderTagDto>;
}

class SumScoreVariableCollection {
  private _all: Array<SumScoreVariableDto> = [];
}

export class BuilderSchema {
  readonly prefix: SchemaPrefix;
  baseHeight = 1300;
  baseWidth = 1024;
  backgroundColor = "#000000";
  pages: BuilderPage[] = [];
  mainImage: ImageFile | false = false;
  predefinedVariables: CodebookPredefinedVariable[] = [];
  private _rules: BuilderRule[] = [];
  private _sumVariables: SumScoreVariableDto[] = [];
  get rules(): ReadonlyArray<BuilderRule> {
    return [...this._rules];
  }
  get sumScoreVariables(): ReadonlyArray<SumScoreVariableDto> {
    return [...this._sumVariables];
  }

  // get prefix(): SchemaPrefixValue {
  //   return this._prefix.value;
  // }

  private readonly _tagCollection: TagCollection = TagCollection.create();
  get tags(): ReadonlyArray<BuilderTag> {
    return [...this._tagCollection];
  }
  public static create(id: SchemaID, name: string, prefix: SchemaPrefixValue) {
    const schemaPrefix = SchemaPrefix.castOrCreateRandom(prefix);
    return new BuilderSchema(id, name, schemaPrefix);
  }

  public static fromJson(dto: BuilderSchemaDto): BuilderSchema {
    const schemaPrefix = SchemaPrefix.castOrCreateRandom(dto.prefix);
    const schema = new BuilderSchema(dto.id, dto.name, schemaPrefix);
    const pages = dto.pages.map(BuilderPage.fromJson);

    schema._tagCollection.init(dto.tags);
    schema.backgroundColor = dto.backgroundColor;
    schema.baseHeight = dto.baseHeight;
    schema.baseWidth = dto.baseWidth;
    schema.pages = pages;
    schema.predefinedVariables = dto.predefinedVariables ?? [];
    schema.backgroundColor = dto.backgroundColor;
    schema.mainImage = dto.mainImage ?? false;
    const rulesDto = dto.rules ?? [];
    const ruleInput = schema.getRuleInput();

    schema._sumVariables = Array.isArray(dto.sumScoreVariables) ? [...dto.sumScoreVariables] : [];
    schema._rules = rulesDto.map((r) => BuilderRule.fromDto(r, ruleInput));
    return schema;
  }

  toJson(): BuilderSchemaDto {
    const pages = this.pages.map((p) => p.toJson());
    const tags = this._tagCollection.toJson();
    const rules = this._rules.map((rule) => rule.toJson());

    const dto: BuilderSchemaDto = {
      backgroundColor: this.backgroundColor,
      baseHeight: this.baseHeight,
      baseWidth: this.baseWidth,
      id: this.id,
      name: this.name,
      pages,
      rules,
      tags,
      predefinedVariables: this.predefinedVariables,
      sumScoreVariables: [...this.sumScoreVariables],
      mainImage: this.mainImage,
      prefix: this.prefix.value,
    };
    return dto;
  }
  private constructor(
    public readonly id: SchemaID,
    public name: string,
    prefix: SchemaPrefix,
  ) {
    this.prefix = prefix;
  }

  addPage(type: BuilderPageType, atIndex = -1): BuilderPage {
    const pagePrefix = PagePrefix.create();
    const newPage = BuilderPage.create(type, pagePrefix.value);
    if (atIndex >= 0 && atIndex < this.pages.length) {
      this.pages.splice(atIndex, 0, newPage);
    } else {
      this.pages.push(newPage);
    }
    return newPage;
  }

  addSumScoreVariable(variable: SumScoreVariableDto) {
    // TODO VALIDATE.
    this._sumVariables.push({ ...variable });

    return variable;
  }

  insertPage(page: BuilderPage, atIndex: number): boolean {
    return this.insertPageAtIndex(page, atIndex);
  }

  private insertPageAtIndex(page: BuilderPage, atIndex: number) {
    const isValidIndex = U.isInRange(0, this.pages.length - 1);
    if (!isValidIndex(atIndex)) {
      return false;
    }
    const exists = !!this.pages.find((p) => p.id === page.id);
    if (exists) {
      return false;
    }
    this.pages.splice(atIndex, 0, page);
    return true;
  }

  addRule() {
    const input = this.getRuleInput();
    const count = this._rules.length + 1;
    const name = "Rule-number: " + count;
    const rule = BuilderRule.fromDto(
      {
        conditions: [],
        type: "all",
        name,
        excludeTags: [],
        jumpToPage: false,
        excludePages: [],
      },
      input,
    );
    this._rules.push(rule);
    return rule;
  }
  deleteRule(rule: BuilderRule) {
    this._rules = this._rules.filter((r) => r !== rule);
  }

  movePage(page: BuilderPage, toIndex: number): boolean {
    const index = this.pages.indexOf(page);
    if (index < 0) {
      return false;
    }
    const isValidIndex = U.isInRange(0, this.pages.length - 1);
    if (!isValidIndex(toIndex)) {
      return false;
    }
    // console.log('Moving from :' + index + ' to: ' + toIndex);
    this.pages.splice(index, 1);
    this.pages.splice(toIndex, 0, page);
    return true;
  }

  deletePage(page: BuilderPage): boolean {
    const filtered = this.pages.filter((p) => p !== page);
    const didDelete = filtered.length === this.pages.length - 1;
    this.pages = filtered;
    return didDelete;
  }

  reevaluateRules() {
    console.log("Reevaluationg rulesInput");
    const input = this.getRuleInput();
    const rulesDto = this._rules.map((r) => r.toJson());
    this._rules = rulesDto.map((dto) => BuilderRule.fromDto(dto, input));
  }

  getRuleInput(): RuleInput {
    const qVars: RuleQuestionVariable[] = [];
    const cVars: RuleCustomVariable[] = [];
    const pageIdActions: ExcludeByPageAction[] = [];
    const tagActions: ExcludeByTagAction[] = this.tags.map((t) => {
      const tag = t.tagText;
      const pageCount = this.pages.reduce((count, curr) => {
        return curr.tags.includes(tag) ? count + 1 : count;
      }, 0);
      const excludeByTagDto: ExcludeByTagAction = {
        kind: "exclude-by-tag",
        pageCount,
        tag,
        description: t.tagDescription,
      };
      return excludeByTagDto;
    });
    const jumpActions: JumpToPageAction[] = [];
    this.pages.forEach((page, index) => {
      const pageVariables = page.getQuestionVariables(this.prefix, index);
      qVars.push(...pageVariables);
      const mainText = page.mainText.text;
      const pagePrefix = page.prefix;
      const jumpAction: JumpToPageAction = {
        kind: "jump-to-page",
        pageId: page.id,
        pagePrefix,
        pageNumber: index,
        mainText: page.mainText.text,
      };
      const excludePageAction: ExcludeByPageAction = {
        kind: "exclude-by-pageId",
        pageId: page.id,
        pagePrefix,
        pageNumber: index,
        mainText,
      };
      jumpActions.push(jumpAction);
      pageIdActions.push(excludePageAction);
    });
    const ruleInput = new RuleInput(qVars, cVars, pageIdActions, tagActions, jumpActions);

    return ruleInput;
  }

  deleteTags(tags: ReadonlyArray<BuilderTag>) {
    this._tagCollection.deleteAll(tags);
  }

  addTag(builderTag: BuilderTag) {
    this._tagCollection.add(builderTag);
  }

  compile(
    options: CompilerOption = { blockAutoplayQuestion: false, blockAutoplayVideo: false },
  ): CompilerOutput {
    // const moduleDto = this.toJson();
    const builderSchema = BuilderSchema.fromJson(this.toJson());

    // Overriding the
    builderSchema.pages.forEach((p) => {
      if (options.blockAutoplayQuestion) {
        p.mainText.autoplay = false;
      }
      if (options.blockAutoplayVideo && p.mainMedia) {
        if (p.mainMedia.kind === "main-video") {
          // TODO autoplay as boolean, so that we know if video is optional or required when override.
          p.mainMedia.mode = "optional";
        }
      }
    });
    const moduleDto = builderSchema.toJson();
    const imp = new DefaultThemeCompiler();

    const codebook = CodeBook.fromSchema(moduleDto);
    const schema = imp.compile(moduleDto);
    const schemaConfig = SchemaConfig.fromSchema(moduleDto);
    const output: CompilerOutput = { codebook, schema, schemaConfig };
    return output;
  }
}
