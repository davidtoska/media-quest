import { DElement, DElementBaseDto } from "./DElement";
import { DText, DTextDto } from "./DText";
import { DImg, DImgDto } from "./DImg";
import { ScaleService } from "../engine/scale";
import { DButton, DButtonDto } from "./DButton";
import { ButtonClickAction } from "./button-click-action";

export interface DDivDto extends DElementBaseDto {
  readonly _tag: "div";
  readonly children: Array<DTextDto | DImgDto | DButtonDto>;
}

export class DDiv extends DElement<HTMLDivElement> {
  private readonly TAG = "[ DDiv ]: ";
  protected readonly defaultStyle = { x: 22, y: 4 };
  private children: Array<DText | DImg | DButton> = [];

  registerClickHandler(clickHandler: (action: ButtonClickAction) => void) {
    this.el.onclick = () => {
      const action = this.dto.onClick;
      if (action) {
        clickHandler(action);
      }
    };
    this.children.forEach((child) => {
      child.registerClickHandler(clickHandler);
    });
  }

  constructor(dto: DDivDto, scale: ScaleService, children: Array<DText | DImg | DButton>) {
    const d = document.createElement("div");
    super(d, dto, scale);
    this.children = children;

    this.children.forEach((child) => {
      child.appendYourself(this.el);
    });
  }
  protected whenConstructed() {
    this.children.forEach((child) => {
      console.log(child);
    });
  }
}
