import { DCss, DStyle } from "@media-quest/engine";
import { IconUrls } from "./icon-urls";
import { BuilderOptionTheme, IDefaultTheme } from "./IDefault-theme";

namespace BuilderOptionTheme {
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
  const BTN_BORDER_STYLE: DStyle["borderStyle"] = "solid";
  const BTN_HEIGHT = 9.2;
  const BTN_SHORT_WIDTH = 13.7;
  const FONT_WEIGHT: DStyle["fontWeight"] = 600;
  const FONT_SIZE: DCss.Px["value"] = 35;

  export const blueButton = (): BuilderOptionTheme => {
    const optionTheme: BuilderOptionTheme = {
      name: "blue-button-theme",
      normal: {
        btn: {
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
            textAlign: "center",
          },
          cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
          cssEnabled: { opacity: 1, cursor: "pointer" },
        },
        divider: {},
        text1: {
          y: 50,
          transform: "translate(0%, 50%)",
          textColor: WHITE,
          fontSize: { _unit: "px", value: FONT_SIZE },
          w: 84,
          x: 8,
          fontWeight: FONT_WEIGHT,
          textAlign: "center",
        },
        text2: {},
      },

      dontKnow: {
        btn: {
          css: {
            backgroundColor: WHITE,
            borderColor: LIGHT_BLUE,
            textColor: BLUE,
            fontSize: { _unit: "px", value: FONT_SIZE },
            borderWidth: { _unit: "px", value: BTN_BORDER_WIDTH },
            borderStyle: BTN_BORDER_STYLE,
            borderRadius: { value: BTN_BORDER_RADIUS, _unit: "px" },
            padding: { _unit: "px", value: 40 },
            h: BTN_HEIGHT,
            w: BTN_SHORT_WIDTH,
            x: 10,
            y: 8,
            textAlign: "center",
          },
          cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
          cssEnabled: { opacity: 1, cursor: "pointer" },
        },
        text1: {
          y: 50,
          transform: "translate(0%, 50%)",
          textColor: BLUE,
          fontSize: { _unit: "px", value: FONT_SIZE },
          w: 84,
          x: 8,
          fontWeight: FONT_WEIGHT,
          textAlign: "center",
        },
        text2: {},
        divider: {},
      },
    };

    return optionTheme;
  };
}

export const DefaultTheme: IDefaultTheme = {
  name: "default-theme",
  videoPlayer: {
    playButton: {
      iconUrl: IconUrls.playCircleRegular,
      css: { w: 5, h: 5, y: 48, x: 4 },
      cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
      cssEnabled: { opacity: 0.8, cursor: "pointer" },
      hideOnPlay: true,
    },
    pauseButton: {
      iconUrl: IconUrls.pauseSvg,
      css: { w: 5, h: 5, y: 48, x: 4 },
      cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
      cssEnabled: { opacity: 0.8, cursor: "pointer" },
      hideOnPause: true,
    },
    videoElement: { css: { w: 100, h: 45, y: 55, x: 0 } },
  },
  image: { style: { h: 50, w: 100, x: 0 } },
  mainText: {
    noMedia: {
      text: {
        css: {
          w: 80,
          y: 65,
          x: 10,
          textAlign: "center",
          textColor: "black",
          fontSize: { _unit: "px", value: 40 },
        },
        cssDisabled: {},
        cssEnabled: {},
      },
      audio: {
        css: {
          h: 6,
          w: 6,
          x: 4,
          y: 70,
          cursor: "pointer",
          opacity: 0.8,
          visibility: "visible",
        },
        cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
        cssEnabled: { opacity: 0.8, cursor: "pointer" },
      },
    },
    withMedia: {
      text: {
        css: {
          w: 80,
          y: 27,
          x: 10,
          textAlign: "center",
          textColor: "black",
          fontSize: { _unit: "px", value: 30 },
        },
        cssDisabled: {},
        cssEnabled: {},
      },
      audio: {
        css: {
          h: 6,
          w: 6,
          x: 4,
          y: 32,
          cursor: "pointer",
          opacity: 0.8,
          visibility: "visible",
        },
        cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
        cssEnabled: { opacity: 0.8, cursor: "pointer" },
      },
    },
  },
  nextButtonTheme: BuilderOptionTheme.blueButton(),
  responseButtons: BuilderOptionTheme.blueButton(),
};
