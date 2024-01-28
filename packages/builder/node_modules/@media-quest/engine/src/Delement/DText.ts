import { DElement, DElementBaseDto } from "./DElement";
import { ScaleService } from "../engine/scale";

export interface DTextDto extends DElementBaseDto {
  readonly _tag: "p";
  readonly innerText: string;
}

export class DText extends DElement<HTMLParagraphElement> {
  constructor(dto: DTextDto, scale: ScaleService) {
    super(document.createElement("p"), dto, scale);
  }
}
