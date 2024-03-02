import { ThemeCompiler } from "./ThemeCompiler";
import { BuilderSchema } from "../Builder-schema";
import type { BuilderPageDto } from "../page/Builder-page";
import { DefaultTheme } from "./Default-theme";
import type { BuilderMainImageDto } from "../BuilderMainImageDto";
import type { BuilderMainVideoDto } from "../BuilderMainVideoDto";
import {
  ButtonClickAction,
  DButtonDto,
  DDivDto,
  DelayTask,
  DElementDto,
  DImgDto,
  DTextDto,
  PageDto,
  PlayAudioTask,
  PlayVideoTask,
  PStyle,
  Rule,
  RuleActionPageQue,
  SchemaDto,
} from "@media-quest/engine";

import { AudioFile } from "../media-files";
import { BuilderRule } from "../rulebuilder";
import { IDefaultTheme } from "./IDefault-theme";
import { Theme2 } from "./theme2";
import { BuilderSchemaDto } from "../Builder-schema-dto";

export class DefaultThemeCompiler implements ThemeCompiler<IDefaultTheme> {
  readonly name = "Ispe default theme.";
  readonly defaultTheme = DefaultTheme;
  readonly theme2 = Theme2;
  currentTheme = Theme2;
  allThemes = [DefaultTheme, Theme2];
  private readonly TAG = "[ DEFAULT_THEME_COMPILER ]: ";

  setTheme(theme: IDefaultTheme) {
    this.currentTheme = theme;
  }

  constructor() {}

  private compileRules(source: BuilderSchemaDto): Rule<RuleActionPageQue, never>[] {
    const builderSchema = BuilderSchema.fromJson(source);
    const ruleInput = builderSchema.getRuleInput();
    const pageQueRules: Rule<RuleActionPageQue, never>[] = [];
    source.rules.forEach((rule) => {
      const engineRule = BuilderRule.fromDto(rule, ruleInput).toEngineRule();
      if (!Rule.isEmpty(engineRule)) {
        pageQueRules.push(engineRule);
      } else {
        console.log(this.TAG, "Throws away empty rule. " + rule.type + " " + rule.name);
      }
    });
    return pageQueRules;
  }

  compile(source: BuilderSchemaDto): SchemaDto {
    const t = this.currentTheme;
    const themeName = t.name;
    const schema = source.name;
    const tag = schema + "-" + themeName + " compile";
    const TAG = tag.toUpperCase();
    // console.group(TAG);
    const numberOfPages = source.pages.length;
    const pages = source.pages.map((p, index) => {
      return this.compilePage(p, index, numberOfPages, source.prefix);
    });

    let baseHeight = source.baseHeight;
    let baseWidth = source.baseWidth;
    let backgroundColor = source.backgroundColor;
    if (t.dimensions.baseHeight) {
      baseHeight = t.dimensions.baseHeight;
    }
    if (t.dimensions.baseWidth) {
      baseWidth = t.dimensions.baseWidth;
    }
    if (t.dimensions.baseWidth) {
      baseWidth = t.dimensions.baseWidth;
    }
    if (t.schemaBackgroundColor) {
      backgroundColor = t.schemaBackgroundColor;
    }

    const rules = this.compileRules(source);

    const dto: SchemaDto = {
      id: source.id,
      backgroundColor,
      baseHeight,
      baseWidth,
      pageSequences: [],
      pages,
      predefinedFacts: [],
      rules,
    };
    // console.groupEnd();
    return dto;
  }

