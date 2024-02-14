import { DElement, DElementBaseDto } from "./DElement";
import { ScaleService } from "../engine/scale";

export interface DButtonDto extends DElementBaseDto {
  readonly _tag: "button";
}

export class DButton extends DElement<HTMLButtonElement> {
  private readonly TAG = "[ DDiv ]: ";
  protected readonly defaultStyle = { x: 40, y: 40 };

  constructor(dto: DButtonDto, scale: ScaleService) {
    const d = document.createElement("button");
    super(d, dto, scale);
  }
}
