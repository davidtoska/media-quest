// import { IconUrls } from "./icon-urls";
import { BuilderOptionTheme, IDefaultTheme } from "./IDefault-theme";
import { CssTheme } from "./css-theme";
import { PStyle } from "@media-quest/engine";
import { THEME_2_ICONS } from "./icons";

const translate = (pos: { x?: number; y?: number }) => {
  const x = pos.x || 0;
  const y = pos.y || 0;
  return `translate(${x}%, ${y}%)`;
};
export const translateY50 = translate({ y: 50 });
export const translateX50 = translate({ x: -50 });
const translateX50Y50 = translate({ x: -50, y: 50 });

const Colors = {
  primary: "#164AC4",
  secondary: "#E8F0FE",
  text: "#0D1E45",
  white: "#ffffff",
  backgroundGray: "#F0F0F0",
  backgroundWhite: "white",
  // progressBackGround: "#164AC4",
  // progressForGround: "#F5F5F5",
  // red: "red",
  // yellow: "yellow",
};

const MAIN_TEXT_FONT_SIZE = 35;
const MAIN_TEXT_LINE_HEIGHT = 1.2;
const fraction = 472.6 / 600;

const LAYER_0 = 0;
const LAYER_1 = 1;
const LAYER_2 = 2;
const LAYER_3 = 3;
const LAYER_4 = 4;
const LAYER_5 = 5;
const W_M1 = 6;
const W_M2 = 4.5;
const W_M3 = 3;

const W_M4 = 1.5;

const H_M1 = 5;
const H_M2 = 3.75;
const H_M3 = 2.5;

const H_M4 = 1.25;

const W_MAX = 100 - W_M1 * 2;

const PROGRESS_BAR_HEIGHT = 2;

const AUDIO_ICON_WIDTH = 10;
const AUDIO_ICON_HEIGHT = AUDIO_ICON_WIDTH * fraction;
// const AUDIO_ICON_HEIGHT = AUDIO_ICON_WIDTH * fraction;
const AUDIO_ICON_LEFT = W_M1 + W_M2 + W_M3;

const Q_AREA_HEIGHT = 32;
const Q_AREA_BOTTOM = 2 * H_M1 + H_M2;
const Q_AREA_LEFT = W_M1 + W_M2;
const Q_AREA_WIDTH = W_MAX - W_M2 - W_M2;
const Q_AREA_TOP = 100 - Q_AREA_HEIGHT - Q_AREA_BOTTOM;

const MEDIA_HEIGHT = 34;
// const MEDIA_WIDTH = 100 - 2 * W_M1 - 2 * W_M2;
const MEDIA_TOP = H_M1 + H_M2;
const MEDIA_BOTTOM = MEDIA_TOP + MEDIA_HEIGHT;

const MEDIA_LEFT = W_M1 + W_M2;

const VIDEO_BUTTONS_WIDTH = 8;
const VIDEO_BUTTONS_HEIGHT = VIDEO_BUTTONS_WIDTH * fraction;
const VIDEO_CONTROLS_WIDTH = VIDEO_BUTTONS_WIDTH * 2 + 4 * W_M4;
const VIDEO_CONTROLS_HEIGHT = VIDEO_BUTTONS_HEIGHT + 2 * H_M4 + 2;
const VIDEO_CONTROLS_LEFT = 50 - VIDEO_CONTROLS_WIDTH / 2;
const VIDEO_CONTROLS_RIGHT = 50 - VIDEO_CONTROLS_WIDTH / 2;
const VIDEO_CONTROLS_TOP = MEDIA_BOTTOM - 1;
const VIDEO_CONTROLS_BOTTOM = 100 - VIDEO_CONTROLS_HEIGHT - VIDEO_CONTROLS_TOP;

const PAGE_BACKGROUND_BOTTOM = H_M1 + H_M1;
const PAGE_BACKGROUND_HEIGHT = 100 - PAGE_BACKGROUND_BOTTOM - H_M1;
const BUTTON_BAR_WIDTH = Q_AREA_WIDTH - 2 * W_M3;
const MAIN_TEXT_WIDE = Q_AREA_WIDTH - 2 * W_M3;
const MAIN_TEXT_NARROW = MAIN_TEXT_WIDE - AUDIO_ICON_WIDTH - W_M3;

const btnTextBase: PStyle = {
  fontSize: { _unit: "px", value: 25 },
  bottom: VIDEO_CONTROLS_BOTTOM + 1.2,
  zIndex: LAYER_5,
  width: VIDEO_CONTROLS_WIDTH / 2,
  textAlign: "center",
  visibility: "hidden",
  margin: { _unit: "px", value: 0 },
  // backgroundColor: Colors.yellow,
};

