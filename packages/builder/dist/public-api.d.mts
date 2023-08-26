import { DStyle, SchemaDto } from '@media-quest/engine';

/**
 * Builder objects are complex objects that are embedded inside
 * a Builder-schema, and needs to be serialized to json. Often these objects
 * are used in collections, and that is why most of them need an id.
 */
type BuilderObjectType = "builder-page" | "builder-question-option" | "builder-question" | "builder-main-text" | "builder-text" | "builder-rule" | "builder-tag" | "builder-condition" | "builder-variable" | "builder-condition-group";
declare namespace BuilderObjectId {
    type QuestionOptionID = string & {
        __OPTION__ID__: true;
    };
    type QuestionID = string & {
        __QUESTION__ID__: true;
    };
    type VideoFileID = string & {
        __VIDEO__ID__: true;
    };
    type AudioFileID = string & {
        __AUDIO__ID__: true;
    };
    type ImageID = string & {
        __IMAGE__ID__: true;
    };
    type TextID = string & {
        __TEXT__ID__: true;
    };
    type MainTextID = string & {
        __MAIN__TEXT__ID__: true;
    };
    type PageID = string & {
        __PAGE__ID__: true;
    };
    type TagId = string & {
        __TAG__ID__: true;
    };
    const createTagId: () => TagId;
    const mainTextId: () => MainTextID;
    const textId: () => TextID;
    const questionOptionId: () => QuestionOptionID;
    const questionId: () => QuestionID;
    const pageId: () => PageID;
}
declare abstract class BuilderObject<T extends BuilderObjectType, Dto extends {}> {
    abstract readonly objectType: T;
    abstract toJson(): Dto;
    abstract clone(): Dto;
    protected readonly originalDto: Dto;
    protected constructor(dto: Dto);
}

interface CssTheme<S extends Partial<DStyle> = Partial<DStyle>> {
    css: S;
    cssEnabled: Partial<DStyle>;
    cssDisabled: Partial<DStyle>;
}

type PStyle = Partial<DStyle>;
interface BuilderOptionTheme {
    name: string;
    div: CssTheme;
    text1: PStyle;
    text2?: CssTheme;
}

interface AudioFile {
    readonly kind: "audio-file";
    readonly id: string;
    readonly downloadUrl: string;
    readonly duration: number;
    readonly originalFileName: string;
    readonly name: string;
    readonly size: number;
}
interface VideoFile {
    readonly kind: "video-file";
    readonly id: string;
    readonly downloadUrl: string;
    readonly duration: number;
    readonly name: string;
    readonly size: number;
    readonly type: string;
    readonly originalFileName: string;
}
interface ImageFile {
    readonly kind: "image-file";
    readonly id: string;
    readonly downloadUrl: string;
    readonly name: string;
    readonly size: number;
    readonly type: string;
}

interface BuilderOptionDto {
    readonly id: BuilderObjectId.QuestionOptionID;
    readonly value: number;
    readonly label: string;
    readonly labelAudio?: AudioFile;
}
declare class BuilderOption extends BuilderObject<"builder-question-option", BuilderOptionDto> {
    readonly objectType = "builder-question-option";
    theme: BuilderOptionTheme;
    id: BuilderObjectId.QuestionOptionID;
    value: number;
    label: string;
    private _labelAudioFile;
    get labelAudioFile(): AudioFile | false;
    set labelAudioFile(audioFile: AudioFile | false);
    private constructor();
    static create(value: number, label: string): BuilderOption;
    static fromJson(dto: BuilderOptionDto): BuilderOption;
    toJson(): BuilderOptionDto;
    clone(): BuilderOptionDto;
}

