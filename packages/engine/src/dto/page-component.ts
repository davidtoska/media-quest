import { PStyle } from "../Delement/DStyle";
import { DElementDto } from "./DElement.dto";
import { ScaleService } from "../engine/scale";
import { DElement } from "../Delement/DElement";
import { createDElement } from "../engine/element-factory";
import { ButtonClickAction } from "./button-click-action";

export interface PageComponentDto {
  readonly onClick: ButtonClickAction;
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
  constructor(
    readonly dto: PageComponentDto,
    readonly scale: ScaleService,
  ) {
    this.el = createDElement(dto.el, scale);
    this.el.onclick = (ev) => {
      this.onClick(dto.onClick);
    };
  }

  onClick(action: ButtonClickAction) {
    console.warn("onclick not implemented");
  }
}