const muteUnmuteText: PStyle = { ...btnTextBase, right: VIDEO_CONTROLS_RIGHT };
const playPauseText: PStyle = { ...btnTextBase, left: VIDEO_CONTROLS_LEFT };
const replayText: PStyle = {
  ...btnTextBase,
  width: VIDEO_CONTROLS_WIDTH,
  left: VIDEO_CONTROLS_LEFT,
  // backgroundColor: Colors.yellow,
  visibility: "hidden",
};

const playPauseBase: { css: PStyle; cssDisabled: PStyle; cssEnabled: PStyle } = {
  css: {
    width: VIDEO_BUTTONS_WIDTH,
    height: VIDEO_BUTTONS_HEIGHT,
    top: MEDIA_BOTTOM,
    left: VIDEO_CONTROLS_LEFT + W_M4,
    zIndex: LAYER_5,
    visibility: "hidden",
  },
  cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
  cssEnabled: { opacity: 0.8, cursor: "pointer" },
};

const replayButtonStyles: PStyle = {
  width: VIDEO_BUTTONS_WIDTH,
  height: VIDEO_BUTTONS_HEIGHT,
  top: MEDIA_BOTTOM,
  // backgroundColor: "red",
  left: VIDEO_CONTROLS_LEFT + VIDEO_CONTROLS_WIDTH / 2,
  transform: translateX50,
  zIndex: LAYER_5,
  visibility: "hidden",
  cursor: "pointer",
};

const muteUnMuteStyles: { css: PStyle; cssDisabled: PStyle; cssEnabled: PStyle } = {
  css: {
    width: VIDEO_BUTTONS_WIDTH,
    height: VIDEO_BUTTONS_HEIGHT,
    top: MEDIA_BOTTOM,
    right: VIDEO_CONTROLS_RIGHT + W_M4,
    zIndex: LAYER_5,
    cursor: "pointer",
    // transform: "translateX: 100%",
  },
  cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
  cssEnabled: { opacity: 0.8, cursor: "pointer" },
};

const FONT_QUESTION = 20;
const FONT_ = 20;
const responseButtonBaseCss = (): CssTheme => ({
  css: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    textColor: Colors.white,
    fontWeight: 600,
    fontSize: { _unit: "px", value: 28 },
    lineHeight: 1.1,

    // TODO Denne angir knappens max-bredde. Default bør være 25.
    maxWidth: 25,
    minWidth: 12,
    // width: 20,
    // flex: "0 0 auto",
    paddingLeft: { _unit: "px", value: 10 },
    paddingTop: { _unit: "px", value: 5 },
    paddingBottom: { _unit: "px", value: 5 },
    paddingRight: { _unit: "px", value: 10 },
    borderRadius: { _unit: "px", value: 20 },
    borderStyle: "solid",
    boxShadow: "3px 3px gray",
    position: "relative",
    display: "block",
    cursor: "pointer",
    // maxWidth: { _unit: "percent", value: 10 },
  },
  cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
  cssEnabled: { opacity: 1, cursor: "pointer" },
});
export const primaryButton = (overridesCss: PStyle): BuilderOptionTheme => {
  const base = responseButtonBaseCss();
  const optionTheme: BuilderOptionTheme = {
    name: "primary-button",
    normal: {
      btn: {
        css: {
          ...base.css,
          ...overridesCss,
          backgroundColor: Colors.primary,
          borderColor: Colors.primary,
          textColor: Colors.white,
        },
        cssDisabled: base.cssDisabled,
        cssEnabled: base.cssEnabled,
      },
      divider: {},
      text1: {},
      text2: {},
    },

    dontKnow: {
      btn: {
        css: {
          ...base.css,
          ...overridesCss,
          backgroundColor: Colors.secondary,
          borderColor: Colors.secondary,
          textColor: Colors.primary,
        },
        cssEnabled: base.cssEnabled,
        cssDisabled: base.cssDisabled,
      },
      text1: {},
      text2: {},
      divider: {},
    },
  };

  return optionTheme;
};

