import { PStyle } from "../Delement/DStyle";
import { ScaleService } from "../engine/scale";
import { DElement } from "../Delement/DElement";
import { createDElement } from "../Delement/element-factory";
import { ButtonClickAction } from "../Delement/button-click-action";
import { DElementDto } from "../Delement/DElement.dto";
import { TaskState } from "./task-state";

export interface PageComponentDto {
  readonly onClick?: ButtonClickAction;
  readonly el: DElementDto;
  readonly whenVideoPlay?: PStyle;
  readonly whenVideoPaused?: PStyle;
  readonly whenAudioPlaying?: PStyle;
  readonly whenAudioPaused?: PStyle;
  readonly whenMediaBlocked?: PStyle;
  readonly whenMediaUnblocked?: PStyle;
  readonly whenResponseBlocked?: PStyle;
  readonly whenResponseUnblocked?: PStyle;
  readonly whenFormInputBlocked?: PStyle;
  readonly whenFormInputUnblocked?: PStyle;
}

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

  setCurrentState(state: TaskState) {
    // console.log(state);
    const prev = this.prevState;
    if (prev === false) {
      this.prevState = state;
      this.handleStateChanges(state);
    } else {
      const diff = TaskState.getDiff(prev, state);
      this.prevState = state;
      if (Object.keys(diff).length > 0) {
        this.handleStateChanges(diff);
      }
    }
  }

  private handleStateChanges(diff: Partial<TaskState>) {
    const {
      whenAudioPaused,
      whenVideoPaused,
      whenAudioPlaying,
      whenFormInputBlocked,
      whenResponseBlocked,
      whenVideoPlay,
      whenMediaBlocked,
      whenMediaUnblocked,
      whenResponseUnblocked,
      whenFormInputUnblocked,
    } = this.dto;
    if (diff.audioIsPlaying && whenAudioPlaying) {
      this.el.setStyle(whenAudioPlaying);
    }
    // console.log(diff);
  }

  appendToParent(parent: { append: (el: HTMLElement) => void }) {
    // parent.appendChild(this.el.);
    this.el.appendYourself(parent);
  }
}
