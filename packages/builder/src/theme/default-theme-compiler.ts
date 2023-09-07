import { AbstractThemeCompiler } from "./AbstractThemeCompiler";
import type { BuilderSchemaDto } from "../Builder-schema";
import { BuilderSchema } from "../Builder-schema";
import type { BuilderPageDto } from "../Builder-page";
import { ThemeUtils } from "./theme-utils";
import { DefaultTheme, type IDefaultTheme } from "./IDefaultTheme";
import type { BuilderMainImageDto } from "../BuilderMainImageDto";
import type { BuilderMainVideoDto } from "../BuilderMainVideoDto";
import {
  DAudioDto,
  DCommand,
  DDivDto,
  DElementDto,
  DImgDto,
  DTextDto,
  DUtil,
  DVideoDto,
  Fact,
  PageDto,
  PageQueCommand,
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
    // console.log(pages.map((p) => p.tags));

    const dto: SchemaDto = {
      backgroundColor: source.backgroundColor,
      baseHeight: source.baseHeight,
      baseWidth: source.baseWidth,
      id: source.id,
      pageSequences: [],
      pages2: [],
      pages,
      predefinedFacts: [],
      rules,
    };
    return dto;
  }
  private compilePage(page: BuilderPageDto, modulePrefix: string): PageDto {
    // console.log(_moduleId);
    // const textElement
    const tags = page.tags ?? [];
    const { nextButton, mainText, id, mainMedia, _type } = page;
    const elements: DElementDto[] = [];
    const audioResourcesDto: DAudioDto[] = [];
    const videoResources: DVideoDto[] = [];
    let mainVideo: DVideoDto | false = false;
    let mainTextAudio: DAudioDto | false = false;

    if (page.mainText.audioFile) {
      const res = this.compileMainTextAudio(page.mainText.audioFile);
      elements.push(...res.elements);
      audioResourcesDto.push(res.audioDto);
      mainTextAudio = res.audioDto;
    }

    if (_type === "question") {
      const variableId = modulePrefix + "_" + page.prefix;
      const { buttons, question } = this.compileQuestion(id, page, variableId);
      // console.log(question);
      elements.push(...buttons, question);
    }

    if (_type === "info-page") {
      const infoText = mainText.text;
      const nextBtnElement: DElementDto = this.compileButton(id, nextButton, {
        kind: "next-button",
      });
      const textStyle = mainMedia ? DefaultTheme.mainText.withMedia.text.css : DefaultTheme.mainText.noMedia.text.css;
      const element: DElementDto = {
        innerText: infoText,
        _tag: "p",
        style: textStyle,
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
    const mainVideoId = mainVideo ? mainVideo.id : undefined;
    const autoPlaySequence = {
      blockUserInput: true,
      id: "1",
      items: [],
      startCommands: [],
      endCommands: [],
    };

    if (mainVideo && page.mainMedia && page.mainMedia.kind === "main-video" && page.mainMedia.mode === "autoplay") {
      // autoPlaySequence.items.push({
      //   kind: "autoplay-video",
      //   videoId: mainVideo.id,
      // });
    }

    if (mainTextAudio && page.mainText.autoplay) {
      // autoPlaySequence.items.push({
      //   kind: "autoplay-audio",
      //   audioId: mainTextAudio.id,
      // });
    }

    const pageDto: PageDto = {
      audio: audioResourcesDto,
      // autoPlaySequence: autoPlaySequence,
      backgroundColor: "red",
      elements,
      id,
      mainVideoId,
      tags: [...tags],
      video: videoResources,
    };
    return pageDto;
  }

  private compileImage(image: BuilderMainImageDto) {
    const img: DImgDto = {
      _tag: "img",
      id: image.file.id,
      style: this.theme.image.style,
      url: image.file.downloadUrl,
    };
    return img;
  }

  private compileMainTextAudio(audioFile: AudioFile): {
    audioDto: DAudioDto;
    elements: DElementDto[];
  } {
    const t = this.theme.mainText;
    const audioId = audioFile.id;
    const iconUrl =
      "https://firebasestorage.googleapis.com/v0/b/ispe-backend-dev.appspot.com/o/public-assets%2Fvolume_up-24px.svg?alt=media&token=551bd0a6-a515-4f87-a245-da433f4833f9";

    const buttonId = U.randomString(30);
    const playMainTextAudio: DImgDto = {
      _tag: "img",
      id: buttonId,
      url: iconUrl,
      style: { ...t.withMedia.audio.css },
      onClick: [
        {
          kind: "AUDIO_PLAY_COMMAND",
          target: "AUDIO",
          targetId: audioId,
          payload: { volume: 1 },
        },
      ],
    };
    const audioDto: DAudioDto = {
      _tag: "audio",
      // eventHandlers: [],
      id: audioFile.id,
      url: audioFile.downloadUrl,
    };
    return { audioDto, elements: [playMainTextAudio] };
  }

  private compileVideo(video: BuilderMainVideoDto) {
    const t = this.theme.videoPlayer;
    console.log(video.mode);
    const mode = video.mode;
    const videoId = video.file.id;
    const playButtonId = "play-btn-for" + videoId;
    const pauseButtonId = "pause-btn-for" + videoId;
    const elements: DElementDto[] = [];
    const videoDto: DVideoDto = {
      _tag: "video",
      id: video.file.id,
      style: t.videoElement.css,
      url: video.file.downloadUrl,
    };
    const playBtn: DImgDto = {
      id: playButtonId,
      _tag: "img",
      url: t.playButton.iconUrl,
      style: { ...t.playButton.css, ...t.playButton.cssEnabled },
      onClick: [
        {
          kind: "VIDEO_PLAY_COMMAND",
          target: "VIDEO",
          targetId: videoId,
          payload: {},
        },
      ],
    };
    const pauseBtn: DImgDto = {
      id: pauseButtonId,
      _tag: "img",
      style: {
        ...t.pauseButton.css,
        visibility: "hidden",
        ...t.pauseButton.cssEnabled,
      },
      url: t.pauseButton.iconUrl,
      onClick: [
        {
          kind: "VIDEO_PAUSE_COMMAND",
          target: "VIDEO",
          targetId: videoId,
          payload: {},
        },
      ],
    };
    if (mode !== "gif-mode") {
      elements.push(playBtn);
      elements.push(pauseBtn);
    }
    return { videoDto, elements };
  }
  private compileQuestion(
    pageId: string,
    page: BuilderPageDto,
    variableId: string,
  ): {
    question: DTextDto;
    buttons: DDivDto[];
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
      onClick: [],
      style: questionStyle,
    };
    const buttons = q.options.map((o) => {
      const btns = this.compileButton(pageId, o, {
        kind: "response-button",
        questionId: variableId,
      });
      return btns;
    });
    ThemeUtils.spaceEvenlyX(buttons);
    return { question, buttons };
  }

  private compileButton(
    pageId: string,
    buttonDto: BuilderPageDto["nextButton"],
    options: { kind: "response-button"; questionId: string } | { kind: "next-button" },
  ) {
    const factsCollected: Fact[] = [];
    const { id, value, label } = buttonDto;

    // const { div, text1, dontKnow } = DefaultTheme.responseButtons;
    if (options.kind === "response-button") {
      const fact: Fact = {
        kind: "numeric-fact",
        label: label,
        value: value,
        referenceId: options.questionId,
        referenceLabel: "QuestionId: " + options.questionId,
      };
      factsCollected.push(fact);
    }

    const onClickHandler: DCommand = {
      kind: "ENGINE_LEAVE_PAGE_COMMAND",
      target: "ENGINE",
      targetId: "ENGINE",
      payload: {
        pageId,
        factsCollected,
      },
    };
    const btnStyles = value === 9 ? DefaultTheme.responseButtons.dontKnow : DefaultTheme.responseButtons.normal;
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
      onClick: [onClickHandler],
    };
    if (options.kind === "next-button") {
      btn.style.x = 50;
      btn.style.y = 8;
      btn.style.transform = "translate(-50%, 0%)";
    }
    return btn;
  }
}