export const Theme2: IDefaultTheme = {
  name: "theme2",
  schemaBackgroundColor: Colors.white,
  dimensions: { baseHeight: 1300, baseWidth: 1024 },
  pageBackGround: {
    style: {
      height: PAGE_BACKGROUND_HEIGHT,
      width: W_MAX,
      bottom: PAGE_BACKGROUND_BOTTOM,
      left: W_M1,
      backgroundColor: Colors.backgroundGray,
    },
  },
  backGroundArea1: {
    style: {
      height: Q_AREA_HEIGHT,
      width: Q_AREA_WIDTH,
      left: Q_AREA_LEFT,
      bottom: Q_AREA_BOTTOM,
      backgroundColor: Colors.white,
    },
  },
  progressBar: {
    width: W_MAX,
    height: PROGRESS_BAR_HEIGHT,
    bottom: H_M1,
    left: W_M1,
    backgroundStyles: {
      backgroundColor: Colors.backgroundGray,
      borderRadius: { _unit: "px", value: 10 },
    },
    progressStyles: {
      backgroundColor: Colors.primary,
      borderRadius: { _unit: "px", value: 10 },
    },
    text: {
      textType: "page-progress",
      style: { fontSize: { _unit: "px", value: 20 }, x: 81.5, y: 2.5 },
    },
  },
  videoPlayer: {
    playButton: {
      text: { text: "Spill av", css: { ...playPauseText } },
      iconUrl: THEME_2_ICONS.videoPlay.dataUrl,
      ...playPauseBase,
    },
    pauseButton: {
      text: { text: "Pause", css: { ...playPauseText } },
      iconUrl: THEME_2_ICONS.videoPause.dataUrl,
      ...playPauseBase,
    },
    buttonBar: {
      width: VIDEO_CONTROLS_WIDTH,
      zIndex: LAYER_4,
      top: VIDEO_CONTROLS_TOP,
      left: VIDEO_CONTROLS_LEFT,
      backgroundColor: Colors.white,
      height: VIDEO_CONTROLS_HEIGHT,
      borderRadius: { _unit: "px", value: 16 },
    },
    muteButton: {
      text: { text: "Lyd av", css: { ...muteUnmuteText } },
      iconUrl: THEME_2_ICONS.mute.dataUrl,
      css: muteUnMuteStyles.css,
    },

    unMuteButton: {
      iconUrl: THEME_2_ICONS.unMute.dataUrl,
      css: muteUnMuteStyles.css,
      text: { text: "Lyd på", css: { ...muteUnmuteText } },
    },

    replayButton: {
      css: replayButtonStyles,
      cssDisabled: {},
      cssEnabled: {},
      iconUrl: THEME_2_ICONS.videoReplay.dataUrl,
      text: { text: "Spill av på nytt", css: replayText },
    },

    videoElement: {
      css: {
        height: MEDIA_HEIGHT,
        top: MEDIA_TOP,
        transform: translateX50,
        left: 50,
        width: 100,
        zIndex: LAYER_2,
        visibility: "visible",
      },
    },
  },
  image: {
    style: {
      height: MEDIA_HEIGHT,
      // Center image, with dynamic width.
      left: 50,
      transform: translateX50,
      top: MEDIA_TOP,
      boxShadow: "3px 3px",
    },
  },

  mainText: {
    base: {
      text: {
        width: MAIN_TEXT_WIDE,
        left: W_M1 + W_M2 + W_M3,
        top: Q_AREA_TOP + H_M3,
        backgroundColor: Colors.white,
        textAlign: "left",
        textColor: "black",
        fontSize: { _unit: "px", value: 35 },
        lineHeight: 1.2,
      },
      audio: {
        iconUrl: THEME_2_ICONS.audioPlay.dataUrl,
        css: {
          height: AUDIO_ICON_HEIGHT,
          width: AUDIO_ICON_WIDTH,
          top: Q_AREA_TOP + H_M3,
          left: W_M1 + W_M2 + W_M3,
          cursor: "pointer",
          // transform: "translateY(100%)",
          opacity: 0.8,
          visibility: "visible",
          // backgroundColor: "green",
        },
        cssDisabled: { opacity: 0.3, cursor: "not-allowed" },
        cssEnabled: { opacity: 0.8, cursor: "pointer" },
      },
    },
    notMediaHasAudio: {
      text: { width: MAIN_TEXT_NARROW, left: W_M1 + W_M2 + W_M3 + AUDIO_ICON_WIDTH + W_M3 },
      audio: {},
    },
    hasMediaHasAudio: {
      text: {
        width: MAIN_TEXT_NARROW,
        left: W_M1 + W_M2 + W_M3 + AUDIO_ICON_WIDTH + W_M3,
      },
      audio: {},
    },
    notMediaNotAudio: { text: {} },
    hasMediaNotAudio: { text: {} },
  },
  buttonBar: {
    vibrateMs: 60,
    container: {
      base: {
        display: "flex",
        justifyContent: "flex-start",
        width: BUTTON_BAR_WIDTH,
        height: 6,
        bottom: Q_AREA_BOTTOM + H_M3,
        left: Q_AREA_LEFT + W_M3,
        // backgroundColor: "green",
        gap: { _unit: "px", value: 40 },
        alignItems: "stretch",
      },
      whenSingle: { justifyContent: "center" },
      whenMany: { justifyContent: "flex-start" },
    },

    nextButtonTheme: primaryButton({}),
    responseButtons: primaryButton({}),
  },
};