  private compilePage(
    page: BuilderPageDto,
    pageIndex: number,
    totalNumberOfPages: number,
    modulePrefix: string,
  ): PageDto {
    const pageNumber = pageIndex + 1;
    const tags = page.tags ?? [];
    const { nextButton, mainText, id, mainMedia, _type, prefix } = page;
    const t = this.currentTheme;
    const hasMainMedia = !!mainMedia;
    const hasMainTextAudio = !!mainText.audioFile;

    const elements: DElementDto[] = [];
    let initialAudioTasks: Array<PlayAudioTask | DelayTask> = [];
    let initialVideoTaskList: Array<PlayVideoTask | DelayTask> = [];
    const newPage: PageDto = {
      background: "white",
      elements,
      id,
      prefix,
      initialTasks: [],
      tags: [...tags],
    };
    const bg = t.pageBackGround;
    if (bg) {
      const pageBackGround: DDivDto = {
        style: bg.style,
        _tag: "div",
        children: [],
      };
      elements.push(pageBackGround);
    }

    const bgArea1 = t.backGroundArea1;

    if (bgArea1) {
      const backgroundArea1: DDivDto = {
        style: bgArea1.style,
        _tag: "div",
        children: [],
      };
      elements.push(backgroundArea1);
    }

    if (t.progressBar) {
      // console.log("ADDED PROGRESS.");
      const progressInPercent = pageNumber / totalNumberOfPages;
      // const a =
      const baseStyles: PStyle = {
        bottom: t.progressBar.bottom,
        left: t.progressBar.left,
        height: t.progressBar.height,
        width: t.progressBar.width,
      };
      const progressBackGround: DDivDto = {
        style: {
          ...baseStyles,
          ...t.progressBar.backgroundStyles,
        },
        _tag: "div",
        children: [],
      };

      const currentProgress = t.progressBar.width * progressInPercent;
      const progressIndicator: DDivDto = {
        style: { ...baseStyles, ...t.progressBar.progressStyles, w: currentProgress },
        _tag: "div",
        children: [],
      };
      const pText = t.progressBar.text;

      elements.push(progressBackGround);
      elements.push(progressIndicator);
      if (pText) {
        const progressText: DTextDto = {
          _tag: "p",
          innerText: "side " + pageNumber + " av " + totalNumberOfPages,
          style: pText.style,
        };
        elements.push(progressText);
      }
    }

    if (page.mainText.audioFile) {
      const autoPlay = page.mainText.autoplay;
      const autoPlayDelay = page.mainText.autoplayDelay;
      const res = this.compileMainTextAudio(
        page.mainText.audioFile,
        autoPlay,
        autoPlayDelay,
        hasMainMedia,
      );
      // console.log(page.mainText.text);
      initialAudioTasks = [...res.initialTasks];
      newPage.elements.push(...res.components);
    }

    if (_type === "question") {
      const variableId = modulePrefix + "_" + page.prefix;
      const qRes = this.compileQuestion(id, page, variableId, hasMainMedia);
      newPage.elements.push(qRes.buttonBar, qRes.question);

      // newPage.elements.push(question);
      // console.log(question);
      // elements.push(...buttons, question);
    }

    if (_type === "info-page") {
      const infoText = mainText.text;
      const nextButtonBar = this.compileButtonBar([
        this.compileButton(nextButton, { kind: "next-button" }),
      ]);
      const infoTextElement = this.compileMainText(infoText, hasMainTextAudio, hasMainMedia);

      // const textBase =
      newPage.elements.push(infoTextElement, nextButtonBar);
      // newPage.components.push(nextButtonComponent);
    }
    if (mainMedia && mainMedia.kind === "main-image") {
      const mainImageElement = this.compileImage(mainMedia);
      newPage.elements.push(mainImageElement);
    }

    if (mainMedia && mainMedia.kind === "main-video") {
      const videoOutput = this.compileVideo(mainMedia);
      // newPage.videoPlayer?.playUrl
      newPage.videoPlayer = videoOutput.videoPlayer;
      newPage.elements.push(...videoOutput.components);
      initialVideoTaskList = [...videoOutput.autoPlayTasks];
    }

    // ADDING INITIAL TASKS IN CORRECT ORDER
    newPage.initialTasks.push(...initialVideoTaskList);
    newPage.initialTasks.push(...initialAudioTasks);
    const clone = JSON.parse(JSON.stringify(newPage)) as PageDto;
    return clone;
  }

  private compileImage(image: BuilderMainImageDto) {
    const img: DImgDto = {
      _tag: "img",
      style: this.currentTheme.image.style,
      url: image.file.downloadUrl,
    };
    return img;
  }

  private compileMainText(text: string, hasAudio: boolean, hasMainMedia: boolean): DTextDto {
    const t = this.currentTheme;
    const { base, hasMediaNotAudio, notMediaHasAudio, notMediaNotAudio, hasMediaHasAudio } =
      t.mainText;
    let style = base.text;
    if (hasMainMedia && hasAudio) style = { ...style, ...hasMediaHasAudio.text };
    if (!hasMainMedia && hasAudio) style = { ...style, ...notMediaHasAudio.text };
    if (hasMainMedia && !hasAudio) style = { ...style, ...hasMediaNotAudio.text };
    if (!hasMainMedia && !hasAudio) style = { ...style, ...notMediaNotAudio.text };
    // console.log(style.textColor);
    return {
      _tag: "p",
      innerText: text,
      style,
    };
  }