type BuilderQuestionType = "select-one" | "select-many" | "text" | "color" | "radio" | "email" | "time" | "checkbox" | "textarea" | "date" | "numeric-range" | "duration";
interface BuilderQuestionDto {
    readonly id: BuilderObjectId.QuestionID;
    _type: BuilderQuestionType;
    text: string;
    options: ReadonlyArray<BuilderOptionDto>;
    prefix: string;
}
declare class BuilderQuestion extends BuilderObject<"builder-question", BuilderQuestionDto> {
    readonly objectType = "builder-question";
    id: BuilderObjectId.QuestionID;
    type: BuilderQuestionType;
    questionText: string;
    options: BuilderOption[];
    prefix: string;
    static create: (type: BuilderQuestionType) => BuilderQuestion;
    static fromJson(dto: BuilderQuestionDto): BuilderQuestion;
    private constructor();
    addOption(label: string, value: number, atIndex?: number): BuilderOption;
    deleteOption(option: BuilderOption): boolean;
    toJson(): BuilderQuestionDto;
    clone(): BuilderQuestionDto;
}

interface BuilderMainVideoDto {
    readonly kind: "main-video";
    readonly file: VideoFile;
    mode: "autoplay" | "required" | "optional";
    preDelay: number;
    volume: number;
    controls: boolean;
}

interface BuilderMainImageDto {
    readonly kind: "main-image";
    readonly file: ImageFile;
    readonly overlay: {
        text: string;
        fontsize: number;
        xPos: number;
        yPos: number;
    } | false;
}

interface BuilderMainTextDto {
    text: string;
    audioFile: AudioFile | false;
    autoplay: boolean;
    autoplayDelay: number;
}
declare class BuilderMainText extends BuilderObject<"builder-main-text", BuilderMainTextDto> {
    readonly objectType: "builder-main-text";
    autoplay: boolean;
    private _audioFile;
    autoplayDelay: number;
    text: string;
    private constructor();
    get autoplayDelayInSeconds(): string;
    get durationTag(): string;
    static fromJson(dto: BuilderMainTextDto): BuilderMainText;
    static create: () => BuilderMainText;
    clone(): BuilderMainTextDto;
    toJson(): BuilderMainTextDto;
    get audioFile(): AudioFile | false;
    set audioFile(audioFile: AudioFile | false);
}

declare const BuilderVariableType: {
    readonly numericWithOptions: true;
    readonly numericRange: true;
    readonly text: true;
    readonly date: true;
    readonly dateRange: true;
    readonly time: true;
    readonly duration: true;
    readonly boolean: true;
};
type BuilderVariableType = keyof typeof BuilderVariableType;
declare class BuilderVariableOption {
    readonly label: string;
    readonly value: number;
    constructor(label: string, value: number);
}
declare class QuestionVariable {
    readonly varId: string;
    readonly label: string;
    readonly options: ReadonlyArray<BuilderVariableOption>;
    readonly pageNumber: number;
    readonly kind: 'question-variable';
    readonly dataType: BuilderVariableType;
    constructor(varId: string, label: string, options: ReadonlyArray<BuilderVariableOption>, pageNumber: number);
}
declare class CustomVariable {
    readonly varId: string;
    readonly label: string;
    readonly options: ReadonlyArray<BuilderVariableOption>;
    readonly kind: 'configuration-variable';
    readonly dataType: BuilderVariableType;
    constructor(varId: string, label: string, options: ReadonlyArray<BuilderVariableOption>);
}
type BuilderVariable = QuestionVariable | CustomVariable;

