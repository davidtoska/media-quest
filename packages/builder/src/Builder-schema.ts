import type { BuilderPageDto, BuilderPageType } from "./page/Builder-page";
import { BuilderPage } from "./page/Builder-page";
import type {
  BuilderRuleDto,
  ExcludeByPageAction,
  ExcludeByTagAction,
  JumpToPageAction,
  RuleCustomVariable,
} from "./rulebuilder";
import { BuilderRule, RuleInput } from "./rulebuilder";
import type { RuleQuestionVariable } from "./rulebuilder/RuleVariable";
import type { BuilderTagDto } from "./tag/BuilderTag";
import { BuilderTag } from "./tag/BuilderTag";
import { DefaultThemeCompiler } from "./theme/default-theme-compiler";
import { ImageFile } from "./media-files";
import { DUtil } from "@media-quest/engine";
import { PagePrefix } from "./primitives/page-prefix";
import { SchemaPrefix, SchemaPrefixValue } from "./primitives/schema-prefix";
import { CodeBook } from "./code-book/codebook";
import { CodebookPredefinedVariable } from "./code-book/codebook-variable";
import { SchemaConfig } from "./schema-config";
import { CompilerOption, CompilerOutput } from "./builder-compiler";

import { SumScoreVariable, SumScoreVariableDto } from "./sum-score/sum-score-variable";
import { PageID, SchemaID, SumScoreVariableID } from "./primitives/ID";
import { SumScoreVariableCollection } from "./sum-score/sum-score-variable-collection";
import { TagCollection } from "./tag/Tag-Collection";
import { BuilderPageCollection } from "./page/Builder-page-collection";

const U = DUtil;

export interface BuilderSchemaDto {
  readonly id: SchemaID;
  readonly prefix: SchemaPrefixValue;
  readonly mainImage: ImageFile | false;
  readonly backgroundColor: string;
  readonly name: string;
  readonly pages: ReadonlyArray<BuilderPageDto>;
  readonly baseHeight: number;
  readonly baseWidth: number;
  readonly predefinedVariables?: Array<CodebookPredefinedVariable>;
  readonly sumScoreVariables?: ReadonlyArray<SumScoreVariableDto>;
  readonly rules: ReadonlyArray<BuilderRuleDto>;
  readonly tags: ReadonlyArray<BuilderTagDto>;
}

export class BuilderSchema {
  readonly prefix: SchemaPrefix;
  baseHeight = 1300;
  baseWidth = 1024;
  backgroundColor = "#000000";
  private readonly _pageCollection: BuilderPageCollection;
  mainImage: ImageFile | false = false;
  predefinedVariables: CodebookPredefinedVariable[] = [];
  private _rules: BuilderRule[] = [];
  private readonly _sumScoreCollection;
  get rules(): ReadonlyArray<BuilderRule> {
    return [...this._rules];
  }
  get pages(): ReadonlyArray<BuilderPage> {
    return [...this._pageCollection];
  }

  get sumScoreVariables(): ReadonlyArray<SumScoreVariable> {
    return [...this._sumScoreCollection];
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
    const sumScoreVariables = dto.sumScoreVariables ? [...dto.sumScoreVariables] : [];
    const pagesDto = Array.isArray(dto.pages) ? dto.pages : [];

    // Init collections.
    schema._tagCollection.init(dto.tags);
    schema._sumScoreCollection.init(sumScoreVariables);

    schema.backgroundColor = dto.backgroundColor;
    schema.baseHeight = dto.baseHeight;
    schema.baseWidth = dto.baseWidth;
    schema._pageCollection._init(pagesDto);
    schema.predefinedVariables = dto.predefinedVariables ?? [];
    schema.backgroundColor = dto.backgroundColor;
    schema.mainImage = dto.mainImage ?? false;
    const rulesDto = dto.rules ?? [];
    const ruleInput = schema.getRuleInput();
    schema._rules = rulesDto.map((r) => BuilderRule.fromDto(r, ruleInput));

    schema.updateSumScoreRelations();
    return schema;
  }

  toJson(): BuilderSchemaDto {
    const pages = this._pageCollection.toJson();
    const tags = this._tagCollection.toJson();
    const rules = this._rules.map((rule) => rule.toJson());
    const sumScoreVariables = this._sumScoreCollection.toJson();
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
      sumScoreVariables,
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
    this._sumScoreCollection = SumScoreVariableCollection.create([]);
    this._pageCollection = BuilderPageCollection.create([]);
    // this
  }

  addPage(type: BuilderPageType, atIndex = -1): BuilderPage {
    return this._pageCollection.add(type, atIndex);
  }

  sumScoreVariableCreate(options: { name: string; description: string; useAvg: boolean }) {
    // TODO VALIDATE.
    // this._sumVariables.push({ ...variable });
    const variable = this._sumScoreCollection.addNew(options);

    return variable;
  }
  sumScoreVariableAddToPage(sumScoreVariable: SumScoreVariable, page: BuilderPage, weight: number) {
    const added = this._pageCollection.addSumScoreVariable(sumScoreVariable, page.id, weight);
    this.updateSumScoreRelations();
    return added;
  }

  private updateSumScoreRelations() {
    const sumScoreVariables = this._sumScoreCollection.asArray();
    this._pageCollection.updateRelationShips({ sumScoreVariables });
  }

  sumScoreVariableUpdate(id: SumScoreVariableID, data: Partial<SumScoreVariableDto>) {
    const didUpdate = this._sumScoreCollection._updateOne(id, data);
    this.updateSumScoreRelations();
    return didUpdate;
  }

  sumScoreVariableDeleteFromPage(pageId: PageID, sumScoreVariableId: SumScoreVariableID) {
    this._pageCollection.sumScoreVariableDeleteFromPage(pageId, sumScoreVariableId);
    this.updateSumScoreRelations();
  }

  insertPage(page: BuilderPage, atIndex: number): boolean {
    return this.insertPageAtIndex(page, atIndex);
  }

  private insertPageAtIndex(page: BuilderPage, atIndex: number) {
    return this._pageCollection.insertPage(page, atIndex);
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
    return this._pageCollection.movePage(page, toIndex);
  }

  deletePage(page: BuilderPage): boolean {
    return this._pageCollection.deleteById(page.id);
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
      const pageCount = this._pageCollection.pages.reduce((count, curr) => {
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

    this._pageCollection.pages.forEach((page, index) => {
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
    builderSchema._pageCollection.pages.forEach((p) => {
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

  sumScoreVariableDelete(id: SumScoreVariableID) {
    const didDelete = this._sumScoreCollection._deleteVariable(id);
    const sumScoreVariables = [...this._sumScoreCollection];
    this._pageCollection.updateRelationShips({ sumScoreVariables });
    this._pageCollection.sumScoreVariableDelete(id);
    return didDelete;
  }
}