  private compileMainTextAudio(
    audioFile: AudioFile,
    autoPlay: boolean,
    autoPlayDelay: number,
    hasMainMedia: boolean,
  ): {
    components: DElementDto[];
    initialTasks: Array<PlayAudioTask | DelayTask>;
  } {
    const t = this.currentTheme.mainText;
    const audioId = audioFile.id;
    const iconUrl = this.currentTheme.mainText.base.audio.iconUrl;
    const baseIconStyles = t.base.audio;
    const addedStyles = hasMainMedia ? t.hasMediaHasAudio.audio : t.notMediaHasAudio.audio;

    const audioIconStyle = { ...baseIconStyles.css, ...addedStyles };
    const task: PlayAudioTask = {
      audioId,
      blockAudio: false,
      blockFormInput: false,
      blockResponseButton: false,
      blockVideo: false,
      kind: "play-audio-task",
      priority: "replace-all",
      url: audioFile.downloadUrl,
    };

    const playMainTextAudio: DImgDto = {
      _tag: "img",
      url: iconUrl,
      style: { ...audioIconStyle },
      onClick: { kind: "play-audio", task },
    };

    let initialAudioTasks: Array<PlayAudioTask | DelayTask> = [];
    if (autoPlay) {
      const playAudioTask: PlayAudioTask = { ...task, priority: "follow-queue" };
      initialAudioTasks = [playAudioTask];
      if (autoPlayDelay > 0) {
        const delayTask: DelayTask = {
          kind: "delay-task",
          priority: "follow-queue",
          duration: autoPlayDelay,
          blockVideo: false,
          blockAudio: false,
          blockResponseButton: false,
          blockFormInput: false,
        };
        initialAudioTasks = [delayTask, playAudioTask];
      }
    }
    // const autoplayTask =

    return { components: [playMainTextAudio], initialTasks: [...initialAudioTasks] };
  }

