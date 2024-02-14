import { DDivDto } from "../Delement/Ddiv";
import { DElement } from "../Delement/DElement";
import { ScaleService } from "../engine/scale";
import { createDElement } from "../Delement/element-factory";
import { PageComponent, PageComponentDto } from "./page-component";

export interface PageLayoutComponentDto {
  readonly el: DDivDto;
  children: PageComponentDto[];
}

export class PageLayoutComponent {
  private readonly TAG = "[ PageLayoutComponent ]: ";
  private el: DElement<HTMLDivElement>;
  private children: PageComponent[] = [];

  constructor(
    readonly dto: PageLayoutComponentDto,
    readonly scale: ScaleService,
  ) {
    this.el = createDElement(dto.el, scale);
    this.children = dto.children.map((c) => new PageComponent(c, this.scale));
    const nativeElement = this.el.getElementByDangerousReference();
    this.children.forEach((child) => {
      child.appendToParent(nativeElement);
    });
  }

  getChildrenByDangerousReference() {
    return [...this.children];
  }

  appendToParent(parent: { append: (el: HTMLElement) => void }) {
    this.el.appendYourself(parent);
  }
}