type BuilderPageType = "info-page" | "question" | "multi-select" | "form";
interface BuilderPageDto {
    readonly id: BuilderObjectId.PageID;
    prefix: string;
    _type: BuilderPageType;
    mainText: BuilderMainTextDto;
    nextButton: BuilderOptionDto;
    defaultQuestion: BuilderQuestionDto;
    questions: Array<BuilderQuestionDto>;
    mainMedia?: BuilderMainImageDto | BuilderMainVideoDto;
    autoplaySequence: Array<string>;
    tags: ReadonlyArray<string>;
}
declare class BuilderPage extends BuilderObject<"builder-page", BuilderPageDto> {
    readonly objectType: "builder-page";
    readonly id: BuilderObjectId.PageID;
    private _pageType;
    private _prefix;
    private _questions;
    private readonly _tags;
    private _backgroundColor;
    mainMedia: BuilderMainVideoDto | BuilderMainImageDto | false;
    defaultQuestion: BuilderQuestion;
    mainText: BuilderMainText;
    nextButton: BuilderOption;
    static create(type: BuilderPageType, _prefix: string): BuilderPage;
    static fromJson(dto: BuilderPageDto): BuilderPage;
    private constructor();
    insertQuestion(question: BuilderQuestion, atIndex: number): boolean;
    addQuestion(type: BuilderQuestionType, atIndex?: number): BuilderQuestion;
    /**
     * Move a question in questions-array
     * @param question (reference)
     * @param toIndex
     */
    moveQuestion(question: BuilderQuestion, toIndex: number): boolean;
    deleteQuestion(question: BuilderQuestion): void;
    private updateRows;
    addTag(tag: string): void;
    deleteTag(tag: string): void;
    set pageType(value: BuilderPageType);
    getQuestionVariables(modulePrefix: string, pageNumber: number): ReadonlyArray<QuestionVariable>;
    get tags(): ReadonlyArray<string>;
    get pageType(): BuilderPageType;
    get prefix(): string;
    set prefix(value: string);
    toJson(): BuilderPageDto;
    clone(): BuilderPageDto;
    get backgroundColor(): string;
    set backgroundColor(color: string);
    get questions(): ReadonlyArray<BuilderQuestion>;
}

interface ExcludeByPageAction {
    readonly kind: 'exclude-by-pageId';
    readonly pageId: string;
    readonly mainText: string;
    readonly pageNumber: number;
}
interface JumpToPageAction {
    readonly kind: 'jump-to-page';
    readonly pageId: string;
    readonly mainText: string;
    readonly pageNumber: number;
}
interface ExcludeByTagAction {
    readonly kind: 'exclude-by-tag';
    readonly tag: string;
    readonly description: string;
    readonly pageCount: number;
}

declare const BuilderOperatorSymbols: {
    readonly equal: true;
    readonly notEqual: true;
    readonly lessThan: true;
    readonly lessThanOrEqual: true;
    readonly greaterThan: true;
    readonly greaterThanOrEqual: true;
    readonly between: true;
    readonly notBetween: true;
    readonly in: true;
    readonly notIn: true;
    readonly missing: true;
    readonly notMissing: true;
    readonly contains: true;
    readonly notContains: true;
    readonly empty: true;
    readonly notEmpty: true;
    readonly startsWith: true;
    readonly endsWith: true;
};
type BuilderOperator = keyof typeof BuilderOperatorSymbols;
declare namespace BuilderOperator {
    const is: (symbol: string) => symbol is "equal" | "notEqual" | "lessThan" | "lessThanOrEqual" | "greaterThan" | "greaterThanOrEqual" | "between" | "notBetween" | "in" | "notIn" | "missing" | "notMissing" | "contains" | "notContains" | "empty" | "notEmpty" | "startsWith" | "endsWith";
}

declare abstract class SingleSelectItem<T> {
    readonly data: T;
    private readonly _selectLabel;
    private readonly _toolTip;
    private readonly _searchString;
    get selectLabel(): string;
    get tooltip(): string;
    get searchString(): string;
    protected constructor(data: T);
    protected abstract getSelectLabel(): string;
    protected abstract getTooltip(): string;
    protected abstract getSearchString(): string;
}
declare class RuleVariableSelectItem extends SingleSelectItem<BuilderVariable> {
    readonly data: BuilderVariable;
    static create: (data: BuilderVariable) => RuleVariableSelectItem;
    readonly options: ReadonlyArray<RuleOptionSelectItem>;
    constructor(data: BuilderVariable);
    protected getSearchString(): string;
    getSelectLabel(): string;
    getTooltip(): string;
}
declare class RuleOptionSelectItem extends SingleSelectItem<BuilderVariableOption> {
    static create: (option: BuilderVariableOption) => RuleOptionSelectItem;
    private constructor();
    protected getSearchString(): string;
    protected getSelectLabel(): string;
    protected getTooltip(): string;
}
declare class OperatorSelectItem extends SingleSelectItem<BuilderOperator | ""> {
    static readonly EQ: OperatorSelectItem;
    static readonly NOT_EQ: OperatorSelectItem;
    static readonly fromSymbol: (symbol: BuilderOperator | Omit<string, BuilderOperator>) => OperatorSelectItem | false;
    private constructor();
    protected getSearchString(): string;
    protected getSelectLabel(): string;
    protected getTooltip(): string;
}
declare class JumpToPageSelectItem extends SingleSelectItem<JumpToPageAction> {
    static readonly create: (pageData: JumpToPageAction) => JumpToPageSelectItem;
    protected constructor(pageData: JumpToPageAction);
    protected getSearchString(): string;
    protected getSelectLabel(): string;
    protected getTooltip(): string;
}

