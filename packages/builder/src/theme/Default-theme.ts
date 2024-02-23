import { DCss, DStyle, PStyle } from "@media-quest/engine";
import { IconUrls } from "./icon-urls";
import { BuilderOptionTheme, IDefaultTheme } from "./IDefault-theme";
import { CssTheme } from "./css-theme";

namespace BuilderOptionTheme {
  const GREEN = "#70AD47";
  const YELLOW = "#FFC000";
  const ORANGE = "#F4902C";
  const RED = "#FF0000";
  const LIGHT_BLUE = "#42719C";
  const WHITE = "#ffffff";
  const BLUE = "#2F5597";
  const BTN_BORDER_WIDTH = 3;
  const BTN_BORDER_RADIUS = 10;
  const BTN_BORDER_STYLE: DStyle["borderStyle"] = "solid";
  const FONT_WEIGHT: DStyle["fontWeight"] = 600;
  const FONT_SIZE: DCss.Px["value"] = 50;
  const BTN_PADDING_LEFT = 40;
  const BTN_PADDING_TOP = 40;

  const buttonBaseCss = (): CssTheme => ({
    css: {
      fontWeight: FONT_WEIGHT,
      fontSize: { _unit: "px", value: FONT_SIZE },
      letterSpacing: { _unit: "px", value: 2 },
      paddingLeft: { _unit: "px", value: BTN_PADDING_LEFT },
      paddingTop: { _unit: "px", value: BTN_PADDING_TOP },
      paddingBottom: { _unit: "px", value: BTN_PADDING_TOP },
      paddingRight: { _unit: "px", value: BTN_PADDING_LEFT },
      borderRadius: { _unit: "px", value: BTN_BORDER_RADIUS },
      borderWidth: { _unit: "px", value: BTN_BORDER_WIDTH },
      borderStyle: BTN_BORDER_STYLE,
      // boxShadow: "3px 3px gray",
      position: "relative",
      display: "block",
    },
    cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
    cssEnabled: { opacity: 1, cursor: "pointer" },
  });

  export const blueButton = (): BuilderOptionTheme => {
    const base = buttonBaseCss();
    const { css, cssEnabled, cssDisabled } = base;
    const optionTheme: BuilderOptionTheme = {
      name: "blue-button-theme",
      normal: {
        btn: {
          css: {
            ...css,
            backgroundColor: BLUE,
            borderColor: BLUE,
            textColor: WHITE,
          },
          cssDisabled,
          cssEnabled,
        },
        divider: {},
        text1: {},
        text2: {},
      },

      dontKnow: {
        btn: {
          css: {
            ...css,
            backgroundColor: WHITE,
            borderColor: LIGHT_BLUE,
            textColor: BLUE,
          },
          cssDisabled,
          cssEnabled,
        },
        text1: {},
        text2: {},
        divider: {},
      },
    };

    return optionTheme;
  };
}

const textHighTop = 25;
const textLowTop = 55;
const audioHighTop = 20;
const audioLowTop = 55;

const textBase: PStyle = {
  width: 80,
  top: textHighTop,
  left: 10,
  textAlign: "center",
  textColor: "black",
  fontSize: { _unit: "px", value: 40 },
};
const textHigh: PStyle = { ...textBase, top: textHighTop };
const textLow: PStyle = { ...textHigh, top: textLowTop };

const audioBase: PStyle = {
  height: 6,
  width: 6,
  left: 4,
  top: audioHighTop,
  cursor: "pointer",
  opacity: 0.8,
  visibility: "visible",
};
const audioHigh: PStyle = { ...audioBase, top: audioHighTop };
const audioLow: PStyle = { ...audioBase, top: audioLowTop };

export const DefaultTheme: IDefaultTheme = {
  name: "default-theme",
  schemaBackgroundColor: "white",
  dimensions: { baseHeight: 1300, baseWidth: 1024 },
  videoPlayer: {
    playButton: {
      iconUrl: IconUrls.playCircleRegular,
      css: { w: 5, h: 5, y: 48, x: 4 },
      cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
      cssEnabled: { opacity: 0.8, cursor: "pointer" },
    },
    pauseButton: {
      iconUrl: IconUrls.pauseSvg,
      css: { w: 5, h: 5, y: 48, x: 4 },
      cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
      cssEnabled: { opacity: 0.8, cursor: "pointer" },
    },
    videoElement: { css: { height: 41, top: 3, x: 0 } },
  },
  image: { style: { h: 50, w: 100, x: 0 } },
  mainText: {
    base: {
      text: { ...textBase },
      audio: {
        iconUrl: IconUrls.volumeUpSvg,
        css: { ...audioBase },
        cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
        cssEnabled: { opacity: 0.8, cursor: "pointer" },
      },
    },
    notMediaHasAudio: {
      text: { ...textHigh },
      audio: { ...audioHigh },
    },
    hasMediaNotAudio: {
      text: { ...textHigh },
    },
    notMediaNotAudio: { text: { ...textHigh } },
    hasMediaHasAudio: { text: { ...textLow }, audio: { ...audioLow } },
  },

  buttonBar: {
    vibrateMs: false,
    container: {
      base: {
        display: "flex",
        justifyContent: "space-evenly",
        position: "absolute",
        width: 100,
        height: 15,
        bottom: 0,
        left: 0, // h: 10,
        alignItems: "center",
        backgroundColor: "yellow",
      },
      whenSingle: { justifyContent: "space-evenly" },
      whenMany: { justifyContent: "space-evenly" },
    },
    nextButtonTheme: BuilderOptionTheme.blueButton(),
    responseButtons: BuilderOptionTheme.blueButton(),
  },
};
