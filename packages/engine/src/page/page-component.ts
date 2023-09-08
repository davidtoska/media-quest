import { PStyle } from "../Delement/DStyle";
import { ScaleService } from "../engine/scale";
import { DElement } from "../Delement/DElement";
import { createDElement } from "../Delement/element-factory";
import { ButtonClickAction } from "../Delement/button-click-action";
import { DElementDto } from "../Delement/DElement.dto";
import { TaskState, TaskStateDiff } from "./task-state";

export interface PageComponentDto {
  readonly onClick?: ButtonClickAction;
  readonly el: DElementDto;
  readonly whenVideoPlay?: PStyle;
  readonly whenVideoPaused?: PStyle;
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

export class PageComponent {
  private readonly TAG = "[ PageComponent ]: ";
  private el: DElement<HTMLElement>;
  private prevState: TaskState | false = false;

  constructor(
    readonly dto: PageComponentDto,
    readonly scale: ScaleService,
  ) {
    this.el = createDElement(dto.el, scale);
    this.el.onclick = () => {
      if (dto.onClick) {
        this.onClick(dto.onClick);
      } else {
        console.warn(this.TAG + "onClick not implemented");
      }
    };
  }

  onClick(action: ButtonClickAction) {
    console.warn(this.TAG + "onclick not implemented");
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
      videoIsPlaying,
      audioIsPlaying,
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
      whenVideoPlay,
      whenAudioBlocked,
      whenVideoBlocked,
      whenAudioUnblocked,
      whenVideoUnblocked,
      whenResponseUnblocked,
      whenFormInputUnblocked,
    } = this.dto;
    if (isTrue(audioIsPlaying) && whenAudioPlaying) {
      this.el.setStyle(whenAudioPlaying);
    }
    if (isFalse(audioIsPlaying) && whenAudioPaused) {
      this.el.setStyle(whenAudioPaused);
    }
    if (isTrue(videoIsPlaying) && whenVideoPlay) {
      this.el.setStyle(whenVideoPlay);
    }
    if (isFalse(videoIsPlaying) && whenVideoPaused) {
      this.el.setStyle(whenVideoPaused);
    }
    // if (isTrue(blockAudio) && whenAudioBlocked) {
    //     this.el.setStyle(whenAudioBlocked);
    // }
    // if (isTrue(blockVideo) && whenVideoBlocked) {
    //     this.el.setStyle(whenVideoBlocked);
    // }
  }

  appendToParent(parent: { append: (el: HTMLElement) => void }) {
    // parent.appendChild(this.el.);
    this.el.appendYourself(parent);
  }
}