/**
 * TODO Crate filters for "cardinality" or "order" of a variable;
 * Return legal lists of variables.
 */
declare class RuleInput {
    private readonly _questionVariables;
    private readonly _customVariables;
    private readonly _pageIdActions;
    private readonly _tagActions;
    private readonly _jumpActions;
    constructor(_questionVariables: ReadonlyArray<QuestionVariable>, _customVariables: ReadonlyArray<CustomVariable>, _pageIdActions: ReadonlyArray<ExcludeByPageAction>, _tagActions: ReadonlyArray<ExcludeByTagAction>, _jumpActions: ReadonlyArray<JumpToPageAction>);
    get questionVars(): ReadonlyArray<QuestionVariable>;
    getConditionInput(): ReadonlyArray<BuilderVariable>;
    getJumpToPageOptions(): ReadonlyArray<JumpToPageSelectItem>;
    get customVars(): ReadonlyArray<CustomVariable>;
    get excludeByPageIdActions(): readonly ExcludeByPageAction[];
    get excludeByTagActions(): readonly ExcludeByTagAction[];
    get jumpToPageActions(): readonly JumpToPageAction[];
}

interface BuilderTagDto {
    readonly id: BuilderObjectId.TagId;
    readonly tag: string;
    readonly description: string;
}
declare class BuilderTag extends BuilderObject<'builder-tag', BuilderTagDto> {
    readonly objectType: 'builder-tag';
    readonly id: BuilderObjectId.TagId;
    tagText: string;
    tagDescription: string;
    static readonly MAX_LENGTH = 20;
    static readonly MIN_LENGTH = 1;
    static readonly create: (tag: string, description?: string) => BuilderTag;
    static readonly fromDto: (dto: BuilderTagDto) => BuilderTag;
    protected constructor(dto: BuilderTagDto);
    clone(): BuilderTagDto;
    toJson(): BuilderTagDto;
}
declare class TagCollection implements Iterable<BuilderTag> {
    private readonly _tags;
    static readonly create: () => TagCollection;
    [Symbol.iterator](): IterableIterator<BuilderTag>;
    private constructor();
    init(tags: ReadonlyArray<BuilderTagDto>): void;
    add(tag: BuilderTag): void;
    /**
     * Delete this tag from collection;
     * @param tag
     */
    delete(tag: BuilderTag): void;
    toJson(): ReadonlyArray<BuilderTagDto>;
    deleteAll(tags: Iterable<BuilderTag>): void;
}

interface BuilderConditionDto {
    readonly kind: "condition";
    readonly operator: BuilderOperator | "";
    readonly name: string;
    readonly variableId: string;
    readonly value: number | string | boolean;
}
declare class BuilderCondition extends BuilderObject<"builder-condition", BuilderConditionDto> {
    readonly objectType: "builder-condition";
    static readonly NUMBER_OPERATORS: ReadonlyArray<OperatorSelectItem>;
    private initialDto;
    name: string;
    static create: (variableList: ReadonlyArray<BuilderVariable>) => BuilderCondition;
    static fromDto: (dto: BuilderConditionDto, variables: ReadonlyArray<BuilderVariable>) => BuilderCondition;
    private _variable;
    private _operator;
    private _value;
    private _variableList;
    /**
     * Can only set variables that exist in variableList.
     * @param variable
     */
    set variable(variable: BuilderVariable | false);
    get variable(): BuilderVariable | false;
    set value(variableValue: BuilderVariableOption | false);
    get value(): BuilderVariableOption | false;
    validate(): {
        isValid: true;
    } | {
        isValid: false;
        message: string;
    };
    private findVariableInUniverse;
    set operator(operator: BuilderOperator | "");
    get operator(): BuilderOperator | "";
    private constructor();
    get variableSelectItemsInUniverse(): ReadonlyArray<RuleVariableSelectItem>;
    get operatorsSelectItems(): ReadonlyArray<OperatorSelectItem>;
    get selectValueItems(): ReadonlyArray<RuleOptionSelectItem>;
    clone(): BuilderConditionDto;
    private _setVariableList;
    toJson(): BuilderConditionDto;
}

