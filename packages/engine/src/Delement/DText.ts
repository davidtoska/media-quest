import { DElement, DElementBaseDto } from "./DElement";
import { ScaleService } from "../engine/scale";
import { ButtonClickAction } from "./button-click-action";

export interface DTextDto extends DElementBaseDto {
  readonly _tag: "p";
  readonly innerText: string;
}

export class DText extends DElement<HTMLParagraphElement> {
  constructor(dto: DTextDto, scale: ScaleService) {
    super(document.createElement("p"), dto, scale);
  }

  registerClickHandler(clickHandler: (action: ButtonClickAction) => void) {
    this.el.onclick = () => {
      const onClick = this.dto.onClick;
      if (onClick) {
        clickHandler(onClick);
      }
    };
  }
}
