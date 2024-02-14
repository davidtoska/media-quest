import { DCss, DStyle } from "@media-quest/engine";
import { IconUrls } from "./icon-urls";
import { BuilderOptionTheme, IDefaultTheme } from "./IDefault-theme";

const Colors = {
  primary: "#164AC4",
  secondary: "#E8F0FE",
  text: "#0D1E45",
  white: "#ffffff",
};

namespace Button {
  const LIGHT_BLUE = "#42719C";
  const BTN_WIDTH = 18.5;
  const BTN_BORDER_WIDTH = 3;
  const BTN_BORDER_RADIUS = 10;
  const BTN_BORDER_STYLE: DStyle["borderStyle"] = "solid";
  const BTN_HEIGHT = 9.2;
  const BTN_SHORT_WIDTH = 13.7;
  const FONT_WEIGHT: DStyle["fontWeight"] = 600;
  const FONT_SIZE: DCss.Px["value"] = 35;

  export const primaryButton = (): BuilderOptionTheme => {
    console.log("PRIMACY PU");

    const optionTheme: BuilderOptionTheme = {
      name: "primary-button",
      normal: {
        btn: {
          css: {
            backgroundColor: Colors.primary,
            borderColor: Colors.primary,
            textColor: Colors.white,
            // fontSize: { _unit: "px", value: FONT_SIZE },
            // borderWidth: { _unit: "px", value: BTN_BORDER_WIDTH },
            // borderStyle: BTN_BORDER_STYLE,
            // borderRadius: { value: BTN_BORDER_RADIUS, _unit: "px" },
            padding: { _unit: "px", value: 20 },
            // h: BTN_HEIGHT,
            // w: BTN_WIDTH,
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
          textColor: Colors.white,
          fontSize: { _unit: "px", value: FONT_SIZE },
          w: 84,
          x: 8,
          borderColor: "red",
          fontWeight: FONT_WEIGHT,
          textAlign: "center",
        },
        text2: {},
      },

      dontKnow: {
        btn: {
          css: {
            backgroundColor: Colors.white,
            borderColor: LIGHT_BLUE,
            textColor: Colors.text,
            fontSize: { _unit: "px", value: FONT_SIZE },
            borderWidth: { _unit: "px", value: BTN_BORDER_WIDTH },
            borderStyle: BTN_BORDER_STYLE,
            borderRadius: { value: BTN_BORDER_RADIUS, _unit: "px" },
            padding: { _unit: "px", value: 40 },
            // h: BTN_HEIGHT,
            // w: BTN_SHORT_WIDTH,
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
          textColor: Colors.text,
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

export const Theme2: IDefaultTheme = {
  name: "theme2",
  pageBackGround: { style: { h: 85, w: 90, x: 5, y: 10, backgroundColor: "gray" } },
  progressBar: {
    w: 90,
    h: 1.5,
    x: 5,
    y: 5,
    backgroundStyles: { backgroundColor: "gray", borderRadius: { _unit: "px", value: 3 } },
    progressStyles: { backgroundColor: "blue", borderRadius: { _unit: "px", value: 3 } },
    text: {
      textType: "page-progress",
      style: { fontSize: { _unit: "px", value: 20 }, x: 82, y: 3 },
    },
  },
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
    videoElement: { css: { w: 80, h: 35, y: 50, x: 10 } },
  },
  image: { style: { h: 35, w: 80, x: 10, y: 60 } },
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
  nextButtonTheme: Button.primaryButton(),
  responseButtons: Button.primaryButton(),
};
