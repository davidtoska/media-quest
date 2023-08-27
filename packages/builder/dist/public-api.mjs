// src/BuilderObject.ts
import { DUtil } from "@media-quest/engine";
var U = DUtil;
var BuilderObjectId;
((BuilderObjectId2) => {
  BuilderObjectId2.createTagId = () => {
    return createId("builder-tag");
  };
  BuilderObjectId2.mainTextId = () => {
    return createId("builder-main-text");
  };
  BuilderObjectId2.textId = () => {
    return createId("builder-text");
  };
  BuilderObjectId2.questionOptionId = () => {
    return createId("builder-question-option");
  };
  BuilderObjectId2.questionId = () => {
    return createId("builder-question");
  };
  BuilderObjectId2.pageId = () => {
    return createId("builder-page");
  };
  const createId = (type) => {
    const id = U.randomString(24);
    return type + "-" + id;
  };
})(BuilderObjectId || (BuilderObjectId = {}));
var BuilderObject = class {
  originalDto;
  constructor(dto) {
    this.originalDto = dto;
  }
};

// src/theme/icon-urls.ts
var IconUrls = {
  ispeWhitePng: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fispe-hvit.png?alt=media&token=f6fe628b-2d99-472d-a2ea-e062873e2e22",
  pauseSvg: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fpause-24px.svg?alt=media&token=47337491-bb0d-4c56-9c89-a073ce19fad4",
  pauseCircleOutlineSvg: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fpause_circle_outline-24px.svg?alt=media&token=133aabc8-ab9a-4eaa-9914-4f0f82c22ee2",
  pauseCircleFilledSvg: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fpause_circle_filled-24px.svg?alt=media&token=af3f12c3-3199-4096-8ed2-76347b9a0a0a",
  playCircleRegular: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fplay-circle-regular.svg?alt=media&token=0867b690-d7fd-475c-8e91-b2d7aeca54d1",
  playArrowSvg: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fplay_arrow-24px.svg?alt=media&token=2fa95e1f-61f7-4a18-afb3-210eabae8227",
  playCircleOutline: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fplay_circle_outline-24px.svg?alt=media&token=3a9f62c5-dfa2-40ef-a50e-cf1bdd2d47f2",
  stopCircleSvg: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fstop_circle-24px.svg?alt=media&token=8fbc8b89-29bb-49ad-ae11-b8882ba3ca77",
  stopSvg: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fstop-24px.svg?alt=media&token=d2cd41f1-1331-4243-9b7a-dc0f0ccd255d",
  replayCircleSvg: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Freplay-24px.svg?alt=media&token=3c35ccf4-b467-4e81-85d6-b36ac64738ad",
  volumeOffSvg: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fvolume_off-24px.svg?alt=media&token=4e41cc10-9f4b-4967-b4df-ed0682e657a9",
  volumeUpSvg: "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fvolume_up-24px.svg?alt=media&token=551bd0a6-a515-4f87-a245-da433f4833f9"
};

// src/theme/IDefaultTheme.ts
var BuilderOptionTheme;
((BuilderOptionTheme2) => {
  const GREEN = "#70AD47";
  const YELLOW = "#FFC000";
  const ORANGE = "#F4902C";
  const RED = "#FF0000";
  const LIGHT_BLUE = "#42719C";
  const WHITE = "#ffffff";
  const BLUE = "#2F5597";
  const BTN_WIDTH = 18.5;
  const BTN_BORDER_WIDTH = 3;
  const BTN_BORDER_RADIUS = 10;
  const BTN_BORDER_STYLE = "solid";
  const BTN_HEIGHT = 9.2;
  const BTN_SHORT_WIDTH = 13.7;
  const FONT_WEIGHT = 600;
  const FONT_SIZE = 35;
  BuilderOptionTheme2.blueButton = () => ({
    name: "blue-button-theme",
    div: {
      css: {
        backgroundColor: BLUE,
        borderColor: BLUE,
        textColor: WHITE,
        fontSize: { _unit: "px", value: FONT_SIZE },
        borderWidth: { _unit: "px", value: BTN_BORDER_WIDTH },
        borderStyle: BTN_BORDER_STYLE,
        borderRadius: { value: BTN_BORDER_RADIUS, _unit: "px" },
        padding: { _unit: "px", value: 40 },
        h: BTN_HEIGHT,
        w: BTN_WIDTH,
        x: 10,
        y: 8,
        textAlign: "center"
      },
      cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
      cssEnabled: { opacity: 1, cursor: "pointer" }
    },
    text1: {
      y: 50,
      transform: "translate(0%, 50%)",
      textColor: WHITE,
      fontSize: { _unit: "px", value: FONT_SIZE },
      w: 84,
      x: 8,
      fontWeight: FONT_WEIGHT,
      textAlign: "center"
    }
  });
})(BuilderOptionTheme || (BuilderOptionTheme = {}));
var DefaultTheme = {
  name: "default-theme",
  videoPlayer: {
    playButton: {
      iconUrl: IconUrls.playCircleRegular,
      css: { w: 5, h: 5, y: 48, x: 4 },
      cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
      cssEnabled: { opacity: 0.8, cursor: "pointer" }
    },
    pauseButton: {
      iconUrl: IconUrls.pauseSvg,
      css: { w: 5, h: 5, y: 48, x: 4 },
      cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
      cssEnabled: { opacity: 0.8, cursor: "pointer" }
    },
    videoElement: { css: { w: 100, h: 45, y: 55, x: 0 } }
  },
  image: { style: { h: 50, w: 100, x: 0 } },
  mainText: {
    noMedia: {
      text: {
        css: {
          w: 80,
          y: 27,
          x: 10,
          textAlign: "center",
          textColor: "black",
          fontSize: { _unit: "px", value: 30 }
        },
        cssDisabled: {},
        cssEnabled: {}
      },
      audio: {
        css: {
          h: 6,
          w: 6,
          x: 4,
          y: 32,
          cursor: "pointer",
          opacity: 0.8,
          visibility: "visible"
        },
        cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
        cssEnabled: { opacity: 0.8, cursor: "pointer" }
      }
    },
    withMedia: {
      text: {
        css: {
          w: 80,
          y: 27,
          x: 10,
          textAlign: "center",
          textColor: "black",
          fontSize: { _unit: "px", value: 30 }
        },
        cssDisabled: {},
        cssEnabled: {}
      },
      audio: {
        css: {
          h: 6,
          w: 6,
          x: 4,
          y: 32,
          cursor: "pointer",
          opacity: 0.8,
          visibility: "visible"
        },
        cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
        cssEnabled: { opacity: 0.8, cursor: "pointer" }
      }
    }
  },
  nextButtonTheme: BuilderOptionTheme.blueButton(),
  responseButtons: BuilderOptionTheme.blueButton()
};

// src/Builder-option.ts
var BuilderOption = class _BuilderOption extends BuilderObject {
  objectType = "builder-question-option";
  theme = DefaultTheme.responseButtons;
  id;
  value;
  label = "";
  _labelAudioFile = false;
  get labelAudioFile() {
    return this._labelAudioFile;
  }
  set labelAudioFile(audioFile) {
    this._labelAudioFile = audioFile;
  }
  constructor(dto) {
    super(dto);
    this.id = dto.id;
    this.value = dto.value;
    this.label = dto.label;
  }
  static create(value, label) {
    const id = BuilderObjectId.questionOptionId();
    const dto = {
      id,
      value,
      label
    };
    const instance = new _BuilderOption(dto);
    return instance;
  }
  static fromJson(dto) {
    const instance = new _BuilderOption(dto);
    return instance;
  }
  toJson() {
    const dto = {
      id: this.id,
      value: this.value,
      label: this.label
    };
    return dto;
  }
  clone() {
    const cloneId = BuilderObjectId.questionOptionId();
    const dto = this.toJson();
    const cloneDto = { ...dto, id: cloneId };
    return cloneDto;
  }
};

