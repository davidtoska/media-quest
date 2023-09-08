import { AbstractThemeCompiler } from "./AbstractThemeCompiler";
import type { BuilderSchemaDto } from "../Builder-schema";
import { BuilderSchema } from "../Builder-schema";
import type { BuilderPageDto } from "../Builder-page";
import { ThemeUtils } from "./theme-utils";
import { DefaultTheme, type IDefaultTheme } from "./IDefaultTheme";
import type { BuilderMainImageDto } from "../BuilderMainImageDto";
import type { BuilderMainVideoDto } from "../BuilderMainVideoDto";
import {
  ButtonClickAction,
  DDivDto,
  DElementDto,
  DImgDto,
  DTextDto,
  DUtil,
  PageDto,
  PageComponentDto,
  PageQueCommand,
  PlayAudioTask,
  PlayVideoTask,
  Rule,
  SchemaDto,
} from "@media-quest/engine";

import { AudioFile } from "../media-files";
import { BuilderRule } from "../rulebuilder";

const U = DUtil;

export class DefaultThemeCompiler extends AbstractThemeCompiler<IDefaultTheme> {
  readonly name = "Ispe default theme.";
  private readonly TAG = "[ DEFAULT_THEME_COMPILER ]: ";
  constructor() {
    super(DefaultTheme);
  }

  private compileRules(source: BuilderSchemaDto): Rule<PageQueCommand, never>[] {
    const builderSchema = BuilderSchema.fromJson(source);
    const ruleInput = builderSchema.getRuleInput();
    const pageQueRules: Rule<PageQueCommand, never>[] = [];
    source.rules.forEach((rule) => {
      const engineRule = BuilderRule.fromDto(rule, ruleInput).toEngineRule();
      if (!Rule.isEmpty(engineRule)) {
        pageQueRules.push(engineRule);
      } else {
        console.groupCollapsed(this.TAG, "Throws away empty rule.");
        console.log(rule);
        console.log(ruleInput);
        console.groupEnd();
      }
    });
    return pageQueRules;
  }

  compile(source: BuilderSchemaDto): SchemaDto {
    const pages = source.pages.map((p) => this.compilePage(p, source.prefix));
    const rules = this.compileRules(source);

    const dto: SchemaDto = {
      backgroundColor: source.backgroundColor,
      baseHeight: source.baseHeight,
      baseWidth: source.baseWidth,
      id: source.id,
      pageSequences: [],
      pages,
      predefinedFacts: [],
      rules,
    };
    return dto;
  }
  private compilePage(page: BuilderPageDto, modulePrefix: string): PageDto {
    const tags = page.tags ?? [];
    const { nextButton, mainText, id, mainMedia, _type } = page;
    const staticElements: DElementDto[] = [];
    let autoPlayAudioTasks: PlayAudioTask | false = false;
    let autoPlayVideoTasks: PlayVideoTask | false = false;
    const newPage: PageDto = {
      background: "white",
      components: [],
      staticElements,
      id,
      initialTasks: [],
      tags: [...tags],
    };

    if (page.mainText.audioFile) {
      const autoPlay = page.mainText.autoplay;
      const res = this.compileMainTextAudio(page.mainText.audioFile, autoPlay);
      autoPlayAudioTasks = res.autoPlayTask;
      newPage.components.push(...res.components);
    }

    if (_type === "question") {
      const variableId = modulePrefix + "_" + page.prefix;
      const { components, question } = this.compileQuestion(id, page, variableId);
      newPage.components.push(...components);
      newPage.staticElements.push(question);
      // console.log(question);
      // elements.push(...buttons, question);
    }

    if (_type === "info-page") {
      const infoText = mainText.text;
      const nextButtonComponent = this.compileButton(nextButton, {
        kind: "next-button",
      });

      const textStyle = mainMedia
        ? DefaultTheme.mainText.withMedia.text.css
        : DefaultTheme.mainText.noMedia.text.css;
      const infoTextElement: DElementDto = {
        innerText: infoText,
        _tag: "p",
        style: textStyle,
      };
      newPage.staticElements.push(infoTextElement);
      newPage.components.push(nextButtonComponent);
    }
    if (mainMedia && mainMedia.kind === "main-image") {
      const mainImageElement = this.compileImage(mainMedia);
      newPage.staticElements.push(mainImageElement);
    }

    if (mainMedia && mainMedia.kind === "main-video") {
      const videoOutput = this.compileVideo(mainMedia);
      newPage.videoPlayer = videoOutput.videoPlayer;
      newPage.components.push(...videoOutput.components);
      autoPlayVideoTasks = videoOutput.autoPlayTask;
    }

    if (autoPlayVideoTasks) {
      newPage.initialTasks.push(autoPlayVideoTasks);
    }
    if (autoPlayAudioTasks) {
      newPage.initialTasks.push(autoPlayAudioTasks);
    }
    return newPage;
  }

  private compileImage(image: BuilderMainImageDto) {
    const img: DImgDto = {
      _tag: "img",
      style: this.theme.image.style,
      url: image.file.downloadUrl,
    };
    return img;
  }