  private compileVideo(video: BuilderMainVideoDto): {
    videoPlayer: PageDto["videoPlayer"];
    components: DElementDto[];
    autoPlayTasks: Array<PlayVideoTask | DelayTask>;
  } {
    const t = this.currentTheme.videoPlayer;
    const hasReplayButton = !!t.replayButton;

    const mode = video.mode;
    // const components: DElementDto[] = [];

    let autoPlayTasks: Array<PlayVideoTask | DelayTask> = [];

    let autoplayVideoTask: PlayVideoTask | false = false;
    let autoplayDelayTask: DelayTask | false = false;

    let buttonBar: DDivDto | false = false;
    let playButton: DImgDto | false = false;
    let playButtonText: DTextDto | false = false;
    let replayButton: DImgDto | false = false;
    let replayButtonText: DTextDto | false = false;
    let pauseButton: DImgDto | false = false;
    let pauseButtonText: DTextDto | false = false;
    let unmuteButton: DImgDto | false = false;
    let unmuteButtonText: DTextDto | false = false;
    let muteButton: DImgDto | false = false;
    let muteButtonText: DTextDto | false = false;

    const showWhenEnded: Partial<DElementDto> = {
      whenVideoEnded: { visibility: "visible" },
      whenVideoEndedAndMuted: { visibility: "visible" },
      whenVideoPlaying: { visibility: "hidden" },
      whenVideoPlayingAndMuted: { visibility: "hidden" },
      whenVideoPaused: { visibility: "hidden" },
      whenVideoPausedAndMuted: { visibility: "hidden" },
    };

    const showWhenPlayingOrPaused: Partial<DElementDto> = {
      whenVideoEnded: { visibility: "visible" },
      whenVideoEndedAndMuted: { visibility: "visible" },
      whenVideoPlaying: { visibility: "visible" },
      whenVideoPlayingAndMuted: { visibility: "visible" },
      whenVideoPaused: { visibility: "hidden" },
      whenVideoPausedAndMuted: { visibility: "hidden" },
    };

    const showWhenPlaying: Partial<DElementDto> = {
      whenVideoEnded: { visibility: "hidden" },
      whenVideoEndedAndMuted: { visibility: "hidden" },
      whenVideoPlaying: { visibility: "visible" },
      whenVideoPlayingAndMuted: { visibility: "visible" },
      whenVideoPaused: { visibility: "hidden" },
      whenVideoPausedAndMuted: { visibility: "hidden" },
    };

    const showWhenPaused: Partial<DElementDto> = {
      whenVideoEnded: { visibility: "hidden" },
      whenVideoEndedAndMuted: { visibility: "hidden" },
      whenVideoPlaying: { visibility: "hidden" },
      whenVideoPlayingAndMuted: { visibility: "hidden" },
      whenVideoPaused: { visibility: "visible" },
      whenVideoPausedAndMuted: { visibility: "visible" },
    };

    const playButtonTask: PlayVideoTask = {
      kind: "play-video-task",
      url: video.file.downloadUrl,
      videoId: video.file.id,
      blockAudio: false,
      blockFormInput: false,
      blockResponseButton: false,
      loop: mode === "gif-mode",
      blockVideo: false,
      priority: "replace-all",
    };

    if (video.mode === "autoplay" || video.mode === "gif-mode") {
      autoplayVideoTask = { ...playButtonTask, priority: "follow-queue" };
      autoPlayTasks = [autoplayVideoTask];
      if (video.preDelay > 0) {
        autoplayDelayTask = {
          kind: "delay-task",
          priority: "follow-queue",
          duration: video.preDelay,
          blockVideo: false,
          blockAudio: false,
          blockResponseButton: false,
          blockFormInput: false,
        };
        autoPlayTasks = [autoplayDelayTask, autoplayVideoTask];
      }
    }

    const videoPlayer: PageDto["videoPlayer"] = {
      playUrl: video.file.downloadUrl,
      style: t.videoElement.css,
      // style: { h: 45, w: 100, x: 0, y: 55 },
    };

    if (t.buttonBar) {
      buttonBar = {
        _tag: "div",
        style: { ...t.buttonBar },
        children: [],
      };
    }

    playButton = {
      ...showWhenPaused,
      _tag: "img",
      url: t.playButton.iconUrl,
      style: { ...t.playButton.css, ...t.playButton.cssEnabled },
      // },
      onClick: { kind: "play-video", task: playButtonTask },
    };
    if (t.playButton.text) {
      playButtonText = {
        ...showWhenPaused,
        _tag: "p",
        style: t.playButton.text.css,
        innerText: t.playButton.text.text,
      };
      // components.push({
      //
      // });
    }

    pauseButton = {
      ...showWhenPlaying,
      _tag: "img",
      style: {
        ...t.pauseButton.css,
        visibility: "hidden",
        ...t.pauseButton.cssEnabled,
      },
      url: t.pauseButton.iconUrl,
      onClick: { kind: "pause-video" },
    };

    if (t.pauseButton.text) {
      pauseButtonText = {
        ...showWhenPlaying,
        _tag: "p",
        style: t.pauseButton.text.css,
        innerText: t.pauseButton.text.text,
      };
    }
    if (t.unMuteButton) {
      unmuteButton = {
        _tag: "img",
        style: { ...t.unMuteButton.css },
        url: t.unMuteButton.iconUrl,
        onClick: { kind: "un-mute-video" },
        whenVideoPausedAndMuted: { visibility: "visible" },
        whenVideoPaused: { visibility: "hidden" },
        whenVideoPlayingAndMuted: { visibility: "visible" },
        whenVideoPlaying: { visibility: "hidden" },
        whenVideoEnded: { visibility: "hidden" },
        whenVideoEndedAndMuted: { visibility: "hidden" },
      };
      if (t.unMuteButton.text) {
        unmuteButtonText = {
          _tag: "p",
          style: t.unMuteButton.text.css,
          innerText: t.unMuteButton.text.text,
          whenVideoPausedAndMuted: { visibility: "visible" },
          whenVideoPaused: { visibility: "hidden" },
          whenVideoPlayingAndMuted: { visibility: "visible" },
          whenVideoPlaying: { visibility: "hidden" },
          whenVideoEnded: { visibility: "hidden" },
          whenVideoEndedAndMuted: { visibility: "hidden" },
        };
      }
    }
    if (t.muteButton) {
      muteButton = {
        _tag: "img",
        style: { ...t.muteButton.css },
        url: t.muteButton.iconUrl,
        onClick: { kind: "mute-video" },
        whenVideoPausedAndMuted: { visibility: "hidden" },
        whenVideoPaused: { visibility: "visible" },
        whenVideoPlayingAndMuted: { visibility: "hidden" },
        whenVideoPlaying: { visibility: "visible" },
        whenVideoEnded: { visibility: "hidden" },
        whenVideoEndedAndMuted: { visibility: "hidden" },
      };

      if (t.muteButton.text) {
        muteButtonText = {
          _tag: "p",
          style: t.muteButton.text.css,
          innerText: t.muteButton.text.text,
          whenVideoPausedAndMuted: { visibility: "hidden" },
          whenVideoPaused: { visibility: "visible" },
          whenVideoPlayingAndMuted: { visibility: "hidden" },
          whenVideoPlaying: { visibility: "visible" },
          whenVideoEnded: { visibility: "hidden" },
          whenVideoEndedAndMuted: { visibility: "hidden" },
        };
      }
    }

    if (t.replayButton) {
      replayButton = {
        ...showWhenEnded,
        _tag: "img",
        style: { ...t.replayButton.css },
        url: t.replayButton.iconUrl,
        onClick: { kind: "play-video", task: playButtonTask },
      };
      if (t.replayButton.text) {
        replayButtonText = {
          ...showWhenEnded,
          _tag: "p",
          style: t.replayButton.text.css,
          innerText: t.replayButton.text.text,
        };
      }
    }

    const componentsSet = new Set<DElementDto>();
    const addComponent = (maybeComponent: DElementDto | false) => {
      if (maybeComponent) {
        componentsSet.add(maybeComponent);
      }
    };

    if (mode !== "gif-mode") {
      addComponent(buttonBar);
      addComponent(unmuteButton);
      addComponent(unmuteButtonText);
      addComponent(muteButton);
      addComponent(muteButtonText);
      addComponent(playButton);
      addComponent(playButtonText);
      addComponent(pauseButton);
      addComponent(pauseButtonText);
      addComponent(replayButton);
      addComponent(replayButtonText);
    }
    // components = []
    return { videoPlayer, components: [...componentsSet], autoPlayTasks: [...autoPlayTasks] };
  }
  private compileQuestion(
    pageId: string,
    page: BuilderPageDto,
    variableId: string,
    hasMainMedia: boolean,
  ): {
    question: DTextDto;
    buttonBar: DDivDto;
  } {
    // TODO REFACTORE DEFAULT QUESTION TO - (REMOVE USE TEXT1)
    // console.log(page);
    const t = this.currentTheme;
    const q = page.defaultQuestion;
    const text = page.mainText.text;

    const questionElement = this.compileMainText(text, !!page.mainText.audioFile, hasMainMedia);
    // initialTasks: Array<PlayAudioTask | DelayTask>;
    const buttons: DButtonDto[] = q.options.map((o) => {
      const btns = this.compileButton(o, {
        kind: "response-button",
        questionId: variableId,
        questionText: text,
      });
      return btns;
    });
    const buttonBar = this.compileButtonBar(buttons);
    return {
      question: questionElement,
      buttonBar,
    };
  }

