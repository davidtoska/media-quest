import {
  BuilderCondition,
  type BuilderConditionDto
} from './Builder-condition';
import {
  BuilderConditionGroup,
  type BuilderConditionGroupDto,
  type ConditionGroupType
} from './Builder-condition-group';
import type { RuleInput } from './RuleInput';
import { BuilderObject } from '../BuilderObject';
import { TagActionManager } from './tag-action-manager';
import { PageActionManager } from './page-action-manager';
import { JumpToActionManager } from './jump-to-action-manager';

export interface BuilderRuleDto {
  readonly type: ConditionGroupType;
  readonly name: string;
  readonly conditions: ReadonlyArray<
    BuilderConditionDto | BuilderConditionGroupDto
  >;
  readonly excludeTags: ReadonlyArray<string>;
  readonly excludePages: ReadonlyArray<string>;
  readonly jumpToPage: string | false;
}
export class BuilderRule extends BuilderObject<'builder-rule', BuilderRuleDto> {
  readonly objectType: 'builder-rule' = 'builder-rule';
  private _type: ConditionGroupType = 'all';
  public name = 'Rule name';
  // public countNumber = 1;
  private readonly _conditions: Array<
    BuilderCondition | BuilderConditionGroup
  > = [];

  private _tagActionManager: TagActionManager;
  private _pageActionManager: PageActionManager;
  readonly jumpToActionManager: JumpToActionManager;
  public static readonly fromDto = (
    dto: BuilderRuleDto,
    input: RuleInput
  ): BuilderRule => {
    return new BuilderRule(dto, input);
  };

  protected constructor(
    private readonly dto: BuilderRuleDto,
    private readonly _ruleInput: RuleInput
  ) {
    super(dto);
    const conditionInput = this._ruleInput.getConditionInput();
    this.name = dto.name ?? '';
    this._type = dto.type ?? 'any';
    this._conditions = dto.conditions.reduce<
      Array<BuilderCondition | BuilderConditionGroup>
    >((acc, curr) => {
      if (curr.kind === 'condition') {
        const condition = BuilderCondition.fromDto(curr, conditionInput);
        acc.push(condition);
      }
      if (curr.kind === 'condition-group') {
        const conditionGroup = BuilderConditionGroup.fromDto(
          curr,
          conditionInput
        );
        acc.push(conditionGroup);
      }
      return acc;
    }, []);
    // TODO CHECK WITH CURRENT OPTIONS.
    this._pageActionManager = new PageActionManager(
      _ruleInput.excludeByPageIdActions,
      dto.excludePages
    );
    // this.excludeByPageIdDtoList.push(...dto.excludePages);
    this._tagActionManager = new TagActionManager(
      _ruleInput.excludeByTagActions,
      dto.excludeTags
    );

    this.jumpToActionManager = new JumpToActionManager(
      _ruleInput.jumpToPageActions,
      dto.jumpToPage
    );
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

  deleteCondition(
    condition: BuilderCondition | BuilderConditionGroup
  ): boolean {
    const index = this._conditions.indexOf(condition);
    if (index < 0) {
      return false;
    }
    this._conditions.splice(index, 1);
    return true;
  }

  addCondition(): BuilderCondition {
    const condition = BuilderCondition.create(
      this._ruleInput.getConditionInput()
    );
    this._conditions.push(condition);
    return condition;
  }

  addConditionGroup(): BuilderConditionGroup {
    const dto: BuilderConditionGroupDto = {
      kind: 'condition-group',
      name: '',
      type: 'all',
      conditions: []
    };
    const newGroup = BuilderConditionGroup.fromDto(
      dto,
      this._ruleInput.questionVars
    );
    this._conditions.push(newGroup);
    return newGroup;
  }

  clone(): BuilderRuleDto {
    return this.toJson();
  }

  toJson(): BuilderRuleDto {
    const conditions = this._conditions.map(c => c.toJson());
    const excludePages = this._pageActionManager.getCurrentSelection();
    const excludeTags = this._tagActionManager.getCurrentSelection();
    const jumpToPage = this.jumpToActionManager.getSelectedPageId();
    const dto: BuilderRuleDto = {
      type: this._type,
      name: this.name,
      conditions,
      excludePages,
      jumpToPage,
      excludeTags
    };
    return dto;
  }
}
