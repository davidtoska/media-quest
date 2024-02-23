import { DStyle, PStyle } from "./DStyle";
import { ScaleService } from "../engine/scale";
import { ButtonClickAction } from "./button-click-action";
import { DElementDto } from "./DElement.dto";
import { TaskState, TaskStateDiff } from "../page/task-state";

export interface DElementBaseDto {
  readonly style: PStyle;
  readonly onMouseEnter?: PStyle;
  readonly onMouseLeave?: PStyle;
  readonly onMouseDown?: PStyle;
  readonly onMouseUp?: PStyle;
  readonly innerText?: string;

  // ACTIONS HANDLERS
  readonly onClick?: ButtonClickAction;

  // VIDEO STATED
  readonly whenVideoPaused?: PStyle;
  readonly whenVideoPausedAndMuted?: PStyle;
  readonly whenVideoEnded?: PStyle;
  readonly whenVideoEndedAndMuted?: PStyle;
  readonly whenVideoPlaying?: PStyle;
  readonly whenVideoPlayingAndMuted?: PStyle;

  readonly whenAudioPlaying?: PStyle;
  readonly whenAudioPaused?: PStyle;
  readonly whenAudioBlocked?: PStyle;
  readonly whenVideoBlocked?: PStyle;
  readonly whenAudioUnblocked?: PStyle;
  readonly whenVideoUnblocked?: PStyle;
  readonly whenResponseBlocked?: PStyle;
  readonly whenResponseUnblocked?: PStyle;
  readonly whenFormInputBlocked?: PStyle;
  readonly whenFormInputUnblocked?: PStyle;
}

const isFalse = (bool?: boolean): bool is false => bool === false;
const isTrue = (bool?: boolean): bool is true => bool === true;

export abstract class DElement<T extends HTMLElement> {
  private prevState: TaskState | false = false;

  protected currStyle: Partial<DStyle> = {
    fontSize: { _unit: "px", value: 100 },
    fontWeight: 500,
    textColor: "black",
    opacity: 1,
  };

  protected constructor(
    protected readonly el: T,
    protected readonly dto: DElementBaseDto,
    protected readonly scale: ScaleService,
  ) {
    if (dto.innerText) {
      this.el.innerText = dto.innerText;
    }
    this.setStyle = this.setStyle.bind(this);
    this.normalize = this.normalize.bind(this);
    this.appendYourself = this.appendYourself.bind(this);
    this.updateStyles = this.updateStyles.bind(this);
    const { onMouseEnter, onMouseLeave } = dto;

    if (onMouseEnter) {
      this.el.onmouseenter = () => {
        this.setStyle(onMouseEnter);
      };
    }
    if (onMouseLeave) {
      this.el.onmouseleave = () => {
        this.setStyle(onMouseLeave);
      };
    }

    this.normalize();

    if (dto) {
      this.updateStyles(dto?.style);
    }
  }

  /**
   *  This method is called when the element is clicked.
   *  This method shall be overridden by the pageClass.
   * @param style
   */
  setStyle(style: PStyle) {
    this.updateStyles(style);
  }

  getElementByDangerousReference() {
    return this.el;
  }

  appendYourself(parent: { append: (el: HTMLElement) => void }) {
    parent.append(this.el);
    // console.log(parent);
  }

  updateState(state: TaskStateDiff) {
    this.handleStateChanges(state);
  }

  setState(state: TaskState) {
    const prev = this.prevState;
    const diff = TaskState.getDiff(state, prev);
    this.prevState = state;
    if (Object.keys(diff).length > 0) {
      this.handleStateChanges(diff);
    }
  }

  private handleStateChanges(diff: TaskStateDiff) {
    const {
      audioIsPlaying,
      videoPlayState,
      blockAudio,
      blockVideo,
      blockResponseButton,
      blockFormInput,
      isGifMode,
    } = diff;
    const {
      whenAudioPaused,
      whenVideoPaused,
      whenAudioPlaying,
      whenFormInputBlocked,
      whenResponseBlocked,

      whenVideoPlaying,
      whenVideoEnded,

      whenAudioBlocked,
      whenVideoBlocked,
      whenAudioUnblocked,
      whenVideoUnblocked,
      whenResponseUnblocked,
      whenFormInputUnblocked,
      whenVideoPausedAndMuted,
      whenVideoEndedAndMuted,
      whenVideoPlayingAndMuted,
    } = this.dto;

    if (isTrue(audioIsPlaying) && whenAudioPlaying) {
      this.setStyle(whenAudioPlaying);
    }

    if (isFalse(audioIsPlaying) && whenAudioPaused) {
      this.setStyle(whenAudioPaused);
    }

    if (videoPlayState === "playing" && whenVideoPlaying) {
      this.setStyle(whenVideoPlaying);
    }

    if (videoPlayState === "paused" && whenVideoPaused) {
      this.setStyle(whenVideoPaused);
    }

    if (videoPlayState === "ended" && whenVideoEnded) {
      this.setStyle(whenVideoEnded);
    }
    if (videoPlayState === "playing-and-muted" && whenVideoPlayingAndMuted) {
      this.setStyle(whenVideoPlayingAndMuted);
    }

    if (videoPlayState === "paused-and-muted" && whenVideoPausedAndMuted) {
      this.setStyle(whenVideoPausedAndMuted);
    }

    if (videoPlayState === "ended-and-muted" && whenVideoEndedAndMuted) {
      this.setStyle(whenVideoEndedAndMuted);
    }
  }

  private normalize() {
    this.el.style.padding = "0";
    this.el.style.margin = "0";
    this.el.style.position = "absolute";
    this.el.style.boxSizing = "border-box";
  }

  abstract registerClickHandler(clickHandler: (action: ButtonClickAction) => void): void;

  protected updateStyles(style: Partial<DStyle>) {
    this.currStyle = Object.assign(this.currStyle, style);
    DStyle.applyStyles(this.el, this.currStyle, this.scale.scale);
    window.getComputedStyle(this.el);
  }
}
