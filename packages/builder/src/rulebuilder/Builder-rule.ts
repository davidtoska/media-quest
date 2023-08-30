import { BuilderCondition, type BuilderConditionDto } from "./condition/Builder-condition";
import {
  BuilderConditionGroup,
  type BuilderConditionGroupDto,
  type ConditionGroupType,
} from "./condition/Builder-condition-group";
import type { RuleInput } from "./RuleInput";
import { BuilderObject } from "../BuilderObject";
import { TagActionManager } from "./tag-action-manager";
import { PageActionManager } from "./page-action-manager";
import { JumpToActionManager } from "./jump-to-action-manager";
import { Condition, PageQueCommand, PageQueRules } from "@media-quest/engine";

export interface BuilderRuleDto {
  readonly type: ConditionGroupType;
  readonly name: string;
  readonly conditions: ReadonlyArray<BuilderConditionDto | BuilderConditionGroupDto>;
  readonly excludeTags: ReadonlyArray<string>;
  readonly excludePages: ReadonlyArray<string>;
  readonly jumpToPage: string | false;
}
export class BuilderRule extends BuilderObject<"builder-rule", BuilderRuleDto> {
  readonly objectType: "builder-rule" = "builder-rule";
  private _type: ConditionGroupType = "all";
  public name = "Rule name";
  // public countNumber = 1;
  private readonly _conditions: Array<BuilderCondition | BuilderConditionGroup> = [];

  private readonly _tagActionManager: TagActionManager;
  private _pageActionManager: PageActionManager;
  readonly jumpToActionManager: JumpToActionManager;
  public static readonly fromDto = (dto: BuilderRuleDto, input: RuleInput): BuilderRule => {
    return new BuilderRule(dto, input);
  };

  protected constructor(
    private readonly dto: BuilderRuleDto,
    private readonly _ruleInput: RuleInput,
  ) {
    super(dto);
    const conditionInput = this._ruleInput.getConditionInput();
    this.name = dto.name ?? "";
    this._type = dto.type ?? "any";
    this._conditions = dto.conditions.reduce<Array<BuilderCondition | BuilderConditionGroup>>((acc, curr) => {
      if (curr.kind === "condition") {
        const condition = BuilderCondition.fromDto(curr, conditionInput);
        acc.push(condition);
      }
      if (curr.kind === "condition-group") {
        const conditionGroup = BuilderConditionGroup.fromDto(curr, conditionInput);
        acc.push(conditionGroup);
      }
      return acc;
    }, []);
    // TODO CHECK WITH CURRENT OPTIONS.
    this._pageActionManager = new PageActionManager(_ruleInput.excludeByPageIdActions, dto.excludePages);
    // this.excludeByPageIdDtoList.push(...dto.excludePages);
    this._tagActionManager = new TagActionManager(_ruleInput.excludeByTagActions, dto.excludeTags);

    this.jumpToActionManager = new JumpToActionManager(_ruleInput.jumpToPageActions, dto.jumpToPage);
  }

  get conditions(): ReadonlyArray<BuilderConditionGroup | BuilderCondition> {
    return this._conditions;
  }

  getTagActions() {
    return this._tagActionManager.selectItems;
  }

  getValidPageActions() {
    return this._pageActionManager.selectItems;
  }

  get conditionCount() {
    return this._conditions.length;
  }

  set type(type: ConditionGroupType) {
    if (BuilderConditionGroup.isConditionGroupType(type)) {
      this._type = type;
    }
  }

  get type() {
    return this._type;
  }

  deleteCondition(condition: BuilderCondition | BuilderConditionGroup): boolean {
    const index = this._conditions.indexOf(condition);
    if (index < 0) {
      return false;
    }
    this._conditions.splice(index, 1);
    return true;
  }

  addCondition(): BuilderCondition {
    const condition = BuilderCondition.create(this._ruleInput.getConditionInput());
    this._conditions.push(condition);
    return condition;
  }

  addConditionGroup(): BuilderConditionGroup {
    const dto: BuilderConditionGroupDto = {
      kind: "condition-group",
      name: "",
      type: "all",
      conditions: [],
    };
    const newGroup = BuilderConditionGroup.fromDto(dto, this._ruleInput.questionVars);
    this._conditions.push(newGroup);
    return newGroup;
  }

  clone(): BuilderRuleDto {
    return this.toJson();
  }

  toJson(): BuilderRuleDto {
    const conditions = this._conditions.map((c) => c.toJson());
    const excludePages = this._pageActionManager.getCurrentSelection();
    const excludeTags = this._tagActionManager.getCurrentSelection();
    const jumpToPage = this.jumpToActionManager.getSelectedPageId();
    const dto: BuilderRuleDto = {
      type: this._type,
      name: this.name,
      conditions,
      excludePages,
      jumpToPage,
      excludeTags,
    };
    return dto;
  }
  toEngineRule(modulePrefix: string): PageQueRules {
    const conditions: Condition[] = [];
    this._conditions.forEach((c) => {
      if (c) {
        if (c instanceof BuilderCondition) {
          const simpleCondition = c.toEngineCondition(modulePrefix);
          if (simpleCondition) {
            conditions.push(simpleCondition);
          }
        }
        if (c instanceof BuilderConditionGroup) {
          const complexCondition = c.toEngineConditionComplex(modulePrefix);
          if (complexCondition) conditions.push(complexCondition);
        }
      }
    });
    let all: Condition[] = [];
    let some: Condition[] = [];

    if (this.type === "all") {
      all = [...conditions];
    }
    const pageQueCommands: Array<PageQueCommand> = [];
    const maybeJumpToPage = this.jumpToActionManager.selected;
    if (maybeJumpToPage) {
      const jumpCommand: PageQueCommand = {
        kind: "PAGE_QUE_JUMP_TO_PAGE_COMMAND",
        target: "PAGE_QUE",
        targetId: "PAGE_QUE",
        payload: { pageId: maybeJumpToPage.data.pageId },
      };
      pageQueCommands.push(jumpCommand);
    }

    const excludePageByIdList = this._pageActionManager.getEngineAction().map((a) => a.pageId);
    if (excludePageByIdList.length) {
      const command: PageQueCommand = {
        kind: "PAGE_QUE_EXCLUDE_BY_PAGE_ID_COMMAND",
        target: "PAGE_QUE",
        targetId: "PAGE_QUE",
        payload: { pageIds: [...excludePageByIdList] },
      };
      pageQueCommands.push(command);
    }
    const excludeTags = this._tagActionManager.getEngineActions().map((tagA) => tagA.tag);
    if (excludeTags.length) {
      const excludeTagsCommand: PageQueCommand = {
        kind: "PAGE_QUE_EXCLUDE_BY_TAG_COMMAND",
        target: "PAGE_QUE",
        targetId: "PAGE_QUE",
        payload: { tagIds: [...excludeTags] },
      };
      pageQueCommands.push(excludeTagsCommand);
    }

    const rule: PageQueRules = {
      description: this.name,
      all,
      some,
      onFailure: [],
      onSuccess: pageQueCommands,
    };
    return rule;
  }
}