  private compileMainTextAudio(
    audioFile: AudioFile,
    autoPlay: boolean,
  ): {
    components: PageComponentDto[];
    autoPlayTask: PlayAudioTask | false;
  } {
    const t = this.theme.mainText;
    const audioId = audioFile.id;
    const iconUrl =
      "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fvolume_up-24px.svg?alt=media&token=551bd0a6-a515-4f87-a245-da433f4833f9";

    const playMainTextAudio: DImgDto = {
      _tag: "img",
      url: iconUrl,
      style: { ...t.withMedia.audio.css },
    };

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

    let autoPlayTask: PlayAudioTask | false = false;
    if (autoPlay) {
      autoPlayTask = { ...task, priority: "follow-queue" };
    }
    // const autoplayTask =
    const playBtn: PageComponentDto = {
      el: playMainTextAudio,
      onClick: { kind: "play-audio", task },
    };

    return { components: [playBtn], autoPlayTask };
  }

  private compileVideo(video: BuilderMainVideoDto): {
    videoPlayer: PageDto["videoPlayer"];
    components: PageComponentDto[];
    autoPlayTask: PlayVideoTask | false;
  } {
    const t = this.theme.videoPlayer;
    const mode = video.mode;
    const components: PageComponentDto[] = [];

    let autoPlayTask: PlayVideoTask | false = false;
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
    if (video.mode === "autoplay") {
      autoPlayTask = { ...playButtonTask, priority: "follow-queue" };
    }
    if (video.mode === "gif-mode") {
      autoPlayTask = { ...playButtonTask, priority: "follow-queue", loop: true };
    }

    const videoPlayer: PageDto["videoPlayer"] = {
      playUrl: video.file.downloadUrl,
      style: { h: 45, w: 100, x: 0, y: 55 },
    };
    const playButton: PageComponentDto = {
      el: {
        _tag: "img",
        url: t.playButton.iconUrl,
        style: { ...t.playButton.css, ...t.playButton.cssEnabled },
      },
      onClick: { kind: "play-video", task: playButtonTask },
      whenVideoPlay: { visibility: "hidden" },
      whenVideoPaused: { visibility: "visible" },
    };
    const pauseBtn: PageComponentDto = {
      el: {
        _tag: "img",
        style: {
          ...t.pauseButton.css,
          visibility: "hidden",
          ...t.pauseButton.cssEnabled,
        },
        url: t.pauseButton.iconUrl,
      },
      onClick: { kind: "pause-video" },
      whenVideoPlay: { visibility: "visible" },
      whenVideoPaused: { visibility: "hidden" },
    };

    if (mode !== "gif-mode") {
      components.push(playButton);
      components.push(pauseBtn);
    }
    return { videoPlayer, components, autoPlayTask };
  }
  private compileQuestion(
    pageId: string,
    page: BuilderPageDto,
    variableId: string,
  ): {
    question: DTextDto;
    components: PageComponentDto[];
  } {
    // TODO REFACTORE DEFAULT QUESTION TO - (REMOVE USE TEXT1)
    // console.log(page);
    const q = page.defaultQuestion;
    const text = page.mainText.text;
    const questionStyle = page.mainMedia
      ? DefaultTheme.mainText.withMedia.text.css
      : DefaultTheme.mainText.noMedia.text.css;
    const question: DTextDto = {
      _tag: "p",
      innerText: text,
      style: questionStyle,
    };
    const buttons: PageComponentDto[] = q.options.map((o) => {
      const btns = this.compileButton(o, {
        kind: "response-button",
        questionId: variableId,
      });
      return btns;
    });
    const rootElements = buttons.map((b) => b.el);
    ThemeUtils.spaceEvenlyX(rootElements);
    return { question, components: buttons };
  }

  private compileButton(
    buttonDto: BuilderPageDto["nextButton"],
    options: { kind: "response-button"; questionId: string } | { kind: "next-button" },
  ): PageComponentDto {
    const { id, value, label } = buttonDto;
    const onclickAction: ButtonClickAction =
      options.kind === "response-button"
        ? {
            kind: "submit-fact",
            fact: {
              kind: "numeric-fact",
              label: label,
              value: value,
              referenceId: options.questionId,
              referenceLabel: "QuestionId: " + options.questionId,
            },
          }
        : { kind: "next-page" };

    const btnStyles =
      value === 9 ? DefaultTheme.responseButtons.dontKnow : DefaultTheme.responseButtons.normal;
    const btn: DDivDto = {
      _tag: "div",
      children: [
        {
          _tag: "p",
          innerText: label,
          style: btnStyles.text1,
        },
      ],
      style: { ...btnStyles.btn.css, ...btnStyles.btn.cssEnabled },
    };

    if (options.kind === "next-button") {
      btn.style.x = 50;
      btn.style.y = 8;
      btn.style.transform = "translate(-50%, 0%)";
    }
    const component: PageComponentDto = {
      el: btn,
      onClick: onclickAction,
    };
    return component;
  }
}
