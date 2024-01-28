import { DElement, DElementBaseDto } from "./DElement";
import { DText, DTextDto } from "./DText";
import { DImg, DImgDto } from "./DImg";
import { ScaleService } from "../engine/scale";

export interface DDivDto extends DElementBaseDto {
  readonly _tag: "div";
  readonly children: Array<DTextDto | DImgDto>;
}

export class DDiv extends DElement<HTMLDivElement> {
  private readonly TAG = "[ DDiv ]: ";
  protected readonly defaultStyle = { x: 22, y: 4 };
  private children: Array<DText | DImg> = [];

  constructor(dto: DDivDto, scale: ScaleService, children: Array<DText | DImg>) {
    const d = document.createElement("div");
    super(d, dto, scale);
    this.children = children;

    this.children.forEach((child) => {
      child.appendYourself(this.el);
    });
  }
}
