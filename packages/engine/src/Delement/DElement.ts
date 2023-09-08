import { DStyle, PStyle } from "./DStyle";
import { ScaleService } from "../engine/scale";

export interface DElementBaseDto {
  readonly style: PStyle;
  readonly onMouseEnter?: PStyle;
  readonly onMouseLeave?: PStyle;
  readonly onMouseDown?: PStyle;
  readonly onMouseUp?: PStyle;
  readonly innerText?: string;
}

export abstract class DElement<T extends HTMLElement> {
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

    this.el.onclick = () => {
      // if (onClick2) {
      this.onclick();
      // }
    };
    this.normalize();

    if (dto) {
      this.updateStyles(dto?.style);
    }
  }

  /**
   *  This method is called when the element is clicked.
   *  This method shall be overridden by the pageClass.
   * @param actions
   */
  onclick() {
    // console.warn("onclick not implemented");
  }

  setStyle(style: PStyle) {
    this.updateStyles(style);
  }

  appendYourself(parent: { append: (el: HTMLElement) => void }) {
    parent.append(this.el);
    // console.log(parent);
  }

  private normalize() {
    this.el.style.padding = "0";
    this.el.style.margin = "0";
    this.el.style.position = "absolute";
    this.el.style.boxSizing = "border-box";
  }

  protected updateStyles(style: Partial<DStyle>) {
    this.currStyle = Object.assign(this.currStyle, style);
    DStyle.applyStyles(this.el, this.currStyle, this.scale.scale);
    window.getComputedStyle(this.el);
  }
}