// src/Builder-question.ts
var BuilderQuestion = class _BuilderQuestion extends BuilderObject {
  objectType = "builder-question";
  id;
  type;
  questionText = "";
  options = [];
  prefix = "";
  static create = (type) => {
    const id = BuilderObjectId.questionId();
    return new _BuilderQuestion({
      id,
      _type: type,
      text: "",
      options: [],
      prefix: ""
    });
  };
  static fromJson(dto) {
    const question = new _BuilderQuestion(dto);
    return question;
  }
  constructor(dto) {
    super(dto);
    this.id = dto.id;
    this.type = dto._type;
    this.questionText = dto.text;
    this.prefix = dto.prefix;
    this.options = dto.options.map((o) => BuilderOption.fromJson(o));
  }
  addOption(label, value, atIndex = -1) {
    const option = BuilderOption.create(value, label);
    if (atIndex >= 0 && atIndex < this.options.length) {
      this.options.splice(atIndex, 0, option);
    } else {
      this.options.push(option);
    }
    return option;
  }
  deleteOption(option) {
    const filtered = this.options.filter((o) => o.id !== option.id);
    const didDelete = filtered.length === this.options.length - 1;
    this.options = filtered;
    return didDelete;
  }
  toJson() {
    const optionsJson = this.options.map((o) => o.toJson());
    const dto = {
      id: this.id,
      prefix: this.prefix,
      _type: this.type,
      text: this.questionText,
      options: optionsJson
    };
    return dto;
  }
  clone() {
    const cloneId = BuilderObjectId.questionId();
    const dto = this.toJson();
    const optionsClone = this.options.map((o) => o.clone());
    const clonedDto = {
      ...dto,
      id: cloneId,
      options: optionsClone
    };
    return clonedDto;
  }
};

// src/BuilderMainText.ts
var BuilderMainText = class _BuilderMainText extends BuilderObject {
  objectType = "builder-main-text";
  autoplay = false;
  _audioFile = false;
  autoplayDelay = 0;
  text = "";
  constructor(dto) {
    super(dto);
    this._audioFile = dto.audioFile ?? false;
    this.autoplay = dto.autoplay ?? false;
    this.autoplayDelay = dto.autoplayDelay ?? 0;
    this.text = dto.text ?? "";
  }
  get autoplayDelayInSeconds() {
    const delay = this.autoplayDelay;
    const s = delay / 1e3;
    const formatted = s.toFixed(1);
    return formatted;
  }
  get durationTag() {
    if (!this.audioFile)
      return "";
    const dur = this.audioFile.duration.toFixed(1);
    return "dur " + dur + " s";
  }
  static fromJson(dto) {
    const mainText = new _BuilderMainText(dto);
    return mainText;
  }
  static create = () => {
    const dto = {
      autoplay: false,
      autoplayDelay: 0,
      audioFile: false,
      text: ""
    };
    return new _BuilderMainText(dto);
  };
  clone() {
    const dto = this.toJson();
    const clone = JSON.parse(JSON.stringify(dto));
    return clone;
  }
  toJson() {
    const dto = {
      text: this.text,
      audioFile: this.audioFile,
      autoplay: this.autoplay,
      autoplayDelay: this.autoplayDelay
    };
    return dto;
  }
  get audioFile() {
    return this._audioFile;
  }
  set audioFile(audioFile) {
    if (audioFile === false) {
      this.autoplayDelay = 0;
      this.autoplay = false;
    }
    this._audioFile = audioFile;
  }
};

// src/rulebuilder/RuleVariable.ts
var BuilderVariableOption = class {
  constructor(label, value) {
    this.label = label;
    this.value = value;
  }
};
var QuestionVariable = class {
  constructor(varId, label, options, pageNumber) {
    this.varId = varId;
    this.label = label;
    this.options = options;
    this.pageNumber = pageNumber;
  }
  kind = "question-variable";
  dataType = "numericWithOptions";
};
var CustomVariable = class {
  constructor(varId, label, options) {
    this.varId = varId;
    this.label = label;
    this.options = options;
  }
  kind = "configuration-variable";
  dataType = "numericWithOptions";
};