  private compileButtonBar(buttons: Array<DButtonDto>): DDivDto {
    const t = this.currentTheme;
    const isSingle = buttons.length < 2;
    const style: PStyle = isSingle
      ? { ...t.buttonBar.container.base, ...t.buttonBar.container.whenSingle }
      : { ...t.buttonBar.container.base, ...t.buttonBar.container.whenMany };
    // console.log(t);
    const buttonBar: DDivDto = {
      _tag: "div",
      children: [...buttons],
      style,
    };
    return buttonBar;
  }
  private compileButton(
    buttonDto: BuilderPageDto["nextButton"],
    options:
      | { kind: "response-button"; questionId: string; questionText: string }
      | { kind: "next-button" },
  ): DButtonDto {
    const { id, value, label } = buttonDto;
    const t = this.currentTheme;
    const onclickAction: ButtonClickAction =
      options.kind === "response-button"
        ? {
            kind: "submit-fact",
            fact: {
              kind: "numeric-fact",
              label: label,
              value: value,
              referenceId: options.questionId,
              referenceLabel: options.questionText,
            },
          }
        : { kind: "next-page" };

    const btnStyles =
      value === 9 ? t.buttonBar.responseButtons.dontKnow : t.buttonBar.responseButtons.normal;
    if (t.buttonBar.vibrateMs) {
      onclickAction.vibrateMs = t.buttonBar.vibrateMs;
    }

    const btn: DButtonDto = {
      _tag: "button",
      innerText: label,
      style: { ...btnStyles.btn.css, ...btnStyles.btn.cssEnabled },
      onClick: onclickAction,
    };

    return btn;
  }
}
