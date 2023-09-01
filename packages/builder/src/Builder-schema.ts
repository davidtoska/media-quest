import type { BuilderPageDto, BuilderPageType } from "./Builder-page";
import { BuilderPage } from "./Builder-page";
import { RuleInput } from "./rulebuilder/RuleInput";
import type { QuestionVariable } from "./rulebuilder/RuleVariable";
import type { CustomVariable } from "./rulebuilder";
import type { ExcludeByPageAction, ExcludeByTagAction, JumpToPageAction } from "./rulebuilder";
import type { BuilderTagDto } from "./BuilderTag";
import { BuilderTag, TagCollection } from "./BuilderTag";
import type { BuilderRuleDto } from "./rulebuilder";
import { BuilderRule } from "./rulebuilder";
import { DefaultThemeCompiler } from "./theme/default-theme-compiler";
import { ImageFile } from "./media-files";
import { SchemaDto, DUtil, PageID, SchemaID } from "@media-quest/engine";
import { PagePrefix } from "./primitives/page-prefix";
import { SchemaPrefix, SchemaPrefixValue } from "./primitives/schema-prefix";
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
  readonly rules: ReadonlyArray<BuilderRuleDto>;
  readonly tags: ReadonlyArray<BuilderTagDto>;
}

export interface SchemaBuildOutput {
  schema: SchemaDto;
  codebook: Record<string, string>;
  schemaConfig: Record<string, string>;
}

export class BuilderSchema {
  readonly prefix: SchemaPrefix;
  baseHeight = 1300;
  baseWidth = 1024;
  backgroundColor = "#000000";
  pages: BuilderPage[] = [];
  mainImage: ImageFile | false = false;
  private _rules: BuilderRule[] = [];
  get rules(): ReadonlyArray<BuilderRule> {
    return [...this._rules];
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
    schema.backgroundColor = dto.backgroundColor;
    schema.mainImage = dto.mainImage ?? false;
    const rulesDto = dto.rules ?? [];
    const ruleInput = schema.getRuleInput();
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
    const qVars: QuestionVariable[] = [];
    const cVars: CustomVariable[] = [];
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

  compile(): SchemaBuildOutput {
    const moduleDto = this.toJson();
    const imp = new DefaultThemeCompiler();
    const schema = imp.compile(moduleDto);

    return { codebook: {}, schema, schemaConfig: {} };
  }
}
