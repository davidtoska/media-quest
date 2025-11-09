import { DStyle } from "@media-quest/engine";
import type { CssTheme } from "./css-theme";

type PStyle = Partial<DStyle>;
export interface IDefaultTheme {
  name: string;
  schemaBackgroundColor: string;
  dimensions: {
    baseHeight: number;
    baseWidth: number;
  };

  pageBackGroundImage?: { url: string; style: PStyle };

  pageBackGround?: { style: PStyle };

  backGroundArea1?: { style: PStyle };

  backGroundArea2?: { style: PStyle };

  backGroundArea3?: { style: PStyle };

  progressBar?: {
    width: number;
    height: number;
    bottom: number;
    left: number;
    backgroundStyles: PStyle;
    progressStyles: PStyle;
    text?: {
      style: PStyle;
      textType: "percent" | "page-progress";
    };
  };

  image: { style: PStyle };
  videoPlayer: {
    playButton: {
      iconUrl: string;
      css: PStyle;
      cssDisabled: PStyle;
      cssEnabled: PStyle;
      text?: { text: string; css: PStyle };
    };

    buttonBar?: PStyle;

    pauseButton: {
      iconUrl: string;
      css: PStyle;
      cssDisabled: PStyle;
      cssEnabled: PStyle;
      text?: { text: string; css: PStyle };
    };

    replayButton?: {
      iconUrl: string;
      css: PStyle;
      cssDisabled: PStyle;
      cssEnabled: PStyle;
      text?: { text: string; css: PStyle };
    };

    muteButton?: {
      iconUrl: string;
      css: PStyle;
      text?: { text: string; css: PStyle };
    };

    unMuteButton?: {
      iconUrl: string;
      css: PStyle;
      text?: { text: string; css: PStyle };
    };

    videoElement: {
      css: PStyle;
    };
  };
  mainText: {
    base: {
      text: PStyle;
      audio: { css: PStyle; cssDisabled: PStyle; cssEnabled: PStyle; iconUrl: string };
    };

    notMediaNotAudio: {
      text: PStyle;
    };

    hasMediaNotAudio: {
      text: PStyle;
    };

    hasMediaHasAudio: {
      text: PStyle;
      audio: PStyle;
    };

    notMediaHasAudio: {
      text: PStyle;
      audio: PStyle;
    };
  };

  buttonBar: {
    vibrateMs: number | false;
    container: { base: PStyle; whenSingle: PStyle; whenMany: PStyle };
    responseButtons: BuilderOptionTheme;
    nextButtonTheme: BuilderOptionTheme;
  };
  // buttonThemes?: Array<BuilderOptionTheme>;
}

interface ButtonTheme {
  btn: CssTheme;
  divider: PStyle;
  text1: PStyle;
  text2: PStyle;
}

export interface BuilderOptionTheme {
  name: string;
  normal: ButtonTheme;
  dontKnow: ButtonTheme;
}
