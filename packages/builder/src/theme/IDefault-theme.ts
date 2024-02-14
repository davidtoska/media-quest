import { DStyle } from "@media-quest/engine";
import type { CssTheme } from "./css-theme";

type PStyle = Partial<DStyle>;
export interface IDefaultTheme {
  name: string;
  pageBackGround?: { style: PStyle };
  progressBar?: {
    w: number;
    h: number;
    x: number;
    y: number;
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
      hideOnPlay: boolean;
    };

    pauseButton: {
      iconUrl: string;
      css: PStyle;
      cssDisabled: PStyle;
      cssEnabled: PStyle;
      hideOnPause: boolean;
    };
    videoElement: {
      css: PStyle;
    };
  };
  mainText: {
    noMedia: {
      text: { css: PStyle; cssDisabled: PStyle; cssEnabled: PStyle };
      audio: { css: PStyle; cssDisabled: PStyle; cssEnabled: PStyle };
    };
    withMedia: {
      text: { css: PStyle; cssDisabled: PStyle; cssEnabled: PStyle };
      audio: { css: PStyle; cssDisabled: PStyle; cssEnabled: PStyle };
    };
  };
  responseButtons: BuilderOptionTheme;
  nextButtonTheme: BuilderOptionTheme;
  buttonThemes?: Array<BuilderOptionTheme>;
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