// src/Builder-page.ts
import { DUtil as DUtil2 } from "@media-quest/engine";
var U2 = DUtil2;
var BuilderPage = class _BuilderPage extends BuilderObject {
  objectType = "builder-page";
  id;
  _pageType;
  _prefix = "";
  _questions = [];
  _tags;
  _backgroundColor = "#FFFFFF";
  mainMedia = false;
  defaultQuestion;
  mainText;
  nextButton = BuilderOption.create(-1, "Neste");
  static create(type, _prefix) {
    const id = BuilderObjectId.pageId();
    const mainTextDto = {
      text: "",
      audioFile: false,
      autoplay: false,
      autoplayDelay: 0
    };
    const nextButtonDto = BuilderOption.create(-1, "page-next-button-text").toJson();
    const defaultQuestionDto = BuilderQuestion.create("select-one").toJson();
    const dto = {
      _type: type,
      autoplaySequence: [],
      defaultQuestion: defaultQuestionDto,
      id,
      nextButton: nextButtonDto,
      mainText: mainTextDto,
      prefix: "",
      questions: [],
      tags: []
    };
    const page = new _BuilderPage(dto);
    return page;
  }
  static fromJson(dto) {
    const page = new _BuilderPage(dto);
    return page;
  }
  constructor(dto) {
    super(dto);
    this.id = dto.id;
    this._pageType = dto._type;
    this._prefix = dto.prefix;
    this.mainText = BuilderMainText.fromJson(dto.mainText);
    this.nextButton = BuilderOption.fromJson(dto.nextButton);
    this.defaultQuestion = BuilderQuestion.fromJson(dto.defaultQuestion);
    this._questions = dto.questions.map((q) => BuilderQuestion.fromJson(q));
    const tagList = Array.isArray(dto.tags) ? dto.tags : [];
    this._tags = new Set(tagList);
    if (dto.mainMedia) {
      this.mainMedia = dto.mainMedia;
    }
    this.updateRows();
  }
  insertQuestion(question, atIndex) {
    const validIndexFn = U2.isInRange(0, this._questions.length);
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
  addQuestion(type, atIndex = -1) {
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
  moveQuestion(question, toIndex) {
    const validToIndexFn = U2.isInRange(0, this._questions.length);
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
  deleteQuestion(question) {
    this._questions = this._questions.filter((q) => q !== question);
    this.updateRows();
  }
  updateRows() {
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
  addTag(tag) {
    this._tags.add(tag);
  }
  deleteTag(tag) {
    this._tags.delete(tag);
  }
  set pageType(value) {
    this._pageType = value;
    this.updateRows();
  }
  getQuestionVariables(modulePrefix, pageNumber) {
    const variables = [];
    if (this._pageType === "question") {
      const pagePrefix = this.prefix;
      const id = modulePrefix ? modulePrefix + "_" + pagePrefix : pagePrefix;
      const label = this.mainText.text;
      const op = this.defaultQuestion.options.map((o) => {
        const label2 = o.label;
        const value = o.value;
        return new BuilderVariableOption(label2, value);
      });
      const singleVar = new QuestionVariable(id, label, op, pageNumber);
      variables.push(singleVar);
    }
    return variables;
  }
  get tags() {
    return [...this._tags];
  }
  get pageType() {
    return this._pageType;
  }
  get prefix() {
    return this._prefix;
  }
  set prefix(value) {
    this._prefix = value;
  }
  toJson() {
    const questions = this._questions.map((q) => q.toJson());
    const mainText = this.mainText.toJson();
    const nextButton = this.nextButton.toJson();
    const mainMedia = this.mainMedia;
    const dto = {
      _type: this.pageType,
      mainText,
      autoplaySequence: [],
      nextButton,
      id: this.id,
      tags: [...this.tags],
      prefix: this._prefix,
      defaultQuestion: this.defaultQuestion.toJson(),
      questions
    };
    if (mainMedia) {
      dto.mainMedia = mainMedia;
    }
    return dto;
  }
  clone() {
    const dto = this.toJson();
    const defaultQuestionClone = this.defaultQuestion.clone();
    const mainTextClone = JSON.parse(JSON.stringify(this.mainText));
    const questionsClone = this.questions.map((q) => q.clone());
    const newId = BuilderObjectId.pageId();
    const clone = {
      ...dto,
      id: newId,
      defaultQuestion: defaultQuestionClone,
      mainText: mainTextClone,
      questions: questionsClone
    };
    return clone;
  }
  get backgroundColor() {
    return this._backgroundColor;
  }
  set backgroundColor(color) {
    if (typeof color === "string") {
      this._backgroundColor = color;
    }
  }
  get questions() {
    return this._questions;
  }
};

// src/rulebuilder/SingleSelectItem.ts
var SingleSelectItem = class {
  constructor(data) {
    this.data = data;
    this._selectLabel = this.getSelectLabel();
    this._toolTip = this.getTooltip();
    this._searchString = this.getSearchString();
  }
  _selectLabel;
  _toolTip;
  _searchString;
  get selectLabel() {
    return this._selectLabel;
  }
  get tooltip() {
    return this._toolTip;
  }
  get searchString() {
    return this._searchString;
  }
};
var RuleVariableSelectItem = class _RuleVariableSelectItem extends SingleSelectItem {
  constructor(data) {
    super(data);
    this.data = data;
    this.options = data.options.map(RuleOptionSelectItem.create);
  }
  static create = (data) => {
    return new _RuleVariableSelectItem(data);
  };
  options;
  getSearchString() {
    return this.data.varId + this.data.label;
  }
  getSelectLabel() {
    return this.data.varId;
  }
  getTooltip() {
    return this.data.label;
  }
};
var RuleOptionSelectItem = class _RuleOptionSelectItem extends SingleSelectItem {
  static create = (option) => {
    return new _RuleOptionSelectItem(option);
  };
  constructor(option) {
    super(option);
  }
  getSearchString() {
    return "";
  }
  getSelectLabel() {
    return this.data.label + "(" + this.data.value + ")";
  }
  getTooltip() {
    return "";
  }
};
var OperatorSelectItem = class _OperatorSelectItem extends SingleSelectItem {
  static EQ = new _OperatorSelectItem("equal");
  static NOT_EQ = new _OperatorSelectItem("notEqual");
  static fromSymbol = (symbol) => {
    if (symbol === "equal") {
      return _OperatorSelectItem.EQ;
    }
    if (symbol === "notEqual") {
      return _OperatorSelectItem.NOT_EQ;
    }
    return false;
  };
  constructor(operator) {
    super(operator);
  }
  getSearchString() {
    return "";
  }
  getSelectLabel() {
    const operator = this.data;
    if (operator === "equal") {
      return "Equals";
    }
    if (operator === "notEqual") {
      return "Not equals";
    }
    return "";
  }
  getTooltip() {
    const operator = this.data;
    if (operator === "equal") {
      return "Equals";
    }
    if (operator === "notEqual") {
      return "Not equals";
    }
    return "";
  }
};
var JumpToPageSelectItem = class _JumpToPageSelectItem extends SingleSelectItem {
  static create = (pageData) => new _JumpToPageSelectItem(pageData);
  constructor(pageData) {
    super(pageData);
  }
  getSearchString() {
    return this.data.pageId + this.data.mainText;
  }
  getSelectLabel() {
    return this.data.pageId + " (" + this.data.pageNumber + ")";
  }
  getTooltip() {
    return this.data.mainText;
  }
};

// src/rulebuilder/RuleInput.ts
var RuleInput = class {
  constructor(_questionVariables, _customVariables, _pageIdActions, _tagActions, _jumpActions) {
    this._questionVariables = _questionVariables;
    this._customVariables = _customVariables;
    this._pageIdActions = _pageIdActions;
    this._tagActions = _tagActions;
    this._jumpActions = _jumpActions;
  }
  get questionVars() {
    return this._questionVariables;
  }
  getConditionInput() {
    return [...this.questionVars, ...this.customVars];
  }
  getJumpToPageOptions() {
    return this._jumpActions.map(JumpToPageSelectItem.create);
  }
  get customVars() {
    return this._customVariables;
  }
  get excludeByPageIdActions() {
    return this._pageIdActions;
  }
  get excludeByTagActions() {
    return this._tagActions;
  }
  get jumpToPageActions() {
    return this._jumpActions;
  }
};

// src/BuilderTag.ts
var BuilderTag = class _BuilderTag extends BuilderObject {
  objectType = "builder-tag";
  id;
  tagText = "";
  tagDescription = "";
  static MAX_LENGTH = 20;
  static MIN_LENGTH = 1;
  static create = (tag, description = "") => {
    const id = BuilderObjectId.createTagId();
    const dto = {
      id,
      tag,
      description
    };
    return new _BuilderTag(dto);
  };
  static fromDto = (dto) => {
    return new _BuilderTag(dto);
  };
  constructor(dto) {
    const id = dto.id ?? BuilderObjectId.createTagId();
    const withId = { ...dto, id };
    super(withId);
    this.id = id;
    this.tagText = dto.tag ?? "";
    this.tagDescription = dto.description ?? "";
  }
  clone() {
    return this.toJson();
  }
  toJson() {
    return { tag: this.tagText, description: this.tagDescription, id: this.id };
  }
};
var TagCollection = class _TagCollection {
  _tags = /* @__PURE__ */ new Set();
  static create = () => {
    return new _TagCollection([]);
  };
  [Symbol.iterator]() {
    const list = [...this._tags];
    return list[Symbol.iterator]();
  }
  constructor(initialTags) {
    initialTags.forEach((tag) => {
      this._tags.add(tag);
    });
  }
  init(tags) {
    const dtoList = Array.isArray(tags) ? tags : [];
    const all = dtoList.map(BuilderTag.fromDto);
    all.forEach((tag) => {
      this._tags.add(tag);
    });
  }
  add(tag) {
    this._tags.add(tag);
  }
  /**
   * Delete this tag from collection;
   * @param tag
   */
  delete(tag) {
    this._tags.delete(tag);
  }
  toJson() {
    const list = [...this._tags];
    const dtoList = list.map((t) => t.toJson());
    return dtoList;
  }
  deleteAll(tags) {
    const l = tags[Symbol.iterator]();
    const asList = [...tags];
    asList.forEach((t) => {
      this.delete(t);
    });
  }
};

// src/rulebuilder/condition/Builder-operator.ts
var BuilderOperatorSymbols = {
  equal: true,
  notEqual: true,
  lessThan: true,
  lessThanOrEqual: true,
  greaterThan: true,
  greaterThanOrEqual: true,
  between: true,
  notBetween: true,
  in: true,
  notIn: true,
  missing: true,
  notMissing: true,
  contains: true,
  notContains: true,
  empty: true,
  notEmpty: true,
  startsWith: true,
  endsWith: true
};
var BuilderOperator;
((BuilderOperator2) => {
  BuilderOperator2.is = (symbol) => {
    if (typeof symbol !== "string") {
      return false;
    }
    return Object.keys(BuilderOperatorSymbols).includes(symbol);
  };
})(BuilderOperator || (BuilderOperator = {}));

// src/rulebuilder/condition/Builder-condition.ts
var BuilderCondition = class _BuilderCondition extends BuilderObject {
  objectType = "builder-condition";
  static NUMBER_OPERATORS = [
    OperatorSelectItem.EQ,
    OperatorSelectItem.NOT_EQ
  ];
  initialDto;
  name = "";
  static create = (variableList) => {
    const condition = new _BuilderCondition(
      {
        kind: "condition",
        name: "",
        operator: "",
        variableId: "",
        value: ""
      },
      variableList
    );
    return condition;
  };
  static fromDto = (dto, variables) => {
    const _dto = {
      kind: "condition",
      name: dto.name ?? "",
      value: dto.value ?? "",
      operator: dto.operator ?? "",
      variableId: dto.variableId ?? ""
    };
    const instance = new _BuilderCondition(_dto, variables);
    return instance;
  };
  _variable = false;
  _operator = "";
  _value = false;
  _variableList = [];
  /**
   * Can only set variables that exist in variableList.
   * @param variable
   */
  set variable(variable) {
    if (variable === this._variable) {
      return;
    }
    this._variable = variable;
    this._operator = "";
    this._value = false;
  }
  get variable() {
    return this._variable;
  }
  set value(variableValue) {
    this._value = variableValue;
  }
  get value() {
    return this._value;
  }
  validate() {
    if (this._variableList.length === 0) {
      return {
        isValid: false,
        message: "Has no variableList to check dto against."
      };
    }
    if (!this._variable) {
      return {
        isValid: false,
        message: "Variable has not been initialized from variableList."
      };
    }
    if (!this._operator) {
      return { isValid: false, message: "Operator has not been initialized" };
    }
    if (!this._value) {
      return {
        isValid: false,
        message: "Value (BuilderVariableOption) is not initialized"
      };
    }
    return { isValid: true };
  }
  findVariableInUniverse(variableId) {
    const v = this._variableList.find((v2) => v2.varId === variableId);
    return v ?? false;
  }
  set operator(operator) {
    if (BuilderOperator.is(operator)) {
      this._operator = operator;
    } else {
      this._operator = "";
    }
  }
  get operator() {
    return this._operator;
  }
  constructor(dto, variables) {
    super(dto);
    this.initialDto = dto;
    this.name = dto.name;
    this._setVariableList(variables);
  }
  get variableSelectItemsInUniverse() {
    return this._variableList.map(RuleVariableSelectItem.create);
  }
  get operatorsSelectItems() {
    return this._variable ? _BuilderCondition.NUMBER_OPERATORS : [];
  }
  get selectValueItems() {
    if (!this._variable) {
      return [];
    }
    const opt = this._variable.options.map(RuleOptionSelectItem.create);
    return opt;
  }
  clone() {
    return this.toJson();
  }
  _setVariableList(variables) {
    this._variableList = variables;
    const v = this._variableList.find((v2) => v2.varId === this.originalDto.variableId);
    if (!v) {
      this._variable = false;
      this._operator = "";
      this._value = false;
      return false;
    }
    this._variable = v;
    const op = this.originalDto.operator;
    if (!BuilderOperator.is(op)) {
      return false;
    }
    this._operator = op;
    const maybeOption = v.options.find((op2) => op2.value === this.originalDto.value);
    if (!maybeOption) {
      return false;
    }
    this._value = maybeOption;
    return true;
  }
  toJson() {
    const name = this.name;
    const variableId = this._variable ? this._variable.varId : "";
    const operator = this._operator ? this._operator : "";
    const value = this._value ? this._value.value : "";
    return {
      kind: "condition",
      name,
      operator,
      variableId,
      value
    };
  }
};

// src/rulebuilder/condition/Builder-condition-group.ts
var ConditionGroupType = {
  all: true,
  any: true,
  count: true,
  range: true
};
var BuilderConditionGroup = class _BuilderConditionGroup extends BuilderObject {
  static isConditionGroupType = (value) => {
    if (typeof value !== "string") {
      return false;
    }
    const validValues = Object.keys(ConditionGroupType);
    return validValues.includes(value);
  };
  objectType = "builder-condition-group";
  _type;
  name = "";
  _conditions;
  _variableList;
  static fromDto = (dto, variableList) => {
    return new _BuilderConditionGroup(dto, variableList);
  };
  constructor(dto, variableList) {
    super(dto);
    this.name = dto.name;
    this._type = dto.type;
    const conditionList = Array.isArray(dto.conditions) ? dto.conditions : [];
    this._conditions = conditionList.map((dto2) => BuilderCondition.fromDto(dto2, variableList));
    this._variableList = variableList;
  }
  get conditions() {
    return this._conditions;
  }
  get conditionCount() {
    return this._conditions.length;
  }
  addCondition() {
    const newConditions = BuilderCondition.create(this._variableList);
    this._conditions.push(newConditions);
    return newConditions;
  }
  removeCondition(condition) {
    const index = this._conditions.indexOf(condition);
    if (index < 0) {
      return false;
    }
    this._conditions.splice(index, 1);
    return true;
  }
  clone() {
    return this.toJson();
  }
  toJson() {
    const conditions = [...this._conditions.map((c) => c.toJson())];
    return {
      name: this.name,
      conditions,
      type: this._type,
      kind: "condition-group"
    };
  }
  get type() {
    return this._type;
  }
  set type(conditionGroupType) {
    if (_BuilderConditionGroup.isConditionGroupType(conditionGroupType)) {
      this._type = conditionGroupType;
    }
  }
};

// src/rulebuilder/multi-select-item.ts
var MultiSelectItem = class {
  constructor(data, isSelected) {
    this.data = data;
    this._isSelectedInitially = isSelected;
    this.isSelected = isSelected;
    this._searchString = this.getSearchString();
    this._toolTip = this.getTooltip();
    this._selectLabel = this.getSelectLabel();
  }
  _isSelectedInitially;
  _selectLabel;
  _toolTip;
  _searchString;
  isSelected;
  get selectLabel() {
    return this._selectLabel;
  }
  get tooltip() {
    return this._toolTip;
  }
  get searchString() {
    return this._searchString;
  }
};
var ExcludeByTagSelectItem = class _ExcludeByTagSelectItem extends MultiSelectItem {
  static create = (tagData, isSelected) => {
    return new _ExcludeByTagSelectItem(tagData, isSelected);
  };
  constructor(data, isSelected) {
    super(data, isSelected);
  }
  getSearchString() {
    return this.data.tag;
  }
  getSelectLabel() {
    return this.data.tag + " (" + this.data.pageCount + ")";
  }
  getTooltip() {
    return this.data.tag + "  (used in " + this.data.pageCount + " pages)";
  }
};
var ExcludeByPageIdSelectItem = class _ExcludeByPageIdSelectItem extends MultiSelectItem {
  static create = (ruleActionPage, isSelected) => {
    return new _ExcludeByPageIdSelectItem(ruleActionPage, isSelected);
  };
  constructor(data, isSelected) {
    super(data, isSelected);
  }
  getSearchString() {
    return this.data.pageId + this.data.mainText;
  }
  getSelectLabel() {
    return this.data.pageId + " (" + this.data.pageNumber + ")";
  }
  getTooltip() {
    return this.data.mainText;
  }
};

// src/rulebuilder/tag-action-manager.ts
var TagActionManager = class {
  constructor(validOptions, initialSelection) {
    this.validOptions = validOptions;
    this.initialSelection = initialSelection;
    this._initialSelection = /* @__PURE__ */ new Set([...initialSelection]);
    this.selectItems = validOptions.map((opt) => {
      const isSelected = this._initialSelection.has(opt.tag);
      return ExcludeByTagSelectItem.create(opt, isSelected);
    });
  }
  _initialSelection;
  selectItems;
  getCurrentSelection() {
    const selected = this.selectItems.filter((item) => item.isSelected).map((itm) => itm.data.tag);
    return selected;
  }
};

// src/rulebuilder/page-action-manager.ts
var PageActionManager = class {
  constructor(validOptions, initialSelection) {
    this.validOptions = validOptions;
    this.initialSelection = initialSelection;
    this._initialSelection = /* @__PURE__ */ new Set([...initialSelection]);
    this.selectItems = validOptions.map((opt) => {
      const isSelected = this._initialSelection.has(opt.pageId);
      return ExcludeByPageIdSelectItem.create(opt, isSelected);
    });
  }
  _initialSelection;
  selectItems;
  getCurrentSelection() {
    const selected = this.selectItems.filter((item) => item.isSelected).map((itm) => itm.data.pageId);
    return selected;
  }
};

// src/rulebuilder/jump-to-action-manager.ts
var JumpToActionManager = class {
  constructor(validOptions, initialSelection) {
    this.validOptions = validOptions;
    this.initialSelection = initialSelection;
    this.options = validOptions.map(JumpToPageSelectItem.create);
    this._selected = this.findSelected(initialSelection);
  }
  options;
  _selected;
  get selected() {
    return this._selected;
  }
  set selected(selected) {
    this._selected = this.findSelected(selected);
  }
  getSelectedPageId() {
    return this._selected ? this._selected.data.pageId : false;
  }
  findSelected(value) {
    if (!value)
      return false;
    if (value instanceof JumpToPageSelectItem) {
      return this.options.find((v) => v === value) || false;
    }
    if (typeof value === "string") {
      return this.options.find((v) => v.data.pageId === value) || false;
    }
    return false;
  }
};

// src/rulebuilder/Builder-rule.ts
var BuilderRule = class _BuilderRule extends BuilderObject {
  constructor(dto, _ruleInput) {
    super(dto);
    this.dto = dto;
    this._ruleInput = _ruleInput;
    const conditionInput = this._ruleInput.getConditionInput();
    this.name = dto.name ?? "";
    this._type = dto.type ?? "any";
    this._conditions = dto.conditions.reduce((acc, curr) => {
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
    this._pageActionManager = new PageActionManager(_ruleInput.excludeByPageIdActions, dto.excludePages);
    this._tagActionManager = new TagActionManager(_ruleInput.excludeByTagActions, dto.excludeTags);
    this.jumpToActionManager = new JumpToActionManager(_ruleInput.jumpToPageActions, dto.jumpToPage);
  }
  objectType = "builder-rule";
  _type = "all";
  name = "Rule name";
  // public countNumber = 1;
  _conditions = [];
  _tagActionManager;
  _pageActionManager;
  jumpToActionManager;
  static fromDto = (dto, input) => {
    return new _BuilderRule(dto, input);
  };
  get conditions() {
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
  set type(type) {
    if (BuilderConditionGroup.isConditionGroupType(type)) {
      this._type = type;
    }
  }
  get type() {
    return this._type;
  }
  deleteCondition(condition) {
    const index = this._conditions.indexOf(condition);
    if (index < 0) {
      return false;
    }
    this._conditions.splice(index, 1);
    return true;
  }
  addCondition() {
    const condition = BuilderCondition.create(this._ruleInput.getConditionInput());
    this._conditions.push(condition);
    return condition;
  }
  addConditionGroup() {
    const dto = {
      kind: "condition-group",
      name: "",
      type: "all",
      conditions: []
    };
    const newGroup = BuilderConditionGroup.fromDto(dto, this._ruleInput.questionVars);
    this._conditions.push(newGroup);
    return newGroup;
  }
  clone() {
    return this.toJson();
  }
  toJson() {
    const conditions = this._conditions.map((c) => c.toJson());
    const excludePages = this._pageActionManager.getCurrentSelection();
    const excludeTags = this._tagActionManager.getCurrentSelection();
    const jumpToPage = this.jumpToActionManager.getSelectedPageId();
    const dto = {
      type: this._type,
      name: this.name,
      conditions,
      excludePages,
      jumpToPage,
      excludeTags
    };
    return dto;
  }
};

// src/theme/AbstractThemeCompiler.ts
var AbstractThemeCompiler = class {
  constructor(theme) {
    this.theme = theme;
  }
};

// src/theme/standard-props.ts
import { BooleanStateProperty } from "@media-quest/engine";
var DStateProps;
((DStateProps2) => {
  DStateProps2.mediaBlockedBySequence = new BooleanStateProperty(
    "media-blocked-by-autoplay-sequence",
    false,
    "Should be true if the page is in a autoplay-sequence. The autoplay-sequence will always block other media."
  );
  DStateProps2.inputBlockingBySequence = new BooleanStateProperty("input-blocked-by-autoplay-sequence", false, "");
  DStateProps2.mediaBlockedByAudio = new BooleanStateProperty("media-blocked-by-audio", false, "");
  DStateProps2.inputBlockedByAudio = new BooleanStateProperty("input-blocked-by-audio", false, "");
  DStateProps2.mediaBlockedByVideo = new BooleanStateProperty("media-blocked-by-video", false, "");
  DStateProps2.inputBlockedByVideo = new BooleanStateProperty(
    "input-blocked-by-video",
    false,
    "Should be true if a video is playing, and this video is suppose to block user-input."
  );
  DStateProps2.userPausedVideo = new BooleanStateProperty(
    "user-paused-video",
    false,
    "Should be true if user paused the video by pressing the pause-button."
  );
  DStateProps2.videoIsPlaying = new BooleanStateProperty(
    "video-is-playing",
    false,
    "Should be true if any video is playing on the page."
  );
  DStateProps2.audioIsPlaying = new BooleanStateProperty(
    "audio-is-playing",
    false,
    "Should be tru if any audio is playing on page"
  );
  const _props = {
    inputBlockedByAudio: DStateProps2.inputBlockedByAudio,
    mediaBlockedByAudio: DStateProps2.mediaBlockedByAudio,
    inputBlockingBySequence: DStateProps2.inputBlockingBySequence,
    mediaBlockedBySequence: DStateProps2.mediaBlockedBySequence,
    inputBlockedByVideo: DStateProps2.inputBlockedByVideo,
    mediaBlockedByVideo: DStateProps2.mediaBlockedByVideo,
    userPausedVideo: DStateProps2.userPausedVideo,
    videoIsPlaying: DStateProps2.videoIsPlaying
  };
  const disableAudioIconQuery = {
    name: "disable-Audio",
    condition: {
      kind: "complex-condition",
      name: "audio-controls-are-blocked",
      some: [
        DStateProps2.mediaBlockedBySequence.getIsTrueCondition(),
        DStateProps2.mediaBlockedByAudio.getIsTrueCondition(),
        DStateProps2.mediaBlockedByVideo.getIsTrueCondition()
      ],
      all: []
    }
  };
  const hideVideoPlayQuery = {
    name: "hide-video-play-button",
    condition: {
      kind: "complex-condition",
      name: "video-is-playing-condition",
      all: [DStateProps2.videoIsPlaying.getIsTrueCondition()],
      some: []
    }
  };
  const hideVideoPauseQuery = {
    name: "hide-video-pause-button",
    condition: {
      kind: "complex-condition",
      name: "video-is-not-playing-condition",
      all: [DStateProps2.videoIsPlaying.getIsFalseCondition()],
      some: []
    }
  };
  const disableVideoPlayQuery = {
    name: "disable-video",
    condition: {
      kind: "complex-condition",
      name: "video-play shall be disabled",
      all: [DStateProps2.userPausedVideo.getIsFalseCondition()],
      some: [
        DStateProps2.mediaBlockedBySequence.getIsTrueCondition(),
        DStateProps2.mediaBlockedByAudio.getIsTrueCondition(),
        DStateProps2.mediaBlockedByVideo.getIsTrueCondition(),
        DStateProps2.audioIsPlaying.getIsTrueCondition()
      ]
    }
  };
  const disableUserInputQuery = {
    name: "disable-user-input",
    condition: {
      kind: "complex-condition",
      name: "User input shall be disabled (Response-buttons, FormControls...)",
      all: [],
      some: [
        DStateProps2.inputBlockedByAudio.getIsTrueCondition(),
        DStateProps2.inputBlockedByVideo.getIsTrueCondition(),
        DStateProps2.inputBlockingBySequence.getIsTrueCondition()
      ]
    }
  };
  DStateProps2._Queries = {
    disableAudioIconQuery,
    disableVideoPlayQuery,
    disableUserInputQuery,
    hideVideoPauseQuery,
    hideVideoPlayQuery
  };
  DStateProps2.allDefaultProperties = Object.values(_props);
  DStateProps2.allDefaultQueries = Object.values(DStateProps2._Queries);
})(DStateProps || (DStateProps = {}));

// src/theme/theme-utils.ts
var ThemeUtils;
((ThemeUtils2) => {
  ThemeUtils2.disableClickCommands = (elementId, styleChanges) => {
    return [
      {
        kind: "ELEMENT_DISABLE_CLICK_COMMAND",
        target: "ELEMENT",
        targetId: elementId,
        payload: {}
      },
      {
        kind: "ELEMENT_STYLE_COMMAND",
        target: "ELEMENT",
        targetId: elementId,
        payload: { changes: styleChanges }
      }
    ];
  };
  ThemeUtils2.enableClickCommands = (elementId, styleChanges) => {
    return [
      {
        kind: "ELEMENT_ENABLE_CLICK_COMMAND",
        target: "ELEMENT",
        targetId: elementId,
        payload: {}
      },
      {
        kind: "ELEMENT_STYLE_COMMAND",
        target: "ELEMENT",
        targetId: elementId,
        payload: { changes: styleChanges }
      }
    ];
  };
  ThemeUtils2.hideCommand = (elementId) => {
    const hideCommand2 = {
      kind: "ELEMENT_STYLE_COMMAND",
      target: "ELEMENT",
      targetId: elementId,
      payload: { changes: { visibility: "hidden" } }
    };
    return hideCommand2;
  };
  ThemeUtils2.showCommand = (elementId) => {
    const showCommand2 = {
      kind: "ELEMENT_STYLE_COMMAND",
      target: "ELEMENT",
      targetId: elementId,
      payload: { changes: { visibility: "visible" } }
    };
    return showCommand2;
  };
  ThemeUtils2.spaceEvenlyX = (items, options = {
    startAt: 0,
    endAt: 100,
    defaultItemWidth: 5
  }) => {
    const startAt = options?.startAt ?? 0;
    const endAt = options?.endAt ?? 100;
    const range = Math.abs(endAt - startAt);
    if (items.length === 0) {
      return [];
    }
    const marginCount = items.length + 1;
    const defaultWidth = options.defaultItemWidth ?? 150 / marginCount;
    let totalWidthOfElements = items.reduce((prev, curr) => {
      const w = curr.style.w ?? defaultWidth;
      return prev + w;
    }, 0);
    let cursor = startAt;
    const rest = Math.max(range - totalWidthOfElements, 0);
    const margin = rest / marginCount;
    items.forEach((item) => {
      cursor = cursor + margin;
      const w = item.style.w ?? defaultWidth;
      const x = cursor;
      cursor = cursor + w;
      item.style.w = w;
      item.style.x = x;
    });
    return items;
  };
  ThemeUtils2.centerY = () => ({
    y: 50,
    transform: "translate(0%, 50%)"
  });
  ThemeUtils2.centerX = () => ({
    x: 50,
    transform: "translate(-50%, 0%)"
  });
  ThemeUtils2.centerXY = () => ({
    x: 50,
    y: 50,
    transform: "translate(-50%, 50%)"
  });
})(ThemeUtils || (ThemeUtils = {}));

// src/theme/default-theme-compiler.ts
import {
  DUtil as DUtil3
} from "@media-quest/engine";
var U3 = DUtil3;
var generateElementId = () => U3.randomString(32);
var DefaultThemeCompiler = class extends AbstractThemeCompiler {
  name = "Ispe default theme.";
  constructor() {
    super(DefaultTheme);
  }
  compile(source) {
    const pages = source.pages.map((p) => this.compilePage(p, source.id));
    const dto = {
      backgroundColor: source.backgroundColor,
      baseHeight: source.baseHeight,
      baseWidth: source.baseWidth,
      id: source.id,
      pageSequences: [],
      pages,
      predefinedFacts: [],
      prefix: source.prefix,
      rules: [],
      stateFromEvent: [
        {
          onEvent: "VIDEO_ENDED_EVENT",
          thenExecute: [
            DStateProps.userPausedVideo.getSetFalseCommand(),
            DStateProps.mediaBlockedByVideo.getSetFalseCommand(),
            DStateProps.videoIsPlaying.getSetFalseCommand()
          ]
        },
        {
          onEvent: "VIDEO_PAUSED_EVENT",
          thenExecute: [
            DStateProps.videoIsPlaying.getSetFalseCommand(),
            DStateProps.mediaBlockedByVideo.getSetFalseCommand()
          ]
        },
        {
          onEvent: "VIDEO_PLAY_EVENT",
          thenExecute: [
            DStateProps.videoIsPlaying.getSetTrueCommand(),
            DStateProps.userPausedVideo.getSetFalseCommand()
          ]
        },
        {
          onEvent: "AUDIO_PLAY_EVENT",
          thenExecute: [
            DStateProps.audioIsPlaying.getSetTrueCommand(),
            DStateProps.mediaBlockedByAudio.getSetTrueCommand()
          ]
        },
        {
          onEvent: "AUDIO_ENDED_EVENT",
          thenExecute: [
            DStateProps.audioIsPlaying.getSetFalseCommand(),
            DStateProps.mediaBlockedByAudio.getSetFalseCommand()
          ]
        },
        {
          onEvent: "AUDIO_PAUSED_EVENT",
          thenExecute: [
            DStateProps.audioIsPlaying.getSetFalseCommand(),
            DStateProps.mediaBlockedByAudio.getSetFalseCommand()
          ]
        }
      ],
      stateProps: DStateProps.allDefaultProperties.map((def) => def.propDefinition),
      stateQueries: DStateProps.allDefaultQueries
    };
    return dto;
  }
  compilePage(page, _moduleId) {
    const { nextButton, mainText, id, mainMedia, _type } = page;
    const elements = [];
    const audioResourcesDto = [];
    const videoResources = [];
    let mainVideo = false;
    let mainTextAudio = false;
    if (page.mainText.audioFile) {
      const res = this.compileMainTextAudio(page.mainText.audioFile);
      elements.push(...res.elements);
      audioResourcesDto.push(res.audioDto);
      mainTextAudio = res.audioDto;
    }
    if (_type === "question") {
      const { buttons, question } = this.compileQuestion(id, page);
      elements.push(...buttons, question);
    }
    if (_type === "info-page") {
      const infoText = mainText.text;
      const nextBtnElement = this.compileButton(id, nextButton, {
        kind: "next-button"
      });
      const element = {
        text: infoText,
        _tag: "p",
        id: generateElementId(),
        style: DefaultTheme.mainText.withMedia.text.css
      };
      elements.push(element);
      elements.push(nextBtnElement);
    }
    if (mainMedia && mainMedia.kind === "main-image") {
      const mainImageElement = this.compileImage(mainMedia);
      elements.push(mainImageElement);
    }
    if (mainMedia && mainMedia.kind === "main-video") {
      const videoOutput = this.compileVideo(mainMedia);
      mainVideo = videoOutput.videoDto;
      elements.push(...videoOutput.elements);
      videoResources.push(videoOutput.videoDto);
    }
    const mainVideoId = mainVideo ? mainVideo.id : void 0;
    const autoPlaySequence = {
      blockUserInput: true,
      id: "1",
      items: [],
      startCommands: [
        DStateProps.mediaBlockedBySequence.getSetTrueCommand(),
        DStateProps.inputBlockingBySequence.getSetTrueCommand()
      ],
      endCommands: [
        DStateProps.mediaBlockedBySequence.getSetFalseCommand(),
        DStateProps.inputBlockingBySequence.getSetFalseCommand()
      ]
    };
    if (mainVideo && page.mainMedia && page.mainMedia.kind === "main-video" && page.mainMedia.mode === "autoplay") {
      autoPlaySequence.items.push({
        kind: "autoplay-video",
        videoId: mainVideo.id
      });
    }
    if (mainTextAudio && page.mainText.autoplay) {
      autoPlaySequence.items.push({
        kind: "autoplay-audio",
        audioId: mainTextAudio.id
      });
    }
    const pageDto = {
      audio: audioResourcesDto,
      autoPlaySequence,
      backgroundColor: "red",
      elements,
      id,
      mainVideoId,
      tags: [],
      video: videoResources
    };
    return pageDto;
  }
  compileImage(image) {
    const img = {
      _tag: "img",
      id: image.file.id,
      style: this.theme.image.style,
      url: image.file.downloadUrl
    };
    return img;
  }
  compileMainTextAudio(audioFile) {
    const t = this.theme.mainText;
    const audioId = audioFile.id;
    const iconUrl = "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fvolume_up-24px.svg?alt=media&token=551bd0a6-a515-4f87-a245-da433f4833f9";
    const buttonId = U3.randomString(30);
    const playMainTextAudio = {
      _tag: "img",
      id: buttonId,
      url: iconUrl,
      style: { ...t.withMedia.audio.css },
      onClick: [
        {
          kind: "AUDIO_PLAY_COMMAND",
          target: "AUDIO",
          targetId: audioId,
          payload: { volume: 1 }
        }
      ],
      onStateChange: [
        {
          queryName: DStateProps._Queries.disableAudioIconQuery.name,
          whenTrue: [...ThemeUtils.disableClickCommands(buttonId, t.withMedia.audio.cssDisabled)],
          whenFalse: [...ThemeUtils.enableClickCommands(buttonId, t.withMedia.audio.cssEnabled)]
        }
      ]
    };
    const audioDto = {
      _tag: "audio",
      // eventHandlers: [],
      id: audioFile.id,
      url: audioFile.downloadUrl
    };
    return { audioDto, elements: [playMainTextAudio] };
  }
  compileVideo(video) {
    const t = this.theme.videoPlayer;
    const videoId = video.file.id;
    const playButtonId = "play-btn-for" + videoId;
    const pauseButtonId = "pause-btn-for" + videoId;
    const elements = [];
    const videoDto = {
      _tag: "video",
      id: video.file.id,
      style: t.videoElement.css,
      url: video.file.downloadUrl
    };
    const playBtn = {
      id: playButtonId,
      _tag: "img",
      url: t.playButton.iconUrl,
      style: { ...t.playButton.css, ...t.playButton.cssEnabled },
      onClick: [
        {
          kind: "VIDEO_PLAY_COMMAND",
          target: "VIDEO",
          targetId: videoId,
          payload: {}
        },
        // TODO Check if this video shall block other media first?
        DStateProps.mediaBlockedByVideo.getSetTrueCommand(),
        DStateProps.userPausedVideo.getSetFalseCommand()
      ],
      onStateChange: [
        {
          queryName: DStateProps._Queries.disableVideoPlayQuery.name,
          whenTrue: [...ThemeUtils.disableClickCommands(playButtonId, t.playButton.cssDisabled)],
          whenFalse: [...ThemeUtils.enableClickCommands(playButtonId, t.playButton.cssEnabled)]
        },
        {
          queryName: DStateProps._Queries.hideVideoPlayQuery.name,
          whenTrue: [ThemeUtils.hideCommand(playButtonId)],
          whenFalse: [ThemeUtils.showCommand(playButtonId)]
        }
      ]
    };
    const pauseBtn = {
      id: pauseButtonId,
      _tag: "img",
      style: {
        ...t.pauseButton.css,
        visibility: "hidden",
        ...t.pauseButton.cssEnabled
      },
      url: t.pauseButton.iconUrl,
      onClick: [
        {
          kind: "VIDEO_PAUSE_COMMAND",
          target: "VIDEO",
          targetId: videoId,
          payload: {}
        },
        DStateProps.mediaBlockedByVideo.getSetFalseCommand(),
        DStateProps.userPausedVideo.getSetTrueCommand()
      ],
      onStateChange: [
        {
          queryName: DStateProps._Queries.hideVideoPauseQuery.name,
          whenTrue: [ThemeUtils.hideCommand(pauseButtonId)],
          whenFalse: [ThemeUtils.showCommand(pauseButtonId)]
        }
      ]
    };
    elements.push(playBtn);
    elements.push(pauseBtn);
    return { videoDto, elements };
  }
  compileQuestion(pageId, page) {
    const q = page.defaultQuestion;
    const text = page.mainText.text;
    const question = {
      _tag: "p",
      text,
      eventHandlers: [],
      id: U3.randomString(30),
      onClick: [],
      onStateChange: [],
      style: DefaultTheme.mainText.withMedia.text.css
    };
    const buttons = q.options.map((o) => {
      const btns = this.compileButton(pageId, o, {
        kind: "response-button",
        questionId: ""
      });
      return btns;
    });
    ThemeUtils.spaceEvenlyX(buttons);
    return { question, buttons };
  }
  compileButton(pageId, buttonDto, options) {
    const factsCollected = [];
    const { id, value, label } = buttonDto;
    const { div, text1 } = DefaultTheme.responseButtons;
    if (options.kind === "response-button") {
      const fact = {
        kind: "numeric-fact",
        label,
        value,
        referenceId: options.questionId,
        referenceLabel: "QuestionId: " + options.questionId
      };
      factsCollected.push(fact);
    }
    const onClickHandler = {
      kind: "ENGINE_LEAVE_PAGE_COMMAND",
      target: "ENGINE",
      targetId: "ENGINE",
      payload: {
        pageId,
        factsCollected
      }
    };
    const btn = {
      id,
      _tag: "div",
      children: [
        {
          _tag: "p",
          id: U3.randomString(30),
          text: label,
          style: text1
        }
      ],
      onStateChange: [
        {
          queryName: DStateProps._Queries.disableUserInputQuery.name,
          whenFalse: [...ThemeUtils.enableClickCommands(id, div.cssEnabled)],
          whenTrue: [...ThemeUtils.disableClickCommands(id, div.cssDisabled)]
        }
      ],
      style: { ...div.css, ...div.cssEnabled },
      onClick: [onClickHandler]
    };
    if (options.kind === "next-button") {
      btn.style.x = 50;
      btn.style.y = 8;
      btn.style.transform = "translate(-50%, 0%)";
    }
    return btn;
  }
};

// src/Builder-schema.ts
import { DUtil as DUtil4 } from "@media-quest/engine";
var U4 = DUtil4;
var BuilderSchema = class _BuilderSchema {
  constructor(id, name, prefix) {
    this.id = id;
    this.name = name;
    this.prefix = prefix;
  }
  baseHeight = 1300;
  baseWidth = 1024;
  backgroundColor = "#000000";
  pages = [];
  mainImage = false;
  _rules = [];
  get rules() {
    return [...this._rules];
  }
  _tagCollection = TagCollection.create();
  get tags() {
    return [...this._tagCollection];
  }
  static create(id, name, prefix) {
    return new _BuilderSchema(id, name, prefix);
  }
  static fromJson(dto) {
    const schema = new _BuilderSchema(dto.id, dto.name, dto.prefix);
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
  toJson() {
    const pages = this.pages.map((p) => p.toJson());
    const tags = this._tagCollection.toJson();
    const rules = this._rules.map((rule) => rule.toJson());
    const dto = {
      backgroundColor: this.backgroundColor,
      baseHeight: this.baseHeight,
      baseWidth: this.baseWidth,
      id: this.id,
      name: this.name,
      pages,
      rules,
      tags,
      mainImage: this.mainImage,
      prefix: this.prefix
    };
    return dto;
  }
  addPage(type, atIndex = -1) {
    const newPage = BuilderPage.create(type, "");
    if (atIndex >= 0 && atIndex < this.pages.length) {
      this.pages.splice(atIndex, 0, newPage);
    } else {
      this.pages.push(newPage);
    }
    return newPage;
  }
  insertPage(page, atIndex) {
    return this.insertPageAtIndex(page, atIndex);
  }
  insertPageAtIndex(page, atIndex) {
    const isValidIndex = U4.isInRange(0, this.pages.length - 1);
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
        excludePages: []
      },
      input
    );
    this._rules.push(rule);
  }
  deleteRule(rule) {
    this._rules = this._rules.filter((r) => r !== rule);
  }
  movePage(page, toIndex) {
    const index = this.pages.indexOf(page);
    if (index < 0) {
      return false;
    }
    const isValidIndex = U4.isInRange(0, this.pages.length - 1);
    if (!isValidIndex(toIndex)) {
      return false;
    }
    this.pages.splice(index, 1);
    this.pages.splice(toIndex, 0, page);
    return true;
  }
  deletePage(page) {
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
  getRuleInput() {
    const qVars = [];
    const cVars = [];
    const pageIdActions = [];
    const tagActions = this.tags.map((t) => {
      const tag = t.tagText;
      const pageCount = this.pages.reduce((count, curr) => {
        return curr.tags.includes(tag) ? count + 1 : count;
      }, 0);
      const excludeByTagDto = {
        kind: "exclude-by-tag",
        pageCount,
        tag,
        description: t.tagDescription
      };
      return excludeByTagDto;
    });
    const jumpActions = [];
    const prefix = "";
    this.pages.forEach((page, index) => {
      const pageVariables = page.getQuestionVariables(prefix, index);
      qVars.push(...pageVariables);
      const pageId = page.prefix;
      const mainText = page.mainText.text;
      const jumpAction = {
        kind: "jump-to-page",
        pageId,
        pageNumber: index,
        mainText: page.mainText.text
      };
      const excludePageAction = {
        kind: "exclude-by-pageId",
        pageId,
        pageNumber: index,
        mainText
      };
      jumpActions.push(jumpAction);
      pageIdActions.push(excludePageAction);
    });
    const ruleInput = new RuleInput(qVars, cVars, pageIdActions, tagActions, jumpActions);
    return ruleInput;
  }
  deleteTags(tags) {
    this._tagCollection.deleteAll(tags);
  }
  addTag(builderTag) {
    this._tagCollection.add(builderTag);
  }
  // getHash(): SchemaHash {
  //     const md5 = MD5(this.toJson());
  //     return
  // }
  // hasChanged(hash: SchemaHash): boolean {
  //     return hash !== this.getHash();
  // }
  getQuestionVariables(withModulePrefix = false) {
    const prefix = withModulePrefix ? this.prefix : "";
    const all = this.pages.map((page, index) => {
      return page.getQuestionVariables(prefix, index);
    }).flat(1);
    return all;
  }
  compile() {
    const moduleDto = this.toJson();
    const imp = new DefaultThemeCompiler();
    const schema = imp.compile(moduleDto);
    return { codebook: {}, schema, schemaConfig: {} };
  }
};

// src/Builder-text.ts
var BuilderText = class _BuilderText extends BuilderObject {
  objectType = "builder-text";
  id;
  text = "";
  name = "";
  translateRequired = false;
  // audio: {id: B}
  constructor(dto) {
    super(dto);
    this.id = dto.id;
    this.translateRequired = dto.translationRequired;
    this.name = dto.name;
    this.text = dto.text;
  }
  static create(name) {
    const id = BuilderObjectId.textId();
    const dto = {
      id,
      name,
      text: "",
      translationRequired: false
    };
    const instance = new _BuilderText(dto);
    return instance;
  }
  static fromJson(dto) {
    const instance = new _BuilderText(dto);
    return instance;
  }
  clone() {
    const newId = BuilderObjectId.textId();
    const dto = this.toJson();
    const withNewId = { ...dto, id: newId };
    return withNewId;
  }
  toJson() {
    const dto = {
      id: this.id,
      name: this.name,
      text: this.text,
      translationRequired: this.translateRequired
    };
    return dto;
  }
};
export {
  BuilderCondition,
  BuilderConditionGroup,
  BuilderMainText,
  BuilderOperator,
  BuilderOption,
  BuilderPage,
  BuilderQuestion,
  BuilderRule,
  BuilderSchema,
  BuilderTag,
  BuilderText,
  BuilderVariableOption,
  CustomVariable,
  ExcludeByPageIdSelectItem,
  ExcludeByTagSelectItem,
  JumpToActionManager,
  JumpToPageSelectItem,
  MultiSelectItem,
  OperatorSelectItem,
  PageActionManager,
  QuestionVariable,
  RuleInput,
  RuleOptionSelectItem,
  RuleVariableSelectItem,
  SingleSelectItem,
  TagActionManager,
  TagCollection
};