declare const ConditionGroupType: {
    all: boolean;
    any: boolean;
    count: boolean;
    range: boolean;
};
type ConditionGroupType = keyof typeof ConditionGroupType;
interface BuilderConditionGroupDto {
    readonly kind: 'condition-group';
    readonly name: string;
    readonly type: ConditionGroupType;
    readonly conditions: ReadonlyArray<BuilderConditionDto>;
}
declare class BuilderConditionGroup extends BuilderObject<'builder-condition-group', BuilderConditionGroupDto> {
    static readonly isConditionGroupType: (value: string | symbol) => value is "all" | "any" | "count" | "range";
    readonly objectType: 'builder-condition-group';
    private _type;
    name: string;
    private readonly _conditions;
    private readonly _variableList;
    static readonly fromDto: (dto: BuilderConditionGroupDto, variableList: ReadonlyArray<BuilderVariable>) => BuilderConditionGroup;
    protected constructor(dto: BuilderConditionGroupDto, variableList: ReadonlyArray<BuilderVariable>);
    get conditions(): ReadonlyArray<BuilderCondition>;
    get conditionCount(): number;
    addCondition(): BuilderCondition;
    removeCondition(condition: BuilderCondition): boolean;
    clone(): BuilderConditionGroupDto;
    toJson(): BuilderConditionGroupDto;
    get type(): ConditionGroupType;
    set type(conditionGroupType: ConditionGroupType);
}

declare abstract class MultiSelectItem<T> {
    readonly data: T;
    private readonly _isSelectedInitially;
    private readonly _selectLabel;
    private readonly _toolTip;
    private readonly _searchString;
    isSelected: boolean;
    get selectLabel(): string;
    get tooltip(): string;
    get searchString(): string;
    protected constructor(data: T, isSelected: boolean);
    protected abstract getSelectLabel(): string;
    protected abstract getTooltip(): string;
    protected abstract getSearchString(): string;
}
declare class ExcludeByTagSelectItem extends MultiSelectItem<ExcludeByTagAction> {
    static readonly create: (tagData: ExcludeByTagAction, isSelected: boolean) => ExcludeByTagSelectItem;
    protected constructor(data: ExcludeByTagAction, isSelected: boolean);
    protected getSearchString(): string;
    protected getSelectLabel(): string;
    protected getTooltip(): string;
}
declare class ExcludeByPageIdSelectItem extends MultiSelectItem<ExcludeByPageAction> {
    static create: (ruleActionPage: ExcludeByPageAction, isSelected: boolean) => ExcludeByPageIdSelectItem;
    protected constructor(data: ExcludeByPageAction, isSelected: boolean);
    protected getSearchString(): string;
    protected getSelectLabel(): string;
    protected getTooltip(): string;
}

declare class JumpToActionManager {
    private readonly validOptions;
    private readonly initialSelection;
    readonly options: ReadonlyArray<JumpToPageSelectItem>;
    private _selected;
    constructor(validOptions: RuleInput["_jumpActions"], initialSelection: string | false | undefined);
    get selected(): JumpToPageSelectItem | false;
    set selected(selected: JumpToPageSelectItem | false);
    getSelectedPageId(): string | false;
    private findSelected;
}

interface BuilderRuleDto {
    readonly type: ConditionGroupType;
    readonly name: string;
    readonly conditions: ReadonlyArray<BuilderConditionDto | BuilderConditionGroupDto>;
    readonly excludeTags: ReadonlyArray<string>;
    readonly excludePages: ReadonlyArray<string>;
    readonly jumpToPage: string | false;
}
declare class BuilderRule extends BuilderObject<'builder-rule', BuilderRuleDto> {
    private readonly dto;
    private readonly _ruleInput;
    readonly objectType: 'builder-rule';
    private _type;
    name: string;
    private readonly _conditions;
    private _tagActionManager;
    private _pageActionManager;
    readonly jumpToActionManager: JumpToActionManager;
    static readonly fromDto: (dto: BuilderRuleDto, input: RuleInput) => BuilderRule;
    protected constructor(dto: BuilderRuleDto, _ruleInput: RuleInput);
    get conditions(): ReadonlyArray<BuilderConditionGroup | BuilderCondition>;
    getTagActions(): readonly ExcludeByTagSelectItem[];
    getValidPageActions(): readonly ExcludeByPageIdSelectItem[];
    get conditionCount(): number;
    set type(type: ConditionGroupType);
    get type(): ConditionGroupType;
    deleteCondition(condition: BuilderCondition | BuilderConditionGroup): boolean;
    addCondition(): BuilderCondition;
    addConditionGroup(): BuilderConditionGroup;
    clone(): BuilderRuleDto;
    toJson(): BuilderRuleDto;
}

interface BuilderSchemaDto {
    readonly id: string;
    readonly prefix: string;
    readonly mainImage: ImageFile | false;
    readonly backgroundColor: string;
    readonly name: string;
    readonly pages: BuilderPageDto[];
    readonly baseHeight: number;
    readonly baseWidth: number;
    readonly rules: ReadonlyArray<BuilderRuleDto>;
    readonly tags: ReadonlyArray<BuilderTagDto>;
}
interface SchemaBuildOutput {
    schema: SchemaDto;
    codebook: Record<string, string>;
    schemaConfig: Record<string, string>;
}
declare class BuilderSchema {
    readonly id: string;
    name: string;
    prefix: string;
    baseHeight: number;
    baseWidth: number;
    backgroundColor: string;
    pages: BuilderPage[];
    mainImage: ImageFile | false;
    private _rules;
    get rules(): ReadonlyArray<BuilderRule>;
    private readonly _tagCollection;
    get tags(): ReadonlyArray<BuilderTag>;
    static create(id: string, name: string, prefix: string): BuilderSchema;
    static fromJson(dto: BuilderSchemaDto): BuilderSchema;
    toJson(): BuilderSchemaDto;
    private constructor();
    addPage(type: BuilderPageType, atIndex?: number): BuilderPage;
    insertPage(page: BuilderPage, atIndex: number): boolean;
    private insertPageAtIndex;
    addRule(): void;
    deleteRule(rule: BuilderRule): void;
    movePage(page: BuilderPage, toIndex: number): boolean;
    deletePage(page: BuilderPage): boolean;
    reevaluateRules(): void;
    getRuleInput(): RuleInput;
    deleteTags(tags: ReadonlyArray<BuilderTag>): void;
    addTag(builderTag: BuilderTag): void;
    private getQuestionVariables;
    compile(): SchemaBuildOutput;
}

interface BuilderTextDto {
    readonly id: BuilderObjectId.TextID;
    text: string;
    name: string;
    translationRequired: boolean;
}
declare class BuilderText extends BuilderObject<'builder-text', BuilderTextDto> {
    readonly objectType = "builder-text";
    id: BuilderObjectId.TextID;
    text: string;
    name: string;
    translateRequired: boolean;
    private constructor();
    static create(name: string): BuilderText;
    static fromJson(dto: BuilderTextDto): BuilderText;
    clone(): BuilderTextDto;
    toJson(): BuilderTextDto;
}

export { AudioFile, BuilderMainImageDto, BuilderMainText, BuilderMainTextDto, BuilderMainVideoDto, BuilderOption, BuilderOptionDto, BuilderPage, BuilderPageDto, BuilderPageType, BuilderQuestion, BuilderQuestionDto, BuilderQuestionType, BuilderSchema, BuilderSchemaDto, BuilderTag, BuilderTagDto, BuilderText, BuilderTextDto, ImageFile, TagCollection, VideoFile };
